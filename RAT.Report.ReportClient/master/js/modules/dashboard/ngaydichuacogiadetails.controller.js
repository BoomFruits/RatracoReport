(function() {
    'use strict';

    var app = angular.module('app.dashboard');
    app.controller('ModalNgayDiChuaCoGiaDetailsController', ModalNgayDiChuaCoGiaDetailsController);

    ModalNgayDiChuaCoGiaDetailsController.$inject = ['$scope', '$uibModalInstance', 'DashboardService', 'input'];
    function ModalNgayDiChuaCoGiaDetailsController($scope, $uibModalInstance, DashboardService, input) {

        $scope.input = input;
        $scope.isLoaded = false;
        $scope.items = [];
        DashboardService.GetDSNgayDiChuaCoGiaDetails(input).then(function (res) {
            $scope.items = res.Data;
            $scope.isLoaded = true;
        });

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();