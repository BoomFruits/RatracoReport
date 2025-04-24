(function () {
    'use strict';
    var app = angular.module('app.auth');
    app.controller('LogoutCtrl', ['ENV', 'authService', function (ENV, authService) {
        authService.signOut();
        var returnUrl = encodeURIComponent(window.location.origin + '/#/page/welcome');
        window.location.href = ENV.urlLogoutSso + '/sso?r=' + returnUrl;
        /*
        var str = new String(Math.random());
        var id = str.substr(str.indexOf(".") + 1);
        xdLocalStorage.setItem('url_' + id, encodeURIComponent(window.location.origin + window.location.pathname), true).then(function () {
            window.location.href = ENV.urlLogoutSso + '/' + id;
        });
        */
    }]);
})();
