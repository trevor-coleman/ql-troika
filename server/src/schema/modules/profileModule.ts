import 'reflect-metadata';
import { createModule, gql, ModuleConfig } from 'graphql-modules';
import { MutationCreateProfileArgs } from '../../generated/graphql';
import {
  PROFILES_PROVIDER,
  ProfilesProvider,
} from '../../providers/profilesProvider';

import debug from 'debug';

const log = debug('app:schema:modules:profile')



export interface IProfileModuleConfig extends ModuleConfig {
  goodbye: (wave: Boolean) => Promise<string>
}
export const profileModule = createModule({
  id        : "profile-module",
  dirname   : __dirname,
    typeDefs: [
      gql`
          extend type Query {
              profile(id:ID!): Profile
          }

          extend type Mutation {
              createProfile(profileInput:ProfileInput!):String
          }

          type Profile {
              displayName: String!
              email: String!
              games: [ID!]
              characters: [ID!]
          }
          
          input ProfileInput {
              displayName: String!
              email: String!
              password: String!
          }
      `,
    ],
  resolvers : {
    Query   : {
      profile(_:any, {id}:{id:string}, context:GraphQLModules.Context) {
        log(`Resolver profile($id: "${id}")`)
        const profileService = context.injector.get(PROFILES_PROVIDER);
        const profile = profileService.getProfileById(id);
        return profile;
      }
    },
    Mutation: {
      async createProfile(_: any,
                          {profileInput}: MutationCreateProfileArgs,
                          context: GraphQLModules.Context)
      {
        log(`Mutation createProfile($profileInput: "${JSON.stringify(profileInput, null, 2)}")`)
        const profileService = context.injector.get(PROFILES_PROVIDER);
        const profileId = await profileService.createProfile(profileInput);
        if(!profileId) throw new Error("Profile not created.")
      },
    },

  },
  providers : [{provide: PROFILES_PROVIDER, useClass: ProfilesProvider}],
});
