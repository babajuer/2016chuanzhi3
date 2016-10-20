/*模拟产品数据*/
var cart = new Cart()
var hm  = new Product(cart)

hm.name = 'HM休闲服登山包33'
hm.description = '棒棒的，棒棒的，登山一流，服务一流，你好，我好，他也好，太棒了，一口气等上珠穆朗玛峰'
hm.price = 600
hm.tuangouPrice = 550
hm.sum = 100

hm.images=[
    {small:'images/s11.jpg',big:'images/s11.jpg'},
    {small:'images/s12.jpg',big:'images/s12.jpg'},
    {small:'images/s13.jpg',big:'images/s13.jpg'}
]
hm.init()


//模拟购物车数据 模拟购物车里面有三个产品
cart.products.push(hm)
cart.products.push(hm)
cart.products.push(hm)

//使用对象编程   - 面向对象编程
cart.init()


