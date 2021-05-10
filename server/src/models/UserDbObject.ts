import debug from 'debug';
import mongoose, { Schema, Document, Model, Types, Query } from 'mongoose';
import { customAlphabet } from 'nanoid';
import { nolookalikesSafe } from 'nanoid-dictionary';
import { environment } from '../config/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import idFactory from './IdFactory';

const nanoid = customAlphabet(nolookalikesSafe, 18);

export interface IUserDbObject {
  email: string;
  name: string;
  games: string[];
  characters: string[];
  password: string;
}

export interface UserDbDocument extends Document, IUserDbObject {
  _id?: string,
  games: Types.Array<string>,
  characters: Types.Array<string>,
  generateAuthToken: () => string;
  comparePassword: (password: string) => Promise<boolean>;
  roles: string[],
}

export type UserDbModel = Model<UserDbDocument>;

const log = debug('ql-troika:model:user');

export const userDbSchema: Schema<UserDbDocument, UserDbModel> = new Schema({
  _id       : {
    type    : Schema.Types.String,
    required: false,
    default : () => idFactory.generate(),
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
    {
      type: Schema.Types.ObjectId,
      ref : "Game",
    },
  ],
  characters: [
    {
      type: Schema.Types.String,
      ref : "Character",
    },
  ],
  roles     : [Schema.Types.String],
  password  : {
    type    : String,
    required: true,
  },
  createdAt : {
    type     : Schema.Types.Date,
    required : true,
    default  : () => new Date(),
    immutable: true,
  },
});

userDbSchema.methods.generateAuthToken = function () {
  return jwt.sign({
    user : this._id,
    roles: this.roles,
  }, environment.jwtSecret);
};

userDbSchema.methods.comparePassword = async function (password: string) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  const saltedPassword = await bcrypt.hash(password, salt);
  return saltedPassword;
}

userDbSchema.pre<UserDbDocument>("save", async function (next) {
  if (this.isModified("password")) {
    const hashedPassword = await hashPassword(this.password);
    this.password = hashedPassword;
  }
});

const UserDbObject: Model<UserDbDocument> = mongoose.model(
    'User',
    userDbSchema);

export default UserDbObject;

