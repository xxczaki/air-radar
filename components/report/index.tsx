import React from 'react';
import styled from 'styled-components';
import {Except} from 'type-fest';

import Crucial from './crucial';
import Share from './share';
import {Response} from '../../utils/fetcher';

export const ReportContainer = styled.div`
	display: grid;
	grid-gap: 1rem;
	width: 100%;
`;

const Report = ({coords, current, sensor}: Except<Response, 'forecast' | 'id'>): JSX.Element => {
	return (
		<>
			<Crucial coords={coords} current={current} sensor={sensor}/>
			<Share/>
		</>
	);
};

export default Report;
