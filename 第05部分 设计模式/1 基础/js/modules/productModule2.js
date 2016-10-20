// JavaScript Document
// JavaScript Document

//核心点：使用闭包封装私有函数，通过return的方式公开公有函数，最后通过立即执行函数来封装起来
//重点重点：必须将模块的私有方法封装起来，公共方法通过return方式
//模块除了return方法，还可以ruturn 对象

//产品基本信息模块
var p = new product('荣事达（Royalstar）YHG-150C 4L韩式多用锅电火锅炒菜煲汤锅','非常棒',2000);
var g = new gouwuche();

var productModule = (function(p,g) {
// 下面函数是私有的，但可以被公开函数访问
function bindData() {
	document.getElementById('pname').innerHTML= p.name;	
	};
	
function bindEvent() {
	$.event.on(window,'load',function(){
			alert("从服务器加载数据并绑定数据");
		});
	$.event.on('#btn','click',function(){
			alert("123");
			//console.log(that.product.price);
			//alert(that.product.price);
			var price = g.add(p);
			var nums = g.products.length;
			// alert(price);
			document.getElementById('price').innerHTML=price;
			document.getElementById('num').innerHTML=nums
		});
	};
		
// 返回一个对象赋予Module
return {
	init: function() {
	 // publicFunc可以直接访问privateFunc
	 bindData();
	 bindEvent();
	}
};

}(p,g));
