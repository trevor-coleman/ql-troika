// noinspection TypeScriptValidateTypes
require('dotenv')
    .config()
import debug from 'debug';
import 'reflect-metadata'
import { GraphQLSchema } from 'graphql';
import { pathsToModuleNameMapper } from 'ts-jest';

const {
  ApolloServer,
  MockList,
} = require('apollo-server');

import { application } from './schema/Application';
import connectDb from './startup/database';


const log = debug("app:index")

const schema: GraphQLSchema = application.createSchemaForApollo();

const server = new ApolloServer({schema});
try {
  connectDb();
} catch (e) {
  console.log("Server Connection Failed");
}

server.listen()
      .then(() => {
        console.log(`
        
    ==================    
    QL-TROIKA - SERVER
    ================== 
        
    🚀 Server is Running
    🦻🏻 Listening on Port 4000
    📬 Query at https://studio.apollographql.com/graph/ql-troika/explorer?variant=current
    `);
      });
