module.exports = {
    'GET /': async(ctx, next) => {
        ctx.render('index.html');
    },
    'GET /video.html': async(ctx, next) => {
        ctx.render('video.html');
    },
    // samples douban
    'GET /douban.html': async(ctx, next) => {
        ctx.render('dist/douban.html');
    },
    // samples test 
    'GET /test/test.html': async(ctx, next) => {
        ctx.render('test/test.html');
    },
    'GET /test/index.html': async(ctx, next) => {
        ctx.render('test/index.html');
    },
    // websocket talk
    'GET /room.html': async(ctx, next) => {
        let user = ctx.state.user;
        if (user) {
            ctx.render('room.html', {
                user: user
            });
        } else {
            ctx.response.redirect('/signin');
        }
    }

};