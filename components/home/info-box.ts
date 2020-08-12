import styled from 'styled-components';

const InfoBox = styled.a`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: center;
	margin-top: var(--gap);
	cursor: pointer;
	transition: opacity var(--transition);

	b {
		font-size: 1rem;
		margin-left: .5rem;
	}

	&:hover {
		opacity: 0.8;
	}
`;

export default InfoBox;
