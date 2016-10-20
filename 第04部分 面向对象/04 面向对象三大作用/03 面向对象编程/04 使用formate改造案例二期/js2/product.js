//����һ����Ʒ����
function Product(cart,data){
    //����
    this.name = '';
    /*����*/
    this.description = '';
    /*ԭ��*/
    this.price = 0;
    /*�Ź��۸�*/
    this.tuangouPrice = 0;
    /*��������*/
    this.sum = 0;
    //��Ϊ�ҵĲ�Ʒ������Ҫʹ������������ô��ô���أ��ҿ���ͨ���������ݽ���
    this.cart = cart;
    this.data = data;
    /*ͼƬ�б�*/
    this.images = [{small:'',big:''},{small:'',big:''},{small:'',big:''}]
}
Product.prototype = {
    //�󶨻�����Ϣ
    bindDOMDetail:function() {
        var str = ''
        str+='<h1 id="pname">@(name)</h1>'
        str+='<ul class="rating">'
        str+=' <li><a class="product-rate" href="#"> </a> <span> </span></li>'
        str+='<li><a href="#" id="buyCount">@(sum)</a>�˹���</li>'
        str+='<div class="clearfix"></div>'
        str+=' </ul>'
        str+='<div class="price_single">'
        str+='<span class="reducedfrom" id="price">$@(price)</span>'
        str+=' <span class="actual" id="groupPrice">$@(tuangouPrice)</span><a href="#">�Ź�</a>'
        str+=' </div>'
        str+=' <h2 class="quick">����:</h2>'
        str+=' <p class="quick_desc" id="description">@(description)</p>'

       str =  $$.formateString(str,this)

        $('.pdetail').html(str)
    },
    /*��ͼƬ*/
    bindDOMOneImage:function(data){
        var str =''
        str+=' <li>'
        str+='<img class="etalage_thumb_image" src="@(small)" class="img-responsive" />'
        str+='<img class="etalage_source_image" src="@(big)" class="img-responsive" />'
        str+='</li>'

        str =  $$.formateString(str,data)
        return str;
},
    bindDOMImages:function() {
        var str =''
        for(var i=0;i<this.images.length;i++){
            str +=  this.bindDOMOneImage(this.images[i])
        }
         $('.etalage').html(str)


        /*jquery���ʵ�ֵĻõ�Ƭ��Ч*/
        $('#etalage').etalage({
            thumb_image_width: 250,
            thumb_image_height: 300,
        });
    },
    /*���¼�*/
    bindEvents:function() {
        var that = this;
        $('#btnaddcart').click(function(){
            //����ǰ��Ʒ��ӵ����ﳵ����
            that.cart.products.push(that)
            //���°󶨹��ﳵ
            that.cart.init()
            //�ص�����
            $(window).scrollTop(0);
        })

    },
    //����
    init:function() {
        this.bindDOMDetail()
        this.bindDOMImages()
        this.bindEvents()
    }
}