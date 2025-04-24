/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

(function() {
    'use strict';

    var app = angular.module('app.pages');
    app.controller('WelcomeController', ['$scope', '$state', '$location', 'authService', 'ENV', 'xdLocalStorage', 'localDataService', function ($scope, $state, $location, authService, ENV, xdLocalStorage, localDataService) {
        //$state.go('app.dashboard')
        $scope.isAuth = true;
        $state.go('app.dashboard');

        
        //$scope.isAuth = authService.authentication.isAuth;
        //$scope.tai_khoan_role = false;
        //$scope.dieudologin = 'dd_login_';
        /*if ($scope.isAuth) {
            $state.go('app.dashboard');
            /*
            //check dieu do tuyen
            angular.forEach(authService.authentication.roles, function (item) {
                if (item === 'F08') { //co quyen vao man hinh dieu do tuyen
                //if (item === 'F72') {
                    $scope.tai_khoan_role = true;                   
                }
            });
            if ($scope.tai_khoan_role) {                
                $state.go('app.dieudodashboard');
            }
            else {
                //$state.go('app.logout');
                //redirect sang man hinh tram neu khong phai dieu do tuyen
                window.location.href='http://vtds.vn';
                //$state.go('app.dieudodashboard');
            }
           
            return;
           
        }*/

        $scope.login = function () {
            localDataService.set('logon_return_url', encodeURIComponent(window.location.href));
            var returnUrl = window.location.origin + '/#/page/atoken';
            window.location.href = ENV.urlShareTokenSso + '?r=' + encodeURIComponent(returnUrl);

            /*
            var str = new String(Math.random());
            var id = str.substr(str.indexOf(".") + 1);
            localDataService.set($scope.dieudologin, '1');
            xdLocalStorage.setItem('url_' + id, encodeURIComponent(window.location.href), true).then(function () {
                window.location.href = ENV.urlLoginSso + '/' + id;
            });
            */
        };
    }]);
})();
