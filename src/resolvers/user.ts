import { IsEmail, Length } from "class-validator";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { User, UserModel } from "../entities/user";
import { hash } from "bcrypt";

@InputType()
class UserRegisterInput {
	@Field()
	@IsEmail()
	email!: string;

	@Field()
	@Length(1, 30)
	nickname!: string;

	@Field()
	password!: string;
}

@Resolver(User)
export class UserResolver {
	@Query(() => [User])
	async users(): Promise<User[]> {
		return await UserModel.find();
	}

	@Mutation(() => User)
	async UserRegister(
		@Arg("data") { email, nickname, password }: UserRegisterInput
	): Promise<User> {
		return await UserModel.create({
			email,
			nickname,
			password: await hash(password, 12),
		});
	}
}
