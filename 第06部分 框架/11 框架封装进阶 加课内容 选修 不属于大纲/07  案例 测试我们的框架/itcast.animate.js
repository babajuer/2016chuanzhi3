
//�������

(function(itcast){
    function Animate() {

        //һ���ٱ�д��ܵ�ʱ�򶼻ᶨ��һ�����ö��󱣴���ƶ�����һЩֵ�������û��Զ���
        //�������ȶ����Ĭ��ֵ
        this.config={
            interval:16,
            ease:'linear',
        }
        this.timer =0;
        //����һ��indexͳ��ÿ����ӵĶ����� ��һ��Ϊ0
        this.index=-1;
        //��������
        //���Ƕ���һ�������������˶���������Ҫ�����ݣ�����now��pass��
        this._obj={};
        //����ʹ������������ÿ��ÿ��������˶�����
        this._queen=[]
        //���ó�ʼ������
        this._init();
    }
    Animate.prototype ={


        /* ------------------------------------------------
         *��������
         *�����������Ŷ���ʹ�õĹ�����������
         *-------------------------------------------------*/
        eases:{
            //��������
            linear:function (t, b, c, d){
                return (c - b) * (t/ d);
            },
            //�����˶�


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
            //����
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
        //��ȡʱ�����
        _getTween:function (now,pass,duration,ease){
            var yongshi = pass -now;
            //��ϰ�����������ַ��ʷ�ʽ
            return this.eases[ease](yongshi,0,1,duration);
        },
        //��ʼ��ִ�еĴ���һ�����init���棬һ���ǹ��캯������
        _init:function(){},

        /*�µļ���*/
        getAnimationFrame:function(){
            var lastTime = 0;
            var prefixes = 'webkit moz ms o'.split(' '); //�������ǰ׺

            var requestAnimationFrame = window.requestAnimationFrame;
            var cancelAnimationFrame = window.cancelAnimationFrame;

            var prefix;
            //ͨ�������������ǰ׺�����õ�requestAnimationFrame��cancelAnimationFrame�ڵ�ǰ�������ʵ����ʽ
            for( var i = 0; i < prefixes.length; i++ ) {
                if ( requestAnimationFrame && cancelAnimationFrame ) {
                    break;
                }
                prefix = prefixes[i];
                requestAnimationFrame = requestAnimationFrame || window[ prefix + 'RequestAnimationFrame' ];
                cancelAnimationFrame  = cancelAnimationFrame  || window[ prefix + 'CancelAnimationFrame' ] || window[ prefix + 'CancelRequestAnimationFrame' ];
            }

            //�����ǰ�������֧��requestAnimationFrame��cancelAnimationFrame������˵�setTimeout
            if ( !requestAnimationFrame || !cancelAnimationFrame ) {
                requestAnimationFrame = function( callback, element ) {
                    var currTime = new Date().getTime();
                    //Ϊ��ʹsetTimteout�ľ����ܵĽӽ�ÿ��60֡��Ч��
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

            //�õ����ݸ��������API
            return {
                requestAnimationFrame : requestAnimationFrame,
                cancelAnimationFrame : cancelAnimationFrame
            }

        },

        /* ------------------------------------------------
         *���в� �ϴ�:run
         *����ְ������: ������ӽ�����Ԫ�����Դ�������,����������
         *-------------------------------------------------*/
        //���в��ϴ�
        _run:function(){
            var that = this;

            //run������ʵ���Ǹ�ѭ��
            that.timer = setInterval(function(){that._loop();}, that.config.interval);
        },
        //��������һ��loop�Դ����ÿ���������˶� --��ʵ���Ǳ���ÿ������Ȼ������ִ��move����
        _loop:function(){
            for(var i= 0,len=this._queen.length;i<len;i++){
                this._move(this._queen[i])
            }
        },
        //���������˶�����
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
        //����ִ�н�����Ļص�����
        _callBack:function(){},



        /* ------------------------------------------------
         *��Ӳ�  -- add
         *����ְ������: ���Ԫ�� �Լ�ȷ����Ҫ���ĸ�����������
         *-------------------------------------------------*/
        //�����ϴ� - ���
        addOld:function(id,json,duration,callback) {
            //add�������������飺�����������ж�����ֻҪ�û�����add���������������ܹ���������
            //�����Ⱥ�۹滮add�����Ľӿ� --ע�ͷ�
            this._apdapter(id,json,duration,callback)
            this._run();
        },
        add:function() {
            try{
                //add�������������飺�����������ж�����ֻҪ�û�����add���������������ܹ���������
                //�����Ⱥ�۹滮add�����Ľӿ� --ע�ͷ�
                var options = arguments
                var id = options[0]
                var json = options[1]
                var duration = options[2]
                var callback = options[3]

                //���Ĭ��ֵ
                if(!duration) {
                    duration=2000;
                }else {
                    if(itcast.isString(duration)){
                        switch (duration) {
                            case 'slow' :
                            case '��' :
                                duration = 8000;
                                break;
                            case 'normal' :
                            case '��ͨ' :
                                duration = 4000;
                                break;
                            case 'fast' :
                            case '��' :
                                duration = 2000;
                                break;
                        }
                    }else{
                    }
                }
                this._apdapter(id,json,duration,callback)
                this._run();
            }catch(e){
                alert('�������,ϵͳ������ʾ��'+'\n'+ e.message+'\n'+ e.name);
            }

        },
        //������ --��һְ��ԭ��
        //���Ǽ������������� -- �������в���Ҫ�����ݻ�����������_obj����
        _apdapter:function (id,source,duration,callback){
            var _obj={}
            this.index++;
            _obj.index=this.index;
            /*���������жϵ���Ҫ��*/
            _obj.dom = id
            _obj.duration = duration
            _obj.now = +new Date()
            _obj.callback =callback;
            var target=[];
            for(var item in source){
                var json={};
                //Ԫ�����Ե���ʼλ�� ����Ŀ��Ԫ��Ŀǰleft 100px��ϣ���˶���500px����ô100������ʼλ��
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
         *����API -- ѧϰʲô�ǹ���API
         *�ṩ��ʹ�ÿ�ܵ��ˣ�ʹ�ÿ�ܵ���һ��ֻ��Ҫ����
         *-------------------------------------------------*/
        //��ʼ����
        begin:function() {},
        //ֹͣ����
        stop:function() {},
        //�Զ��嶯��������
        setConfig:function(json){
            //��������û����ƶ���
            var that = this;
            itcast.extend(this.config,json)
        },

        /* ------------------------------------------------
         *���ڲ�
         *����ְ������: �������ж���  ������� �����ڴ����
         *-------------------------------------------------*/
        _destroy:function(obj) {
            var that = this;
            //�ڴ��Ż�
            //1 �ͷŶ���  -- ����ʵ�ֵ�  -- ����ɾ������
            //�ĸ�����ִ���꣬�Ҿ��ͷ��ĸ�������ռ�õ��ڴ�
            that._queen.splice(obj.index,1);
            //2 �ͷŶ�������Ժͷ���
            for(var i in obj) {
                delete obj[i];
            }
            //3 �ͷŶ�����ռ�õ��ڴ�
            obj = null;
        }

    }


    /*��Ҫ��ʽ����*/
    itcast.extend({
        animate:function(json,duration,callback){
            var animate = new Animate()
            animate.add(this,json,duration,callback)
            return this;
        },
        /*������Ч������ʾ*/
        fadeIn:function(duration){
           /* ͸���ȣ�0--1  1--0*/
            var animate = new Animate()
            animate.add(this,{opacity:1},duration)
            return this;
        },
        fadeOut:function(duration){
            /* ͸���ȣ�0--1  1--0*/
            var animate = new Animate()
            animate.add(this,{opacity:0},duration)
            return this;
        }
    });
    /*����Ҫ��ʽ����*/
    itcast.extend(itcast, {

    });
})(itcast);


