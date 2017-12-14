// const products = require('../products');
const products = require("../db/dbproduct");
const test = require("../db/dbTest");
// jsonp
const urllib = require('url');

const APIError = require("../middlewares/rest").APIError;

module.exports = {
    "GET /api/products": async(ctx, next) => {
        ctx.rest({
            products: products.getProducts()
        });
    },
    "GET /api/testTxt": async(ctx, next) => {
        ctx.rest({
            txt: products.getTxt()
        });
    },

    "POST /api/products": async(ctx, next) => {
        var p = products.createProduct(
            ctx.request.body.name,
            ctx.request.body.manufacturer,
            ctx.request.body.price
        );
        ctx.rest(p);
    },

    "DELETE /api/products/:id": async(ctx, next) => {
        console.log(`delete product ${ctx.params.id}...`);
        var p = products.deleteProduct(ctx.params.id);

        if (p) {
            ctx.rest(p);
        } else {
            throw new APIError("product:not_found", "product not found by id.");
        }
    },
    "PUT /api/products/:id": async(ctx, next) => {
        console.log(`update product ${ctx.params.id}...`);
        var p = products.updateProduct(ctx.params.id);
        if (p) {
            ctx.rest(p);
        } else {
            throw new APIError("product:not_found", "product not found by id.");
        }
    },
    // samples test
    "GET /jsonp/testLog": async(ctx, next) => {
        var data = {
            txt: 'test log'
        }
        var params = urllib.parse(ctx.url, true);
        // console.log(params);
        if (params.query && params.query.callback) {
            //jsonp;
            var str = params.query.callback + '(' + JSON.stringify(data) + ')'; //jsonp
            ctx.response.body = str;
        } else {
            ctx.rest(data);
            //普通的json
        }
    },
    "GET /api/testDb": async(ctx, next) => {
        ctx.rest({
            txt: test.getTest()
        });
    },
    "GET /api/deleteTest": async(ctx, next) => {
        ctx.rest({
            txt: test.deleteTest()
        });
    },
    "GET /api/createTest": async(ctx, next) => {
        ctx.rest({
            txt: test.createTest()
        });
    }
};