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

const Report = ({id, date, current, sensor}: Except<Response, 'coords' | 'forecast'>): JSX.Element => {
	return (
		<>
			<Crucial current={current} sensor={sensor}/>
			<Share id={id} date={date}/>
		</>
	);
};

export default Report;
