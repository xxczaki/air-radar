import {MongoClient, Db} from 'mongodb';

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URI}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const database = async (): Promise<Db> => {
	if (!client.isConnected()) {
		await client.connect();
	}

	const db = client.db(process.env.DB_NAME);

	return db;
};

export default database;
