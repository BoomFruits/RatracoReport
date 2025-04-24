(function () {
    'use strict';

    var app = angular.module('app.danhmuc');

    /**
     * @ngdoc directive
     * @name danhmucApp.directive:validSubmit
     * @description
     * # validSubmit
     */
    app.directive('validSubmit', ['$parse', function ($parse) {
        var linkFn = function ($scope, el, attrs, formCtrl) {
            var fn = $parse(attrs.validSubmit);// alert(fn);
            var form = el.controller('form');
            form.$submitted = false;
            el.on('submit', function (event) {
                $scope.$apply(function () {
                    el.addClass('ng-submitted');
                    form.$submitted = true;
                    if (form.$valid) {
                        fn($scope, { $event: event });
                    } else {

                        //element.removeClass('has-error').addClass('has-success');
                        var formGroups = el[0].querySelectorAll(".form-group");
                        //alert(inputEl);
                        var first = true;
                        angular.forEach(formGroups, function (formGroup) {
                            var inputEl = formGroup.querySelector("[name]");
                            var inputNgEl = angular.element(inputEl);
                            var inputName = inputNgEl.attr('name');
                            if (inputName && formCtrl[inputName].$invalid) {
                                angular.element(formGroup).addClass('has-error');
                                if (first && inputNgEl.focus) {
                                    inputNgEl.focus();
                                    first = false;
                                }
                            }
                        });
                    }
                });
            });
        };
        return {
            restrict: 'A',
            require: '^form',
            compile: function (elem, attrs) {
                return linkFn;
            }
        }
    }]);
    app.directive('showErrors', ['$parse', function ($parse) {
        console.log('showErrors');
        var linkFn = function ($scope, el, attrs, formCtrl) {

            // find the text box element, which has the 'name' attribute
            var inputEl = el[0].querySelector("[name]");

            // convert the native text box element to an angular element
            var inputNgEl = angular.element(inputEl);

            // only apply the has-error class after the user leaves the text box
            inputNgEl.bind('blur', function () {
                setTimeout(function () {
                    // get the name on the text box so we know the property to check
                    // on the form controller
                    var inputName = inputNgEl.attr('name');
                    if (inputName && formCtrl[inputName]) {
                        el.toggleClass('has-error', formCtrl[inputName].$invalid);
                    }
                }, 300);
            });
        };
        return {
            restrict: 'A',
            require: '^form',
            compile: function (elem, attrs) {
                if (!elem.hasClass('form-group')) {
                    throw 'show-errors element does not have the \'form-group\' class';
                }
                return linkFn;
            }
        }
    }]);
       app.directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });
                    event.preventDefault();
                }
            });
        };
    });
       app.directive('enter', function () {
           return function (scope, element, attrs) {
               element.bind("keydown keypress", function (event) {
                   if (event.which === 13) {
                       //alert('hello');
                       event.preventDefault();
                       var fields = $(this).parents('form:eq(0),body').find('input, textarea, select,button');
                       var index = fields.index(this);
                       if (index > -1 && (index + 1) < fields.length)
                           fields.eq(index + 1).focus();
                   }
               });
           };
       });
})();
