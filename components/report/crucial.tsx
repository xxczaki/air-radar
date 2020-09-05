import React from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import {darken} from 'color2k';
import useTranslation from 'next-translate/useTranslation';
import {useRecoilState} from 'recoil';
import {Except} from 'type-fest';

import ExtLink from '../extlink';
import Description from './description';
import {humanizeLevel} from '../../utils/humanize';
import {Response} from '../../utils/fetcher';
import {convert} from '../../utils/convert';
import {_unit} from '../../lib/recoil-atoms';

const Tippy = dynamic(async () => import('@tippyjs/react'));

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
	background-color: ${props => darken(props.background as string, 0.125)};
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
		background-color: ${props => darken(props.background as string, 0.14)};
	}
`;

const Tooltip = styled(Tippy)`
	background-color: var(--light-gray);
    border-radius: var(--inline-radius);
	padding: .5rem;

    &[data-placement^='top'] > .tippy-arrow::before {
        border-top-color: var(--light-gray);
    }
`;

const Crucial = ({current, sensor}: Except<Response, 'coords' | 'forecast' | 'id' | 'date'>): JSX.Element => {
	const {t} = useTranslation();
	const [unit] = useRecoilState(_unit);

	return (
		<Wrapper>
			<Box background={current.indexes[0].color}>
				<h1>{sensor.provider === 'airly' ?
					humanizeLevel(current.indexes[0].level as string, {
						veryLow: t('report:airly-levels.very-low'),
						low: t('report:airly-levels.low'),
						medium: t('report:airly-levels.medium'),
						high: t('report:airly-levels.high'),
						veryHigh: t('report:airly-levels.very-high'),
						extreme: t('report:airly-levels.extreme')
					}) : current.indexes[0].level}
				</h1>
				<InfoBox>
					<p>{current.indexes[0].description}</p>
					<ValuesBox>
						{current.values.map(element => (
							<div key={element.name}>
								<Tooltip

									interactive
									placement="top"
									content={<Description
										name={element.name}
										value={element.value}
										details={{
											pm1: {
												description: t('report:pollutants.pm1.description')
											},
											pm25: {
												description: t('report:pollutants.pm25.description'),
												time: t('report:pollutants.pm25.time')
											},
											pm10: {
												description: t('report:pollutants.pm10.description'),
												time: t('report:pollutants.pm10.time')
											},
											no2: {
												description: t('report:pollutants.no2.description'),
												time: t('report:pollutants.no2.time')
											},
											so2: {
												description: t('report:pollutants.so2.description'),
												time: t('report:pollutants.so2.time')
											},
											o3: {
												description: t('report:pollutants.o3.description'),
												time: t('report:pollutants.o3.time')
											},
											h2s: {
												description: t('report:pollutants.h2s.description')
											},
											co: {
												description: t('report:pollutants.co.description')
											},
											norm: t('report:norm')
										}}
									/>}
								>
									<Value background={current.indexes[0].color}>
										<p>{element.name}</p>
										<h3>{element.value}</h3>
									</Value>
								</Tooltip>
							</div>
						))}
					</ValuesBox>
				</InfoBox>
			</Box>
			<Box background="var(--gray)">
				<h1>{t('report:information')}</h1>
				<InfoBox>
					<p>{t('report:provider')} <ExtLink href={sensor.provider === 'airly' ? 'https://map.airly.eu' : 'https://aqicn.org/'}><b>{sensor.provider === 'airly' ? 'Airly' : 'World Air Quality Index'}</b></ExtLink></p>
					<p>{t('report:from')} <b>{current.time}</b></p>
					{sensor.distance !== 'N/A' && <p>{t('report:distance')} <b>{convert(sensor.distance as number, unit)}</b></p>}
				</InfoBox>
			</Box>
		</Wrapper>
	);
};

export default Crucial;
