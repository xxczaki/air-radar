import React from 'react';
import {NextPage, GetStaticProps} from 'next';

import Container from '../components/shared/container';
import Main from '../components/shared/main';
import About from '../components/home';

interface Props {
	reports: number;
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const response = await fetch(`${process.env.NODE_ENV === 'production' ? 'https://air-radar.vercel.app' : 'http://localhost:3000'}/api/fetch`);
		const reports = await response.json();

		return {props: {reports: JSON.parse(reports.report).length}, revalidate: 1};
	} catch {
		return {props: {reports: 1}, revalidate: 1};
	}
};

const Index: NextPage<Props> = ({reports}: Props) => (
	<Container reports={reports}>
		<Main>
			<About/>
		</Main>
	</Container>
);

export default Index;
