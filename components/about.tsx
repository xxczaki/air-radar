import React, {useState} from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import {SimpleImg} from 'react-simple-img';
import {useForm} from 'react-hook-form';
import router from 'next-translate/Router';
import {toast} from 'react-toastify';
import useTranslation from 'next-translate/useTranslation';

import Header from './header';
import {
	Button,
	Form,
	Input,
	Label
} from './form';
import Details from './details';
import ExtLink from './extlink';
import {fetcher} from '../utils/fetcher';

import illustration from '../public/images/undraw-illustration.svg';

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

const Divider = styled.hr`
	border: none;
	padding: var(--gap-double);

	&::after {
		content: "• • •";
		color: var(--light-gray);
		font-size: 24px;
		letter-spacing: 12px;
	}
`;

const About = (): JSX.Element => {
	const [loading, isLoading] = useState(false);
	const {register, handleSubmit} = useForm<FormData>();
	const {t} = useTranslation();

	const onSubmit = async (data: FormData) => {
		isLoading(true);

		const {nanoid} = await import('nanoid');
		const id = nanoid(10);

		const showError = (type: 'create' | 'location'): void => {
			if (type === 'create') {
				toast.error(t('home:create-error'), {
					position: 'bottom-right',
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					progress: undefined
				});
			} else {
				toast.error(t('home:location-error'), {
					position: 'bottom-right',
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					progress: undefined
				});
			}

			isLoading(false);
		};

		if (data.location) {
			const response = await fetch(`https://nominatim.openstreetmap.org/search?q="${data.location}"&format=json&limit=1`);
			const json = await response.json();

			if (json.length === 0) {
				showError('location');
			} else {
				const data = await fetcher(json[0].lat, json[0].lon);

				const response = await fetch(`${process.env.NODE_ENV === 'production' ? 'https://air-radar.vercel.app' : 'http://localhost:3000'}/api/create`, {
					method: 'POST',
					body: JSON.stringify({id, date: new Date().toLocaleString('en', {hour12: false}), coords: {latitude: json[0].lat, longitude: json[0].lon}, ...data})
				});
				const report = await response.json();

				if (report?.message === 'OK') {
					await router.replaceI18n(`/reports/${id}`);
				} else {
					showError('create');
				}
			}
		} else {
			const {getPosition} = await import('../utils/get-position');
			const {coords} = await getPosition();

			const data = await fetcher(coords.latitude as unknown as string, coords.longitude as unknown as string);

			const response = await fetch(`${process.env.NODE_ENV === 'production' ? 'https://air-radar.vercel.app' : 'http://localhost:3000'}/api/create`, {
				method: 'POST',
				body: JSON.stringify({id, date: new Date().toLocaleString('en', {hour12: false}), ...coords, ...data})
			});
			const report = await response.json();

			if (report?.message === 'OK') {
				await router.replaceI18n(`/reports/${id}`);
			} else {
				showError('create');
			}
		}
	};

	return (
		<>
			<Container>
				<Box>
					<h1>Air Radar</h1>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Label>{t('home:location')}</Label>
						<Input ref={register()} type="text" name="location" aria-label={t('home:location-label')} aria-required="false" placeholder="Times Square, New York"/>
						<Button type="submit">{loading ? <Spinner/> : t('home:check-button')}</Button>
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
