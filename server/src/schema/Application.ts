import 'reflect-metadata';
import { createApplication, createModule, gql } from 'graphql-modules';
import { gameModule } from './modules/gameModule';
import { characterModule } from './modules/characterModule';
import { itemModule } from './modules/itemModule';
import { modifierModule } from './modules/modifierModule';
import { quantityModule } from './modules/quantityModule';
import { rollModule } from './modules/rollModule';
import { skillModule } from './modules/skillModule';
import { profileModule } from './modules/profileModule';

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

const application = createApplication({
  modules: [
    emptyQueryModule,
    characterModule,
    quantityModule,
    itemModule,
    skillModule,
    modifierModule,
    gameModule,
    profileModule,
    rollModule,
  ],
});

const mySchema = application.schema;

export {
  application,
};
