import React from 'react';
import {NextPage} from 'next';
import styled from 'styled-components';
import Link from 'next-translate/Link';
import useTranslation from 'next-translate/useTranslation';
import {useRecoilState} from 'recoil';

import Container from '../components/container';
import Main from '../components/main';
import {_unit, _language, _index} from '../lib/recoil-atoms';

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

const Select = styled.select`
    font-family: var(--font-sans);
	height: 2rem;
`;

const Index: NextPage<unknown> = () => {
	const {t} = useTranslation();
	const [unit, setUnit] = useRecoilState(_unit);
	const [language, setLanguage] = useRecoilState(_language);
	const [index, setIndex] = useRecoilState(_index);

	return (
		<Container>
			<Main>
				<h1>{t('preferences:header')}</h1>
				<p>{t('preferences:language')}</p>
				<Wrapper>
					<Link replace href="/preferences" lang="en">
						<Preference active={language === 'en'} onClick={() => setLanguage('en')}>🇺🇸</Preference>
					</Link>
					<Link replace href="/preferences" lang="pl">
						<Preference active={language === 'pl'} onClick={() => setLanguage('pl')}>🇵🇱</Preference>
					</Link>
				</Wrapper>
				<p>{t('preferences:index')}</p>
				<Select name="index" value={index} onChange={element => setIndex(element.target.value as 'aqi-us' | 'aqhi' | 'daqi' | 'eaqi' | 'caqi')}>
					<option value="aqi-us">AQI (US)</option>
					<option value="aqhi">AQHI (Canada)</option>
					<option value="daqi">DAQI (UK)</option>
					<option value="eaqi">EAQI (EU)</option>
					<option value="caqi">CAQI (EU, deprecated)</option>
				</Select>
				<p>{t('preferences:unit.title')}</p>
				<Wrapper>
					<Preference active={unit === 'km'} onClick={() => setUnit('km')}>{t('preferences:unit.km')}</Preference>
					<Preference active={unit === 'm'} onClick={() => setUnit('m')}>{t('preferences:unit.m')}</Preference>
					<Preference active={unit === 'mi'} onClick={() => setUnit('mi')}>{t('preferences:unit.mi')}</Preference>
				</Wrapper>
			</Main>
		</Container>
	);
};

export default Index;
