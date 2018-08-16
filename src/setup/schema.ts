import { importSchema } from 'graphql-import'
import { mergeResolvers } from "merge-graphql-schemas";
import { makeExecutableSchema } from "graphql-tools";
import { writeFileSync, readFileSync } from 'fs';
import * as path from "path";
import * as glob from "glob";

export const makeSchema = () => {
  const pathToModules = path.join(__dirname, "../api");
  const graphqlTypes = glob
    .sync(`${pathToModules}/**/*.graphql`)
    .map(x => readFileSync(x, { encoding: "utf8" }));

  const graphqlResolvers = glob
    .sync(`${pathToModules}/**/resolvers.?s`)
    .map(resolver => require(resolver).resolvers);

    const typeDefs = importSchema(graphqlTypes.join("\n"))
    const resolvers = mergeResolvers(graphqlResolvers)

  // comment/uncomment following line to export a copy of the merged schema file/ or not
   writeFileSync('./src/generated/api-merged.graphql', typeDefs)

  return makeExecutableSchema({
    typeDefs,
    resolvers,
  });
};
