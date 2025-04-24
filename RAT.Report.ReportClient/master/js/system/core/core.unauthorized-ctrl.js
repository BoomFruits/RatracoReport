/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/

(function() {
    'use strict';

    var app = angular.module('app.core');
    app.controller('UnauthorizedCtrl', ['$scope', '$location', '$uibModalInstance', 'ENV', 'localDataService', 'Message', 'MessageDetail', function ($scope, $location, $modalInstance, ENV, localDataService, Message, MessageDetail) {
        $scope.Message = Message;
        $scope.MessageDetail = MessageDetail;
        $scope.closeAndGotoLogin = function () {
            localDataService.set('logon_return_url', encodeURIComponent(window.location.href));
            var returnUrl = window.location.origin + '/#/page/atoken';
            $modalInstance.close(ENV.urlShareTokenSso + '?r=' + encodeURIComponent(returnUrl));
            /*
            var str = new String(Math.random());
            var id = str.substr(str.indexOf(".")+1);
            xdLocalStorage.setItem('url_' + id, encodeURIComponent(window.location.href), true).then(function () {
                $scope.isDisabledBtnLogin = false;
                $modalInstance.close(ENV.urlLoginSso + '/' + id);
            });
            $scope.isDisabledBtnLogin = true;
            */
        }
        $scope.closeAndGotoLogin2f = function () {
            localDataService.set('logon_return_url', encodeURIComponent(window.location.href));
            var returnUrl = window.location.origin + '/#/page/atoken';
            $modalInstance.close(ENV.urlShareTokenSsoTwoFactor + '?r=' + encodeURIComponent(returnUrl));
            /*
            var str = new String(Math.random());
            var id = str.substr(str.indexOf(".") + 1);
            xdLocalStorage.setItem('url_' + id, encodeURIComponent(window.location.href), true).then(function () {
                $scope.isDisabledBtnLogin = false;
                $modalInstance.close(ENV.urlLoginSsoTwoFactor + '/' + id);
            });
            $scope.isDisabledBtnLogin = true;
            */
        }
        $scope.close = function () {
            $modalInstance.close(false);
        }
    }]);
})();