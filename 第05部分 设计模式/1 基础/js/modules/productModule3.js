// JavaScript Document
// JavaScript Document

//产品基本信息模块
//var p = new product('荣事达（Royalstar）YHG-150C 4L韩式多用锅电火锅炒菜煲汤锅','非常棒',2000);
//var g = new gouwuche();

var productModule = (function() {
	var p = {};
// 下面函数是私有的，但可以被公开函数访问
function bindData() {
	document.getElementById('pname').innerHTML= p.name;	
	};
	
function bindEvent() {
	$.event.on(window,'load',function(){
			alert("从服务器加载数据并绑定数据");
			//这里p的数据其实来源于服务器端，通过ajax读取数据
			p = {
				name:'荣事达（Royalstar）YHG-150C 4L韩式多用锅电火锅炒菜煲汤锅'
				,des:'非常棒'
				,price:2000
		       }
			   
			 bindData();
		});
	$.event.on('#btn','click',function(){
			alert("123");
			//console.log(that.product.price);
			//alert(that.product.price);
			var price = gouwuche.add(p);
			var nums = gouwuche.products.length;
			// alert(price);
			document.getElementById('price').innerHTML=price;
			document.getElementById('num').innerHTML=nums
		});
	};
		
// 返回一个对象赋予Module
return {
	init: function() {
	 bindEvent();
	 // publicFunc可以直接访问privateFunc
	 //bindData();
	}
};

}());
