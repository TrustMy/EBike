/**
 * Created by Administrator on 2016/8/12.
 */
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);

})(document, window);
$(function(){
    //var url="http://192.168.1.111:18080/bsWebServer-0.0.1-SNAPSHOT/";
    jQuery.support.cors = true;
    $('#all_content').css("height",window.innerHeight+100);  //强制让内容超过

    window.scrollTo(0, 1);
    console.log(1);

    $("#all_content").css("height",window.innerHeight);  //重置成新高度

    //launchIntoFullscreen(document.documentElement);
    console.log(11111);
    var clearAttrib=function(){
        var oSubWin=window.frames[0];
        if(oSubWin&&oSubWin.top&&oSubWin.parent){
            oSubWin.parent=null;
            oSubWin.top=null;
            window.clearInterval(scanWin);
        }
    }
    var location=""
    var scanWin=window.setTimeout(clearAttrib,1);
    //if($("#gzdiv").css({"display":"none"})){
    //    console.log("yes");
    //}else{
    //    console.log("no");
    //}
    //$(".w").on("click",function(){
    //    console.log("停止");
    //    clearInterval(timer);
    //})
    //mui.oldback = mui.back;
    //var clickNum = 0;
    //mui.back = function(event){
    //    clickNum++;
    //    if(clickNum > 1){
    //        plus.runtime.quit();
    //    }else{
    //        mui.toast("再按一次退出应用");
    //    }
    //    setTimeout(function(){
    //        clickNum = 0
    //    },1000);
    //    return false;
    //}

});

