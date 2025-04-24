(function () {
    'use strict';
    angular.module('app.auth').service('xdLocalStorage', ['$q', '$rootScope', function ($q, $rootScope) {
        var iframeReady = false;
        var apiReady = $q.defer();

        var unregister = $rootScope.$watch(function () {
            return iframeReady;
        }, function () {
            apiReady.resolve(true);
            unregister();
        });

        function waitForApi() {
            if (!xdLocalStorage.wasInit()) {
                throw 'You must init xdLocalStorage in app config before use';
            }
            return apiReady.promise;
        }
        function action(method) {
            var args = Array.prototype.slice.call(arguments, 1);
            return waitForApi().then(function () {
                var defer = $q.defer();
                xdLocalStorage[method].apply(this, args.concat(function () {
                    var result = arguments[0];
                    $rootScope.$apply(function () {
                        defer.resolve(result);
                    });
                }));
                return defer.promise;
            });
        }
        return {
            init: function (options) {
                var defer = $q.defer();
                options.initCallback = function () {
                    $rootScope.$apply(function () {
                        iframeReady = true;
                        defer.resolve();
                    });
                };
                xdLocalStorage.init(options);
                return defer.promise;
            },
            setItem: function (key, value, isCookie) {
                return action('setItem', key, value, isCookie);
            },
            getItem: function (key, isCookie) {
                return action('getItem', key, isCookie);
            },
            removeItem: function (key, isCookie) {
                return action('removeItem', key, isCookie);
            },
            key: function (index, isCookie) {
                return action('key', index, isCookie)
            },
            clear: function (isCookie) {
                return action('clear', isCookie);
            },
            wasInit: function () {
                return xdLocalStorage.wasInit();
            }
        };
    }]);
})();
