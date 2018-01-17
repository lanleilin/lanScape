module.exports={
     onClose: function(){
        let user = this.user;
        let msg = createMessage('left', user, `${user.name} is left.`);
        this.wss.broadcast(msg);
    }
}