requirejs.config({
    paths : {
        'jquery' : '../lib/jquery-3.3.1.min',
        'detail' : 'detail',
        'cookie' : '../lib/jquery.cookie'
    }
})
requirejs(['jquery'],function(){
    requirejs(['detail','cookie'],function(){
        console.log('requirejs开启成功!');
    })
    
})