import {NextApiRequest, NextApiResponse} from 'next';

import client from '../../middlewares/db';

type Data = {
	message: string;
};

const createReport = async (request: NextApiRequest, response: NextApiResponse<Data>): Promise<void> => {
	if (request.method === 'POST') {
		try {
			const {name, content, owner, key} = JSON.parse(request.body);

			await client.connect();

			const db = client.db(process.env.DB_NAME);
			await db.collection(process.env.DB_COLLECTION ?? '').insertOne({name, content, owner, key});

			response.status(201).json({message: 'OK'});
		} catch {
			response.status(500).json({message: 'Failed creating a new report. Please check the database status.'});
		}
	}
};

export default createReport;
