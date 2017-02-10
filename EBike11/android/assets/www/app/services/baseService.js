/*不是angular的服务*/
var baseService = function($http,$q,baseUrl,usersSub,usersReg,usersconfirmVercode,mapping) {
    this.$http = $http;
    this.$q = $q;
    this.baseUrl = baseUrl;
    this.usersSub = usersSub;
    this.usersReg = usersReg;
    this.usersconfirmVercode= usersconfirmVercode;
    //this.usersvehiclebind = usersvehiclebind;
    this.mapping = mapping;
}
var congfig={
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    },
    timeout:6000
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
    obj = that.columnToData(obj,that.mapping[that.usersSub]);
    console.log("登录的参数"+JSON.stringify(obj));
    var q = that.$q.defer();
    that.$http.post(that.baseUrl+'/rest/user/oauth/',obj,congfig)
        .then(function (e) {
            console.log('登录成功');
            q.resolve(e.data);
        },function (err) {
            console.log('登录失败');
            q.reject(err)
    });

    return q.promise;
};
//注册部分的$http
baseService.prototype.registers = function(obj) {
    var that= this;
    obj = that.columnToData(obj,that.mapping[that.usersReg]);
    console.log("注册的参数"+JSON.stringify(obj));
    var q = that.$q.defer();
    that.$http.post(that.baseUrl+'/rest/user/register/',obj,congfig)
        .then(function (e) {
            console.log('注册成功');
            q.resolve(e.data);
        },function (err) {
            console.log('注册失败');
            q.reject(err)
        });

    return q.promise;
};
//用户绑定设备号部分的$http
//baseService.prototype.vehiclebinds = function(obj) {
//    var that= this;
//    obj = that.columnToData(obj,that.mapping[that.usersvehiclebind]);
//    console.log("用户绑定设备号的参数"+JSON.stringify(obj));
//    var q = that.$q.defer();
//    that.$http.post(that.baseUrl+'/rest/vehicles/',obj,congfig)
//        .then(function (e) {
//            console.log('用户绑定设备号成功');
//            q.resolve(e.data);
//        },function (err) {
//            console.log('用户绑定设备号失败');
//            q.reject(err)
//        });
//
//    return q.promise;
//};
//验证短信验证码是否正确
baseService.prototype.confirmvercodes = function(obj) {
    var that= this;
    obj = that.columnToData(obj,that.mapping[that.usersconfirmVercode]);
    console.log("注册的参数"+JSON.stringify(obj));
    var q = that.$q.defer();
    that.$http.post(that.baseUrl+'/rest/user/messageTest/',obj,congfig)
        .then(function (e) {
            console.log('注册成功');
            q.resolve(e.data);
        },function (err) {
            console.log('注册失败');
            q.reject(err)
        });

    return q.promise;
};
//请求短信验证码、忘记密码的输入新密码,绑定imsi
baseService.prototype.commonUser = function(obj,url) {
    var that= this;
    //obj = that.columnToData(obj,that.mapping[that.userrestPass]);''
    console.log("验证码、忘记密码的输入新密码、imsi.蜂鸣器,修改密码,"+JSON.stringify(obj));
    var q = that.$q.defer();
    that.$http.post(that.baseUrl+url,obj,congfig)
        .then(function (e) {
            console.log('验证码、忘记密码的输入新密码、imsi、蜂鸣器，修改密码成功');
            q.resolve(e.data);

        },function (err) {
            console.log('验证码、忘记密码的输入新密码、imsi、蜂鸣器，修改密码失败');
            q.reject(err)
        });

    return q.promise;
};
baseService.prototype.commonUserget = function(obj,url) {
    var that= this;
    //obj = that.columnToData(obj,that.mapping[that.userrestPass]);''
    console.log("行程,报警"+JSON.stringify(obj));
    var q = that.$q.defer();
    //$http.get(baseUrl+'/users/list',{params:obj}).then(function(e)
    that.$http.get(that.baseUrl+url,{params:obj},congfig).then(function (e) {
            console.log('行程，报警成功');
            q.resolve(e.data);

        },function (err) {
            console.log('行程，报警失败');
            q.reject(err)
        });

    return q.promise;
};
baseService.prototype.jsonpcommon = function(url){
    var that= this;
    var q = that.$q.defer();
    that.$http.jsonp(url,congfig).then(function (e) {
        console.log('基站定位成功');
        q.resolve(e.data);

    },function (err) {
        console.log('基站定位失败');
        q.reject(err)
    });

    return q.promise;
}
//baseService.prototype.baseStationget = function(obj,url){
//    var that= this;
//    var q = that.$q.defer();
//    that.$http.get(url,{params:obj},congfig).then(function (e) {
//        console.log('基站成功');
//        q.resolve(e.data);
//
//    },function (err) {
//        console.log('基站失败');
//        q.reject(err)
//    });
//
//    return q.promise;
//}
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
    return y+"年"+m+"月"+d+"日";
}
baseService.prototype.getdatestrnochinese = function(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = autoAddZero(dd.getMonth()+1);//获取当前月份的日期
    var d = autoAddZero(dd.getDate());
    return y+""+m+""+d+"";
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
}
