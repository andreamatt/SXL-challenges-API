import { ClassType, createUnionType, Field, ObjectType } from "type-graphql";
import { UnionTypeConfig } from "type-graphql/dist/decorators/unions";
import { UnionFromClasses } from "type-graphql/dist/helpers/utils";
import { GenericError } from "../entities/Error";


// export const createResultType = (resultType: ClassType) => {
// 	return createUnionType({
// 		name: (typeof resultType) as string,
// 		types: () => [resultType, GenericError],
// 		// resolveType: (value) => {
// 		// 	if (value.message) {
// 		// 		return GenericError;
// 		// 	}
// 		// 	return resultType;
// 		// }
// 	});
// };

export function createResultType<TItem>(TItemClass: ClassType<TItem>) {
	@ObjectType(`${TItemClass.name}Result`, { isAbstract: true })
	abstract class ResultClass {
		@Field(() => TItemClass, { nullable: true })
		result?: TItem;

		@Field(() => GenericError, { nullable: true })
		error?: GenericError;

		constructor(result?: TItem, error?: GenericError) {
			this.result = result;
			this.error = error;
		}
	}
	return ResultClass;
}
