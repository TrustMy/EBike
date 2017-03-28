/**
 * 用户服务 用来获取ajax数据
 */
angular.module("app.demo.service",[])
    .service('registerService', function ($http,$q) {
        //var baseUrl = 'http://192.168.1.111:18080/bsWebServer-1.0/';
        //var baseUrl = 'http://192.168.1.160:7888/EBWebServer-0.0.1';
        //var baseUrl = 'http://180.168.194.98:7888/EBWebServer-0.0.1';
//        var baseUrl = 'http://180.168.194.98:7888/EBWebServer-2.0';
        var baseUrl = 'http://139.196.229.233:8080/EBWebServer-2.0';
        // var baseUrl = "https://180.168.194.98:8443/EBWebServer-2.0";
        // var baseUrl = 'http://192.168.1.134:8080';
        //var baseUrl = 'http://192.168.1.4:8080';
        //var url="http://192.168.1.31:8080/";180.168.194.98 7888
        var mapping = {
            //登录部分
            usersSub: {
                account: "cellphone",//前面的为你命名的ng-model里的值eg（ng-model="user.uname"），后面的值为后台命名的名称
                upass: "passWord"
                //重置密码
            },
            usersReg:{
                account:"cellphone",
                pass:"password",
                email:"email",
                verCode:"code"
            },
            usersconfirmVercode:{
                account:"cp",
                verCodeContent:"code",
                newpass:"pwd"
            }
        };
        var service = {};
        var userS = new baseService($http, $q, baseUrl, 'usersSub','usersReg',"usersconfirmVercode",mapping);

        console.log(userS);
        return userS;
    })
    //.factory('weatherService', ['$http', '$q', function ($http, $q){
    //    function getWeather (city) {
    //        var deferred = $q.defer();
    //        var apiKey= "hBDoMmfaQvkxwifiKdsQij6s";
    //        var url = "http://api.map.baidu.com/telematics/v3/weather?location="+city+"&output=json&ak="+apiKey+"&callback=JSON_CALLBACK&error=";
    //        $http({
    //            url: url,
    //            method: 'JSONP'
    //        }).success(function(data) {
    //            deferred.resolve(data);
    //        }).error(function(error){
    //            console.warn(error);
    //            deferred.reject(error);
    //        });
    //        return deferred.promise;
    //    }
    //    return {
    //        getWeather: getWeather
    //    };
    //}])



/* //获取用户列表信息
 service.list = function(obj) {
 var q = $q.defer();
 $http.get(baseUrl+'/users/list',{params:obj}).then(function(e) {
 var data=e.data;//数据过滤
 q.resolve(data);
 },function(err) {
 q.reject(err);//错误应该处理一下
 })
 return q.promise;
 }*/
/*   service.getById = function(obj) {
 var q = $q.defer();
 $http.get(baseUrl+'/users/getById',{params:obj}).then(function(e) {
 var data=e.data;//数据过滤
 q.resolve(data);
 },function(err) {
 q.reject(err);//错误应该处理一下
 })
 return q.promise;
 }*/



