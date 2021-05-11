import { createModule, gql } from 'graphql-modules';
import {GraphQLScalarType} from 'graphql';

const dateScalar = new GraphQLScalarType({
  name: "Date",
  parseValue(value: number | string){
    return new Date(value);
  },
  serialize(value:Date) {
    return value.toISOString()
  }

})

const typeDefs = gql`
  scalar Date
`

const scalarsModule = createModule({
  id       : 'scalars-module',
  dirname  : __dirname,
  typeDefs : [typeDefs],
  resolvers: {
    Date: dateScalar
  },
});

export default scalarsModule;
