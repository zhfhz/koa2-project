const {controller, action} = require('../middle-ware/router')
const Controller = require('./Controller');

@controller('/role')
class UserController extends Controller {
    @action('/get_role','get')
    async getRole(ctx, next){
        // 查询角色表
    }
    @action('/set_role','post')
    async setRole(ctx, next){
        // 设置角色表
    }
}

module.exports = UserController;