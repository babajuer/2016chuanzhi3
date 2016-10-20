


 //产品模块相关的代码都放在这里面
	var productModule = function(product,gouwuche)
	{
		this.product = product;
		this.gouwuche = gouwuche;
	}
	productModule.prototype= 
	{
		init:function()
		{
			this.bindData();
			this.bindEvent();
		}
		,bindData:function()
		{
			document.getElementById('pname').innerHTML= this.product.name;
		}
		,bindEvent:function()
		{
			var that = this;
			$.event.on(window,'load',function(){
					alert("从服务器加载数据并绑定数据");
				});
			$.event.on('#btn','click',function(){
					
				  alert("123");
				  //console.log(that.product.price);
				  //alert(that.product.price);
				 var price = that.gouwuche.add(that.product);
				 var nums = that.gouwuche.products.length;
				 // alert(price);
				 document.getElementById('price').innerHTML=price;
				 document.getElementById('num').innerHTML=nums
				});
		}
	}