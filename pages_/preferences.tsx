import React from 'react';
import {NextPage} from 'next';
import styled from 'styled-components';
import Link from 'next-translate/Link';
import useTranslation from 'next-translate/useTranslation';

import Container from '../components/container';
import Main from '../components/main';
import {usePreferences} from '../hooks/use-preferences';

interface Props {
	active: boolean;
}

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Preference = styled.a<Props>`
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
	outline: none;
`;

const Index: NextPage<unknown> = () => {
	const {t} = useTranslation();
	const {unit, language, updateUnit, updateLanguage} = usePreferences();

	return (
		<Container>
			<Main>
				<h1>{t('preferences:header')}</h1>
				<p>{t('preferences:language')}</p>
				<Wrapper>
					<Link shallow href="/preferences" lang="en">
						<Preference active={language === 'en'} onClick={() => updateLanguage('en')}>🇺🇸</Preference>
					</Link>
					<Link shallow href="/preferences" lang="pl">
						<Preference active={language === 'pl'} onClick={() => updateLanguage('pl')}>🇵🇱</Preference>
					</Link>
				</Wrapper>
				<p>{t('preferences:unit.title')}</p>
				<Wrapper>
					<Preference active={unit === 'km'} onClick={() => updateUnit('km')}>{t('preferences:unit.km')}</Preference>
					<Preference active={unit === 'm'} onClick={() => updateUnit('m')}>{t('preferences:unit.m')}</Preference>
					<Preference active={unit === 'mi'} onClick={() => updateUnit('mi')}>{t('preferences:unit.mi')}</Preference>
				</Wrapper>
			</Main>
		</Container>
	);
};

export default Index;
