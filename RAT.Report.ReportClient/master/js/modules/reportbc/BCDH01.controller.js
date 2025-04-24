(function () {
    'use strict';
    var app = angular.module('app.reportbc');
    app.controller('BCDH01Controller', ['$scope', '$filter', '$q', '$uibModal', '$rootScope', 'msgService', 'DanhMucService', 'ReportBCService', 'ENV'
      , function ($scope, $filter, $q, $uibModal,$rootScope, msgService, DanhMucService, ReportBCService, ENV) {
    var DateNow = new Date($filter('date')($rootScope.$settings.TimeServer, 'yyyy-MM-dd'));
    $scope.input = {
      Ngay_BatDau: new Date(DateNow.getFullYear(), DateNow.getMonth(), 1, 0, 0, 0),
      Ngay_KetThuc: new Date(DateNow),
    };
      
        $q.all([DanhMucService.GetAllNCC()]).then(function (res) {
          $scope.listNCC = res[0];        
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
                }

                if ($scope.button == 'report') {
                  ReportBCService.Invoke('BCDH01', input).then(function (res) {
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
                  ReportBCService.InvokeBlob('BCDH01Excel', input).then(function (res) {
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
        $scope.ShowDetail = function (item, KieuYCVC, count) {
          if (!count || count <= 0) {
            return;
          }
          var input = {
            Ngay_BatDau: $scope.report.Input ? $scope.report.Input.Ngay_BatDau : null,
            Ngay_KetThuc: $scope.report.Input ? $scope.report.Input.Ngay_KetThuc : null,
            MaNCC: $scope.report.Input ? $scope.report.Input.MaNCC : null,
            Loai: item.Loai,
            KieuYCVC:KieuYCVC,
          };
         
            var modalInstance = $uibModal.open({
              templateUrl: '/app/views/BC/BCDH01Detail.html',
              controller: 'BCDH01DetailController',
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
  app.controller('BCDH01DetailController', ['$scope', '$filter', '$q','$uibModalInstance', 'msgService', 'DanhMucService', 'ReportBCService', 'ENV', 'input'
    , function ($scope, $filter, $q,$uibModalInstance, msgService, DanhMucService, ReportBCService, ENV,input) {
      $scope.Title = 'Danh sách chi tiết '+ (input.KieuYCVC ==1?'vận dụng':'điều rỗng')+' container.';
      var InitData = function () {       
        ReportBCService.Invoke('BCDH01Detail', input).then(function (res) {
          $scope.BCDH01Detail = res;
        })
        
      }
      InitData();
      $scope.Dong = function () {
        $uibModalInstance.dismiss();
      };

  }]);
})();
