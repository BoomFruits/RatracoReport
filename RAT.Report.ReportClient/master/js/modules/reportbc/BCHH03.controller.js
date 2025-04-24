(function () {
    'use strict';
    var app = angular.module('app.reportbc');
    app.controller('BCHH03Controller', ['$scope', '$filter', '$q', '$uibModal', '$rootScope', 'msgService', 'DanhMucService', 'ReportBCService', 'ENV'
      , function ($scope, $filter, $q, $uibModal,$rootScope, msgService, DanhMucService, ReportBCService, ENV) {

    var DateNow = new Date($filter('date')($rootScope.$settings.TimeServer, 'yyyy-MM-dd'));
    $scope.input = {
      Ngay_BatDau: new Date(DateNow.getFullYear(), DateNow.getMonth(), 1, 0, 0, 0),
      Ngay_KetThuc: new Date(DateNow),
    };
        $q.all([DanhMucService.GetAllDonVi()]).then(function (res) {

          $scope.listDonVi = res[0];
          var lst = $filter('filter')($scope.listDonVi, { MaDV: 'C99' }, true);
          $scope.input.DonVi = lst[0];
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
                    MaDV: $scope.input.DonVi ? $scope.input.DonVi.MaDV : null,
                    TenDV: $scope.input.DonVi ? $scope.input.DonVi.TenDV : null,
                }

                if ($scope.button == 'report') {
                  ReportBCService.Invoke('BCHH03', input).then(function (res) {
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
                  ReportBCService.InvokeBlob('BCHH03Excel', input).then(function (res) {
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
        $scope.ShowDetail = function (item,thang,count) {
          if (!count || count <= 0) {
            return;
          }
          var input = {
            Ngay_BatDau: $scope.report.Input ? $scope.report.Input.Ngay_BatDau : null,
            Ngay_KetThuc: $scope.report.Input ? $scope.report.Input.Ngay_KetThuc : null,
            MaDV: $scope.report.Input ? $scope.report.Input.MaDV : null,          
            PhanLoaiXe: item.PhanLoaiXe,
            TenGa: item.TenGa,
            Loai: item.Loai,
            GaID: item.GaID,
            Thang:thang,
          };
         
            var modalInstance = $uibModal.open({
              templateUrl: '/app/views/BC/BCHH03Detail.html',
              controller: 'BCHH03DetailController',
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
  app.controller('BCHH03DetailController', ['$scope', '$filter', '$q','$uibModalInstance', 'msgService', 'DanhMucService', 'ReportBCService', 'ENV', 'input'
    , function ($scope, $filter, $q,$uibModalInstance, msgService, DanhMucService, ReportBCService, ENV,input) {
      if (input.Loai == 1) {
        $scope.Title = 'Danh sách chi tiết xe xếp tại ga ' + input.TenGa + ' tháng ' + input.Thang + ' cho phân loại xe ' + input.PhanLoaiXe;
      } else if (input.Loai == 2) {
        $scope.Title = 'Danh sách chi tiết xe dỡ tại ga ' + input.TenGa + ' tháng ' + input.Thang + ' cho phân loại xe ' + input.PhanLoaiXe;
      }
      var InitData = function () {       
        ReportBCService.Invoke('BCHH03Detail', input).then(function (res) {
          $scope.BCHH03Detail = res;
        })
        
      }
      InitData();
      $scope.Dong = function () {
        $uibModalInstance.dismiss();
      };

  }]);
})();
