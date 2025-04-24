(function() {
    'use strict';

    var app = angular.module('app.dashboard');
    app.controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$q', '$state', '$timeout', 'authService', 'UserService', 'DashboardService', 'DanhMucService'];
    function HomeController($scope, $q, $state, $timeout, authService, UserService, DashboardService, DanhMucService) {
        // If did not login, goto welcome page
        //if (!authService.authentication.isAuth) {
        //    $state.go('page.welcome');d
        //    return;
        //}

        
    }
})();