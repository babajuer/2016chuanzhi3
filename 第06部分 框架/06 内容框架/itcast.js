/**
 * 作者：传智播客教育集团
 * 开发日期：2016/01/12
 * 描述：通用框架
 * 版权所有 违者必究
 */
var $$ = function() {};
$$.prototype = {
	/*将一个对象的所有属性拷贝给另一个对象*/
	extend:function(tar,source) {
		//遍历对象
		for(var i in source){
			tar[i] = source[i];
		}
		return tar;
	}
}
$$ = new $$();

//基础
$$.extend($$,{

	//随机数
	random: function (begin, end) {
		return Math.floor(Math.random() * (end - begin)) + begin;
	},
	/*模板操作*/
})

/*数据类型判断*/
$$.extend($$,{
	//数据类型检测
	isNumber:function (val){
		return typeof val === 'number' && isFinite(val)
	},
	isBoolean:function (val) {
		return typeof val ==="boolean";
	},
	isString:function (val) {
		return typeof val === "string";
	},
	isUndefined:function (val) {
		return typeof val === "undefined";
	},
	isObj:function (str){
		if(str === null || typeof str === 'undefined'){
			return false;
		}
		return typeof str === 'object';
	},
	isNull:function (val){
		return  val === null;
	},
	isArray:function (arr) {
		if(arr === null || typeof arr === 'undefined'){
			return false;
		}
		return arr.constructor === Array;
	},
})

/*字符串操作*/
$$.extend($$,{
	//去除左边空格
	ltrim:function(str){
		return str.replace(/(^\s*)/g,'');
	},
	//去除右边空格
	rtrim:function(str){
		return str.replace(/(\s*$)/g,'');
	},
	//去除空格
	trim:function(str){
		return str.replace(/(^\s*)|(\s*$)/g, '');
	},
	//简单的数据绑定formateString
	formateString:function(str, data){
		return str.replace(/@\((\w+)\)/g, function(match, key){
			return typeof data[key] === "undefined" ? '' : data[key]});
	},
})

/*ajax框架*/
$$.extend($$,{
	//ajax - 前面我们学习的
	myAjax:function(URL,fn){
		var xhr = createXHR();	//返回了一个对象，这个对象IE6兼容。
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
					fn(xhr.responseText);
				}else{
					alert("错误的文件！");
				}
			}
		};
		xhr.open("get",URL,true);
		xhr.send();

		//闭包形式，因为这个函数只服务于ajax函数，所以放在里面
		function createXHR() {
			//本函数来自于《JavaScript高级程序设计 第3版》第21章
			if (typeof XMLHttpRequest != "undefined") {
				return new XMLHttpRequest();
			} else if (typeof ActiveXObject != "undefined") {
				if (typeof arguments.callee.activeXString != "string") {
					var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
							"MSXML2.XMLHttp"
						],
						i, len;

					for (i = 0, len = versions.length; i < len; i++) {
						try {
							new ActiveXObject(versions[i]);
							arguments.callee.activeXString = versions[i];
							break;
						} catch (ex) {
							//skip
						}
					}
				}

				return new ActiveXObject(arguments.callee.activeXString);
			} else {
				throw new Error("No XHR object available.");
			}
		}
	}
})

/*事件框架*/
$$.extend($$,{
	/*事件绑定*/
	on: function (id, type, fn) {
		//var dom = document.getElementById(id);
		var dom = $$.isString(id)?document.getElementById(id):id;
		//如果支持
		//W3C版本 --火狐 谷歌 等大多数浏览器
		//如果你想检测对象是否支持某个属性，方法，可以通过这种方式
		if(dom.addEventListener ) {
			dom.addEventListener(type, fn, false);
		}else if(dom.attachEvent){
			//如果支持 --IE
			dom.attachEvent('on' + type, fn);
		}
	},
	/*点击*/
	click : function(id,fn){
		this.on(id,'click',fn);
	},
	/*鼠标移上*/
	mouseover:function(id,fn){
		this.on(id,'mouseover',fn);
	},
	/*鼠标离开*/
	mouseout:function(id,fn){
		this.on(id,'mouseout',fn);
	},
	/*鼠标悬浮*/
	hover:function (id,fnover,fnout){
		if(fnover){
			$$.on(id,"mouseover",fnover);
		}
		if(fnout){
			$$.on(id,"mouseout",fnout);
		}
	},
	//获取事件event对象
	getEvent:function (e){
		return e?e:window.event;
	},
	/*获取目标元素*/
	getTarget :function (e){
		var event = $$.getEvent(e)
		/*短路表达式*/
		return event.target || event.srcElement
	},
	//阻止默认行为
	preventDefault:function(event){
		var event = $$.getEvent(event);
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue = false;
		}
	},
	//阻止冒泡
	stopPropagation:function(event){
		var event = $$.getEvent(event);
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble = true;
		}
	}
})

