import React from 'react';
import {useRouter} from 'next/router';
// @ts-expect-error
import Link from 'next-translate/Link';
import styled from 'styled-components';

interface Props {
	title: string;
	href: string;
	lang: string;
}

interface WrapperProps {
	active: boolean;
}

const Wrapper = styled.a<WrapperProps>`
	border-radius: 8px;
	text-decoration: none;
    display: flex;
    height: 32px;
    margin-right: 0px;
    padding-right: 20px;
    padding-left: 20px;
    align-items: center;
    border-bottom-style: none;
    font-size: 14px;
    font-weight: 600;
	background-color: ${props => props.active ? '#fff' : 'auto'};
	color: ${props => props.active ? '#18171D' : 'auto'};
	cursor: pointer;
`;

const NavLink = ({title, href, lang}: Props): JSX.Element => {
	const router = useRouter();

	return (
		<Link href={href} lang={lang}>
			<Wrapper active={router.pathname === href}>{title}</Wrapper>
		</Link>
	);
};

export default NavLink;
