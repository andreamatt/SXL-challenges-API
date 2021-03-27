import { Field, ObjectType } from "type-graphql";

@ObjectType()
abstract class GenericError {
	@Field()
	message!: string;
}

@ObjectType()
export class UserAlreadyRegistered extends GenericError {
	constructor() {
		super();
		this.message = "User already registered";
	}
}
