'use strict';

interface AqiObject {
	level: string;
	description: string;
	color: string;
}

export const analyzeAqi = (aqi: number): AqiObject => {
	if (aqi <= 50) {
		return {
			level: 'Good',
			description: 'Air quality is considered satisfactory, and air pollution poses little or no risk.',
			color: '#4caf50'
		};
	}

	if (aqi >= 51 && aqi <= 100) {
		return {
			level: 'Moderate',
			description: 'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.',
			color: '#ffeb3b'
		};
	}

	if (aqi >= 101 && aqi <= 150) {
		return {
			level: 'Unhealthy for sensitive groups',
			description: 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.',
			color: '#ffc107'
		};
	}

	if (aqi >= 151 && aqi <= 200) {
		return {
			level: 'Unhealthy',
			description: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.',
			color: '#ff9800'
		};
	}

	if (aqi >= 201 && aqi <= 300) {
		return {
			level: 'Very Unhealthy',
			description: 'Health warnings of emergency conditions. The entire population is more likely to be affected.',
			color: '#ff5722'
		};
	}

	if (aqi >= 301 && aqi <= 500) {
		return {
			level: 'Hazardous',
			description: 'Health alert: everyone may experience more serious health effects',
			color: '#c41c00'
		};
	}

	return {
		level: 'Unknown',
		description: 'The air quality is unknown or is out of range.',
		color: '#424242'
	};
};
