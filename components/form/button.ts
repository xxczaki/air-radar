import styled from 'styled-components';

const Button = styled.button`
	outline: none;
	transition: 100ms ease-in-out;
	transition-property: color,box-shadow,background,border-color,opacity;
	box-shadow: 0 0 0 0 rgba(0,93,255,0);
	margin-top: 0.5rem;
	background-color: var(--gray);
	color: var(--text);
	font-size: 1rem;
	font-family: inherit;
	padding-top: 0.5rem;
	padding-bottom: 0.5rem;
	padding-left: 10px;
	padding-right: 10px;
	font-weight: 500;
	cursor: pointer;
	border-width: initial;
	border-style: none;
	border-color: initial;
	border-image: initial;
	border-radius: 7px;
	overflow: hidden;
	appearance: button;

	&:hover {
		opacity: 0.8;
	}

	&:focus {
    	box-shadow: 0 0 0 3px rgba(0,93,255,0.6);
	}
`;

export default Button;
