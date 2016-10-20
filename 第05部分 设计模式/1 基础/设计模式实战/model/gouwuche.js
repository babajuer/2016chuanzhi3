//购物车模块
//字面量方式定义对象
    var gouwuche = {
		
		price:0
		,products:[]
		,add:function(product)
		{
			gouwuche.products.push(product);
			gouwuche.price+=product.price;
		}
		
		};
	