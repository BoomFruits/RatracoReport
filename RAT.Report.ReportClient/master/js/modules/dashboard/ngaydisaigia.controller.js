(function() {
    'use strict';

    var app = angular.module('app.dashboard');
    app.controller('NgayDiSaiGiaController', NgayDiChuaCoGiaController);

    NgayDiChuaCoGiaController.$inject = ['$scope', '$q', '$state', '$timeout', '$uibModal', 'authService', 'UserService', 'DashboardService', 'DanhMucService'];
    function NgayDiChuaCoGiaController($scope, $q, $state, $timeout, $uibModal, authService, UserService, DashboardService, DanhMucService) {
        if (authService.authentication.isAuth && authService.authentication.roles.indexOf('550') != -1) {
            var pagekey = 'NgayDiSaiGia';
            var filter = {
                Months: 2
            };
            $scope.input = angular.extend({}, filter);
            $scope.ListNgayDi = {};
            $scope.AllMacTau = [];
            $scope.ListMacTau = [];
            $scope.ListMonth = [
                { Value: 0, Name: 'Trong tháng này' },
                { Value: 1, Name: 'Trong tháng tới' },
                { Value: 2, Name: 'Trong 2 tháng tới' },
                { Value: 3, Name: 'Trong 3 tháng tới' },
                { Value: 4, Name: 'Trong 4 tháng tới' },
                { Value: 5, Name: 'Trong 5 tháng tới' },
                { Value: 6, Name: 'Trong 6 tháng tới' }
            ];
            $scope.ListCongTy = [
                { MaCT: 'KHN', TenCT: 'Khách Hà Nội' },
                { MaCT: 'KSG', TenCT: 'Khách Sài Gòn' }
            ];
            $scope.ListLoaiTau = [
                { Value: 0, Name: 'Tàu thống nhất' },
                { Value: 1, Name: 'Tàu địa phương' }
            ];

            // Get user dashboard
            $scope.isSearched = false;
            $scope.isLoading = true;
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
                    if (!angular.isUndefined(selectedMacTaus)) {
                        if (!selectedMacTaus || selectedMacTaus.length == 0 || (selectedMacTaus && selectedMacTaus.indexOf(tau.MacTau) != -1)) {
                            isTicked = true;
                        }
                    }
                    $scope.ListMacTau.push({ value: tau.MacTau, icon: "", name: tau.MacTau, maker: "", ticked: isTicked });
                }
            }

            var getListMacTau = function () {
                var listMacTau = [];
                for (var i = 0; i < $scope.AllMacTau.length; i++) {
                    var macTau = $scope.AllMacTau[i];

                    var isOk = true;
                    if (isOk && $scope.input.MaCT && $scope.input.MaCT.substr(1) != macTau.TrungTam.substr(1)) {
                        isOk = false
                    }
                    if (isOk && ($scope.input.LoaiTau === 0 || $scope.input.LoaiTau === 1)) {
                        var loaiTau = macTau.TinhChat > 0 ? 1 : 0;
                        isOk = $scope.input.LoaiTau == loaiTau;
                    }
                    if (isOk) {
                        listMacTau.push(macTau);
                    }
                }
                return listMacTau;
            }

            var loadData = function (callback) {
                var input = angular.extend({}, $scope.input);
                DashboardService.GetDSNgayDiSaiGia(input).then(function (res) {
                    $scope.ListNgayDi = res.ListNgayDi;
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

            $scope.viewNgayDiSaiGiaDetails = function (ngayDi, macTau) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'ModalNgayDiSaiGiaDetailsContent.html',
                    controller: 'NgayDiSaiGiaDetailsController',
                    size: 'lg',
                    resolve: {
                        input: function () { return { NgayDi: ngayDi, MacTau: macTau }; }
                    }
                });
            }

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
            return Object.keys($scope.ListNgayDi).length > 0;
        }

        $scope.localLang = {
            selectAll: "Chọn tất cả",
            selectNone: "Bỏ chọn",
            reset: "Mặc định",
            search: "Tìm kiếm mác tàu...",
            nothingSelected: "Tất cả mác tàu &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"
        };
    }
})();