/*选择框架*/
$$.extend($$,{
	$id:function(str){
		return document.getElementById(str)
	},
	/*tag选择器 ：g恩局标签选择一个元素*/
	$tag:function (tag,context){
		if(typeof context == 'string'){
			context = $$.$id(context);
		}

		if(context){
			return context.getElementsByTagName(tag);
		}else{
			return document.getElementsByTagName(tag);
		}
	},
	/*class选择器：根据class获取元素*/
	$class:function (context,className) {
		//如果浏览器支持
		context = document.getElementById(context);
		if(context.getElementsByClassName){
			return context.getElementsByClassName(className);
		}else{
			var arr=[];
			dom = context.getElementsByTagName('*');
			for(var i,len=dom.length;i<len;i++) {
				if(dom[i].className && dom[i].className ==className ) {
					arr.push(dom[i]);
				}
			}
		}
		return arr;
	},
	//分组
	$group:function(content) {
		var result=[],doms=[];
		var arr = $$.trim(content).split(',');
		//alert(arr.length);
		for(var i=0,len=arr.length;i<len;i++) {
			var item = $$.trim(arr[i])
			var first= item.charAt(0)
			var index = item.indexOf(first)
			if(first === '.') {
				doms=$$.$class(item.slice(index+1))
				//每次循环将doms保存在reult中
				//result.push(doms);//错误来源

				//陷阱1解决 封装重复的代码成函数
				pushArray(doms,result)

			}else if(first ==='#'){
				doms=[$$.$id(item.slice(index+1))]
				//陷阱：之前我们定义的doms是数组，但是$id获取的不是数组，而是单个元素
				//封装重复的代码成函数
				pushArray(doms,result)
			}else{
				doms = $$.$tag(item)
				pushArray(doms,result)
			}
		}
		return result;

		//封装重复的代码
		function pushArray(doms,result){
			for(var j= 0, domlen = doms.length; j < domlen; j++){
				result.push(doms[j])
			}
		}
	},
	/*层次*/
	$cengci:function (select){
		//个个击破法则 -- 寻找击破点
		var sel = $$.trim(select).split(' ');
		var result=[];
		var context=[];
		for(var i = 0, len = sel.length; i < len; i++){
			result=[];
			var item = $$.trim(sel[i]);
			var first = sel[i].charAt(0)
			var index = item.indexOf(first)
			if(first ==='#'){
				//如果是#，找到该元素，
				pushArray([$$.$id(item.slice(index + 1))]);
				context = result;
			}else if(first ==='.'){
				//如果是.
				//如果是.
				//找到context中所有的class为【s-1】的元素 --context是个集合
				if(context.length){
					for(var j = 0, contextLen = context.length; j < contextLen; j++){
						pushArray($$.$class(item.slice(index + 1), context[j]));
					}
				}else{
					pushArray($$.$class(item.slice(index + 1)));
				}
				context = result;
			}else{
				//如果是标签
				//遍历父亲，找到父亲中的元素==父亲都存在context中
				if(context.length){
					for(var j = 0, contextLen = context.length; j < contextLen; j++){
						pushArray($$.$tag(item, context[j]));
					}
				}else{
					pushArray($$.$tag(item));
				}
				context = result;
			}
		}

		return context;

		//封装重复的代码
		function pushArray(doms){
			for(var j= 0, domlen = doms.length; j < domlen; j++){
				result.push(doms[j])
			}
		}
	},
	//多组+层次
	$select:function(str) {
		var result = [];
		var item = $$.trim(str).split(',');
		for(var i = 0, glen = item.length; i < glen; i++){
			var select = $$.trim(item[i]);
			var context = [];
			context = $$.$cengci(select);
			pushArray(context);

		};
		return result;

		//封装重复的代码
		function pushArray(doms){
			for(var j= 0, domlen = doms.length; j < domlen; j++){
				result.push(doms[j])
			}
		}
	},
	//html5实现的选择器
	$all:function(selector,context){
		context = context || document;
		return  context.querySelectorAll(selector);
	},
})

