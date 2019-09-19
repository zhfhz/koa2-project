require('./DefaultController');
require('./UserController');
const {router} = require('../common/Loader/Controller');

module.exports = {
    load:function(app){
        app.use(router.routes());
        app.use(router.allowedMethods());
    }
}