import * as dotenv from "dotenv";
import * as fs from "fs";

const secretEnvPath = "/run/secrets/ENV";
if (fs.existsSync(secretEnvPath)) {
	console.log("Parsing ENV from secrets");
	dotenv.config({
		path: secretEnvPath
	});
}
else {
	console.log("Parsing ENV from environment");
	dotenv.config();
}

// const getSecret = (name: string): string | undefined => {
// 	try {
// 		return fs.readFileSync(`/run/secrets/${name}`, "utf8");
// 	} catch (err) {
// 		if (err.code !== "ENOENT") {
// 			console.error(`An error occurred while trying to read the secret: ${name}. Err: ${err}`);
// 		}
// 		return undefined;
// 	}
// };

const getEnv = (name: string): string | undefined => {
	return process.env[name];
};

const getConfig = (name: string): string => {
	const value = getEnv(name);
	if (value) {
		return value;
	}

	console.log(`Config ${name} not found`);
	return undefined as unknown as string;
};

export const DB_URL = getConfig("DB_URL");
export const NODE_ENV = getConfig("NODE_ENV");
export const HTTP_PORT = getConfig("HTTP_PORT");
export const HTTPS_PORT = getConfig("HTTPS_PORT");
export const DB_TEST_URL = getConfig("DB_TEST_URL");
