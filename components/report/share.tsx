import React from 'react';
import styled from 'styled-components';
import useTranslation from 'next-translate/useTranslation';

const Wrapper = styled.section`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(20rem, auto));
	grid-gap: 1rem;
`;

const Box = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	border-radius: var(--radius);
	background-color: var(--gray);
	color: var(--text);
	padding: 1em;

	h1 {
		margin: 0;
	}
`;

const Share = (): JSX.Element => {
	const {t} = useTranslation();

	return (
		<Wrapper>
			<Box>
				<h1>{t('report:share')}</h1>
			</Box>
		</Wrapper>
	);
};

export default Share;
