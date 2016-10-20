/**
 * 作者：传智播客教育集团
 * 开发日期：2015/12/25
 * 描述：通用框架
 * 版权所有 违者必究
 */
var $$ = function() {};
$$.prototype = {
    extend:function(tar,source) {
        //遍历对象
        for(var i in source){
            tar[i] = source[i];
        }
        return tar;
    },
}
$$ = new $$();

/*基础模块*/
$$.extend($$,{

})

/*字符串相关操作模块*/
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
    //模板
})

/*ajax*/
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
    },
})

/*日期相关操作模块*/
$$.extend($$,{

})

/*数字相关操作模块*/
$$.extend($$,{
    //随机数
    random: function (begin, end) {
        return Math.floor(Math.random() * (end - begin)) + begin;
    },
})

/*判断数据类型*/
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
    }
})

/*事件模块*/
$$.extend($$,{
    /*绑定事件*/
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
})

/*选择框架*/
$$.extend($$,{
    $id:function (str){
        return document.getElementById(str)
    },
    $tag:function(tag){
        return document.getElementsByTagName(tag)
    },

})
