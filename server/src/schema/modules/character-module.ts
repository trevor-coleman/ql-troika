import 'reflect-metadata';
import {createModule, gql} from 'graphql-modules';

const typeDefs = gql`
    type Character {
        id: ID!
        owner: ID!
        name: String!
        game: ID!
        inventory: [Item!]
        luck: Quantity
        skill: Quantity
        stamina: Quantity
        special: String
        sort_name: String
        skills: [Skill!]
        background: String
        portrait: String
    }
`

export const characterModule = createModule({
      id      : "character-module",
      dirname: __dirname,
      typeDefs: [typeDefs],
  resolvers: {}
    }
)


