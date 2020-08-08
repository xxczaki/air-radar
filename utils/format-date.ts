import {lightFormat} from 'date-fns';

export const formatDate = async (date: Date): Promise<string> => {
	return lightFormat(date, 'HH:mm');
};

