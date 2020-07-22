'use strict';

export const humanizeLevel = (level: string): string => {
	const levels: {[name: string]: string} = {
		VERY_LOW: "Very Low",
		LOW: 'Low',
		MEDIUM: "Medium",
		HIGH: 'High',
		VERY_HIGH: 'Very High',
		EXTREME: 'Extreme',
		AIRMAGEDDON: 'Airmageddon!'
	};

	return levels[level];
};
