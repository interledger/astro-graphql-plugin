import path from "path";
import fse from "fs-extra";

import type { AstroIntegration } from "astro";

import { loadSchema } from "@graphql-tools/load";
import { UrlLoader } from "@graphql-tools/url-loader";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { JsonFileLoader } from "@graphql-tools/json-file-loader";
import * as converters from "./converters";
import { getRelativeTypeUrl } from "./getRelativeTypeUrl";

export default function GraphQL(options: {
  schema: string,
  output: string,
  linkPrefix: string,
}): AstroIntegration {
  // See the Integration API docs for full details
  // https://docs.astro.build/en/reference/integrations-reference/
  return {
    name: "astro-graphql-plugin",
    hooks: {
      "astro:config:setup": async ({ command }) => {
        // Ignore when running in preview mode.
        if (command === 'preview') return
        const schema = await loadSchema(options.schema, {
          loaders: [
            new UrlLoader(),
            new GraphQLFileLoader(),
            new JsonFileLoader(),
          ],
        });

        const outputPath = path.join(options.output);

        const convertersList = Object.values(converters);
        for (let index = 0; index < convertersList.length; index++) {
          const converter = convertersList[index];
          const markdown = converter.convertToMarkdown(schema, {
            getTypePath: getRelativeTypeUrl(options.linkPrefix),
          });

          if (!markdown) {
            // do not create an empty file
            continue;
          }

          await fse.outputFile(
            path.join(outputPath, `${converter.id}.md`),
            [
              `---`,
              `title: ${converter.title}`,
              `---`,
              ``,
              `<!-- Do not edit this file, it has been automatically generated by astro-graphql-plugin -->`,
              ``,
              markdown,
            ].join(`\n`)
          );
        }
      },
    },
  };
}
