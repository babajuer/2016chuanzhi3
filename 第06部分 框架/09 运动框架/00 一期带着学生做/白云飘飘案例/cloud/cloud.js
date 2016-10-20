
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
        //有点问题，ie的透明度设置是整数；
    }else{
        obj.style[name] = value
    }
}


function Animate(){
    this._timer = 0;			// 循环句柄
    this._queen = [];
    this._interval = 16;		// 循环间隔
}
//原型链集成
Animate.prototype = {
    //修改点
    //1 add团队 整体
    //2 运行团队 loop



    //-------------------------add团队-----------------------------
    //--------------------------------------------------------------
    //--------------------------------------------------------------
    //再次简化add功能
    //单一职责原则
    //搭建添加骨架
    //指挥中心
    add : function(param){
        if(!param)
            return;
        this._addInstance(param);
        this._run();
    }

    ,addOld : function(obj){
        if(!obj)
            return;
        //适配器
        this._obj = this._adaptInstance(obj);
        //运行
        this._run();
    }

    //专门负责添加
    //转化的工作交给另一波
    ,_addInstance : function(instance){
        var obj = this._adaptInstance(instance),
            pos = this._getIndex(obj);
        if(pos < 0){
            this._queen.push(obj);
        }
    }
    //初始化
    //为什么?? 因为用户传递过来的对象不一定完整,我们需要补全属性
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

        //对象遍历语法
        for(var key in defaultValue){
            if(typeof instance[key] === 'undefined')
                instance[key] = defaultValue[key];
        }
        return instance;
    }

    //-------------------------add团队--------------------------
    //--------------------------------------------------------------
    //--------------------------------------------------------------




    //-------------------------运行团队------------------------------
    //--------------------------------------------------------------
    //--------------------------------------------------------------
    ,_run : function(){
        //大家清除 每次动画执行之前先清场 前面讲过
        //整理思路很简单就是 循环执行动画
        if(this._timer) return;
        this._clear();
        var that = this;
        //这里为什么要用that
        //因为在函数体内 this是不会找到_loop的
        that._timer = setInterval(function(){that._loop();}, that._interval);
    }

    ///变化点 loop
    ,_loop : function(){
        //清除
        if(this._queen.length === 0){
            this._clear();
            return;
        }
        var now = +new Date()
            ,i = this._queen.length - 1
            ,instance = null;
        //队列循环
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


    //try catch 语句的原理和用法
    ,_execute : function(instance){
        instance.main(instance.args);
    }


    // 循环步长算法缓冲函数
    ,_bufferExec : function(instance){
        //根据用户输入的数据动态决定使用哪个算法
        instance.tween = this.easing[instance.type](instance.passed, instance.from, instance.to, instance.duration);
        this._execute(instance);
    }




    //-------------------------算法部------------------------------
    //--------------------------------------------------------------
    //--------------------------------------------------------------
    //计算动画时间进程
    // 动画算法对象
    //拿来主义,以后我们可以放置更多的这些专家的算法--这些算法一般是几十个人甚至几百个人,几千个人,几万个人写的,然后再总结,优化,最终形成完美版本
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
    //-------------------------算法相关结束------------------------------
    //--------------------------------------------------------------
    //--------------------------------------------------------------






    //-------------------------后勤部门------------------------------
    //--------------------------------------------------------------
    //--------------------------------------------------------------
    // 停止/清除动画
    ,_clear : function(){
        clearInterval(this._timer);
        //为什么是0 大家知道0又表示false 其他数字都是ture,这是为了以后计算需要用到
        this._timer = 0;
    }

    //-------------------------后勤团队结束---------------------------
    //--------------------------------------------------------------
    //--------------------------------------------------------------





    //-------------------------其他团队-------------------------------
    //--------------------------------------------------------------
    //--------------------------------------------------------------

    //--------------其他公有部-----------------------------------
    //简单版本
    ,_getIndex : function(instance){
        var i = this._queen.length - 1;
        for(; i >= 0; i--){
            if(this._queen[i] === instance){
                return i
            }
        }
        return -1;
    }


    //-------------------------对象拷贝核心代码--------------------------
    ,extend2 : function(tar,source) {
        //遍历对象
        for(var i in source){
            tar[i] = source[i];
        }
        return tar;
    }
    //演示arguments用法
    //将一个对象的属性,方法拷贝给另一个对象
    //如果用户传递一个零个参数 返回
    //函数总体方针是依次遍历source的属性，然后拷贝给target
//			 这里extend的参数可能是 0个，1个，2个，
    // 如果是0个：直接返回 ，
    // 如果是1个，则target就是本身，则函数直接返回这个值，
    // 如果是两个参数，和上面一样
    //这里支持将多个对象的属性拷贝到同一个对象中
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
