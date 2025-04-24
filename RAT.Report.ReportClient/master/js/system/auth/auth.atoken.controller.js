(function () {
    'use strict';
    var app = angular.module('app.auth');
    app.controller('MyTokenCtrl', ['$scope', '$location', 'authService', 'localDataService', 'ENV', function ($scope, $location, authService, localDataService, ENV) {
        var search = $location.search();
        var doRedirect = function ($location, returnUrl, defaultUrl) {
            $location.search('k', undefined);
            if (returnUrl) {
                window.location.href = decodeURIComponent(returnUrl);
            } else {
                if (!defaultUrl) {
                    defaultUrl = '/';
                }
                $location.path(defaultUrl);
            }
        }
        var markAsTokenChecked = function () {
            localDataService.set('is_token_checked', 1);
        }
        if (search.k) {
            authService.retrieveToken(search.k).then(function (o) {
                var success = authService.saveToken(o.data);
                markAsTokenChecked();
                if (success) {
                    var returnUrl = localDataService.get('logon_return_url');
                    if (returnUrl) {
                        doRedirect($location, decodeURIComponent(returnUrl));
                    } else {
                        doRedirect($location);
                    }
                } else {
                    console.log('Not found token by key ' + search.k);
                    doRedirect($location);
                }
            }, function () {
                console.log('Err when retrieve token by key');
                markAsTokenChecked();
                doRedirect($location);
            });
        } else {
            doRedirect($location);
        }
    }]);
})();
