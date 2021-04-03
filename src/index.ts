import { DB_URL } from "./config";
import { connectDB, startServer } from "./server";

connectDB(DB_URL).then(startServer).then(() => {
	console.log("App started");
}).catch(err => {
	console.error(err);
});
