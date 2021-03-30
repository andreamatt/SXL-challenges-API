import { ClassType } from "type-graphql";
import { createUnionType } from "type-graphql/dist/decorators/unions";
import { UnionFromClasses } from "type-graphql/dist/helpers/utils";

export function createUnion<T extends ClassType<UnionElement>[]>(types: T): UnionFromClasses<T> {
	const resultType = createUnionType({
		name: types.map(t => t.name).join("_"),
		types: () => types,
		resolveType: value => {
			return types.find(t => value.mytypename == t.name) ?? undefined;
		}
	});
	return resultType;
}

interface UnionElement {
	mytypename: string
}
