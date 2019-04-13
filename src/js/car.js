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
      
  };
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
  });

  //渲染页面
  var $user = $.cookie('user');
  if($user !=null ||$user !=undefined || $user !=''){
    $.ajax({
        type : 'get',
        dataType : 'json',
        url : '../api/gouwuche.php',
        data : {
            account : $user,
        },
        success : function(xhr){
        //    console.log(xhr)

           //购物车内容渲染
           $('#shuh').html(
               xhr.data.map(function(item){
                   var $pricequan = item.price * item.quantity;
                    return `<div class="cart-tbody" data-id="${item.daid}">
                                <div class="cart-shop">
                                    <div class="shop-type">
                                        <input name="" type="checkbox" value="" class="check" date-id="${$pricequan}">
                                        <span>${item.hotel}</span>
                                    </div>
                                </div>
                                <div class="cart-list-wrap">
                                    <div class="p-type" proid="">
                                        <div class="cart-list select-bg" >
                                            <div class="clearfix">
                                                <div class="cTab-tr cart-checkbox noMt">
                                                    <label class="click-checkbox checkbox-checked ">
                                                        <i class="cartIcon"></i>
                                                        <input name="" type="checkbox" value="" class="checkB">
                                                    </label>		            
                                                </div>
                                                <div class="cTab-tr cart-goods">
                                                    <div class="goods-info">
                                                        <div class="goods-img">
                                                            <a href="#" target="_blank">
                                                                <img src="../${item.imgpath}" width="80" height="80">
                                                            </a>
                                                        </div>
                                                        <div class="goods-right">
                                                            <div class="goods-name">
                                                                <a href="#" target="_blank">
                                                                    ${item.title}
                                                                </a>
                                                            </div>
                                                            <div class="cart-tag">
                                                                <span>${item.label}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="cTab-tr cart-price">
                                                    <div class="goods-price">￥${item.price}</div>
                                                </div>
                                                <div class="cTab-tr cart-gold">
                                                    <div class="goods-gold">349金币</div>	  
                                                </div>
                                                <div class="cTab-tr cart-quantity">
                                                    <div class="goods-num">
                                                        <p><i class="cartIcon cut min jian" data-id="${item.daid}" datali="${item.price}"></i></p>
                                                        <input name="" type="text" class="num" value="${item.quantity}" autocomplete="off" minnum="1">
                                                        <p><i class="cartIcon add jia" data-id="${item.daid}" datali="${item.price}"></i></p>
                                                    </div>
                                                
                                                </div>
                                                <div class="cTab-tr cart-subtotal" price="${$pricequan}">
                                                    <div class="goods-total-price quan">￥${$pricequan}</div>
                                                </div>
                                                <div class="cTab-tr cart-operating">
                                                    <div class="goods-operating">
                                                        <p><a href="javascript:;" class="list-del" data-id="${item.daid}">删除</a></p>
                                                        <p><a href="javascript:;" class="move-collect">移入我的收藏</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`
               })
            )

            // 点击减
            $('.jian').on('click',function(){
                $(this).attr('cursor','pointer');
                var $jian = $(this).attr('data-id');
                var $price = $(this).attr('datali');
                var $valText = $(this).parent().next();
                console.log($price)
                $.ajax({
                    type : 'get',
                    dataType : 'json',
                    url : '../api/gouwucheadd.php',
                    data : {
                        key : 'jian',
                        dataid : $jian
                    },
                    success : (xhr)=>{
                        var $suhum = '';
                        for(var i in xhr.cha){
                            for(var j in xhr.cha[i]){
                                $suhum = xhr.cha[i]['quantity'];
                            }
                        }
                        var $jiage = $price * ($suhum-1);
                        
                        $valText.val(xhr.data);
                        $(this).parent().parent().parent().next().children(['.quan']).text('￥'+$jiage);
                        var lis = $(this).parent().parent().parent().parent().parent().parent().parent().prev().find('.check').attr('date-id',$jiage);
                        console.log(lis)
                        
                        if(lis.get(0).checked == true){
                            $('.total em').text($jiage);
                        }else{

                        }
                      
                        if(xhr.data == 0){
                            // $(this).remove();
                            window.location.reload();
                            // $('#numshu').text($arr.length - 1);
                        }
                    }
                })
                
            })
            // 点击加
            $('.jia').on('click',function(){
                $(this).attr('cursor','pointer');
                var $jian = $(this).attr('data-id');
                var $valText = $(this).parent().prev();
                var $price = $(this).attr('datali');
                $.ajax({
                    type : 'get',
                    dataType : 'json',
                    url : '../api/gouwucheadd.php',
                    data : {
                        key : 'jia',
                        dataid : $jian
                    },
                    success : (xhr)=>{
                        console.log(xhr)
                        $valText.val(xhr.data);
                        var $suhum = '';
                        for(var i in xhr.cha){
                            for(var j in xhr.cha[i]){
                                $suhum = xhr.cha[i]['quantity'];
                            }
                        }
                        var $jiage = $price * ($suhum-1);
                        
                        $valText.val(xhr.data);
                        $(this).parent().parent().parent().next().children(['.quan']).text('￥'+$jiage);
                        var lis = $(this).parent().parent().parent().parent().parent().parent().parent().prev().find('.check').attr('date-id',$jiage);
                        if(lis.get(0).checked == true){
                            $('.total em').text($jiage);
                        }else{
                            
                        }
                        
                        
                        
                    }
                })
            })

            //点击删除
            $('.list-del').on('click',function(){
                console.log($(this))
                var $jian = $(this).attr('data-id');
                $.ajax({
                    type : 'get',
                    dataType : 'json',
                    url : '../api/gouwucheadd.php',
                    data : {
                        key : 'del',
                        dataid : $jian
                    },
                    success : (xhr)=>{
                        window.location.reload();

                    }
                })
            })

            //点击选中
            console.log($('.check').get(0))
            $('.check').on('click',function(){
                console.log($(this))
                if($(this).get(0).checked == true){
                    var $qian = Number($(this).attr('date-id'));
                    var $wenben = Number($('.total em').text());
                    $('.total em').text($qian+$wenben)
                }else{
                    var $qian = Number($(this).attr('date-id'));
                    var $wenben = Number($('.total em').text());
                    $('.total em').text($wenben-$qian)
                }
            })
            
                
           
        }
    
    })
  }
  

})