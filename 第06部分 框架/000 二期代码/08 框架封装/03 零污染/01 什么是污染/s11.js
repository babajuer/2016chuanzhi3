//var i = 0;
//封装法则：如果一个函数，属性只是被某个函数使用，其他函数都不适用那么就完全可以用闭包形式封装起来，这样就不会产生污染
function s1(){
    var i = 0;
    var j = 10;
    alert(s11()+i+j);
     function s11(){
         return 10;
     }
}