/**
 * Created by Administrator on 2016/8/12.
 */

angular.module("app.demo.filters",[])
    .filter("reverse",function(){
        return function(input,uppercase){//input指的是要过滤的东西
            var out = "";
            for(var i=0 ; i<input.length; i++){
                out = input.charAt(i)+out;
            }
            if(uppercase){
                out = out.toUpperCase();
            }
            return out;
        }
    })