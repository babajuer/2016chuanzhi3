//定义一个产品对象
function Product(cart,data){
    //名称
    this.name = '';
    /*描述*/
    this.description = '';
    /*原价*/
    this.price = 0;
    /*团购价格*/
    this.tuangouPrice = 0;
    /*购买人数*/
    this.sum = 0;
    //因为我的产品对象需要使用其他对象，那么怎么做呢，我可以通过参数传递进来
    this.cart = cart;
    this.data = data;
    /*图片列表*/
    this.images = [{small:'',big:''},{small:'',big:''},{small:'',big:''}]
}
Product.prototype = {
    //绑定基本信息
    bindDOMDetail:function() {
        var str = ''
        str+='<h1 id="pname">@(name)</h1>'
        str+='<ul class="rating">'
        str+=' <li><a class="product-rate" href="#"> </a> <span> </span></li>'
        str+='<li><a href="#" id="buyCount">@(sum)</a>人购买</li>'
        str+='<div class="clearfix"></div>'
        str+=' </ul>'
        str+='<div class="price_single">'
        str+='<span class="reducedfrom" id="price">$@(price)</span>'
        str+=' <span class="actual" id="groupPrice">$@(tuangouPrice)</span><a href="#">团购</a>'
        str+=' </div>'
        str+=' <h2 class="quick">简述:</h2>'
        str+=' <p class="quick_desc" id="description">@(description)</p>'

       str =  $$.formateString(str,this)

        $('.pdetail').html(str)
    },
    /*绑定图片*/
    bindDOMOneImage:function(data){
        var str =''
        str+=' <li>'
        str+='<img class="etalage_thumb_image" src="@(small)" class="img-responsive" />'
        str+='<img class="etalage_source_image" src="@(big)" class="img-responsive" />'
        str+='</li>'

        str =  $$.formateString(str,data)
        return str;
},
    bindDOMImages:function() {
        var str =''
        for(var i=0;i<this.images.length;i++){
            str +=  this.bindDOMOneImage(this.images[i])
        }
         $('.etalage').html(str)


        /*jquery插件实现的幻灯片特效*/
        $('#etalage').etalage({
            thumb_image_width: 250,
            thumb_image_height: 300,
        });
    },
    /*绑定事件*/
    bindEvents:function() {
        var that = this;
        $('#btnaddcart').click(function(){
            //将当前产品添加到购物车里面
            that.cart.products.push(that)
            //重新绑定购物车
            that.cart.init()
            //回到顶部
            $(window).scrollTop(0);
        })

    },
    //部件
    init:function() {
        this.bindDOMDetail()
        this.bindDOMImages()
        this.bindEvents()
    }
}