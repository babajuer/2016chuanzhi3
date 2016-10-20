//���
;(function (w) {
    var itcast = {
        //�����Է���
        //���ǿ��Զ���һ��elements���ԣ��������ȡ��Ԫ��
        elements: [],
        extend: function (tar, source) {
            //��������
            for (var i in source) {
                tar[i] = source[i];
            }
            return tar;
        },
    }
    w.itcast = w.$$ = itcast;
})(window);

/*��װ����*/
itcast.extend(itcast,{
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
    },
    //�򵥵����ݰ�formateString
    formateString:function(str, data){
        return str.replace(/@\((\w+)\)/g, function(match, key){
            return typeof data[key] === "undefined" ? '' : data[key]});
    },
    //�����
    random: function (begin, end) {
        return Math.floor(Math.random() * (end - begin)) + begin;
    },
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
    }
})

//ѡ����
;(function ($$) {

    //˽�� ֻ�ڿ����ʹ��
    //��װ�ظ��Ĵ���
    function pushArray(doms, result) {
        for (var j = 0, domlen = doms.length; j < domlen; j++) {
            result.push(doms[j])
        }
    }

    //����
    //html5ʵ�ֵ�ѡ����
    $$.$all = function (selector, context) {

        context = context || document;
        this.elements = context.querySelectorAll(selector);
        //���ﷵ��this,Ҳ���ǵ�ǰ���������Ϳ��Է������������������Է�����
        return this;
    }

    //idѡ����
    $$.$id = function (id) {
        return document.getElementById(id);
    },

    //tagѡ����
    $$.$tag = function (tag, context) {
            if (typeof context == 'string') {
                context = $$.$id(context);
            }

            if (context) {
                return context.getElementsByTagName(tag);
            } else {
                return document.getElementsByTagName(tag);
            }
        },

    //classѡ����
    $$.$class = function (className, context) {
            var i = 0, len, dom = [], arr = [];
            //������ݹ��������ַ��� ����ת����Ԫ�ض���
            if ($$.isString(context)) {
                context = document.getElementById(context);
            } else {
                context = document;
            }
//        �������getElementsByClassName
            if (context.getElementsByClassName) {
                return context.getElementsByClassName(className);
            } else {
                //����������֧��
                dom = context.getElementsByTagName('*');

                for (i; len = dom.length, i < len; i++) {
                    if (dom[i].className) {
                        arr.push(dom[i]);
                    }
                }
            }
            return arr;
        },

    //����ѡ����
    $$.$group = function (content) {
            var result = [], doms = [];
            var arr = $$.trim(content).split(',');
            //alert(arr.length);
            for (var i = 0, len = arr.length; i < len; i++) {
                var item = $$.trim(arr[i])
                var first = item.charAt(0)
                var index = item.indexOf(first)
                if (first === '.') {
                    doms = $$.$class(item.slice(index + 1))
                    //ÿ��ѭ����doms������reult��
                    //result.push(doms);//������Դ

                    //����1��� ��װ�ظ��Ĵ���ɺ���
                    pushArray(doms, result)

                } else if (first === '#') {
                    doms = [$$.$id(item.slice(index + 1))]//���壺֮ǰ���Ƕ����doms�����飬����$id��ȡ�Ĳ������飬���ǵ���Ԫ��
                    //��װ�ظ��Ĵ���ɺ���
                    pushArray(doms, result)
                } else {
                    doms = $$.$tag(item)
                    pushArray(doms, result)
                }
            }
            return result;


        },

    //���ѡ����
    $$.$cengci = function (select) {
            //�������Ʒ��� -- Ѱ�һ��Ƶ�
            var sel = $$.trim(select).split(' ');
            var result = [];
            var context = [];
            for (var i = 0, len = sel.length; i < len; i++) {
                result = [];
                var item = $$.trim(sel[i]);
                var first = sel[i].charAt(0)
                var index = item.indexOf(first)
                if (first === '#') {
                    //�����#���ҵ���Ԫ�أ�
                    pushArray([$$.$id(item.slice(index + 1))]), result;
                    context = result;
                } else if (first === '.') {
                    //�����.
                    //�����.
                    //�ҵ�context�����е�classΪ��s-1����Ԫ�� --context�Ǹ�����
                    if (context.length) {
                        for (var j = 0, contextLen = context.length; j < contextLen; j++) {
                            pushArray($$.$class(item.slice(index + 1), context[j]), result);
                        }
                    } else {
                        pushArray($$.$class(item.slice(index + 1)), result);
                    }
                    context = result;
                } else {
                    //����Ǳ�ǩ
                    //�������ף��ҵ������е�Ԫ��==���׶�����context��
                    if (context.length) {
                        for (var j = 0, contextLen = context.length; j < contextLen; j++) {
                            pushArray($$.$tag(item, context[j]), result);
                        }
                    } else {
                        pushArray($$.$tag(item), result);
                    }
                    context = result;
                }
            }

            return context;


        },

    //����+���
    $$.$select = function (str) {
            var result = [];
            var item = $$.trim(str).split(',');
            for (var i = 0, glen = item.length; i < glen; i++) {
                var select = $$.trim(item[i]);
                var context = [];
                context = $$.$cengci(select);
                pushArray(context, result);

            }
            ;
            return result;
        }
})(itcast);

