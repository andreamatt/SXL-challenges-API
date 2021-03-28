import { ClassType, createUnionType } from "type-graphql";
import { UnionTypeConfig } from "type-graphql/dist/decorators/unions";
import { UnionFromClasses } from "type-graphql/dist/helpers/utils";
import { GenericError } from "../entities/Error";


export const createResultType = (resultType: ClassType) => {
	return createUnionType({
		name: (typeof resultType) as string,
		types: () => [resultType, GenericError],
		// resolveType: (value) => {
		// 	if (value.message) {
		// 		return GenericError;
		// 	}
		// 	return resultType;
		// }
	});
};
