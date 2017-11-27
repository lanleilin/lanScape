// store products as database:

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

// var products = [
//     new Product('convertio', '图片pdf压缩转换', 'https://convertio.co/zh/png-svg/'),
//     new Product('Bootstrap', '组件', 'http://v3.bootcss.com/components/#btn-groups'),
//     new Product('VueJs', '过渡', 'https://cn.vuejs.org/v2/guide/transitions.html')
// ];
var products = [];

// 数据库
const Sequelize = require('sequelize');
const config = require('./config');
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
            RHEMAILSDK_instance.send('2476081528@qq.com', '新增收藏' + name, JSON.stringify(dog), function(e) {
                console.log(e);
            });
            console.log('created: ' + JSON.stringify(dog));
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




        // var
        //     index = -1,
        //     i;
        // console.log(products.length)
        // for (i = 0; i < products.length; i++) {
        //     if (products[i].id === id) {
        //         index = i;
        //         break;
        //     }
        // }

        // if (index >= 0) {
        //     return products.splice(index, 1)[0];
        // }
        return products;
        return null;
    }
};