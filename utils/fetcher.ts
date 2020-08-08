'use strict';

import Airly from 'airly';
import LatLon from 'geodesy/latlon-ellipsoidal-vincenty';
import {Except} from 'type-fest';

import {analyzeAqi} from './analyze-aqi';
import {formatDate} from './format-date';

const airly = new Airly(process.env.NEXT_PUBLIC_AIRLY_KEY ?? '');

interface Data {
	values: Array<{name: string; value: number}>;
	indexes: Array<Partial<{
		name: string;
		value: number;
		level: string;
		description: string;
		advice: string;
		color: string;
	}>>;
	standards: Array<Partial<{
		name: string;
		pollutant: string;
		limit: number;
		percent: number;
		averaging: string;
	}>>;
	time: string;
}
export interface Response {
	id: string;
	date: string;
	coords: {
		latitude: number;
		longitude: number;
	};
	current: Data;
	forecast?: Data[];
	sensor: Partial<{
		latitude: number;
		longitude: number;
		provider: string;
		attributions: Array<Partial<{
			url: string;
			name: string;
			logo: string;
		}>>;
		distance: number | 'N/A';
	}>;
}

export const fetcher = async (latitude?: string, longitude?: string): Promise<Except<Response, 'id' | 'date'> | null> => {
	if (latitude && longitude) {
		const lat = Number.parseFloat(latitude);
		const lng = Number.parseFloat(longitude);

		if (Number.isNaN(lat) || Number.isNaN(lng)) {
			return null;
		}

		const data = await airly.pointMeasurements(lat, lng);

		if (data?.current?.values?.length === 0) {
			const response = await fetch(`https://api.waqi.info/feed/geo:${lat};${lng}/?token=${process.env.NEXT_PUBLIC_WAQI_TOKEN}`);
			const data = await response.json();

			// Current
			const pollutants = Object.keys(data.data.iaqi);
			const vals: Array<{v: number}> = Object.values(data.data.iaqi);
			const aqiDescription = analyzeAqi(data.data.aqi);
			const names: {[name: string]: string} = {
				pm25: 'PM2.5',
				pm10: 'PM10',
				o3: 'O₃',
				no2: 'NO₂',
				so2: 'SO₂',
				co: 'CO'
			};

			const values = pollutants.map((name: string, index) => {
				return {name: names[name], value: vals[index].v};
			}).filter(element => element.name);
			const indexes = [{
				name: 'AQI',
				value: data.data.aqi,
				level: aqiDescription.level,
				description: aqiDescription.description,
				advice: aqiDescription.advice,
				color: aqiDescription.color
			}];

			const sensorCoords = {
				latitude: data.data.city.geo[0] as number,
				longitude: data.data.city.geo[1] as number
			};

			const location = new LatLon(lat, lng);
			const _sensor = new LatLon(sensorCoords.latitude, sensorCoords.longitude);

			const sensor = {
				latitude: sensorCoords.latitude,
				longitude: sensorCoords.longitude,
				provider: 'waqi',
				attributions: data.data.attributions,
				distance: location.distanceTo(_sensor)
			};

			return {
				coords: {
					latitude: lat,
					longitude: lng
				},
				current: {
					values,
					indexes,
					standards: [],
					time: await formatDate(data.data.time.s)
				},
				sensor
			};
		}

		const names: {[name: string]: string} = {
			PM1: 'PM1',
			PM25: 'PM2.5',
			PM10: 'PM10',
			NO2: 'NO₂',
			O3: 'O₃',
			SO2: 'SO₂',
			CO: 'CO',
			H2S: 'H₂S',
			NO: 'NO'
		};

		return {
			coords: {
				latitude: lat,
				longitude: lng
			},
			current: {
				...data.current,
				values: data.current.values.filter((element: {name: string; value: number}) => names[element.name]).map((element: {name: string; value: number}) => {
					return {name: names[element.name], value: element.value};
				}),
				time: await formatDate(data.current.fromDateTime)
			},
			sensor: {
				provider: 'airly',
				distance: 'N/A'
			}
		};
	}

	return null;
};
