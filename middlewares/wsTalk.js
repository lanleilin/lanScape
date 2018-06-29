
module.exports={
     createWebSocketServer(server, onConnection, onMessage, onClose, onError) {
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
    },
    
    // var messageIndex = 0;
    
     createMessage(type, user, data) {
        messageIndex++;
        return JSON.stringify({
            id: messageIndex,
            type: type,
            user: user,
            data: data
        });
    },
    
     onConnect() {
        let user = this.user;
        let msg = createMessage('join', user, `${user.name} joined.`);
        this.wss.broadcast(msg);
        // build user list:
        let users = this.wss.clients.map(function(client) {
            return client.user;
        });
        this.send(createMessage('list', user, users));
    },
    
     onMessage(message) {
        console.log(message);
        if (message && message.trim()) {
            let msg = createMessage('chat', this.user, message.trim());
            this.wss.broadcast(msg);
        }
    },
     onClose: function(){
        let user = this.user;
        let msg = createMessage('left', user, `${user.name} is left.`);
        this.wss.broadcast(msg);
    }
}