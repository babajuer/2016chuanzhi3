
//我们的框架
 ;(function(){	
	var ICD = {};
	
	//二级命名空间  -- 通过二级命名空间来管理模块
	ICD.dom={};
	ICD.event={};
	ICD.animate={};
	ICD.pages={};
	ICD.Modules={};
	ICD.Controls={};
	ICD.Common={};
	

// 选择框架
ICD.dom.g = function(str, ctx){
	if(typeof str === 'object'){
		return [str];
	};
	var sel = '',
		result = [],
		context,
		arr = [];
	var group = str.split(',');
	for(var g = 0, glen = group.length; g < glen; g++){
		var select = group[g].replace(/^\s*|\s*$/g, '').split(' ');
		context = ICD.dom.g(ctx || document);
		for(var s = 0, slen = select.length; s < slen; s++){
			sel = select[s];
			arr = [];
			if(sel.indexOf('#') >= 0){
				if(context.length){
					for(var c = 0, clen = context.length; c < clen; c++){
						pushArr($id(sel.slice(sel.indexOf('#') + 1), context[c]), arr);
					}
				}else{
					pushArr($id(sel.slice(sel.indexOf('#') + 1)), arr);
				}
				context = arr;
			}else if(sel.indexOf('.') >= 0){
				if(context.length){
					for(var c = 0, clen = context.length; c < clen; c++){
						pushArr($class(sel.slice(sel.indexOf('.') + 1), context[c]), arr);
					}
				}else{
					pushArr($class(sel.slice(sel.indexOf('.') + 1)), arr);
				}
				context = arr;
			}else{
				if(context.length){
					for(var c = 0, clen = context.length; c < clen; c++){
						pushArr($tag(sel, context[c]), arr);
					}
				}else{
					pushArr($tag(sel), arr);
				}
				context = arr;
			}
		}
		pushArr(context, result);
	};
	function pushArr(doms, arr){
		for(var k = 0, domsLen = doms.length; k < domsLen; k++){
			arr.push(doms[k]);			
		}
	}
	function $id(id, context){
		if(!context){
			var arr = [];
			arr.push(document.getElementById(id));
			return arr;
		}else{
			var dom = context.getElementsByTagName('*'),
				arr = [];
			for(var i = 0, len = dom.length; i < len; i++){
				if(dom[i].id && dom[i].id.indexOf(id) >= 0){
					arr.push(dom[i]);
				}
			}
			return arr
		}	
	}
	function $tag(tag, context){
		if(context){
			return context.getElementsByTagName(tag);
		}else{
			return document.getElementsByTagName(tag);
		}
	}
	function $class(className, context){
		if(context){
			if(context.getElementsByClassName){
				return context.getElementsByClassName(className);
			}
		}else{
			if(document.getElementsByClassName){
				return document.getElementsByClassName(className);
			} 
		}
		var arr = [];
		if(context){
			var dom = context.getElementsByTagName('*');
		}else{
			var dom = document.getElementsByTagName('*');
		}	
		for(var i = 0, len = dom.length; i < len; i++){
			if(dom[i].className && dom[i].className.indexOf(className) >= 0){
				arr.push(dom[i]);
			}
		}
		return arr
	}
	return result;
}

ICD.dom.q = function(dom, tag){
	var result = [], children,
		tag = tag;
	if(typeof dom == 'string'){
		dom = ICD.dom.g(dom);
	}
	if(dom.length){
		for(var i = 0, len = dom.length; i < len; i++){
			getDom(dom[i].children);
		}
	}else{
		getDom(dom.children);
	}
	function getDom(doms){
		for(var c = 0, clen = doms.length; c < clen; c++){
			if(doms[c].tagName.toLowerCase() == tag.toLowerCase()){
				result.push(doms[c]);
			}
		}
	}
	return result;
}


//其他dom框架
/***
 * extend
 ************/
 //设置元素的样式属性 css（'test'，'color','red'）；
ICD.dom.css = function(id, key, value){
	var dom = typeof id === 'string' ? ICD.dom.g(id) : id;
	if(dom.length){
		if(value){
			for(var i = dom.length - 1; i >= 0; i--){
				setStyle(dom[i]);
			}
		}else{
			return getStyle(dom[0]);
		}		
	}else{
		if(value){
			setStyle(dom);
		}else{
			return getStyle(dom);
		}
	}
	function getStyle(dom){
		if(dom.currentStyle){
			return dom.currentStyle[key];	
		}else{
			return getComputedStyle(dom,false)[key];	
		}
	}	
	function setStyle(dom){
		if(key === 'opacity'){
			if('opacity' in dom.style){
				dom.style.opacity = value;
			}else{
				dom.style.filter = 'alpha(opacity=' + value * 100 + ')';
			}
		}else{
			dom.style[key] = value;
		}
	}
}
//属性操作，获取属性的值，设置属性的值 attr（'test','target','_blank'）
ICD.dom.attr = function(id, key, value){
	var dom = typeof id === 'string' ? ICD.dom.g(id) : id;
	if(dom.length){
		if(value){
			for(var i = dom.length - 1; i >= 0; i--){
				dom[i].setAttribute(key, value);
			}
		}else{
			return dom[0].getAttribute(key);
		}		
	}else{
		if(value){
			dom.setAttribute(key, value);
		}else{
			return dom.getAttribute(key);
		}
	}	
}
//innerHTML的函数版本 
ICD.dom.html = function(id, value){
	var dom = typeof id === 'string' ? ICD.dom.g(id) : id;
	if(dom.length){
		for(var i = dom.length - 1; i >= 0; i--){
			dom[i].innerHTML = value;
		}
	}else{
		dom.innerHTML = value;
	}
}
//隐藏和显示元素
ICD.dom.show = function(id, time){
	if(time){
		// var ani = animate || ICD.getAnimate();
		var dom = typeof id === 'string' ? ICD.dom.g(id) : id;
		if(dom.length){
			for(var i = dom.length - 1; i >= 0; i--){
				showAnimate(dom[i]);
			}
		}else{
			showAnimate(dom);
		}		
	}else{
		ICD.dom.css(dom, 'display', 'block');
	}
			function showAnimate(dom){
			if(ICD.dom.css(dom, 'display') == 'block'){
				return;
			}
			ICD.dom.css(dom, 'opacity', 0);
			ICD.dom.css(dom, 'display', 'block'); 
			ICD.animate.add({
				duration : time
				,id : dom
				,main : function(){
					ICD.dom.css(dom, 'opacity', this.tween);
				}
			})
		}
}
//隐藏和显示元素
ICD.dom.hide = function(id, time){
	//alert("panduan");
	//alert(id);
	if(time){
		// var ani = animate || ICD.getAnimate();
		var dom = typeof id === 'string' ? ICD.dom.g(id) : id;
		//alert(dom.length);
		if(dom.length){
			for(var i = dom.length - 1; i >= 0; i--){
				//alert('是否进入循环');
				hideAnimate(dom[i]);
			}
		}else{
			hideAnimate(dom);
		}	
	}else{
		ICD.dom.css(dom, 'display', 'none');
	}
		function hideAnimate(dom){
			//alert('是否走到这里');
			if(ICD.dom.css(dom, 'display') == 'none'){
				return;
			}
			ICD.dom.css(dom, 'opacity', 1);
			//alert("是否走到这里");
			ICD.animate.add({
				duration : time
				,id : dom
				,main : function(){
					ICD.dom.css(dom, 'opacity', 1- this.tween);
				}
				,end : function(){
					ICD.dom.css(dom, 'display', 'none');				
				}
			})
		}	
}
//获取滚动条当前坐标 返回 {x，y}
ICD.dom.getScroll = function(){
	if(document.body.scrollTop){
		return {
			x : document.body.scrollLeft,
			y : document.body.scrollTop
		}
	}else{
		return {
			x : document.documentElement.scrollLeft,
			y : document.documentElement.scrollTop
		}
	}
}
//动态添加和移除class
ICD.dom.addClass = function(id, name){
	var dom = typeof id === 'string' ? ICD.dom.g(id) : id;
	if(dom.length){
		for(var i = dom.length - 1; i >= 0; i--){
			addName(dom[i]);
		}
	}else{
		addName(dom);
	}
	function addName(dom){
		if(dom.className.indexOf(name) < 0){
			dom.className = dom.className + ' ' + name;
		}
	}
}
ICD.dom.removeClass = function(id, name){
	var dom = typeof id === 'string' ? ICD.dom.g(id) : id;
	if(dom.length){
		for(var i = dom.length - 1; i >= 0; i--){
			removeName(dom[i]);
		}
	}else{
		removeName(dom);
	}
	function removeName(dom){
		dom.className = dom.className.replace(name, '');
	}
}
	


//事件框架
// 绑定事件
ICD.event.on = function(id, type, fn){
	var dom = typeof id === 'string' ? ICD.dom.g(id) : id;
	if(dom.length){
		for(var i = dom.length - 1; i >= 0; i--){
			addEvent(dom[i]);
		}
	}else{
		addEvent(dom);
	}
	function addEvent(dom){
		if(dom.addEventListener){
			dom.addEventListener(type, fn, false);
		}else if(dom.attachEvent){
			dom.attachEvent('on' + type, fn);
		}else{
			dom['on' + type] = fn;
		}
	}
}
// 解除事件
ICD.event.un = function(id, type, fn){
	var dom = typeof id === 'string' ? ICD.dom.g(id) : id;
	if(dom.length){
		for(var i = dom.length - 1; i >= 0; i--){
			removeEvent(dom[i]);
		}
	}else{
		removeEvent(dom);
	}
	function removeEvent(dom){
		if(dom.removeEventListener){
			dom.removeEventListener(type, fn);
		}else if(dom.detachEvent){
			dom.detachEvent(type, fn);
		}else{
			dom['on' + type] = null;
		}
	}
}
// 获取事件对象
ICD.event.getEvent = function(event){
	return event ? event : window.event;
}
// 获取元素
ICD.event.getTarget = function(event){
	var event = ICD.event.getEvent(event);
	return event.target || event.srcElement;
}
// 阻止冒泡以及捕获
ICD.event.stopPropagation = function(event){
	var event = ICD.event.getEvent(event);
	if(event.stopPropagation){
		event.stopPropagation();
	}else{
		event.cancelBubble = true;
	}
}
// 阻止默认行为
ICD.event.preventDefault = function(event){
	var event = ICD.event.getEvent(event);
	if(event.preventDefault){
		event.preventDefault();
	}else{
		event.returnValue = false;
	}
}
//获取鼠标按钮数值
ICD.event.getDetail = function(event){
	var event = ICD.event.getEvent(event);
	if(event.wheelDelta){
		return event.wheelDelta;
	}else{
		return -event.detail * 40;
	}
}
	




var Animate = function(interval){
		this._timer = 0;
		this._queen = [];
		this._interval = interval || false;
	}
Animate.prototype = {
	
	
//-------------------------算法部------------------------------
easing : {
			def: function (t, b, c, d) {
                return (c - b) * t / d + b
            },
			linear: function (t, b, c, d) {
			  return (c - b) * t / d + b
		     }
			 
		 	,bounce:function (t, b, c, d){
				if ((t/=d) < (1/2.75)) {
					return c*(7.5625*t*t) + b;
				} else if (t < (2/2.75)) {
					return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
				} else if (t < (2.5/2.75)) {
					return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
				} else {
					return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
				}
		    }
	     }	 		

		 
		 
		 
//-------------------------运行团队------------------------------
,_run : function(){
				 //大家清除 每次动画执行之前先清场 前面讲过
				 //整理思路很简单就是 循环执行动画
				if(this._timer) return;
				this._clear();
				var that = this;
				//这里为什么要用that
				//因为在函数体内 this是不会找到_loop的
				that._timer = setInterval(function(){that._loop();}, that._interval);
			}	
			
//变化点 loop
,_loop : function(){
					//清除
				if(this._queen.length === 0){
					this._clear();
					return;
				}
				var now = +new Date()
					,i = this._queen.length - 1
					,instance = null;
					//队列循环
				for(; i >= 0; i--){
					instance = this._queen[i];
					instance.passed = now - instance.time;
					if(instance.passed < 0)
						continue;
					if(instance.passed >= instance.duration){
						instance.passed = instance.duration;
						instance.tween = instance.to;
						this._execute(instance);
						this._destory(instance);
					}else{
						this._bufferExec(instance);
					}
					instance = null;
				}
		}
								
//try catch 语句的原理和用法
,_execute : function(instance){
				instance.main(instance.args);
			}
	
// 循环步长算法缓冲函数
,_bufferExec : function(instance){
				//根据用户输入的数据动态决定使用哪个算法
			instance.tween = this.easing[instance.type](instance.passed, instance.from, instance.to, instance.duration);
			this._execute(instance);
		}
	




	
//-------add团队-------
//指挥中心
,add : function(param){
			if(!param)
				return;
			var tostring = Object.prototype.toString;
			if(tostring.call(param) === "[object Array]"){
				for(var i = 0, len = param.length; i < len; i++){
					tostring.call(param[i]) === "[object Object]" && 
					this._addInstance(param[i]);
				}
			}else if(tostring.call(param) === "[object Object]"){
				this._addInstance(param);
			}
			this._run();
		}
			 
,add2 : function(param){
				if(!param)
					return;
				this._addInstance(param);
				this._run();
	         }
			 
,addOld : function(obj){
				if(!obj)
					return;
				//适配器
				this._obj = this._adaptInstance(obj);
				//运行
				this._run();
			}

,_addInstance : function(instance){	
				var obj = this._adaptInstance(instance),
					pos = this._getIndex(obj);
				if(pos < 0){
					this._queen.push(obj);
				}				
	         }
//初始化
 //为什么?? 因为用户传递过来的对象不一定完整,我们需要补全属性
,_adaptInstance : function(instance){
				var defaultValue = this.extend({}, {
						from : 0
						,to : 1
						,type : 'def'
						,duration : 400
						,args : null
						,main : function(){}
						,time : +new Date()
						,end : function(){}
					});
			   //if(instance.type && !(instance.type in this.easing))
               //instance.type = 'def';

				//对象遍历语法
				for(var key in defaultValue){
					if(typeof instance[key] === 'undefined')
						instance[key] = defaultValue[key];
				}		
				return instance;
		}

		
		
		
		
	
//------------ 后勤部----------------------------------
,_clear : function(){
				clearInterval(this._timer);
				 //为什么是0 大家知道0又表示false 其他数字都是ture,这是为了以后计算需要用到
				this._timer = 0;
			}
		
,_destory : function(instance){
			var that = this;
			that._queen.splice(that._getIndex(instance), 1);	
			instance.end(instance.args);
			for(var key in instance){
				delete instance[key];
			}
			instance = null;
		}

		
		
		
		
//--------------其他公有部-----------------------------------			
//简单版本
,_getIndex2 : function(instance){
				var i = this._queen.length - 1;
				for(; i >= 0; i--){
					if(this._queen[i] === instance){
							return i
					}
				}
				return -1;
	         }
			 
//优化版本
,_getIndex : function(instance){
			var i = this._queen.length - 1;
			for(; i >= 0; i--){
				if(instance.id && this._queen[i].id === instance.id){
						return i
				}
			}
			return -1;
		}
	



	
//------------扩展部------------------------------------
//给一个对象扩充功能的两种方法
,extend : function(tar,source) {
			//遍历对象
			for(var i in source){
				tar[i] = source[i];
			}
			return tar;
		 }
,extend2 : function() {
			var key
				,i = 1
				,len = arguments.length
				,target = null
				,copy;
			if(len === 0){
				return;
			}else if(len === 1){
				target = this.prototype;
			}else{
				target = arguments[0];
			}

			for(; i < len; i++){
				for(key in arguments[i]){
					copy = arguments[i][key];
					target[key] = copy;
				}
			}
			return target;
		}
	}




ICD.animate = new Animate();
	
window.ICD = $ = ICD;


})();

