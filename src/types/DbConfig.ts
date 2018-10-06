import { DbData } from './DbData';

export class DbConfig {
  baseDir: string;
  collectionPath: string;
  collections: Array<string>;
  collection: string;
  data: DbData
}
