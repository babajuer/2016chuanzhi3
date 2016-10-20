/**
 * 作者：传智播客教育集团
 * 开发日期：2015/12/25
 * 描述：通用框架
 * 版权所有 违者必究
 */

//定义一个对象 - 名字是$
var $$ = function() {};
//第二种写法
$$.prototype = {

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
//在框架中实例化，这样外面使用的使用就不用实例化了
$$ = new $$();


//我们定义一个事件对象专门放置事件相关操作
var event = function(){

}
event.prototype = {
    on: function (id, type, fn){
        //var dom = document.getElementById(id);
        var dom = $$.isString(id)?document.getElementById(id):id;
    //如果支持
    //W3C版本 --火狐 谷歌 等大多数浏览器
    //如果你想检测对象是否支持某个属性，方法，可以通过这种方式
     /*判断浏览器兼容性*/
    if(dom.addEventListener ){
        dom.addEventListener(type, fn, false);
    }else if(dom.attachEvent){
        //如果支持 --IE
        dom.attachEvent('on' + type, fn);
    }
},
    un:function(id, type, fn){
    //var dom = document.getElementById(id);
    var dom = $$.isString(id)?document.getElementById(id):id;
    if(dom.removeEventListener){
        dom.removeEventListener(type, fn);
    }else if(dom.detachEvent){
        dom.detachEvent(type, fn);
    }
}
}

$$.event = new event();
