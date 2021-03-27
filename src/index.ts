// import config

// import { DB_URL, HTTP_PORT, HTTPS_PORT, NODE_ENV } from "./config";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { connect } from "mongoose";
// import { executor } from "./executor";
import * as typegraphql from "type-graphql";
import { DB_URL } from "./config";
import { UserResolver } from "./resolvers/user";

const app = express();

const start = async () => {
	await connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

	const schema = await typegraphql.buildSchema({
		resolvers: [UserResolver],
	});

	const server = new ApolloServer({
		schema,
		// executor: executor(schema),
		playground: true,
	});

	server.applyMiddleware({ app });
	app.listen(4001);

	console.log("Server started");
};

void start();
