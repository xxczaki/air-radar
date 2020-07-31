import React from 'react';
import {NextPage} from 'next';

import Container from '../components/container';
import Main from '../components/main';

const Index: NextPage<unknown> = () => (
	<Container>
		<Main>
			<h1>This page cannot be found.</h1>
		</Main>
	</Container>
);

export default Index;
