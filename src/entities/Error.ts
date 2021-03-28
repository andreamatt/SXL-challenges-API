import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class GenericError {
	@Field()
	message!: string;
}
