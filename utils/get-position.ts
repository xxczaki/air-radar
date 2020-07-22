interface PartialResponse {
	coords: {
		latitude: number;
		longitude: number;
	}
	timestamp: number;
}

export const getPosition = (): Promise<PartialResponse> => {
	return new Promise(((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject, {enableHighAccuracy: true});
	}));
};
