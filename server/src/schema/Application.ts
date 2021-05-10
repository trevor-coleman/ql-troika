import 'reflect-metadata';
import { createApplication, createModule, gql } from 'graphql-modules';
import { gameModule } from './modules/game-module';
import { characterModule } from './modules/character-module';
import { itemModule } from './modules/item-module';
import { modifierModule } from './modules/modifier-module';
import { quantityModule } from './modules/quantity-module';
import { rollModule } from './modules/roll-module';
import { skillModule } from './modules/skill-module';
import { userModule } from './modules/user-module';

const typeDefs = gql`
    type Query {
        _empty: String
    }
    
    type Mutation {
        _empty: String
    }
`;

const emptyQueryModule = createModule({
  id       : 'empty-query-module',
  dirname  : __dirname,
  typeDefs : [typeDefs],
  resolvers: {},
});

export type ApplicationContext = GraphQLModules.Context & {
  auth: {
    token:string|null, user: string | null, roles:string[],
  },}

const application = createApplication({
  modules: [
    emptyQueryModule,
    characterModule,
    quantityModule,
    itemModule,
    skillModule,
    modifierModule,
    gameModule,
    userModule,
    rollModule,

  ],

});

const mySchema = application.schema;

export {
  application,
};
