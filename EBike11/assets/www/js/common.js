/**
 * Created by Administrator on 2016/8/12.
 */
(function (doc, win) {
    var docEl = doc.documentElement || doc.body,
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
    var timerr = null;
    if(timerr){
        clearInterval(timerr);
    }else {

    }
    //var
    $dragBln = false;

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

    })
    $(".main_image").bind("dragstart", function() {
        $dragBln = true;
    });
});


