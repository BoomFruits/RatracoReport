/**=========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 =========================================================*/

(function () {
    'use strict';

    var app = angular.module('app.routes');
    app.provider('RouteHelpers', ['APP_REQUIRES', function (APP_REQUIRES) {

        /* jshint validthis:true */
        return {
            // provider access level
            basepath: basepath,
            resolveFor: resolveFor,
            resolveAuthFor: resolveAuthFor,
            // controller access level
            $get: function () {
                return {
                    basepath: basepath,
                    resolveFor: resolveFor,
                    resolveAuthFor: resolveAuthFor
                };
            }
        };

        // Set here the base of the relative path
        // for all app views
        function basepath(uri) {
            return 'app/views/' + uri;
        }

        function resolveAuthFor() {
            var _args = arguments;
            var items = [];
            for (var i = 0; i < _args.length; i++) {
                items.push(_args[i]);
            }
            var obj = resolveFor(items);
            var dest = angular.extend({}, obj, {
                authUser: promiseAuth()
            });
            //console.log(dest);
            return dest;
        }

        // Generates a resolve object by passing script names
        // previously configured in constant.APP_REQUIRES
        function resolveFor() {
            var _args = arguments;
            if (_args.length == 1 && angular.isArray(_args[0])) {
                _args = _args[0];
            }
            return {
                //authUser: promiseAuth(),
                deps: ['$ocLazyLoad', '$q', function ($ocLL, $q) {
                    // Creates a promise chain for each argument
                    var promise = $q.when(1); // empty promise
                    for (var i = 0, len = _args.length; i < len; i++) {
                        promise = andThen(_args[i]);
                    }
                    return promise;

                    // creates promise to chain dynamically
                    function andThen(_arg) {
                        // also support a function that returns a promise
                        if (typeof _arg === 'function') {
                            return promise.then(_arg);
                        } else {
                            return promise.then(function () {
                                // if is a module, pass the name. If not, pass the array
                                var whatToLoad = getRequired(_arg);
                                // simple error check
                                if (!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                                // finally, return a promise

                                return $ocLL.load(whatToLoad);
                            });
                        }
                    }
                    // check and returns required data
                    // analyze module items with the form [name: '', files: []]
                    // and also simple array of script files (for not angular js)
                    function getRequired(name) {
                        if (APP_REQUIRES.modules)
                            for (var m in APP_REQUIRES.modules)
                                if (APP_REQUIRES.modules[m].name && APP_REQUIRES.modules[m].name === name)
                                    return APP_REQUIRES.modules[m];
                        return APP_REQUIRES.scripts && APP_REQUIRES.scripts[name];
                    }

                }]
            };
        } // resolveFor
        function promiseAuth() {
            return ['$q', '$injector', '$rootScope', '$timeout', 'localDataService', 'authService', 'ENV', function ($q, $injector, $rootScope, $timeout, localDataService, authService, ENV) {
                if ($rootScope.isAuthLoaded) {
                    return authService.authentication;
                } else {
                    var isTokenChecked = localDataService.get('is_token_checked');
                    if (isTokenChecked && parseInt(isTokenChecked, 10) > 0) {
                        var authData = localDataService.get('authorization');
                        var cscode = localDataService.get('cscode');
                        if (cscode && authData && authData.token) {
                            cscode = authService.textDecode(cscode);
                            authService.fillAuthData(authData, cscode + authData.token);
                        }
                        $rootScope.isAuthLoaded = true;
                        $rootScope.$user = authService.authentication;
                    } else {
                        localDataService.set('logon_return_url', encodeURIComponent(window.location.href));
                        var returnUrl = window.location.origin + '/#/page/atoken';
                        //window.location.href = ENV.urlShareTokenSso + '?r=' + encodeURIComponent(returnUrl);
                    }
                    /*
                    var defer = $q.defer();

                    xdLocalStorage.init({
                        iframeUrl: ENV.urlIframeSso
                    }).then(function () {
                        
                        xdLocalStorage.getItem('xd.authorization').then(function (data) {
                            
                            xdLocalStorage.getItem('cscode', true).then(function (cscode) {
                                if (cscode.value) {
                                    cscode = authService.textDecode(cscode.value);
                                    var authData;
                                    if (data.value) {
                                        try {
                                            authData = JSON.parse(data.value);
                                        } catch (err) {
                                            //not our message, can ignore
                                        }
                                    }
                                    if (authData && authData.token) {
                                        authService.fillAuthData(authData, cscode + authData.token);
                                    }
                                    $rootScope.isAuthLoaded = true;
                                    $rootScope.$user = authService.authentication;
                                    defer.resolve(authService.authentication);
                                } else {
                                    
                                    xdLocalStorage.removeItem('xd.authorization').then(function () {
                                        $rootScope.isAuthLoaded = true;
                                        $rootScope.$user = authService.authentication;
                                        defer.resolve({});
                                    }, function () {
                                        $rootScope.isAuthLoaded = true;
                                        $rootScope.$user = authService.authentication;
                                        defer.resolve({});
                                    });
                                }
                            }, function () {
                                xdLocalStorage.removeItem('xd.authorization').then(function () {
                                    $rootScope.isAuthLoaded = true;
                                    $rootScope.$user = authService.authentication;
                                    defer.resolve({});
                                }, function () {
                                    $rootScope.isAuthLoaded = true;
                                    $rootScope.$user = authService.authentication;
                                    defer.resolve({});
                                });
                            });
                        }, function (err) {
                            $rootScope.isAuthLoaded = true;
                            $rootScope.$user = authService.authentication;
                            defer.resolve({});
                        });
                    }, function (err) {
                        $rootScope.isAuthLoaded = true;
                        $rootScope.$user = authService.authentication;
                        defer.resolve({});
                    });
                    return defer.promise;
                    */
                }
            }];
        }
    }]);
})();
