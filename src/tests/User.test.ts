import faker from "faker";
import _ from "lodash";
import { gCall, gqlTest } from "../TestUtils/testUtils";

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
		nickname
	}
}
`;

describe("testing user", () => {
	const user = {
		email: faker.internet.email(),
		nickname: faker.internet.userName(),
		password: faker.internet.password()
	};

	gqlTest("user register", async () => {
		const result = await gCall({
			source: userRegister,
			variableValues: {
				data: user
			}
		});

		expect(result).toMatchObject({
			data: {
				UserRegister: {
					__typename: "User",
					..._.omit(user, "password")
				}
			}
		});
	});

	gqlTest("user register error", async () => {
		const result = await gCall({
			source: userRegister,
			variableValues: {
				data: user
			}
		});

		expect(result).toMatchObject({
			data: {
				UserRegister: {
					__typename: "UserAlreadyRegistered"
				}
			}
		});
	});

	gqlTest("user list", async () => {
		// const result = await gCall({ source: users });
		const result = await gCall({
			source: users
		});

		expect(result).toMatchObject({
			data: {
				users: [
					{
						..._.omit(user, "password")
					}
				]
			}
		});
	});
});
