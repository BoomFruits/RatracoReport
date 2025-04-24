(function () {
    'use strict';
    var app = angular.module('app.reportdt01');
    app.controller('DT01BVController', ['$scope', '$filter', 'msgService', 'DanhMucService', 'ReportDT01Service', 'ENV', function ($scope, $filter, msgService, DanhMucService, ReportDT01Service, ENV) {

        $scope.input = { MaDV: '', CapQL: 3 };
        $scope.inputMacTaus = [];
        DanhMucService.GetAllMacTau().then(function (res) {
            angular.forEach(res, function (item) {
                var matau = { name: item.MacTau, maker: item.Maker, icon: '', ticked: false }
                $scope.inputMacTaus.push(matau);
            });
        });

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
        $scope.listLoaiThanhToan = [
            { Value: 2, Text: "VNR tự thu" },
            { Value: 1, Text: "Đối tác thu hộ" },
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
                    NgayBan_BatDau: $filter('date')($scope.input.NgayBan_BatDau, 'yyyy-MM-dd'),
                    NgayBan_KetThuc: $filter('date')($scope.input.NgayBan_KetThuc, 'yyyy-MM-dd'),
                    NgayXP_BatDau: $scope.input.NgayXP_BatDau ? $filter('date')($scope.input.NgayXP_BatDau, 'yyyy-MM-dd') : undefined,
                    NgayXP_KetThuc: $scope.input.NgayXP_KetThuc ? $filter('date')($scope.input.NgayXP_KetThuc, 'yyyy-MM-dd') : undefined,
                    MT: getMultiSelectValues($scope.input.outputMacTaus, $scope.inputMacTaus),
                    MaDV: $scope.input.MaDV,
                    CapQL: $scope.input.CapQL,
                    LoaiBan: $scope.input.LoaiBan,
                    LoaiThanhToan: $scope.input.LoaiThanhToan,
                }

                if ($scope.button == 'report') {
                    ReportDT01Service.Invoke('DT01BV', input).then(function (res) {
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
                    ReportDT01Service.InvokeBlob('DT01BVExcel', input).then(function (res) {
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

        // Select mac tau
        $scope.localLang = {
            selectAll: "Chọn tất cả",
            selectNone: "Bỏ chọn",
            reset: "Mặc định",
            search: "Tìm kiếm mác tàu...",
            nothingSelected: "Vui lòng chọn mác tàu &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"
        };
        var getMultiSelectValues = function (value, allValues) {
            var items = [];
            if (value.length > 0 && value.length != allValues.length) {
                angular.forEach(value, function (val, key) {
                    items.push(val.name);
                });
            }
            return items;
        };
    }]);
})();
