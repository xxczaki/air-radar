import {atom, selector} from 'recoil';

export const unit = atom<'km' | 'm' | 'mi'>({
	key: 'unit',
	default: 'km'
});

export const language = atom<'en' | 'pl'>({
	key: 'language',
	default: 'en'
});

export const _reports = atom<string[]>({
	key: 'reports',
	default: []
});

export const updateUnit = selector({
	key: 'updateUnit',
	get: ({get}) => {
		const text = get(unit);

		return text;
	},
	// @ts-expect-error
	set: ({set}, newValue) => set(unit, newValue)
});

export const updateLanguage = selector({
	key: 'updateLanguage',
	get: ({get}) => {
		const text = get(unit);

		return text;
	},
	// @ts-expect-error
	set: ({set}, newValue) => set(language, newValue)
});
