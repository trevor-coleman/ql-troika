import { ForbiddenError, SchemaDirectiveVisitor } from 'apollo-server';
import debug from 'debug';
import {
  defaultFieldResolver, GraphQLField, GraphQLInterfaceType, GraphQLObjectType,
} from 'graphql';
import { ApplicationContext } from '../Application';

const log = debug('ql-troika:schema:user:directives');

type WrappedProperties = { _authFieldsWrapped?: boolean, _requiredAuthRole?: string, _allowSelf?: boolean }
type WrappedObject =
    (GraphQLObjectType | GraphQLInterfaceType)
    & WrappedProperties
type WrappedField = GraphQLField<any, any> & WrappedProperties

export class AuthDirective extends SchemaDirectiveVisitor {
  visitObject(type: WrappedObject) {
    this.ensureFieldsWrapped(type);
    type._requiredAuthRole = this.args.requires;
    type._allowSelf = this.args.allowSelf;
  }

  public visitFieldDefinition(field: WrappedField,
                              details: { objectType: WrappedObject }): WrappedField | void | null {
    this.ensureFieldsWrapped(details.objectType);
    field._requiredAuthRole = this.args.requires;
    field._allowSelf = this.args.allowSelf;
  }

  public ensureFieldsWrapped(objectType: WrappedObject) {
    if (objectType._authFieldsWrapped) return;
    objectType._authFieldsWrapped = true;

    const fields = objectType.getFields();

    Object.keys(fields)
          .forEach((fieldName) => {
            const field: WrappedField = fields[fieldName];
            const {resolve = defaultFieldResolver} = field;

            field.resolve = async function (...args) {

              const context = args[2];
              const {
                variableValues: {userId},
                path          : {prev},
              } = args[3];
              const allowSelf = field._allowSelf || objectType._allowSelf;

              const isSelf = context.auth.user === userId;
              const isMeQuery = prev?.key === "me" && prev?.typename === "Query";

              if (allowSelf === true && (
                  isSelf || isMeQuery))
              {
                return resolve.apply(this, args);
              }

              const requiredRole = field._requiredAuthRole ||
                                   objectType._requiredAuthRole;
              if (!requiredRole) {
                return resolve.apply(this, args);
              }

              if (!context.auth.roles.includes(requiredRole)) {
                throw new ForbiddenError(`Not authorized to access field: ${field.name}`);
              }

              return resolve.apply(this, args);

            };
          });

  }
}

export const userSchemaDirectives = {
  authByRole: AuthDirective,
};
