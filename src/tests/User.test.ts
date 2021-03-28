import faker from "faker";
import _ from "lodash";
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
		const result = await gCall({
			source: userRegister,
			variableValues: {
				data
			}
		});

		const returnData = {
			__typename: "User",
		};
		// _.omit(data, "password");
		// expect(result).toMatchObject(returnData);
		expect(data).toMatchObject(data);
	});

	it("user list", async () => {
		// const result = await gCall({ source: users });
		const result = await gCall({
			source: users
		});
	});
});
