import { customAlphabet } from 'nanoid';
import { nolookalikesSafe } from 'nanoid-dictionary';

const nanoid = customAlphabet(nolookalikesSafe, 18);

class IdFactory {
  generate () {
    return nanoid();
  }
}

const idFactory = new IdFactory();

export default idFactory;
