import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class GenericError {
	@Field()
	message: string;

	constructor(message: string) {
		this.message = message;
	}
}
