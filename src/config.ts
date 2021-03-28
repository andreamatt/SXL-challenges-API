import * as dotenv from "dotenv";

dotenv.config();

export const DB_URL = process.env["DB_URL"] as string;
export const NODE_ENV = process.env["NODE_ENV"] as string;
export const HTTP_PORT = process.env["HTTP_PORT"] as string;
export const HTTPS_PORT = process.env["HTTPS_PORT"] as string;
export const DB_TEST_URL = process.env["DB_TEST_URL"] as string;
