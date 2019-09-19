const koajwt = require('koa-jwt');
const jwt = require('jsonwebtoken');
const secret = 'ababbabaaabbbbaa';

const key = 'user';
const tokenKey = 'dToken';
const cookieKey = 'token';

module.exports = async function (ctx,next){
    await koajwt({secret,passthrough:true, key, tokenKey, cookie:cookieKey}).unless({
        path:[
            /^\/user\/login/,
            /^\/user\/register/,
            /^\/index.html/,
        ]
    })(ctx,next);
}

module.exports.setToken=(ctx, payload, onHeader) => {
    const token = encodePayload(payload);
    if (!onHeader) {
        ctx.cookies.set(cookieKey,token);    
    }else{
        console.log(ctx.request.header)
        ctx.set('authorization',`Bearer ${token}`);
    }
    
}
function encodePayload (payload) {
    //@expiresIn@ Eg: 60, "2 days", "10h", "7d"
    return jwt.sign(payload,secret,{ expiresIn: '4h' });
}