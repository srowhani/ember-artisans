import { v4 as uuidV4 } from 'uuid';

export default class Worker {
  uuid() {
    return uuidV4();
  }
}
