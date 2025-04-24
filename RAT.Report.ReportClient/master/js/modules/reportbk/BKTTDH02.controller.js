(function () {
    'use strict';
    var app = angular.module('app.reportbk');
    app.controller('BKTTDH02Controller', ['$scope', '$filter', '$q', '$rootScope', 'msgService', 'DanhMucService', 'ReportBKService', 'ENV'
      , function ($scope, $filter, $q,$rootScope, msgService, DanhMucService, ReportBKService, ENV) {

      var DateNow = new Date($filter('date')($rootScope.$settings.TimeServer, 'yyyy-MM-dd'));
      $scope.input = {
        Ngay_BatDau: new Date(DateNow.getFullYear(), DateNow.getMonth(), 1, 0, 0, 0),
        Ngay_KetThuc: new Date(DateNow),
      };
        $q.all([DanhMucService.GetAllNCC(), DanhMucService.GetAllZone(), DanhMucService.GetAllKhachHang()]).then(function (res) {
          $scope.listNCC = res[0];
          $scope.listZone = res[1];
          $scope.listKhachHang = res[2];
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
                    MaZoneDi: $scope.input.ZoneDiItem ? $scope.input.ZoneDiItem.MaZone : null,
                    MaZoneDen: $scope.input.ZoneDenItem ? $scope.input.ZoneDenItem.MaZone : null,
                    TenZoneDi: $scope.input.ZoneDiItem ? $scope.input.ZoneDiItem.TenZone : null,
                    TenZoneDen: $scope.input.ZoneDenItem ? $scope.input.ZoneDenItem.TenZone : null,
                    MaKH: $scope.input.KhachHangItem ? $scope.input.KhachHangItem.MaKH : null,
                    LoaiVanChuyen: $scope.input.LoaiVanChuyen ? $scope.input.LoaiVanChuyen : null,
                }

                if ($scope.button == 'report') {
                  ReportBKService.Invoke('BKTTDH02', input).then(function (res) {
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
                  ReportBKService.InvokeBlob('BKTTDH02Excel', input).then(function (res) {
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
