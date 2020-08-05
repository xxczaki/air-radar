import {nanoid} from 'nanoid';
import Router from 'next-translate/Router';

import {fetcher} from './fetcher';

interface Options {
	createError: string;
	locationError: string;
	reports: string[];
	onSuccess: (arr: string[]) => void;
}

export const submit = async (data: {location?: string}, loadingFn: (isLoading: boolean) => void, router: typeof Router, {createError, locationError, reports, onSuccess}: Options) => {
	loadingFn(true);

	const id = nanoid(10);

	if (data.location) {
		const response = await fetch(`https://nominatim.openstreetmap.org/search?q="${data.location}"&format=json&limit=1`);
		const json = await response.json();

		if (json.length === 0) {
			const {showError} = await import('./show-error');

			await showError('location', () => loadingFn(false), {createError, locationError});
		} else {
			const data = await fetcher(json[0].lat, json[0].lon);

			const response = await fetch(`${process.env.NODE_ENV === 'production' ? 'https://air-radar.vercel.app' : 'http://localhost:3000'}/api/create`, {
				method: 'POST',
				body: JSON.stringify({id, date: new Date().toLocaleString('en', {hour12: false}), coords: {latitude: json[0].lat, longitude: json[0].lon}, ...data})
			});
			const report = await response.json();

			if (report?.message === 'OK') {
				onSuccess([...reports, id]);

				await router.replaceI18n(`/reports/${id}`);
			} else {
				const {showError} = await import('./show-error');

				await showError('create', () => loadingFn(false), {createError, locationError});
			}
		}
	} else {
		const {getPosition} = await import('./get-position');
		const {coords} = await getPosition();

		const data = await fetcher(coords.latitude as unknown as string, coords.longitude as unknown as string);

		const response = await fetch(`${process.env.NODE_ENV === 'production' ? 'https://air-radar.vercel.app' : 'http://localhost:3000'}/api/create`, {
			method: 'POST',
			body: JSON.stringify({id, date: new Date().toLocaleString('en', {hour12: false}), ...coords, ...data})
		});
		const report = await response.json();

		if (report?.message === 'OK') {
			onSuccess([...reports, id]);

			await router.replaceI18n(`/reports/${id}`);
		} else {
			const {showError} = await import('./show-error');

			await showError('create', () => loadingFn(false), {createError, locationError});
		}
	}
};
