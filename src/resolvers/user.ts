import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User, UserModel } from "../entities/User";
import { UserAlreadyRegistered, UserRegisterResult } from "./user/UserResult";
import { UserRegisterInput } from "./user/UserInput";
import { hash } from "bcrypt";

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
			return new UserAlreadyRegistered();
		}

		return await UserModel.create({
			email,
			nickname,
			password: await hash(password, 12),
		});
	}
}
