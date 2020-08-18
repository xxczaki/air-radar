import React, {useState, useEffect} from 'react';
import {NextPage} from 'next';
import {AppProps} from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import {RecoilRoot} from 'recoil';
import {createGlobalStyle} from 'styled-components';
import {ToastContainer} from 'react-toastify';
import {SkeletonTheme} from 'react-loading-skeleton';
import debounce from 'lodash.debounce';
import nprogress from 'nprogress';

// TODO: Add `import Container from '../components/container';`. See: https://github.com/vinissimus/next-translate/issues/214#issuecomment-652416113
import {_unit, _language, _index, _reports} from '../lib/recoil-atoms';

// Assets
import 'react-toastify/dist/ReactToastify.min.css';
import 'tippy.js/dist/tippy.css';

interface State {
	unit: 'km' | 'm' | 'mi';
	language: 'pl' | 'en';
	index: 'aqi-us' | 'aqhi' | 'daqi' | 'eaqi' | 'caqi';
	reports: string[];
}

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
		--light-gray: #424242;
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
		background-color: var(--light-gray);
		border-radius: var(--inline-radius);
		color: var(--text);
	}

	.tippy-popper[x-placement^=top] [x-arrow] {
		border-top: 7px solid var(--light-gray);
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

const CustomApp: NextPage<AppProps> = ({Component, pageProps}: AppProps) => {
	const [state, setState] = useState<State | 'Empty' | undefined>(undefined);

	useEffect(() => {
		const previousState = localStorage.getItem('state');

		if (previousState) {
			setState(JSON.parse(previousState));
		} else {
			setState('Empty');
		}
	}, []);

	return (
		<SkeletonTheme color="var(--gray)" highlightColor="#424242">
			<GlobalStyle/>
			<ToastContainer/>
			<Head>
				<title>Air Radar</title>
			</Head>
			{state && (
				<RecoilRoot
					initializeState={({set}) => {
						if (state && typeof state !== 'string') {
							set(_unit, state.unit);
							set(_language, state.language);
							set(_index, state.index);
							set(_reports, state.reports);
						}
					}}
				>
					<Component {...pageProps}/>
				</RecoilRoot>
			)}
		</SkeletonTheme>
	);
};

export default CustomApp;
