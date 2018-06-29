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

            return products.splice(index, 1, newPro)[0];
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