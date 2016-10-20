// JavaScript Document
//购物车对象

//单例改造就是全局唯一，只有一个实例，全面我们学习了字面量，字面量其实就是一个实例，正好天生满足了单例
var gouwuche={
		price:0
		,products:[]
		,add:function(product){
			   alert(product.price);
				gouwuche.price+=product.price;
				gouwuche.products.push(product);
				return gouwuche.price;
			}
	
	};
	//var gouwuche=function()
//	{
//		this.price=0;
//		this.products =[];
//	}
//		
//	gouwuche.prototype={
//		add:function(product){
//			    alert(product.price);
//				this.price+=product.price;
//				this.products.push(product);
//				return this.price;
//			}	
//		
//	};
	