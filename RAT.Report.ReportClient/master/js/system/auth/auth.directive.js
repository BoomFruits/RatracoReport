(function () {
    'use strict';
    var app = angular.module('app.auth');
    app.directive('showIfAuthenticated', ['$rootScope', 'authService', function ($rootScope, authService) {
        var render = function ($scope, element, attrs, ctrl) {
            $rootScope.$watch("isAuthLoaded", function () {
                if ($rootScope.isAuthLoaded == true) {
                    if (attrs.showIfAuthenticated == 'false' || attrs.showIfAuthenticated === false || attrs.showIfAuthenticated === '0') {
                        if (authService.authentication.isAuth) {
                            element.hide();
                        } else {
                            element.show();
                        }
                    } else if (attrs.showIfAuthenticated == 'true' || attrs.showIfAuthenticated === true || attrs.showIfAuthenticated === '1') {
                        if (authService.authentication.isAuth) {
                            element.show();
                        } else {
                            element.hide();
                        }
                    } else {
                        if (authService.authentication.isAuth) {
                            var re;
                            var isAccess = false;
                            var allowRoles = attrs.showIfAuthenticated.split('|');
                            var userRoles = authService.authentication.roles ? authService.authentication.roles : [];
                            for (var j = 0; j < allowRoles.length; j++) {
                                var re = false;
                                if (allowRoles[j] && allowRoles[j].length > 1 && allowRoles[j][0] == '/' && allowRoles[j][allowRoles[j].length - 1] == '/') {
                                    re = new RegExp(allowRoles[j].substring(1, allowRoles[j].length - 1));
                                }
                                for (var i = 0; i < userRoles.length; i++) {
                                    if (re) {
                                        if (re.test(userRoles[i])) {
                                            isAccess = true;
                                            break;
                                        }
                                    } else {
                                        if (userRoles[i] == allowRoles[j]) {
                                            isAccess = true;
                                            break;
                                        }
                                    }
                                }
                                if (isAccess) {
                                    break;
                                }
                            }
                            if (isAccess) {
                                //element.toggleClass('ng-hide', false);
                                element.show();
                            } else {
                                //element.toggleClass('ng-hide', true);
                                element.hide();
                            }
                        } else {
                            //element.toggleClass('ng-hide', true);
                            element.hide();
                        }
                    }
                }
            });
            element.hide();
            //element.toggleClass('ng-hide', true);
        };
        return {
            //require: 'ngModel',
            link: function ($scope, element, attrs, ctrl) {

                render($scope, element, attrs, ctrl);
                // When change content by $location.path()
                $scope.$on('$viewContentLoaded', function () {
                    render($scope, element, attrs, ctrl);
                });
            }
        }
    }]);
    app.directive('authData', ['$rootScope', '$parse', 'authService', function ($rootScope, $parse, authService) {
        var render = function ($scope, element, attrs) {
            $rootScope.$watch("isAuthLoaded", function () {
                if ($rootScope.isAuthLoaded == true) {
                    if (authService.authentication.isAuth) {
                        var value = $parse('authentication.' + attrs.authData)(authService);
                        angular.element(element).text(value);
                        element.show();
                    } else {
                        element.hide();
                    }
                    //element.toggleClass('ng-hide', !authService.authentication.isAuth);
                }
            });
            element.hide();
        };
        return {
            restrict: 'A',
            link: function ($scope, element, attrs, ctrl) {

                render($scope, element, attrs, ctrl);
                // When change content by $location.path()
                $scope.$on('$viewContentLoaded', function () {
                    render($scope, element, attrs, ctrl);
                });
            }
        }
    }]);
})();
