import React, {useState} from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import {SimpleImg} from 'react-simple-img';
import {useForm} from 'react-hook-form';
import router from 'next-translate/Router';
import Link from 'next-translate/Link';
import useTranslation from 'next-translate/useTranslation';
import {useRecoilState} from 'recoil';

import Header from './header';
import {
	Button,
	Form,
	Input,
	Label
} from './form';
import Divider from './divider';
import Details from './details';
import ExtLink from './extlink';
import {_reports} from '../lib/recoil-atoms';

import illustration from '../public/images/undraw-illustration.svg';
import shield from '../public/images/shield-checkmark.svg';

const Spinner = dynamic(async () => import('./form/spinner'));

type FormData = {
	location?: string;
};

const Container = styled.div`
	display: flex;
	flex-wrap: wrap-reverse;
	justify-content: space-between;
	width: 100%;
`;

const Box = styled.div`
	display: flex;
	flex-direction: column;
	padding-right: 1.25em;
	width: 100%;
	max-width: 30rem;
`;

const Image = styled(SimpleImg)`
	user-select: none;

	@media (min-width: 150px) and (max-width: 891px) {
		display: none !important;
	}
`;

const InfoBox = styled.a`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: center;
	margin-top: var(--gap);
	cursor: pointer;
	transition: opacity var(--transition);

	b {
		font-size: 1rem;
		margin-left: .5rem;
	}

	&:hover {
		opacity: 0.8;
	}
`;

const About = (): JSX.Element => {
	const [loading, isLoading] = useState(false);
	const {register, handleSubmit} = useForm<FormData>();
	const [reports, setReports] = useRecoilState(_reports);
	const {t, lang} = useTranslation();

	const onSubmit = async (data: FormData) => {
		const {submit} = await import('../utils/submit');

		await submit(data, isLoading, router, {
			createError: t('home:create-error'),
			locationError: t('home:location-error'),
			fetchError: t('home:fetch-error'),
			reports,
			onSuccess: setReports
		});
	};

	return (
		<>
			<Container>
				<Box>
					<h1>Air Radar</h1>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Label>{t('home:location')}</Label>
						<Input ref={register()} type="text" name="location" aria-label={t('home:location-label')} aria-required="false" placeholder="Times Square, New York"/>
						<Button type="submit" disabled={loading}>{loading ? <Spinner/> : t('home:check-button')}</Button>
						<Link href="/security" lang={lang}>
							<InfoBox>
								<SimpleImg
									src={shield}
									placeholder="var(--background)"
									// @ts-expect-error
									draggable={false}
									alt={t('home:illustration-label')}
									height="1.3rem"
								/>
								<b>{t('home:encryption')}</b>
							</InfoBox>
						</Link>
					</Form>
				</Box>
				<Image
					src={illustration}
					placeholder="var(--background)"
					// @ts-expect-error
					draggable={false}
					alt={t('home:illustration-label')}
					height="15rem"
				/>
			</Container>
			<Divider/>
			<Header>{t('home:how-it-works')}</Header>
			<p>{t('home:how-it-works-description1')}</p>
			<p>{t('home:how-it-works-description2')}</p>
			<Header>FAQ</Header>
			<Details>
				<summary>{t('home:faq.1.q')}</summary>
				<p>{t('home:faq.1.a.1')} <ExtLink href="https://airly.eu/" target="_blank" rel="noopener noreferrer">Airly</ExtLink> {t('home:faq.1.a.2')} <ExtLink href="https://aqicn.org/" target="_blank" rel="noopener noreferrer">World Air Quality Index</ExtLink> {t('home:faq.1.a.3')}</p>
			</Details>
			<Details>
				<summary>{t('home:faq.2.q')}</summary>
				<p>{t('home:faq.2.a.1')} <ExtLink href="https://who.int" target="_blank" rel="noopener noreferrer">World Health Organization</ExtLink>. {t('home:faq.2.a.2')} <ExtLink href="https://www.epa.gov/" target="_blank" rel="noopener noreferrer">United States Environmental Protection Agency</ExtLink>.</p>
			</Details>
			<Details>
				<summary>{t('home:faq.3.q')}</summary>
				<p>{t('home:faq.3.a.1')} <ExtLink href={t('home:faq.3.a.3')} target="_blank" rel="noopener noreferrer">{t('home:faq.3.a.2')}</ExtLink> {t('home:faq.3.a.4')}</p>
			</Details>
			<Details>
				<summary>{t('home:faq.4.q')}</summary>
				<p>{t('home:faq.4.a.1')}</p>
				<p>{t('home:faq.4.a.2')}</p>
				<ul>
					<li><ExtLink href="https://airly.eu/docs/pp-en.pdf" target="_blank" rel="noopener noreferrer">Airly</ExtLink></li>
					<li><ExtLink href="https://aqicn.org/privacy" target="_blank" rel="noopener noreferrer">World Air Quality Index</ExtLink></li>
					<li><ExtLink href="https://wiki.osmfoundation.org/wiki/Privacy_Policy" target="_blank" rel="noopener noreferrer">Nominatim ({t('home:faq.4.a.3')})</ExtLink></li>
					<li><ExtLink href="https://www.mapbox.com/legal/privacy/" target="_blank" rel="noopener noreferrer">Mapbox</ExtLink></li>
				</ul>
			</Details>
			<Details>
				<summary>{t('home:faq.5.q')}</summary>
				<p>{t('home:faq.5.a.1')} <ExtLink href="https://kepinski.me" target="_blank" rel="noopener noreferrer">{t('home:faq.5.a.2')}</ExtLink>{t('home:faq.5.a.3')}</p>
			</Details>
		</>
	);
};

export default About;
