import {toast} from 'react-toastify';

interface Options {
	createError: string;
	locationError: string;
	fetchError: string;
}

export const showError = async (type: 'create' | 'location' | 'fetch', onError: () => void, {createError, locationError, fetchError}: Options): Promise<void> => {
	switch (type) {
		case 'create':
			toast.error(createError, {
				position: 'bottom-right',
				autoClose: 2500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				progress: undefined
			});
			break;
		case 'location':
			toast.error(locationError, {
				position: 'bottom-right',
				autoClose: 2500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				progress: undefined
			});
			break;
		case 'fetch':
			toast.error(fetchError, {
				position: 'bottom-right',
				autoClose: 2500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				progress: undefined
			});
			break;
		default:
			break;
	}

	onError();
};
