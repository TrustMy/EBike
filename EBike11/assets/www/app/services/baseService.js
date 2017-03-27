/*不是angular的服务*/
var baseService = function($http,$q,baseUrl,usersSub,usersReg,usersconfirmVercode,mapping) {
    this.$http = $http;
    this.$q = $q;
    //this.$scope = $scope;
    //this.$on = $on;
    //this.$stateChangeStart = $stateChangeStart;
    this.baseUrl = baseUrl;
    this.usersSub = usersSub;
    this.usersReg = usersReg;
    this.usersconfirmVercode= usersconfirmVercode;
    //this.usersvehiclebind = usersvehiclebind;
    this.mapping = mapping;
}
var congfig={
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    //transformRequest: function(obj) {
    //    var str = [];
    //    for(var p in obj)
    //        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    //    return str.join("&");
    //},
    timeout:12000
};
var congfigsed={
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    timeout:8000
};

baseService.prototype.getCookie = function(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) {
        return unescape(arr[2]);
    }
    else {
        return null;
    }
};

////设置cookie：name是cookie的名字，value是cookie值
baseService.prototype.setCookie = function (name, value) {
    var Days = 30; //此 cookie 将被保存 30 天
    var exp = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

////删除cookie
baseService.prototype.delCookie = function(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    //console.log(cval);
     if(cval!=null){
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
     }
    return document.cookie;
};
//将前端的数据转化为后台
//数据,mapping映射
baseService.prototype.columnToData=function(data,mapping) {
    var obj = {};
    //mapping {uname:"name",upass:"pass"}
    //data {uname:"聂归还"}
    for(var key in data) {
        if(mapping[key]==undefined){
            continue;
        }
        //如果mapping[key]是undefined 自己过滤
        obj[mapping[key]] = data[key];
    }
    return obj;
}
//将后台的数据转化为前台
baseService.prototype.dataToColumn = function(data,mapping) {
    var obj = {};
    //mapping  {uname:"name" ,  upass:'pass'}
    //data  {name:"聂归还"}
    for(var key in mapping) {
        //key  uname
        obj[key] = data[mapping[key]];
    }
    return obj;
}
//登录部分的$http
baseService.prototype.submits = function(obj) {
    var that= this;

    //obj = that.columnToData(obj,that.mapping[that.usersSub]);
    console.log("登录的参数"+JSON.stringify(obj));
    var q = that.$q.defer();
    that.$http.post(that.baseUrl+'/rest/user/login/',obj,congfigsed)
        .then(function (e) {
            console.log(123455,e.headers('Token'));
            window.sessionStorage.setItem("Utoken",e.headers('Token'));
            console.log('登录成功:');
            q.resolve(e.data);
            console.log(e);
        },function (err) {
            q.reject(err);
            console.log('登录失败:');
            console.log(err);
    });
    return q.promise;
};
//注册部分的$http
baseService.prototype.registers = function(obj) {
    var that= this;
    //obj = that.columnToData(obj,that.mapping[that.usersReg]);
    console.log("注册的参数"+JSON.stringify(obj));
    var q = that.$q.defer();
    that.$http.post(that.baseUrl+'/register/',obj,congfigsed)
        .then(function (e) {
            console.log('注册成功',e);
            q.resolve(e.data);
        },function (err) {
            console.log('注册失败',err);
            q.reject(err)
        });

    return q.promise;
};
//验证短信验证码是否正确
baseService.prototype.confirmvercodes = function(obj) {
    var that= this;
    //obj = that.columnToData(obj,that.mapping[that.usersconfirmVercode]);
    console.log("忘记的参数"+JSON.stringify(obj));
    var q = that.$q.defer();
    that.$http.post(that.baseUrl+'/register/setNewPwd/',obj,congfigsed)
        .then(function (e) {
            console.log('忘记密码成功');
            q.resolve(e.data);
        },function (err) {
            console.log('忘记密码失败');
            q.reject(err)
        });

    return q.promise;
};
//请求短信验证码、忘记密码的输入新密码,绑定imsi
baseService.prototype.commonUser = function(obj,url) {
    var that= this;
    var congfigthr={
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Token':window.sessionStorage.getItem("Utoken")
        },

        timeout:12000
    };
    //obj = that.columnToData(obj,that.mapping[that.userrestPass]);''
    console.log("验证码、忘记密码的输入新密码、imsi.蜂鸣器,修改密码,"+JSON.stringify(obj));
    var q = that.$q.defer();
    that.$http.post(that.baseUrl+url,obj,congfigthr)
        .then(function (e) {
            console.log('验证码、忘记密码的输入新密码、imsi、蜂鸣器，修改密码成功:',e);
            q.resolve(e.data);
            console.log(e);
        },function (err) {
            console.log('验证码、忘记密码的输入新密码、imsi、蜂鸣器，修改密码失败:',err);
            q.reject(err);
            console.log(err);
        });

    return q.promise;
};
baseService.prototype.commonUserget = function(obj,url) {
    var that= this;
    var congfigthr={
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Token':window.sessionStorage.getItem("Utoken")
        },

        timeout:8000
    };
    //obj = that.columnToData(obj,that.mapping[that.userrestPass]);''
    console.log("行程,报警"+JSON.stringify(obj));
    var q = that.$q.defer();
    //$http.get(baseUrl+'/users/list',{params:obj}).then(function(e)
    that.$http.get(that.baseUrl+url,{params:obj},congfigthr).then(function (e) {
            console.log('行程，报警成功');
            q.resolve(e.data);

        },function (err) {
            console.log('行程，报警失败');
            q.reject(err)
        });

    return q.promise;
};
baseService.prototype.commonUsergetfir = function(obj,url) {
    var that= this;
    //obj = that.columnToData(obj,that.mapping[that.userrestPass]);''
    console.log("行程,报警"+JSON.stringify(obj));
    var congfigthr={
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Token':window.sessionStorage.getItem("Utoken")
        },

        timeout:8000
    };
    var q = that.$q.defer();
    //$http.get(baseUrl+'/users/list',{params:obj}).then(function(e)
    that.$http.get(that.baseUrl+url,{params:obj},congfigthr).then(function (e) {
        console.log('fir行程成功');
        q.resolve(e.data);

    },function (err) {
        console.log('fir行程失败');
        q.reject(err)
    });

    return q.promise;
};
baseService.prototype.autoaddZero = function(value){
    if (value<10){
        value="0"+value;
    }
    return value;
}
function autoAddZero(value){
    if (value<10){
        value="0"+value;
    }
    return value;
}
//获取当前的时间
baseService.prototype.getTime = function(){
        //自动加0
        //var that = this;
        var tmpDate=new Date();
        var tmpYear=tmpDate.getFullYear();
        var tmpMonth=autoAddZero(tmpDate.getMonth()+1);
        var tmpDay=autoAddZero(tmpDate.getDate());
        //var tmpHours=autoAddZero(tmpDate.getHours());
        //var tmpMinutes=autoAddZero(tmpDate.getMinutes());
        //var tmpSecends=autoAddZero(tmpDate.getSeconds());
        return tmpYear+""+tmpMonth+""+tmpDay;
            //+" "+tmpHours+":"+tmpMinutes+":"+tmpSecends
};
baseService.prototype.getTimems = function(){
    //自动加0
    //var that = this;
    var tmpDate=new Date();
    var tmpYear=tmpDate.getFullYear();
    var tmpMonth=autoAddZero(tmpDate.getMonth()+1);
    var tmpDay=autoAddZero(tmpDate.getDate());
    //var tmpHours=autoAddZero(tmpDate.getHours());
    //var tmpMinutes=autoAddZero(tmpDate.getMinutes());
    //var tmpSecends=autoAddZero(tmpDate.getSeconds());
    return tmpYear+"/"+tmpMonth+"/"+tmpDay;
    //+" "+tmpHours+":"+tmpMinutes+":"+tmpSecends
};
baseService.prototype.getcurrentTime = function(){
    //自动加0
    //var that = this;
    var tmpDate=new Date();
    var tmpYear=tmpDate.getFullYear();
    var tmpMonth=autoAddZero(tmpDate.getMonth()+1);
    var tmpDay=autoAddZero(tmpDate.getDate());
    var tmpHours=autoAddZero(tmpDate.getHours());
    var tmpMinutes=autoAddZero(tmpDate.getMinutes());
    var tmpSecends=autoAddZero(tmpDate.getSeconds());
    return tmpYear+"-"+tmpMonth+"-"+tmpDay+" "+tmpHours+":"+tmpMinutes+":"+tmpSecends;

};
baseService.prototype.getdateYear = function() {

    var tmpDate=new Date();
    var tmpYear=tmpDate.getFullYear();
    return tmpYear;
};
baseService.prototype.getdateMonth = function() {
    //var that = this;that.
    var tmpDate=new Date();
    var tmpMonth=autoAddZero(tmpDate.getMonth()+1);
    return tmpMonth;
};
baseService.prototype.getdateday = function() {
    //var that = this;that.
    var tmpDate=new Date();
    var tmpDay=autoAddZero(tmpDate.getDate());
    return tmpDay;
};

