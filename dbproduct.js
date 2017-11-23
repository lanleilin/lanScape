// store products as database:

var id = 0;

function nextId() {
    id++;
    return 'p' + id;
}

function Product(name, manufacturer, price) {
    this.id = nextId();
    this.name = name;
    this.manufacturer = manufacturer;
    this.price = price;
}

var products = [
    new Product('convertio', '图片pdf压缩转换', 'https://convertio.co/zh/png-svg/'),
    new Product('Bootstrap', '组件', 'http://v3.bootcss.com/components/#btn-groups'),
    new Product('VueJs', '过渡', 'https://cn.vuejs.org/v2/guide/transitions.html')
];

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
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
}, {
    timestamps: false
});

var now = Date.now();
// (async() => {
//     var dog = await Pet.create({
//         id: 'd-' + now,
//         name: 'little_dog',
//         gender: false,
//         birth: '2017-08-08',
//         createdAt: now,
//         updatedAt: now,
//         version: 0
//     });
//     console.log('created: ' + JSON.stringify(dog));
// })();
// 查询
// (async() => {
//     var pets = await Pet.findAll({
//         where: {
//             name: 'little_dog'
//         }
//     });
//     console.log(`find ${pets.length} pets:`);
//     for (let p of pets) {
//         console.log('++++++++++++++++++++++++++++++++++++++++++++')
//         console.log(JSON.stringify(p));

//     }
// })();

module.exports = {
    getProducts: () => {
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
        var p = new Product(name, manufacturer, price);
        products.push(p);
        console.log('++++++++++++++++++++++++++++++++++++++CreateProduct');
        return p;
    },
    updateProduct: (id) => {
        var
            index = -1,
            i;
        for (i = 0; i < products.length; i++) {
            if (products[i].id == id) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            // update products[index]:
            var newPro = new Product('VueJs', '过渡', 'https://cn.vuejs.org/v2/guide/transitions.html')

            console.log('++++++++++++++++++++++++++++++++++++++UpdateProduct');
            var petPro = {};
            (async() => {
                var pets = await Pet.findAll({
                    where: {
                        name: 'little_dog'
                    }
                });
                console.log(`find ${pets.length} pets:`);
                for (let p of pets) {
                    console.log('++++++++++++++++++++++++++++++++++++++++++++')
                    console.log(JSON.stringify(p));
                    var p1 = JSON.stringify(p)

                    petPro.id = '188';
                    petPro.name = JSON.parse(p1).name;
                    petPro.manufacturer = JSON.parse(p1).createdAt;
                    petPro.price = JSON.parse(p1).birth;
                }
            })();

            // return products.splice(index, 1, newPro)[0];
            return products.splice(index, 1, petPro)[0];
        }
        return null;
    },

    deleteProduct: (id) => {
        var
            index = -1,
            i;
        for (i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            // remove products[index]:
            return products.splice(index, 1)[0];
        }
        return null;
    }
};