var http = require('http');
var querystring = require('querystring');
class RHEMAIL {
    constructor(appid, appsecret) {
        this.appid = appid;
        this.appsecret = appsecret;
        this.url = 'email.txiaoyuan.cn';
        this.path = '/send';
    }

    send(receiver_email, title, content, res) {
        var data = {
            appid: this.appid,
            appsecret: this.appsecret,
            receiver_email: receiver_email,
            title: title,
            content: content
        }
        request_post(data, this.url, this.path, res)
        return 0;
    }
}


function request_post(data, url, path, fuc) {

    const postData = querystring.stringify(data);
    const options = {
        hostname: url,
        port: 80,
        path: path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    console.log(options);

    const req = http.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            if (typeof fuc === 'function') fuc(chunk);
            console.log(chunk);
        });
        res.on('end', () => {

        });
    });

    req.on('error', (e) => {
        console.log(e);
    });

    // write data to request body
    req.write(postData);
    req.end();
}




module.exports = RHEMAIL;



/**
 * 使用教程
 * 
 * 实例化
 * 
 * var instance =  new RHLOG('eb4eeff6acc0e83f9adcb91ea377d107','b43d9d2d5835610b896f7b52a641c3e2');
 * 
 *  发邮件
 *  receiver_email 收件人邮箱号
 *  title 邮件标题
 *  content 邮件内容
 *  instance.send(receiver_email,title,content);
 */