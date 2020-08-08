export const formatDate = async (date: Date): Promise<string> => {
	try {
		const native = new Date(date).toLocaleTimeString('en', {hour: '2-digit', minute: '2-digit', hour12: false});

		return native;
	} catch {
		const {lightFormat} = await import('date-fns');

		return lightFormat(date, 'HH:mm');
	}
};

