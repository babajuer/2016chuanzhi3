/**
 * ���ߣ����ǲ��ͽ�������
 * �������ڣ�2015/12/25
 * ������ͨ�ÿ��
 * ��Ȩ���� Υ�߱ؾ�
 */

//����һ������ - ������$

/*�������*/
var $$ = function() {};
//�ڶ���д��
$$.prototype = {
    $id:function (str){
        return document.getElementById(str)
    },
    $tag:function(tag){
        return document.getElementsByTagName(tag)
    },
    /*��ϰ*/
    /*��һ��������������Կ�������һ������*/
    extend:function(tar,source) {
        //��������
        for(var i in source){
            tar[i] = source[i];
        }
        return tar;
    },
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
    }
}
//�ڿ����ʵ��������������ʹ�õ�ʹ�þͲ���ʵ������
$$ = new $$();


/*�¼����*/
//���ǽ�����Ķ�������е����Ժͷ���������ǰ��Ķ���
/*��ô��������ǰ��Ķ���֮��ǰ��Ķ����ӵ�����������*/
$$.extend($$,{
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

