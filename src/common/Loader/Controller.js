const _Router = require('koa-router');
const defaultMiddleWare = async function(ctx,next){await next()};
const _router = new _Router();
const request = require('../../middle-ware/request');

function Controller(){
    let _namespace = "";
    const initArr = [];
    const self = this;
    this.init=function(instance, middleWare){
        initArr.forEach(item => item(instance, middleWare));
    }
    Object.assign(this,{
        get router(){
            return _router;
        }
    })
    this.action=function(path="",method="get",middleWare){
        return function(parent,name, desc){
            initArr.push((instance, controllerMiddleWare)=>{
                _router[method.toLowerCase()](`${_namespace}${path}`,middleWare || controllerMiddleWare,request[method.toLowerCase()](parent[name].bind(instance)));
            })
            return desc;
        }
    };
    this.controller=function(namespace="",middleWare=defaultMiddleWare){
        _namespace=namespace;
        return function(Controller){
            const instance = new Controller;
            _router.all(namespace,middleWare,(Controller.prototype.handleAll || defaultMiddleWare).bind(Controller.prototype));
            Object.assign(Controller.prototype,{
                get namespace(){
                    return namespace;
                },
                get router(){
                    if(_router.stack.length>0) return _router; //don't bind the routes second time
                }
            });

            // 绑定函数实例


            self.init(instance, middleWare);
            
            
            const aar = Object.getOwnPropertyNames(Controller.prototype);

            for(const key of aar){
                if(typeof Controller.prototype[key] === "function"){
                    Controller.prototype[key] = Controller.prototype[key].bind(instance);
                }
            }
            return instance;
        }
    }
}

module.exports=new Controller;