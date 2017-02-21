/**
 * 权限服务 用来获取ajax数据
 */
angular.module("app.demo.directions",["app.demo.service"])
    //.directive('onFinishRenderFilters', function () {
    //    return {
    //        restrict: 'A',
    //        link: function(scope, element, attr) {
    //            var map = new AMap.Map('containermap',{
    //                resizeEnable:true,
    //                zoom: 17,
    //                center: [116.39,39.9003111111]
    //            });
    //            var marker = new AMap.Marker({
    //                //image : 'http://localhost:63342/E:/webapp/src/img/gpsmarker.png',//24px*24px
    //                position : [116.39, 39.9],
    //                //offset : new AMap.Pixel(-12,-12),
    //                map : map
    //            });
    //            var content = "<div class='locationmarkerC'>这是地址这是地址这是地址这是地址</div>"
    //            var locationmarker = new AMap.Marker({
    //                content:content,
    //                position:[116.39, 39.9],
    //                offset : new AMap.Pixel(-35,-35),
    //                map:map
    //            });
    //            AMap.plugin(['AMap.ToolBar','AMap.Scale'],
    //                function(){
    //                    var toolbar = new AMap.ToolBar({
    //                        liteStyle:true
    //                    });
    //                    map.addControl(toolbar);
    //                    map.addControl(new AMap.Scale());
    //                });
    //        }
    //    };
    //})
    //.directive('onTripmapDir', function (registerService,$timeout) {
    //    return {
    //        restrict: 'A',
    //        link: function(scope, element, attr) {
    //
    //
    //        }
    //    };
    //})
    .directive('lunbo', ["registerService","$location","$interval","$timeout",function (registerService,$location,$interval,$timeout) {
        return{
            restrict:'EA',
            link: function (scope, element, attr) {
                //$(".main_visual").hover(function(){
                //    $("#btn_prev,#btn_next").fadeIn()
                //},function(){
                //    $("#btn_prev,#btn_next").fadeOut()
                //});
                //clearInterval(scope.timerr);
                //timerr = setInterval(function(){
                //    $("#btn_next").click();
                //},5000);
                //var
                //console.log(timerr);
                //$dragBln = false;
                //
                //$(".main_image").touchSlider({
                //    flexible : true,
                //    speed : 200,
                //    btn_prev : $("#btn_prev"),
                //    btn_next : $("#btn_next"),
                //    paging : $(".autoPointall span"),
                //    counter : function (e){
                //        $(".autoPointall span").css({"background":"#eee"}).eq(e.current-1).css({"background":"#f39900"});
                //    }
                //});
                //
                //$(".main_image").bind("mousedown", function() {
                //    $dragBln = false;
                //});
                //$(".changelocationtext").focus(function(){
                //    console.log("得到焦点");
                //    if(timerr){
                //        clearInterval(timerr);
                //    }
                //
                //})
                //$(".main_image").bind("dragstart", function() {
                //    $dragBln = true;
                //});
                //
                ////$(".main_image a").click(function(){
                ////    if($dragBln) {
                ////        return false;
                ////    }
                ////});
                //
                //timerr = setInterval(function(){
                //    $("#btn_next").click();
                //}, 5000);
                //
                //$(".main_visual").hover(function(){
                //    clearInterval(timerr);
                //},function(){
                //    timerr = setInterval(function(){
                //        $("#btn_next").click();
                //    },5000);
                //});
                //
                //$(".main_image").bind("touchstart",function(){
                //    clearInterval(timerr);
                //}).bind("touchend", function(){
                //    timerr = setInterval(function(){
                //        $("#btn_next").click();
                //    }, 5000);
                //});
                //console.log(timerr);
                //var step=0;
                //var ischange = false;
                //scope.flag=false;
                //currentPic();
                //var timer;
                //element.addEventListener('touchstart',touchStart);
                //element.addEventListener('touchmove',touchMove);
                //element.addEventListener('touchend',function(){
                //    ischange = true;
                //});
                //function touchStart(e){
                //    clearInterval(timer);
                //    ischange = false;
                //    e.preventDefault();
                //    x = e.touches[0].pageX;
                //    //y = e.touches[0].pageY;
                //}
                //function touchMove(e){
                //    if (ischange){
                //        e.preventDefault();
                //        var n =  parseFloat(e.touches[0].pageX - x);
                //        if(n>20){
                //
                //            step--;
                //            if(step == -1){
                //               step = 2;
                //            }
                //            currentPic(step);
                //            setInterval(changePic,2000);
                //        }
                //        if(n<-20){
                //            step++;
                //            if(step == 3){
                //                step = 0;
                //            }
                //            currentPic(step);
                //            setInterval(changePic,2000);
                //        }
                //
                //    }else{
                //        setInterval(changePic,2000);
                //    }
                //}
                //function changePic(){
                //    //element.find(".picstyle").animate({left:"16rem"},1000);.siblings().css({left:"16rem"})
                //    //$(".changelocationinput").css({"display":"none"});
                //    //isshow = false;
                //    step++;
                //    step=step%3;
                //    element.find(".pointstyle").css({"background":"#eee"});
                //    console.log();
                //    element.find(".picstyle").eq(step).stop().animate({left:0},200,function(){
                //        element.find(".picstyle").eq(step).siblings().css({left:"16rem"});
                //        element.find(".autoPointall").css({left:0});
                //    });
                //    element.find(".pointstyle").eq(step).css({"background":"#f39900"});
                //
                //};
                //function currentPic(){
                //    $(".changelocationinput").css({"display":"none"});
                //    //isshow = false;
                //    //element.find(".picstyle").animate({left:"16rem"},1000);
                //    element.find(".pointstyle").css({"background":"#eee"});
                //    element.find(".picstyle").eq(step).animate({left:0},500,function(){
                //        element.find(".picstyle").eq(step).siblings().css({left:"16rem"});
                //        element.find(".autoPointall").css({left:0});
                //    });
                //    element.find(".pointstyle").eq(step).css({"background":"#f39900"});
                //}
                //function turncurrentPic(){
                //    $(".changelocationinput").css({"display":"none"});
                //    //isshow = false;
                //    element.find(".pointstyle").css({"background":"#eee"});
                //    element.find(".picstyle").eq(step).animate({left:0},500,function(){
                //        element.find(".picstyle").eq(step).siblings().css({left:"-16rem"});
                //        element.find(".autoPointall").css({left:0});
                //    });
                //    element.find(".pointstyle").eq(step).css({"background":"#f39900"});
                //}
                // timer = setInterval(
                //    changePic
                //,5000);
                //element.bind('touchstart',touchStart);
                //element.bind('touchend',touchend);
                ////element.bind('touchmove',function(){
                ////    ischange = true;
                ////
                ////
                ////});
                //var x;
                //function touchStart(e){
                //    e = e || window.event;
                //    clearInterval(timer);
                //    ischange = false;
                //    //e.preventDefault();
                //    //var point = e.targetTouches[0]. : e;
                //    //alert("touchstart!");
                //    console.log(e);
                //    //console.log(e.touches[0].pageX);
                //    //
                //    //try {
                //    x = e.originalEvent.targetTouches[0].pageX;
                //    //alert(x);
                //    //    alert("没有报错的X："+x);
                //    //}catch (err){
                //    //    alert("这里报错了！:"+err);
                //    //    var x = e.touches[0].pageX;
                //    //    alert("报错了的x:"+x);
                //    //}
                //    //return x;
                //    console.log(x);
                //    //alert("X:"+x);
                //    //y = e.touches[0].pageY;
                //}
                //function touchend(e){
                //    //console.log(2);
                //    alert("touchend");
                //    //console.log(ischange);
                //    //alert("ischange:"+ischange);
                //    e = e || window.event;
                //    //if (ischange){
                //        //e.preventDefault();
                //        //var point = e.touches ? e.touches[0] : e;
                //        //var n =  parseFloat(e.touches[0].pageX - x);
                //        //try {
                //            var n =  parseFloat(e.originalEvent.changedTouches[0].pageX - x);
                //        //} catch (err){
                //        //    alert("这里报错了："+err);
                //        //    var n = parseFloat(e.touches[0].pageX - x);
                //        //}
                //
                //        alert("n:"+n);
                //        console.log("n:"+n);
                //        if(n>30){
                //            step--;
                //            if(step == -1){
                //                step = 2;
                //                console.log("step==2")
                //            }
                //            turncurrentPic();
                //            alert("上张图片");
                //            timer = setInterval(
                //                changePic
                //            ,5000);
                //            return step;
                //        }else
                //        if(n<-30){
                //            step +=1;
                //            if(step == 3){
                //                step = 0;
                //                console.log("step==0")
                //            }
                //            console.log("step:"+step);
                //            alert("下张图片");
                //            currentPic();
                //            timer = setInterval(
                //                changePic
                //            ,5000);
                //            return step;
                //        }else{
                //            timer = setInterval(
                //                changePic
                //            ,5000);
                //            alert("不大不小，开始轮播");
                //            $(".changelocationtext").focus(function(){
                //                if(timer){
                //                    clearInterval(timer);
                //                    console.log("轮播图结束");
                //                    alert("轮播图结束")
                //                }
                //                console.log("得到焦点");
                //                alert("得到焦点");
                //            });
                //        }
                //
                //    //}else{
                //    //    alert("鼠标点击，没有移动");
                //    //    console.log("鼠标点击，没有移动");
                //    //   timer =  setInterval(
                //    //        changePic
                //    //    ,5000);
                //    //    console.log("轮播图开启");
                //    //    alert("轮播图开启");
                //    //    $(".changelocationtext").focus(function(){
                //    //        if(timer){
                //    //            clearInterval(timer);
                //    //            console.log("轮播图结束");
                //    //            alert("轮播图结束")
                //    //        }
                //    //        console.log("得到焦点");
                //    //        alert("得到焦点");
                //    //    });
                //    //}
                //}
                //var isshow = false;
                //地址
//                $(".changelocationinput").css({"display":"none"});
//                $(".weatherlocationstyle").click(function(){
//
//                    $(".changelocationinput").css({"display":"inline-block"});
//                    console.log("点击了,轮播图结束");
//                    //alert("点击了地址");
//                    clearInterval(timerr);
//
//                });
//                //点击了搜索
//                $(".changgelocationbuyes").click(function(){
//                    console.log("点击了搜索");
//                    //alert("点击了搜索");
//                    if($(".changelocationtext").val()){
//                        homeweatherinit();
//                    }
//                    $(".changelocationinput").css({"display":"none"});
//
//                });
//                //点击了取消
//                $(".noweatherbtnstyle").click(function(){
//                    console.log("点击了取消");
//                    //alert("点击了取消");
//                    $(".changelocationtext").val("");
//                    $(".changelocationinput").css({"display":"none"});
//                });
//                function homeweatherinit(){
//                    var cityUrl = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js';
//                    $.getScript(cityUrl, function (script, textStatus, jqXHR) {
//                        // 获取城市
//                        if(window.localStorage.getItem("weathercity")){
//                            if($(".changelocationtext").val()){
//                                citytq = $(".changelocationtext").val();
//                                window.localStorage.setItem("weathercity",citytq);
//                            }else {
//                                citytq = window.localStorage.getItem("weathercity");
//                            }
//                        }else{
//                            if(remote_ip_info.city){
//                                var citytq = remote_ip_info.city;
//                                window.localStorage.setItem("weathercity",citytq);
//                            }else {
//                                var citytq = "北京"
//                                window.localStorage.setItem("weathercity",citytq);
//                            }
//                        }
//
//
//
////            citytq = "大理";
//                        var url = "http://php.weather.sina.com.cn/iframe/index/w_cl.php?code=js&city=" + citytq + "&day=0&dfc=3";
//                        $.ajax({
//                            url: url,
//                            dataType: "script",
//                            scriptCharset: "gbk",
//                            success: function (data) {
//                                console.log(data);
//                                try {
//                                    var _w = window.SWther.w[citytq][0];
//                                    $(".weatherlocationstyle").text(citytq);
//
//                                    console.log(_w);
//                                    var _f = _w.f1 + "_0.png";
//                                    if (new Date().getHours() > 17) {
//                                        _f = _w.f2 + "_1.png";
//                                    }
//                                    var img = "<img width='56px' src='http://i2.sinaimg.cn/dy/main/weather/weatherplugin/wthIco/20_20/" + _f
//                                        + "' />";
//                                    //var tq = "今日天气 :　" + citytq + " " + img + " " + _w.s1 + " " + _w.t1 + "℃～" + _w.t2 + "℃ " + _w.d1 + _w.p1 + "级";
//                                    //$('#weather').html(tq);
//                                    $("#weathericon").html(img);
//                                    $(".weathercontentt").html(_w.t1+"～"+_w.t2+"℃");
//                                    $(".weatherweathercontent").text(_w.s1);
//                                    $(".weathercontentwind").html(_w.d1 + _w.p1 + "级");
//                                    $(".weathererrstyle").css({"display":"none"});
//                                    $(".changelocationtext").val("");
//                                }catch (err){
//                                    $(".weatherlocationstyle").text(citytq);
//                                    $("#weathericon").html("");
//                                    $(".weathercontentt").html("");
//                                    $(".weatherweathercontent").text("");
//                                    $(".weathercontentwind").html("");
//                                    $(".weathererrstyle").css({"display":"block"});
//                                    $(".weathererrstyle").text("查询不到该地址的天气信息，请您重新确认！");
//                                    $(".changelocationtext").val("");
//                                }
//                                //if(window.SWther.w[citytq][0]){
//
//                                //}else {
//
//                                //}
//
//                                //scope.weatherinfos1 = _w.s1;
//                                //scope.weatherwind= _w.d1 + _w.p1 + "级";
//                            },
//                            error:function(err){
//                                $(".weatherlocationstyle").text(citytq);
//                                $("#weathericon").html("");
//                                $(".weathercontentt").html("");
//                                $(".weatherweathercontent").text("");
//                                $(".weathercontentwind").html("");
//                                $(".changelocationtext").val("");
//                                $(".weathererrstyle").css({"display":"block"});
//                                $(".weathererrstyle").text(err);
//                            }
//                        });
//                    });
//                };
//                homeweatherinit();

                var newScope = scope.$parent;
                console.log(1111,newScope);
                if(newScope.timerr){
                    //clearInterval(newScope.timerr);
                    $interval.cancel(newScope.timerr);
                    console.log("轮播图有定时器");
                    newScope.timerr = $interval(function(){
                        $("#btn_next").click();
                    }, 5000);
                    //console.log("关定时器");
                }
                else {
                    newScope.timerr = $interval(function(){
                        $("#btn_next").click();
                    }, 5000);
                    console.log("开启定时器")
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
                    if(newScope.timerr){
                        //clearInterval(newScope.timerr);
                        $interval.cancel(newScope.timerr);
                        console.log("关定时器");
                    }

                });
                $(".main_image").bind("dragstart", function() {
                    $dragBln = true;
                });

                //console.log("开启定时器");
                $(".main_visual").hover(function(){
                    //clearInterval(newScope.timerr);
                    $interval.cancel(newScope.timerr);
                    console.log("关定时器hover");
                },function(){
                    $interval.cancel(newScope.timerr);
                    newScope.timerr = $interval(function(){
                        $("#btn_next").click();
                    },5000);
                    console.log("开启定时器hover");
                });

                $(".main_image").bind("touchstart",function(e){
                    //if(e.originalEvent.touches.length <= 1){
                        //clearInterval(newScope.timerr);
                        $interval.cancel(newScope.timerr);
                        console.log("关定时器touchstart");
                    //}

                }).bind("touchend", function(e){

                    if(e.originalEvent.touches.length <= 1){
                        $interval.cancel(newScope.timerr);
                        newScope.timerr = $interval(function(){
                            $("#btn_next").click();
                        }, 5000);
                        console.log("开启定时器touchend");
                    }

                });
                $(".changelocationinput").css({"display":"none"});
                $(".weatherlocationstyle").click(function(){

                    $(".changelocationinput").css({"display":"inline-block"});
                    console.log("点击了,轮播图结束");
                    //alert("点击了地址");
                    //clearInterval(newScope.timerr);
                    $interval.cancel(newScope.timerr);

                });
                //点击了搜索
                $(".changgelocationbuyes").click(function(){
                    console.log("点击了搜索");
                    //alert("点击了搜索");
                    if($(".changelocationtext").val()){
                        homeweatherinit();
                        console.log(22222222);
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
                //$(".weatherlocationstyle").text("获取中");

                function homeweatherinit(){
                //
                        var inputcitylength = $(".changelocationtext").val();
                    if(inputcitylength.length<=8){
                        var cityUrl = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js';
                        //$.getScript(cityUrl, function (script, textStatus, jqXHR) {
                        //    // 获取城市
                        //    if(window.localStorage.getItem("weathercity")){
                        //        if($(".changelocationtext").val()){
                        //            citytq = $(".changelocationtext").val();
                        //            window.localStorage.setItem("weathercity",citytq);
                        //        }else {
                        //            citytq = window.localStorage.getItem("weathercity");
                        //        }
                        //    }else{
                        //        if(remote_ip_info.city){
                        //            var citytq = remote_ip_info.city;
                        //            window.localStorage.setItem("weathercity",citytq);
                        //        }else {
                        //            var citytq = "北京";
                        //            window.localStorage.setItem("weathercity",citytq);
                        //        }
                        //    }
                        //
                        //
                        //
                        //    //        citytq = "大理";
                        //
                        //
                        //    var url = "http://php.weather.sina.com.cn/iframe/index/w_cl.php?code=js&city=" + citytq + "&day=0&dfc=3";
                        //    $.ajax({
                        //        url: url,
                        //        dataType: "script",
                        //        //scriptCharset: "gbk",
                        //        success: function (data) {
                        //            console.log(data);
                        //            try {
                        //                var _w = window.SWther.w[citytq][0];
                        //                $(".weatherlocationstyle").text(citytq);
                        //
                        //                console.log(_w);
                        //                var _f = _w.f1 + "_0.png";
                        //                if (new Date().getHours() > 17) {
                        //                    _f = _w.f2 + "_1.png";
                        //                }
                        //                var img = "<img class='weathericonaaastyle' src='http://i2.sinaimg.cn/dy/main/weather/weatherplugin/wthIco/20_20/" + _f
                        //                    + "' />";
                        //                //var tq = "今日天气 :　" + citytq + " " + img + " " + _w.s1 + " " + _w.t1 + "℃～" + _w.t2 + "℃ " + _w.d1 + _w.p1 + "级";
                        //                //$('#weather').html(tq);
                        //                $("#weathericon").html(img);
                        //                $(".weathercontentt").html(_w.t1+"～"+_w.t2+"℃");
                        //                $(".weatherweathercontent").text(_w.s1);
                        //                $(".weathercontentwind").html(_w.d1 + _w.p1 + "级");
                        //                $(".weathererrstyle").css({"display":"none"});
                        //                $(".changelocationtext").val("");
                        //            }catch (err){
                        //                $(".weatherlocationstyle").text(citytq);
                        //                $("#weathericon").html("");
                        //                $(".weathercontentt").html("");
                        //                $(".weatherweathercontent").text("");
                        //                $(".weathercontentwind").html("");
                        //                $(".weathererrstyle").css({"display":"block"});
                        //                $(".weathererrstyle").text("查询不到该地址的天气信息，请您重新确认！");
                        //                $(".changelocationtext").val("");
                        //            }
                        //            //if(window.SWther.w[citytq][0]){
                        //
                        //            //}else {
                        //
                        //            //}
                        //
                        //            //scope.weatherinfos1 = _w.s1;
                        //            //scope.weatherwind= _w.d1 + _w.p1 + "级";
                        //        },
                        //        error:function(XMLHttpRequest, textStatus, errorThrown){
                        //            console.log("天气报错了");
                        //            console.log(XMLHttpRequest, textStatus, errorThrown);
                        //            $(".weatherlocationstyle").text(citytq);
                        //            $("#weathericon").html("");
                        //            $(".weathercontentt").html("");
                        //            $(".weatherweathercontent").text("");
                        //            $(".weathercontentwind").html("");
                        //            $(".changelocationtext").val("");
                        //            $(".weathererrstyle").css({"display":"block"});
                        //            $(".weathererrstyle").text(textStatus);
                        //        }
                        //    });
                        //});
                        $.ajax({
                            url:cityUrl,
                            dataType:"script",
                            success:function (script, textStatus, jqXHR) {
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
                                        var citytq = "北京";
                                        window.localStorage.setItem("weathercity",citytq);
                                    }
                                }



                                //        citytq = "大理";

                                $(".weathererrstyle").text("获取中！");
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
                                            var img = "<img class='weathericonaaastyle' src='http://i2.sinaimg.cn/dy/main/weather/weatherplugin/wthIco/20_20/" + _f
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
                                    },
                                    error:function(XMLHttpRequest, textStatus, errorThrown){
                                        console.log("天气报错了");
                                        console.log(XMLHttpRequest, textStatus, errorThrown);
                                        $(".weatherlocationstyle").text(citytq);
                                        $("#weathericon").html("");
                                        $(".weathercontentt").html("");
                                        $(".weatherweathercontent").text("");
                                        $(".weathercontentwind").html("");
                                        $(".changelocationtext").val("");
                                        $(".weathererrstyle").css({"display":"block"});
                                        $(".weathererrstyle").text(err);
                                    },
                                    complete: function(XMLHttpRequest, textStatus) {
                                        console.log(111,2222,XMLHttpRequest, textStatus);
                                    }
                                });
                            },
                            error:function(err){
                                citytq = $(".changelocationtext").val();
                                window.localStorage.setItem("weathercity",citytq);
                                $(".weatherlocationstyle").text(citytq);
                                $("#weathericon").html("");
                                $(".weathercontentt").html("");
                                $(".weatherweathercontent").text("");
                                $(".weathercontentwind").html("");
                                $(".weathererrstyle").css({"display":"block"});
                                $(".weathererrstyle").text("网络连接失败！");
                                $(".changelocationtext").val("");
                            }
                        })
                    }else {
                        //$(".weatherlocationstyle").text(citytq);
                        $("#weathericon").html("");
                        $(".weathercontentt").html("");
                        $(".weatherweathercontent").text("");
                        $(".weathercontentwind").html("");
                        $(".weathererrstyle").css({"display":"block"});
                        $(".weathererrstyle").text("地址长度大于8位，请您重新确认！");
                        $(".changelocationtext").val("");
                    }


                };

                //scope.$on('$stateChangeStart',
                //
                //    function(event, toState, toParams, fromState, fromParams){
                //        console.log("toState:"+JSON.stringify(toState));
                //        console.log("toParams:"+JSON.stringify(toParams));
                //        console.log("fromState:"+JSON.stringify(fromState));
                //        console.log("fromParams:"+JSON.stringify(fromParams));
                //
                //            //clearInterval(scope.timerr);
                //        $interval.cancel(scope.timerr);
                //        console.log("清除定时器");
                //        //}
                //
                //    });
                //function homeweatherinit(){
                //    var cityUrl = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js';
                //    $.ajax({
                //
                //        url:cityUrl,
                //
                //        success:function (script, textStatus, jqXHR) {
                //        // 获取城市
                //        if(window.localStorage.getItem("weathercity")){
                //            if($(".changelocationtext").val()){
                //                citytq = $(".changelocationtext").val();
                //                window.localStorage.setItem("weathercity",citytq);
                //            }else {
                //                citytq = window.localStorage.getItem("weathercity");
                //            }
                //        }else{
                //            if(remote_ip_info.city){
                //                var citytq = remote_ip_info.city;
                //                window.localStorage.setItem("weathercity",citytq);
                //            }else {
                //                var citytq = "北京"
                //                window.localStorage.setItem("weathercity",citytq);
                //            }
                //        }
                //
                //
                //
                //        //        citytq = "大理";
                //        var url = "http://php.weather.sina.com.cn/iframe/index/w_cl.php?code=js&city=" + citytq + "&day=0&dfc=3";
                //        $.ajax({
                //            url: url,
                //            dataType: "script",
                //            scriptCharset: "gbk",
                //            success: function (data) {
                //                console.log(data);
                //                try {
                //                    var _w = window.SWther.w[citytq][0];
                //                    $(".weatherlocationstyle").text(citytq);
                //
                //                    console.log(_w);
                //                    var _f = _w.f1 + "_0.png";
                //                    if (new Date().getHours() > 17) {
                //                        _f = _w.f2 + "_1.png";
                //                    }
                //                    var img = "<img width='56px' src='http://i2.sinaimg.cn/dy/main/weather/weatherplugin/wthIco/20_20/" + _f
                //                        + "' />";
                //                    //var tq = "今日天气 :　" + citytq + " " + img + " " + _w.s1 + " " + _w.t1 + "℃～" + _w.t2 + "℃ " + _w.d1 + _w.p1 + "级";
                //                    //$('#weather').html(tq);
                //                    $("#weathericon").html(img);
                //                    $(".weathercontentt").html(_w.t1+"～"+_w.t2+"℃");
                //                    $(".weatherweathercontent").text(_w.s1);
                //                    $(".weathercontentwind").html(_w.d1 + _w.p1 + "级");
                //                    $(".weathererrstyle").css({"display":"none"});
                //                    $(".changelocationtext").val("");
                //                }catch (err){
                //                    $(".weatherlocationstyle").text(citytq);
                //                    $("#weathericon").html("");
                //                    $(".weathercontentt").html("");
                //                    $(".weatherweathercontent").text("");
                //                    $(".weathercontentwind").html("");
                //                    $(".weathererrstyle").css({"display":"block"});
                //                    $(".weathererrstyle").text("查询不到该地址的天气信息，请您重新确认！");
                //                    $(".changelocationtext").val("");
                //                }
                //                //if(window.SWther.w[citytq][0]){
                //
                //                //}else {
                //
                //                //}
                //
                //                //scope.weatherinfos1 = _w.s1;
                //                //scope.weatherwind= _w.d1 + _w.p1 + "级";
                //            },
                //            error:function(err){
                //                $(".weatherlocationstyle").text(citytq);
                //                $("#weathericon").html("");
                //                $(".weathercontentt").html("");
                //                $(".weatherweathercontent").text("");
                //                $(".weathercontentwind").html("");
                //                $(".changelocationtext").val("");
                //                $(".weathererrstyle").css({"display":"block"});
                //                $(".weathererrstyle").text(err);
                //            }
                //        });
                //    }
                //    });
                //};
                if($location.path() == "/mains/home"){
                    homeweatherinit();
                    console.log("当前路由对的");
                }
            }
            //controller: function () {
            //
            //}

        }
    }])

