import { mongoose } from "@typegoose/typegoose";
import { ExecutionResult, graphql } from "graphql";
import { Maybe } from "type-graphql";
import { getSchema } from "../server";
import { setupError } from "./setupFile";

interface Options {
	source: string;
	variableValues?: Maybe<{
		[key: string]: unknown;
	}>;
	userId?: number;
}

export const gCall = async ({ source, variableValues }: Options): Promise<ExecutionResult> => {
	const schema = getSchema();
	if (!schema) {
		throw new Error("No schema");
	}
	return await graphql({
		schema,
		source,
		variableValues
	});
};

export const ensureSetup = (): void => {
	if (setupError) {
		throw setupError;
	}
};

export const gqlTest = (name: string, fn: CallableFunction, timeout?: number): void => {
	it(name, async () => {
		ensureSetup();
		await fn();
	}, timeout);
};

