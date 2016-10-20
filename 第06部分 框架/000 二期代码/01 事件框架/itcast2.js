var $$ = {
    $id:function(id){
        return document.getElementById(id)
    },
    $tag:function(tag){
        return document.getElementsByTagName(tag)
    },
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
    //数据类型检测
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
    extend: function (target,source) {
        //遍历对象
        for(var i in source){
            target[i] = source[i];
        }
        return target;
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
    //我们需要编写一个函数 让他同时能够兼容所有的浏览器
    on:function (id,type,fn){
        /*  判断浏览器是否支持某个功能其实就是判断：某个对象是否存在，如果对象存在就去判断其是否含有某个方法*/

        /*整个js世界全是面向对象的，所有的功能都是对象里面的某个方法*/

        //如果浏览器支持addEventListener 我们就使用它来编写事件
        var dom = this.$id(id)
        if(dom.addEventListener){
            /*使用addEventListener来编写事件*/
            dom.addEventListener(type, fn, false);
        }else{
            if(dom.attachEvent){
                /*使用微软公司的技术来编写事件*/
                dom.attachEvent('on' + type, fn);
            }
        }


        /* 如果浏览器不支持addEventListener，我们可以认定是一个微软公司的，就可以使用attachEvent*/
        /*如何去判断浏览器是否支持某个功能*/

    }
}

