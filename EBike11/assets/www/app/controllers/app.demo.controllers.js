/**
 * Created by dong on 2016/8/15.
 */
var mybridge;
initwebbridge = function(){
    function setupWebViewJavascriptBridge(callback) {
        
        if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'https://__bridge_loaded__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
    }
    setupWebViewJavascriptBridge(function(bridge) {
                                 var uniqueId = 1
                                 function log(message, data) {
                                 var log = document.getElementById('log')
                                 var el = document.createElement('div')
                                 el.className = 'logLine'
                                 el.innerHTML = uniqueId++ + '. ' + message + ':<br/>' + JSON.stringify(data)
                                 if (log.children.length) { log.insertBefore(el, log.children[0]) }
                                 else { log.appendChild(el) }
                                 }
                                 mybridge = bridge;
                                 bridge.registerHandler('testJavascriptHandler', function(data, responseCallback)
                                                        {
                                                        //log('ObjC called testJavascriptHandler with', data)
                                                        //var responseData = { 'Javascript Says':'Right back atcha!' }
                                                        ////log('JS responding with', responseData)
                                                        //responseCallback(responseData)
                                                        
                                                        
                                                        
                                                        //log('ObjC called testJavascriptHandler with', data)
                                                        var responseData = { 'Javascript Says':'Right back atcha!' }
                                                        $(".vehiclenumvalclass").val(data.deviceid);
                                                        
                                                        
                                                        //log('JS responding with', responseData)
                                                        responseCallback(responseData)
                                                        
                                                        })
                                 
                                 
                                 }
                                 
                                 
                                 )
    
    
}

