requirejs.config({
    paths : {
        'jquery' : '../lib/jquery-3.3.1.min',
        'login' : 'login',
        'cookie' : '../lib/jquery.cookie'
    }
})
requirejs(['jquery'],function(){
    requirejs(['login','cookie'],function(){
        console.log('requirejs开启成功!');
    })
    
})