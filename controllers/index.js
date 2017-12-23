module.exports = {
    'GET /': async(ctx, next) => {
        ctx.render('index.html');
        // ctx.render('test/test.html');
    },
    'GET /video.html': async(ctx, next) => {
        ctx.render('video.html');
    },
    // samples douban
    'GET /douban.html': async(ctx, next) => {
        ctx.render('dist/douban.html');
    },
    // samples questionaire
    'GET /joi.html': async(ctx, next) => {
        // ctx.render('../static/samples/questionnaire/happyfri/index.html');
        // ctx.render('samples/questionaire.html');
        // ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
        // ctx.response.body = '../static/samples/questionnaire/happyfri/index.html'
        ctx.response.type = 'text/html';
        ctx.response.redirect('../static/samples/joi/index.html');
        // const fs = require('fs')
        // ctx.response.type = 'html';
        // ctx.response.body = fs.createReadStream('../static/samples/questionnaire/happyfri/index.html');
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