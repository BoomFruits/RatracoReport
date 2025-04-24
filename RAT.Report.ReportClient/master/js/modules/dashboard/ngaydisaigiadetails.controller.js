(function() {
    'use strict';

    var app = angular.module('app.dashboard');
    app.controller('NgayDiSaiGiaDetailsController', NgayDiSaiGiaDetailsController);

    NgayDiSaiGiaDetailsController.$inject = ['$scope', '$uibModalInstance', 'DashboardService', 'input'];
    function NgayDiSaiGiaDetailsController($scope, $uibModalInstance, DashboardService, input) {

        $scope.input = input;
        $scope.isLoaded = false;
        $scope.items = [];
        DashboardService.GetDSNgayDiSaiGiaDetails(input).then(function (items) {
            $scope.items = items;
            $scope.isLoaded = true;
        });

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();