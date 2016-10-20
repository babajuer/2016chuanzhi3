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
    $id:function(id){
        return document.getElementById(id)
    },
    $tag:function(tag){
        return document.getElementsByTagName(tag)
    },
    $class:function(){},
    $cengci:function(){},
    $group:function(){}

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

