var Cart = Class.extend({
    init: function(){
        //产品个数
        this.sum = 0;
        /*产品总价格*/
        this.price = 0;
        /*产品列表*/
        this.products = [];
    },
    /*零件 绑定基本信息*/
    bindBasic:function(){
        //绑定产品个数
        $('.cartsum').html(this.getProductSum())
        /*绑定总价格*/
        $('.cartAllPrice').html(this.getProductPrices())
    },
    /*零件 绑定产品列表*/
    bindProductList:function(){
        var str = ''
        for(var i= 0,len=this.products.length;i<len;i++){
            var product = this.products[i]
            var image = product.images[0];
            str += "<div class='cart_box'>"
            str += "<div class='message'>"
            str += "<div class='alert-close'> </div>"
            str += "<div class='list_img'><img src='"+image.small+"' class='img-responsive' alt=''/></div>"
            str += "<div class='list_desc'><h4><a href='#'>"+product.name+"</a></h4>1 x<span class='actual'>$"+product.price+"</span></div>"
            str += "<div class='clearfix'></div>"
            str += " </div>"
            str += " </div>"
        }
        $('.shopping_cart').html(str)
    },
    /*部件*/
    _init:function(){
        this.bindBasic()
        this.bindProductList()
    },
    //计算产品个数
    getProductSum:function(){
        var sum = 0;
        if(this.products && this.products.length>=0){
            sum = this.products.length;
        }else{
            sum =  0
        }
        this.sum = sum;
        return sum;
    },
    //计算产品总价格
    getProductPrices:function(){
        var sum = 0;
        for(var i = 0,len = this.products.length;i<len;i++){
            var item = this.products[i]
            sum+= item.price
        }
        this.price = sum;
        return sum;
    }
});
