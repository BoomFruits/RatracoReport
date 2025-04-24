(function () {
    'use strict';
    var app = angular.module('app.reportbc');
    app.controller('BCQLX01Controller', ['$scope', '$filter', 'msgService', 'DanhMucService', 'ReportBCService', 'ENV', function ($scope, $filter, msgService, DanhMucService, ReportBCService, ENV) {

        $scope.input = { };
     
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
                    
                }

                if ($scope.button == 'report') {
                  ReportBCService.Invoke('BCQLX01', input).then(function (res) {
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
                  ReportBCService.InvokeBlob('BCQLX01Excel', input).then(function (res) {
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
