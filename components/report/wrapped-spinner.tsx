import React from 'react';
import styled from 'styled-components';

import _Spinner from '../form/spinner';

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
`;

const Spinner = styled(_Spinner)`
	width: 5rem;
	height: 5rem;
`;

const WrappedSpinner = (): JSX.Element => (
	<Wrapper>
		<Spinner/>
	</Wrapper>
);

export default WrappedSpinner;
