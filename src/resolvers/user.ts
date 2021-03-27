import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { hash } from "bcrypt";
import { UserAlreadyRegistered } from "../entities/Error";
import { User, UserModel } from "../entities/User";
import { UserRegisterResult } from "./user/UserResult";
import { UserRegisterInput } from "./user/UserInput";

@Resolver(User)
export class UserResolver {
	@Query(() => [User])
	async users(): Promise<User[]> {
		return await UserModel.find();
	}

	@Mutation(() => UserRegisterResult)
	async UserRegister(
		@Arg("data") { email, nickname, password }: UserRegisterInput
	): Promise<User | UserAlreadyRegistered> {
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
