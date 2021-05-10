import { ForbiddenError, SchemaDirectiveVisitor } from 'apollo-server';
import debug from 'debug';
import { defaultFieldResolver, GraphQLField } from 'graphql';
import { ApplicationContext } from '../Application';

const log = debug('ql-troika:schema:user:directives');

export class IsLoggedInDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field: GraphQLField<any, any>) {

    const originalResolve = field.resolve ?? defaultFieldResolver;

    field.resolve = async function (...args) {
      const context: ApplicationContext = args[2];
      log('Checking if logged in');
      if (!context.auth.user) {
        throw new ForbiddenError("Not Authorized");
      }
      const data = await originalResolve.apply(this, args);
      return data;
    };
  }
}
