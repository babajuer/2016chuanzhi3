//���ǵĿ��
//��һ�����⣺��������ʲô���� -- ��������+�հ�
//�ڶ������⣺��Ϊʲô����������window ��JQuery
//���������⣺ window.ICD = $ = ICD;
;(function(w){
    var itcast = {
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
        }
    };

    //��װ�¼����
    itcast.extend(itcast,{
        on: function (id, type, fn){
            var dom = $$.isString(id)?document.getElementById(id):id;
            //���֧��
            //W3C�汾 --��� �ȸ� �ȴ���������
            //�������������Ƿ�֧��ĳ�����ԣ�����������ͨ�����ַ�ʽ
            if(dom.addEventListener ){
                dom.addEventListener(type, fn, false);
            }else if(dom.attachEvent){
                //���֧�� --IE
                //
                dom.attachEvent('on' + type, fn);
            }
        },
        un:function(id, type, fn){
            var dom = $$.isString(id)?document.getElementById(id):id;
            if(dom.removeEventListener){
                dom.removeEventListener(type, fn);
            }else if(dom.detachEvent){
                dom.detachEvent(type, fn);
            }
        },
        trigger: function(id,type){
            var dom = $$.isString(id)?document.getElementById(id):id;
            // �ִ������
            if(dom.dispatchEvent){
                // �����¼�
                var evt = document.createEvent('Event');
                // �����¼�������
                evt.initEvent(type, true, true);
                // �����¼�
                dom.dispatchEvent(evt);
                // IE
            } else if(dom.fireEvent){
                dom.fireEvent('on' + type);
            }
        },
        //�¼�����
        getEvent:function(event){
            return event?event:window.event;
        },
        //��ȡĿ��
        GetTarget :function(event){
            var e = $$.getEvent(event);
            return e.target|| e.srcElement;
        },
        //��֯Ĭ����Ϊ
        preventDefault:function(event){
            var event = $$.getEvent(event);
            if(event.preventDefault){
                event.preventDefault();
            }else{
                event.returnValue = false;
            }
        },
        //��֯ð��
        stopPropagation:function(event){
            var event = $$.getEvent(event);
            if(event.stopPropagation){
                event.stopPropagation();
            }else{
                event.cancelBubble = true;
            }
        }
    })

    //��װѡ����
    itcast.extend(itcast,{
        //idѡ����
        $id:function(id){
            return document.getElementById(id);
        },
        //tagѡ����
        $tag:function(tag,context){
            if(typeof context == 'string'){
                context = $$.$id(context);
            }

            if(context){
                return context.getElementsByTagName(tag);
            }else{
                return document.getElementsByTagName(tag);
            }
        },
        //classѡ����
        $class:function(className,context){
            var i=0,len,dom=[],arr=[];
            //������ݹ��������ַ��� ����ת����Ԫ�ض���
            if($$.isString(context)){
                context = document.getElementById(context);
            }else{
                context = document;
            }
//        �������getElementsByClassName
            if(context.getElementsByClassName){
                return context.getElementsByClassName(className);
            }else{
                //����������֧��
                dom = context.getElementsByTagName('*');

                for(i;len=dom.length,i<len;i++)
                {
                    if(dom[i].className)
                    {
                        arr.push(dom[i]);
                    }
                }
            }
            return arr;
        },
        //����ѡ����
        $group:function(content) {
            var result=[],doms=[];
            var arr = $$.trim(content).split(',');
            //alert(arr.length);
            for(var i=0,len=arr.length;i<len;i++) {
                var item = $$.trim(arr[i])
                var first= item.charAt(0)
                var index = item.indexOf(first)
                if(first === '.') {
                    doms=$$.$class(item.slice(index+1))
                    //ÿ��ѭ����doms������reult��
                    //result.push(doms);//������Դ

                    //����1��� ��װ�ظ��Ĵ���ɺ���
                    pushArray(doms,result)

                }else if(first ==='#'){
                    doms=[$$.$id(item.slice(index+1))]//���壺֮ǰ���Ƕ����doms�����飬����$id��ȡ�Ĳ������飬���ǵ���Ԫ��
                    //��װ�ظ��Ĵ���ɺ���
                    pushArray(doms,result)
                }else{
                    doms = $$.$tag(item)
                    pushArray(doms,result)
                }
            }
            return result;

            //��װ�ظ��Ĵ���
            function pushArray(doms,result){
                for(var j= 0, domlen = doms.length; j < domlen; j++){
                    result.push(doms[j])
                }
            }
        },
        //���ѡ����
        $cengci:function (select){
            //�������Ʒ��� -- Ѱ�һ��Ƶ�
            var sel = $$.trim(select).split(' ');
            var result=[];
            var context=[];
            for(var i = 0, len = sel.length; i < len; i++){
                result=[];
                var item = $$.trim(sel[i]);
                var first = sel[i].charAt(0)
                var index = item.indexOf(first)
                if(first ==='#'){
                    //�����#���ҵ���Ԫ�أ�
                    pushArray([$$.$id(item.slice(index + 1))]);
                    context = result;
                }else if(first ==='.'){
                    //�����.
                    //�����.
                    //�ҵ�context�����е�classΪ��s-1����Ԫ�� --context�Ǹ�����
                    if(context.length){
                        for(var j = 0, contextLen = context.length; j < contextLen; j++){
                            pushArray($$.$class(item.slice(index + 1), context[j]));
                        }
                    }else{
                        pushArray($$.$class(item.slice(index + 1)));
                    }
                    context = result;
                }else{
                    //����Ǳ�ǩ
                    //�������ף��ҵ������е�Ԫ��==���׶�����context��
                    if(context.length){
                        for(var j = 0, contextLen = context.length; j < contextLen; j++){
                            pushArray($$.$tag(item, context[j]));
                        }
                    }else{
                        pushArray($$.$tag(item));
                    }
                    context = result;
                }
            }

            return context;

            //��װ�ظ��Ĵ���
            function pushArray(doms){
                for(var j= 0, domlen = doms.length; j < domlen; j++){
                    result.push(doms[j])
                }
            }
        },
        //����+���
        $select:function(str) {
            var result = [];
            var item = $$.trim(str).split(',');
            for(var i = 0, glen = item.length; i < glen; i++){
                var select = $$.trim(item[i]);
                var context = [];
                context = $$.$cengci(select);
                pushArray(context);

            };
            return result;

            //��װ�ظ��Ĵ���
            function pushArray(doms){
                for(var j= 0, domlen = doms.length; j < domlen; j++){
                    result.push(doms[j])
                }
            }
        },
        //html5ʵ�ֵ�ѡ����
        $all:function(selector,context){
            context = context || document;
            return  context.querySelectorAll(selector);
        },
    })

    //��װcss���
    itcast.extend(itcast,{
        //��ʽ
        css:function(context, key, value){
            console.log('dfdfd')
            var dom = $$.isString(context)?$$.$all(context) : context;
            //���������
            if(dom.length){
                //�ȹǼܹǼ� -- ����ǻ�ȡģʽ -- ���������ģʽ
                //���value��Ϊ�գ����ʾ����
                if(value){
                    for(var i = dom.length - 1; i >= 0; i--){
                        setStyle(dom[i],key, value);
                    }
                    //            ���valueΪ�գ����ʾ��ȡ
                }else{
                    return getStyle(dom[0]);
                }
                //�����������
            }else{
                if(value){
                    setStyle(dom,key, value);
                }else{
                    return getStyle(dom);
                }
            }
            function getStyle(dom){
                if(dom.currentStyle){
                    return dom.currentStyle[key];
                }else{
                    return getComputedStyle(dom,null)[key];
                }
            }
            function setStyle(dom,key,value){
                dom.style[key] = value;
            }
        },
        //��ʾ
        show:function (content){
            var doms =  $$.$all(content)
            for(var i= 0,len=doms.length;i<len;i++){
                $$.css(doms[i], 'display', 'block');
            }
        },
        //���غ���ʾԪ��
        hide:function (content){
            var doms =  $$.$all(content)
            for(var i= 0,len=doms.length;i<len;i++){
                $$.css(doms[i], 'display', 'none');
            }
        }
    })

    //��װ���Կ��
    itcast.extend(itcast,{
        //���Բ�������ȡ���Ե�ֵ���������Ե�ֵ at tr��'test','target','_blank'��
        attr:function(content, key, value){
            var dom =  $$.$all(content);
//        ���������  ����tag
            if(dom.length){
                if(value){
                    for(var i= 0, len=dom.length; i <len; i++){
                        dom[i].setAttribute(key, value);
                    }
                }else{
                    return dom[0].getAttribute(key);
                }
//            ����ǵ���Ԫ��  ����id
            }else{
                if(value){
                    dom.setAttribute(key, value);
                }else{
                    return dom.getAttribute(key);
                }
            }
        },
        //��̬��Ӻ��Ƴ�class
        addClass:function (context, name){
            var doms = $$.$all(context);
            //�����ȡ���Ǽ���
            if(doms.length){
                for(var i= 0,len=doms.length;i<len;i++){
                    addName(doms[i]);
                }
                //�����ȡ�Ĳ��Ǽ���
            }else{
                addName(doms);
            }
            function addName(dom){
                dom.className = dom.className + ' ' + name;
            }
        },
        removeClass:function (context, name){
            var doms = $$.$all(context);
            if(doms.length){
                for(var i= 0,len=doms.length;i<len;i++){
                    removeName(doms[i]);
                }
            }else{
                removeName(doms);
            }
            function removeName(dom){
                dom.className = dom.className.replace(name, '');
            }
        },
        //�ж��Ƿ���
        hasClass:function(context,name){
            var doms = $$.$all(context)
            var flag = true;
            for(var i= 0,len=doms.length;i<len;i++){
                flag = flag && check(doms[i],name)
            }

            return flag;
            //�ж�����Ԫ��
            function check(element,name){
                return -1<(" "+element.className+" ").indexOf(" "+name+" ")
            }
        },
        //��ȡ
        getClass:function (id){
            var doms = $$.$all(id)
            return $$.trim(doms[0].className).split(" ")
        }
    })

    //���ݿ��
    itcast.extend(itcast,{
        //innerHTML�ĺ����汾
        html:function (context, value){
            var doms = $$.$all(context);
            //����
            if(value){
                for(var i= 0,len= doms.length; i<len; i++){
                    doms[i].innerHTML = value;
                }
            }else{
                return doms[0].innerHTML
            }
        }
    })

    //��װDOM��� -- ���ں���
    itcast.extend(itcast,{
        //ѡ��
        eq:function(){},
        first:function(){},
        last:function(){},
        //Ԫ�صĲ����ɾ�� ��¡
        append:function(){},
        empty:function(){},
        remove:function(){},
        clone:function(){}
    })

    w.itcast = w.$$ = w.AA  = itcast;
})(window);