import React from 'react';
import styled from 'styled-components';

interface Props {
	name: string;
	value: number;
}

const Wrapper = styled.div`
	max-width: 20em;
`;

const getDescription = (name: string) => {
	switch (name) {
		case 'PM1':
			return 'Ultrafine particles with an aerodynamic diameter less than 0.1 micrometers. the most damaging variant of fine particles because the particles penetrate directly through the lungs into the bloodstream and are thus spread to the organs.';
		case 'PM2.5':
			return 'Particles with an aerodynamic diameter less than 2.5 micrometers. These particles contain secondary aerosols and combustion particles. Fine particles can reach the pulmonary alveoli.';
		case 'PM10':
			return 'These are particles having an aerodynamic diameter of less than 10 micrometers. Depending on their size, the particles remain in the lungs.';
		case 'NO₂' || 'NO':
			return 'Nitrogen Dioxide is one of the compounds polluting our atmosphere. NO₂ forms from emissions from cars, trucks and buses, power plants, and off-road equipment.';
		case 'SO₂':
			return 'Sulfur dioxide results from the burning of either sulfur or materials containing sulfur. Short-term exposures to this compound can harm the human respiratory system and make breathing difficult.';
		case 'O₃':
			return 'Ozone occurs both in the Earth\'s upper atmosphere and at ground level. It can be good or bad, depending on where it is found. People most at risk from breathing air containing ozone include people with asthma, children, older adults, and people who are active outdoors, especially outdoor workers.';
		case 'H₂S':
			return 'Hydrogen sulfide gas may be encountered during production of oil and gas, sewage and septic pits, in the fishing industry and farming. The H₂S reacts with the haemoglobins in the blood and reduces the body’s oxygen supply.';
		case 'CO':
			return 'Carbon Monoxide is found in fumes produced any time you burn fuel in cars or trucks, small engines, stoves, lanterns, grills, fireplaces, gas ranges, or furnaces. CO Symptoms are often described as “flu-like”.';
		default:
			break;
	}
};

const getNorm = (name: string, value: number) => {
	switch (name) {
		case 'PM2.5':
			return {
				norm: '25 μg/m3',
				time: 'daily',
				percent: Math.round(value / 25 * 100)
			};
		case 'PM10':
			return {
				norm: '50 μg/m3',
				time: 'daily',
				percent: Math.round(value / 50 * 100)
			};
		case 'NO₂' || 'NO':
			return {
				norm: '200 μg/m3',
				time: '1-hour mean',
				percent: Math.round(value / 200 * 100)
			};
		case 'SO₂':
			return {
				norm: '20 μg/m3',
				time: 'daily',
				percent: Math.round(value / 20 * 100)
			};
		case 'O₃':
			return {
				norm: '100 μg/m3',
				time: '8-hour mean',
				percent: Math.round(value / 100 * 100)
			};
		default:
			break;
	}
};

const Description = ({name, value}: Props): JSX.Element => {
	const norm = getNorm(name, value);

	return (
		<Wrapper>
			<h3>{name}</h3>
			<p><b>Unit: </b>μg/m3</p>
			<p>{getDescription(name)}</p>
			{norm && <p><b>WHO Norm ({norm.time}):</b> {norm.norm} <i>({norm.percent}%)</i></p>}
		</Wrapper>
	);
};

export default Description;
