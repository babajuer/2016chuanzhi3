//�����ࣨ����
function Order()
{
    this.name = '��������';
    this.no='';//������
    this.price = 100;//�����۸�
    this.shoujianren='';//�ռ���
    this.pList=[];//�����Ĳ�Ʒ�б�
}

Order.prototype={
    //�����ύ
    Confirm:function(){
        alert(this.name)
    }
    //��ʼ��
    ,init:function(){
        //ajax��ȡ��̨���ݣ�������
        this.price=279.00;
        this.bind();
    }
    ,bind:function(){
        //var order = new Order();
        var domPrice = document.getElementById('price')
        domPrice.innerHTML=this.price;
        //�첽 --�����  ģ�黯  --  seajs
    },
}