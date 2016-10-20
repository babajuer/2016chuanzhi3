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

/*动画框架*/
function Animate() {

    //一般再编写框架的时候都会定义一个配置对象保存控制动画的一些值，允许用户自定义
    //我们首先定义好默认值
    this.config={
        interval:16,
        ease:'linear',
    }

    this.timer =0;
    //定义一个index统计每次添加的对象编号 第一个为0
    this.index=-1;
    //动画对象
    //我们定义一个对象来保存运动中我们需要的数据，比如now，pass等
    this._obj={};
    //我们使用数组来保存每个每个物体的运动数据
    this._queen=[]
    //调用初始化函数
    this._init();
}
Animate.prototype ={


    /* ------------------------------------------------
     *公共部门
     *放置其他部门都会使用的公共方法属性
     *-------------------------------------------------*/
    eases:{
        //线性匀速
        linear:function (t, b, c, d){
            return (c - b) * (t/ d);
        },
        //弹性运动
        easeOutBounce:function (t, b, c, d) {
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
            }
        },
        //其他
        swing: function (t, b, c, d) {
            return this.easeOutQuad(t, b, c, d);
        },
        easeInQuad: function (t, b, c, d) {
            return c*(t/=d)*t + b;
        },
        easeOutQuad: function (t, b, c, d) {
            return -c *(t/=d)*(t-2) + b;
        },
        easeInOutQuad: function (t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t + b;
            return -c/2 * ((--t)*(t-2) - 1) + b;
        },
        easeInCubic: function (t, b, c, d) {
            return c*(t/=d)*t*t + b;
        },
        easeOutCubic: function (t, b, c, d) {
            return c*((t=t/d-1)*t*t + 1) + b;
        },
        easeInOutCubic: function (t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t + b;
            return c/2*((t-=2)*t*t + 2) + b;
        },
        easeInQuart: function (t, b, c, d) {
            return c*(t/=d)*t*t*t + b;
        },
        easeOutQuart: function (t, b, c, d) {
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },
        easeInOutQuart: function (t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        },
        easeInQuint: function (t, b, c, d) {
            return c*(t/=d)*t*t*t*t + b;
        },
        easeOutQuint: function (t, b, c, d) {
            return c*((t=t/d-1)*t*t*t*t + 1) + b;
        },
        easeInOutQuint: function (t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
            return c/2*((t-=2)*t*t*t*t + 2) + b;
        },
        easeInSine: function (t, b, c, d) {
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        },
        easeOutSine: function (t, b, c, d) {
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        },
        easeInOutSine: function (t, b, c, d) {
            return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
        },
        easeInExpo: function (t, b, c, d) {
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        },
        easeOutExpo: function (t, b, c, d) {
            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },
        easeInOutExpo: function (t, b, c, d) {
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
            return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
        },
        easeInCirc: function (t, b, c, d) {
            return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
        },
        easeOutCirc: function (t, b, c, d) {
            return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
        },
        easeInOutCirc: function (t, b, c, d) {
            if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
            return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
        },
        easeInElastic: function (t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        },
        easeOutElastic: function (t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
        },
        easeInOutElastic: function (t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
        },
        easeInBack: function (t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },
        easeOutBack: function (t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },
        easeInOutBack: function (t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        },
        easeInBounce: function (t, b, c, d) {
            return c - this.easeOutBounce (d-t, 0, c, d) + b;
        },
        easeInOutBounce: function (t, b, c, d) {
            if (t < d/2) return this.easeInBounce (t*2, 0, c, d) * .5 + b;
            return this.easeOutBounce (t*2-d, 0, c, d) * .5 + c*.5 + b;
        }
    },
    //获取时间进程
    _getTween:function (now,pass,duration,ease){
        var yongshi = pass -now;
        //复习字面量的两种访问方式
        return this.eases[ease](yongshi,0,1,duration);
    },
    //初始化执行的代码一般放在init里面，一般是构造函数调用
    _init:function(){},

    /*新的技术*/
   getAnimationFrame:function(){
    var lastTime = 0;
    var prefixes = 'webkit moz ms o'.split(' '); //各浏览器前缀

    var requestAnimationFrame = window.requestAnimationFrame;
    var cancelAnimationFrame = window.cancelAnimationFrame;

    var prefix;
    //通过遍历各浏览器前缀，来得到requestAnimationFrame和cancelAnimationFrame在当前浏览器的实现形式
    for( var i = 0; i < prefixes.length; i++ ) {
        if ( requestAnimationFrame && cancelAnimationFrame ) {
            break;
        }
        prefix = prefixes[i];
        requestAnimationFrame = requestAnimationFrame || window[ prefix + 'RequestAnimationFrame' ];
        cancelAnimationFrame  = cancelAnimationFrame  || window[ prefix + 'CancelAnimationFrame' ] || window[ prefix + 'CancelRequestAnimationFrame' ];
    }

    //如果当前浏览器不支持requestAnimationFrame和cancelAnimationFrame，则会退到setTimeout
    if ( !requestAnimationFrame || !cancelAnimationFrame ) {
        requestAnimationFrame = function( callback, element ) {
            var currTime = new Date().getTime();
            //为了使setTimteout的尽可能的接近每秒60帧的效果
            var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
            var id = window.setTimeout( function() {
                callback( currTime + timeToCall );
            }, timeToCall );
            lastTime = currTime + timeToCall;
            return id;
        };

        cancelAnimationFrame = function( id ) {
            window.clearTimeout( id );
        };
    }

    //得到兼容各浏览器的API
    return {
        requestAnimationFrame : requestAnimationFrame,
        cancelAnimationFrame : cancelAnimationFrame
    }

},

    /* ------------------------------------------------
     *运行部 老大:run
     *部门职责描述: 根据添加进来的元素属性创建动画,并运行起来
     *-------------------------------------------------*/
    //运行部老大
    _run:function(){
        var that = this;

        //run函数其实就是个循环
        that.timer = setInterval(function(){that._loop();}, that.config.interval);
    },
    //我们新增一个loop以此针对每个物体做运动 --其实就是遍历每个对象，然后依次执行move方法
    _loop:function(){
        for(var i= 0,len=this._queen.length;i<len;i++){
            this._move(this._queen[i])
        }
    },
    //单个物体运动方法
    _move:function (_obj) {
        var pass = +new Date();
        _obj.pass = pass - _obj.now;

        var dom =_obj.dom;
        var styles= _obj.styles;
        var tween = this._getTween(_obj.now,pass,_obj.duration,this.config.ease);
        if(tween>=1) {
            //this.timer.clearInterval();
            //this.timer = 0;
            //_obj.callback()
            tween = 1;
            for(var i= 0,len=styles.length;i<len;i++) {
                if(styles[i].property=='opacity') {

                    $$.css(dom, styles[i].property, styles[i].start+styles[i].juli*tween);
                }
                else {
                    $$.css(dom, styles[i].property, styles[i].start+styles[i].juli*tween+'px');
                }
            }
        }else {
            for(var i= 0,len=styles.length;i<len;i++) {
                if(styles[i].property=='opacity') {

                    $$.css(dom, styles[i].property, styles[i].start+styles[i].juli*tween);
                }
                else {
                    $$.css(dom, styles[i].property, styles[i].start+styles[i].juli*tween+'px');
                }
            }
        }
    },
    //动画执行结束后的回调函数
    _callBack:function(){},



    /* ------------------------------------------------
     *添加部  -- add
     *部门职责描述: 添加元素 以及确定我要对哪个属性做动画
     *-------------------------------------------------*/
    //部门老大 - 添加
    addOld:function(id,json,duration,callback) {
        //add方法做两件事情：适配器，运行动画，只要用户调用add方法，整个动画能够运行起来
        //我们先宏观规划add函数的接口 --注释法
        this._apdapter(id,json,duration,callback)
        this._run();
    },
    add:function() {
        try{
            //add方法做两件事情：适配器，运行动画，只要用户调用add方法，整个动画能够运行起来
            //我们先宏观规划add函数的接口 --注释法
            var options = arguments
            var id = options[0]
            var json = options[1]
            var duration = options[2]
            var callback = options[3]

            console.log(duration)

            //添加默认值
            if(!duration) {
                duration=2000;
            }else {
                if($$.isString(duration)){
                    switch (duration) {
                        case 'slow' :
                        case '慢' :
                            duration = 8000;
                            break;
                        case 'normal' :
                        case '普通' :
                            duration = 4000;
                            break;
                        case 'fast' :
                        case '快' :
                            duration = 2000;
                            break;
                    }
                }else{
                }
            }
            this._apdapter(id,json,duration,callback)
            this._run();
        }catch(e){
            alert('代码出错,系统出错提示：'+'\n'+ e.message+'\n'+ e.name);
        }

    },
    //适配器 --单一职责原则
    //我们继续完善适配器 -- 这样运行部需要的数据基本都保存在_obj中了
    _apdapter:function (id,source,duration,callback){
        var _obj={}
        this.index++;
        _obj.index=this.index;
        /*数据类型判断的重要性*/
        _obj.dom = $$.isString(id)?$$.$id(id):id
        _obj.duration = duration
        _obj.now = +new Date()
        _obj.callback =callback;

        var target=[];
        for(var item in source){
            var json={};
            //元素属性的起始位置 比如目标元素目前left 100px，希望运动到500px，那么100就是起始位置
            json.start = parseFloat($$.css(_obj.dom,item))
            json.juli = parseFloat(source[item]) - json.start;
            json.property = item
            target.push(json)
        }
        _obj.styles = target;
        this._queen.push(_obj)
    },




    /* ------------------------------------------------
     *公共API -- 学习什么是公共API
     *提供给使用框架的人，使用框架的人一般只需要这样
     *-------------------------------------------------*/
    //开始动画
    begin:function() {},
    //停止动画
    stop:function() {},
    //自定义动画的配置
    setConfig:function(json){
        //如何允许用户控制动画
        var that = this;
        $$.extend(this.config,json)
    },

    /* ------------------------------------------------
     *后勤部
     *部门职责描述: 辅助运行动画  比如清除 比如内存回收
     *-------------------------------------------------*/
    _destroy:function(obj) {
        var that = this;
        //内存优化
        //1 释放队列  -- 数组实现的  -- 就是删除数组
        //哪个物体执行完，我就释放哪个物体所占用的内存
        that._queen.splice(obj.index,1);
        //2 释放对象的属性和方法
        for(var i in obj) {
            delete obj[i];
        }
        //3 释放对象所占用的内存
        obj = null;
    }

}
$$.animate = new Animate()


