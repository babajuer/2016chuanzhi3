/*框架的 好处：拿来主义*/
/*封装性
 函数：工具
 对象：工具包
 框架：多个工具包*/

/*框架基础代码*/
var itcast = function(){}
itcast.prototype ={
    /*extend必须放在最顶端，因为后面的代码需要用到这个方法*/
    /*对象中的函数不叫函数 叫方法*/
    extend: function (target,source) {
        //遍历对象
        /* 回去抄袭100遍*/
        /* var json ={name:'iphone'}
         json.name
         json['name']*/
        for(var i in source){
            target[i] = source[i];
        }
        return target;
    },
}
var $$ = new itcast()


/*好处：模块化 分类管理 图书馆分类管理*/
/*字符串操作模块*/
$$.extend($$,{
    /*去除一个字符串两边的空格*/
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
    bindArttemplate:function (str,data){
        var render = template.compile(str);
        var html = render(data)
        return html;
    },
    //查询字符串  页面之间的传参  location.search
    querystring:function() {//获取URL查询字符串参数值的通用函数
        var str = window.location.search.substring(1);//获取查询字符串，即"id=1&name=location"的部分
        var arr = str.split("&");//以&符号为界把查询字符串分割成数组
        var json = {};//定义一个临时对象
        //遍历数组
        for(var i=0;i<arr.length;i++) {
            var c = arr[i].indexOf("=");//获取每个参数中的等号小标的位置
            if(c==-1) continue;//如果没有发现测跳到下一次循环继续操作


            var d = arr[i].substring(0,c);  //截取等号前的参数名称，这里分别是id和name
            var e = arr[i].substring(c+1);  //截取等号后的参数值
            json[d] = e;//以名/值对的形式存储在对象中
        }
        return json;//返回对象
    },
})

//数据类型检测模块
$$.extend($$,{
    /*判断一个变量是不是数值型*/
    isNumber:function (val){
        return typeof val === 'number'
    },
    /*判断一个变量是不是布尔型*/
    isBoolean:function (val) {
        return typeof val ==="boolean";
    },
    /*判断一个变量是不是字符串*/
    isString:function (val) {
        return typeof val === "string";
    },
    /*判断一个变量是不是isUndefined型*/
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
    /*判断一个变量是不是数组类型*/
    isArray:function (arr) {
        /*toString.call*/
        if(arr === null || typeof arr === 'undefined'){
            return false;
        }
        return arr.constructor === Array;
    },
    isArray2:function (arr) {
        return Object.prototype.toString.call(arr) === '[object Array]';
    },
    //给一个对象扩充功能
})

