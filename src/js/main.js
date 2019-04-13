requirejs.config({
    paths : {
        'jquery' : '../lib/jquery-3.3.1.min',
        'slideshow' : '../lib/jQextend',
        'index' : 'index',
        'cookie' : '../lib/jquery.cookie'
    }
})
requirejs(['jquery'],function(){
    requirejs(['slideshow','index','cookie'],function(){
        console.log('requirejs开启成功!');
    })
    
})