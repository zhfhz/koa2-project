import UserModel from '../models/User';
import router,{controller,action} from '../middle-ware/router';
import Controller from './Controller';
import jwt from'../middle-ware/jwt';

@controller('/user')
class UserController extends Controller {
    name = 'x'
    constructor(){
        super()
        console.log('UserController inited',this.name);
    }
    @action('/register','post')
    async register(ctx, next, data){
        // 注册
        const user = new UserModel(data);
        await user.save();
        next()
        ctx.body="注册成功";
    }
    @action('/login','get')
    async login(ctx, next,data){
        // 登陆
        const user = new UserModel(data);
        await user.get();
        jwt.setToken(ctx,{id:user.id})
        ctx.body={
            code:200,
        }
    }
    @action('/info','get')
    async getInfo(ctx, next){
        // 获取用户信息
        const user = new UserModel(ctx.state.user);
        await user.get();
        ctx.body = {
            code:200,
            data:user.serialize()
        }
    }
    @action('/role','get')
    async getRole(ctx, next){
        // 获取用户角色
    }
    @action('/access','get')
    async getAccess(ctx, next){
        // 获取用户角色权限
    }
}

module.exports = UserController;