(function () {
    'use strict';
    var app = angular.module('app.reportbk');
    app.service('ReportBKService', ['$server', 'ENV', function ($server, ENV) {
        var serviceFactory = {};
        var rs = $server(ENV.urlApiRatBaoCao + 'api/ReportBK/:action', {}, {
            Invoke: { method: 'POST' },
            InvokeBlob: { method: 'POST', Blob: true }
        });
        serviceFactory.Invoke = function (report, input) {
            return rs.Invoke({ action: report }, input);
        };
        serviceFactory.InvokeBlob = function (report, input) {
            return rs.InvokeBlob({ action: report }, input);
        };

        return serviceFactory;
    }]);
})();