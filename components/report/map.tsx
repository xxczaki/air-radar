import React, {useState} from 'react';
import styled from 'styled-components';
import ReactMapGL, {SVGOverlay, SVGRedrawOptions} from 'react-map-gl';

interface Props {
	location: {
		latitude: number;
		longitude: number;
	};
	sensor: {
		latitude: number;
		longitude: number;
	};
	color: string;
}

const MapGL = styled(ReactMapGL)`
	border-radius: var(--radius);
`;

const OpenMap = ({location, sensor, color}: Props): JSX.Element => {
	const [viewport, setViewport] = useState({
		latitude: sensor.latitude ? (location.latitude + sensor.latitude) / 2 : location.latitude,
		longitude: sensor.longitude ? (location.longitude + sensor.longitude) / 2 : location.longitude,
		zoom: 10
	});

	const redraw = ({project}: SVGRedrawOptions) => {
		const [locX, locY] = project([location.longitude, location.latitude]);

		if (sensor.latitude && sensor.longitude) {
			const [senX, senY] = project([sensor.longitude, sensor.latitude]);

			return (
				<>
					<line x1={locX} y1={locY} x2={senX} y2={senY} style={{stroke: '#fff'}}/>
					<circle cx={senX} cy={senY} r={4} fill={color}/>
					<circle cx={locX} cy={locY} r={4} fill="#fff"/>
				</>
			);
		}

		return <circle cx={locX} cy={locY} r={4} fill="#fff"/>;
	};

	return (
		<MapGL
			{...viewport}
			mapStyle="mapbox://styles/mapbox/dark-v10"
			mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
			width="auto"
			height="15rem"
			onViewportChange={viewport => setViewport(viewport)}
		>
			<SVGOverlay redraw={redraw}/>
		</MapGL>
	);
};

export default OpenMap;
