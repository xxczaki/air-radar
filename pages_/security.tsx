import React from 'react';
import {NextPage} from 'next';
import Link from 'next-translate/Link';
import useTranslation from 'next-translate/useTranslation';

import Container from '../components/shared/container';
import Main from '../components/shared/main';
import ExtLink from '../components/extlink';

const Index: NextPage<unknown> = () => {
	const {t, lang} = useTranslation();

	return (
		<Container>
			<Main>
				<h1>{t('security:title')}</h1>
				<p>{t('security:description-1')}</p>
				<p>{t('security:description-2')} <b>{t('security:description-3')}</b> {t('security:description-4')}</p>
				<p>{t('security:description-5')}</p>
				<p>{t('security:description-6')} <Link href="/privacy" lang={lang}><ExtLink href="/privacy">{t('security:description-7')}</ExtLink></Link>.</p>
			</Main>
		</Container>
	);
};

export default Index;
