import { GraphQLUnionType } from "graphql";
import type { MarkdownConverterOptions } from "../types";

export function convertUnionToMarkdown(
  union: GraphQLUnionType,
  options: MarkdownConverterOptions
): string {
  const lines: string[] = [];

  lines.push(`## ${union.name}`, `\n\n`);
  lines.push(union.description || "", `\n\n`);

  lines.push(
    `<p style={{ marginBottom: "0.4em" }}><strong>Possible types</strong></p>`,
    `\n\n`
  );
  union.getTypes().forEach((type) => {
    const typeUrl = options.getTypePath(type);
    lines.push(
      typeUrl ? `- [${type.name}](${typeUrl})` : `- ${type.name}`,
      `\n`
    );
  });
  lines.push(`\n`);

  return lines.join("");
}
