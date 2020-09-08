import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { resolvers } from "./resolvers";

(async () => {
  const app = express();

  const options = await getConnectionOptions(
    process.env.NODE_ENV || "development"
  );
  await createConnection({
    ...options,
    namingStrategy: new SnakeNamingStrategy(),
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: resolvers,
      validate: true,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log("=".repeat(80));
    console.log(
      `🏒 Open Hockey’s GraphQL API Is on the Ice At: \x1b[34mhttp://localhost:${port}/graphql\x1b[0m 🏒`
    );
    console.log("=".repeat(80));
  });
})();
