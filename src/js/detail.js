jQuery(function($){
    
      //读取cookie登录
    if($.cookie('bluer') == 'true'){
        $('.top-d1Top').css('display','none');
        $('.top-d2Top').css('display','block').html(
            `<em>hi,</em>
            <span>${$.cookie('name')}</span>
            <a href="#" id="exp">退出</a>
            <a href="#">消息<i>5</i></a>
            <a href="#">金币<i>50</i></a>`);

            gouwuxuanr();
            
        
    }
    // 点击退出，清空cookie bluer为false
    $('#exp').on('click',function(){
        $.cookie('bluer',false,{path:'/'});
        $.cookie('user',null,{path:'/'});
        $('.top-d2Top').css('display','none');
        $('.top-d1Top').css('display','block').html(
            `<span>欢迎来酒仙网!</span>
            <a href="html/login.html">请登录</a>
            <a href="html/register.html">免费注册</a>`
        );
        $('#Trolley').html(' ');
       $('#numshu').text('0');
    })

    //截取id
    var splic = location.search.slice(4);
    console.log(splic);
    render();
    function render(){
        Ajax('get','../api/goods.php?id=',splic,function(xhr){
            console.log(xhr)
            var $arrmin = xhr.data[0].minimg.split('","');
            var $arrmax = xhr.data[0].maximg.split('","');
            var $ID = xhr.id.slice(6);
            var $comde = xhr.data[0].comdetails.split('","');
           
            $('#srimg').html(
                `<img src="../img/detail/${$arrmin[0]}">`
            )
            $('#maximgs').html(
                `<img src="../img/detail/${$arrmax[0]}" style="left: -444px; top: -444px;">`
            )
            $('#listL').html(
                $arrmin.map(function(item){
                    return `<li><img src="../img/detail/${item}" alt=""></li>`
                }).join('')
            )

            $('#infoImg').html(
                $comde.map(function(item){
                    return `<div style="font-size:0;">
                            <img src="../img/detail/${item}" alt="" usemap="#Map" border="0">
                            </div>`

                }).join('')
            )

            //title
            $('.comName').html(
                `<h1>
                    <i class="zhenxuan"></i>
                    ${xhr.data[0].title}
                </h1>
                <p>${xhr.data[0].label}</p>`
            );
            //价格
            $('#prce').html(xhr.data[0].price);
            //点击加
            $('#jias').on('click',function(){
                var $jia = $('#_nub').val();
                $('#_nub').val(++$jia)
            })
            //点击减
            $('#jians').on('click',function(){
                var $jians = $('#_nub').val();
                if($jians>=2){
                    $('#_nub').val(--$jians)
                }else{
                    alert('不能小于一件')
                }
                
            })
            $('#addToCartForDetail').attr('data-id',xhr.id);
            //点击购物车，添加到购物车去
            $('#addToCartForDetail').on('click',function(){
                var $val = $('#_nub').val();
                var $user = $.cookie('user');
                var $datas = $(this).attr('data-id');
                var bluer = $.cookie('bluer');
                console.log(bluer)
                if(bluer == 'false'){
                    alert('抱歉，请先登录!');
                    location.href = '../html/login.html';
                }else if(bluer == 'true'){
                    console.log($('#srimg img').attr('src'))
                    goufei($('#addToCartForDetail').get(0),$('.shopping-left-gou').get(0),$('#srimg img').attr('src'))
                    $.ajax({
                        type : 'get',
                        dataType : 'json',
                        url : '../api/gouwucheinto.php',
                        data : {
                            user : $user,
                            id : $datas,
                            val : $val
                            
                        },
                        success : function(xhr){
                            
                            // alert('加入购物车成功!');
                            gouwuxuanr();
   
                        }
                    
                    })
                }
            })
            //放大镜
            var magnify = document.querySelector('.magnify-box');
            var minBox = document.querySelector('.min-img');
            var minImg = document.querySelector('.min-img img');
            var mask = document.querySelector('.mask');

            var maxBox = document.querySelector('.max-img');
            var maxImg = document.querySelector('.max-img img');

            var imgList = document.querySelectorAll('.img-list li');
            var maskHeight='';
            var maskWidth='';
            var maskWidth='';
            var minBoxWidth='';
            var minBoxHeight='';
            var maxBoxWidth='';
            var maxImgHeight='';
            var maxBoxHeight='';
            var maxImgWidth='';
            minBox.onmouseenter = function(){
                mask.style.display = 'block';
                maxBox.style.display = 'block';
                maskHeight = mask.offsetHeight;
                maskWidth = mask.offsetWidth;
                minBoxWidth = minBox.offsetWidth;
                minBoxHeight = minBox.offsetHeight;
    
                maxBoxHeight = maxBox.offsetHeight;
                maxBoxWidth = maxBox.offsetWidth;
    
                maxImgHeight = maxImg.offsetHeight
                maxImgWidth = maxImg.offsetWidth;
                // console.log(maskWidth, maskHeight);
            }
    
            minBox.onmousemove = function(ev){
                var x = ev.clientX - magnify.offsetLeft - maskWidth/2;
                var y = ev.clientY - magnify.offsetTop - maskHeight/2;
    
                var maxX = minBoxWidth - maskWidth; 
                var maxY = minBoxHeight - maskHeight; 
    
                if(x>maxX) {
                    x = maxX
                }
                if(y>maxY) {
                    y = maxY;
                }
                if(x<=0) {
                    x= 0;
                }
                if(y<=0) {
                    y = 0;
                }
                var biliX = (maxImgWidth - maxBoxWidth)/ maxX;
                var biliY = (maxImgHeight - maxBoxHeight)/ maxY;
    
                mask.style.left = x + 'px';
                mask.style.top = y + 'px';
    
                maxImg.style.left = - x * biliX + 'px';
                maxImg.style.top = - y * biliY + 'px';
    
            }
    
            minBox.onmouseleave = function(){
                mask.style.display = 'none';
                maxBox.style.display = 'none';
            }
           
            imgList.forEach(function(item,idx){
                imgList[idx].onmouseover = function(){
                    for(var i=0;i<imgList.length;i++){
                        imgList[i].classList.remove('on');
                       }
                    this.classList.add('on');
                    minImg.src = `../img/detail/${$ID}min${idx+1}.jpg`;
                    maxImg.src = `../img/detail/${$ID}max${idx+1}.jpg`;
                }
               
            })
        })

    }

       

       











     //ajax请求
     function Ajax(mode,path,data,success,failed){
        //4大步骤
        var xhr = new XMLHttpRequest();
        var sturs = [200,304];
        xhr.onreadystatechange = ()=>{
            if(xhr.readyState == 4 && sturs.indexOf(xhr.status) !=-1){
                success(JSON.parse(xhr.responseText));  
            }
        }
        if(mode == 'get'){
            xhr.open(mode,path+data);
            xhr.send(null);
        }else if(mode == 'post'){
            xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
            xhr.open(mode,path);
            xhr.send(data);
        }
    }







    //购物车
    var $shopping = $('#shopping');
    var $left = $('.shopping-left-gou');
    
      
    if($shopping.outerHeight() <= window.innerHeight ){
        //购物车缩进去
        shopbox(-300,-265,265)
        
    }else{
       //购物车缩进去
        shopbox(-318,-282,282)
    }
    function shopbox(pl,sh,qu){
        //购物车缩进去
        $shopping.animate({right:pl},1000,function(){
            $(this).stop(true,true);
        });
        $left.on('mouseover',function(){
            $(this).animate({right:0},1000,function(){
                $(this).stop(true,true);
            })
            $shopping.animate({right:sh},1000,function(){
                $(this).stop(true,true);
            })
        }).on('click',function(){
            $(this).animate({right:qu},1000,function(){
                $(this).stop(true);
            })
            // .css({right:qu});
            
            $shopping.animate({right:0},1000,function(){
                $(this).stop(true,true);
            })
        })
    }
    //购物车渲染
    function gouwuxuanr(){
        //购物车渲染
        var $gouche = $.cookie('user');
        // console.log($gouche);
        $.ajax({
            type : 'get',
            dataType : 'json',
            url : '../api/gouwuche.php',
            data : {
                account : $gouche,
                
            },
            success : function(xhr){
                // console.log(xhr);
                var $arr = xhr.data;
                // console.log($arr);
                $('#numshu').text($arr.length);
                $('#Trolley').html($arr.map(function(item){
                    var $price = item.quantity * item.price;
                    return `<li class="gou-li" data-id='${item.daid}'>
                                <div class="gou-tl">
                                    <span class="gou-l">${item.hotel}</span>
                                    <span class="gou-r">${item.price}</span>
                                </div>
                                <div class="gou-nr">
                                    <div class="gou-nr-l1">
                                        <img src="../${item.imgpath}" alt="${item.title}" />
                                    </div>
                                    <div class="gou-nr-l2">
                                        <p title="${item.title}">${item.title}</p>
                                    </div>
                                    <div class="gou-nr-l3">
                                        <button class="jian">-</button>
                                        <span id>${item.quantity}</span>
                                        <button class="jia">+</button>
                                    </div>
                                    <div class="gou-nr-l4">
                                        <span>${$price}</span>
                                    </div>
                                </div>
                            </li>`
                }));
                $('.shopping-left').height($('.shopping-right ul').height());

                // 点击减
                $('.jian').on('click',function(){
                    var dthis = $(this);
                    var $jian = $(this).closest('li');
                    var $dataid = $jian.get(0).dataset.id;
                    console.log($dataid);
                    $.ajax({
                        type : 'get',
                        dataType : 'json',
                        url : '../api/gouwucheadd.php',
                        data : {
                            key : 'jian',
                            dataid : $dataid
                        },
                        success : (xhr)=>{
                            console.log(xhr)
                            console.log($(this));
                            dthis.next().text(xhr.data);
                            if(xhr.data == 0){
                                $jian.remove();
                                $('#numshu').text($arr.length - 1);
                            }
                        }
                    })
                    
                })
                // 点击加
                $('.jia').on('click',function(){
                    var dthis = $(this);
                    var $jia = $(this).closest('li');
                    var $dataid = $jia.get(0).dataset.id;
                    
                    $.ajax({
                        type : 'get',
                        dataType : 'json',
                        url : '../api/gouwucheadd.php',
                        data : {
                            key : 'jia',
                            dataid : $dataid
                        },
                        success : (xhr)=>{
                            console.log(xhr)
                            console.log($(this));
                            dthis.prev().text(xhr.data);
                            if(xhr.data == 0){
                                $jia.remove();

                            }
                            
                        }
                    })
                })
    
            }
            
        })
    }

    //购物车飞入
    function goufei(btn,cart,$img){
        // var btn = document.querySelector('.btn button');
		// var cart = document.querySelector('.cart');
		// var img = document.querySelector('.btn span');
		function t(a){
			return Math.pow(a,2);
		}
		var x1 = cart.offsetLeft; // 购物相对浏览器的X坐标
		var y1 = cart.offsetTop; // 购物车相对浏览器的Y坐标
		console.log(x1, y1);
		(function(ev){
            console.log(ev)
			ev = ev || event;
			// 
			var x2 = ev.clientX;
			var y2 = ev.clientY;
			// console.log(m1, n1);
			// 
			// 计算顶点坐标
			
			var x3 = x2+(x1-x2)/2;
			var y3 = 0;

			
			// 点击按钮显示小图片
			// img.style.display = 'block';
            var img = document.createElement('img');
            document.body.appendChild(img);
            img.src = $img;
			img.innerHTML = '图片';
			img.style.position = 'fixed';
			img.style.left = x2 + 'px';
            img.style.top = y2 + 'px';
            img.style.zIndex = 300000;
            img.style.width = '40px';
            img.style.height = '40px';
			
			// 设置动画曲线 y = ax2+bx+c;
			var fenzi = (t(x2)-t(x3))*(y1-y2) - (t(x1)-t(x2))*(y2-y3);
			var fenmu = (t(x2)-t(x3))*(x1-x2) - (t(x1)-t(x2))*(x2-x3);
			var b = fenzi/fenmu;
			var a = (y1-y2-b*(x1-x2))/(t(x1)-t(x2));
			var c = y1 - a*t(x1)-b*x1;
			// console.log(a, b, c);
			var timer = setInterval(function(){
				x2+=5;
				var y = a*t(x2) + b*x2 + c;
				img.style.left = x2 + 'px';
				img.style.top = y + 'px';
				if(x2 >= x1) {
					clearInterval(timer);
					document.body.removeChild(img);
				}
			},10);
		})()

    }
})