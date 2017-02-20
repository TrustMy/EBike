angular.module("myApp",["ui.router","app.demo.controllers","app.demo.service","app.demo.directions","app.demo.filters","materialDatePicker"]).//,"ionic.demo.config","ionic.demo.services"
    config(function($stateProvider,$urlRouterProvider,$httpProvider){
        //$httpProvider.defaults.withCredentials = true;
        $urlRouterProvider.otherwise("submits");
        $stateProvider.state("submits",{
            url:"/submits",
            templateUrl:"submit.html",
            controller:"submitsController"
        }).state("searchp",{
            url:"/searchp",
            templateUrl:"searchPass.html",
            controller:"searchPassController"
        }).state("registers",{
            url:"/regs",
            templateUrl:"register.html",
            controller:"registercontroller"
        }).state("codenewpass",{
            url:"/codenewpass",
            templateUrl:"verCodeNewPass.html",
            controller:"verCodeNewPassController"
        })
            .state("vehiclebind",{
            url:"/vehiclebind",
            templateUrl:"vehicleBind.html",
            controller:"vehiclebindController"
        })
            .state("mains",{
            url:"/mains",
            templateUrl:"mains.html",
            controller:"mainsController"
        }).state("mains.home",{
            url:"/home",
            views:{
                'tab-main':{
                    templateUrl:"app/views/main.home.html",
                    controller:"homeController"
                }
            }
        }).state("mains.home.cartripInformation",{
                url:"/cartripInformation",
                views:{
                    'tab-home':{
                        templateUrl:"app/views/main.home.cartripInformation.html",
                        controller:"cartripController"
                    }
                }
            })
            //.state("mains.home.cartripInformation.tripmap",{
            //    url:"/tripmap",
            //    views:{
            //        'tab-cartrip':{
            //            templateUrl:"app/views/main.home.cartripformation.tripmap.html",
            //            controller:"cartripmapController"
            //        }
            //    }
            //})
            .state("mains.home.vehicleStatus",{
                url:"/vehicleStatus",
                views:{
                    'tab-home':{
                        templateUrl:"app/views/main.home.vehicleStatus.html",
                        controller:"vehicleStatusController"

                    }
                }
            })
            //.state("mains.home.searchCar",{
            //    url:"/searchCar",
            //    views:{
            //        'tab-home':{
            //            templateUrl:"app/views/main.home.searchCar.html",
            //            controller:"searchCarController"
            //        }
            //    }
            //})
            .state("mains.home.alarmRecord",{
                url:"/homeWarning",
                views:{
                    'tab-home':{
                        templateUrl:"app/views/main.home.alarmRecord.html",
                        controller:"alarmrecordController"
                    }
                }
            })
            .state("mains.home.serviceHelp",{
                url:"/serviceHelp",
                views:{
                    'tab-home':{
                        templateUrl:"app/views/main.home.serviceHelp.html",
                        controller:"serviceHelpController"
                    }
                }
            }).state("mains.vehicle",{
            url:"/vehicle",
            views:{
                'tab-main':{
                    templateUrl:"app/views/main.vehicle.html",
                    controller:"vehicleController"
                }
            }
        }) .state("mains.mine",{
            url:"/mine",
            views:{
                'tab-main':{
                    templateUrl:"app/views/main.mine.html",
                    controller:"mineController"
                }
            }
        })
            .state("mains.mine.changePass",{
            url:"/changePass",
            views:{
                'tab-mine':{
                    templateUrl:"app/views/main.mine.changePass.html",
                    controller:"changePassController"

                }
            }
        })
            .state("mains.mine.changenickname",{
            url:"/personInfo",
            views:{
                'tab-mine':{
                    templateUrl:"app/views/main.mine.changenickname.html",
                    controller:"changeNickController"

                }
            }
        })
            .state("mains.mine.unbundling",{
                url:"/unbundling",
                views:{
                    'tab-mine':{
                        templateUrl:"app/views/main.mine.unbundling.html",
                        controller:"unbundlingController"

                    }
                }
            }).state("mains.mine.initMileage",{
            url:"/initMileage",
            views:{
                'tab-mine':{
                    templateUrl:"app/views/main.mine.initMileage.html"
                }
            }
        }).state("mains.mine.vechileCheckup",{
            url:"/vechileCheckup",
            views:{
                'tab-mine':{
                    templateUrl:"app/views/main.mine.vechileCheckup.html"
                }
            }
        }).state("mains.mine.aboutMine",{
            url:"/aboutMine",
            views:{
                'tab-mine':{
                    templateUrl:"app/views/main.mine.aboutMine.html"
                }
            }
        }).state("mains.mine.versionInfo",{
            url:"/versionInfo",
            views:{
                'tab-mine':{
                    templateUrl:"app/views/main.mine.versionInfo.html"
                }
            }
        })
    });
