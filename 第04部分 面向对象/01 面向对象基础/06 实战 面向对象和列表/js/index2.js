//ʹ�����������ʽ�����б�ҳ��

function Product (data){
    /*����*/
    this.name=''
    /*ԭ��*/
    this.sourcePrice = ''
    /*�Żݼ�*/
    this.price = ''
    /*ͼƬ*/
    this.image ='img/boutque01_r2_c2.jpg'
    /*����*/
    this.sum = 0
    /*�ۿ�*/
    this.zhekou = 0
    //���պ�����ҵ�json����
    this.data = data
}
Product.prototype = {
    //�󶨵�����Ʒ
    bindDOM:function(){
        var str = ''
        str+=' <dl>'
        str+='<dt><a><img src="'+this.image+'" width="384" height="225" /></a></dt>'
        str+='<dd>'
        str+=' <span><a><em>'+this.zhekou+'��/</em>'+this.name+'</a></span>'
        str+='</dd>'
        str+='<dd class="price">'
        str+='<em>��'+this.price+'</em>'
        str+='<del>��'+this.sourcePrice+'</del>'
        str+='<i>������'+this.sum+'</i>'
        str+='</dd>'
        str+='</dl>'
        return str;
    },
    /*�󶨵�����Ʒ*/
    bindEvents:function(){},
    //�󶨶����Ʒ
    bindDoms:function(){
        var str =''
        for(var i = 0;i<this.data.length;i++){
            str+=this.data[i].bindDOM()
        }
        $('#container').html(str)
    },
    /*����*/
    init:function(){
        this.bindDoms()
        this.bindEvents()
    }
}

/*
 ģ���Ʒ�б�����*/

/*ģ�ⵥ��ʵ��*/
/*
 var aussie = new Product()
 aussie.name = 'Aussie���������ӯ���ɻ�����400ml '
 aussie.sourcePrice = 1200.00
 aussie.price = 420
 aussie.zhekou = 3.5
 aussie.image = 'img/boutque01_r2_c2.jpg'
 aussie.sum = 70

 /!*�����Ʒ*!/
 var shuibaobao = new Product()
 shuibaobao.name = 'Coppertoneˮ�����ٸ���ˬ��ɹ������45g SPF50 '
 shuibaobao.sourcePrice = 1200.00
 shuibaobao.price = 420
 shuibaobao.zhekou = 3.5
 shuibaobao.image = 'img/boutque01_r2_c2.jpg'
 shuibaobao.sum = 70
 */






/*
 var list = [aussie,shuibaobao,shuibaobao,shuibaobao,shuibaobao,shuibaobao,shuibaobao,shuibaobao,shuibaobao,shuibaobao]
 */



/*���������*/
var json  = [
    {
        name:'Aussie���������ӯ���ɻ�����400ml',
        sourcePrice: 1200.00,
        price : 420,
        zhekou:3.5,
        image:'img/boutque01_r2_c2.jpg',
        sum :70
    },
    {
        name:'Aussie���������ӯ���ɻ�����400ml',
        sourcePrice: 1200.00,
        price : 420,
        zhekou:3.5,
        image:'img/boutque01_r2_c2.jpg',
        sum :70
    },
    {
        name:'Aussie���������ӯ���ɻ�����400ml',
        sourcePrice: 1200.00,
        price : 420,
        zhekou:3.5,
        image:'img/boutque01_r2_c2.jpg',
        sum :70
    },
    {
        name:'Aussie���������ӯ���ɻ�����400ml',
        sourcePrice: 1200.00,
        price : 420,
        zhekou:3.5,
        image:'img/boutque01_r2_c2.jpg',
        sum :70
    },
    {
        name:'Aussie���������ӯ���ɻ�����400ml',
        sourcePrice: 1200.00,
        price : 420,
        zhekou:3.5,
        image:'img/boutque01_r2_c2.jpg',
        sum :70
    },
    {
        name:'Aussie���������ӯ���ɻ�����400ml',
        sourcePrice: 1200.00,
        price : 420,
        zhekou:3.5,
        image:'img/boutque01_r2_c2.jpg',
        sum :70
    },
    {
        name:'Aussie���������ӯ���ɻ�����400ml',
        sourcePrice: 1200.00,
        price : 420,
        zhekou:3.5,
        image:'img/boutque01_r2_c2.jpg',
        sum :70
    },
    {
        name:'Aussie���������ӯ���ɻ�����400ml',
        sourcePrice: 1200.00,
        price : 420,
        zhekou:3.5,
        image:'img/boutque01_r2_c2.jpg',
        sum :70
    }
]


function transform(json){
    var list =[]
    for(var i = 0;i<json.length;i++){
        var p= new Product()
        p.name = json[i].name
        p.sourcePrice = json[i].sourcePrice
        p.price = json[i].price
        p.zhekou = json[i].zhekou
        p.image = json[i].image
        p.sum = json[i].sum
        list.push(p)
    }
    return list
}


var p = new Product(transform(json))
p.init()
