import { gql } from 'graphql-modules';

const typeDefs = [
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
          createdAt: String
      }

      input UserInput {
          name: String!
          email: String!
          password: String!
      }
  `,
]

export default typeDefs;
