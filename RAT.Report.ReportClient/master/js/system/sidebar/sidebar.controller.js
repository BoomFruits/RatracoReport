/**=========================================================
 * Module: sidebar-menu.js
 * Handle sidebar collapsible elements
 =========================================================*/

(function() {
    'use strict';

    var app = angular.module('app.sidebar');
    app.controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$rootScope', '$scope', '$state', 'authService', 'SidebarLoader', 'Utils'];
    function SidebarController($rootScope, $scope, $state, authService, SidebarLoader, Utils) {

        var collapseList = [];

        // demo: when switch from collapse to hover, close all items
        $rootScope.$watch('app.layout.asideHover', function (oldVal, newVal) {
            if (newVal === false && oldVal === true) {
                closeAllBut(-1);
            }
        });


        // Load menu from json file
        // ----------------------------------- 

        $scope.isLoaded = false;
        SidebarLoader.getMenu(sidebarReady, sidebarError);

        var checkValidUser = function (items) {
            for (var i = 0; i < items.length; i++) {
                if (items[i].sref == 'app.trogiup') {
                    return true;
                }
            }
            return false;
        }

        function sidebarReady(items) {
            var isValid = checkValidUser(items);
            if (isValid) {
                $scope.menuItems = items;
                $scope.isLoaded = true;
            } else {
                // Logout
                authService.logOut();

                // Show modal info
                var title = 'Lỗi truy cập hệ thống';
                var detail = 'Tài khoản của bạn chưa được thiết lập truy cập hệ thống, vui lòng kiểm tra lại.';
                $rootScope.ShowModalUnauthorized(title, detail);
            }
        }

        function sidebarError(err) {
            $scope.menuItems = false;
            $scope.isLoaded = true;
        }

        // Handle sidebar and collapse items
        // ----------------------------------

        $scope.getMenuItemPropClasses = function (item) {
            return (item.heading ? 'nav-heading' : '') +
                   (isActive(item) ? ' active' : '');
        };

        $scope.addCollapse = function ($index, item) {
            collapseList[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
        };

        $scope.isCollapse = function ($index) {
            return (collapseList[$index]);
        };

        $scope.toggleCollapse = function ($index, isParentItem) {

            // collapsed sidebar doesn't toggle drodopwn
            if (Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover) return true;

            // make sure the item index exists
            if (angular.isDefined(collapseList[$index])) {
                if (!$scope.lastEventFromChild) {
                    collapseList[$index] = !collapseList[$index];
                    closeAllBut($index);
                }
            }
            else if (isParentItem) {
                closeAllBut(-1);
            }

            $scope.lastEventFromChild = isChild($index);

            return true;

        };

        // Controller helpers
        // ----------------------------------- 

        // Check item and children active state
        function isActive(item) {

            if (!item) return;

            if (!item.sref || item.sref === '#') {
                var foundActive = false;
                angular.forEach(item.submenu, function (value) {
                    if (isActive(value)) foundActive = true;
                });
                return foundActive;
            }
            else
                return $state.is(item.sref) || $state.includes(item.sref);
        }

        function closeAllBut(index) {
            index += '';
            for (var i in collapseList) {
                if (index < 0 || index.indexOf(i) < 0)
                    collapseList[i] = true;
            }
        }

        function isChild($index) {
            /*jshint -W018*/
            return (typeof $index === 'string') && !($index.indexOf('-') < 0);
        }
    }

})();
