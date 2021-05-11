import debug from 'debug';
import { Injectable, InjectionToken } from 'graphql-modules';
import 'reflect-metadata';
import { Role, UserInput } from '../generated/graphql';
import UserDbObject, { UserDbDocument } from '../models/UserDbObject';
import { IProviderResult } from './IProviderResult';

export const USERS_PROVIDER = new InjectionToken<IUsersProvider>(
    "USERS_PROVIDER");

const log = debug('ql-troika:providers:user');

export interface IUsersProvider {
  getUserById(id: string): Promise<UserDbDocument | null>
  getUserByEmail(email: string): Promise<UserDbDocument | null>
  signInWithEmailAndPassword(email:string, password:string): Promise<string|null>
  createUser(userInput: UserInput): Promise<ICreateUserResult>
}

export interface ICreateUserResult extends IProviderResult{
  data: {id?: string} | null,
}

@Injectable()
export class UsersProvider implements IUsersProvider {
  async getUserById(_id: string): Promise<UserDbDocument | null> {
    log(`getUserById(id: "${_id}")`);
    return UserDbObject.findOne({_id}).exec();
  }

  async getUserByEmail(email: string): Promise<UserDbDocument | null> {
    log(`getUserByEmail(id: "${email}")`);
    const user = await UserDbObject.findOne({email}).exec();
    console.log(user)
    return user
  }

  async signInWithEmailAndPassword(email:string, password:string):Promise<string|null> {
    const user = await UserDbObject.findOne({email})
    if (!user?.comparePassword(password)) return null;

    const token = await user?.generateAuthToken();
    return token;

  }


  async createUser(userInput: UserInput, isAdmin?: boolean): Promise<ICreateUserResult> {
    log(`createUser(userInput: ${userInput})`);

    const user = new UserDbObject({...userInput});

    const roles = [Role.User]
    if(isAdmin) roles.push(Role.Admin);
    user.roles = roles;

    try {
      await user.save();
    } catch (error) {
      log("❌ User.save() failed.");
      log(user);
      log(error.message);
      return {
        success: false,
        message: error.message,
        data   : null,
      };
    }
    if(!user._id){
      return {
        success:false,
        message: "User Id is undefined",
        data: null,
      }
    }
    log(`✅ Created User: ${user._id}`);
    return {
      success:true,
      data: {id: user._id}
    }
  }
}
