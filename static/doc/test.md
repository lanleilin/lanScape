

# HTML&CSS：
flex布局、垂直居中、清除浮动、BFC、三栏布局、两栏布局、动画、盒模型、H5新特性
#JavaScript：
继承、原型链、this指向、设计模式、call, apply, bind, new实现、防抖节流、let, var, const 区别、event、loop、promise使用及实现、promise并行执行和顺序执行、闭包、垃圾回收和内存泄漏、数组方法、数组乱序, 数组扁平化、事件委托、事件监听、事件模型、typescript
#Vue:
vue数据双向绑定原理、vue computed原理、vue编译器结构图、生命周期、vue组件通信、mmvm模式、mvc模式理解、vue dom diff、vuex、vue-router
#react：
dom-diff、列表key属性、jsx原理(createElement)、react-router原理、redux原理、生命周期、react setState、react组件通信、性能优化
#网络：
HTTP1, HTTP2, HTTPS、浏览从输入网址到回车发生了什么、前端跨域、浏览器缓存、cookie, session, token, localstorage, sessionstorage、状态码、TCP连接(三次握手, 四次挥手)

#性能优化
# js 继承
https://www.cnblogs.com/ranyonsue/p/11201730.html
# 2020-08-03 下午14:30
面试公司：Q房网
面试地点：深圳市南山区大冲商务中心D栋8楼（地铁1号线-高新园地铁站B出口）
乘车路线：地铁1号线-高新园地铁站B出口
电话：0755 8672 8246

#寄生组合继承和extends继承的区别
ES5 寄生组合继承
/* es5寄生组合继承 */
```js
function person (name,age) {
    this.name = name
    this.age = age
}
person.prototype.sayholle = function () {
    console.log(this.name+' holle'+ this.age)
}
function child (sex,name,age) {
    this.sex = sex
    person.call(this,name,age)
}
child.prototype = Object.create(person.prototype);
child.prototype.constructor = child
let p = new child('man','lll','13')
```
class继承
类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”
```js
class person {
    constructor (name,age) {
        this.name = name
        this.age = age
    }
    syaholle () {
        console.log(this.name+ ' holle '+this.age)
    }
}

class child extends person {
    constructor (name,age,sex) {
        /*  执行父类的构造函数 
            子类必须在构造函数中掉用super
            */
        super(name,age)
        /* 使用this一定要在super 之后 */
        this.sex = sex
    }
}

let p = new child('czklove','23','man')
```
#new做了什么
new的作用，就是先创建一个空对象，
然后将新对象的proto链接到类的prototype，
最后通过将新对象作为上下文（this），调用call来执行类的构造函数。实现代码如下
```js
var coder = new Man()
var coder = {};
coder.__proto__ = Man.prototype
Man.call(coder)
```
