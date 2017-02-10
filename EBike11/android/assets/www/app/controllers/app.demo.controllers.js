/**
 * Created by dong on 2016/8/15.
 */
angular.module("app.demo.controllers",[])
    //初始app
    .controller("indexcontroller",function($scope,$rootScope,$state,registerService,$timeout,$interval,$window){
        $rootScope.windoWHeihgt = ($(window).height())*1+"px";

        $scope.winHeight = {
            "height":$rootScope.windoWHeihgt
        };

    })
    //登录部分
    .controller("submitsController",["$scope","$state","$rootScope","registerService","$window","$timeout",function($scope,$state,$rootScope,registerService,$window,$timeout){
        //模态框部分
        $rootScope.windoWHeihgt = ($(window).height())*1+"px";

        $scope.winHeight = {
            "height":$rootScope.windoWHeihgt
        };
        function iosstyle(){
            document.addEventListener('deviceready', function () {
                $('#all_content').css("height",$rootScope.windoWHeihgt);
            }, false);

        };
        $rootScope.pushyesorno = true;
        // console.log("登录的时候设置的值推送："+$rootScope.pushyesorno);
        iosstyle();

        $scope._top=($(window).height() - 150)/2 +"px";
        $scope._topnot=($(window).height() - 120)/2 +"px";
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
        //function backappfunction(){
        //    //function eventBackButton() {
        //    //    $rootScope.backmodelapp = {"toggle":true};
        //    //    $timeout(function(){
        //    //        $rootScope.backmodelapp = {"toggle":false};
        //    //    },1500);
        //    //    $window.removeEventListener("backbutton", eventBackButton, false); //注销返回键
        //    //    //3秒后重新注册
        //    //    $scope.timers = $interval(
        //    //        function() {
        //    //            $interval.cancel($scope.timers);
        //    //            $window.addEventListener("backbutton", eventBackButton, false); //返回键
        //    //        },
        //    //        3000
        //    //    );
        //    //}
        //    //
        //    //$window.addEventListener('backbutton', eventBackButton, false);
        //    document.addEventListener('backbutton', eventBackButton, false);
        //    function eventBackButton(e) {
        //        e.preventDefault();
        //        //alert("backClick2");
        //        navigator.app.exitApp();
        //    }
        //
        //};
        //backappfunction();


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
        //验证手机验证码
        //$scope.regphone = '[0-9]{11}';
        ////验证手机号码的格式
        //$scope.subphonePatStyle = function(isValid){
        //    if(isValid){
        //        console.log("手机号码格式正确");
        //    }else{
        //        console.log("手机号码格式错误");
        //        $scope.subapp= {"toggle":true};
        //        $scope.submitWarning = "手机号码格式错误！";
        //    }
        //};
        //点击登录
        $scope.submitBtn = function(){
            var uname = $scope.submitForm.subaccount.$modelValue;
            var upass = $scope.submitForm.subpass.$modelValue;
            console.log(uname);
            $scope.submitdis = true;
            $scope.submitBtnblue = false;
            $scope.submitBtngrey = true;
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
                $scope.submitWarning = "请您输入手机号！";
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
            }else{
                //$state.go("submits");

                $scope.subaccountdis = true;
                $scope.subpassdis = true;
                $scope.loadapp = {"toggle":true};
                registerService.submits($scope.sub).then(function(e){
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
                        $window.sessionStorage.setItem("Uid",e.user.uid);//sessionStorage的存储方法
                        //$window.sessionStorage.setItem("cellPhone",e.user.celliphone);
                        ////存储用户的密码
                        //$window.sessionStorage.setItem("userpassword", e.user.passWord);
                        console.log(e.AlarmCount);
                        console.log(e.user.celliphone);
                        console.log(e.user.emali);
                        console.log(e.user.nickName);
                        //存储用户的报警数
                        if(e.AlarmCount){
                            //$window.sessionStorage.setItem("useralarmcount", e.AlarmCount);
                            $rootScope.alarmcount = e.AlarmCount;
                        }

                        console.log($rootScope.alarmcount);

                        if(e.user.celliphone){
                            //$window.sessionStorage.setItem("useralarmcount", e.AlarmCount);
                           $rootScope.mineuserphone = e.user.celliphone;
                        }
                        if(e.user.emali){
                            $rootScope.mineuseremail = e.user.emali;
                        }
                        if(e.user.uname){
                            $rootScope.mineusernick =  e.user.uname;
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
                        $state.go("mains.home");
                    } else if(e.status==false){
                        //判断用户是否该跳转到绑定设备页面
                        if(e.reason == "用户已停用"){
                            $rootScope.lastPage = "登录";
                            $state.go("vehiclebind");
                        }else{
                            $scope.subapp= {"toggle":true};
                            $scope.submitWarning = e.reason+"！";
                            $timeout(function(){
                                $scope.subapp= {"toggle":false};
                            },2000)
                        }


                    }
                },function(err){
                    $scope.subaccountdis = false;
                    $scope.subpassdis = false;
                    $scope.loadapp = {"toggle":false};
                    $scope.submitdis = false;
                    $scope.submitBtnblue = true;
                    $scope.submitBtngrey = false;
                    $scope.subapp= {"toggle":true};
                    $scope.submitWarning = "登录失败！";
                    $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000)

                });
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
            $scope.subaccountdis = true;
            $scope.subpassdis = true;
            $state.go("searchp");
        }
        //跳往注册页面
        $scope.clickRegister = function(){
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
        $scope._topnot=($(window).height() - 120)/2 +"px";
        //console.log($scope._top);

        $scope.modelpositionStnot = {
            "top":$scope._topnot
        };
        $scope.vercodeBtnContent = "点击获取验证码";
        //手机验证码的正则表达式
        $scope.regphone = '[0-9]{11}';
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
        $scope.getVercode = function(){
            //$Http
            var regaccount = $scope.searchPassForm.searchPaccount.$modelValue;
            console.log(regaccount);
            if(!regaccount){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请确认您的手机号！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else{
                $scope.verCodedis = true;//不能再次点击，直到ajax结束
                var verCodeObj = {
                    "cellphone":regaccount,
                    "time":registerService.getcurrentTime()
                };
                var verCodeUrl = "/rest/user/getMessage/";
                $scope.loadapp = {"toggle":true};
                registerService.commonUser(verCodeObj,verCodeUrl).then(function(e){
                    $scope.loadapp = {"toggle":false};
                    //当status正确的时候，
                    if(e.status == true){
                        var s = 300;
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
                        $scope.submitWarning = e.reason+"！";
                        $timeout(function(){
                            $scope.subapp= {"toggle":false};
                        },2000);
                        console.log(e.reason);
                    }

                },function(err){
                    $scope.loadapp = {"toggle":false};
                    $scope.verCodedis = false;
                    $scope.subapp= {"toggle":true};
                    $scope.submitWarning = "网络连接失败！";
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
            var regaccount = $scope.searchPassForm.searchPaccount.$modelValue;
            var searchPverCodeContent = $scope.searchPassForm.searchPverCodeContent.$modelValue;
            if(!regaccount){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请确认您的手机号！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else if(!searchPverCodeContent){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请确认您的验证码！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else{
                $scope.searchpaccountdis = true;
                $scope.searchpvercodedis = true;
                $scope.searchvercodedis = true;
                $scope.loadapp = {"toggle":true};
                registerService.confirmvercodes($scope.searchP).then(function(e){
                    $scope.searchpaccountdis = false;
                    $scope.searchpvercodedis = false;
                    $scope.loadapp = {"toggle":false};
                    $scope.searchvercodedis = false;
                    if(e.status == true){
                        //对话保存手机号码
                        $window.sessionStorage.setItem("cellPhone",regaccount);
                        $state.go("codenewpass");
                        //$interval.cancel(regVertimer);
                    }else{
                        $scope.subapp= {"toggle":true};
                        $scope.submitWarning = e.reason+"！";
                        $timeout(function(){
                            $scope.subapp= {"toggle":false};
                        },2000);
                    }
                },function(err){
                    $scope.searchpaccountdis = false;
                    $scope.searchpvercodedis = false;
                    $scope.loadapp = {"toggle":false};
                    $scope.searchvercodedis = false;
                    $scope.subapp= {"toggle":true};
                    $scope.submitWarning = "网络连接失败！";
                    $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                })
            }


        }
    })
    //找回密码,输入新密码页面
    .controller("verCodeNewPassController",function($scope,$rootScope,$state,registerService,$interval,$timeout,$window){
        //返回按钮
        $scope.searchPassBackBtn = function(){
            window.history.go(-1);
        };
        $scope.searchnewpnewdis = false;
        $scope.searchnewpolddis = false;
        //$scope.windoWHeihgt = ($(window).height())*1+"px";
        $scope.winHeight = {
            "height":$rootScope.windoWHeihgt
        };
        $scope._topnot=($(window).height() - 120)/2 +"px";
        //console.log($scope._top);

        $scope.modelpositionStnot = {
            "top":$scope._topnot
        };
        $scope.codeagaPassdis = false;
        //点击确定
        $scope.vercodeNewpassBtn = function(){
            var searchnewPnewpass = $scope.searchnewPassForm.searchnewPnewpass.$modelValue;
            var searchnewPagapass = $scope.searchnewPassForm.searchnewPagapass.$modelValue;
            //这个时候按钮不能再次点击
            //$scope.codeagaPassdis = true;
            if(searchnewPnewpass == searchnewPagapass){
                $scope.codeagaPassdis = true;
                //执行ajax：参数phone， new aga
                codenewpassObj = {
                    "cellphone":$window.sessionStorage.getItem("cellPhone"),
                    "npwd":searchnewPnewpass
                };
                codenewpassUrl = "/rest/user/forgotPW/";
                //console.log($window.sessionStorage.getItem("cellPhone"));
                $scope.loadapp = {"toggle":true};
                $scope.searchnewpnewdis = true;
                $scope.searchnewpolddis = true;
                registerService.commonUser(codenewpassObj,codenewpassUrl).then(function(e){
                    $scope.searchnewpnewdis = false;
                    $scope.searchnewpolddis = false;
                    $scope.loadapp = {"toggle":false};
                    $scope.codeagaPassdis = false;
                    if(e.status == true){
                        $scope.subapp= {"toggle":true};
                        $scope.submitWarning = "新密码设置成功！";
                        $timeout(function(){
                            $scope.subapp= {"toggle":false};
                            $state.go("submits");
                        },2000);
                    }else{
                        $scope.subapp= {"toggle":true};
                        $scope.submitWarning = e.reason+"！";
                        $timeout(function(){
                            $scope.subapp= {"toggle":false};
                        },2000);
                    }
                },function(err){
                    $scope.searchnewpnewdis = false;
                    $scope.searchnewpolddis = false;
                    $scope.loadapp = {"toggle":false};
                    $scope.codeagaPassdis = false;
                    $scope.subapp= {"toggle":true};
                    $scope.submitWarning = "网络连接失败！";
                    $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                });

                //$http执行结束后，，
                //
            }else{
                //$scope.codeagaPassdis = false;
                //弹出模态框
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "两次密码输入不一致！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }
        }
    })
    //注册
    .controller("registercontroller",function($scope,$rootScope,$state,registerService,$interval,$timeout){
        //背景的高度

        $scope.winHeight = {
            "height":$rootScope.windoWHeihgt
        };
        $scope._topnot=($(window).height() - 120)/2 +"px";
        //console.log($scope._top);

        $scope.modelpositionStnot = {
            "top":$scope._topnot
        };
        $scope._top=($(window).height() - 150)/2 +"px";

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
        $scope.regphone = '[0-9]{11}';
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
        $scope.getVercode = function(){
            //$Http
            var regaccount = $scope.registerForm.regaccount.$modelValue;
            console.log(regaccount);
            if(!regaccount){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请确认您的手机号！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else{
                $scope.verCodedis = true;//不能再次点击，直到ajax结束
                var verCodeObj = {
                    "cellphone":regaccount,
                    "time":registerService.getcurrentTime()
                };
                var verCodeUrl = "/rest/user/getMessage/";
                $scope.loadapp = {"toggle":true};
                registerService.commonUser(verCodeObj,verCodeUrl).then(function(e){
                    $scope.loadapp = {"toggle":false};
                    //当status正确的时候，
                    if(e.status == true){
                        var s = 300;
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
                        $scope.submitWarning = e.reason+"！";
                        $timeout(function(){
                            $scope.subapp= {"toggle":false};
                        },2000);
                        console.log(e.reason);
                    }

                },function(err){
                    $scope.loadapp = {"toggle":false};
                    $scope.verCodedis = false;
                    $scope.subapp= {"toggle":true};
                    $scope.submitWarning = "网络连接失败！";
                    $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                });


            }
        };
        //点击注册
        $scope.registerdis = false;
        $scope.registerBtn = function(){
            var regaccount = $scope.registerForm.regaccount.$modelValue;
            var regpass = $scope.registerForm.regpass.$modelValue;
            var regemail = $scope.registerForm.regemail.$modelValue;
            var regverCode = $scope.registerForm.regverCode.$modelValue;
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
            }else if(!regemail){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请确认您的邮箱！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else if(!regverCode){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请确认您的验证码！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else{
                console.log("可以注册");
                $scope.regaccountdis = true;
                $scope.regpassdis = true;
                $scope.regemaildis = true;
                $scope.regvercodedis = true;
                $scope.registerdis = true;
                $scope.loadapp = {"toggle":true};
                registerService.registers($scope.reg).then(function(e){
                    $scope.regaccountdis = false;
                    $scope.regpassdis = false;
                    $scope.regemaildis = false;
                    $scope.regvercodedis = false;
                    $scope.loadapp = {"toggle":false};
                    $scope.registerdis = false;
                    if(e.status == true){
                        $rootScope.lastPage = "注册";
                        $scope.regSuccessapp = {"toggle":true};
                    }else{

                        $scope.subapp= {"toggle":true};
                        $scope.submitWarning = e.reason+"！";
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
                    $scope.submitWarning = "网络连接失败！";
                    $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                })
            }
        };

        //模态框返回登录
        $scope.gosubmitPage = function(){
            $state.go("submits");
        };
        //模态框去绑定
        $scope.gobindPage = function(){
            $state.go("vehiclebind");
        }
    })
    //车辆绑定
    .controller("vehiclebindController",function($scope,$rootScope,$state,registerService,$interval,$timeout){
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
        $scope._topnot=($(window).height() - 120)/2 +"px";
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
        $scope.regphone = '[0-9]{11}';
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
            console.log("点击扫码")
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    //alert("We got a barcode\n" +
                    //    "Result: " + result.text + "\n" +
                    //    "Format: " + result.format + "\n" +
                    //    "Cancelled: " + result.cancelled);
                    $scope.vehiclebind = {"divicenum":result.text};
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
        //点击获取验证码
        $scope.getVercode = function(){
            //$Http
            var vehiclebindaccount = $scope.vehiclebindForm.vehiclebindaccount.$modelValue;
            console.log(vehiclebindaccount);
            if(!vehiclebindaccount){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请确认您的手机号！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else{
                $scope.bindverCodedis = true;//不能再次点击，直到ajax结束
                var verCodeObj = {
                    "cellphone":vehiclebindaccount,
                    "time":registerService.getcurrentTime()
                };
                var verCodeUrl = "/rest/user/getMessage/";
                $scope.loadapp = {"toggle":true};
                registerService.commonUser(verCodeObj,verCodeUrl).then(function(e){
                    $scope.loadapp = {"toggle":false};
                    //当status正确的时候，
                    if(e.status == true){
                        var s = 300;
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
                        $scope.submitWarning = e.reason+"！";
                        $timeout(function(){
                            $scope.subapp= {"toggle":false};
                        },2000);
                        console.log(e.reason);
                    }

                },function(err){
                    $scope.loadapp = {"toggle":false};
                    $scope.bindverCodedis = false;
                    $scope.subapp= {"toggle":true};
                    $scope.submitWarning = "网络连接失败！";
                    $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                });


            }
        };
        $scope.gomainPage = function(){
            var vehiclebindaccount = $scope.vehiclebindForm.vehiclebindaccount.$modelValue;
            var vehiclebinddivicenum = $scope.vehiclebindForm.vehiclebinddivicenum.$modelValue;
            var vehiclebindverCodeContent = $scope.vehiclebindForm.vehiclebindverCodeContent.$modelValue;
            if(!vehiclebindaccount){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请确认您的手机号！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else if(!vehiclebinddivicenum){
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
            }else{
                $scope.bindphonedis = true;
                $scope.bindvehiclenumdis = true;
                $scope.bindvercodedis = true;
                $scope.vehiclebinddis = true;
                var vehiclebindObj = {
                    cellphone:vehiclebindaccount,
                    type:1,
                    imsi:vehiclebinddivicenum,
                    code:vehiclebindverCodeContent

                }
                var vehiclebindUrl = "/rest/Vehicle/Binding";
                $scope.loadapp = {"toggle":true};
                registerService.commonUser(vehiclebindObj,vehiclebindUrl).then(function(e){
                    $scope.bindphonedis = false;
                    $scope.bindvehiclenumdis = false;
                    $scope.bindvercodedis = false;
                    $scope.loadapp = {"toggle":false};
                    $scope.vehiclebinddis = false;
                    console.log(e);
                    if(e.status == true){
                        $scope.subapp= {"toggle":true};
                        $scope.submitWarning = "恭喜您，绑定设备成功！";
                        $timeout(function(){
                            $scope.subapp= {"toggle":false};
                            //判断之前的页面是什么页面
                            if($rootScope.lastPage == "注册"){
                                //跳转到登录页面
                                $state.go("submits");
                            }else{
                                //跳转到主页面
                                $state.go("mains.home");
                            }
                        },2000);
                    }else{
                        $scope.subapp= {"toggle":true};
                        $scope.submitWarning = e.reason+"！";
                        $timeout(function(){
                            $scope.subapp= {"toggle":false};
                        },2000);
                    }
                },function(err){
                    $scope.bindphonedis = false;
                    $scope.bindvehiclenumdis = false;
                    $scope.bindvercodedis = false;
                    $scope.loadapp = {"toggle":false};
                    $scope.subapp= {"toggle":true};
                    $scope.submitWarning = "网络连接失败！";
                    $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                });


            }
        }
    })
    //主页面
    .controller("mainsController",function($scope,$rootScope,$state,registerService,$interval,$timeout,$window,$location){
        //加载高德AMap
        //var script = $script;
        //script();

        $scope.$state = $state;
        //$scope.windoWHeihgt = ($(window).height())*1+"px";
        $scope.winHeight = {
            "height":$rootScope.windoWHeihgt
        };
        $scope._topnot=($(window).height() - 120)/2 +"px";
        //console.log($scope._top);

        $scope.modelpositionStnot = {
            "top":$scope._topnot
        };
        //日期模态框
        $scope._top=($(window).height() - 300)/2 +"px";
        //if(!AMap){
        //   console.log("错误,没有地图");
        //}
        console.log($scope._top);
        $scope.modelpositionSt = {
            "top":$scope._top
        };
        //$rootScope.maploadfun = function(obj,centerpoint){
        //    new AMap.Map(obj,{
        //        zoom:20,
        //        center: centerpoint
        //    });
        //};
        $scope.udate = {'modelstartyear':registerService.getdateYear()+"年",'modelstartmonth':registerService.getdateMonth()+'月','modelstartday':registerService.getdateday()+'日','modeloveryear':registerService.getdateYear()+"年",'modelovermonth':registerService.getdateMonth()+'月','modeloverday':registerService.getdateday()+'日'};
        //加年
        $scope.startYearadd = function(){
            var numstarty = parseInt($(".startyearnum").val()) ;
            numstarty++;
            //parseInt($(".startmonthnum").val())>=registerService.getdateMonth() || parseInt($(".startdaynum").val()) >=registerService.getdateday()

                if((numstarty-1) == registerService.getdateYear()){
                    numstarty--;
                    //console.log("第二个")

            }
            $(".startyearnum").val(numstarty+"年");
        }
        //减年
        $scope.startYearless = function(){
            var numstarty = parseInt($(".startyearnum").val()) ;
            numstarty--;
            $(".startyearnum").val(numstarty+"年");
        };
        //减月
        $scope.startMonthless = function(){
            var numstartm = parseInt($(".startmonthnum").val()) ;
            numstartm--;
            if(numstartm==0){
                numstartm = 1;
            }
            $(".startmonthnum").val(registerService.autoaddZero(numstartm)+"月");
        };
        //加月
        $scope.startMonthadd = function(){
            var numstartm = parseInt($(".startmonthnum").val()) ;
            numstartm++;
            if(numstartm==13){
                numstartm = 12;
            //&& parseInt($(".startdaynum").val()) ==registerService.getdateday()
            }else if(parseInt($(".startyearnum").val()) ==registerService.getdateYear()  ){
                if((numstartm-1) == registerService.getdateMonth()){
                    numstartm--;
                    //console.log("第二个")
                }
            }
            $(".startmonthnum").val(registerService.autoaddZero(numstartm)+"月");
        }
        //减日
        $scope.startdayless = function(){
            var numstartm = parseInt($(".startdaynum").val()) ;
            numstartm--;
            if(numstartm==0){
                numstartm = 1;
            }
            $(".startdaynum").val(registerService.autoaddZero(numstartm)+"日");
        };
        //加日
        $scope.startdayadd = function(){
            var numstartm = parseInt($(".startdaynum").val()) ;
            numstartm++;
            if(numstartm==32){
                numstartm = 31;
            }else if(parseInt($(".startmonthnum").val())== registerService.getdateMonth() && parseInt($(".startyearnum").val()) ==registerService.getdateYear()){
                if((numstartm-1) == registerService.getdateday()){
                    numstartm--;
                    //console.log("第二个")
                }
            }
            $(".startdaynum").val(registerService.autoaddZero(numstartm)+"日");
        }
        //加年
        $scope.overYearadd = function(){
            var numstarty = parseInt($(".overyearnum").val()) ;
            numstarty++;
            //if(parseInt($(".overmonthnum").val())==registerService.getdateMonth() && parseInt($(".overdaynum").val())==registerService.getdateday()){
                if((numstarty-1) == registerService.getdateYear()){
                    numstarty--;
                    //console.log("第二个")
                }
            //}
            $(".overyearnum").val(numstarty+"年");
        }
        //减年
        $scope.overYearless = function(){
            var numstarty = parseInt($(".overyearnum").val()) ;
            numstarty--;
            $(".overyearnum").val(numstarty+"年");
        };
        //减月
        $scope.overMonthless = function(){
            var numstartm = parseInt($(".overmonthnum").val()) ;
            numstartm--;
            if(numstartm==0){
                numstartm = 1;
            }
            $(".overmonthnum").val(registerService.autoaddZero(numstartm) +"月");
        };
        //加月
        $scope.overMonthadd = function(){
            var numstartm = parseInt($(".overmonthnum").val()) ;
            numstartm++;
            if(numstartm== 13){
                numstartm= 12;
            }
            //parseInt($(".overdaynum").val())==registerService.getdateday() &&
            if(parseInt($(".overyearnum").val()) == registerService.getdateYear()){
                if((numstartm-1) == registerService.getdateMonth()){
                    numstartm--;
                    //console.log("第二个")
                }
                //console.log("第一个");

            }
            $(".overmonthnum").val(registerService.autoaddZero(numstartm) +"月");
        };
        //减日
        $scope.overdayless = function(){
            var numstartm = parseInt($(".overdaynum").val()) ;
            numstartm--;
            if(numstartm == 0){
                numstartm = 1;
            }
            $(".overdaynum").val(registerService.autoaddZero(numstartm) +"日");
        };
        //加日
        $scope.overdayadd = function(){
            var numstartm = parseInt($(".overdaynum").val()) ;
            numstartm++;
            if(numstartm== 32){
                numstartm= 31;
            }
            if(parseInt($(".overyearnum").val()) == registerService.getdateYear() && parseInt($(".overmonthnum").val())== registerService.getdateMonth()){
                if((numstartm-1) == registerService.getdateday()){
                    numstartm--;
                    //console.log("第二个")
                }
            }
            $(".overdaynum").val(registerService.autoaddZero(numstartm) +"日");
        };

        //$scope.datediv = {toggle:true};
        //$rootScope.againdatewarning = function(){
        //    $rootScope.datemodel = {datewarningtoggle : false};
        //}
    })
    //home页面
    .controller("homeController",function($scope,$rootScope,$state,registerService,$interval,$timeout,$window){
        $scope.iframereturn = function(){
            return false;
        };
        //总的map
        $rootScope.mapfunc = function(){
            var followmap =  new AMap.Map('tripmapid',{
                zoom:20,
                center: [116.397428, 39.90923]
            });
        }
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
        //监听退出app事件
        //function backappfunction(){
        //    document.addEventListener('backbutton', eventBackButton, false);
        //    function eventBackButton(e) {
        //        e.preventDefault();
        //        //alert("backClick2");
        //        navigator.app.exitApp();
        //    }
        //};
        //backappfunction();

        $scope.winHeight = {
            "height":$rootScope.windoWHeihgt
        };
        //未处理的报警的个数
        $scope.alarmiconcountnone= false;
        //$window.sessionStorage.setItem("useralarmcount");
        console.log($rootScope.alarmcount);
        if(Number($rootScope.alarmcount)){
            console.log("icon显示");
        }else{
            console.log("icon隐藏");
            $scope.alarmiconcountnone= true;
        }
        //获取解防设防的状态
        $scope.carstatusbellObj = {
            seq:registerService.randomsix(),
            uid:$window.sessionStorage.getItem("Uid")
        }
        $scope.carstatusbellUrl = "/rest/Vehicles/state";
        function prostatus(){
            $scope.fortificationdis = true;
            $scope.orFortification = "获取中";
            $scope.loadapp = {"toggle":true};
            $timeout(function(){
                $scope.loadapp = {"toggle":false};
            },3000);
            registerService.commonUser($scope.carstatusbellObj,$scope.carstatusbellUrl).then(function(e){
                $scope.loadapp = {"toggle":false};
                $scope.fortificationdis = false;
                console.log(e);
                if(e.status == true){
                    if(e.db1 == 0){
                        $scope.orFortification = "设防";
                        $scope.colorfffYes = true;
                        $scope.coloryyyYes = false;
                        $scope.colorfffNo= false;
                        $scope.coloryyyNo = false;
                    }else if(e.db1 == 1){
                        $scope.orFortification = "解防";
                        $scope.colorfffYes =false ;
                        $scope.coloryyyYes = false;
                        $scope.colorfffNo= true;
                        $scope.coloryyyNo = false;
                    }
                }else{
                    $scope.orFortification = "点击获取";
                    $scope.subapp= {"toggle":true};
                    $scope.submitWarning = e.reason+"！";
                    $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                }
            },function(err){
                $scope.loadapp = {"toggle":false};
                $scope.fortificationdis = false;
                $scope.orFortification = "点击获取";
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "网络连接失败！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            })
        }
        prostatus();
        //解防设防的$http
        //$scope.fortificationajax = function(){
        //
        //
        //};
        //点击解防或者设防的按钮
        $scope.fortificationStatus = function(){
            $scope.fortificationdis = true;
            if($scope.orFortification == "设防"){
                $scope.colorfffYes = false;
                $scope.coloryyyYes =true ;
                $scope.colorfffNo= false;
                $scope.coloryyyNo = false;
                $scope.vehiclesoperationObj = {
                    uid:$window.sessionStorage.getItem("Uid"),
                    operationType:1,
                    seq:registerService.randomsix()
                }
                $scope.vehiclesoperationUrl = "/rest/Vehicles/operation";
                $scope.loadapp = {"toggle":true};
                registerService.commonUser($scope.vehiclesoperationObj,$scope.vehiclesoperationUrl).then(function(e){
                    $scope.loadapp = {"toggle":false};
                    $scope.fortificationdis = false;
                    console.log(e);
                    if(e.status == true){
                        if(e.db1 == 0){
                            $scope.orFortification = "解防";
                            $scope.colorfffYes = false;
                            $scope.coloryyyYes = false;
                            $scope.colorfffNo=true ;
                            $scope.coloryyyNo = false;
                            $scope.hahaapp= {"toggle":true};
                            $scope.submithappy = "恭喜您，设防成功！";

                            $timeout(function(){
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
                        $scope.submitWarning = e.reason+"！";
                        $timeout(function(){
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
                    $scope.submitWarning = "网络连接失败！";
                    $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                })

            }else if($scope.orFortification == "解防"){
                $scope.colorfffYes = false;
                $scope.coloryyyYes = false;
                $scope.colorfffNo= false;
                $scope.coloryyyNo =true ;
                $scope.vehiclesoperationObj = {
                    uid:$window.sessionStorage.getItem("Uid"),
                    operationType:2,
                    seq:registerService.randomsix()
                }
                $scope.vehiclesoperationUrl = "/rest/Vehicles/operation";
                $scope.loadapp = {"toggle":true};
                registerService.commonUser($scope.vehiclesoperationObj,$scope.vehiclesoperationUrl).then(function(e){
                    $scope.loadapp = {"toggle":false};
                    console.log(e);
                    $scope.fortificationdis = false;
                    if(e.status == true){
                        if(e.db1 == 0){
                            $scope.orFortification = "设防";
                            $scope.colorfffYes =true ;
                            $scope.coloryyyYes = false;
                            $scope.colorfffNo=false ;
                            $scope.coloryyyNo = false;
                            $scope.hahaapp= {"toggle":true};
                            $scope.submithappy = "恭喜您，解防成功！";
                            $timeout(function(){
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
                        $scope.submitWarning = e.reason+"！";
                        $timeout(function(){
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
                    $scope.submitWarning = "网络连接失败！";
                    $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                })
            }else if($scope.orFortification == "点击获取"){
                prostatus();
            }


        };
       $scope.changecolorStatus2 = function(){
            $rootScope.colorfff2 = false;
            $rootScope.coloryyy2 =true ;
            console.log(222);
        }
        $scope.changecolorStatus3 = function(){
            $rootScope.colorfff3 = false;
            $rootScope.coloryyy3 =true ;
        }
        $scope.changecolorStatus4 = function(){
            $rootScope.colorfff4 = false;
            $rootScope.coloryyy4 =true ;
        }
        $scope.changecolorStatus5 = function(){
            $rootScope.colorfff5 = false;
            $rootScope.coloryyy5 =true ;
        }
        $scope.changecolorStatus6 = function(){
            $rootScope.colorfff6 = false;
            $rootScope.coloryyy6 =true ;
        }

        $scope.messagepush = function(){
            document.addEventListener('deviceready', function () {
                //{
                //    type: "onBind",
                //        data:{
                //    requestId: 123456,
                //        errorCode: 0,
                //        appId: "123456",
                //        channelId: "123456",
                //        userId: "123456",
                //        deviceType: 3
                //}
                //}
                if(window.baidupush){
                    // alert(3);
                    try {
                        window.baidupush.startWork("8ulOPgOAf03mhcRTr8Yq0HUY", function(info){
                            //success callback
                            //your code here
                            // alert(4);
                            // alert("startWork:" + JSON.stringify(info));
                            if(info.data.errorCode == 0){
                                var pushinfoObj = {
                                    uid:$window.sessionStorage.getItem("Uid"),
                                    channelid:info.data.channelId,
                                    type:info.data.deviceType
                                    //channelid:3795525986954054108,
                                    //type:3
                                }
                                var pushinfoUrl = "/rest/user/messagePush/";
                                registerService.commonUser(pushinfoObj,pushinfoUrl).then(function(e){
                                    console.log(e);
                                    if(e.status==true){
                                        $scope.subapp= {"toggle":true};
                                        $scope.submitWarning = "链接推送成功！";
                                        $timeout(function(){
                                            $scope.subapp= {"toggle":false};
                                        },2000);
                                    }else{
                                        $scope.subapp= {"toggle":true};
                                        $scope.submitWarning = e.reason+"！";
                                        $timeout(function(){
                                            $scope.subapp= {"toggle":false};
                                        },2000);
                                    }
                                },function(err){
                                    $scope.subapp= {"toggle":true};
                                    $scope.submitWarning = "网络连接失败！";
                                    $timeout(function(){
                                        $scope.subapp= {"toggle":false};
                                    },2000);
                                })
                                window.baidupush.resumeWork(function(info){
                            }
                        });
                        //Resume work, re-bind the ids
                        // window.baidupush.resumeWork(function(info){
                        //     //your code here
                        //     //alert("resumeWork:" + JSON.stringify(info));
                        // });
                        window.baidupush.listenMessage(function(info){
                            //your code here
                            //channelid接口
                            //alert("listenMessage:"+ JSON.stringify(info));
                        });
                        //Listen notification arrived event, when a notification arrived, the callback function will be called
                        window.baidupush.listenNotificationArrived(function(info){
                            //your code here
                            //alert("listenNotificationArrived:" + JSON.stringify(info));
                        });

                        //Listen notification clicked event, when a notification is clicked, the callback function will be called
                        window.baidupush.listenNotificationClicked(function(info){
                            //your code here
                            //alert("listenNotificationClicked:" + JSON.stringify(info));
                        });
                    }catch (err){
                        console.log(err.message);
                        alert("云推送启动失败...")
                    }

                }else{
                    alert("推送启动失败..");
                }
                //Start work, bind the ids
                //Only for android
                //Listen message arrived event, when a message arrived, the callback function will be called
            }, false);
            $rootScope.pushyesorno = false;
        };
        // console.log("看看推送的值:"+$rootScope.pushyesorno);
        if($rootScope.pushyesorno){
            $timeout(function(){
                $scope.messagepush();
            },500);
        }
    })
    //vehicle页面
    .controller("vehicleController",function($scope,$rootScope,$state,registerService,$interval,$timeout,$window){
        //function backappfunction(){
        //    document.addEventListener('backbutton', eventBackButton, false);
        //    function eventBackButton(e) {
        //        e.preventDefault();
        //        //alert("backClick2");
        //        navigator.app.exitApp();
        //    }
        //};
        //backappfunction();
        $scope.winHeight = {
            "height":$rootScope.windoWHeihgt
        };
    })
    //mine页面
    .controller("mineController",function($scope,$rootScope,$state,registerService,$interval,$timeout,$window){
        $scope.searchPassBackBtn = function(){
            window.history.go(-1);
            //console.log(window.history);
        };
        $scope.backappbtn = function(){

            $scope.yesOrNo= {"toggle":true};
        }
        $scope.shouldreturnfalse = function(){
            return false;
        }
        $scope.yesOrnohide = function(){
            $scope.yesOrNo= {"toggle":false};
        }
        $scope.backappYes = function(){
            window.location.replace("index.html");
        };
        $scope.winHeight = {
            "height":$rootScope.windoWHeihgt
        };
        //function backappfunction(){
        //    //function eventBackButton() {
        //    //    $rootScope.backmodelapp = {"toggle":true};
        //    //    $timeout(function(){
        //    //        $rootScope.backmodelapp = {"toggle":false};
        //    //    },1500);
        //    //    $window.removeEventListener("backbutton", eventBackButton, false); //注销返回键
        //    //    //3秒后重新注册
        //    //    $scope.timers = $interval(
        //    //        function() {
        //    //            $interval.cancel($scope.timers);
        //    //            $window.addEventListener("backbutton", eventBackButton, false); //返回键
        //    //        },
        //    //        3000
        //    //    );
        //    //}
        //    //
        //    //$window.addEventListener('backbutton', eventBackButton, false);
        //    document.addEventListener('backbutton', eventBackButton, false);
        //    function eventBackButton(e) {
        //        e.preventDefault();
        //        //alert("backClick2");
        //        navigator.app.exitApp();
        //    }
        //
        //};
        //backappfunction();
    })
    //用车记录
    .controller("cartripController",function($scope,$rootScope,$state,registerService,$interval,$window,$timeout){
        $scope.dateinputdis = true;
        $rootScope.colorfff2 = true;
        $rootScope.coloryyy2 = false;
        //$rootScope.checkConnection();
        //$scope.backappfunctionsmall = function(){
        //    registerService.removeevent();
        //};
        //$scope.backappfunctionsmall();
        //function prostatus(){
        //    return false;
        //}
        //prostatus();

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
        //console.log(registerService.getcurrentTime);
        $scope.currentdate = new Date();
        //当天的行程
        $scope.nocartrip = false;
        $scope.havecartrip = true;
        $scope.todayF = function (){
            $scope.loadapp = {"toggle":true};
            registerService.commonUserget(todaytripObj,todaytripUrl).then(function(e){
                $scope.loadapp = {"toggle":false};
                if(e.status == true){
                    console.log(e);

                    if(e.useHistory.length != 0){
                        $scope.nocartrip = false;
                        $scope.havecartrip = true;
                        for(var i in e.useHistory){
                            e.useHistory[i].startAddresscontent = "正在解析！";
                            e.useHistory[i].endAddresscontent = "正在解析！";
                        }
                        $rootScope.todaytripinfo = e.useHistory;
                        var j = 0;
                        $scope.starttransloc = function(){
                            //console.log("e.useHistory:"+e.useHistory);
                            var lnglatXY =[e.useHistory[j].startGPSLat/1000000,e.useHistory[j].startGPSLng/1000000];
                            var endlnglatXY = [e.useHistory[j].endGPSLat/1000000,e.useHistory[j].endGPSLng/1000000];
                            try {
                                var lngnum = new AMap.LngLat(e.useHistory[j].startGPSLng/1000000,e.useHistory[j].startGPSLat/1000000);
                                var latnum =new AMap.LngLat(e.useHistory[j].endGPSLng/1000000,e.useHistory[j].endGPSLat/1000000);
                                $scope.initfalseapp= {"toggle":false};
                            }catch (err){
                                $scope.initfalseapp= {"toggle":true};
                                //$scope.subapp= {"toggle":true};

                                $scope.goSubmitPage= function(){
                                    window.location.replace("index.html");
                                    $scope.initfalseapp= {"toggle":false};
                                };
                                $scope.gomainhomePage = function(){
                                    $state.go("mains.home");
                                    $scope.initfalseapp= {"toggle":false};
                                }
                            }

                            if(e.useHistory[j].startGPSTime){
                                e.useHistory[j].starttime = registerService.coverdate(e.useHistory[j].startGPSTime);
                            }else{
                                e.useHistory[j].starttime = "未获取到数据"
                            }

                            console.log(endlnglatXY);
                            if(e.useHistory[j].endGPSTime){
                                e.useHistory[j].endtime = registerService.coverdate(e.useHistory[j].endGPSTime);
                                console.log("时间这块啊，当前报错报错的地方啊："+j)

                            }else{
                                e.useHistory[j].endtime = "未获取到数据"
                            }
                                //console.log(result.locations[0]);


                                if(e.useHistory[j].startGPSLat != 0 && e.useHistory[j].endGPSLat != 0){
                                    AMap.convertFrom([lngnum,latnum],"gps",function(status,result){
                                        console.log("todayresult;"+JSON.stringify(result));
                                        function geocodefunallhave(){
                                            AMap.service('AMap.Geocoder',function() {
                                                $scope.startwarningadd = new AMap.Geocoder({});
                                                $scope.startwarningadd.getAddress([lngnumstart, latnumend], function (status, result) {
                                                    //console.log("run here:",result,status);
                                                    console.log("lngnumstart, latnumend:"+lngnumstart, latnumend)
                                                    //console.log("result:"+JSON.stringify(result));
                                                    if (status === 'complete' && result.info === 'OK') {

                                                        if (result.regeocodes[0].formattedAddress) {
                                                            $scope.todayaddressa = result.regeocodes[0].formattedAddress;
                                                            console.log("为什么突然报错啊："+$scope.todayaddressa,j);
                                                            e.useHistory[j].startAddresscontent = $scope.todayaddressa;
                                                        } else {
                                                            $scope.todayaddressa = "获取地址失败";
                                                            console.log("获取位置fir：1");
                                                            //console.log("失败:",$scope.todayaddressa,e.useHistory,j)
                                                            e.useHistory[j].startAddresscontent = $scope.todayaddressa;
                                                        }
                                                        if (result.regeocodes[1].formattedAddress) {
                                                            $scope.endaddressa = result.regeocodes[1].formattedAddress;
                                                            e.useHistory[j].endAddresscontent = $scope.endaddressa;
                                                        } else {
                                                            $scope.todayaddressa = "获取地址失败";
                                                            console.log("获取位置fir：2");
                                                            //console.log("失败:",$scope.todayaddressa,e.useHistory,j)
                                                            e.useHistory[j].endAddresscontent = $scope.todayaddressa;
                                                        }

                                                        $scope.$apply(function () {
                                                            $rootScope.todaytripinfo = e.useHistory;
                                                        });
                                                        j++;
                                                        console.log("头大的j上面的："+j);
                                                        if (j < e.useHistory.length) {
                                                            $scope.starttransloc();
                                                            console.log(j);
                                                            console.log("头大的j上面的，要循环了："+j);
                                                        } else {
                                                            console.log("终于结束了头大的j上面的："+j);
                                                            $scope.$apply(function () {
                                                                $rootScope.todaytripinfo = e.useHistory;
                                                            });
                                                        }
                                                    } else {

                                                        $scope.todayaddressa = "获取地址失败";

                                                        e.useHistory[j].startAddresscontent = $scope.todayaddressa;
                                                        e.useHistory[j].endAddresscontent = $scope.todayaddressa;

                                                        j++;
                                                        $scope.$apply(function () {
                                                            $rootScope.todaytripinfo = e.useHistory;
                                                        });
                                                        if (j < e.useHistory.length) {
                                                            $scope.starttransloc();
                                                        } else {

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
                                }else if(e.useHistory[j].startGPSLat == 0 && e.useHistory[j].endGPSLat == 0) {
                                    e.useHistory[j].startAddresscontent = "获取地址失败";
                                    e.useHistory[j].endAddresscontent = "获取地址失败";

                                    j++;
                                    if(j<e.useHistory.length){
                                        $scope.starttransloc();
                                    }else {

                                    }
                                    //$scope.$apply(function () {
                                    //    $rootScope.todaytripinfo = e.useHistory;
                                    //});

                                }else if(e.useHistory[j].startGPSLat == 0){
                                    e.useHistory[j].startAddresscontent = "获取地址失败";
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

                                                        $scope.endaddressa = result.regeocode.formattedAddress;
                                                        e.useHistory[j].endAddresscontent = $scope.endaddressa;

                                                        $scope.$apply(function () {
                                                            $rootScope.todaytripinfo = e.useHistory;
                                                        });
                                                        j++;
                                                        if (j < e.useHistory.length) {
                                                            $scope.starttransloc();
                                                        } else {

                                                        }
                                                    } else {

                                                        $scope.todayaddressa = "获取地址失败";

                                                        //e.useHistory[j].startAddresscontent = $scope.todayaddressa;
                                                        e.useHistory[j].endAddresscontent = $scope.todayaddressa;

                                                        j++;
                                                        if (j < e.useHistory.length) {
                                                            $scope.starttransloc();
                                                        } else {

                                                        }
                                                    }
                                                    $scope.$apply(function () {
                                                        $rootScope.todaytripinfo = e.useHistory;
                                                    });
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
                                }else if(e.useHistory[j].endGPSLat==0){
                                    e.useHistory[j].endAddresscontent = "获取地址失败！";


                                    AMap.convertFrom(lngnum,"gps",function(status,result){
                                        console.log("todayresult;"+JSON.stringify(result));
                                        function startgpscoverff(){
                                            AMap.service('AMap.Geocoder',function() {
                                                $scope.startwarningadd = new AMap.Geocoder({});
                                                $scope.startwarningadd.getAddress(lngnumstart, function (status, result) {

                                                    //console.log("run here:",result,status);
                                                    //console.log("result:"+JSON.stringify(result));
                                                    if (status === 'complete' && result.info === 'OK') {
                                                        $scope.todayaddressa = result.regeocode.formattedAddress;
                                                        e.useHistory[j].startAddresscontent = $scope.todayaddressa;


                                                        $scope.$apply(function () {
                                                            $rootScope.todaytripinfo = e.useHistory;
                                                        });
                                                        j++;
                                                        if (j < e.useHistory.length) {
                                                            $scope.starttransloc();
                                                        } else {

                                                        }
                                                    } else {
                                                        $scope.todayaddressa = "获取地址失败";
                                                        e.useHistory[j].startAddresscontent = $scope.todayaddressa;

                                                        j++;
                                                        if (j < e.useHistory.length) {
                                                            $scope.starttransloc();
                                                        } else {

                                                        }
                                                    }
                                                    $scope.$apply(function () {
                                                        $rootScope.todaytripinfo = e.useHistory;
                                                    });
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

                            //$scope.startwarningadd =  new AMap.Geocoder({
                            //});
                            //var lnglatXY1 = [121.1111,31.222222];
                            //var endlnglatXY1= [131.33333,31.22222]
                            //var arr = new Array();
                            //console.log(lngnumstart,latnumend)
                            console.log(lnglatXY,endlnglatXY)




                        };
                        $scope.starttransloc();
                    }else{
                        $scope.nocartrip = true;
                        $scope.havecartrip = false;
                    }


                }else{
                    $rootScope.subapp= {"toggle":true};
                    $rootScope.submitWarning = e.reason+"！";
                    $timeout(function(){
                        $rootScope.subapp= {"toggle":false};
                    },2000);
                }
            },function(err){
                $scope.loadapp = {"toggle":false};
                $rootScope.subapp= {"toggle":true};
                $rootScope.submitWarning = "网络连接失败！";
                $timeout(function(){
                    $rootScope.subapp= {"toggle":false};
                },2000);
            });
        };
        var getcurrent = registerService.getTime();
        var todaytripObj = {
            uid:$window.sessionStorage.getItem("Uid"),
            //startTime:20161113000000,
            //endTime:20161122235959
            startTime:getcurrent+"000000",
            endTime:getcurrent+"235959"
        };
        var todaytripUrl = "/rest/vehicles/useHistory/";
        $scope.todayF();
        $scope.currentdatebtn = function(){
            $scope.todayF();
        }
        //前一天的行程
        console.log(registerService.getTime());
        $scope.ostartTime = registerService.getdatestr(-9);
        $scope.overTime = registerService.getdatestr(-1);
        //$scope.lasthavedate = true;
        //$scope.lastdontdate = false;
        //四种样式
        $scope.normaldianlastdontdate = true;
        $scope.agadianlastdontdate = true;
        $scope.sbdianlastdontdate = true;
        $scope.moresbdianlastdontdate = true;
        //$scope.dateyeardisnone = true;
        $scope.ajaxstarttime = $scope.ostartTime.replace('年','').replace('月','').replace('日','');
        $scope.ajaxendtime = $scope.overTime.replace('年','').replace('月','').replace('日','');
        console.log($scope.ajaxstarttime);
        //初始的时候table这块，，四种样式
        $scope.notripcontent = true;//无行程
        $scope.clickonload = true;//点击加载
        $scope.cartriploading = true;//加载中
        $scope.thelastpagecartripover = true;//加载完全
        $scope.lastdatepage = 0;
        console.log("报错结束的日期:"+new Date(1481729098000));
        console.log("报错开始的日期:"+new Date(1481728966000));
        //$scope.infoclassnone = false;
        $scope.lastdate = function(){
            $scope.notripcontent = true;//无行程
            $scope.clickonload = true;//点击加载
            $scope.cartriploading = false;//加载中
            $scope.thelastpagecartripover = true;//加载完全
            var lasttripObj = {
                uid:$window.sessionStorage.getItem("Uid"),
                startTime:$scope.ajaxstarttime+'000000',
                endTime:$scope.ajaxendtime+'235959'
                //,pageNumber:$scope.lastdatepage,
                //limit:2
            };
            var lasttripUrl = "/rest/vehicles/useHistory/";
            if($scope.infoclassnone == 0){
                $scope.infoclassnone = true;
            }
            $scope.loadapp = {"toggle":true};
            registerService.commonUserget(lasttripObj,lasttripUrl).then(function(e){
                $scope.loadapp = {"toggle":false};
                if(e.status == true){
                    console.log(e);
                    console.log(e.useHistory.length);
                    $scope.lastdatepage ++;
                    if(e.useHistory.length !=0){
                        console.log("有数据");
                        //table的样式 是否最后一页
                        $rootScope.tripmaplatlng = e.useHistory;
                        //if(e.isLastpage == true){
                            $scope.notripcontent = true;//无行程
                            $scope.clickonload = true;//点击加载
                            $scope.cartriploading = true;//加载中
                            $scope.thelastpagecartripover = false;//加载完全
                        //}else{
                        //    $scope.notripcontent = true;//无行程
                        //    $scope.clickonload = false;//点击加载
                        //    $scope.cartriploading = true;//加载中
                        //    $scope.thelastpagecartripover =true ;//加载完全
                        //}
                        for(var i in e.useHistory){
                            e.useHistory[i].startpoint = "正在解析！";
                            e.useHistory[i].endpoint = "正在解析！";
                        }
                        $scope.lastdateinfo = e.useHistory;
                        var j = 0;

                        $scope.laststarttransloc = function(){
                            //console.log("e.useHistory:",e.useHistory);
                            var lnglatXY =[e.useHistory[j].startGPSLat/1000000,e.useHistory[j].startGPSLng/1000000];
                            var coverdatestart = registerService.coverdateyear(e.useHistory[j].startGPSTime);
                            var coverdateend = registerService.coverdateyear(e.useHistory[j].endGPSTime);
                            //function  ostarttime(value){
                            //    if(e.useHistory[j].startGPSTime){
                            //        e.useHistory[j]["value"]={laststarttime:registerService.coverdate(e.useHistory[j].startGPSTime),starteventdate:coverdatestart};
                            //        console.log("执行了");
                            //    }else{
                            //        e.useHistory[j]["value"]={laststarttime:"未获取到数据",starteventdate:"无数据"};
                            //        //e.useHistory[j]["value"]={};
                            //    }
                            //}
                            //function oendtime(value){
                            //    if(e.useHistory[j].endGPSTime){
                            //        e.useHistory[j]["value"].lastendtime = registerService.coverdate(e.useHistory[j].endGPSTime);
                            //        e.useHistory[j]["value"].endeventdate = registerService.coverdateyear(e.useHistory[j].endGPSTime);
                            //    }else{
                            //        e.useHistory[j]["value"].lastendtime = "未获取到数据";
                            //        e.useHistory[j]["value"].endeventdate = "无数据";
                            //    }
                            //}
                            var endlnglatXY = [e.useHistory[j].endGPSLat/1000000,e.useHistory[j].endGPSLng/1000000];
                            try {
                                var lngnum = new AMap.LngLat(e.useHistory[j].startGPSLng/1000000,e.useHistory[j].startGPSLat/1000000);
                                var latnum =new AMap.LngLat(e.useHistory[j].endGPSLng/1000000,e.useHistory[j].endGPSLat/1000000);
                                $scope.initfalseapp= {"toggle":false};
                            }catch(err) {
                                $scope.initfalseapp= {"toggle":true};
                                //$scope.subapp= {"toggle":true};

                                $scope.goSubmitPage= function(){
                                    window.location.replace("index.html");
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
                            }



                                $scope.sbfunction = function(){
                                    if(e.useHistory[j].startGPSLat != 0 && e.useHistory[j].endGPSLat!=0){
                                        console.log(j,e.useHistory[j].startGPSLat);

                                            AMap.convertFrom([lngnum, latnum], "gps", function (status, result) {
                                                console.log("现在测试的起点终点：" + lngnum, latnum)
                                                console.log("现在是这个result：" + JSON.stringify(result));
                                                function allhavestartend() {
                                                    AMap.service('AMap.Geocoder', function () {
                                                        $scope.startwarningadd = new AMap.Geocoder({});
                                                        $scope.startwarningadd.getAddress([lngnumstart, latnumend], function (status, result) {
                                                            console.log("lngnumstart；" + lngnumstart);
                                                            console.log("latnumend：" + latnumend)
                                                            console.log("run here:", result, status);
                                                            //console.log("result:"+JSON.stringify(result));
                                                            if (status === 'complete' && result.info === 'OK') {

                                                                if (result.regeocodes[0].formattedAddress) {
                                                                    $scope.todayaddressa = result.regeocodes[0].formattedAddress;
                                                                    e.useHistory[j].startpoint = $scope.todayaddressa;
                                                                    console.log("起点" + $scope.todayaddressa)
                                                                } else {
                                                                    $scope.todayaddressa = "获取地址失败";
                                                                    console.log("获取位置fir：1");
                                                                    //console.log("失败:",$scope.todayaddressa,e.useHistory,j)
                                                                    e.useHistory[j].startpoint = $scope.todayaddressa;
                                                                }
                                                                if (result.regeocodes[1].formattedAddress) {
                                                                    $scope.endaddressa = result.regeocodes[1].formattedAddress;
                                                                    e.useHistory[j].endpoint = $scope.endaddressa;

                                                                } else {
                                                                    $scope.todayaddressa = "获取地址失败";
                                                                    console.log("获取位置fir：2");
                                                                    //console.log("失败:",$scope.todayaddressa,e.useHistory,j)
                                                                    e.useHistory[j].endpoint = $scope.todayaddressa;
                                                                }
                                                                console.log("开始结束都有的：" + j);
                                                                j++;
                                                                console.log(e.useHistory.length);
                                                                console.log("开始结束都有的：" + j);
                                                                if (j < e.useHistory.length-1) {
                                                                    $scope.laststarttransloc();
                                                                    console.log("执行了啊j++", j)
                                                                } else {

                                                                }
                                                                //$scope.$apply(function () {
                                                                //    $rootScope.lastdateinfo = e.useHistory;
                                                                //});
                                                            } else {

                                                                $scope.todayaddressa = "获取地址失败";
                                                                e.useHistory[j].startpoint = $scope.todayaddressa;
                                                                e.useHistory[j].endpoint = $scope.todayaddressa;
                                                                j++;
                                                                if (j < e.useHistory.length-1) {
                                                                    $scope.laststarttransloc();
                                                                } else {

                                                                }
                                                            }
                                                            $scope.$apply(function () {
                                                                $rootScope.lastdateinfo = e.useHistory;
                                                            });
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


                                    }else if(e.useHistory[j].startGPSLat == 0 && e.useHistory[j].endGPSLat==0) {
                                        e.useHistory[j].startpoint = "获取地址失败";
                                        e.useHistory[j].endpoint = "获取地址失败";
                                        j++;
                                        if(j<e.useHistory.length-1){
                                            $scope.laststarttransloc();
                                        }else {

                                        }
                                        //$scope.$apply(function () {
                                        //    $rootScope.lastdateinfo = e.useHistory;
                                        //});

                                    }else if(e.useHistory[j].startGPSLat == 0){
                                        e.useHistory[j].startpoint = "获取地址失败";
                                        console.log("实现吧");
                                        //$scope.startwarningadd = new AMap.Geocoder({
                                        //});


                                        AMap.convertFrom(latnum,"gps",function(status,result){
                                            console.log("现在是这个result："+JSON.stringify(result));
                                            function latendcover(){
                                                AMap.service('AMap.Geocoder',function() {
                                                    $scope.startwarningadd = new AMap.Geocoder({

                                                    });
                                                    $scope.startwarningadd.getAddress(latnumend, function (status, result) {
                                                        console.log("latnumend:"+latnumend)
                                                        //console.log("run here:",result,status);
                                                        //console.log("result:"+JSON.stringify(result));
                                                        if (status === 'complete' && result.info === 'OK') {
                                                            $scope.endaddressa = result.regeocode.formattedAddress;
                                                            e.useHistory[j].endpoint = $scope.endaddressa;
                                                            $scope.$apply(function () {
                                                                $rootScope.lastdateinfo = e.useHistory;
                                                            });
                                                            j++;
                                                            if (j < e.useHistory.length) {
                                                                $scope.laststarttransloc();
                                                            } else {

                                                            }
                                                        } else {

                                                            $scope.todayaddressa = "获取地址失败";

                                                            //e.useHistory[j].startAddresscontent = $scope.todayaddressa;
                                                            e.useHistory[j].endpoint = $scope.todayaddressa;
                                                            j++;
                                                            if (j < e.useHistory.length) {
                                                                $scope.laststarttransloc();
                                                            } else {

                                                            }
                                                        }
                                                        $scope.$apply(function () {
                                                            $rootScope.lastdateinfo = e.useHistory;
                                                        });
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
                                    }else if(e.useHistory[j].endGPSLat==0){
                                        e.useHistory[j].endpoint = "获取地址失败！";
                                        //$scope.startwarningadd = new AMap.Geocoder({
                                        //});

                                        AMap.convertFrom(lngnum,"gps",function(status,result) {
                                            console.log("现在是这个result：" + JSON.stringify(result));
                                            function startcoverlng(){
                                                AMap.service('AMap.Geocoder',function() {
                                                    $scope.startwarningadd = new AMap.Geocoder({});
                                                    $scope.startwarningadd.getAddress(lngnumstart, function (status, result) {
                                                        console.log("lngnumstart:"+lngnumstart)
                                                        //console.log("run here:",result,status);
                                                        //console.log("result:"+JSON.stringify(result));
                                                        if (status === 'complete' && result.info === 'OK') {
                                                            $scope.todayaddressa = result.regeocode.formattedAddress;
                                                            e.useHistory[j].startpoint = $scope.todayaddressa;


                                                            $scope.$apply(function () {
                                                                $rootScope.lastdateinfo = e.useHistory;
                                                            });
                                                            j++;
                                                            if (j < e.useHistory.length) {
                                                                $scope.laststarttransloc();
                                                            } else {

                                                            }
                                                        } else {
                                                            $scope.todayaddressa = "获取地址失败";
                                                            e.useHistory[j].startpoint = $scope.todayaddressa;
                                                            j++;
                                                            if (j < e.useHistory.length) {
                                                                $scope.laststarttransloc();
                                                            } else {

                                                            }
                                                        }
                                                        $scope.$apply(function () {
                                                            $rootScope.lastdateinfo = e.useHistory;
                                                        });
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
                                if($scope.lastdatepage == 1) {       //第一页的数据
                                    //console.log("这是第一页");
                                    //两种情况
                                    //console.log("开始结束date："+coverdatestart,coverdateend)
                                    if(j==0){
                                        console.log("j:"+j);
                                        if(coverdatestart == coverdateend){
                                            //第一种情况

                                            console.log("第一种情况");
                                            if(e.useHistory[j].startGPSTime !=0 && e.useHistory[j].endGPSTime !=0){
                                                e.useHistory[j].fir={
                                                    laststarttime:registerService.coverdate(e.useHistory[j].startGPSTime),
                                                    starteventdate:coverdatestart,
                                                    chinesestart:"起点：",
                                                    chineseend:"终点：",
                                                    lastendtime:registerService.coverdate(e.useHistory[j].endGPSTime),
                                                    endeventdate:registerService.coverdateyear(e.useHistory[j].endGPSTime),
                                                    startpoint: $scope.todayaddressa,
                                                    endpoint: $scope.endaddressa,
                                                    pointpoint:"........."
                                                };
                                                $scope.lastdateinfo = e.useHistory;
                                                console.log("执行了");
                                            }else if(e.useHistory[j].startGPSTime==0 && e.useHistory[j].endGPSTime !=0){
                                                e.useHistory[j].fir={
                                                    laststarttime:"无数据",
                                                    starteventdate:"无数据",
                                                    chinesestart:"起点：",
                                                    chineseend:"终点：",
                                                    lastendtime:registerService.coverdate(e.useHistory[j].endGPSTime),
                                                    endeventdate:registerService.coverdateyear(e.useHistory[j].endGPSTime),
                                                    startpoint: $scope.todayaddressa,
                                                    endpoint: $scope.endaddressa,
                                                    pointpoint:"........."
                                                };
                                                $scope.lastdateinfo = e.useHistory;
                                            }else if(e.useHistory[j].startGPSTime!=0 && e.useHistory[j].endGPSTime ==0){
                                                e.useHistory[j].fir={
                                                    laststarttime:registerService.coverdate(e.useHistory[j].startGPSTime),
                                                    starteventdate:coverdatestart,
                                                    chinesestart:"起点：",
                                                    chineseend:"终点：",
                                                    lastendtime:"无数据",
                                                    endeventdate:"无数据",
                                                    startpoint: $scope.todayaddressa,
                                                    endpoint: $scope.endaddressa,
                                                    pointpoint:"........."
                                                };
                                                $scope.lastdateinfo = e.useHistory;
                                            }else{
                                                e.useHistory[j].fir={
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
                                                $scope.lastdateinfo = e.useHistory;
                                            }
                                            $scope.sbfunction();
                                            $scope.lastdateinfo = e.useHistory;
                                            console.log($scope.lastdateinfo);
                                        }else{
                                            //第四种情况
                                            console.log("第四种情况");

                                            if(e.useHistory[j].startGPSTime !=0 && e.useHistory[j].endGPSTime !=0){
                                                e.useHistory[j].four={
                                                    laststarttime:registerService.coverdate(e.useHistory[j].startGPSTime),
                                                    starteventdate:coverdatestart,
                                                    chinesestart:"起点：",
                                                    chineseend:"终点：",
                                                    lastendtime:registerService.coverdate(e.useHistory[j].endGPSTime),
                                                    endeventdate:registerService.coverdateyear(e.useHistory[j].endGPSTime),
                                                    startpoint: $scope.todayaddressa,
                                                    endpoint: $scope.endaddressa,
                                                    pointpoint:"........."
                                                };
                                                $scope.lastdateinfo = e.useHistory;
                                                console.log("执行了");
                                            }else if(e.useHistory[j].startGPSTime==0 && e.useHistory[j].endGPSTime !=0){
                                                e.useHistory[j].four={
                                                    laststarttime:"无数据",
                                                    starteventdate:"无数据",
                                                    chinesestart:"起点：",
                                                    chineseend:"终点：",
                                                    lastendtime:registerService.coverdate(e.useHistory[j].endGPSTime),
                                                    endeventdate:registerService.coverdateyear(e.useHistory[j].endGPSTime),
                                                    startpoint: $scope.todayaddressa,
                                                    endpoint: $scope.endaddressa,
                                                    pointpoint:"........."
                                                };
                                                $scope.lastdateinfo = e.useHistory;
                                            }else if(e.useHistory[j].startGPSTime!=0 && e.useHistory[j].endGPSTime ==0){
                                                e.useHistory[j].four={
                                                    laststarttime:registerService.coverdate(e.useHistory[j].startGPSTime),
                                                    starteventdate:coverdatestart,
                                                    chinesestart:"起点：",
                                                    chineseend:"终点：",
                                                    lastendtime:"无数据",
                                                    endeventdate:"无数据",
                                                    startpoint: $scope.todayaddressa,
                                                    endpoint: $scope.endaddressa,
                                                    pointpoint:"........."
                                                };
                                                $scope.lastdateinfo = e.useHistory;
                                            }else{
                                                e.useHistory[j].four={
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
                                                $scope.lastdateinfo = e.useHistory;
                                            }
                                            $scope.sbfunction()
                                            $scope.lastdateinfo = e.useHistory;

                                        }

                                        $scope.lastdateinfo = e.useHistory;
                                    }
                                    else if(j>0){
                                        console.log("j:"+j);
                                        var coverdateendlaste = registerService.coverdateyear(e.useHistory[j-1].startGPSTime);
                                        //四种情况
                                        if(coverdatestart == coverdateend && coverdateend != coverdateendlaste){
                                            //第一种情况
                                            console.log("第一种情况");


                                            if(e.useHistory[j].startGPSTime !=0 && e.useHistory[j].endGPSTime !=0){
                                                e.useHistory[j].fir={
                                                    laststarttime:registerService.coverdate(e.useHistory[j].startGPSTime),
                                                    starteventdate:coverdatestart,
                                                    chinesestart:"起点：",
                                                    chineseend:"终点：",
                                                    lastendtime:registerService.coverdate(e.useHistory[j].endGPSTime),
                                                    endeventdate:registerService.coverdateyear(e.useHistory[j].endGPSTime),
                                                    startpoint: $scope.todayaddressa,
                                                    endpoint: $scope.endaddressa,
                                                    pointpoint:"........."
                                                };
                                                $scope.lastdateinfo = e.useHistory;
                                                console.log("执行了");
                                            }else if(e.useHistory[j].startGPSTime==0 && e.useHistory[j].endGPSTime !=0){
                                                e.useHistory[j].fir={
                                                    laststarttime:"无数据",
                                                    starteventdate:"无数据",
                                                    chinesestart:"起点：",
                                                    chineseend:"终点：",
                                                    lastendtime:registerService.coverdate(e.useHistory[j].endGPSTime),
                                                    endeventdate:registerService.coverdateyear(e.useHistory[j].endGPSTime),
                                                    startpoint: $scope.todayaddressa,
                                                    endpoint: $scope.endaddressa,
                                                    pointpoint:"........."
                                                };
                                                $scope.lastdateinfo = e.useHistory;
                                            }else if(e.useHistory[j].startGPSTime!=0 && e.useHistory[j].endGPSTime ==0){
                                                e.useHistory[j].fir={
                                                    laststarttime:registerService.coverdate(e.useHistory[j].startGPSTime),
                                                    starteventdate:coverdatestart,
                                                    chinesestart:"起点：",
                                                    chineseend:"终点：",
                                                    lastendtime:"无数据",
                                                    endeventdate:"无数据",
                                                    startpoint: $scope.todayaddressa,
                                                    endpoint: $scope.endaddressa,
                                                    pointpoint:"........."
                                                };
                                                $scope.lastdateinfo = e.useHistory;
                                            }else{
                                                e.useHistory[j].fir={
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
                                                $scope.lastdateinfo = e.useHistory;
                                            }

                                            $scope.sbfunction();
                                            $scope.lastdateinfo = e.useHistory;

                                        }else if(coverdatestart != coverdateend && coverdateend != coverdateendlaste){
                                            //第四种情况
                                            console.log("第四种情况");

                                            //if(e.useHistory[j].startGPSTime){
                                            //    e.useHistory[j].four={
                                            //        laststarttime:registerService.coverdate(e.useHistory[j].startGPSTime),
                                            //        starteventdate:coverdatestart,
                                            //        pointpoint:"......",
                                            //        chinesestart:"起点：",
                                            //        chineseend:"终点："
                                            //    };
                                            //    console.log("执行了");
                                            //}else{
                                            //    e.useHistory[j].four={
                                            //        laststarttime:"未获取到数据",
                                            //        starteventdate:"无数据",
                                            //        pointpoint:"......"
                                            //    };
                                            //}
                                            //if(e.useHistory[j].endGPSTime){
                                            //    e.useHistory[j].four={
                                            //        lastendtime:registerService.coverdate(e.useHistory[j].endGPSTime),
                                            //        endeventdate:registerService.coverdateyear(e.useHistory[j].endGPSTime)
                                            //    };
                                            //}else{
                                            //    e.useHistory[j].four={
                                            //        lastendtime:"未获取到数据",
                                            //        endeventdate:"无数据"
                                            //    };
                                            //}

                                            if(e.useHistory[j].startGPSTime !=0 && e.useHistory[j].endGPSTime !=0){
                                                e.useHistory[j].four={
                                                    laststarttime:registerService.coverdate(e.useHistory[j].startGPSTime),
                                                    starteventdate:coverdatestart,
                                                    chinesestart:"起点：",
                                                    chineseend:"终点：",
                                                    lastendtime:registerService.coverdate(e.useHistory[j].endGPSTime),
                                                    endeventdate:registerService.coverdateyear(e.useHistory[j].endGPSTime),
                                                    startpoint: $scope.todayaddressa,
                                                    endpoint: $scope.endaddressa,
                                                    pointpoint:"........."
                                                };
                                                $scope.lastdateinfo = e.useHistory;
                                                console.log("执行了");
                                            }else if(e.useHistory[j].startGPSTime==0 && e.useHistory[j].endGPSTime !=0){
                                                e.useHistory[j].four={
                                                    laststarttime:"无数据",
                                                    starteventdate:"无数据",
                                                    chinesestart:"起点：",
                                                    chineseend:"终点：",
                                                    lastendtime:registerService.coverdate(e.useHistory[j].endGPSTime),
                                                    endeventdate:registerService.coverdateyear(e.useHistory[j].endGPSTime),
                                                    startpoint: $scope.todayaddressa,
                                                    endpoint: $scope.endaddressa,
                                                    pointpoint:"........."
                                                };
                                                $scope.lastdateinfo = e.useHistory;
                                            }else if(e.useHistory[j].startGPSTime!=0 && e.useHistory[j].endGPSTime ==0){
                                                e.useHistory[j].four={
                                                    laststarttime:registerService.coverdate(e.useHistory[j].startGPSTime),
                                                    starteventdate:coverdatestart,
                                                    chinesestart:"起点：",
                                                    chineseend:"终点：",
                                                    lastendtime:"无数据",
                                                    endeventdate:"无数据",
                                                    startpoint: $scope.todayaddressa,
                                                    endpoint: $scope.endaddressa,
                                                    pointpoint:"........."
                                                };
                                                $scope.lastdateinfo = e.useHistory;
                                            }else{
                                                e.useHistory[j].four={
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
                                                $scope.lastdateinfo = e.useHistory;
                                            }
                                            $scope.sbfunction()
                                            $scope.lastdateinfo = e.useHistory;

                                        }else if(coverdatestart == coverdateend && coverdateend == coverdateendlaste){
                                            //第二种情况
                                            console.log("第二种情况");

                                            console.log(j,e.useHistory[j]);
                                            //if(e.useHistory[j].startGPSTime){
                                            //    e.useHistory[j].sed={
                                            //        laststarttime:registerService.coverdate(e.useHistory[j].startGPSTime),
                                            //        starteventdate:coverdatestart,
                                            //        chinesestart:"起点：",
                                            //        chineseend:"终点："
                                            //    };
                                            //    console.log("执行了");
                                            //}else{
                                            //    e.useHistory[j].sed={
                                            //        laststarttime:"未获取到数据",
                                            //        starteventdate:"无数据"
                                            //    };
                                            //}
                                            //if(e.useHistory[j].endGPSTime){
                                            //    e.useHistory[j].sed={
                                            //        lastendtime:registerService.coverdate(e.useHistory[j].endGPSTime),
                                            //        endeventdate:registerService.coverdateyear(e.useHistory[j].endGPSTime)
                                            //    };
                                            //}else{
                                            //    e.useHistory[j].sed={
                                            //        lastendtime:"未获取到数据",
                                            //        endeventdate:"无数据"
                                            //    };
                                            //}
                                            if(!e.useHistory[j].startGPSTime && !e.useHistory[j].endGPSTime){
                                                e.useHistory[j].sed={
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
                                                $scope.lastdateinfo = e.useHistory;
                                            }else if(e.useHistory[j].startGPSTime !=0 && e.useHistory[j].endGPSTime !=0){
                                                e.useHistory[j].sed={
                                                    laststarttime:registerService.coverdate(e.useHistory[j].startGPSTime),
                                                    starteventdate:coverdatestart,
                                                    chinesestart:"起点：",
                                                    chineseend:"终点：",
                                                    lastendtime:registerService.coverdate(e.useHistory[j].endGPSTime),
                                                    endeventdate:registerService.coverdateyear(e.useHistory[j].endGPSTime),
                                                    startpoint: $scope.todayaddressa,
                                                    endpoint: $scope.endaddressa,
                                                    pointpoint:"........."
                                                };
                                                $scope.lastdateinfo = e.useHistory;
                                                console.log("执行了");
                                            }else if(e.useHistory[j].startGPSTime==0 && e.useHistory[j].endGPSTime !=0){
                                                e.useHistory[j].sed={
                                                    laststarttime:"无数据",
                                                    starteventdate:"无数据",
                                                    chinesestart:"起点：",
                                                    chineseend:"终点：",
                                                    lastendtime:registerService.coverdate(e.useHistory[j].endGPSTime),
                                                    endeventdate:registerService.coverdateyear(e.useHistory[j].endGPSTime),
                                                    startpoint: $scope.todayaddressa,
                                                    endpoint: $scope.endaddressa,
                                                    pointpoint:"........."
                                                };
                                                $scope.lastdateinfo = e.useHistory;
                                            }else if(e.useHistory[j].startGPSTime!=0 && e.useHistory[j].endGPSTime ==0){
                                                e.useHistory[j].sed={
                                                    laststarttime:registerService.coverdate(e.useHistory[j].startGPSTime),
                                                    starteventdate:coverdatestart,
                                                    chinesestart:"起点：",
                                                    chineseend:"终点：",
                                                    lastendtime:"无数据",
                                                    endeventdate:"无数据",
                                                    startpoint: $scope.todayaddressa,
                                                    endpoint: $scope.endaddressa,
                                                    pointpoint:"........."
                                                };
                                                $scope.lastdateinfo = e.useHistory;
                                            }else{
                                                e.useHistory[j].sed={
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
                                                $scope.lastdateinfo = e.useHistory;
                                            }
                                            $scope.sbfunction();
                                            $scope.lastdateinfo = e.useHistory;


                                        }else if(coverdatestart != coverdateend && coverdateend == coverdateendlaste){
                                            //第三种情况
                                            console.log("第三种情况");


                                            if(e.useHistory[j].startGPSTime !=0 && e.useHistory[j].endGPSTime !=0){
                                                e.useHistory[j].thr={
                                                    laststarttime:registerService.coverdate(e.useHistory[j].startGPSTime),
                                                    starteventdate:coverdatestart,
                                                    chinesestart:"起点：",
                                                    chineseend:"终点：",
                                                    lastendtime:registerService.coverdate(e.useHistory[j].endGPSTime),
                                                    endeventdate:registerService.coverdateyear(e.useHistory[j].endGPSTime),
                                                    startpoint: $scope.todayaddressa,
                                                    endpoint: $scope.endaddressa,
                                                    pointpoint:"........."
                                                };
                                                $scope.lastdateinfo = e.useHistory;
                                                console.log("执行了");
                                            }else if(e.useHistory[j].startGPSTime==0 && e.useHistory[j].endGPSTime !=0){
                                                e.useHistory[j].thr={
                                                    laststarttime:"无数据",
                                                    starteventdate:"无数据",
                                                    chinesestart:"起点：",
                                                    chineseend:"终点：",
                                                    lastendtime:registerService.coverdate(e.useHistory[j].endGPSTime),
                                                    endeventdate:registerService.coverdateyear(e.useHistory[j].endGPSTime),
                                                    startpoint: $scope.todayaddressa,
                                                    endpoint: $scope.endaddressa,
                                                    pointpoint:"........."
                                                };
                                                $scope.lastdateinfo = e.useHistory;
                                            }else if(e.useHistory[j].startGPSTime!=0 && e.useHistory[j].endGPSTime ==0){
                                                e.useHistory[j].thr={
                                                    laststarttime:registerService.coverdate(e.useHistory[j].startGPSTime),
                                                    starteventdate:coverdatestart,
                                                    chinesestart:"起点：",
                                                    chineseend:"终点：",
                                                    lastendtime:"无数据",
                                                    endeventdate:"无数据",
                                                    startpoint: $scope.todayaddressa,
                                                    endpoint: $scope.endaddressa,
                                                    pointpoint:"........."
                                                };
                                                $scope.lastdateinfo = e.useHistory;
                                            }else{
                                                e.useHistory[j].thr={
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
                                                $scope.lastdateinfo = e.useHistory;
                                            }
                                            $scope.sbfunction();
                                            $scope.lastdateinfo = e.useHistory;


                                        }
                                    }
                                }


                            //if(e.useHistory[j].startGPSTime && e.useHistory[j].endGPSTime && coverdatestart==coverdateend){
                            //    e.useHistory[j].laststarttime = registerService.coverdate(e.useHistory[j].startGPSTime);
                            //    e.useHistory[j].eventdate = coverdateend;
                            //    $scope.normaldianlastdontdate = false;
                            //    $scope.sbdianlastdontdate =true ;
                            //    console.log("444444");
                            //}else if(e.useHistory[j].startGPSTime && e.useHistory[j].endGPSTime && coverdatestart!=coverdateend){
                            //    $scope.normaldianlastdontdate =true ;
                            //    $scope.sbdianlastdontdate = false;
                            //    e.useHistory[j].eventdate = coverdateend;
                            //    console.log("不正常");
                            //}else if(!e.useHistory[j].startGPSTime && e.useHistory[j].endGPSTime){
                            //    e.useHistory[j].laststarttime = "无数据";
                            //    e.useHistory[j].lastendtime = registerService.coverdate(e.useHistory[j].endGPSTime);
                            //    e.useHistory[j].eventdate = coverdateend;
                            //    console.log("3333333");
                            //}else if(e.useHistory[j].startGPSTime && !e.useHistory[j].endGPSTime){
                            //    e.useHistory[j].lastendtime = "无数据";
                            //    e.useHistory[j].laststarttime = registerService.coverdate(e.useHistory[j].startGPSTime);
                            //    e.useHistory[j].eventdate = coverdatestart;
                            //    console.log("222222");
                            //}else{
                            //    console.log("111111");
                            //}
                            //console.log(1);
                            //if(j>0){
                            //    if(registerService.coverdateyear(e.useHistory[j].startGPSTime) == registerService.coverdateyear(e.useHistory[j-1].endGPSTime) || registerService.coverdateyear(e.useHistory[j].endGPSTime) == registerService.coverdateyear(e.useHistory[j-1].endGPSTime)){
                            //        $scope.dateyeardisnone = false;
                            //        console.log("j>0,消失");
                            //    }else{
                            //        $scope.dateyeardisnone = false;
                            //        console.log("j>0,显示");
                            //    }
                            //    console.log("f>0");
                            //}else{
                            //    console.log("f=0，显示");
                            //    $scope.dateyeardisnone = true;
                            //}




                            //else if($scope.lastdatepage > 1){
                            //    var coverdateendlast = registerService.coverdateyear(e.useHistory[j].endGPSTime);
                            //    console.log("这不是第一页");
                            //    console.log("开始，结束，前一天结束date："+coverdatestart,coverdateend,coverdateendlast)
                            //    //if() {   //第一种情况
                            //    //
                            //    //}else if(){     //第二种情况
                            //    //
                            //    //}else if(){        //第三种情况
                            //    //
                            //    //}else if(){     //第四种情况
                            //    //
                            //    //}
                            //}

                        };
                        $scope.laststarttransloc();
                        //var f=0;
                        //$scope.lastendtransloc = function() {
                        //
                        //    //var coverdatestart = registerService.coverdateyear(e.useHistory[f].startGPSTime);
                        //    //var coverdateend = registerService.coverdateyear(e.useHistory[f].endGPSTime);
                        //    ////e.useHistory[f].lastendtime = registerService.coverdate(e.useHistory[f].endGPSTime);
                        //    //if(e.useHistory[f].startGPSTime && e.useHistory[f].endGPSTime && coverdatestart==coverdateend){
                        //    //    e.useHistory[f].lastendtime = registerService.coverdate(e.useHistory[f].endGPSTime);
                        //    //    e.useHistory[f].eventdate = coverdatestart;
                        //    //
                        //    //    $scope.normaldianlastdontdate =false ;
                        //    //    $scope.sbdianlastdontdate = true;
                        //    //}else if(e.useHistory[f].startGPSTime && e.useHistory[f].endGPSTime && coverdatestart!=coverdateend){
                        //    //    $scope.normaldianlastdontdate =true ;
                        //    //    $scope.sbdianlastdontdate = false;
                        //    //    e.useHistory[f].eventdate = coverdateend;
                        //    //}else if(!e.useHistory[f].startGPSTime && e.useHistory[f].endGPSTime){
                        //    //    e.useHistory[f].laststarttime = "无数据";
                        //    //    e.useHistory[f].lastendtime = registerService.coverdate(e.useHistory[f].endGPSTime);
                        //    //    e.useHistory[f].eventdate = coverdateend;
                        //    //}else if(e.useHistory[f].startGPSTime && !e.useHistory[f].endGPSTime){
                        //    //    e.useHistory[f].lastendtime = "无数据";
                        //    //    e.useHistory[f].laststarttime = registerService.coverdate(e.useHistory[f].startGPSTime);
                        //    //    e.useHistory[f].eventdate = coverdatestart;
                        //    //}
                        //    //if(f>0){
                        //    //    if(registerService.coverdateyear(e.useHistory[f].startGPSTime) == registerService.coverdateyear(e.useHistory[f-1].endGPSTime) || registerService.coverdateyear(e.useHistory[f].endGPSTime) == registerService.coverdateyear(e.useHistory[f-1].endGPSTime)){
                        //    //        $scope.dateyeardisnone = true;
                        //    //    }else{
                        //    //        $scope.dateyeardisnone = false;
                        //    //
                        //    //    }
                        //    //}else{
                        //    //
                        //    //
                        //    //
                        //    //    $scope.dateyeardisnone = false;
                        //    //}
                        //
                        //    //$scope.lastendwarningadd = registerService.covertAddress(endlnglatXY);
                        //
                        //
                        //
                        //};
                        //
                        //$scope.lastendtransloc();
                    }else{
                        //e.length=0的时候
                        $scope.notripcontent = false;//无行程
                        $scope.clickonload = true;//点击加载
                        $scope.cartriploading = true;//加载中
                        $scope.thelastpagecartripover = true;//加载完全
                        console.log("无数据")
                    }


                }else{
                    $scope.subapp= {"toggle":true};
                    $scope.submitWarning = e.reason+"！";
                    $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                    $scope.notripcontent = true;//无行程
                    $scope.clickonload = false;//点击加载
                    $scope.cartriploading = true;//加载中
                    $scope.thelastpagecartripover = true;//加载完全
                }
            },function(err){
                $scope.loadapp = {"toggle":false};
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "网络连接失败！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
                $scope.notripcontent = true;//无行程
                $scope.clickonload = false;//点击加载
                $scope.cartriploading = true;//加载中
                $scope.thelastpagecartripover = true;//加载完全
            });
        }
        $scope.lastdate();
        $scope.date_yes = function(){
            if(($(".startyearnum").val() <= $(".overyearnum").val()) && ($(".startmonthnum").val()<=$(".overmonthnum").val()) && ($(".startdaynum").val()<=$(".overdaynum").val())){
                $scope.ostartTime = $(".startyearnum").val() +$(".startmonthnum").val()+$(".startdaynum").val();
                $scope.overTime = $(".overyearnum").val()+$(".overmonthnum").val()+$(".overdaynum").val();
                $scope.ajaxstarttime = $scope.ostartTime.replace('年','').replace('月','').replace('日','');
                $scope.ajaxendtime = $scope.overTime.replace('年','').replace('月','').replace('日','');
                $scope.lastdatepage=0;
                $scope.lastdate();
                $timeout(function(){
                    $scope.datediv = {toggle:false};
                },200);
            } else if(($(".startyearnum").val() <= $(".overyearnum").val()) && ($(".startmonthnum").val()<$(".overmonthnum").val())){
                $scope.ostartTime = $(".startyearnum").val() +$(".startmonthnum").val()+$(".startdaynum").val();
                $scope.overTime = $(".overyearnum").val()+$(".overmonthnum").val()+$(".overdaynum").val();
                $scope.ajaxstarttime = $scope.ostartTime.replace('年','').replace('月','').replace('日','');
                $scope.ajaxendtime = $scope.overTime.replace('年','').replace('月','').replace('日','');
                $scope.lastdatepage=0;
                $scope.lastdate();
                $timeout(function(){
                    $scope.datediv = {toggle:false};
                },200);
            }else if(($(".startyearnum").val() < $(".overyearnum").val())){
                $scope.ostartTime = $(".startyearnum").val() +$(".startmonthnum").val()+$(".startdaynum").val();
                $scope.overTime = $(".overyearnum").val()+$(".overmonthnum").val()+$(".overdaynum").val();
                $scope.ajaxstarttime = $scope.ostartTime.replace('年','').replace('月','').replace('日','');
                $scope.ajaxendtime = $scope.overTime.replace('年','').replace('月','').replace('日','');
                $scope.lastdatepage=0;
                $scope.lastdate();
                $timeout(function(){
                    $scope.datediv = {toggle:false};
                },200);
            } else {
                //$rootScope.subapp = {toggle : true};
                //$rootScope.submitWarning = "结束日期大于开始日期，请您重新确认！";
                $scope.datediv = {toggle:false};
                //console.log("riqi");
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "开始日期大于结束日期，请您重新确认！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }

        }
        $scope.dateModelhide = function(){
            $scope.datediv = {toggle:false};
            console.log(1);
        }
        $scope.showdatemodelbtn = function(){
            $scope.datediv = {toggle:true};
        }
        //点击继续加载
        $scope.clickLasttripOnload = function(){
            $scope.notripcontent = true;//无行程
            $scope.clickonload = true;//点击加载
            $scope.cartriploading = false;//加载中
            $scope.thelastpagecartripover = true;//加载完全
            var lasttripObj = {
                uid:$window.sessionStorage.getItem("Uid"),
                startTime:$scope.ajaxstarttime+'000000',
                endTime:$scope.ajaxendtime+'235959',
                pageNumber:$scope.lastdatepage,
                limit:2
            };
            var lasttripUrl = "/rest/vehicles/useHistory/";
            $scope.loadapp = {"toggle":true};
            registerService.commonUserget(lasttripObj,lasttripUrl).then(function(e){
                $scope.loadapp = {"toggle":false};
                if(e.status == true){
                    console.log(e);
                    console.log(e.useHistory.length);
                    $scope.lastdatepage ++;
                    if(e.useHistory.length !=0){
                        console.log("有数据");
                        //table的样式 是否最后一页
                        if(e.isLastpage == true){
                            $scope.notripcontent = true;//无行程
                            $scope.clickonload = true;//点击加载
                            $scope.cartriploading = true;//加载中
                            $scope.thelastpagecartripover = false;//加载完全
                        }else{
                            $scope.notripcontent = true;//无行程
                            $scope.clickonload = false;//点击加载
                            $scope.cartriploading = true;//加载中
                            $scope.thelastpagecartripover =true ;//加载完全
                        }
                        for(var i in e.useHistory){
                            e.useHistory[i].startpoint = "正在解析！";
                            e.useHistory[i].endpoint = "正在解析！";
                        }
                        $scope.lastdateinfo = e.useHistory;
                        var j = 0;

                        $scope.laststarttransloc = function(){
                            console.log("e.useHistory:",e.useHistory);
                            var lnglatXY =[e.useHistory[j].startLat,e.useHistory[j].startLng];
                            var coverdatestart = registerService.coverdateyear(e.useHistory[j].startGPSTime);
                            var coverdateend = registerService.coverdateyear(e.useHistory[j].endGPSTime);

                            //if(e.useHistory[j].startGPSTime && e.useHistory[j].endGPSTime && coverdatestart==coverdateend){
                            //    e.useHistory[j].laststarttime = registerService.coverdate(e.useHistory[j].startGPSTime);
                            //    e.useHistory[j].eventdate = coverdateend;
                            //    $scope.normaldianlastdontdate = false;
                            //    $scope.sbdianlastdontdate =true ;
                            //    console.log("444444");
                            //}else if(e.useHistory[j].startGPSTime && e.useHistory[j].endGPSTime && coverdatestart!=coverdateend){
                            //    $scope.normaldianlastdontdate =true ;
                            //    $scope.sbdianlastdontdate = false;
                            //    e.useHistory[j].eventdate = coverdateend;
                            //    console.log("不正常");
                            //}else if(!e.useHistory[j].startGPSTime && e.useHistory[j].endGPSTime){
                            //    e.useHistory[j].laststarttime = "无数据";
                            //    e.useHistory[j].lastendtime = registerService.coverdate(e.useHistory[j].endGPSTime);
                            //    e.useHistory[j].eventdate = coverdateend;
                            //    console.log("3333333");
                            //}else if(e.useHistory[j].startGPSTime && !e.useHistory[j].endGPSTime){
                            //    e.useHistory[j].lastendtime = "无数据";
                            //    e.useHistory[j].laststarttime = registerService.coverdate(e.useHistory[j].startGPSTime);
                            //    e.useHistory[j].eventdate = coverdatestart;
                            //    console.log("222222");
                            //}else{
                            //    console.log("111111");
                            //}
                            //console.log(1);
                            //if(j>0){
                            //    if(registerService.coverdateyear(e.useHistory[j].startGPSTime) == registerService.coverdateyear(e.useHistory[j-1].endGPSTime) || registerService.coverdateyear(e.useHistory[j].endGPSTime) == registerService.coverdateyear(e.useHistory[j-1].endGPSTime)){
                            //        $scope.dateyeardisnone = false;
                            //        console.log("j>0,消失");
                            //    }else{
                            //        $scope.dateyeardisnone = false;
                            //        console.log("j>0,显示");
                            //    }
                            //    console.log("f>0");
                            //}else{
                            //    console.log("f=0，显示");
                            //    $scope.dateyeardisnone = true;
                            //}
                            console.log($scope.lastdatepage);
                            if($scope.lastdatepage > 1) {       //第一页的数据
                                console.log("这不是第一页");
                                //两种情况
                                console.log("开始结束date："+coverdatestart,coverdateend);
                                if(j==0){
                                    //这个要跟上一页的比较，，
                                    if(coverdatestart == coverdateend){
                                        //第一种情况
                                        $scope.normaldianlastdontdate = false;
                                        $scope.agadianlastdontdate = true;
                                        $scope.sbdianlastdontdate = true;
                                        $scope.moresbdianlastdontdate = true;
                                    }else{
                                        //第四种情况
                                        $scope.normaldianlastdontdate = true;
                                        $scope.agadianlastdontdate = true;
                                        $scope.sbdianlastdontdate = true;
                                        $scope.moresbdianlastdontdate =false ;
                                    }
                                }else if(j>0){
                                    var coverdateendlaste = registerService.coverdateyear(e.useHistory[j-1].endGPSTime);
                                    //四种情况
                                    if(coverdatestart == coverdateend && coverdatestart != coverdateendlaste){
                                        //第一种情况
                                        $scope.normaldianlastdontdate = false;
                                        $scope.agadianlastdontdate = true;
                                        $scope.sbdianlastdontdate = true;
                                        $scope.moresbdianlastdontdate = true;
                                    }else if(coverdatestart != coverdateend && coverdatestart != coverdateendlaste){
                                        //第四种情况
                                        $scope.normaldianlastdontdate = true;
                                        $scope.agadianlastdontdate = true;
                                        $scope.sbdianlastdontdate = true;
                                        $scope.moresbdianlastdontdate =false ;
                                    }else if(coverdatestart == coverdateend && coverdatestart == coverdateendlaste){
                                        //第二种情况
                                        $scope.normaldianlastdontdate = true;
                                        $scope.agadianlastdontdate = false;
                                        $scope.sbdianlastdontdate = true;
                                        $scope.moresbdianlastdontdate =true ;
                                    }else if(coverdatestart != coverdateend && coverdatestart == coverdateendlaste){
                                        //第三种情况
                                        $scope.normaldianlastdontdate = true;
                                        $scope.agadianlastdontdate = true;
                                        $scope.sbdianlastdontdate =false ;
                                        $scope.moresbdianlastdontdate =true ;
                                    }
                                }


                            }
                            //else if($scope.lastdatepage > 1){
                            //    var coverdateendlast = registerService.coverdateyear(e.useHistory[j].endGPSTime);
                            //    console.log("这不是第一页");
                            //    console.log("开始，结束，前一天结束date："+coverdatestart,coverdateend,coverdateendlast)
                            //    //if() {   //第一种情况
                            //    //
                            //    //}else if(){     //第二种情况
                            //    //
                            //    //}else if(){        //第三种情况
                            //    //
                            //    //}else if(){     //第四种情况
                            //    //
                            //    //}
                            //}
                            AMap.service('AMap.Geocoder',function() {
                                $scope.laststartwarningadd = new AMap.Geocoder({});

                                $scope.laststartwarningadd.getAddress(lnglatXY, function (status, result) {

                                    console.log("run here:", result, status);
                                    if (status === 'complete' && result.info === 'OK') {
                                        $scope.todayaddressa = result.regeocode.formattedAddress;
                                        e.useHistory[j].startpoint = $scope.todayaddressa;
                                        j++;
                                        if (j < e.useHistory.length) {
                                            $scope.laststarttransloc();
                                        } else {
                                        }
                                    } else {
                                        $scope.todayaddressa = "获取地址失败";
                                        e.useHistory[j].startpoint = $scope.todayaddressa;
                                        j++;
                                        if (j < e.useHistory.length) {
                                            $scope.laststarttransloc();
                                        } else {
                                        }
                                    }


                                    $scope.$apply(function () {
                                        $scope.lastdateinfo = e.useHistory;
                                    });
                                });
                            });

                        };
                        $scope.laststarttransloc();
                        var f=0;
                        $scope.lastendtransloc = function() {
                            var endlnglatXY = [e.useHistory[f].endLat,e.useHistory[f].endLng];
                            //var coverdatestart = registerService.coverdateyear(e.useHistory[f].startGPSTime);
                            //var coverdateend = registerService.coverdateyear(e.useHistory[f].endGPSTime);
                            ////e.useHistory[f].lastendtime = registerService.coverdate(e.useHistory[f].endGPSTime);
                            //if(e.useHistory[f].startGPSTime && e.useHistory[f].endGPSTime && coverdatestart==coverdateend){
                            //    e.useHistory[f].lastendtime = registerService.coverdate(e.useHistory[f].endGPSTime);
                            //    e.useHistory[f].eventdate = coverdatestart;
                            //
                            //    $scope.normaldianlastdontdate =false ;
                            //    $scope.sbdianlastdontdate = true;
                            //}else if(e.useHistory[f].startGPSTime && e.useHistory[f].endGPSTime && coverdatestart!=coverdateend){
                            //    $scope.normaldianlastdontdate =true ;
                            //    $scope.sbdianlastdontdate = false;
                            //    e.useHistory[f].eventdate = coverdateend;
                            //}else if(!e.useHistory[f].startGPSTime && e.useHistory[f].endGPSTime){
                            //    e.useHistory[f].laststarttime = "无数据";
                            //    e.useHistory[f].lastendtime = registerService.coverdate(e.useHistory[f].endGPSTime);
                            //    e.useHistory[f].eventdate = coverdateend;
                            //}else if(e.useHistory[f].startGPSTime && !e.useHistory[f].endGPSTime){
                            //    e.useHistory[f].lastendtime = "无数据";
                            //    e.useHistory[f].laststarttime = registerService.coverdate(e.useHistory[f].startGPSTime);
                            //    e.useHistory[f].eventdate = coverdatestart;
                            //}
                            //if(f>0){
                            //    if(registerService.coverdateyear(e.useHistory[f].startGPSTime) == registerService.coverdateyear(e.useHistory[f-1].endGPSTime) || registerService.coverdateyear(e.useHistory[f].endGPSTime) == registerService.coverdateyear(e.useHistory[f-1].endGPSTime)){
                            //        $scope.dateyeardisnone = true;
                            //    }else{
                            //        $scope.dateyeardisnone = false;
                            //
                            //    }
                            //}else{
                            //
                            //
                            //
                            //    $scope.dateyeardisnone = false;
                            //}


                            if(endlnglatXY!=[0,0]){
                                AMap.service('AMap.Geocoder',function() {
                                    $scope.lastendwarningadd = new AMap.Geocoder({});

                                    $scope.lastendwarningadd.getAddress(endlnglatXY, function (status, result) {
                                        if (status === 'complete' && result.info === 'OK') {
                                            $scope.endaddressa = result.regeocode.formattedAddress;
                                            e.useHistory[f].endpoint = $scope.endaddressa;
                                            f++;
                                            if (f < e.useHistory.length) {
                                                $scope.lastendtransloc();
                                            } else {
                                            }
                                        } else {
                                            $scope.endaddressa = "获取地址失败";
                                            e.useHistory[f].endpoint = $scope.endaddressa;
                                            f++;
                                            if (f < e.useHistory.length) {
                                                $scope.lastendtransloc();
                                            } else {
                                            }
                                        }
                                        $scope.$apply(function () {
                                            $scope.lastdateinfo = e.useHistory;
                                        });
                                        console.log($scope.lastdateinfo)


                                    });
                                });
                            }

                        };

                        $scope.lastendtransloc();
                    }else{
                        //e.length=0的时候
                        $scope.notripcontent = false;//无行程
                        $scope.clickonload = true;//点击加载
                        $scope.cartriploading = true;//加载中
                        $scope.thelastpagecartripover = true;//加载完全
                        console.log("无数据")
                    }


                }else{
                    $scope.subapp= {"toggle":true};
                    $scope.submitWarning = e.reason+"！";
                    $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                    $scope.notripcontent = true;//无行程
                    $scope.clickonload = false;//点击加载
                    $scope.cartriploading = true;//加载中
                    $scope.thelastpagecartripover = true;//加载完全
                }
            },function(err){
                $scope.loadapp = {"toggle":false};
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "网络连接失败！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
                $scope.notripcontent = true;//无行程
                $scope.clickonload = false;//点击加载
                $scope.cartriploading = true;//加载中
                $scope.thelastpagecartripover = true;//加载完全
            });
        }
        //var lnglatXY=[116.396574, 39.992706];
        //registerService.covertAddress(lnglatXY);
        //点击加载行程地图
        $scope.cartripmapbtn = function(index){
            var etriphistory = $rootScope.tripmaplatlng;
            //$rootScope.endlat = etriphistory[index].endGPSLat/1000000;
            //$rootScope.endlng = etriphistory[index].endGPSLng/1000000;
            //$rootScope.startlat = etriphistory[index].startGPSLat/1000000;
            //$rootScope.staratlng = etriphistory[index].startGPSLng/1000000;
            //$rootScope.oendpoint = etriphistory[index].endpoint;
            //$rootScope.ostartpoint = etriphistory[index].startpoint;
            $rootScope.endtimee = registerService.coverdateerooter(etriphistory[index].endGPSTime);
            $rootScope.starttimee = registerService.coverdateerooter(etriphistory[index].startGPSTime);
            //console.log($rootScope.endlat,$rootScope.endlng,$rootScope.startlat,$rootScope.staratlng);
            //$state.go("");
            console.log("时间这块"+$rootScope.endtimee,$rootScope.starttimee);
        }
        //点击加载行程地图
        $scope.firsttripbtn = function(index){
            var firsttriphistory = $rootScope.todaytripinfo;
            $rootScope.endtimee = registerService.coverdateerooter(firsttriphistory[index].endGPSTime);
            $rootScope.starttimee = registerService.coverdateerooter(firsttriphistory[index].startGPSTime);
            console.log("时间这块"+$rootScope.endtimee,$rootScope.starttimee);
            //$rootScope.endlat = firsttriphistory[index].endGPSLat/1000000;
            //$rootScope.endlng = firsttriphistory[index].endGPSLng/1000000;
            //$rootScope.startlat = firsttriphistory[index].startGPSLat/1000000;
            //$rootScope.staratlng = firsttriphistory[index].startGPSLng/1000000;
            //$rootScope.oendpoint = firsttriphistory[index].startAddresscontent;
            //$rootScope.ostartpoint = firsttriphistory[index].endAddresscontent;
            //console.log($rootScope.endlat,$rootScope.endlng,$rootScope.startlat,$rootScope.staratlng);
        }
    })
    //用车记录map
    .controller("cartripmapController",function($scope,$rootScope,$state,registerService,$interval,$window,$timeout){
        $scope.searchPassBackBtn = function(){
            window.history.go(-1);
        };
        function prostatus(){
            //return false;
        }
        prostatus();
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
        //$rootScope.checkConnection();
        console.log("时间这块"+$rootScope.endtimee,$rootScope.starttimee);
        //$scope.backappfunctionsmall = function(){
        //    registerService.removeevent();
        //};
        //$scope.backappfunctionsmall();
        //$scope.centerpointmap = [116.397428, 39.90923];
        //
        //$timeout(function(){
        //    var map = $rootScope.maploadfun('tripmapid',$scope.centerpointmap);
        //
        //},200)
        // console.log(window.localStorage.getItem("mapcenterpoint"));
        var localgetarr = window.localStorage.getItem("mapcenterpoint");
        console.log(localgetarr);
        //if($rootScope.map){
        //    var map=$rootScope.map
        //}else{
            if(!localgetarr){
                var map =  new AMap.Map('tripmapid',{
                    zoom:20,
                    center: [116.397428, 39.90923]
                });
            }else{
                var map =  new AMap.Map('tripmapid',{
                    zoom:20,
                    center: localgetarr.split(",")
                });
            }
        //    $rootScope.map = map;
        //}


        //$rootScope.maproot("tripmapid");
        //
        //if($rootScope.maploadstyle){
        //
        //    map = $rootScope.mapallload();
        //}else {
        //    $rootScope.mapallload = function(){
        //        new AMap.Map('tripmapid',{
        //            zoom:20,
        //            center: [116.397428, 39.90923]
        //        });
        //        //$rootScope.maploadstyle = true;
        //    }
        //    map = $rootScope.mapallload();
        //    console.log("这是是map："+$rootScope.mapallload());
        //}


        AMap.plugin(['AMap.ToolBar','AMap.Scale'],
            function(){
                var toolbar = new AMap.ToolBar({
                    liteStyle:true
                });
                map.addControl(toolbar);
                map.addControl(new AMap.Scale());
            });
        //获取行车轨迹
        var drivingtrackObj = {
            uid:$window.sessionStorage.getItem("Uid"),
            startTime:$rootScope.starttimee,
            endTime:$rootScope.endtimee

        };
        var drivingtrackUrl = "/rest/gps/period/";
        $scope.loadapp = {"toggle":true};
        registerService.commonUserget(drivingtrackObj,drivingtrackUrl).then(function(e){
            $scope.loadapp = {"toggle":false};
            console.log(e);
            if(e.status == true){
                var mappoly;
                if(e.alarmLists.length != 0){
                    //$scope.loadapp = {"toggle":false};
                    var lineArr = [];
                    //for(var i=0;i< e.alarmLists.length;i++){
                    var i = e.alarmLists.length-1;
                    //$scope.loadapp = {"toggle":true};
                    function mapfuncloc(){
                        //$scope.loadapp = {"toggle":true};
                        function maplinenerf(){
                            console.log(e.alarmLists.length,i);
                            if(i == 0){
                                if(lineArr.length >=1){
                                    //$timeout(function(){
                                    //    $scope.loadapp = {"toggle":false};
                                    //},200);

                                    console.log($scope);
                                    $scope.otrackendpoint = "正在解析";
                                    $scope.otrackstartpoint = "正在解析";
                                    $scope.startfunc = function(){
                                        var contentb = "<div class='locationmarkerC' >"+"起点位置: "+$scope.otrackstartpoint+"</div>"
                                        $scope.contentmark1 = new AMap.Marker({
                                            content:contentb,
                                            position:lineArr[0],
                                            offset : new AMap.Pixel(-70,-55),
                                            map:map
                                        });
                                    };
                                    $scope.endfunc = function(){
                                        var contents = "<div class='locationmarkerC' >"+"终点位置: "+$scope.otrackendpoint+"</div>"
                                        $scope.contentmark2 = new AMap.Marker({
                                            content:contents,
                                            position:lineArr[lineArr.length-1],
                                            offset : new AMap.Pixel(-70,-55),
                                            map:map
                                        });
                                    }
                                    console.log("lineArr.length:"+lineArr.length);
                                    var linearr1 = lineArr[0];
                                    var linearr2 = lineArr[lineArr.length-1];
                                    window.localStorage.setItem("mapcenterpoint",lineArr[0]);
                                    $scope.mark1 = new AMap.Marker({
                                        map: map,
                                        position: lineArr[0],
                                        icon: "img/my_location_3.png",
                                        offset: new AMap.Pixel(-26, -27)
                                            //autoRotation: true
                                    });
                                    $scope.mark2 = new AMap.Marker({
                                        map: map,
                                        position: lineArr[lineArr.length-1],
                                        icon: "img/car_location_3.png",
                                        offset: new AMap.Pixel(-17, -37)
                                            //autoRotation: true
                                    });
                                    AMap.service('AMap.Geocoder',function() {
                                        $scope.startrackadd = new AMap.Geocoder({

                                        });
                                        $scope.startrackadd.getAddress([linearr1,linearr2], function (status, result) {
                                            console.log("报错的地方啊1；"+linearr1);
                                            console.log("报错的地方2："+linearr2);

                                            console.log("run here:",result,status);
                                            //console.log("result:"+JSON.stringify(result));
                                            if (status === 'complete' && result.info === 'OK') {
                                                if (result.regeocodes[1].formattedAddress) {
                                                    $scope.otrackendpoint = result.regeocodes[1].formattedAddress;
                                                    $scope.endfunc();
                                                } else {
                                                    $scope.otrackendpoint = "获取地址失败";
                                                    $scope.endfunc();
                                                }
                                                if (result.regeocodes[0].formattedAddress) {
                                                    $scope.otrackstartpoint = result.regeocodes[0].formattedAddress;
                                                    $scope.startfunc();

                                                } else {
                                                    $scope.otrackstartpoint = "获取地址失败";
                                                    $scope.startfunc()
                                                }
                                            } else {
                                                $scope.todayaddressa = "获取地址失败";
                                                $scope.otrackstartpoint = $scope.todayaddressa;
                                                $scope.otrackendpoint = $scope.todayaddressa;
                                                $scope.endfunc();
                                                $scope.startfunc();

                                            }

                                        });
                                    });
                                    mappoly = new AMap.Polyline({
                                        map: map,
                                        path: lineArr,
                                        strokeColor: "#00A",  //线颜色
                                        strokeOpacity: 1,     //线透明度
                                        strokeWeight: 3,      //线宽
                                        strokeStyle: "solid"  //线样式
                                    });
                                    try {
                                        map.setFitView();
                                    }catch (err){
                                        console.log(err.message);
                                    }
                                    //console.log(map);
                                    //console.log(map.setFitView);


                                }else {
                                    $scope.loadapp = {"toggle":false};
                                    $scope.subapp= {"toggle":true};
                                    $scope.submitWarning = "未获取到经纬度数据，无法显示轨迹！";
                                    $timeout(function(){
                                        $scope.subapp= {"toggle":false};
                                    },2000);
                                }


                            }

                        }
                        if(!e.alarmLists[i].lat || !e.alarmLists[i].lng){
                            if(i == 0){
                                maplinenerf();
                            }else {
                                console.log("错了就一直加");
                                i--;
                                mapfuncloc()
                            }

                        } else if(e.alarmLists[i].lat !=0 && e.alarmLists[i].lng !=0){
                            var covermaplatlng = [e.alarmLists[i].lng/1000000, e.alarmLists[i].lat/1000000]
                            AMap.convertFrom(covermaplatlng,"gps",function(status,result){
                                console.log("成功的result:"+JSON.stringify(result));

                                if (result.info === 'ok') {
                                    var s = result.locations[0];
                                    lineArr.push(s);
                                    mappoly = new AMap.Polyline({
                                        map: map,
                                        path: lineArr,
                                        strokeColor: "#00A",  //线颜色
                                        strokeOpacity: 1,     //线透明度
                                        strokeWeight: 3,      //线宽
                                        strokeStyle: "solid"  //线样式
                                    });
                                    try {
                                        map.setFitView();
                                    }catch (err){
                                        console.log(err.message);
                                    }
                                    console.log("成功了");
                                    console.log(lineArr);
                                    maplinenerf();
                                }else {
                                    var s = new AMap.LngLat(e.alarmLists[i].lng/1000000, e.alarmLists[i].lat/1000000);
                                    lineArr.push(s);
                                    mappoly = new AMap.Polyline({
                                        map: map,
                                        path: lineArr,
                                        strokeColor: "#00A",  //线颜色
                                        strokeOpacity: 1,     //线透明度
                                        strokeWeight: 3,      //线宽
                                        strokeStyle: "solid"  //线样式
                                    });
                                    try {
                                        map.setFitView();
                                    }catch (err){
                                        console.log(err.message);
                                    }
                                    console.log("失败了");
                                    console.log(lineArr);
                                    maplinenerf();
                                };
                                if(i== 0){

                                }else {
                                    i--;
                                    mapfuncloc()
                                }
                            })
                        }else {
                            if(i == 0){
                                maplinenerf();
                            }else {
                                i--;
                                mapfuncloc()
                            }
                        }
                    }
                    mapfuncloc();


                    //}

                }else {
                    $scope.loadapp = {"toggle":false};
                    $scope.subapp= {"toggle":true};
                    $scope.submitWarning = "未获取到数据，无法显示轨迹！";
                    $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                }


                // 绘制轨迹

            }else {
                $scope.loadapp = {"toggle":false};
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = e.reason+"！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }
        },function(err){
            $scope.loadapp = {"toggle":false};
            $scope.subapp= {"toggle":true};
            $scope.submitWarning = "网络连接失败！";
            $timeout(function(){
                $scope.subapp= {"toggle":false};
            },2000);
        })
    })
    //报警记录
    .controller("alarmrecordController",function($scope,$rootScope,$state,registerService,$interval,$window,$timeout){
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
        //$scope.windoWHeihgt = ($(window).height())*1+"px";
        $scope.winHeight = {
            "height":$rootScope.windoWHeihgt
        };
        $scope.alarmrecordPage = 0;
        $scope.alarmfirObj = {
            uid:$window.sessionStorage.getItem("Uid"),
            startTime:registerService.getdatestrnochinese(-10)+"000000",
            endTime:registerService.getTime()+"235959",
            pageNumber:$scope.alarmrecordPage,
            limit:3
        };
        console.log(registerService.getTime());
        $scope.alarmUrl = "/rest/vehicles/alarmLists/";
        $scope.alarminit = function(){
            $scope.loadapp = {"toggle":true};
            $scope.alarmrecordInfo = null;
            registerService.commonUserget($scope.alarmfirObj,$scope.alarmUrl).then(function(e){
                $scope.loadapp = {"toggle":false};
                $scope.alarmclick1=true ;
                $scope.alarmclick2= false;
                $scope.alarmclicknew = true;
                $scope.alarmclick3= true;
                $scope.alarmclick4 = true;
                if(e.status == true){
                    if(e.alarmLists.length != 0){
                        console.log(e);
                        $scope.alarmrecordPage ++;

                        if(e.isLastPage == true){
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
                        for(var i in e.alarmLists){
                            e.alarmLists[i].describe = "正在解析！";
                            e.alarmLists[i].gpstime = "正在解析！";
                        }
                        console.log("here 1",$scope)
                        console.log("看这个"+$scope.alarmrecordInfo);
                        //if($scope.alarmrecordInfo){
                        //    $scope.alarmrecordInfo = $scope.alarmrecordInfo.concat(e.alarmLists);
                        //}else{
                        $scope.alarmrecordInfo = e.alarmLists;
                        //}

                        var j = 0;
                        $scope.transloc = function(){
                            var lnglatXY =[e.alarmLists[j].LNG/1000000,e.alarmLists[j].LAT/1000000];
                            e.alarmLists[j].gpstime = new Date(e.alarmLists[j].GPS_TIME);
                            //$scope.warningadd = registerService.covertAddress(lnglatXY);

                            if(e.alarmLists[j].LAT !=0){
                                try {
                                    AMap.convertFrom(lnglatXY,"gps",function(status,result){
                                        function alarmcoverlaglatf(){
                                            AMap.service('AMap.Geocoder',function() {
                                                $scope.warningadd = new AMap.Geocoder({});
                                                $scope.warningadd.getAddress(lnglatXYcover, function (status, result) {
                                                    if (status === 'complete' && result.info === 'OK') {
                                                        $scope.addressa = result.regeocode.formattedAddress;
                                                        e.alarmLists[j].describe = $scope.addressa;
                                                        j++;
                                                        if (j < e.alarmLists.length) {
                                                            $scope.transloc();
                                                        } else {
                                                        }
                                                    } else {
                                                        $scope.addressa = "获取地址失败";
                                                        e.alarmLists[j].describe = $scope.addressa;
                                                        j++;

                                                        if (j < e.alarmLists.length) {
                                                            $scope.transloc();
                                                        } else {
                                                        }


                                                    }
                                                    $scope.$apply(function () {
                                                        $scope.alarmrecordInfo = e.alarmLists;
                                                    })
                                                });
                                            });
                                        }
                                        if (result.info === 'ok') {
                                            var lnglatXYcover = result.locations[0];
                                            //var s = result.locations[0];
                                            alarmcoverlaglatf();
                                        }else {
                                            var lnglatXYcover = lnglatXY;
                                            alarmcoverlaglatf();
                                        }
                                    });
                                    $scope.initfalseapp= {"toggle":false};
                                }catch (err){
                                    $scope.initfalseapp= {"toggle":true};
                                    //$scope.subapp= {"toggle":true};

                                    $scope.goSubmitPage= function(){
                                        window.location.replace("index.html");
                                        $scope.initfalseapp= {"toggle":false};
                                    };
                                    $scope.gomainhomePage = function(){
                                        $state.go("mains.home");
                                        $scope.initfalseapp= {"toggle":false};
                                    }
                                }



                            }else {
                                e.alarmLists[j].describe = "获取地址失败";
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
                    $scope.subapp= {"toggle":true};
                    $scope.submitWarning = e.reason+"！";
                    $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                    $scope.alarmclick1= true;
                    $scope.alarmclicknew = false;
                    $scope.alarmclick2= true;
                    $scope.alarmclick3= true;
                    $scope.alarmclick4 = true;
                }
            },function(err){
                $scope.loadapp = {"toggle":false};
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "网络连接失败！";
                $timeout(function(){
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
                $scope.alarmajaxstarttime = $scope.ostartTime.replace('年','').replace('月','').replace('日','');
                $scope.alarmajaxendtime = $scope.overTime.replace('年','').replace('月','').replace('日','');
                $timeout(function(){
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
                $scope.alarmUrl = "/rest/ vehicles/alarmLists/";
                $scope.alarminit();
            } else if(($(".startyearnum").val() <= $(".overyearnum").val()) && ($(".startmonthnum").val()<$(".overmonthnum").val())){
                $scope.ostartTime = $(".startyearnum").val() +$(".startmonthnum").val()+$(".startdaynum").val();
                $scope.overTime = $(".overyearnum").val()+$(".overmonthnum").val()+$(".overdaynum").val();
                $scope.alarmajaxstarttime = $scope.ostartTime.replace('年','').replace('月','').replace('日','');
                $scope.alarmajaxendtime = $scope.overTime.replace('年','').replace('月','').replace('日','');
                $timeout(function(){
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
                $scope.alarmUrl = "/rest/ vehicles/alarmLists/";
                $scope.alarminit();
            } else if(($(".startyearnum").val() < $(".overyearnum").val())){
                $scope.ostartTime = $(".startyearnum").val() +$(".startmonthnum").val()+$(".startdaynum").val();
                $scope.overTime = $(".overyearnum").val()+$(".overmonthnum").val()+$(".overdaynum").val();
                $scope.alarmajaxstarttime = $scope.ostartTime.replace('年','').replace('月','').replace('日','');
                $scope.alarmajaxendtime = $scope.overTime.replace('年','').replace('月','').replace('日','');
                $timeout(function(){
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
                $scope.alarmUrl = "/rest/ vehicles/alarmLists/";
                $scope.alarminit();
            } else{
                //$rootScope.subapp = {toggle : true};
                //$rootScope.submitWarning = "结束日期大于开始日期，请您重新确认！";
                $scope.datediv = {toggle:false};
                //console.log("riqi");
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "开始日期大于结束日期，请您重新确认！";
                $timeout(function(){
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
            if($scope.oAstartTime){
                $scope.firstarttime = $scope.oAstartTime;
                $scope.firendtime=$scope.oAverTime;

            }else{
                $scope.firstarttime = registerService.getTime()-10+"000000";
                $scope.firendtime = registerService.getTime()+"235959";
            }
            $scope.alarmfirObj = {
                uid:$window.sessionStorage.getItem("Uid"),
                startTime:$scope.firstarttime,
                endTime:$scope.firendtime,
                pageNumber:$scope.alarmrecordPage,
                limit:3
            };
           //$scope.alarminit();
            $scope.loadapp = {"toggle":true};
            registerService.commonUserget($scope.alarmfirObj,$scope.alarmUrl).then(function(e){
                $scope.loadapp = {"toggle":false};
                $scope.alarmclick1=true ;
                $scope.alarmclick2= false;
                $scope.alarmclick3= true;
                if(e.status == true){
                    console.log(e);
                    $scope.alarmrecordPage ++;
                    //$scope.alarmrecordPage = 1;

                    if(e.isLastPage == true){
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
                    for(var i in e.alarmLists){
                        e.alarmLists[i].describe = "正在解析！";
                        e.alarmLists[i].gpstime = "正在解析！";
                    }
                    //e.alarmLists[j].gpstime = new Date(e.alarmLists[j].GPS_TIME)
                    $scope.alarmrecordInfo = $scope.alarmrecordInfo.concat(e.alarmLists);
                    var j = 0;
                    $scope.transloc = function(){
                        var lnglatXY =[e.alarmLists[j].LNG/1000000,e.alarmLists[j].LAT/1000000];
                        e.alarmLists[j].gpstime = new Date(e.alarmLists[j].GPS_TIME)


                        if(e.alarmLists[j].LAT !=0){
                            AMap.service('AMap.Geocoder',function() {
                                $scope.warningadd = new AMap.Geocoder({});
                                $scope.warningadd.getAddress(lnglatXY, function (status, result) {
                                    if (status === 'complete' && result.info === 'OK') {
                                        $scope.addressa = result.regeocode.formattedAddress;
                                        e.alarmLists[j].describe = $scope.addressa;
                                        j++;
                                        if (j < e.alarmLists.length) {
                                            $scope.transloc();
                                        } else {
                                        }
                                    } else {
                                        $scope.addressa = "获取地址失败";
                                        e.alarmLists[j].describe = $scope.addressa;
                                        j++;

                                        if (j < e.alarmLists.length) {
                                            $scope.transloc();
                                        } else {
                                        }


                                    }
                                    $scope.$apply(function () {
                                        $scope.alarmrecordInfo += e.alarmLists;
                                    })
                                });
                            });
                        }else {
                            e.alarmLists[j].describe = "获取地址失败";
                        }

                    };
                    $scope.transloc();

                }else{
                    $scope.subapp= {"toggle":true};
                    $scope.submitWarning = e.reason+"！";
                    $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                }
            },function(err){
                $scope.loadapp = {"toggle":false};
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "网络连接失败！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
                //$scope.alarmrecordPage = 0;
                console.log("报警失败");
                $scope.alarmclick1=false ;
                $scope.alarmclick2= true;
                $scope.alarmclick3= true;
            });
        };
        //重新加载
        $scope.alarmrecordloadnew = function(){
            $scope.alarmrecordPage = 0;
            $scope.alarmfirObj = {
                uid:$window.sessionStorage.getItem("Uid"),
                startTime:registerService.getdatestrnochinese(-10)+"000000",
                endTime:registerService.getTime()+"235959",
                pageNumber:$scope.alarmrecordPage,
                limit:3
            };
            console.log(registerService.getTime());
            $scope.alarmUrl = "/rest/vehicles/alarmLists/";
            //初始加载
            $scope.alarminit();
        }

    })
    //车辆状态
    .controller("vehicleStatusController",function($scope,$rootScope,$state,registerService,$interval,$window,$timeout){
        $rootScope.colorfff4 = true;
        $rootScope.coloryyy4 = false;
        $scope.searchPassBackBtn = function(){
            window.history.go(-1);
        };
        //function prostatus(){
        //    return false;
        //}
        //prostatus()
        //$scope.backappfunctionsmall = function(){
        //    registerService.removeevent();
        //};
        //$scope.backappfunctionsmall();
        //$http获取数据
        $scope.vehiclestatusf = function(){

        }
        $scope.vehiclestatusf();
        //点击更新
        $scope.searchPassupdateBtn = function(){
            $scope.vehiclestatusf();
        }
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
    })
    //服务与帮助
    .controller("serviceHelpController",function($scope,$rootScope,$state,registerService,$interval,$window,$timeout){
        $rootScope.colorfff6 = true;
        $rootScope.coloryyy6 = false;
        $scope.searchPassBackBtn = function(){
            window.history.go(-1);
        };
        //function prostatus(){
        //    return false;
        //}
        //prostatus()
        //$scope.backappfunctionsmall = function(){
        //    registerService.removeevent();
        //};
        //$scope.backappfunctionsmall();
        $scope.warderingnum = "500M";
    })
    //找车
    .controller("searchCarController",function($scope,$rootScope,$location,$state,registerService,$interval,$window,$timeout){
        $rootScope.colorfff3 = true;
        $rootScope.coloryyy3 = false;
        //console.log("日期："+new Date(1480933999000));
        $scope.searchPassBackBtn = function(){
            window.history.go(-1);
        };
        $scope._topnot=(parseFloat($rootScope.windoWHeihgt) - 120)/2 +"px";
        //console.log($scope._top);

        $scope.modelpositionStnot = {
            "top":$scope._topnot
        };
        //$rootScope.checkConnection();
        $scope._top=(parseFloat($rootScope.windoWHeihgt) - 150)/2 +"px";

        //console.log($scope._top);
        $scope.modelpositionSt = {
            "top":$scope._top
        };
        function prostatus(){
            //return false;
        }
        //$scope.initfalseapp= {"toggle":false};
        prostatus();
        //$scope.initfalseapp= {"toggle":false};
        $scope.bellcontent = "获取中";

        //console.log(1);
        try {
            //在这里运行代码
            //if(AMap){
            //$rootScope.maproot("tripmapcontainer");
            //map.clearMap();

            var localgetarr = window.localStorage.getItem("mapcenterpoint");


                if(!localgetarr){
                    var followmap =  new AMap.Map('tripmapid',{
                        zoom:20,
                        center: [116.397428, 39.90923]
                    });

                }else{
                    console.log(localgetarr.split(","));
                    var followmap =  new AMap.Map('tripmapid',{
                        zoom:20,
                        center: localgetarr.split(",")
                    });
                    console.log(followmap);
                }
            //$timeout(function(){
            //    $rootScope.mapfunc();
            //},10)


            AMap.plugin(['AMap.ToolBar','AMap.Scale'],
                function(){
                    var toolbar = new AMap.ToolBar({
                        liteStyle:true
                    });
                    followmap.addControl(toolbar);
                    followmap.addControl(new AMap.Scale());
                });
            $scope.initfalseapp= {"toggle":false};
            //}


        }catch(err) {
            //在这里处理错误
                $scope.initfalseapp= {"toggle":true};
                //$scope.subapp= {"toggle":true};

                $scope.goSubmitPage= function(){
                    window.location.replace("index.html");
                    $scope.initfalseapp= {"toggle":false};
                };
                $scope.gomainhomePage = function(){
                    $state.go("mains.home");
                    $scope.initfalseapp= {"toggle":false};
                }

        }
        //获取蜂鸣器的状态
        $scope.carstatusbellObj = {
            seq:registerService.randomsix(),
            uid:$window.sessionStorage.getItem("Uid")
        }
        $scope.carstatusbellUrl = "/rest/Vehicles/state";
        //获取蜂鸣器的状态
        $scope.bellstatus = function(){
            $scope.bellcontent = "获取中";
            $scope.loadapp = {"toggle":true};
            $scope.belldis= true;
            $scope.bellcarGery = true;
            registerService.commonUser($scope.carstatusbellObj,$scope.carstatusbellUrl).then(function(e){
                $scope.loadapp = {"toggle":false};
                $scope.belldis= false;
                $scope.bellcarGery = false;
                console.log(e);
                if(e.status == true){
                    if(e.db2 == 0){
                        $scope.bellcontent = "开蜂鸣";
                    }else if(e.db2 == 1){
                        $scope.bellcontent = "关蜂鸣";
                    }
                }else{
                    $scope.bellcontent = "点击获取";
                    $scope.subapp= {"toggle":true};
                    $scope.submitWarning = e.reason+"！";
                    $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                }
            },function(err){
                $scope.loadapp = {"toggle":false};
                $timeout(function(){
                    $scope.belldis= false;
                    $scope.bellcarGery = false;
                },200)

                $scope.bellcontent = "点击获取";
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "网络连接失败！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
                console.log("蜂鸣状态")
            })
        };
        var searchcarlocationObj = {
            userUid:$window.sessionStorage.getItem("Uid")
        };
        //获取用户的位置
        function followuserlocationfun(){
            //$scope.loadapp = {"toggle":true};
            $scope.realtimedis= true;
            $scope.realtimecolorgrey = true;
            $scope.belldis= true;
            $scope.bellcarGery = true;
            //$scope.followmegrey = false;
            AMap.plugin(['AMap.Geolocation'], function(){
                var geolocation = new AMap.Geolocation({
                    enableHighAccuracy: true,//是否使用高精度定位，默认:true
                    //超过10秒后停止定位，默认：无穷大
                    //maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                    convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                    showButton: true,        //显示定位按钮，默认：true
                    //buttonDom:"<p></p>",
                    buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
                    buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                    showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                    showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                    panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                    zoomToAccuracy:true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    //enableHighAccuracy: true,//是否使用高精度定位，默认:true
                    timeout: 10000         //超过10秒后停止定位，默认：无穷大
                    //buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                    //zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    //buttonPosition:'RB'
                });
                followmap.addControl(geolocation);
                console.log(geolocation);
                geolocation.getCurrentPosition();
                AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
                AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息

                //map.addControl(toolbar);
                console.log("定位");
                //map.addControl(new AMap.Scale());



            });
            function onComplete(data){
                console.log(data);
                //$scope.loadapp = {"toggle":false};
                //$scope.forfollowme = false;
                $scope.userlocation = [data.position.lng, data.position.lat];
                console.log("用户的位置"+$scope.userlocation);
                //var caraddresslocation = registerService.covertAddress($scope.carlocation);
                //console.log(caraddresslocation);
                //var s = [121.1111,31.111];
                AMap.service('AMap.Geocoder',function(){//回调函数
                    //实例化Geocoder
                    var caraddresslocation = new AMap.Geocoder({
                    });

                    var caraddressname = caraddresslocation.getAddress($scope.userlocation, function(status, result) {
                        console.log(status);
                        console.log(result);
                        if (status === 'complete'&& result.info === 'OK') {
                            console.log(result.regeocode.formattedAddress);
                            content = "<div class='locationmarkerC' >"+"用户的位置: "+result.regeocode.formattedAddress+"</div>"
                            locationmarker = new AMap.Marker({
                                content:content,
                                position:$scope.userlocation,
                                offset : new AMap.Pixel(-70,-55),
                                map:followmap
                            });

                            AMap.service('AMap.Walking',function(){//回调函数
                                //实例化Walking
                                var walking= new AMap.Walking({
                                    map: followmap
                                    //panel: "panel"
                                });
                                console.log("路程里："+$scope.userlocation, $scope.carlocation);

                                //TODO: 使用walking对象调用步行路径规划相关的功能
                                walking.search($scope.userlocation, $scope.carlocation);
                                var markfollowcarl = new AMap.Marker({
                                    map: followmap,
                                    position: $scope.carlocation,
                                    icon: "img/bike1.png",
                                    offset: new AMap.Pixel(-13, -32)
                                    //autoRotation: true
                                });
                                var markfollowmel = new AMap.Marker({
                                    map: followmap,
                                    position: $scope.userlocation,
                                    icon: "img/pers1.png",
                                    offset: new AMap.Pixel(-13, -32)
                                    //autoRotation: true
                                });

                            });
                            //根据起终点坐标规划步行路线
                            console.log("解析成功");
                            console.log($scope.userlocation);
                            $timeout(function(){
                                $scope.followmedis = false;
                                $scope.realtimedis= false;
                                $scope.realtimecolorgrey = false;
                                $scope.followmegrey = false;
                                $scope.belldis= false;
                                $scope.bellcarGery = false;
                            },200)

                            //$scope.loadapp = {"toggle":false};
                        }else{
                            content = "<div class='locationmarkerC' >获取用户信息失败</div>"
                            locationmarker = new AMap.Marker({
                                content:content,
                                position:$scope.carlocation,
                                offset : new AMap.Pixel(-190,-55),
                                map:followmap
                            });
                            $timeout(function(){
                                $scope.followmedis = false;
                                $scope.realtimedis= false;
                                $scope.realtimecolorgrey = false;
                                $scope.followmegrey = false;
                                $scope.belldis= false;
                                $scope.bellcarGery = false;
                            },200)
                        }
                    });
                })

            }
            function onError(){
                $scope.forfollowme = false;
                //$scope.loadapp = {"toggle":false};
                var str = '定位失败,';
                str += '错误信息：';
                switch(data.info) {
                    case 'PERMISSION_DENIED':
                        str += '浏览器阻止了定位操作';
                        break;
                    case 'POSITION_UNAVAILBLE':
                        str += '无法获得当前位置';
                        break;
                    case 'TIMEOUT':
                        str += '定位超时';
                        break;
                    default:
                        str += '未知错误';
                        break;
                }
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = str+"!";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
                $scope.followmedis = false;
                $scope.realtimedis= false;
                $scope.realtimecolorgrey = false;
                $scope.followmegrey = false;
                $scope.belldis= false;
                $scope.bellcarGery = false;
            }
        };
        $scope.bellstatus();
        //获取车辆的位置
        function timesearchcar(){
            $scope.realtimedis= true;
            $scope.followmedis = true;
            $scope.realtimecolorgrey = true;
            $scope.followmegrey = true;
            $scope.belldis= true;
            $scope.bellcarGery = true;
            var searchcarlocationUrl = "/rest/gps/latest/";
            $scope.loadapp = {"toggle":true};
            registerService.commonUserget(searchcarlocationObj,searchcarlocationUrl).then(function(e){

                $scope.loadapp = {"toggle":false};
                if(e.status == true){
                    console.log(e.gps);
                    function carlocationbasestationcarfunc(obj){
                        AMap.convertFrom(obj,"gps",function(status,result){
                        //AMap.convertFrom(covertlnglats,"gps",function(status,result){
                            console.log("gps定位："+result.locations,result.info);
                            $scope.carlocation = [e.gps.lng/1000000,e.gps.lat/1000000];
                            function carlocationcoverfun(){
                                AMap.service('AMap.Geocoder',function() {
                                    $scope.startwarningadd = new AMap.Geocoder({

                                    });
                                    var caraddressname = $scope.startwarningadd.getAddress($scope.carlocation, function (status, result) {
                                        console.log("ghahah"+status);
                                        console.log(result);
                                        if (status === 'complete' && result.info === 'OK') {
                                            console.log(result.regeocode.formattedAddress);
                                            //return result.regeocode.formattedAddress;
                                            console.log($scope.carlocation);
                                            //map.clearMap();
                                            followmap = new AMap.Map('tripmapid',{
                                                zoom:20,
                                                center: $scope.carlocation
                                            });
                                            //followmap.center = $scope.carlocation;
                                            //followmap = $rootScope.maploadfun('tripmapid',$scope.carlocation);
                                            carmarker = new AMap.Marker({
                                                position : $scope.carlocation,
                                                map : followmap
                                            });
                                            console.log($scope.carlocation);
                                            content = "<div class='locationmarkerC' >" + "车辆位置: " + result.regeocode.formattedAddress + "</div>";
                                            carmarker = new AMap.Marker({
                                                content: content,
                                                position: $scope.carlocation,
                                                offset : new AMap.Pixel(-77,-55),
                                                map: followmap
                                            });

                                            AMap.plugin(['AMap.ToolBar','AMap.Scale'],
                                                function(){
                                                    var toolbar = new AMap.ToolBar({
                                                        liteStyle:true
                                                    });

                                                    followmap.addControl(toolbar);
                                                    console.log("定位");
                                                    followmap.addControl(new AMap.Scale());
                                                    //geolocation.getCurrentPosition();
                                                });

                                        } else {
                                            //map.clearMap();
                                            //followmap = new AMap.Map('tripmapid',{
                                            //    zoom:20,
                                            //    center: $scope.carlocation
                                            //});
                                            followmap.center = $scope.carlocation;
                                            //followmap = $rootScope.maploadfun('tripmapid',$scope.carlocation);
                                            marker = new AMap.Marker({
                                                position : $scope.carlocation,
                                                map : followmap
                                            });
                                            content = "<div class='locationmarkerC' >获取车辆位置信息失败</div>"
                                            locationmarker = new AMap.Marker({
                                                content: content,
                                                position: $scope.carlocation,
                                                offset: new AMap.Pixel(-70, -55),
                                                map: followmap
                                            });
                                            //return falsealarm;
                                        }
                                        //console.log(result);
                                    });
                                });
                            }
                            if(result.info === 'ok'){
                                $scope.carlocation = result.locations[0];
                                window.localStorage.setItem("mapcenterpoint",$scope.carlocation);
                                carlocationcoverfun();
                                if($scope.forfollowme == true){
                                    $scope.realtimedis= true;
                                    $scope.realtimecolorgrey = true;
                                    $scope.belldis= true;
                                    $scope.bellcarGery = true;
                                    //$scope.followmegrey = false;
                                    followuserlocationfun();
                                }else{
                                    $scope.realtimedis= false;
                                    $scope.realtimecolorgrey = false;
                                    $scope.belldis= false;
                                    $scope.bellcarGery = false;
                                    //$scope.followmegrey = false;
                                }
                            }else{
                                $scope.carlocation = [e.gps.lng/1000000,e.gps.lat/1000000];
                                window.localStorage.setItem("mapcenterpoint",$scope.carlocation);
                                carlocationcoverfun();
                                if($scope.forfollowme == true){
                                    $scope.realtimedis= true;
                                    $scope.realtimecolorgrey = true;
                                    $scope.belldis= true;
                                    $scope.bellcarGery = true;
                                    //$scope.followmegrey = false;
                                    followuserlocationfun();
                                }else{
                                    $scope.realtimedis= false;
                                    $scope.realtimecolorgrey = false;
                                    $scope.belldis= false;
                                    $scope.bellcarGery = false;
                                    //$scope.followmegrey = false;
                                }
                            }

                        });
                    }
                    if(e.gps.lng !=0 && e.gps.lat !=0){
                        $scope.lngsearche = e.gps.lng;
                        $scope.latsearche = e.gps.lat;
                        var covertlnglats = [e.gps.lng/1000000,e.gps.lat/1000000];
                        carlocationbasestationcarfunc(covertlnglats)
                        //AMap.convertFrom(covertlnglats,"gps",function(status,result){
                        //    console.log("gps定位："+result.locations,result.info);
                        //    $scope.carlocation = [e.gps.lng/1000000,e.gps.lat/1000000];
                        //    function carlocationcoverfun(){
                        //        AMap.service('AMap.Geocoder',function() {
                        //            $scope.startwarningadd = new AMap.Geocoder({
                        //
                        //            });
                        //            var caraddressname = $scope.startwarningadd.getAddress($scope.carlocation, function (status, result) {
                        //                console.log("ghahah"+status);
                        //                console.log(result);
                        //                if (status === 'complete' && result.info === 'OK') {
                        //                    console.log(result.regeocode.formattedAddress);
                        //                    //return result.regeocode.formattedAddress;
                        //                    console.log($scope.carlocation);
                        //                    //map.clearMap();
                        //                    //followmap = new AMap.Map('tripmapid',{
                        //                    //    zoom:20,
                        //                    //    center: $scope.carlocation
                        //                    //});
                        //                    followmap.center = $scope.carlocation;
                        //                    //followmap = $rootScope.maploadfun('tripmapid',$scope.carlocation);
                        //                    carmarker = new AMap.Marker({
                        //                        position : $scope.carlocation,
                        //                        map : followmap
                        //                    });
                        //                    console.log($scope.carlocation);
                        //                    content = "<div class='locationmarkerC' >" + "车辆位置: " + result.regeocode.formattedAddress + "</div>";
                        //                    carmarker = new AMap.Marker({
                        //                        content: content,
                        //                        position: $scope.carlocation,
                        //                        offset : new AMap.Pixel(-77,-55),
                        //                        map: followmap
                        //                    });
                        //
                        //                    AMap.plugin(['AMap.ToolBar','AMap.Scale'],
                        //                        function(){
                        //                            var toolbar = new AMap.ToolBar({
                        //                                liteStyle:true
                        //                            });
                        //
                        //                            followmap.addControl(toolbar);
                        //                            console.log("定位");
                        //                            followmap.addControl(new AMap.Scale());
                        //                            //geolocation.getCurrentPosition();
                        //                        });
                        //
                        //                } else {
                        //                    //map.clearMap();
                        //                    //followmap = new AMap.Map('tripmapid',{
                        //                    //    zoom:20,
                        //                    //    center: $scope.carlocation
                        //                    //});
                        //                    followmap.center = $scope.carlocation;
                        //                    //followmap = $rootScope.maploadfun('tripmapid',$scope.carlocation);
                        //                    marker = new AMap.Marker({
                        //                        position : $scope.carlocation,
                        //                        map : followmap
                        //                    });
                        //                    content = "<div class='locationmarkerC' >获取车辆位置信息失败</div>"
                        //                    locationmarker = new AMap.Marker({
                        //                        content: content,
                        //                        position: $scope.carlocation,
                        //                        offset: new AMap.Pixel(-70, -55),
                        //                        map: followmap
                        //                    });
                        //                    //return falsealarm;
                        //                }
                        //                //console.log(result);
                        //            });
                        //        });
                        //    }
                        //    if(result.info === 'ok'){
                        //        $scope.carlocation = result.locations[0];
                        //        window.localStorage.setItem("mapcenterpoint",$scope.carlocation);
                        //        carlocationcoverfun();
                        //        if($scope.forfollowme == true){
                        //            $scope.realtimedis= true;
                        //            $scope.realtimecolorgrey = true;
                        //            $scope.belldis= true;
                        //            $scope.bellcarGery = true;
                        //            //$scope.followmegrey = false;
                        //            followuserlocationfun();
                        //        }else{
                        //            $scope.realtimedis= false;
                        //            $scope.realtimecolorgrey = false;
                        //            $scope.belldis= false;
                        //            $scope.bellcarGery = false;
                        //            //$scope.followmegrey = false;
                        //        }
                        //    }else{
                        //        $scope.carlocation = [e.gps.lng/1000000,e.gps.lat/1000000];
                        //        window.localStorage.setItem("mapcenterpoint",$scope.carlocation);
                        //        carlocationcoverfun();
                        //        if($scope.forfollowme == true){
                        //            $scope.realtimedis= true;
                        //            $scope.realtimecolorgrey = true;
                        //            $scope.belldis= true;
                        //            $scope.bellcarGery = true;
                        //            //$scope.followmegrey = false;
                        //            followuserlocationfun();
                        //        }else{
                        //            $scope.realtimedis= false;
                        //            $scope.realtimecolorgrey = false;
                        //            $scope.belldis= false;
                        //            $scope.bellcarGery = false;
                        //            //$scope.followmegrey = false;
                        //        }
                        //    }
                        //
                        //});
                        console.log(e.gps.lng/1000000,e.gps.lat/1000000);





////////////////////////////////这里要加基站定位的代码
                    }else {
                        $scope.followmedis = false;
                        $scope.realtimedis= false;
                        $scope.realtimecolorgrey = false;
                        $scope.followmegrey = false;
                        $scope.belldis= false;
                        $scope.bellcarGery = false;
                        $scope.subapp= {"toggle":true};
                        $scope.submitWarning = "获取车辆位置失败！";
                        $timeout(function(){
                            $scope.subapp= {"toggle":false};
                        },2000);
                    }

                }else{
                    $scope.followmedis = false;
                    $scope.realtimedis= false;
                    $scope.realtimecolorgrey = false;
                    $scope.followmegrey = false;
                    $scope.belldis= false;
                    $scope.bellcarGery = false;
                    $scope.subapp= {"toggle":true};
                    $scope.submitWarning = e.reason+"！";
                    $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                }
            },function(err){
                $scope.followmedis = false;
                $scope.realtimedis= false;
                $scope.realtimecolorgrey = false;
                $scope.followmegrey = false;
                $scope.belldis= true;
                $scope.bellcarGery = true;
                //$scope.followmedis = true;
                //$scope.followmegrey = true;
                $scope.loadapp = {"toggle":false};
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "网络连接失败！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            });
        };
        $scope.forfollowme = false;
        timesearchcar();
        //点击蜂鸣器，开启或者关闭蜂鸣器
        $scope.bellyesornobtn = function(){
            $scope.bellUrl = "/rest/Vehicles/operation";
            $scope.loadapp = {"toggle":true};
            registerService.commonUser($scope.bellObj,$scope.bellUrl).then(function(e){
                $scope.loadapp = {"toggle":false};
                console.log("第一种："+$scope.bellObj);
                $scope.belldis= false;
                $scope.bellcarGery = false;
                if(e.status == true){

                    if($scope.bellcontent == "开蜂鸣"){
                        if(e.db1==0){
                            $scope.hahaapp= {"toggle":true};
                            $scope.submithappy = "蜂鸣开启！";
                            $scope.bellcontent= "关蜂鸣";
                            $timeout(function(){
                                $scope.hahaapp= {"toggle":false};
                            },2000);
                        }

                    }else if($scope.bellcontent == "关蜂鸣"){
                        if(e.db1==0){
                            $scope.hahaapp= {"toggle":true};
                            $scope.submithappy = "蜂鸣关闭！";
                            $scope.bellcontent= "开蜂鸣";
                            $timeout(function(){
                                $scope.hahaapp= {"toggle":false};
                            },2000);
                        }
                    }
                }else{
                    $scope.subapp= {"toggle":true};
                    $scope.submitWarning = e.reason+"！";
                    $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                }
            },function(err){
                $scope.loadapp = {"toggle":false};
                console.log("第一种："+$scope.bellObj);
                $scope.belldis= false;
                $scope.bellcarGery = false;
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "网络连接失败！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
                console.log("点击蜂鸣按钮")
            });
        }
        //蜂鸣器

        $scope.belldis= false;
        $scope.bellcarGery = false;
        //点击蜂鸣器按钮
        $scope.searchcarbellbtn = function(){
            $scope.belldis= true;
            $scope.bellcarGery = true;
            if($scope.bellcontent == "开蜂鸣"){
                $scope.bellObj= {
                    uid:$window.sessionStorage.getItem("Uid"),
                    operationType:3,
                    operation:1,
                    seq:registerService.randomsix()

                };
                $scope.bellyesornobtn();

            }else if($scope.bellcontent == "关蜂鸣"){
                $scope.bellObj= {
                    uid:$window.sessionStorage.getItem("Uid"),
                    operationType:3,
                    operation:0,
                    seq:registerService.randomsix()
                };
                $scope.bellyesornobtn();
            }else if($scope.bellcontent == "点击获取"){
                $scope.bellstatus();
                console.log("点击了点击获取")
            }



        };

        //console.log("测试后台数据的时间："+new Date(1481001449000));
        //定位车辆
        $scope.followmedis = false;
        //console.log("后台要的数据："+ new Date(1481001454000));
        //跟我走
        $scope.searchcarfollowmebtn = function(){
            //步行导航
            followmap.clearMap();
            console.log("跟我走");
            $scope.forfollowme = true;

            $scope.belldis= true;
            $scope.bellcarGery = true;
            //$scope.followmedis = true;
            //$scope.followmegrey = true;
            $scope.followmedis = true;
            $scope.realtimedis= true;
            $scope.realtimecolorgrey = true;
            $scope.followmegrey = true;
            timesearchcar();
            //if( $scope.lngsearche != 0 && $scope.latsearche != 0){
            //
            //    //$scope.followmedis = true;
            //    //AMap.plugin(['AMap.Geolocation'], function(){
            //    //    var geolocation = new AMap.Geolocation({
            //    //        enableHighAccuracy: true,//是否使用高精度定位，默认:true
            //    //        //超过10秒后停止定位，默认：无穷大
            //    //        //maximumAge: 0,           //定位结果缓存0毫秒，默认：0
            //    //        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            //    //        showButton: true,        //显示定位按钮，默认：true
            //    //        //buttonDom:"<p></p>",
            //    //        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
            //    //        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            //    //        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
            //    //        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
            //    //        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
            //    //        zoomToAccuracy:true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            //    //        //enableHighAccuracy: true,//是否使用高精度定位，默认:true
            //    //        timeout: 10000         //超过10秒后停止定位，默认：无穷大
            //    //        //buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            //    //        //zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            //    //        //buttonPosition:'RB'
            //    //    });
            //    //    map.addControl(geolocation);
            //    //    console.log(geolocation);
            //    //    geolocation.getCurrentPosition();
            //    //    AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
            //    //    AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
            //    //
            //    //    //map.addControl(toolbar);
            //    //    console.log("定位");
            //    //    //map.addControl(new AMap.Scale());
            //    //
            //    //
            //    //
            //    //});
            //    //function onComplete(data){
            //    //    console.log(data);
            //    //
            //    //    $scope.userlocation = [data.position.lng, data.position.lat];
            //    //    console.log("用户的位置"+$scope.userlocation);
            //    //    //var caraddresslocation = registerService.covertAddress($scope.carlocation);
            //    //    //console.log(caraddresslocation);
            //    //    //var s = [121.1111,31.111];
            //    //    AMap.service('AMap.Geocoder',function(){//回调函数
            //    //        //实例化Geocoder
            //    //        var caraddresslocation = new AMap.Geocoder({
            //    //        });
            //    //
            //    //        var caraddressname = caraddresslocation.getAddress($scope.userlocation, function(status, result) {
            //    //            console.log(status);
            //    //            console.log(result);
            //    //            if (status === 'complete'&& result.info === 'OK') {
            //    //                console.log(result.regeocode.formattedAddress);
            //    //                content = "<div class='locationmarkerC' >"+"用户的位置: "+result.regeocode.formattedAddress+"</div>"
            //    //                locationmarker = new AMap.Marker({
            //    //                    content:content,
            //    //                    position:$scope.userlocation,
            //    //                    offset : new AMap.Pixel(-70,-55),
            //    //                    map:map
            //    //                });
            //    //                AMap.service('AMap.Walking',function(){//回调函数
            //    //                    //实例化Walking
            //    //                    var walking= new AMap.Walking({
            //    //                        map: map
            //    //                        //panel: "panel"
            //    //                    });
            //    //                    console.log("路程里："+$scope.userlocation, $scope.carlocation)
            //    //                    //TODO: 使用walking对象调用步行路径规划相关的功能
            //    //                    walking.search($scope.userlocation, $scope.carlocation);
            //    //                })
            //    //                //根据起终点坐标规划步行路线
            //    //                console.log("解析成功");
            //    //                console.log($scope.userlocation);
            //    //                $scope.followmedis = false;
            //    //            }else{
            //    //                content = "<div class='locationmarkerC' >获取用户信息失败</div>"
            //    //                locationmarker = new AMap.Marker({
            //    //                    content:content,
            //    //                    position:$scope.carlocation,
            //    //                    offset : new AMap.Pixel(-190,-55),
            //    //                    map:map
            //    //                });
            //    //                $scope.followmedis = false;
            //    //            }
            //    //        });
            //    //    })
            //    //
            //    //}
            //    //function onError(){
            //    //    var str = '定位失败,';
            //    //    str += '错误信息：';
            //    //    switch(data.info) {
            //    //        case 'PERMISSION_DENIED':
            //    //            str += '浏览器阻止了定位操作';
            //    //            break;
            //    //        case 'POSITION_UNAVAILBLE':
            //    //            str += '无法获得当前位置';
            //    //            break;
            //    //        case 'TIMEOUT':
            //    //            str += '定位超时';
            //    //            break;
            //    //        default:
            //    //            str += '未知错误';
            //    //            break;
            //    //    }
            //    //    $scope.subapp= {"toggle":true};
            //    //    $scope.submitWarning = str+"!";
            //    //    $timeout(function(){
            //    //        $scope.subapp= {"toggle":false};
            //    //    },2000);
            //    //    $scope.followmedis = false;
            //    //}
            //
            //}else if($scope.lngsearche == 0){
            //    $scope.subapp= {"toggle":true};
            //    $scope.submitWarning = "获取车辆位置失败！";
            //    $timeout(function(){
            //        $scope.subapp= {"toggle":false};
            //    },2000);
            //}else {
            //    console.log($scope);
            //    $scope.hahaapp= {"toggle":true};
            //    $scope.submitWarning = "请稍等，正在获取您的位置！";
            //    $timeout(function(){
            //        $scope.hahaapp= {"toggle":false};
            //    },2000);
            //    console.log("错误")
            //}
        };
        //实时追踪
        $scope.realtimeword = "实时追踪";
        $scope.realtimecolorgrey = false;
        $scope.followmegrey = false;
        $scope.realtimedis= false;
        //基站定位不可点击
        $scope.baseStationGery = true;
        $scope.baseStationdis = true;
        $scope.realtimearr = [];
        //开启实时追踪
        function realtimefunc(){
            $scope.loadapp = {"toggle":true};
            var realtimeObj = {
                uid:$window.sessionStorage.getItem("Uid"),
                seconds:5,
                durationtime:300,
                seq:registerService.randomsix()
            };
            var realtimeUrl = "/rest/gps/tracking/";
            registerService.commonUserget(realtimeObj,realtimeUrl).then(function(e){
                $scope.realtimedis= false;
                $scope.realtimecolorgrey = false;
                $scope.belldis= false;
                $scope.bellcarGery = false;
                $scope.followmedis = false;
                $scope.followmegrey = false;
                //基站定位可点击
                $scope.baseStationGery = false;
                $scope.baseStationdis = false;
                //$scope.followmegrey = false;
                $scope.loadapp = {"toggle":false};
                if(e.status == true){
                    //倒计时
                    //$scope.realtimecolorgrey = false;
                    //$scope.followmegrey = true;
                    var realcountdownnumber = 300;
                    function intervalcountdownfun(){
                        if(realcountdownnumber>0){
                            $scope.realcountdownnum = registerService.countdownnumf(realcountdownnumber);
                            realcountdownnumber--;
                        }else{
                            $scope.realcountdownnum = "";
                            $interval.cancel($scope.countdowntimers);
                            $interval.cancel($scope.realtimers);
                            $scope.realtimeword = "实时追踪";
                            $scope.followmegrey = false;
                            $scope.followmedis = false;
                            //基站定位不可点击
                            $scope.baseStationGery = true;
                            $scope.baseStationdis = true;
                        }

                    };
                    intervalcountdownfun();
                    $scope.countdowntimers = $interval(intervalcountdownfun,1000);
                    //实时追踪开启的时候，follow me disabled
                    $scope.followmedis = true;
                    //$scope.realtimecolorgrey = false;
                    $scope.followmegrey = true;
                    $scope.hahaapp = {"toggle":true};
                    $scope.submithappy = "实时追踪已经开启！";
                    $timeout(function(){
                        $scope.hahaapp= {"toggle":false};
                    },2000);
                    $scope.realtimeword = "点击关闭";

                    $scope.timeinvalRealfun =function(){
                        $scope.realtimenumnum++;
                        if($scope.realtimenumnum >= 61){
                            $interval.cancel($scope.realtimers);
                            $scope.realtimeword = "实时追踪";
                            $scope.followmegrey = false;
                            $scope.followmedis = false;
                            //基站定位不可点击
                            $scope.baseStationGery = true;
                            $scope.baseStationdis = true;

                        }else{
                            var realcarlocationObj = {
                                userUid:$window.sessionStorage.getItem("Uid")
                            };
                            var realcarlocationUrl = "/rest/gps/latest/";
                            registerService.commonUserget(realcarlocationObj,realcarlocationUrl).then(function(e){
                                if(e.status == true){
                                    console.log("实时追踪获取的e："+JSON.stringify(e));
                                    if(e.gps.lng !=0 && e.gps.lat!=0){

                                        var timediffgpsnew = new Date() - e.gps.gpsTime;
                                        console.log("获取到数据的时间和此时的时间的差值:"+timediffgpsnew);
                                        if($scope.realtimenumnum == 1 && timediffgpsnew>40000){
                                        }else{
                                            var realgpscovergd = [e.gps.lng/1000000, e.gps.lat/1000000];
                                            AMap.convertFrom(realgpscovergd,"gps",function(status,result){
                                                if(result.info === 'ok'){
                                                    var newreallocation = result.locations[0];
                                                    window.localStorage.setItem("mapcenterpoint",newreallocation)
                                                }else {
                                                    var newreallocation = realgpscovergd;
                                                    window.localStorage.setItem("mapcenterpoint",newreallocation)
                                                }
                                                console.log($scope.arrrealtime);
                                                $scope.arrrealtime.push(newreallocation);//把数据push进去，画图
                                                followmap.clearMap();
                                                //followmap.remove(followmappoly);
                                                //markReal.setMap(null)
                                                var followmappoly = new AMap.Polyline({
                                                    map: followmap,
                                                    path: $scope.arrrealtime,
                                                    strokeColor: "#00A",  //线颜色
                                                    strokeOpacity: 1,     //线透明度
                                                    strokeWeight: 3,      //线宽
                                                    strokeStyle: "solid"  //线样式
                                                });
                                                markReal = new AMap.Marker({
                                                    map: followmap,
                                                    position: $scope.arrrealtime[$scope.arrrealtime.length-1],
                                                    icon: "img/bike1.png",
                                                    offset: new AMap.Pixel(-9, -32)
                                                    //autoRotation: true
                                                });
                                                try {
                                                    followmap.setFitView();
                                                }catch (err){
                                                    console.log(err.message);
                                                }
                                            });
                                        }


                                    }else{
                                        if($scope.arrrealtime.length == 0 || $scope.realtimenumnum == 1){
                                            $scope.subapp= {"toggle":true};
                                            $scope.submitWarning = "获取GPS数据有误！";
                                            $timeout(function(){
                                                $scope.subapp= {"toggle":false};
                                            },2000);
                                        }
                                    };
                                    //var basestaarr = [];
                                    //var basearr1 = [121.446982,31.293449];
                                    //var basearr2 = [121.446984,31.293449];
                                    //var basearr3 = [121.446982,31.293446];
                                    //basestaarr.push(basearr1);
                                    //basestaarr.push(basearr2);
                                    //basestaarr.push(basearr3);
                                    //var followmappolybase = new AMap.Polyline({
                                    //    map: followmap,
                                    //    path: basestaarr,
                                    //    strokeColor: "#000",  //线颜色
                                    //    strokeOpacity: 1,     //线透明度
                                    //    strokeWeight: 5,      //线宽
                                    //    strokeStyle: "solid"  //线样式
                                    //});
                                    //var markRealbase = new AMap.Marker({
                                    //    map: followmap,
                                    //    position: basearr3,
                                    //    icon: "img/bike2.png",
                                    //    offset: new AMap.Pixel(-9, -32)
                                    //    //autoRotation: true
                                    //});
                                    //try {
                                    //    followmap.setFitView();
                                    //}catch (err){
                                    //    console.log(err.message);
                                    //}

                                    //if(e.gps.lac!=0 && e.gps.ci!=0){
                                        //var baseStationopenObj = {
                                        //    mcc:460,
                                        //    mnc: e.mnc,
                                        //    lac: e.gps.lac,
                                        //    ci: e.gps.ci,
                                        //    _callback:"CALL_BACK"
                                        //};
                                        //var baseStationopenUrl = "http://api.cellocation.com/cell/";
                                        //function jsonpfunc(data,url){
                                        //    var param = "";
                                        //    for(var i in data){
                                        //        param += i+'='+data[i]+'&';
                                        //    };
                                        //    param = param.slice(0,param.length-1);
                                        //    console.log("基点定位param:"+param);
                                        //    url +='?'+param;
                                        //    console.log("基点定位url:"+url);
                                        //    var domScript = document.createElement('script');
                                        //    domScript.src = url;
                                        //    domScript.type = "text/javascript";
                                        //    console.log(domScript);
                                        //    document.getElementsByTagName('head').item(0).appendChild(domScript);
                                        //    console.log(domScript);
                                        //};
                                        //jsonpfunc(baseStationopenObj,baseStationopenUrl);
                                        //console.log(11111);
                                        //function CALLBACK(e){
                                        //    console.log(222222);
                                        //    console.log("基站定位的e"+e)
                                        //}


                                        //$.ajax({
                                        //    type:"get",
                                        //    url:'http://api.cellocation.com/cell/?mcc=460&mnc='+ e.mnc+'&lac='+e.gps.lac+'&ci='+e.gps.ci+'&output=json&callback=basestationcallback',
                                        //    dataType:"jsonp",
                                        //    success:function(e){
                                        //        console.log(e);
                                        //    },
                                        //    error:function(){
                                        //        console.log("基站接口error");
                                        //    }
                                        //})



                                        //var jsonpcommonUrl = 'http://api.cellocation.com/cell/?mcc=460&mnc='+e.mnc+'&lac='+e.gps.lac+'&ci='+e.gps.ci+'&output=json&jsonp=JSON_CALLBACK';
                                        //registerService.jsonpcommon(jsonpcommonUrl).then(function(e){
                                        //    console.log("基站定位的e："+e)
                                        //},function(err){
                                        //    console.log("进来了，，错误");
                                        //})
                                    //}else {
                                    //    $scope.subapp = {"toggle": true};
                                    //    $scope.submitWarning = "无基站定位查询结果！";
                                    //    $timeout(function () {
                                    //        $scope.subapp = {"toggle": false};
                                    //    }, 2000);
                                    //}




                                }else{
                                    $scope.subapp= {"toggle":true};
                                    $scope.submitWarning = e.reason+"！";
                                    $timeout(function(){
                                        $scope.subapp= {"toggle":false};
                                    },2000);
                                }
                            },function(err){
                                $scope.subapp= {"toggle":true};
                                $scope.submitWarning = "网络连接失败！";
                                $timeout(function(){
                                    $scope.subapp= {"toggle":false};
                                },2000);
                            })
                        }

                    }
                    $scope.realtimenumnum = 0;
                    $scope.timeinvalRealfun();
                    //一共获取60次；
                    $scope.realtimers = $interval($scope.timeinvalRealfun,5000);

                }else{
                    //基站定位不可点击
                    $scope.baseStationGery = true;
                    $scope.baseStationdis = true;
                    $scope.subapp= {"toggle":true};
                    $scope.submitWarning = e.reason+"！";
                    $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                }
            },function(err){
                $scope.realtimedis= false;
                $scope.realtimecolorgrey = false;
                $scope.belldis= false;
                $scope.bellcarGery = false;
                $scope.followmedis = false;
                $scope.followmegrey = false;
                //$scope.followmegrey = false;
                $scope.loadapp = {"toggle":false};
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "网络连接失败！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            })
        };
        //关闭实时追踪
        function realtimeoverfun(){
            if($scope.realtimers){
                $interval.cancel($scope.realtimers);
            };
            $scope.realcountdownnum = "";
            if($scope.countdowntimers){
                $interval.cancel($scope.countdowntimers);
            };
            //基站定位不可点击
            $scope.baseStationGery = true;
            $scope.baseStationdis = true;


            $scope.loadapp = {"toggle":true};
            var realtimeObj = {
                uid:$window.sessionStorage.getItem("Uid"),
                seconds:0,
                durationtime:0,
                seq:registerService.randomsix()
            };
            var realtimeUrl = "/rest/gps/tracking/";
            $scope.realtimedis= true;
            $scope.realtimecolorgrey = true;
            $scope.belldis= true;
            $scope.bellcarGery = true;
            $scope.followmedis = true;
            $scope.followmegrey = true;
            //$scope.followmegrey = false;
            registerService.commonUserget(realtimeObj,realtimeUrl).then(function(e){
                $scope.realtimedis= false;
                $scope.realtimecolorgrey = false;
                $scope.belldis= false;
                $scope.bellcarGery = false;
                $scope.followmedis = false;
                $scope.followmegrey = false;
                //$scope.followmegrey = false;
                $scope.loadapp = {"toggle":false};
                if(e.status == true){
                    $scope.followmedis = false;
                    //$scope.realtimecolorgrey = false;
                    $scope.followmegrey = false;
                    $scope.realtimeword = "实时追踪";
                    $scope.hahaapp = {"toggle":true};
                    $scope.submithappy = "实时追踪已经关闭！";
                    $timeout(function(){
                        $scope.hahaapp= {"toggle":false};
                    },2000);
                }else {
                    $scope.realtimeword ="实时追踪";
                    $scope.subapp= {"toggle":true};
                    $scope.submitWarning = e.reason+"！";
                    $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                }
            },function(err){
                $scope.realtimedis= false;
                $scope.realtimecolorgrey = false;
                $scope.belldis= false;
                $scope.bellcarGery = false;
                $scope.followmedis = false;
                $scope.followmegrey = false;
                //$scope.followmegrey = false;
                $scope.realtimeword ="实时追踪";
                $scope.loadapp = {"toggle":false};
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "网络连接失败！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            })
        }
        $scope.searchrealtime = function(){
            $scope.realtimedis= true;
            $scope.realtimecolorgrey = true;
            $scope.belldis= true;
            $scope.bellcarGery = true;
            $scope.followmedis = true;
            $scope.followmegrey = true;
            //$scope.followmegrey = false;
            if($scope.realtimeword == "实时追踪"){
                var newtimerealtime = new Date();
                $scope.realtimearr.push(newtimerealtime);
                if($scope.realtimearr.length == 1){
                    followmap.clearMap();
                    $scope.arrrealtime = [];
                }else {
                    var nowtimearrlast = $scope.realtimearr[$scope.realtimearr.length-1];
                    var nowtimearrlastfir = $scope.realtimearr[$scope.realtimearr.length-2];
                    var realtwotimediffenert = nowtimearrlast-nowtimearrlastfir;
                    if(realtwotimediffenert>600000){
                        followmap.clearMap();
                        $scope.arrrealtime = [];
                    }
                    console.log("两次实时追踪的时间差"+realtwotimediffenert);
                }

                realtimefunc();
            }else if($scope.realtimeword == "点击关闭") {
                realtimeoverfun();
            }

            //请求成功后，定时器获取用户最新的gps（维持10min）后，请求时间为0的
        }
        //监听路由的变化
        $scope.$on('$stateChangeStart',

            function(event, toState, toParams, fromState, fromParams){
                console.log("toState:"+JSON.stringify(toState));
                console.log("toParams:"+JSON.stringify(toParams));
                console.log("fromState:"+JSON.stringify(fromState));
                console.log("fromParams:"+JSON.stringify(fromParams));
                console.log("获取路由地址："+$location.path());
                if(fromState.name=="mains.home.searchCar"){
                    realtimeoverfun();
                    console.log("关闭实时追踪");
                }

            });
        //开启基站定位
        $scope.baseStationbtn = function(){
            //openbaseStationfunc();
        }
        //监听基站定位与否


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
            }else{
                $scope.changepassoldcontentdis = true;
                $scope.changepassnewcontentdis = true;
                $scope.changepassagacontentdis = true;
                $scope.changepasspdis = true;
                var searchpassObj = {
                    uid:$window.sessionStorage.getItem("Uid"),
                    oPwd:changePoldpass,
                    nPwd:changePnewpass
                };
                var searchpassUrl = "/rest/user/resetPwd/";
                $scope.loadapp = {"toggle":true};
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
                        $scope.submitWarning = e.reason+"!";
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
                    $scope.submitWarning = "网络连接失败！";
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
            if(!changenick){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请输入新昵称！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else{
                $scope.changenicknewdis = true;
                $scope.changenickdis = true;
                var changeNObj = {
                    uid:$window.sessionStorage.getItem("Uid"),
                    uname:changenick
                };
                var changeNUrl = "/rest/user/updateUname/";
                //$http
                //修改成功昵称，$rootScope.mineusernick =  e.user.nickName;赋值
                $scope.loadapp = {"toggle":true};
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
                        $scope.submitWarning = e.reason+"！";
                        $timeout(function(){
                            $scope.subapp= {"toggle":false};
                        },2000);
                    }
                },function(err){
                    $scope.changenicknewdis = false;
                    $scope.loadapp = {"toggle":false};
                    $scope.changenickdis = false;
                    $scope.subapp= {"toggle":true};
                    $scope.submitWarning = "网络连接失败！";
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
        $scope.unbundlingphone = '[0-9]{11}';
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
            var unbundlingaccount = $scope.unbundlingForm.unbundlingaccount.$modelValue;
            console.log(unbundlingaccount);
            if(!unbundlingaccount){
                $scope.subapp= {"toggle":true};
                $scope.submitWarning = "请确认您的手机号！";
                $timeout(function(){
                    $scope.subapp= {"toggle":false};
                },2000);
            }else{
                $scope.unbundverCodedis = true;//不能再次点击，直到ajax结束
                var unbundverCodeObj = {
                    "cellphone":unbundlingaccount,
                    "time":registerService.getcurrentTime()
                };
                var unbundverCodeUrl = "/rest/user/getMessage/";
                $scope.loadapp = {"toggle":true};
                registerService.commonUser(unbundverCodeObj,unbundverCodeUrl).then(function(e){
                    $scope.loadapp = {"toggle":false};
                    //当status正确的时候，
                    if(e.status == true){
                        var s = 300;
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
                        $scope.submitWarning = e.reason+"！";
                        $timeout(function(){
                            $scope.subapp= {"toggle":false};
                        },2000);
                        console.log(e.reason);
                    }

                },function(err){
                    $scope.loadapp = {"toggle":false};
                    $scope.unbundverCodedis = false;
                    $scope.subapp= {"toggle":true};
                    $scope.submitWarning = "网络连接失败！";
                    $timeout(function(){
                        $scope.subapp= {"toggle":false};
                    },2000);
                });


            }
        };
        //点击确定
        $scope.gounbundyes= function(){
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
            }else {
                $scope.unbundlingdis = true;
                var undundingyesObj = {
                    cellphone:unbundlingaccount,
                    type:0,
                    code:unbundlingcode
                };
                var undundlingyesUrl = "/rest/Vehicle/Binding";
                registerService.commonUser(undundingyesObj,undundlingyesUrl).then(function(e){
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
                        $scope.submitWarning = e.reason+"！";
                        $timeout(function(){
                            $scope.subapp= {"toggle":false};
                        },2000);
                    }
                },function(err){
                    $scope.unbundlingdis = false;
                    $scope.subapp= {"toggle":true};
                    $scope.submitWarning = "网络连接失败！";
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