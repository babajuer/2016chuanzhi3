/**
 * ���ߣ����ǲ��ͽ�������
 * �������ڣ�2016/01/12
 * ������ͨ�ÿ��
 * ��Ȩ���� Υ�߱ؾ�
 */
var $$ = function() {};
$$.prototype = {
    /*��һ��������������Կ�������һ������*/
    extend:function(tar,source) {
        //��������
        for(var i in source){
            tar[i] = source[i];
        }
        return tar;
    }
}
$$ = new $$();

//����
$$.extend($$,{

    //�����
    random: function (begin, end) {
        return Math.floor(Math.random() * (end - begin)) + begin;
    },
    /*ģ�����*/
})

/*���������ж�*/
$$.extend($$,{
    //�������ͼ��
    isNumber:function (val){
        return typeof val === 'number' && isFinite(val)
    },
    isBoolean:function (val) {
        return typeof val ==="boolean";
    },
    isString:function (val) {
        return typeof val === "string";
    },
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
    isArray:function (arr) {
        if(arr === null || typeof arr === 'undefined'){
            return false;
        }
        return arr.constructor === Array;
    },
})

/*�ַ�������*/
$$.extend($$,{
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
})

/*���ֲ���*/
$$.extend($$,{

})

/*�������*/
$$.extend($$,{

})

/*���ڲ���*/
$$.extend($$,{

})

/*ajax���*/
$$.extend($$,{
    //ajax - ǰ������ѧϰ��
    myAjax:function(URL,fn){
        var xhr = createXHR();	//������һ�������������IE6���ݡ�
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
                    fn(xhr.responseText);
                }else{
                    alert("������ļ���");
                }
            }
        };
        xhr.open("get",URL,true);
        xhr.send();

        //�հ���ʽ����Ϊ�������ֻ������ajax���������Է�������
        function createXHR() {
            //�����������ڡ�JavaScript�߼�������� ��3�桷��21��
            if (typeof XMLHttpRequest != "undefined") {
                return new XMLHttpRequest();
            } else if (typeof ActiveXObject != "undefined") {
                if (typeof arguments.callee.activeXString != "string") {
                    var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                            "MSXML2.XMLHttp"
                        ],
                        i, len;

                    for (i = 0, len = versions.length; i < len; i++) {
                        try {
                            new ActiveXObject(versions[i]);
                            arguments.callee.activeXString = versions[i];
                            break;
                        } catch (ex) {
                            //skip
                        }
                    }
                }

                return new ActiveXObject(arguments.callee.activeXString);
            } else {
                throw new Error("No XHR object available.");
            }
        }
    }
})

/*�¼����*/
$$.extend($$,{
    /*�¼���*/
    on: function (id, type, fn) {
        //var dom = document.getElementById(id);
        var dom = $$.isString(id)?document.getElementById(id):id;
        //���֧��
        //W3C�汾 --��� �ȸ� �ȴ���������
        //�������������Ƿ�֧��ĳ�����ԣ�����������ͨ�����ַ�ʽ
        if(dom.addEventListener ) {
            dom.addEventListener(type, fn, false);
        }else if(dom.attachEvent){
            //���֧�� --IE
            dom.attachEvent('on' + type, fn);
        }
    },
    /*���*/
    click : function(id,fn){
        this.on(id,'click',fn);
    },
    /*�������*/
    mouseover:function(id,fn){
        this.on(id,'mouseover',fn);
    },
    /*����뿪*/
    mouseout:function(id,fn){
        this.on(id,'mouseout',fn);
    },
    /*�������*/
    hover:function (id,fnover,fnout){
    if(fnover){
        $$.on(id,"mouseover",fnover);
    }
    if(fnout){
        $$.on(id,"mouseout",fnout);
    }
}
})

/*ѡ����*/
$$.extend($$,{
    $id:function(str){
        return document.getElementById(str)
    },
    $tag:function(tag){
        return document.getElementsByTagName(tag)
    }
})

