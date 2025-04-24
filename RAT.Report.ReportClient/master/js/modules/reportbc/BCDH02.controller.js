(function () {
    'use strict';
    var app = angular.module('app.reportbc');
    app.controller('BCDH02Controller', ['$scope', '$filter', '$q', '$uibModal', '$rootScope', 'msgService', 'DanhMucService', 'ReportBCService', 'ENV'
      , function ($scope, $filter, $q, $uibModal,$rootScope, msgService, DanhMucService, ReportBCService, ENV) {

    var DateNow = new Date($filter('date')($rootScope.$settings.TimeServer, 'yyyy-MM-dd'));
    $scope.input = {
      Ngay_BatDau: new Date(DateNow.getFullYear(), DateNow.getMonth(), 1, 0, 0, 0),
      Ngay_KetThuc: new Date(DateNow),
    };
        $q.all([DanhMucService.GetAllZone(), DanhMucService.GetAllKhachHang()]).then(function (res) {
          $scope.listGa = $filter('filter')(res[0], { LoaiZone: 1 }, true);
          $scope.listKhachHang = res[1];

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
                    MaKH: $scope.input.KhachHangItem ? $scope.input.KhachHangItem.MaKH : null,
                    GaID: $scope.input.GaItem ? $scope.input.GaItem.GaID : null,
                }

                if ($scope.button == 'report') {
                  ReportBCService.Invoke('BCDH02', input).then(function (res) {
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
                  ReportBCService.InvokeBlob('BCDH02Excel', input).then(function (res) {
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
        $scope.ShowDetail = function (item, loai) {
          var input = {
            GaID: item.GaID,
            TenGa: item.TenGa,
            LoaiCONT: item.Loai,
            Loai: loai,
            MaKH: $scope.report.Input ? $scope.report.Input.MaKH : null,
            Ngay_BatDau: $scope.report.Input ? $scope.report.Input.Ngay_BatDau : null,
            Ngay_KetThuc: $scope.report.Input ? $scope.report.Input.Ngay_KetThuc : null,
          }
          console.log('input', input);

          var modalInstance = $uibModal.open({
            templateUrl: '/app/views/BC/BCDH02Detail.html',
            controller: 'BCDH02DetailController',
            windowClass: 'extent_large',
            backdrop: 'static',
            resolve: {
              input: function () { return input; },
            }
          });
          modalInstance.result.then(function (confirm) {
            if (confirm) {

            }
          }, function (confirm) {
            if (confirm) {

            }
          });
        };

        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };

      
      }]);
    app.controller('BCDH02DetailController', ['$scope', '$filter', '$q', '$uibModalInstance', 'msgService', 'DanhMucService', 'ReportBCService', 'ENV', 'input'
  , function ($scope, $filter, $q, $uibModalInstance, msgService, DanhMucService, ReportBCService, ENV, input) {
    $scope.Title = 'Danh sách chi tiết tình hình đọng ' + (input.Loai == 1 ? 'xếp':'dỡ') + ' với loại Cont ' + input.LoaiCONT + ' tại ga ' + input.TenGa;
    var InitData = function () {
      ReportBCService.Invoke('BCDH02Detail', input).then(function (res) {
        $scope.BCDH02Detail = res;
      })

    }
    InitData();
    $scope.Dong = function () {
      $uibModalInstance.dismiss();
    };

  }]);
})();
