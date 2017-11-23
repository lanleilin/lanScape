module.exports = {
    'GET /': async(ctx, next) => {
        ctx.render('index.html');
    },
    'GET /video.html': async(ctx, next) => {
        ctx.render('video.html');
    }
};