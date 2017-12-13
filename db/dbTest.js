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

    }
}
let now = Date.now();