import React from 'react';
import {NextPage} from 'next';
import styled from 'styled-components';
import {useRecoilState} from 'recoil';

import Container from '../../components/container';
import Main from '../../components/main';
import Divider from '../../components/divider';
import {_reports} from '../../lib/recoil-atoms';

const Info = styled.b`
	text-align: center;
	width: 100%;
`;

const Wrapper = styled.section`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(10rem, auto));
	grid-gap: 3rem;
	width: 100%;
`;

const Index: NextPage<unknown> = () => {
	const [reports] = useRecoilState(_reports);

	return (
		<Container>
			<Main>
				<h1>History</h1>
				<p>Previously generated reports will appear below on this page.</p>
				<Divider/>
				{reports.length === 0 ? <Info>No reports found.</Info> : (
					<Wrapper>
						{reports.map(id => <p key={id}>{id}</p>)}
					</Wrapper>
				)}
			</Main>
		</Container>
	);
};

export default Index;
