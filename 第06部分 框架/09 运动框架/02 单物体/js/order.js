//订单类（对象）
function Order()
{
    this.name = '订单测试';
    this.no='';//订单号
    this.price = 100;//订单价格
    this.shoujianren='';//收件人
    this.pList=[];//订单的产品列表
}

Order.prototype={
    //订单提交
    Confirm:function(){
        alert(this.name)
    }
    //初始化
    ,init:function(){
        //ajax读取后台数据，绑定属性
        this.price=279.00;
        this.bind();
    }
    ,bind:function(){
        //var order = new Order();
        var domPrice = document.getElementById('price')
        domPrice.innerHTML=this.price;
        //异步 --解耦合  模块化  --  seajs
    },
}