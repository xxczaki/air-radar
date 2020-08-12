import styled from 'styled-components';

const Logo = styled.img`
    width: 2.5em;
    cursor: pointer;
    transition: background-color var(--transition);
    display: inline-flex;
	padding: 5px;
	margin: -10px;
	border-radius: var(--inline-radius);
	margin-right: var(--gap-half);

    &:hover {
        background-color: var(--hover);
    }
`;

export default Logo;
