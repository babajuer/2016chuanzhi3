/**
 * Created by ZM on 2015/11/6.
 */
function $id(id){return document.getElementById(id)} // id函数
        function show(id){// 显示函数
            id.style.display = 'block';
        }
        function hide(id){// 隐藏函数
            id.style.display = 'none';
        }

        window.onload = function(){

            var mousex = 0; //计算在div内部的x坐标
            var mousey = 0; //计算在div内部的y坐标
            var bigx = 0; //大图的坐标
            var bigy = 0; //大图的y 坐标
            var sm = $id('spec-n1');
            var preview =$id('preview');
            var fl = $id('fllow');
            var bigpic = $id('big').children[0];
            sm.onmouseover = function(){
                //当鼠标移动的时候显示
                show($id('big'));
                show($id('fllow'));
            }
            sm.onmouseout = function(){

                hide($id('big'));
                hide($id('fllow'));
            }

             sm.onmousemove  = function(e){
                 var e = e || event;
                 mousex = e.clientX - preview.offsetLeft - fl.offsetWidth/2;
                 //计算 鼠标在盒子内部的坐标
                 mousey = e.clientY - preview.offsetTop + fl.offsetHeight;
                 console.log(mousex + " " + mousey);
                 if(mousex<175/2)
                 {
                     mousex = 0;
                 }
                 else if(mousex>175 + 175/2)
                 {
                     mousex = 175 + 175/2;
                 }
                 if(mousey<175/2)
                 {
                     mousey = 0;
                 }
                 else if(mousey>175 + 175/2)
                 {
                     mousey = 175 + 175/2;
                 }
                 fl.style.left = mousex + 'px';
                 fl.style.top = mousey + 'px';

                 bigx = 800/350 * mousex;
                 //小图 是 350   大图  800    我在小图上移动10像素 问 大图移动多少像素
                 bigy = 800/350 * mousey;

                 bigpic.style.marginTop  = -bigy+ 'px';
                 bigpic.style.marginLeft = -bigx+ 'px';

             }

        }