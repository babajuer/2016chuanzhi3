/**
 * ���ߣ����ǲ��ͽ�������
 * �������ڣ�2015/12/25
 * ������ͨ�ÿ��
 * ��Ȩ���� Υ�߱ؾ�
 */

 var $$={
    //tab
    tab:function(id) {
        //��λ�ȡĳ����Ԫ���������Ԫ��
        var box = document.getElementById(id);
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

    },
    //�򵥵����ݰ�formateString
    formateString:function(str, data){
        return str.replace(/@\((\w+)\)/g, function(match, key){
            return typeof data[key] === "undefined" ? '' : data[key]});
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
    //�����
    random: function (begin, end) {
        return Math.floor(Math.random() * (end - begin)) + begin;
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
    event:{
        on: function (id, type, fn){
            //var dom = document.getElementById(id);
            var dom = $$.isString(id)?document.getElementById(id):id;
            //���֧��
            //W3C�汾 --��� �ȸ� �ȴ���������
            //�������������Ƿ�֧��ĳ�����ԣ�����������ͨ�����ַ�ʽ
            /*�ж������������*/
            if(dom.addEventListener ){
                dom.addEventListener(type, fn, false);
            }else if(dom.attachEvent){
                //���֧�� --IE
                dom.attachEvent('on' + type, fn);
            }
        },
        un:function(id, type, fn){
            //var dom = document.getElementById(id);
            var dom = $$.isString(id)?document.getElementById(id):id;
            if(dom.removeEventListener){
                dom.removeEventListener(type, fn);
            }else if(dom.detachEvent){
                dom.detachEvent(type, fn);
            }
        }
    }

}

var event = function(){}
$$.event=new event()

$$.event.on
