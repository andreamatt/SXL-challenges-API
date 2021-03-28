import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User, UserModel } from "../entities/User";
import { UserRegisterResult } from "./user/UserResult";
import { UserRegisterInput } from "./user/UserInput";
import { GenericError } from "../entities/Error";

@Resolver(User)
export class UserResolver {
	@Query(() => [User])
	async users(): Promise<User[]> {
		return await UserModel.find();
	}

	@Mutation(() => UserRegisterResult)
	async UserRegister(
		@Arg("data") { email, nickname, password }: UserRegisterInput
	): Promise<typeof UserRegisterResult> {
		const user = await UserModel.findOne({ email });
		if (user) {
			return new GenericError();
		}
		return new GenericError();
		// return await UserModel.create({
		// 	email,
		// 	nickname,
		// 	password: await hash(password, 12),
		// });
	}
}
