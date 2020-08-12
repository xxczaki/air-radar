import React, {useState, useEffect} from 'react';
import {NextPage, GetStaticPaths, GetStaticProps} from 'next';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import Skeleton from 'react-loading-skeleton';

import Container from '../../components/shared/container';
import Main from '../../components/shared/main';
import WrappedSpinner from '../../components/report/wrapped-spinner';
import {Response} from '../../utils/fetcher';

const Head = dynamic(async () => import('next/head'));
const ReportContainer = dynamic(async () => {
	const {ReportContainer} = await import('../../components/report');

	return ReportContainer;
});
const Report = dynamic(async () => import('../../components/report'));
const OpenMap = dynamic(
	async () => import('../../components/report/map'),
	{
		ssr: false,
		loading: () => <Skeleton height="15rem"/>
	}
);

interface Props {
	data: {
		report?: string;
	};
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const response = await fetch(`${process.env.NODE_ENV === 'production' ? 'https://air-radar.vercel.app' : 'http://localhost:3000'}/api/fetch`);
		const reports = await response.json();

		const paths = JSON.parse(reports.report).map((report: any) => {
			return {
				params: {id: report._id ?? ''}
			};
		});

		return {paths, fallback: true};
	} catch {
		return {paths: [], fallback: true};
	}
};

export const getStaticProps: GetStaticProps = async ({params}) => {
	if (params?.id) {
		const response = await fetch(`${process.env.NODE_ENV === 'production' ? 'https://air-radar.vercel.app' : 'http://localhost:3000'}/api/fetch`, {
			method: 'POST',
			body: params.id as string
		});
		const data = await response.json();

		return {props: {data}, revalidate: 1};
	}

	return {props: {data: null}, revalidate: 1};
};

const Index: NextPage<Props> = (props: Readonly<Props>) => {
	const {data} = props;

	const [report, setReport] = useState<Response | 'Decrypting...' | 'Fail' | undefined>('Decrypting...');
	const {t} = useTranslation();
	const router = useRouter();

	useEffect(() => {
		(async () => {
			if (data?.report) {
				const objectKey = window.location.hash.slice('#key='.length);

				if (objectKey.length > 0) {
					try {
						const {decode} = await import('base64-arraybuffer');

						const parsed = JSON.parse(data?.report)[0];
						const encrypted = decode(parsed.report);

						const key = await window.crypto.subtle.importKey(
							'jwk',
							{
								k: objectKey,
								alg: 'A128GCM',
								ext: true,
								key_ops: ['encrypt', 'decrypt'],
								kty: 'oct'
							},
							{name: 'AES-GCM', length: 128},
							false,
							['decrypt']
						);

						const decrypted = await window.crypto.subtle.decrypt(
							{name: 'AES-GCM', iv: new Uint8Array(12)},
							key,
							encrypted
						);
						const decoded = new window.TextDecoder().decode(new Uint8Array(decrypted));
						const content = JSON.parse(decoded);

						setReport({id: parsed._id, key: objectKey, ...content});
					} catch {
						setReport('Fail');
					}
				} else {
					setReport('Fail');
				}
			} else {
				setReport(undefined);
			}
		})();
	}, [data?.report]);

	if (router.isFallback || report === 'Decrypting...') {
		return (
			<Container>
				<Main>
					<WrappedSpinner/>
				</Main>
			</Container>
		);
	}

	if (report === 'Fail') {
		return (
			<Container>
				<Main>
					<h1>Decryption failed</h1>
					<p>Could not decrypt the report. Make sure you entered the correct URL.</p>
				</Main>
			</Container>
		);
	}

	if (report) {
		return (
			<Container>
				<Main>
					<Head>
						<link rel="preconnect" href="https://api.mapbox.com"/>
						<link href="https://api.mapbox.com/mapbox-gl-js/v0.54.1/mapbox-gl.css" rel="stylesheet"/>
						<title>{t('report:title', {id: report.id})}</title>
						<meta property="og:image" content={`https://og.kepinski.me/${t('report:name')}.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fair-radar.vercel.app%2Fimages%2Fcloud-outline.svg`}/>
						<meta name="twitter:image" content={`https://og.kepinski.me/${t('report:name')}.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fair-radar.vercel.app%2Fimages%2Fcloud-outline.svg`}/>
					</Head>
					<ReportContainer>
						<OpenMap
							location={{
								latitude: report.coords.latitude,
								longitude: report.coords.longitude
							}}
							sensor={{
								latitude: report.sensor.latitude as number,
								longitude: report.sensor.longitude as number
							}}
							color={report.current.indexes[0].color as string}
						/>
						<Report id={report.id} date={report.date} current={report.current} sensor={report.sensor}/>
					</ReportContainer>
				</Main>
			</Container>
		);
	}

	return (
		<Container>
			<Main>
				<h1>Report not found</h1>
				<p>You can try generating one on the home page.</p>
			</Main>
		</Container>
	);
};

export default Index;
