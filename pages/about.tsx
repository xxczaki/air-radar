import React from 'react';
import {NextPage} from 'next';
import {SimpleImg} from 'react-simple-img';

import Heading from '../components/heading';
import Main from '../components/main';
import ExtLink from '../components/extlink';
import Skills from '../components/skills';
import Social from '../components/social';

import imageSrc from '../public/images/me.jpg';
import imagePlaceholder from '../public/images/me-placeholder.svg';

const Index: NextPage<unknown> = () => {
	return (
		<Main>
			<SimpleImg
				src={imageSrc}
				placeholder={imagePlaceholder}
				// @ts-ignore
				draggable={false}
				alt="Me"
				width="15em"
				height="15em"
				importance="high"
				imgStyle={{borderRadius: '20px'}}
				style={{paddingTop: '12em'}}
			/>
			<Heading belowImg>Hi, my name is Antoni.</Heading>
			<p>
				I&apos;m a 17 years old developer, currently based near Poznań, Poland.
				Since late 2019 I&apos;m helping maintain <ExtLink href="https://github.com/node-fetch/node-fetch">node-fetch</ExtLink>, a lightweight library, which brings window.fetch API to Node.js.
				I also maintain a collection of my own open source projects.
				When it comes to offline activities, I hugely enjoy travelling, riding a bike and listening to music.
			</p>
			<p>Here are a few technologies I&apos;ve been working with recently:</p>
			<Skills/>
			<p>Connect with me:</p>
			<Social/>
		</Main>
	);
};

export default Index;
