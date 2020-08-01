import React from 'react';
import {NextPage, GetServerSideProps} from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import useTranslation from 'next-translate/useTranslation';
import Skeleton from 'react-loading-skeleton';

import Container from '../../components/container';
import Main from '../../components/main';
import Report, {ReportContainer} from '../../components/report';
import {Response} from '../../utils/fetcher';

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

export const getServerSideProps: GetServerSideProps = async ({params}) => {
	if (params?.id) {
		const response = await fetch(`${process.env.NODE_ENV === 'production' ? 'https://air-radar.vercel.app' : 'http://localhost:3000'}/api/fetch`, {
			method: 'POST',
			body: params.id as string
		});
		const data = await response.json();

		return {props: {data}};
	}

	return {props: {data: null}};
};

const Index: NextPage<Props> = (props: Readonly<Props>) => {
	const {data} = props;

	const {t} = useTranslation();

	const report: Response = data?.report ? JSON.parse(data?.report)[0] : undefined;

	console.log(report);

	return (
		<Container>
			<Main>
				{report ? (
					<>
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
							<Report coords={report.coords} current={report.current} sensor={report.sensor}/>
						</ReportContainer>
					</>
				) : (
					<h1>Report not found</h1>
				)}
			</Main>
		</Container>
	);
};

export default Index;
