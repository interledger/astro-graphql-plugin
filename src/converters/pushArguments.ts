import { GraphQLArgument, GraphQLInputField } from "graphql";
import type { MarkdownConverterOptions } from "../types";
import { escapeSpecialCharacters, parseMarkdown } from "./parseMarkdown";

export function pushArguments(
  lines: string[],
  args: readonly GraphQLArgument[] | GraphQLInputField[],
  options: MarkdownConverterOptions
): void {
  lines.push(
    `<p style={{ marginBottom: "0.4em" }}><strong>Arguments</strong></p>`,
    `\n\n`
  );

  lines.push(`<table>`, `\n`);
  lines.push(`<thead><tr><th>Name</th><th>Description</th></tr></thead>`, `\n`);
  lines.push(`<tbody>`, `\n`);

  args.forEach((arg) => {
    lines.push(`<tr>`, `\n`);
    const typeUrl = options.getTypePath(arg.type);
    lines.push(
      `<td>`,
      `\n`,
      `${arg.name}`,
      `<br />\n`,
      typeUrl
        ? `<a href="${typeUrl}"><code>${arg.type.toJSON()}</code></a>`
        : `<code>${arg.type.toJSON()}</code>`,
      `\n`,
      `</td>`,
      `\n`
    );

    lines.push(`<td>`, `\n`);

    if (arg.deprecationReason) {
      lines.push(
        `<blockquote>Deprecated: ${escapeSpecialCharacters(
          arg.deprecationReason
        )}</blockquote>`,
        `\n\n`
      );
    }

    lines.push(parseMarkdown(arg.description || ""), `\n`);

    lines.push(`</td>`, `\n`);

    lines.push(`</tr>`, `\n`);
  });

  lines.push(`</tbody>`, `\n`);
  lines.push(`</table>`, `\n\n`);
}
