/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/


(function () {
    'use strict';

    var app = angular.module('app.routes');
    app.config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];
    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, helper) {

        //
        // Application Routes
        // -----------------------------------
        $stateProvider
            //process
            .state('app.BC', {
                url: '/BC',
                abstract: true,
                templateUrl: helper.basepath('BC.html'),
                resolve: helper.resolveFor('loaders.css', 'isteven-multi-select', 'file-saver', 'fastclick', 'modernizr', 'icons', 'screenfull', 'animo', 'sparklines', 'slimscroll', 'classyloader', 'spinkit', 'toaster', 'whirl', 'oitozero.ngSweetAlert', 'textAngular', 'angularBootstrapNavTree')
            })
            .state('app.BC.BCQLX01', {
                url: '/BCQLX01',
                title: 'Báo cáo hồ sơ kỹ thuật',
                controller: 'BCQLX01Controller',
                templateUrl: helper.basepath('BC/BCQLX01.html'),
                resolve: helper.resolveAuthFor()
            })
            .state('app.BC.BCQLX02', {
                url: '/BCQLX02',
                title: 'Báo cáo sửa chữa toa xe',
                controller: 'BCQLX02Controller',
                templateUrl: helper.basepath('BC/BCQLX02.html'),
                resolve: helper.resolveAuthFor()
            })
            //tram van tai
            .state('app.BC.BCHH01', {
                url: '/BCHH01',
                title: 'Báo cáo tác nghiệp cẩu',
                controller: 'BCHH01Controller',
                templateUrl: helper.basepath('BC/BCHH01.html'),
                resolve: helper.resolveAuthFor()
            })
            .state('app.BC.BCHH02', {
                url: '/BCHH02',
                title: 'Báo cáo tổng hợp SXKD trung tâm',
                controller: 'BCHH02Controller',
                templateUrl: helper.basepath('BC/BCHH02.html'),
                resolve: helper.resolveAuthFor()
            })
            .state('app.BC.BCHH03', {
                url: '/BCHH03',
                title: 'Báo cáo tổng hợp sản lượng xếp dỡ TTVT',
                controller: 'BCHH03Controller',
                templateUrl: helper.basepath('BC/BCHH03.html'),
                resolve: helper.resolveAuthFor()
            })
             //trung tam noi dia
            .state('app.BC.BCND01', {
              url: '/BCND01',
              title: 'Báo cáo tổng hợp doanh thu',
              controller: 'BCND01Controller',
              templateUrl: helper.basepath('BC/BCND01.html'),
              resolve: helper.resolveAuthFor()
            })
             .state('app.BC.BCND02', {
               url: '/BCND02',
               title: 'Báo cáo doanh thu và sản lượng theo khách hàng',
               controller: 'BCND02Controller',
               templateUrl: helper.basepath('BC/BCND02.html'),
               resolve: helper.resolveAuthFor()
             })
             .state('app.BC.BCND03', {
               url: '/BCND03',
               title: 'Báo cáo doanh thu theo người quản lý',
               controller: 'BCND03Controller',
               templateUrl: helper.basepath('BC/BCND03.html'),
               resolve: helper.resolveAuthFor()
             })
             .state('app.BC.BCND04', {
               url: '/BCND04',
               title: 'Báo cáo sản lượng khách hàng theo tháng',
               controller: 'BCND04Controller',
               templateUrl: helper.basepath('BC/BCND04.html'),
               resolve: helper.resolveAuthFor()
             })
             //trung tâm lvqt
             .state('app.BC.BCLV01', {
               url: '/BCLV01',
               title: 'Báo cáo tổng hợp vận tải quốc tế',
               controller: 'BCLV01Controller',
               templateUrl: helper.basepath('BC/BCLV01.html'),
               resolve: helper.resolveAuthFor()
             })
             .state('app.BC.BCLV02', {
               url: '/BCLV02',
               title: 'Báo cáo chi tiết doanh thu - sản lượng quốc tế',
               controller: 'BCLV02Controller',
               templateUrl: helper.basepath('BC/BCLV02.html'),
               resolve: helper.resolveAuthFor()
             })
             //trung tâm dh
             .state('app.BC.BCDH01', {
               url: '/BCDH01',
               title: 'Báo cáo tình hình vận dụng Container',
               controller: 'BCDH01Controller',
               templateUrl: helper.basepath('BC/BCDH01.html'),
               resolve: helper.resolveAuthFor()
             })
             .state('app.BC.BCDH02', {
               url: '/BCDH02',
               title: 'Báo cáo đọng Container',
               controller: 'BCDH02Controller',
               templateUrl: helper.basepath('BC/BCDH02.html'),
               resolve: helper.resolveAuthFor()
             })
             // ban dieu hanh
             .state('app.BC.BCQT01', {
               url: '/BCQT01',
               title: 'Báo cáo tổng hợp kết quả vận tải',
               controller: 'BCQT01Controller',
               templateUrl: helper.basepath('BC/BCQT01.html'),
               resolve: helper.resolveAuthFor()
             })
             .state('app.BC.BCQT02', {
               url: '/BCQT02',
               title: 'Báo cáo kết quả vận tải theo tàu',
               controller: 'BCQT02Controller',
               templateUrl: helper.basepath('BC/BCQT02.html'),
               resolve: helper.resolveAuthFor()
             })
             .state('app.BC.BCQT022', {
               url: '/BCQT02/{mactau}/{t1}/{t2}',
               title: 'Báo cáo kết quả vận tải theo tàu',
               controller: 'BCQT02Controller',
               templateUrl: helper.basepath('BC/BCQT02.html'),
               resolve: helper.resolveAuthFor()
             })
             .state('app.BC.BCQT03', {
               url: '/BCQT03',
               title: 'Báo cáo tổng hợp tình hình xếp dỡ',
               controller: 'BCQT03Controller',
               templateUrl: helper.basepath('BC/BCQT03.html'),
               resolve: helper.resolveAuthFor()
             })
             .state('app.BC.BCQT04', {
               url: '/BCQT04',
               title: 'Báo cáo chi tiết dịch vụ ngoài vận tải',
               controller: 'BCQT04Controller',
               templateUrl: helper.basepath('BC/BCQT04.html'),
               resolve: helper.resolveAuthFor()
             })
        ;

    } // routesConfig

})();
