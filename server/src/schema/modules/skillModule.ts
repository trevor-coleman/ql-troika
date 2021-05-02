import 'reflect-metadata';
import { createModule, gql } from 'graphql-modules';

const typeDefs = gql`
  type Skill {
      id: ID!
      owner: ID!
      name: String!
      sort_name: String!
      description: String
      spell: Spell
      rank: Int
  }
  
  type Spell {
      staminaCost: Int!
  }
`

const resolvers = {}

export const skillModule = createModule({
  id: "skill-module",
  dirname: __dirname,
  typeDefs: [typeDefs],
  resolvers
})