baseService.prototype.carnamef = function(){
    var that= this;
    //obj = that.columnToData(obj,that.mapping[that.name]);
    var obj = {"divisionUid":sessionStorage.getItem("divisionUid"),"pageNumber":0,"limit":20}
    console.log("carnameheader:" + obj);
    var q = that.$q.defer();
    that.$http.get(that.baseUrl+'rest/vehicles/divisions/',{params:obj},congfig)
        .then(function (e) {
            console.log('获取成功');
            console.log(e);
            q.resolve(e.date);
        },function (err) {
            console.log('获取失败');
            q.reject(err)
        });

    return q.promise;
};
baseService.prototype.selectcontent = function(obj,key){
    for(var i=0; i<obj.length; i++){
        if(arr[i] == val){
            obj.splice(i,1);
        }else{
            obj.push(key);
        }

    }
    return obj;
};
//经纬度转换为地址
//baseService.prototype.covertAddress = function(lnglatXY){
//
//    var geocoder;
//    //逆地理编码
//    //地图上所标点的坐标
//    AMap.service('AMap.Geocoder',function(){//回调函数
//        //实例化Geocoder
//        geocoder = new AMap.Geocoder({
//        });
//    })
//
//    return geocoder;
//
//
//};
//转换毫秒为日期
baseService.prototype.coverdate = function(olddate){
    var tmpDate = new Date(olddate);
    var tmpYear=tmpDate.getFullYear();
    var tmpMonth=autoAddZero(tmpDate.getMonth()+1);
    var tmpDay=autoAddZero(tmpDate.getDate());
    var tmpHours=autoAddZero(tmpDate.getHours());
    var tmpMinutes=autoAddZero(tmpDate.getMinutes());
    var tmpSecends=autoAddZero(tmpDate.getSeconds());
    return tmpHours+":"+tmpMinutes;
}
baseService.prototype.coverdateyear = function(olddate){
    var tmpDate = new Date(olddate);
    var tmpYear=tmpDate.getFullYear();
    var tmpMonth=autoAddZero(tmpDate.getMonth()+1);
    var tmpDay=autoAddZero(tmpDate.getDate());
    var tmpHours=autoAddZero(tmpDate.getHours());
    var tmpMinutes=autoAddZero(tmpDate.getMinutes());
    var tmpSecends=autoAddZero(tmpDate.getSeconds());
    return tmpYear+"年"+tmpMonth+"月"+tmpDay+"日";
}
//随机生成一个6位数
baseService.prototype.randomsix = function(){
    var num = [0,1,2,3,4,5,6,7,8,9];
    var res = "";
    for(var i = 0; i < 6 ; i ++) {
        var id = Math.ceil(Math.random()*9);
        res += num[id];
    }
    console.log(res);
    return res;
};
baseService.prototype.removeevent = function(){
    function eventBackButton(e) {
        e.preventDefault();
        //alert("backClick2");
        navigator.app.exitApp();
    }
    document.removeEventListener('backbutton', eventBackButton, false);
};
baseService.prototype.coverdateerooter = function(date){
    var tmpDate = new Date(date);
    var tmpYear=tmpDate.getFullYear();
    var tmpMonth=autoAddZero(tmpDate.getMonth()+1);
    var tmpDay=autoAddZero(tmpDate.getDate());
    var tmpHours=autoAddZero(tmpDate.getHours());
    var tmpMinutes=autoAddZero(tmpDate.getMinutes());
    var tmpSecends=autoAddZero(tmpDate.getSeconds());
    return tmpYear+""+tmpMonth+""+tmpDay+""+tmpHours+""+tmpMinutes+""+tmpSecends;
};
baseService.prototype.getdatestr = function(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = autoAddZero(dd.getMonth()+1);//获取当前月份的日期
    var d = autoAddZero(dd.getDate());
    return y+"-"+m+"-"+d;
}
baseService.prototype.getdatestrnochinese = function(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = autoAddZero(dd.getMonth()+1);//获取当前月份的日期
    var d = autoAddZero(dd.getDate());
    return y+"/"+m+"/"+d+"";
};
baseService.prototype.countdownnumf = function(num){
    var m = Math.floor(num/60);
    var s = autoAddZero(Math.floor(num%60));
    return m+"分"+s+"秒";
};
baseService.prototype.scriptret = function(){
//    var script = $script;
//    return script(url);
//    //return script;
        var oHead = document.getElementsByTagName('HEAD').item(0);

        var oScript= document.createElement("script");

        //oScript.type = "text/javascript";

        oScript.src="http://webapi.amap.com/maps?v=1.3&key=42340a04401555924d3b73340e423748";

        oHead.appendChild( oScript);
    return oHead;
};
baseService.prototype.datecommon = function(){
    var currYear = (new Date()).getFullYear();
    var opt={};
    opt.date = {preset : 'date'};
    opt.datetime = {preset : 'datetime'};
    opt.time = {preset : 'time'};
    opt.default = {
        theme: 'android-ics light', //皮肤样式
        display: 'modal', //显示方式
        mode: 'scroller', //日期选择模式
        dateFormat: 'yy-mm-dd',
        lang: 'zh',
        showNow: true,
        nowText: "今天",
        //startYear: currYear-1, //开始年份
        //endYear: currYear //结束年份
    };

    $("#appDate").mobiscroll($.extend(opt['date'], opt['default']));
    $("#appDateover").mobiscroll($.extend(opt['date'], opt['default']));
};
baseService.prototype.weatherdate = function(){
    var alldd = new Date();
    var MM = autoAddZero(alldd.getMonth()+1);

    var dd = autoAddZero(alldd.getDate());
   var ww = alldd.getDay();
    console.log("ww:"+ww);
    if (ww == 0){
        ww = "星期日";
    }
    if (ww == 1) {
       ww = "星期一";
    }
    if (ww == 2) {
        ww = "星期二";
    }
    if (ww == 3) {
        ww = "星期三";
    }
    if (ww == 4) {
        ww = "星期四";
    }

    if (ww == 5) {
        ww = "星期五";
    }
    if (ww == 6) {
        ww = "星期六";
    };
    return ww+" "+MM+"月"+dd+"日";
};
baseService.prototype.luuu = function(){
    //console.log(timerr);
    //$dragBln = false;
    if(timerr){
        clearInterval(timerr);
        console.log("轮播图有定时器")
    }else{
        var timerr;
        console.log("轮播图，没有定时器")
    }

    $(".main_image").touchSlider({
        flexible : true,
        speed : 200,
        btn_prev : $("#btn_prev"),
        btn_next : $("#btn_next"),
        paging : $(".autoPointall span"),
        counter : function (e){
            $(".autoPointall span").css({"background":"#eee"}).eq(e.current-1).css({"background":"#f39900"});
        }
    });

    $(".main_image").bind("mousedown", function() {
        $dragBln = false;
    });
    $(".changelocationtext").focus(function(){
        console.log("得到焦点");
        if(timerr){
            clearInterval(timerr);
        }

    });
    $(".main_image").bind("dragstart", function() {
        $dragBln = true;
    });
    timerr = setInterval(function(){
        $("#btn_next").click();
    }, 5000);

    $(".main_visual").hover(function(){
        clearInterval(timerr);
    },function(){
        timerr = setInterval(function(){
            $("#btn_next").click();
        },5000);
    });

    $(".main_image").bind("touchstart",function(){
        clearInterval(timerr);
    }).bind("touchend", function(){
        timerr = setInterval(function(){
            $("#btn_next").click();
        }, 5000);
    });
    $(".changelocationinput").css({"display":"none"});
    $(".weatherlocationstyle").click(function(){

        $(".changelocationinput").css({"display":"inline-block"});
        console.log("点击了,轮播图结束");
        //alert("点击了地址");
        clearInterval(timerr);

    });
    //点击了搜索
    $(".changgelocationbuyes").click(function(){
        console.log("点击了搜索");
        //alert("点击了搜索");
        if($(".changelocationtext").val()){
            homeweatherinit();
        }
        $(".changelocationinput").css({"display":"none"});

    });
    //点击了取消
    $(".noweatherbtnstyle").click(function(){
        console.log("点击了取消");
        //alert("点击了取消");
        $(".changelocationtext").val("");
        $(".changelocationinput").css({"display":"none"});
    });
    function homeweatherinit(){
        var cityUrl = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js';
        $.getScript(cityUrl, function (script, textStatus, jqXHR) {
            // 获取城市
            if(window.localStorage.getItem("weathercity")){
                if($(".changelocationtext").val()){
                    citytq = $(".changelocationtext").val();
                    window.localStorage.setItem("weathercity",citytq);
                }else {
                    citytq = window.localStorage.getItem("weathercity");
                }
            }else{
                if(remote_ip_info.city){
                    var citytq = remote_ip_info.city;
                    window.localStorage.setItem("weathercity",citytq);
                }else {
                    var citytq = "北京"
                    window.localStorage.setItem("weathercity",citytq);
                }
            }



//            citytq = "大理";
            var url = "http://php.weather.sina.com.cn/iframe/index/w_cl.php?code=js&city=" + citytq + "&day=0&dfc=3";
            $.ajax({
                url: url,
                dataType: "script",
                scriptCharset: "gbk",
                success: function (data) {
                    console.log(data);
                    try {
                        var _w = window.SWther.w[citytq][0];
                        $(".weatherlocationstyle").text(citytq);

                        console.log(_w);
                        var _f = _w.f1 + "_0.png";
                        if (new Date().getHours() > 17) {
                            _f = _w.f2 + "_1.png";
                        }
                        var img = "<img width='56px' src='http://i2.sinaimg.cn/dy/main/weather/weatherplugin/wthIco/20_20/" + _f
                            + "' />";
                        //var tq = "今日天气 :　" + citytq + " " + img + " " + _w.s1 + " " + _w.t1 + "℃～" + _w.t2 + "℃ " + _w.d1 + _w.p1 + "级";
                        //$('#weather').html(tq);
                        $("#weathericon").html(img);
                        $(".weathercontentt").html(_w.t1+"～"+_w.t2+"℃");
                        $(".weatherweathercontent").text(_w.s1);
                        $(".weathercontentwind").html(_w.d1 + _w.p1 + "级");
                        $(".weathererrstyle").css({"display":"none"});
                        $(".changelocationtext").val("");
                    }catch (err){
                        $(".weatherlocationstyle").text(citytq);
                        $("#weathericon").html("");
                        $(".weathercontentt").html("");
                        $(".weatherweathercontent").text("");
                        $(".weathercontentwind").html("");
                        $(".weathererrstyle").css({"display":"block"});
                        $(".weathererrstyle").text("查询不到该地址的天气信息，请您重新确认！");
                        $(".changelocationtext").val("");
                    }
                    //if(window.SWther.w[citytq][0]){

                    //}else {

                    //}

                    //scope.weatherinfos1 = _w.s1;
                    //scope.weatherwind= _w.d1 + _w.p1 + "级";
                },
                error:function(err){
                    $(".weatherlocationstyle").text(citytq);
                    $("#weathericon").html("");
                    $(".weathercontentt").html("");
                    $(".weatherweathercontent").text("");
                    $(".weathercontentwind").html("");
                    $(".changelocationtext").val("");
                    $(".weathererrstyle").css({"display":"block"});
                    $(".weathererrstyle").text(err);
                }
            });
        });
    };
    homeweatherinit();
    //that.$scope.that.$on('that.$stateChangeStart',
    //
    //    function(event, toState, toParams, fromState, fromParams){
    //        console.log("toState:"+JSON.stringify(toState));
    //        console.log("toParams:"+JSON.stringify(toParams));
    //        console.log("fromState:"+JSON.stringify(fromState));
    //        console.log("fromParams:"+JSON.stringify(fromParams));
    //        console.log("获取路由地址："+$location.path());
    //        if(fromState.name=="mains.home") {
    //
    //            clearInterval(timerr);
    //
    //        }
    //    });
}
//baseService.prototype.ceshi = function(){
//    var that= this;
//    obj = {
//        termId:350000000000001
//    }
//    console.log("登录的参数"+JSON.stringify(obj));
//    var q = that.$q.defer();
//    that.$http.post("http://180.168.194.98:7888/EBWebServer-2.0/rest/gps/latest/",obj)
//        .then(function (e) {
//            console.log('登录成功');
//            q.resolve(e.data);
//            console.log(e);
//        },function (err) {
//            console.log('登录失败');
//            q.reject(err);
//            console.log(err);
//        });
//
//    return q.promise;
//}

