(function() {
    'use strict';

    var app = angular.module('app.dashboard');
    app.controller('NgayDiChuaCoGiaController', NgayDiChuaCoGiaController);

    NgayDiChuaCoGiaController.$inject = ['$scope', '$q', '$state', '$timeout', '$uibModal', 'authService', 'UserService', 'DashboardService', 'DanhMucService'];
    function NgayDiChuaCoGiaController($scope, $q, $state, $timeout, $uibModal, authService, UserService, DashboardService, DanhMucService) {
        if (authService.authentication.isAuth && authService.authentication.roles.indexOf('550') != -1) {
            var pagekey = 'NgayDiChuaCoGia';
            var filter = {
                Months: 2
            };
            $scope.input = angular.extend({}, filter);
            $scope.ListNgayDi = {};
            $scope.AllMacTau = [];
            $scope.ListMacTau = [];
            $scope.ListMonth = [
                { Value: 0, Name: 'Trong tháng này' },
                { Value: 1, Name: 'Trong cả tháng tới' },
                { Value: 2, Name: 'Trong vòng 2 tháng tới' },
                { Value: 3, Name: 'Trong vòng 3 tháng tới' },
                { Value: 4, Name: 'Trong vòng 4 tháng tới' },
                { Value: 5, Name: 'Trong vòng 5 tháng tới' },
                { Value: 6, Name: 'Trong vòng 6 tháng tới' }
            ];
            $scope.ListCongTy = [
                { MaCT: 'KHN', TenCT: 'Khách Hà Nội' },
                { MaCT: 'KSG', TenCT: 'Khách Sài Gòn' }
            ];
            $scope.ListLoaiTau = [
                { Value: 30, Name: 'Tàu thống nhất' },
                { Value: 10, Name: 'Tàu thống nhất (HN)' },
                { Value: 20, Name: 'Tàu thống nhất (SG)' },
                { Value: 3, Name: 'Tàu địa phương' },
                { Value: 1, Name: 'Tàu địa phương (HN)' },
                { Value: 2, Name: 'Tàu địa phương (SG)' }
            ];
            $scope.ListSoLuong = [
                { Value: 10, Name: 'Tối thiểu 10 mục chưa có giá' },
                { Value: 50, Name: 'Tối thiểu 50 mục chưa có giá' },
                { Value: 100, Name: 'Tối thiểu 100 mục chưa có giá' },
                { Value: 150, Name: 'Tối thiểu 150 mục chưa có giá' },
                { Value: 200, Name: 'Tối thiểu 200 mục chưa có giá' },
                { Value: 500, Name: 'Tối thiểu 500 mục chưa có giá' }
            ];

            // Get user dashboard
            $scope.isLoading = true;
            $scope.isSearched = false;
            $scope.data = [];
            DashboardService.GetUserDashboard(pagekey).then(function (res) {
                if (res.Data) {
                    $scope.input = res.Data;
                }

                firstLoad();
            }, function () {
                firstLoad();
                console.log("Can not load UserDashboard by key " + pagekey);
            });

            var firstLoad = function () {
                DanhMucService.GetAllMacTau().then(function (items) {
                    $scope.AllMacTau = items;
                    initAllMacTau($scope.input.MacTau);
                    $scope.isLoading = false;
                }, function () {
                    $scope.isLoading = false;
                    console.log("Can not load danh muc mac tau");
                });

                //$scope.isLoading = true;
                //loadData();
            }

            var initAllMacTau = function (selectedMacTaus) {
                var allMacTau = getListMacTau();
                $scope.ListMacTau = [];
                for (var i = 0; i < allMacTau.length; i++) {
                    var tau = allMacTau[i];
                    var isTicked = false;
                    if (selectedMacTaus && selectedMacTaus.indexOf && selectedMacTaus.indexOf(tau.MacTau) != -1) {
                        isTicked = true;
                    }
                    $scope.ListMacTau.push({ value: tau.MacTau, icon: "", name: tau.MacTau, maker: "", ticked: isTicked });
                }
            }

            var getListMacTau = function () {
                var listMacTau = [];
                for (var i = 0; i < $scope.AllMacTau.length; i++) {
                    var macTau = $scope.AllMacTau[i];

                    var isOk = true;
                    if ($scope.input.LoaiTau == 30 && macTau.TinhChat != 0) {
                        isOk = false;
                    } else if ($scope.input.LoaiTau == 10 && (macTau.TinhChat != 0 || macTau.TrungTam != 'THN')) {
                        isOk = false;
                    } else if ($scope.input.LoaiTau == 20 && (macTau.TinhChat != 0 || macTau.TrungTam != 'TSG')) {
                        isOk = false;
                    } else if ($scope.input.LoaiTau == 3 && macTau.TinhChat == 0) {
                        isOk = false;
                    } else if ($scope.input.LoaiTau == 1 && (macTau.TinhChat == 0 || macTau.TrungTam != 'THN')) {
                        isOk = false;
                    } else if ($scope.input.LoaiTau == 2 && (macTau.TinhChat == 0 || macTau.TrungTam != 'TSG')) {
                        isOk = false;
                    }
                    if (isOk) {
                        listMacTau.push(macTau);
                    }
                }
                return listMacTau;
            }

            var loadData = function (callback) {
                var input = angular.extend({}, $scope.input);
                input.SoLuong = input.SoLuong > 0 ? input.SoLuong : 0;
                DashboardService.GetDSNgayDiChuaCoGia(input).then(function (res) {
                    $scope.data = res.Data;
                    $scope.isSearched = true;
                    $scope.isLoading = false;
                    if (callback) {
                        callback();
                    }
                }, function () {
                    $scope.isSearched = true;
                    $scope.isLoading = false;
                    if (callback) {
                        callback();
                    }
                });
                $scope.isLoading = true;
            }

            $scope.updateListMacTau = function () {
                $scope.input.MacTau = getMultiSelectValues($scope.MacTau, $scope.AllMacTau);
                initAllMacTau($scope.input.MacTau);
            }

            $scope.updateNgayDiLoi = function () {
                //console.log($scope.filter);
                if ($scope.filterForm.$valid) {
                    $scope.input.MacTau = getMultiSelectValues($scope.MacTau, $scope.AllMacTau);
                    var data = angular.extend({}, $scope.input);
                    if (!data.MacTau || data.MacTau.length == 0) {
                        data.MacTau = undefined;
                    }
                    DashboardService.UpdateUserDashboard(pagekey, data).then(function () {
                        loadData();
                    }, function () {
                        $scope.isLoading = false;
                    });
                    $scope.isLoading = true;
                }
            }

            $scope.$on('panel-refresh', function (event, id) {
                loadData(function () {
                    $scope.$broadcast('removeSpinner', id);
                });

                // Instead of timeout you can request a chart data
                //$timeout(function () {

                //    // directive listen for to remove the spinner 
                //    // after we end up to perform own operations
                //    $scope.$broadcast('removeSpinner', id);

                //    console.log('Refreshed #' + id);

                //}, 3000);
            });

            var getMultiSelectValues = function (value, allValues) {
                var items = [];
                if (value && allValues && value.length != allValues.length && value.length > 0) {
                    angular.forEach(value, function (val, key) {
                        items.push(val.value);
                    });
                }
                return items;
            }
        }

        $scope.visibleData = function () {
            return $scope.data.length > 0;
        }

        $scope.localLang = {
            selectAll: "Chọn tất cả",
            selectNone: "Bỏ chọn",
            reset: "Mặc định",
            search: "Tìm kiếm mác tàu...",
            nothingSelected: "Tất cả mác tàu &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"
        };

        // On click detail
        $scope.viewDetails = function (ngayDi, macTau) {
            var modalInstance = $uibModal.open({
                templateUrl: 'ModalNgayDiChuaCoGiaDetailsContent.html',
                controller: 'ModalNgayDiChuaCoGiaDetailsController',
                size: 'md',
                resolve: {
                    input: function () {
                        return { NgayDi: ngayDi, MacTau: macTau }
                    }
                }
            });
        };
    }
})();