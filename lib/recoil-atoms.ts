import {atom} from 'recoil';

export const _unit = atom<'km' | 'm' | 'mi'>({
	key: 'unit',
	default: 'km'
});

export const _language = atom<'en' | 'pl'>({
	key: 'language',
	default: 'en'
});

export const _reports = atom<Array<{id: string; key?: string}>>({
	key: 'reports',
	default: []
});
