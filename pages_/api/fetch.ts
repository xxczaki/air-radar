import {NextApiRequest, NextApiResponse} from 'next';
import corsMiddleware from 'cors';

import {initMiddleware} from '../../lib/init-middleware';
import client from '../../middlewares/db';

type Data = {
	report: string;
};

const cors = initMiddleware(
	corsMiddleware({
		methods: ['POST']
	})
);

const fetchDocuments = async (request: NextApiRequest, response: NextApiResponse<Data | {message: string}>): Promise<void> => {
	try {
		await cors(request, response);

		await client.connect();

		const db = client.db(process.env.DB_NAME);

		if (request.body) {
			response.status(200).json({report: JSON.stringify(await db.collection(process.env.DB_COLLECTION ?? '').find({_id: request.body}).toArray())});
		} else {
			response.status(200).json({report: JSON.stringify(await db.collection(process.env.DB_COLLECTION ?? '').find().toArray())});
		}
	} catch {
		response.status(500).json({message: 'Failed fetching report. Please check the database status.'});
	}
};

export default fetchDocuments;
