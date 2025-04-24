(function () {
    'use strict';
    var app = angular.module('app.danhmuc');
    app.service('DanhMucService', ['$resource', '$q', 'ENV', function ($resource, $q, ENV) {
        var serviceFactory = {};
        var rs = $resource(ENV.urlApiRatBaoCao + 'api/DanhMuc/:action', { }, {
            Invoke: { method: 'POST' },
            GetAllKhachHang: { method: 'POST', isArray: true, url: ENV.urlApiRatBaoCao + 'api/DanhMuc/KhachHang' },
            GetAllNCC: { method: 'POST', isArray: true, url: ENV.urlApiRatBaoCao + 'api/DanhMuc/NCC' },
            GetAllZone: { method: 'POST', isArray: true, url: ENV.urlApiRatBaoCao + 'api/DanhMuc/Zone' },
            GetAllHangHoa: { method: 'POST', isArray: true, url: ENV.urlApiRatBaoCao + 'api/DanhMuc/HangHoa' },
            GetAllDonViTinh: { method: 'POST', isArray: true, url: ENV.urlApiRatBaoCao + 'api/DanhMuc/DonViTinh' },
            GetAllLoaiTacNghiep: { method: 'POST', isArray: true, url: ENV.urlApiRatBaoCao + 'api/DanhMuc/LoaiTacNghiep' },
            GetAllDonVi: { method: 'POST', isArray: true, url: ENV.urlApiRatBaoCao + 'api/DanhMuc/DonVi' },
            GetAllLoaiHinhVC: { method: 'POST', isArray: true, url: ENV.urlApiRatBaoCao + 'api/DanhMuc/LoaiHinhVC' },
            GetAllXuongSuaChua: { method: 'POST', isArray: true, url: ENV.urlApiRatBaoCao + 'api/DanhMuc/XuongSuaChua' },
        });
        serviceFactory.Invoke = function (report, input) {
            return rs.Invoke({ action: report }, input).$promise;
        };
        serviceFactory.GetAllKhachHang = function (filter) {
            filter = filter ? filter : {};
            return rs.GetAllKhachHang(filter).$promise;
        };
        serviceFactory.GetAllNCC = function (filter) {
          filter = filter ? filter : {};
          return rs.GetAllNCC(filter).$promise;
        };
        serviceFactory.GetAllZone = function (filter) {
          filter = filter ? filter : {};
          return rs.GetAllZone(filter).$promise;
        };
        serviceFactory.GetAllHangHoa = function (filter) {
          filter = filter ? filter : {};
          return rs.GetAllHangHoa(filter).$promise;
        };
        serviceFactory.GetAllDonViTinh = function (filter) {
          filter = filter ? filter : {};
          return rs.GetAllDonViTinh(filter).$promise;
        };
        serviceFactory.GetAllLoaiTacNghiep = function (filter) {
          filter = filter ? filter : {};
          return rs.GetAllLoaiTacNghiep(filter).$promise;
        };
        serviceFactory.GetAllDonVi = function (filter) {
          filter = filter ? filter : {};
          return rs.GetAllDonVi(filter).$promise;
        };
        serviceFactory.GetAllLoaiHinhVC = function (filter) {
          filter = filter ? filter : {};
          return rs.GetAllLoaiHinhVC(filter).$promise;
        };
        serviceFactory.GetAllXuongSuaChua = function (filter) {
          filter = filter ? filter : {};
          return rs.GetAllXuongSuaChua(filter).$promise;
        };
        return serviceFactory;
    }]);
})();