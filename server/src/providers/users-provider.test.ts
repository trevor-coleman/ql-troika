import { assertWrappingType } from 'graphql';
import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { UserInput } from '../generated/graphql';
import DbUser from '../models/DbUser';
import { UsersProvider } from './users-provider';
import { ObjectID } from 'mongodb';

import connectDb from '../startup/database';

const usersProvider = new UsersProvider();

describe('UsersProvider', () => {

  let _id: ObjectID;
  let _idString: string;
  let name: string;
  let email: string;
  let password: string;
  let characters: ObjectID[];
  let games: ObjectID[];
  let user: { characters: ObjectID[]; password: string; name: string; games: ObjectID[]; _id: string; email: string };

  beforeAll(async () => {
    await connectDb();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  beforeEach(async () => {
    if (process.env.NODE_ENV !== "test") {
      throw new Error("ENVIRONMENT IS NOT 'test' -- ABORTING");
    }

    await DbUser.deleteMany({});

    const makeObjectId = ()=> {
      const id = new ObjectID();
      return id.toHexString()
    }

    _id = new ObjectID();
    _idString = _id.toHexString();
    name = "Test Person";
    email = "test@email.com";
    password = "fjkdsjfsdjksd";
    characters = [
      new ObjectID(),
      new ObjectID()
    ];
    games = [
      new ObjectID(), new ObjectID(),
    ];

    user = {
      _id: _idString,
      name,
      email,
      password,
      characters,
      games,
    };

    await DbUser.create(user);
  });

  describe('getUserById', () => {

    const exec=async (_id:string)=> await usersProvider.getUserById(_id);

    it(`returns null if Id doesn't exist`, async () => {
      const result = exec((new ObjectID()).toHexString());
      expect(result)
          .toBeNull()
    });

    it(`returns the user document if it does exist`, async () => {
      const mongooseResult = await exec(_idString);
      const result = mongooseResult?.toObject();

      expect(result)
          .toBeDefined();
      expect(result?.name)
          .toEqual(name);
      expect(result?.characters)
          .toEqual(characters);
      expect(result?.games)
          .toEqual(games);
      expect(result?.email)
          .toEqual(email);
      const passwordMatch = await mongooseResult?.comparePassword(password);
      expect(passwordMatch)
          .toEqual(true);
    });
  });

  describe('createUser', ()=>{

    const exec = async (input: UserInput)=>{
      return usersProvider.createUser(input)
    }

    it('returns null if user is not created', async ()=> {
      const result = await exec({
        email,
        name,
        password,
      })

      await expect(result).toBeNull()
    })


  })

});

