// store products as database:
// 操作 joi_db pet 表
const fs = require('fs')

var id = 0;

function nextId() {
    id++;
    return 'p' + id;
}

function Product(id, name, manufacturer, price) {
    // this.id = nextId();
    this.id = id;
    this.name = name;
    this.manufacturer = manufacturer;
    this.price = price;
}


var products = [];

// 数据库
const Sequelize = require('sequelize');
const config = require('../config/config');
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
// 定义模型Pet，告诉Sequelize如何映射数据库表
var Pet = sequelize.define('pet', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    gender: Sequelize.BOOLEAN,
    name: Sequelize.STRING(100),
    description: Sequelize.STRING(500),
    address: Sequelize.STRING(500),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
}, {
    timestamps: false
});

var now = Date.now();


module.exports = {
    getProducts: () => {
        (async() => {
            var pets = await Pet.findAll({
                where: {
                    gender: false
                }
            });
            console.log(`find ${pets.length} pets:`);
            products = [];
            for (let p of pets) {
                var str = new Product(p.id, p.name, p.description, p.address);
                products.push(str)
            }

        })();
        return products;
    },

    getProduct: (id) => {
        var i;
        for (i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                return products[i];
            }
        }
        return null;
    },
    getTxt: () => {
        var txt = '';
        // 异步读取文件
        // (async() => {
        //     await (function() {
        //         fs.readFile('static/text/output.txt', 'utf-8', function(err, data) {
        //             if (err) {
        //                 console.log(err);
        //             } else {
        //                 console.log(data);
        //                 txt = data.toString();
        //                 console.log(1)
        //                 return txt;
        //             }
        //         });
        //     })();
        // })();
        // 同步读取文件
        txt = fs.readFileSync('static/text/output.txt', 'utf-8');
        // console.log(txt)
        return txt;
        // 流形式打开文件
        // var rs = fs.createReadStream('static/videos/testVideo.mp4', 'utf-8');

        // rs.on('data', function(chunk) {
        //     console.log('DATA:')
        //     // console.log(chunk);
        // });

        // rs.on('end', function() {
        //     console.log('END');
        // });

        // rs.on('error', function(err) {
        //     console.log('ERROR: ' + err);
        // });
        // return rs;

    },
    createProduct: (name, manufacturer, price) => {
        // 存入
        var now = Date.now();
        var id = 'd-' + now;
        (async() => {
            var dog = await Pet.create({
                id: 'd-' + now,
                gender: false,
                name: name,
                description: manufacturer,
                address: price,
                createdAt: now,
                updatedAt: now,
                version: 0
            });
            console.log('created: ' + JSON.stringify(dog));
            // 写入txt
            fs.writeFile('static/text/output.txt', JSON.stringify(dog), function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('ok')
                }
            })

        })();

        var p = new Product(id, name, manufacturer, price);
        products.push(p);
        console.log('++++++++++++++++++++++++++++++++++++++CreateProduct');

        return p;
    },
    updateProduct: (id) => {

        (async() => {
            var pets = await Pet.findAll({
                where: {
                    id: id
                }
            });
            for (let p of pets) {
                await p.destroy();
            }
        })();

        return products;

        return null;
    },

    deleteProduct: (id) => {

        return products;
        return null;
    }
};