import { mongoose } from "@typegoose/typegoose";
import { buildSchema, ExecutionResult, graphql, GraphQLSchema } from "graphql";
import { Maybe } from "type-graphql";
import { DB_TEST_URL } from "../config";
import { connectDB, createSchema } from "../server";

interface Options {
	source: string;
	variableValues?: Maybe<{
		[key: string]: unknown;
	}>;
	userId?: number;
}

let schema: GraphQLSchema;

export const gCall = async ({ source, variableValues }: Options): Promise<ExecutionResult> => {
	if (!schema) {
		schema = await createSchema();
	}
	console.log("Schema:\n" + schema);
	const result = await graphql({
		schema,
		source,
		variableValues
	});
	console.log("Result inside:" + result);
	return result;
};


