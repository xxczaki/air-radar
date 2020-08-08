'use strict';

interface Options {
	veryLow: string;
	low: string;
	medium: string;
	high: string;
	veryHigh: string;
	extreme: string;
}

export const humanizeLevel = (level: string, options: Options): string => {
	const levels: {[name: string]: string} = {
		VERY_LOW: options.veryLow,
		LOW: options.low,
		MEDIUM: options.medium,
		HIGH: options.high,
		VERY_HIGH: options.veryHigh,
		EXTREME: options.extreme,
		AIRMAGEDDON: 'Airmageddon!'
	};

	return levels[level];
};
