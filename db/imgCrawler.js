//依赖模块
const fs = require('fs');
const request = require("request");
const cheerio = require("cheerio");
const mkdirp = require('mkdirp');
const async = require('async');

module.exports = {
    scratch: function(info) {
        console.log(info)
        console.log(info.imgClass)
        console.log(info.webAddress)
            // 目标网址
        if (info.webAddress == 'df') {
            var url = 'http://desk.zol.com.cn/meinv/1920x1080/2.html';
            var imgClass = '.photo-list-padding'
            var imgTarget = `${imgClass} a img`
        } else {
            // return 'default'
            try {
                var url = info.webAddress;
                var imgClass = info.imgClass
                var imgTarget = `${imgClass}  img`
            } catch (e) {
                return 'error'
            }
        }
        // var url = 'http://desk.zol.com.cn/meinv/1920x1080/2.html';

        function joiTimestamp() {
            let d = new Date();
            this.mouth = d.toDateString().slice(0, 7).split(' ').join('');
            this.ftime = `${this.mouth}${d.getHours()}时${d.getMinutes()}分${d.getSeconds()}`
            return this.ftime;
        }
        // 本地存储目录

        var dir = `./static/images/crawlImg/${joiTimestamp()}`;
        // var imgClass = '.photo-list-padding'
        // var imgTarget = `${imgClass} a img`
        // 图片链接地址
        var links = [];

        var count = 0;
        // 创建目录
        mkdirp(dir, function(err) {
            if (err) {
                console.log(err);
            }
        });
        // 判断是否为完整地址
        function IsURL(str_url) {
            var strRegex = '^((https|http|ftp|rtsp|mms)?://)';
            var re = new RegExp(strRegex);
            if (re.test(str_url)) {
                return (true);
            } else {
                return (false);
            }
        }
        // 发送请求
        request(url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(body);

                $(imgTarget).each(function() {
                    var src = $(this).attr('src');
                    if (IsURL(src) && links.length <= 10) {
                        links.push(src);
                    } else {
                        return;
                    }
                    // links.push(src);
                });
                // console.log(links)

                // 每次只执行一个异步操作
                async.mapSeries(links, function(item, callback) {
                    download(item, dir, count + item.substr(-4, 4));
                    callback(null, item);
                }, function(err, results) {});
            }
        });

        // 下载方法
        var download = function(url, dir, filename) {
            count++;
            request.head(url, function(err, res, body) {
                request(url).pipe(fs.createWriteStream(dir + "/" + filename));
            });
        };
        var scr = 'scratch';
        return scr;
    }
}