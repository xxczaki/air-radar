import {toast} from 'react-toastify';

interface Options {
	createError: string;
	locationError: string;
}

export const showError = async (type: 'create' | 'location', onError: () => void, {createError, locationError}: Options): Promise<void> => {
	if (type === 'create') {
		toast.error(createError, {
			position: 'bottom-right',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			progress: undefined
		});
	} else {
		toast.error(locationError, {
			position: 'bottom-right',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			progress: undefined
		});
	}

	onError();
};
