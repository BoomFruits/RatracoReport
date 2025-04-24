(function () {
    'use strict';
    var app = angular.module('app.core');
    app.service('preventTemplateCache', ['$rootScope', '$q', '$injector', '$timeout', function ($rootScope, $q, $injector, $timeout) {
        var failVersion = '0.0';
        var emptyVersion = '0.0.0';
        var isRequesting = false;
        var buildPreventCacheUrl = function (url, version) {
            if (url.indexOf('?') != -1) {
                return url + '&v=' + version;
            } else {
                return url + '?v=' + version;
            }
        }
        var isMasterPage = function (url) {
            var masterPages = [
                'app/views/app.html',
                'app/views/app-h.html',
                'app/views/partials/sidebar.html',
                'app/views/partials/offsidebar.html',
                'app/views/partials/top-navbar.html',
                'app/views/partials/top-navbar-h.html'
            ];
            for (var i = 0; i < masterPages.length; i++) {
                if (url.endsWith(masterPages[i])) {
                    return true;
                }
            }
            return false;
        }
        return {
            'request': function (config) {
                // Only process static html file inside folder [app/views],[app/pages]
                if (config.url.substr(-5) == '.html' && (config.url.indexOf('app/views/') != -1 || config.url.indexOf('app/pages/') != -1) && !isMasterPage(config.url)) {
                    // If ready loaded settings
                    if ($rootScope.loadedSettings) {
                        var buildVersion = $rootScope.$settings && $rootScope.$settings.DeployVersion ? $rootScope.$settings.DeployVersion : emptyVersion;
                        config.url = buildPreventCacheUrl(config.url, buildVersion);
                        return config;
                    } else {
                        // Create defer
                        var defer = $q.defer();

                        // Only first request should call get settings from server 
                        if (!isRequesting) {
                            // Mark as requesting
                            isRequesting = true;

                            // Retrieve settings
                            var maxRetrieve = 20;
                            var retrieve = 0;
                            var retrieveSettings = function () {
                                // Retrieve
                                retrieve++;
                                if ($rootScope.loadedSettings) {
                                    var buildVersion = $rootScope.$config && $rootScope.$config.PVersion ? $rootScope.$config.PVersion : emptyVersion;
                                    config.url = buildPreventCacheUrl(config.url, buildVersion);
                                    defer.resolve(config);
                                } else {
                                    // Load url with build version
                                    // Retrieve in 200 miniseconds
                                    if (retrieve < maxRetrieve) {
                                        $timeout(retrieveSettings, 500);
                                    } else {
                                        config.url = buildPreventCacheUrl(config.url, failVersion);
                                        defer.resolve(config);
                                    }
                                }
                            }
                            $timeout(retrieveSettings, 500);
                        } else {
                            // All other request should loop to check result from first request 
                            var retrieveBuildVersion = function () {
                                if (!$rootScope.loadedSettings) {
                                    // Retrieve in 200 miniseconds
                                    $timeout(retrieveBuildVersion, 200);
                                } else {
                                    // Load url with build version
                                    var buildVersion = $rootScope.$config && $rootScope.$config.PVersion ? $rootScope.$config.PVersion : emptyVersion;
                                    config.url = buildPreventCacheUrl(config.url, buildVersion);
                                    defer.resolve(config);
                                }
                            }
                            $timeout(retrieveBuildVersion, 200);
                        }
                        return defer.promise;
                    }
                } else {
                    return config;
                }
            }
        }
    }]);
    app.service('localDataService', ['localStorageService', 'ENV', function (localStorageService, ENV) {
        var keyPrefix = 'ldv_' + ENV.version + '_';
        var serviceFactory = {};

        // init
        serviceFactory.init = function () {
            // Init to delete local data for old version
            angular.forEach(localStorageService.keys(), function (value, key) {
                var pattern = /^ldv_(\d+\.\d+\.\d+)_(.*)/g;
                var match = pattern.exec(value);
                if (match) {
                    if (match[1] != ENV.version) {
                        localStorageService.remove(value);
                    }
                }
            });
        };

        // Wrapper to remove
        serviceFactory.remove = function (key, value, skipVerion) {
            if (skipVerion) {
                return localStorageService.remove(key, value);
            } else {
                var realKey = keyPrefix + key;
                return localStorageService.remove(realKey, value);
            }
        };

        // Wrapper to set
        serviceFactory.set = function (key, value, skipVerion) {
            if (skipVerion) {
                return localStorageService.set(key, value);
            } else {
                var realKey = keyPrefix + key;
                return localStorageService.set(realKey, value);
            }
        };

        // Wrapper to get
        serviceFactory.get = function (key, skipVerion) {
            if (skipVerion) {
                return localStorageService.get(key);
            } else {
                var realKey = keyPrefix + key;
                return localStorageService.get(realKey);
            }
        };

        return serviceFactory;
    }]);

    app.service('tmpDataService', ['localDataService', function (localDataService) {

        var t = this;

        this.tmpData = {};

        var serviceFactory = {};

        var compare = function (a, b) {
            if (a.value.expired > b.value.expired)
                return -1;
            if (a.value.expired < b.value.expired)
                return 1;
            return 0;
        }

        // Wrapper to set
        serviceFactory.set = function (key, value, isLocalStorage, expired) {
            var localKey = "tLocalData";
            var localValue;
            if (isLocalStorage) {
                localValue = localDataService.get(localKey);
            } else {
                localValue = t.tmpData;
            }
            if (!localValue) {
                localValue = {};
            }
            if (typeof (expired) == 'undefined') {
                expired = 15; // Default expired after 15 minutes
            }

            var expiredDt = new Date();
            expiredDt.setMinutes(expiredDt.getMinutes() + expired);
            expired = expiredDt.getTime();

            var prefix = "tLocalValue";
            var realKey = prefix + key;
            localValue[realKey] = { value: value, expired: expired };
            if (isLocalStorage) {
                localDataService.set(localKey, localValue);
            } else {
                t.tmpData = localValue;
            }

            window.setTimeout(function () {
                var tmp = [];
                for (var item in localValue) {
                    if (typeof (item) == 'string' && item.substr(0, prefix.length) == prefix) {
                        var data = localValue[item];
                        if (data.expired < new Date().getTime()) {
                            delete localValue[item];
                        } else {
                            tmp.push({ key: item, value: data });
                        }
                    }
                }

                // Max tmp item is 100;
                var maxItems = 100;
                if (tmp.length > maxItems) {
                    tmp.sort(compare);
                    for (var i = maxItems; i < tmp.length; i++) {
                        delete localValue[tmp[i].key];
                    }
                }
                if (isLocalStorage) {
                    localDataService.set(localKey, localValue);
                } else {
                    t.tmpData = localValue;
                }
            }, 100);
        };

        // Wrapper to get
        serviceFactory.get = function (key, isLocalStorage) {
            var localValue;
            var localKey = "tLocalData";
            if (isLocalStorage) {
                localValue = localDataService.get(localKey);
            } else {
                localValue = t.tmpData;
            }
            if (localValue) {
                var realKey = "tLocalValue" + key;
                var data = localValue[realKey];
                if (data) {
                    if (data.expired >= new Date().getTime()) {
                        return data.value;
                    } else {
                        delete localValue[realKey];
                        if (isLocalStorage) {
                            localDataService.set(localKey, localValue);
                        } else {
                            t.tmpData = localValue;
                        }
                    }
                }
            }
            return null;
        };

        return serviceFactory;
    }]);
})();
