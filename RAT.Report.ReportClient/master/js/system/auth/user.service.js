(function () {
    'use strict';

    var app = angular.module('app.auth');
    app.service('UserService', ['$server', 'ENV', function ($server, ENV) {
        var serviceFactory = {};
        var rs = $server('', {}, {
            GetUserInfo: { method: 'GET', url: ENV.urlApiRatBaoCao + 'api/User/GetUserInfo' },
            CheckTwoFactor: { method: 'GET', url: ENV.urlApiRatBaoCao + 'api/User/CheckTwoFactor' },
        });

        serviceFactory.GetUserInfo = function () {
            return rs.GetUserInfo();
        }

        serviceFactory.CheckTwoFactor = function () {
            return rs.CheckTwoFactor();
        }

        return serviceFactory;
    }]);
})();