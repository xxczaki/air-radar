import React from 'react';
import {NextPage} from 'next';

import Container from '../components/container';
import Main from '../components/main';
import About from '../components/about';

const Index: NextPage<unknown> = () => (
	<Container>
		<Main>
			<About/>
		</Main>
	</Container>
);

export default Index;
