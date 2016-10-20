/*单个星座*/
function Xingzuo(data,num) {
    this.data = data;
    //因为每个星座的容器的class是不一样的，需要动态生成
    this.dom = $('<div></div>').addClass('item num-'+num)

}
Xingzuo.prototype = {
        //绑定单个星座
        bindDOM:function(){
            var str = ''
            str += '<div class="image"></div>'
            str += '<div class="description">'
            str += '<p class="name">'+this.data.name+'</p>'
            str += '<p class="time">'+this.data.time+'</p>'
            str += '<div class="mark"></div>'
            str += '</div>'

            var container = $('#myXingzuo')
            this.dom.html(str).appendTo(container)

        },
    /// 1 修改别人的框架  -会面向对象
      /*  2 自己从零写框架
        3 使用框架编写页面*/
        bindEvents:function(){
            var that = this;
            //鼠标放上去 鼠标离开
            this.dom.on('mouseover',function(){
                console.log(this)
                that.dom.addClass('is-hover')
            }).on('mouseout',function(){
                that.dom.removeClass('is-hover')
            }).click(function(){
                that.dom.toggleClass('selected');
            })
        },
        init:function(){
            this.bindDOM()
            this.bindEvents()
        }
}

