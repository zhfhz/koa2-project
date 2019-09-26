const Koa = require('koa');
const app = new Koa();
const config = require('./config');
const controllers = require('./controllers');
const jwt = require('./middle-ware/jwt');
const errorHandle = require('./middle-ware/error');

app.use(errorHandle);

// 全局权限校验
// app.use(jwt);

controllers.load(app);

app.listen(8080);
console.log('server at 8080 has been started.')