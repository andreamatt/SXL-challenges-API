import { createUnionType } from "type-graphql";
import { UserAlreadyRegistered } from "../../entities/Error";
import { User } from "../../entities/User";


export const UserRegisterResult = createUnionType({
	name: "UserRegisterResult",
	types: () => [User, UserAlreadyRegistered]
});
