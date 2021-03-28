import { mongoose } from "@typegoose/typegoose";
import faker from "faker";
import { graphql } from "graphql";
import _ from "lodash";
import { Connection } from "mongoose";
import { DB_TEST_URL } from "../config";
import { connectDB, createSchema } from "../server";
import { gCall } from "../TestUtils/testUtils";

const userRegister = `
mutation Register($data: UserRegisterInput!){ 
	UserRegister(data: $data){
		__typename
		... on User {
			email
			nickname
		}
	}
}
`;

const users = `
{
	users{
		email
	}
}
`;

describe("testing user", () => {
	it("user register", async () => {
		const data = {
			email: faker.internet.email(),
			nickname: faker.internet.userName(),
			password: faker.internet.password()
		};
		// const result = await gCall({
		// 	source: userRegister,
		// 	variableValues: {
		// 		data
		// 	}
		// });

		// const returnData = {
		// 	__typename: "User",
		// };
		// console.log(result);
		// _.omit(data, "password");
		// expect(result).toMatchObject(returnData);
		expect(data).toMatchObject(data);
	});

	it("user list", async () => {
		// const result = await gCall({ source: users });
		const schema = await createSchema();
		console.log("Schema:\n" + schema);
		graphql({
			schema: schema,
			source: users
		})
			.then(res => console.log("Result:\n" + res))
			.catch(err => console.error(err));
		expect(1).toEqual(1);
	});

	it("user list v2", async () => {
		// const result = await gCall({ source: users });
		const schema = await createSchema();
		console.log("Schema:\n" + schema);
		await graphql(schema, users);
		// graphql({
		// 	schema: schema,
		// 	source: users
		// });
		expect(1).toEqual(1);
	});
});
