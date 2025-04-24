/**=========================================================
 * Module: app.taucomment
 * Provides a simple way to scrollable element
 =========================================================*/

(function() {
    'use strict';

    var app = angular.module('app.utils');
    app.directive('onFinishRender', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit(attr.onFinishRender);
                    });
                }
            }
        }
    });   

})();
