//定义一个对象，来保存一些常用的操作
function itcast (){
}
itcast.prototype = {
    $id:function(id){
        return document.getElementById(id)
    },
    $tag:function(tag){
        return document.getElementsByTagName(tag)
    },
    /*tab栏*/
    tab:function(id){
        //如何获取某个父元素下面的子元素
        var box = this.$id(id);
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

}
}
//为什么在里面实例化：
/*因为使用对象之前需要实例化，放在里面实例化，这样不用每次使用都实例化了*/
var $$ = new itcast()
