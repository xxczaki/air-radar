import React from 'react';
import {NextPage} from 'next';
import useTranslation from 'next-translate/useTranslation';

import Container from '../components/container';
import Main from '../components/main';
import ExtLink from '../components/extlink';

const Index: NextPage<unknown> = () => {
	const {t} = useTranslation();

	return (
		<Container>
			<Main>
				<h1>{t('privacy:title')}</h1>
				<i>{t('privacy:last-updated')} 08/08/2020</i>
				<h3>{t('privacy:introduction')}</h3>
				<p>{t('privacy:introduction-1')}</p>
				<p>{t('privacy:introduction-2')}</p>
				<p>{t('privacy:introduction-3')}</p>
				<ul>
					<li>{t('privacy:introduction-list-1')}</li>
					<li>{t('privacy:introduction-list-2')}</li>
					<li>{t('privacy:introduction-list-3')}</li>
					<li>{t('privacy:introduction-list-4')}</li>
				</ul>
				<b>{t('privacy:introduction-4')}</b>
				<h3>{t('privacy:collected-data')}</h3>
				<p>{t('privacy:collected-data-1')}</p>
				<p>{t('privacy:collected-data-2')}</p>
				<ul>
					<li>{t('privacy:collected-data-list-1')}</li>
					<li>{t('privacy:collected-data-list-2')}</li>
				</ul>
				<p>{t('privacy:collected-data-3')}</p>
				<p>{t('privacy:collected-data-4')} <ExtLink href="https://wiki.osmfoundation.org/wiki/Privacy_Policy">{t('privacy:collected-data-5')}</ExtLink>.</p>
				<b>{t('privacy:collected-data-6')}</b>
				<p>{t('privacy:collected-data-7')}</p>
				<b>{t('privacy:collected-data-8')}</b>
				<p>{t('privacy:collected-data-9')}</p>
				<h3>{t('privacy:data-removal')}</h3>
				<p>{t('privacy:data-removal-1')} <i>a@kepinski.me</i> {t('privacy:data-removal-2')}</p>
				<p>{t('privacy:data-removal-3')}</p>
				<h3>{t('privacy:third-party')}</h3>
				<p>{t('privacy:third-party-1')} <ExtLink href="https://nominatim.openstreetmap.org/">Nominatim</ExtLink> ({t('privacy:third-party-2')}), <ExtLink href="https://www.mapbox.com/">Mapbox</ExtLink>, <ExtLink href="https://airly.eu/">Airly</ExtLink> {t('privacy:third-party-3')} <ExtLink href="https://waqi.info/">World Air Quality Index</ExtLink>{t('privacy:third-party-4')}</p>
				<b>{t('privacy:third-party-5')}</b>
				<h3>{t('privacy:cookies')}</h3>
				<p>{t('privacy:cookies-1')}</p>
				<h3>{t('privacy:other')}</h3>
				<p>{t('privacy:other-1')} <i>a@kepinski.me</i>.</p>
			</Main>
		</Container>
	);
};

export default Index;
