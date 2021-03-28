import { ObjectType } from "type-graphql";
import { User } from "../../entities/User";
import { createResultType } from "../../Utils/typeGenerator";


// export const UserRegisterResult = createResultType(User);
@ObjectType()
export class UserRegisterResult extends createResultType(User) {
}
