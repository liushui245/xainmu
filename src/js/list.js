jQuery(function($){
    var center = document.querySelector('.center');
    // // 购物车
    var $shodsads = $('#shopping');

    var $left = $('.shopping-left-gou');
    //读取cookie登录
    if($.cookie('bluer') == 'true'){
        $('.top-d1Top').css('display','none');
        $('.top-d2Top').css('display','block').html(
            `<em>hi,</em>
            <span>${$.cookie('name')}</span>
            <a href="#" id="exp">退出</a>
            <a href="#">消息<i>5</i></a>
            <a href="#">金币<i>50</i></a>`
        );

            gouwuxuanr();
            
        
    }
    // 点击退出，清空cookie bluer为false
    $('#exp').on('click',function(){
        $.cookie('bluer',null,{path:'/'});
        $.cookie('user',null,{path:'/'});
        $('.top-d2Top').css('display','none');
        $('.top-d1Top').css('display','block').html(
            `<span>欢迎来酒仙网!</span>
            <a href="html/login.html">请登录</a>
            <a href="html/register.html">免费注册</a>`
        );
        $('#Trolley').html(' ');
        $('#numshu').text('0')
    })
    var qty = 30;
    var contnt = 5;
    var sort = '';
    var shu = parseInt(Math.random() * 100);
    render();
    
    

    // 商品渲染数据
    function render(){
        Ajax('get','../api/list.php?conten=',contnt+'&qty='+qty+'&shu='+shu+'&high='+sort,function(xhr){
            // console.log(xhr)
            var $as='';
            var $label = '';
            $('#listla').html(xhr.data.map(function(item){
                var $href = item.href.slice(5);
                if(item.pick != ''){
                    $as = 'zhenxuan';
                }else{
                    $as = '';
                }
                if(item.label != ''){
                    $label =  `<span class="yh">${item.label}</span>`
                }else{
                    $label = '';
                }
                return `<li data-id="${item.daid}" id="${item.daid}" style="z-index: 15;">
                            <div class="content clearfix">
                                <div class="collect_box">
                                    <a class="img clearfix" href="#" title="${item.title}" target="_blank">
                                        <img  src="../${item.imgpath}" alt="${item.title}" title="${item.title}">
                                    </a>
                                </div>
                        
                                <div class="priceArea clearfix">
                                    <p class="price" >
                                        ¥<span>${item.price}</span>
                                    </p>
                                </div>
                                <div class="proName">
                                    <a href="#" title="${item.title}" target="_blank">
                                        <i class="${$as}"></i>
                                        ${item.title}
                                        <span class="slogan"></span>
                                    </a>
                                </div>
                                <div class="judgeAdv clearfix">
                                    <a class="judge" href="${item.title}" title="${item.title}" target="_blank">
                                        <span>${item.id}</span>
                                        评价
                                    </a>
                                </div>
                                
                                <div class="seller">
                                </div>
                                
                                <div id="${item.id}" class="cuxiao">
                                    <i class="projx sIcon"></i>
                                    ${$label}
                                </div>
                                
                                <div class="buyArea clearfix" id="${item.id}" style="">
                                    <div class="edit">
                                        <a class="decrease off" href="javascript:;">-</a>
                                        <input type="text" gname="${item.title}" class="Textwen" value="1" name="">
                                        <a class="increase" href="javascript:;">+</a>
                                    </div>
                                    <a class="cart sIcon prtlt_btn2 Gou" href="javascript:;">加入购物车</a>
                                </div>
                            
                            </div>
                        </li>`
            }).join(''))

            //排序 从大到小
            $('#paxc').on('click',function(){
                sort = 'desc';
                var $contnt = 8;
                var $as='';
                var $label='';
                Ajax('get','../api/list.php?conten=',$contnt+'&qty='+qty+'&shu='+shu+'&high='+sort,function(xhr){
                    $('#listla').html(xhr.data.map(function(item){
                        var $href = item.href.slice(5);
                        if(item.pick != ''){
                            $as = 'zhenxuan';
                        }else{
                            $as = '';
                        }
                        if(item.label != ''){
                            $label =  `<span class="yh">${item.label}</span>`
                        }else{
                            $label = '';
                        }
                        return `<li data-id="${item.daid}" id="${item.daid}" style="z-index: 15;">
                                    <div class="content clearfix">
                                        <div class="collect_box">
                                            <a class="img clearfix" href="#" title="${item.title}" target="_blank">
                                                <img  src="../${item.imgpath}" alt="${item.title}" title="${item.title}">
                                            </a>
                                        </div>
                                
                                        <div class="priceArea clearfix">
                                            <p class="price" >
                                                ¥<span>${item.price}</span>
                                            </p>
                                        </div>
                                        <div class="proName">
                                            <a href="#" title="${item.title}" target="_blank">
                                                <i class="${$as}"></i>
                                                ${item.title}
                                                <span class="slogan"></span>
                                            </a>
                                        </div>
                                        <div class="judgeAdv clearfix">
                                            <a class="judge" href="${item.title}" title="${item.title}" target="_blank">
                                                <span>${item.id}</span>
                                                评价
                                            </a>
                                        </div>
                                        
                                        <div class="seller">
                                        </div>
                                        
                                        <div id="${item.id}" class="cuxiao">
                                            <i class="projx sIcon"></i>
                                            ${$label}
                                        </div>
                                        
                                        <div class="buyArea clearfix" id="${item.id}" style="">
                                            <div class="edit">
                                                <a class="decrease off" href="javascript:;">-</a>
                                                <input type="text" gname="${item.title}" class="Textwen" value="1" name="">
                                                <a class="increase" href="javascript:;">+</a>
                                            </div>
                                            <a class="cart sIcon prtlt_btn2 Gou" href="javascript:;">加入购物车</a>
                                        </div>
                                    
                                    </div>
                                </li>`
                    }).join(''))
                })
            })
            $('#asC').on('click',function(){
                sort = 'asc';
                var $contnt = 5;
                
                Ajax('get','../api/list.php?conten=',$contnt+'&qty='+qty+'&shu='+shu+'&high='+sort,function(xhr){
                    var $as = '';
                    var $label = '';
                    $('#listla').html(xhr.data.map(function(item){
                        var $href = item.href.slice(5);
                        if(item.pick != ''){
                            $as = 'zhenxuan';
                        }else{
                            $as = '';
                        }
                        if(item.label != ''){
                            $label =  `<span class="yh">${item.label}</span>`
                        }else{
                            $label = '';
                        }
                        return `<li data-id="${item.daid}" id="${item.daid}" style="z-index: 15;">
                                    <div class="content clearfix">
                                        <div class="collect_box">
                                            <a class="img clearfix" href="#" title="${item.title}" target="_blank">
                                                <img  src="../${item.imgpath}" alt="${item.title}" title="${item.title}">
                                            </a>
                                        </div>
                                
                                        <div class="priceArea clearfix">
                                            <p class="price" >
                                                ¥<span>${item.price}</span>
                                            </p>
                                        </div>
                                        <div class="proName">
                                            <a href="#" title="${item.title}" target="_blank">
                                                <i class="${$as}"></i>
                                                ${item.title}
                                                <span class="slogan"></span>
                                            </a>
                                        </div>
                                        <div class="judgeAdv clearfix">
                                            <a class="judge" href="${item.title}" title="${item.title}" target="_blank">
                                                <span>${item.id}</span>
                                                评价
                                            </a>
                                        </div>
                                        
                                        <div class="seller">
                                        </div>
                                        
                                        <div id="${item.id}" class="cuxiao">
                                            <i class="projx sIcon"></i>
                                            ${$label}
                                        </div>
                                        
                                        <div class="buyArea clearfix" id="${item.id}" style="">
                                            <div class="edit">
                                                <a class="decrease off" href="javascript:;">-</a>
                                                <input type="text" gname="${item.title}" class="Textwen" value="1" name="">
                                                <a class="increase" href="javascript:;">+</a>
                                            </div>
                                            <a class="cart sIcon prtlt_btn2 Gou" href="javascript:;">加入购物车</a>
                                        </div>
                                    
                                    </div>
                                </li>`
                    }).join(''))
                })
            })
            //页码
            var aee = Math.ceil(xhr.num / qty);
            console.log(aee)
            $('#numem').text(aee)
            //添加页码
            for(var i=1;i<=aee;i++){
                var li = document.createElement('li');
                li.innerText = i;
                // f_fei.appendChild(li);
                $('#fanyeU').get(0).appendChild(li);
            }

            //默认第一个页码高亮
            $('#fanyeU').get(0).children[0].classList.add('on');
            
            // 加
            $('#listla').on('click','.increase',function(){
                // var $thisid = $(this).closest('li').get(0).dataset.id;
                var $thisid = $(this).closest('li');
                var $Textup = $thisid.find('.Textwen').val();
                ++$Textup;
                $thisid.find('.Textwen').val($Textup)
                
                //减
            }).on('click','.decrease',function(){
                var $thisid = $(this).closest('li');
                var $Textup = $thisid.find('.Textwen').val();
                if($Textup == 1){
                    return false;
                }
                --$Textup;
                $thisid.find('.Textwen').val($Textup)
            })
            
            //加入购物车
            $('#listla .Gou').on('click',function(){
                var $thisid = $(this).closest('li');
                var $Textup = $thisid.find('.Textwen').val(); //value
                var $dataset = $thisid.get(0).dataset.id;   //id
                var $user = $.cookie('user');  //user
                var bluer = $.cookie('bluer');
                var $img = $(this).closest('li').find('img').attr('src');

                if(bluer == false || bluer==''||bluer==undefined){
                    show('请先登录',center);
                }else{
                    //飞入

                    goufei($('.Gou').get(0),$('.shopping-left-gou').get(0),$img)
                    
                    //请求
                    $.ajax({
                        type : 'get',
                        dataType : 'json',
                        url : '../api/gouwucheinto.php',
                        data : {
                            user : $user,
                            id : $dataset,
                            val : $Textup
                            
                        },
                        success : function(xhr){
                            gouwuxuanr();
                            console.log(xhr)
                            
                            show('添加购物车成功!',center);
                        }
                    
                    })
                }
                
                
                
                

            })


            // 分页
            $('#fanyeU li').on('click',function(){
                 //点击跳到页面头部
                var scr = window.scrollY;
                var times = setInterval(function(){
                    scr = scr-10;
                    window.scrollTo(0,scr);
                    if(window.scrollY <= 50){
                        clearInterval(times);
                    }
                },1)
                var $li = $('#fanyeU li');
                //清空页码的样式
                for(var i=0;i<$li.length;i++){
                    $('#fanyeU').get(0).children[i].classList.remove('on');
                }
                 //添加
                $(this).get(0).classList.add('on');
                var $contnt = $(this).text();

                Ajax('get','../api/list.php?conten=',$contnt+'&qty='+qty+'&shu='+shu+'&high='+sort,function(xhr){
                   
                    $('#listla').html(xhr.data.map(function(item){
                        var $href = item.href.slice(5);
                        if(item.pick != ''){
                            var $as = 'zhenxuan';
                        }else{
                            var $as = '';
                        }
                        if(item.label != ''){
                            $label =  `<span class="yh">${item.label}</span>`
                        }else{
                            $label = '';
                        }
                        return `<li data-id="${item.daid}" id="${item.daid}" style="z-index: 15;">
                                    <div class="content clearfix">
                                        <div class="collect_box">
                                            <a class="img clearfix" href="#" title="${item.title}" target="_blank">
                                                <img  src="../${item.imgpath}" alt="${item.title}" title="${item.title}">
                                            </a>
                                        </div>
                                
                                        <div class="priceArea clearfix">
                                            <p class="price" >
                                                ¥<span>${item.price}</span>
                                            </p>
                                        </div>
                                        <div class="proName">
                                            <a href="#" title="${item.title}" target="_blank">
                                                <i class="${$as}"></i>
                                                ${item.title}
                                                <span class="slogan"></span>
                                            </a>
                                        </div>
                                        <div class="judgeAdv clearfix">
                                            <a class="judge" href="${item.title}" title="${item.title}" target="_blank">
                                                <span>${item.id}</span>
                                                评价
                                            </a>
                                        </div>
                                        
                                        <div class="seller">
                                        </div>
                                        
                                        <div id="${item.id}" class="cuxiao">
                                            <i class="projx sIcon"></i>
                                            ${$label}
                                        </div>
                                        
                                        <div class="buyArea clearfix" id="${item.id}" style="">
                                            <div class="edit">
                                                <a class="decrease off" href="javascript:;">-</a>
                                                <input type="text" gname="${item.title}" class="Textwen" value="1" name="">
                                                <a class="increase" href="javascript:;">+</a>
                                            </div>
                                            <a class="cart sIcon prtlt_btn2 Gou" href="javascript:;">加入购物车</a>
                                        </div>
                                    
                                    </div>
                                </li>`
                    }).join(''))
                })
               
            })

            //点击跳转到详情页
            $('#listla img').on('click',function(e){
                e.preventDefault();
                var $thisid = $(this).closest('li');
                var $dataset = $thisid.get(0).dataset.id;   //id
                location.href = 'detail.html?id='+$dataset;
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

    
    
      
    if($shodsads.outerHeight() <= window.innerHeight ){
        //购物车缩进去
        shopbox(-300,-265,265)
        
    }else{
       //购物车缩进去
        shopbox(-318,-282,282)
    }
    

    
    // 购物车渲染
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
    
    //提示div显示
    function show(text,ele){
        ele.innerText = text;
        ele.style.display = 'block';
        setTimeout(function(){
            ele.style.display = 'none';
        },2000)
        // ele.style.top = (window.outerHeight - ele.offsetHeight) / 2 + 'px';
        window.onscroll = function(){
            console.log(scrollY)
            ele.style.top = scrollY + 200 + 'px';
        }
        ele.style.top = scrollY + 'px';
        ele.style.left = (window.outerWidth - ele.offsetWidth) / 2 +'px';
        
            
    }

    //右侧购物车的动态
    function shopbox(pl,sh,qu){
        //购物车缩进去
        $shodsads.animate({right:pl},1000,function(){
            $(this).stop(true,true);
        });
        $left.on('mouseover',function(){
            $(this).animate({right:0},1000,function(){
                $(this).stop(true,true);
            })
            $shodsads.animate({right:sh},1000,function(){
                $(this).stop(true,true);
            })
        }).on('click',function(){
            $(this).animate({right:qu},1000,function(){
                $(this).stop(true);
            })
            // .css({right:qu});
            
            $shodsads.animate({right:0},1000,function(){
                $(this).stop(true,true);
            })
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