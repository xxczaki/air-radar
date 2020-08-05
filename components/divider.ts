import styled from 'styled-components';

const Divider = styled.hr`
	border: none;
	padding: var(--gap-double);

	&::after {
		content: "• • •";
		color: var(--light-gray);
		font-size: 24px;
		letter-spacing: 12px;
	}
`;

export default Divider;
