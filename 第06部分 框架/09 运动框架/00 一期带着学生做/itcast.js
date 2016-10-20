/**
 * ���ߣ����ǲ��ͽ�������
 * �������ڣ�2016/01/12
 * ������ͨ�ÿ��
 * ��Ȩ���� Υ�߱ؾ�
 */
var $$ = function() {};
$$.prototype = {
	/*��һ��������������Կ�������һ������*/
	extend:function(tar,source) {
		//��������
		for(var i in source){
			tar[i] = source[i];
		}
		return tar;
	}
}
$$ = new $$();

//����
$$.extend($$,{

	//�����
	random: function (begin, end) {
		return Math.floor(Math.random() * (end - begin)) + begin;
	},
	/*ģ�����*/
})

/*���������ж�*/
$$.extend($$,{
	//�������ͼ��
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

/*�ַ�������*/
$$.extend($$,{
	//ȥ����߿ո�
	ltrim:function(str){
		return str.replace(/(^\s*)/g,'');
	},
	//ȥ���ұ߿ո�
	rtrim:function(str){
		return str.replace(/(\s*$)/g,'');
	},
	//ȥ���ո�
	trim:function(str){
		return str.replace(/(^\s*)|(\s*$)/g, '');
	},
	//�򵥵����ݰ�formateString
	formateString:function(str, data){
		return str.replace(/@\((\w+)\)/g, function(match, key){
			return typeof data[key] === "undefined" ? '' : data[key]});
	},
})

/*ajax���*/
$$.extend($$,{
	//ajax - ǰ������ѧϰ��
	myAjax:function(URL,fn){
		var xhr = createXHR();	//������һ�������������IE6���ݡ�
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
					fn(xhr.responseText);
				}else{
					alert("������ļ���");
				}
			}
		};
		xhr.open("get",URL,true);
		xhr.send();

		//�հ���ʽ����Ϊ�������ֻ������ajax���������Է�������
		function createXHR() {
			//�����������ڡ�JavaScript�߼�������� ��3�桷��21��
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

/*�¼����*/
$$.extend($$,{
	/*�¼���*/
	on: function (id, type, fn) {
		//var dom = document.getElementById(id);
		var dom = $$.isString(id)?document.getElementById(id):id;
		//���֧��
		//W3C�汾 --��� �ȸ� �ȴ���������
		//�������������Ƿ�֧��ĳ�����ԣ�����������ͨ�����ַ�ʽ
		if(dom.addEventListener ) {
			dom.addEventListener(type, fn, false);
		}else if(dom.attachEvent){
			//���֧�� --IE
			dom.attachEvent('on' + type, fn);
		}
	},
	/*���*/
	click : function(id,fn){
		this.on(id,'click',fn);
	},
	/*�������*/
	mouseover:function(id,fn){
		this.on(id,'mouseover',fn);
	},
	/*����뿪*/
	mouseout:function(id,fn){
		this.on(id,'mouseout',fn);
	},
	/*�������*/
	hover:function (id,fnover,fnout){
		if(fnover){
			$$.on(id,"mouseover",fnover);
		}
		if(fnout){
			$$.on(id,"mouseout",fnout);
		}
	},
	//��ȡ�¼�event����
	getEvent:function (e){
		return e?e:window.event;
	},
	/*��ȡĿ��Ԫ��*/
	getTarget :function (e){
		var event = $$.getEvent(e)
		/*��·���ʽ*/
		return event.target || event.srcElement
	},
	//��ֹĬ����Ϊ
	preventDefault:function(event){
		var event = $$.getEvent(event);
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue = false;
		}
	},
	//��ֹð��
	stopPropagation:function(event){
		var event = $$.getEvent(event);
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble = true;
		}
	}
})

/*ѡ����*/
$$.extend($$,{
	$id:function(str){
		return document.getElementById(str)
	},
	/*tagѡ���� ��g���ֱ�ǩѡ��һ��Ԫ��*/
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
	/*classѡ����������class��ȡԪ��*/
	$class:function (context,className) {
		//��������֧��
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
	//����
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
				//ÿ��ѭ����doms������reult��
				//result.push(doms);//������Դ

				//����1��� ��װ�ظ��Ĵ���ɺ���
				pushArray(doms,result)

			}else if(first ==='#'){
				doms=[$$.$id(item.slice(index+1))]
				//���壺֮ǰ���Ƕ����doms�����飬����$id��ȡ�Ĳ������飬���ǵ���Ԫ��
				//��װ�ظ��Ĵ���ɺ���
				pushArray(doms,result)
			}else{
				doms = $$.$tag(item)
				pushArray(doms,result)
			}
		}
		return result;

		//��װ�ظ��Ĵ���
		function pushArray(doms,result){
			for(var j= 0, domlen = doms.length; j < domlen; j++){
				result.push(doms[j])
			}
		}
	},
	/*���*/
	$cengci:function (select){
		//�������Ʒ��� -- Ѱ�һ��Ƶ�
		var sel = $$.trim(select).split(' ');
		var result=[];
		var context=[];
		for(var i = 0, len = sel.length; i < len; i++){
			result=[];
			var item = $$.trim(sel[i]);
			var first = sel[i].charAt(0)
			var index = item.indexOf(first)
			if(first ==='#'){
				//�����#���ҵ���Ԫ�أ�
				pushArray([$$.$id(item.slice(index + 1))]);
				context = result;
			}else if(first ==='.'){
				//�����.
				//�����.
				//�ҵ�context�����е�classΪ��s-1����Ԫ�� --context�Ǹ�����
				if(context.length){
					for(var j = 0, contextLen = context.length; j < contextLen; j++){
						pushArray($$.$class(item.slice(index + 1), context[j]));
					}
				}else{
					pushArray($$.$class(item.slice(index + 1)));
				}
				context = result;
			}else{
				//����Ǳ�ǩ
				//�������ף��ҵ������е�Ԫ��==���׶�����context��
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

		//��װ�ظ��Ĵ���
		function pushArray(doms){
			for(var j= 0, domlen = doms.length; j < domlen; j++){
				result.push(doms[j])
			}
		}
	},
	//����+���
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

		//��װ�ظ��Ĵ���
		function pushArray(doms){
			for(var j= 0, domlen = doms.length; j < domlen; j++){
				result.push(doms[j])
			}
		}
	},
	//html5ʵ�ֵ�ѡ����
	$all:function(selector,context){
		context = context || document;
		return  context.querySelectorAll(selector);
	},
})

