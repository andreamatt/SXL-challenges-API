import { User } from "../../entities/User";
import { createResultType } from "../../Utils/typeGenerator";


export const UserRegisterResult = createResultType(User);
