// import config

// import { DB_URL, HTTP_PORT, HTTPS_PORT, NODE_ENV } from "./config";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { connect } from "mongoose";
// import { executor } from "./executor";
import * as typegraphql from "type-graphql";
import { Server } from "node:http";
import { GraphQLSchema } from "graphql";
import { UserResolver } from "./resolvers/User";
import { HTTP_PORT } from "./config";

const app = express();

let schema: GraphQLSchema;

export const getSchema = (): GraphQLSchema => {
	return schema;
};

export const createSchema = async (): Promise<void> => {
	schema = await typegraphql.buildSchema({
		resolvers: [UserResolver],
	});
};

export const connectDB = async (url: string): Promise<void> => {
	await connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
};

export let server: Server;
export const startServer = async (): Promise<void> => {
	await createSchema();
	const apolloServer = new ApolloServer({
		schema,
		// executor: executor(schema),
		playground: true,

	});

	apolloServer.applyMiddleware({ app, path: "/api/graphql" });
	server = app.listen(HTTP_PORT);
	console.log("Server listening on port " + HTTP_PORT);
};
