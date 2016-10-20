//使用面向对象形式开发列表页面

function Product (data){
    /*名称*/
    this.name=''
    /*原价*/
    this.sourcePrice = ''
    /*优惠价*/
    this.price = ''
    /*图片*/
    this.image ='img/boutque01_r2_c2.jpg'
    /*售量*/
    this.sum = 0
    /*折扣*/
    this.zhekou = 0
    //接收后天给我的json数据
    this.data = data
}
Product.prototype = {
    //绑定单个产品
    bindDOM:function(){
        var str = ''
        str+=' <dl>'
        str+='<dt><a><img src="'+this.image+'" width="384" height="225" /></a></dt>'
        str+='<dd>'
        str+=' <span><a><em>'+this.zhekou+'折/</em>'+this.name+'</a></span>'
        str+='</dd>'
        str+='<dd class="price">'
        str+='<em>￥'+this.price+'</em>'
        str+='<del>￥'+this.sourcePrice+'</del>'
        str+='<i>销量：'+this.sum+'</i>'
        str+='</dd>'
        str+='</dl>'
        return str;
    },
    /*绑定单个产品*/
    bindEvents:function(){},
    //绑定多个产品
    bindDoms:function(){
        var str =''
        for(var i = 0;i<this.data.length;i++){
            str+=this.data[i].bindDOM()
        }
        $('#container').html(str)
    },
    /*部件*/
    init:function(){
        this.bindDoms()
        this.bindEvents()
    }
}

/*
 模拟产品列表数据*/

/*模拟单个实例*/
/*
 var aussie = new Product()
 aussie.name = 'Aussie美国袋鼠丰盈蓬松护发素400ml '
 aussie.sourcePrice = 1200.00
 aussie.price = 420
 aussie.zhekou = 3.5
 aussie.image = 'img/boutque01_r2_c2.jpg'
 aussie.sum = 70

 /!*多个产品*!/
 var shuibaobao = new Product()
 shuibaobao.name = 'Coppertone水宝宝速干清爽防晒喷雾型45g SPF50 '
 shuibaobao.sourcePrice = 1200.00
 shuibaobao.price = 420
 shuibaobao.zhekou = 3.5
 shuibaobao.image = 'img/boutque01_r2_c2.jpg'
 shuibaobao.sum = 70
 */






/*
 var list = [aussie,shuibaobao,shuibaobao,shuibaobao,shuibaobao,shuibaobao,shuibaobao,shuibaobao,shuibaobao,shuibaobao]
 */



/*面向对象编程*/
var json  = [
    {
        name:'Aussie美国袋鼠丰盈蓬松护发素400ml',
        sourcePrice: 1200.00,
        price : 420,
        zhekou:3.5,
        image:'img/boutque01_r2_c2.jpg',
        sum :70
    },
    {
        name:'Aussie美国袋鼠丰盈蓬松护发素400ml',
        sourcePrice: 1200.00,
        price : 420,
        zhekou:3.5,
        image:'img/boutque01_r2_c2.jpg',
        sum :70
    },
    {
        name:'Aussie美国袋鼠丰盈蓬松护发素400ml',
        sourcePrice: 1200.00,
        price : 420,
        zhekou:3.5,
        image:'img/boutque01_r2_c2.jpg',
        sum :70
    },
    {
        name:'Aussie美国袋鼠丰盈蓬松护发素400ml',
        sourcePrice: 1200.00,
        price : 420,
        zhekou:3.5,
        image:'img/boutque01_r2_c2.jpg',
        sum :70
    },
    {
        name:'Aussie美国袋鼠丰盈蓬松护发素400ml',
        sourcePrice: 1200.00,
        price : 420,
        zhekou:3.5,
        image:'img/boutque01_r2_c2.jpg',
        sum :70
    },
    {
        name:'Aussie美国袋鼠丰盈蓬松护发素400ml',
        sourcePrice: 1200.00,
        price : 420,
        zhekou:3.5,
        image:'img/boutque01_r2_c2.jpg',
        sum :70
    },
    {
        name:'Aussie美国袋鼠丰盈蓬松护发素400ml',
        sourcePrice: 1200.00,
        price : 420,
        zhekou:3.5,
        image:'img/boutque01_r2_c2.jpg',
        sum :70
    },
    {
        name:'Aussie美国袋鼠丰盈蓬松护发素400ml',
        sourcePrice: 1200.00,
        price : 420,
        zhekou:3.5,
        image:'img/boutque01_r2_c2.jpg',
        sum :70
    }
]


function transform(json){
    var list =[]
    for(var i = 0;i<json.length;i++){
        var p= new Product()
        p.name = json[i].name
        p.sourcePrice = json[i].sourcePrice
        p.price = json[i].price
        p.zhekou = json[i].zhekou
        p.image = json[i].image
        p.sum = json[i].sum
        list.push(p)
    }
    return list
}


var p = new Product(transform(json))
p.init()
