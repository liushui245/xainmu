jQuery(function($){
    // console.log($.cookie('bluer'))
    var center = document.querySelector('.center');
    //读取cookie登录
    if($.cookie('bluer') == 'true'){
        $('.top-d1Top').css('display','none');
        $('.top-d2Top').css('display','block').html(
            `<em>hi,</em>
            <span>${$.cookie('name')}</span>
            <a href="#" id="exp">退出</a>
            <a href="#">消息<i>5</i></a>
            <a href="#">金币<i>50</i></a>`);

        //购物车渲染
        var $gouche = $.cookie('user');
        // console.log($gouche);
        $.ajax({
            type : 'get',
            dataType : 'json',
            url : 'api/gouwuche.php',
            data : {
                account : $gouche,
                
            },
            success : function(xhr){
                // console.log(xhr);
                var $arr = xhr.data;
                // console.log($arr);
                $('#numshu').text($arr.length);
                $('#Trolley').html($arr.map(function(item){
                    $price = item.quantity * item.price;
                    return `<li class="gou-li" data-id='${item.daid}'>
                                <div class="gou-tl">
                                    <span class="gou-l">${item.hotel}</span>
                                    <span class="gou-r">${item.price}</span>
                                </div>
                                <div class="gou-nr">
                                    <div class="gou-nr-l1">
                                        <img src="${item.imgpath}" alt="${item.title}" />
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
                        url : 'api/gouwucheadd.php',
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
                        url : 'api/gouwucheadd.php',
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
        show('已退出!',center);
       
    })

    //大轮播图请求数据
    Ajax(0,8,function(xhr){
        var $img = xhr.data.map(function(item){
            return item.imgpath;  //返回图片路径数组
        })
        // 轮播图
        $('#lun').Dosilde({img:$img,
            height:470,width:1200,
            type:'level',
            path:['a.html','b.html','c.html','d.html','e.html','f.html','g.html','h.html'],
            fullWidth : true,
            incident : 'mouseover',
            cusClass : 'cues'});
    })
    
    //公告信息下面轮播图
    Ajax(32,6,function(xhr){
        var $img = xhr.data.map(function(item){
            return item.imgpath;  //返回图片路径数组
        })
        // console.log($img)
        var $noe = $img.slice(0,3);
        var $two = $img.slice(3,6);
        // indexTabRight 右边第一个轮播图
        $('.TabRight-d2').Dosilde({img:$noe,
            height:157,width:268,
            type:'level',
            path:['a.html','b.html','c.html']});
        $('.TabRight-d3').Dosilde({img:$two,
            height:157,width:268,
            type:'level',
            path:['a.html','b.html','c.html']});
    })
    
    //疯狂抢购数据
    Ajax(57,50,function(xhr){
        var $feng =  xhr.data.slice(0,10);
        $('.TabBox-topNo1 ul').get(0).innerHTML = $feng.map(function(item){
            return `<li data-id="${item.daid}">
                        <div class="TabPic">
                            <a href="${item.href}" title="${item.title}">
                                <img src="${item.imgpath}" alt="">
                            </a>
                        </div>
                        <div class="TabPic-Name">
                            <a href="${item.href}">
                                <i></i>  
                                ${item.title}
                            </a>
                        </div>
                        <div class="TabPic-Price">
                            <span class="Price">${item.price}</span>
                        </div>
                    </li>`;
        }).join('');
        var $bao = xhr.data.slice(10,20);
        $('.TabBox-topNo2 ul').get(0).innerHTML = $bao.map(function(item){
            return `<li data-id="${item.daid}">
                        <div class="TabPic">
                            <a href="${item.href}" title="${item.title}">
                                <img src="${item.imgpath}" alt="">
                            </a>
                        </div>
                        <div class="TabPic-Name">
                            <a href="${item.href}">
                                <i></i>  
                                ${item.title}
                            </a>
                        </div>
                        <div class="TabPic-Price">
                            <span class="Price">${item.price}</span>
                        </div>
                    </li>`;
        }).join('');
        var $ding = xhr.data.slice(20,30);
        $('.TabBox-topNo3 ul').get(0).innerHTML = $ding.map(function(item){
            return `<li data-id="${item.daid}">
                        <div class="TabPic">
                            <a href="${item.href}" title="${item.title}">
                                <img src="${item.imgpath}" alt="">
                            </a>
                        </div>
                        <div class="TabPic-Name">
                            <a href="${item.href}">
                                <i></i>  
                                ${item.title}
                            </a>
                        </div>
                        <div class="TabPic-Price">
                            <span class="Price">${item.price}</span>
                        </div>
                    </li>`;
        }).join('');
        var $zheng = xhr.data.slice(30,40);
        $('.TabBox-topNo4 ul').get(0).innerHTML = $zheng.map(function(item){
            return `<li data-id="${item.daid}">
                        <div class="TabPic">
                            <a href="${item.href}" title="${item.title}">
                                <img src="${item.imgpath}" alt="">
                            </a>
                        </div>
                        <div class="TabPic-Name">
                            <a href="${item.href}">
                                <i></i>  
                                ${item.title}
                            </a>
                        </div>
                        <div class="TabPic-Price">
                            <span class="Price">${item.price}</span>
                        </div>
                    </li>`;
        }).join('');
        var $jing = xhr.data.slice(40,50);
        $('.TabBox-topNo5 ul').get(0).innerHTML = $jing.map(function(item){
            return `<li data-id="${item.daid}">
                        <div class="TabPic">
                            <a href="${item.href}" title="${item.title}">
                                <img src="${item.imgpath}" alt="">
                            </a>
                        </div>
                        <div class="TabPic-Name">
                            <a href="${item.href}">
                                <i></i>  
                                ${item.title}
                            </a>
                        </div>
                        <div class="TabPic-Price">
                            <span class="Price">${item.price}</span>
                        </div>
                    </li>`;
        }).join('');

    })

    // 滚动条监听
    window.onscroll = function(){
        // console.log(window.scrollY)
        var scroll = window.scrollY;

        // 优惠推荐 数据
        if(scroll>=850 && scroll<=1200){
            $('#wrap-yuo li').each(function(){
                if($(this).attr('data-id') == undefined){
                    Ajax(107,18,function(xhr){
                        var $younoe = xhr.data.slice(0,6);
                        var $youtwo = xhr.data.slice(6,12);
                        var $youthree = xhr.data.slice(12,18);
                        $('.wrapList1 ul').get(0).innerHTML = $younoe.map(function(item){
                            return `<li data-id="${item.daid}">
                                        <a href="${item.href}" class="List1-ul-p1" title="${item.title}">
                                            <img src="${item.imgpath}" alt="${item.title}" />
                                        </a>
                                        <a class="List1-ul-p2" href="${item.href}" title="${item.title}">
                                            ${item.title}
                                        </a>
                                        <p class="List1-ul-p3">${item.price}</p>
                                    </li>`;
                        }).join('');
                        $('.wrapList2 ul').get(0).innerHTML = $youtwo.map(function(item){
                            return `<li data-id="${item.daid}">
                                        <a href="#" class="List1-ul-p1" title="${item.title}">
                                            <img src="${item.imgpath}" alt="${item.title}" />
                                        </a>
                                        <a class="List1-ul-p2" href="#" title="${item.title}">
                                            ${item.title}
                                        </a>
                                        <p class="List1-ul-p3">${item.price}</p>
                                    </li>`;
                        }).join('');
                        $('.wrapList3 ul').get(0).innerHTML = $youthree.map(function(item){
                            return `<li data-id="${item.daid}">
                                        <a href="#" class="List1-ul-p1" title="${item.title}">
                                            <img src="${item.imgpath}" alt="${item.title}" />
                                        </a>
                                        <a class="List1-ul-p2" href="#" title="${item.title}">
                                            ${item.title}
                                        </a>
                                        <p class="List1-ul-p3">${item.price}</p>
                                    </li>`;
                        }).join('');
                    })
                }
            })
                
           
        }

        // 1F 白酒馆数据
        if(scroll>=1260 && scroll<=1900){
            $('#1Fbai li').each(function(){
                if($(this).attr('data-id') == undefined){
                     /*轮播图 */
                    Ajax(38,4,function(xhr){
                        var $img = xhr.data.map(function(item){
                            return item.imgpath;  //返回图片路径数组
                        })
                        var $zuonoe = $img.slice(0,4);
                        /*1F 白酒馆*/
                        $('#Wrap-left').html(' ');
                        $('#Wrap-left').Dosilde({img:$zuonoe,
                            height:486,width:210,
                            type:'level',
                            path:['a.html','b.html','c.html','c.html'],
                            cusClass : 'sky'});
                        
                    })
                    /*商品数据 */
                    Ajax(108,10,function(xhr){
                        // console.log('1F 白酒馆数据')
                        $('#1Fbai ul').get(0).innerHTML = xhr.data.map(function(item){
                            if(item.label != ''){
                                var $arr =`<p class="right-p1">
                                            <span>${item.label}</span>
                                        </p>`;
                            }else{
                                var $arr = '';
                            }
                            if(item.pick == 'zuan'){
                                var aee = `<i></i>`;
                            }else{
                                var aee = '';
                            }
                            return  `<li data-id="${item.daid}">
                                    <a href="${item.href}" class="right-a1" title="${item.title}">
                                        <img src="${item.imgpath}" alt="${item.title}">
                                    </a>
                                    <a href="${item.href}" class="right-a2" title="${item.title}">
                                        ${aee}${item.title}
                                    </a>
                                    <a href="#" class="right-a3">
                                    ${item.price}
                                    </a>
                                    ${$arr}
                                </li>`
                                
                        }).join('');
                    })
                    // 本周热销排行榜
                    Ajax(173,23,function(xhr){
                        var $ul1F = xhr.data.slice(0,5);
                        var $ul2F = xhr.data.slice(5,11);
                        var $ul3F = xhr.data.slice(11,17);
                        var $ul4F = xhr.data.slice(17,25);
                        $('.1FWine-u1').get(0).innerHTML = $ul1F.map(function(item){
                            return `<li data-id="${item.daid}">
                                        <div class="topTenNav-d1">
                                            <a href="${item.href}" title="${item.title}">
                                                <img src="${item.imgpath}" alt="" title="${item.title}">
                                            </a>
                                        </div>
                                        <div class="topTenNav-d2">
                                            <a href="${item.href}" title="${item.title}" class="topTenNav-d2-a1">${item.title}</a>
                                            <span class="topTenNav-d2-s1">${item.price}</span>
                                        </div>
                                    </li>`;
                        }).join('');
                        $('.1FWine-u2').get(0).innerHTML = $ul2F.map(function(item){
                            return `<li data-id="${item.daid}">
                                        <div class="topTenNav-d1">
                                            <a href="${item.href}" title="${item.title}">
                                                <img src="${item.imgpath}" alt="" title="${item.title}">
                                            </a>
                                        </div>
                                        <div class="topTenNav-d2">
                                            <a href="${item.href}" title="${item.title}" class="topTenNav-d2-a1">${item.title}</a>
                                            <span class="topTenNav-d2-s1">${item.price}</span>
                                        </div>
                                    </li>`;
                        }).join('');
                        $('.1FWine-u3').get(0).innerHTML = $ul3F.map(function(item){
                            return `<li data-id="${item.daid}">
                                        <div class="topTenNav-d1">
                                            <a href="${item.href}" title="${item.title}">
                                                <img src="${item.imgpath}" alt="" title="${item.title}">
                                            </a>
                                        </div>
                                        <div class="topTenNav-d2">
                                            <a href="${item.href}" title="${item.title}" class="topTenNav-d2-a1">${item.title}</a>
                                            <span class="topTenNav-d2-s1">${item.price}</span>
                                        </div>
                                    </li>`;
                        }).join('');
                        $('.1FWine-u4').get(0).innerHTML = $ul4F.map(function(item){
                            return `<li data-id="${item.daid}">
                                        <div class="topTenNav-d1">
                                            <a href="${item.href}" title="${item.title}">
                                                <img src="${item.imgpath}" alt="" title="${item.title}">
                                            </a>
                                        </div>
                                        <div class="topTenNav-d2">
                                            <a href="${item.href}" title="${item.title}" class="topTenNav-d2-a1">${item.title}</a>
                                            <span class="topTenNav-d2-s1">${item.price}</span>
                                        </div>
                                    </li>`;
                        }).join('');
                    })
                }
                
            })
        }

        /* 2F 葡萄酒馆*/
        if(scroll>=1890 && scroll<=2980){
            $('#2Fpu li').each(function(){        
                if($(this).attr('data-id') == undefined){
                    /*轮播图 */
                    Ajax(42,4,function(xhr){
                        var $img = xhr.data.map(function(item){
                            return item.imgpath;  //返回图片路径数组
                        })
                        var $zuotwo = $img.slice(0,4);
                        /* 2F 葡萄酒馆*/
                        $('#Wrap5-left').html(' ');
                        $('#Wrap5-left').Dosilde({img:$zuotwo,
                            height:486,width:210,
                            type:'level',
                            path:['a.html','b.html','c.html','c.html'],
                            cusClass : 'sky'});
                    })
                    /*商品数据 */
                    Ajax(118,10,function(xhr){
                        console.log('1F 白酒馆数据')
                        $('#2Fpu ul').get(0).innerHTML = xhr.data.map(function(item){
                            if(item.label != ''){
                                var $arr =`<p class="right-p1">
                                            <span>${item.label}</span>
                                        </p>`;
                            }else{
                                var $arr = '';
                            }
                            if(item.pick == 'zuan'){
                                var aee = `<i></i>`;
                            }else{
                                var aee = '';
                            }
                            return  `<li data-id="${item.daid}">
                                    <a href="${item.href}" class="right-a1" title="${item.title}">
                                        <img src="${item.imgpath}" alt="${item.title}">
                                    </a>
                                    <a href="${item.href}" class="right-a2" title="${item.title}">
                                        ${aee}${item.title}
                                    </a>
                                    <a href="#" class="right-a3">
                                    ${item.price}
                                    </a>
                                    ${$arr}
                                </li>`
                                
                        }).join('');
                    })

                    // 本周热销排行榜
                    Ajax(195,20,function(xhr){
                        var $ul1F = xhr.data.slice(0,5);
                        var $ul2F = xhr.data.slice(5,11);
                        var $ul3F = xhr.data.slice(11,17);
                        var $ul4F = xhr.data.slice(17,24);
                        var $ul5F = xhr.data.slice(24,29);
                        $('.topTenNavUl1').get(0).innerHTML = $ul1F.map(function(item){
                            return `<li data-id="${item.daid}">
                                        <div class="topTenNav-d1">
                                            <a href="${item.href}" title="${item.title}">
                                                <img src="${item.imgpath}" alt="" title="${item.title}">
                                            </a>
                                        </div>
                                        <div class="topTenNav-d2">
                                            <a href="${item.href}" title="${item.title}" class="topTenNav-d2-a1">${item.title}</a>
                                            <span class="topTenNav-d2-s1">${item.price}</span>
                                        </div>
                                    </li>`;
                        }).join('');
                        $('.topTenNavUl2').get(0).innerHTML = $ul2F.map(function(item){
                            return `<li data-id="${item.daid}">
                                        <div class="topTenNav-d1">
                                            <a href="${item.href}" title="${item.title}">
                                                <img src="${item.imgpath}" alt="" title="${item.title}">
                                            </a>
                                        </div>
                                        <div class="topTenNav-d2">
                                            <a href="${item.href}" title="${item.title}" class="topTenNav-d2-a1">${item.title}</a>
                                            <span class="topTenNav-d2-s1">${item.price}</span>
                                        </div>
                                    </li>`;
                        }).join('');
                        $('.topTenNavUl3').get(0).innerHTML = $ul3F.map(function(item){
                            return `<li data-id="${item.daid}">
                                        <div class="topTenNav-d1">
                                            <a href="${item.href}" title="${item.title}">
                                                <img src="${item.imgpath}" alt="" title="${item.title}">
                                            </a>
                                        </div>
                                        <div class="topTenNav-d2">
                                            <a href="${item.href}" title="${item.title}" class="topTenNav-d2-a1">${item.title}</a>
                                            <span class="topTenNav-d2-s1">${item.price}</span>
                                        </div>
                                    </li>`;
                        }).join('');
                        $('.topTenNavUl4').get(0).innerHTML = $ul4F.map(function(item){
                            return `<li data-id="${item.daid}">
                                        <div class="topTenNav-d1">
                                            <a href="${item.href}" title="${item.title}">
                                                <img src="${item.imgpath}" alt="" title="${item.title}">
                                            </a>
                                        </div>
                                        <div class="topTenNav-d2">
                                            <a href="${item.href}" title="${item.title}" class="topTenNav-d2-a1">${item.title}</a>
                                            <span class="topTenNav-d2-s1">${item.price}</span>
                                        </div>
                                    </li>`;
                        }).join('');
                        $('.topTenNavUl5').get(0).innerHTML = $ul5F.map(function(item){
                            return `<li data-id="${item.daid}">
                                        <div class="topTenNav-d1">
                                            <a href="${item.href}" title="${item.title}">
                                                <img src="${item.imgpath}" alt="" title="${item.title}">
                                            </a>
                                        </div>
                                        <div class="topTenNav-d2">
                                            <a href="${item.href}" title="${item.title}" class="topTenNav-d2-a1">${item.title}</a>
                                            <span class="topTenNav-d2-s1">${item.price}</span>
                                        </div>
                                    </li>`;
                        }).join('');
                    })
                }
            })
            
        }

        // 3F 洋酒馆
        if(scroll>=2500 && scroll<=3980){
            $('#spirits3F li').each(function(){        
                if($(this).attr('data-id') == undefined){
                    /*轮播图 */
                    Ajax(46,4,function(xhr){
                        var $img = xhr.data.map(function(item){
                            return item.imgpath;  //返回图片路径数组
                        })
                        var $zuotwo = $img.slice(0,4);
                        /* 3F 洋酒馆*/
                        $('#bannerSlier1').html(' ');
                        $('#bannerSlier1').Dosilde({img:$zuotwo,
                            height:320,width:210,
                            type:'level',
                            path:['a.html','b.html','c.html','c.html'],
                            cusClass : 'sky'});
                    })
                    /*商品数据 */
                    Ajax(128,10,function(xhr){
                        // console.log('3F 洋酒馆')
                        $('#spirits3F ul').get(0).innerHTML = xhr.data.map(function(item){
                            if(item.label != ''){
                                var $arr =`<p class="right-p1">
                                            <span>${item.label}</span>
                                        </p>`;
                            }else{
                                var $arr = '';
                            }
                            if(item.pick == 'zuan'){
                                var aee = `<i></i>`;
                            }else{
                                var aee = '';
                            }
                            return  `<li data-id="${item.daid}">
                                    <a href="${item.href}" class="spir-a1" title="${item.title}">
                                        <img src="${item.imgpath}" alt="${item.title}" />
                                    </a>
                                    <a href="${item.href}" class="spir-a2" title="${item.title}">
                                        ${aee}${item.title}
                                    </a>
                                    <span class="spir-s1">${item.price}</span>
                                </li>`
                                
                        }).join('');
                    })

                    
                }
            })
            
        }

        //4F养生酒
        if(scroll>=3000 && scroll<=3860){
            $('#spirits4R li').each(function(){        
                if($(this).attr('data-id') == undefined){
                    /*轮播图 */
                    Ajax(50,4,function(xhr){
                        var $img = xhr.data.map(function(item){
                            return item.imgpath;  //返回图片路径数组
                        })
                        var $zuotwo = $img.slice(0,4);

                        /* 4F 养生酒&黄酒&啤酒 */
                        $('#bannerSlier2').html(' ');
                        $('#bannerSlier2').Dosilde({img:$zuotwo,
                            height:485,width:210,
                            type:'level',
                            path:['a.html','b.html','c.html'],
                            cusClass : 'sky'});

                    })
                    /*商品数据 */
                    Ajax(138,10,function(xhr){
                        // console.log('//4F养生酒')
                        $('#spirits4R ul').get(0).innerHTML = xhr.data.map(function(item){
                            if(item.label != ''){
                                var $arr =`<p class="right-p1">
                                            <span>${item.label}</span>
                                        </p>`;
                            }else{
                                var $arr = '';
                            }
                            if(item.pick == 'zuan'){
                                var aee = `<i></i>`;
                            }else{
                                var aee = '';
                            }
                            return  `<li data-id="${item.daid}">
                                    <a href="${item.href}" class="spir-a1" title="${item.title}">
                                        <img src="${item.imgpath}" alt="${item.title}" />
                                    </a>
                                    <a href="${item.href}" class="spir-a2" title="${item.title}">
                                        ${aee}${item.title}
                                    </a>
                                    <span class="spir-s1">${item.price}</span>
                                </li>`
                                
                        }).join('');
                    })

                    
                }
            })
            
        }

        //5F 食品
        if(scroll>=3500 && scroll<=4500){
            $('#spirits5F li').each(function(){        
                if($(this).attr('data-id') == undefined){
                    /*轮播图 */
                    Ajax(50,4,function(xhr){
                        var $img = xhr.data.map(function(item){
                            return item.imgpath;  //返回图片路径数组
                        })
                        var $zuotwo = $img.slice(0,4);
                        /* 5F 食品*/
                        $('#bannerSlier3').html(' ');
                        $('#bannerSlier3').Dosilde({img:$zuotwo,
                            height:485,width:210,
                            type:'level',
                            path:['a.html','b.html','c.html'],
                            cusClass : 'sky'});

                    })
                    /*商品数据 */
                    Ajax(138,10,function(xhr){
                        // console.log('//4F养生酒')
                        $('#spirits5F ul').get(0).innerHTML = xhr.data.map(function(item){
                            if(item.label != ''){
                                var $arr =`<p class="right-p1">
                                            <span>${item.label}</span>
                                        </p>`;
                            }else{
                                var $arr = '';
                            }
                            if(item.pick == 'zuan'){
                                var aee = `<i></i>`;
                            }else{
                                var aee = '';
                            }
                            return  `<li data-id="${item.daid}">
                                    <a href="${item.href}" class="spir-a1" title="${item.title}">
                                        <img src="${item.imgpath}" alt="${item.title}" />
                                    </a>
                                    <a href="${item.href}" class="spir-a2" title="${item.title}">
                                        ${aee}${item.title}
                                    </a>
                                    <span class="spir-s1">${item.price}</span>
                                </li>`
                                
                        }).join('');
                    })

                    
                }
            })
            
        }

        //logo宣传 / 官方推荐
        if(scroll>=4000 && scroll<=4800){
            $('#top9-logoBox li').each(function(){        
                if($(this).attr('data-id') == undefined){
                    /*商品数据 */
                    Ajax(218,117,function(xhr){
                        var no1 = xhr.data.slice(0,18);
                        var no2 = xhr.data.slice(18,36);
                        var no3 = xhr.data.slice(36,54);
                        var no4 = xhr.data.slice(54,72);
                        var no5 = xhr.data.slice(72,90);
                        var no6 = xhr.data.slice(90,108);
                        var no7 = xhr.data.slice(108,126);
                        var no8 = xhr.data.slice(126,144);
                        $('.First-no1').get(0).innerHTML = no1.map(function(item){
                            return `<li data-id="${item.daid}">
                                    <a href="${item.href}" title="${item.title}">
                                        <img src="${item.imgpath}" alt="${item.title}" />>
                                    </a>
                                </li>`  
                        }).join('');
                        $('.First-no2').get(0).innerHTML = no2.map(function(item){
                            return `<li data-id="${item.daid}">
                                    <a href="${item.href}" title="${item.title}">
                                        <img src="${item.imgpath}" alt="${item.title}" />>
                                    </a>
                                </li>`  
                        }).join('');
                        $('.First-no3').get(0).innerHTML = no3.map(function(item){
                            return `<li data-id="${item.daid}">
                                    <a href="${item.href}" title="${item.title}">
                                        <img src="${item.imgpath}" alt="${item.title}" />>
                                    </a>
                                </li>`  
                        }).join('');
                        $('.First-no4').get(0).innerHTML = no4.map(function(item){
                            return `<li data-id="${item.daid}">
                                    <a href="${item.href}" title="${item.title}">
                                        <img src="${item.imgpath}" alt="${item.title}" />>
                                    </a>
                                </li>`  
                        }).join('');
                        $('.First-no5').get(0).innerHTML = no5.map(function(item){
                            return `<li data-id="${item.daid}">
                                    <a href="${item.href}" title="${item.title}">
                                        <img src="${item.imgpath}" alt="${item.title}" />>
                                    </a>
                                </li>`  
                        }).join('');
                        $('.First-no6').get(0).innerHTML = no6.map(function(item){
                            return `<li data-id="${item.daid}">
                                    <a href="${item.href}" title="${item.title}">
                                        <img src="${item.imgpath}" alt="${item.title}" />>
                                    </a>
                                </li>`  
                        }).join('');
                        $('.First-no7').get(0).innerHTML = no7.map(function(item){
                            return `<li data-id="${item.daid}">
                                    <a href="${item.href}" title="${item.title}">
                                        <img src="${item.imgpath}" alt="${item.title}" />>
                                    </a>
                                </li>`  
                        }).join('');
                        $('.First-no8').get(0).innerHTML = no8.map(function(item){
                            return `<li data-id="${item.daid}">
                                    <a href="${item.href}" title="${item.title}">
                                        <img src="${item.imgpath}" alt="${item.title}" />>
                                    </a>
                                </li>`  
                        }).join('');
                       
                      
                    })

                    
                }
            })
            
        }
        // 左侧悬浮
        if(window.scrollY >= 1300){
            $('.fixDiv').show(1000);
            
            //左侧导航条 1486  2188 2888 3410 3980 0
            $('.fixDiv div').on('mouseover',function(){
                if($(this).prop("className") == 'floorOne'){
                    zuoce('.floorOne','白酒馆','#d43d4e',1486);
                }else if($(this).prop("className") == 'floorTwo'){
                    zuoce('.floorTwo','葡萄酒馆','#c2782f',2188);
                }else if($(this).prop("className") == 'floorThree'){
                    zuoce('.floorThree','洋酒馆','#296693',2888);
                }else if($(this).prop("className") == 'floorFour'){
                    zuoce('.floorFour','养生酒/黄酒/啤酒','#6c9d0e',3410);
                }else if($(this).prop("className") == 'floorFive'){
                    zuoce('.floorFive','食品','#fe7a65',3980);
                }else{
                    $('.floorBack').click = function(e){
                        e.preventDefault();
                        window.scrollTo(0,0);
                    }
                    
                }
            })
            
        }else{
            $('.fixDiv').hide(1000);
        }

        //左侧导航条 1486  2188 2888 3410 3980 0
        switch(true){
            case window.scrollY >=1486 && window.scrollY<=2188:
                gun('.floorOne','1F','#d43d4e');
            break;
            case window.scrollY >=2188 && window.scrollY<=2888:
                gun('.floorTwo','2F','#c2782f');
            break;
            case window.scrollY >=2888 && window.scrollY<=3380:
                gun('.floorThree','3F','#296693');
            break;
            case window.scrollY >=3380 && window.scrollY<=3910:
                gun('.floorFour','4F','#6c9d0e');
            break;
            case window.scrollY >=3910 && window.scrollY<=4500:
                gun('.floorFive','5F','#fe7a65');
            break;
        }
        
    }
    
    
    
    /*疯狂抢购头部切换*/
    $('.TabBox-top li').on('mouseover',function(e){
        e.preventDefault();
        var $index = $(this).index();
        $('.TabBox-top li').removeClass('pitch');
        $('.TabBox-top li').eq($index).addClass('pitch');
        
        $('.TabBox-bottom>div').css('display','none');
        $('.TabBox-bottom>div').eq($index).css('display','block');
        
    })
    
    // 优惠推荐右侧切换
    $('.right-box').on('click','span',function(){
        var $index = $(this).index();
        $('.right-box span').removeClass('on');
        $('.right-box span').eq($index).addClass('on');
        $('.wrap-wrapList').animate({'left':-1200 * $index},1000,function(){
            $(this).stop(true);
        });
        
    })
    // 左边点击
    $('#wrap-leftl').on('click',function(){
        $('.wrap-wrapList').animate({'left':0},1000,function(){
            $(this).stop(true);
        }); 
        $('.right-box span').removeClass('on');
        $('.right-box span').eq(0).addClass('on');
    })
    // 右边点击
    $('#wrap-rightr').on('click',function(){
        $('.wrap-wrapList').animate({'left':-1200},1000,function(){
            $(this).stop(true);
        }); 
        $('.right-box span').removeClass('on');
        $('.right-box span').eq(1).addClass('on');
    })
    
    //ajax请求函数   start 起始 end 结束 success函数
    function Ajax(start,end,success){
        $.ajax({
            type : 'get',
            dataType : 'json',
            url : 'api/index.php',
            data : {
                start : start,
                qty : end
            },
            success : function(xhr){
                success(xhr);
            }
               
        })
    }
    /*------------------------------*/

    /*1F 白酒馆 底部右侧切换*/
    $('#topTenNavBox4-ul li').on('mouseover',function(e){
        e.preventDefault();
        var $index = $(this).index();
        $('#topTenNavBox4-ul li').find('a').removeClass('on');
        $('#topTenNavBox4-ul li').eq($index).find('a').addClass('on');
        $('.topTenNav ul').css('display','none');
        $('.topTenNav ul').eq($index).css('display','block');
        
    })
    /*2F 葡萄酒馆 底部右侧切换*/
    $('#topTenNavBox5-ul li').on('mouseover',function(e){
        e.preventDefault();
        var $index = $(this).index();
        $('#topTenNavBox5-ul li').find('a').removeClass('on');
        $('#topTenNavBox5-ul li').eq($index).find('a').addClass('on');
        $('#topTenNav5 ul').css('display','none');
        $('#topTenNav5 ul').eq($index).css('display','block');
        
    })
    // js写法
    // var NavBox = document.querySelectorAll('#topTenNavBox-ul li');
    // var topTenNav = document.querySelectorAll('#topTenNav ul');
    // for(var i=0;i<NavBox.length;i++){
    //     NavBox[i].leng = i;
    //     NavBox[i].onclick = function(e){
    //         e.preventDefault();
    //         console.log(this.leng);
    //         for(var j=0;j<topTenNav.length;j++){
    //             NavBox[j].classList.remove('on');
    //             topTenNav[j].style.display = 'none';
    //         }
    //         topTenNav[this.leng].style.display = 'block';
    //         NavBox[this.leng].classList.add('on');
    //     }
    // };
    

    // 9F 官方推荐
    var width = $('.logoFirst ul').width()*2;
    // console.log(width);
    $('.logoFirst').width(width);
    $('.logoAll-sp1').on('click',function(){
        $('.logoFirst').animate({'left':0},2000,function(){
            $(this).stop(true);
        });
    })
    $('.logoAll-sp2').on('click',function(){
        $('.logoFirst').animate({'left':-width/2},2000,function(){
            $(this).stop(true);
        });
    })

    //9F鼠标滑过
    $('.top9-titieBox ul li').on('mouseover',function(){
        var $index = $(this).index();
        $('.top9-titieBox ul li').removeClass('on');
        $('.top9-titieBox ul li').eq($index).addClass('on');
        $('#top9-logoBox .logoAll').css('display','none');
        $('#top9-logoBox .logoAll').eq($index).css('display','block');
    })

   /*--------------------------*/
   
//    购物车
    $shopping = $('#shopping');
    $left = $('.shopping-left-gou');
    
      
    if($shopping.outerHeight() <= window.innerHeight ){
        //购物车缩进去
        shopbox(-300,-265,265)
        
    }else{
       //购物车缩进去
        shopbox(-318,-282,282)
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
    

   /*------------------------------------------*/
    // 改变text 颜色 位置
    function zuoce(ele,text,hue,To){
        $(ele+' .a2').on('mouseover',function(e){
            $(ele+' .a1').text(text).css({'backgroundColor':hue}).animate({'width':90},200,function(){
                $(this).stop(true,true);
            });
            $(this).css({'opacity':0});
        }).on('mouseout',function(){
            $(ele+' .a1').text('').css({'backgroundColor':'#f1f1f1'}).animate({'width':30},200,function(){
                $(this).stop(true,true);
            });
            $(this).css('opacity',1);
         }).on('click',function(e){
            e.preventDefault();
            window.scrollTo(0,To);
        })
        
    }
    
    // 滚动条滚动到规定位置
    function gun(ele,text,hue){
        $('.fixDiv div a').css({'backgroundColor':'#f1f1f1'})
        $(ele+' .a1').text(text).css({'backgroundColor':hue});
        $(ele+' .a2').css({'opacity':0});
    }
    
})
    


