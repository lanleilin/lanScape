// 数据库

const Sequelize = require('sequelize');
const config = require('../config/config');
const fs = require('fs')
const path = require('path')
const { uploadFile } = require('../static/samples/test/util/upload')
    // 创建一个sequelize对象实例
var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});
// 定义模型
var Rabbit = sequelize.define('rabbits', {
    id: {
        type: Sequelize.STRING(100),
        primaryKey: true
    },
    gender: Sequelize.BOOLEAN,
    age: Sequelize.STRING(100),
    color: Sequelize.STRING(100),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
}, {
    timestamps: false
});
var ts = [];
var txt = '';

module.exports = {

    getTest: function() {
        (async() => {
            var rabbits = await Rabbit.findAll({
                where: {
                    gender: true
                }
            });
            console.log(`find ${rabbits.length} pets:`);
            ts = [];
            for (let p of rabbits) {
                var str = p.color;
                ts.push(str)
            }

        })();
        return ts;

    },
    createTest: function() {
        var now = Date.now();
        var id = 'd-' + now;
        (async() => {
            await Rabbit.create({
                id: 'd-' + now,
                gender: true,
                name: 'ltuz',
                age: 'ltuz',
                color: 'red',
                createdAt: now,
                updatedAt: now,
                version: 0
            });
            await (function() {
                for (let i = 0; i < 10; i++) {
                    Rabbit.create({
                        id: 'd-' + now,
                        gender: true,
                        name: 'bla',
                        age: 'luz',
                        color: 'red',
                        createdAt: now,
                        updatedAt: now,
                        version: 0
                    });
                }

            })();



        })();

        return 0;
    },
    deleteTest: function() {
        (async() => {
            var rabbits = await Rabbit.findAll({
                where: {
                    gender: true
                }
            });
            for (let p of rabbits) {
                p.destroy();
            }

        })();
        return ts;

    },
    uploadImgTest: function(ctx) {
        // var data = 'jjjjj'
        // (async(ctx) => {
        //     // 上传文件请求处理
        //     let result = { success: false }
        //     let serverFilePath = path.join(__dirname, 'static/image')

        //     // 上传文件事件
        //     result = await uploadFile(ctx, {
        //         fileType: 'album',
        //         path: serverFilePath
        //     })
        //     ctx.body = result
        // })();
        // (async() => {
        // await (function() {
        //     // 异步读取文件
        //     fs.readFile('static/text/output.txt', 'utf-8', function(err, data) {
        //         if (err) {
        //             console.log(err);
        //         } else {
        //             console.log(data);
        //             txt = data.toString();
        //             return txt;
        //         }
        //     });

        // })();
        // await (function(ctx) {
        //     // 上传文件请求处理
        //     let result = { success: false }
        //     let serverFilePath = path.join(__dirname, 'static/image')
        //         // console.log(serverFilePath)
        //         // 上传文件事件
        //         (async() => {
        //             result = await uploadFile(ctx, {
        //                 fileType: 'album',
        //                 path: serverFilePath
        //             })
        //         })();
        //     ctx.body = result
        //     txt = '我有一只mmp我从来也不骑'

        // })();
        // })();
        return txt;
    }
}
let now = Date.now();