import 'reflect-metadata';
import { createModule, gql } from 'graphql-modules';

const typeDefs = gql`
    type Modifier {
        skill: ID!
        adjustment: Int!
        active: Boolean
    }
`;

const resolvers = {}

export const modifierModule = createModule(
    {
      id: "modifier-module",
      dirname: __dirname,
      typeDefs: [typeDefs],
      resolvers,
    }
)
