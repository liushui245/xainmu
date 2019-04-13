requirejs.config({
    paths : {
        'jquery' : '../lib/jquery-3.3.1.min',
        'car' : 'car',
        'cookie' : '../lib/jquery.cookie'
    }
})
requirejs(['jquery'],function(){
    requirejs(['car','cookie'],function(){
        console.log('requirejs开启成功!');
    })
    
})