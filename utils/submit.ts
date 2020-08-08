import Router from 'next-translate/Router';
import {encode} from 'base64-arraybuffer';

import {fetcher} from './fetcher';

interface Options {
	createError: string;
	locationError: string;
	fetchError: string;
	reports: Array<{id: string; key?: string}>;
	onSuccess: (arr: Array<{id: string; key?: string}>) => void;
}

export const submit = async (data: {location?: string}, loadingFn: (isLoading: boolean) => void, router: typeof Router, {createError, locationError, fetchError, reports, onSuccess}: Options) => {
	loadingFn(true);

	const key = await window.crypto.subtle.generateKey(
		{name: 'AES-GCM', length: 128},
		true, // Extractable
		['encrypt', 'decrypt']
	);
	const objectKey = (await window.crypto.subtle.exportKey('jwk', key)).k;

	const encrypt = async (body: any): Promise<ArrayBuffer> => {
		const encrypted = await window.crypto.subtle.encrypt(
			{name: 'AES-GCM', iv: new Uint8Array(12) /* don't reuse key! */},
			key,
			new TextEncoder().encode(JSON.stringify(body))
		);

		return encrypted;
	};

	if (data.location) {
		const response = await fetch(`https://nominatim.openstreetmap.org/search?q="${data.location}"&format=json&limit=1`);
		const json = await response.json();

		if (json.length === 0) {
			const {showError} = await import('./show-error');

			await showError('location', () => loadingFn(false), {createError, locationError, fetchError});
		} else {
			try {
				const data = await fetcher(json[0].lat, json[0].lon);

				const response = await fetch('/api/create', {
					method: 'POST',
					body: encode(await encrypt({date: new Date().toLocaleString('en', {hour12: false}), coords: {latitude: json[0].lat, longitude: json[0].lon}, ...data}))
				});
				const report = await response.json();

				if (report?.message === 'OK') {
					onSuccess([...reports, {id: report.id, key: objectKey}]);

					await router.replaceI18n(`/reports/${report.id}#key=${objectKey}`);
				} else {
					const {showError} = await import('./show-error');

					await showError('create', () => loadingFn(false), {createError, locationError, fetchError});
				}
			} catch (error) {
				const {showError} = await import('./show-error');

				await showError('fetch', () => loadingFn(false), {createError, locationError, fetchError: error.message});
			}
		}
	} else {
		const {getPosition} = await import('./get-position');
		const {coords} = await getPosition();

		try {
			const data = await fetcher(coords.latitude as unknown as string, coords.longitude as unknown as string);

			const response = await fetch('/api/create', {
				method: 'POST',
				body: encode(await encrypt({date: new Date().toLocaleString('en', {hour12: false}), ...coords, ...data}))
			});
			const report = await response.json();

			if (report?.message === 'OK') {
				onSuccess([...reports, {id: report.id, key: objectKey}]);

				await router.replaceI18n(`/reports/${report.id}#key=${objectKey}`);
			} else {
				const {showError} = await import('./show-error');

				await showError('create', () => loadingFn(false), {createError, locationError, fetchError});
			}
		} catch (error) {
			const {showError} = await import('./show-error');

			await showError('fetch', () => loadingFn(false), {createError, locationError, fetchError: error.message});
		}
	}
};