/*css���*/
$$.extend($$,{
	//��ʾ
	show:function (context){
		var doms = $$.$all(context)
		for(var i=0;i<doms.length;i++){
			$$.css(doms[i], 'display', 'block');
		}
	},

	//����
	hide:function (context){
		var doms = $$.$all(context)
		for(var i=0;i<doms.length;i++){
			$$.css(doms[i], 'display', 'none');
		}
	},

	/*css*/
	css:function(context, key, value){
		var dom = $$.isString(context)?$$.$all(context) : context;
		//���������
		if(dom.length){
			//�ȹǼܹǼ� -- ����ǻ�ȡģʽ -- ���������ģʽ
			//���value��Ϊ�գ����ʾ����
			if(value){
				for(var i = dom.length - 1; i >= 0; i--){
					setStyle(dom[i],key, value);
				}
				//            ���valueΪ�գ����ʾ��ȡ
			}else{
				return getStyle(dom[0]);
			}
			//�����������
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
	//Ԫ�ظ߶ȿ�ȸ���
	//���㷽ʽ��clientHeight clientWidth innerWidth innerHeight
	//Ԫ�ص�ʵ�ʸ߶�+border��Ҳ������������
	Width:function (id){
		return $$.$id(id).clientWidth
	},
	Height:function (id){
		return $$.$id(id).clientHeight
	},


	//Ԫ�صĹ����߶ȺͿ��
	//��Ԫ�س��ֹ�����ʱ������ĸ߶������֣���������ĸ߶� ʵ�ʸ߶ȣ����Ӹ߶�+���ɼ��ĸ߶ȣ�
	//���㷽ʽ scrollwidth
	scrollWidth:function (id){
		return $$.$id(id).scrollWidth
	},
	scrollHeight:function (id){
		return $$.$id(id).scrollHeight
	},


	//Ԫ�ع�����ʱ�� ������ֹ����� ��������Ͻǵ�ƫ����
	//���㷽ʽ scrollTop scrollLeft
	scrollTop:function (id){
		return $$.$id(id).scrollTop
	},
	scrollLeft:function (id){
		return $$.$id(id).scrollLeft
	},

	//��ȡ��Ļ�ĸ߶ȺͿ��
	sHeight:function (){
		return  window.screen.height
	},
	sWidth:function (){
		return  window.screen.width
	},

	//�ĵ��ӿڵĸ߶ȺͿ��
	wWidth:function (){
		return document.documentElement.clientWidth
	},
	wHeight:function (){
		return document.documentElement.clientHeight
	},
	//�ĵ��������������ĸߺͿ�
	wScrollHeight:function () {
		return document.body.scrollHeight
	},
	wScrollWidth:function () {
		return document.body.scrollWidth
	},
	//��ȡ������������䶥����ƫ��
	wScrollTop:function () {
		var scrollTop = window.pageYOffset|| document.documentElement.scrollTop || document.body.scrollTop;
		return scrollTop
	},
	//��ȡ���������������ߵ�ƫ��
	wScrollLeft:function () {
		var scrollLeft = document.body.scrollLeft || (document.documentElement && document.documentElement.scrollLeft);
		return scrollLeft
	}
})

/*����*/
$$.extend($$,{
	attr:function (context,key,value){
		var doms = $$.$all(context)
		//����ģʽ
		if(value){
			for(var i =0;i<doms.length;i++){
				doms[i].setAttribute(key,value)
			}
		}else{
			//��ȡģʽ
			return doms[0].getAttribute(key)
		}
	},
	//��̬��Ӻ��Ƴ�class
	addClass:function (context, name){
		var doms = $$.$all(context);
		//�����ȡ���Ǽ���
		if(doms.length){
			for(var i= 0,len=doms.length;i<len;i++){
				addName(doms[i]);
			}
			//�����ȡ�Ĳ��Ǽ���
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
	//����һ���ͬѧ�����о���ֻ��Ҫ�о�������
	/*�ɼ��õģ��о�һ�²����������Լ�ʵ��*/
	hasClass: function (context,name){
		var doms = $$.$all(context)
		var flag = true;
		for(var i= 0,len=doms.length;i<len;i++){
			flag = flag && check(doms[i],name)
		}

		return flag;
		//�ж�����Ԫ��
		function check(element,name){
			return -1<(" "+element.className+" ").indexOf(" "+name+" ")
		}
	}
})


/*���ݿ��*/
$$.extend($$,{
	/*���û��߻�ȡԪ�ص�����*/
	html:function (context,value){
		var doms = $$.$all(context)
		//����ģʽ
		if(value){
			for(var i = 0;i<doms.length;i++){
				doms[i].innerHTML = value
			}
		}else{
			/*��ȡģʽ*/
			return doms[0].innerHTML
		}
	}
})
/* �ɼ��õģ��κ��о�value*/
/*checkbox select button text textarea radio*/

/*�������*/
function Animate() {
	/*��ʱ���ľ��*/
	this.timer;
	/*���ʱ��*/
	this.interval = 16;
	/*��������*/
	/*���浥������������Ҫ��һ������*/
	/*  this._obj = {}*/
	/*  �������� ʹ��_obj ���������ʵ���Ƕ��_obj*/
	this.queen= []

}
Animate.prototype ={


	/* ------------------------------------------------
	 *���в� �ϴ�:run
	 *����ְ������: ������ӽ�����Ԫ�����Դ�������,����������
	 *-------------------------------------------------*/
	/*���в�*/
	/*����ְ�𣺾��Ƕ�����*/
	/*�����ı���*/
	/*����һ��ѭ����ѭ����һЩ����*/
	/*left��100 110 120 130 140.��������*/
	_run:function(){
		var that  = this;
		that.timer = setInterval(function(){that._loop();}, that.interval)
	},
	//����ѭ����ÿ��ѭ����ʲô���飬���ǵ��������
	//���ģʽԭ�򣺿��ŷ��ԭ�� ���Ʒ�תԭ��
	_loop:function(){
		var that = this;
		for(var i = 0,len=this.queen.length;i<len;i++){
			var _obj = this.queen[i]
			that._move(_obj)
		}
	},
	/*ÿ��ѭ��Ҫ��������*/
	_move:function(_obj){
		var id = _obj.id;
		var styles = _obj.styles
		var that = this;
		var pass = +new Date();
		console.log('pass'+pass)
		var tween = that._getTween(_obj.now,pass,_obj.duration,'easeOutBounce');
		console.log('tween'+tween)
		if(tween>=1) {
			that._stop(id,styles)
		}else {
			that._manyProperty(id,styles,tween)
		}
	},

	/*ֹͣ����*/
	_stop:function (id,styles){
		this._manyProperty(id,styles,1)
		clearInterval(this.timer);

	},
	/*���������˶���ʽ*/
	_oneProperty:function (id,name,start,juli,tween){
		if(name == 'opacity') {
			$$.css(id, name, start+juli*tween);
		}
		else {
			$$.css(id, name, start+juli*tween+'px');
		}
	},
	/*������Ե��˶���ʽ*/
	_manyProperty:function(id,styles,tween){
		var that = this;
		for(var i= 0,len=styles.length;i<len;i++) {
			//step = ��ʼֵ+����x����ʱ�����
			that._oneProperty(id,styles[i].property,styles[i].start,styles[i].juli,tween)
		}
	},
	//��ȡʱ�����
	_getTween:function (now,pass,duration,ease){
		var eases = {
			//��������
			linear:function (t, b, c, d){
				return (c - b) * (t/ d);
			},
			//�����˶�
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
			//����
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
		}
		var yongshi = pass -now;
		console.log(yongshi)
		//��ϰ�����������ַ��ʷ�ʽ
		return eases[ease](yongshi,0,1,duration);
	},




	/* ------------------------------------------------
	 *��Ӳ� �ϴ�:add
	 *����ְ������: ���û����ݵĲ���ת����������Ҫ�ĸ�ʽ
	 *-------------------------------------------------*/
	/*��Ӳ�*/
	/* ְ�𣺽��û����ݵĲ���ת����������Ҫ�ĸ�ʽ*/
	/*���������һ������ȥ����һ��������Ҫ������ -- ����run*/
	//�����û����ݲ���
	add:function(id,json,duration){
		this._adapterMany(id,json,duration)
		this._run()

	},
	//ǰ������Ϊ������û����飬���Ǿ������û���ֱ�۵���ʽ���ݲ���
	_adapterOne:function(id,json,duration){
		/* ��ϰǰ�棺����һ��styles
		 {name:'left',start:100,juli:500}*/
		/*���Ƕ���һ��json���������浥����������������Ҫ��һ�б���*/
		// ��ʼʱ�� ������ʱ�� tween id duration juli styles
		var _obj={}

		_obj.id = id
		/*  this._obj.dom = $$.$id(id)*/
		_obj.duration = duration
		_obj.tween = 0
		_obj.now = +new Date()
		_obj.styles=this.getStyles(id,json)

		return _obj
	},
	getStyles:function(id,source){
		var target=[];
		for(var item in source){
			var json={};

			//Ԫ�����Ե���ʼλ�� ����Ŀ��Ԫ��Ŀǰleft100px��ϣ���˶���500px����ô100������ʼλ��
			json.start= parseFloat($$.css(id,item))
			json.juli = parseFloat(source[item]) -json.start;
			json.property = item
			target.push(json)
		}
		return target;
	},
	//������ --��һְ��ԭ��
	adpaterOld: function (id,source){
		//�û����ݹ�������...������ϣ�����ǡ�������
		//��ôΪʲô��ֱ�Ӵ������յ�json������Ϊ����д�Ŀ���Ǳ�����ʹ�õģ�
		//���˾����������٣�Խͨ�ף�ʹ��Խ����ã�������û�ʹ��ϰ��

		//Ϊʲôjquery��������У�Ϊʲôƻ���ֻ�����ô��--�û��������ϣ�����������û����

		//�����û���̵�ԭ��
		//ͨ��ע��ʹ�ô���ͨ���׶���
		//ɵ��ʽ��̣��û�ֻ��Ҫ�����Լ���ϰ�ߣ���������ָ������ѧ����߿�����д�Ŀ��


		//source: {top:'300',width:'300',opacity:0.1};
		//target:[{start:10,juli:300,property:'left'},{start:0.4,juli:1,property:'left'}]


		//������ģʽ��������Ҫ��B�����Ǹ����ǵ����ݸ�ʽ��A�ģ�������Ҫһ��������ת��һ��
		//����ͶӰ��������
		var target=[];
		for(var item in source){
			var json={};

			//Ԫ�����Ե���ʼλ�� ����Ŀ��Ԫ��Ŀǰleft100px��ϣ���˶���500px����ô100������ʼλ��
			json.start= parseFloat($$.css(id,item))
			json.juli = parseFloat(source[item]) -json.start;
			json.property = item
			target.push(json)
		}
		return target;
	},
	/*ת���������*/
	_adapterMany:function(id,json,duration){
		var _obj = this._adapterOne(id,json,duration)
		this.queen.push(_obj)
	},


	/* ------------------------------------------------
	 *���ڲ�
	 *����ְ������: ��ƨ�ɣ����磺�����Ż� ѹ�� ��ȫ �ڴ����
	 *-------------------------------------------------*/
	/*���ڲ�*/
	/*ְ�𣺲�ƨ�ɣ����磺�����Ż� ѹ�� ��ȫ �ڴ���� */
	/*ר�����ڴ����*/
	_destory:function(){}
}

$$.animate = new Animate()


