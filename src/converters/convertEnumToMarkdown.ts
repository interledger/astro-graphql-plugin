import { GraphQLEnumType } from "graphql";
import type { MarkdownConverterOptions } from "../types";
import { escapeSpecialCharacters, parseMarkdown } from "./parseMarkdown";

export function convertEnumToMarkdown(
  enm: GraphQLEnumType,
  _: MarkdownConverterOptions
): string {
  const lines: string[] = [];

  lines.push(`## ${enm.name}`, `\n\n`);
  lines.push(enm.description || "", `\n\n`);

  lines.push(
    `<p style={{ marginBottom: "0.4em" }}><strong>Values</strong></p>`,
    `\n\n`
  );

  lines.push(`<table>`, `\n`);
  lines.push(
    `<thead><tr><th>Value</th><th>Description</th></tr></thead>`,
    `\n`
  );
  lines.push(`<tbody>`, `\n`);

  enm.getValues().forEach((value) => {
    lines.push(`<tr>`, `\n`);
    lines.push(`<td>${value.value}</td>`, `\n`);

    lines.push(`<td>`, `\n`);

    if (value.deprecationReason) {
      lines.push(
        `<blockquote>Deprecated: ${escapeSpecialCharacters(
          value.deprecationReason
        )}</blockquote>`,
        `\n`
      );
    }

    lines.push(parseMarkdown(value.description || ""), `\n`);
    lines.push(`</td>`, `\n`);

    lines.push(`</tr>`, `\n`);
  });

  lines.push(`</tbody>`, `\n`);
  lines.push(`</table>`, `\n\n`);

  return lines.join("");
}
