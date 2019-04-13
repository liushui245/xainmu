jQuery(function($){
    var center = document.querySelector('.center');
    var show_num = [];
    draw(show_num);
    shoujihao = false;
    yzm = false;
    // 验证码
    $('#canvas').on('click',function(){ //焦点
        draw(show_num);
        
    })

    // 账号
    var shou = /^1\d{10}$/;
    $('#tologin-d1').on('focus',function(){ //焦点
        jioadian($(this),'请输入11位手机号码',true);
    }).on('blur',function(){  //失焦
        var hui = shijiao(shou,$(this),'请输入正确手机号码');
        if(hui == true){
        shoujihao = true;
        }else{
        shoujihao = false;
        }
    })

    // 验证码
    $('#tologin-d3').on('focus',function(){ //焦点
        jioadian($(this),'输入验证码');
    }).on('blur',function(){  //失焦
        var val = $(this).val().toLowerCase();
        var num = show_num.join("");
        if(val == num){
            yzm = true;
            console.log(yzm)
            $(this).next().next().css('display','none');
            $(this).css({'border':'1px solid #CCC'})
        }else{
            yzm = false;
            console.log(yzm)
            $(this).next().next().css({'display':'block','backgroundColor':'#ed787f'}).text('请输入正确的验证码');
            $(this).css({'border':'1px solid #ff6666'})
            $(this).next().css({'display':'block'})
        }
    })

    $('#tobtn').on('click',function(){
        var $user = $('#tologin-d1').val();
        var $pass = $('#tologin-d2').val()
        draw(show_num);
        if(shoujihao == true &&  $pass !='' && yzm == true){
            // console.log('正确')
            $.ajax({
                type : 'post',
                dataType : 'json',
                url : '../api/denglu.php',
                data : {
                    user : $user,
                    pass : $pass
                    
                },
                success : function(xhr){
                    console.log(xhr)
                    if(xhr.num > 0){
                        $.cookie('user',$user,{ expires: 1 , path:'/'});
                        $.cookie('pass',$pass,{ expires: 1 , path:'/'});
                        $.cookie('name',xhr.data[0].sole,{ expires: 1 , path:'/'});
                        $.cookie('bluer',true,{ expires: 1 , path:'/'})
                        location.href = '../index.html';
                        
                        
                    }else{
                        show('账号密码有误，请检查',center);
                    }
                   
                    //存储cookie
                    if($('#check').get(0).checked == true){
                        $.cookie('userl',$user,{ expires: 1 , path:'/'});
                        $.cookie('passl',$pass,{ expires: 1 , path:'/'});
                        $.cookie('namel',xhr.data[0].sole,{ expires: 1 , path:'/'});
                        $.cookie('bluer',true,{ expires: 1 , path:'/'})
                    }else{
                        $.cookie('userl',null,{ expires: 1 , path:'/'});
                        $.cookie('passl',null,{ expires: 1 , path:'/'});
                        $.cookie('namel',null,{ expires: 1 , path:'/'});
                    }
                }
                   
            })
            
        }else{
            show('请检查用户名或密码',center);
        }
    })
    
    //提示div显示
    function show(text,ele){
        ele.innerText = text;
        ele.style.display = 'block';
        setTimeout(function(){
            ele.style.display = 'none';
        },2000)
        ele.style.left = (window.innerWidth - ele.offsetWidth) / 2 +'px';
        ele.style.top = (window.innerHeight - ele.offsetHeight) / 2 + 'px';
            
    }
     //焦点函数
     function jioadian(ele,text,chuan){
        ele.next().next().css({'display':'block','backgroundColor':'#CCC'}).text(text);
        ele.css({'border':'1px solid #ff6666'})
        // console.log(chuan)
        if(chuan != undefined){
            ele.next().css({'display':'none'})
        }
        
    }

    // 失焦函数
    function shijiao(reg,ele,text){ //正则  元素  文本
        if(reg.test(ele.val())){
            console.log(ele.val())
            ele.next().next().css('display','none');
            ele.css({'border':'1px solid #CCC'})
            return true;
        }
        else{
            ele.next().next().css({'display':'block','backgroundColor':'#ed787f'}).text(text);
            ele.css({'border':'1px solid #ff6666'})
            ele.next().css({'display':'block'})
        }
    }
    //生成并渲染出验证码图形
    function draw(show_num) {
        var canvas_width=$('#canvas').width();
        var canvas_height=$('#canvas').height();
        var canvas = document.getElementById("canvas");//获取到canvas的对象，演员
        var context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
        canvas.width = canvas_width;
        canvas.height = canvas_height;
        var sCode = "a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
        var aCode = sCode.split(",");
        var aLength = aCode.length;//获取到数组的长度
        
        for (var i = 0; i < 4; i++) {  //这里的for循环可以控制验证码位数（如果想显示6位数，4改成6即可）
            var j = Math.floor(Math.random() * aLength);//获取到随机的索引值
            // var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
            var deg = Math.random() - 0.5; //产生一个随机弧度
            var txt = aCode[j];//得到随机的一个内容
            show_num[i] = txt.toLowerCase();
            var x = 10 + i * 20;//文字在canvas上的x坐标
            var y = 20 + Math.random() * 8;//文字在canvas上的y坐标
            context.font = "bold 23px 微软雅黑";

            context.translate(x, y);
            context.rotate(deg);

            context.fillStyle = randomColor();
            context.fillText(txt, 0, 0);

            context.rotate(-deg);
            context.translate(-x, -y);
        }
        for (var i = 0; i <= 5; i++) { //验证码上显示线条
            context.strokeStyle = randomColor();
            context.beginPath();
            context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
            context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
            context.stroke();
        }
        for (var i = 0; i <= 30; i++) { //验证码上显示小点
            context.strokeStyle = randomColor();
            context.beginPath();
            var x = Math.random() * canvas_width;
            var y = Math.random() * canvas_height;
            context.moveTo(x, y);
            context.lineTo(x + 1, y + 1);
            context.stroke();
        }
    }

    //得到随机的颜色值
    function randomColor() {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return "rgb(" + r + "," + g + "," + b + ")";
    }
})