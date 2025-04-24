(function () {
    'use strict';
    var app = angular.module('app.reportbk');
    app.controller('BKTram01Controller', ['$scope', '$filter', '$q','$rootScope', 'msgService', 'DanhMucService', 'ReportBKService', 'ENV'
      , function ($scope, $filter, $q,$rootScope, msgService, DanhMucService, ReportBKService, ENV) {
    var DateNow = new Date($filter('date')($rootScope.$settings.TimeServer, 'yyyy-MM-dd'));
    $scope.input = {
      Ngay_BatDau: new Date(DateNow.getFullYear(), DateNow.getMonth(), 1, 0, 0, 0),
      Ngay_KetThuc: new Date(DateNow),
    };
    $q.all([DanhMucService.GetAllDonVi()]).then(function (res) {
      $scope.listDonVi = res[0];
      var lst = $filter('filter')($scope.listDonVi, {MaDV:'C99'},true);
      $scope.input.DonVi = lst[0];
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
                    Ngay_BatDau: $filter('date')($scope.input.Ngay_BatDau, 'yyyy-MM-dd'),
                    Ngay_KetThuc: $filter('date')($scope.input.Ngay_KetThuc, 'yyyy-MM-dd'),
                    LoaiKH: $scope.input.LoaiKH,
                    MaDV: $scope.input.DonVi ? $scope.input.DonVi.MaDV : null,
                    TenDV: $scope.input.DonVi ? $scope.input.DonVi.TenDV : null,
                }
              console.log('input', input);
                if ($scope.button == 'report') {
                  ReportBKService.Invoke('BKTram01', input).then(function (res) {
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
                  ReportBKService.InvokeBlob('BKTram01Excel', input).then(function (res) {
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
