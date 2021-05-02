import 'reflect-metadata'
import debug from 'debug';
import { Injectable, InjectionToken } from 'graphql-modules';
import { Profile, ProfileInput } from '../generated/graphql';

export const PROFILES_PROVIDER = new InjectionToken<IProfilesProvider>("PROFILES_PROVIDER")

const log = debug('app:providers:profile')

export interface IProfilesProvider {
  getProfileById(id:string): Promise<Profile|null>
  createProfile(profileInput: ProfileInput): Promise<string|null>
}

@Injectable()
export class ProfilesProvider implements IProfilesProvider{
  async getProfileById(id:string) : Promise<Profile | null> {
    log(`getProfileById(id: "${id}")`)
    log(`NOT IMPLEMENTED`)
    return null;
  }

  async createProfile(profileInput: ProfileInput): Promise<string|null> {
    log(`createProfile(profileInput: ${profileInput})`)
    log(`NOT IMPLEMENTED`)
    return null
  }
}
