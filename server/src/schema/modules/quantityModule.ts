import 'reflect-metadata';
import {createModule,gql} from 'graphql-modules';

const typeDefs = gql`
    type Quantity {
        id: ID!
        max: Int
        min: Int
        current: Int!
        initial: Int
    }
`

export const resolvers = {
  Quantity: {
    max: ()=>10,
    min: ()=>0,
    current: ()=>5,
    initial: ()=>7,
  }
}

export const quantityModule = createModule({
  id       : "quantity-module",
  dirname  : __dirname,
  typeDefs : [
    typeDefs
  ],
  resolvers
})


