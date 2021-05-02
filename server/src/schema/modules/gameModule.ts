import 'reflect-metadata';
import { createModule, gql } from 'graphql-modules';

const typeDefs = gql`
    type Game {
        id: ID!
        name: String!,
        sort_name: String!
        characters: [ID!]!
        owner: ID!
        players: [ID!]!
        discordWebhook: Webhook
        slug: String
    }

    type Webhook {
        type: String!
        url: String!
    }

`

const resolvers = {}

export const gameModule = createModule({
  id:"game-module",
  dirname: __dirname,
  typeDefs: [typeDefs],
  resolvers,
})

