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

// The GraphQL schema
const typeDefs = `#graphql
  type Query {
    tasks: [Task]
    links: [TaskLink]
  }

  type Task {
    id: ID!
    name: String
    parent: ID
    steps: [TaskStep!]
    from: DateTime
    to: DateTime
    freeFloat: Duration
    totalFloat: Duration
    initialDelay: Duration
    type: TaskType
  }

  type TaskStep {
    from: DateTime
    to: DateTime
  }

  union TaskType = HammockTaskType | BufferTaskType

  type HammockTaskType {
    dummy: String
  }

  type BufferTaskType {
    buffer: Duration
  }

  type TaskLink {
    predecessor: ID!
    successor: ID!
    leadLag: Duration
    type: TaskLinkType
  }

  enum TaskLinkType {
    START_START,
    START_FINISH,
    FINISH_START,
    FINISH_FINISH
  }

  scalar DateTime

  scalar Duration

`;

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