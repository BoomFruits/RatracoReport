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
            .state('app.DT01', {
                url: '/DT01',
                abstract: true,
                templateUrl: helper.basepath('DT01.html'),
                resolve: helper.resolveFor('loaders.css', 'isteven-multi-select', 'file-saver', 'fastclick', 'modernizr', 'icons', 'screenfull', 'animo', 'sparklines', 'slimscroll', 'classyloader', 'spinkit', 'toaster', 'whirl', 'oitozero.ngSweetAlert', 'textAngular', 'angularBootstrapNavTree')
            })
            .state('app.DT01.DT01B', {
                url: '/DT01B',
                title: 'Báo cáo tiền thu bán hàng',
                controller: 'DT01BController',
                templateUrl: helper.basepath('DT01/DT01B.html'),
                resolve: helper.resolveAuthFor()
            })
            .state('app.DT01.DT01BV', {
                url: '/DT01BV',
                title: 'Báo cáo tiền thu bán vé',
                controller: 'DT01BVController',
                templateUrl: helper.basepath('DT01/DT01BV.html'),
                resolve: helper.resolveAuthFor()
            })
            .state('app.DT01.DT01BD', {
                url: '/DT01BD',
                title: 'Báo cáo tiền thu bán dịch vụ',
                controller: 'DT01BDController',
                templateUrl: helper.basepath('DT01/DT01BD.html'),
                resolve: helper.resolveAuthFor()
            })
            .state('app.DT01.DT01BVA', {
                url: '/DT01BVA',
                title: 'Báo cáo tách thuế vé trả',
                controller: 'DT01BVAController',
                templateUrl: helper.basepath('DT01/DT01BVA.html'),
                resolve: helper.resolveAuthFor()
            })
            .state('app.DT01.DT01B1', {
                url: '/DT01B1',
                title: 'Báo cáo tiền thu tự bán',
                controller: 'DT01B1Controller',
                templateUrl: helper.basepath('DT01/DT01B1.html'),
                resolve: helper.resolveAuthFor()
            })
            .state('app.DT01.DT01B2', {
                url: '/DT01B2',
                title: 'Báo cáo tiền thu bán hộ',
                controller: 'DT01B2Controller',
                templateUrl: helper.basepath('DT01/DT01B2.html'),
                resolve: helper.resolveAuthFor()
            })
            .state('app.DT01.DT01LV', {
                url: '/DT01LV',
                title: 'Báo cáo bán vé liên vận quốc tế',
                controller: 'DT01LVController',
                templateUrl: helper.basepath('DT01/DT01LV.html'),
                resolve: helper.resolveAuthFor()
            })
        ;

    } // routesConfig

})();
