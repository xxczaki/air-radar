import {atom, selector} from 'recoil';

export const unit = atom({
	key: 'unit',
	default: 'km'
});

export const language = atom({
	key: 'language',
	default: 'en'
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
