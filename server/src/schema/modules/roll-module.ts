import 'reflect-metadata';
import { createModule, gql } from 'graphql-modules';

const typeDefs = gql`
    
    type Roll {
        dialogDetail: String
        dialogResult: String
        dice: [Int!]
        discordDescription: String
        discordResult: String
        rank: Int
        roll: [Int]
        rolledSkill: String
        rollerKey: ID
        rollerName: String
        title: String
        total: Int
        type: String!
        rolledWeapon: String
        weaponKey: String
    }
`

const resolvers = {}

export const rollModule = createModule({
  id      : "roll-module",
  dirname : __dirname,
  typeDefs: [typeDefs],
  resolvers,
})
