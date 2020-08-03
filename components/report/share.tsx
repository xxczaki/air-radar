import React from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import useTranslation from 'next-translate/useTranslation';
import useWebShare from 'react-use-web-share';
import {toast} from 'react-toastify';
import Skeleton from 'react-loading-skeleton';

import copyIcon from '../../public/images/copy-outline.svg';
import shareIcon from '../../public/images/share-outline.svg';

const _Button = dynamic(
	async () => import('../../components/form/button'),
	{
		loading: () => <Skeleton/>
	}
);

interface Props {
	id: string;
	date: string;
}

const Wrapper = styled.section`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(20rem, auto));
	grid-gap: 1rem;
`;

const Box = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Icon = styled.img`
	width: 1rem;
	margin-right: .5rem;
`;

const Button = styled(_Button)<{long?: boolean}>`
	background: var(--gray);
	width: ${props => props.long ? '8.5rem' : '6.8rem'};
	margin-top: 0.8rem;
`;

const Share = ({id, date}: Props): JSX.Element => {
	const {t, lang} = useTranslation();
	const {isSupported, share} = useWebShare();

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(`${process.env.NODE_ENV === 'production' ? 'https://air-radar.vercel.app' : 'http://localhost:3000'}/reports/${id}`);

			toast.success(t('report:copy-success'), {
				position: 'bottom-right',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				progress: undefined
			});
		} catch {
			toast.error(t('report:copy-error'), {
				position: 'bottom-right',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				progress: undefined
			});
		}
	};

	return (
		<Wrapper>
			<Box>
				<p>{date}</p>
				{isSupported ? (
					<Button long={lang === 'pl'} onClick={share}>
						<Icon src={shareIcon} loading="lazy" decoding="async" alt="Icon"/>
						{t('report:share')}
					</Button>
				) : (
					<Button onClick={copy}>
						<Icon src={copyIcon} loading="lazy" decoding="async" alt="Icon"/>
						{t('report:copy')}
					</Button>
				)}
			</Box>
		</Wrapper>
	);
};

export default Share;
