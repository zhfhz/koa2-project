const cacheData = [];
export default class DbCache {
    static defaultConfig = {
        cacheTime:10000,
        maxSize:-1,
    }
    constructor(config={}){
        Object.assign(config, DbCache.defaultConfig);
        
        Object.assign(this,{
           get config(){
            return config;
           },
           get data(){
               return JSON.parse(JSON.stringify(cacheData));
           }
        })
    }
    clearAll(){
        cacheData.splice(0);
        return this;
    }
    setCache(sqlStr, data){
        console.debug('Cache set:',sqlStr,data[0][0])
        this.clean().unshift({
            key:sqlStr,
            data:data[0][0],
            birth: Date.now()
        });
        return this;
    }
    clean(){
        const cacheBetween = this.config.cacheTime;
        cacheData.find((cache,index) => {
            if (cache.birth + cacheBetween < Date.now()) {
                console.log(`缓存共${cacheData.length}条.清理${cacheData.length - index - 1}条`)
                cacheData.splice(index);
                return true;
            }
        });

        if (this.config.maxSize > 0 && cacheData.length >= this.config.maxSize){
            cacheData.splice(this.config.maxSize-1)
        }

        return cacheData;
    }
    getCache(sqlStr){
        const target = this.clean().find((cache) => cache.key === sqlStr);
        console.debug('Cache get:',sqlStr,target)
        return target && [[target.data]];
    }
}