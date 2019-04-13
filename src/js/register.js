requirejs.config({
    paths : {
        'jquery' : '../lib/jquery-3.3.1.min',
        'code' : 'code',
        'cookie' : '../lib/jquery.cookie'
    }
})
requirejs(['jquery'],function(){
    requirejs(['code','cookie'],function(){
        console.log('requirejs开启成功!');
    })
    
})