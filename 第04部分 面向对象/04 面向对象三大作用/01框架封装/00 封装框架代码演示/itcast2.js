//����һ������������һЩ���õĲ���
function itcast (){
}
itcast.prototype = {
    $id:function(id){
        return document.getElementById(id)
    },
    $tag:function(tag){
        return document.getElementsByTagName(tag)
    },
    /*tab��*/
    tab:function(id){
        //��λ�ȡĳ����Ԫ���������Ԫ��
        var box = this.$id(id);
        var spans = box.getElementsByTagName('span');
        var lis = box.getElementsByTagName('li');


        //������
        //��һ��: �Ȱ��ϰ벿��ʵ��
        //Ⱥ����¼�  -- �����е�span���¼�
        //Ⱥ����¼�
        for(var i=0;i<spans.length;i++) {
            //���׷���  -- ����һ��һ������  --  ��ô�� -- �Զ�������
            spans[i].index=i;

            spans[i].onmouseover = function() {

                //����˼�� --  �����е�span��ΪĬ��״̬  --- Ȼ���ٽ���ǰ������ϵ�span��Ϊclass -- select
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
//Ϊʲô������ʵ������
/*��Ϊʹ�ö���֮ǰ��Ҫʵ��������������ʵ��������������ÿ��ʹ�ö�ʵ������*/
var $$ = new itcast()
