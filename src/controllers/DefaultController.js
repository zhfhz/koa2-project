import Router from '../middle-ware/router';
import Controller from './Controller';
import router,{controller,action} from '../middle-ware/router';

@controller()
class DefaultController extends Controller {
    @action('/','GET')
    async default(ctx, next){
        ctx.body=new Date()
    }
}

export default DefaultController;