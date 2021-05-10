import debug from 'debug';
import { ObjectID } from 'mongodb';
import mongoose, { Schema, Document, Model, Types, Query } from 'mongoose';
import { customAlphabet } from 'nanoid';
import { nolookalikesSafe } from 'nanoid-dictionary';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { environment } from '../config/config';


export interface User {
  email: string;
  name: string;
  games: string[];
  characters: string[];
  password: string;
}

export interface UserDocument extends Document, User {
  _id?: string,
  games: Types.Array<string>,
  characters: Types.Array<string>,
  generateAuthToken: () => string;
  comparePassword: (password:string) => Promise<boolean>;
  roles: string[],
}

export type UserModel = Model<UserDocument>;

const log = debug("app:model:user");

export const userSchema: Schema<UserDocument, UserModel> = new Schema({
  _id: {
    type     : Schema.Types.ObjectId,
    required : false,
    default: ()=>new ObjectID()
  },
  name      : {
    type     : String,
    required : true,
    minLength: 2,
    maxlength: 255,
  },
  email     : {
    type     : String,
    required : true,
    lowercase: true,
    minLength: 5,
    maxlength: 255,
    unique   : true,
  },
  games     : [
    Schema.Types.ObjectId,
  ],
  characters: [Schema.Types.ObjectId],
  roles     : [Schema.Types.String],
  password  : {
    type    : String,
    required: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({
    user  : this._id,
    roles: this.roles,
  }, environment.jwtSecret);
};

userSchema.methods.comparePassword = async function (password: string) {
  const result = await bcrypt.compare(password, this.password);
  return result;
}

async function hashPassword(password:string) {
  const salt = await bcrypt.genSalt(10);
  const saltedPassword = await bcrypt.hash(password, salt)
  return saltedPassword;
}

userSchema.pre<UserDocument>("save", async function (next) {
  if (this.isModified("password")) {
     const hashedPassword = await hashPassword(this.password);
     this.password = hashedPassword;
  }
});

const DbUser: Model<UserDocument> = mongoose.model('User', userSchema)

export default DbUser;

