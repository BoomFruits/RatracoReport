(function () {
    'use strict';
    var app = angular.module('app.core');
    app.directive("errorShow", function ($compile) {
        return {
            restrict: "E",
            template: "<span class='text-danger' ng-show='visible()' ng-transclude></span>",
            scope: { type: '@', name: '@' },
            transclude: true,
            require: '^form',
            link: function (scope, element, attrs, formCtrl) {
                var name = scope.name;
                var type = scope.type;
                if (!name) {
                    var inputEl = $('[name]:first', $(element).parent());
                    name = inputEl.attr('name');
                    if (!name) {
                        throw "Directive [error-show] required input element with name attribute";
                    }
                }
                if (!formCtrl[name]) {
                    throw "Directive [error-show] has not found form element [" + name + "]";
                }
                attrs.$observe('name', function (value) {
                    name = value;
                });
                scope.visible = function () {
                    if (formCtrl[name]) {
                        var input = formCtrl[name];
                        if (input) {
                            if (input.$dirty || formCtrl.$submitted) {
                                return input.$error[type];
                            } else {
                                return false;
                            }
                        } else {
                            return false;
                        }
                    } else {
                        throw "Directive [error-show] has not found form element [" + name + "]"
                    }
                }
            }
        };
    });
    app.directive("loadingSpinner", function ($compile) {
        return {
            restrict: "ECA",
            template: "<div class='well well-sm'>"
                    + "<div class='ball-beat text-center'><div></div><div></div><div></div></div>"
                    + "<div ng-show='text' class='text-center'>{{text}}</div>"
                + "</div>",
            scope: { text: '@' },
            //transclude: true,
            link: function (scope, element, attrs, formCtrl) {
                scope.text = scope.text ? scope.text : 'Đang tải dữ liệu ...';
            }
        };
    });
    app.directive('timmer', ['$filter', '$interval', function ($filter, $interval) {
        return {
            link: function ($scope, $element, $attrs) {
                $interval(function () {
                    if ($attrs.hasOwnProperty('value')) {
                        $element.val($filter('date')(new Date(), $attrs.timmer));
                    } else {
                        $element.text($filter('date')(new Date(), $attrs.timmer));
                    }
                }, 1000);
            }
        };
    }]);
    app.directive('includeReplace', function () {
        return {
            require: 'ngInclude',
            restrict: 'A',
            link: function (scope, el, attrs) {
                el.replaceWith(el.children());
            }
        };
    });
    app.directive('asNumber', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function (val) {
                    return window.parseInt(val, 10);
                });
                ngModel.$formatters.push(function (val) {
                    return angular.isDefined(val) ? '' + val : '';
                });
            }
        };
    });
    app.directive('asDate', ['$filter', function ($filter) {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function (val) {
                    if (val) {
                        var format = attrs['asDate'] ? attrs['asDate'] : 'yyyy-MM-dd';
                        return $filter('date')(val, format);
                    }
                    return undefined;
                });
                ngModel.$formatters.push(function (val) {
                    if (val) {
                        if (!angular.isDate(val)) {
                            val = new Date($filter('date')(val, 'yyyy-MM-dd HH:mm:ss'));
                        }
                        return val;
                    }
                    return undefined;
                });
            }
        };
    }]);
    app.filter('first', ['$filter', function ($filter) {
        return function (array, expression, comparator, anyPropertyKey) {
            return $filter('filter')(array, expression, comparator, anyPropertyKey)[0];
        }
    }]);
    app.filter('abs', function () {
        return function (num) { return Math.abs(num); }
    });
    app.filter('empty', function () {
        return function (text, whenEmpty) {
            return text ? text : whenEmpty;
        }
    });
    app.filter('max', function () {
        return function (arr, size, addition) {
            if (arr && angular.isArray(arr) && arr.length > 0 && size > 0) {
                if (addition) {
                    addition = angular.isArray(addition) ? addition : [addition.replace(/\{0\}/g, arr.length - size)];
                    return arr.slice(0, size).concat(addition);
                } else {
                    return arr.slice(0, size);
                }
            }
            return arr;
        }
    });
    app.filter('join', function () {
        return function (arr, separator, prop) {
            if (arr && angular.isArray(arr) && arr.length > 0) {
                return (!angular.isUndefined(prop) ? arr.map(function (item) {
                    return item[prop];
                }) : arr).join(separator);
            }
        }
    });
    app.filter('joinDate', ['$filter', function ($filter) {
        return function (arr, fromText, toText, joinText) {
            if (arr && angular.isArray(arr) && arr.length > 0) {
                if (arr[0] && arr[1]) {
                    return fromText + ' ' + $filter('date')(arr[0], 'dd/MM/yyyy') + ' ' + (joinText ? joinText : 'đến') + ' ' + $filter('date')(arr[1], 'dd/MM/yyyy');
                } else if (arr[0]) {
                    return fromText + ' ' + $filter('date')(arr[0], 'dd/MM/yyyy');
                } else if (arr[1]) {
                    return toText + ' ' + $filter('date')(arr[1], 'dd/MM/yyyy');
                }
            }
        }
    }]);
    app.filter('htmlSafe', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }]);
    app.directive('currencyVn', ['$filter', function ($filter) {
        return {
            require: '?ngModel',
            link: function (scope, elem, attrs, ctrl) {
                if (!ctrl) return;

                ctrl.$formatters.unshift(function (a) {
                    if (ctrl.$modelValue) {
                        return $filter('number')(ctrl.$modelValue, 0).replace('.', ',');
                    } else {
                        return ctrl.$modelValue;
                    }
                });

                ctrl.$parsers.unshift(function (viewValue) {

                    elem.priceFormat({
                        prefix: '',
                        thousandsSeparator: ',',
                        centsSeparator: '.',
                        centsLimit: 0
                    });
                    if (elem[0] && elem[0].value) {
                        return elem[0].value.replace(/\,/g, '');
                    }
                    return elem[0].value;
                });
            }
        };
    }]);
})();
