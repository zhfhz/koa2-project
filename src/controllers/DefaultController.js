const {controller, action} = require('../common/Loader/Controller')
const Controller = require('./Controller');

@controller('')
class UserController extends Controller {
    @action('/','GET')
    async default(ctx, next){
        ctx.body=new Date()
    }
}

module.exports = UserController;