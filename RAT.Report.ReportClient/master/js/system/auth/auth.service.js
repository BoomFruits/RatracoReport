(function () {
    'use strict';
    angular.module('app.auth').service('authService', ['$rootScope', '$http', '$q', 'ENV', 'localDataService', function ($rootScope, $http, $q, ENV, localDataService) {

        var authServiceFactory = {};

        authServiceFactory.retrieveToken = function (k) {
            //return $http({
            //    method: 'GET',
            //    url: ENV.urlApiAuth + 'api/User/RetrieveToken',
            //    data: { Key: k }
            //});
            return $http.get(ENV.urlApiAuth + 'api/User/RetrieveToken', {
                params: { Key: k }
            });
        };

        var _authentication = {
            isAuth: false,
            userName: '',
            roles: [],
            useRefreshTokens: false
        };

        var _token = '';

        var logoutClient = function () {
            _authentication.isAuth = false;
            _authentication.userName = '';
            _authentication.roles = [];
            _authentication.useRefreshTokens = false;
            _token = '';
        }

        var _saveToken = function (tokenData, forceUpdateAuth) {

            if (tokenData && tokenData.Key) {
                var authorization = {
                    token: tokenData.token,
                    userName: tokenData.userName,
                    displayName: tokenData.userName,
                    roles: tokenData.roles,
                    expires: tokenData.expires ? new Date(tokenData.expires) : null,
                    refreshToken: tokenData.refreshToken,
                    useRefreshTokens: tokenData.useRefreshTokens
                };
                localDataService.set('cscode', authServiceFactory.textEncode(tokenData.cscode));
                localDataService.set('authorization', authorization);

                if (!forceUpdateAuth) {
                    _authentication.isAuth = true;
                    _authentication.userName = tokenData.userName;
                    _authentication.displayName = tokenData.displayName;
                    _authentication.useRefreshTokens = tokenData.useRefreshTokens;
                    _authentication.roles = tokenData.roles;
                    _token = tokenData.cscode + tokenData.token;
                    $rootScope.isAuthLoaded = true;
                }

                return true;
            }
            return false;
        };

        var _signOut = function () {
            localDataService.set('is_token_checked', 0);
            localDataService.remove('cscode');
            localDataService.remove('authorization');
            logoutClient();
        };

        var _fillAuthData = function (authData, token) {
            //var authData = localStorageService.get('authorizationData');
            if (authData) {
                _authentication.isAuth = true;
                _authentication.userName = authData.userName;
                _authentication.displayName = authData.displayName;
                _authentication.useRefreshTokens = authData.useRefreshTokens;
                _authentication.roles = authData.roles;
                _token = token;
            }
        };

        var _originCharArr = new Array('a', 'A', 'b', 'B', 'c', 'C', 'd', 'D', 'e', 'E', 'f', 'F', 'g', 'G', 'h', 'H', 'i', 'I', 'j', 'J', 'k', 'K', 'l', 'L', 'm', 'M', 'n', 'N', 'o', 'O', 'p', 'P', 'q', 'Q', 'r', 'R', 's', 'S', 't', 'T', 'u', 'U', 'v', 'V', 'w', 'W', 'x', 'X', 'y', 'Y', 'z', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '_', '-');
        var _complexCharArr = new Array('q1', 'Q1', 'wq', 'Wq', 'ea', 'Ea', 'rz', 'Rz', 't2', 'T2', 'yw', 'Yw', 'us', 'Us', 'ix', 'Ix', 'o3', 'O3', 'pe', 'Pe', 'ad', 'Ad', 'sc', 'Sc', 'd4', 'D4', 'fr', 'Fr', 'gf', 'Gf', 'hv', 'Hv', 'j5', 'J5', 'kt', 'Kt', 'lg', 'Lg', 'zb', 'Zb', 'x6', 'X6', 'cy', 'Cy', 'vh', 'Vh', 'bn', 'Bn', 'n7', 'N7', 'mu', 'Mu', '1j', '2m', '38', '4i', '5k', '69', '7o', '8l', '90', '0p', '01', '02');

        var _textEncode = function (text) {
            text = new String(text);
            var str = '';
            for (var i = 0; i < text.length; i++) {
                var key = null;
                for (var j = 0; j < _originCharArr.length; j++) {
                    if (text[i] == _originCharArr[j]) {
                        key = j;
                        break;
                    }
                }
                var rnd = Math.floor(Math.random() * (_originCharArr.length));
                var tmp = _complexCharArr[key];
                if (i % 2 == 0) {
                    tmp = _originCharArr[rnd] + tmp;
                } else {
                    tmp = tmp + _originCharArr[rnd];
                }
                str += tmp;
            }
            return str;
        }
        var _textDecode = function (text) {
            text = new String(text);
            var len = text.length / 3;
            var str = new String();
            for (var i = 0; i < len; i++) {
                var key = null;
                var item = text.substr(i * 3, 3);
                if (i % 2 == 0) {
                    item = item.substr(1, 2);
                } else {
                    item = item.substr(0, 2);
                }
                for (var j = 0; j < _complexCharArr.length; j++) {
                    if (item == _complexCharArr[j]) {
                        key = j;
                        break;
                    }
                }

                str += _originCharArr[key];
            }
            return str;
        }

        authServiceFactory.saveToken = _saveToken;
        authServiceFactory.signOut = _signOut;
        authServiceFactory.fillAuthData = _fillAuthData;
        authServiceFactory.authentication = _authentication;

        authServiceFactory.token = function () { return _token; }
        authServiceFactory.textEncode = _textEncode;
        authServiceFactory.textDecode = _textDecode;

        return authServiceFactory;
    }]);
})();
