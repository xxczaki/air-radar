import React from 'react';
import {NextPage} from 'next';
import useTranslation from 'next-translate/useTranslation';

import Container from '../components/container';
import Main from '../components/main';

const Index: NextPage<unknown> = () => {
	const {t} = useTranslation();

	return (
		<Container>
			<Main>
				<h1>{t('404:header')}</h1>
			</Main>
		</Container>
	);
};

export default Index;
