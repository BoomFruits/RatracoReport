(function() {
    'use strict';

    var app = angular.module('app.dashboard');
    app.controller('DashboardController', DashboardController);

    //DashboardController.$inject = ['$scope', '$state', '$timeout', 'ChartData', 'authService'];
    //function DashboardController($scope, $state, $timeout, ChartData, authService) {
    DashboardController.$inject = ['$rootScope', '$scope', '$state', '$timeout', 'authService', '$location'];
    function DashboardController($rootScope, $scope, $state, $timeout, authService, $location) {
        // if (!authService.authentication.isAuth) {
        //     $state.go('page.welcome');
        //     return;
        // }
        console.log('DashboardController', DashboardController);
        $scope.urlsetting = {
            tmsurl: 'https://dev.ratraco.tlsoft.com.vn'
        };
        if (!$rootScope.$settings.isdevelop) {
            $scope.urlsetting.tmsurl= 'https://tms.ratraco.vn'
        };
        // var vm = this;
        // activate();

        // ////////////////

        // function activate() {

        //   // SPLINE
        //   // ----------------------------------- 
        //   //vm.splineData = ChartData.load('server/chart/spline.json');
        //   vm.splineOptions = {
        //       series: {
        //           lines: {
        //               show: false
        //           },
        //           points: {
        //               show: true,
        //               radius: 4
        //           },
        //           splines: {
        //               show: true,
        //               tension: 0.4,
        //               lineWidth: 1,
        //               fill: 0.5
        //           }
        //       },
        //       grid: {
        //           borderColor: '#eee',
        //           borderWidth: 1,
        //           hoverable: true,
        //           backgroundColor: '#fcfcfc'
        //       },
        //       tooltip: true,
        //       tooltipOpts: {
        //           content: function (label, x, y) { return x + ' : ' + y; }
        //       },
        //       xaxis: {
        //           tickColor: '#fcfcfc',
        //           mode: 'categories'
        //       },
        //       yaxis: {
        //           min: 0,
        //           max: 150, // optional: use it for a clear represetation
        //           tickColor: '#eee',
        //           position: ($scope.app.layout.isRTL ? 'right' : 'left'),
        //           tickFormatter: function (v) {
        //               return v/* + ' visitors'*/;
        //           }
        //       },
        //       shadowSize: 0
        //   };


        //   // PANEL REFRESH EVENTS
        //   // ----------------------------------- 

        //   $scope.$on('panel-refresh', function(event, id) {
            
        //     console.log('Simulating chart refresh during 3s on #'+id);

        //     // Instead of timeout you can request a chart data
        //     $timeout(function(){
              
        //       // directive listen for to remove the spinner 
        //       // after we end up to perform own operations
        //       $scope.$broadcast('removeSpinner', id);
              
        //       console.log('Refreshed #' + id);

        //     }, 3000);

        //   });


        //   // PANEL DISMISS EVENTS
        //   // ----------------------------------- 

        //   // Before remove panel
        //   $scope.$on('panel-remove', function(event, id, deferred){
            
        //     console.log('Panel #' + id + ' removing');
            
        //     // Here is obligatory to call the resolve() if we pretend to remove the panel finally
        //     // Not calling resolve() will NOT remove the panel
        //     // It's up to your app to decide if panel should be removed or not
        //     deferred.resolve();
          
        //   });

        //   // Panel removed ( only if above was resolved() )
        //   $scope.$on('panel-removed', function(event, id){

        //     console.log('Panel #' + id + ' removed');

        //   });
        //   //List ta
        // }
        $scope.DateTimeNow = new Date();
        // Load list function
        $scope.loaded = false;
        $scope.master = {};
        $scope.data = [];
        $scope.machines = [];
        $scope.userName = '';
        
    }
})();