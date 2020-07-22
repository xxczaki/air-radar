import React from 'react';
import styled from 'styled-components';
import {Bar} from 'react-chartjs-2';

import Crucial from './crucial';
import {Response} from '../../utils/fetcher';

export const ReportContainer = styled.div`
	display: grid;
	grid-gap: 1rem;
	width: 100%;
`;

const Report = ({coords, current, forecast, sensor}: Response): JSX.Element => {
	return (
		<Crucial coords={coords} current={current} sensor={sensor}/>
	);
};

export default Report;
