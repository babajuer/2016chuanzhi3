

;(function(w){
    var itcast={
        //子属性法：
        //我们可以定义一个elements属性，来保存获取的元素
        elements:[],
        extend:function(tar,source) {
            //遍历对象
            for(var i in source){
                tar[i] = source[i];
            }
            return tar;
        },
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
        },
        //tab
        tab:function(id) {
            //如何获取某个父元素下面的子元素
            var box = document.getElementById(id);
            var spans = box.getElementsByTagName('span');
            var lis = box.getElementsByTagName('li');


            //两步走
            //第一步: 先把上半部分实现
            //群体绑定事件  -- 对所有的span绑定事件
            //群体绑定事件
            for(var i=0;i<spans.length;i++) {
                //相亲法则  -- 给男一号一个代号  --  怎么给 -- 自定义属性
                spans[i].index=i;
                spans[i].onmouseover = function() {
                    //排他思想 --  将所有的span置为默认状态  --- 然后再将当前鼠标移上的span置为class -- select
                    for(var i=0;i<spans.length;i++) {
                        spans[i].className='';
                        lis[i].className='';
                    }
                    this.className='select';
                    lis[this.index].className='select';
                }
            }

        },
        //简单的数据绑定formateString
        formateString:function(str, data){
            return str.replace(/@\((\w+)\)/g, function(match, key){
                return typeof data[key] === "undefined" ? '' : data[key]});
        },
        //给一个对象扩充功能
        extendMany:function() {
            var key,i = 0,len = arguments.length,target = null,copy;
            if(len === 0){
                return;
            }else if(len === 1){
                target = this;
            }else{
                i++;
                target = arguments[0];
            }
            for(; i < len; i++){
                for(key in arguments[i]){
                    copy = arguments[i][key];
                    target[key] = copy;
                }
            }
            return target;
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
        //给一个对象扩充功能
        extendMany:function() {
            var key,i = 0,len = arguments.length,target = null,copy;
            if(len === 0){
                return;
            }else if(len === 1){
                target = this;
            }else{
                i++;
                target = arguments[0];
            }
            for(; i < len; i++){
                for(key in arguments[i]){
                    copy = arguments[i][key];
                    target[key] = copy;
                }
            }
            return target;
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

    }
    w.itcast = w.$$ = itcast;
})(window);


//选择框架
;(function($$){
//html5实现的选择器
    $$.$all=function(selector,context){
        context = context || document;
        this.elements = context.querySelectorAll(selector);
//                这里返回this,也就是当前对象，这样就可以访问这个对象的其他属性方法了
        return this;
    }

})(itcast);


;(function(w){
    var itcast={
        //子属性法：
        //我们可以定义一个elements属性，来保存获取的元素
        elements:[],
        extend:function(tar,source) {
            //遍历对象
            for(var i in source){
                tar[i] = source[i];
            }
            return tar;
        },
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
        },
        //tab
        tab:function(id) {
            //如何获取某个父元素下面的子元素
            var box = document.getElementById(id);
            var spans = box.getElementsByTagName('span');
            var lis = box.getElementsByTagName('li');


            //两步走
            //第一步: 先把上半部分实现
            //群体绑定事件  -- 对所有的span绑定事件
            //群体绑定事件
            for(var i=0;i<spans.length;i++) {
                //相亲法则  -- 给男一号一个代号  --  怎么给 -- 自定义属性
                spans[i].index=i;
                spans[i].onmouseover = function() {
                    //排他思想 --  将所有的span置为默认状态  --- 然后再将当前鼠标移上的span置为class -- select
                    for(var i=0;i<spans.length;i++) {
                        spans[i].className='';
                        lis[i].className='';
                    }
                    this.className='select';
                    lis[this.index].className='select';
                }
            }

        },
        //简单的数据绑定formateString
        formateString:function(str, data){
            return str.replace(/@\((\w+)\)/g, function(match, key){
                return typeof data[key] === "undefined" ? '' : data[key]});
        },
        //给一个对象扩充功能
        extendMany:function() {
            var key,i = 0,len = arguments.length,target = null,copy;
            if(len === 0){
                return;
            }else if(len === 1){
                target = this;
            }else{
                i++;
                target = arguments[0];
            }
            for(; i < len; i++){
                for(key in arguments[i]){
                    copy = arguments[i][key];
                    target[key] = copy;
                }
            }
            return target;
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
        //给一个对象扩充功能
        extendMany:function() {
            var key,i = 0,len = arguments.length,target = null,copy;
            if(len === 0){
                return;
            }else if(len === 1){
                target = this;
            }else{
                i++;
                target = arguments[0];
            }
            for(; i < len; i++){
                for(key in arguments[i]){
                    copy = arguments[i][key];
                    target[key] = copy;
                }
            }
            return target;
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

    }

    //封装选择框架
    itcast.extend(itcast,{
        //html5实现的选择器
        $all:function(selector,context){
            context = context || document;
            this.elements = context.querySelectorAll(selector);
//                这里返回this,也就是当前对象，这样就可以访问这个对象的其他属性方法了
            return this;
        },
    })

    //改造整个事件框架
    //封装事件框架
    itcast.extend(itcast,{
        on: function (type, fn){
//                var dom = $$.isString(id)?document.getElementById(id):id;
            var doms = this.elements;
            //如果支持
            //W3C版本 --火狐 谷歌 等大多数浏览器
            //如果你想检测对象是否支持某个属性，方法，可以通过这种方式
            for(var i= 0,len=doms.length;i<len;i++) {
                if(doms[i].addEventListener ){
                    doms[i].addEventListener(type, fn, false);
                }else if(doms[i].attachEvent){
                    //如果支持 --IE
                    //
                    doms[i].attachEvent('on' + type, fn);
                }
            }
            return this;
        }

    })

    //封装css框架
    itcast.extend(itcast,{
        //样式
        css:function(key, value ){
            var doms = this.elements;
            //如果是数组
            if(doms.length){
                //先骨架骨架 -- 如果是获取模式 -- 如果是设置模式
                //如果value不为空，则表示设置
                if(value){
                    for(var i = doms.length - 1; i >= 0; i--){
                        setStyle(doms[i],key, value);
                    }
                    //            如果value为空，则表示获取
                }else{
                    return getStyle(doms[0]);
                }
                //如果不是数组
            }else{
                if(value){
                    setStyle(doms,key, value);
                }else{
                    return getStyle(doms);
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

            return this;
        },
        //显示
        show:function (){
//                var doms =  $$.$all(content)
//                var doms = this.elements;
//                for(var i= 0,len=doms.length;i<len;i++){
//                    doms[i].css('display', 'block');
//                }
//                因为css接收的是当前对象，css中会通过this.elements获取元素列表
            this.css('display','block')
            return this;
        },
        //隐藏和显示元素
        hide:function (){
//                var doms =  $$.$all(content)
//                var doms = this.elements;
            this.css('display','none')
//                for(var i= 0,len=doms.length;i<len;i++){
//                    doms[i].css('display', 'none');
//                }
            return this;
        }
    })

    //封装属性框架
    itcast.extend(itcast,{
        //属性操作，获取属性的值，设置属性的值 at tr（'test','target','_blank'）
        attr:function( key, value){
//                var dom =  $$.$all(content);
            var doms = this.elements
            if(value){
                for(var i= 0, len=doms.length; i <len; i++){
                    doms[i].setAttribute(key, value);
                }
            }else{
                return doms[0].getAttribute(key);
            }
            return this;
        },
        //动态添加和移除class
        addClass:function (name){
            var doms = this.elements
            //如果获取的是集合
            for(var i= 0,len=doms.length;i<len;i++){
                addName(doms[i]);
            }
            function addName(dom){
                dom.className = dom.className + ' ' + name;
            }
            return this;
        },
        removeClass:function (name){
            var doms = this.elements
            for(var i= 0,len=doms.length;i<len;i++){
                removeName(doms[i]);
            }
            function removeName(dom){
                dom.className = dom.className.replace(name, '');
            }
            return this;
        },
    })

    //内容框架
    itcast.extend(itcast,{
        //innerHTML的函数版本
        //innerHTML的函数版本
        html:function ( value){
            //var doms = $$.$all(context);
            //这里，我编程都是针对this。elemennts进行编程
            var doms = this.elements;
            //设置
            if(value){
                for(var i= 0,len= doms.length; i<len; i++){
                    doms[i].innerHTML = value;
                }
            }else{
                return doms[0].innerHTML
            }
            return this;
        },
    })

    w.itcast = w.$$ = itcast;
})(window);
