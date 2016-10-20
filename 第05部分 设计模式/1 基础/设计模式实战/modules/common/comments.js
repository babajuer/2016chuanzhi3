  //定义页面的模块
	//产品基础模块
	var productModule = function(p,g)
	{
	  this.product = p;
	  this.gouwuche = g;
	}
	productModule.prototype={
		init:function()
		{
			this.bindData();
			this.bindEvents();
		}
		,bindData:function()
		{
			//绑定名称，绑定价格，绑定描述
			document.getElementById('name').innerHTML = this.product.name;
			//document.getElementById('des').innerHTML = this.product.des;
			document.getElementById('jd-price').innerHTML=this.product.price;
		}
		,bindEvents:function()
	    {
			var that = this;
			$.event.on('#btn','click',function(){
				     //alert(p.name);
					 
					 that.gouwuche.add(p);
					 
					 document.getElementById('gprice').innerHTML=that.gouwuche.price;
					 //alert(that.gouwuche.products.length);
					 document.getElementById('num').innerHTML = that.gouwuche.products.length;
					 ///alert(that.gouwuche.price);
					//alert('123');
				});
	    }
	}