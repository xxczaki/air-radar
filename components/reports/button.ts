import styled from 'styled-components';

import _Button from '../form/button';

interface Props {
	view?: boolean;
}

const Button = styled(_Button)<Props>`
	background-color: ${props => props.view ? '#424242' : '#f44336'};
	color: ${props => props.view ? 'var(--text)' : '#000'};
	margin-bottom: 0.5rem;
	width: 6rem;
`;

export default Button;
