import { gql } from 'graphql-modules';

const typeDefs = [
  gql`
      directive @authByRole(
          requires: Role,
          allowSelf: Boolean
      ) on OBJECT | FIELD_DEFINITION

      enum Role {
          ADMIN
          USER
      }

      extend type Query {
          user(id:ID!): User @authByRole(requires:USER, allowSelf: true)
          me: User
          signIn(email:String!, password:String!):AuthToken
      }

      type AuthToken {
          token: String
      }

      extend type Mutation {
          createUser(userInput:UserInput!):String
      }

      type User {
          _id: ID
          name: String!
          email: String @authByRole(requires:ADMIN, allowSelf: true)
          games: [ID!] @authByRole(requires:ADMIN, allowSelf: true)
          characters: [ID!] @authByRole(requires:ADMIN, allowSelf: true)
          createdAt: Date
      }

      input UserInput {
          name: String!
          email: String!
          password: String!
      }
  `,
];

export default typeDefs;
