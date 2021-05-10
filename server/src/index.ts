// noinspection TypeScriptValidateTypes
require('dotenv')
    .config();
import { SchemaDirectiveVisitor } from 'apollo-server';
import debug from 'debug';
import 'reflect-metadata';
import { GraphQLSchema } from 'graphql';
import { getUser } from './auth/auth';
import { environment } from './config/config';
import UserDbObject from './models/UserDbObject';
import { application } from './schema/Application';
import { userSchemaDirectives } from './schema/user';


import connectDb from './startup/database';

const {ApolloServer} = require('apollo-server');

const log = debug("ql-troika:index");

const schema: GraphQLSchema = application.createSchemaForApollo();

SchemaDirectiveVisitor.visitSchemaDirectives(schema, {
  ...userSchemaDirectives
})

const server = new ApolloServer({
  schema,
  async context({req}: { req: { headers: { authorization: string | undefined } } }) {
    const token = req.headers.authorization;
    const {
      user = null,
      roles = [],
    } = await getUser(token);
    return {
      auth: {
        token,
        user,
        roles,
      },
    };

  },
});

try {
  connectDb();
} catch (e) {
  throw new Error("Server Connection Failed");
}

server.listen()
      .then(() => {
        log(`
        
    ==================    
    QL-TROIKA - SERVER
    ================== 
        
    🚀 Server is Running
    📦 Env is ${environment.nodeEnv}
    🦻🏻 Listening on Port ${environment.port}
    📬 Query at https://studio.apollographql.com/graph/ql-troika/explorer?variant=current
    `);

      });
