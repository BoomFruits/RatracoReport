(function () {
    'use strict';
    var app = angular.module('app.reportbc');
    app.controller('BCQLX02Controller', ['$scope', '$filter', '$q', '$uibModal', '$location','$rootScope','$window','msgService', 'DanhMucService', 'ReportBCService', 'ENV'
      , function ($scope, $filter, $q, $uibModal,$location,$rootScope,$window, msgService, DanhMucService, ReportBCService, ENV) {
        
        var DateNow = new Date($filter('date')($rootScope.$settings.TimeServer, 'yyyy-MM-dd'));
        console.log('time', $rootScope.$settings.TimeServer);
        $scope.input = {
          Ngay_BatDau: new Date(DateNow.getFullYear(), DateNow.getMonth(), 1, 0, 0, 0),
          Ngay_KetThuc: new Date(DateNow),
        };
        $q.all([DanhMucService.GetAllXuongSuaChua()]).then(function (res) {
          $scope.listXuongSuaChua = res[0];
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
                  MaXuong: $scope.input.XuongSuaChuaItem? $scope.input.XuongSuaChuaItem.MaGa:null,
                }
                if ($scope.button == 'report') {
                  ReportBCService.Invoke('BCQLX02', input).then(function (res) {
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
                  ReportBCService.InvokeBlob('BCQLX02Excel', input).then(function (res) {
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
