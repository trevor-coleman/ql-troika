import debug from 'debug';
import {
  MutationCreateUserArgs, QuerySignInArgs,
} from '../../generated/graphql';
import { UserDbDocument } from '../../models/UserDbObject';
import { USERS_PROVIDER } from '../../providers/users-provider';
import { ApplicationContext } from '../Application';

const log = debug('ql-troika:schema:user:resolvers');

const resolvers = {
  Query   : {

    async me(_: any, __: any, context: ApplicationContext) {
      const usersProvider = context.injector.get(USERS_PROVIDER);
      if(!context.auth.user) return null;
      return await usersProvider.getUserById(context.auth.user);
    },

    async user(_: any, {id}: { id: string }, context: ApplicationContext):Promise<Partial<UserDbDocument>|null> {
      const usersProvider = context.injector.get(USERS_PROVIDER);
      return  await usersProvider.getUserById(id);
    },

    signIn: async function (_: any, {
      email,
      password,
    }: QuerySignInArgs, context: ApplicationContext)
    {
      log("signing in")
      const usersProvider = context.injector.get(USERS_PROVIDER);
      const token = await usersProvider.signInWithEmailAndPassword(
          email,
          password)
      log(token);

      return {token}

    },

  },
  Mutation: {
    async createUser(_: any,
                     {userInput}: MutationCreateUserArgs,
                     context: GraphQLModules.Context)
    {
      log(`Mutation: createUser($userInput: "${JSON.stringify(userInput,
          null,
          2)}")`);
      const userProvider = context.injector.get(USERS_PROVIDER);
      const userId = await userProvider.createUser({...userInput});
      if (!userId.success) throw new Error(userId.message);
      return userId.data?.id;

    },
  },

}

export default resolvers;