//限速接口 2017年3月21日 11:28:50
baseService.prototype.speedlimit = function(obj) {
    var that= this;
    var congfigthr={
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Token':window.sessionStorage.getItem("Utoken")
        },
        timeout:12000
    };
    var q = that.$q.defer();
    that.$http.post(that.baseUrl+'/rest/cmd/limitSpeed/',obj,congfigthr)
        .then(function (e) {
            q.resolve(e.data);
        },function (err) {
            q.reject(err);
        });

    return q.promise;
};

//断电/油 接口 2017年3月21日 15:28:20
baseService.prototype.breakPower = function(obj) {
    var that= this;
    var congfigthr={
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Token':window.sessionStorage.getItem("Utoken")
        },
        timeout:12000
    };
    var q = that.$q.defer();
    that.$http.post(that.baseUrl+'/rest/cmd/breakPower/',obj,congfigthr)
        .then(function (e) {
            q.resolve(e.data);
        },function (err) {
            q.reject(err);
        });

    return q.promise;
};

//断电/油 接口 2017年3月21日 15:30:02
baseService.prototype.controlLight = function(obj) {
    var that= this;
    var congfigthr={
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Token':window.sessionStorage.getItem("Utoken")
        },
        timeout:16000
    };
    var q = that.$q.defer();
    that.$http.post(that.baseUrl+'/rest/cmd/controlLight/',obj,congfigthr)
        .then(function (e) {
            q.resolve(e.data);
        },function (err) {
            q.reject(err);
        });

    return q.promise;
};

