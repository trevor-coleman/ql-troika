import bcrypt from 'bcrypt';
import debug from 'debug';
import jwt from 'jsonwebtoken';
import mongoose, { Document, Model, Schema, Types } from 'mongoose';
import { customAlphabet } from 'nanoid';
import { nolookalikesSafe } from 'nanoid-dictionary';
import { environment } from '../config/config';
import idFactory from './IdFactory';

const nanoid = customAlphabet(nolookalikesSafe, 18);

export interface IUserDbObject {
  email: string;
  name: string;
  games: string[];
  characters: string[];
  password: string;
  createdAt: Date;
}

export interface UserDbDocument extends Document, IUserDbObject {
  _id?: string,
  games: Types.Array<string>,
  characters: Types.Array<string>,
  generateAuthToken: () => string;
  comparePassword: (password: string) => Promise<boolean>;
  roles: string[],
  createdAt: Date,
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

type FieldsForSelf = "games" | "name" | "email" | "characters" | "createdAt"

userDbSchema.methods.fieldsForSelf = function () : Pick<UserDbDocument, FieldsForSelf > {
  return {
    name: this.name,
    email: this.email,
    games: this.games,
    characters: this.characters,
    createdAt: this.createdAt
  }
}

userDbSchema.methods.generateAuthToken = function () {
  return jwt.sign({
    user : this._id,
    roles: this.roles,
  }, environment.jwtSecret);
};

userDbSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

userDbSchema.pre<UserDbDocument>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  }
});

const UserDbObject: Model<UserDbDocument> = mongoose.model(
    'User',
    userDbSchema);

export default UserDbObject;

