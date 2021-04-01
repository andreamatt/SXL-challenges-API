import { mongoose } from "@typegoose/typegoose";
import { DB_TEST_URL } from "../config";
import { connectDB, createSchema } from "../server";

export let setupError: Error;

beforeAll(async () => {
	try {
		await connectDB(DB_TEST_URL);
		await mongoose.connection.db.dropDatabase();
		await mongoose.connection.close();
		await connectDB(DB_TEST_URL);

		await createSchema();
	} catch (error) {
		setupError = error;
	}
});

afterAll(async () => {
	try {
		await mongoose.connection.close();
	} catch (error) {
		console.error(error);
	}
});
