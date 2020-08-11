import {atom} from 'recoil';

// Unit used when showing the distance between sensor and location
export const _unit = atom<'km' | 'm' | 'mi'>({
	key: 'unit',
	default: 'km'
});

// Site language
export const _language = atom<'en' | 'pl'>({
	key: 'language',
	default: 'en'
});

// Preferred air quality index
export const _index = atom<'aqi-us' | 'aqhi' | 'daqi' | 'eaqi' | 'caqi'>({
	key: 'index',
	default: 'aqi-us'
});

// Reports created in this browser
export const _reports = atom<Array<{id: string; key?: string}>>({
	key: 'reports',
	default: []
});
