import React from 'react';
import {AppProps} from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import {createGlobalStyle} from 'styled-components';
import {ToastContainer} from 'react-toastify';
import debounce from 'lodash.debounce';
import nprogress from 'nprogress';

import Container from '../components/container';

// Assets
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-tippy/dist/tippy.css';

const GlobalStyle = createGlobalStyle`
	:root {
		--gap-half: 0.5rem;
		--gap: 1rem;
		--gap-double: 2rem;
		--small-gap: 4rem;
		--main-content: 55rem;
		--radius: 8px;
		--inline-radius: 5px;
		--background: #131415;
		--text: #fff;
		--gray: #222;
		--light-gray: #666;
		--header: #131415cc;
		--hover: #2b2d30;
		--selection: hsl(0deg 0% 100% / 99%);
		--vibrancy: saturate(180%) blur(20px);
		--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
		--transition: 0.1s ease-in-out;
		--transition-slow: 0.25s cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
	}

	@font-face {
		font-family: 'Inter';
		font-style: normal;
		font-weight: 400;
		font-display: swap;
		src: local(''),
			url('/fonts/inter-v1-latin-regular.woff2') format('woff2'),
			url('/fonts/inter-v1-latin-regular.woff') format('woff');
	}

	@font-face {
		font-family: 'Inter';
		font-style: normal;
		font-weight: 800;
		font-display: swap;
		src: local(''),
			url('../public/fonts/inter-v1-latin-800.woff2') format('woff2'),
			url('../public/fonts/inter-v1-latin-800.woff') format('woff');
	}

	body {
		align-items: center;
		justify-content: center;
		font-family: var(--font-sans);
		background-color: var(--background);
		color: var(--text);
		font-size: 1.125rem;
		margin-top: -1em;
		-webkit-font-smoothing: antialiased;
		text-rendering: optimizeSpeed;
		overflow-x: hidden;
	}

	#nprogress {
		pointer-events: none;
	}

	#nprogress .bar {
		position: fixed;
		z-index: 2000;
		top: 0;
		left: 0;
		width: 100%;
		height: 5px;
		background: #fafbfc;
	}

	#nprogress::after {
		content: '';
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 5px;
		background: transparent;
	}

	.tippy-tooltip {
		background-color: #424242;
		border-radius: var(--inline-radius);
		color: var(--text);
	}

.tippy-popper[x-placement^=top] [x-arrow] {
  border-top: 7px solid #424242;
}

	::selection {
		text-shadow: none;
		background: var(--selection);
		color: var(--background);
	}
`;

// Only show nprogress after 500ms (slow loading)
const start = debounce(nprogress.start, 500);
Router.events.on('routeChangeStart', start);
Router.events.on('routeChangeComplete', () => {
	start.cancel();
	nprogress.done();
	window.scrollTo(0, 0);
});
Router.events.on('routeChangeError', () => {
	start.cancel();
	nprogress.done();
});

const myApp = ({Component, pageProps}: Readonly<AppProps>): JSX.Element => (
	<>
		<GlobalStyle/>
		<ToastContainer/>
		<Head>
			<title>Air Radar ☁️</title>
		</Head>
		<Container>
			<Component {...pageProps}/>
		</Container>
	</>
);

export default myApp;
