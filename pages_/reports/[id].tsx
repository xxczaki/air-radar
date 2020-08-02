import React from 'react';
import {NextPage, GetStaticPaths, GetStaticProps} from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import styled from 'styled-components';
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

const _Spinner = dynamic(async () => import('../../components/form/spinner'));

interface Props {
	data: {
		report?: string;
	};
}

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
`;

const Spinner = styled(_Spinner)`
	width: 5rem;
	height: 5rem;
`;

export const getStaticPaths: GetStaticPaths = async () => {
	const response = await fetch(`${process.env.NODE_ENV === 'production' ? 'https://air-radar.vercel.app' : 'http://localhost:3000'}/api/fetch`);
	const reports = await response.json();

	const paths = JSON.parse(reports.report).map((report: any) => {
		return {
			params: {id: report.id ?? ''}
		};
	});

	return {paths, fallback: true};
};

export const getStaticProps: GetStaticProps = async ({params}) => {
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
	const router = useRouter();

	const report: Response = data?.report ? JSON.parse(data?.report)[0] : undefined;

	return (
		<Container>
			<Main>
				{router.isFallback ? (
					<Wrapper>
						<Spinner/>
					</Wrapper>
				) : (report ? (
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
							<Report id={report.id} date={report.date} coords={report.coords} current={report.current} sensor={report.sensor}/>
						</ReportContainer>
					</>
				) : (
					<>
						<h1>Report not found</h1>
						<p>You can try generating one on the home page.</p>
					</>
				))}
			</Main>
		</Container>
	);
};

export default Index;
