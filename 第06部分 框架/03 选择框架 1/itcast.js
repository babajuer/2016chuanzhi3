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

/*数字操作*/
$$.extend($$,{

})

/*数组操作*/
$$.extend($$,{

})

/*日期操作*/
$$.extend($$,{

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
