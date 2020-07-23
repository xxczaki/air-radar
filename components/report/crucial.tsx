import React from 'react';
import styled from 'styled-components';
import {darken} from 'polished';
import haversine from 'haversine';
import Tooltip from 'rc-tooltip';
import {Except} from 'type-fest';

import ExtLink from '../extlink';
import Description from './description';
import {humanizeLevel} from '../../utils/humanize';
import {Response} from '../../utils/fetcher';

interface BoxProps {
	background?: string;
}

const Wrapper = styled.section`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(20rem, auto));
	grid-gap: 1rem;
`;

const Box = styled.div<BoxProps>`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	border-radius: var(--radius);
	background-color: ${props => props.background};
	color: ${props => props.background === '#4caf50' || props.background === 'var(--gray)' ? 'var(--text)' : '#000'};
	padding: 1em;

	h1 {
		margin: 0;
	}
`;

const ValuesBox = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
	grid-gap: 1em;
	justify-items: center;
`;

const Value = styled.div<BoxProps>`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	background-color: ${props => darken(0.1, props.background as string)};
	border-radius: var(--inline-radius);
	width: 4rem;
	height: 4rem;
	padding: 1em;
	transition: all var(--transition-slow);
	cursor: help;

	h3, p {
		margin: 0;
	}

	&:hover {
		background-color: ${props => darken(0.14, props.background as string)};
	}
`;

const Crucial = ({coords, current, sensor}: Except<Response, 'forecast'>): JSX.Element => {
	const location = {
		latitude: coords.latitude,
		longitude: coords.longitude
	};

	return (
		<Wrapper>
			<Box background={current.indexes[0].color}>
				<h1>{sensor.provider === 'airly' ? humanizeLevel(current.indexes[0].level as string) : current.indexes[0].level}</h1>
				<p>{current.indexes[0].description}</p>
				<ValuesBox>
					{current.values.map(element => (
						<Tooltip key={element.name} placement="top" overlay={<Description name={element.name} value={element.value}/>}>
							<Value background={current.indexes[0].color}>
								<p>{element.name}</p>
								<h3>{element.value}</h3>
							</Value>
						</Tooltip>
					))}
				</ValuesBox>
			</Box>
			<Box background="var(--gray)">
				<h1>Sensor information</h1>
				<p>Provider: <ExtLink href={sensor.provider === 'airly' ? 'https://map.airly.eu' : 'https://aqicn.org/'}><b>{sensor.provider === 'airly' ? 'Airly' : 'World Air Quality Index'}</b></ExtLink></p>
				<p>Result from: <b>{current.time}</b></p>
				<p>Distance: <b>{sensor.provider === 'airly' ? 'N/A' : `${Math.round((haversine(location, {latitude: sensor.latitude as number, longitude: sensor.longitude as number}) + Number.EPSILON) * 100) / 100} km`}</b></p>
			</Box>
		</Wrapper>
	);
};

export default Crucial;
