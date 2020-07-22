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
		</>
	);
};

export default About;
