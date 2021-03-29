import { createUnionType, ObjectType } from "type-graphql";
import { GenericError } from "../../entities/Error";
import { User } from "../../entities/User";

@ObjectType()
export class UserAlreadyRegistered extends GenericError {
	constructor() {
		super("User already registered");
	}
}

const UserRegisterResultTypes = [User, UserAlreadyRegistered];
export const UserRegisterResult = createUnionType({
	name: "UserRegisterResult",
	types: () => UserRegisterResultTypes,
	resolveType: value => {
		return UserRegisterResultTypes.find(t => value instanceof t) ?? User;
	}
});
