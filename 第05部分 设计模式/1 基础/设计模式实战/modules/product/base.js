
//匿名函数  立即函数 闭包。。。

   var productModule = (function(){
	   	//公有 私有
		//同时暴露公有
		var p ={};
	     var bindData = function()
		 {
			 document.getElementById('name').innerHTML = p.name;
			//document.getElementById('des').innerHTML = this.product.des;
			document.getElementById('jd-price').innerHTML=p.price;
		 }
	   
	     var bindEvents = function()
		 {
			 $.event.on(window,'load',function(){
				 	//ajax从服务端异步的读取数据，读取完以后再绑定
				 	 p ={
						 name:'欧尼尔(OUNIER)DS600A嵌入式家用商用烘焙电烤箱上下独立控温多功能大容量电烤箱 嵌入式电烤箱',
                         des:'6.1 6.10活动期间 领券更优惠',
						 price:2344
						 }
						bindData(); 
				 });
			 
			 
			$.event.on('#btn','click',function(){
				     //alert(p.name);				 
					 gouwuche.add(p);
					 document.getElementById('gprice').innerHTML=gouwuche.price;
					 //alert(that.gouwuche.products.length);
					 document.getElementById('num').innerHTML = gouwuche.products.length;
					 ///alert(that.gouwuche.price);
					//alert('123');
				});
		 }
		 //凡是公有的，需要暴露的必须通过return
		 return {
			  init:function(){
				  //bindData();
				  bindEvents();
				  }
			  ,add:function(){}
			 }
		 
		 
	   }());