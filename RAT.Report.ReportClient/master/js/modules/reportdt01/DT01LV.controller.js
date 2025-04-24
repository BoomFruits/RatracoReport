(function () {
    'use strict';
    var app = angular.module('app.reportdt01');
    app.controller('DT01LVController', ['$scope', '$filter', 'msgService', 'DanhMucService', 'ReportDT01Service', 'ENV', function ($scope, $filter, msgService, DanhMucService, ReportDT01Service, ENV) {

        $scope.input = { Loai: 'A', MaDV: '', MaDV_Tra: '', MaPT: '' };
        $scope.inputMacTaus = [];
        DanhMucService.GetAllMacTau().then(function (res) {
            angular.forEach(res, function (item) {
                if (item.MacTau && item.MacTau.charAt(0) == 'M') {
                    var matau = { name: item.MacTau, maker: item.Maker, icon: '', ticked: false }
                    $scope.inputMacTaus.push(matau);
                }
            });
        });
        $scope.donVis = [];
        DanhMucService.GetListDonVi({ MaDV: 'C12', CapQL: 2}).then(function (res) {
            $scope.donVis = res;
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
                    NgayBanTu: $filter('date')($scope.input.NgayBD, 'yyyy-MM-dd'),
                    NgayBanDen: $filter('date')($scope.input.NgayKT, 'yyyy-MM-dd'),
                    NgayDiTu: $scope.input.NgayDiTu ? $filter('date')($scope.input.NgayDiTu, 'yyyy-MM-dd') : undefined,
                    NgayDiDen: $scope.input.NgayDiDen ? $filter('date')($scope.input.NgayDiDen, 'yyyy-MM-dd') : undefined,
                    MT: getMultiSelectValues($scope.input.outputMacTaus, $scope.inputMacTaus),
                    MaDV: $scope.input.MaDV,
                }

                if ($scope.button == 'report') {
                    ReportDT01Service.Invoke('DT01LV', input).then(function (res) {
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
                    ReportDT01Service.InvokeBlob('DT01LVExcel', input).then(function (res) {
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
        $scope.openNgayBD = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openedNgayBD = true;
        };

        $scope.openNgayKT = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openedNgayKT = true;
        };
        $scope.openNgayDiTu = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openedNgayDiTu = true;
        };

        $scope.openNgayDiDen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openedNgayDiDen = true;
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
