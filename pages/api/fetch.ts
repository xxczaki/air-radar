import {NextApiRequest, NextApiResponse} from 'next';

import client from '../../middlewares/db';

type Data = {
	report: string;
};

const fetchDocuments = async (request: NextApiRequest, response: NextApiResponse<Data | {message: string}>): Promise<void> => {
	if (request.method === 'POST') {
		try {
			await client.connect();

			const db = client.db(process.env.DB_NAME);

			// MongoDB `find` !== Array.find
			// eslint-disable-next-line unicorn/no-fn-reference-in-iterator
			response.status(200).json({report: JSON.stringify(await db.collection(process.env.DB_COLLECTION ?? '').find({id: request.body}).toArray())});
		} catch {
			response.status(500).json({message: 'Failed fetching report. Please check the database status.'});
		}
	}
};

export default fetchDocuments;
