

;(function(w){
    var itcast={
        //�����Է���
        //���ǿ��Զ���һ��elements���ԣ��������ȡ��Ԫ��
        elements:[],
        extend:function(tar,source) {
            //��������
            for(var i in source){
                tar[i] = source[i];
            }
            return tar;
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
        }

    }
    w.itcast = w.$$ = itcast;
})(window);


//ѡ����
;(function($$){
//html5ʵ�ֵ�ѡ����
    $$.$all=function(selector,context){
        context = context || document;
        this.elements = context.querySelectorAll(selector);
//                ���ﷵ��this,Ҳ���ǵ�ǰ���������Ϳ��Է������������������Է�����
        return this;
    }

})(itcast);


;(function(w){
    var itcast={
        //�����Է���
        //���ǿ��Զ���һ��elements���ԣ��������ȡ��Ԫ��
        elements:[],
        extend:function(tar,source) {
            //��������
            for(var i in source){
                tar[i] = source[i];
            }
            return tar;
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
        }

    }

    //��װѡ����
    itcast.extend(itcast,{
        //html5ʵ�ֵ�ѡ����
        $all:function(selector,context){
            context = context || document;
            this.elements = context.querySelectorAll(selector);
//                ���ﷵ��this,Ҳ���ǵ�ǰ���������Ϳ��Է������������������Է�����
            return this;
        },
    })

    //���������¼����
    //��װ�¼����
    itcast.extend(itcast,{
        on: function (type, fn){
//                var dom = $$.isString(id)?document.getElementById(id):id;
            var doms = this.elements;
            //���֧��
            //W3C�汾 --��� �ȸ� �ȴ���������
            //�������������Ƿ�֧��ĳ�����ԣ�����������ͨ�����ַ�ʽ
            for(var i= 0,len=doms.length;i<len;i++) {
                if(doms[i].addEventListener ){
                    doms[i].addEventListener(type, fn, false);
                }else if(doms[i].attachEvent){
                    //���֧�� --IE
                    //
                    doms[i].attachEvent('on' + type, fn);
                }
            }
            return this;
        }

    })

    //��װcss���
    itcast.extend(itcast,{
        //��ʽ
        css:function(key, value ){
            var doms = this.elements;
            //���������
            if(doms.length){
                //�ȹǼܹǼ� -- ����ǻ�ȡģʽ -- ���������ģʽ
                //���value��Ϊ�գ����ʾ����
                if(value){
                    for(var i = doms.length - 1; i >= 0; i--){
                        setStyle(doms[i],key, value);
                    }
                    //            ���valueΪ�գ����ʾ��ȡ
                }else{
                    return getStyle(doms[0]);
                }
                //�����������
            }else{
                if(value){
                    setStyle(doms,key, value);
                }else{
                    return getStyle(doms);
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

            return this;
        },
        //��ʾ
        show:function (){
//                var doms =  $$.$all(content)
//                var doms = this.elements;
//                for(var i= 0,len=doms.length;i<len;i++){
//                    doms[i].css('display', 'block');
//                }
//                ��Ϊcss���յ��ǵ�ǰ����css�л�ͨ��this.elements��ȡԪ���б�
            this.css('display','block')
            return this;
        },
        //���غ���ʾԪ��
        hide:function (){
//                var doms =  $$.$all(content)
//                var doms = this.elements;
            this.css('display','none')
//                for(var i= 0,len=doms.length;i<len;i++){
//                    doms[i].css('display', 'none');
//                }
            return this;
        }
    })

    //��װ���Կ��
    itcast.extend(itcast,{
        //���Բ�������ȡ���Ե�ֵ���������Ե�ֵ at tr��'test','target','_blank'��
        attr:function( key, value){
//                var dom =  $$.$all(content);
            var doms = this.elements
            if(value){
                for(var i= 0, len=doms.length; i <len; i++){
                    doms[i].setAttribute(key, value);
                }
            }else{
                return doms[0].getAttribute(key);
            }
            return this;
        },
        //��̬��Ӻ��Ƴ�class
        addClass:function (name){
            var doms = this.elements
            //�����ȡ���Ǽ���
            for(var i= 0,len=doms.length;i<len;i++){
                addName(doms[i]);
            }
            function addName(dom){
                dom.className = dom.className + ' ' + name;
            }
            return this;
        },
        removeClass:function (name){
            var doms = this.elements
            for(var i= 0,len=doms.length;i<len;i++){
                removeName(doms[i]);
            }
            function removeName(dom){
                dom.className = dom.className.replace(name, '');
            }
            return this;
        },
    })

    //���ݿ��
    itcast.extend(itcast,{
        //innerHTML�ĺ����汾
        //innerHTML�ĺ����汾
        html:function ( value){
            //var doms = $$.$all(context);
            //����ұ�̶������this��elemennts���б��
            var doms = this.elements;
            //����
            if(value){
                for(var i= 0,len= doms.length; i<len; i++){
                    doms[i].innerHTML = value;
                }
            }else{
                return doms[0].innerHTML
            }
            return this;
        },
    })

    w.itcast = w.$$ = itcast;
})(window);
