import {
  type GraphQLNamedType,
  type GraphQLType,
  isListType,
  isNonNullType,
} from "graphql";
import { slug } from "github-slugger";
import * as converters from "./converters";

const sluggify = (name: string) => slug(name);

function getBaseType(type: GraphQLType): GraphQLNamedType {
  if (isNonNullType(type)) {
    return getBaseType(type.ofType);
  }

  if (isListType(type)) {
    return getBaseType(type.ofType);
  }

  return type;
}

export function getRelativeTypeUrl(path: string) {
  if (path) {
    return function (type: GraphQLType): string | undefined {
      const baseType = getBaseType(type);
      const convertersList = Object.values(converters);
      const converter = convertersList.find((otherConverter) =>
        otherConverter.matches(baseType)
      );

      if (converter == null) {
        console.warn(
          `Failed to generate a relative URL to type "${baseType.name}"`
        );
        return undefined;
      }

      return `${path}${converter.id}#${sluggify(baseType.name)}`;
    };
  } else {
    return function (type: GraphQLType): string | undefined {
      const baseType = getBaseType(type);
      const convertersList = Object.values(converters);
      const converter = convertersList.find((otherConverter) =>
        otherConverter.matches(baseType)
      );

      if (converter == null) {
        console.warn(
          `Failed to generate a relative URL to type "${baseType.name}"`
        );
        return undefined;
      }

      return `${converter.id}#${sluggify(baseType.name)}`;
    };
  }
}
