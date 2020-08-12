import React from 'react';
import {NextPage} from 'next';
import styled from 'styled-components';
import {SimpleImg} from 'react-simple-img';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next-translate/Link';

import Container from '../components/shared/container';
import Main from '../components/shared/main';

import preferences from '../public/images/settings-outline.svg';
import history from '../public/images/refresh-outline.svg';
import add from '../public/images/add-outline.svg';
import information from '../public/images/information-circle-outline.svg';
import shield from '../public/images/shield-checkmark.svg';

interface Props {
	disabled?: boolean;
}

const Wrapper = styled.section`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
	grid-gap: 2rem;
	width: 100%;
`;

const Icon = styled(SimpleImg)`
	width: 5rem;
`;

const Box = styled.a<Props>`
	display: flex;
	align-items: center;
	justify-content: space-space-between;
	border-radius: var(--radius);
	background-color: var(--gray);
	color: var(--text);
	padding: 1.2em;
	height: 4rem;
	cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
	transition: opacity var(--transition);
	opacity: ${props => props.disabled ? '0.5' : '1'};

	h2 {
		margin-left: var(--gap);
        white-space: nowrap;
	}

	&:hover {
		opacity: ${props => props.disabled ? 'auto' : '0.8'};
	}
`;

const Abbreviation = styled.abbr`
	text-decoration: none;
`;

const Index: NextPage<unknown> = () => {
	const {t, lang} = useTranslation();

	return (
		<Container>
			<Main>
				<Wrapper>
					<Link href="/reports" lang={lang}>
						<Box>
							<Icon
								src={history}
								placeholder="var(--gray)"
								// @ts-expect-error
								draggable={false}
								alt={t('more:alt')}
								height="3.5rem"
							/>
							<h2>{t('more:history')}</h2>
						</Box>
					</Link>
					<Link href="/preferences" lang={lang}>
						<Box>
							<Icon
								src={preferences}
								placeholder="var(--gray)"
								// @ts-expect-error
								draggable={false}
								alt={t('more:alt')}
								height="3.5rem"
							/>
							<h2>{t('more:preferences')}</h2>
						</Box>
					</Link>
					<Abbreviation title="Coming soon!">
						<Box disabled>
							<Icon
								src={add}
								placeholder="var(--gray)"
								// @ts-expect-error
								draggable={false}
								alt={t('more:alt')}
								height="3.5rem"
							/>
							<h2>{t('more:add-sensor')}</h2>
						</Box>
					</Abbreviation>
					<Link href="/security" lang={lang}>
						<Box>
							<Icon
								src={shield}
								placeholder="var(--gray)"
								// @ts-expect-error
								draggable={false}
								alt={t('more:alt')}
								height="3.5rem"
							/>
							<h2>{t('more:security')}</h2>
						</Box>
					</Link>
					<Link href="/privacy" lang={lang}>
						<Box>
							<Icon
								src={information}
								placeholder="var(--gray)"
								// @ts-expect-error
								draggable={false}
								alt={t('more:alt')}
								height="3.5rem"
							/>
							<h2>{t('more:privacy')}</h2>
						</Box>
					</Link>
				</Wrapper>
			</Main>
		</Container>
	);
};

export default Index;
