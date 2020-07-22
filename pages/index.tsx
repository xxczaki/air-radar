import React from 'react';
import {NextPage} from 'next';

import Main from '../components/main';
import About from '../components/about';

const Index: NextPage<unknown> = () => (
	<Main>
		<About/>
	</Main>
);

export default Index;
