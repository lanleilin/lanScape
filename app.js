const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const templating = require('./middlewares/templating');

const rest = require('./middlewares/rest');

const RHEMAILSDK = require('./middlewares/RHEMAILSDK');

const Cookies = require('cookies');
const url = require('url');
const ws = require('ws');
const WebSocketServer = ws.Server;

const wsTalk=require('./middlewares/wsTalk')

const app = new Koa();

// app.use(wsTalk())

// log request URL:
app.use(async(ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}....`);
    await next();
});
// send email
RHEMAILSDK_instance = new RHEMAILSDK('170ffafc814c8572aaeab6a63220a619', '7b55113c286079d523af22eb7afb87ab');


// static file support:
let staticFiles = require('./middlewares/static-files');
app.use(staticFiles('/static/', __dirname + '/static'));

// parse request body:
app.use(bodyParser());

// parse user from cookie:
app.use(async(ctx, next) => {
    ctx.state.user = parseUser(ctx.cookies.get('name') || '');
    await next();
});
// add nunjucks as view:
app.use(templating('views', {
    noCache: true,
    watch: true
}));

// bind .rest() for ctx:
app.use(rest.restify());

// add controllers:
app.use(controller());



let server = app.listen(3001);

function parseUser(obj) {
    if (!obj) {
        return;
    }
    console.log('try parse: ' + obj);
    let s = '';
    if (typeof obj === 'string') {
        s = obj;
    } else if (obj.headers) {
        let cookies = new Cookies(obj, null);
        s = cookies.get('name');
    }
    if (s) {
        try {
            let user = JSON.parse(Buffer.from(s, 'base64').toString());
            console.log(`User: ${user.name}, ID: ${user.id}`);
            return user;
        } catch (e) {
            // ignore
        }
    }
}

function createWebSocketServer(server, onConnection, onMessage, onClose, onError) {
    let wss = new WebSocketServer({
        server: server
    });
    wss.broadcast = function broadcast(data) {
        wss.clients.forEach(function each(client) {
            client.send(data);
        });
    };
    onConnection = onConnection || function() {
        console.log('[WebSocket] connected.');
    };
    onMessage = onMessage || function(msg) {
        console.log('[WebSocket] message received: ' + msg);
    };
    onClose = onClose || function(code, message) {
        console.log(`[WebSocket] closed: ${code} - ${message}`);
    };
    onError = onError || function(err) {
        console.log('[WebSocket] error: ' + err);
    };
    wss.on('connection', function(ws) {
        let location = url.parse(ws.upgradeReq.url, true);
        console.log('[WebSocketServer] connection: ' + location.href);
        ws.on('message', onMessage);
        ws.on('close', onClose);
        ws.on('error', onError);
        if (location.pathname !== '/ws/chat') {
            // close ws:
            console.log('invalid url')
            ws.close(4000, 'Invalid URL');
        }
        // check user:
        let user = parseUser(ws.upgradeReq);
        if (!user) {
            ws.close(4001, 'Invalid user');
        }
        ws.user = user;
        ws.wss = wss;
        onConnection.apply(ws);
    });
    console.log('WebSocketServer was attached.');
    return wss;
}

var messageIndex = 0;

function createMessage(type, user, data) {
    messageIndex++;
    return JSON.stringify({
        id: messageIndex,
        type: type,
        user: user,
        data: data
    });
}

function onConnect() {
    let user = this.user;
    let msg = createMessage('join', user, `${user.name} joined.`);
    this.wss.broadcast(msg);
    // build user list:
    let users = this.wss.clients.map(function(client) {
        return client.user;
    });
    this.send(createMessage('list', user, users));
}

function onMessage(message) {
    console.log(message);
    if (message && message.trim()) {
        let msg = createMessage('chat', this.user, message.trim());
        this.wss.broadcast(msg);
    }
}

// function onClose() {
//     let user = this.user;
//     let msg = createMessage('left', user, `${user.name} is left.`);
//     this.wss.broadcast(msg);
// }
// wsTalk.onClose

// app.wss = createWebSocketServer(server, onConnect, onMessage, onClose);
app.wss = createWebSocketServer(server, onConnect, onMessage, wsTalk.onClose);

console.log('app started at port 3001...');