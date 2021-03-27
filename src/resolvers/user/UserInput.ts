import { IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UserRegisterInput {
	@Field()
	@IsEmail()
	email!: string;

	@Field()
	@Length(1, 30)
	nickname!: string;

	@Field()
	password!: string;
}
