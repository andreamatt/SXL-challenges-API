import { DB_TEST_URL } from "./config";
import { connectDB } from "./server";
import { gCall } from "./tests/testUtils";

const users = `
{
	users{
		email
	}
}
`;

connectDB(DB_TEST_URL)
	.then(async () => console.log(await gCall({ source: users })))
	.then(() => {
		console.log("ASD");
	})
	.catch(err => {
		console.error(err);
	});
