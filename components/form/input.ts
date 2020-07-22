import styled from 'styled-components';

const Input = styled.input`
	outline: none;
	transition: var(--transition);
	transition-property: color,box-shadow,background,border-color;
	box-shadow: 0 0 0 0 rgba(0,93,255,0);
	background-color: var(--gray);
	font-family: inherit;
    font-weight: 500;
    word-break: break-word;
    font-size: 1rem;
    color: var(--text);
    resize: none;
    appearance: none;
    border-style: solid;
    border-image: initial;
    border-width: 2px;
    border-color: var(--light-gray);
    border-radius: var(--inline-radius);
    padding: var(--gap-half);
	cursor: text;

	&:focus {
		border-color: rgb(0, 93, 255);
		box-shadow: 0 0 0 3px rgba(0,93,255,0.6);
	}
`;

export default Input;