/*css框架*/
$$.extend($$,{
	//显示
	show:function (context){
		var doms = $$.$all(context)
		for(var i=0;i<doms.length;i++){
			$$.css(doms[i], 'display', 'block');
		}
	},

	//隐藏
	hide:function (context){
		var doms = $$.$all(context)
		for(var i=0;i<doms.length;i++){
			$$.css(doms[i], 'display', 'none');
		}
	},

	/*css*/
	css:function(context, key, value){
		var dom = $$.isString(context)?$$.$all(context) : context;
		//如果是数组
		if(dom.length){
			//先骨架骨架 -- 如果是获取模式 -- 如果是设置模式
			//如果value不为空，则表示设置
			if(value){
				for(var i = dom.length - 1; i >= 0; i--){
					setStyle(dom[i],key, value);
				}
				//            如果value为空，则表示获取
			}else{
				return getStyle(dom[0]);
			}
			//如果不是数组
		}else{
			if(value){
				setStyle(dom,key, value);
			}else{
				return getStyle(dom);
			}
		}
		function getStyle(dom){
			if(dom.currentStyle){
				return dom.currentStyle[key];
			}else{
				return getComputedStyle(dom,null)[key];
			}
		}
		function setStyle(dom,key,value){
			dom.style[key] = value;
		}
	},
	//元素高度宽度概述
	//计算方式：clientHeight clientWidth innerWidth innerHeight
	//元素的实际高度+border，也不包含滚动条
	Width:function (id){
		return $$.$id(id).clientWidth
	},
	Height:function (id){
		return $$.$id(id).clientHeight
	},


	//元素的滚动高度和宽度
	//当元素出现滚动条时候，这里的高度有两种：可视区域的高度 实际高度（可视高度+不可见的高度）
	//计算方式 scrollwidth
	scrollWidth:function (id){
		return $$.$id(id).scrollWidth
	},
	scrollHeight:function (id){
		return $$.$id(id).scrollHeight
	},


	//元素滚动的时候 如果出现滚动条 相对于左上角的偏移量
	//计算方式 scrollTop scrollLeft
	scrollTop:function (id){
		return $$.$id(id).scrollTop
	},
	scrollLeft:function (id){
		return $$.$id(id).scrollLeft
	},

	//获取屏幕的高度和宽度
	sHeight:function (){
		return  window.screen.height
	},
	sWidth:function (){
		return  window.screen.width
	},

	//文档视口的高度和宽度
	wWidth:function (){
		return document.documentElement.clientWidth
	},
	wHeight:function (){
		return document.documentElement.clientHeight
	},
	//文档滚动区域的整体的高和宽
	wScrollHeight:function () {
		return document.body.scrollHeight
	},
	wScrollWidth:function () {
		return document.body.scrollWidth
	},
	//获取滚动条相对于其顶部的偏移
	wScrollTop:function () {
		var scrollTop = window.pageYOffset|| document.documentElement.scrollTop || document.body.scrollTop;
		return scrollTop
	},
	//获取滚动条相对于其左边的偏移
	wScrollLeft:function () {
		var scrollLeft = document.body.scrollLeft || (document.documentElement && document.documentElement.scrollLeft);
		return scrollLeft
	}
})

/*属性*/
$$.extend($$,{
	attr:function (context,key,value){
		var doms = $$.$all(context)
		//设置模式
		if(value){
			for(var i =0;i<doms.length;i++){
				doms[i].setAttribute(key,value)
			}
		}else{
			//获取模式
			return doms[0].getAttribute(key)
		}
	},
	//动态添加和移除class
	addClass:function (context, name){
		var doms = $$.$all(context);
		//如果获取的是集合
		if(doms.length){
			for(var i= 0,len=doms.length;i<len;i++){
				addName(doms[i]);
			}
			//如果获取的不是集合
		}else{
			addName(doms);
		}
		function addName(dom){
			dom.className = dom.className + ' ' + name;
		}
	},
	removeClass:function (context, name){
		var doms = $$.$all(context);
		for(var i= 0,len=doms.length;i<len;i++){
			removeName(doms[i],name);
		}
		function removeName(dom,name){
			/*'add buy hide' --- 'add buy'*/
			dom.className =  dom.className.replace(name,'')
			/* dom.className = dom.className + ' ' + name;*/
		}
	},
	//基础一般的同学不用研究，只需要研究基础的
	/*成绩好的，研究一下并不看代码自己实现*/
	hasClass: function (context,name){
		var doms = $$.$all(context)
		var flag = true;
		for(var i= 0,len=doms.length;i<len;i++){
			flag = flag && check(doms[i],name)
		}

		return flag;
		//判定单个元素
		function check(element,name){
			return -1<(" "+element.className+" ").indexOf(" "+name+" ")
		}
	}
})


/*内容框架*/
$$.extend($$,{
	/*设置或者获取元素的内容*/
	html:function (context,value){
	var doms = $$.$all(context)
	//设置模式
	if(value){
		for(var i = 0;i<doms.length;i++){
			doms[i].innerHTML = value
		}
	}else{
		/*获取模式*/
		return doms[0].innerHTML
	}
}
})
/* 成绩好的：课后研究value*/
/*checkbox select button text textarea radio*/
