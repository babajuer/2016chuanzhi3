/**
 * 作者：传智播客教育集团
 * 开发日期：2015/12/25
 * 描述：通用框架
 * 版权所有 违者必究
 */

//定义一个对象 - 名字是$

/*基础框架*/
var $$ = function() {};
//第二种写法
$$.prototype = {
    $id:function (str){
        return document.getElementById(str)
    },
    $tag:function(tag){
        return document.getElementsByTagName(tag)
    },
    /*复习*/
    /*将一个对象的所有属性拷贝给另一个对象*/
    extend:function(tar,source) {
        //遍历对象
        for(var i in source){
            tar[i] = source[i];
        }
        return tar;
    },
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
    }
}
//在框架中实例化，这样外面使用的使用就不用实例化了
$$ = new $$();


/*事件框架*/
//就是将后面的对象的所有的属性和方法拷贝给前面的对象
/*那么当拷贝给前面的对象之后，前面的对象就拥有了这个方法*/
$$.extend($$,{
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
    }
})


/*选择框架*/
$$.extend($$,{
    $id:function(str){
        return document.getElementById(str)
    },
    $tag:function(tag){
        return document.getElementsByTagName(tag)
    }
})

