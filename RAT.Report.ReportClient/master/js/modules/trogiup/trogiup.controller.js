/**=========================================================
 * Module: datatable,js
 * Angular Datatable controller
 =========================================================*/

(function() {
    'use strict';

    var app = angular.module('app.trogiup');
    app.controller('TroGiupCtrl', ['$scope', '$filter', 'ENV', function ($scope, $filter, ENV) {
        $scope.DateTimeNow = $filter('date')(new Date(), "dd/MM/yyyy HH:mm:ss");
        
    }]);
})();
