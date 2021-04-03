import * as dotenv from "dotenv";
import * as fs from "fs";

dotenv.config();

const getSecret = (name: string): string | undefined => {
	try {
		return fs.readFileSync(`/run/secrets/${name}`, "utf8");
	} catch (err) {
		if (err.code !== "ENOENT") {
			console.error(`An error occurred while trying to read the secret: ${name}. Err: ${err}`);
		} else {
			console.debug(`Could not find the secret, probably not running in swarm mode: ${name}. Err: ${err}`);
		}
		return undefined;
	}
};

const getEnv = (name: string): string | undefined => {
	return process.env[name];
};

const getConfig = (name: string): string | undefined => {
	return getSecret(name) ?? getEnv(name);
};

export const DB_URL = getConfig("DB_URL");
export const NODE_ENV = getConfig("NODE_ENV");
export const HTTP_PORT = getConfig("HTTP_PORT");
export const HTTPS_PORT = getConfig("HTTPS_PORT");
export const DB_TEST_URL = getConfig("DB_TEST_URL");
