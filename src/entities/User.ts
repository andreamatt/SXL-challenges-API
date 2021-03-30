import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class User {
	@Field(() => ID)
	readonly _id!: ObjectId;

	@Field()
	@Property({ required: true, unique: true })
	email!: string;

	@Field({ nullable: true })
	@Property()
	nickname!: string;

	@Property({ required: true })
	password!: string;

	public get mytypename(): string {
		return User.name;
	}
}

export const UserModel = getModelForClass(User);
