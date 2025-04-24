(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .service('SidebarLoader', SidebarLoader);

    SidebarLoader.$inject = ['$http', 'ENV'];
    function SidebarLoader($http, ENV) {
        this.getMenu = getMenu;

        ////////////////

        function getMenu(onReady, onError) {
          //var menuJson = 'server/sidebar-menu.json',
            //    menuURL  = menuJson + '?v=' + (new Date().getTime()); // jumps cache
            var menuURL = ENV.urlApiRatBaoCao + 'api/System/GetSideBarMenuItems';
            
          onError = onError || function() { alert('Failure loading menu'); };

          $http
            .get(menuURL)
            .success(onReady)
            .error(onError);
        }
    }
})();