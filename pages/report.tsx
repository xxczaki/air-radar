import React from 'react';
import {NextPage, GetServerSideProps} from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import Main from '../components/main';
import Report, {ReportContainer} from '../components/report';
import {fetcher, Response} from '../utils/fetcher';

const OpenMap = dynamic(
	async () => import('../components/report/map'),
	{
		ssr: false,
		loading: () => <p>Loading map...</p>
	}
);

interface Props {
	data: Response;
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
	let lat: string | undefined;
	let lng: string | undefined;

	if (query?.id) {
		const response = await fetch(`${process.env.SITE ?? 'http://localhost:3000'}/api/fetch`, {
			method: 'POST',
			body: query.id as string
		});
		const report = await response.json();

		if (!report?.message) {
			lat = report?.lat;
			lng = report?.lng;
		}
	} else {
		lat = query?.lat as string | undefined;
		lng = query?.lng as string | undefined;
	}

	const data = await fetcher(lat, lng);

	return {props: {data}};
};

const Index: NextPage<Props> = (props: Readonly<Props>) => {
	const {data} = props;

	return (
		<Main>
			<Head>
				<link rel="preconnect" href="https://api.mapbox.com"/>
				<link href="https://api.mapbox.com/mapbox-gl-js/v0.54.1/mapbox-gl.css" rel="stylesheet"/>
			</Head>
			{data ? (
				<ReportContainer>
					<OpenMap
						location={{
							latitude: data.coords.latitude,
							longitude: data.coords.longitude
						}}
						sensor={{
							latitude: data.sensor.latitude as number,
							longitude: data.sensor.longitude as number
						}}
						color={data.current.indexes[0].color as string}
					/>
					<Report coords={data.coords} current={data.current} forecast={data?.forecast} sensor={data.sensor}/>
				</ReportContainer>
			) : (
				<p>Loading...</p>
			)}
		</Main>
	);
};

export default Index;
