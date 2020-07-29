'use strict';

export const convert = (value: number, unit: string): string | undefined => {
	switch (unit) {
		case 'km':
			return `${(value / 1000).toFixed(1)} km`;
		case 'm':
			return `${(value).toFixed(1)} m`;
		case 'mi':
			return `${(value * 0.000621371192).toFixed(1)} mi`;
		default:
			break;
	}
};