//�¼����
;(function ($$) {
    $$.on = function (type, fn) {
        //var dom = $$.isString(id)?document.getElementById(id):id;
        var doms = this.elements;
        //���֧��
        //W3C�汾 --��� �ȸ� �ȴ���������
        //�������������Ƿ�֧��ĳ�����ԣ�����������ͨ�����ַ�ʽ
        for (var i = 0, len = doms.length; i < len; i++) {
            if (doms[i].addEventListener) {
                doms[i].addEventListener(type, fn, false);
            } else if (doms[i].attachEvent) {
                //���֧�� --IE
                doms[i].attachEvent('on' + type, fn);
            }
        }
        return this;
    }
})(itcast);

//CSS���
;(function ($$) {
    //��ʽ
    $$.css = function (key, value) {
        var doms = this.elements;
        //���������
        if (doms.length) {
            //�ȹǼܹǼ� -- ����ǻ�ȡģʽ -- ���������ģʽ
            //���value��Ϊ�գ����ʾ����
            if (value) {
                for (var i = doms.length - 1; i >= 0; i--) {
                    setStyle(doms[i], key, value);
                }
                //            ���valueΪ�գ����ʾ��ȡ
            } else {
                return getStyle(doms[0]);
            }
            //�����������
        } else {
            if (value) {
                setStyle(doms, key, value);
            } else {
                return getStyle(doms);
            }
        }
        function getStyle(dom) {
            if (dom.currentStyle) {
                return dom.currentStyle[key];
            } else {
                return getComputedStyle(dom, null)[key];
            }
        }

        function setStyle(dom, key, value) {
            dom.style[key] = value;
        }

        return this;
    }
        //��ʾ
    $$.show = function () {
//                var doms =  $$.$all(content)
//                var doms = this.elements;
//                for(var i= 0,len=doms.length;i<len;i++){
//                    doms[i].css('display', 'block');
//                }
//                ��Ϊcss���յ��ǵ�ǰ����css�л�ͨ��this.elements��ȡԪ���б�
            this.css('display', 'block')
            return this;
        }
        //���غ���ʾԪ��
     $$.hide = function () {
//                var doms =  $$.$all(content)
//                var doms = this.elements;
            this.css('display', 'none')
//                for(var i= 0,len=doms.length;i<len;i++){
//                    doms[i].css('display', 'none');
//                }
            return this;
        }

    //Ԫ�ظ߶ȿ�ȸ���
    //���㷽ʽ��clientHeight clientWidth innerWidth innerHeight
    //Ԫ�ص�ʵ�ʸ߶�+border��Ҳ������������
    $$.Width=function (){
        return this.elements[0].clientWidth
    }
    $$.Height=function (){
        return this.elements[0].clientHeight
    }


    //Ԫ�صĹ����߶ȺͿ��
    //��Ԫ�س��ֹ�����ʱ������ĸ߶������֣���������ĸ߶� ʵ�ʸ߶ȣ����Ӹ߶�+���ɼ��ĸ߶ȣ�
    //���㷽ʽ scrollwidth
    $$.scrollWidth=function (){
        return this.elements[0].scrollWidth
    }
    $$.scrollHeight=function (){
        return this.elements[0].scrollHeight
    }


    //Ԫ�ع�����ʱ�� ������ֹ����� ��������Ͻǵ�ƫ����
    //���㷽ʽ scrollTop scrollLeft
    $$.scrollTop=function (){
        return this.elements[0].scrollTop
    }
    $$.scrollLeft=function (){
        return this.elements[0].scrollLeft
    }

    //��ȡ��Ļ�ĸ߶ȺͿ��
    $$.screenHeight=function (){
        return  window.screen.height
    }
    $$.screenWidth=function (){
        return  window.screen.width
    }


    //�ĵ��ӿڵĸ߶ȺͿ��
    $$.wWidth=function (){
        return document.documentElement.clientWidth
    }
    $$.wHeight=function (){
        return document.documentElement.clientHeight
    }
    //�ĵ��������������ĸߺͿ�
    $$.wScrollHeight=function () {
        return document.body.scrollHeight
    }
    $$.wScrollWidth=function () {
        return document.body.scrollWidth
    }
    //��ȡ������������䶥����ƫ��
     $$.wScrollTop=function () {
        var scrollTop = window.pageYOffset|| document.documentElement.scrollTop || document.body.scrollTop;
        return scrollTop
    }
    //��ȡ���������������ߵ�ƫ��
     $$.wScrollLeft=function () {
        var scrollLeft = document.body.scrollLeft || (document.documentElement && document.documentElement.scrollLeft);
        return scrollLeft
    }
})(itcast);

