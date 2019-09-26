import MysqlModel from './MysqlModel';
import { Logger, Utils } from '../common';
import ModelCache from './ModelCache';

const modelCache = new ModelCache();

module.exports = 
class MysqlListModel extends MysqlModel {
  constructor(ItemClass,data){
    super(data);
    const Items = [new ItemClass(data)];
    Object.assign(this,{
      get itemType(){
        return ItemClass;
      },
      get Items(){
        return Items;
      }
    });
  }
  save(){
    throw new Error("save a list was not been suported.");
  }
  update(){
    throw new Error("update a list was not been suported.");
  }
  delete(){
    throw new Error("delete a list was not been suported.");
  }
  insert(){
    throw new Error("insert a list was not been suported.");
  }
  push(item){
    if(item instanceof this.itemType){
      this.Items.push(item);
    }else{
      throw new Error("list type is wrong")
    }
  }
  serialize(){
    return this.Items.map((item) => item.serialize(item.id) )
  }
  deserialize(data){
    data.forEach(item => {
      this.push(new this.itemType(item));
    });
  }
  async get(){
    let result;
    const condition = this.Items[0];
    const cacheData = modelCache.getCache(JSON.stringify(this.serialize(condition.id)));
    if (cacheData) {
      return cacheData;
    }

    //TODO: implementation of this method might vary quite severely. 
    //This is just an example of how it *could* be done - either by id or by combination of all available attributes
    if(!condition.id){
      result = await this.itemType.DB.select(this.itemType.DATASTORE, condition.serialize());
      
    } else {
      result = await this.itemType.DB.select(this.itemType.DATASTORE, 'id = ?', condition.id);      
    }
    let [data] = result;
    // 删除查询数据
    this.Items.splice(0);
    if(data.length === 0) {
      Logger.error(`Did not find record ${this} in the database.`);      
    } else {
      this.useCache && modelCache.setCache(JSON.stringify(this.serialize()),data);
      this.deserialize(data);
    }
    
    return this;
  }
}