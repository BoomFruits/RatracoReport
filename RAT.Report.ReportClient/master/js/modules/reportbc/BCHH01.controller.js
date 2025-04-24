(function () {
    'use strict';
    var app = angular.module('app.reportbc');
    app.controller('BCHH01Controller', ['$scope', '$filter', '$q', '$uibModal', '$rootScope', 'msgService', 'DanhMucService', 'ReportBCService', 'ENV'
      , function ($scope, $filter, $q, $uibModal,$rootScope, msgService, DanhMucService, ReportBCService, ENV) {

    var DateNow = new Date($filter('date')($rootScope.$settings.TimeServer, 'yyyy-MM-dd'));
    $scope.input = {
      Ngay_BatDau: new Date(DateNow.getFullYear(), DateNow.getMonth(), 1, 0, 0, 0),
      Ngay_KetThuc: new Date(DateNow),
    };
        $q.all([DanhMucService.GetAllNCC(), DanhMucService.GetAllZone(), DanhMucService.GetAllKhachHang(), DanhMucService.GetAllDonVi()]).then(function (res) {
          $scope.listNCC = res[0];
          $scope.listGa = $filter('filter')(res[1], { LoaiZone: 1 },true);
          $scope.listKhachHang = res[2];
          $scope.listDonVi = res[3];
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
                    GaID: $scope.input.GaItem ? $scope.input.GaItem.GaID : null,
                    TenGa: $scope.input.GaItem ? $scope.input.GaItem.TenZone : null,
                    MaNCC: $scope.input.NCCItem ? $scope.input.NCCItem.MaKH : null,
                    MaKH: $scope.input.KhachHangItem ? $scope.input.KhachHangItem.MaKH : null,
                    MaDV: $scope.input.DonVi ? $scope.input.DonVi.MaDV : null,
                }

                if ($scope.button == 'report') {
                  ReportBCService.Invoke('BCHH01', input).then(function (res) {
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
                  ReportBCService.InvokeBlob('BCHH01Excel', input).then(function (res) {
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
        $scope.ShowDetail = function (item, NhomLenh, count) {
          if (!count || count <= 0) {
            return;
          }
          var input = {
            Ngay_BatDau: $scope.report.Input ? $scope.report.Input.Ngay_BatDau : null,
            Ngay_KetThuc: $scope.report.Input ? $scope.report.Input.Ngay_KetThuc : null,
            GaID: $scope.report.Input ? $scope.report.Input.GaID : null,
            TenGa: $scope.report.Input ? $scope.report.Input.TenGa : null,
            MaNCC: $scope.report.Input ? $scope.report.Input.MaNCC : null,
            MaKH: $scope.report.Input ? $scope.report.Input.MaKH : null,
            MaDV: $scope.report.Input ? $scope.report.Input.MaDV : null,
            NgayTacNghiep: item.ThoiGianKT,
            LoaiCONT: item.LoaiCONT,
            NhomLenh: NhomLenh,
          };
         
            var modalInstance = $uibModal.open({
              templateUrl: '/app/views/BC/BCHH01Detail.html',
              controller: 'BCHH01DetailController',
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
  app.controller('BCHH01DetailController', ['$scope', '$filter', '$q','$uibModalInstance', 'msgService', 'DanhMucService', 'ReportBCService', 'ENV', 'input'
    , function ($scope, $filter, $q,$uibModalInstance, msgService, DanhMucService, ReportBCService, ENV,input) {
      $scope.Title = 'Danh sách chi tiết tác nghiệp cẩu tại ga ' + input.TenGa;
      var InitData = function () {       
        ReportBCService.Invoke('BCHH01Detail', input).then(function (res) {
          $scope.BCHH01Detail = res;
        })
        
      }
      InitData();
      $scope.Dong = function () {
        $uibModalInstance.dismiss();
      };

  }]);
})();
