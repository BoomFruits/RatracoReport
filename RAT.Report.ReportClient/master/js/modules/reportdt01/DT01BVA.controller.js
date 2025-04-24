(function () {
    'use strict';
    var app = angular.module('app.reportdt01');
    app.controller('DT01BVAController', ['$scope', '$filter', 'msgService', 'DanhMucService', 'ReportDT01Service', 'ENV', function ($scope, $filter, msgService, DanhMucService, ReportDT01Service, ENV) {

        $scope.input = { MaDV: '', CapQL: 3 };

        $scope.listCongTy = []
        DanhMucService.GetListCongTy().then(function (items) {
            $scope.listCongTy = items;
        });

        $scope.listCapHienThi = [
            { Value: 3, Text: "Chi nhánh bán vé" },
            { Value: 4, Text: "Trạm bán vé" },
            { Value: 5, Text: "Điểm bán vé" },
        ];
        $scope.listLoaiBan = [
            { Value: 1, Text: "Chỉ đại lý bán" },
            { Value: 2, Text: "Không bao gồm đại lý bán" },
        ];
        $scope.listLoaiTra = [
            { Value: 1, Text: "Trả ngay" },
            { Value: 2, Text: "CK sau 90 ngày" },
            { Value: 3, Text: "Bảo lưu 90 ngày" },
            { Value: 4, Text: "Bảo lưu 1 năm" },
        ];

        $scope.setButton = function (button) {
            if ($scope.reportForm.$valid) {
                $scope.button = button;
            }
        }

        $scope.report = { };
        $scope.renderReport = function () {
            if ($scope.reportForm.$valid && !$scope.loading) {
                var input = {
                    NgayBD: $filter('date')($scope.input.NgayBD, 'yyyy-MM-dd'),
                    NgayKT: $filter('date')($scope.input.NgayKT, 'yyyy-MM-dd'),
                    MaDV: $scope.input.MaDV,
                    CapQL: $scope.input.CapQL,
                    LoaiBan: $scope.input.LoaiBan,
                    LoaiTra: $scope.input.LoaiTra,
                }

                if ($scope.button == 'report') {
                    ReportDT01Service.Invoke('DT01BVA', input).then(function (res) {
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
                    ReportDT01Service.InvokeBlob('DT01BVAExcel', input).then(function (res) {
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
