import './DefaultController';
import './UserController';
import router from '../middle-ware/router';

module.exports = {
    load:function(app){
        app.use(router.routes());
        app.use(router.allowedMethods());
    }
}