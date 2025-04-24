(function() {
    'use strict';

    var app = angular.module('app.dashboard');
    app.service('DashboardService', ['$server', 'ENV', function ($server, ENV) {
        var serviceFactory = {};
        var rs = $server('', {}, {
            GetUserDashboards: { method: 'GET', url: ENV.urlApiRatBaoCao + 'api/Dashboard/GetUserDashboards' },
            GetUserDashboard: { method: 'GET', url: ENV.urlApiRatBaoCao + 'api/Dashboard/GetUserDashboard' },
            UpdateUserDashboard: { method: 'POST', url: ENV.urlApiRatBaoCao + 'api/Dashboard/UpdateUserDashboard' },
            GetDSNgayDiChuaCoGia: { method: 'POST', url: ENV.urlApiRatBaoCao + 'api/Dashboard/GetDSNgayDiChuaCoGia' },
            GetDSNgayDiChuaCoGiaDetails: { method: 'POST', url: ENV.urlApiRatBaoCao + 'api/Dashboard/GetDSNgayDiChuaCoGiaDetails' },
            GetDSNgayDiSaiGia: { method: 'POST', url: ENV.urlApiRatBaoCao + 'api/Dashboard/GetDSNgayDiSaiGia' },
            GetDSNgayDiSaiGiaDetails: { method: 'POST', url: ENV.urlApiRatBaoCao + 'api/Dashboard/GetDSNgayDiSaiGiaDetails', isArray: true },
            DashboardDoanhThuDV: { method: 'POST', url: ENV.urlApiRatBaoCao + 'api/Dashboard/DashboardDoanhThuDV' },
        });
        serviceFactory.GetUserDashboards = function () {
            return rs.GetUserDashboards();
        }
        serviceFactory.GetUserDashboard = function (key) {
            return rs.GetUserDashboard({ key: key });
        }
        serviceFactory.UpdateUserDashboard = function (key, value) {
            return rs.UpdateUserDashboard({ DashboardKey: key, DashboardData: value });
        }
        serviceFactory.GetDSNgayDiChuaCoGia = function (input) {
            return rs.GetDSNgayDiChuaCoGia(input);
        }
        serviceFactory.GetDSNgayDiChuaCoGiaDetails = function (input) {
            return rs.GetDSNgayDiChuaCoGiaDetails(input);
        }
        serviceFactory.GetDSNgayDiSaiGia = function (input) {
            return rs.GetDSNgayDiSaiGia(input);
        }
        serviceFactory.GetDSNgayDiSaiGiaDetails = function (input) {
            return rs.GetDSNgayDiSaiGiaDetails(input);
        }
        serviceFactory.DashboardDoanhThuDV = function (input) {
            return rs.DashboardDoanhThuDV(input);
        }
        return serviceFactory;
    }]);
})();
