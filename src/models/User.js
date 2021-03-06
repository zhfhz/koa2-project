import MysqlModel from './MysqlModel';
import { MysqlDatabase, DEF_MYSQL } from '../database';
import { Utils, Logger } from '../common';

let db = DEF_MYSQL;
let tableName = 't_user';

class User extends MysqlModel {
  constructor(data){
    super(data);
    this.deserialize(data);
  }
  deserialize(data){
    if(data.id && !isNaN(data.id)) this.id = data.id;
    for(let [key, value] of Utils.iterateObject(data)){
      switch(key){        
        case 'dd_id':
        this.ddId = value;
        break;
        case 'name':
        this.name = value;
        break;
        case 'email':
        this.email = value;
        break;
        case 'avatar':
        this.avatar = value;
        break;
        //could probably throw on encountering unknown fields, but eh...
      }
    }
    return this;
  }

  serialize(id){
    const json = {}
    this.ddId && (json.dd_id = this.ddId);
    this.name && (json.name = this.name);
    this.email && (json.email = this.email);
    this.avatar && (json.avatar = this.avatar);
    if(id) json.id = this.id;
    return json;
  }

  static set DB(newdb) {
    if (newdb instanceof MysqlDatabase) {
      Logger.warn(`Warning! Switching database for ${Utils.getObjectClassName(this)}! All records from now on will operate with ${newdb.url}`);
      db = newdb;
    } else {
      throw new TypeError(`This model only supports MysqlDatabase type, was ${newdb.constructor.name}`);
    }
  }

  /**
   * @returns {MysqlDatabase} database instance used by this model
   */
  static get DB() {
    return db;
  }

  static get DATASTORE() {
    return tableName;
  }

  get db() {
    return User.DB;
  }

  get datastore() {
    return User.DATASTORE;
  }
}
export default User;