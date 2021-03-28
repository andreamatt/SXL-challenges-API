import { ExecutionResult, graphql } from "graphql";
import { Maybe } from "type-graphql";
import { schema } from "../server";

interface Options {
	source: string;
	variableValues?: Maybe<{
		[key: string]: unknown;
	}>;
	userId?: number;
}

export const gCall = async ({ source, variableValues }: Options): Promise<ExecutionResult> => {
	if (!schema) {
		console.log("NO SCHEMA");
	}
	return await graphql({
		schema,
		source,
		variableValues
	});
};


