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

const app = express();

export const createSchema = async (): Promise<GraphQLSchema> => typegraphql.buildSchema({
	resolvers: [UserResolver],
});

export const connectDB = async (url: string): Promise<void> => {
	await connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
};

export let server: Server;
export const startServer = async (): Promise<void> => {
	const schema = await createSchema();
	const apolloServer = new ApolloServer({
		schema,
		// executor: executor(schema),
		playground: true,
	});

	apolloServer.applyMiddleware({ app });
	server = app.listen(4001);
};
