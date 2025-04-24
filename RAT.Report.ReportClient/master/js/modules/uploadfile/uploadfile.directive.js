(function () {
    'use strict';

    var app = angular.module('app.danhmuc');

    /**
     * @ngdoc directive
     * @name danhmucApp.directive:validSubmit
     * @description
     * # validSubmit
     */   
    app.directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;
                console.log('element', element);
                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);

})();
