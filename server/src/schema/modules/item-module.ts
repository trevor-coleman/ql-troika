import 'reflect-metadata';
import {createModule, gql} from 'graphql-modules';


const typeDefs = gql`
    
    extend type Query {
        hello: String!
    }
    
    type Item {
        id: ID!
        owner: ID!
        name: String!
        sort_name: String!
        skill: ID!
        description: String
        charges: Quantity
        damage: Damage
        protection: Protection
        customSize: CustomSize
        modifiers: [Modifier!]
    }

    type CustomSize {
        size: Int!
    }

    type Protection {
        protectsAs: Int
        protection: Int!
    }

    type Damage {
        damagesAs: String
        damage: [Int!]
        twoHanded: Boolean,
        ranged: Boolean,
        armourPiercing: Boolean
    }


`

const resolvers = {

}

export const itemModule = createModule({
  id: "item-module",
  dirname: __dirname,
  typeDefs: [typeDefs],
  resolvers,
})

