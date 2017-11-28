module.exports = {
    'GET /': async(ctx, next) => {
        ctx.render('index.html');
    },
    'GET /video.html': async(ctx, next) => {
        ctx.render('video.html');
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
        // 'GET /signin': async(ctx, next) => {
        //     let names = '甲乙丙丁戊己庚辛壬癸';
        //     let name = names[index % 10];
        //     ctx.render('signin.html', {
        //         name: `路人${name}`
        //     });
        // }

    // 'POST /signin': async(ctx, next) => {
    //     index++;
    //     let name = ctx.request.body.name || '路人甲';
    //     let user = {
    //         id: index,
    //         name: name,
    //         image: index % 10
    //     };
    //     let value = Buffer.from(JSON.stringify(user)).toString('base64');
    //     console.log(`Set cookie value: ${value}`);
    //     ctx.cookies.set('name', value);
    //     ctx.response.redirect('/');
    // },

    // 'GET /signout': async(ctx, next) => {
    //     ctx.cookies.set('name', '');
    //     ctx.response.redirect('/signin');
    // }
};