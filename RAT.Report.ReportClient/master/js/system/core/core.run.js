(function() {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    appRun.$inject = ['$rootScope', '$injector', '$state', '$stateParams', '$window', '$filter', '$interval', '$timeout', '$templateCache', 'Colors', 'localDataService', 'xdLocalStorage', 'authService', 'ENV'];
    
    function appRun($rootScope, $injector, $state, $stateParams, $window, $filter, $interval, $timeout, $templateCache, Colors, localDataService, xdLocalStorage, authService, ENV) {
        var isOpeningModal = false;
        var showModalUnauthorized = function (message, messageDetail) {
            if (!isOpeningModal) {
                var $modal = $injector.get('$uibModal');
                var $location = $injector.get('$location');
                var modalInstance = $modal.open({
                    templateUrl: 'app/views/unauthorized.html',
                    controller: 'UnauthorizedCtrl',
                    resolve: {
                        Message: function () {
                            return message;
                        },
                        MessageDetail: function () {
                            return messageDetail;
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
                    isOpeningModal = false;
                }, function () {
                    $location.path('/');
                    isOpeningModal = false;
                });
                isOpeningModal = true;
            }
        }

        var openVersionOutOfDateModal = function (oldVersion, newVersion) {
            if (!isOpeningModal) {
                var $modal = $injector.get('$uibModal');
                var $location = $injector.get('$location');
                var modalInstance = $modal.open({
                    templateUrl: 'app/views/version_out_of_date_modal.html',
                    controller: 'VersionOutOfDateModalController',
                    resolve: {
                        oldVersion: function () {
                            return oldVersion;
                        },
                        newVersion: function () {
                            return newVersion;
                        }
                    }
                });
                modalInstance.result.then(function (shouldLoginRedirect) {
                    isOpeningModal = false;
                }, function () {
                    isOpeningModal = false;
                });
                isOpeningModal = true;
            }
        };

        // System settings
        $rootScope.$settings = {};
        $rootScope.$settings.isdevelop = true;
        //console.log('$window.href', $window);
        if (!($window.location.hostname.toLowerCase().includes('local')
           || $window.location.hostname.toLowerCase().includes('dev'))) {
            $rootScope.$settings.isdevelop = false;
        }

        var applySettings = function (isFirst) {
            var env = $injector.get('ENV');
            var http = $injector.get('$http');
            var settingsURL = env.urlApiRatBaoCao + 'api/System/GetSettings';
            http.get(settingsURL).success(function (settings) {
                // Values of settings
                angular.forEach(settings, function (val, key) {
                    if (key == 'TimeServer') {
                        $rootScope.$settings[key] = new Date($filter('date')(val, 'yyyy-MM-dd HH:mm:ss.sss'));
                    } else {
                        $rootScope.$settings[key] = val;
                    }
                });

                // Check version is out of date
                if ($rootScope.$settings.Version) {
                    var serverVersion = $rootScope.$settings.Version;
                    var clientVersion = jQuery("html").attr('version')
                    if (serverVersion && clientVersion != serverVersion) {
                        openVersionOutOfDateModal(clientVersion, serverVersion);
                    }
                }

                // Mark as loaded settings
                if (isFirst) {
                    $rootScope.loadedSettings = true;
                }

                // Refresh setting values after 5 minutes
                var interval = 300000;
                $timeout(function () {
                    applySettings(false);
                }, interval);
            }).error(function (err) {
                // Refresh setting values after 5 minutes
                var interval = 300000;
                console.log('GetSettings error', err);
                $timeout(function () {
                    applySettings(false);
                }, interval);
            });
        }
        var authRefresh = function () {
            //showModalUnauthorized();
            if ($rootScope.isAuthLoaded) {
                var authData = localDataService.get('authorization');
                var cscode = localDataService.get('cscode');
                if (authData && cscode) {
                    var isShowingModal = false;
                    try {
                        cscode = authService.textDecode(cscode);
                        //console.log(authData);
                        if (authData.expires) {
                            var expiredDt = new Date(authData.expires);
                            var now = new Date();
                            if (now.getTime() + 60 * 1000 > expiredDt.getTime()) {
                                authService.signOut();
                                if (!isShowingModal) {
                                    showModalUnauthorized();
                                    isShowingModal = true;
                                }
                            }
                        }
                    } catch (err) {
                        //not our message, can ignore
                    }
                    if (!isShowingModal) {
                        if (authService.authentication.isAuth) {
                            if (!authData || (cscode + authData.token) != authService.token()) {
                                window.location.reload(true);
                            }
                        } else {
                            if (authData && cscode && authData.token) {
                                window.location.reload(true);
                            }
                        }
                    }
                } else {

                }
                /*
                xdLocalStorage.getItem('xd.authorization').then(function (data) {
                    xdLocalStorage.getItem('cscode', true).then(function (cscode) {
                        cscode = cscode ? authService.textDecode(cscode.value) : null;
                        var authData;
                        if (data.value) {
                            try {
                                authData = JSON.parse(data.value);
                                if (authData.expires) {
                                    var expiredDt = new Date(authData.expires);
                                    var now = new Date();
                                    if (now.getTime() + 60 * 1000 > expiredDt.getTime()) {
                                        authService.logOut().then(function () {
                                            showModalUnauthorized();
                                        });
                                    }
                                }
                            } catch (err) {
                                //not our message, can ignore
                            }
                        }
                        
                        if (authService.authentication.isAuth) {
                            if (!authData || (cscode + authData.token) != authService.token()) {
                                window.location.reload(true);
                            }
                        } else {
                            if (authData && cscode && authData.token) {
                                window.location.reload(true);
                            }
                        }
                    });
                });
                */
            }
        }
        
        localDataService.init();
        applySettings(true);
        $rootScope.ENV = ENV;
        //$rootScope.ShowModalUnauthorized = showModalUnauthorized;
        $interval(authRefresh, 5000);
        $interval(function () {
            if ($rootScope.$settings.TimeServer) {
                $rootScope.$settings.TimeServer.setSeconds($rootScope.$settings.TimeServer.getSeconds() + 1);
            }
        }, 1000);
        
        // Set reference to access them from any scope
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$storage = $window.localStorage;

        // Uncomment this to disable template cache
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            if (typeof(toState) !== 'undefined'){
              $templateCache.remove(toState.templateUrl);
            }
        });

        // Allows to use branding color with interpolation
        // {{ colorByName('primary') }}
        $rootScope.colorByName = Colors.byName;

        // cancel click event easily
        $rootScope.cancel = function ($event) {
            $event.stopPropagation();
        };

        // Hooks Example
        // ----------------------------------- 

        // Hook not found
        $rootScope.$on('$stateNotFound',
          function (event, unfoundState/*, fromState, fromParams*/) {
              console.log(unfoundState.to); // "lazy.state"
              console.log(unfoundState.toParams); // {a:1, b:2}
              console.log(unfoundState.options); // {inherit:false} + default options
          });
        // Hook error
        $rootScope.$on('$stateChangeError',
          function (event, toState, toParams, fromState, fromParams, error) {
              console.log(error);
          });
        // Hook success
        $rootScope.$on('$stateChangeSuccess',
          function (/*event, toState, toParams, fromState, fromParams*/) {
              // display new view from top
              $window.scrollTo(0, 0);
              // Save the route title
              $rootScope.currTitle = $state.current.title;
          });

        // Load a title dynamically
        $rootScope.currTitle = $state.current.title;
        $rootScope.pageTitle = function () {
            var title = $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
            document.title = title;
            return title;
        };

    }
})();

