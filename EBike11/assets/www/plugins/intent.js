    cordova.define("org.apache.cordova.intent", function(require, exports, module) {

    var exec = require('cordova/exec');



    var test = {

        /**
         * 一共5个参数
           第一个 :成功会掉
           第二个 :失败回调
           第三个 :将要调用的类的配置名字(在config.xml中配置 稍后在下面会讲解)
           第四个 :调用的方法名(一个类里可能有多个方法 靠这个参数区分)
           第五个 :传递的参数  以json的格式
         */
        toMap: function(message,length,mills) {
             exec(function(succseeMsg){ // 成功的回调方法
//                            alert(succseeMsg);
                        }, null, "Hub", "MapActivity", [message]);
        },

        toHistory: function(message,length,mills) {
                     exec(function(succseeMsg){ // 成功的回调方法
//                                    alert(succseeMsg);
                                }, null, "Hub", "GPSHistoryActivity", [message]);
                },
          toDelete: function(message,length,mills) {
                              exec(function(succseeMsg){ // 成功的回调方法
         //                                    alert(succseeMsg);
                                         }, null, "Hub", "Delete", [message]);
                         },
         toPush: function(message,length,mills) {
                                exec(function(succseeMsg){ // 成功的回调方法
                  //                                    alert(succseeMsg);
                                          }, null, "Hub", "Push", [message]);
                            },


    };




        module.exports = test;

    });