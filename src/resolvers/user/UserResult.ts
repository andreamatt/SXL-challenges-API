import { ObjectType } from "type-graphql";
import { createUnion } from "../../entities/Base";
import { GenericError } from "../../entities/Error";
import { User } from "../../entities/User";

@ObjectType()
export class UserAlreadyRegistered extends GenericError {
	constructor() {
		super("User already registered");
	}

	public get mytypename(): string {
		return UserAlreadyRegistered.name;
	}
}

export const UserRegisterResult = createUnion([User, UserAlreadyRegistered]);
