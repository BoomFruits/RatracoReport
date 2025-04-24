(function () {
    'use strict';
    var app = angular.module('app.reportbk');
    app.controller('BKTTDH01Controller', ['$scope', '$filter', '$q', '$rootScope', 'msgService', 'DanhMucService', 'ReportBKService', 'ENV'
      , function ($scope, $filter, $q,$rootScope, msgService, DanhMucService, ReportBKService, ENV) {

      var DateNow = new Date($filter('date')($rootScope.$settings.TimeServer, 'yyyy-MM-dd'));
      $scope.input = {
        Ngay_BatDau: new Date(DateNow.getFullYear(), DateNow.getMonth(), 1, 0, 0, 0),
        Ngay_KetThuc: new Date(DateNow),
      };
        $q.all([DanhMucService.GetAllNCC(), DanhMucService.GetAllZone(), DanhMucService.GetAllLoaiTacNghiep()]).then(function (res) {
          $scope.listNCC = res[0];
          $scope.listGa = $filter('filter')(res[1], { LoaiZone: 1 }, true);
          $scope.listLoaiTacNghiep = $filter('filter')(res[2], { MaDichVu: 'DV001' }, true);
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
                    Ngay_BatDau: $filter('date')($scope.input.Ngay_BatDau, 'yyyy-MM-dd'),
                    Ngay_KetThuc: $filter('date')($scope.input.Ngay_KetThuc, 'yyyy-MM-dd'),
                    MaNCC: $scope.input.NCCItem ? $scope.input.NCCItem.MaKH : null,
                    TenNCC: $scope.input.NCCItem ? $scope.input.NCCItem.CustomerName : null,
                    MaGaTN: $scope.input.GaTNItem ? $scope.input.GaTNItem.MaZone : null,
                    TenGaTN: $scope.input.GaTNItem ? $scope.input.GaTNItem.TenZone : null,
                    LoaiTacNghiep: $scope.input.LoaiTacNghiepItem ? $scope.input.LoaiTacNghiepItem.LoaiTacNghiep : null,
                    TenLoaiTacNghiep: $scope.input.LoaiTacNghiepItem ? $scope.input.LoaiTacNghiepItem.TenLoaiTacNghiep : null,
                }
                console.log('input', input);
                
                if ($scope.button == 'report') {
                  ReportBKService.Invoke('BKTTDH01', input).then(function (res) {
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
                  ReportBKService.InvokeBlob('BKTTDH01Excel', input).then(function (res) {
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
