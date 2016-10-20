// JavaScript Document
//购物车对象
	var gouwuche=function()
	{
		this.price=0;
		this.products =[];
	}
		
	gouwuche.prototype={
		add:function(product){
			    alert(product.price);
				this.price+=product.price;
				this.products.push(product);
				return this.price;
			}	
		
	};
	