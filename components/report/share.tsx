import React from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import useTranslation from 'next-translate/useTranslation';
import useWebShare from 'react-use-web-share';
import {toast} from 'react-toastify';
import Skeleton from 'react-loading-skeleton';

const _Button = dynamic(
	async () => import('../../components/form/button'),
	{
		loading: () => <Skeleton/>
	}
);

interface Props {
	id: string;
}

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

const Button = styled(_Button)`
	background: #424242;
`;

const Share = ({id}: Props): JSX.Element => {
	const {t} = useTranslation();
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
				<h1>{t('report:report-info')}</h1>
				{isSupported ? <Button onClick={share}>{t('report:share')}</Button> : <Button onClick={copy}>{t('report:copy')}</Button>}
			</Box>
		</Wrapper>
	);
};

export default Share;
