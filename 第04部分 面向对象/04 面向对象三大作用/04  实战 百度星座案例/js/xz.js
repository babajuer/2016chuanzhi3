/*��������*/
function Xingzuo(data,num) {
    this.data = data;
    //��Ϊÿ��������������class�ǲ�һ���ģ���Ҫ��̬����
    this.dom = $('<div></div>').addClass('item num-'+num)

}
Xingzuo.prototype = {
        //�󶨵�������
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
    /// 1 �޸ı��˵Ŀ��  -���������
      /*  2 �Լ�����д���
        3 ʹ�ÿ�ܱ�дҳ��*/
        bindEvents:function(){
            var that = this;
            //������ȥ ����뿪
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

