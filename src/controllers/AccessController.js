const {controller, action} = require('../common/Loader/Controller')
const Controller = require('./Controller');

@controller('/access')
class AccessController extends Controller {
    @action('/get_access','get')
    async getAccess(ctx, next){
        // 查询权限表
    }
    @action('/set_access','post')
    async setAccess(ctx, next){
        // 设置权限表
    }
}

module.exports = AccessController;