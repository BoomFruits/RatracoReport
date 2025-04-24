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
            .state('app.BK', {
                url: '/BK',
                abstract: true,
                templateUrl: helper.basepath('BK.html'),
                resolve: helper.resolveFor('loaders.css', 'isteven-multi-select', 'file-saver', 'fastclick', 'modernizr', 'icons', 'screenfull', 'animo', 'sparklines', 'slimscroll', 'classyloader', 'spinkit', 'toaster', 'whirl', 'oitozero.ngSweetAlert', 'textAngular', 'angularBootstrapNavTree')
            })
            .state('app.BK.BK01', {
              url: '/BK01',
                title: 'Báo cáo doanh thu booking',
                controller: 'BK01Controller',
                templateUrl: helper.basepath('BK/BK01.html'),
                resolve: helper.resolveAuthFor()
            })
          //TTDH
            .state('app.BK.BKTTDH01', {
              url: '/BKTTDH01',
              title: 'Bảng kê đối chiếu chi trả nhà cung cấp dịch vụ cẩu',
              controller: 'BKTTDH01Controller',
              templateUrl: helper.basepath('BK/BKTTDH01.html'),
              resolve: helper.resolveAuthFor()
            })
             .state('app.BK.BKTTDH02', {
               url: '/BKTTDH02',
               title: 'Bảng kê đối chiếu chi trả nhà cung cấp dịch vụ vận chuyển đường bộ',
               controller: 'BKTTDH02Controller',
               templateUrl: helper.basepath('BK/BKTTDH02.html'),
               resolve: helper.resolveAuthFor()
             })
            
             .state('app.BK.BKTTDH03', {
               url: '/BKTTDH03',
               title: 'Bảng kê đối chiếu chi trả nhà cung cấp dịch vụ vận chuyển đường sắt',
               controller: 'BKTTDH03Controller',
               templateUrl: helper.basepath('BK/BKTTDH03.html'),
               resolve: helper.resolveAuthFor()
             })
             .state('app.BK.BKTTDH04', {
               url: '/BKTTDH04',
               title: 'Bảng kê đối chiếu chi trả nhà cung cấp dịch vụ vận chuyển đường biển',
               controller: 'BKTTDH04Controller',
               templateUrl: helper.basepath('BK/BKTTDH04.html'),
               resolve: helper.resolveAuthFor()
             })
             .state('app.BK.BKTTDH05', {
               url: '/BKTTDH05',
               title: 'Bảng kê đối chiếu chi trả nhà cung cấp dịch vụ hỗ trợ vận tải',
               controller: 'BKTTDH05Controller',
               templateUrl: helper.basepath('BK/BKTTDH05.html'),
               resolve: helper.resolveAuthFor()
             })

      //TTVTND
             .state('app.BK.BKTTVTND01', {
               url: '/BKTTVTND01',
               title: 'Bảng kê đối chiếu thu cước khách hàng vận tải nội địa',
               controller: 'BKTTVTND01Controller',
               templateUrl: helper.basepath('BK/BKTTVTND01.html'),
               resolve: helper.resolveAuthFor()
             })
       //TTVTHH
             .state('app.BK.BKTram01', {
               url: '/BKTram01',
               title: 'Bảng kê sản lượng xếp dỡ',
               controller: 'BKTram01Controller',
               templateUrl: helper.basepath('BK/BKTram01.html'),
               resolve: helper.resolveAuthFor()
             })
           
        ;

    } // routesConfig

})();
