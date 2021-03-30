import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { UserAlreadyRegistered, UserRegisterResult } from "./user/UserResult";
import { UserRegisterInput } from "./user/UserInput";
import { hash } from "bcrypt";
import { User, UserModel } from "../entities/User";

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
		let user = await UserModel.findOne({ email });
		if (user) {
			return new UserAlreadyRegistered();
		}


		user = await UserModel.create({
			email,
			nickname,
			password: await hash(password, 12),
		});
		console.dir(user);

		return user;
	}
}
