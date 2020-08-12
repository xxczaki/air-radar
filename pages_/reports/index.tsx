import React, {useState} from 'react';
import {NextPage} from 'next';
import dynamic from 'next/dynamic';
import Link from 'next-translate/Link';
import useTranslation from 'next-translate/useTranslation';
import {useRecoilState} from 'recoil';

import Container from '../../components/shared/container';
import Main from '../../components/shared/main';
import Divider from '../../components/divider';
import {_reports} from '../../lib/recoil-atoms';

import viewIcon from '../../public/images/open-outline.svg';
import deleteIcon from '../../public/images/trash-outline.svg';

const Info = dynamic(async () => {
	const {Info} = await import('../../components/reports');

	return Info;
});
const Wrapper = dynamic(async () => {
	const {Wrapper} = await import('../../components/reports');

	return Wrapper;
});
const Box = dynamic(async () => {
	const {Box} = await import('../../components/reports');

	return Box;
});
const ButtonBox = dynamic(async () => {
	const {ButtonBox} = await import('../../components/reports');

	return ButtonBox;
});
const Icon = dynamic(async () => {
	const {Icon} = await import('../../components/reports');

	return Icon;
});
const Button = dynamic(async () => {
	const {Button} = await import('../../components/reports');

	return Button;
});
const Spinner = dynamic(async () => import('../../components/form/spinner'));

const Index: NextPage<unknown> = () => {
	const [loading, isLoading] = useState<{is: boolean; id?: string}>({is: false});
	const {t, lang} = useTranslation();
	const [reports, setReports] = useRecoilState(_reports);

	const deleteReport = async (id: string) => {
		isLoading({is: true, id});

		const response = await fetch('/api/delete', {
			method: 'POST',
			body: id
		});
		const data = await response.json();

		if (data.message === 'OK') {
			setReports(reports.filter(report => report.id !== id));
			isLoading({is: false});
		} else {
			const {toast} = await import('react-toastify');

			toast.error(t('reports:delete-error'), {
				position: 'bottom-right',
				autoClose: 2500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				progress: undefined
			});

			isLoading({is: false});
		}
	};

	return (
		<Container>
			<Main>
				<h1>{t('reports:title')}</h1>
				<p>{t('reports:description')}</p>
				<Divider/>
				{reports.length === 0 ? <Info>{t('reports:info')}</Info> : (
					<Wrapper>
						{reports.map((element, index) => (
							<Box key={element.id}>
								<b>{index + 1}.</b>
								<ButtonBox>
									<Link href={`/reports/${element.id}#key=${element.key}`} lang={lang}>
										<a>
											<Button view>
												<Icon src={viewIcon} loading="lazy" decoding="async" alt={t('reports:icon')}/>
												{t('reports:view')}
											</Button>
										</a>
									</Link>
									<Button onClick={async () => deleteReport(element.id)}>
										{(loading.is && loading?.id === element.id) ? <Spinner/> : (
											<>
												<Icon src={deleteIcon} loading="lazy" decoding="async" alt={t('reports:icon')}/>
												{t('reports:delete')}
											</>
										)}
									</Button>
								</ButtonBox>
							</Box>
						))}
					</Wrapper>
				)}
			</Main>
		</Container>
	);
};

export default Index;
