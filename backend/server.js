const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT;

  app.listen(PORT, () =>
    console.log(`Server ready at http://localhost:${PORT + server.graphqlPath}`)
  );
}

startServer();
