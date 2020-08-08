export const formatDate = async (date: string): Promise<string> => {
	try {
		const native = new Date(date).toLocaleTimeString('en', {hour: '2-digit', minute: '2-digit', hour12: false});

		if (native === 'Invalid Date') {
			const {parseISO, lightFormat} = await import('date-fns');

			return lightFormat(parseISO(date), 'HH:mm');
		}

		return native;
	} catch {
		const {parseISO, lightFormat} = await import('date-fns');

		return lightFormat(parseISO(date), 'HH:mm');
	}
};

