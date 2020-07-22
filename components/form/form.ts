import styled from 'styled-components';

const Form = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	height: 10rem;
	width: 100%;

	input[type=checkbox] {
		margin-right: .5rem;
		width: 1rem;
		height: 1rem;
	}
`;

export default Form;
