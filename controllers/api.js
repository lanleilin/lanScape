const fs = require('fs');
const products = require("../db/dbproduct");
const test = require("../db/dbTest");
const imgCrawler = require("../db/imgCrawler");
const mockGroup = require("../db/mockGroup");
// jsonp
const urllib = require('url');
const APIError = require("../middlewares/rest").APIError;

module.exports = {
    "GET /api/products/:type": async(ctx, next) => {
        ctx.rest({
            products: products.getProducts(ctx.params.type)
        });
    },
    "GET /api/groups/:id": async(ctx, next) => {
        ctx.rest({
          groups: mockGroup[ctx.params.id]
        });
    },
    "GET /api/timeline": async(ctx, next) => {
        ctx.rest({
          timeline: mockGroup['timelineA']
        });
    },
    "GET /api/timeline/:id": async(ctx, next) => {
        let _line=products.getTimeline(ctx.params.id)
        ctx.rest({
            code:'1',
            msg:'success',
            // mock
            // timeline: [{
            //   timeline:JSON.stringify(mockGroup['timelineA'])
            // }],
            timeline: _line,
            id:`lineId ${ctx.params.id}` 
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
            ctx.request.body.price,
            ctx.request.body.timeline
        );
        ctx.rest(p);
    },
    "POST /api/updateTimeline": async(ctx, next) => {
        // let newLine=ctx.request.body
        // mock
        // mockGroup['timelineA']=newLine
        // ctx.rest({
        //   code:'1',
        //   msg:'success',
        //   data:mockGroup['timelineA']
        // })
        // real
        let _id=ctx.request.body.id
        let _timeline=ctx.request.body.timeline
        let t=products.updateTimeline(_id,_timeline)
        ctx.rest({
          update:t
        })
    },
    "POST /api/updateGender": async(ctx, next) => {
        let newGnder=ctx.request.body
        // mock
        console.log('111111111111111111111111111111',newGnder)
        // ctx.rest({
        //   code:'1',
        //   msg:'success',
        //   data:mockGroup['timelineA']
        // })
        // real
        let gender=products.updateGender(ctx.request.body)
        ctx.rest({
          msg:gender
        })
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
    // jsonp test
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
    // read text test
    "GET /api/testLog/:num": async(ctx, next) => {
        var n=ctx.params.num;
        ctx.rest({
            txt: `this is test and posted ${n}`
        });
    },
    // 爬取图片
    "POST /api/crawlerImg": async(ctx, next) => {
        // console.log(ctx.request.body.info)
        var info = ctx.request.body;
        ctx.rest({
            txt: imgCrawler.scratch(info)
        });
        // ctx.response.body = 'gonna get img'
    },
    // 读取数据库txt
    "GET /api/testDb": async(ctx, next) => {
        ctx.rest({
            txt: test.getTest()
        });
    },
    // delete db test
    "GET /api/deleteTest": async(ctx, next) => {
        ctx.rest({
            txt: test.deleteTest()
        });
    },
    // create db test
    "GET /api/createTest": async(ctx, next) => {
        ctx.rest({
            txt: test.createTest()
        });
    },
    // upload image test
    "POST /api/picture/upload.json": async(ctx, next) => {

        const path = require('path')
        const { uploadFile } = require('../static/samples/test/util/upload')
            // 上传文件请求处理
        let result = { success: false }
        let lanscape = path.resolve(__dirname, '..') //当前目录的上级目录
        let serverFilePath = path.join(lanscape, 'static/samples/test/image')
            // 上传文件事件
        result = await uploadFile(ctx, {
            fileType: 'album',
            path: serverFilePath
        })
        ctx.body = result
    },
    // get video stream test
    "POST /api/testVideo": async(ctx, next) => {
        ctx.rest({
            txt: 'this is test text'
        });

    },
};