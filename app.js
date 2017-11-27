const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const templating = require('./templating');

const rest = require('./rest');

const RHEMAILSDK = require('./RHEMAILSDK');

const app = new Koa();


// log request URL:
app.use(async(ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});


RHEMAILSDK_instance = new RHEMAILSDK('170ffafc814c8572aaeab6a63220a619', '7b55113c286079d523af22eb7afb87ab');

// static file support:
let staticFiles = require('./static-files');
app.use(staticFiles('/static/', __dirname + '/static'));

// parse request body:
app.use(bodyParser());

// add nunjucks as view:
app.use(templating('views', {
    noCache: true,
    watch: true
}));

// bind .rest() for ctx:
app.use(rest.restify());

// add controllers:
app.use(controller());




app.listen(3001);
console.log('app started at port 3001...');