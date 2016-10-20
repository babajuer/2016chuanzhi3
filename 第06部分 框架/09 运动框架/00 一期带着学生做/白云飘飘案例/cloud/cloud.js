
var C = {};
C.getStyle = function(obj,name){
    if(obj.currentStyle){
        return obj.currentStyle[name];
    }else{
        return getComputedStyle(obj,false)[name];
    }
}
C.setStyle = function(obj, name, value){
    if(name === 'opacity'){
        if('opacity' in obj.style)
            obj.style.opacity = value;
        else
            obj.style.filter = 'alpha(opacity:' + value*100 +')';
        //�е����⣬ie��͸����������������
    }else{
        obj.style[name] = value
    }
}


function Animate(){
    this._timer = 0;			// ѭ�����
    this._queen = [];
    this._interval = 16;		// ѭ�����
}
//ԭ��������
Animate.prototype = {
    //�޸ĵ�
    //1 add�Ŷ� ����
    //2 �����Ŷ� loop



    //-------------------------add�Ŷ�-----------------------------
    //--------------------------------------------------------------
    //--------------------------------------------------------------
    //�ٴμ�add����
    //��һְ��ԭ��
    //���ӹǼ�
    //ָ������
    add : function(param){
        if(!param)
            return;
        this._addInstance(param);
        this._run();
    }

    ,addOld : function(obj){
        if(!obj)
            return;
        //������
        this._obj = this._adaptInstance(obj);
        //����
        this._run();
    }

    //ר�Ÿ������
    //ת���Ĺ���������һ��
    ,_addInstance : function(instance){
        var obj = this._adaptInstance(instance),
            pos = this._getIndex(obj);
        if(pos < 0){
            this._queen.push(obj);
        }
    }
    //��ʼ��
    //Ϊʲô?? ��Ϊ�û����ݹ����Ķ���һ������,������Ҫ��ȫ����
    ,_adaptInstance : function(instance){
        var defaultValue = this.extend({}, {
            from : 0
            ,to : 1
            ,type : 'def'
            ,duration : 400
            ,args : null
            ,main : function(){}
            ,time : +new Date()
            ,end : function(){}
        });
        //if(instance.type && !(instance.type in this.easing))
        //instance.type = 'def';

        //��������﷨
        for(var key in defaultValue){
            if(typeof instance[key] === 'undefined')
                instance[key] = defaultValue[key];
        }
        return instance;
    }

    //-------------------------add�Ŷ�--------------------------
    //--------------------------------------------------------------
    //--------------------------------------------------------------




    //-------------------------�����Ŷ�------------------------------
    //--------------------------------------------------------------
    //--------------------------------------------------------------
    ,_run : function(){
        //������ ÿ�ζ���ִ��֮ǰ���峡 ǰ�潲��
        //����˼·�ܼ򵥾��� ѭ��ִ�ж���
        if(this._timer) return;
        this._clear();
        var that = this;
        //����ΪʲôҪ��that
        //��Ϊ�ں������� this�ǲ����ҵ�_loop��
        that._timer = setInterval(function(){that._loop();}, that._interval);
    }

    ///�仯�� loop
    ,_loop : function(){
        //���
        if(this._queen.length === 0){
            this._clear();
            return;
        }
        var now = +new Date()
            ,i = this._queen.length - 1
            ,instance = null;
        //����ѭ��
        for(; i >= 0; i--){
            instance = this._queen[i];
            instance.passed = now - instance.time;
            if(instance.passed < 0)
                continue;
            if(instance.passed >= instance.duration){
                instance.passed = instance.duration;
                instance.tween = instance.to;
                this._execute(instance);
                this._destory(instance);
            }else{
                this._bufferExec(instance);
            }
            instance = null;
        }
    }


    //try catch ����ԭ����÷�
    ,_execute : function(instance){
        instance.main(instance.args);
    }


    // ѭ�������㷨���庯��
    ,_bufferExec : function(instance){
        //�����û���������ݶ�̬����ʹ���ĸ��㷨
        instance.tween = this.easing[instance.type](instance.passed, instance.from, instance.to, instance.duration);
        this._execute(instance);
    }




    //-------------------------�㷨��------------------------------
    //--------------------------------------------------------------
    //--------------------------------------------------------------
    //���㶯��ʱ�����
    // �����㷨����
    //��������,�Ժ����ǿ��Է��ø������Щר�ҵ��㷨--��Щ�㷨һ���Ǽ�ʮ�����������ٸ���,��ǧ����,�������д��,Ȼ�����ܽ�,�Ż�,�����γ������汾
    ,easing : {
        linear: function (t, b, c, d) {
            return (c - b) * t / d + b
        }

        ,bounce:function (t, b, c, d){
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
            }
        }
    }
    //-------------------------�㷨��ؽ���------------------------------
    //--------------------------------------------------------------
    //--------------------------------------------------------------






    //-------------------------���ڲ���------------------------------
    //--------------------------------------------------------------
    //--------------------------------------------------------------
    // ֹͣ/�������
    ,_clear : function(){
        clearInterval(this._timer);
        //Ϊʲô��0 ���֪��0�ֱ�ʾfalse �������ֶ���ture,����Ϊ���Ժ������Ҫ�õ�
        this._timer = 0;
    }

    //-------------------------�����Ŷӽ���---------------------------
    //--------------------------------------------------------------
    //--------------------------------------------------------------





    //-------------------------�����Ŷ�-------------------------------
    //--------------------------------------------------------------
    //--------------------------------------------------------------

    //--------------�������в�-----------------------------------
    //�򵥰汾
    ,_getIndex : function(instance){
        var i = this._queen.length - 1;
        for(; i >= 0; i--){
            if(this._queen[i] === instance){
                return i
            }
        }
        return -1;
    }


    //-------------------------���󿽱����Ĵ���--------------------------
    ,extend2 : function(tar,source) {
        //��������
        for(var i in source){
            tar[i] = source[i];
        }
        return tar;
    }
    //��ʾarguments�÷�
    //��һ�����������,������������һ������
    //����û�����һ��������� ����
    //�������巽�������α���source�����ԣ�Ȼ�󿽱���target
//			 ����extend�Ĳ��������� 0����1����2����
    // �����0����ֱ�ӷ��� ��
    // �����1������target���Ǳ�������ֱ�ӷ������ֵ��
    // ���������������������һ��
    //����֧�ֽ������������Կ�����ͬһ��������
    ,extend : function() {
        var key
            ,i = 0
            ,len = arguments.length
            ,target = null
            ,copy;
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
    }


}
