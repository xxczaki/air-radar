declare module 'next-translate/useTranslation' {
	export default function useTranslation(): {
		t: (key: string, query?: {[name: string]: string | number}) => string;
		lang: string;
	};
}

declare module 'next-translate/Router' {
	type RouterAdditions = {
		replaceI18n: (path: string, as?: string, options?: unknown) => Promise<void>;
	};
	export type Router = import('next/router').SingletonRouter & RouterAdditions;
	declare const _default: Router;
	export default _default;
}

declare module 'next-translate/Link' {
	type NextLink = import('next/link');
	declare const _default: NextLink;
	export default _default;
}
