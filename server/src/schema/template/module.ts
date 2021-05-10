import debug from 'debug';
import { createModule, gql, ModuleConfig } from 'graphql-modules';
import 'reflect-metadata';
import { ApplicationContext } from '../Application';
import resolvers from './resolvers';
import typeDefs from './type-defs';

const log = debug('ql-troika:schema:template:module');

export interface ITemplateModuleConfig extends ModuleConfig {
  goodbye: (wave: Boolean) => Promise<string>
}

export const templateModule = createModule({
  id        : "template-module",
  dirname   : __dirname,
    typeDefs,
  resolvers,
  providers : [],
});
