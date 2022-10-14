import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import tasks from './data/tasks.js'
import links from './data/links.js'
import dateTimeScalar from './scalar/dateTime.js';
import durationScalar from './scalar/duration.js';
import typeDefs from './schema.js';


// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    tasks: () => tasks,
    links: () => links
  },

  DateTime: dateTimeScalar,
  Duration: durationScalar
};

const app = express();
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(
  cors(),
  bodyParser.json(),
  expressMiddleware(server),
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000`);