requirejs.config({
    paths : {
        'jquery' : '../lib/jquery-3.3.1.min',
        'list' : 'list',
        'cookie' : '../lib/jquery.cookie'
    }
})
requirejs(['jquery'],function(){
    requirejs(['list','cookie'],function(){
        console.log('requirejs开启成功!');
    })
    
})