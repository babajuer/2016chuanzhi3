//我们的框架
//第一个问题：最外层的是什么玩意 -- 匿名函数+闭包
//第二个问题：我为什么在最下面下window 下JQuery
//第三个问题： window.ICD = $ = ICD;
;(function(w){
    var itcast = {
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
        extend:function(tar,source) {
            //遍历对象
            for(var i in source){
                tar[i] = source[i];
            }
            return tar;
        },
        //随机数
        random: function (begin, end) {
            return Math.floor(Math.random() * (end - begin)) + begin;
        },
        extend:function(tar,source) {
            //遍历对象
            for(var i in source){
                tar[i] = source[i];
            }
            return tar;
        },
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
        }
    };

    //封装事件框架
    itcast.extend(itcast,{
        on: function (id, type, fn){
            var dom = $$.isString(id)?document.getElementById(id):id;
            //如果支持
            //W3C版本 --火狐 谷歌 等大多数浏览器
            //如果你想检测对象是否支持某个属性，方法，可以通过这种方式
            if(dom.addEventListener ){
                dom.addEventListener(type, fn, false);
            }else if(dom.attachEvent){
                //如果支持 --IE
                //
                dom.attachEvent('on' + type, fn);
            }
        },
        un:function(id, type, fn){
            var dom = $$.isString(id)?document.getElementById(id):id;
            if(dom.removeEventListener){
                dom.removeEventListener(type, fn);
            }else if(dom.detachEvent){
                dom.detachEvent(type, fn);
            }
        },
        trigger: function(id,type){
            var dom = $$.isString(id)?document.getElementById(id):id;
            // 现代浏览器
            if(dom.dispatchEvent){
                // 创建事件
                var evt = document.createEvent('Event');
                // 定义事件的类型
                evt.initEvent(type, true, true);
                // 触发事件
                dom.dispatchEvent(evt);
                // IE
            } else if(dom.fireEvent){
                dom.fireEvent('on' + type);
            }
        },
        //事件基础
        getEvent:function(event){
            return event?event:window.event;
        },
        //获取目标
        GetTarget :function(event){
            var e = $$.getEvent(event);
            return e.target|| e.srcElement;
        },
        //组织默认行为
        preventDefault:function(event){
            var event = $$.getEvent(event);
            if(event.preventDefault){
                event.preventDefault();
            }else{
                event.returnValue = false;
            }
        },
        //组织冒泡
        stopPropagation:function(event){
            var event = $$.getEvent(event);
            if(event.stopPropagation){
                event.stopPropagation();
            }else{
                event.cancelBubble = true;
            }
        }
    })

    //封装选择框架
    itcast.extend(itcast,{
        //id选择器
        $id:function(id){
            return document.getElementById(id);
        },
        //tag选择器
        $tag:function(tag,context){
            if(typeof context == 'string'){
                context = $$.$id(context);
            }

            if(context){
                return context.getElementsByTagName(tag);
            }else{
                return document.getElementsByTagName(tag);
            }
        },
        //class选择器
        $class:function(className,context){
            var i=0,len,dom=[],arr=[];
            //如果传递过来的是字符串 ，则转化成元素对象
            if($$.isString(context)){
                context = document.getElementById(context);
            }else{
                context = document;
            }
//        如果兼容getElementsByClassName
            if(context.getElementsByClassName){
                return context.getElementsByClassName(className);
            }else{
                //如果浏览器不支持
                dom = context.getElementsByTagName('*');

                for(i;len=dom.length,i<len;i++)
                {
                    if(dom[i].className)
                    {
                        arr.push(dom[i]);
                    }
                }
            }
            return arr;
        },
        //分组选择器
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
                    doms=[$$.$id(item.slice(index+1))]//陷阱：之前我们定义的doms是数组，但是$id获取的不是数组，而是单个元素
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
        //层次选择器
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

    //封装css框架
    itcast.extend(itcast,{
        //样式
        css:function(context, key, value){
            console.log('dfdfd')
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
        //显示
        show:function (content){
            var doms =  $$.$all(content)
            for(var i= 0,len=doms.length;i<len;i++){
                $$.css(doms[i], 'display', 'block');
            }
        },
        //隐藏和显示元素
        hide:function (content){
            var doms =  $$.$all(content)
            for(var i= 0,len=doms.length;i<len;i++){
                $$.css(doms[i], 'display', 'none');
            }
        }
    })

    //封装属性框架
    itcast.extend(itcast,{
        //属性操作，获取属性的值，设置属性的值 at tr（'test','target','_blank'）
        attr:function(content, key, value){
            var dom =  $$.$all(content);
//        如果是数组  比如tag
            if(dom.length){
                if(value){
                    for(var i= 0, len=dom.length; i <len; i++){
                        dom[i].setAttribute(key, value);
                    }
                }else{
                    return dom[0].getAttribute(key);
                }
//            如果是单个元素  比如id
            }else{
                if(value){
                    dom.setAttribute(key, value);
                }else{
                    return dom.getAttribute(key);
                }
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
            if(doms.length){
                for(var i= 0,len=doms.length;i<len;i++){
                    removeName(doms[i]);
                }
            }else{
                removeName(doms);
            }
            function removeName(dom){
                dom.className = dom.className.replace(name, '');
            }
        },
        //判断是否有
        hasClass:function(context,name){
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
        },
        //获取
        getClass:function (id){
            var doms = $$.$all(id)
            return $$.trim(doms[0].className).split(" ")
        }
    })

    //内容框架
    itcast.extend(itcast,{
        //innerHTML的函数版本
        html:function (context, value){
            var doms = $$.$all(context);
            //设置
            if(value){
                for(var i= 0,len= doms.length; i<len; i++){
                    doms[i].innerHTML = value;
                }
            }else{
                return doms[0].innerHTML
            }
        }
    })

    //封装DOM框架 -- 放在后面
    itcast.extend(itcast,{
        //选择
        eq:function(){},
        first:function(){},
        last:function(){},
        //元素的插入和删除 克隆
        append:function(){},
        empty:function(){},
        remove:function(){},
        clone:function(){}
    })

    w.itcast = w.$$ = w.AA  = itcast;
})(window);