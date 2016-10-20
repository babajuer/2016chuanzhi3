
//动画框架

(function(itcast){
    function Animate() {

        //一般再编写框架的时候都会定义一个配置对象保存控制动画的一些值，允许用户自定义
        //我们首先定义好默认值
        this.config={
            interval:16,
            ease:'linear',
        }
        this.timer =0;
        //定义一个index统计每次添加的对象编号 第一个为0
        this.index=-1;
        //动画对象
        //我们定义一个对象来保存运动中我们需要的数据，比如now，pass等
        this._obj={};
        //我们使用数组来保存每个每个物体的运动数据
        this._queen=[]
        //调用初始化函数
        this._init();
    }
    Animate.prototype ={


        /* ------------------------------------------------
         *公共部门
         *放置其他部门都会使用的公共方法属性
         *-------------------------------------------------*/
        eases:{
            //线性匀速
            linear:function (t, b, c, d){
                return (c - b) * (t/ d);
            },
            //弹性运动


            easeOutBounce:function (t, b, c, d) {
                if ((t/=d) < (1/2.75)) {
                    return c*(7.5625*t*t) + b;
                } else if (t < (2/2.75)) {
                    return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
                } else if (t < (2.5/2.75)) {
                    return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
                } else {
                    return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
                }
            },
            //其他
            swing: function (t, b, c, d) {
                return this.easeOutQuad(t, b, c, d);
            },
            easeInQuad: function (t, b, c, d) {
                return c*(t/=d)*t + b;
            },
            easeOutQuad: function (t, b, c, d) {
                return -c *(t/=d)*(t-2) + b;
            },
            easeInOutQuad: function (t, b, c, d) {
                if ((t/=d/2) < 1) return c/2*t*t + b;
                return -c/2 * ((--t)*(t-2) - 1) + b;
            },
            easeInCubic: function (t, b, c, d) {
                return c*(t/=d)*t*t + b;
            },
            easeOutCubic: function (t, b, c, d) {
                return c*((t=t/d-1)*t*t + 1) + b;
            },
            easeInOutCubic: function (t, b, c, d) {
                if ((t/=d/2) < 1) return c/2*t*t*t + b;
                return c/2*((t-=2)*t*t + 2) + b;
            },
            easeInQuart: function (t, b, c, d) {
                return c*(t/=d)*t*t*t + b;
            },
            easeOutQuart: function (t, b, c, d) {
                return -c * ((t=t/d-1)*t*t*t - 1) + b;
            },
            easeInOutQuart: function (t, b, c, d) {
                if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
                return -c/2 * ((t-=2)*t*t*t - 2) + b;
            },
            easeInQuint: function (t, b, c, d) {
                return c*(t/=d)*t*t*t*t + b;
            },
            easeOutQuint: function (t, b, c, d) {
                return c*((t=t/d-1)*t*t*t*t + 1) + b;
            },
            easeInOutQuint: function (t, b, c, d) {
                if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
                return c/2*((t-=2)*t*t*t*t + 2) + b;
            },
            easeInSine: function (t, b, c, d) {
                return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
            },
            easeOutSine: function (t, b, c, d) {
                return c * Math.sin(t/d * (Math.PI/2)) + b;
            },
            easeInOutSine: function (t, b, c, d) {
                return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
            },
            easeInExpo: function (t, b, c, d) {
                return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
            },
            easeOutExpo: function (t, b, c, d) {
                return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
            },
            easeInOutExpo: function (t, b, c, d) {
                if (t==0) return b;
                if (t==d) return b+c;
                if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
                return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
            },
            easeInCirc: function (t, b, c, d) {
                return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
            },
            easeOutCirc: function (t, b, c, d) {
                return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
            },
            easeInOutCirc: function (t, b, c, d) {
                if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
                return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
            },
            easeInElastic: function (t, b, c, d) {
                var s=1.70158;var p=0;var a=c;
                if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
                if (a < Math.abs(c)) { a=c; var s=p/4; }
                else var s = p/(2*Math.PI) * Math.asin (c/a);
                return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            },
            easeOutElastic: function (t, b, c, d) {
                var s=1.70158;var p=0;var a=c;
                if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
                if (a < Math.abs(c)) { a=c; var s=p/4; }
                else var s = p/(2*Math.PI) * Math.asin (c/a);
                return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
            },
            easeInOutElastic: function (t, b, c, d) {
                var s=1.70158;var p=0;var a=c;
                if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
                if (a < Math.abs(c)) { a=c; var s=p/4; }
                else var s = p/(2*Math.PI) * Math.asin (c/a);
                if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
                return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
            },
            easeInBack: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c*(t/=d)*t*((s+1)*t - s) + b;
            },
            easeOutBack: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
            },
            easeInOutBack: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
                return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
            },
            easeInBounce: function (t, b, c, d) {
                return c - this.easeOutBounce (d-t, 0, c, d) + b;
            },
            easeInOutBounce: function (t, b, c, d) {
                if (t < d/2) return this.easeInBounce (t*2, 0, c, d) * .5 + b;
                return this.easeOutBounce (t*2-d, 0, c, d) * .5 + c*.5 + b;
            }
        },
        //获取时间进程
        _getTween:function (now,pass,duration,ease){
            var yongshi = pass -now;
            //复习字面量的两种访问方式
            return this.eases[ease](yongshi,0,1,duration);
        },
        //初始化执行的代码一般放在init里面，一般是构造函数调用
        _init:function(){},

        /*新的技术*/
        getAnimationFrame:function(){
            var lastTime = 0;
            var prefixes = 'webkit moz ms o'.split(' '); //各浏览器前缀

            var requestAnimationFrame = window.requestAnimationFrame;
            var cancelAnimationFrame = window.cancelAnimationFrame;

            var prefix;
            //通过遍历各浏览器前缀，来得到requestAnimationFrame和cancelAnimationFrame在当前浏览器的实现形式
            for( var i = 0; i < prefixes.length; i++ ) {
                if ( requestAnimationFrame && cancelAnimationFrame ) {
                    break;
                }
                prefix = prefixes[i];
                requestAnimationFrame = requestAnimationFrame || window[ prefix + 'RequestAnimationFrame' ];
                cancelAnimationFrame  = cancelAnimationFrame  || window[ prefix + 'CancelAnimationFrame' ] || window[ prefix + 'CancelRequestAnimationFrame' ];
            }

            //如果当前浏览器不支持requestAnimationFrame和cancelAnimationFrame，则会退到setTimeout
            if ( !requestAnimationFrame || !cancelAnimationFrame ) {
                requestAnimationFrame = function( callback, element ) {
                    var currTime = new Date().getTime();
                    //为了使setTimteout的尽可能的接近每秒60帧的效果
                    var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
                    var id = window.setTimeout( function() {
                        callback( currTime + timeToCall );
                    }, timeToCall );
                    lastTime = currTime + timeToCall;
                    return id;
                };

                cancelAnimationFrame = function( id ) {
                    window.clearTimeout( id );
                };
            }

            //得到兼容各浏览器的API
            return {
                requestAnimationFrame : requestAnimationFrame,
                cancelAnimationFrame : cancelAnimationFrame
            }

        },

        /* ------------------------------------------------
         *运行部 老大:run
         *部门职责描述: 根据添加进来的元素属性创建动画,并运行起来
         *-------------------------------------------------*/
        //运行部老大
        _run:function(){
            var that = this;

            //run函数其实就是个循环
            that.timer = setInterval(function(){that._loop();}, that.config.interval);
        },
        //我们新增一个loop以此针对每个物体做运动 --其实就是遍历每个对象，然后依次执行move方法
        _loop:function(){
            for(var i= 0,len=this._queen.length;i<len;i++){
                this._move(this._queen[i])
            }
        },
        //单个物体运动方法
        _move:function (_obj) {
            var pass = +new Date();
            _obj.pass = pass - _obj.now;

            var dom =_obj.dom;
            var styles= _obj.styles;
            var tween = this._getTween(_obj.now,pass,_obj.duration,this.config.ease);
            if(tween>=1) {
                //this.timer.clearInterval();
                //this.timer = 0;
                //_obj.callback()
                tween = 1;
                for(var i= 0,len=styles.length;i<len;i++) {
                    if(styles[i].property=='opacity') {

                        dom.css(styles[i].property, styles[i].start+styles[i].juli*tween);
                    }
                    else {
                        dom.css(styles[i].property, styles[i].start+styles[i].juli*tween+'px');
                    }
                }
            }else {
                for(var i= 0,len=styles.length;i<len;i++) {
                    if(styles[i].property=='opacity') {

                        dom.css(styles[i].property, styles[i].start+styles[i].juli*tween);
                    }
                    else {
                        dom.css(styles[i].property, styles[i].start+styles[i].juli*tween+'px');
                    }
                }
            }
        },
        //动画执行结束后的回调函数
        _callBack:function(){},



        /* ------------------------------------------------
         *添加部  -- add
         *部门职责描述: 添加元素 以及确定我要对哪个属性做动画
         *-------------------------------------------------*/
        //部门老大 - 添加
        addOld:function(id,json,duration,callback) {
            //add方法做两件事情：适配器，运行动画，只要用户调用add方法，整个动画能够运行起来
            //我们先宏观规划add函数的接口 --注释法
            this._apdapter(id,json,duration,callback)
            this._run();
        },
        add:function() {
            try{
                //add方法做两件事情：适配器，运行动画，只要用户调用add方法，整个动画能够运行起来
                //我们先宏观规划add函数的接口 --注释法
                var options = arguments
                var id = options[0]
                var json = options[1]
                var duration = options[2]
                var callback = options[3]

                //添加默认值
                if(!duration) {
                    duration=2000;
                }else {
                    if(itcast.isString(duration)){
                        switch (duration) {
                            case 'slow' :
                            case '慢' :
                                duration = 8000;
                                break;
                            case 'normal' :
                            case '普通' :
                                duration = 4000;
                                break;
                            case 'fast' :
                            case '快' :
                                duration = 2000;
                                break;
                        }
                    }else{
                    }
                }
                this._apdapter(id,json,duration,callback)
                this._run();
            }catch(e){
                alert('代码出错,系统出错提示：'+'\n'+ e.message+'\n'+ e.name);
            }

        },
        //适配器 --单一职责原则
        //我们继续完善适配器 -- 这样运行部需要的数据基本都保存在_obj中了
        _apdapter:function (id,source,duration,callback){
            var _obj={}
            this.index++;
            _obj.index=this.index;
            /*数据类型判断的重要性*/
            _obj.dom = id
            _obj.duration = duration
            _obj.now = +new Date()
            _obj.callback =callback;
            var target=[];
            for(var item in source){
                var json={};
                //元素属性的起始位置 比如目标元素目前left 100px，希望运动到500px，那么100就是起始位置
                console.log(_obj.dom)
                console.log(_obj.dom.css(item))
                json.start = parseFloat(_obj.dom.css(item))
                json.juli = parseFloat(source[item]) - json.start;
                console.log(json.juli)
                json.property = item
                target.push(json)
            }
            _obj.styles = target;
            this._queen.push(_obj)
        },




        /* ------------------------------------------------
         *公共API -- 学习什么是公共API
         *提供给使用框架的人，使用框架的人一般只需要这样
         *-------------------------------------------------*/
        //开始动画
        begin:function() {},
        //停止动画
        stop:function() {},
        //自定义动画的配置
        setConfig:function(json){
            //如何允许用户控制动画
            var that = this;
            itcast.extend(this.config,json)
        },

        /* ------------------------------------------------
         *后勤部
         *部门职责描述: 辅助运行动画  比如清除 比如内存回收
         *-------------------------------------------------*/
        _destroy:function(obj) {
            var that = this;
            //内存优化
            //1 释放队列  -- 数组实现的  -- 就是删除数组
            //哪个物体执行完，我就释放哪个物体所占用的内存
            that._queen.splice(obj.index,1);
            //2 释放对象的属性和方法
            for(var i in obj) {
                delete obj[i];
            }
            //3 释放对象所占用的内存
            obj = null;
        }

    }


    /*需要链式访问*/
    itcast.extend({
        animate:function(json,duration,callback){
            var animate = new Animate()
            animate.add(this,json,duration,callback)
            return this;
        },
        /*带动画效果的显示*/
        fadeIn:function(duration){
           /* 透明度：0--1  1--0*/
            var animate = new Animate()
            animate.add(this,{opacity:1},duration)
            return this;
        },
        fadeOut:function(duration){
            /* 透明度：0--1  1--0*/
            var animate = new Animate()
            animate.add(this,{opacity:0},duration)
            return this;
        }
    });
    /*不需要链式访问*/
    itcast.extend(itcast, {

    });
})(itcast);


