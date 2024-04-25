# astro-graphql-plugin

Astro plugin generating Markdown documentation from a GraphQL schema. This plugin is modified off the [docusaurus-graphql-plugin](https://github.com/zhouzi/docusaurus-graphql-plugin) by [Gabin Aureche](https://github.com/zhouzi). If, for some reason, you need to check commits before version 0.2.0, please see the [git history of the previous version](https://github.com/interledger/deprecated-astro-graphql-plugin/commits/main).

## Usage

1. Install the plugin with the package manager of your choice.

   ```
   pnpm add @interledger/astro-graphql-plugin
   ```

2. Add the plugin to `astro.config.mjs` and configure what the source schema, output directory and link prefix (for internal links generated to the output markdown). If you have multiple schemas, define them separately.

   ```js
   import { defineConfig } from "astro/config";

   export default defineConfig({
     integrations: [
       GraphQL({
         schema: "/PATH_TO/schema1.graphql",
         output: "./PATH_TO/output-dir1",
         linkPrefix: "/URL_PATH_TO_GRAPHQL_DOCS_1",
       }),
       GraphQL({
         schema: "/PATH_TO/schema2.graphql",
         output: "./PATH_TO/output-dir2",
         linkPrefix: "/URL_PATH_TO_GRAPHQL_DOCS_2",
       }),
     ],
   });
   ```

For this plugin, the API documentation is generated on build. If the schema.graphql file or any of the configuration options are updated, run the build step again to see the updates.
