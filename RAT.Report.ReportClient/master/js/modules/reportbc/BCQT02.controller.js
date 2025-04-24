(function () {
    'use strict';
    var app = angular.module('app.reportbc');
    app.controller('BCQT02Controller', ['$scope', '$filter', '$q', '$uibModal', '$stateParams','$rootScope', 'msgService', 'DanhMucService', 'ReportBCService', 'ENV'
      , function ($scope, $filter, $q, $uibModal,$stateParams,$rootScope, msgService, DanhMucService, ReportBCService, ENV) {

        var DateNow = new Date($filter('date')($rootScope.$settings.TimeServer, 'yyyy-MM-dd'));
        $scope.input = {
          Ngay_BatDau: new Date(DateNow.getFullYear(), DateNow.getMonth(), 1, 0, 0, 0),
          Ngay_KetThuc: new Date(DateNow),
        };
       

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
                  ReportBCService.Invoke('BCQT02', input).then(function (res) {
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
                  ReportBCService.InvokeBlob('BCQT02Excel', input).then(function (res) {
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
        $scope.setButton = function (button) {
          if ($scope.reportForm.$valid) {
            $scope.button = button;
          }
        }
        //innit tu bcqt01
        var mactau = $stateParams.mactau;
        var t1 = $stateParams.t1;
        var t2 = $stateParams.t2;
        if (mactau && t1 && t2) {
          $scope.input.MacTau = mactau;
          $scope.input.Ngay_BatDau = new Date(t1);
          $scope.input.Ngay_KetThuc = new Date(t2);
          $scope.button = 'report';
          $scope.reportForm = { $valid: true };
          //$scope.reportForm.$valid = true;
          //$scope.setButton('report');
          $scope.renderReport();
        }
        
       //show detail when click MacTau
        $scope.ShowDetail = function (item) {
          var input = {};
          if (item.TauID ==0 && item.MacTau == 'DBO') {
            input = {
              MaNCC: item.MaCTSoHuu ? item.MaCTSoHuu : null,
              MacTau: item.MacTau ? item.MacTau : null,
              Ngay_BatDau: $scope.report.Input.Ngay_BatDau ? $scope.report.Input.Ngay_BatDau : null,
              Ngay_KetThuc: $scope.report.Input.Ngay_KetThuc ? $scope.report.Input.Ngay_KetThuc : null,
              Loai:2
            }
          } else if (item.TauID == 0 && item.MacTau != 'DBO') {
            input = {
              MaNCC: item.MaCTSoHuu ? item.MaCTSoHuu : null,
              MacTau: item.MacTau ? item.MacTau : null,
              Ngay_BatDau: $scope.report.Input.Ngay_BatDau ? $scope.report.Input.Ngay_BatDau : null,
              Ngay_KetThuc: $scope.report.Input.Ngay_KetThuc ? $scope.report.Input.Ngay_KetThuc : null,
              Loai: 4
            }
          } else {
             input = {
              MaNCC: item.MaCTSoHuu ? item.MaCTSoHuu : null,
              MacTau: item.MacTau ? item.MacTau : null,
              NgayXP: item.NgayXP ? item.NgayXP : null,
              Loai: 1
            };
          }

          var modalInstance = $uibModal.open({
            templateUrl: '/app/views/BC/BCQT02Detail.html',
            controller: 'BCQT02DetailController',
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
        $scope.ShowDetail2 = function (item) {
          if (!item.DHGT_KCKT || item.DHGT_KCKT <= 0) {
            return;
          }
           var input = {
              MaNCC: item.MaCTSoHuu ? item.MaCTSoHuu : null,
              MacTau: item.MacTau ? item.MacTau : null,
              NgayXP: item.NgayXP ? item.NgayXP : null,
              Loai: 3
            };
        

          var modalInstance = $uibModal.open({
            templateUrl: '/app/views/BC/BCQT02Detail2.html',
            controller: 'BCQT02Detail2Controller',
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
  app.controller('BCQT02DetailController', ['$scope', '$filter', '$q', '$uibModalInstance', 'msgService', 'DanhMucService', 'ReportBCService', 'ENV', 'input'
  , function ($scope, $filter, $q, $uibModalInstance, msgService, DanhMucService, ReportBCService, ENV, input) {
    $scope.Title = 'Danh sách chi tiết kết quả vận tải theo tàu của tàu ' + input.MacTau;
    $scope.loading = true;
    var InitData = function () {
      ReportBCService.Invoke('BCQT02Detail', input).then(function (res) {
        $scope.BCQT02Detail = res;
        $scope.loading = false;
      })
      
    }
    InitData();
    $scope.Dong = function () {
      $uibModalInstance.dismiss();
    };

  }]);
  app.controller('BCQT02Detail2Controller', ['$scope', '$filter', '$q', '$uibModalInstance', 'msgService', 'DanhMucService', 'ReportBCService', 'ENV', 'input'
, function ($scope, $filter, $q, $uibModalInstance, msgService, DanhMucService, ReportBCService, ENV, input) {
  $scope.Title = 'Danh sách chi tiết khám chữa tàu ' + input.MacTau + ', ngày xuất phát ' + $filter('date')(input.NgayXP, 'dd/MM/yyyy');
  $scope.loading = true;
  var InitData = function () {
    ReportBCService.Invoke('BCQT02Detail', input).then(function (res) {
      $scope.BCQT02Detail2 = res;
      $scope.loading = false;
    })

  }
  InitData();
  $scope.Dong = function () {
    $uibModalInstance.dismiss();
  };

}]);

})();
