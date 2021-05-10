import debug from 'debug';
import { createModule, gql, ModuleConfig } from 'graphql-modules';
import 'reflect-metadata';
import {
  MutationCreateUserArgs, QuerySignInArgs,
} from '../../generated/graphql';
import { USERS_PROVIDER, UsersProvider } from '../../providers/users-provider';
import { ApplicationContext } from '../Application';
import resolvers from './resolvers';
import typeDefs from './type-defs';

const log = debug('ql-troika:schema:user:module');

export interface IUserModuleConfig extends ModuleConfig {
  goodbye: (wave: Boolean) => Promise<string>
}

export const userModule = createModule({
  id        : "user-module",
  dirname   : __dirname,
    typeDefs,
  resolvers,
  providers : [
    {
      provide : USERS_PROVIDER,
      useClass: UsersProvider,
    },
  ],
});
