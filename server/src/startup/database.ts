import mongoose from 'mongoose';
import debug from 'debug';
import {environment} from '../config/config';

const log = debug('app:startup:database');

const connectDb = () => {
  mongoose.connect(environment.mongoConnectionString, {
            useNewUrlParser   : true,
            useUnifiedTopology: true,
            useCreateIndex    : true,
            useFindAndModify  : false
          })
          .then(() => {
            log(`Connected to ${environment.mongoUrl}/${environment.mongoDbName}...`);
          });
};

export default connectDb;
