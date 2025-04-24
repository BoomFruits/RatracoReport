(function () {
    'use strict';
    var app = angular.module('app.core');
    app.controller('PagingController', ['$scope', '$attrs', '$parse', 'uibPaging', 'uibPaginationConfig', '$controller', '$timeout', function ($scope, $attrs, $parse, uibPaging, uibPaginationConfig, $controller, $timeout) {
        var ctrl = this;
        var pageChangeFn = $parse($attrs.pageSizeChange);
        angular.extend(ctrl, $controller('UibPaginationController', { $scope: $scope, $attrs: $attrs, $parse: $parse, uibPaging: uibPaging, uibPaginationConfig: uibPaginationConfig }));
        
        $scope.pageSizes = [10, 20, 50, 100, 200];

        $scope.$watch('page', function (newPage, oldPage) {
            if (angular.isDefined(newPage) || newPage !== oldPage) {
                $scope.pageNumberGo = newPage;
            }
        });

        $scope.isPageLoad = true;
        $scope.$watch('pageSize', function (newPageSize, oldPageSize) {
            if (angular.isDefined(newPageSize) || newPageSize !== oldPageSize) {
                ctrl.itemsPerPage = newPageSize;
                $scope.totalPages = ctrl.reCalculateTotalPages();
                ctrl.updatePage();
                pageChangeFn($scope.$parent);

                if ($scope.isPageLoad) {
                    $scope.watchTotalItems();
                    $scope.isPageLoad = false;
                }
            }
        });

        $scope.watchTotalItems = function () {
            var listener = $scope.$watch("totalItems", function () { });
            listener();
            $scope.$watch('totalItems', function (newTotal, oldTotal) {
                if (angular.isDefined(newTotal) || newTotal !== oldTotal) {
                    $scope.totalPages = ctrl.reCalculateTotalPages();
                    ctrl.updatePage();
                }
            });
        }

        ctrl.reCalculateTotalPages = function () {
            var totalPages = ctrl.itemsPerPage < 1 ? 1 : Math.ceil($scope.totalItems / ctrl.itemsPerPage);
            return Math.max(totalPages || 0, 1);
        };

        $scope.changePageSize = function (pageSize) {
            $scope.pageSize = pageSize;
        }

        $scope.goToPage = function () {
            var page = $scope.pageNumberGo;
            if ($scope.totalPages > 0 && page != $scope.page) {
                page = page > 0 ? page : 1;
                page = page > $scope.totalPages ? $scope.totalPages : page;
                $scope.selectPage(page);
            }
        }

    }]);
    app.directive("paging", ['uibPaginationConfig', function (uibPaginationConfig) {
        return {
            scope: {
                totalItems: '=',
                pageSize: '=',
                firstText: '@',
                previousText: '@',
                nextText: '@',
                lastText: '@',
                ngDisabled: '='
            },
            require: ['paging', '?ngModel'],
            controller: 'PagingController',
            controllerAs: 'paging',
            templateUrl: function (element, attrs) {
                return attrs.templateUrl || 'app/views/partials/paging.html';
            },
            replace: true,
            link: function (scope, element, attrs, ctrls) {
                var paginationCtrl = ctrls[0], ngModelCtrl = ctrls[1];
                
                if (!ngModelCtrl) {
                    return; // do nothing if no ng-model
                }

                paginationCtrl.init(ngModelCtrl, uibPaginationConfig);
            }
        };
    }]);
})();
