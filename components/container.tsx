import React from 'react';
import Link from 'next-translate/Link';
import styled from 'styled-components';
import {SimpleImg} from 'react-simple-img';
import useTranslation from 'next-translate/useTranslation';

import Logo from './logo';
import Nav from './nav';
import NavLink from './navlink';
import Footer from './footer';
import {usePreferences} from '../hooks/use-preferences';

import cloudOutline from '../public/images/cloud-outline.svg';
import email from '../public/images/email.svg';
import logoGitHub from '../public/images/logo-github.svg';

interface Props {
	children: React.ReactNode;
}

const Header = styled.header`
	z-index: 10;
    margin: var(--gap-double) auto var(--small-gap) auto;
    position: sticky;
    padding: var(--gap) 0;
    top: 0;
    background-color: var(--header);
    backdrop-filter: var(--vibrancy);
	transition: var(--slow);

	@media (min-width: 150px) and (max-width: 891px) {
		margin: var(--gap-double) auto var(--gap) auto;
	}
`;

const Wrapper = styled.div`
	height: 32px;
	margin: 0 auto;
	padding: 0 1rem;
	max-width: var(--main-content);
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Social = styled.div`
	display: flex;
	justify-content: space-between;
	width: 12rem;
`;

const Box = styled.a`
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: background-color var(--transition);
	padding: 5px;
	border-radius: var(--inline-radius);
	user-select: none;

	&:hover {
		background-color: var(--hover);
	}
`;

const Image = styled(SimpleImg)`
	width: 2em;
`;

const Container = ({children}: Props): JSX.Element => {
	const {t} = useTranslation();
	const {language} = usePreferences();

	return (
		<>
			<Header>
				<Wrapper>
					<Link href="/" lang={language}>
						<Logo src={cloudOutline} draggable={false} alt="Flash"/>
					</Link>
					<Nav>
						<NavLink title={t('common:home')} href="/" lang={language}/>
						<NavLink title={t('common:preferences')} href="/preferences" lang={language}/>
					</Nav>
				</Wrapper>
			</Header>
			{children}
			<Footer>
				<p>Antoni Kepinski &copy; {new Date().getFullYear()}</p>
				<Social>
					<Box href="mailto:a@kepinski.me" target="_blank" rel="noopener noreferrer" aria-label="Email">
						<Image src={email} width="2em" height="2em" placeholder="var(--gray)" alt="Email"/>
					</Box>
					<Box href="https://github.com/xxczaki/air-radar" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
						<Image src={logoGitHub} width="2em" height="2em" placeholder="var(--gray)" alt="GitHub"/>
					</Box>
				</Social>
			</Footer>
		</>
	);
};

export default Container;