//车辆状态自检 接口 2017年3月21日 16:49:03
baseService.prototype.selfInspection = function(obj) {
    var that= this;
    var congfigthr={
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Token':window.sessionStorage.getItem("Utoken")
        },
        timeout:16000
    };
    var q = that.$q.defer();
    that.$http.post(that.baseUrl+'/rest/cmd/selfInspection/',obj,congfigthr)
        .then(function (e) {
            q.resolve(e.data);
        },function (err) {
            q.reject(err);
        });

    return q.promise;
};

//车辆状态获取接口 2017年3月22日 15:15:05
baseService.prototype.getcarstatus = function(obj,url) {
    var that= this;
    var congfigthr={
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Token':window.sessionStorage.getItem("Utoken")
        },

        timeout:16000
    };
    //obj = that.columnToData(obj,that.mapping[that.userrestPass]);''
    var q = that.$q.defer();
    that.$http.post(that.baseUrl+url,obj,congfigthr)
        .then(function (e) {
            q.resolve(e.data);
        },function (err) {
            q.reject(err);
        });

    return q.promise;
};

//权限控制判断
baseService.prototype.authorityControl = function (num) {
    var authorityList = window.sessionStorage.getItem("Ufunction");
    var nowauthority = "";
    if(authorityList){
        nowauthority = authorityList.charAt((64-num));
    }
    console.log(nowauthority);
    return nowauthority
}