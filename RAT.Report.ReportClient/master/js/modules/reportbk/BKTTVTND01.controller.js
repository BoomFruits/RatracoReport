(function () {
    'use strict';
    var app = angular.module('app.reportbk');
    app.controller('BKTTVTND01Controller', ['$scope', '$filter', '$q','$rootScope', 'msgService', 'DanhMucService', 'ReportBKService', 'ENV'
      , function ($scope, $filter, $q,$rootScope, msgService, DanhMucService, ReportBKService, ENV) {
    var DateNow = new Date($filter('date')($rootScope.$settings.TimeServer, 'yyyy-MM-dd'));
    $scope.input = {
      Ngay_BatDau: new Date(DateNow.getFullYear(), DateNow.getMonth(), 1, 0, 0, 0),
      Ngay_KetThuc: new Date(DateNow),
    };
    $q.all([DanhMucService.GetAllKhachHang(), DanhMucService.GetAllZone(), DanhMucService.GetAllHangHoa(), DanhMucService.GetAllDonViTinh()]).then(function (res) {
      $scope.listKhachHang = res[0];
      $scope.listGa = $filter('filter')(res[1], { LoaiZone: 1 }, true);
      $scope.listKho = $filter('filter')(res[1], { LoaiZone: 0 }, true);
      $scope.listHangHoa = res[2];
      $scope.listDVT = res[3];
      });
        
     
        $scope.setButton = function (button) {
            if ($scope.reportForm.$valid) {
                $scope.button = button;
            }
        }

        $scope.report = { };
        $scope.renderReport = function () {
          console.log('abc');
            if ($scope.reportForm.$valid && !$scope.loading) {
              var input = {
                    MaKH: $scope.input.KhachHangItem? $scope.input.KhachHangItem.MaKH:null,
                    Ngay_BatDau: $filter('date')($scope.input.Ngay_BatDau, 'yyyy-MM-dd'),
                    Ngay_KetThuc: $filter('date')($scope.input.Ngay_KetThuc, 'yyyy-MM-dd'),
                    MucThue: $scope.input.MucThue,
                    MaZoneDi: $scope.input.ZoneDiItem ? $scope.input.ZoneDiItem.MaZone : null,
                    MaZoneDen: $scope.input.ZoneDenItem ? $scope.input.ZoneDenItem.MaZone : null,
                    MaGaDi: $scope.input.GaDiItem ? $scope.input.GaDiItem.MaZone : null,
                    MaGaDen: $scope.input.GaDenItem ? $scope.input.GaDenItem.MaZone : null,
                    MacTau: $scope.input.MacTau,
                    SoHieuXe: $scope.input.SoHieuXe,
                    MaHang: $scope.input.HangHoaItem ? $scope.input.HangHoaItem.MaHangRAT : null,
                    DonViTinh: $scope.input.DVTItem ? $scope.input.DVTItem.DonViTinh : null,
                }
              console.log('input', input);
                if ($scope.button == 'report') {
                  ReportBKService.Invoke('BKTTVTND01', input).then(function (res) {
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
                  ReportBKService.InvokeBlob('BKTTVTND01Excel', input).then(function (res) {
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
