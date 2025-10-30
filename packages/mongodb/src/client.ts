import logger from "@org/logger";
import { type Db, MongoClient } from "mongodb";

let client: MongoClient | undefined;
let db: Db | undefined;

export const connectToDb = async (dbName: string) => {
	client = new MongoClient(process.env.DB_URL!);

	await client.connect();
	db = client.db(dbName);
	logger.info({ dbUrl: process.env.DB_URL! }, "Successfully connected to DB");
};

export const closeDb = async () => {
	if (!client) throw new Error("Client is not connected");

	await client.close();
	logger.info(
		{ dbUrl: process.env.DB_URL! },
		"Successfully closed connection to DB",
	);
};

export const getDb = () => {
	if (db) return db;

	throw new Error("DB is not connected");
};
