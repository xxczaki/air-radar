import styled from 'styled-components';

const Box = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: var(--gray);
	border-radius: var(--radius);
	padding: .5rem;
	max-width: 20rem;

	b {
		margin-left: .5rem;
	}
`;

export default Box;
