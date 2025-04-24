(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('UserBlockController', UserBlockController);

    UserBlockController.$inject = ['$rootScope', '$scope', 'authService'];
    function UserBlockController($rootScope, $scope, authService) {

        activate();

        ////////////////

        function activate() {
            
            if (authService.authentication.isAuth) {
                $rootScope.user = {
                    name: authService.authentication.userName,
                    //job: 'ng-developer',
                    job:'Ði?u hành ch?y tàu',
                    //picture: 'app/img/user/13.jpg'
                    picture: 'app/img/user/user.png'
                };
            } else {
                $rootScope.user = null;
            }

            // Hides/show user avatar on sidebar
            $rootScope.toggleUserBlock = function () {
                $rootScope.$broadcast('toggleUserBlock');
            };

            $rootScope.userBlockVisible = true;

            var detach = $rootScope.$on('toggleUserBlock', function (/*event, args*/) {

                $rootScope.userBlockVisible = !$rootScope.userBlockVisible;

            });

            $scope.$on('$destroy', detach);
        }
    }
})();