/*选择器框架模块 id tag class选择 */
$$.extend($$,{
    /*id选择器*/
    $id:function(id){
        return document.getElementById(id)
    },
    /*tag标签选择器*/
    $tag:function (tag,id){

    /*先写注释*/
    /*将你的思维进行模块化*/
    /*先思考如何写 然后通过注释写出你的思路，然后再去代码*/
    /*第一步：获取容器元素 --缩小范围*/
    var dom = getDOM(id);
    /*第二步：根据tag 从某个容器里面获取所有的元素*/
    var elements =getElements(dom,tag);
    return elements;


    /*隔离法则：*/
    /*将我们的代码分割成两部分，下面的部分依赖上面的部分*/
    /*第二部分不需要去考虑传递进来的到底是字符串还是dom
     也不需要考虑id到底是undefined还是正确的
     这一切的问题都交给另外一个哥们来帮我解决 我只用解决好的变量进行编程*/


    /*知识点：子函数*/
    /*在一个函数内部可以包含另外一个函数  -子函数 内嵌函数 局部变量*/
    // 第一步 根据id获取dom -- 缩减范围
    function getDOM(id){
        var dom ;
        if($$.isString(id)){
            dom = document.getElementById(id)
        }else{
            dom = id
        }
        return dom;
    }
    //第二步 从这个范围里面去寻找我们需要的元素
    function getElements(context,tag){
        if(context){
            return context.getElementsByTagName(tag)
        }else{
            return document.getElementsByTagName(tag)
        }

    }
},
    /*class选择器*/
    $classOld:function (className,mycontext){
    //第一步 获取范围容器这个dom
    var mydom = getDOM(mycontext)
    /*第二步：再从这个范围里面寻找元素*/
    var elements = getElements(className,mydom)
    return elements;


    //第一步 获取范围容器这个dom
    function getDOM(context){
        /*如果context没有传递过来（undefined），表示只有一个参数,那么我们就从document去寻找元素*/
        /*如果context是有值的，又分成两种情况：字符串，dom对象
        如果是字符串：我们将其转换成dom
        如果是dom的话，直接使用*/

        /*用三元表达式或者短路表达式改造代码*/
        if(context){
            if($$.isString(context)){
                return document.getElementById(context)
            }else{
                return context;
            }
        } else{
            return document;
        }

    }
    /*第二步：再从这个范围里面寻找元素*/
    function getElements(className,dom){
        if(dom.getElementsByClassName){
            /*使用原生的获取元素*/
            return dom.getElementsByClassName(className)
        }else{
            /*如果不兼容 使用自定义代码来获取元素*/
            var doms = dom.getElementsByTagName('*')
            var elements =[];
            for(var i = 0,len=doms.length;i<len;i++){
                if(doms[i].className == className){
                    elements.push(doms[i])
                }
            }
            return elements;
        }
    }
},
    /*不用函数的最终写法*/
    $class:function(className,context){
        var elements=[];
        var dom;
        if (context){
            if($$.isString(context)){
                context = $$.$id(context);
            }
        }else{
            context = document;
        }

        //如果兼容getElementsByClassName
        if(context.getElementsByClassName){
            return context.getElementsByClassName(className);
        }else{
            //如果浏览器不支持
            dom = context.getElementsByTagName('*');
            for(var i,len=dom.length;i<len;i++) {
                if(dom[i].className && dom[i].className ==className ) {
                    elements.push(dom[i]);
                }
            }
        }
        return elements;
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
    //层次选择器 - 算法能力 -- 抽象能力 --逻辑思维能力
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
            var name = item.slice(index+1)
            if(first ==='#'){
                //如果是#，找到该元素，
                pushArray([$$.$id(name)]);
                context = result;
            }else if(first ==='.'){
                //如果是.
                //如果是.
                //找到context中所有的class为【s-1】的元素 --context是个集合
                if(context.length){
                    for(var j = 0, contextLen = context.length; j < contextLen; j++){
                        pushArray($$.$classOld(name, context[j]));
                    }
                }else{
                    pushArray($$.$class(name));
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
    $groupLayer:function (str) {
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
    $all:function (str,context){
    /*完美法则*/
    /*短路表达式：也能保证如果值传递一个参数，也能够正常运行*/
    context = context|| document;
    return context.querySelectorAll(str)
}

})

/*事件框架*/
$$.extend($$,{
    //我们需要编写一个函数 让他同时能够兼容所有的浏览器  -重点 -人人必须要会
    on:function (id,type,fn){
        /*三元表达式*/
        var dom = $$.isString(id)? $$.$id(id):id;
        /*如何判断浏览器是否兼容某个功能*/
        /*其实就是判断某个对象是否兼容某个方法*/
        if(dom.addEventListener){
            /*使用addEventListener来编写事件*/
            dom.addEventListener(type, fn, false);
        }else{
            if(dom.attachEvent){
                /*使用微软公司的技术来编写事件*/
                dom.attachEvent('on' + type, fn);
            }
        }
    },
    /*解除绑定 -- 没必要深刻了解 --知道就可以了*/
    un:function(id, type, fn){
        //var dom = document.getElementById(id);
        var dom = $$.isString(id)?document.getElementById(id):id;
        if(dom.removeEventListener){
            dom.removeEventListener(type, fn);
        }else if(dom.detachEvent){
            dom.detachEvent(type, fn);
        }
    },

    //模拟点击事件 点击事件的类型 click
    /*click mouseover hover bind one*/
    click: function (id,fn){
        $$.on(id,'click',fn);
    },

    /*鼠标移上事件*/
    mouseover:function (id,fn){
        $$.on(id,'mouseover',fn);
    },

    /*鼠标移出事件*/
    mouseout:function (id,fn){
        $$.on(id,'mouseout',fn);
    },

    /*鼠标移上和移除事件（鼠标悬浮）*/
    hover:function (id,fnOver,fnOut){
        if(fnOver){
            $$.on(id,"mouseover",fnOver);
            /* mouseover(id,fnOver)*/
        }
        if(fnOut){
            $$.on(id,"mouseout",fnOut);
            /* mouseout(id,fnOut)*/
        }
    },
    //注释比代码重要
    /*我们写框架的目的是给别人使用的
     如果你写网页 注释不是很重要*/
    /*获取event对象*/
    getEventOld:function (e){
        //如果是ie浏览器 --- 使用window.event来获取event对象
        //如果不是ie（其余所有浏览器）都是支持标准的，怎么做：直接在函数中加个参数，系统会自动将这个参数看做是event对象
        var event;
        if(e){
            event = e;
        }else if(window.event){
            event = window.event;
        }

        return event
    },
    getEvent:function (e){
        /*三元表达式*/
        return e?e:window.event;
    },

    /*获取事件目标  --因为为了保证不同浏览器厂商的不同版本都兼容*/
    getTarget:function  (event){
        var e = $$.getEvent(event);
        /*短路表达式*/
        return e.target|| e.srcElement;
    },
    //阻止默认行为
    preventDefault:function (event){
        var event = $$.getEvent(event);
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    },
    //阻止冒泡
    stopPropagation:function (event){
        var event = $$.getEvent(event);
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble = true;
        }
    }

})

