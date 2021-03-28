import { mongoose } from "@typegoose/typegoose";
import { DB_TEST_URL } from "../config";
import { connectDB, createSchema } from "../server";

let firstTime = true;

beforeAll(async () => {
	await connectDB(DB_TEST_URL);
	await mongoose.connection.db.dropDatabase();
	await mongoose.connection.close();
	await connectDB(DB_TEST_URL);

	if (firstTime) {
		firstTime = false;
		await createSchema();
	}
});

afterAll(async () => {
	await mongoose.connection.close();
});
