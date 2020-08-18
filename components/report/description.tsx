import React from 'react';
import styled from 'styled-components';

interface Props {
	name: string;
	value: number;
	details: {
		pm1: {
			description: string;
		};
		pm25: {
			description: string;
			time: string;
		};
		pm10: {
			description: string;
			time: string;
		};
		no2: {
			description: string;
			time: string;
		};
		so2: {
			description: string;
			time: string;
		};
		o3: {
			description: string;
			time: string;
		};
		h2s: {
			description: string;
		};
		co: {
			description: string;
		};
		norm: string;
	};
}

const Wrapper = styled.div`
	text-align: left;
`;

const Description = ({name, value, details}: Props): JSX.Element => {
	const getDescription = (name: string) => {
		switch (name) {
			case 'PM1':
				return details.pm1.description;
			case 'PM2.5':
				return details.pm25.description;
			case 'PM10':
				return details.pm10.description;
			case 'NO₂' || 'NO':
				return details.no2.description;
			case 'SO₂':
				return details.so2.description;
			case 'O₃':
				return details.o3.description;
			case 'H₂S':
				return details.h2s.description;
			case 'CO':
				return details.co.description;
			default:
				break;
		}
	};

	const getNorm = (name: string, value: number) => {
		switch (name) {
			case 'PM2.5':
				return {
					norm: '25 μg/m3',
					time: details.pm25.time,
					percent: Math.round(value / 25 * 100)
				};
			case 'PM10':
				return {
					norm: '50 μg/m3',
					time: details.pm10.time,
					percent: Math.round(value / 50 * 100)
				};
			case 'NO₂' || 'NO':
				return {
					norm: '200 μg/m3',
					time: details.no2.time,
					percent: Math.round(value / 200 * 100)
				};
			case 'SO₂':
				return {
					norm: '20 μg/m3',
					time: details.so2.time,
					percent: Math.round(value / 20 * 100)
				};
			case 'O₃':
				return {
					norm: '100 μg/m3',
					time: details.o3.time,
					percent: Math.round(value / 100 * 100)
				};
			default:
				break;
		}
	};

	const norm = getNorm(name, value);
	const description = getDescription(name);

	return (
		<Wrapper>
			<h3>{name}</h3>
			<p>{description}</p>
			{norm && <p><b>{details.norm} ({norm.time}):</b> {norm.norm} <i>({norm.percent}%)</i></p>}
		</Wrapper>
	);
};

export default Description;
