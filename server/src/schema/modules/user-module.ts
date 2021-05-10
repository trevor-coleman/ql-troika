import 'reflect-metadata';
import { ForbiddenError, SchemaDirectiveVisitor } from 'apollo-server';
import {
  defaultFieldResolver,
  GraphQLField,
  GraphQLInterfaceType,
  GraphQLObjectType,
} from 'graphql';
import {
  Application, ApplicationConfig, createModule, gql, ModuleConfig,
} from 'graphql-modules';
import {
  MutationCreateUserArgs, QuerySignInArgs,
} from '../../generated/graphql';
import DbUser from '../../models/DbUser';
import {
  USERS_PROVIDER, UsersProvider,
} from '../../providers/users-provider';

import debug from 'debug';
import { ApplicationContext } from '../Application';

const log = debug('app:schema:modules:user');

export interface IUserModuleConfig extends ModuleConfig {
  goodbye: (wave: Boolean) => Promise<string>
}

class IsLoggedInDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field: GraphQLField<any, any>) {

    const originalResolve = field.resolve ?? defaultFieldResolver;


    field.resolve = async function (...args) {
      const context:ApplicationContext = args[2];
      log('Checking if logged in')
      if(!context.auth.user) {
        throw new ForbiddenError("Not Authorized")
      }
      const data =  await originalResolve.apply(this, args)
      return data;
    }
  }
}

export const userSchemaDirectives = {
  auth: IsLoggedInDirective
};

export const userModule = createModule({
  id        : "user-module",
  dirname   : __dirname,
    typeDefs: [
      gql`
          directive @auth on FIELD_DEFINITION | FIELD

          extend type Query {
              user(id:ID!): User @auth
              me: User @auth
              signIn(email:String!, password:String!):AuthToken
          }

          type AuthToken {
              token: String
          }

          extend type Mutation {
              createUser(userInput:UserInput!):String
          }

          type User {
              _id: ID,
              name: String! 
              email: String!
              games: [ID!]
              characters: [ID!]
          }
          
          input UserInput {
              name: String!
              email: String!
              password: String!
          }
      `,
    ],
  resolvers : {
    Query   : {

      async me(_:any, __:any, context:ApplicationContext) {
        return null;
      },

      async user(_: any, {id}: { id: string }, context: ApplicationContext) {
        if(!context.auth.user) return null;
        const usersProvider = context.injector.get(USERS_PROVIDER);
        const user = await usersProvider.getUserById(id);

        if(!user) return null;

        return {
          _id: user._id,
          name: user.name,
          games: user.games,
        }

      },

      signIn: async function(_: any, {
        email,
        password,
      }: QuerySignInArgs, context: ApplicationContext)
      {
        log("signing in")
        const usersProvider = context.injector.get(USERS_PROVIDER);
        const token = await usersProvider.signInWithEmailAndPassword(email, password)
        log(token);

        return {token}


      },

    },
    Mutation: {
      async createUser(_: any,
                       {userInput}: MutationCreateUserArgs,
                       context: GraphQLModules.Context)
      {
        log(`Mutation: createUser($userInput: "${JSON.stringify(
            userInput,
            null,
            2)}")`);
        const userProvider = context.injector.get(USERS_PROVIDER);
        const userId = await userProvider.createUser(userInput);
        if (!userId.success) throw new Error(userId.message);
        return userId.data;

      },
    },

  },
  providers : [
    {
      provide : USERS_PROVIDER,
      useClass: UsersProvider,
    },
  ],
});
