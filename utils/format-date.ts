export const formatDate = async (date: Date): Promise<string> => {
	try {
		const native = new Date(date).toLocaleTimeString('en', {hour: '2-digit', minute: '2-digit', hour12: false});

		if (native === 'Invalid Date') {
			const {lightFormat} = await import('date-fns');

			return lightFormat(date, 'HH:mm');
		}

		return native;
	} catch {
		const {lightFormat} = await import('date-fns');

		return lightFormat(date, 'HH:mm');
	}
};

