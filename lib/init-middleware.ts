import {NextApiRequest, NextApiResponse} from 'next';

export const initMiddleware = (middleware: any) => {
	return async (request: NextApiRequest, response: NextApiResponse) =>
		new Promise((resolve, reject) => {
			middleware(request, response, (result: any) => {
				if (result instanceof Error) {
					return reject(result);
				}

				return resolve(result);
			});
		});
};
