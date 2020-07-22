interface PartialResponse {
	coords: {
		latitude: number;
		longitude: number;
	};
	timestamp: number;
}

export const getPosition = async (): Promise<PartialResponse> => {
	return new Promise(((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject, {enableHighAccuracy: true});
	}));
};
