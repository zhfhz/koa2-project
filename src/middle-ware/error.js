/**
 * 错误信息覆盖处理
 */
module.exports = async (ctx,next) => {
    try {
        await next();
    } catch (error) {
        console.log(error)
        ctx.response.body={
            msg: '服务器发生错误',
            code: 500,
        }
    }
}