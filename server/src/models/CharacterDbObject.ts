import debug from 'debug';
import mongoose, { Schema, Document, Model, Types, Query } from 'mongoose';
import nanoidDictionary from 'nanoid-dictionary';
import idFactory from './IdFactory';

import { environment } from '../config/config';

const log = debug('ql-troika:model:character');

export interface ICharacterDbObject {

}

export interface CharacterDbDocument extends Document, ICharacterDbObject {

}

export type CharacterDbModel = Model<CharacterDbDocument>;

export const characterDbSchema: Schema<CharacterDbDocument, CharacterDbModel> = new Schema(
    {
      _id: {
        type: Schema.Types.String,
        required: true,
        default: ()=>idFactory.generate()
      },

      owner: {
        type: Schema.Types.String,
        ref: 'User',
        required: true,
      }


    }
)

const CharacterDbObject: Model<CharacterDbDocument> = mongoose.model("Character", characterDbSchema)
