import React from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import {darken} from 'polished';
import LatLon from 'geodesy/latlon-ellipsoidal-vincenty';
import useTranslation from 'next-translate/useTranslation';
import {Except} from 'type-fest';

import ExtLink from '../extlink';
import Description from './description';
import {humanizeLevel} from '../../utils/humanize';
import {Response} from '../../utils/fetcher';
import {usePreferences} from '../../hooks/use-preferences';
import {convert} from '../../utils/convert';

const Tooltip = dynamic(async () => {
	const {Tooltip} = await import('react-tippy');

	return Tooltip;
});

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
	border-radius: var(--radius);
	background-color: ${props => props.background};
	color: ${props => props.background === '#4caf50' || props.background === 'var(--gray)' ? 'var(--text)' : '#000'};
	padding: 1em;

	h1 {
		margin: 0;
	}
`;

const InfoBox = styled.div`
	justify-content: space-between;
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
	background-color: ${props => darken(0.125, props.background as string)};
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

const Crucial = ({coords, current, sensor}: Except<Response, 'forecast' | 'id' | 'date'>): JSX.Element => {
	const {t} = useTranslation();
	const {unit} = usePreferences();

	const location = new LatLon(coords.latitude, coords.longitude);
	const _sensor = new LatLon(sensor.latitude as number, sensor.longitude as number);

	return (
		<Wrapper>
			<Box background={current.indexes[0].color}>
				<h1>{sensor.provider === 'airly' ? humanizeLevel(current.indexes[0].level as string) : current.indexes[0].level}</h1>
				<InfoBox>
					<p>{current.indexes[0].description}</p>
					<ValuesBox>
						{current.values.map(element => (
							<Tooltip
								key={element.name}
								interactive
								arrow
								position="top"
								html={<Description name={element.name} value={element.value}/>}
							>
								<Value background={current.indexes[0].color}>
									<p>{element.name}</p>
									<h3>{element.value}</h3>
								</Value>
							</Tooltip>
						))}
					</ValuesBox>
				</InfoBox>
			</Box>
			<Box background="var(--gray)">
				<h1>{t('report:information')}</h1>
				<InfoBox>
					<p>{t('report:provider')} <ExtLink href={sensor.provider === 'airly' ? 'https://map.airly.eu' : 'https://aqicn.org/'}><b>{sensor.provider === 'airly' ? 'Airly' : 'World Air Quality Index'}</b></ExtLink></p>
					<p>{t('report:from')} <b>{current.time}</b></p>
					<p>{t('report:distance')} <b>{sensor.provider === 'airly' ? 'N/A' : convert(location.distanceTo(_sensor), unit)}</b></p>
				</InfoBox>
			</Box>
		</Wrapper>
	);
};

export default Crucial;