//���Կ��
;(function ($$) {
    //˽��
    function removeName(dom,name) {
        dom.className = dom.className.replace(name, '');
    }
    function addName(dom,name) {
        dom.className = dom.className + ' ' + name;
    }

    //����
    //���Բ�������ȡ���Ե�ֵ���������Ե�ֵ at tr��'test','target','_blank'��
    $$.attr = function (key, value) {
        //var dom =  $$.$all(content);
        var doms = this.elements
        if (value) {
            for (var i = 0, len = doms.length; i < len; i++) {
                doms[i].setAttribute(key, value);
            }
        } else {
            return doms[0].getAttribute(key);
        }
        return this;
    },
        //��̬��Ӻ��Ƴ�class
        $$.addClass = function (name) {
            var doms = this.elements
            //�����ȡ���Ǽ���
            for (var i = 0, len = doms.length; i < len; i++) {
                addName(doms[i],name);
            }
            return this;
        },
        $$.removeClass = function (name) {
            var doms = this.elements
            for (var i = 0, len = doms.length; i < len; i++) {
                removeName(doms[i]),name;
            }
            return this;
        }
})(itcast);

//���ݿ��
;(function ($$) {
    //innerHTML�ĺ����汾
    //innerHTML�ĺ����汾
    $$.html=function ( value){
        //var doms = $$.$all(context);
        //����ұ�̶������this��elemennts���б��
        var doms = this.elements;
        //����
        if(value){
            for(var i= 0,len= doms.length; i<len; i++){
                doms[i].innerHTML = value;
            }
        }else{
            return doms[0].innerHTML
        }
        return this;
    }
})(itcast);

