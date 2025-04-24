(function () {
    'use strict';
    var app = angular.module('app.danhmuc');
    app.controller('ModalTreeDonViController', ['$scope', '$timeout', '$uibModalInstance', 'DanhMucService', 'configs', function ($scope, $timeout, $uibModalInstance, DanhMucService, configs) {

        $scope.donVis = [];
        var input = {
            MaDV: configs.root,
            CapQL: configs.capQL > 0 ? configs.capQL : undefined
        }
        console.log('scope.treeDataLevel', configs.capQL);
        DanhMucService.GetTreeDonVi(input).then(function (res) {
            $scope.donVis = res;
            $scope.loaded = true;
        }, function () {
            $scope.donVis = [];
            $scope.loaded = true;
        });
        $scope.expandLevel = configs.expandLevel > 0 ? configs.expandLevel : 1;
        $scope.currentDV = configs.selected ? configs.selected : {};
        $scope.donViTree = {};
        $scope.clickTree = function (donVi) {
            $scope.currentDV = donVi;
        };

        $scope.select = function (donVi) {
            $uibModalInstance.close(donVi);
        }

        $scope.cancel = function () {
            $uibModalInstance.dismiss();
        };
        
    }]);
})();
