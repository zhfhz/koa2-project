const MysqlModel = require('./MysqlModel');
const { MysqlDatabase, DEF_MYSQL } = require('../database');
const { Utils, Logger } = require('../common');

let db = DEF_MYSQL;
let tableName = 't_role';

class Role extends MysqlModel {
  constructor(data){
    super(data);
    this.deserialize(data);
  }

  deserialize(data){
    if(data.id && !isNaN(data.id)) this.id = data.id;
    for(let [key, value] of Utils.iterateObject(data)){
      switch(key){        
        case 'name':
        this.name = value;
        break;
        case 'accessId':
        this.access_id = value;
        break;
        //could probably throw on encountering unknown fields, but eh...
      }
    }
    return this;
  }

  serialize(id){
    const json = {
      name: this.name,
      accessId: this.access_id,
    }
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

module.exports = Role;