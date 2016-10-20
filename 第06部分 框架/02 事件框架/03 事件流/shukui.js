/**
 * ���ߣ����ǲ��ͽ�������
 * �������ڣ�2015/12/25
 * ������ͨ�ÿ��
 * ��Ȩ���� Υ�߱ؾ�
 */
function $$(){

}

/*�������*/
$$.prototype={
    $id:function(id){
        return document.getElementById(id)
    },
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
    },
    //��һ���������书��
    extendMany:function() {
        var key,i = 0,len = arguments.length,target = null,copy;
        if(len === 0){
            return;
        }else if(len === 1){
            target = this;
        }else{
            i++;
            target = arguments[0];
        }
        for(; i < len; i++){
            for(key in arguments[i]){
                copy = arguments[i][key];
                target[key] = copy;
            }
        }
        return target;
    },
    extend:function(tar,source) {
        //��������
        for(var i in source){
            tar[i] = source[i];
        }
        return tar;
    },
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
    //�򵥵����ݰ�formateString
    formateString:function(str, data){
        return str.replace(/@\((\w+)\)/g, function(match, key){
            return typeof data[key] === "undefined" ? '' : data[key]});
    },
}
$$= new $$()



/*�¼����*/
var event= function(){

}
event.prototype={
    on:function (id,type,fn){
    var dom = document.getElementById(id)
    if(dom.addEventListener){
        dom.addEventListener(type,fn,false)
    }else{
        dom.attachEvent('on' + type, fn);
    }
}
}

$$.event = new event()