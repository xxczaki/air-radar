import React from 'react';
import styled from 'styled-components';
import {SimpleImg} from 'react-simple-img';
import {useForm} from 'react-hook-form';
import {useRouter} from 'next/router';
import {toast} from 'react-toastify';

import Header from './header';
import {
	Button,
	Form,
	Input,
	Label
} from './form';
import Details from './details';
import ExtLink from './extlink';

import illustration from '../public/images/undraw-illustration.svg';

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
	const {register, handleSubmit} = useForm<FormData>();
	const router = useRouter();

	const onSubmit = async (data: FormData) => {
		if (data.location) {
			const response = await fetch(`https://nominatim.openstreetmap.org/search?q="${data.location}"&format=json&limit=1`);
			const json = await response.json();

			if (json.length === 0) {
				toast.error('Location not found!', {
					position: 'bottom-right',
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					progress: undefined
				});
			} else {
				await router.push(`/report?lat=${json[0].lat}&lng=${json[0].lon}`);
			}
		} else {
			const {getPosition} = await import('../utils/get-position');
			const {coords} = await getPosition();

			await router.push(`/report?lat=${coords.latitude}&lng=${coords.longitude}`);
		}
	};

	return (
		<>
			<Container>
				<Box>
					<h1>Air Radar</h1>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Label>Location (optional)</Label>
						<Input ref={register()} type="text" name="location" aria-label="Location you want to check the air quality for" aria-required="false" placeholder="Times Square, New York"/>
						<Button type="submit">Check</Button>
					</Form>
				</Box>
				<Image
					src={illustration}
					placeholder="var(--background)"
					// @ts-expect-error
					draggable={false}
					alt="Illustration"
					height="13em"
				/>
			</Container>
			<Divider/>
			<Header>How it works?</Header>
			<p>
				Click the button below to get information about air quality from the sensor closest to you. You can also enter a location manually.
				Air Radar uses 2 trusted data sources to ensure that you will get the latest and most accurate data possible.
			</p>
			<p>Furthermore, Air Radar is totally free and open-source. Try it out today!</p>
			<Header>FAQ</Header>
			<Details>
				<summary>What is the data sources priority?</summary>
				<p>Air Radar will attempt to obtain data from <ExtLink href="https://airly.eu/" target="_blank" rel="noopener noreferrer">Airly</ExtLink> first. If without success, <ExtLink href="https://aqicn.org/" target="_blank" rel="noopener noreferrer">World Air Quality Index</ExtLink> will be used.</p>
			</Details>
			<Details>
				<summary>Where do the pollutant details come from?</summary>
				<p>Norms and most details come from <ExtLink href="https://who.int" target="_blank" rel="noopener noreferrer">World Health Organization</ExtLink>. Some was also taken from <ExtLink href="https://www.epa.gov/" target="_blank" rel="noopener noreferrer">United States Environmental Protection Agency</ExtLink>.</p>
			</Details>
			<Details>
				<summary>How is the distance between the sensor and my location calculated?</summary>
				<p>We use <ExtLink href="https://en.wikipedia.org/wiki/Vincenty%27s_formulae" target="_blank" rel="noopener noreferrer">Vincenty&apos;s formulae</ExtLink> to ensure the highest accuracy.</p>
			</Details>
			<Details>
				<summary>Does this tool collect any personal data?</summary>
				<p>No, Air Radar does not collect or store any private information, such as your IP address. Our code is also fully open-source.</p>
				<p>However, we use some third-party services, which might do so. You can check their privacy policies below:</p>
				<ul>
					<li><ExtLink href="https://airly.eu/docs/pp-en.pdf" target="_blank" rel="noopener noreferrer">Airly</ExtLink></li>
					<li><ExtLink href="https://aqicn.org/privacy" target="_blank" rel="noopener noreferrer">World Air Quality Index</ExtLink></li>
					<li><ExtLink href="https://wiki.osmfoundation.org/wiki/Privacy_Policy" target="_blank" rel="noopener noreferrer">Nominatim (part of OpenStreetMap Foundation)</ExtLink></li>
					<li><ExtLink href="https://www.mapbox.com/legal/privacy/" target="_blank" rel="noopener noreferrer">Mapbox</ExtLink></li>
				</ul>
			</Details>
			<Details>
				<summary>Who is the creator of this service?</summary>
				<p>Air Radar was created by <ExtLink href="https://kepinski.me" target="_blank" rel="noopener noreferrer">Antoni Kepinski</ExtLink>, a young developer from Poland, with help of some amazing open-source contributors.</p>
			</Details>
		</>
	);
};

export default About;
