/*��ܵ� �ô�����������*/
/*��װ��
 ����������
 ���󣺹��߰�
 ��ܣ�������߰�*/

/*��ܻ�������*/
var itcast = function(){}
itcast.prototype ={
    /*extend���������ˣ���Ϊ����Ĵ�����Ҫ�õ��������*/
    /*�����еĺ������к��� �з���*/
    extend: function (target,source) {
        //��������
        /* ��ȥ��Ϯ100��*/
        /* var json ={name:'iphone'}
         json.name
         json['name']*/
        for(var i in source){
            target[i] = source[i];
        }
        return target;
    },
}
var $$ = new itcast()


/*�ô���ģ�黯 ������� ͼ��ݷ������*/
/*�ַ�������ģ��*/
$$.extend($$,{
    /*ȥ��һ���ַ������ߵĿո�*/
    //ȥ����߿ո�
    ltrim:function(str){
        return str.replace(/(^\s*)/g,'');
    },
    //ȥ���ұ߿ո�
    rtrim:function(str){
        return str.replace(/(\s*$)/g,'');
    },
    //ȥ���ո�
    trim:function(str){
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    //�򵥵����ݰ�formateString
    formateString:function(str, data){
        return str.replace(/@\((\w+)\)/g, function(match, key){
            return typeof data[key] === "undefined" ? '' : data[key]});
    },
    bindArttemplate:function (str,data){
        var render = template.compile(str);
        var html = render(data)
        return html;
    },
    //��ѯ�ַ���  ҳ��֮��Ĵ���  location.search
    querystring:function() {//��ȡURL��ѯ�ַ�������ֵ��ͨ�ú���
        var str = window.location.search.substring(1);//��ȡ��ѯ�ַ�������"id=1&name=location"�Ĳ���
        var arr = str.split("&");//��&����Ϊ��Ѳ�ѯ�ַ����ָ������
        var json = {};//����һ����ʱ����
        //��������
        for(var i=0;i<arr.length;i++) {
            var c = arr[i].indexOf("=");//��ȡÿ�������еĵȺ�С���λ��
            if(c==-1) continue;//���û�з��ֲ�������һ��ѭ����������


            var d = arr[i].substring(0,c);  //��ȡ�Ⱥ�ǰ�Ĳ������ƣ�����ֱ���id��name
            var e = arr[i].substring(c+1);  //��ȡ�Ⱥź�Ĳ���ֵ
            json[d] = e;//����/ֵ�Ե���ʽ�洢�ڶ�����
        }
        return json;//���ض���
    },
})

//�������ͼ��ģ��
$$.extend($$,{
    /*�ж�һ�������ǲ�����ֵ��*/
    isNumber:function (val){
        return typeof val === 'number'
    },
    /*�ж�һ�������ǲ��ǲ�����*/
    isBoolean:function (val) {
        return typeof val ==="boolean";
    },
    /*�ж�һ�������ǲ����ַ���*/
    isString:function (val) {
        return typeof val === "string";
    },
    /*�ж�һ�������ǲ���isUndefined��*/
    isUndefined:function (val) {
        return typeof val === "undefined";
    },
    isObj:function (str){
        if(str === null || typeof str === 'undefined'){
            return false;
        }
        return typeof str === 'object';
    },
    isNull:function (val){
        return  val === null;
    },
    /*�ж�һ�������ǲ�����������*/
    isArray:function (arr) {
        /*toString.call*/
        if(arr === null || typeof arr === 'undefined'){
            return false;
        }
        return arr.constructor === Array;
    },
    isArray2:function (arr) {
        return Object.prototype.toString.call(arr) === '[object Array]';
    },
    //��һ���������书��
})

/*ѡ�������ģ�� id tag classѡ�� */
$$.extend($$,{
    /*idѡ����*/
    $id:function(id){
        return document.getElementById(id)
    },
    /*tag��ǩѡ����*/
    $tag:function (tag,id){

    /*��дע��*/
    /*�����˼ά����ģ�黯*/
    /*��˼�����д Ȼ��ͨ��ע��д�����˼·��Ȼ����ȥ����*/
    /*��һ������ȡ����Ԫ�� --��С��Χ*/
    var dom = getDOM(id);
    /*�ڶ���������tag ��ĳ�����������ȡ���е�Ԫ��*/
    var elements =getElements(dom,tag);
    return elements;


    /*���뷨��*/
    /*�����ǵĴ���ָ�������֣�����Ĳ�����������Ĳ���*/
    /*�ڶ����ֲ���Ҫȥ���Ǵ��ݽ����ĵ������ַ�������dom
     Ҳ����Ҫ����id������undefined������ȷ��
     ��һ�е����ⶼ��������һ�����������ҽ�� ��ֻ�ý���õı������б��*/


    /*֪ʶ�㣺�Ӻ���*/
    /*��һ�������ڲ����԰�������һ������  -�Ӻ��� ��Ƕ���� �ֲ�����*/
    // ��һ�� ����id��ȡdom -- ������Χ
    function getDOM(id){
        var dom ;
        if($$.isString(id)){
            dom = document.getElementById(id)
        }else{
            dom = id
        }
        return dom;
    }
    //�ڶ��� �������Χ����ȥѰ��������Ҫ��Ԫ��
    function getElements(context,tag){
        if(context){
            return context.getElementsByTagName(tag)
        }else{
            return document.getElementsByTagName(tag)
        }

    }
},
    /*classѡ����*/
    $classOld:function (className,mycontext){
    //��һ�� ��ȡ��Χ�������dom
    var mydom = getDOM(mycontext)
    /*�ڶ������ٴ������Χ����Ѱ��Ԫ��*/
    var elements = getElements(className,mydom)
    return elements;


    //��һ�� ��ȡ��Χ�������dom
    function getDOM(context){
        /*���contextû�д��ݹ�����undefined������ʾֻ��һ������,��ô���Ǿʹ�documentȥѰ��Ԫ��*/
        /*���context����ֵ�ģ��ֳַ�����������ַ�����dom����
        ������ַ��������ǽ���ת����dom
        �����dom�Ļ���ֱ��ʹ��*/

        /*����Ԫ���ʽ���߶�·���ʽ�������*/
        if(context){
            if($$.isString(context)){
                return document.getElementById(context)
            }else{
                return context;
            }
        } else{
            return document;
        }

    }
    /*�ڶ������ٴ������Χ����Ѱ��Ԫ��*/
    function getElements(className,dom){
        if(dom.getElementsByClassName){
            /*ʹ��ԭ���Ļ�ȡԪ��*/
            return dom.getElementsByClassName(className)
        }else{
            /*��������� ʹ���Զ����������ȡԪ��*/
            var doms = dom.getElementsByTagName('*')
            var elements =[];
            for(var i = 0,len=doms.length;i<len;i++){
                if(doms[i].className == className){
                    elements.push(doms[i])
                }
            }
            return elements;
        }
    }
},
    /*���ú���������д��*/
    $class:function(className,context){
        var elements=[];
        var dom;
        if (context){
            if($$.isString(context)){
                context = $$.$id(context);
            }
        }else{
            context = document;
        }

        //�������getElementsByClassName
        if(context.getElementsByClassName){
            return context.getElementsByClassName(className);
        }else{
            //����������֧��
            dom = context.getElementsByTagName('*');
            for(var i,len=dom.length;i<len;i++) {
                if(dom[i].className && dom[i].className ==className ) {
                    elements.push(dom[i]);
                }
            }
        }
        return elements;
    },
    //����ѡ����
    $group:function(content) {
        var result=[],doms=[];
        var arr = $$.trim(content).split(',');
        //alert(arr.length);
        for(var i=0,len=arr.length;i<len;i++) {
            var item = $$.trim(arr[i])
            var first= item.charAt(0)
            var index = item.indexOf(first)
            if(first === '.') {
                doms=$$.$class(item.slice(index+1))
                //ÿ��ѭ����doms������reult��
                //result.push(doms);//������Դ

                //����1��� ��װ�ظ��Ĵ���ɺ���
                pushArray(doms,result)

            }else if(first ==='#'){
                doms=[$$.$id(item.slice(index+1))]//���壺֮ǰ���Ƕ����doms�����飬����$id��ȡ�Ĳ������飬���ǵ���Ԫ��
                //��װ�ظ��Ĵ���ɺ���
                pushArray(doms,result)
            }else{
                doms = $$.$tag(item)
                pushArray(doms,result)
            }
        }
        return result;

        //��װ�ظ��Ĵ���
        function pushArray(doms,result){
            for(var j= 0, domlen = doms.length; j < domlen; j++){
                result.push(doms[j])
            }
        }
    },
    //���ѡ���� - �㷨���� -- �������� --�߼�˼ά����
    $cengci:function (select){
        //�������Ʒ��� -- Ѱ�һ��Ƶ�
        var sel = $$.trim(select).split(' ');
        var result=[];
        var context=[];
        for(var i = 0, len = sel.length; i < len; i++){
            result=[];
            var item = $$.trim(sel[i]);
            var first = sel[i].charAt(0)
            var index = item.indexOf(first)
            var name = item.slice(index+1)
            if(first ==='#'){
                //�����#���ҵ���Ԫ�أ�
                pushArray([$$.$id(name)]);
                context = result;
            }else if(first ==='.'){
                //�����.
                //�����.
                //�ҵ�context�����е�classΪ��s-1����Ԫ�� --context�Ǹ�����
                if(context.length){
                    for(var j = 0, contextLen = context.length; j < contextLen; j++){
                        pushArray($$.$classOld(name, context[j]));
                    }
                }else{
                    pushArray($$.$class(name));
                }
                context = result;
            }else{
                //����Ǳ�ǩ
                //�������ף��ҵ������е�Ԫ��==���׶�����context��
                if(context.length){
                    for(var j = 0, contextLen = context.length; j < contextLen; j++){
                        pushArray($$.$tag(item, context[j]));
                    }
                }else{
                    pushArray($$.$tag(item));
                }
                context = result;
            }
        }

        return context;

        //��װ�ظ��Ĵ���
        function pushArray(doms){
            for(var j= 0, domlen = doms.length; j < domlen; j++){
                result.push(doms[j])
            }
        }
    },
    $groupLayer:function (str) {
    var result = [];
    var item = $$.trim(str).split(',');
    for(var i = 0, glen = item.length; i < glen; i++){
        var select = $$.trim(item[i]);
        var context = [];
        context = $$.$cengci(select);
        pushArray(context);

    };
    return result;

    //��װ�ظ��Ĵ���
    function pushArray(doms){
        for(var j= 0, domlen = doms.length; j < domlen; j++){
            result.push(doms[j])
        }
    }
},
    $all:function (str,context){
    /*��������*/
    /*��·���ʽ��Ҳ�ܱ�֤���ֵ����һ��������Ҳ�ܹ���������*/
    context = context|| document;
    return context.querySelectorAll(str)
}

})

/*�¼����*/
$$.extend($$,{
    //������Ҫ��дһ������ ����ͬʱ�ܹ��������е������  -�ص� -���˱���Ҫ��
    on:function (id,type,fn){
        /*��Ԫ���ʽ*/
        var dom = $$.isString(id)? $$.$id(id):id;
        /*����ж�������Ƿ����ĳ������*/
        /*��ʵ�����ж�ĳ�������Ƿ����ĳ������*/
        if(dom.addEventListener){
            /*ʹ��addEventListener����д�¼�*/
            dom.addEventListener(type, fn, false);
        }else{
            if(dom.attachEvent){
                /*ʹ��΢��˾�ļ�������д�¼�*/
                dom.attachEvent('on' + type, fn);
            }
        }
    },
    /*����� -- û��Ҫ����˽� --֪���Ϳ�����*/
    un:function(id, type, fn){
        //var dom = document.getElementById(id);
        var dom = $$.isString(id)?document.getElementById(id):id;
        if(dom.removeEventListener){
            dom.removeEventListener(type, fn);
        }else if(dom.detachEvent){
            dom.detachEvent(type, fn);
        }
    },

    //ģ�����¼� ����¼������� click
    /*click mouseover hover bind one*/
    click: function (id,fn){
        $$.on(id,'click',fn);
    },

    /*��������¼�*/
    mouseover:function (id,fn){
        $$.on(id,'mouseover',fn);
    },

    /*����Ƴ��¼�*/
    mouseout:function (id,fn){
        $$.on(id,'mouseout',fn);
    },

    /*������Ϻ��Ƴ��¼������������*/
    hover:function (id,fnOver,fnOut){
        if(fnOver){
            $$.on(id,"mouseover",fnOver);
            /* mouseover(id,fnOver)*/
        }
        if(fnOut){
            $$.on(id,"mouseout",fnOut);
            /* mouseout(id,fnOut)*/
        }
    },
    //ע�ͱȴ�����Ҫ
    /*����д��ܵ�Ŀ���Ǹ�����ʹ�õ�
     �����д��ҳ ע�Ͳ��Ǻ���Ҫ*/
    /*��ȡevent����*/
    getEventOld:function (e){
        //�����ie����� --- ʹ��window.event����ȡevent����
        //�������ie���������������������֧�ֱ�׼�ģ���ô����ֱ���ں����мӸ�������ϵͳ���Զ����������������event����
        var event;
        if(e){
            event = e;
        }else if(window.event){
            event = window.event;
        }

        return event
    },
    getEvent:function (e){
        /*��Ԫ���ʽ*/
        return e?e:window.event;
    },

    /*��ȡ�¼�Ŀ��  --��ΪΪ�˱�֤��ͬ��������̵Ĳ�ͬ�汾������*/
    getTarget:function  (event){
        var e = $$.getEvent(event);
        /*��·���ʽ*/
        return e.target|| e.srcElement;
    },
    //��ֹĬ����Ϊ
    preventDefault:function (event){
        var event = $$.getEvent(event);
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    },
    //��ֹð��
    stopPropagation:function (event){
        var event = $$.getEvent(event);
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble = true;
        }
    }

})

