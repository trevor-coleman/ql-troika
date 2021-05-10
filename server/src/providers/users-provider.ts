import debug from 'debug';
import { Injectable, InjectionToken } from 'graphql-modules';
import 'reflect-metadata';
import { ObjectID } from 'mongodb';
import { User, UserInput } from '../generated/graphql';
import DbUser, { UserDocument } from '../models/DbUser';

export const USERS_PROVIDER = new InjectionToken<IUsersProvider>(
    "USERS_PROVIDER");

const log = debug('app:providers:user');

export interface IUsersProvider {
  getUserById(id: string): Promise<User | null>
  getUserByEmail(email: string): Promise<UserDocument | null>
  signInWithEmailAndPassword(email:string, password:string): Promise<string|null>
  createUser(userInput: UserInput): Promise<ICreateUserResult>
}

export interface IProviderResult {
  success:Boolean,
  message?: string,
  data?: Object | null,
}

export interface ICreateUserResult extends IProviderResult{
  data: {id?: string} | null,
}

@Injectable()
export class UsersProvider implements IUsersProvider {
  async getUserById(_id: string): Promise<UserDocument | null> {
    log(`getUserById(id: "${_id}")`);
    try {
      new ObjectID(_id);
    } catch (e) {
      throw new Error("Invalid User ID.")
    }
    return DbUser.findOne({_id}).exec();
  }

  async getUserByEmail(email: string): Promise<UserDocument | null> {
    log(`getUserByEmail(id: "${email}")`);
    const user = await DbUser.findOne({email}).exec();
    console.log(user)
    return user
  }

  async signInWithEmailAndPassword(email:string, password:string):Promise<string|null> {
    const user = await DbUser.findOne({email})
    if (!user?.comparePassword(password)) return null;

    const token = await user?.generateAuthToken();
    return token;

  }


  async createUser(userInput: UserInput): Promise<ICreateUserResult> {
    log(`createUser(userInput: ${userInput})`);

    const user = new DbUser({...userInput});
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
