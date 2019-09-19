exports.post = function (middleWare){
    return async function (ctx, next) {
        const getData = async function() {
            return new Promise((resolved, reject) => {
                try {
                    let postData = '';
                    ctx.req.addListener('data', async (data) => { // 有数据传入的时候
                        postData += data;
                    });
                    ctx.req.on('end', async () => {
                        let parseData = parseQueryStr(postData);
                        resolved(JSON.parse(parseData));
                    });
                } catch (e) {
                    reject(parseData);
                }
            })
        }
        const data = await getData();
        await middleWare(ctx,next ,data);
    }
};
exports.get = function (middleWare){
    return async function (ctx, next){
        await middleWare(ctx, next,ctx.query);
    }
};