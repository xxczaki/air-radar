import React from 'react';
import {NextPage} from 'next';
import dynamic from 'next/dynamic';
import Link from 'next-translate/Link';
import useTranslation from 'next-translate/useTranslation';
import {useRecoilState} from 'recoil';

import Container from '../../components/container';
import Main from '../../components/main';
import Divider from '../../components/divider';
import {_reports} from '../../lib/recoil-atoms';

import viewIcon from '../../public/images/open-outline.svg';
import deleteIcon from '../../public/images/trash-outline.svg';
import lockIcon from '../../public/images/lock-closed.svg';

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

const Index: NextPage<unknown> = () => {
	const {lang} = useTranslation();
	const [reports, setReports] = useRecoilState(_reports);

	return (
		<Container>
			<Main>
				<h1>History</h1>
				<p>Previously generated reports will appear below on this page.</p>
				<Divider/>
				{reports.length === 0 ? <Info>No reports found.</Info> : (
					<Wrapper>
						{reports.map((element, index) => (
							<Box key={element.id}>
								<b>{index + 1}.</b>
								<ButtonBox>
									<Link href={`/reports/${element.id}#key=${element.key}`} lang={lang}>
										<a>
											<Button view>
												<Icon src={viewIcon} loading="lazy" decoding="async" alt="Icon"/>
												View
											</Button>
										</a>
									</Link>
									<Button onClick={() => setReports(reports.filter(report => report.id !== element.id))}>
										<Icon src={deleteIcon} loading="lazy" decoding="async" alt="Icon"/>
										Delete
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
