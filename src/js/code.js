
 jQuery(function($){
    var show_num = [];
    var center = document.querySelector('.center');
    draw(show_num);
    var shoujihao = false;
    var mima = false;
    var yzm = false;
    var jym = false;

    console.log(show_num)
    //手机号
    var shou = /^1\d{10}$/;
    $('#register-d1').on('focus',function(){ //焦点
       jioadian($(this),'请输入11位手机号码',true);
    }).on('blur',function(){  //失焦
        var hui = shijiao(shou,$(this),'请输入正确手机号码');
        if(hui == true){
            // console.log(shoujihao)
            $.ajax({
                type : 'post',
                dataType : 'json',
                url : '../api/yonghu.php',
                data : {
                    name : $(this).val()
                },
                success : function(xhr){
                    console.log(xhr)
                    if(xhr.num == 0){
                        show('手机号可以注册',center);
                        shoujihao = true;
                    }else{
                        show('手机号已存在,请登录',center);
                        shoujihao = false;
                    }
                }
                   
            })
        }else{
            shoujihao = false;
            // console.log(shoujihao)
        }
    })

    // 验证码
    $('#canvas').on('click',function(){ //焦点
        draw(show_num);
        
    })
    $('#register-d2').on('focus',function(){ //焦点
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

    // 设置密码
    var mi = /^[A-Z]\w{5,11}$/;
    $('#register-d4').on('focus',function(){ //焦点
       jioadian($(this),'6到12位的密码，首字母大写',true);
    }).on('blur',function(){  //失焦
        var hui = shijiao(mi,$(this),'请输入正确密码');
        if(hui == true){
            mima = true;
            // console.log(mima)
        }else{
            mima = false;
            // console.log(mima)
        }
        if($('#register-d5').val() != $(this).val()){
            $(this).next().next().css({'display':'block','backgroundColor':'#ed787f'}).text('请输入确定密码');
            $(this).css({'border':'1px solid #ff6666'})
            mima = false;
        }
    })

    // 确定密码
    $('#register-d5').on('focus',function(){ //焦点
        jioadian($(this),'输入确定密码',true);
    }).on('blur',function(){  //失焦
    if($(this).val() ==''){
        $(this).next().next().css({'display':'block','backgroundColor':'#ed787f'}).text('不能为空');
        $(this).css({'border':'1px solid #ff6666'})
        mima = false;
    }else if($('#register-d4').val() == $(this).val()){
        mima = true;
        $(this).next().next().css('display','none');
        $(this).css({'border':'1px solid #CCC'})
        $('#register-d4').next().next().css({'display':'none','backgroundColor':'#ed787f'});
        $('#register-d4').css({'border':'1px solid #CCC'})
        }else{
        mima = false;
        console.log(mima)
        $(this).next().next().css({'display':'block','backgroundColor':'#ed787f'}).text('密码不正确');
        $(this).css({'border':'1px solid #ff6666'})
        $(this).next().css({'display':'block'})
        }
    })

    
    //  shoujihao = false;
    //  mima = false;
    //  yzm = false;

    $('#btn').on('click',function(){
        draw(show_num);
        console.log($('#check').get(0).checked)
        if($('#check').get(0).checked != true){
            show('请同意协议',center);
        }else if(shoujihao == false){
            show('手机号有误，请检查',center);
            $('#register-d1').get(0).focus();
        }else if(mima == false){
            show('密码有误，请检查',center);
            $('#register-d4').get(0).focus();
        }else if(yzm == false){
            show('验证码有误，请检查',center);
            $('#register-d2').get(0).focus();
        }else{
            var $user = $('#register-d1').val();
            var $pass = $('#register-d5').val()
            $.ajax({
                type : 'post',
                dataType : 'json',
                url : '../api/zhuce.php',
                data : {
                    user : $('#register-d1').val(),
                    pass : $('#register-d5').val()
                },
                success : function(xhr){
                    console.log(xhr)
                    // if(xhr.insert == true){
                    //     location.href = '../index.html';
                    // }else{
                    //     show('抱歉，系统出错，请刷新页面',center);
                    // }
                    if(xhr.insert == true){
                        $.cookie('user',xhr.user,{ expires: 1 , path:'/'});
                        $.cookie('pass',xhr.pass,{ expires: 1 , path:'/'});
                        $.cookie('name',xhr.sole,{ expires: 1 , path:'/'});
                        $.cookie('bluer',true,{ expires: 1 , path:'/'})
                        location.href = '../index.html';
                       
                        
                    }else{
                        show('抱歉，系统出错，请刷新页面',center);
                    }
                    
                }
                   
            })
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
 
