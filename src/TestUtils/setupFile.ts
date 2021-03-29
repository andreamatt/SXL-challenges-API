import { mongoose } from "@typegoose/typegoose";
import { DB_TEST_URL } from "../config";
import { connectDB, createSchema } from "../server";

beforeAll(async () => {
	await connectDB(DB_TEST_URL);
	try {
		await mongoose.connection.db.dropDatabase();
		// eslint-disable-next-line no-empty
	} catch (error) {
	}
	await mongoose.connection.close();
	await connectDB(DB_TEST_URL);

	await createSchema();
});

afterAll(async () => {
	await mongoose.connection.close();
});
