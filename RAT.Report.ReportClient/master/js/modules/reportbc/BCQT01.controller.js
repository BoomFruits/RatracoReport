(function () {
    'use strict';
    var app = angular.module('app.reportbc');
    app.controller('BCQT01Controller', ['$scope', '$filter', '$q', '$uibModal', '$location','$rootScope','$window','msgService', 'DanhMucService', 'ReportBCService', 'ENV'
      , function ($scope, $filter, $q, $uibModal,$location,$rootScope,$window, msgService, DanhMucService, ReportBCService, ENV) {
        
        var DateNow = new Date($filter('date')($rootScope.$settings.TimeServer, 'yyyy-MM-dd'));
        $scope.input = {
          Ngay_BatDau: new Date(DateNow.getFullYear(), DateNow.getMonth(), 1, 0, 0, 0),
          Ngay_KetThuc: new Date(DateNow),
        };

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
                  MacTau: $scope.input.MacTau ? $scope.input.MacTau : null,
                  MaNCC: $scope.input.MaNCC ? $scope.input.MaNCC : null,
                }
                if ($scope.button == 'report') {
                  ReportBCService.Invoke('BCQT01', input).then(function (res) {
                    $scope.report = res;
                    $scope.report.Data1 = $filter('filter')(res.Data, { LoaiKH: 2 }, true);
                    var lstDuongBo = $filter('filter')(res.Data, { LoaiKH: 23 }, true);
                    var lstDuongBoThue = $filter('filter')(res.Data, { LoaiKH: 25 }, true);
                    if (lstDuongBo && lstDuongBo.length > 0) {
                      $scope.report.Data2 = lstDuongBo.concat(lstDuongBoThue);
                    }
                    
                    $scope.report.Data3 = $filter('filter')(res.Data, { LoaiKH: 21 }, true);
                    console.log('$scope.report', $scope.report);
                        $scope.loading = false;
                        $scope.submited = true;
                    }, function () {
                        $scope.loading = false;
                        $scope.submited = true;
                        $scope.report = { Data: [] };
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                } else {
                  ReportBCService.InvokeBlob('BCQT01Excel', input).then(function (res) {
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
        $scope.OnClickMacTau = function (item) {
          var t1 = $filter('date')($scope.report.Input.Ngay_BatDau, 'yyyy-MM-dd');
          var t2 = $filter('date')($scope.report.Input.Ngay_KetThuc, 'yyyy-MM-dd');
          $window.open("#/app/BC/BCQT02/" + item.MacTau + '/' + t1 + '/' + t2, '_blank');
          //$location.path("/app/BC/BCQT02/" + item.MacTau + '/' + t1 + '/' + t2);
        };

        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };
  }]);
  

})();
