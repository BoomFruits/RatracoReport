(function () {
    'use strict';

    var app = angular.module('app.auth');
    app.service('authInterceptorService', ['$q', '$injector', '$location', '$window', 'localStorageService', function ($q, $injector, $location, $window, localStorageService) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var authInterceptorServiceFactory = {};
        var _request = function (config) {

            config.headers = config.headers || {};
            var authService = $injector.get('authService');
            //var authData = localStorageService.get('authorizationData');
            if (authService.authentication.isAuth) {
                //config.headers.Authorization = 'Bearer ' + authData.token;
                config.headers.Authorization = 'Bearer ' + authService.token();
                config.headers.userName = authService.authentication.userName;
            }

            return config;
        }

        var _isShowingModal = false;

        var _showModalUnauthorized = function (rejection) {
            //var SweetAlert = $injector.get('SweetAlert');
            if (swal !== undefined && swal !== null) {
                swal.close();
            } 

            var $modal = $injector.get('$uibModal');
            var modalInstance = $modal.open({
                templateUrl: 'app/views/unauthorized.html',
                controller: 'UnauthorizedCtrl',
                resolve: {
                    Message: function () {
                        return rejection.data.Message;
                    },
                    MessageDetail: function () {
                        return rejection.data.MessageDetail;
                    }
                },
                backdropClass: 'backdrop-unauthorized'
            });
            modalInstance.result.then(function (shouldLoginRedirect) {
                if (shouldLoginRedirect) {
                    window.location.href = shouldLoginRedirect;
                } else {
                    $location.path('/');
                }
                _isShowingModal = false;
            }, function () {
                _isShowingModal = false;
                $location.path('/');
            });
        }

        var _responseError = function (rejection) {
            if (rejection.status === 401) {
                var authService = $injector.get('authService');
                //var authData = localStorageService.get('authorizationData');
                if (authService.authentication.isAuth && authService.authentication.useRefreshTokens) {
                    $location.path('/refresh');
                    return $q.reject(rejection);
                } else if (authService.authentication.isAuth && (!rejection || !rejection.data || rejection.data.Message != 'MustTwoFactor')) {
                    authService.signOut();
                    if (!_isShowingModal) {
                        var objMsg = { data: {} };
                        _isShowingModal = true;
                        _showModalUnauthorized(objMsg);
                    }
                } else {
                    if (!_isShowingModal) {
                        _isShowingModal = true;
                        _showModalUnauthorized(rejection);
                    }
                }
            }
            return $q.reject(rejection);
        }

        authInterceptorServiceFactory.request = _request;
        authInterceptorServiceFactory.responseError = _responseError;

        return authInterceptorServiceFactory;

    }]);
})();
