import { mongoose } from "@typegoose/typegoose";
import { DB_TEST_URL } from "../config";
import { connectDB } from "../server";


beforeAll(async () => {
	await connectDB(DB_TEST_URL);
	await mongoose.connection.db.dropDatabase();
	await mongoose.connection.close();
	await connectDB(DB_TEST_URL);
});

afterAll(async () => {
	await mongoose.connection.close();
});
