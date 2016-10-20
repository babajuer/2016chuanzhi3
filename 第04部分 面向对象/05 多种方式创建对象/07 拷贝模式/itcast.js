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
    $id:function(id){
        return document.getElementById(id)
    },
    //简单的数据绑定formateString
    formateString:function(str, data){
    return str.replace(/@\((\w+)\)/g, function(match, key){
        return typeof data[key] === "undefined" ? '' : data[key]});
},
    //给一个对象扩充功能
    extend: function (target,source) {
    //遍历对象
    for(var i in source){
        target[i] = source[i];
    }
    return target;
}


}
//在框架中实例化，这样外面使用的使用就不用实例化了
$$ = new $$();

