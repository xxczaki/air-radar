import React from 'react';
import {NextPage, GetStaticProps} from 'next';

import Container from '../components/container';
import Main from '../components/main';
import About from '../components/about';

interface Props {
	reports: number;
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const response = await fetch(`${process.env.NODE_ENV === 'production' ? 'https://air-radar.vercel.app' : 'http://localhost:3000'}/api/fetch`);
		const reports = await response.json();

		return {props: {reports: JSON.parse(reports.report).length}};
	} catch {
		return {props: {reports: 0}};
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