//�������
;(function ($$) {

    /*�������*/
    function Animate() {

        //һ���ٱ�д��ܵ�ʱ�򶼻ᶨ��һ�����ö��󱣴���ƶ�����һЩֵ�������û��Զ���
        //�������ȶ����Ĭ��ֵ
        this.config={
            interval:16,
            ease:'linear',
        }
        this.timer =0;
        //����һ��indexͳ��ÿ����ӵĶ����� ��һ��Ϊ0
        this.index=-1;
        //��������
        //���Ƕ���һ�������������˶���������Ҫ�����ݣ�����now��pass��
        this._obj={};
        //����ʹ������������ÿ��ÿ��������˶�����
        this._queen=[]
        //���ó�ʼ������
        this._init();
    }
    Animate.prototype ={


        /* ------------------------------------------------
         *��������
         *�����������Ŷ���ʹ�õĹ�����������
         *-------------------------------------------------*/
        eases:{
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
        },
        //��ȡʱ�����
        _getTween:function (now,pass,duration,ease){
            var yongshi = pass -now;
            //��ϰ�����������ַ��ʷ�ʽ
            return this.eases[ease](yongshi,0,1,duration);
        },
        //��ʼ��ִ�еĴ���һ�����init���棬һ���ǹ��캯������
        _init:function(){},

        /*�µļ���*/
        getAnimationFrame:function(){
            var lastTime = 0;
            var prefixes = 'webkit moz ms o'.split(' '); //�������ǰ׺

            var requestAnimationFrame = window.requestAnimationFrame;
            var cancelAnimationFrame = window.cancelAnimationFrame;

            var prefix;
            //ͨ�������������ǰ׺�����õ�requestAnimationFrame��cancelAnimationFrame�ڵ�ǰ�������ʵ����ʽ
            for( var i = 0; i < prefixes.length; i++ ) {
                if ( requestAnimationFrame && cancelAnimationFrame ) {
                    break;
                }
                prefix = prefixes[i];
                requestAnimationFrame = requestAnimationFrame || window[ prefix + 'RequestAnimationFrame' ];
                cancelAnimationFrame  = cancelAnimationFrame  || window[ prefix + 'CancelAnimationFrame' ] || window[ prefix + 'CancelRequestAnimationFrame' ];
            }

            //�����ǰ�������֧��requestAnimationFrame��cancelAnimationFrame������˵�setTimeout
            if ( !requestAnimationFrame || !cancelAnimationFrame ) {
                requestAnimationFrame = function( callback, element ) {
                    var currTime = new Date().getTime();
                    //Ϊ��ʹsetTimteout�ľ����ܵĽӽ�ÿ��60֡��Ч��
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

            //�õ����ݸ��������API
            return {
                requestAnimationFrame : requestAnimationFrame,
                cancelAnimationFrame : cancelAnimationFrame
            }

        },

        /* ------------------------------------------------
         *���в� �ϴ�:run
         *����ְ������: ������ӽ�����Ԫ�����Դ�������,����������
         *-------------------------------------------------*/
        //���в��ϴ�
        _run:function(){
            var that = this;

            //run������ʵ���Ǹ�ѭ��
            that.timer = setInterval(function(){that._loop();}, that.config.interval);
        },
        //��������һ��loop�Դ����ÿ���������˶� --��ʵ���Ǳ���ÿ������Ȼ������ִ��move����
        _loop:function(){
            for(var i= 0,len=this._queen.length;i<len;i++){
                this._move(this._queen[i])
            }
        },
        //���������˶�����
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

                        dom.css(styles[i].property, styles[i].start+styles[i].juli*tween);
                    }
                    else {
                        dom.css(styles[i].property, styles[i].start+styles[i].juli*tween+'px');
                    }
                }
            }else {
                for(var i= 0,len=styles.length;i<len;i++) {
                    if(styles[i].property=='opacity') {

                        dom.css(styles[i].property, styles[i].start+styles[i].juli*tween);
                    }
                    else {
                        dom.css(styles[i].property, styles[i].start+styles[i].juli*tween+'px');
                    }
                }
            }
        },
        //����ִ�н�����Ļص�����
        _callBack:function(){},



        /* ------------------------------------------------
         *��Ӳ�  -- add
         *����ְ������: ���Ԫ�� �Լ�ȷ����Ҫ���ĸ�����������
         *-------------------------------------------------*/
        //�����ϴ� - ���
        addOld:function(id,json,duration,callback) {
            //add�������������飺�����������ж�����ֻҪ�û�����add���������������ܹ���������
            //�����Ⱥ�۹滮add�����Ľӿ� --ע�ͷ�
            this._apdapter(id,json,duration,callback)
            this._run();
        },
        add:function() {
            try{
                //add�������������飺�����������ж�����ֻҪ�û�����add���������������ܹ���������
                //�����Ⱥ�۹滮add�����Ľӿ� --ע�ͷ�
                var options = arguments
                var id = options[0]
                var json = options[1]
                var duration = options[2]
                var callback = options[3]

                //���Ĭ��ֵ
                if(!duration) {
                    duration=2000;
                }else {
                    if($$.isString(duration)){
                        switch (duration) {
                            case 'slow' :
                            case '��' :
                                duration = 8000;
                                break;
                            case 'normal' :
                            case '��ͨ' :
                                duration = 4000;
                                break;
                            case 'fast' :
                            case '��' :
                                duration = 2000;
                                break;
                        }
                    }else{
                    }
                }
                this._apdapter(id,json,duration,callback)
                this._run();
            }catch(e){
                alert('�������,ϵͳ������ʾ��'+'\n'+ e.message+'\n'+ e.name);
            }

        },
        //������ --��һְ��ԭ��
        //���Ǽ������������� -- �������в���Ҫ�����ݻ�����������_obj����
        _apdapter:function (id,source,duration,callback){
            var _obj={}
            this.index++;
            _obj.index=this.index;
            /*���������жϵ���Ҫ��*/
            _obj.dom = $$.isString(id)?$$.$id(id):id
            _obj.duration = duration
            _obj.now = +new Date()
            _obj.callback =callback;
            var target=[];
            for(var item in source){
                var json={};
                //Ԫ�����Ե���ʼλ�� ����Ŀ��Ԫ��Ŀǰleft 100px��ϣ���˶���500px����ô100������ʼλ��
                json.start = parseFloat(_obj.dom.css(item))
                console.log(json.start)
                json.juli = parseFloat(source[item]) - json.start;
                console.log(json.juli)
                json.property = item
                target.push(json)
            }
            _obj.styles = target;
            this._queen.push(_obj)
        },




        /* ------------------------------------------------
         *����API -- ѧϰʲô�ǹ���API
         *�ṩ��ʹ�ÿ�ܵ��ˣ�ʹ�ÿ�ܵ���һ��ֻ��Ҫ����
         *-------------------------------------------------*/
        //��ʼ����
        begin:function() {},
        //ֹͣ����
        stop:function() {},
        //�Զ��嶯��������
        setConfig:function(json){
            //��������û����ƶ���
            var that = this;
            $$.extend(this.config,json)
        },

        /* ------------------------------------------------
         *���ڲ�
         *����ְ������: �������ж���  ������� �����ڴ����
         *-------------------------------------------------*/
        _destroy:function(obj) {
            var that = this;
            //�ڴ��Ż�
            //1 �ͷŶ���  -- ����ʵ�ֵ�  -- ����ɾ������
            //�ĸ�����ִ���꣬�Ҿ��ͷ��ĸ�������ռ�õ��ڴ�
            that._queen.splice(obj.index,1);
            //2 �ͷŶ�������Ժͷ���
            for(var i in obj) {
                delete obj[i];
            }
            //3 �ͷŶ�����ռ�õ��ڴ�
            obj = null;
        }

    }
    $$.animate =function(json,duration,callback){
        var animate = new Animate()
        animate.add(this,json,duration,callback)
        return this;
    }

})(itcast);



