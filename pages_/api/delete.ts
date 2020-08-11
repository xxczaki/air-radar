import {NextApiRequest, NextApiResponse} from 'next';
import corsMiddleware from 'cors';

import {initMiddleware} from '../../lib/init-middleware';
import client from '../../middlewares/db';

type Data = {
	message: string;
};

const cors = initMiddleware(
	corsMiddleware({
		methods: ['POST']
	})
);

const createReport = async (request: NextApiRequest, response: NextApiResponse<Data>): Promise<void> => {
	try {
		await cors(request, response);

		await client.connect();

		const db = client.db(process.env.DB_NAME);

		await db.collection(process.env.DB_COLLECTION ?? '').deleteOne({_id: request.body});

		response.status(201).json({message: 'OK'});
	} catch {
		response.status(500).json({message: 'Failed deleting a report. Please check the database status.'});
	}
};

export default createReport;