angular.module("app.demo.controllers",[])
//初始app
    .controller("indexcontroller",function($scope,$rootScope,$state,registerService,$timeout,$interval,$window){

        //console.log("看看md5："+$.md5("Hello,Liehuo.Net"));
        console.log(new Date().getTime());

        //判断当前设备的类型
        try{
            console.log(navigator);
            if(navigator.platform =='iPhone'){
                $rootScope.phonetyperoot = 4;
                $rootScope.windoWHeihgt = ($(window).height())*1+"px";
                   initwebbridge();
            }else {
                $rootScope.phonetyperoot = 3;
                $rootScope.windoWHeihgt = ($(window).height())*1+"px";
            }
        }catch(err){
            $rootScope.phonetyperoot = 3;
            //console.log("判断设备类型报错");
            //alert("判断设备类型报错");
        }
        



        $scope.winHeight = {
            "height":$rootScope.windoWHeihgt
        };
        document.addEventListener('deviceready', function () {
//            alert("indexcontroller:"+document.documentElement.clientHeight)
            if((document.documentElement.clientHeight + "px") != $rootScope.windoWHeihgt){
                if(navigator.platform =='iPhone'){
                    //$rootScope.windoWHeihgt=parseFloat(document.documentElement.clientHeight)-20 + "px";
                }else {
                    $rootScope.windoWHeihgt=document.documentElement.clientHeight + "px";
                }

                $scope.$apply(function(){
                    $scope.winHeight = {
                        "height":$rootScope.windoWHeihgt
                    };
                });
            }
        }, false);
        console.log(333333,new Date(1488983606000));
        console.log(333333222,new Date(1488983606000));
        //console.log(22222,new Date(1484495999000));
        //console.log(44445,new Date("2012/12/25 20:11:11").getTime() - new Date("2012/12/18 20:11:11").getTime());
    })
    //登录部分
    .controller("submitsController",["$scope","$state","$rootScope","registerService","$window","$timeout","$location",function($scope,$state,$rootScope,registerService,$window,$timeout,$location){
        //模态框部分
        //$rootScope.windoWHeihgt = ($(window).height())*1+"px";
         function backappfunctionsubmit(){
            //document.addEventListener('backbutton', eventBackButton, false);
             $(document).unbind("backbutton");
             $(document).bind('backbutton', eventBackButton);
            function eventBackButton(e) {
                if($location.path() == "/submits"){
                    e.preventDefault();
                    navigator.app.exitApp();
                }else {
                    window.history.go(-1);
                }

            }
        }

        backappfunctionsubmit();
        //$scope.loadapp = {"toggle":true};
        $scope.winHeight = {
            "height":$rootScope.windoWHeihgt
        };
        function iosstyle(){
            document.addEventListener('deviceready', function () {
                if($scope.winHeight.height != $rootScope.windoWHeihgt){
                    $scope.$apply(function(){
                        $scope.winHeight = {
                            "height":$rootScope.windoWHeihgt
                        };
                    })
                }
                $('#all_content').css("height",$rootScope.windoWHeihgt);
            }, false);

        };
        $rootScope.pushyesorno = true;
        // console.log("登录的时候设置的值推送："+$rootScope.pushyesorno);
        iosstyle();

        $scope._top=(parseFloat($rootScope.windoWHeihgt) - 150)/2 +"px";
        $scope._topnot=(parseFloat($rootScope.windoWHeihgt) - 120)/2 +"px";
        //console.log($scope._top);

        $scope.modelpositionStnot = {
            "top":$scope._topnot
        };
        $scope.modelpositionSt = {
            "top":$scope._top
        };
        //获取用户的网络链接方式
        //$rootScope.checkConnection = function() {
        //    var networkState = navigator.connection.type;
        //    var states = {};
        //    states[Connection.UNKNOWN]  = 'Unknown connection';//未知连接
        //    states[Connection.ETHERNET] = 'Ethernet connection';//以太网
        //    states[Connection.WIFI]     = 'WiFi connection';//wifi
        //    states[Connection.CELL_2G]  = 'Cell 2G connection';//2G
        //    states[Connection.CELL_3G]  = 'Cell 3G connection';//3G
        //    states[Connection.CELL_4G]  = 'Cell 4G connection';//4G
        //    states[Connection.CELL]     = 'Cell generic connection';//蜂窝网络
        //    states[Connection.NONE]     = 'No network connection';
        //    //alert('Connection type: ' + states[networkState]);
        //    $scope.intapp = {"toggle":true};
        //    $scope.intappcontent = states[networkState];
        //    $timeout(function(){
        //        $scope.intapp = {"toggle":false};
        //    },2000)
        //};
        //$rootScope.checkConnection();
        //window.history.go(-(window.history.length));
        //console.log(window.history);
        //console.log();
        $scope.subaccountdis = false;
        $scope.subpassdis = false;


        //$scope.loadapp = {"toggle":true};
        //出现，模态框以及内容
        //$scope.submitWarning = "hhahhahh";
        //$rootScope.app= {"toggle":true};

        //初始化的时候
        $scope.oinit = function() {

            //是否记住密码
            $scope.noRemember = true;
            $scope.remember =false ;
            //登录按钮的颜色和时候能够点击
            $scope.submitdis = false;
            $scope.submitBtnblue = true;
            $scope.submitBtngrey = false;

            //判断是否保存密码
            if (registerService.getCookie("CookieIsRemember")) {
                console.log(registerService.getCookie("CookieUserName"));

                //$scope.user = registerService.getCookie("CookieUserName");
                $scope.sub = { 'account':registerService.getCookie("CookieUserName"),'upass':registerService.getCookie("CookieUserPwd") };
                $scope.noRemember = false;
                $scope.remember = true;
                //$scope.user = registerService.getCookie("CookieUserPwd");
                console.log($scope);
                $scope.register_checked = true;
                $scope.register_uncheck = false;
            }else{
                //alert("没有保存密码");
                console.log(registerService.getCookie("CookieIsRemember"));
            }
        };
        $scope.oinit();
        //验证手机验证码/(^\s*)|(\s*$)/g
        $scope.regphone = "[0-9]{11}";
        //验证手机号码的格式
        $scope.subphonePatStyle = function(isValid){
            //var uname = $scope.submitForm.subaccount.$modelValue;
            //var s = uname;
            //console.log(uname.length);
            if(isValid){
                //console.log("手机号码格式正确",uname);
                console.log("成功")
            }else{
                //console.log("手机号码格式错误");
                //$scope.subapp= {"toggle":true};
                //$scope.submitWarning = "手机号码格式错误！";
                //$timeout(function(){
                //    $scope.subapp= {"toggle":false};
                //},2000)
            }

            //$scope.regphone = /\\s/;
            //if($scope.regphone.test(=====)){
            //
            //}
        };

        //点击登录
        $scope.submitBtn = function(){
            var sss = $(".accountinputclass").val();
            console.log(sss.length);

            var uname = $scope.submitForm.subaccount.$modelValue;
            var upass = $scope.submitForm.subpass.$modelValue;
            //var parteenyan = "^[0-9]{11}";
            //var sssss = uname;
            console.log(uname);
            $scope.submitdis = true;
            $scope.submitBtnblue = false;
            $scope.submitBtngrey = true;
            $scope.hideKeyboard = function() {
                document.activeElement.blur();
                $("input").blur();
            };
            $scope.hideKeyboard();

            if(!uname && !upass ){

                $scope.submitdis = false;
                $scope.submitBtnblue = true;
                $scope.submitBtngrey = false;
                $scope.submitWarning = "请您输入手机号和密码！";
                $scope.subapp= {"toggle":true};
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000)

            }else if(!uname){
                $scope.submitdis = false;
                $scope.submitBtnblue = true;
                $scope.submitBtngrey = false;
                $scope.submitWarning = "请确认您的手机号！";
                $scope.subapp= {"toggle":true};
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);

                //console.log("请输入用户名和密码，可以点击");
            }else if(!upass){
                $scope.submitdis = false;
                $scope.submitBtnblue = true;
                $scope.submitBtngrey = false;

                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请您输入密码！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000)
            }
            else if(sss.length != 11){
                //console.log(/(^\s*)|(\s*$)/g.test(uname));
                $scope.submitdis = false;
                $scope.submitBtnblue = true;
                $scope.submitBtngrey = false;

                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "手机号码前后不能含有空格！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000)
            }
            else{
                //$state.go("submits");

                $timeout(function(){
                    $scope.subaccountdis = true;
                    $scope.subpassdis = true;
                    $scope.loadapp = {"toggle":true};
                    $scope.subObj = {
                        cp:Number(uname),
                        pw: $.md5(upass)

                    };
                    $scope.substarttimehs = new Date().getTime();
                    console.log(333333,$scope.substarttimehs);

                    registerService.submits($scope.subObj).then(function(e){
                        $scope.subaccountdis = false;
                        $scope.subpassdis = false;
                        $scope.loadapp = {"toggle":false};
                        $scope.submitdis = false;
                        $scope.submitBtnblue = true;
                        $scope.submitBtngrey = false;
                        console.log("收到结果正确，可以点击");
                        console.log("e:"+JSON.stringify(e));
                        if (e.status==true){
                            // $rootScope.gaodemapscriptclass = {
                            //    "src":"http://webapi.amap.com/maps?v=1.3&key=42340a04401555924d3b73340e423748"
                            // };
                            // document.write("<script src='http://webapi.amap.com/maps?v=1.3&key=42340a04401555924d3b73340e423748'></script>");

                            registerService.scriptret();
                            //$window.sessionStorage.setItem("Uid",e.user.uid);//sessionStorage的存储方法
                            $window.sessionStorage.setItem("Ucp",Number(uname));
                            $window.sessionStorage.setItem("UtermId", e.content.termId);
                            $window.sessionStorage.setItem("Uemail", e.content.email);
                            $window.sessionStorage.setItem("Unick", e.content.nickName);
                            $window.sessionStorage.setItem("Uspeed", e.content.speed);
                            $window.sessionStorage.setItem("Ufunction", e.content.function);
                            //$window.sessionStorage.setItem("cellPhone",e.user.celliphone);
                            ////存储用户的密码
                            //$window.sessionStorage.setItem("userpassword", e.user.passWord);
                            //console.log(e.AlarmCount);
                            //console.log(e.user.celliphone);
                            //console.log(e.user.emali);
                            //console.log(e.user.nickName);
                            //存储用户的报警数

                            //console.log($rootScope.alarmcount);
                            //
                            //iOS push regiser
                            if($rootScope.phonetyperoot == 4){
                                mybridge.callHandler('loginsucessObjcCallback', {"termId":$window.sessionStorage.getItem("UtermId"),"seq":registerService.randomsix(),"userPhone":$window.sessionStorage.getItem("Ucp"),"token":$window.sessionStorage.getItem("Utoken")}, function(response) {
                                    log('JS got response', response)
                                })
                             }

                            $rootScope.mineuserphone = uname;

                                $rootScope.mineusertermid = e.content.termId;


                            if(e.content.email){
                                $rootScope.mineuseremail = e.content.email;
                            }
                            if(e.content.nickName){
                                $rootScope.mineusernick = e.content.nickName;
                            }
                            //$state.go("mains.home");//e.user;
                            //$rootScope.user =
                            //{
                            //    "uID": e.user.uid,
                            //    "unickName":e.user.uname,
                            //    "uphone": e.user.ciphone,
                            //    "uemile": e.user.emali,
                            //    "ucompany": e.user.cname,
                            //    "uaddress": e.user.caddress
                            //};
                            //console.log(e.user);

                            //console.log($rootScope.mainUsercontent);
                            //navigator.intent.toPush(
                            //    {"termId":$window.sessionStorage.getItem("UtermId"),"userPhone":$window.sessionStorage.getItem("Ucp"),"token":$window.sessionStorage.getItem("Utoken"),"pushId": e.content.pushId,"function":e.content.function}
                            //);
                            if ($scope.noRemember == false){
                                //存储cookie
                                registerService.setCookie("CookieUserName", uname);
                                registerService.setCookie("CookieUserPwd", upass);
                                registerService.setCookie("CookieIsRemember", $scope.remember = true);
                                console.log("保存密码");
                            } else if($scope.noRemember == true) {
                                registerService.delCookie("CookieUserName");
                                registerService.delCookie("CookieUserPwd");
                                registerService.delCookie("CookieIsRemember");
                                console.log("删除密码");
                            }
                            if(e.content.termId == 0){
                                $rootScope.lastPage = "登录";
                                $state.go("vehiclebind");
                            }else {

                                $state.go("mains.home");
                            }

                        } else if(e.status==false){
                            //判断用户是否该跳转到绑定设备页面
                            ///if(e.reason == "用户已停用"){

                            //}else{
                                $scope.subapp= {"toggle":true};
                                $scope.submitWarning = e.err+"！";
                                $timeout(function(){
                                    $scope.subapp= {"toggle":false};
                                },2000);
                            //}


                        }
                    },function(err){
                        $scope.subendtimehs = new Date().getTime();
                        $scope.subaccountdis = false;
                        $scope.subpassdis = false;
                        $scope.loadapp = {"toggle":false};
                        $scope.submitdis = false;
                        $scope.submitBtnblue = true;
                        $scope.submitBtngrey = false;
                        $scope.subapp= {"toggle":true};
                        console.log(222222,$scope.subendtimehs);
                        console.log(12222222,$scope.subendtimehs - $scope.substarttimehs);
                        if($scope.subendtimehs - $scope.substarttimehs>=6500){
                            $scope.submitWarning = "请求超时！";
                        }else {
                            $scope.submitWarning = "网络连接失败！";
                        }
                        $timeout(function(){
                            $scope.subapp= {"toggle":false};
                        },2000)

                    });
                },250)

            }


        };
        //点击切换是否记住密码
        $scope.checked_btn = function(e){
           if($scope.remember == true){
               $scope.noRemember = true;
               $scope.remember = false;
           }else{
               $scope.noRemember = false;
               $scope.remember = true;
           }
        };
        //跳往忘记密码
        $scope.forgetPassbtn = function(){
            $scope.hideKeyboard = function() {
                document.activeElement.blur();
                $("input").blur();
            };
            $scope.hideKeyboard();
            $scope.subaccountdis = true;
            $scope.subpassdis = true;
            $state.go("searchp");
        };
        //跳往注册页面
        $scope.clickRegister = function(){
            $scope.hideKeyboard = function() {
                document.activeElement.blur();
                $("input").blur();
            };
            $scope.hideKeyboard();
            $scope.subaccountdis = true;
            $scope.subpassdis = true;
            $state.go("registers");
        }


    }])
    //找回密码验证码
    .controller("searchPassController",function($scope,$rootScope,$state,registerService,$timeout,$interval,$window){
        //返回按钮
        $scope.searchPassBackBtn = function(){
            window.history.go(-1);
        };

        $scope.searchpaccountdis = false;
        $scope.searchpvercodedis = false;
        //手机号码的验证
        //$scope.regphone = '[0-9]{11}';
        //背景的高度
        //$scope.windoWHeihgt = ($(window).height())*1+"px";
        $scope.winHeight = {
            "height":$rootScope.windoWHeihgt
        };
        $scope._topnot=(parseFloat($rootScope.windoWHeihgt) - 120)/2 +"px";
        //console.log($scope._top);

        $scope.modelpositionStnot = {
            "top":$scope._topnot
        };
        $scope.vercodeBtnContent = "点击获取验证码";
        //手机验证码的正则表达式
        $scope.regphone = "[0-9]{11}";
        $scope.searchPcondepat= '[0-9]{6}';
        //验证手机号码的格式
        $scope.phonePatStyle = function(isValid){
            //var regaccount = $scope.registerForm.regaccount.$modelValue;
            if(isValid){

            }else{
                console.log("手机号码格式错误");
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请确认您的手机号！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }
        };
        //点击获取验证码
        //var parteenyan = /(^\s*)|(\s*$)/g;
        //parteenyan.test(regaccount
        $scope.passnew = {"toggle":false};
        $scope.getVercode = function(){
            //$Http
            var rrrr = $(".searchiaccoutpow").val();
            var regaccount = $scope.searchPassForm.searchPaccount.$modelValue;
            console.log(regaccount);
            if(!regaccount){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请确认您的手机号！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else if(rrrr.length != 11){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "手机号码前后不能含有空格！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }
            //else if(parteenyan.test(regaccount)){
            //    $scope.subapp= {"toggle":true};
            //    $scope.submitWarning = "手机号码不能含有空格！";
            //    $timeout(function(){
            //        $scope.subapp= {"toggle":false};
            //    },2000);
            //}
            else{
                $scope.verCodedis = true;//不能再次点击，直到ajax结束
                var verCodeObj = {
                    "cp":Number(regaccount)
                };
                var verCodeUrl = "/register/applySmsCode/";
                $scope.loadapp = {"toggle":true};
                $scope.vercodestarttimehs = new Date().getTime();
                console.log("请求开始时间："+$scope.vercodestarttimehs);
                registerService.commonUser(verCodeObj,verCodeUrl).then(function(e){
                    $scope.loadapp = {"toggle":false};
                    //当status正确的时候，
                    if(e.status == true){
                        $scope.passnew = {"toggle":true};
                        var s = 60;
                        $scope.vercodeBtnContent = s+"秒" ;
                        var regVertimer = $interval(function(){
                            s--;
                            if(s>0){
                                $scope.vercodeBtnContent = s+"秒" ;
                                //console.log(s);
                            }else{
                                $scope.verCodedis = false;
                                $scope.vercodeBtnContent = "重新获取验证码" ;
                                $interval.cancel(regVertimer);
                                //console.log(s);
                            }
                        },2000)
                    }else{
                        $scope.verCodedis = false;
                        $scope.subapp= {"toggle":true};
                        $scope.submitWarning = e.err+"！";
                        $timeout(function(){
                            $scope.subapp= {"toggle":false};
                        },2000);
                        console.log(e.err);
                    }

                },function(err){
                    $scope.vercodeendtimehs = new Date().getTime();
                    console.log("请求结束时间："+$scope.vercodeendtimehs);

                    $scope.loadapp = {"toggle":false};
                    $scope.verCodedis = false;
                    $scope.subapp= {"toggle":true};
                    console.log("请求时间差："+$scope.vercodeendtimehs - $scope.vercodestarttimehs);
                    if($scope.vercodeendtimehs - $scope.vercodestarttimehs>=6500){
                        $scope.submitWarning = "请求超时！";
                    }else {
                        $scope.submitWarning = "网络连接失败！";
                    }

                    $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                });


            }
        };
        //获取验证码页面，点击取消按钮
        $scope.backSubmitPage = function(){
            $state.go("submits");
        };
        $scope.searchvercodedis = false;
        //获取验证码页面，点击确认按钮
        $scope.verCodegoNewPassPage = function(){
            var rrrr = $(".searchiaccoutpow").val();
            var searchpinputcodeval = $(".searchpinputcodeclass").val();
            var regaccount = $scope.searchPassForm.searchPaccount.$modelValue;
            var searchPverCodeContent = $scope.searchPassForm.searchPverCodeContent.$modelValue;
            try {
                var searchPnewpassm = $scope.searchPassForm.searchPnewpass.$modelValue;
                var searchPagapassm = $scope.searchPassForm.searchPagapass.$modelValue;
                var pagepasswordyes = true;
            }catch (err){
                var searchPnewpassm = "";
                var searchPagapassm = "";
                var pagepasswordyes = false;
            }

            if(!regaccount){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请确认您的手机号！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else if(!searchPverCodeContent){
                console.log("验证码的值："+searchPverCodeContent);
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请确认您的验证码！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else if(!searchPnewpassm && !pagepasswordyes){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请点击获取验证码！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }
            else if(!searchPnewpassm){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请确认您的新密码！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else if(!searchPagapassm){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请输入确认密码！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else if(searchPnewpassm != searchPagapassm){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "两次输入密码不一致！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else if(searchPnewpassm.indexOf(" ")!=-1){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "新密码内容不能含有空格！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else if(rrrr.length != 11){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "手机号码前后不能含有空格！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else if(searchpinputcodeval.length != 6){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "验证码前后不能含有空格！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }
            else{
                $scope.searchpaccountdis = true;
                $scope.searchpvercodedis = true;
                $scope.searchvercodedis = true;
                $scope.searchPnewdis= true;
                $scope.searchPolddis= true;
                $scope.loadapp = {"toggle":true};
                $scope.searchPobj = {
                    cp:Number(regaccount),
                    code:Number(searchPverCodeContent),
                    pwd:$.md5(searchPnewpassm)
                };
                $scope.searchpstarttimehs = new Date().getTime();
                registerService.confirmvercodes($scope.searchPobj).then(function(e){
                    console.log(e);
                    $scope.searchpaccountdis = false;
                    $scope.searchpvercodedis = false;
                    $scope.loadapp = {"toggle":false};
                    $scope.searchvercodedis = false;
                    $scope.searchPnewdis= false;
                    $scope.searchPolddis= false;
                    if(e.status == true){
                        //对话保存手机号码
                        //$window.sessionStorage.setItem("cellPhone",regaccount);


                        $scope.hahaapp= {"toggle":true};
                        $scope.submithappy = "恭喜您，设置新密码成功！";
                        $timeout(function(){
                            $scope.hahaapp= {"toggle":false};
                            $state.go("submits");
                            $scope.passnew = {"toggle":false};

                        },2000);

                        //$interval.cancel(regVertimer);
                    }else{
                        $scope.subapp= {"toggle":true};
                        $scope.submitWarning = e.err+"！";
                        $timeout(function(){
                            $scope.subapp= {"toggle":false};
                        },2000);
                    }
                },function(err){
                    $scope.searchpendtimehs = new Date().getTime();
                    $scope.searchpaccountdis = false;
                    $scope.searchpvercodedis = false;
                    $scope.searchPnewdis= false;
                    $scope.searchPolddis= false;
                    $scope.loadapp = {"toggle":false};
                    $scope.searchvercodedis = false;
                    $scope.subapp= {"toggle":true};

                    console.log("请求时间差："+$scope.searchpendtimehs - $scope.searchpstarttimehs);
                    if($scope.searchpendtimehs - $scope.searchpstarttimehs>=6500){
                        $scope.submitWarning = "请求超时！";
                    }else {
                        $scope.submitWarning = "网络连接失败！";
                    }
                    $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                })
            }
        };
        $scope.forgetpassiphonenumbtna = function(){
            console.log("hahhah");
            $state.go("searchpforgetiphone");
        }
    })
     //找回密码，更换手机号
    .controller("searchpforgetiphonecontroller",function($scope,$rootScope,$state,registerService,$interval,$timeout){
        $scope.searchPassBackBtn = function(){
            window.history.go(-1);
        };
        $scope.winHeight = {
            "height":$rootScope.windoWHeihgt
        };
    })

    //找回密码,输入新密码页面
    //.controller("verCodeNewPassController",function($scope,$rootScope,$state,registerService,$interval,$timeout,$window){
    //    //返回按钮
    //    //$scope.searchPassBackBtn = function(){
    //    //    window.history.go(-1);
    //    //};
    //    //
    //    //$scope.searchnewpnewdis = false;
    //    //$scope.searchnewpolddis = false;
    //    ////$scope.windoWHeihgt = ($(window).height())*1+"px";
    //    //$scope.winHeight = {
    //    //    "height":$rootScope.windoWHeihgt
    //    //};
    //    //$scope._topnot=(parseFloat($rootScope.windoWHeihgt) - 120)/2 +"px";
    //    ////console.log($scope._top);
    //    //
    //    //$scope.modelpositionStnot = {
    //    //    "top":$scope._topnot
    //    //};
    //    //$scope.codeagaPassdis = false;
    //    //点击确定
    //    $scope.vercodeNewpassBtn = function(){
    //        var searchnewPnewpass = $scope.searchnewPassForm.searchnewPnewpass.$modelValue;
    //        var searchnewPagapass = $scope.searchnewPassForm.searchnewPagapass.$modelValue;
    //        //var regNull=/(^\s*)|(\s*$)/g;
    //        //这个时候按钮不能再次点击
    //        //$scope.codeagaPassdis = true;
    //        if(searchnewPnewpass.indexOf(" ")!=-1){
    //            $scope.subapp= {"toggle":true};
    //            $scope.submitWarning = "新密码内容中不能有空格！";
    //            $timeout(function(){
    //                $scope.subapp= {"toggle":false};
    //            },2000);
    //        }else if(searchnewPnewpass == searchnewPagapass){
    //            $scope.codeagaPassdis = true;
    //            //执行ajax：参数phone， new aga
    //            codenewpassObj = {
    //                "cellphone":$window.sessionStorage.getItem("cellPhone"),
    //                "npwd":searchnewPnewpass
    //            };
    //            codenewpassUrl = "/rest/user/forgotPW/";
    //            //console.log($window.sessionStorage.getItem("cellPhone"));
    //            $scope.loadapp = {"toggle":true};
    //            $scope.searchnewpnewdis = true;
    //            $scope.searchnewpolddis = true;
    //            registerService.commonUser(codenewpassObj,codenewpassUrl).then(function(e){
    //                $scope.searchnewpnewdis = false;
    //                $scope.searchnewpolddis = false;
    //                $scope.loadapp = {"toggle":false};
    //                $scope.codeagaPassdis = false;
    //                if(e.status == true){
    //                    $scope.subapp= {"toggle":true};
    //                    $scope.submitWarning = "新密码设置成功！";
    //                    $timeout(function(){
    //                        $scope.subapp= {"toggle":false};
    //                        $state.go("submits");
    //                    },2000);
    //                }else{
    //                    $scope.subapp= {"toggle":true};
    //                    $scope.submitWarning = e.err+"！";
    //                    $timeout(function(){
    //                        $scope.subapp= {"toggle":false};
    //                    },2000);
    //                }
    //            },function(err){
    //                $scope.searchnewpnewdis = false;
    //                $scope.searchnewpolddis = false;
    //                $scope.loadapp = {"toggle":false};
    //                $scope.codeagaPassdis = false;
    //                $scope.subapp= {"toggle":true};
    //                $scope.submitWarning = "网络连接失败！";
    //                $timeout(function(){
    //                    $scope.subapp= {"toggle":false};
    //                },2000);
    //            });
    //
    //            //$http执行结束后，，
    //            //
    //        }else{
    //            //$scope.codeagaPassdis = false;
    //            //弹出模态框
    //            $scope.subapp= {"toggle":true};
    //            $scope.submitWarning = "两次密码输入不一致！";
    //            $timeout(function(){
    //                $scope.subapp= {"toggle":false};
    //            },2000);
    //        }
    //    }
    //})

    //注册
    .controller("registercontroller",function($scope,$rootScope,$state,registerService,$interval,$timeout){
        //背景的高度
        $scope.searchPassBackBtn = function(){
            window.history.go(-1);
        };
        $scope.winHeight = {
            "height":$rootScope.windoWHeihgt
        };
        $scope._topnot=(parseFloat($rootScope.windoWHeihgt) - 120)/2 +"px";
        //console.log($scope._top);

        $scope.modelpositionStnot = {
            "top":$scope._topnot
        };
        $scope._top=(parseFloat($rootScope.windoWHeihgt) - 150)/2 +"px";

        //console.log($scope._top);
        $scope.modelpositionSt = {
            "top":$scope._top
        };
        $scope.regaccountdis = false;
        $scope.regpassdis = false;
        $scope.regemaildis = false;
        $scope.regvercodedis = false;
        //注册成功的模态框
        //$scope.regSuccessapp = {"toggle":true};
        //获取验证码的文字
        $scope.vercodeBtnContent = "获取验证码";
        //验证手机验证码
        $scope.regphone = "[0-9]{11}";
        $scope.searchPcondepat = '[0-9]{6}';
        //var parteenyan = /(^\s*)|(\s*$)/g;
        //parteenyan.test(regaccount)
        //验证手机号码的格式
        $scope.phonePatStyle = function(isValid){
            //var regaccount = $scope.registerForm.regaccount.$modelValue;
            if(isValid){

            }else{
                console.log("手机号码格式错误");
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请确认您的手机号！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }
        };
        //点击获取验证码
        //$scope.getVercode = function(){
        //    //$Http
        //    var regaccount = $scope.registerForm.regaccount.$modelValue;
        //    console.log(regaccount);
        //    if(!regaccount){
        //        $scope.subapp= {"toggle":true};
        //        $scope.submitWarning = "请确认您的手机号！";
        //        $timeout(function(){
        //            $scope.subapp= {"toggle":false};
        //        },2000);
        //    }else{
        //        $scope.verCodedis = true;//不能再次点击，直到ajax结束
        //        var verCodeObj = {
        //            "cellphone":regaccount,
        //            "time":registerService.getcurrentTime()
        //        };
        //        var verCodeUrl = "/rest/user/getMessage/";
        //        $scope.loadapp = {"toggle":true};
        //        registerService.commonUser(verCodeObj,verCodeUrl).then(function(e){
        //            $scope.loadapp = {"toggle":false};
        //            //当status正确的时候，
        //            if(e.status == true){
        //                var s = 300;
        //                $scope.vercodeBtnContent = s+"秒" ;
        //                var regVertimer = $interval(function(){
        //                    s--;
        //                    if(s>0){
        //                        $scope.vercodeBtnContent = s+"秒" ;
        //                        //console.log(s);
        //                    }else{
        //                        $scope.verCodedis = false;
        //                        $scope.vercodeBtnContent = "重新获取验证码" ;
        //                        $interval.cancel(regVertimer);
        //                        //console.log(s);
        //                    }
        //                },2000)
        //            }else{
        //                $scope.verCodedis = false;
        //                $scope.subapp= {"toggle":true};
        //                $scope.submitWarning = e.reason+"！";
        //                $timeout(function(){
        //                    $scope.subapp= {"toggle":false};
        //                },2000);
        //                console.log(e.reason);
        //            }
        //
        //        },function(err){
        //            $scope.loadapp = {"toggle":false};
        //            $scope.verCodedis = false;
        //            $scope.subapp= {"toggle":true};
        //            $scope.submitWarning = "网络连接失败！";
        //            $timeout(function(){
        //                $scope.subapp= {"toggle":false};
        //            },2000);
        //        });
        //
        //
        //    }
        //};
        //点击注册
        $scope.getVercode = function(){
            //$Http
            var regaccountval = $(".inputregisteraccountr").val();
            var regaccount = $scope.registerForm.regaccount.$modelValue;
            var regsecordorder = $(".inputregsecretordert").val();
            console.log(regaccount);
            if(!regaccount){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请确认您的手机号！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else if(regaccountval.length != 11){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "手机号码前后不能含有空格！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else if(!regsecordorder){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请确认您的密令！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else if(regsecordorder.indexOf(" ") != -1){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "密令中不能含有空格！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }
            else{
                $scope.verCodedis = true;//不能再次点击，直到ajax结束
                var verCodeObj = {
                    "cp":Number(regaccount)
                };
                var verCodeUrl = "/register/applySmsCode/";
                $scope.loadapp = {"toggle":true};
                $scope.vercodestarttimehs = new Date().getTime();
                registerService.commonUser(verCodeObj,verCodeUrl).then(function(e){
                    $scope.loadapp = {"toggle":false};
                    //当status正确的时候，
                    if(e.status == true){
                        $scope.passnew = {"toggle":true};
                        var s = 60;
                        $scope.vercodeBtnContent = s+"秒" ;
                        var regVertimer = $interval(function(){
                            s--;
                            if(s>0){
                                $scope.vercodeBtnContent = s+"秒" ;
                                //console.log(s);
                            }else{
                                $scope.verCodedis = false;
                                $scope.vercodeBtnContent = "重新获取" ;
                                $interval.cancel(regVertimer);
                                //console.log(s);
                            }
                        },2000)
                    }else{
                        $scope.verCodedis = false;
                        $scope.subapp= {"toggle":true};
                        $scope.submitWarning = e.err+"！";
                        $timeout(function(){
                            $scope.subapp= {"toggle":false};
                        },2000);
                        console.log(e.err);
                    }

                },function(err){
                    $scope.loadapp = {"toggle":false};
                    $scope.verCodedis = false;
                    $scope.subapp= {"toggle":true};
                    $scope.vercodeendtimehs = new Date().getTime();
                    console.log("请求时间差："+$scope.vercodeendtimehs - $scope.vercodestarttimehs);
                    if($scope.vercodeendtimehs - $scope.vercodestarttimehs>=6500){
                        $scope.submitWarning = "请求超时！";
                    }else {
                        $scope.submitWarning = "网络连接失败！";
                    }
                    $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                });


            }
        };
        $scope.registerdis = false;
        $scope.registerBtn = function(){
            var regaccountval = $(".inputregisteraccountr").val();
            var regcodeval = $(".registercodeclassa").val();
            var regaccount = $scope.registerForm.regaccount.$modelValue;
            var regpass = $scope.registerForm.regpass.$modelValue;
            var regemail = $scope.registerForm.regemail.$modelValue;
            var regverCode = $scope.registerForm.regverCode.$modelValue;
            //var regNull=/(^\s*)|(\s*$)/g;
            if(!regaccount){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请确认您的手机号！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else if(!regpass){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请确认您的密码！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }
            //else if(!regemail){
            //    $scope.subapp= {"toggle":true};
            //    $scope.submitWarning = "请确认您的邮箱！";
            //    $timeout(function(){
            //        $scope.subapp= {"toggle":false};
            //    },2000);
            //}
            else if(!regverCode){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请确认您的验证码！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else if(regpass.indexOf(" ")!=-1){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "密码内容中不能有空格！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else if(regaccountval.length != 11){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "手机号码前后不能含有空格！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else if(regcodeval.length != 6){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "验证码前后不能含有空格！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }
            else{
                console.log("可以注册");
                $scope.regaccountdis = true;
                $scope.regpassdis = true;
                $scope.regemaildis = true;
                $scope.regvercodedis = true;
                $scope.registerdis = true;
                $scope.loadapp = {"toggle":true};


                $scope.regObj = {
                    cp:Number(regaccount),
                    pw:$.md5(regpass),
                    phoneType:Number($rootScope.phonetyperoot),
                    //nickName:"用户",
                    code:Number(regverCode),
                    email:regemail
                };
                $scope.regstarttimehs = new Date().getTime();
                registerService.registers($scope.regObj).then(function(e){
                    $scope.regaccountdis = false;
                    $scope.regpassdis = false;
                    $scope.regemaildis = false;
                    $scope.regvercodedis = false;
                    $scope.loadapp = {"toggle":false};
                    $scope.registerdis = false;
                    if(e.status == true){
                        $rootScope.lastPage = "注册";
                        //$scope.regSuccessapp = {"toggle":true};
                        $scope.hahaapp = {"toggle":true};
                        $scope.submithappy = "恭喜您，注册成功，稍后进入登录页面！";
                        $scope.regisertruetime = $timeout(function(){
                            $scope.hahaapp = {"toggle":true};
                            $state.go("submits");
                        },2000);

                    }else{

                        $scope.subapp= {"toggle":true};
                        $scope.submitWarning = e.err+"！";
                        $timeout(function(){
                            $scope.subapp= {"toggle":false};
                        },2000);
                    }

                },function(err){
                    $scope.regaccountdis = false;
                    $scope.regpassdis = false;
                    $scope.regemaildis = false;
                    $scope.regvercodedis = false;
                    $scope.loadapp = {"toggle":false};
                    $scope.registerdis = false;
                    $scope.subapp= {"toggle":true};
                    $scope.regendtimehs = new Date().getTime();
                    console.log("请求时间差："+$scope.regendtimehs - $scope.regstarttimehs);
                    if($scope.regendtimehs - $scope.regstarttimehs>=6500){
                        $scope.submitWarning = "请求超时！";
                    }else {
                        $scope.submitWarning = "网络连接失败！";
                    }
                    //$scope.submitWarning = "网络连接失败！";
                    $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                })
            }
        };

        //模态框返回登录
        //$scope.gosubmitPage = function(){
        //    $state.go("submits");
        //};
        ////模态框去绑定
        //$scope.gobindPage = function(){
        //    $state.go("vehiclebind");
        //}
    })
    //车辆绑定
    .controller("vehiclebindController",function($scope,$rootScope,$window,$state,registerService,$interval,$timeout){
        $scope.searchPassBackBtn = function(){
            window.history.go(-1);
        };

        $rootScope.pushyesorno = true;
        console.log("绑定页面："+$rootScope.lastPage);
        $scope.vercodeBtnContent = "点击获取验证码";
        //$scope.windoWHeihgt = ($(window).height())*1+"px";
        $scope.winHeight = {
            "height":$rootScope.windoWHeihgt
        };
        $scope._topnot=(parseFloat($rootScope.windoWHeihgt) - 120)/2 +"px";
        //console.log($scope._top);

        $scope.modelpositionStnot = {
            "top":$scope._topnot
        };
        $scope.backSubmitPage = function(){
            $state.go("submits");
        };
        $scope.bindphonedis = false;
        $scope.bindvehiclenumdis = false;
        $scope.bindvercodedis = false;
        $scope.vehiclebinddis = false;
        $scope.bindverCodedis= false;
        //手机验证码的正则表达式
        $scope.regphone = "[0-9]{11}";
        $scope.bindvehiclepattcode = "[0-9]{6}";
        $scope.vehiclenumpatt= "[0-9]{15}";
        //验证手机号码的格式
        $scope.phonePatStyle = function(isValid){
            //var regaccount = $scope.registerForm.regaccount.$modelValue;
            if(isValid){

            }else{
                console.log("手机号码格式错误");
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请确认您的手机号！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }


        };
        //点击扫码
        $scope.vehiclenumbtn = function(){
            console.log("点击扫码");
            if($rootScope.phonetyperoot == 4){
                mybridge.callHandler('cameraObjcCallback', {"termId":$window.sessionStorage.getItem("UtermId")}, function(response) {
                    log('JS got response', response)


                })

            }else {
                cordova.plugins.barcodeScanner.scan(
                    function (result) {
                        //alert("We got a barcode\n" +
                        //    "Result: " + result.text + "\n" +
                        //    "Format: " + result.format + "\n" +
                        //    "Cancelled: " + result.cancelled);
                        //$scope.$apply(function(){
                            $(".vehiclenumvalclass").val(result.text);
                        //})

                    },
                    function (error) {
                        //alert("Scanning failed: " + error);
                        //$scope.verCodedis = false;
                        $scope.subapp= {"toggle":true};
                        $scope.submitWarning = error+"！";
                        $timeout(function(){
                            $scope.subapp= {"toggle":false};
                        },2000);
                    }
                );
            }


        }
        //点击获取验证码
        $scope.getVercode = function(){
            //$Http
            var vehicleaccountval = $(".bindvehicleaccountval").val();
            var vehiclebindaccount = $scope.vehiclebindForm.vehiclebindaccount.$modelValue;
            console.log(vehiclebindaccount);
            if(!vehiclebindaccount){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请确认您的手机号！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else if(vehicleaccountval.length != 11){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "手机号码前后不能含有空格！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }
            else{
                $scope.bindverCodedis = true;//不能再次点击，直到ajax结束
                var verCodeObj = {
                    "cp":Number(vehiclebindaccount)
                };
                var verCodeUrl = "/register/applySmsCode/";
                $scope.loadapp = {"toggle":true};
                $scope.vercodestarttimehs = new Date().getTime();
                registerService.commonUser(verCodeObj,verCodeUrl).then(function(e){
                    $scope.loadapp = {"toggle":false};
                    //当status正确的时候，
                    if(e.status == true){
                        var s = 60;
                        $scope.vercodeBtnContent = s+"秒" ;
                        var regVertimer = $interval(function(){
                            s--;
                            if(s>0){
                                $scope.vercodeBtnContent = s+"秒" ;
                                //console.log(s);
                            }else{
                                $scope.bindverCodedis = false;
                                $scope.vercodeBtnContent = "重新获取验证码" ;
                                $interval.cancel(regVertimer);
                                //console.log(s);
                            }
                        },2000)
                    }else{
                        $scope.bindverCodedis = false;
                        $scope.subapp= {"toggle":true};
                        $scope.submitWarning = e.err+"！";
                        $timeout(function(){
                            $scope.subapp= {"toggle":false};
                        },2000);
                        console.log(e.err);
                    }

                },function(err){
                    $scope.loadapp = {"toggle":false};
                    $scope.bindverCodedis = false;
                    $scope.subapp= {"toggle":true};
                    $scope.vercodeendtimehs = new Date().getTime();
                    console.log("请求时间差："+$scope.vercodeendtimehs - $scope.vercodestarttimehs);
                    if($scope.vercodeendtimehs - $scope.vercodestarttimehs>=6500){
                        $scope.submitWarning = "请求超时！";
                    }else {
                        $scope.submitWarning = "网络连接失败！";
                    }
                    //$scope.submitWarning = "网络连接失败！";
                    $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                });


            }
        };
        $scope.gomainPage = function(){
            var bindvehiclecodeval = $(".bindvehiclecodea").val();
            var vehicleaccountval = $(".bindvehicleaccountval").val();
            var vehiclenumvala = $(".bindvehiclevehiclenumval").val();
            var vehiclebindaccount = $scope.vehiclebindForm.vehiclebindaccount.$modelValue;
            var vehiclebinddivicenum = $scope.vehiclebindForm.vehiclebinddivicenum.$modelValue;
            var vehiclebindverCodeContent = $scope.vehiclebindForm.vehiclebindverCodeContent.$modelValue;
            if(!vehiclebindaccount){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请确认您的手机号！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else if(!vehiclenumvala){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请确认您的设备号！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else if(!vehiclebindverCodeContent){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请确认您的验证码！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else if(vehicleaccountval.length != 11){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "手机号码前后不能含有空格！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else if(vehiclenumvala.length != 15){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "设备号必须是15位数字且前后不能含有空格！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }
            else if(bindvehiclecodeval.length != 6){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "验证码前后不能含有空格！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }
            else{
                $scope.bindphonedis = true;
                $scope.bindvehiclenumdis = true;
                $scope.bindvercodedis = true;
                $scope.vehiclebinddis = true;
                var vehiclebindObj = {
                    cp:Number(vehiclebindaccount),
                    //type:1,
                    termId:Number(vehiclenumvala),
                    code:Number(vehiclebindverCodeContent)

                }
                var vehiclebindUrl = "/rest/user/bind/";
                $scope.loadapp = {"toggle":true};
                $scope.vehiclebindstarttimehs = new Date().getTime();
                registerService.commonUser(vehiclebindObj,vehiclebindUrl).then(function(e){
                    $scope.bindphonedis = false;
                    $scope.bindvehiclenumdis = false;
                    $scope.bindvercodedis = false;
                    $scope.loadapp = {"toggle":false};
                    $scope.vehiclebinddis = false;
                    console.log(e);
                    if(e.status == true){
                        $window.sessionStorage.setItem("UUcp", Number(vehiclebindaccount));
                        $window.sessionStorage.setItem("UtermId", vehiclenumvala);
                        $scope.subapp= {"toggle":true};
                        $scope.submitWarning = "绑定设备成功！";
                        $timeout(function(){
                            $scope.subapp= {"toggle":false};

                            $rootScope.mineusertermid = vehiclenumvala;


                            //判断之前的页面是什么页面
                            if($rootScope.lastPage == "注册"){
                                //跳转到登录页面
                                $state.go("submits");
                            }else{
                                //跳转到主页面
                                if($window.sessionStorage.getItem("UUcp") == $window.sessionStorage.getItem("Ucp")){
                                    $state.go("mains.home");
                                }else {
                                    $state.go("submits");
                                }

                            }
                        },2000);
                    }else{
                        $scope.subapp= {"toggle":true};
                        $scope.submitWarning = e.err+"！";
                        $timeout(function(){
                            $scope.subapp= {"toggle":false};
                        },2000);
                    }
                },function(err){
                    $scope.vehiclebinddis = false;
                    $scope.bindphonedis = false;
                    $scope.bindvehiclenumdis = false;
                    $scope.bindvercodedis = false;
                    $scope.loadapp = {"toggle":false};
                    $scope.subapp= {"toggle":true};
                    $scope.vehiclebindendtimehs = new Date().getTime();
                    console.log("请求时间差："+$scope.vehiclebindendtimehs - $scope.vehiclebindstarttimehs);
                    if($scope.vehiclebindendtimehs - $scope.vehiclebindstarttimehs>=6500){
                        $scope.submitWarning = "请求超时！";
                    }else {
                        $scope.submitWarning = "网络连接失败！";
                    }
                    //$scope.submitWarning = "网络连接失败！";
                    $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                });


            }
        }
    })
    //主页面
    .controller("mainsController",function($scope,$rootScope,$state,registerService,$interval,$timeout,$window,$location){
//        $scope.shishizuizoObj = {
//            appSN:parseInt(Number(new Date().getTime())/1000),
//            termId:Number($window.sessionStorage.getItem("UtermId")),
//            userCellPhone:Number($window.sessionStorage.getItem("Ucp")),
//            interval:5,
//            duration:300
//        };
//        $scope.shishizuizongUrl = "/rest/cmd/track/";
//        registerService.commonUser($scope.shishizuizoObj,$scope.shishizuizongUrl).then(function(e){
//            console.log("实时追踪："+JSON.stringify(e));
//        },function(err){
//            console.log("实时追踪："+JSON.stringify(err));
//        })
//        //$scope.shishizuizoObj = {
//        //    //appSN:parseInt(Number(new Date().getTime())/1000),
//        //    termId:Number($window.sessionStorage.getItem("UtermId"))
//        //    //userCellPhone:Number($window.sessionStorage.getItem("Ucp")),
//        //    //interval:5,
//        //    //duration:300
//        //};
//        //$scope.shishizuizongUrl = "/rest/gps/latest/";
//        //registerService.commonUser($scope.shishizuizoObj,$scope.shishizuizongUrl).then(function(e){
//        //    console.log("gps测试："+JSON.stringify(e));
//        //},function(err){
//        //    console.log("gps测试："+JSON.stringify(err));
//        //});
//        $scope.shishizuizoObj = {
//            //appSN:parseInt(Number(new Date().getTime())/1000),
//            termId:Number($window.sessionStorage.getItem("UtermId")),
//            startTime:new Date("2017/01/11 12:32:02").getTime(),
//            endTime:new Date("2017/01/11 16:32:02").getTime()
//        //new Date("2012/12/25 20:11:11").getTime()
//            //userCellPhone:Number($window.sessionStorage.getItem("Ucp")),
//            //interval:5,
//            //duration:300
//        };
//        $scope.shishizuizongUrl = "/rest/gps/period/";
//        registerService.commonUser($scope.shishizuizoObj,$scope.shishizuizongUrl).then(function(e){
//            console.log("gps："+JSON.stringify(e));
//        },function(err){
//            console.log("gps："+JSON.stringify(err));
//        })
        $scope.$state = $state;

        $scope.winHeight = {
            "height":$rootScope.windoWHeihgt
        };
        $scope._topnot=(parseFloat($rootScope.windoWHeihgt) - 120)/2 +"px";
        //console.log($scope._top);
        $scope.modelpositionStnot = {
            "top":$scope._topnot
        };
        //日期模态框
        $scope._top=(parseFloat($rootScope.windoWHeihgt) - 300)/2 +"px";
        //if(!AMap){
        //   console.log("错误,没有地图");
        //}
        console.log($scope._top);
        $scope.modelpositionSt = {
            "top":$scope._top
        };

    })
    //home页面
    .controller("homeController",function($scope,$rootScope,$state,registerService,$interval,$timeout,$window,$location){
        $scope.winHeight = {
            "height":$rootScope.windoWHeihgt
        };
        $scope._topnot=(parseFloat($rootScope.windoWHeihgt) - 120)/2 +"px";
        //console.log($scope._top);
        $scope.modelpositionStnot = {
            "top":$scope._topnot
        };
        console.log(123399499585858585858,$rootScope.mineusertermid);
        $scope.$on('$stateChangeStart',

            function(event, toState, toParams, fromState, fromParams){
                // console.log("toState:"+JSON.stringify(toState));
                // console.log("toParams:"+JSON.stringify(toParams));
                // console.log("fromState:"+JSON.stringify(fromState));
                // console.log("fromParams:"+JSON.stringify(fromParams));
                // console.log("toState:",toState);
                // console.log("获取路由地址："+$location.path());
                // console.log($scope);
                if(fromState.name=="mains.home"){
                    console.log($scope.timerr);
                    $interval.cancel($scope.timerr);
                    $interval.cancel($scope.warningnumtimesa);
                    console.log("关闭定时获取报警数量！");
                    console.log("关闭定时器,先出来");
                    console.log($scope.warningnumtimesa);
                };
                if(toState.name == "mains.home"){
                    prostatus();
                    // $scope.warningnumtimesa = $interval(prostatuswarningnum,12000);
                    console.log("开启定时器获取报警数量")
                }
                //权限控制判断 2017年3月24日 09:43:00
                if(toState.name == "mains.home.vehicleStatus"){
                    if(registerService.authorityControl(1) == "1"){

                    }else{
                        event.preventDefault();
                        $scope.subapp= {"toggle":true};
                        $scope.submitWarning = "您无此操作权限！";
                        $scope.timersfreasonload = $timeout(function(){
                            $scope.subapp= {"toggle":false};
                        },2000);
                    }
                }

                if(toState.name == "mains.home.alarmRecord"){
                    $rootScope.alarmstartTime = "";
                    $rootScope.alarmoverTime = ""
                }
            });
        //$scope.timetimetime = $timeout(function(){
        //    console.log(333333333333333,$scope.timerr)
        //},1000);
        function backappfunction(){
            $(document).unbind("backbutton");
            $(document).bind('backbutton', eventBackButton);
            function eventBackButton(e) {
                //console.log("event:"+JSON.stringify(e));
                if($location.path() == "/mains/home"){
                    console.log("退出登录");
                    $scope.$apply(function(){
                        $scope.yesOrNo= {"toggle":true};
                    })
                }else {
                    console.log("非退出按钮!");
                    window.history.go(-1);
                }

            }
        };


        backappfunction();



        $scope.backappYes= function(){
            //window.location.replace("index.html");
            if($rootScope.phonetyperoot == 4){
                mybridge.callHandler('exitObjcCallback', function(response) {
                    log('JS got response', response)
                })
            }
            $state.go("submits");

        };
        $scope.yesOrnohide= function(){
            $scope.yesOrNo= {"toggle":false};
        };


        $scope.iframereturn = function(){
            return false;
        };
        //$scope.timerr = null;
        console.log(22222,$scope);
        //总的map
        $rootScope.mapfunc = function(){
            var followmap =  new AMap.Map('tripmapid',{
                zoom:20,
                center: [116.397428, 39.90923]
            });
        };
        $scope.fortificationdis = false;
        $scope.colorfffYes = true;
        $scope.coloryyyYes = false;
        $scope.colorfffNo= false;
        $scope.coloryyyNo = false;
        $rootScope.colorfff2 = true;
        $rootScope.coloryyy2 = false;
        $rootScope.colorfff3 = true;
        $rootScope.coloryyy3 = false;
        $rootScope.colorfff4 = true;
        $rootScope.coloryyy4 = false;
        $rootScope.colorfff5 = true;
        $rootScope.coloryyy5 = false;
        $rootScope.colorfff6 = true;
        $rootScope.coloryyy6 = false;

        $scope.winHeight = {
            "height":$rootScope.windoWHeihgt
        };
        //未处理的报警的个数
        //$rootScope.alarmiconcountnone= false;
        //$window.sessionStorage.setItem("useralarmcount");
        console.log($rootScope.alarmcount);
        //if($rootScope.alarmcount >0){
        //    console.log("icon显示");
        //}else{
        //    console.log("icon隐藏");
        //    $rootScope.alarmiconcountnone= true;
        //}
        $rootScope.alarmiconcountnone= true;
        //获取解防设防的状态
        $scope.carstatusbellObj = {
            appSN:parseInt(Number(new Date().getTime())/1000),
            termId:Number($window.sessionStorage.getItem("UtermId")),
            userCellPhone:Number($window.sessionStorage.getItem("Ucp"))
        };
        $scope.carstatusbellUrl = "/rest/cmd/queryStatus/";
        function prostatus(){
            if(registerService.authorityControl(1) == "1"){
                console.log("authorityControl1:",registerService.authorityControl(1));
                $scope.fortificationdis = true;
                $scope.orFortification = "获取中";
                $scope.loadapp = {"toggle":true};
                $scope.timesfortiload = $timeout(function(){
                    $scope.loadapp = {"toggle":false};
                },3000);
                $scope.carstartusbellstarttimehs = new Date().getTime();
                registerService.commonUser($scope.carstatusbellObj,$scope.carstatusbellUrl).then(function(e){
                    $scope.loadapp = {"toggle":false};
                    $scope.fortificationdis = false;
                    console.log(e);
                    console.log("报警数"+e.totleAlarm);
                    if(e.totleAlarm>=0){
                        //$window.sessionStorage.setItem("useralarmcount", e.AlarmCount);
                        if(0<= e.totleAlarm && e.totleAlarm<=99){
                            $rootScope.alarmcount = e.totleAlarm;
                        }else {
                            $rootScope.alarmcount = "99+";
                        }

                    }else {
                        //$rootScope.alarmcount = 0;
                    }
                    console.log("$rootScope.alarmcount:"+$rootScope.alarmcount);
                    $scope.timealarmcontenttime = $timeout(function(){
                        if($rootScope.alarmcount >0 || $rootScope.alarmcount == "99+"){
                            console.log("icon显示");
                            $rootScope.alarmiconcountnone= false;
                        }else{
                            console.log("icon隐藏");
                            $rootScope.alarmiconcountnone= true;
                        };
                    },20);

                    if(e.status == true){

                        if(e.content.lockStatus == 0){
                            $scope.orFortification = "设防";
                            $scope.colorfffYes = true;
                            $scope.coloryyyYes = false;
                            $scope.colorfffNo= false;
                            $scope.coloryyyNo = false;
                        }else if(e.content.lockStatus == 1){
                            $scope.orFortification = "解防";
                            $scope.colorfffYes =false ;
                            $scope.coloryyyYes = false;
                            $scope.colorfffNo= true;
                            $scope.coloryyyNo = false;
                        }
                    }else{
                        $scope.orFortification = "点击获取";
                        $scope.subapp= {"toggle":true};
                        $scope.submitWarning = e.err+"！";
                        $scope.timersfreasonload = $timeout(function(){
                            $scope.subapp= {"toggle":false};
                        },2000);
                    }
                },function(err){
                    $scope.loadapp = {"toggle":false};
                    $scope.fortificationdis = false;
                    $scope.orFortification = "点击获取";
                    $scope.subapp= {"toggle":true};
                    $scope.carstartusbellendtimehs = new Date().getTime();
                    console.log("请求时间差："+$scope.carstartusbellendtimehs - $scope.carstartusbellstarttimehs);
                    if($scope.carstartusbellendtimehs - $scope.carstartusbellstarttimehs>=6500){
                        $scope.submitWarning = "请求超时！";
                    }else {
                        $scope.submitWarning = "网络连接失败！";
                    }
                    //$scope.submitWarning = "网络连接失败！";
                    $scope.timersferrload = $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                })
            }else{
                $scope.orFortification = "点击获取";
                $rootScope.alarmiconcountnone= true;
                // $scope.subapp= {"toggle":true};
                // $scope.submitWarning = "您无此操作权限！";
                // $scope.timersfreasonload = $timeout(function(){
                //     $scope.subapp= {"toggle":false};
                // },2000);
            }
        }
        function prostatuswarningnum(){
            console.log("定时器");
            //$scope.fortificationdis = true;
            //$scope.orFortification = "获取中";
            //$scope.loadapp = {"toggle":true};
            //$scope.timesfortiload = $timeout(function(){
            //    $scope.loadapp = {"toggle":false};
            //},3000);
            //$scope.carstartusbellstarttimehs = new Date().getTime();

            if(registerService.authorityControl(1) == "1"){
                console.log("authorityControl2:",registerService.authorityControl(1));
                $scope.carstatusbellObj = {
                    appSN:parseInt(Number(new Date().getTime())/1000),
                    termId:Number($window.sessionStorage.getItem("UtermId")),
                    userCellPhone:Number($window.sessionStorage.getItem("Ucp"))
                };
                registerService.commonUser($scope.carstatusbellObj,$scope.carstatusbellUrl).then(function(e){
                    //$scope.loadapp = {"toggle":false};
                    //$scope.fortificationdis = false;
                    console.log(e);
                    console.log("报警数"+e.totleAlarm);
                    if(e.totleAlarm>=0){
                        //$window.sessionStorage.setItem("useralarmcount", e.AlarmCount);
                        if(0<= e.totleAlarm && e.totleAlarm<=99){
                            $rootScope.alarmcount = e.totleAlarm;
                        }else {
                            $rootScope.alarmcount = "99+";
                        }

                    }else {
                        //$rootScope.alarmcount = 0;
                    }
                    console.log("$rootScope.alarmcount:"+$rootScope.alarmcount);
                    $scope.timealarmcontenttime = $timeout(function(){
                        if($rootScope.alarmcount >0 || $rootScope.alarmcount == "99+"){
                            console.log("icon显示");
                            $rootScope.alarmiconcountnone= false;
                        }else{
                            console.log("icon隐藏");
                            $rootScope.alarmiconcountnone= true;
                        };
                    },20);
                    //
                    if(e.status == true){

                        if(e.content.lockStatus == 0){
                            $scope.orFortification = "设防";
                            $scope.colorfffYes = true;
                            $scope.coloryyyYes = false;
                            $scope.colorfffNo= false;
                            $scope.coloryyyNo = false;
                        }else if(e.content.lockStatus == 1){
                            $scope.orFortification = "解防";
                            $scope.colorfffYes =false ;
                            $scope.coloryyyYes = false;
                            $scope.colorfffNo= true;
                            $scope.coloryyyNo = false;
                        }
                    }
                    else{
                        $scope.orFortification = "点击获取";
                        //$scope.subapp= {"toggle":true};
                        //$scope.submitWarning = e.err+"！";
                        //$scope.timersfreasonload = $timeout(function(){
                        //    $scope.subapp= {"toggle":false};
                        //},2000);
                    }
                },function(err){
                    //$scope.loadapp = {"toggle":false};
                    //$scope.fortificationdis = false;
                    //$scope.orFortification = "点击获取";
                    //$scope.subapp= {"toggle":true};
                    //$scope.carstartusbellendtimehs = new Date().getTime();
                    //console.log("请求时间差："+$scope.carstartusbellendtimehs - $scope.carstartusbellstarttimehs);
                    //if($scope.carstartusbellendtimehs - $scope.carstartusbellstarttimehs>=6500){
                    //    $scope.submitWarning = "请求超时！";
                    //}else {
                    //    $scope.submitWarning = "网络连接失败！";
                    //}
                    ////$scope.submitWarning = "网络连接失败！";
                    //$scope.timersferrload = $timeout(function(){
                    //    $scope.subapp= {"toggle":false};
                    //},2000);
                })
            }else{
                // $scope.subapp= {"toggle":true};
                // $scope.submitWarning = "您无此操作权限！";
                // $scope.timersfreasonload = $timeout(function(){
                //     $scope.subapp= {"toggle":false};
                // },2000);
            }

        }
        if($location.path() == "/mains/home"){

            prostatus();
            // $scope.warningnumtimesa = $interval(prostatuswarningnum,12000);
            console.log("开启定时器获取报警数量");
        }
        //点击解防或者设防的按钮
        $scope.fortificationStatus = function(){
            if(registerService.authorityControl(2) == "1"){
                console.log("authorityControl3:",registerService.authorityControl(2));
                $scope.fortificationdis = true;
                if($scope.orFortification == "设防"){
                    $scope.colorfffYes = false;
                    $scope.coloryyyYes =true ;
                    $scope.colorfffNo= false;
                    $scope.coloryyyNo = false;
                    $scope.vehiclesoperationObj = {
                        termId:Number($window.sessionStorage.getItem("UtermId")),
                        userCellPhone:Number($window.sessionStorage.getItem("Ucp")),
                        appSN:parseInt(Number(new Date().getTime())/1000),
                        lock:true
                    }
                    $scope.vehiclesoperationUrl = "/rest/cmd/lock/";
                    $scope.loadapp = {"toggle":true};
                    $scope.vehiclesoperationstarttimehs = new Date().getTime();
                    registerService.commonUser($scope.vehiclesoperationObj,$scope.vehiclesoperationUrl).then(function(e){
                        $scope.loadapp = {"toggle":false};
                        $scope.fortificationdis = false;
                        console.log(e);
                        if(e.status == true){
                            if(e.content.result == 0){
                                $scope.orFortification = "解防";
                                $scope.colorfffYes = false;
                                $scope.coloryyyYes = false;
                                $scope.colorfffNo=true ;
                                $scope.coloryyyNo = false;
                                $scope.hahaapp= {"toggle":true};
                                $scope.submithappy = "恭喜您，设防成功！";

                                $scope.timenohapptime = $timeout(function(){
                                    $scope.hahaapp= {"toggle":false};
                                },2000);
                            }
                            //else {
                            //    $scope.colorfffYes =true ;
                            //    $scope.coloryyyYes = false;
                            //    $scope.colorfffNo=false ;
                            //    $scope.coloryyyNo = false;
                            //    $scope.subapp= {"toggle":true};
                            //    $scope.submitWarning = "操作失败！";
                            //    $timeout(function(){
                            //        $scope.subapp= {"toggle":false};
                            //    },2000);
                            //}
                        }else {
                            $scope.colorfffYes =true ;
                            $scope.coloryyyYes = false;
                            $scope.colorfffNo=false ;
                            $scope.coloryyyNo = false;
                            $scope.subapp= {"toggle":true};
                            $scope.submitWarning = e.err+"！";
                            $scope.timenoreasontime = $timeout(function(){
                                $scope.subapp= {"toggle":false};
                            },2000);
                        }
                    },function(err){
                        $scope.loadapp = {"toggle":false};
                        $scope.fortificationdis = false;
                        $scope.colorfffYes =true ;
                        $scope.coloryyyYes = false;
                        $scope.colorfffNo=false ;
                        $scope.coloryyyNo = false;
                        $scope.subapp= {"toggle":true};
                        $scope.vehiclesoperationendtimehs = new Date().getTime();
                        console.log("请求时间差："+$scope.vehiclesoperationendtimehs - $scope.vehiclesoperationstarttimehs);
                        if($scope.vehiclesoperationendtimehs - $scope.vehiclesoperationstarttimehs>=6500){
                            $scope.submitWarning = "请求超时！";
                        }else {
                            $scope.submitWarning = "网络连接失败！";
                        }
                        //$scope.submitWarning = "网络连接失败！";
                        $scope.timenoerrtime = $timeout(function(){
                            $scope.subapp= {"toggle":false};
                        },2000);
                    })

                }else if($scope.orFortification == "解防"){
                    $scope.colorfffYes = false;
                    $scope.coloryyyYes = false;
                    $scope.colorfffNo= false;
                    $scope.coloryyyNo =true ;
                    $scope.vehiclesoperationObj = {
                        termId:Number($window.sessionStorage.getItem("UtermId")),
                        userCellPhone:Number($window.sessionStorage.getItem("Ucp")),
                        appSN:parseInt(Number(new Date().getTime())/1000),
                        lock:false
                    }
                    $scope.vehiclesoperationUrl = "/rest/cmd/lock/";
                    $scope.loadapp = {"toggle":true};
                    $scope.vehiclesoperationstarttimehs = new Date().getTime();
                    registerService.commonUser($scope.vehiclesoperationObj,$scope.vehiclesoperationUrl).then(function(e){
                        $scope.loadapp = {"toggle":false};
                        console.log(e);
                        $scope.fortificationdis = false;
                        if(e.status == true){
                            if(e.content.result == 0){
                                $scope.orFortification = "设防";
                                $scope.colorfffYes =true ;
                                $scope.coloryyyYes = false;
                                $scope.colorfffNo=false ;
                                $scope.coloryyyNo = false;
                                $scope.hahaapp= {"toggle":true};
                                $scope.submithappy = "恭喜您，解防成功！";
                                $scope.timehaftime = $timeout(function(){
                                    $scope.hahaapp= {"toggle":false};
                                },2000);
                            }
                            //else {
                            //    $scope.colorfffYes =false ;
                            //    $scope.coloryyyYes = false;
                            //    $scope.colorfffNo= true;
                            //    $scope.coloryyyNo = false;
                            //    $scope.subapp= {"toggle":true};
                            //    $scope.submitWarning = "操作失败！";
                            //    $timeout(function(){
                            //        $scope.subapp= {"toggle":false};
                            //    },2000);
                            //}
                        }else {
                            $scope.colorfffYes = false;
                            $scope.coloryyyYes = false;
                            $scope.colorfffNo= true;
                            $scope.coloryyyNo = false;
                            $scope.subapp= {"toggle":true};
                            $scope.submitWarning = e.err+"！";
                            $scope.ftimereasontime = $timeout(function(){
                                $scope.subapp= {"toggle":false};
                            },2000);
                        }
                    },function(err){
                        $scope.loadapp = {"toggle":false};
                        $scope.fortificationdis = false;
                        $scope.colorfffYes = false;
                        $scope.coloryyyYes = false;
                        $scope.colorfffNo= true;
                        $scope.coloryyyNo = false;
                        $scope.subapp= {"toggle":true};
                        $scope.vehiclesoperationendtimehs = new Date().getTime();
                        console.log("请求时间差："+$scope.vehiclesoperationendtimehs - $scope.vehiclesoperationstarttimehs);
                        if($scope.vehiclesoperationendtimehs - $scope.vehiclesoperationstarttimehs>=6500){
                            $scope.submitWarning = "请求超时！";
                        }else {
                            $scope.submitWarning = "网络连接失败！";
                        }
                        //$scope.submitWarning = "网络连接失败！";
                        $scope.ftimeerrtime = $timeout(function(){
                            $scope.subapp= {"toggle":false};
                        },2000);
                    })
                }else if($scope.orFortification == "点击获取"){
                    if(registerService.authorityControl(1) == "1"){
                        prostatus();
                    }else{
                        $scope.subapp= {"toggle":true};
                        $scope.submitWarning = "您无此操作权限！";
                        $scope.timersfreasonload = $timeout(function(){
                            $scope.subapp= {"toggle":false};
                        },2000);
                    }
                }
            }else{
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "您无此操作权限！";
                $scope.timersfreasonload = $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }
            console.log($location.path());
        };
       $scope.changecolorStatus2 = function(){
           $rootScope.colorfff2 = false;
           $rootScope.coloryyy2 =true ;
           console.log(222);
        };
        $scope.changecolorStatus3 = function(){
            $rootScope.colorfff3 = false;
            $rootScope.coloryyy3 =true ;
            $scope.searchcarhomedis = true;
            console.log("点击了token:"+$window.sessionStorage.getItem("Utoken"));
            function intent() {

                <!--alert("this is alert");-->



                <!--navigator.intent.startGPS("  Json");-->
                navigator.intent.toMap(
                    {"termId":$window.sessionStorage.getItem("UtermId"),"seq":registerService.randomsix(),"userPhone":$window.sessionStorage.getItem("Ucp"),"token":$window.sessionStorage.getItem("Utoken")});
                <!--navigator.intent.toMap("asdasdasdsads");-->
            }

            $scope.timesearchtimenottwo = $timeout(function(){
                $rootScope.colorfff3 =true ;
                $rootScope.coloryyy3 = false;
                $scope.searchcarhomedis = false;
            },1000);
            if($rootScope.phonetyperoot == 3){
                intent();
            }else if($rootScope.phonetyperoot == 4){
                mybridge.callHandler('positionObjcCallback', {"termId":$window.sessionStorage.getItem("UtermId"),"seq":registerService.randomsix(),"userPhone":$window.sessionStorage.getItem("Ucp"),"token":$window.sessionStorage.getItem("Utoken")}, function(response) {
                    log('JS got response', response)
                })

            }

        };
        $scope.changecolorStatus4 = function(){
            if(registerService.authorityControl(1) == "1"){
                $rootScope.colorfff4 = false;
                $rootScope.coloryyy4 =true ;
            }
        };
        $scope.changecolorStatus5 = function(){
            $rootScope.colorfff5 = false;
            $rootScope.coloryyy5 =true ;
        };
        $scope.changecolorStatus6 = function(){
            $rootScope.colorfff6 = false;
            $rootScope.coloryyy6 =true ;
        };
        $rootScope.baidupushNum = 0;
//        $scope.messagepush = function(){
//            console.log("run here?");
//            document.addEventListener('deviceready', function () {
//                if(window.baidupush){
//                    // alert(3);
//                    try {
//                        console.log("pushID here2");
//                        var baidupushFlag = false;
//                        window.baidupush.startWork("8ulOPgOAf03mhcRTr8Yq0HUY", function(info){
//                            //success callback
//                            //your code here
//                            // alert(4);
//                            // alert("startWork:" + JSON.stringify(info));
////                            console.log("pushID startwork")
//                            baidupushFlag = true
//                            if(info.data.errorCode == 0){
//                                var pushinfoObj = {
//                                    cp:Number($window.sessionStorage.getItem("Ucp")),
//                                    pushId:info.data.channelId+"",
//                                    phoneType:Number(info.data.deviceType)
//                                    //channelid:3795525986954054108,
//                                    //type:3
//                                };
//                                var pushinfoUrl = "/rest/user/registerPushId/";
//                                $scope.pushinfostarttimehs = new Date().getTime();
//                                registerService.commonUser(pushinfoObj,pushinfoUrl).then(function(e){
//                                    console.log(e);
//                                    if(e.status==true){
//                                    }else{
//                                        $scope.subapp= {"toggle":true};
//                                        $scope.submitWarning = e.err+"！";
//                                        $scope.timedontknowreason = $timeout(function(){
//                                            $scope.subapp= {"toggle":false};
//                                        },2000);
//                                    }
//                                },function(err){
//                                    $scope.subapp= {"toggle":true};
//                                    $scope.pushinfoendtimehs = new Date().getTime();
//                                    console.log("请求时间差："+$scope.pushinfoendtimehs - $scope.pushinfostarttimehs);
//                                    if($scope.pushinfoendtimehs - $scope.pushinfostarttimehs>=6500){
//                                        $scope.submitWarning = "请求超时！";
//                                    }else {
//                                        $scope.submitWarning = "网络连接失败！";
//                                    }
//                                    //$scope.submitWarning = "网络连接失败！";
//                                    $scope.timedontkonwerr = $timeout(function(){
//                                        $scope.subapp= {"toggle":false};
//                                    },2000);
//                                })
//                            }
//                        });
//                        //解决第一次安装app初次登陆没有绑定的bug
//                        $timeout(function(){
//                        console.log("pushID timeout:"+baidupushFlag)
//                        if (!baidupushFlag){
//                                $timeout(function(){
//                                    window.baidupush.startWork("8ulOPgOAf03mhcRTr8Yq0HUY", function(info){
//                                        baidupushFlag = true
//                                        if(info.data.errorCode == 0){
//                                            var pushinfoObj = {
//                                                cp:Number($window.sessionStorage.getItem("Ucp")),
//                                                pushId:info.data.channelId+"",
//                                                phoneType:Number(info.data.deviceType)
//                                                //channelid:3795525986954054108,
//                                                //type:3
//                                            };
//                                            console.log("pushID:"+pushinfoObj.pushId)
//                                            var pushinfoUrl = "/rest/user/registerPushId/";
//                                            $scope.pushinfostarttimehs = new Date().getTime();
//                                            registerService.commonUser(pushinfoObj,pushinfoUrl).then(function(e){
//                                                console.log(e);
//                                                if(e.status==true){
//                                                }else{
//                                                    $scope.subapp= {"toggle":true};
//                                                    $scope.submitWarning = e.err+"！";
//                                                    $scope.timedontknowreason = $timeout(function(){
//                                                        $scope.subapp= {"toggle":false};
//                                                    },2000);
//                                                }
//                                            },function(err){
//                                                $scope.subapp= {"toggle":true};
//                                                $scope.pushinfoendtimehs = new Date().getTime();
//                                                console.log("请求时间差："+$scope.pushinfoendtimehs - $scope.pushinfostarttimehs);
//                                                if($scope.pushinfoendtimehs - $scope.pushinfostarttimehs>=6500){
//                                                    $scope.submitWarning = "请求超时！";
//                                                }else {
//                                                    $scope.submitWarning = "网络连接失败！";
//                                                }
//                                                //$scope.submitWarning = "网络连接失败！";
//                                                $scope.timedontkonwerr = $timeout(function(){
//                                                    $scope.subapp= {"toggle":false};
//                                                },2000);
//                                            })
//                                        }{
//                                            alert("云推送启动失败...")
//                                        }
//                                    });
//                                },500)
//                        }
//                        },3000)
//
//                        //Resume work, re-bind the ids
//                         window.baidupush.resumeWork(function(info){
//                             //your code here
//                             console.log("pushID resume");
//                             //alert("resumeWork:" + JSON.stringify(info));
//                         });
//                        window.baidupush.listenMessage(function(info){
//                            //your code here
//                            //channelid接口
//                            //alert("listenMessage:"+ JSON.stringify(info));
//                        });
//                        //Listen notification arrived event, when a notification arrived, the callback function will be called
//                        window.baidupush.listenNotificationArrived(function(info){
//                            if(0<=$rootScope.alarmcount && $rootScope.alarmcount<=98){
//                                $rootScope.alarmcount = Number($rootScope.alarmcount);
//                                $rootScope.alarmcount++;
//                            }else if($rootScope.alarmcount>=99) {
//                                $rootScope.alarmcount = "99+";
//                            }
//
//                            $rootScope.alarmiconcountnone= false;
//                            //your code here
//                            //alert("listenNotificationArrived:" + JSON.stringify(info));
//                        });
//
//                        //Listen notification clicked event, when a notification is clicked, the callback function will be called
//                        window.baidupush.listenNotificationClicked(function(info){
////                            alert("通知点击了:"+info)
//
//                                if($rootScope.baidupushNum>0){
//                                    navigator.intent.toDelete({"pushclick":true});
//                                    $state.go("mains.home.alarmRecord")
//                                }
//                                $rootScope.baidupushNum++;  //用于防止第一次进入时执行点击事件
//                            //your code here
//                            //alert("listenNotificationClicked:" + JSON.stringify(info));
//                        });
//                    }catch (err){
//                        console.log(err.message);
//                        alert("云推送启动失败...")
//                    }
//
//                }else{
//                    alert("推送启动失败..");
//                }
//                //Start work, bind the ids
//                //Only for android
//                //Listen message arrived event, when a message arrived, the callback function will be called
//            }, false);
//            $rootScope.pushyesorno = false;
//        };
        // console.log("看看推送的值:"+$rootScope.pushyesorno);
        //if($rootScope.pushyesorno){
        //    $scope.timersmessagetime = $timeout(function(){
        //    console.log("pushID here")
        //        $scope.messagepush();
        //    },500);
        //};
        $scope.weathertodayday = registerService.weatherdate();
        $scope.weatherpif = false;
    })
    //vehicle页面
    .controller("vehicleController",function($scope,$rootScope,$state,registerService,$interval,$timeout,$window){
        $scope.winHeight = {
            "height":$rootScope.windoWHeihgt
        };

        $scope.searchPassBackBtn = function (e) {
            window.history.go(-1)
        };

        $scope.bikeyesnormal = true;
        $scope.bikehandlebug = false;
        $scope.bikecontrollerbug = false;
        $scope.bikemotorbug = false;

        //霍尔的图片
        $scope.hallmortornormal = true;//霍尔正常
        $scope.hallmotorliproblem = false ;//霍尔故障
        $scope.hallbindcontent = "正常";
        $scope.hallmortorinfo = "电机霍尔正常";  //检测信息
        $scope.hallmortorinfoerror = false;  //检测信息正常

        //电线的图片
        $scope.wiremortornormal = true;//电线正常
        $scope.wiremotorliproblem = false;//电线异常
        $scope.wirebindcontent = "正常";
        $scope.wiremortorinfo = "电机电线正常";
        $scope.wiremortorinfoerror = false;

        //转把的图片
        $scope.handlemortornormal = true;//转把正常
        $scope.handlemotorliproblem = false;//转把异常
        $scope.handlebindcontent = "正常";
        $scope.handlemortorinfo = "车辆转把正常";
        $scope.handlemortorinfoerror = false;

        //控制器的图片
        $scope.controllermortornormal = true;//控制器正常
        $scope.controllermotorliproblem = false;//控制器异常
        $scope.controllermotorliprotection = false;//控制器保护异常
        $scope.controllerbindcontent = "正常";//正常，保护故障，故障
        $scope.controllermortorinfo = "控制器正常";//控制器正常
        $scope.controllermortorinfoerror = false;

        //点击开始检测 2017年3月21日 16:50:48
        $scope.selfInspectionclick = function () {
            if(registerService.authorityControl(7) == "1"){
                $scope.selfInspectionObj = {
                    termId:Number($window.sessionStorage.getItem("UtermId")),
                    userCellPhone:Number($window.sessionStorage.getItem("Ucp")),
                    appSN:parseInt(Number(new Date().getTime())/1000)
                };
                $scope.loadapp = {"toggle":true};
                try{
                    registerService.selfInspection($scope.selfInspectionObj).then(
                        function(e){
                            $scope.loadapp = {"toggle": false };
                            if(e.status == true){
                                console.log("success:",e)
                                if(e.content.fault){
                                    // "fault1": 1,//控制器保护(0：无，1：有)
                                    //"fault2": 1,// 电机相线脱落
                                    //"fault3": 1,//控制器故障
                                    //"fault4": 1 ,//电机霍尔故障
                                    //"fault5": 1 //转把故障

                                    //控制器
                                    if(e.content.fault.fault3 == 1){
                                        $scope.controllermortornormal = false;//控制器正常
                                        $scope.controllermotorliproblem = true;//控制器异常
                                        $scope.controllermotorliprotection = false;//控制器保护异常
                                        $scope.controllerbindcontent = "故障";//正常，保护故障，故障
                                        $scope.controllermortorinfo = "控制器异常,建议检修";//控制器正常
                                        $scope.controllermortorinfoerror = true;
                                    }else{
                                        $scope.controllermortornormal = true;//控制器正常
                                        $scope.controllermotorliproblem = false;//控制器异常
                                        $scope.controllermotorliprotection = false;//控制器保护异常
                                        $scope.controllerbindcontent = "正常";//正常，保护故障，故障
                                        $scope.controllermortorinfo = "控制器正常";//控制器正常
                                        $scope.controllermortorinfoerror = false;
                                    }

                                    //电机相线
                                    if(e.content.fault.fault2 == 1){
                                        $scope.wiremortornormal = false;//电线正常
                                        $scope.wiremotorliproblem = true;//电线异常
                                        $scope.wirebindcontent = "脱落";
                                        $scope.wiremortorinfo = "电机相线脱落,建议检修";
                                        $scope.wiremortorinfoerror = true;
                                    }else{
                                        $scope.wiremortornormal = true;//电线正常
                                        $scope.wiremotorliproblem = false;//电线异常
                                        $scope.wirebindcontent = "正常";
                                        $scope.wiremortorinfo = "电机电线正常";
                                        $scope.wiremortorinfoerror = false;
                                    }

                                    //控制器保护
                                    if(e.content.fault.fault1 == 1){
                                        $scope.controllermortornormal = false;//控制器正常
                                        $scope.controllermotorliproblem = false;//控制器异常
                                        $scope.controllermotorliprotection = true;//控制器保护异常
                                        $scope.controllerbindcontent = "保护";//正常，保护故障，故障
                                        $scope.controllermortorinfo = "控制器保护异常,建议检修";//控制器正常
                                        $scope.controllermortorinfoerror = true;
                                    }else{
                                        $scope.controllermortornormal = true;//控制器正常
                                        $scope.controllermotorliproblem = false;//控制器异常
                                        $scope.controllermotorliprotection = false;//控制器保护异常
                                        $scope.controllerbindcontent = "正常";//正常，保护故障，故障
                                        $scope.controllermortorinfo = "控制器正常";//控制器正常
                                        $scope.controllermortorinfoerror = false;
                                    }

                                    //电机霍尔
                                    if(e.content.fault.fault4 == 1){
                                        $scope.hallmortornormal = false;//霍尔正常
                                        $scope.hallmotorliproblem = true ;//霍尔故障
                                        $scope.hallbindcontent = "故障";
                                        $scope.hallmortorinfo = "电机霍尔故障,建议检修";  //检测信息
                                        $scope.hallmortorinfoerror = true;  //检测信息正常
                                    }else{
                                        $scope.hallmortornormal = true;//霍尔正常
                                        $scope.hallmotorliproblem = false ;//霍尔故障
                                        $scope.hallbindcontent = "正常";
                                        $scope.hallmortorinfo = "电机霍尔正常";  //检测信息
                                        $scope.hallmortorinfoerror = false;  //检测信息正常
                                    }

                                    //转把
                                    if(e.content.fault.fault5 == 1){
                                        $scope.handlemortornormal = false;//转把正常
                                        $scope.handlemotorliproblem = true;//转把异常
                                        $scope.handlebindcontent = "故障";
                                        $scope.handlemortorinfo = "车辆转把故障,建议检修";
                                        $scope.handlemortorinfoerror = true;
                                    }else{
                                        $scope.handlemortornormal = true;//转把正常
                                        $scope.handlemotorliproblem = false;//转把异常
                                        $scope.handlebindcontent = "正常";
                                        $scope.handlemortorinfo = "车辆转把正常";
                                        $scope.handlemortorinfoerror = false;
                                    }
                                }
                            }else {
                                $scope.subapp= {"toggle":true};
                                $scope.submitWarning = e.err+"！";
                                $scope.timenoreasontime = $timeout(function(){
                                    $scope.subapp= {"toggle":false};
                                },2000);
                            }
                        },
                        function (e) {
                            console.log("error:",e)
                            $scope.loadapp = {"toggle": false };
                            $scope.subapp= {"toggle":true};
                            $scope.submitWarning = e.err+"！";
                            $scope.timenoreasontime = $timeout(function(){
                                $scope.subapp= {"toggle":false};
                            },2000);
                        }
                    );
                }catch (err){
                    $scope.loadapp = {"toggle": false };
                    $scope.subapp= {"toggle":true};
                    $scope.submitWarning = "网络连接失败！";
                    $scope.timenoreasontime = $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                }
            }else{
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "您无此操作权限！";
                $scope.timersfreasonload = $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }
        }
    })
    //mine页面
    .controller("mineController",function($scope,$rootScope,$state,registerService,$interval,$timeout,$window){
        $scope.$state = $state;
        $scope.searchPassBackBtn = function(){
            window.history.go(-1);
            //console.log(window.history);
        };
        console.log(registerService.authorityControl(1));
        $scope.isInauthority = true;
        $scope.backappbtn = function(){

            $scope.yesOrNo= {"toggle":true};
        }
        $scope.shouldreturnfalse = function(){
            return false;
        }
        $scope.yesOrnohide = function(){
            $scope.yesOrNo= {"toggle":false};
        };
        $scope.backappYes = function(){
            if($rootScope.phonetyperoot == 4){
                mybridge.callHandler('exitObjcCallback', function(response) {
                    log('JS got response', response)
                })
            }
            $state.go("submits");
        };
        $scope.winHeight = {
            "height":$rootScope.windoWHeihgt
        };

        $scope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams){
                //权限控制判断 2017年3月24日 09:43:00
                if(toState.name == "mains.mine.changelimitspeed"){
                    if(registerService.authorityControl(8) == "1"){

                    }else{
                        event.preventDefault();
                        $scope.subapp= {"toggle":true};
                        $scope.submitWarning = "您无此操作权限！";
                        $scope.timersfreasonload = $timeout(function(){
                            $scope.subapp= {"toggle":false};
                        },2000);
                    }
                }

            });
        if(!$rootScope.mineuserphone || $rootScope.mineuserphone == ""){
            $rootScope.mineuserphone = $window.sessionStorage.getItem("Ucp");
        };
        if(!$rootScope.mineusertermid || $rootScope.mineusertermid == ""){
            $rootScope.mineusertermid = $window.sessionStorage.getItem("UtermId");
        };
        if(!$rootScope.mineuseremail || $rootScope.mineuseremail == ""){
            $rootScope.mineuseremail = $window.sessionStorage.getItem("Uemail");
        };
        if(!$rootScope.mineusernick || $rootScope.mineusernick == ""){
            $rootScope.mineusernick = $window.sessionStorage.getItem("Unick");
        };

        //限速值

        //$rootScope.mineusertermid = e.content.termId;
        //初始的时候判断断油或者是断点与否
        $scope.oiltdyes = true;
        $scope.oiltdno = false;

        //判断开灯与否
        $scope.lighttdyes = true;
        $scope.lighttdno = false;

        //点击限速 2017-3-21
        $scope.speedlimitif = {};

        $scope.limitspeed = 0 ;
        $scope.limitspeed = $window.sessionStorage.getItem("Uspeed");
        if($scope.limitspeed == ""){
            $scope.limitspeed = 0 ;
        }
        $scope.speedlimitif.toggle = false;
        $scope.speedlimitclick = function (event) {
            $scope.speedlimitif.toggle = !$scope.speedlimitif.toggle;
        };
        $scope.speedlimitchange = function (limit) {
            if(registerService.authorityControl(8) == "1"){
                $scope.speedlimitObj = {
                    termId:Number($window.sessionStorage.getItem("UtermId")),
                    userCellPhone:Number($window.sessionStorage.getItem("Ucp")),
                    appSN:parseInt(Number(new Date().getTime())/1000),
                    speed : limit
                };
                console.log($scope.speedlimitObj);
                $scope.loadapp = {"toggle":true};
                try{
                    registerService.speedlimit($scope.speedlimitObj).then(
                        function(e){
                            $scope.loadapp = {"toggle": false };
                            console.log(e);
                            if(e.status == true){
                                if(e.content.result == 0){
                                    $scope.hahaapp= {"toggle":true};
                                    $scope.submithappy = "恭喜您，设置成功！";
                                    $scope.limitspeed = limit;
                                    $window.sessionStorage.setItem("Uspeed", limit);
                                    $scope.speedlimitif.toggle = !$scope.speedlimitif.toggle;
                                    $scope.timehaftime = $timeout(function(){
                                        $scope.hahaapp= {"toggle":false};
                                    },2000);
                                }
                            }else {
                                $scope.subapp= {"toggle":true};
                                $scope.submitWarning = e.err+"！";
                                $scope.timenoreasontime = $timeout(function(){
                                    $scope.subapp= {"toggle":false};
                                },2000);
                            }

                        },
                        function (e) {
                            console.log("error:",e)
                            $scope.loadapp = {"toggle": false };
                            $scope.subapp= {"toggle":true};
                            $scope.submitWarning = e.err+"！";
                            $scope.timenoreasontime = $timeout(function(){
                                $scope.subapp= {"toggle":false};
                            },2000);
                        }
                    );
                } catch (err) {
                    console.log("error22:",err)
                    $scope.loadapp = {"toggle": false };
                    $scope.subapp= {"toggle":true};
                    $scope.submitWarning = "网络连接失败！";
                    $scope.timenoreasontime = $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                }
            }else{
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "您无此操作权限！";
                $scope.timersfreasonload = $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }
        };
        //点击断油or电
        $scope.oiloffclick = function () {
            if(registerService.authorityControl(10) == "1"){
                $scope.breakPowerObj = {
                    termId:Number($window.sessionStorage.getItem("UtermId")),
                    userCellPhone:Number($window.sessionStorage.getItem("Ucp")),
                    appSN:parseInt(Number(new Date().getTime())/1000),
                    mod: $scope.oiltdyes?1:0
                };
                $scope.loadapp = {"toggle":true};
                try{
                    registerService.breakPower($scope.breakPowerObj).then(
                        function(e){
                            $scope.loadapp = {"toggle": false };
                            if(e.status == true){
                                if(e.content.result == 0){
                                    $scope.hahaapp= {"toggle":true};
                                    $scope.submithappy = "恭喜您，设置成功！";
                                    $scope.oiltdyes = !$scope.oiltdyes;
                                    $scope.oiltdno = !$scope.oiltdno;
                                    $scope.timehaftime = $timeout(function(){
                                        $scope.hahaapp= {"toggle":false};
                                    },2000);
                                }
                            }else {
                                $scope.subapp= {"toggle":true};
                                $scope.submitWarning = e.err+"！";
                                $scope.timenoreasontime = $timeout(function(){
                                    $scope.subapp= {"toggle":false};
                                },2000);
                            }

                        },
                        function (e) {
                            console.log("error:",e)
                            $scope.loadapp = {"toggle": false };
                            $scope.subapp= {"toggle":true};
                            $scope.submitWarning = e.err+"！";
                            $scope.timenoreasontime = $timeout(function(){
                                $scope.subapp= {"toggle":false};
                            },2000);
                        }
                    );
                }catch (err){
                    $scope.loadapp = {"toggle": false };
                    $scope.subapp= {"toggle":true};
                    $scope.submitWarning = "网络连接失败！";
                    $scope.timenoreasontime = $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                }
                console.log("断油");
            }else{
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "您无此操作权限！";
                $scope.timersfreasonload = $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }

        };
        //开or关灯
        $scope.lightoffclick = function () {
            console.log(registerService.authorityControl(9));
            if(registerService.authorityControl(9) == "1"){
                console.log("here??");
                $scope.controlLightObj = {
                    termId:Number($window.sessionStorage.getItem("UtermId")),
                    userCellPhone:Number($window.sessionStorage.getItem("Ucp")),
                    appSN:parseInt(Number(new Date().getTime())/1000),
                    mod: $scope.lighttdyes?1:0
                };
                $scope.loadapp = {"toggle":true};
                try{
                    registerService.controlLight($scope.controlLightObj).then(
                        function(e){
                            console.log("success:",e)
                            $scope.loadapp = {"toggle": false };
                            if(e.status == true){
                                if(e.content.result == 0){
                                    $scope.hahaapp= {"toggle":true};
                                    $scope.submithappy = "恭喜您，设置成功！";
                                    $scope.lighttdyes = !$scope.lighttdyes;
                                    $scope.lighttdno = !$scope.lighttdno;
                                    $scope.timehaftime = $timeout(function(){
                                        $scope.hahaapp= {"toggle":false};
                                    },2000);
                                }
                            }else {
                                $scope.subapp= {"toggle":true};
                                $scope.submitWarning = e.err+"！";
                                $scope.timenoreasontime = $timeout(function(){
                                    $scope.subapp= {"toggle":false};
                                },2000);
                            }

                        },
                        function (e) {
                            console.log("error:",e);
                            $scope.loadapp = {"toggle": false };
                            $scope.subapp= {"toggle":true};
                            $scope.submitWarning = e.err+"！";
                            $scope.timenoreasontime = $timeout(function(){
                                $scope.subapp= {"toggle":false};
                            },2000);
                        }
                    );
                }catch (err){
                    console.log("err:",err);
                    $scope.loadapp = {"toggle": false };
                    $scope.subapp= {"toggle":true};
                    $scope.submitWarning = "网络连接失败！";
                    $scope.timenoreasontime = $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                }
                console.log("亮灯")
            }else{
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "您无此操作权限！";
                $scope.timersfreasonload = $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }
        }

    })
    //用车记录
    .controller("cartripController",function($scope,$rootScope,$state,registerService,$interval,$window,$timeout,$location , a ,b ){

        $scope.timerss = $timeout(function(){
            registerService.datecommon();
        },50);
        $scope.dateinputdis = true;
        $rootScope.colorfff2 = true;
        $rootScope.coloryyy2 = false;

        //返回按钮
        $scope.searchPassBackBtn = function(){
            window.history.go(-1);
        };
        $scope._top=(parseFloat($rootScope.windoWHeihgt) - 200)/2 +"px";

        console.log($scope._top);
        $scope.modelpositionSt = {
            "top":$scope._top
        };
        //$scope.windoWHeihgt = ($(window).height())*1+"px";
        $scope.winHeight = {
            "height":$rootScope.windoWHeihgt
        };


        $scope.$watch("ostartTimes",  function(newValue, oldValue) {
            console.log(22226626266,newValue, oldValue);
            console.log("出现吧");
            if (newValue === oldValue){
                //return;
            }else {
                $scope.lastdateinfo = null;
                $scope.notripcontent = true;//无行程
                $scope.clickonload = false;//点击加载
                $scope.cartriploading = true;//加载中
                $scope.thelastpagecartripover =true ;//加载完全
                $scope.clickandaddloads = true;//继续加载
            }
        });
        $scope.$watch('overTimes',  function(newValue, oldValue) {
            console.log("出现吧");
            if (newValue === oldValue){
                //return;
            }else {
                $scope.lastdateinfo = null;
                $scope.notripcontent = true;//无行程
                $scope.clickonload = false;//点击加载
                $scope.cartriploading = true;//加载中
                $scope.thelastpagecartripover =true ;//加载完全
                $scope.clickandaddloads = true;//继续加载
                $scope.startDate="";
                $scope.endDate="";
                // $scope.changedatebtnsearch();
            }
        });
        //console.log(registerService.getcurrentTime);
        $scope.currentdate = new Date();
        //当天的行程
        $scope.nocartrip = false;
        $scope.havecartrip = true;
        //table的四种情况
        $scope.clickonloadtoday = true;//点击加载
        $scope.cartriploadingtoday = false;//努力加载中...
        $scope.thelastpagecartripovertoday = true;//加载完全
        $scope.clickandaddloadstoday = true;//点击继续加载

        $scope.isandload = false;
        $scope.todayF = function (){
            //$scope.timertoday = $timeout(function(){
            //    $rootScope.todaytripinfo = null;
            //},1);
            $scope.todayandloaddis = true; //继续加载不可点击
            $scope.loadapp = {"toggle":true};
            $scope.todaytripstarttimehs = new Date().getTime();
            registerService.commonUser($scope.todaytripObj,$scope.todaytripUrl).then(function(e){
                $scope.timersloadapp = $timeout(function(){
                    $scope.loadapp = {"toggle":false};
                    if(e.status == true){
                        console.log(e);

                        if(e.content.currentSize != 0){
                            $scope.nocartrip = false;
                            $scope.havecartrip = true;
                            $scope.todaytripPage ++;

                            if(e.content.currentPage == e.content.totalPages-1){
                                //table的四种情况
                                $scope.clickonloadtoday = true;//点击加载
                                $scope.cartriploadingtoday = true;//努力加载中...
                                $scope.thelastpagecartripovertoday = false;//加载完全
                                $scope.clickandaddloadstoday = true;//点击继续加载
                            }else{
                                //table的四种情况
                                $scope.clickonloadtoday = true;//点击加载
                                $scope.cartriploadingtoday =true ;//努力加载中...
                                $scope.thelastpagecartripovertoday = true;//加载完全
                                $scope.clickandaddloadstoday = false;//点击继续加载
                            }
                            for(var i in e.content.trips){
                                e.content.trips[i].startAddresscontent = "正在解析！";
                                e.content.trips[i].endAddresscontent = "正在解析！";
                            }
                            if($scope.todaytripPage ==1){
                                $scope.$apply(function () {
                                    $scope.todaytripinfo = e.content.trips
                                });

                            }
                            //;
                            var j = 0;
                            $scope.starttransloc = function(){
                                //console.log("e.content.trips:"+e.content.trips);
                                var lnglatXY =[e.content.trips[j].fireOnLng,e.content.trips[j].fireOnLat];
                                var endlnglatXY = [e.content.trips[j].fireOffLng,e.content.trips[j].fireOffLat];
                                try {
                                    var lngnum = new AMap.LngLat(e.content.trips[j].fireOnLng,e.content.trips[j].fireOnLat);
                                    var latnum =new AMap.LngLat(e.content.trips[j].fireOffLng,e.content.trips[j].fireOffLat);
                                    $scope.initfalseapp= {"toggle":false};
                                }catch (err){
                                    $scope.initfalseapp= {"toggle":true};
                                    //$scope.subapp= {"toggle":true};

                                    $scope.goSubmitPage= function(){
                                        $state.go("submits");
                                        $scope.initfalseapp= {"toggle":false};
                                    };
                                    $scope.gomainhomePage = function(){
                                        $state.go("mains.home");
                                        $scope.initfalseapp= {"toggle":false};
                                    }
                                }

                                if(e.content.trips[j].fireOnTime){
                                    e.content.trips[j].starttime = registerService.coverdate(e.content.trips[j].fireOnTime);
                                }else{
                                    e.content.trips[j].starttime = "未获取到数据"
                                }

                                console.log(endlnglatXY);
                                if(e.content.trips[j].fireOffTime){
                                    e.content.trips[j].endtime = registerService.coverdate(e.content.trips[j].fireOffTime);
                                    console.log("时间这块啊，当前报错报错的地方啊："+j)

                                }else{
                                    e.content.trips[j].endtime = "未获取到数据"
                                }
                                //console.log(result.locations[0]);


                                if(e.content.trips[j].fireOnLat != 0 && e.content.trips[j].fireOffLat != 0){
                                    AMap.convertFrom([lngnum,latnum],"gps",function(status,result){
                                        console.log("todayresult;"+JSON.stringify(result));
                                        function geocodefunallhave(){
                                            AMap.service('AMap.Geocoder',function() {
                                                $scope.startwarningadd = new AMap.Geocoder({});
                                                $scope.startwarningadd.getAddress([lngnumstart, latnumend], function (status, result) {
                                                    //console.log("run here:",result,status);
                                                    console.log("lngnumstart, latnumend:"+lngnumstart, latnumend);
                                                    //console.log("result:"+JSON.stringify(result));
                                                    if (status === 'complete' && result.info === 'OK') {

                                                        if (result.regeocodes[0].formattedAddress) {
                                                            $scope.todayaddressa = result.regeocodes[0].formattedAddress+"附近";
                                                            console.log("为什么突然报错啊："+$scope.todayaddressa,j);
                                                            e.content.trips[j].startAddresscontent = $scope.todayaddressa;
                                                        } else {
                                                            $scope.todayaddressa = "获取地址失败";
                                                            console.log("获取位置fir：1");
                                                            //console.log("失败:",$scope.todayaddressa,e.content.trips,j)
                                                            e.content.trips[j].startAddresscontent = $scope.todayaddressa;
                                                        }
                                                        if (result.regeocodes[1].formattedAddress) {
                                                            $scope.endaddressa = result.regeocodes[1].formattedAddress+"附近";
                                                            e.content.trips[j].endAddresscontent = $scope.endaddressa;
                                                        } else {
                                                            $scope.todayaddressa = "获取地址失败";
                                                            console.log("获取位置fir：2");
                                                            //console.log("失败:",$scope.todayaddressa,e.content.trips,j)
                                                            e.content.trips[j].endAddresscontent = $scope.todayaddressa;
                                                        }
                                                        if($scope.todaytripPage ==1){

                                                            $scope.$apply(function () {
                                                                $scope.todaytripinfo[j]=e.content.trips[j];
                                                            });
                                                            j++;
                                                            console.log("头大的j上面的："+j);
                                                            if (j < e.content.trips.length) {
                                                                $scope.starttransloc();
                                                                console.log(j);
                                                                console.log("头大的j上面的，要循环了："+j);
                                                            } else {
                                                                $scope.todayandloaddis = false; //继续加载可点击
                                                                console.log("终于结束了头大的j上面的："+j);
                                                                //$scope.$apply(function () {
                                                                //    $rootScope.todaytripinfo = e.content.trips;
                                                                //});
                                                            }
                                                        }else {
                                                            //$scope.timetodayloadfuzhitimea = $timeout(function(){
                                                                $scope.todaytripinfo.push(e.content.trips[j]);
                                                                j++;
                                                                console.log("头大的j上面的："+j);
                                                                if (j < e.content.trips.length) {
                                                                    $scope.starttransloc();
                                                                    console.log(j);
                                                                    console.log("头大的j上面的，要循环了："+j);
                                                                } else {
                                                                    $scope.todayandloaddis = false; //继续加载可点击
                                                                    console.log("终于结束了头大的j上面的："+j);
                                                                    //$scope.$apply(function () {
                                                                    //    $rootScope.todaytripinfo = e.content.trips;
                                                                    //});
                                                                }
                                                            //},20)

                                                        }

                                                        //$scope.$apply(function () {
                                                        //    $rootScope.todaytripinfo = e.content.trips;
                                                        //});

                                                    } else {

                                                        $scope.todayaddressa = "获取地址失败";

                                                        e.content.trips[j].startAddresscontent = $scope.todayaddressa;
                                                        e.content.trips[j].endAddresscontent = $scope.todayaddressa;
                                                        //$rootScope.todaytripinfo.push(e.content.trips[j]);
                                                        if($scope.todaytripPage ==1){
                                                            $scope.$apply(function () {
                                                                $scope.todaytripinfo[j]=e.content.trips[j];
                                                            });
                                                            j++;
                                                            console.log("头大的j上面的："+j);
                                                            if (j < e.content.trips.length) {
                                                                $scope.starttransloc();
                                                                console.log(j);
                                                                console.log("头大的j上面的，要循环了："+j);
                                                            } else {
                                                                $scope.todayandloaddis = false; //继续加载可点击
                                                                console.log("终于结束了头大的j上面的："+j);
                                                                //$scope.$apply(function () {
                                                                //    $rootScope.todaytripinfo = e.content.trips;
                                                                //});
                                                            }
                                                        }else {
                                                            //$scope.timetodayloadfuzhitimea = $timeout(function(){
                                                                $scope.todaytripinfo.push(e.content.trips[j]);
                                                                j++;
                                                                console.log("头大的j上面的："+j);
                                                                if (j < e.content.trips.length) {
                                                                    $scope.starttransloc();
                                                                    console.log(j);
                                                                    console.log("头大的j上面的，要循环了："+j);
                                                                } else {
                                                                    $scope.todayandloaddis = false; //继续加载可点击
                                                                    console.log("终于结束了头大的j上面的："+j);
                                                                    //$scope.$apply(function () {
                                                                    //    $rootScope.todaytripinfo = e.content.trips;
                                                                    //});
                                                                }
                                                            //},20)

                                                        }
                                                    }

                                                });
                                            });
                                        }
                                        if (result.info === 'ok') {
                                            var lngnumstart = result.locations[0];
                                            var latnumend = result.locations[1];
                                            console.log("赋值成功");
                                            geocodefunallhave()
                                        }else {
                                            var lngnumstart = lngnum;
                                            var latnumend = latnum;
                                            console.log("赋值失败");
                                            geocodefunallhave()
                                        }
                                    });
                                }else if(e.content.trips[j].fireOnLat == 0 && e.content.trips[j].fireOffLat == 0) {
                                    e.content.trips[j].startAddresscontent = "获取地址失败";
                                    e.content.trips[j].endAddresscontent = "获取地址失败";
                                    if($scope.todaytripPage ==1){
                                        $scope.$apply(function () {
                                            $scope.todaytripinfo[j]=e.content.trips[j];
                                        });
                                        j++;
                                        console.log("头大的j上面的："+j);
                                        if (j < e.content.trips.length) {
                                            $scope.starttransloc();
                                            console.log(j);
                                            console.log("头大的j上面的，要循环了："+j);
                                        } else {
                                            $scope.todayandloaddis = false; //继续加载可点击
                                            console.log("终于结束了头大的j上面的："+j);
                                            //$scope.$apply(function () {
                                            //    $rootScope.todaytripinfo = e.content.trips;
                                            //});
                                        }
                                    }else {
                                        //$scope.timetodayloadfuzhitimea = $timeout(function(){
                                            $scope.todaytripinfo.push(e.content.trips[j]);
                                            j++;
                                            console.log("头大的j上面的："+j);
                                            if (j < e.content.trips.length) {
                                                $scope.starttransloc();
                                                console.log(j);
                                                console.log("头大的j上面的，要循环了："+j);
                                            } else {
                                                $scope.todayandloaddis = false; //继续加载可点击
                                                console.log("终于结束了头大的j上面的："+j);
                                                //$scope.$apply(function () {
                                                //    $rootScope.todaytripinfo = e.content.trips;
                                                //});
                                            }
                                        //},20)

                                    }
                                    //$scope.$apply(function () {
                                    //    $rootScope.todaytripinfo = e.content.trips;
                                    //});

                                }else if(e.content.trips[j].fireOnLat == 0){
                                    e.content.trips[j].startAddresscontent = "获取地址失败";
                                    console.log("实现吧");


                                    AMap.convertFrom(latnum,"gps",function(status,result){
                                        console.log("todayresult;"+JSON.stringify(result));
                                        function endlatgpscover(){
                                            console.log("呜呜呜呜")
                                            AMap.service('AMap.Geocoder',function() {
                                                console.log("绝望啊");
                                                $scope.startwarningadd = new AMap.Geocoder({});
                                                $scope.startwarningadd.getAddress(latnumend, function (status, result) {
                                                    console.log("为神魔不执行啊");
                                                    console.log("run here哎哎哎:",result,status);
                                                    //console.log("result:"+JSON.stringify(result));
                                                    if (status === 'complete' && result.info === 'OK') {

                                                        $scope.endaddressa = result.regeocode.formattedAddress+"附近";
                                                        e.content.trips[j].endAddresscontent = $scope.endaddressa;
                                                        if($scope.todaytripPage ==1){
                                                            $scope.$apply(function () {
                                                                $scope.todaytripinfo[j]=e.content.trips[j];
                                                            });
                                                            j++;
                                                            console.log("头大的j上面的："+j);
                                                            if (j < e.content.trips.length) {
                                                                $scope.starttransloc();
                                                                console.log(j);
                                                                console.log("头大的j上面的，要循环了："+j);
                                                            } else {
                                                                $scope.todayandloaddis = false; //继续加载可点击
                                                                console.log("终于结束了头大的j上面的："+j);
                                                                //$scope.$apply(function () {
                                                                //    $rootScope.todaytripinfo = e.content.trips;
                                                                //});
                                                            }
                                                        }else {
                                                            //$scope.timetodayloadfuzhitimea = $timeout(function(){
                                                                $scope.todaytripinfo.push(e.content.trips[j]);
                                                                j++;
                                                                console.log("头大的j上面的："+j);
                                                                if (j < e.content.trips.length) {
                                                                    $scope.starttransloc();
                                                                    console.log(j);
                                                                    console.log("头大的j上面的，要循环了："+j);
                                                                } else {
                                                                    $scope.todayandloaddis = false; //继续加载可点击
                                                                    console.log("终于结束了头大的j上面的："+j);
                                                                    //$scope.$apply(function () {
                                                                    //    $rootScope.todaytripinfo = e.content.trips;
                                                                    //});
                                                                }
                                                            //},20)

                                                        }
                                                    } else {

                                                        $scope.todayaddressa = "获取地址失败";

                                                        //e.content.trips[j].startAddresscontent = $scope.todayaddressa;
                                                        e.content.trips[j].endAddresscontent = $scope.todayaddressa;
                                                        if($scope.todaytripPage ==1){
                                                            $scope.$apply(function () {
                                                                $scope.todaytripinfo[j]=e.content.trips[j];
                                                            });
                                                            j++;
                                                            console.log("头大的j上面的："+j);
                                                            if (j < e.content.trips.length) {
                                                                $scope.starttransloc();
                                                                console.log(j);
                                                                console.log("头大的j上面的，要循环了："+j);
                                                            } else {
                                                                $scope.todayandloaddis = false; //继续加载可点击
                                                                console.log("终于结束了头大的j上面的："+j);
                                                                //$scope.$apply(function () {
                                                                //    $rootScope.todaytripinfo = e.content.trips;
                                                                //});
                                                            }
                                                        }else {
                                                            //$scope.timetodayloadfuzhitimea = $timeout(function(){
                                                                $scope.todaytripinfo.push(e.content.trips[j]);
                                                                j++;
                                                                console.log("头大的j上面的："+j);
                                                                if (j < e.content.trips.length) {
                                                                    $scope.starttransloc();
                                                                    console.log(j);
                                                                    console.log("头大的j上面的，要循环了："+j);
                                                                } else {
                                                                    $scope.todayandloaddis = false; //继续加载可点击
                                                                    console.log("终于结束了头大的j上面的："+j);
                                                                    //$scope.$apply(function () {
                                                                    //    $rootScope.todaytripinfo = e.content.trips;
                                                                    //});
                                                                }
                                                            //},20)

                                                        }
                                                    }
                                                    //$scope.$apply(function () {
                                                    //    $rootScope.todaytripinfo = e.content.trips;
                                                    //});
                                                });
                                            });
                                        }
                                        if ( result.info === 'ok') {
                                            //var lngnumstart = result.locations[0];
                                            var latnumend = result.locations[0];
                                            console.log("赋值成功");
                                            endlatgpscover()
                                        }else {
                                            //var lngnumstart = lngnum;
                                            var latnumend = latnum;
                                            endlatgpscover();
                                            console.log("赋值失败");
                                        }
                                    });
                                }else if(e.content.trips[j].fireOffLat==0){
                                    e.content.trips[j].endAddresscontent = "获取地址失败";


                                    AMap.convertFrom(lngnum,"gps",function(status,result){
                                        console.log("todayresult;"+JSON.stringify(result));
                                        function startgpscoverff(){
                                            AMap.service('AMap.Geocoder',function() {
                                                $scope.startwarningadd = new AMap.Geocoder({});
                                                $scope.startwarningadd.getAddress(lngnumstart, function (status, result) {

                                                    //console.log("run here:",result,status);
                                                    //console.log("result:"+JSON.stringify(result));
                                                    if (status === 'complete' && result.info === 'OK') {
                                                        $scope.todayaddressa = result.regeocode.formattedAddress+"附近";
                                                        e.content.trips[j].startAddresscontent = $scope.todayaddressa;
                                                        if($scope.todaytripPage ==1){
                                                            $scope.$apply(function () {
                                                                $scope.todaytripinfo[j]=e.content.trips[j];
                                                            });
                                                            j++;
                                                            console.log("头大的j上面的："+j);
                                                            if (j < e.content.trips.length) {
                                                                $scope.starttransloc();
                                                                console.log(j);
                                                                console.log("头大的j上面的，要循环了："+j);
                                                            } else {
                                                                $scope.todayandloaddis = false; //继续加载可点击
                                                                console.log("终于结束了头大的j上面的："+j);
                                                                //$scope.$apply(function () {
                                                                //    $rootScope.todaytripinfo = e.content.trips;
                                                                //});
                                                            }
                                                        }else {
                                                            //$scope.timetodayloadfuzhitimea = $timeout(function(){
                                                                $scope.todaytripinfo.push(e.content.trips[j]);
                                                                j++;
                                                                console.log("头大的j上面的："+j);
                                                                if (j < e.content.trips.length) {
                                                                    $scope.starttransloc();
                                                                    console.log(j);
                                                                    console.log("头大的j上面的，要循环了："+j);
                                                                } else {
                                                                    $scope.todayandloaddis = false; //继续加载可点击
                                                                    console.log("终于结束了头大的j上面的："+j);
                                                                    //$scope.$apply(function () {
                                                                    //    $rootScope.todaytripinfo = e.content.trips;
                                                                    //});
                                                                }
                                                            //},20)

                                                        }
                                                    } else {
                                                        $scope.todayaddressa = "获取地址失败";
                                                        e.content.trips[j].startAddresscontent = $scope.todayaddressa;
                                                        if($scope.todaytripPage ==1){
                                                            $scope.$apply(function () {
                                                                $scope.todaytripinfo[j]=e.content.trips[j];
                                                            });
                                                            j++;
                                                            console.log("头大的j上面的："+j);
                                                            if (j < e.content.trips.length) {
                                                                $scope.starttransloc();
                                                                console.log(j);
                                                                console.log("头大的j上面的，要循环了："+j);
                                                            } else {
                                                                $scope.todayandloaddis = false; //继续加载可点击
                                                                console.log("终于结束了头大的j上面的："+j);
                                                                //$scope.$apply(function () {
                                                                //    $rootScope.todaytripinfo = e.content.trips;
                                                                //});
                                                            }
                                                        }else {
                                                            //$scope.timetodayloadfuzhitimea = $timeout(function(){
                                                                $scope.todaytripinfo.push(e.content.trips[j]);
                                                                j++;
                                                                console.log("头大的j上面的："+j);
                                                                if (j < e.content.trips.length) {
                                                                    $scope.starttransloc();
                                                                    console.log(j);
                                                                    console.log("头大的j上面的，要循环了："+j);
                                                                } else {
                                                                    $scope.todayandloaddis = false; //继续加载可点击
                                                                    console.log("终于结束了头大的j上面的："+j);
                                                                    //$scope.$apply(function () {
                                                                    //    $rootScope.todaytripinfo = e.content.trips;
                                                                    //});
                                                                }
                                                            //},20)

                                                        }
                                                    }
                                                    //$scope.$apply(function () {
                                                    //    $rootScope.todaytripinfo = e.content.trips;
                                                    //});
                                                });
                                            });
                                        }
                                        if (result.info === 'ok') {
                                            var lngnumstart = result.locations[0];
                                            //var latnumend = result.locations[0];
                                            console.log("赋值成功");
                                            startgpscoverff()
                                        }else {
                                            var lngnumstart = lngnum;
                                            //var latnumend = latnum;
                                            startgpscoverff();
                                            console.log("赋值失败");
                                        }
                                    });
                                }


                                console.log(lnglatXY);
                                console.log(lnglatXY,endlnglatXY)
                            };
                            $scope.starttransloc();
                        }else{
                            $scope.nocartrip = true;
                            $scope.havecartrip = false;
                        }


                    }else{
                        //table的四种情况
                        if($scope.isandload == false){
                            $scope.clickonloadtoday = false;//点击加载
                            $scope.cartriploadingtoday = true;//努力加载中...
                            $scope.thelastpagecartripovertoday = true;//加载完全
                            $scope.clickandaddloadstoday = true;//点击继续加载
                        }else {
                            $scope.clickonloadtoday =true ;//点击加载
                            $scope.cartriploadingtoday = true;//努力加载中...
                            $scope.thelastpagecartripovertoday = true;//加载完全
                            $scope.clickandaddloadstoday =false ;//点击继续加载
                        }
                        $scope.todayandloaddis = false; //继续加载可点击
                        $scope.subapp= {"toggle":true};
                        $scope.submitWarning = e.err+"！";
                        $scope.timersstodayerrson = $timeout(function(){
                            $scope.subapp= {"toggle":false};
                        },2000);
                    }
                },500);

            },function(err){
                //table的四种情况
                if($scope.isandload == false){
                    $scope.clickonloadtoday = false;//点击加载
                    $scope.cartriploadingtoday = true;//努力加载中...
                    $scope.thelastpagecartripovertoday = true;//加载完全
                    $scope.clickandaddloadstoday = true;//点击继续加载
                }else {
                    $scope.clickonloadtoday =true ;//点击加载
                    $scope.cartriploadingtoday = true;//努力加载中...
                    $scope.thelastpagecartripovertoday = true;//加载完全
                    $scope.clickandaddloadstoday =false ;//点击继续加载
                }

                $scope.todayandloaddis = false; //继续加载可点击
                $scope.loadapp = {"toggle":false};
                $scope.subapp= {"toggle":true};
                $scope.todaytripendtimehs = new Date().getTime();
                console.log("请求时间差："+$scope.todaytripendtimehs - $scope.todaytripstarttimehs);
                if($scope.todaytripendtimehs - $scope.todaytripstarttimehs>=6500){
                    $scope.submitWarning = "请求超时！";
                }else {
                    $scope.submitWarning = "网络连接失败！";
                }
                //$rootScope.submitWarning = "网络连接失败！";
                $scope.timeerrtodayapp = $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            });
        };
        var getcurrent = registerService.getTimems();

        //var todaytripObj = {
        //    termId:Number($window.sessionStorage.getItem("UtermId")),
        //    //startTime:20161113000000,
        //    //endTime:20161122235959
        //    startTime:Number(new Date(getcurrent+" 00:00:00").getTime()),
        //    endTime:Number(new Date(getcurrent+" 23:59:59").getTime()),
        //    pageIndex:$scope.todaytripPage,
        //    pageSize:3
        //};

        $scope.timeinittodaytrip = $timeout(function(){
            $rootScope.todaytripinfo = null;
            $scope.isandload = false;
            $scope.todaytripPage = 0;
            $scope.todaytripObj = {
                termId:Number($window.sessionStorage.getItem("UtermId")),
                //startTime:20161113000000,
                //endTime:20161122235959
                startTime:Number(new Date(registerService.getdatestrnochinese(0)+" 00:00:00").getTime()),
                endTime:Number(new Date(registerService.getdatestrnochinese(0)+" 23:59:59").getTime()),
                pageIndex:$scope.todaytripPage,
                pageSize:3
            };
            $scope.todaytripUrl = "/rest/trips/period/";
            $scope.todayF();
        },2);
        $scope.clicktodaytripOnload = function(){
            $scope.currentdatebtn();
        };
        $scope.currentdatebtn = function(){
            $scope.timetodaybtnfir = $timeout(function(){
                $scope.isandload = false;
                $rootScope.todaytripinfo = null;
                $scope.todaytripPage = 0;
                $scope.todaytripObj = {
                    termId:Number($window.sessionStorage.getItem("UtermId")),
                    //startTime:20161113000000,
                    //endTime:20161122235959
                    startTime:Number(new Date(registerService.getdatestrnochinese(0)+" 00:00:00").getTime()),
                    endTime:Number(new Date(registerService.getdatestrnochinese(0)+" 23:59:59").getTime()),
                    pageIndex:$scope.todaytripPage,
                    pageSize:3
                };
                $scope.todaytripUrl = "/rest/trips/period/";
                $scope.todayF();
            },2);

        };
        //today点击继续加载
        $scope.clickAddtodayTriponload= function(){
            $scope.isandload = true;
            $scope.todaytripObj = {
                termId:Number($window.sessionStorage.getItem("UtermId")),
                //startTime:20161113000000,
                //endTime:20161122235959
                startTime:Number(new Date(registerService.getdatestrnochinese(0)+" 00:00:00").getTime()),
                endTime:Number(new Date(registerService.getdatestrnochinese(0)+" 23:59:59").getTime()),
                pageIndex:$scope.todaytripPage,
                pageSize:3
            };
            $scope.todaytripUrl = "/rest/trips/period/";
            $scope.todayF();
        }
        //前一天的行程
        $scope.ostartTimes = registerService.getdatestr(-2);
        $scope.overTimes = registerService.getdatestr(-1);
        console.log(a , b);
        if(a && b){

            $scope.ostartTimes = $rootScope.tripstartTime;
            $scope.overTimes =  $rootScope.tripoverTime;
        }
        console.log($scope.ostartTimes , $scope.overTimes);
        //四种样式

        $scope.normaldianlastdontdate = true;
        $scope.agadianlastdontdate = true;
        $scope.sbdianlastdontdate = true;
        $scope.moresbdianlastdontdate = true;
        //$scope.dateyeardisnone = true;
        $scope.ajaxstarttime = $scope.ostartTimes.replace('-','/').replace('-','/');
        $scope.ajaxendtime = $scope.overTimes.replace('-','/').replace('-','/');
        console.log($scope.ajaxstarttime);
        //初始的时候table这块，，四种样式
        $scope.notripcontent = true;//无行程
        $scope.clickonload = true;//点击加载
        $scope.cartriploading = true;//加载中
        $scope.thelastpagecartripover = true;//加载完全
        $scope.clickandaddloads = true;//继续加载
        $scope.islastandload = false;
        $scope.lastdatepage = 0;
        //console.log("报错结束的日期:"+new Date(1481729098000));
        //console.log("报错开始的日期:"+new Date(1481728966000));
        //$scope.infoclassnone = false;
        $scope.lastdateinfo = null;

        $scope.lasttripUrl = "/rest/trips/period/";
        //$rootScope.lastdateinfo = null;
        $scope.lastdate = function(){
            $scope.lastandloadtripdis= true;//last的行程不可点击
            $scope.notripcontent = true;//无行程
            $scope.clickonload = true;//点击加载
            $scope.cartriploading = false;//加载中
            $scope.thelastpagecartripover = true;//加载完全
            $scope.clickandaddloads = true;//继续加载
            if($scope.infoclassnone == 0){
                $scope.infoclassnone = true;
            }
            $scope.loadapp = {"toggle":true};
            var j = 0;
            console.log($scope.ajaxstarttime,$scope.ajaxendtime);
            $scope.lasttripstarttimehs = new Date().getTime();
            registerService.commonUser($scope.lasttripObj,$scope.lasttripUrl).then(function(e){
                $scope.timerrlastloadtime = $timeout(function(){
                    $scope.loadapp = {"toggle":false};
                    if(e.status == true){
                        $scope.lastpagenumbera ++;
                        console.log("页码："+$scope.lastpagenumbera);
                        console.log(e);
                        console.log(e.content.trips.length);
                        //$scope.lastdatepage ++;
                            if(e.content.currentSize !=0){
                                console.log("有数据");
                                //table的样式 是否最后一页
                                //$rootScope.tripmaplatlng = e.content.trips;
                                if(e.content.currentPage == e.content.totalPages-1){
                                    $scope.notripcontent = true;//无行程
                                    $scope.clickonload = true;//点击加载
                                    $scope.cartriploading = true;//加载中
                                    $scope.thelastpagecartripover = false;//加载完全
                                    $scope.clickandaddloads = true;//继续加载
                                }else{
                                    $scope.notripcontent = true;//无行程
                                    $scope.clickonload = true;//点击加载
                                    $scope.cartriploading = true;//加载中
                                    $scope.thelastpagecartripover =true ;//加载完全
                                    $scope.clickandaddloads =false ;//继续加载
                                }
                                for(var i in e.content.trips){
                                    e.content.trips[i].startpoint = "正在解析！";
                                    e.content.trips[i].endpoint = "正在解析！";
                                }
                                $scope.lastdateinfo = e.content.trips;

                                console.log($scope.lastdateinfo);
                                j = 0;
                                //$scope.dituiditui = false;
                                $scope.laststarttransloc = function (){

                                    console.log("看看这个是多少啊j："+j);
                                    var lnglatXY =[e.content.trips[j].fireOnLng,e.content.trips[j].fireOnLat];
                                    var coverdatestart = registerService.coverdateyear(e.content.trips[j].fireOnTime);
                                    var coverdateend = registerService.coverdateyear(e.content.trips[j].fireOffTime);
                                    var endlnglatXY = [e.content.trips[j].fireOffLng,e.content.trips[j].fireOffLat];
                                    try {
                                        var lngnum = new AMap.LngLat(e.content.trips[j].fireOnLng,e.content.trips[j].fireOnLat);
                                        var latnum =new AMap.LngLat(e.content.trips[j].fireOffLng,e.content.trips[j].fireOffLat);
                                        console.log(lngnum,latnum);
                                        $scope.initfalseapp= {"toggle":false};
                                    }
                                    catch(err) {
                                        $scope.initfalseapp= {"toggle":true};
                                        //$scope.subapp= {"toggle":true};

                                        $scope.goSubmitPage= function(){
                                            $state.go("submits");
                                            $scope.initfalseapp= {"toggle":false};
                                        };
                                        $scope.gomainhomePage = function(){
                                            $state.go("mains.home");
                                            $scope.initfalseapp= {"toggle":false};
                                        }
                                        $scope.notripcontent = true;//无行程
                                        $scope.clickonload = true;//点击加载
                                        $scope.cartriploading =false ;//加载中
                                        $scope.thelastpagecartripover =true ;//加载完全
                                        $scope.clickandaddloads = true;//继续加载
                                    }
                                    function sbfunction(){
                                        if(e.content.trips[j].fireOnLat != 0 && e.content.trips[j].fireOffLat!=0){
                                            //console.log(j,e.content.trips[j].fireOnLat);

                                            AMap.convertFrom([lngnum, latnum], "gps", function (status, result) {
                                                //console.log("现在测试的起点终点：" + lngnum, latnum)
                                                //console.log("现在是这个result：" + JSON.stringify(result));
                                                function allhavestartend() {
                                                    AMap.service('AMap.Geocoder', function () {
                                                        $scope.startwarningadd = new AMap.Geocoder({});
                                                        $scope.startwarningadd.getAddress([lngnumstart, latnumend], function (status, result) {
                                                            console.log("result:"+JSON.stringify(result));
                                                            if (status === 'complete' && result.info === 'OK') {

                                                                if (result.regeocodes[0].formattedAddress) {
                                                                    $scope.todayaddressa = result.regeocodes[0].formattedAddress+"附近";
                                                                    e.content.trips[j].startpoint = $scope.todayaddressa;
                                                                    //console.log("起点" + $scope.todayaddressa)
                                                                } else {
                                                                    $scope.todayaddressa = "获取地址失败";
                                                                    //console.log("获取位置fir：1");
                                                                    //console.log("失败:",$scope.todayaddressa,e.content.trips,j)
                                                                    e.content.trips[j].startpoint = $scope.todayaddressa;
                                                                }
                                                                if (result.regeocodes[1].formattedAddress) {
                                                                    $scope.endaddressa = result.regeocodes[1].formattedAddress+"附近";
                                                                    e.content.trips[j].endpoint = $scope.endaddressa;

                                                                } else {
                                                                    $scope.todayaddressa = "获取地址失败";
                                                                    //console.log("获取位置fir：2");
                                                                    //console.log("失败:",$scope.todayaddressa,e.content.trips,j)
                                                                    e.content.trips[j].endpoint = $scope.todayaddressa;
                                                                }
                                                                //console.log("开始结束都有的：" + j);


                                                                $scope.$apply(function () {
                                                                    $scope.lastdateinfo = e.content.trips;
                                                                });
                                                                j++;
                                                                //console.log(e.content.trips.length);
                                                                //console.log("开始结束都有的：" + j);
                                                                //if($scope.dituiditui){
                                                                //
                                                                //}else
                                                                if (j < e.content.trips.length) {
                                                                    console.log(99555555555,j,e.content.trips.length);
                                                                    $scope.laststarttransloc();
                                                                    //console.log("执行了啊j++", j)
                                                                } else {
                                                                    $scope.lastandloadtripdis= false;//last的行程可点击

                                                                };
                                                            } else {

                                                                $scope.todayaddressa = "获取地址失败";
                                                                e.content.trips[j].startpoint = $scope.todayaddressa;
                                                                e.content.trips[j].endpoint = $scope.todayaddressa;


                                                                $scope.$apply(function () {
                                                                    $scope.lastdateinfo = e.content.trips;
                                                                });


                                                                j++;
                                                                //if($scope.dituiditui){
                                                                //
                                                                //}else
                                                                if (j < e.content.trips.length) {
                                                                    console.log(222222222222222222,j,e.content.trips.length);
                                                                    $scope.laststarttransloc();
                                                                } else {
                                                                    $scope.lastandloadtripdis= false;//last的行程可点击

                                                                }
                                                            }
                                                            //$scope.$apply(function () {
                                                            //    $rootScope.lastdateinfo = e.content.trips;
                                                            //});
                                                        });
                                                    });
                                                }

                                                if (result.info === 'ok') {
                                                    var lngnumstart = result.locations[0];
                                                    var latnumend = result.locations[1];
                                                    allhavestartend();
                                                    console.log("last赋值成功了");
                                                } else {
                                                    var lngnumstart = lngnum;
                                                    var latnumend = latnum;
                                                    allhavestartend()
                                                }
                                            })


                                        }else if(e.content.trips[j].fireOnLat == 0 && e.content.trips[j].fireOffLat==0) {
                                            e.content.trips[j].startpoint = "获取地址失败";
                                            e.content.trips[j].endpoint = "获取地址失败";
                                            $scope.$apply(function () {
                                                $scope.lastdateinfo = e.content.trips;
                                            });
                                            console.log($scope.lastdateinfo[j]);
                                            j++;
                                            //if($scope.dituiditui){
                                            //
                                            //}else
                                            if(j < e.content.trips.length){
                                                console.log(999999999999999,j,e.content.trips.length);
                                                $scope.laststarttransloc();
                                            }else {
                                                $scope.lastandloadtripdis= false;//last的行程可点击

                                            }
                                            //$scope.$apply(function () {
                                            //    $rootScope.lastdateinfo = e.content.trips;
                                            //});

                                        }else if(e.content.trips[j].fireOnLat == 0){
                                            e.content.trips[j].startpoint = "获取地址失败";
                                            //console.log("实现吧");
                                            //$scope.startwarningadd = new AMap.Geocoder({
                                            //});


                                            AMap.convertFrom(latnum,"gps",function(status,result){
                                                //console.log("现在是这个result："+JSON.stringify(result));
                                                function latendcover(){
                                                    AMap.service('AMap.Geocoder',function() {
                                                        $scope.startwarningadd = new AMap.Geocoder({

                                                        });
                                                        $scope.startwarningadd.getAddress(latnumend, function (status, result) {
                                                            //console.log("latnumend:"+latnumend)
                                                            //console.log("run here:",result,status);
                                                            //console.log("result:"+JSON.stringify(result));
                                                            if (status === 'complete' && result.info === 'OK') {
                                                                $scope.endaddressa = result.regeocode.formattedAddress+"附近";
                                                                e.content.trips[j].endpoint = $scope.endaddressa;
                                                                $scope.$apply(function () {
                                                                    $scope.lastdateinfo = e.content.trips;
                                                                });
                                                                //console.log($scope.lastdateinfo[j]);
                                                                j++;
                                                                //if($scope.dituiditui){
                                                                //
                                                                //}else
                                                                if (j < e.content.trips.length) {
                                                                    $scope.laststarttransloc();
                                                                    console.log(33333333,j, e.content.trips.length)
                                                                } else {
                                                                    $scope.lastandloadtripdis= false;//last的行程可点击

                                                                }
                                                            } else {

                                                                $scope.todayaddressa = "获取地址失败";

                                                                //e.content.trips[j].startAddresscontent = $scope.todayaddressa;
                                                                e.content.trips[j].endpoint = $scope.todayaddressa;
                                                                $scope.$apply(function () {
                                                                    $scope.lastdateinfo = e.content.trips;
                                                                });
                                                                console.log($scope.lastdateinfo[j]);
                                                                j++;
                                                                //if($scope.dituiditui){
                                                                //
                                                                //}else
                                                                if (j < e.content.trips.length) {
                                                                    console.log(44444444444444,j, e.content.trips.length)
                                                                    $scope.laststarttransloc();
                                                                } else {
                                                                    $scope.lastandloadtripdis= false;//last的行程可点击

                                                                }
                                                            }
                                                            //$scope.$apply(function () {
                                                            //    $rootScope.lastdateinfo = e.content.trips;
                                                            //});
                                                        });
                                                    });
                                                }
                                                if ( result.info === 'ok') {
                                                    //var lngnumstart = result.locations[0];
                                                    var latnumend= result.locations[0];
                                                    latendcover()
                                                }else {
                                                    //var lngnumstart = lngnum;
                                                    var latnumend= latnum;
                                                    latendcover()
                                                }
                                            });
                                        }else if(e.content.trips[j].fireOffLat==0){
                                            e.content.trips[j].endpoint = "获取地址失败";
                                            //$scope.startwarningadd = new AMap.Geocoder({
                                            //});

                                            AMap.convertFrom(lngnum,"gps",function(status,result) {
                                                //console.log("现在是这个result：" + JSON.stringify(result));
                                                function startcoverlng(){
                                                    AMap.service('AMap.Geocoder',function() {
                                                        $scope.startwarningadd = new AMap.Geocoder({});
                                                        $scope.startwarningadd.getAddress(lngnumstart, function (status, result) {
                                                            //console.log("lngnumstart:"+lngnumstart);
                                                            //console.log("run here:",result,status);
                                                            //console.log("result:"+JSON.stringify(result));
                                                            if (status === 'complete' && result.info === 'OK') {
                                                                $scope.todayaddressa = result.regeocode.formattedAddress+"附近";
                                                                e.content.trips[j].startpoint = $scope.todayaddressa;

                                                                $scope.$apply(function () {
                                                                    $scope.lastdateinfo = e.content.trips;
                                                                });
                                                                //$scope.$apply(function () {
                                                                //    $rootScope.lastdateinfo = e.content.trips;
                                                                //});
                                                                console.log($scope.lastdateinfo[j]);
                                                                j++;
                                                                if (j < e.content.trips.length) {
                                                                    $scope.laststarttransloc();
                                                                } else {
                                                                    $scope.lastandloadtripdis= false;//last的行程可点击
                                                                }
                                                            } else {
                                                                $scope.todayaddressa = "获取地址失败";
                                                                e.content.trips[j].startpoint = $scope.todayaddressa;
                                                                $scope.$apply(function () {
                                                                    $scope.lastdateinfo = e.content.trips;
                                                                });
                                                                console.log($scope.lastdateinfo[j]);
                                                                j++;
                                                                //if($scope.dituiditui){
                                                                //
                                                                //}else
                                                                if (j < e.content.trips.length) {
                                                                    $scope.laststarttransloc();
                                                                } else {
                                                                    $scope.lastandloadtripdis= false;//last的行程可点击
                                                                }
                                                            }
                                                            //$scope.$apply(function () {
                                                            //    $rootScope.lastdateinfo = e.content.trips;
                                                            //});
                                                        });
                                                    });
                                                };
                                                if (result.info === 'ok') {
                                                    var lngnumstart = result.locations[0];
                                                    //var latnumend= result.locations[0];
                                                    startcoverlng()
                                                }else {
                                                    var lngnumstart = lngnum;
                                                    //var latnumend= latnum;
                                                    startcoverlng()
                                                }
                                            });

                                        }
                                    };
                                    if($scope.lastpagenumbera == 1) {
                                        console.log("看看这个吧是多少",j,registerService.coverdate(e.content.trips[j].fireOnTime))
                                        //第一页的数据
                                        //两种情况
                                        //console.log("开始结束date："+coverdatestart,coverdateend)
                                        if(j==0){
                                            console.log("j:"+j);
                                            if(coverdatestart == coverdateend){
                                                //第一种情况

                                                console.log("第一种情况");
                                                if(e.content.trips[j].fireOnTime !=0 && e.content.trips[j].fireOffTime !=0){
                                                    e.content.trips[j].fir={
                                                        laststarttime:registerService.coverdate(e.content.trips[j].fireOnTime),
                                                        starteventdate:coverdatestart,
                                                        chinesestart:"起点：",
                                                        chineseend:"终点：",
                                                        lastendtime:registerService.coverdate(e.content.trips[j].fireOffTime),
                                                        endeventdate:registerService.coverdateyear(e.content.trips[j].fireOffTime),
                                                        startpoint: $scope.todayaddressa,
                                                        endpoint: $scope.endaddressa,
                                                        pointpoint:"........."
                                                    };
                                                    //$scope.lastdateinfo = e.content.trips;
                                                    console.log("执行了");
                                                }else if(e.content.trips[j].fireOnTime==0 && e.content.trips[j].fireOffTime !=0){
                                                    e.content.trips[j].fir={
                                                        laststarttime:"无数据",
                                                        starteventdate:"无数据",
                                                        chinesestart:"起点：",
                                                        chineseend:"终点：",
                                                        lastendtime:registerService.coverdate(e.content.trips[j].fireOffTime),
                                                        endeventdate:registerService.coverdateyear(e.content.trips[j].fireOffTime),
                                                        startpoint: $scope.todayaddressa,
                                                        endpoint: $scope.endaddressa,
                                                        pointpoint:"........."
                                                    };
                                                    //$scope.lastdateinfo = e.content.trips;
                                                }else if(e.content.trips[j].fireOnTime!=0 && e.content.trips[j].fireOffTime ==0){
                                                    e.content.trips[j].fir={
                                                        laststarttime:registerService.coverdate(e.content.trips[j].fireOnTime),
                                                        starteventdate:coverdatestart,
                                                        chinesestart:"起点：",
                                                        chineseend:"终点：",
                                                        lastendtime:"无数据",
                                                        endeventdate:"无数据",
                                                        startpoint: $scope.todayaddressa,
                                                        endpoint: $scope.endaddressa,
                                                        pointpoint:"........."
                                                    };
                                                    //$scope.lastdateinfo = e.content.trips;
                                                }else{
                                                    e.content.trips[j].fir={
                                                        laststarttime:"无数据",
                                                        starteventdate:"无数据",
                                                        chinesestart:"起点：",
                                                        chineseend:"终点：",
                                                        lastendtime:"无数据",
                                                        endeventdate:"无数据",
                                                        startpoint: $scope.todayaddressa,
                                                        endpoint: $scope.endaddressa,
                                                        pointpoint:"........."
                                                    };
                                                    //$scope.lastdateinfo = e.content.trips;
                                                }
                                                sbfunction();
                                                //$scope.lastdateinfo = e.content.trips;
                                                //console.log($scope.lastdateinfo);
                                            }else{
                                                //第四种情况
                                                console.log("第四种情况");

                                                if(e.content.trips[j].fireOnTime !=0 && e.content.trips[j].fireOffTime !=0){
                                                    e.content.trips[j].four={
                                                        laststarttime:registerService.coverdate(e.content.trips[j].fireOnTime),
                                                        starteventdate:coverdatestart,
                                                        chinesestart:"起点：",
                                                        chineseend:"终点：",
                                                        lastendtime:registerService.coverdate(e.content.trips[j].fireOffTime),
                                                        endeventdate:registerService.coverdateyear(e.content.trips[j].fireOffTime),
                                                        startpoint: $scope.todayaddressa,
                                                        endpoint: $scope.endaddressa,
                                                        pointpoint:"........."
                                                    };
                                                    //$scope.lastdateinfo = e.content.trips;
                                                    console.log("执行了");
                                                }else if(e.content.trips[j].fireOnTime==0 && e.content.trips[j].fireOffTime !=0){
                                                    e.content.trips[j].four={
                                                        laststarttime:"无数据",
                                                        starteventdate:"无数据",
                                                        chinesestart:"起点：",
                                                        chineseend:"终点：",
                                                        lastendtime:registerService.coverdate(e.content.trips[j].fireOffTime),
                                                        endeventdate:registerService.coverdateyear(e.content.trips[j].fireOffTime),
                                                        startpoint: $scope.todayaddressa,
                                                        endpoint: $scope.endaddressa,
                                                        pointpoint:"........."
                                                    };
                                                    //$scope.lastdateinfo = e.content.trips;
                                                }else if(e.content.trips[j].fireOnTime!=0 && e.content.trips[j].fireOffTime ==0){
                                                    e.content.trips[j].four={
                                                        laststarttime:registerService.coverdate(e.content.trips[j].fireOnTime),
                                                        starteventdate:coverdatestart,
                                                        chinesestart:"起点：",
                                                        chineseend:"终点：",
                                                        lastendtime:"无数据",
                                                        endeventdate:"无数据",
                                                        startpoint: $scope.todayaddressa,
                                                        endpoint: $scope.endaddressa,
                                                        pointpoint:"........."
                                                    };
                                                    //$scope.lastdateinfo = e.content.trips;
                                                }else{
                                                    e.content.trips[j].four={
                                                        laststarttime:"无数据",
                                                        starteventdate:"无数据",
                                                        chinesestart:"起点：",
                                                        chineseend:"终点：",
                                                        lastendtime:"无数据",
                                                        endeventdate:"无数据",
                                                        startpoint: $scope.todayaddressa,
                                                        endpoint: $scope.endaddressa,
                                                        pointpoint:"........."
                                                    };
                                                    //$scope.lastdateinfo = e.content.trips;
                                                }
                                                sbfunction()
                                                //$scope.lastdateinfo = e.content.trips;

                                            }

                                            //$scope.lastdateinfo = e.content.trips;
                                        }
                                        else if(j>0){
                                            console.log("j:"+j);
                                            var coverdateendlaste = registerService.coverdateyear(e.content.trips[j-1].fireOnTime);
                                            //四种情况
                                            if(coverdatestart == coverdateend && coverdateend != coverdateendlaste){
                                                //第一种情况
                                                console.log("第一种情况");


                                                if(e.content.trips[j].fireOnTime !=0 && e.content.trips[j].fireOffTime !=0){
                                                    e.content.trips[j].fir={
                                                        laststarttime:registerService.coverdate(e.content.trips[j].fireOnTime),
                                                        starteventdate:coverdatestart,
                                                        chinesestart:"起点：",
                                                        chineseend:"终点：",
                                                        lastendtime:registerService.coverdate(e.content.trips[j].fireOffTime),
                                                        endeventdate:registerService.coverdateyear(e.content.trips[j].fireOffTime),
                                                        startpoint: $scope.todayaddressa,
                                                        endpoint: $scope.endaddressa,
                                                        pointpoint:"........."
                                                    };
                                                    $scope.lastdateinfo = e.content.trips;
                                                    console.log("执行了");
                                                }else if(e.content.trips[j].fireOnTime==0 && e.content.trips[j].fireOffTime !=0){
                                                    e.content.trips[j].fir={
                                                        laststarttime:"无数据",
                                                        starteventdate:"无数据",
                                                        chinesestart:"起点：",
                                                        chineseend:"终点：",
                                                        lastendtime:registerService.coverdate(e.content.trips[j].fireOffTime),
                                                        endeventdate:registerService.coverdateyear(e.content.trips[j].fireOffTime),
                                                        startpoint: $scope.todayaddressa,
                                                        endpoint: $scope.endaddressa,
                                                        pointpoint:"........."
                                                    };
                                                    $scope.lastdateinfo = e.content.trips;
                                                }else if(e.content.trips[j].fireOnTime!=0 && e.content.trips[j].fireOffTime ==0){
                                                    e.content.trips[j].fir={
                                                        laststarttime:registerService.coverdate(e.content.trips[j].fireOnTime),
                                                        starteventdate:coverdatestart,
                                                        chinesestart:"起点：",
                                                        chineseend:"终点：",
                                                        lastendtime:"无数据",
                                                        endeventdate:"无数据",
                                                        startpoint: $scope.todayaddressa,
                                                        endpoint: $scope.endaddressa,
                                                        pointpoint:"........."
                                                    };
                                                    $scope.lastdateinfo = e.content.trips;
                                                }else{
                                                    e.content.trips[j].fir={
                                                        laststarttime:"无数据",
                                                        starteventdate:"无数据",
                                                        chinesestart:"起点：",
                                                        chineseend:"终点：",
                                                        lastendtime:"无数据",
                                                        endeventdate:"无数据",
                                                        startpoint: $scope.todayaddressa,
                                                        endpoint: $scope.endaddressa,
                                                        pointpoint:"........."
                                                    };
                                                    $scope.lastdateinfo = e.content.trips;
                                                }

                                                sbfunction();
                                                $scope.lastdateinfo = e.content.trips;

                                            }else if(coverdatestart != coverdateend && coverdateend != coverdateendlaste){
                                                //第四种情况
                                                console.log("第四种情况");
                                                if(e.content.trips[j].fireOnTime !=0 && e.content.trips[j].fireOffTime !=0){
                                                    e.content.trips[j].four={
                                                        laststarttime:registerService.coverdate(e.content.trips[j].fireOnTime),
                                                        starteventdate:coverdatestart,
                                                        chinesestart:"起点：",
                                                        chineseend:"终点：",
                                                        lastendtime:registerService.coverdate(e.content.trips[j].fireOffTime),
                                                        endeventdate:registerService.coverdateyear(e.content.trips[j].fireOffTime),
                                                        startpoint: $scope.todayaddressa,
                                                        endpoint: $scope.endaddressa,
                                                        pointpoint:"........."
                                                    };
                                                    $scope.lastdateinfo = e.content.trips;
                                                    console.log("执行了");
                                                }else if(e.content.trips[j].fireOnTime==0 && e.content.trips[j].fireOffTime !=0){
                                                    e.content.trips[j].four={
                                                        laststarttime:"无数据",
                                                        starteventdate:"无数据",
                                                        chinesestart:"起点：",
                                                        chineseend:"终点：",
                                                        lastendtime:registerService.coverdate(e.content.trips[j].fireOffTime),
                                                        endeventdate:registerService.coverdateyear(e.content.trips[j].fireOffTime),
                                                        startpoint: $scope.todayaddressa,
                                                        endpoint: $scope.endaddressa,
                                                        pointpoint:"........."
                                                    };
                                                    $scope.lastdateinfo = e.content.trips;
                                                }else if(e.content.trips[j].fireOnTime!=0 && e.content.trips[j].fireOffTime ==0){
                                                    e.content.trips[j].four={
                                                        laststarttime:registerService.coverdate(e.content.trips[j].fireOnTime),
                                                        starteventdate:coverdatestart,
                                                        chinesestart:"起点：",
                                                        chineseend:"终点：",
                                                        lastendtime:"无数据",
                                                        endeventdate:"无数据",
                                                        startpoint: $scope.todayaddressa,
                                                        endpoint: $scope.endaddressa,
                                                        pointpoint:"........."
                                                    };
                                                    $scope.lastdateinfo = e.content.trips;
                                                }else{
                                                    e.content.trips[j].four={
                                                        laststarttime:"无数据",
                                                        starteventdate:"无数据",
                                                        chinesestart:"起点：",
                                                        chineseend:"终点：",
                                                        lastendtime:"无数据",
                                                        endeventdate:"无数据",
                                                        startpoint: $scope.todayaddressa,
                                                        endpoint: $scope.endaddressa,
                                                        pointpoint:"........."
                                                    };
                                                    $scope.lastdateinfo = e.content.trips;
                                                }
                                                sbfunction()
                                                $scope.lastdateinfo = e.content.trips;

                                            }else if(coverdatestart == coverdateend && coverdateend == coverdateendlaste){
                                                //第二种情况
                                                console.log("第二种情况");

                                                console.log(j,e.content.trips[j]);
                                                if(!e.content.trips[j].fireOnTime && !e.content.trips[j].fireOffTime){
                                                    e.content.trips[j].sed={
                                                        laststarttime:"无数据",
                                                        starteventdate:"无数据",
                                                        chinesestart:"起点：",
                                                        chineseend:"终点：",
                                                        lastendtime:"无数据",
                                                        endeventdate:"无数据",
                                                        startpoint: $scope.todayaddressa,
                                                        endpoint: $scope.endaddressa,
                                                        pointpoint:"........."
                                                    };
                                                    //$scope.lastdateinfo = e.content.trips;
                                                }else if(e.content.trips[j].fireOnTime !=0 && e.content.trips[j].fireOffTime !=0){
                                                    e.content.trips[j].sed={
                                                        laststarttime:registerService.coverdate(e.content.trips[j].fireOnTime),
                                                        starteventdate:coverdatestart,
                                                        chinesestart:"起点：",
                                                        chineseend:"终点：",
                                                        lastendtime:registerService.coverdate(e.content.trips[j].fireOffTime),
                                                        endeventdate:registerService.coverdateyear(e.content.trips[j].fireOffTime),
                                                        startpoint: $scope.todayaddressa,
                                                        endpoint: $scope.endaddressa,
                                                        pointpoint:"........."
                                                    };
                                                    //$scope.lastdateinfo = e.content.trips;
                                                    console.log("执行了");
                                                }else if(e.content.trips[j].fireOnTime==0 && e.content.trips[j].fireOffTime !=0){
                                                    e.content.trips[j].sed={
                                                        laststarttime:"无数据",
                                                        starteventdate:"无数据",
                                                        chinesestart:"起点：",
                                                        chineseend:"终点：",
                                                        lastendtime:registerService.coverdate(e.content.trips[j].fireOffTime),
                                                        endeventdate:registerService.coverdateyear(e.content.trips[j].fireOffTime),
                                                        startpoint: $scope.todayaddressa,
                                                        endpoint: $scope.endaddressa,
                                                        pointpoint:"........."
                                                    };
                                                    //$scope.lastdateinfo = e.content.trips;
                                                }else if(e.content.trips[j].fireOnTime!=0 && e.content.trips[j].fireOffTime ==0){
                                                    e.content.trips[j].sed={
                                                        laststarttime:registerService.coverdate(e.content.trips[j].fireOnTime),
                                                        starteventdate:coverdatestart,
                                                        chinesestart:"起点：",
                                                        chineseend:"终点：",
                                                        lastendtime:"无数据",
                                                        endeventdate:"无数据",
                                                        startpoint: $scope.todayaddressa,
                                                        endpoint: $scope.endaddressa,
                                                        pointpoint:"........."
                                                    };
                                                    //$scope.lastdateinfo = e.content.trips;
                                                }else{
                                                    e.content.trips[j].sed={
                                                        laststarttime:"无数据",
                                                        starteventdate:"无数据",
                                                        chinesestart:"起点：",
                                                        chineseend:"终点：",
                                                        lastendtime:"无数据",
                                                        endeventdate:"无数据",
                                                        startpoint: $scope.todayaddressa,
                                                        endpoint: $scope.endaddressa,
                                                        pointpoint:"........."
                                                    };
                                                    //$scope.lastdateinfo = e.content.trips;
                                                }
                                                sbfunction();
                                                //$scope.lastdateinfo = e.content.trips;


                                            }else if(coverdatestart != coverdateend && coverdateend == coverdateendlaste){
                                                //第三种情况
                                                console.log("第三种情况");


                                                if(e.content.trips[j].fireOnTime !=0 && e.content.trips[j].fireOffTime !=0){
                                                    e.content.trips[j].thr={
                                                        laststarttime:registerService.coverdate(e.content.trips[j].fireOnTime),
                                                        starteventdate:coverdatestart,
                                                        chinesestart:"起点：",
                                                        chineseend:"终点：",
                                                        lastendtime:registerService.coverdate(e.content.trips[j].fireOffTime),
                                                        endeventdate:registerService.coverdateyear(e.content.trips[j].fireOffTime),
                                                        startpoint: $scope.todayaddressa,
                                                        endpoint: $scope.endaddressa,
                                                        pointpoint:"........."
                                                    };
                                                    //$scope.lastdateinfo = e.content.trips;
                                                    console.log("执行了");
                                                }else if(e.content.trips[j].fireOnTime==0 && e.content.trips[j].fireOffTime !=0){
                                                    e.content.trips[j].thr={
                                                        laststarttime:"无数据",
                                                        starteventdate:"无数据",
                                                        chinesestart:"起点：",
                                                        chineseend:"终点：",
                                                        lastendtime:registerService.coverdate(e.content.trips[j].fireOffTime),
                                                        endeventdate:registerService.coverdateyear(e.content.trips[j].fireOffTime),
                                                        startpoint: $scope.todayaddressa,
                                                        endpoint: $scope.endaddressa,
                                                        pointpoint:"........."
                                                    };
                                                    //$scope.lastdateinfo = e.content.trips;
                                                }else if(e.content.trips[j].fireOnTime!=0 && e.content.trips[j].fireOffTime ==0){
                                                    e.content.trips[j].thr={
                                                        laststarttime:registerService.coverdate(e.content.trips[j].fireOnTime),
                                                        starteventdate:coverdatestart,
                                                        chinesestart:"起点：",
                                                        chineseend:"终点：",
                                                        lastendtime:"无数据",
                                                        endeventdate:"无数据",
                                                        startpoint: $scope.todayaddressa,
                                                        endpoint: $scope.endaddressa,
                                                        pointpoint:"........."
                                                    };
                                                    //$scope.lastdateinfo = e.content.trips;
                                                }else{
                                                    e.content.trips[j].thr={
                                                        laststarttime:"无数据",
                                                        starteventdate:"无数据",
                                                        chinesestart:"起点：",
                                                        chineseend:"终点：",
                                                        lastendtime:"无数据",
                                                        endeventdate:"无数据",
                                                        startpoint: $scope.todayaddressa,
                                                        endpoint: $scope.endaddressa,
                                                        pointpoint:"........."
                                                    };
                                                    //$scope.lastdateinfo = e.content.trips;
                                                }
                                                sbfunction();
                                                //$scope.lastdateinfo = e.content.trips;


                                            }
                                        }
                                    }
                                };
                                $scope.laststarttransloc();

                            }else{
                                //e.length=0的时候
                                $scope.notripcontent = false;//无行程
                                $scope.clickonload = true;//点击加载
                                $scope.cartriploading = true;//加载中
                                $scope.thelastpagecartripover = true;//加载完全
                                $scope.clickandaddloads = true;//继续加载
                                console.log("无数据")
                            }



                    }else{
                        $scope.subapp= {"toggle":true};
                        $scope.submitWarning = e.err+"！";
                        $scope.timerrlasttripreasonapp = $timeout(function(){
                            $scope.subapp= {"toggle":false};
                        },2000);

                            $scope.notripcontent = true;//无行程
                            $scope.clickonload = false;//点击加载
                            $scope.cartriploading = true;//加载中
                            $scope.thelastpagecartripover = true;//加载完全
                            $scope.clickandaddloads = true;//继续加载
                        $scope.lastandloadtripdis= false;//last的行程可点击


                    }
                },500);


            },function(err){
                $scope.loadapp = {"toggle":false};
                $scope.subapp= {"toggle":true};
                $scope.lasttripendtimehs = new Date().getTime();
                console.log("请求时间差："+$scope.lasttripendtimehs - $scope.lasttripstarttimehs);
                if($scope.lasttripendtimehs - $scope.lasttripstarttimehs>=6500){
                    $scope.submitWarning = "请求超时！";
                }else {
                    $scope.submitWarning = "网络连接失败！";
                }
                //$scope.submitWarning = "网络连接失败！";
                $scope.timerrlasterrtime = $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);

                    $scope.notripcontent = true;//无行程
                    $scope.clickonload = false;//点击加载
                    $scope.cartriploading = true;//加载中
                    $scope.thelastpagecartripover = true;//加载完全
                    $scope.clickandaddloads = true;//继续加载
                $scope.lastandloadtripdis= false;//last的行程可点击


            });
        };
        $scope.timelastnulltime = $timeout(function(){
            $scope.lastpagenumbera = 0;
            if((new Date($scope.ajaxendtime+" 23:59:59").getTime() - new Date($scope.ajaxstarttime+" 00:00:00").getTime()) > 604800000){
                $scope.islastandload = false;
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "开始,结束日期不能相差超过7天，请您重新确认！";
                $scope.timesevenoverdate = $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else{
                $scope.lasttripObj = {
                    termId:Number($window.sessionStorage.getItem("UtermId")),
                    startTime:new Date($scope.ajaxstarttime+' 00:00:00').getTime(),
                    endTime:new Date($scope.ajaxendtime+' 23:59:59').getTime(),
                    pageIndex:$scope.lastpagenumbera,
                    pageSize:3
                    //,pageNumber:$scope.lastdatepage,
                    //limit:2
                };
                $scope.islastandload = false;
                $scope.lastdate();
            }
        },2);
        $scope.datetripbtninit = function(){
            $scope.ostartTimes = registerService.getdatestr(-2);
            $scope.overTimes = registerService.getdatestr(-1);
            $scope.ajaxstarttime = $scope.ostartTimes.replace('-','/').replace('-','/');
            $scope.ajaxendtime = $scope.overTimes.replace('-','/').replace('-','/');
            $scope.lastdatepage=0;
            $scope.timelastnulltimedatefir = $timeout(function(){
                //$scope.dituiditui = true;

                $scope.lastdateinfo = null;
                $scope.lastpagenumbera = 0;
                $scope.lasttripObj = {
                    termId:Number($window.sessionStorage.getItem("UtermId")),
                    startTime:new Date($scope.ajaxstarttime+' 00:00:00').getTime(),
                    endTime:new Date($scope.ajaxendtime+' 23:59:59').getTime(),
                    pageIndex:$scope.lastpagenumbera,
                    pageSize:3
                    //,pageNumber:$scope.lastdatepage,
                    //limit:2
                };
                $scope.islastandload = false;
                $scope.lasttripUrl = "/rest/trips/period/";
                $scope.lastdate();
            },2);
        };

        $scope.changedatebtnsearch = function(startDateParms,endDateParms){
            // $scope.coverostarttime = $("#appDate").val().replace('-','').replace('-','');
            // $scope.coverovertime = $("#appDateover").val().replace('-','').replace('-','');
            $scope.coverostarttimeeeeee = $scope.ostartTimes.replace('-','/').replace('-','/');
            $scope.coverovertimeeeeee = $scope.overTimes.replace('-','/').replace('-','/');
            $scope.ajaxstarttime =$scope.coverostarttimeeeeee ;
            $scope.ajaxendtime = $scope.coverovertimeeeeee;
            //处理今天昨天近七天按钮
            if(startDateParms&&endDateParms){
                $scope.lastdatepage=0;
                $scope.timelastnulltimedatesed = $timeout(function(){
                    //$scope.dituiditui = true;
                    $scope.lastdateinfo = null;
                    $scope.islastandload = false;
                    $scope.lastpagenumbera = 0;
                    console.log("CommonTime:",startDateParms , endDateParms);
                    $scope.lasttripObj = {
                        termId:Number($window.sessionStorage.getItem("UtermId")),
                        startTime:startDateParms,
                        endTime:endDateParms,
                        pageIndex:$scope.lastpagenumbera,
                        pageSize:3
                    };
                    $scope.lasttripUrl = "/rest/trips/period/";
                    $scope.lastdate();
                },2);
            }
            else{
                if((new Date($scope.coverovertimeeeeee+" 23:59:59").getTime() - new Date($scope.coverostarttimeeeeee+" 00:00:00").getTime()) >604800000){
                    $scope.subapp= {"toggle":true};
                    $scope.submitWarning = "开始,结束日期不能相差超过7天，请您重新确认！";

                    $scope.timesevenoverdate = $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                } else if($scope.ajaxendtime>= $scope.ajaxstarttime){
                    $scope.lastdatepage=0;
                    $scope.timelastnulltimedatesed = $timeout(function(){
                        //$scope.dituiditui = true;
                        $scope.lastdateinfo = null;
                        $scope.islastandload = false;
                        $scope.lastpagenumbera = 0;
                        console.log($scope.ajaxstarttime,$scope.ajaxendtime)
                        $scope.lasttripObj = {
                            termId:Number($window.sessionStorage.getItem("UtermId")),
                            startTime:new Date($scope.ajaxstarttime+' 00:00:00').getTime(),
                            endTime:new Date($scope.ajaxendtime+' 23:59:59').getTime(),
                            pageIndex:$scope.lastpagenumbera,
                            pageSize:3
                            //,pageNumber:$scope.lastdatepage,
                            //limit:2
                        };
                        $scope.lasttripUrl = "/rest/trips/period/";
                        $scope.lastdate();
                    },2);
                    console.log("看这里啊");
                } else {
                    $scope.subapp= {"toggle":true};
                    $scope.submitWarning = "开始日期大于结束日期，请您重新确认！";
                    $scope.timesevenoverdateall = $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                    console.log("看这里啊");
                }
            }
        }
        $scope.clickLasttripOnload = function(){
            //$scope.timelastnulltimedatefirbtn = $timeout(function(){
            //
            //    $scope.lastdateinfo = null;
            //    $scope.lastdate();
            //},2);
            $scope.changedatebtnsearch();
        };

        //$scope.dateModelhide = function(){
        //    $scope.datediv = {toggle:false};
        //    console.log(1);
        //}
        //$scope.showdatemodelbtn = function(){
        //    $scope.datediv = {toggle:true};
        //}

        //点击继续加载
        //$scope.clickAddlastTriponload = function(){
        //    $scope.notripcontent = true;//无行程
        //    $scope.clickonload = true;//点击加载
        //    $scope.cartriploading = false;//加载中
        //    $scope.thelastpagecartripover = true;//加载完全
        //    $scope.clickandaddloads = true;//继续加载
        //    var lasttripObj = {
        //        uid:$window.sessionStorage.getItem("Uid"),
        //        startTime:$scope.ajaxstarttime+'000000',
        //        endTime:$scope.ajaxendtime+'235959',
        //        pageNumber:$scope.lastdatepage,
        //        limit:2
        //    };
        //    var lasttripUrl = "/rest/vehicles/useHistory/";
        //    $scope.loadapp = {"toggle":true};
        //    registerService.commonUserget(lasttripObj,lasttripUrl).then(function(e){
        //        $scope.loadapp = {"toggle":false};
        //        if(e.status == true){
        //            console.log(e);
        //            console.log(e.useHistory.length);
        //            $scope.lastdatepage ++;
        //            if(e.useHistory.length !=0){
        //                console.log("有数据");
        //                //table的样式 是否最后一页
        //                if(e.isLastpage == true){
        //                    $scope.notripcontent = true;//无行程
        //                    $scope.clickonload = true;//点击加载
        //                    $scope.cartriploading = true;//加载中
        //                    $scope.thelastpagecartripover = false;//加载完全
        //                    $scope.clickandaddloads = true;//继续加载
        //                }else{
        //                    $scope.notripcontent = true;//无行程
        //                    $scope.clickonload = false;//点击加载
        //                    $scope.cartriploading = true;//加载中
        //                    $scope.thelastpagecartripover =true ;//加载完全
        //                    $scope.clickandaddloads = true;//继续加载
        //                }
        //                for(var i in e.useHistory){
        //                    e.useHistory[i].startpoint = "正在解析！";
        //                    e.useHistory[i].endpoint = "正在解析！";
        //                }
        //                $scope.lastdateinfo = e.useHistory;
        //                var j = 0;
        //
        //                 $scope.laststarttransloc = function (){
        //                    console.log("e.useHistory:",e.useHistory);
        //                    var lnglatXY =[e.useHistory[j].startLat,e.useHistory[j].startLng];
        //                    var coverdatestart = registerService.coverdateyear(e.useHistory[j].fireOnTime);
        //                    var coverdateend = registerService.coverdateyear(e.useHistory[j].fireOffTime);
        //
        //                    //if(e.useHistory[j].fireOnTime && e.useHistory[j].fireOffTime && coverdatestart==coverdateend){
        //                    //    e.useHistory[j].laststarttime = registerService.coverdate(e.useHistory[j].fireOnTime);
        //                    //    e.useHistory[j].eventdate = coverdateend;
        //                    //    $scope.normaldianlastdontdate = false;
        //                    //    $scope.sbdianlastdontdate =true ;
        //                    //    console.log("444444");
        //                    //}else if(e.useHistory[j].fireOnTime && e.useHistory[j].fireOffTime && coverdatestart!=coverdateend){
        //                    //    $scope.normaldianlastdontdate =true ;
        //                    //    $scope.sbdianlastdontdate = false;
        //                    //    e.useHistory[j].eventdate = coverdateend;
        //                    //    console.log("不正常");
        //                    //}else if(!e.useHistory[j].fireOnTime && e.useHistory[j].fireOffTime){
        //                    //    e.useHistory[j].laststarttime = "无数据";
        //                    //    e.useHistory[j].lastendtime = registerService.coverdate(e.useHistory[j].fireOffTime);
        //                    //    e.useHistory[j].eventdate = coverdateend;
        //                    //    console.log("3333333");
        //                    //}else if(e.useHistory[j].fireOnTime && !e.useHistory[j].fireOffTime){
        //                    //    e.useHistory[j].lastendtime = "无数据";
        //                    //    e.useHistory[j].laststarttime = registerService.coverdate(e.useHistory[j].fireOnTime);
        //                    //    e.useHistory[j].eventdate = coverdatestart;
        //                    //    console.log("222222");
        //                    //}else{
        //                    //    console.log("111111");
        //                    //}
        //                    //console.log(1);
        //                    //if(j>0){
        //                    //    if(registerService.coverdateyear(e.useHistory[j].fireOnTime) == registerService.coverdateyear(e.useHistory[j-1].fireOffTime) || registerService.coverdateyear(e.useHistory[j].fireOffTime) == registerService.coverdateyear(e.useHistory[j-1].fireOffTime)){
        //                    //        $scope.dateyeardisnone = false;
        //                    //        console.log("j>0,消失");
        //                    //    }else{
        //                    //        $scope.dateyeardisnone = false;
        //                    //        console.log("j>0,显示");
        //                    //    }
        //                    //    console.log("f>0");
        //                    //}else{
        //                    //    console.log("f=0，显示");
        //                    //    $scope.dateyeardisnone = true;
        //                    //}
        //                    console.log($scope.lastdatepage);
        //                    if($scope.lastdatepage > 1) {       //第一页的数据
        //                        console.log("这不是第一页");
        //                        //两种情况
        //                        console.log("开始结束date："+coverdatestart,coverdateend);
        //                        if(j==0){
        //                            //这个要跟上一页的比较，，
        //                            if(coverdatestart == coverdateend){
        //                                //第一种情况
        //                                $scope.normaldianlastdontdate = false;
        //                                $scope.agadianlastdontdate = true;
        //                                $scope.sbdianlastdontdate = true;
        //                                $scope.moresbdianlastdontdate = true;
        //                            }else{
        //                                //第四种情况
        //                                $scope.normaldianlastdontdate = true;
        //                                $scope.agadianlastdontdate = true;
        //                                $scope.sbdianlastdontdate = true;
        //                                $scope.moresbdianlastdontdate =false ;
        //                            }
        //                        }else if(j>0){
        //                            var coverdateendlaste = registerService.coverdateyear(e.useHistory[j-1].fireOffTime);
        //                            //四种情况
        //                            if(coverdatestart == coverdateend && coverdatestart != coverdateendlaste){
        //                                //第一种情况
        //                                $scope.normaldianlastdontdate = false;
        //                                $scope.agadianlastdontdate = true;
        //                                $scope.sbdianlastdontdate = true;
        //                                $scope.moresbdianlastdontdate = true;
        //                            }else if(coverdatestart != coverdateend && coverdatestart != coverdateendlaste){
        //                                //第四种情况
        //                                $scope.normaldianlastdontdate = true;
        //                                $scope.agadianlastdontdate = true;
        //                                $scope.sbdianlastdontdate = true;
        //                                $scope.moresbdianlastdontdate =false ;
        //                            }else if(coverdatestart == coverdateend && coverdatestart == coverdateendlaste){
        //                                //第二种情况
        //                                $scope.normaldianlastdontdate = true;
        //                                $scope.agadianlastdontdate = false;
        //                                $scope.sbdianlastdontdate = true;
        //                                $scope.moresbdianlastdontdate =true ;
        //                            }else if(coverdatestart != coverdateend && coverdatestart == coverdateendlaste){
        //                                //第三种情况
        //                                $scope.normaldianlastdontdate = true;
        //                                $scope.agadianlastdontdate = true;
        //                                $scope.sbdianlastdontdate =false ;
        //                                $scope.moresbdianlastdontdate =true ;
        //                            }
        //                        }
        //
        //
        //                    }
        //                    AMap.service('AMap.Geocoder',function() {
        //                        $scope.laststartwarningadd = new AMap.Geocoder({});
        //
        //                        $scope.laststartwarningadd.getAddress(lnglatXY, function (status, result) {
        //
        //                            console.log("run here:", result, status);
        //                            if (status === 'complete' && result.info === 'OK') {
        //                                $scope.todayaddressa = result.regeocode.formattedAddress;
        //                                e.useHistory[j].startpoint = $scope.todayaddressa;
        //                                j++;
        //                                if (j < e.useHistory.length) {
        //
        //                                    $scope.laststarttransloc();
        //                                } else {
        //                                }
        //                            } else {
        //                                $scope.todayaddressa = "获取地址失败";
        //                                e.useHistory[j].startpoint = $scope.todayaddressa;
        //                                j++;
        //                                if (j < e.useHistory.length) {
        //                                    $scope.laststarttransloc();
        //                                } else {
        //                                }
        //                            }
        //
        //
        //                            $scope.$apply(function () {
        //                                $scope.lastdateinfo = e.useHistory;
        //                            });
        //                        });
        //                    });
        //
        //                };
        //                $scope.laststarttransloc();
        //                var f=0;
        //                function lastendtransloc() {
        //                    var endlnglatXY = [e.useHistory[f].endLat,e.useHistory[f].endLng];
        //                    //var coverdatestart = registerService.coverdateyear(e.useHistory[f].fireOnTime);
        //                    //var coverdateend = registerService.coverdateyear(e.useHistory[f].fireOffTime);
        //                    ////e.useHistory[f].lastendtime = registerService.coverdate(e.useHistory[f].fireOffTime);
        //                    //if(e.useHistory[f].fireOnTime && e.useHistory[f].fireOffTime && coverdatestart==coverdateend){
        //                    //    e.useHistory[f].lastendtime = registerService.coverdate(e.useHistory[f].fireOffTime);
        //                    //    e.useHistory[f].eventdate = coverdatestart;
        //                    //
        //                    //    $scope.normaldianlastdontdate =false ;
        //                    //    $scope.sbdianlastdontdate = true;
        //                    //}else if(e.useHistory[f].fireOnTime && e.useHistory[f].fireOffTime && coverdatestart!=coverdateend){
        //                    //    $scope.normaldianlastdontdate =true ;
        //                    //    $scope.sbdianlastdontdate = false;
        //                    //    e.useHistory[f].eventdate = coverdateend;
        //                    //}else if(!e.useHistory[f].fireOnTime && e.useHistory[f].fireOffTime){
        //                    //    e.useHistory[f].laststarttime = "无数据";
        //                    //    e.useHistory[f].lastendtime = registerService.coverdate(e.useHistory[f].fireOffTime);
        //                    //    e.useHistory[f].eventdate = coverdateend;
        //                    //}else if(e.useHistory[f].fireOnTime && !e.useHistory[f].fireOffTime){
        //                    //    e.useHistory[f].lastendtime = "无数据";
        //                    //    e.useHistory[f].laststarttime = registerService.coverdate(e.useHistory[f].fireOnTime);
        //                    //    e.useHistory[f].eventdate = coverdatestart;
        //                    //}
        //                    //if(f>0){
        //                    //    if(registerService.coverdateyear(e.useHistory[f].fireOnTime) == registerService.coverdateyear(e.useHistory[f-1].fireOffTime) || registerService.coverdateyear(e.useHistory[f].fireOffTime) == registerService.coverdateyear(e.useHistory[f-1].fireOffTime)){
        //                    //        $scope.dateyeardisnone = true;
        //                    //    }else{
        //                    //        $scope.dateyeardisnone = false;
        //                    //
        //                    //    }
        //                    //}else{
        //                    //
        //                    //
        //                    //
        //                    //    $scope.dateyeardisnone = false;
        //                    //}
        //
        //
        //                    if(endlnglatXY!=[0,0]){
        //                        AMap.service('AMap.Geocoder',function() {
        //                            $scope.lastendwarningadd = new AMap.Geocoder({});
        //
        //                            $scope.lastendwarningadd.getAddress(endlnglatXY, function (status, result) {
        //                                if (status === 'complete' && result.info === 'OK') {
        //                                    $scope.endaddressa = result.regeocode.formattedAddress;
        //                                    e.useHistory[f].endpoint = $scope.endaddressa;
        //                                    f++;
        //                                    if (f < e.useHistory.length) {
        //                                        lastendtransloc();
        //                                    } else {
        //                                    }
        //                                } else {
        //                                    $scope.endaddressa = "获取地址失败";
        //                                    e.useHistory[f].endpoint = $scope.endaddressa;
        //                                    f++;
        //                                    if (f < e.useHistory.length) {
        //                                        lastendtransloc();
        //                                    } else {
        //                                    }
        //                                }
        //                                $scope.$apply(function () {
        //                                    $scope.lastdateinfo = e.useHistory;
        //                                });
        //                                console.log($scope.lastdateinfo)
        //
        //
        //                            });
        //                        });
        //                    }
        //
        //                };
        //
        //                lastendtransloc();
        //            }else{
        //                //e.length=0的时候
        //                $scope.notripcontent = false;//无行程
        //                $scope.clickonload = true;//点击加载
        //                $scope.cartriploading = true;//加载中
        //                $scope.thelastpagecartripover = true;//加载完全
        //                  $scope.clickandaddloads = true;//继续加载
        //                console.log("无数据")
        //            }
        //
        //
        //        }else{
        //            $scope.subapp= {"toggle":true};
        //            $scope.submitWarning = e.reason+"！";
        //            $scope.timesubreason = $timeout(function(){
        //                $scope.subapp= {"toggle":false};
        //            },2000);
        //            $scope.notripcontent = true;//无行程
        //            $scope.clickonload = false;//点击加载
        //            $scope.cartriploading = true;//加载中
        //            $scope.thelastpagecartripover = true;//加载完全
        //            $scope.clickandaddloads = true;//继续加载
        //        }
        //    },function(err){
        //        $scope.loadapp = {"toggle":false};
        //        $scope.subapp= {"toggle":true};
        //        $scope.submitWarning = "网络连接失败！";
        //        $scope.timesuberror = $timeout(function(){
        //            $scope.subapp= {"toggle":false};
        //        },2000);
        //        $scope.notripcontent = true;//无行程
        //        $scope.clickonload = false;//点击加载
        //        $scope.cartriploading = true;//加载中
        //        $scope.thelastpagecartripover = true;//加载完全
        //        $scope.clickandaddloads = true;//继续加载
        //    });
        //};
        //di
        //dian

        //点击继续加载
        $scope.clickAddlastTriponload = function(){
            $scope.lastandloadtripdis= true;//last的行程不可点击
            $scope.islastandload = true;
            console.log("点击了继续加载："+$scope.lastpagenumbera);
            if($scope.startDate&&$scope.endDate){
                $scope.lasttripObj = {
                    termId:Number($window.sessionStorage.getItem("UtermId")),
                    startTime:$scope.startDate,
                    endTime:$scope.endDate,
                    pageIndex:$scope.lastpagenumbera,
                    pageSize:3
                    //,pageNumber:$scope.lastdatepage,
                    //limit:2
                };
            }else{
                $scope.lasttripObj = {
                    termId:Number($window.sessionStorage.getItem("UtermId")),
                    startTime:new Date($scope.ajaxstarttime+' 00:00:00').getTime(),
                    endTime:new Date($scope.ajaxendtime+' 23:59:59').getTime(),
                    pageIndex:$scope.lastpagenumbera,
                    pageSize:3
                    //,pageNumber:$scope.lastdatepage,
                    //limit:2
                };
            }

            $scope.lasttripUrl = "/rest/trips/period/";
            $scope.notripcontent = true;//无行程
            $scope.clickonload = true;//点击加载
            $scope.cartriploading = false;//加载中
            $scope.thelastpagecartripover = true;//加载完全
            $scope.clickandaddloads = true;//继续加载
            if($scope.infoclassnone == 0){
                $scope.infoclassnone = true;
            }
            $scope.loadapp = {"toggle":true};
            var j = 0;
            console.log($scope.ajaxstarttime,$scope.ajaxendtime);
            $scope.lasttripstarttimehs = new Date().getTime();
            registerService.commonUser($scope.lasttripObj,$scope.lasttripUrl).then(function(e){
                $scope.timerrlastloadtime = $timeout(function(){
                    $scope.loadapp = {"toggle":false};
                    if(e.status == true){
                        $scope.lastpagenumbera ++;
                        console.log("页码："+$scope.lastpagenumbera);
                        console.log(e);
                        console.log(e.content.trips.length);
                        //$scope.lastdatepage ++;
                        if(e.content.currentSize !=0){
                            console.log("有数据");
                            //table的样式 是否最后一页
                            //$rootScope.tripmaplatlng = e.content.trips;
                            if(e.content.currentPage == e.content.totalPages-1){
                                $scope.notripcontent = true;//无行程
                                $scope.clickonload = true;//点击加载
                                $scope.cartriploading = true;//加载中
                                $scope.thelastpagecartripover = false;//加载完全
                                $scope.clickandaddloads = true;//继续加载
                            }else{
                                $scope.notripcontent = true;//无行程
                                $scope.clickonload = true;//点击加载
                                $scope.cartriploading = true;//加载中
                                $scope.thelastpagecartripover =true ;//加载完全
                                $scope.clickandaddloads =false ;//继续加载
                            }
                            //for(var i in e.content.trips){
                            //    e.content.trips[i].startpoint = "正在解析！";
                            //    e.content.trips[i].endpoint = "正在解析！";
                            //}
                            //if($scope.lastpagenumbera == 1){
                            //    $scope.lastdateinfo = e.content.trips;
                            //}
                            console.log($scope.lastdateinfo);
                            j = 0;
                            //$scope.dituiditui = false;
                            $scope.laststarttranslocand = function (){

                                console.log("看看这个是多少啊j："+j);
                                var lnglatXY =[e.content.trips[j].fireOnLng,e.content.trips[j].fireOnLat];
                                var coverdatestart = registerService.coverdateyear(e.content.trips[j].fireOnTime);
                                var coverdateend = registerService.coverdateyear(e.content.trips[j].fireOffTime);
                                var endlnglatXY = [e.content.trips[j].fireOffLng,e.content.trips[j].fireOffLat];
                                try {
                                    var lngnum = new AMap.LngLat(e.content.trips[j].fireOnLng,e.content.trips[j].fireOnLat);
                                    var latnum =new AMap.LngLat(e.content.trips[j].fireOffLng,e.content.trips[j].fireOffLat);
                                    console.log(lngnum,latnum);
                                    $scope.initfalseapp= {"toggle":false};
                                }
                                catch(err) {
                                    $scope.initfalseapp= {"toggle":true};
                                    //$scope.subapp= {"toggle":true};

                                    $scope.goSubmitPage= function(){
                                        $state.go("submits");
                                        $scope.initfalseapp= {"toggle":false};
                                    };
                                    $scope.gomainhomePage = function(){
                                        $state.go("mains.home");
                                        $scope.initfalseapp= {"toggle":false};
                                    }
                                    $scope.notripcontent = true;//无行程
                                    $scope.clickonload = true;//点击加载
                                    $scope.cartriploading =false ;//加载中
                                    $scope.thelastpagecartripover =true ;//加载完全
                                    $scope.clickandaddloads = true;//继续加载
                                }
                                function sbfunction(){
                                    if(e.content.trips[j].fireOnLat != 0 && e.content.trips[j].fireOffLat!=0){
                                        //console.log(j,e.content.trips[j].fireOnLat);

                                        AMap.convertFrom([lngnum, latnum], "gps", function (status, result) {
                                            //console.log("现在测试的起点终点：" + lngnum, latnum)
                                            //console.log("现在是这个result：" + JSON.stringify(result));
                                            function allhavestartend() {
                                                AMap.service('AMap.Geocoder', function () {
                                                    $scope.startwarningadd = new AMap.Geocoder({});
                                                    $scope.startwarningadd.getAddress([lngnumstart, latnumend], function (status, result) {
                                                        console.log("result:"+JSON.stringify(result));
                                                        if (status === 'complete' && result.info === 'OK') {

                                                            if (result.regeocodes[0].formattedAddress) {
                                                                $scope.todayaddressa = result.regeocodes[0].formattedAddress+"附近";
                                                                e.content.trips[j].startpoint = $scope.todayaddressa;
                                                                //console.log("起点" + $scope.todayaddressa)
                                                            } else {
                                                                $scope.todayaddressa = "获取地址失败";
                                                                //console.log("获取位置fir：1");
                                                                //console.log("失败:",$scope.todayaddressa,e.content.trips,j)
                                                                e.content.trips[j].startpoint = $scope.todayaddressa;
                                                            }
                                                            if (result.regeocodes[1].formattedAddress) {
                                                                $scope.endaddressa = result.regeocodes[1].formattedAddress+"附近";
                                                                e.content.trips[j].endpoint = $scope.endaddressa;

                                                            } else {
                                                                $scope.todayaddressa = "获取地址失败";
                                                                //console.log("获取位置fir：2");
                                                                //console.log("失败:",$scope.todayaddressa,e.content.trips,j)
                                                                e.content.trips[j].endpoint = $scope.todayaddressa;
                                                            }

                                                            //$scope.timelastandloadtimefuzhi = $timeout(function(){
                                                                $scope.lastdateinfo.push(e.content.trips[j]);


                                                                j++;
                                                                if (j < e.content.trips.length) {
                                                                    console.log(99555555555,j,e.content.trips.length);
                                                                    $scope.laststarttranslocand();
                                                                    //console.log("执行了啊j++", j)
                                                                } else {
                                                                    $scope.lastandloadtripdis= false;//last的行程可点击
                                                                };
                                                            //},20)

                                                        } else {

                                                            $scope.todayaddressa = "获取地址失败";
                                                            e.content.trips[j].startpoint = $scope.todayaddressa;
                                                            e.content.trips[j].endpoint = $scope.todayaddressa;
                                                            //$scope.timelastandloadtimefuzhi = $timeout(function() {
                                                                $scope.lastdateinfo.push(e.content.trips[j]);

                                                                console.log($scope.lastdateinfo[j]);
                                                                j++;
                                                                //if($scope.dituiditui){
                                                                //
                                                                //}else
                                                                if (j < e.content.trips.length) {
                                                                    console.log(222222222222222222, j, e.content.trips.length);
                                                                    $scope.laststarttranslocand();
                                                                } else {
                                                                    $scope.lastandloadtripdis= false;//last的行程可点击
                                                                }
                                                            //},20);
                                                        }
                                                        //$scope.$apply(function () {
                                                        //    $rootScope.lastdateinfo = e.content.trips;
                                                        //});
                                                    });
                                                });
                                            }

                                            if (result.info === 'ok') {
                                                var lngnumstart = result.locations[0];
                                                var latnumend = result.locations[1];
                                                allhavestartend();
                                                console.log("last赋值成功了");
                                            } else {
                                                var lngnumstart = lngnum;
                                                var latnumend = latnum;
                                                allhavestartend()
                                            }
                                        })


                                    }else if(e.content.trips[j].fireOnLat == 0 && e.content.trips[j].fireOffLat==0) {
                                        e.content.trips[j].startpoint = "获取地址失败";
                                        e.content.trips[j].endpoint = "获取地址失败";
                                        //$scope.timelastandloadtimefuzhi = $timeout(function() {
                                            $scope.lastdateinfo.push(e.content.trips[j]);

                                            console.log($scope.lastdateinfo[j]);
                                            j++;
                                            //if($scope.dituiditui){
                                            //
                                            //}else
                                            if (j < e.content.trips.length) {
                                                console.log(222222222222222222, j, e.content.trips.length);
                                                $scope.laststarttranslocand();
                                            } else {
                                                $scope.lastandloadtripdis= false;//last的行程可点击
                                            }
                                        //},20);
                                        //$scope.$apply(function () {
                                        //    $rootScope.lastdateinfo = e.content.trips;
                                        //});

                                    }else if(e.content.trips[j].fireOnLat == 0){
                                        e.content.trips[j].startpoint = "获取地址失败";
                                        //console.log("实现吧");
                                        //$scope.startwarningadd = new AMap.Geocoder({
                                        //});


                                        AMap.convertFrom(latnum,"gps",function(status,result){
                                            //console.log("现在是这个result："+JSON.stringify(result));
                                            function latendcover(){
                                                AMap.service('AMap.Geocoder',function() {
                                                    $scope.startwarningadd = new AMap.Geocoder({

                                                    });
                                                    $scope.startwarningadd.getAddress(latnumend, function (status, result) {
                                                        //console.log("latnumend:"+latnumend)
                                                        //console.log("run here:",result,status);
                                                        //console.log("result:"+JSON.stringify(result));
                                                        if (status === 'complete' && result.info === 'OK') {
                                                            $scope.endaddressa = result.regeocode.formattedAddress+"附近";
                                                            e.content.trips[j].endpoint = $scope.endaddressa;
                                                            //$scope.$apply(function () {
                                                            //    $rootScope.lastdateinfo = e.content.trips;
                                                            //});

                                                            //$scope.timelastandloadtimefuzhi = $timeout(function() {
                                                                $scope.lastdateinfo.push(e.content.trips[j]);

                                                                console.log($scope.lastdateinfo[j]);
                                                                j++;
                                                                //if($scope.dituiditui){
                                                                //
                                                                //}else
                                                                if (j < e.content.trips.length) {
                                                                    console.log(222222222222222222, j, e.content.trips.length);
                                                                    $scope.laststarttranslocand();
                                                                } else {
                                                                    $scope.lastandloadtripdis= false;//last的行程可点击
                                                                }
                                                            //},20);
                                                        } else {

                                                            $scope.todayaddressa = "获取地址失败";

                                                            //e.content.trips[j].startAddresscontent = $scope.todayaddressa;
                                                            e.content.trips[j].endpoint = $scope.todayaddressa;

                                                            //$scope.timelastandloadtimefuzhi = $timeout(function() {
                                                                $scope.lastdateinfo.push(e.content.trips[j]);

                                                                console.log($scope.lastdateinfo[j]);
                                                                j++;
                                                                //if($scope.dituiditui){
                                                                //
                                                                //}else
                                                                if (j < e.content.trips.length) {
                                                                    console.log(222222222222222222, j, e.content.trips.length);
                                                                    $scope.laststarttranslocand();
                                                                } else {
                                                                    $scope.lastandloadtripdis= false;//last的行程可点击
                                                                }
                                                            //},20);
                                                        }
                                                        //$scope.$apply(function () {
                                                        //    $rootScope.lastdateinfo = e.content.trips;
                                                        //});
                                                    });
                                                });
                                            }
                                            if ( result.info === 'ok') {
                                                //var lngnumstart = result.locations[0];
                                                var latnumend= result.locations[0];
                                                latendcover()
                                            }else {
                                                //var lngnumstart = lngnum;
                                                var latnumend= latnum;
                                                latendcover()
                                            }
                                        });
                                    }else if(e.content.trips[j].fireOffLat==0){
                                        e.content.trips[j].endpoint = "获取地址失败";
                                        //$scope.startwarningadd = new AMap.Geocoder({
                                        //});

                                        AMap.convertFrom(lngnum,"gps",function(status,result) {
                                            //console.log("现在是这个result：" + JSON.stringify(result));
                                            function startcoverlng(){
                                                AMap.service('AMap.Geocoder',function() {
                                                    $scope.startwarningadd = new AMap.Geocoder({});
                                                    $scope.startwarningadd.getAddress(lngnumstart, function (status, result) {
                                                        //console.log("lngnumstart:"+lngnumstart);
                                                        //console.log("run here:",result,status);
                                                        //console.log("result:"+JSON.stringify(result));
                                                        if (status === 'complete' && result.info === 'OK') {
                                                            $scope.todayaddressa = result.regeocode.formattedAddress+"附近";
                                                            e.content.trips[j].startpoint = $scope.todayaddressa;
                                                            //$scope.timelastandloadtimefuzhi = $timeout(function() {
                                                                $scope.lastdateinfo.push(e.content.trips[j]);

                                                                console.log($scope.lastdateinfo[j]);
                                                                j++;
                                                                //if($scope.dituiditui){
                                                                //
                                                                //}else
                                                                if (j < e.content.trips.length) {
                                                                    console.log(222222222222222222, j, e.content.trips.length);
                                                                    $scope.laststarttranslocand();
                                                                } else {
                                                                    $scope.lastandloadtripdis= false;//last的行程可点击
                                                                }
                                                            //},20);
                                                        } else {
                                                            $scope.todayaddressa = "获取地址失败";
                                                            e.content.trips[j].startpoint = $scope.todayaddressa;

                                                            //$scope.timelastandloadtimefuzhi = $timeout(function() {
                                                                $scope.lastdateinfo.push(e.content.trips[j]);

                                                                console.log($scope.lastdateinfo[j]);
                                                                j++;
                                                                //if($scope.dituiditui){
                                                                //
                                                                //}else
                                                                if (j < e.content.trips.length) {
                                                                    console.log(222222222222222222, j, e.content.trips.length);
                                                                    $scope.laststarttranslocand();
                                                                } else {
                                                                    $scope.lastandloadtripdis= false;//last的行程可点击
                                                                }
                                                            //},20);
                                                        }
                                                        //$scope.$apply(function () {
                                                        //    $rootScope.lastdateinfo = e.content.trips;
                                                        //});
                                                    });
                                                });
                                            };
                                            if (result.info === 'ok') {
                                                var lngnumstart = result.locations[0];
                                                //var latnumend= result.locations[0];
                                                startcoverlng()
                                            }else {
                                                var lngnumstart = lngnum;
                                                //var latnumend= latnum;
                                                startcoverlng()
                                            }
                                        });

                                    }
                                };
                                if($scope.lastpagenumbera >= 2){
                                    console.log("j:"+j);
                                    console.log(00000000,$scope.lastdateinfo);
                                    console.log($scope.lastdateinfo[$scope.lastdateinfo.length - 1]);
                                    var coverdateendlasteand = registerService.coverdateyear($scope.lastdateinfo[$scope.lastdateinfo.length - 1].fireOnTime);
                                    //四种情况
                                    if(coverdatestart == coverdateend && coverdateend != coverdateendlasteand){
                                        //第一种情况
                                        console.log("第一种情况");


                                        if(e.content.trips[j].fireOnTime !=0 && e.content.trips[j].fireOffTime !=0){
                                            e.content.trips[j].fir={
                                                laststarttime:registerService.coverdate(e.content.trips[j].fireOnTime),
                                                starteventdate:coverdatestart,
                                                chinesestart:"起点：",
                                                chineseend:"终点：",
                                                lastendtime:registerService.coverdate(e.content.trips[j].fireOffTime),
                                                endeventdate:registerService.coverdateyear(e.content.trips[j].fireOffTime),
                                                startpoint: $scope.todayaddressa,
                                                endpoint: $scope.endaddressa,
                                                pointpoint:"........."
                                            };
                                            //$scope.lastdateinfo = e.content.trips;
                                            console.log("执行了");
                                        }else if(e.content.trips[j].fireOnTime==0 && e.content.trips[j].fireOffTime !=0){
                                            e.content.trips[j].fir={
                                                laststarttime:"无数据",
                                                starteventdate:"无数据",
                                                chinesestart:"起点：",
                                                chineseend:"终点：",
                                                lastendtime:registerService.coverdate(e.content.trips[j].fireOffTime),
                                                endeventdate:registerService.coverdateyear(e.content.trips[j].fireOffTime),
                                                startpoint: $scope.todayaddressa,
                                                endpoint: $scope.endaddressa,
                                                pointpoint:"........."
                                            };
                                            //$scope.lastdateinfo = e.content.trips;
                                        }else if(e.content.trips[j].fireOnTime!=0 && e.content.trips[j].fireOffTime ==0){
                                            e.content.trips[j].fir={
                                                laststarttime:registerService.coverdate(e.content.trips[j].fireOnTime),
                                                starteventdate:coverdatestart,
                                                chinesestart:"起点：",
                                                chineseend:"终点：",
                                                lastendtime:"无数据",
                                                endeventdate:"无数据",
                                                startpoint: $scope.todayaddressa,
                                                endpoint: $scope.endaddressa,
                                                pointpoint:"........."
                                            };
                                            //$scope.lastdateinfo = e.content.trips;
                                        }else{
                                            e.content.trips[j].fir={
                                                laststarttime:"无数据",
                                                starteventdate:"无数据",
                                                chinesestart:"起点：",
                                                chineseend:"终点：",
                                                lastendtime:"无数据",
                                                endeventdate:"无数据",
                                                startpoint: $scope.todayaddressa,
                                                endpoint: $scope.endaddressa,
                                                pointpoint:"........."
                                            };
                                            //$scope.lastdateinfo = e.content.trips;
                                        }

                                        sbfunction();
                                        //$scope.lastdateinfo = e.content.trips;

                                    }else if(coverdatestart != coverdateend && coverdateend != coverdateendlasteand){
                                        //第四种情况
                                        console.log("第四种情况");
                                        if(e.content.trips[j].fireOnTime !=0 && e.content.trips[j].fireOffTime !=0){
                                            e.content.trips[j].four={
                                                laststarttime:registerService.coverdate(e.content.trips[j].fireOnTime),
                                                starteventdate:coverdatestart,
                                                chinesestart:"起点：",
                                                chineseend:"终点：",
                                                lastendtime:registerService.coverdate(e.content.trips[j].fireOffTime),
                                                endeventdate:registerService.coverdateyear(e.content.trips[j].fireOffTime),
                                                startpoint: $scope.todayaddressa,
                                                endpoint: $scope.endaddressa,
                                                pointpoint:"........."
                                            };
                                            //$scope.lastdateinfo = e.content.trips;
                                            console.log("执行了");
                                        }else if(e.content.trips[j].fireOnTime==0 && e.content.trips[j].fireOffTime !=0){
                                            e.content.trips[j].four={
                                                laststarttime:"无数据",
                                                starteventdate:"无数据",
                                                chinesestart:"起点：",
                                                chineseend:"终点：",
                                                lastendtime:registerService.coverdate(e.content.trips[j].fireOffTime),
                                                endeventdate:registerService.coverdateyear(e.content.trips[j].fireOffTime),
                                                startpoint: $scope.todayaddressa,
                                                endpoint: $scope.endaddressa,
                                                pointpoint:"........."
                                            };
                                            $scope.lastdateinfo = e.content.trips;
                                        }else if(e.content.trips[j].fireOnTime!=0 && e.content.trips[j].fireOffTime ==0){
                                            e.content.trips[j].four={
                                                laststarttime:registerService.coverdate(e.content.trips[j].fireOnTime),
                                                starteventdate:coverdatestart,
                                                chinesestart:"起点：",
                                                chineseend:"终点：",
                                                lastendtime:"无数据",
                                                endeventdate:"无数据",
                                                startpoint: $scope.todayaddressa,
                                                endpoint: $scope.endaddressa,
                                                pointpoint:"........."
                                            };
                                            //$scope.lastdateinfo = e.content.trips;
                                        }else{
                                            e.content.trips[j].four={
                                                laststarttime:"无数据",
                                                starteventdate:"无数据",
                                                chinesestart:"起点：",
                                                chineseend:"终点：",
                                                lastendtime:"无数据",
                                                endeventdate:"无数据",
                                                startpoint: $scope.todayaddressa,
                                                endpoint: $scope.endaddressa,
                                                pointpoint:"........."
                                            };
                                            //$scope.lastdateinfo = e.content.trips;
                                        }
                                        sbfunction()
                                        //$scope.lastdateinfo = e.content.trips;

                                    }else if(coverdatestart == coverdateend && coverdateend == coverdateendlasteand){
                                        //第二种情况
                                        console.log("第二种情况");

                                        console.log(j,e.content.trips[j]);
                                        if(!e.content.trips[j].fireOnTime && !e.content.trips[j].fireOffTime){
                                            e.content.trips[j].sed={
                                                laststarttime:"无数据",
                                                starteventdate:"无数据",
                                                chinesestart:"起点：",
                                                chineseend:"终点：",
                                                lastendtime:"无数据",
                                                endeventdate:"无数据",
                                                startpoint: $scope.todayaddressa,
                                                endpoint: $scope.endaddressa,
                                                pointpoint:"........."
                                            };
                                            //$scope.lastdateinfo = e.content.trips;
                                        }else if(e.content.trips[j].fireOnTime !=0 && e.content.trips[j].fireOffTime !=0){
                                            e.content.trips[j].sed={
                                                laststarttime:registerService.coverdate(e.content.trips[j].fireOnTime),
                                                starteventdate:coverdatestart,
                                                chinesestart:"起点：",
                                                chineseend:"终点：",
                                                lastendtime:registerService.coverdate(e.content.trips[j].fireOffTime),
                                                endeventdate:registerService.coverdateyear(e.content.trips[j].fireOffTime),
                                                startpoint: $scope.todayaddressa,
                                                endpoint: $scope.endaddressa,
                                                pointpoint:"........."
                                            };
                                            //$scope.lastdateinfo = e.content.trips;
                                            console.log("执行了");
                                        }else if(e.content.trips[j].fireOnTime==0 && e.content.trips[j].fireOffTime !=0){
                                            e.content.trips[j].sed={
                                                laststarttime:"无数据",
                                                starteventdate:"无数据",
                                                chinesestart:"起点：",
                                                chineseend:"终点：",
                                                lastendtime:registerService.coverdate(e.content.trips[j].fireOffTime),
                                                endeventdate:registerService.coverdateyear(e.content.trips[j].fireOffTime),
                                                startpoint: $scope.todayaddressa,
                                                endpoint: $scope.endaddressa,
                                                pointpoint:"........."
                                            };
                                            //$scope.lastdateinfo = e.content.trips;
                                        }else if(e.content.trips[j].fireOnTime!=0 && e.content.trips[j].fireOffTime ==0){
                                            e.content.trips[j].sed={
                                                laststarttime:registerService.coverdate(e.content.trips[j].fireOnTime),
                                                starteventdate:coverdatestart,
                                                chinesestart:"起点：",
                                                chineseend:"终点：",
                                                lastendtime:"无数据",
                                                endeventdate:"无数据",
                                                startpoint: $scope.todayaddressa,
                                                endpoint: $scope.endaddressa,
                                                pointpoint:"........."
                                            };
                                            //$scope.lastdateinfo = e.content.trips;
                                        }else{
                                            e.content.trips[j].sed={
                                                laststarttime:"无数据",
                                                starteventdate:"无数据",
                                                chinesestart:"起点：",
                                                chineseend:"终点：",
                                                lastendtime:"无数据",
                                                endeventdate:"无数据",
                                                startpoint: $scope.todayaddressa,
                                                endpoint: $scope.endaddressa,
                                                pointpoint:"........."
                                            };
                                            //$scope.lastdateinfo = e.content.trips;
                                        }
                                        sbfunction();
                                        //$scope.lastdateinfo = e.content.trips;


                                    }else if(coverdatestart != coverdateend && coverdateend == coverdateendlasteand){
                                        //第三种情况
                                        console.log("第三种情况");


                                        if(e.content.trips[j].fireOnTime !=0 && e.content.trips[j].fireOffTime !=0){
                                            e.content.trips[j].thr={
                                                laststarttime:registerService.coverdate(e.content.trips[j].fireOnTime),
                                                starteventdate:coverdatestart,
                                                chinesestart:"起点：",
                                                chineseend:"终点：",
                                                lastendtime:registerService.coverdate(e.content.trips[j].fireOffTime),
                                                endeventdate:registerService.coverdateyear(e.content.trips[j].fireOffTime),
                                                startpoint: $scope.todayaddressa,
                                                endpoint: $scope.endaddressa,
                                                pointpoint:"........."
                                            };
                                            //$scope.lastdateinfo = e.content.trips;
                                            console.log("执行了");
                                        }else if(e.content.trips[j].fireOnTime==0 && e.content.trips[j].fireOffTime !=0){
                                            e.content.trips[j].thr={
                                                laststarttime:"无数据",
                                                starteventdate:"无数据",
                                                chinesestart:"起点：",
                                                chineseend:"终点：",
                                                lastendtime:registerService.coverdate(e.content.trips[j].fireOffTime),
                                                endeventdate:registerService.coverdateyear(e.content.trips[j].fireOffTime),
                                                startpoint: $scope.todayaddressa,
                                                endpoint: $scope.endaddressa,
                                                pointpoint:"........."
                                            };
                                            //$scope.lastdateinfo = e.content.trips;
                                        }else if(e.content.trips[j].fireOnTime!=0 && e.content.trips[j].fireOffTime ==0){
                                            e.content.trips[j].thr={
                                                laststarttime:registerService.coverdate(e.content.trips[j].fireOnTime),
                                                starteventdate:coverdatestart,
                                                chinesestart:"起点：",
                                                chineseend:"终点：",
                                                lastendtime:"无数据",
                                                endeventdate:"无数据",
                                                startpoint: $scope.todayaddressa,
                                                endpoint: $scope.endaddressa,
                                                pointpoint:"........."
                                            };
                                            //$scope.lastdateinfo = e.content.trips;
                                        }else{
                                            e.content.trips[j].thr={
                                                laststarttime:"无数据",
                                                starteventdate:"无数据",
                                                chinesestart:"起点：",
                                                chineseend:"终点：",
                                                lastendtime:"无数据",
                                                endeventdate:"无数据",
                                                startpoint: $scope.todayaddressa,
                                                endpoint: $scope.endaddressa,
                                                pointpoint:"........."
                                            };
                                            //$scope.lastdateinfo = e.content.trips;
                                        }
                                        sbfunction();
                                        //$scope.lastdateinfo = e.content.trips;


                                    }
                                }
                            };
                            $scope.laststarttranslocand();

                        }else{
                            //e.length=0的时候
                            $scope.notripcontent = false;//无行程
                            $scope.clickonload = true;//点击加载
                            $scope.cartriploading = true;//加载中
                            $scope.thelastpagecartripover = true;//加载完全
                            $scope.clickandaddloads = true;//继续加载
                            console.log("无数据")
                        }



                    }else{
                        $scope.subapp= {"toggle":true};
                        $scope.submitWarning = e.err+"！";
                        $scope.timerrlasttripreasonapp = $timeout(function(){
                            $scope.subapp= {"toggle":false};
                        },2000);

                            $scope.notripcontent = true;//无行程
                            $scope.clickonload =true ;//点击加载
                            $scope.cartriploading = true;//加载中
                            $scope.thelastpagecartripover = true;//加载完全
                            $scope.clickandaddloads =false ;//继续加载
                        $scope.lastandloadtripdis= false;//last的行程可点击

                    }
                },500);


            },function(err){
                $scope.loadapp = {"toggle":false};
                $scope.subapp= {"toggle":true};
                $scope.lasttripendtimehs = new Date().getTime();
                console.log("请求时间差："+$scope.lasttripendtimehs - $scope.lasttripstarttimehs);
                if($scope.lasttripendtimehs - $scope.lasttripstarttimehs>=6500){
                    $scope.submitWarning = "请求超时！";
                }else {
                    $scope.submitWarning = "网络连接失败！";
                }
                //$scope.submitWarning = "网络连接失败！";
                $scope.timerrlasterrtime = $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);

                    $scope.notripcontent = true;//无行程
                    $scope.clickonload =true ;//点击加载
                    $scope.cartriploading = true;//加载中
                    $scope.thelastpagecartripover = true;//加载完全
                    $scope.clickandaddloads =false ;//继续加载
                $scope.lastandloadtripdis= false;//last的行程可点击


            });
        };
        //var lnglatXY=[116.396574, 39.992706];
        //registerService.covertAddress(lnglatXY);
        $scope.to = function() {
            <!--alert("this is alert");-->

            <!--navigator.intent.startGPS("  Json");-->
            <!--navigator.intent.startGPS("  Json");-->
            navigator.intent.toHistory(
                {"termId":$window.sessionStorage.getItem("UtermId"),"token":$window.sessionStorage.getItem("Utoken"),"startTime":$rootScope.starttimee,"endTime":$rootScope.endtimee,"seq":123456,"startName":$rootScope.startaddresse,"endName":$rootScope.endaddresse
                });
        };
        $scope.iosto = function(){
            mybridge.callHandler('trackObjcCallback', {"termId":$window.sessionStorage.getItem("UtermId"),"token":$window.sessionStorage.getItem("Utoken"),"startTime":$rootScope.starttimee,"endTime":$rootScope.endtimee,"seq":123456,"startName":$rootScope.startaddresse,"endName":$rootScope.endaddresse
            }, function(response) {
                log('JS got response', response)
            })

        };

        //点击加载行程地图
        $scope.cartripmapbtn = function(index){
            var etriphistory = $scope.lastdateinfo;

            $rootScope.endtimee = registerService.coverdateerooter(etriphistory[index].fireOffTime);
            $rootScope.starttimee = registerService.coverdateerooter(etriphistory[index].fireOnTime);

            $rootScope.startaddresse = etriphistory[index].startpoint;
            $rootScope.endaddresse = etriphistory[index].endpoint;
            console.log("时间这块"+$rootScope.endtimee,$rootScope.starttimee,$rootScope.startaddresse,$rootScope.endaddresse);
            if($rootScope.phonetyperoot == 3){
                $scope.to();
            }else if($rootScope.phonetyperoot == 4){
                $scope.iosto();
            }

            //console.log($rootScope.endlat,$rootScope.endlng,$rootScope.startlat,$rootScope.staratlng);
            //$state.go("");

        };
        //点击加载行程地图
        $scope.firsttripbtn = function(index){
            var firsttriphistory = $scope.todaytripinfo;
            $rootScope.endtimee = registerService.coverdateerooter(firsttriphistory[index].fireOffTime);
            $rootScope.starttimee = registerService.coverdateerooter(firsttriphistory[index].fireOnTime);
            $rootScope.startaddresse = firsttriphistory[index].startAddresscontent;
            $rootScope.endaddresse = firsttriphistory[index].endAddresscontent;
            console.log("时间这块"+$rootScope.endtimee,$rootScope.starttimee,$rootScope.startaddresse,$rootScope.endaddresse);
            if($rootScope.phonetyperoot == 3){
                $scope.to();
            }else if($rootScope.phonetyperoot == 4){
                $scope.iosto();
            }
            //console.log($rootScope.endlat,$rootScope.endlng,$rootScope.startlat,$rootScope.staratlng);
        };

        //if("\v"=="v") {
        //    $(".datewidthcj").onpropertychange = webChange;
        //}else{
        //    $(".datewidthcj").bind("input",webChange);
        //}
        //function webChange(){
        //    //if(element.value){document.getElementById("test").innerHTML = element.value};
        //    console.log("js监听事件");
        //    $scope.lastdateinfo = null;
        //    $scope.notripcontent = true;//无行程
        //    $scope.clickonload = false;//点击加载
        //    $scope.cartriploading = true;//加载中
        //    $scope.thelastpagecartripover =true ;//加载完全
        //    $scope.clickandaddloads = true;//继续加载
        //}

        //监听路由的变化
        $scope.$on('$stateChangeStart',

            function(event, toState, toParams, fromState, fromParams){
                console.log("toState:"+JSON.stringify(toState));
                console.log("toParams:"+JSON.stringify(toParams));
                console.log("fromState:"+JSON.stringify(fromState));
                console.log("fromParams:"+JSON.stringify(fromParams));
                console.log("获取路由地址："+$location.path());
                if(fromState.name=="mains.home.cartripInformation"){
                    $(".dw-persp").css({"display":"none"});
                    console.log($scope.timerr);
                    $interval.cancel($scope.timerr);
                    console.log("关闭定时器,先出来");
                    console.log($scope.timerr)

                }

            });
    })
    //车辆报警
    .controller("alarmrecordController",function($location,$scope,$rootScope,$state,registerService,$interval,$window,$timeout ,a ,b){
        $scope.timealarmcordfir = $timeout(function(){
            registerService.datecommon();
        },200);
        $scope.$on('$destroy',function(){
            console.log($scope.timerr);
            $interval.cancel($scope.timerr);
            console.log("关闭定时器,先出来");
            console.log($scope.timerr);
        });
        $scope.dateinputdis = true;
        $rootScope.colorfff5 = true;
        $rootScope.coloryyy5 = false;
        $scope.searchPassBackBtn = function(){
            window.history.go(-1);
        };
        $scope._topnot=(parseFloat($rootScope.windoWHeihgt) - 120)/2 +"px";
        //console.log($scope._top);

        $scope.modelpositionStnot = {
            "top":$scope._topnot
        };
        $scope.$watch('oalarmstartTime',  function(newValue, oldValue) {
            console.log(22222222,newValue, oldValue)
            if (newValue === oldValue){
                return;
            }else {
                $scope.alarmrecordInfo = null;
                $scope.alarmclick1=true ;
                $scope.alarmclick2= true;
                $scope.alarmclicknew =false ;
                $scope.alarmclick3= true;
                $scope.alarmclick4 = true;
            }
        });
        $scope.$watch('alarmoverTime',  function(newValue, oldValue) {
            if (newValue === oldValue){
                return;
            }else {
                $scope.alarmrecordInfo = null;
                $scope.alarmclick1=true ;
                $scope.alarmclick2= true;
                $scope.alarmclicknew =false ;
                $scope.alarmclick3= true;
                $scope.alarmclick4 = true;
                $scope.startDate="";
                $scope.endDate="";
                // $scope.alarmdateyesbtn();
            }
        });
        //$(".dwb-s").click(function(){
        //    console.log(111224445455,$("#appDate").val());
        //})
        //$('#appDate').on('input propertychange', function() {
        //    console.log($(this).val().length + ' characters');
        //});
        //$
        //$rootScope.checkConnection();
        //function prostatus(){
        //    return false;
        //}
        //prostatus()
        //$scope.backappfunctionsmall = function(){
        //    registerService.removeevent();
        //};
        //$scope.backappfunctionsmall();
        $scope._top=(parseFloat($rootScope.windoWHeihgt) - 200)/2 +"px";

        console.log($scope._top);
        $scope.modelpositionSt = {
            "top":$scope._top
        };
        //if($rootScope.alarmcount == 0){
        //    $scope.alarmallstatusmodel= "全部标记为已读";
        //    $scope.allalarmblur = true;
        //}else if($rootScope.alarmcount > 0){
        //标记为已读的按钮
        $scope.alarmallstatusmodel= "全部标记为已读";
        $scope.allalarmblur = true;
        $scope.allstatusalarmdis= false;
        //}
        $scope.allastatusalarmbtn = function(){
            $scope.allstatusalarmdis= true;
            $scope.allalarmblur = false;
            var allstatusalarmobj = {
                termId:Number($window.sessionStorage.getItem("UtermId")),
                status:1
            };
            var allstatusalarmUrl = "/rest/alarms/updateAll/";
            $scope.loadapp = {"toggle":true};
            $scope.allstatusalarmstarttimehs = new Date().getTime();
            registerService.commonUser(allstatusalarmobj,allstatusalarmUrl).then(function(e){

                $scope.allstatusalarmdis=false ;
                $scope.allalarmblur = true;
                if(e.status == true){
                    try{
                        for(var i = 0;i<$scope.alarmrecordInfo.length;i++){
                            var contentalarming = $scope.alarmrecordInfo;
                            contentalarming[i].isalarmstatus = false;
                            $scope.alarmrecordInfo = contentalarming;

                            $scope.alarmrecordInfo = contentalarming;
                            console.log("已经标记了");
                            if(i==$scope.alarmrecordInfo.length-1){
                                $scope.loadapp = {"toggle":false};
                            }

                        }
                    }catch (err){

                    }

                }else if(e.status == false) {
                    $scope.loadapp = {"toggle":false};
                    $scope.subapp= {"toggle":true};
                    $scope.submitWarning = e.err+"！";
                    $scope.timealarmtimeerr = $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                }
            },function(err){
                $scope.loadapp = {"toggle":false};
                $scope.allstatusalarmdis=false ;
                $scope.allalarmblur = true;
                $scope.subapp= {"toggle":true};
                $scope.allstatusalarmendtimehs = new Date().getTime();
                console.log("请求时间差："+$scope.allstatusalarmendtimehs - $scope.allstatusalarmstarttimehs);
                if($scope.allstatusalarmendtimehs - $scope.allstatusalarmstarttimehs>=6500){
                    $scope.submitWarning = "请求超时！";
                }else {
                    $scope.submitWarning = "网络连接失败！";
                }
                //$scope.submitWarning = "网络连接失败！";
                $scope.timealarmtimeerr = $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            })
        };
        $scope.allnoalarmblur = true;
        $scope.allnoastatusalarmbtn = function(){
            $scope.allnostatusalarmdis= true;
            $scope.allnoalarmblur = false;
            var allstatusalarmobj = {
                termId:Number($window.sessionStorage.getItem("UtermId")),
                status:0
            };
            var allstatusalarmUrl = "/rest/alarms/updateAll/";
            $scope.loadapp = {"toggle":true};
            $scope.allstatusalarmstarttimehs = new Date().getTime();
            registerService.commonUser(allstatusalarmobj,allstatusalarmUrl).then(function(e){

                $scope.allnostatusalarmdis=false ;
                $scope.allnoalarmblur = true;
                if(e.status == true){
                    try{
                        for(var i = 0;i<$scope.alarmrecordInfo.length;i++){
                            var contentalarming = $scope.alarmrecordInfo;
                            contentalarming[i].isalarmstatus = true;
                            $scope.alarmrecordInfo = contentalarming;

                            $scope.alarmrecordInfo = contentalarming;
                            console.log("已经标记了");
                            if(i==$scope.alarmrecordInfo.length-1){
                                $scope.loadapp = {"toggle":false};
                            }

                        }
                    }catch (err){

                    }

                }else if(e.status == false) {
                    $scope.loadapp = {"toggle":false};
                    $scope.subapp= {"toggle":true};
                    $scope.submitWarning = e.err+"！";
                    $scope.timealarmtimeerr = $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                }
            },function(err){
                $scope.loadapp = {"toggle":false};
                $scope.allnostatusalarmdis=false ;
                $scope.allnoalarmblur = true;
                $scope.subapp= {"toggle":true};
                $scope.allstatusalarmendtimehs = new Date().getTime();
                console.log("请求时间差："+$scope.allstatusalarmendtimehs - $scope.allstatusalarmstarttimehs);
                if($scope.allstatusalarmendtimehs - $scope.allstatusalarmstarttimehs>=6500){
                    $scope.submitWarning = "请求超时！";
                }else {
                    $scope.submitWarning = "网络连接失败！";
                }
                //$scope.submitWarning = "网络连接失败！";
                $scope.timealarmtimeerr = $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            })
        }
        //$scope.windoWHeihgt = ($(window).height())*1+"px";
        $scope.winHeight = {
            "height":$rootScope.windoWHeihgt
        };
        $scope.alarmrecordPage = 0;

        //监听路由的变化
        console.log($state)
        $scope.alarmrecordPage = 0;
        $scope.oalarmstartTime = registerService.getdatestr(-10);
        $scope.alarmoverTime=  registerService.getdatestr(0);
        $scope.alarmfirObj = {
            termId:Number($window.sessionStorage.getItem("UtermId")),
            startTime:Number(new Date(registerService.getdatestrnochinese(-10)+" 00:00:00").getTime()),
            endTime:Number(new Date(registerService.getTimems()+" 23:59:59").getTime()),
            pageIndex:$scope.alarmrecordPage,
            pageSize:6
        };
        if(a&&b){
            $scope.alarmfirObj = {
                termId:Number($window.sessionStorage.getItem("UtermId")),
                startTime:Number(new Date($rootScope.alarmstartTime +" 00:00:00").getTime()),
                endTime:Number(new Date($rootScope.alarmoverTime +" 23:59:59").getTime()),
                pageIndex:$scope.alarmrecordPage,
                pageSize:6
            };
            $scope.oalarmstartTime = $rootScope.alarmstartTime;
            $scope.alarmoverTime =  $rootScope.alarmoverTime;
        }
        $scope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams){
                console.log("toState:"+JSON.stringify(toState));
                console.log("toParams:"+JSON.stringify(toParams));
                console.log("fromState:"+JSON.stringify(fromState));
                console.log("fromParams:"+JSON.stringify(fromParams));
                console.log("获取路由地址："+$location.path());
                if(fromState.name=="mains.home.alarmRecord"){
                    $(".dw-persp").css({"display":"none"});
                }
                $scope.alarmrecordPage = 0;
                $scope.alarmfirObj = {
                    termId:Number($window.sessionStorage.getItem("UtermId")),
                    startTime:Number(new Date(registerService.getdatestrnochinese(-10)+" 00:00:00").getTime()),
                    endTime:Number(new Date(registerService.getTimems()+" 23:59:59").getTime()),
                    pageIndex:$scope.alarmrecordPage,
                    pageSize:6
                };
                $scope.oalarmstartTime = registerService.getdatestr(-10);
                $scope.alarmoverTime=  registerService.getdatestr(0);
                console.log("????????");
                if(fromState.name == "searchmore"){
                    $scope.alarmfirObj = {
                        termId:Number($window.sessionStorage.getItem("UtermId")),
                        startTime:Number(new Date($rootScope.alarmstartTime +" 00:00:00").getTime()),
                        endTime:Number(new Date($rootScope.alarmoverTime +" 23:59:59").getTime()),
                        pageIndex:$scope.alarmrecordPage,
                        pageSize:6
                    };
                    $scope.oalarmstartTime = $rootScope.alarmstartTime;
                    $scope.alarmoverTime =  $rootScope.alarmoverTime;
                }

            });



        $scope.alarmUrl = "/rest/alarms/period/";
        $scope.alarminit = function(){
            $scope.alarmandloaddis = true;//继续加载不能点击
            $scope.loadapp = {"toggle":true};
            $scope.alarmrecordInfo = null;
            $scope.alarmclick1=true ;
            $scope.alarmclick2= false;
            $scope.alarmclicknew = true;
            $scope.alarmclick3= true;
            $scope.alarmclick4 = true;
            $scope.alarmloadtimeout = $timeout(function(){
                $scope.loadapp = {"toggle":false};
            },10000);
            $scope.alarmfirstarttimehs = new Date().getTime();
            registerService.commonUser($scope.alarmfirObj,$scope.alarmUrl).then(function(e){

                $scope.alarmloadtimeoutzhege = $timeout(function(){
                    $scope.loadapp = {"toggle":false};
                    if(e.status == true){
                        //$rootScope.alarmcount = 0;
                        //$rootScope.alarmiconcountnone= true;
                        if(e.content.currentSize != 0){
                            console.log(e);
                            $scope.alarmrecordPage ++;
                            if(e.content.currentPage == e.content.totalPages-1){
                                $scope.alarmclick1=true ;
                                $scope.alarmclick2= true;
                                $scope.alarmclicknew = true;
                                $scope.alarmclick3= false;
                                $scope.alarmclick4 = true;
                            }else{
                                $scope.alarmclick1=false ;
                                $scope.alarmclicknew = true;
                                $scope.alarmclick2= true;
                                $scope.alarmclick3= true;
                                $scope.alarmclick4 = true;
                            }
                            for(var i in e.content.alarms){
                                e.content.alarms[i].describe = "正在解析！";
                                e.content.alarms[i].gpstime = "正在解析！";
                                if(e.content.alarms[i].status == 0){
                                    e.content.alarms[i].isalarmstatus = true;
                                }else {
                                    e.content.alarms[i].isalarmstatus = false;
                                }
                                if(e.content.alarms[i].plugout == 1){
                                    e.content.alarms[i].alarmstyle = "电池拔出";
                                }else if(e.content.alarms[i].lowVoltage == 1){
                                    e.content.alarms[i].alarmstyle = "低电压";
                                }else if(e.content.alarms[i].vibration == 1){
                                    e.content.alarms[i].alarmstyle = "碰撞报警";
                                }

                            }
                            console.log("here 1",$scope);
                            console.log("看这个"+$scope.alarmrecordInfo);
                            //if($scope.alarmrecordInfo){
                            //    $scope.alarmrecordInfo = $scope.alarmrecordInfo.concat(e.content.alarms);
                            //}else{
                            $scope.alarmrecordInfo = e.content.alarms;
                            //}

                            var j = 0;
                            $scope.transloc = function(){
                                var lnglatXY =[e.content.alarms[j].lng,e.content.alarms[j].lat];
                                e.content.alarms[j].gpstime = new Date(e.content.alarms[j].gpsTime);

                                //$scope.warningadd = registerService.covertAddress(lnglatXY);
                                console.log(2222222222,lnglatXY);
                                if(e.content.alarms[j].lat !=0){
                                    try {
                                        AMap.convertFrom(lnglatXY,"gps",function(status,result){
                                            function alarmcoverlaglatf(){
                                                AMap.service('AMap.Geocoder',function() {
                                                    $scope.warningadd = new AMap.Geocoder({});
                                                    console.log("这个是什么鬼："+lnglatXYcover)
                                                    $scope.warningadd.getAddress([lnglatXYcover], function (status, result) {
                                                        console.log(66666,status);
                                                        console.log(555555,result);
                                                        if (status === 'complete' && result.info === 'OK') {
                                                            if(result.regeocodes[0].formattedAddress ==""){
                                                                $scope.addressa = "获取地址失败";
                                                            }else {
                                                                $scope.addressa = result.regeocodes[0].formattedAddress;
                                                            }

                                                            e.content.alarms[j].describe = $scope.addressa;
                                                            $scope.$apply(function () {
                                                                $scope.alarmrecordInfo = e.content.alarms;
                                                            })
                                                            j++;
                                                            console.log("查看j的数值：",j);
                                                            if (j < e.content.alarms.length) {
                                                                $scope.transloc();
                                                            } else {
                                                                $scope.alarmandloaddis = false;//继续加载可以点击
                                                            }
                                                        } else {
                                                            $scope.addressa = "获取地址失败";
                                                            e.content.alarms[j].describe = $scope.addressa;
                                                            $scope.$apply(function () {
                                                                $scope.alarmrecordInfo = e.content.alarms;
                                                            })
                                                            j++;
                                                            console.log("查看j的数值：",j);
                                                            if (j < e.content.alarms.length) {
                                                                $scope.transloc();
                                                            } else {
                                                                $scope.alarmandloaddis = false;//继续加载可以点击
                                                            }


                                                        }

                                                    });
                                                });
                                            }
                                            if (result.info === 'ok') {
                                                var lnglatXYcover = result.locations[0];
                                                console.log(22222,333333,lnglatXYcover);
                                                //var s = result.locations[0];
                                                alarmcoverlaglatf();
                                            }else {
                                                var lnglatXYcover = lnglatXY;
                                                console.log(333333,lnglatXYcover);
                                                alarmcoverlaglatf();
                                            }
                                        });
                                        $scope.initfalseapp= {"toggle":false};
                                    }catch (err){

                                        $scope.initfalseapp= {"toggle":true};
                                        //$scope.subapp= {"toggle":true};

                                        $scope.goSubmitPage= function(){
                                            $state.go("submits");
                                            $scope.initfalseapp= {"toggle":false};
                                        };
                                        $scope.gomainhomePage = function(){
                                            $state.go("mains.home");
                                            $scope.initfalseapp= {"toggle":false};
                                        }
                                    }



                                }else {
                                    $scope.addressa = "获取地址失败";
                                    e.content.alarms[j].describe = $scope.addressa;
                                    $scope.$apply(function () {
                                        $scope.alarmrecordInfo = e.content.alarms;
                                    })
                                    //e.content.alarms[j].describe = "获取地址失败";
                                    j++;
                                    console.log("查看j的数值：",j);
                                    if (j < e.content.alarms.length) {
                                        $scope.transloc();
                                    } else {
                                        $scope.alarmandloaddis = false;//继续加载可以点击
                                    }
                                }

                            };
                            $scope.transloc();
                        }else {

                            $scope.alarmclick1=true ;
                            $scope.alarmclick2= true;
                            $scope.alarmclick3= true;
                            $scope.alarmclicknew = true;
                            $scope.alarmclick4 =false ;
                        }

                    }else{
                        $scope.alarmandloaddis = false;//继续加载可以点击
                        $scope.subapp= {"toggle":true};
                        $scope.submitWarning = e.err+"！";
                        $scope.timealarmtimereason = $timeout(function(){
                            $scope.subapp= {"toggle":false};
                        },2000);
                        $scope.alarmclick1= true;
                        $scope.alarmclicknew = false;
                        $scope.alarmclick2= true;
                        $scope.alarmclick3= true;
                        $scope.alarmclick4 = true;
                    }
                },500);

            },function(err){
                $scope.alarmandloaddis = false;//继续加载可以点击
                $scope.loadapp = {"toggle":false};
                $scope.subapp= {"toggle":true};
                $scope.alarmfirendtimehs = new Date().getTime();
                console.log("请求时间差："+$scope.alarmfirendtimehs - $scope.alarmfirstarttimehs);
                if($scope.alarmfirendtimehs - $scope.alarmfirstarttimehs>=6500){
                    $scope.submitWarning = "请求超时！";
                }else {
                    $scope.submitWarning = "网络连接失败！";
                }
                //$scope.submitWarning = "网络连接失败！";
                $scope.timealarmtimeerr = $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
                //$scope.alarmrecordPage = -1;
                console.log("报警失败");
                $scope.alarmclick1= true;
                $scope.alarmclicknew = false;
                $scope.alarmclick2= true;
                $scope.alarmclick3= true;
                $scope.alarmclick4 = true;
            });
        };
        //初始加载
        $scope.alarminit();
        $scope.alarmrecorddatebtn = function(){
            $scope.datediv = {toggle:true};
        };

        //console.log($scope.coveraddress([121.111,31.222]));

        $scope.date_yes = function(){
            if(($(".startyearnum").val() <= $(".overyearnum").val()) && ($(".startmonthnum").val()<=$(".overmonthnum").val()) && ($(".startdaynum").val()<=$(".overdaynum").val())){
                $scope.ostartTime = $(".startyearnum").val() +$(".startmonthnum").val()+$(".startdaynum").val();
                $scope.overTime = $(".overyearnum").val()+$(".overmonthnum").val()+$(".overdaynum").val();
                $scope.alarmajaxstarttime = $scope.ostartTime.replace('年','/').replace('月','/').replace('日','/');
                $scope.alarmajaxendtime = $scope.overTime.replace('年','/').replace('月','/').replace('日','/');
                $scope.timedateyesalarm =$timeout(function(){
                    $scope.datediv = {toggle:false};

                },200);
                $scope.alarmrecordPage = 0;
                $scope.alarmfirObj = {
                    uid:$window.sessionStorage.getItem("Uid"),
                    startTime:new Date($scope.alarmajaxstarttime+" 00:00:00"),
                    endTime:new Date($scope.alarmajaxendtime+" 23:59:59"),
                    pageIndex:$scope.alarmrecordPage,
                    pageSize:6
                };
                $scope.alarmUrl = "/rest/alarms/period/";
                $scope.alarminit();
            } else if(($(".startyearnum").val() <= $(".overyearnum").val()) && ($(".startmonthnum").val()<$(".overmonthnum").val())){
                $scope.ostartTime = $(".startyearnum").val() +$(".startmonthnum").val()+$(".startdaynum").val();
                $scope.overTime = $(".overyearnum").val()+$(".overmonthnum").val()+$(".overdaynum").val();
                $scope.alarmajaxstarttime = $scope.ostartTime.replace('年','').replace('月','').replace('日','');
                $scope.alarmajaxendtime = $scope.overTime.replace('年','').replace('月','').replace('日','');
                $scope.timedatayesalarmsed = $timeout(function(){
                    $scope.datediv = {toggle:false};

                },200);
                $scope.alarmrecordPage = 0;
                $scope.alarmfirObj = {
                    uid:$window.sessionStorage.getItem("Uid"),
                    startTime:$scope.alarmajaxstarttime+"000000",
                    endTime:$scope.alarmajaxendtime+"235959",
                    pageNumber:$scope.alarmrecordPage,
                    limit:3
                };
                $scope.alarmUrl = "/rest/alarms/period/";
                $scope.alarminit();
            } else if(($(".startyearnum").val() < $(".overyearnum").val())){
                $scope.ostartTime = $(".startyearnum").val() +$(".startmonthnum").val()+$(".startdaynum").val();
                $scope.overTime = $(".overyearnum").val()+$(".overmonthnum").val()+$(".overdaynum").val();
                $scope.alarmajaxstarttime = $scope.ostartTime.replace('年','/').replace('月','/').replace('日','/');
                $scope.alarmajaxendtime = $scope.overTime.replace('年','/').replace('月','/').replace('日','/');
                $scope.timealarmdatethr = $timeout(function(){
                    $scope.datediv = {toggle:false};

                },200);
                $scope.alarmrecordPage = 0;
                $scope.alarmfirObj = {
                    uid:$window.sessionStorage.getItem("Uid"),
                    startTime:$scope.alarmajaxstarttime+"000000",
                    endTime:$scope.alarmajaxendtime+"235959",
                    pageNumber:$scope.alarmrecordPage,
                    limit:3
                };
                $scope.alarmUrl = "/rest/alarms/period/";
                $scope.alarminit();
            } else{
                //$rootScope.subapp = {toggle : true};
                //$rootScope.submitWarning = "结束日期大于开始日期，请您重新确认！";
                $scope.datediv = {toggle:false};
                //console.log("riqi");
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "开始日期大于结束日期，请您重新确认！";
                $scope.timedatayesfour = $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }

        };
        $scope.dateModelhide = function(){
            $scope.datediv = {toggle:false};
            console.log(1);
        };
        $scope.showdatemodelbtn = function(){
            $scope.datediv = {toggle:true};
        };
        //初始的时候
        $scope.alarmclick1=true ;
        $scope.alarmclicknew= true;
        $scope.alarmclick2= false;
        $scope.alarmclick3= true;
        $scope.alarmclick4 = true;
        //console.log(registerService.getTime()-1);

        //$scope.firstarttime = registerService.getTime()-1+"000000";
        //$scope.firendtime = registerService.getTime()-1+"235959";
        //继续加载
        $scope.alarmrecordload = function(){
            //$scope.alarmrecordPage +=1;
            //if($scope.oAstartTime){
            //    $scope.firstarttime = $scope.oAstartTime;
            //    $scope.firendtime=$scope.oAverTime;
            //
            //}else{
            //    $scope.firstarttime = registerService.getTime()-10+"000000";
            //    $scope.firendtime = registerService.getTime()+"235959";
            //}
            $scope.alarmandloaddis = true;//继续加载不可以点击
            if($scope.startDate&&$scope.endDate){
                $scope.alarmfirObj = {
                    termId:Number($window.sessionStorage.getItem("UtermId")),
                    startTime:$scope.startDate,
                    endTime:$scope.endDate,
                    pageIndex:$scope.alarmrecordPage,
                    pageSize:6
                };
            }else{
                $scope.alarmfirObj = {
                    termId:Number($window.sessionStorage.getItem("UtermId")),
                    startTime:Number(new Date($("#appDate").val().replace('-',"/").replace('-',"/")+" 00:00:00").getTime()),
                    endTime:Number(new Date($("#appDateover").val().replace('-',"/").replace('-',"/")+" 23:59:59").getTime()),
                    pageIndex:$scope.alarmrecordPage,
                    pageSize:6
                };
            }
            console.log($scope.alarmfirObj);
           //$scope.alarminit();
            $scope.loadapp = {"toggle":true};
            $scope.alarmfirstarttimehs = new Date().getTime();
            registerService.commonUser($scope.alarmfirObj,$scope.alarmUrl).then(function(e){
                $scope.timeandloadalarmtime = $timeout(function(){
                    $scope.loadapp = {"toggle":false};
                    $scope.alarmclick1=true ;
                    $scope.alarmclick2= false;
                    $scope.alarmclick3= true;
                    if(e.status == true){
                        console.log(e);
                        $scope.alarmrecordPage ++;
                        //$scope.alarmrecordPage = 1;

                        if(e.content.currentPage == e.content.totalPages-1){
                            $scope.alarmclick1=true ;
                            $scope.alarmclick2= true;
                            $scope.alarmclick3= false;
                        }else{
                            $scope.alarmclick1=false ;
                            $scope.alarmclick2= true;
                            $scope.alarmclick3= true;
                        }
                        //for(var i = 0;i<e.alarmLists.length;i++){
                        //    var lnglatXY =[e.alarmLists[i].LAT,e.alarmLists[i].LNG ];
                        //    if($scope.coveraddress(lnglatXY)){
                        //        $scope.addressa = $scope.coveraddress(lnglatXY);
                        //    }else{
                        //        $scope.addressa = "获取位置失败！";
                        //    }
                        //    e.alarmLists[i].describe = $scope.addressa;
                        //
                        //}
                        //console.log($scope.coveraddress([121.11111,31.3333]));
                        //console.log(registerService.lngcoverAddress(lnglatXY));
                        //$scope.alarmrecordInfo = e.alarmLists;
                        //console.log($scope.alarmrecordInfo);
                        for(var i in e.content.alarms){
                            e.content.alarms[i].describe = "正在解析！";
                            e.content.alarms[i].gpstime = "正在解析！";

                        }
                        //e.alarmLists[j].gpstime = new Date(e.alarmLists[j].GPS_TIME)

                        //$scope.timeaddalarmtimefir = $timeout(function(){
                        //$scope.alarmrecordInfo = $scope.alarmrecordInfo.concat(e.content.alarms);
                        console.log(typeof $scope.alarmrecordInfo);
                        //$scope.alarmrecordInfo.push(e.content.alarms[j])
                        //$scope.alarmrecordInfo += e.content.alarms;
                        //},200);
                        var j = 0;
                        $scope.transloc = function(){
                            var lnglatXY =[e.content.alarms[j].lng,e.content.alarms[j].lat];
                            e.content.alarms[j].gpstime = new Date(e.content.alarms[j].gpsTime)
                            if(e.content.alarms[j].plugout == 1){
                                e.content.alarms[j].alarmstyle = "电池拔出";
                            }else if(e.content.alarms[j].lowVoltage == 1){
                                e.content.alarms[j].alarmstyle = "低电压";
                            }else if(e.content.alarms[j].vibration == 1){
                                e.content.alarms[j].alarmstyle = "碰撞报警";
                            }
                            if(e.content.alarms[j].status == 0){
                                e.content.alarms[j].isalarmstatus =true ;
                            }else {
                                e.content.alarms[j].isalarmstatus = false;
                            }
                            if(e.content.alarms[j].lat !=0){

                                AMap.convertFrom(lnglatXY,"gps",function(status,result){
                                    function alarmaddjiacoverlnglarfun(){
                                        AMap.service('AMap.Geocoder',function() {
                                            $scope.warningadd = new AMap.Geocoder({});
                                            $scope.warningadd.getAddress([lnglatXYcover], function (status, result) {
                                                if (status === 'complete' && result.info === 'OK') {
                                                    if(result.regeocodes[0].formattedAddress == ""){
                                                        $scope.addressa = "获取地址失败";
                                                    }else {
                                                        $scope.addressa = result.regeocodes[0].formattedAddress;
                                                    }

                                                    e.content.alarms[j].describe = $scope.addressa;
                                                    //$scope.timealarmandpushtime = $timeout(function(){

                                                        $scope.alarmrecordInfo.push(e.content.alarms[j]);
                                                        j++;
                                                        if (j < e.content.alarms.length) {

                                                            $scope.transloc();

                                                        } else {
                                                            $scope.alarmandloaddis = false;//继续加载可以点击
                                                        }
                                                    //},20);



                                                } else {
                                                    $scope.addressa = "获取地址失败";
                                                    //if(e.content.alarms[j].status == 0){
                                                    //    e.content.alarms[j].isalarmstatus = true;
                                                    //}else {
                                                    //    e.content.alarms[j].isalarmstatus = false;
                                                    //}
                                                    e.content.alarms[j].describe = $scope.addressa;
                                                    //$scope.timealarmandpushtime = $timeout(function(){

                                                        $scope.alarmrecordInfo.push(e.content.alarms[j]);
                                                        j++;
                                                        if (j < e.content.alarms.length) {

                                                            $scope.transloc();

                                                        } else {
                                                            $scope.alarmandloaddis = false;//继续加载可以点击
                                                        }
                                                    //},20);


                                                }
                                                //$scope.timeaddalarmtime = $timeout(function(){
                                                //$scope.alarmrecordInfo = $scope.alarmrecordInfo.concat(e.content.alarms);

                                                //$scope.alarmrecordInfo += e.content.alarms;
                                                //},20);



                                            });
                                        });
                                    }
                                    if (result.info === 'ok') {
                                        var lnglatXYcover = result.locations[0];
                                        console.log(22222,333333,lnglatXYcover);
                                        //var s = result.locations[0];
                                        alarmaddjiacoverlnglarfun();
                                    }else {
                                        var lnglatXYcover = lnglatXY;
                                        console.log(333333,lnglatXYcover);
                                        alarmaddjiacoverlnglarfun();
                                    }
                                });
                            }else {
                                //e.content.alarms[j].describe = "获取地址失败";
                                $scope.addressa = "获取地址失败";
                                if(e.content.alarms[j].status == 0){
                                    e.content.alarms[j].isalarmstatus = true;
                                }else {
                                    e.content.alarms[j].isalarmstatus =false ;
                                }
                                e.content.alarms[j].describe = $scope.addressa;
                                //$scope.timealarmandpushtime = $timeout(function(){

                                $scope.alarmrecordInfo.push(e.content.alarms[j]);
                                j++;
                                if (j < e.content.alarms.length) {

                                    $scope.transloc();

                                } else {
                                    $scope.alarmandloaddis = false;//继续加载可以点击
                                }
                            }

                        };
                        $scope.transloc();

                    }else{
                        $scope.alarmandloaddis = false;//继续加载可以点击
                        $scope.subapp= {"toggle":true};
                        $scope.submitWarning = e.err+"！";
                        $scope.alarmclick1=false ;
                        $scope.alarmclick2= true;
                        $scope.alarmclick3= true;
                        $scope.timealarmwherereason = $timeout(function(){
                            $scope.subapp= {"toggle":false};
                        },2000);
                    }
                },500);
            },function(err){
                $scope.alarmandloaddis = false;//继续加载可以点击
                $scope.loadapp = {"toggle":false};
                $scope.subapp= {"toggle":true};
                $scope.alarmfirendtimehs = new Date().getTime();
                console.log("请求时间差："+$scope.alarmfirendtimehs - $scope.alarmfirstarttimehs);
                if($scope.alarmfirendtimehs - $scope.alarmfirstarttimehs>=6500){
                    $scope.submitWarning = "请求超时！";
                }else {
                    $scope.submitWarning = "网络连接失败！";
                }
                //$scope.submitWarning = "网络连接失败！";
                $scope.timealarmwhereerr = $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
                //$scope.alarmrecordPage = 0;
                console.log("报警失败");
                $scope.alarmclick1=false ;
                $scope.alarmclick2= true;
                $scope.alarmclick3= true;
            });
        };

        //点击搜索
        $scope.alarmdateyesbtn = function(startTimeParms ,endTimeParms ){
            if(startTimeParms&&endTimeParms){
                $scope.alarmrecordPage = 0;
                $scope.alarmfirObj = {
                    termId:Number($window.sessionStorage.getItem("UtermId")),
                    startTime:startTimeParms,
                    endTime:endTimeParms,
                    pageIndex:$scope.alarmrecordPage,
                    pageSize:6
                };
                $scope.alarmUrl = "/rest/alarms/period/";
                //初始加载
                $scope.alarminit();
            }else{
                $scope.searchalarmstart = $("#appDate").val().replace('-',"/").replace('-',"/")+" 00:00:00";
                $scope.searchalarmover = $("#appDateover").val().replace('-',"/").replace('-',"/")+" 23:59:59";
                if($scope.searchalarmstart < $scope.searchalarmover){
                    $scope.alarmrecordPage = 0;
                    $scope.alarmfirObj = {
                        termId:Number($window.sessionStorage.getItem("UtermId")),
                        startTime:Number(new Date($scope.searchalarmstart).getTime()),
                        endTime:Number(new Date($scope.searchalarmover).getTime()),
                        pageIndex:$scope.alarmrecordPage,
                        pageSize:6
                    };
                    console.log(registerService.getTime());
                    $scope.alarmUrl = "/rest/alarms/period/";
                    //初始加载
                    $scope.alarminit();
                }else {
                    $scope.subapp= {"toggle":true};
                    $scope.submitWarning = "开始日期大于结束日期，请您重新确认！";
                    $scope.timedataalarmdataerr = $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                    console.log("看这里啊");
                }

            }

        };
        //重新加载
        $scope.alarmrecordloadnew = function(){
            $scope.alarmdateyesbtn();
        };

    })
    //车辆状态
    .controller("vehicleStatusController",function($scope,$rootScope,$state,registerService,$interval,$window,$timeout){
        $scope.$on('$destroy',function(){
            console.log($scope.timerr)
            $interval.cancel($scope.timerr);
            console.log("关闭定时器,先出来");
            console.log($scope.timerr)
        });
        $rootScope.colorfff4 = true;
        $rootScope.coloryyy4 = false;
        $scope.searchPassBackBtn = function(){
            window.history.go(-1);
        };
        //$http获取数据
        $scope.vehiclestatusf = function(){
            //获取车辆状态信息 2017年3月22日 15:13:00
            $scope.carstatusUrl = "/rest/cmd/queryStatus/";
            $scope.carstatusObj = {
                appSN:parseInt(Number(new Date().getTime())/1000),
                termId:Number($window.sessionStorage.getItem("UtermId")),
                userCellPhone:Number($window.sessionStorage.getItem("Ucp"))
            };
            $scope.loadapp = {"toggle":true};
            registerService.getcarstatus($scope.carstatusObj,$scope.carstatusUrl).then(
                function(e){
                    console.log("success:",e);
                    $scope.loadapp = {"toggle": false };
                    if(e.status){
                        $scope.dateee = e.content.voltagePercent;
                        $scope.degspeedpoint =$scope.dateee* 3+'deg';
                        $scope.pointerstyle = {
                            "-webkit-transform": 'rotate('+$scope.degspeedpoint+')',
                            "-moz-transform": 'rotate('+$scope.degspeedpoint+')',
                            "-o-transform":'rotate('+$scope.degspeedpoint+')',
                            "-ms-transform":'rotate('+$scope.degspeedpoint+')',
                            "transform":'rotate('+$scope.degspeedpoint+')'
                        }
                        if(90<$scope.dateee && $scope.dateee<=100){
                            $scope.fulldegree = {
                                "background":'url(img/watch100.png) no-repeat',
                                "-webkit-background-size":'contain',
                                "background-size":'contain'
                            }
                        }else if(80<$scope.dateee && $scope.dateee<=90){
                            $scope.fulldegree = {
                                "background":'url(img/watch90.png) no-repeat',
                                "-webkit-background-size":'contain',
                                "background-size":'contain'
                            }
                        }else if(70<$scope.dateee && $scope.dateee<=80){
                            $scope.fulldegree = {
                                "background":'url(img/watch80.png) no-repeat',
                                "-webkit-background-size":'contain',
                                "background-size":'contain'
                            }
                        }else if(60<$scope.dateee && $scope.dateee<=70){
                            $scope.fulldegree = {
                                "background":'url(img/watch70.png) no-repeat',
                                "-webkit-background-size":'contain',
                                "background-size":'contain'
                            }
                        }else if(50<$scope.dateee && $scope.dateee<=60){
                            $scope.fulldegree = {
                                "background":'url(img/watch60.png) no-repeat',
                                "-webkit-background-size":'contain',
                                "background-size":'contain'
                            }
                        }else if(40<$scope.dateee && $scope.dateee<=50){
                            $scope.fulldegree = {
                                "background":'url(img/watch50.png) no-repeat',
                                "-webkit-background-size":'contain',
                                "background-size":'contain'
                            }
                        }else if(30<$scope.dateee && $scope.dateee<=40){
                            $scope.fulldegree = {
                                "background":'url(img/watch40.png) no-repeat',
                                "-webkit-background-size":'contain',
                                "background-size":'contain'
                            }
                        }else if(20<$scope.dateee && $scope.dateee<=30){
                            $scope.fulldegree = {
                                "background":'url(img/watch30.png) no-repeat',
                                "-webkit-background-size":'contain',
                                "background-size":'contain'
                            }
                        }else if(10<$scope.dateee && $scope.dateee<=20){
                            $scope.fulldegree = {
                                "background":'url(img/watch20.png) no-repeat',
                                "-webkit-background-size":'contain',
                                "background-size":'contain'
                            }
                        }else if(0<$scope.dateee && $scope.dateee<=10){
                            $scope.fulldegree = {
                                "background":'url(img/watch10.png) no-repeat',
                                "-webkit-background-size":'contain',
                                "background-size":'contain'
                            }
                        }else{
                            $scope.fulldegree = {
                                "background":'url(img/watch0.png) no-repeat',
                                "-webkit-background-size":'contain',
                                "background-size":'contain'
                            }
                        }
                        $scope.elenum = $scope.dateee+"%";

                        if(e.content.voltagePercent < 50){
                            $scope.elestatue= "电量不足";
                            $scope.elenumfull= false;
                            $scope.elenumless = true;
                        }else{
                            $scope.elestatue= "电量充足";
                            $scope.elenumfull= true;
                            $scope.elenumless = false;
                        }
                        if(e.content.plugOutAlarm == 1){
                            $scope.batteystatue= "电池拔出";
                            $scope.batteyyes= false;
                            $scope.batteyno = true;
                        }else{
                            $scope.batteystatue= "电池插入";
                            $scope.batteyyes= true;
                            $scope.batteyno = false;
                        }
                        if((e.content.fault.fault1 == 1)||(e.content.fault.fault2 == 1)||(e.content.fault.fault3 == 1)||(e.content.fault.fault4 == 1)||(e.content.fault.fault5 == 1)){
                            $scope.vibrationstatue= "车辆异常";
                            $scope.vibrationgood = false;
                            $scope.vibrationfalse = true;
                        }else{
                            $scope.vibrationstatue= "车辆正常";
                            $scope.vibrationgood = true;
                            $scope.vibrationfalse = false;
                        }
                    }else{
                        $scope.subapp= {"toggle":true};
                        $scope.submitWarning = e.err+"！";
                        $scope.timenoreasontime = $timeout(function(){
                            $scope.subapp= {"toggle":false};
                        },2000);
                    }
                },
                function (e) {
                    $scope.loadapp = {"toggle": false };
                    $scope.subapp= {"toggle":true};
                    console.log("error:",e);
                    $scope.submitWarning = "网络连接失败!";
                    $scope.timenoreasontime = $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                }
            )
        };

        //旋转的度数
        $scope.dateee = 0;//后台获取的数据
        $scope.degspeedpoint =$scope.dateee* 3+'deg';
        console.log($scope.degspeedpoint);//109度
        $scope.pointerstyle = {
            "-webkit-transform": 'rotate('+$scope.degspeedpoint+')',
            "-moz-transform": 'rotate('+$scope.degspeedpoint+')',
            "-o-transform":'rotate('+$scope.degspeedpoint+')',
            "-ms-transform":'rotate('+$scope.degspeedpoint+')',
            "transform":'rotate('+$scope.degspeedpoint+')'
        }
        if(90<$scope.dateee && $scope.dateee<=100){
            $scope.fulldegree = {
                "background":'url(img/watch100.png) no-repeat',
                "-webkit-background-size":'contain',
                "background-size":'contain'
            }
        }else if(80<$scope.dateee && $scope.dateee<=90){
            $scope.fulldegree = {
                "background":'url(img/watch90.png) no-repeat',
                "-webkit-background-size":'contain',
                "background-size":'contain'
            }
        }else if(70<$scope.dateee && $scope.dateee<=80){
            $scope.fulldegree = {
                "background":'url(img/watch80.png) no-repeat',
                "-webkit-background-size":'contain',
                "background-size":'contain'
            }
        }else if(60<$scope.dateee && $scope.dateee<=70){
            $scope.fulldegree = {
                "background":'url(img/watch70.png) no-repeat',
                "-webkit-background-size":'contain',
                "background-size":'contain'
            }
        }else if(50<$scope.dateee && $scope.dateee<=60){
            $scope.fulldegree = {
                "background":'url(img/watch60.png) no-repeat',
                "-webkit-background-size":'contain',
                "background-size":'contain'
            }
        }else if(40<$scope.dateee && $scope.dateee<=50){
            $scope.fulldegree = {
                "background":'url(img/watch50.png) no-repeat',
                "-webkit-background-size":'contain',
                "background-size":'contain'
            }
        }else if(30<$scope.dateee && $scope.dateee<=40){
            $scope.fulldegree = {
                "background":'url(img/watch40.png) no-repeat',
                "-webkit-background-size":'contain',
                "background-size":'contain'
            }
        }else if(20<$scope.dateee && $scope.dateee<=30){
            $scope.fulldegree = {
                "background":'url(img/watch30.png) no-repeat',
                "-webkit-background-size":'contain',
                "background-size":'contain'
            }
        }else if(10<$scope.dateee && $scope.dateee<=20){
            $scope.fulldegree = {
                "background":'url(img/watch20.png) no-repeat',
                "-webkit-background-size":'contain',
                "background-size":'contain'
            }
        }else if(0<$scope.dateee && $scope.dateee<=10){
            $scope.fulldegree = {
                "background":'url(img/watch10.png) no-repeat',
                "-webkit-background-size":'contain',
                "background-size":'contain'
            }
        }else{
            $scope.fulldegree = {
                "background":'url(img/watch0.png) no-repeat',
                "-webkit-background-size":'contain',
                "background-size":'contain'
            }
        }
        $scope.elenum = $scope.dateee+"%";
        $scope.elestatue= "电量充足";
        $scope.batteystatue= "电池插入";
        $scope.vibrationstatue= "车辆正常";
        $scope.elenumfull= true;
        $scope.elenumless = false;
        $scope.batteyyes= true;
        $scope.batteyno = false;
        $scope.vibrationgood= true;
        $scope.vibrationfalse = false;

        $scope.vehiclestatusf();
        //点击更新
        $scope.searchPassupdateBtn = function(){
            console.log("searchPassupdateBtnclick");
            $scope.vehiclestatusf();
        }
    })
    //服务与帮助
    .controller("serviceHelpController",function($scope,$rootScope,$state,registerService,$interval,$window,$timeout){
        $scope.$on('$destroy',function(){
            console.log($scope.timerr);
            $interval.cancel($scope.timerr);
            console.log("关闭定时器,先出来");
            console.log($scope.timerr)
        });
        $rootScope.colorfff6 = true;
        $rootScope.coloryyy6 = false;
        $scope.searchPassBackBtn = function(){
            window.history.go(-1);
        };
        $scope.userGuideClick = function () {
            $state.go("userGuide");
        };
        $scope.warderingnum = "500M";
    })
    //修改密码
    .controller("changePassController",function($scope,$rootScope,$state,registerService,$interval,$window,$timeout){
        $scope.searchPassBackBtn = function(){
            window.history.go(-1);
        };
        $scope.changepassoldcontentdis = false;
        $scope.changepassnewcontentdis = false;
        $scope.changepassagacontentdis = false;
        //$scope.backappfunctionsmall = function(){
        //    registerService.removeevent();
        //};
        //$scope.backappfunctionsmall();
        $scope.changepasspdis = false;
        //$scope.windoWHeihgt = ($(window).height())*1+"px";
        $scope.winHeight = {
            "height":$rootScope.windoWHeihgt
        };
        //验证旧密码是否正确
        //$scope.regphone =
        //$scope.checksearchpiconnone = true;
        //$scope.phonePatStyle = function(valid){
        //
        //}
        //点击修改密码的确定
        $scope.changeppassbtn = function(){

            var changePoldpass = $scope.changePassForm.changePoldpass.$modelValue;
            var changePnewpass = $scope.changePassForm.changePnewpass.$modelValue;
            var changePaganewpass = $scope.changePassForm.changePaganewpass.$modelValue;
            //var regNull=/(^\s*)|(\s*$)/g;
            //var regNull = /^\s*$/;
            //console.log("changePnewpass:"+changePnewpass);
            //console.log("changePaganewpass:"+changePaganewpass);
            if(!changePoldpass){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请输入旧密码！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else if(!changePnewpass){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请输入新密码！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            } else if(!changePaganewpass){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请输入确认新密码！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            } else if(changePnewpass != changePaganewpass){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "两次新密码输入不一致！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else if(changePnewpass.indexOf(" ")!=-1){
                console.log("新密码:",changePnewpass)
                console.log("新密码test:",changePnewpass.indexOf(" "))
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "新密码内容不能有空格！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            } else{
                $scope.changepassoldcontentdis = true;
                $scope.changepassnewcontentdis = true;
                $scope.changepassagacontentdis = true;
                $scope.changepasspdis = true;
                var searchpassObj = {
                    cp:Number($window.sessionStorage.getItem("Ucp")),
                    oldPwd:$.md5(changePoldpass),
                    newPwd:$.md5(changePnewpass)
                };
                var searchpassUrl = "/rest/user/resetPwd/";
                $scope.loadapp = {"toggle":true};
                $scope.searchpassstarttimehs = new Date().getTime();
                registerService.commonUser(searchpassObj,searchpassUrl).then(function(e){
                    $scope.changepassoldcontentdis = false;
                    $scope.changepassnewcontentdis = false;
                    $scope.changepassagacontentdis = false;
                    $scope.loadapp = {"toggle":false};
                    $scope.changepasspdis = false;
                    if(e.status == true){
                        $scope.hahaapp= {"toggle":true};
                        $scope.submithappy = "恭喜您，修改密码成功,请重新登录！";
                        $timeout(function(){
                            $scope.hahaapp= {"toggle":false};
                            $state.go("submits");
                        },2000);
                    }else{
                        $scope.subapp= {"toggle":true};
                        $scope.submitWarning = e.err+"!";
                        $timeout(function(){
                            $scope.subapp= {"toggle":false};
                        },2000);
                    }
                },function(err){
                    $scope.changepassoldcontentdis = false;
                    $scope.changepassnewcontentdis = false;
                    $scope.changepassagacontentdis = false;
                    $scope.loadapp = {"toggle":false};
                    $scope.changepasspdis = false;
                    $scope.subapp= {"toggle":true};
                    $scope.searchpassendtimehs = new Date().getTime();
                    console.log("请求时间差："+$scope.searchpassendtimehs - $scope.searchpassstarttimehs);
                    if($scope.searchpassendtimehs - $scope.searchpassstarttimehs>=6500){
                        $scope.submitWarning = "请求超时！";
                    }else {
                        $scope.submitWarning = "网络连接失败！";
                    }
                    //$scope.submitWarning = "网络连接失败！";
                    $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                })
            }
        }

    })
    //修改昵称
    .controller("changeNickController",function($scope,$rootScope,$state,registerService,$interval,$window,$timeout){
        $scope.searchPassBackBtn = function(){
            window.history.go(-1);
        };
        $scope.changenicknewdis = false;

        //$scope.backappfunctionsmall = function(){
        //    registerService.removeevent();
        //};
        //$scope.backappfunctionsmall();
        $scope.changenickdis = false;
        //$scope.windoWHeihgt = ($(window).height())*1+"px";
        $scope.winHeight = {
            "height":$rootScope.windoWHeihgt
        };
        $scope.changenickbtn = function(){
            var changenick= $scope.changeNickForm.changenicknewnickname.$modelValue;
            //var regNull=/(^\s*)|(\s*$)/g;
            if(!changenick){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请输入新昵称！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else if(changenick.length>11){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "新昵称的长度不能超过11位！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else if(changenick.indexOf(" ")!=-1){
                console.log(changenick.indexOf(" "));
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "新昵称内容不能有空格！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else {
                console.log(changenick.indexOf(" "));
                $scope.changenicknewdis = true;
                $scope.changenickdis = true;
                var changeNObj = {
                    cp:Number($window.sessionStorage.getItem("Ucp")),
                    nickName:changenick
                };
                var changeNUrl = "/rest/user/updateUserNickName/";
                //$http
                //修改成功昵称，$rootScope.mineusernick =  e.user.nickName;赋值
                $scope.loadapp = {"toggle":true};
                $scope.changeNstarttimehs = new Date().getTime();
                registerService.commonUser(changeNObj,changeNUrl).then(function(e){
                    $scope.changenicknewdis = false;
                    $scope.loadapp = {"toggle":false};
                    $scope.changenickdis = false;
                    if(e.status == true){
                        $scope.hahaapp= {"toggle":true};
                        $scope.submithappy = "恭喜您，设置新昵称成功！";
                        //设置mine页面的昵称
                        $rootScope.mineusernick =changenick;
                        $timeout(function(){
                            $scope.hahaapp= {"toggle":false};
                        },2000);
                    }else{
                        $scope.subapp= {"toggle":true};
                        $scope.submitWarning = e.err+"！";
                        $timeout(function(){
                            $scope.subapp= {"toggle":false};
                        },2000);
                    }
                },function(err){
                    $scope.changenicknewdis = false;
                    $scope.loadapp = {"toggle":false};
                    $scope.changenickdis = false;
                    $scope.subapp= {"toggle":true};
                    $scope.changeNendtimehs = new Date().getTime();
                    console.log("请求时间差："+$scope.changeNendtimehs - $scope.changeNstarttimehs);
                    if($scope.changeNendtimehs - $scope.changeNstarttimehs>=6500){
                        $scope.submitWarning = "请求超时！";
                    }else {
                        $scope.submitWarning = "网络连接失败！";
                    }
                    //$scope.submitWarning = "网络连接失败！";
                    $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                })
            }
        }
    })
    //解绑
    .controller("unbundlingController",function($scope,$rootScope,$state,registerService,$interval,$window,$timeout){
        $scope.searchPassBackBtn = function(){
            window.history.go(-1);
        };
        $scope.winHeight = {
            "height":$rootScope.windoWHeihgt
        };
        $scope.unbundvercodeBtnContent= "点击获取验证码";
        $scope.unbundverCodedis = false;
        $scope.unbundlingdis= false;
        $scope.unbundlingphone = "[0-9]{11}";
        $scope.unbindingvehiclecodepatt= "[0-9]{6}";
        //验证手机号码的格式
        $scope.phonePatStyle = function(isValid){
            //var regaccount = $scope.registerForm.regaccount.$modelValue;
            if(isValid){

            }else{
                console.log("手机号码格式错误");
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请确认您的手机号！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }
        };
        $scope.loadapp = {"toggle":false};
        //点击获取验证码
        $scope.unbundlinggetVercode = function(){
            var unbundaccountval = $(".unbindaccountval").val();
            var unbundlingaccount = $scope.unbundlingForm.unbundlingaccount.$modelValue;
            console.log(unbundlingaccount);
            if(!unbundlingaccount){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请确认您的手机号！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else if(unbundaccountval.length != 11){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "手机号码前后不能含有空格！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }
            else{
                $scope.unbundverCodedis = true;//不能再次点击，直到ajax结束
                var unbundverCodeObj = {
                    "cp":Number(unbundlingaccount)

                };
                var unbundverCodeUrl = "/register/applySmsCode/";
                $scope.loadapp = {"toggle":true};
                $scope.unbundverCodestarttimehs = new Date().getTime();
                registerService.commonUser(unbundverCodeObj,unbundverCodeUrl).then(function(e){
                    $scope.loadapp = {"toggle":false};
                    //当status正确的时候，
                    if(e.status == true){
                        var s = 60;
                        $scope.unbundvercodeBtnContent = s+"秒" ;
                        var regVertimer = $interval(function(){
                            s--;
                            if(s>0){
                                $scope.unbundvercodeBtnContent = s+"秒" ;
                                //console.log(s);
                            }else{
                                $scope.unbundverCodedis = false;
                                $scope.unbundvercodeBtnContent = "重新获取验证码" ;
                                $interval.cancel(regVertimer);
                                //console.log(s);
                            }
                        },2000)
                    }else{
                        $scope.unbundverCodedis = false;
                        $scope.subapp= {"toggle":true};
                        $scope.submitWarning = e.err+"！";
                        $timeout(function(){
                            $scope.subapp= {"toggle":false};
                        },2000);
                        console.log(e.err);
                    }

                },function(err){
                    $scope.loadapp = {"toggle":false};
                    $scope.unbundverCodedis = false;
                    $scope.subapp= {"toggle":true};
                    $scope.unbundverCodeendtimehs = new Date().getTime();
                    console.log("请求时间差："+$scope.unbundverCodeendtimehs - $scope.unbundverCodestarttimehs);
                    if($scope.unbundverCodeendtimehs - $scope.unbundverCodestarttimehs>=6500){
                        $scope.submitWarning = "请求超时！";
                    }else {
                        $scope.submitWarning = "网络连接失败！";
                    }
                    //$scope.submitWarning = "网络连接失败！";
                    $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                });


            }
        };
        //点击确定
        $scope.gounbundyes= function(){
            var unbindcodevalval = $(".unbindvehiclecodevala").val();
            var unbundaccountval = $(".unbindaccountval").val();
            var unbundlingaccount = $scope.unbundlingForm.unbundlingaccount.$modelValue;
            var unbundlingcode = $scope.unbundlingForm.unbundlingverCodeContent.$modelValue;
            if(!unbundlingaccount){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请确认您的手机号！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else if(!unbundlingcode){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请确认您的验证码！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else if(unbundaccountval.length != 11){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "手机号码前后不能含有空格！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else if(unbindcodevalval.length != 6){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "验证码前后不能含有空格！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }
            else {
                $scope.unbundlingdis = true;
                var undundingyesObj = {
                    cp:Number(unbundlingaccount),
                    termId:Number(window.sessionStorage.getItem("UtermId")),
                    code:Number(unbundlingcode)
                };
                var undundlingyesUrl = "/rest/user/unBind/";
                $scope.loadapp = {"toggle":true};
                $scope.undundingyesstarttimehs = new Date().getTime();
                registerService.commonUser(undundingyesObj,undundlingyesUrl).then(function(e){
                    $scope.loadapp = {"toggle":false};
                    $scope.unbundlingdis = false;
                    if(e.status == true){
                        $scope.hahaapp= {"toggle":true};
                        $scope.submithappy = "解绑成功，稍后进入登录页面！";
                        $timeout(function(){
                            $scope.hahaapp= {"toggle":false};
                            $state.go("submits");
                        },2000);
                    }else {
                        $scope.subapp= {"toggle":true};
                        $scope.submitWarning = e.err+"！";
                        $timeout(function(){
                            $scope.subapp= {"toggle":false};
                        },2000);
                    }
                },function(err){
                    $scope.loadapp = {"toggle":false};
                    $scope.unbundlingdis = false;
                    $scope.subapp= {"toggle":true};
                    $scope.undundingyesendtimehs = new Date().getTime();
                    console.log("请求时间差："+$scope.undundingyesendtimehs - $scope.undundingyesstarttimehs);
                    if($scope.undundingyesendtimehs - $scope.undundingyesstarttimehs>=6500){
                        $scope.submitWarning = "请求超时！";
                    }else {
                        $scope.submitWarning = "网络连接失败！";
                    }
                    //$scope.submitWarning = "网络连接失败！";
                    $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                })
            }
        }
        //点击取消
        $scope.backminePage = function(){
            $state.go("mains.mine");
        }
    })
    //更换手机号
    .controller("changeiphonenumController",function($scope,$rootScope,$state,registerService,$interval,$window,$timeout){
        $scope.searchPassBackBtn = function(){
            window.history.go(-1);
        };
        $scope.winHeight = {
            "height":$rootScope.windoWHeihgt
        };
        $scope.newchangephonepatt = "[0-9]{11}";
        $scope.changeiphonecodepatt= '[0-9]{6}';
        $scope.vercodeBtnContent= "点击获取验证码";
        $scope.phonePatStylea = function(isValid){
            console.log("失去焦点")
            //var regaccount = $scope.registerForm.regaccount.$modelValue;
            if(isValid){

            }else{
                console.log("手机号码格式错误");
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请确认您的手机号！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }
        };
        //点击获取验证码
        $scope.changeiphonegetVercode = function(){
            var newchangeiphonepow = $(".newchangeiphonepow").val();
            var changeiphonenewaccount = $scope.changeiphoneForm.changeiphonenewaccount.$modelValue;
            console.log(changeiphonenewaccount);
            if(!changeiphonenewaccount){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请确认您的手机号！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else if(newchangeiphonepow.length != 11){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "手机号码前后不能含有空格！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }
            else{
                $scope.unbundverCodedis = true;//不能再次点击，直到ajax结束
                var unbundverCodeObj = {
                    "cp":Number(changeiphonenewaccount)

                };
                var unbundverCodeUrl = "/register/applySmsCode/";
                $scope.loadapp = {"toggle":true};
                $scope.unbundverCodestarttimehs = new Date().getTime();
                registerService.commonUser(unbundverCodeObj,unbundverCodeUrl).then(function(e){
                    $scope.loadapp = {"toggle":false};
                    //当status正确的时候，
                    if(e.status == true){
                        var s = 60;
                        $scope.unbundvercodeBtnContent = s+"秒" ;
                        var regVertimer = $interval(function(){
                            s--;
                            if(s>0){
                                $scope.unbundvercodeBtnContent = s+"秒" ;
                                //console.log(s);
                            }else{
                                $scope.unbundverCodedis = false;
                                $scope.unbundvercodeBtnContent = "重新获取验证码" ;
                                $interval.cancel(regVertimer);
                                //console.log(s);
                            }
                        },2000)
                    }else{
                        $scope.unbundverCodedis = false;
                        $scope.subapp= {"toggle":true};
                        $scope.submitWarning = e.err+"！";
                        $timeout(function(){
                            $scope.subapp= {"toggle":false};
                        },2000);
                        console.log(e.err);
                    }

                },function(err){
                    $scope.loadapp = {"toggle":false};
                    $scope.unbundverCodedis = false;
                    $scope.subapp= {"toggle":true};
                    $scope.unbundverCodeendtimehs = new Date().getTime();
                    console.log("请求时间差："+$scope.unbundverCodeendtimehs - $scope.unbundverCodestarttimehs);
                    if($scope.unbundverCodeendtimehs - $scope.unbundverCodestarttimehs>=6500){
                        $scope.submitWarning = "请求超时！";
                    }else {
                        $scope.submitWarning = "网络连接失败！";
                    }
                    //$scope.submitWarning = "网络连接失败！";
                    $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                });


            }
        };
        $scope.backminePage = function(){
            $state.go("mains.mine");
        };
        $scope.changeiphonebtnPage= function(){
            var newchangeiphonepow = $(".newchangeiphonepow").val();//手机号
            var changeiphonepassval = $(".changeiphonepassval").val();//密码
            var changeiphonecodeclass = $(".changeiphonecodeclass").val();//验证码
            var changeiphonenewaccounta = $scope.changeiphoneForm.changeiphonenewaccount.$modelValue;
            var changeiphonepassworda = $scope.changeiphoneForm.changeiphonepassword.$modelValue;
            var changeiphoneverCodeContenta = $scope.changeiphoneForm.changeiphoneverCodeContent.$modelValue;
            if(!changeiphonenewaccounta){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请确认您的手机号！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else if(!changeiphonepassworda){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请确认您的密码！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else if(!changeiphoneverCodeContenta){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请确认您的验证码！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else if(newchangeiphonepow.indexOf(" ") != -1){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "新的手机号码只能为11位数字，不能含有空格！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else if(changeiphonecodeclass.indexOf(" ") != -1){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "验证码只能为6位数字，不能含有空格！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else {
                $scope.changeiphoneyesbtndis = true;
                var changeiphoneObj = {
                    "pw":changeiphonepassval,
                    "newcp":Number(changeiphonenewaccounta)
                };
                var changeiphoneUrl = "";
                $scope.loadapp = {"toggle":true};
                $scope.unbundverCodestarttimehs = new Date().getTime();
                registerService.commonUser(unbundverCodeObj,unbundverCodeUrl).then(function(e){
                    $scope.loadapp = {"toggle":false};
                    $scope.changeiphoneyesbtndis = false;
                    if(e.status == true){
                        $scope.hahaapp= {"toggle":true};
                        $scope.submithappy = "更换手机号码成功，稍后进入登录页面！";
                        $timeout(function(){
                            $scope.hahaapp= {"toggle":false};
                            $state.go("submits");
                        },2000);
                    }else {
                        $scope.subapp= {"toggle":true};
                        $scope.submitWarning = e.reason+"！";
                        $timeout(function(){
                            $scope.subapp= {"toggle":false};
                        },2000);
                    }
                },function(err){
                    $scope.loadapp = {"toggle":false};
                    $scope.changeiphoneyesbtndis = false;
                    $scope.subapp= {"toggle":true};
                    $scope.unbundverCodeendtimehs = new Date().getTime();
                    console.log("请求时间差："+$scope.unbundverCodeendtimehs - $scope.unbundverCodestarttimehs);
                    if($scope.unbundverCodeendtimehs - $scope.unbundverCodestarttimehs>=6500){
                        $scope.submitWarning = "请求超时！";
                    }else {
                        $scope.submitWarning = "网络连接失败！";
                    }
                    //$scope.submitWarning = "网络连接失败！";
                    $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                })
            }
        }
    })
    //修改限速
    .controller("changelimitspeedController",function($scope,$rootScope,$state,registerService,$interval,$window,$timeout){
        $scope.searchPassBackBtn = function(){
            window.history.go(-1);
        };
        var defalutspeed = Number($window.sessionStorage.getItem("Uspeed"));
        if(defalutspeed == 35){
            $("input[name='changeSpeedLimit'][value='35']").attr('checked','true');
        }else if(defalutspeed == 40){
            $("input[name='changeSpeedLimit'][value='40']").attr('checked','true');
        }else{
            $("input[name='changeSpeedLimit'][value='30']").attr('checked','true');
        }

        $scope.changeSpeedDIS = false;
        $scope.winHeight = {
            "height":$rootScope.windoWHeihgt
        };
        $scope.changelimitspeedbtn = function(){
            if(registerService.authorityControl(8) == "1"){
                var changelimit = $("input[name='changeSpeedLimit']:checked").attr("value");
                $scope.changeSpeedDIS = true;
                $scope.speedlimitObj = {
                    termId:Number($window.sessionStorage.getItem("UtermId")),
                    userCellPhone:Number($window.sessionStorage.getItem("Ucp")),
                    appSN:parseInt(Number(new Date().getTime())/1000),
                    speed : Number(changelimit)
                };
                console.log($scope.speedlimitObj);
                $scope.loadapp = {"toggle":true};
                try{
                    registerService.speedlimit($scope.speedlimitObj).then(
                        function(e){
                            $scope.loadapp = {"toggle": false };
                            $scope.changeSpeedDIS = false;
                            console.log(e);
                            if(e.status == true){
                                if(e.content.result == 0){
                                    $scope.hahaapp= {"toggle":true};
                                    $scope.submithappy = "恭喜您，设置成功！";
                                    $window.sessionStorage.setItem("Uspeed", Number(changelimit));
                                    $scope.$parent.limitspeed = Number(changelimit);
                                    $scope.timehaftime = $timeout(function(){
                                        $scope.hahaapp= {"toggle":false};
                                        // window.history.go(-1);
                                    },2000);
                                }
                            }else {
                                $scope.subapp= {"toggle":true};
                                $scope.submitWarning = e.err+"！";
                                $scope.timenoreasontime = $timeout(function(){
                                    $scope.subapp= {"toggle":false};
                                },2000);
                            }

                        },
                        function (e) {
                            console.log("error:",e)
                            $scope.changeSpeedDIS = false;
                            $scope.loadapp = {"toggle": false };
                            $scope.subapp= {"toggle":true};
                            $scope.submitWarning = "网络连接失败！";
                            $scope.timenoreasontime = $timeout(function(){
                                $scope.subapp= {"toggle":false};
                            },2000);
                        }
                    );
                } catch (err) {
                    $scope.changeSpeedDIS = false;
                    $scope.loadapp = {"toggle": false };
                    $scope.subapp= {"toggle":true};
                    $scope.submitWarning = "网络连接失败！";
                    $scope.timenoreasontime = $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                }
            }else{
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "您无此操作权限！";
                $scope.timersfreasonload = $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }
        }
    })

    .controller("userGuideController",function ($scope,$rootScope,$state,registerService) {
        $scope.searchPassBackBtn = function(){
            window.history.go(-1);
        };
        $scope.indexl = 0;
        $scope.nextpageInfo = "︾";
        $scope.nextpageclick = function (indexnum) {
            if(!indexnum){
                if($scope.indexl > 6){
                    $scope.indexl = 0;
                    $scope.nextpageInfo = "目录";
                }
                else if($scope.indexl == 6){
                    $scope.nextpageInfo = "目录";
                    $scope.nextpagestyle = {
                        "-webkit-transform": 'rotate(0deg)',
                        "-moz-transform": 'rotate(0deg)',
                        "-o-transform":'rotate(0deg)',
                        "-ms-transform":'rotate(0deg)',
                        "transform":'rotate(0deg)'
                    };
                    $scope.indexl = $scope.indexl + 1
                }else{
                    $scope.nextpageInfo = "︾";
                    $scope.nextpagestyle = {
                        "-webkit-transform": 'rotate(90deg)',
                        "-moz-transform": 'rotate(90deg)',
                        "-o-transform":'rotate(90deg)',
                        "-ms-transform":'rotate(90deg)',
                        "transform":'rotate(90deg)'
                    };
                    $scope.indexl = $scope.indexl + 1
                }
            }else {
                if(indexnum == 7){
                    $scope.nextpageInfo = "目录";
                    $scope.nextpagestyle = {
                        "-webkit-transform": 'rotate(0deg)',
                        "-moz-transform": 'rotate(0deg)',
                        "-o-transform":'rotate(0deg)',
                        "-ms-transform":'rotate(0deg)',
                        "transform":'rotate(0deg)'
                    };
                }else{
                    $scope.nextpageInfo = "︾";
                    $scope.nextpagestyle = {
                        "-webkit-transform": 'rotate(90deg)',
                        "-moz-transform": 'rotate(90deg)',
                        "-o-transform":'rotate(90deg)',
                        "-ms-transform":'rotate(90deg)',
                        "transform":'rotate(90deg)'
                    };
                }
                $scope.indexl = indexnum;
            }
        }

        var slider = document.getElementById('slider');
        if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch){
            $("#slider").on('touchstart',function (event) {
                var touch = event.originalEvent.targetTouches[0];     //touches数组对象获得屏幕上所有的touch，取第一个touch
                startPos = {x:touch.pageX,y:touch.pageY,time:+new Date};    //取第一个touch的坐标值
                isScrolling = 0;   //这个参数判断是垂直滚动还是水平滚动

                $("#slider").on('touchmove',function (event) {
                    if(event.originalEvent.targetTouches.length > 1 ) return;
                    var touch = event.originalEvent.targetTouches[0];
                    endPos = {x:touch.pageX - startPos.x,y:touch.pageY - startPos.y};
                    isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1:0;    //isScrolling为1时，表示纵向滑动，0为横向滑动
                    if(isScrolling === 1){
                        // event.preventDefault();      //阻止触摸事件的默认行为，即阻止滚屏
                        //纵向滑动
                    }
                });

                $("#slider").on('touchend',function (event) {
                    event.preventDefault();
                    var duration = +new Date - startPos.time;    //滑动的持续时间
                    if(isScrolling === 1) {    //当为水平滚动时
                        if (Number(duration) > 10) {
                            //判断是左移还是右移，当偏移量大于10时执行
                            if (endPos.y < -10) {
                                if ($scope.indexl == 7) {
                                    $scope.$apply(function () {
                                        $scope.indexl = 0
                                    });
                                } else {
                                    $scope.$apply(function () {
                                        $scope.indexl = $scope.indexl + 1;
                                        if( $scope.indexl == 7){
                                            $scope.nextpageInfo = "目录";
                                        }
                                    });
                                }
                            } else if (endPos.y > 10) {
                                if ($scope.indexl == 1) {
                                    $scope.$apply(function () {
                                        $scope.indexl = 0
                                    });
                                } else {
                                    $scope.$apply(function () {
                                        $scope.indexl = $scope.indexl - 1;
                                        if( $scope.indexl < 7){
                                            $scope.nextpageInfo = "︾";
                                        }
                                    });
                                }
                            }
                        }
                    }
                    $("#slider").off('touchmove');
                    $("#slider").off('touchend');
                });
            });
            // slider.addEventListener('touchstart',function (event) {
            //     var touch = event.targetTouches[0];     //touches数组对象获得屏幕上所有的touch，取第一个touch
            //     startPos = {x:touch.pageX,y:touch.pageY,time:+new Date};    //取第一个touch的坐标值
            //     isScrolling = 0;   //这个参数判断是垂直滚动还是水平滚动
            //     console.log("startPos:",event);
            //
            //     // slider.addEventListener('touchmove',function (event) {
            //     //     event.preventDefault();
            //     //     if(event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
            //     //     var touch = event.targetTouches[0];
            //     //     endPos = {x:touch.pageX - startPos.x,y:touch.pageY - startPos.y};
            //     //     isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1:0;    //isScrolling为1时，表示纵向滑动，0为横向滑动
            //     //     if(isScrolling === 1){
            //     //         // event.preventDefault();      //阻止触摸事件的默认行为，即阻止滚屏
            //     //         //纵向滑动
            //     //     }
            //     // },false);
            //     // slider.addEventListener('touchend',function (event) {
            //     //     event.preventDefault();
            //     //     var duration = +new Date - startPos.time;    //滑动的持续时间
            //     //     slider.removeEventListener('touchmove');
            //     //     slider.removeEventListener('touchend');
            //     //     if(isScrolling === 1) {    //当为水平滚动时
            //     //         if (Number(duration) > 10) {
            //     //             //判断是左移还是右移，当偏移量大于10时执行
            //     //             console.log(endPos.y ,$scope.indexl);
            //     //             console.log(event);
            //     //             if (endPos.y < -10) {
            //     //                 if ($scope.indexl == 7) {
            //     //                     $scope.$apply(function () {
            //     //                         $scope.indexl = 0
            //     //                     });
            //     //                 } else {
            //     //                     $scope.$apply(function () {
            //     //                         $scope.indexl = $scope.indexl + 1
            //     //                     });
            //     //                 }
            //     //             } else if (endPos.y > 10) {
            //     //                 if ($scope.indexl == 1) {
            //     //                     $scope.$apply(function () {
            //     //                         $scope.indexl = 0
            //     //                     });
            //     //                 } else {
            //     //                     $scope.$apply(function () {
            //     //                         $scope.indexl = $scope.indexl - 1;
            //     //                     });
            //     //                 }
            //     //             }
            //     //         }
            //     //     }
            //     //
            //     // },false);
            //
            // },false)
        }
    })

    //查询条件
    .controller("searchmoreController",function($scope,$rootScope,$state,registerService,$timeout , $location){
        $scope.searchPassBackBtn = function(){
            $scope.oalarmstartTime = "";
            $scope.alarmoverTime = "";
            window.history.go(-1);
        };
        $scope.timealarmcordfir = $timeout(function(){
            registerService.datecommon();
        },200);
        $scope.oalarmstartTime = registerService.getdatestr(0);
        $scope.alarmoverTime= registerService.getdatestr(0);
        $scope.today = function () {
            $scope.oalarmstartTime = registerService.getdatestr(0);
            $scope.alarmoverTime= registerService.getdatestr(0);
        };
        $scope.yesterday = function () {
            $scope.oalarmstartTime = registerService.getdatestr(-1 );
            $scope.alarmoverTime= registerService.getdatestr(0);
        };
        $scope.latestedseven = function () {
            $scope.oalarmstartTime = registerService.getdatestr(-6);
            $scope.alarmoverTime= registerService.getdatestr(0);
        };
        $scope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams){
                if(toState.name == "mains.home.alarmRecord"){
                    $rootScope.alarmstartTime = $scope.oalarmstartTime;
                    $rootScope.alarmoverTime = $scope.alarmoverTime;
                }
                if(toState.name == "mains.home.cartripInformation"){
                    // event.preventDefault();
                    $rootScope.tripstartTime = $scope.oalarmstartTime;
                    $rootScope.tripoverTime = $scope.alarmoverTime;
                }
            });

        $scope.searchmorebtn = function () {
            window.history.go(-1);
        };
    })