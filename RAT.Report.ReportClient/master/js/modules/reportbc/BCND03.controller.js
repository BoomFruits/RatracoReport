(function () {
    'use strict';
    var app = angular.module('app.reportbc');
    app.controller('BCND03Controller', ['$scope', '$filter', '$q', '$uibModal', '$rootScope', 'msgService', 'DanhMucService', 'ReportBCService', 'ENV'
      , function ($scope, $filter, $q, $uibModal,$rootScope, msgService, DanhMucService, ReportBCService, ENV) {

    var DateNow = new Date($filter('date')($rootScope.$settings.TimeServer, 'yyyy-MM-dd'));
    $scope.input = {
      Ngay_BatDau: new Date(DateNow.getFullYear(), DateNow.getMonth(), 1, 0, 0, 0),
      Ngay_KetThuc: new Date(DateNow),
    };
        $q.all([DanhMucService.GetAllZone(),DanhMucService.GetAllLoaiHinhVC()]).then(function (res) {
          $scope.listGa = $filter('filter')(res[0], { LoaiZone: 1 },true);
          $scope.listLoaiHinhVC = res[1];
         
        });
        $scope.setButton = function (button) {
            if ($scope.reportForm.$valid) {
                $scope.button = button;
            }
        }

        $scope.report = { };
        $scope.renderReport = function () {
            if ($scope.reportForm.$valid && !$scope.loading) {
                var input = {
                    TuNgay: $filter('date')($scope.input.Ngay_BatDau, 'yyyy-MM-dd'),
                    DenNgay: $filter('date')($scope.input.Ngay_KetThuc, 'yyyy-MM-dd'),
                    GaDongID: $scope.input.GaDongItem ? $scope.input.GaDongItem.GaID : null,
                    TenGaDong: $scope.input.GaDongItem ? $scope.input.GaDongItem.TenZone : null,
                    GaTraID: $scope.input.GaTraItem ? $scope.input.GaTraItem.GaID : null,
                    TenGaTra: $scope.input.GaTraItem ? $scope.input.GaTraItem.TenZone : null,
                    MaLoaiHinhVC: $scope.input.LoaiHinhVCItem ? $scope.input.LoaiHinhVCItem.MaLoaiHinhVC : null,
                }

                if ($scope.button == 'report') {
                  ReportBCService.Invoke('BCND03', input).then(function (res) {
                        $scope.report = res;
                        $scope.loading = false;
                        $scope.submited = true;
                    }, function () {
                        $scope.loading = false;
                        $scope.submited = true;
                        $scope.report = { Data: [] };
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                } else {
                  ReportBCService.InvokeBlob('BCND03Excel', input).then(function (res) {
                        if (res) {
                            saveAs(res.Blob, res.Filename);
                        }
                        $scope.loading = false;
                        msgService.showSuccess('Đã xuất excel thành công.');
                    }, function () {
                        $scope.loading = false;
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                }
                $scope.loading = true;
            }
        };
       
        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };

      
  }]);
})();
