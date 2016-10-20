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
    $id:function(id){
        return document.getElementById(id)
    },
    $tag:function(tag){
        return document.getElementsByTagName(tag)
    },
    $class:function(){},
    $cengci:function(){},
    $group:function(){}

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

