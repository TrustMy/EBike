/**
 * Created by Administrator on 2016/8/12.
 */
//(function (doc, win) {
//    var docEl = doc.documentElement || doc.body,
//        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//        recalc = function () {
//            var clientWidth = docEl.clientWidth;
//            if (!clientWidth) return;
//            docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
//        };
//    if (!doc.addEventListener) return;
//    win.addEventListener(resizeEvt, recalc, false);
//    doc.addEventListener('DOMContentLoaded', recalc, false);
//
//})(document, window);
(function (win) {
    // html根元素
    var HTML_ELEMENT = document.documentElement;
    // 屏幕宽度
    var SCREEN_WIDTH = 0;
    // 标准fontSize计算值
    var BASE_FONT_SIZE = 0;
    // 处理后的fontSize计算值
    var REAL_BASE_FONT_SIZE = 0;
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

    /**
     * 修复异常的fontSize代码
     */
    var fix = function () {
        var ua = navigator.userAgent;
        var isIOS = /(iPhone|iPad|iPod)/.test(ua);
        // 非苹果设备，均进行检测
        if (!isIOS) {
            var elem1 = document.getElementById("all_content");
            //var div = win.document.createElement('div');
            elem1.style.width = '16rem';
            //win.document.body.appendChild(div);
            win.setTimeout(function () {
                var styleele = window.getComputedStyle(elem1, null)
                var getWidth = parseFloat(styleele.width);
                if (getWidth > SCREEN_WIDTH) {
                    // 此时是出问题的情况
                    var ratio = getWidth / SCREEN_WIDTH;
                    REAL_BASE_FONT_SIZE = (BASE_FONT_SIZE / ratio).toFixed(4);
                    HTML_ELEMENT.style.fontSize = REAL_BASE_FONT_SIZE + 'px';
                }
                //div.remove();
            }, 100);
        }
    };

    /**
     * 调整根元素fontSize
     */
    var setBaseFontSize = function () {
        // 获取屏幕宽度
        SCREEN_WIDTH = HTML_ELEMENT.clientWidth;
        // 将屏幕分成10份，获取每一份宽度
        BASE_FONT_SIZE = SCREEN_WIDTH / 16;
        // 写入html元素fontSize
        HTML_ELEMENT.style.fontSize = BASE_FONT_SIZE + 'px';
        fix();
    };

    /**
     *手机旋转控制
     */
        //var tid;
        //if (win.onorientationchange) {
        //    win.onorientationchange = function () {
        //        clearTimeout(tid);
        //        tid = setTimeout(function () {
        //            setBaseFontSize();
        //        }, 300);
        //    }
        //} else {
        //    win.onresize = function () {
        //        clearTimeout(tid);
        //        tid = setTimeout(function () {
        //            setBaseFontSize();
        //        }, 300);
        //    };
        //}
    setBaseFontSize();
    win.addEventListener(resizeEvt, setBaseFontSize, false);
    //doc.addEventListener('DOMContentLoaded', recalc, false);
})(window);
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



