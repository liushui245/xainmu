//封装设置、获取、移除cookie
var Cookie = {
    setCookie : function(name,value,data,path){
        var str = `${name}=${value}`;
        if(data){
            str += `; expires=${data.toUTCString()}`;
        }
        if(path){
            str += `; path=${path}`;
        }

        document.cookie = str;
    },
    getCookie : function(name){
        var cookieArr = document.cookie.split("; ");
        var res = "";
        cookieArr.forEach(function(item){
            var arr = item.split("=");
            if(arr[0] == name){
                res = arr[1];
            }
        })
        return res;
    },
    removeCookie : function(name,path){
        var d = new Date();
        d.setDate(d.getDate()-1);
        this.setCookie(name,"",d,path)
    }
}