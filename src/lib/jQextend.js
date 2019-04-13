(function($){
    //基于jQuery的轮播图插件
    jQuery.prototype.Dosilde = function(opt){
        var defaults = {
            width : 400, //宽度
            height : 400, //高度
            img : [], //图片
            type : 'level', //类型，默认水平level 垂直 vertical 变淡 thin
            idx : 0,
            path : ['a.html','b.html','c.html'],
            fullWidth : false,  //全宽
            incident : 'click',  //事件
            cusClass : ''
        }

         //each() //遍历每个元素
        $(this).each(function(indx,item){
            var arr = Object.assign({},defaults,opt);
            var len = arr.img.length;
            var $ul = $('<ul/>');

            //获取屏幕的宽度
            var widthfull = window.innerWidth;
            var fullWidth = arr.fullWidth;
            if(fullWidth == true){
                arr.width = widthfull-17;
            }
            
           
            //水平轮播图生成ul，li根据img的长度生成，ul的width=img.width * len，
            var init = ()=>{
                
                $ul.appendTo($(item).addClass('Dosilde'));
               
                for(var i=0;i<len;i++){
                    //生成ul
                    $('<img src="'+arr.img[i]+'"/>').css({width:arr.width,height:arr.height}).appendTo($('<a href="'+arr.path[i]+'"></a>').appendTo($('<li/>').appendTo($ul)));
                    
                    // $('<a></a>')
                    
                }
                
                //生成数字键
                number();

                //大盒子大小
                $(item).css({width:arr.width,height:arr.height});

                //找到当前所有的span标签
                var $span = ($(item).children('div.Dopage')).children('span');
                //默认第一个高亮
                $span[0].classList.add('active');

                //在原来的图片最后位置上在插入第一张照片
                // $('<img src="'+arr.img[0]+'"/>').css({width:arr.width,height:arr.height}).appendTo($('<li/>').appendTo($ul));
                $('<img src="'+arr.img[0]+'"/>').css({width:arr.width,height:arr.height}).appendTo($('<a href="'+arr.path[0]+'"></a>').appendTo($('<li/>').appendTo($ul)));
                    
                //判断是水平还是改变透明度
                if(arr.type == 'level'){
                    $ul.width(arr.width * (len+1)).addClass('level');
                }else if(arr.type == 'thin'){
                    $ul.css({height:arr.height,width:arr.width}).addClass('faded');

                }
                //数字键
                key($span);
                 
                //移动
                move($span);

                //鼠标移入或移除
                up($span);
            }
            var move = ($span)=>{
                move.timr = setInterval(function(){
                    // console.log(arr.idx)
                    arr.idx++;

                    for(var i=0;i<len;i++){
                       $span[i].classList.remove('active');
                    }
                    //判断是否到最后一个
                    if(arr.idx > len){
                        $ul.css({left:0,top:0}).stop(true);
                        arr.idx = 1; 

                    }
                   
                    //当前的span高亮
                    arr.idx<len ? $span[arr.idx].classList.add('active') : $span[0].classList.add('active');
                     

                   //判断类型
                    if(arr.type == 'level'){
                        $ul.animate({'left':-arr.idx*arr.width},500,function(){
                            $(this).stop(true,true);
                        });
                        
                    }else if(arr.type == 'vertical'){
                        $ul.animate({'top':-arr.idx*arr.height},500,function(){
                            $(this).stop(true,true);
                        })
                    }else if(arr.type == 'thin'){
                        $ul.children().not(':eq("'+arr.idx+'")').fadeOut(1000);
                        $ul.children().filter(':eq("'+arr.idx+'")').fadeIn(1000);
                    }
                    
                },4000) //时间跟animate的时间一样
            }

            //生成数字键
            var number = ()=>{
                var $div = $('<div/>').addClass('Dopage').addClass(arr.cusClass).appendTo($(item));
                for(var i=1;i<=len;i++){
                    //生成span
                    $('<span>'+i+'</span>').appendTo($div);
                    // $('<span></span>').appendTo($div);

                }
            }

            //数字键点击
            var key = ($span)=>{
                $span.on(arr.incident,function(e){
                    arr.idx = $(this).text() - 1 ;
                    if(arr.type == 'level'){
                        $(item).children('ul').css({left:-arr.idx * arr.width}).stop(true);
                    }else if(arr.type == 'thin'){
                        $(item).children('ul').stop(true);
                        $ul.children().not(':eq("'+arr.idx+'")').fadeOut(1000);
                        $ul.children().filter(':eq("'+arr.idx+'")').fadeIn(1000);
                    }else if(arr.type == 'vertical'){
                        $(item).children('ul').css({top:-arr.idx * arr.height}).stop(true);
                    }
                    
                    for(var i=0;i<len;i++){
                       $span[i].classList.remove('active');
                    }
                    $span[arr.idx].classList.add('active');
                })
            }

            //鼠标移入或移除
            var up = ($span)=>{
                $(item).on('mouseover',function(){
                    clearInterval(move.timr);
                })
                $(item).on('mouseout',function(){
                    move($span);
                })

            }

            var lr = ()=>{
                var $next = $('<span>></span>').addClass('Donexts').css({top:arr.height/2-25});
                var $prve = $('<span><</span>').addClass('Doprve').css({top:arr.height/2-25});
                ($('<div/>').addClass('Donext').append($prve).append($next)).appendTo($(item));
                $next.on('click',function(){
                    arr.idx++;
                    move($span);
                })
            }
            init();
        })

    }
    return this;
})(jQuery)