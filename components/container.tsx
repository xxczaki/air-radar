import React from 'react';
import Link from 'next-translate/Link';
import styled from 'styled-components';
import useTranslation from 'next-translate/useTranslation';

import Logo from './logo';
import Nav from './nav';
import NavLink from './navlink';
import Footer from './footer';
import {usePreferences} from '../hooks/use-preferences';

import cloudOutline from '../public/images/cloud-outline.svg';

interface Props {
	children: React.ReactNode;
	reports?: number;
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

const Container = ({children, reports}: Props): JSX.Element => {
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
				<p>Reports created: <b>{reports}</b></p>
			</Footer>
		</>
	);
};

export default Container;
