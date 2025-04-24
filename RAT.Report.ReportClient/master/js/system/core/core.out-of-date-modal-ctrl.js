/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/

(function() {
    'use strict';

    var app = angular.module('app.core');
    app.controller('VersionOutOfDateModalController', ['$rootScope', '$scope', '$uibModalInstance', 'oldVersion', 'newVersion', function ($rootScope, $scope, $modalInstance, oldVersion, newVersion) {
        $scope.oldVersion = oldVersion;
        $scope.newVersion = newVersion;
        $rootScope.isOpenedVersionOutOfDateModal = true;
        $scope.close = function () {
            $rootScope.isOpenedVersionOutOfDateModal = false;
            $modalInstance.close();
        };
        $scope.reload = function () {
            if (window.location.href.indexOf('sorry.html') != -1) {
                window.location.href = "/";
            } else {
                window.location.reload(true);
            }
        }
    }]);
})();