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
    .directive('lunbo', ["registerService",function (registerService) {
        return{
            restrict:'EA',
            scope:{},
            link: function (scope, element, attr) {
                var step=0;
                var ischange = false;
                scope.flag=false;
                currentPic();
                var timer;
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

                function changePic(){
                    //element.find(".picstyle").animate({left:"16rem"},1000);.siblings().css({left:"16rem"})

                    step++;
                    step=step%3;
                    element.find(".pointstyle").css({"background":"#eee"});
                    console.log();
                    element.find(".picstyle").eq(step).stop().animate({left:0},200,function(){
                        element.find(".picstyle").eq(step).siblings().css({left:"16rem"});
                        element.find(".autoPointall").css({left:0});
                    });
                    element.find(".pointstyle").eq(step).css({"background":"#f39900"});

                };
                function currentPic(){
                    //element.find(".picstyle").animate({left:"16rem"},1000);
                    element.find(".pointstyle").css({"background":"#eee"});
                    element.find(".picstyle").eq(step).animate({left:0},500,function(){
                        element.find(".picstyle").eq(step).siblings().css({left:"16rem"});
                        element.find(".autoPointall").css({left:0});
                    });
                    element.find(".pointstyle").eq(step).css({"background":"#f39900"});
                }
                function turncurrentPic(){
                    element.find(".pointstyle").css({"background":"#eee"});
                    element.find(".picstyle").eq(step).animate({left:0},500,function(){
                        element.find(".picstyle").eq(step).siblings().css({left:"-16rem"});
                        element.find(".autoPointall").css({left:0});
                    });
                    element.find(".pointstyle").eq(step).css({"background":"#f39900"});
                }
                 timer = setInterval(
                    changePic
                ,5000);
                element.bind('touchstart',touchStart);
                element.bind('touchend',touchend);
                element.bind('touchmove',function(){
                    ischange = true;

                });
                function touchStart(e){
                    e = e || window.event;
                    clearInterval(timer);
                    ischange = false;
                    e.preventDefault();
                    //var point = e.targetTouches[0]. : e;
                    console.log(e);
                    console.log(e.originalEvent.targetTouches[0].pageX);
                    x = e.originalEvent.targetTouches[0].pageX;
                    console.log(x);
                    //y = e.touches[0].pageY;
                }
                function touchend(e){
                    //console.log(2);
                    console.log(ischange);
                    if (ischange){
                        e.preventDefault();
                        //var point = e.touches ? e.touches[0] : e;
                        var n =  parseFloat(e.originalEvent.changedTouches[0].pageX - x);
                        console.log("n:"+n);
                        if(n>30){
                            step--;
                            if(step == -1){
                                step = 2;
                                console.log("step==2")
                            }
                            turncurrentPic();
                            timer = setInterval(
                                changePic
                            ,2000);
                            return step;
                        }else
                        if(n<-30){
                            step +=1;
                            if(step == 3){
                                step = 0;
                                console.log("step==0")
                            }
                            console.log("step:"+step)
                            currentPic();
                            timer = setInterval(
                                changePic
                            ,5000);
                            return step;
                        }else{
                            timer = setInterval(
                                changePic
                            ,5000);
                        }

                    }else{
                       timer =  setInterval(
                            changePic
                        ,5000);
                    }
                }
                //registerService.touchautochange(scope.step,timer,currentPic,changePic);
            }
        }
    }])

