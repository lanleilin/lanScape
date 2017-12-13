module.exports = {
    'GET /': async(ctx, next) => {
        ctx.render('index.html');
    },
    'GET /video.html': async(ctx, next) => {
        ctx.render('video.html');
    },
    'GET /douban.html': async(ctx, next) => {
        ctx.render('dist/douban.html');
    },
    'GET /test/test.html': async(ctx, next) => {
        ctx.render('test/test.html');
    },
    // 'GET /signin': async(ctx, next) => {
    //     ctx.render('signin.html');
    // },
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