import KoaRouter from'koa-router';
import request from './request';

const defaultMiddleWare = async function(ctx,next){await next()};
const _router = new KoaRouter();

function Route(){
    const U_ROUTER_ARR = Symbol('Array');
    const U_ROUTER_NAMESPACE = Symbol('Namespace');
    const init=function(instance, middleWare){
        instance[U_ROUTER_ARR].forEach(item => item(instance, middleWare));
        instance[U_ROUTER_ARR]=null;
    }
    this.action=function(path="",method="get",middleWare){
        return function(parent,name, desc){
            const initArr = parent[U_ROUTER_ARR] = parent[U_ROUTER_ARR] || [];
            initArr.push((instance, controllerMiddleWare)=>{
                const namespace = instance[U_ROUTER_NAMESPACE];
                _router[method.toLowerCase()](`${namespace}${path}`,middleWare || controllerMiddleWare,request[method.toLowerCase()](parent[name].bind(instance)));
            })
            return desc;
        }
    };
    this.controller=function(namespace="",middleWare=defaultMiddleWare){
        return function(Controller){
            const instance = new Controller;
            Controller.prototype[U_ROUTER_NAMESPACE] = namespace;
            
            // console.log(namespace)
            // 绑定函数实例
            init(instance, middleWare);
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

export default _router;
const route = new Route();
export const controller = route.controller;
export const action = route.action;