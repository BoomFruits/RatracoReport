/**=========================================================
 * Module: form-wizard.js
 * Handles form wizard plugin and validation
 =========================================================*/


(function() {
    'use strict';

    angular
        .module('app.forms')
        .directive('formWizard', formWizard);

    formWizard.$inject = ['$parse'];
    function formWizard ($parse) {
        var directive = {
            link: link,
            restrict: 'A',
            scope: true
        };
        return directive;

        function link(scope, element, attrs) {
            var validate = $parse(attrs.validateSteps)(scope);
            var current = 1;
            if (attrs.formWizard) {
                current = parseInt($parse(attrs.formWizard)(scope), 10);
            }
            var wiz = new Wizard(attrs.steps, !!validate, element);
            scope.wizard = wiz.init(current);
        }

        function Wizard (quantity, validate, element) {
          
            var self = this;
            self.quantity = parseInt(quantity, 10);
            self.validate = validate;
            self.element = element;

            self.init = function (current) {
                self.createsteps(self.quantity);
                if (current > 1 && current <= self.quantity) {
                    self.steps[current] = true;
                } else {
                    self.go(current); // always start at fist step
                }
                return self;
            };

            self.go = function (step) {
                if (angular.isDefined(self.steps[step])) {
                    if (self.validate && step !== 1) {
                        var form = $(self.element);
                        var group = form.children().children('div').get(step - 2);

                        if (false === form.parsley().validate(group.id)) {
                            return false;
                        }
                    }

                    self.cleanall();
                    self.steps[step] = true;

                }
            };

            self.active = function (step) {
                return !!self.steps[step];
            };

            self.cleanall = function () {
                for (var i in self.steps) {
                    self.steps[i] = false;
                }
            };

            self.createsteps = function (q) {
                self.steps = [];
                for (var i = 1; i <= q; i++) self.steps[i] = false;
            };
        }
    }
})();
