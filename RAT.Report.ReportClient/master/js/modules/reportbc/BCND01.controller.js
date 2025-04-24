(function () {
    'use strict';
    var app = angular.module('app.reportbc');
  app.controller('BCND01Controller', ['$scope', '$filter','$q','$uibModal','$rootScope', 'msgService', 'DanhMucService', 'ReportBCService', 'ENV', function ($scope, $filter,$q,$uibModal,$rootScope, msgService, DanhMucService, ReportBCService, ENV) {
    var Now = new Date($rootScope.$settings.TimeServer);
        $scope.input = {Nam:Now.getFullYear()+'', Thang:(Now.getMonth()+1)+'' };

        $scope.setButton = function (button) {
            if ($scope.reportForm.$valid) {
                $scope.button = button;
            }
        }

        $scope.report = { };
        $scope.renderReport = function () {
            if ($scope.reportForm.$valid && !$scope.loading) {
                var input = {
                  Thang: $scope.input.Thang ? $scope.input.Thang : null,
                  Nam: $scope.input.Nam ? $scope.input.Nam : null,
                }

                if ($scope.button == 'report') {
                  ReportBCService.Invoke('BCND01', input).then(function (res) {
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
                  ReportBCService.InvokeBlob('BCND01Excel', input).then(function (res) {
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
        $scope.ShowDetail = function (item) {
          console.log('item', item);
          var input = {
            Thang: $scope.report.Input ? $scope.report.Input.Thang : null,
            Nam: $scope.report.Input ? $scope.report.Input.Nam : null,
            MaTuyen: item.MaTuyen,
            TenTuyen: item.TenTuyen,
            PhanLoaiXe: item.PhanLoaiXe,
          };

          var modalInstance = $uibModal.open({
            templateUrl: '/app/views/BC/BCND01Detail.html',
            controller: 'BCND01DetailController',
            size: 'lg',
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
  app.controller('BCND01DetailController', ['$scope', '$filter', '$q', '$uibModalInstance', 'msgService', 'DanhMucService', 'ReportBCService', 'ENV', 'input'
    , function ($scope, $filter, $q, $uibModalInstance, msgService, DanhMucService, ReportBCService, ENV, input) {
      $scope.Title = 'Danh sách chi tiết doanh thu vận tải nội địa của tuyến ' + input.TenTuyen + ' với chỉ tiêu ' + input.PhanLoaiXe+ ' tháng '+input.Thang+' năm '+input.Nam;
      var InitData = function () {
        ReportBCService.Invoke('BCND01Detail', input).then(function (res) {
          $scope.BCND01Detail = res;
        })

      }
      InitData();
      $scope.Dong = function () {
        $uibModalInstance.dismiss();
      };

    }]);
})();
