var $$ = {
    $id:function(id){
        return document.getElementById(id)
    },
    $tag:function(tag){
        return document.getElementsByTagName(tag)
    },
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
    //�������ͼ��
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
    extend: function (target,source) {
        //��������
        for(var i in source){
            target[i] = source[i];
        }
        return target;
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
    //������Ҫ��дһ������ ����ͬʱ�ܹ��������е������
    on:function (id,type,fn){
        /*  �ж�������Ƿ�֧��ĳ��������ʵ�����жϣ�ĳ�������Ƿ���ڣ����������ھ�ȥ�ж����Ƿ���ĳ������*/

        /*����js����ȫ���������ģ����еĹ��ܶ��Ƕ��������ĳ������*/

        //��������֧��addEventListener ���Ǿ�ʹ��������д�¼�
        var dom = this.$id(id)
        if(dom.addEventListener){
            /*ʹ��addEventListener����д�¼�*/
            dom.addEventListener(type, fn, false);
        }else{
            if(dom.attachEvent){
                /*ʹ��΢��˾�ļ�������д�¼�*/
                dom.attachEvent('on' + type, fn);
            }
        }


        /* ����������֧��addEventListener�����ǿ����϶���һ��΢��˾�ģ��Ϳ���ʹ��attachEvent*/
        /*���ȥ�ж�������Ƿ�֧��ĳ������*/

    }
}

