import React from 'react';
import {NextPage, GetServerSideProps} from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
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
		report: string;
	};
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
	const response = await fetch(`${process.env.SITE ?? 'http://localhost:3000'}/api/fetch`, {
		method: 'POST',
		body: query.id as string
	});
	const data = await response.json();

	return {props: {data}};
};

const Index: NextPage<Props> = (props: Readonly<Props>) => {
	const {data} = props;
	const report: Response = JSON.parse(data.report)[0];

	return (
		<Container>
			<Main>
				<Head>
					<link rel="preconnect" href="https://api.mapbox.com"/>
					<link href="https://api.mapbox.com/mapbox-gl-js/v0.54.1/mapbox-gl.css" rel="stylesheet"/>
				</Head>
				{data ? (
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
				) : (
					<p>Loading...</p>
				)}
			</Main>
		</Container>
	);
};

export default Index;
