/*!
 * 
 * Angle - Bootstrap Admin App + AngularJS
 * 
 * Version: 3.3.1
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 * 
 */

// APP START
// ----------------------------------- 

(function (orig) {
    angular.modules = [];
    angular.module = function () {
        if (arguments.length > 1) {
            angular.modules.push(arguments[0]);
        }
        return orig.apply(null, arguments);
    }
})(angular.module);
(function (a) {
    if (!a.exists) {
        a.exists = function (module) {
            if (a.modules.indexOf(module) != -1) {
                return true;
            }
            return false;
        }
    }
})(angular);

(function() {
    'use strict';

    var app = angular
        .module('angle', [
            // System modules
            'app.core',
            'app.config',
            'app.routes',
            'app.sidebar',
            'app.preloader',
            'app.loadingbar',
            'app.translate',
            'app.settings',
            'app.locale',
            'app.auth',

            // Template module
            //'app.navsearch',
            //'app.icons',
            //'app.flatdoc',
            //'app.notify',
            //'app.bootstrapui',
            //'app.elements',
            //'app.panels',
            //'app.charts',
            //'app.forms',
            //'app.maps',
            //'app.tables',
            //'app.extras',
            //'app.mailbox',
            

            // Application modules
            'app.utils',
            //'app.dialogbox',
            'app.pages',
            'app.dashboard',
            'app.danhmuc',
            'app.reportdt01',           
            'app.reportbk',
            'app.reportbc',
            'app.trogiup'
        ]);

    var lazyModules = [
            'app.navsearch',
            'app.icons',
            'app.flatdoc',
            'app.notify',
            'app.bootstrapui',
            'app.elements',
            'app.panels',
            'app.charts',
            'app.forms',
            'app.maps',
            'app.tables',
            'app.extras',
            'app.mailbox'
    ];
    setTimeout(function () {
        angular.forEach(lazyModules, function (dependency) {
            if (angular.exists(dependency)) {
                app.requires.push(dependency)
            }
        });
    });
})();


(function () { 
 return angular.module("app.config", [])
.constant("ENV", {"version":"1.0.0","name":"development","urlLoginSso":"http://dev2.hhauth.vnticketonline.vn:10036/#/login","urlLogoutSso":"http://dev2.hhauth.vnticketonline.vn:10036/#/getout","urlIframeSso":"http://dev2.hhauth.vnticketonline.vn:10036/cdlsi.html","urlShareTokenSso":"http://dev2.hhauth.vnticketonline.vn:10036/#/stoken","urlShareTokenSsoTwoFactor":"http://dev2.hhauth.vnticketonline.vn:10036/#/stoken2f","urlApiAuth":"http://dev2.hhauth.vnticketonline.vn:10036/auth/","urlApiSoatVe":"http://localhost:19833/api","urlApiBanVe":"","urlWebAuth":"http://dev2.hhauth.vnticketonline.vn:10036/","urlApiRatBaoCao":"http://localhost:33615/","urlWebRatraco":"http://localhost:4326/","urlHangHoaSeltHost":"http://localhost:4326/"});

})();

(function() {
    'use strict';

    angular
        .module('app.colors', []);
})();
(function() {
    'use strict';

    angular.module('app.auth', [
        'app.config',
        'ngRoute',
        'LocalStorageModule'
    ]);
})();

(function() {
    'use strict';

    angular
        .module('app.core', [
            'ngRoute',
            'ngAnimate',
            'ngStorage',
            'ngCookies',
            'pascalprecht.translate',
            'ui.bootstrap',
            'ui.router',
            'oc.lazyLoad',
            'cfp.loadingBar',
            'ngSanitize',
            'ngResource',
            'tmh.dynamicLocale',
            'LocalStorageModule',
            'ui.utils',
            'app.config'
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.lazyload', []);
})();
(function() {
    'use strict';

    angular
        .module('app.loadingbar', []);
})();
(function() {
    'use strict';

    angular
        .module('app.preloader', []);
})();


(function() {
    'use strict';

    angular
        .module('app.locale', []);
})();
(function() {
    'use strict';

    angular
        .module('app.settings', []);
})();
(function () {
    'use strict';

    angular.module('app.routes', [
        'app.lazyload',
        'app.auth',
        'app.config'
    ]);
})();
(function() {
    'use strict';

    angular
        .module('app.sidebar', [
            'app.config',
            'app.auth'
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.translate', []);
})();
(function() {
    'use strict';

    angular
        .module('app.utils', [
          'app.colors'
          ]);
})();

/*
* Price Format jQuery Plugin
* Created By Eduardo Cuducos
* Currently maintained by Flavio Silveira flavio [at] gmail [dot] com
*/

(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }
} (function($) {
  'use strict';

  /****************
   * Main Function *
   *****************/
  $.fn.priceFormat = function(options) {

    var options = $.extend(true, {}, $.fn.priceFormat.defaults, options);

    // detect if ctrl or metaKey(Mac) is pressed
    window.ctrl_down = false
    var metaKey = false

    $(window).bind('keyup keydown', function (e) {
        window.ctrl_down = e.ctrlKey;
        return true;
    });

    $(this).bind('keyup keydown', function (e) {
        metaKey = e.metaKey;
        return true;
    });

    return this.each(function() {
      // pre defined options
      var obj = $(this);
      var value = '';
      var is_number = /[0-9]/;

      // Check if is an input
      if (obj.is('input'))
        value = obj.val();
      else
        value = obj.html();

      // load the pluggings settings
      var prefix = options.prefix;
      var suffix = options.suffix;
      var centsSeparator = options.centsSeparator;
      var thousandsSeparator = options.thousandsSeparator;
      var limit = options.limit;
      var centsLimit = options.centsLimit;
      var clearPrefix = options.clearPrefix;
      var clearSuffix = options.clearSuffix;
      var allowNegative = options.allowNegative;
      var insertPlusSign = options.insertPlusSign;
      var clearOnEmpty = options.clearOnEmpty;
      var leadingZero = options.leadingZero;

      // If insertPlusSign is on, it automatic turns on allowNegative, to work with Signs
      if (insertPlusSign) allowNegative = true;

      function set(nvalue) {
        if (obj.is('input'))
          obj.val(nvalue);
        else
          obj.html(nvalue);

        obj.trigger('pricechange');
      }

      function get() {
        if (obj.is('input'))
          value = obj.val();
        else
          value = obj.html();

        return value;
      }

      // skip everything that isn't a number
      // and also skip the left zeroes
      function to_numbers(str) {
        var formatted = '';
        for (var i = 0; i < (str.length); i++) {
          var char_ = str.charAt(i);
          if (formatted.length == 0 && char_ == 0) char_ = false;

          if (char_ && char_.match(is_number)) {
            if (limit) {
              if (formatted.length < limit) formatted = formatted + char_;
            } else {
              formatted = formatted + char_;
            }
          }
        }

        return formatted;
      }

      // format to fill with zeros to complete cents chars
      function fill_with_zeroes(str) {
        while (str.length < (centsLimit + 1)) str = '0' + str;
        return str;
      }

      // format as price
      function price_format(str, ignore) {
        if (!ignore && (str === '' || str == price_format('0', true)) && clearOnEmpty)
          return '';

        // formatting settings
        var formatted = fill_with_zeroes(to_numbers(str));
        var thousandsFormatted = '';
        var thousandsCount = 0;

        // Checking CentsLimit
        if (centsLimit == 0) {
          centsSeparator = "";
          centsVal = "";
        }

        // split integer from cents
        var centsVal = formatted.substr(formatted.length - centsLimit, centsLimit);
        var integerVal = formatted.substr(0, formatted.length - centsLimit);

        // apply cents pontuation
        // This stops from adding a leading Zero '0.00' -> '.00'
        if (leadingZero) {
          formatted = integerVal + centsSeparator + centsVal;
        } else {
          if (integerVal !== "0") {
            formatted = integerVal + centsSeparator + centsVal;
          }
          else {
            formatted = centsSeparator + centsVal;
          }
        }

        // apply thousands pontuation
        if (thousandsSeparator || $.trim(thousandsSeparator) != "") {
          for (var j = integerVal.length; j > 0; j--) {
            var char_ = integerVal.substr(j - 1, 1);
            thousandsCount++;
            if (thousandsCount % 3 == 0) char_ = thousandsSeparator + char_;
            thousandsFormatted = char_ + thousandsFormatted;
          }

          //
          if (thousandsFormatted.substr(0, 1) == thousandsSeparator) thousandsFormatted = thousandsFormatted.substring(1, thousandsFormatted.length);
          formatted = (centsLimit == 0) ? thousandsFormatted : thousandsFormatted + centsSeparator + centsVal;
        }

        // if the string contains a dash, it is negative - add it to the begining (except for zero)
        if (allowNegative && (integerVal != 0 || centsVal != 0)) {
          if (str.indexOf('-') != -1 && str.indexOf('+') < str.indexOf('-')) {
            formatted = '-' + formatted;
          } else {
            if (!insertPlusSign)
              formatted = '' + formatted;
            else
              formatted = '+' + formatted;
          }
        }

        // apply the prefix
        if (prefix) formatted = prefix + formatted;

        // apply the suffix
        if (suffix) formatted = formatted + suffix;

        return formatted;
      }

      // filter what user type (only numbers and functional keys)
      function key_check(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        var typed = String.fromCharCode(code);
        var functional = false;
        var str = value;
        var newValue = price_format(str + typed);

        // allow key numbers, 0 to 9
        if ((code >= 48 && code <= 57) || (code >= 96 && code <= 105)) functional = true;
        if (code == 192) functional = true;

        // check Backspace, Tab, Enter, Delete, and left/right arrows
        if (code == 8) functional = true;
        if (code == 9) functional = true;
        if (code == 13) functional = true;
        if (code == 46) functional = true;
        if (code == 37) functional = true;
        if (code == 39) functional = true;
        // Minus Sign, Plus Sign
        if (allowNegative && (code == 189 || code == 109 || code == 173)) functional = true;
        if (insertPlusSign && (code == 187 || code == 107 || code == 61)) functional = true;
        //Allow Home, End, Shift, Caps Lock, Esc
        if (code >= 16 && code <= 20) functional = true;
        if (code == 27) functional = true;
        if (code >= 33 && code <= 40) functional = true;
        if (code >= 44 && code <= 46) functional = true;

        // allow Ctrl shortcuts (copy, paste etc.)
        if (window.ctrl_down || metaKey){
          if (code == 86) functional = true; // v: paste
          if (code == 67) functional = true; // c: copy
          if (code == 88) functional = true; // x: cut
          if (code == 82) functional = true; // r: reload
          if (code == 84) functional = true; // t: new tab
          if (code == 76) functional = true; // l: URL bar
          if (code == 87) functional = true; // w: close window/tab
          if (code == 81) functional = true; // q: quit
          if (code == 78) functional = true; // n: new window/tab
          if (code == 65) functional = true; // a: select all
        }

        if (!functional) {
          e.preventDefault();
          e.stopPropagation();
          if (str != newValue) set(newValue);
        }

      }

      // Formatted price as a value
      function price_it() {
        var str = get();
        var price = price_format(str);
        if (str != price) set(price);
        var format = price_format('0', true);
        if (price == format && str != '0' && clearOnEmpty) set('');
      }

      // Add prefix on focus
      function add_prefix() {
        obj.val(prefix + get());
      }

      function add_suffix() {
        obj.val(get() + suffix);
      }

      // Clear prefix on blur if is set to true
      function clear_prefix() {
        if ($.trim(prefix) != '' && clearPrefix) {
          var array = get().split(prefix);
          set(array[1]);
        }
      }

      // Clear suffix on blur if is set to true
      function clear_suffix() {
        if ($.trim(suffix) != '' && clearSuffix) {
          var array = get().split(suffix);
          set(array[0]);
        }
      }

      // bind the actions
      obj.bind('keydown.price_format', key_check);
      obj.bind('keyup.price_format', price_it);
      obj.bind('focusout.price_format', price_it);

      // Clear Prefix and Add Prefix
      if (clearPrefix) {
        obj.bind('focusout.price_format', function() {
          clear_prefix();
        });

        obj.bind('focusin.price_format', function() {
          add_prefix();
        });
      }

      // Clear Suffix and Add Suffix
      if (clearSuffix) {
        obj.bind('focusout.price_format', function() {
          clear_suffix();
        });

        obj.bind('focusin.price_format', function() {
          add_suffix();
        });
      }

      // If value has content
      if (get().length > 0) {
        price_it();
        clear_prefix();
        clear_suffix();
      }

    });

  };

  /**********************
   * Remove price format *
   ***********************/
  $.fn.unpriceFormat = function() {
    return $(this).unbind(".price_format");
  };

  /******************
   * Unmask Function *
   *******************/
  $.fn.unmask = function() {

    var field;
    var result = "";

    if ($(this).is('input'))
      field = $(this).val() || [];
    else
      field = $(this).html();

    for (var f = 0; f < field.length; f++) {
      if (!isNaN(field[f]) || field[f] == "-") result += field[f];
    }

    return result;
  };

  /******************
   * Price to Float *
   ******************/
  $.fn.priceToFloat = function() {

    var field;

    if ($(this).is('input'))
      field = $(this).val() || [];
    else
      field = $(this).html();

    return parseFloat(field.replace(/[^0-9\-\.]/g, ''));
  };

  /************
   * Defaults *
   ************/
  $.fn.priceFormat.defaults = {
    prefix: 'US$ ',
    suffix: '',
    centsSeparator: '.',
    thousandsSeparator: ',',
    limit: false,
    centsLimit: 2,
    clearPrefix: false,
    clearSufix: false,
    allowNegative: false,
    insertPlusSign: false,
    clearOnEmpty: false,
    leadingZero: true
  };
}));

(function() {
    'use strict';

    angular
        .module('app.colors')
        .constant('APP_COLORS', {
          'primary':                '#5d9cec',
          'success':                '#27c24c',
          'info':                   '#23b7e5',
          'warning':                '#ff902b',
          'danger':                 '#f05050',
          'inverse':                '#131e26',
          'green':                  '#37bc9b',
          'pink':                   '#f532e5',
          'purple':                 '#7266ba',
          'dark':                   '#3a3f51',
          'yellow':                 '#fad732',
          'gray-darker':            '#232735',
          'gray-dark':              '#3a3f51',
          'gray':                   '#dde6e9',
          'gray-light':             '#e4eaec',
          'gray-lighter':           '#edf1f2'
        })
        ;
})();
/**=========================================================
 * Module: colors.js
 * Services to retrieve global colors
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.colors')
        .service('Colors', Colors);

    Colors.$inject = ['APP_COLORS'];
    function Colors(APP_COLORS) {
        this.byName = byName;

        ////////////////

        function byName(name) {
          return (APP_COLORS[name] || '#fff');
        }
    }

})();

(function () {
    'use strict';
    var app = angular.module('app.auth');
    app.controller('MyTokenCtrl', ['$scope', '$location', 'authService', 'localDataService', 'ENV', function ($scope, $location, authService, localDataService, ENV) {
        var search = $location.search();
        var doRedirect = function ($location, returnUrl, defaultUrl) {
            $location.search('k', undefined);
            if (returnUrl) {
                window.location.href = decodeURIComponent(returnUrl);
            } else {
                if (!defaultUrl) {
                    defaultUrl = '/';
                }
                $location.path(defaultUrl);
            }
        }
        var markAsTokenChecked = function () {
            localDataService.set('is_token_checked', 1);
        }
        if (search.k) {
            authService.retrieveToken(search.k).then(function (o) {
                var success = authService.saveToken(o.data);
                markAsTokenChecked();
                if (success) {
                    var returnUrl = localDataService.get('logon_return_url');
                    if (returnUrl) {
                        doRedirect($location, decodeURIComponent(returnUrl));
                    } else {
                        doRedirect($location);
                    }
                } else {
                    console.log('Not found token by key ' + search.k);
                    doRedirect($location);
                }
            }, function () {
                console.log('Err when retrieve token by key');
                markAsTokenChecked();
                doRedirect($location);
            });
        } else {
            doRedirect($location);
        }
    }]);
})();

(function () {
    'use strict';
    var app = angular.module('app.auth');
    app.directive('showIfAuthenticated', ['$rootScope', 'authService', function ($rootScope, authService) {
        var render = function ($scope, element, attrs, ctrl) {
            $rootScope.$watch("isAuthLoaded", function () {
                if ($rootScope.isAuthLoaded == true) {
                    if (attrs.showIfAuthenticated == 'false' || attrs.showIfAuthenticated === false || attrs.showIfAuthenticated === '0') {
                        if (authService.authentication.isAuth) {
                            element.hide();
                        } else {
                            element.show();
                        }
                    } else if (attrs.showIfAuthenticated == 'true' || attrs.showIfAuthenticated === true || attrs.showIfAuthenticated === '1') {
                        if (authService.authentication.isAuth) {
                            element.show();
                        } else {
                            element.hide();
                        }
                    } else {
                        if (authService.authentication.isAuth) {
                            var re;
                            var isAccess = false;
                            var allowRoles = attrs.showIfAuthenticated.split('|');
                            var userRoles = authService.authentication.roles ? authService.authentication.roles : [];
                            for (var j = 0; j < allowRoles.length; j++) {
                                var re = false;
                                if (allowRoles[j] && allowRoles[j].length > 1 && allowRoles[j][0] == '/' && allowRoles[j][allowRoles[j].length - 1] == '/') {
                                    re = new RegExp(allowRoles[j].substring(1, allowRoles[j].length - 1));
                                }
                                for (var i = 0; i < userRoles.length; i++) {
                                    if (re) {
                                        if (re.test(userRoles[i])) {
                                            isAccess = true;
                                            break;
                                        }
                                    } else {
                                        if (userRoles[i] == allowRoles[j]) {
                                            isAccess = true;
                                            break;
                                        }
                                    }
                                }
                                if (isAccess) {
                                    break;
                                }
                            }
                            if (isAccess) {
                                //element.toggleClass('ng-hide', false);
                                element.show();
                            } else {
                                //element.toggleClass('ng-hide', true);
                                element.hide();
                            }
                        } else {
                            //element.toggleClass('ng-hide', true);
                            element.hide();
                        }
                    }
                }
            });
            element.hide();
            //element.toggleClass('ng-hide', true);
        };
        return {
            //require: 'ngModel',
            link: function ($scope, element, attrs, ctrl) {

                render($scope, element, attrs, ctrl);
                // When change content by $location.path()
                $scope.$on('$viewContentLoaded', function () {
                    render($scope, element, attrs, ctrl);
                });
            }
        }
    }]);
    app.directive('authData', ['$rootScope', '$parse', 'authService', function ($rootScope, $parse, authService) {
        var render = function ($scope, element, attrs) {
            $rootScope.$watch("isAuthLoaded", function () {
                if ($rootScope.isAuthLoaded == true) {
                    if (authService.authentication.isAuth) {
                        var value = $parse('authentication.' + attrs.authData)(authService);
                        angular.element(element).text(value);
                        element.show();
                    } else {
                        element.hide();
                    }
                    //element.toggleClass('ng-hide', !authService.authentication.isAuth);
                }
            });
            element.hide();
        };
        return {
            restrict: 'A',
            link: function ($scope, element, attrs, ctrl) {

                render($scope, element, attrs, ctrl);
                // When change content by $location.path()
                $scope.$on('$viewContentLoaded', function () {
                    render($scope, element, attrs, ctrl);
                });
            }
        }
    }]);
})();

(function () {
    'use strict';

    var app = angular.module('app.auth');
    app.service('authInterceptorService', ['$q', '$injector', '$location', '$window', 'localStorageService', function ($q, $injector, $location, $window, localStorageService) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var authInterceptorServiceFactory = {};
        var _request = function (config) {

            config.headers = config.headers || {};
            var authService = $injector.get('authService');
            //var authData = localStorageService.get('authorizationData');
            if (authService.authentication.isAuth) {
                //config.headers.Authorization = 'Bearer ' + authData.token;
                config.headers.Authorization = 'Bearer ' + authService.token();
                config.headers.userName = authService.authentication.userName;
            }

            return config;
        }

        var _isShowingModal = false;

        var _showModalUnauthorized = function (rejection) {
            //var SweetAlert = $injector.get('SweetAlert');
            if (swal !== undefined && swal !== null) {
                swal.close();
            } 

            var $modal = $injector.get('$uibModal');
            var modalInstance = $modal.open({
                templateUrl: 'app/views/unauthorized.html',
                controller: 'UnauthorizedCtrl',
                resolve: {
                    Message: function () {
                        return rejection.data.Message;
                    },
                    MessageDetail: function () {
                        return rejection.data.MessageDetail;
                    }
                },
                backdropClass: 'backdrop-unauthorized'
            });
            modalInstance.result.then(function (shouldLoginRedirect) {
                if (shouldLoginRedirect) {
                    window.location.href = shouldLoginRedirect;
                } else {
                    $location.path('/');
                }
                _isShowingModal = false;
            }, function () {
                _isShowingModal = false;
                $location.path('/');
            });
        }

        var _responseError = function (rejection) {
            if (rejection.status === 401) {
                var authService = $injector.get('authService');
                //var authData = localStorageService.get('authorizationData');
                if (authService.authentication.isAuth && authService.authentication.useRefreshTokens) {
                    $location.path('/refresh');
                    return $q.reject(rejection);
                } else if (authService.authentication.isAuth && (!rejection || !rejection.data || rejection.data.Message != 'MustTwoFactor')) {
                    authService.signOut();
                    if (!_isShowingModal) {
                        var objMsg = { data: {} };
                        _isShowingModal = true;
                        _showModalUnauthorized(objMsg);
                    }
                } else {
                    if (!_isShowingModal) {
                        _isShowingModal = true;
                        _showModalUnauthorized(rejection);
                    }
                }
            }
            return $q.reject(rejection);
        }

        authInterceptorServiceFactory.request = _request;
        authInterceptorServiceFactory.responseError = _responseError;

        return authInterceptorServiceFactory;

    }]);
})();

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

(function () {
    'use strict';
    angular.module('app.auth').service('xdLocalStorage', ['$q', '$rootScope', function ($q, $rootScope) {
        var iframeReady = false;
        var apiReady = $q.defer();

        var unregister = $rootScope.$watch(function () {
            return iframeReady;
        }, function () {
            apiReady.resolve(true);
            unregister();
        });

        function waitForApi() {
            if (!xdLocalStorage.wasInit()) {
                throw 'You must init xdLocalStorage in app config before use';
            }
            return apiReady.promise;
        }
        function action(method) {
            var args = Array.prototype.slice.call(arguments, 1);
            return waitForApi().then(function () {
                var defer = $q.defer();
                xdLocalStorage[method].apply(this, args.concat(function () {
                    var result = arguments[0];
                    $rootScope.$apply(function () {
                        defer.resolve(result);
                    });
                }));
                return defer.promise;
            });
        }
        return {
            init: function (options) {
                var defer = $q.defer();
                options.initCallback = function () {
                    $rootScope.$apply(function () {
                        iframeReady = true;
                        defer.resolve();
                    });
                };
                xdLocalStorage.init(options);
                return defer.promise;
            },
            setItem: function (key, value, isCookie) {
                return action('setItem', key, value, isCookie);
            },
            getItem: function (key, isCookie) {
                return action('getItem', key, isCookie);
            },
            removeItem: function (key, isCookie) {
                return action('removeItem', key, isCookie);
            },
            key: function (index, isCookie) {
                return action('key', index, isCookie)
            },
            clear: function (isCookie) {
                return action('clear', isCookie);
            },
            wasInit: function () {
                return xdLocalStorage.wasInit();
            }
        };
    }]);
})();

(function () {
    'use strict';
    angular.module('app.auth').service('authService', ['$rootScope', '$http', '$q', 'ENV', 'localDataService', function ($rootScope, $http, $q, ENV, localDataService) {

        var authServiceFactory = {};

        authServiceFactory.retrieveToken = function (k) {
            //return $http({
            //    method: 'GET',
            //    url: ENV.urlApiAuth + 'api/User/RetrieveToken',
            //    data: { Key: k }
            //});
            return $http.get(ENV.urlApiAuth + 'api/User/RetrieveToken', {
                params: { Key: k }
            });
        };

        var _authentication = {
            isAuth: false,
            userName: '',
            roles: [],
            useRefreshTokens: false
        };

        var _token = '';

        var logoutClient = function () {
            _authentication.isAuth = false;
            _authentication.userName = '';
            _authentication.roles = [];
            _authentication.useRefreshTokens = false;
            _token = '';
        }

        var _saveToken = function (tokenData, forceUpdateAuth) {

            if (tokenData && tokenData.Key) {
                var authorization = {
                    token: tokenData.token,
                    userName: tokenData.userName,
                    displayName: tokenData.userName,
                    roles: tokenData.roles,
                    expires: tokenData.expires ? new Date(tokenData.expires) : null,
                    refreshToken: tokenData.refreshToken,
                    useRefreshTokens: tokenData.useRefreshTokens
                };
                localDataService.set('cscode', authServiceFactory.textEncode(tokenData.cscode));
                localDataService.set('authorization', authorization);

                if (!forceUpdateAuth) {
                    _authentication.isAuth = true;
                    _authentication.userName = tokenData.userName;
                    _authentication.displayName = tokenData.displayName;
                    _authentication.useRefreshTokens = tokenData.useRefreshTokens;
                    _authentication.roles = tokenData.roles;
                    _token = tokenData.cscode + tokenData.token;
                    $rootScope.isAuthLoaded = true;
                }

                return true;
            }
            return false;
        };

        var _signOut = function () {
            localDataService.set('is_token_checked', 0);
            localDataService.remove('cscode');
            localDataService.remove('authorization');
            logoutClient();
        };

        var _fillAuthData = function (authData, token) {
            //var authData = localStorageService.get('authorizationData');
            if (authData) {
                _authentication.isAuth = true;
                _authentication.userName = authData.userName;
                _authentication.displayName = authData.displayName;
                _authentication.useRefreshTokens = authData.useRefreshTokens;
                _authentication.roles = authData.roles;
                _token = token;
            }
        };

        var _originCharArr = new Array('a', 'A', 'b', 'B', 'c', 'C', 'd', 'D', 'e', 'E', 'f', 'F', 'g', 'G', 'h', 'H', 'i', 'I', 'j', 'J', 'k', 'K', 'l', 'L', 'm', 'M', 'n', 'N', 'o', 'O', 'p', 'P', 'q', 'Q', 'r', 'R', 's', 'S', 't', 'T', 'u', 'U', 'v', 'V', 'w', 'W', 'x', 'X', 'y', 'Y', 'z', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '_', '-');
        var _complexCharArr = new Array('q1', 'Q1', 'wq', 'Wq', 'ea', 'Ea', 'rz', 'Rz', 't2', 'T2', 'yw', 'Yw', 'us', 'Us', 'ix', 'Ix', 'o3', 'O3', 'pe', 'Pe', 'ad', 'Ad', 'sc', 'Sc', 'd4', 'D4', 'fr', 'Fr', 'gf', 'Gf', 'hv', 'Hv', 'j5', 'J5', 'kt', 'Kt', 'lg', 'Lg', 'zb', 'Zb', 'x6', 'X6', 'cy', 'Cy', 'vh', 'Vh', 'bn', 'Bn', 'n7', 'N7', 'mu', 'Mu', '1j', '2m', '38', '4i', '5k', '69', '7o', '8l', '90', '0p', '01', '02');

        var _textEncode = function (text) {
            text = new String(text);
            var str = '';
            for (var i = 0; i < text.length; i++) {
                var key = null;
                for (var j = 0; j < _originCharArr.length; j++) {
                    if (text[i] == _originCharArr[j]) {
                        key = j;
                        break;
                    }
                }
                var rnd = Math.floor(Math.random() * (_originCharArr.length));
                var tmp = _complexCharArr[key];
                if (i % 2 == 0) {
                    tmp = _originCharArr[rnd] + tmp;
                } else {
                    tmp = tmp + _originCharArr[rnd];
                }
                str += tmp;
            }
            return str;
        }
        var _textDecode = function (text) {
            text = new String(text);
            var len = text.length / 3;
            var str = new String();
            for (var i = 0; i < len; i++) {
                var key = null;
                var item = text.substr(i * 3, 3);
                if (i % 2 == 0) {
                    item = item.substr(1, 2);
                } else {
                    item = item.substr(0, 2);
                }
                for (var j = 0; j < _complexCharArr.length; j++) {
                    if (item == _complexCharArr[j]) {
                        key = j;
                        break;
                    }
                }

                str += _originCharArr[key];
            }
            return str;
        }

        authServiceFactory.saveToken = _saveToken;
        authServiceFactory.signOut = _signOut;
        authServiceFactory.fillAuthData = _fillAuthData;
        authServiceFactory.authentication = _authentication;

        authServiceFactory.token = function () { return _token; }
        authServiceFactory.textEncode = _textEncode;
        authServiceFactory.textDecode = _textDecode;

        return authServiceFactory;
    }]);
})();

(function () {
    'use strict';
    window.xdLocalStorage = window.xdLocalStorage || (function () {
        var MESSAGE_NAMESPACE = 'cross-domain-local-message';
        var options = {
            iframeId: 'cross-domain-iframe',
            iframeUrl: undefined,
            initCallback: function () { }
        };
        var requestId = -1;
        var iframe;
        var requests = {};
        var wasInit = false;
        var iframeReady = true;

        function applyCallback(data) {
            if (requests[data.id]) {
                requests[data.id](data);
                delete requests[data.id];
            }
        }

        function receiveMessage(event) {
            var data;
            try {
                data = JSON.parse(event.data);
            } catch (err) {
                //not our message, can ignore
            }
            if (data && data.namespace === MESSAGE_NAMESPACE) {
                if (data.id === 'iframe-ready') {
                    iframeReady = true;
                    options.initCallback();
                } else {
                    applyCallback(data);
                }
            }
        }

        function buildMessage(action, key, value, isCookie, callback) {
            requestId++;
            requests[requestId] = callback;
            var data = {
                namespace: MESSAGE_NAMESPACE,
                id: requestId,
                action: action,
                key: key,
                value: value,
                isCookie: isCookie
            };
            iframe.contentWindow.postMessage(JSON.stringify(data), '*');
        }
        function init(customOptions) {
            options = XdUtils.extend(customOptions, options);
            var temp = document.createElement('div');

            if (window.addEventListener) {
                window.addEventListener('message', receiveMessage, false);
            } else {
                window.attachEvent('onmessage', receiveMessage);
            }

            temp.innerHTML = '<iframe id="' + options.iframeId + '" src=' + options.iframeUrl + ' style="display: none;"></iframe>';
            document.body.appendChild(temp);
            iframe = document.getElementById(options.iframeId);
        }

        function isApiReady() {
            if (!wasInit) {
                console.log('You must call xdLocalStorage.init() before using it.');
                return false;
            }
            if (!iframeReady) {
                console.log('You must wait for iframe ready message before using the api.');
                return false;
            }
            return true;
        }

        return {
            //callback is optional for cases you use the api before window load.
            init: function (customOptions) {
                if (!customOptions.iframeUrl) {
                    throw 'You must specify iframeUrl';
                }
                if (wasInit) {
                    console.log('xdLocalStorage was already initialized!');
                    return;
                }
                wasInit = true;
                if (document.readyState === 'complete') {
                    init(customOptions);
                } else {
                    window.onload = function () {
                        init(customOptions);
                    };
                }
            },
            setItem: function (key, value, isCookie, callback) {
                if (!isApiReady()) {
                    return;
                }
                buildMessage('set', key, value, isCookie, callback);
            },

            getItem: function (key, isCookie, callback) {
                if (!isApiReady()) {
                    return;
                }
                buildMessage('get', key, null, isCookie, callback);
            },
            removeItem: function (key, isCookie, callback) {
                if (!isApiReady()) {
                    return;
                }
                buildMessage('remove', key, null, isCookie, callback);
            },
            key: function (index, isCookie, callback) {
                if (!isApiReady()) {
                    return;
                }
                buildMessage('key', index, null, isCookie, callback);
            },
            clear: function (isCookie, callback) {
                if (!isApiReady()) {
                    return;
                }
                buildMessage('clear', null, null, isCookie, callback);
            },
            wasInit: function () {
                return wasInit;
            }
        };
    })();
})();

(function () {
    'use strict';
    window.XdUtils = window.XdUtils || (function () {

        function extend(object, defaultObject) {
            var result = defaultObject || {};
            var key;
            for (key in object) {
                if (object.hasOwnProperty(key)) {
                    result[key] = object[key];
                }
            }
            return result;
        }

        //public interface
        return {
            extend: extend
        };
    })();
})();

(function () {
    'use strict';

    var app = angular.module('app.auth');
    app.service('UserService', ['$server', 'ENV', function ($server, ENV) {
        var serviceFactory = {};
        var rs = $server('', {}, {
            GetUserInfo: { method: 'GET', url: ENV.urlApiRatBaoCao + 'api/User/GetUserInfo' },
            CheckTwoFactor: { method: 'GET', url: ENV.urlApiRatBaoCao + 'api/User/CheckTwoFactor' },
        });

        serviceFactory.GetUserInfo = function () {
            return rs.GetUserInfo();
        }

        serviceFactory.CheckTwoFactor = function () {
            return rs.CheckTwoFactor();
        }

        return serviceFactory;
    }]);
})();
(function() {
    'use strict';

    angular
        .module('app.core')
        .config(coreConfig);

    coreConfig.$inject = ['$httpProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$animateProvider'];
    function coreConfig($httpProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $animateProvider) {
        // Auth
        $httpProvider.interceptors.push('authInterceptorService');
        $httpProvider.interceptors.push('preventTemplateCache');

        var core = angular.module('app.core');
        // registering components after bootstrap
        core.controller = $controllerProvider.register;
        core.directive = $compileProvider.directive;
        core.filter = $filterProvider.register;
        core.factory = $provide.factory;
        core.service = $provide.service;
        core.constant = $provide.constant;
        core.value = $provide.value;

        // Disables animation on items with class .ng-no-animation
        $animateProvider.classNameFilter(/^((?!(ng-no-animation)).)*$/);
    }

})();
/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('APP_MEDIAQUERY', {
          'desktopLG':             1200,
          'desktop':                992,
          'tablet':                 768,
          'mobile':                 480
        })
      ;

})();
(function () {
    'use strict';
    var app = angular.module('app.core');
    app.directive("errorShow", ["$compile", function ($compile) {
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
    }]);
    app.directive("loadingSpinner", ["$compile", function ($compile) {
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
    }]);
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

(function () {
    'use strict';
    var app = angular.module('app.core');
    app.service('msgService', ['SweetAlert', function (SweetAlert) {
        var serviceFactory = {};
        serviceFactory.showSuccess = function (text, title) {
            title = title ? title : '';
            SweetAlert.swal(title, text, 'success');
        }
        serviceFactory.showWarning = function (text, title) {
            title = title ? title : 'Cảnh báo';
            SweetAlert.swal(title, text, 'warning');
        }
        serviceFactory.show = function (type, text, title) {
            title = title ? title : '';
            SweetAlert.swal(title, text, type);
        }
        serviceFactory.confirm = function (text, title, confirmCallback, cancelCallback, showLoaderOnConfirm, closeOnConfirm, closeOnCancel, confirmButtonText, cancelButtonText) {
            title = title ? title : 'Xác nhận';
            confirmButtonText = confirmButtonText ? confirmButtonText : 'Đồng ý';
            cancelButtonText = cancelButtonText ? cancelButtonText : 'Hủy bỏ';

            SweetAlert.swal({   
                title: title,   
                text: text,   
                type: 'warning',
                showCancelButton: true,   
                confirmButtonColor: '#DD6B55',   
                confirmButtonText: confirmButtonText,   
                cancelButtonText: cancelButtonText,   
                closeOnConfirm: angular.isDefined(closeOnConfirm) ? closeOnConfirm : false,
                closeOnCancel: angular.isDefined(closeOnCancel) ? closeOnCancel : true,
                showLoaderOnConfirm: angular.isDefined(showLoaderOnConfirm) ? showLoaderOnConfirm : true,
                html: true
            }, function(isConfirm){  
                if (isConfirm) {     
                    if (confirmCallback) {
                        confirmCallback();
                    }
                } else {
                    if (cancelCallback) {
                        cancelCallback();
                    }
                } 
            });
        };

        return serviceFactory;
    }]);
})();

/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/

(function() {
    'use strict';

    var app = angular.module('app.core');
    app.controller('VersionOutOfDateModalController', ['$rootScope', '$scope', '$uibModalInstance', 'oldVersion', 'newVersion', function ($rootScope, $scope, $modalInstance, oldVersion, newVersion) {
        $scope.oldVersion = oldVersion;
        $scope.newVersion = newVersion;
        $rootScope.isOpenedVersionOutOfDateModal = true;
        $scope.close = function () {
            $rootScope.isOpenedVersionOutOfDateModal = false;
            $modalInstance.close();
        };
        $scope.reload = function () {
            if (window.location.href.indexOf('sorry.html') != -1) {
                window.location.href = "/";
            } else {
                window.location.reload(true);
            }
        }
    }]);
})();
(function () {
    'use strict';
    var app = angular.module('app.core');
    app.controller('PagingController', ['$scope', '$attrs', '$parse', 'uibPaging', 'uibPaginationConfig', '$controller', '$timeout', function ($scope, $attrs, $parse, uibPaging, uibPaginationConfig, $controller, $timeout) {
        var ctrl = this;
        var pageChangeFn = $parse($attrs.pageSizeChange);
        angular.extend(ctrl, $controller('UibPaginationController', { $scope: $scope, $attrs: $attrs, $parse: $parse, uibPaging: uibPaging, uibPaginationConfig: uibPaginationConfig }));
        
        $scope.pageSizes = [10, 20, 50, 100, 200];

        $scope.$watch('page', function (newPage, oldPage) {
            if (angular.isDefined(newPage) || newPage !== oldPage) {
                $scope.pageNumberGo = newPage;
            }
        });

        $scope.isPageLoad = true;
        $scope.$watch('pageSize', function (newPageSize, oldPageSize) {
            if (angular.isDefined(newPageSize) || newPageSize !== oldPageSize) {
                ctrl.itemsPerPage = newPageSize;
                $scope.totalPages = ctrl.reCalculateTotalPages();
                ctrl.updatePage();
                pageChangeFn($scope.$parent);

                if ($scope.isPageLoad) {
                    $scope.watchTotalItems();
                    $scope.isPageLoad = false;
                }
            }
        });

        $scope.watchTotalItems = function () {
            var listener = $scope.$watch("totalItems", function () { });
            listener();
            $scope.$watch('totalItems', function (newTotal, oldTotal) {
                if (angular.isDefined(newTotal) || newTotal !== oldTotal) {
                    $scope.totalPages = ctrl.reCalculateTotalPages();
                    ctrl.updatePage();
                }
            });
        }

        ctrl.reCalculateTotalPages = function () {
            var totalPages = ctrl.itemsPerPage < 1 ? 1 : Math.ceil($scope.totalItems / ctrl.itemsPerPage);
            return Math.max(totalPages || 0, 1);
        };

        $scope.changePageSize = function (pageSize) {
            $scope.pageSize = pageSize;
        }

        $scope.goToPage = function () {
            var page = $scope.pageNumberGo;
            if ($scope.totalPages > 0 && page != $scope.page) {
                page = page > 0 ? page : 1;
                page = page > $scope.totalPages ? $scope.totalPages : page;
                $scope.selectPage(page);
            }
        }

    }]);
    app.directive("paging", ['uibPaginationConfig', function (uibPaginationConfig) {
        return {
            scope: {
                totalItems: '=',
                pageSize: '=',
                firstText: '@',
                previousText: '@',
                nextText: '@',
                lastText: '@',
                ngDisabled: '='
            },
            require: ['paging', '?ngModel'],
            controller: 'PagingController',
            controllerAs: 'paging',
            templateUrl: function (element, attrs) {
                return attrs.templateUrl || 'app/views/partials/paging.html';
            },
            replace: true,
            link: function (scope, element, attrs, ctrls) {
                var paginationCtrl = ctrls[0], ngModelCtrl = ctrls[1];
                
                if (!ngModelCtrl) {
                    return; // do nothing if no ng-model
                }

                paginationCtrl.init(ngModelCtrl, uibPaginationConfig);
            }
        };
    }]);
})();

(function () {
    'use strict';
    var app = angular.module('app.core');
    app.provider('$server', function () {
        // I want to override/wrap all the method generated by the $resource .. I managed don't see an another way to d
        this.$get = ['$q', '$resource', function ($q, $resource) {
            function resourceFactory(url, paramDefaults, actions) {
                angular.forEach(actions, function (action) {
                    if (action.Blob) {
                        if (!angular.isDefined(action.headers)) {
                            action.headers = {};
                        }
                        if (!angular.isDefined(action.headers.accept)) {
                            action.headers.accept = 'application/vnd.ms-excel';
                        }
                        if (!angular.isDefined(action.responseType)) {
                            action.responseType = 'arraybuffer';
                        }
                        if (!angular.isDefined(action.transformResponse)) {
                            action.transformResponse = function (data, headers) {
                                var disposition = headers('content-disposition');
                                disposition = disposition ? disposition.split(';') : [];
                                var filename = disposition.length > 1 ? disposition[1].split('=')[1] : null;
                                return {
                                    Blob: new Blob([data], { type: headers('content-type') }),
                                    Filename: filename
                                };
                            };
                        }
                    }
                });
                var ngResource = $resource(url, paramDefaults, actions);
                var res = {};
                var generateWrapper = function (methodName) {
                    return function (a1, a2, a3, a4) {
                        var defer = $q.defer();
                        var args = arguments;
                        ngResource[methodName].apply(this, args).$promise.then(function (res) {
                            defer.resolve(res);
                        }, function (error) {
                            if (error.status != 401) {
                                defer.reject(error);
                            }
                        });
                        return defer.promise;
                    };
                };

                angular.forEach(ngResource.prototype, function (value, method) {
                    var name = method.slice(1);
                    res[name] = generateWrapper(name);
                });

                return res;
            }

            return resourceFactory;
        }]
    });
})();

(function() {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    appRun.$inject = ['$rootScope', '$injector', '$state', '$stateParams', '$window', '$filter', '$interval', '$timeout', '$templateCache', 'Colors', 'localDataService', 'xdLocalStorage', 'authService', 'ENV'];
    
    function appRun($rootScope, $injector, $state, $stateParams, $window, $filter, $interval, $timeout, $templateCache, Colors, localDataService, xdLocalStorage, authService, ENV) {
        var isOpeningModal = false;
        var showModalUnauthorized = function (message, messageDetail) {
            if (!isOpeningModal) {
                var $modal = $injector.get('$uibModal');
                var $location = $injector.get('$location');
                var modalInstance = $modal.open({
                    templateUrl: 'app/views/unauthorized.html',
                    controller: 'UnauthorizedCtrl',
                    resolve: {
                        Message: function () {
                            return message;
                        },
                        MessageDetail: function () {
                            return messageDetail;
                        }
                    },
                    backdropClass: 'backdrop-unauthorized'
                });
                modalInstance.result.then(function (shouldLoginRedirect) {
                    if (shouldLoginRedirect) {
                        window.location.href = shouldLoginRedirect;
                    } else {
                        $location.path('/');
                    }
                    isOpeningModal = false;
                }, function () {
                    $location.path('/');
                    isOpeningModal = false;
                });
                isOpeningModal = true;
            }
        }

        var openVersionOutOfDateModal = function (oldVersion, newVersion) {
            if (!isOpeningModal) {
                var $modal = $injector.get('$uibModal');
                var $location = $injector.get('$location');
                var modalInstance = $modal.open({
                    templateUrl: 'app/views/version_out_of_date_modal.html',
                    controller: 'VersionOutOfDateModalController',
                    resolve: {
                        oldVersion: function () {
                            return oldVersion;
                        },
                        newVersion: function () {
                            return newVersion;
                        }
                    }
                });
                modalInstance.result.then(function (shouldLoginRedirect) {
                    isOpeningModal = false;
                }, function () {
                    isOpeningModal = false;
                });
                isOpeningModal = true;
            }
        };

        // System settings
        $rootScope.$settings = {};
        $rootScope.$settings.isdevelop = true;
        //console.log('$window.href', $window);
        if (!($window.location.hostname.toLowerCase().includes('local')
           || $window.location.hostname.toLowerCase().includes('dev'))) {
            $rootScope.$settings.isdevelop = false;
        }

        var applySettings = function (isFirst) {
            var env = $injector.get('ENV');
            var http = $injector.get('$http');
            var settingsURL = env.urlApiRatBaoCao + 'api/System/GetSettings';
            http.get(settingsURL).success(function (settings) {
                // Values of settings
                angular.forEach(settings, function (val, key) {
                    if (key == 'TimeServer') {
                        $rootScope.$settings[key] = new Date($filter('date')(val, 'yyyy-MM-dd HH:mm:ss.sss'));
                    } else {
                        $rootScope.$settings[key] = val;
                    }
                });

                // Check version is out of date
                if ($rootScope.$settings.Version) {
                    var serverVersion = $rootScope.$settings.Version;
                    var clientVersion = jQuery("html").attr('version')
                    if (serverVersion && clientVersion != serverVersion) {
                        openVersionOutOfDateModal(clientVersion, serverVersion);
                    }
                }

                // Mark as loaded settings
                if (isFirst) {
                    $rootScope.loadedSettings = true;
                }

                // Refresh setting values after 5 minutes
                var interval = 300000;
                $timeout(function () {
                    applySettings(false);
                }, interval);
            }).error(function (err) {
                // Refresh setting values after 5 minutes
                var interval = 300000;
                console.log('GetSettings error', err);
                $timeout(function () {
                    applySettings(false);
                }, interval);
            });
        }
        var authRefresh = function () {
            //showModalUnauthorized();
            if ($rootScope.isAuthLoaded) {
                var authData = localDataService.get('authorization');
                var cscode = localDataService.get('cscode');
                if (authData && cscode) {
                    var isShowingModal = false;
                    try {
                        cscode = authService.textDecode(cscode);
                        //console.log(authData);
                        if (authData.expires) {
                            var expiredDt = new Date(authData.expires);
                            var now = new Date();
                            if (now.getTime() + 60 * 1000 > expiredDt.getTime()) {
                                authService.signOut();
                                if (!isShowingModal) {
                                    showModalUnauthorized();
                                    isShowingModal = true;
                                }
                            }
                        }
                    } catch (err) {
                        //not our message, can ignore
                    }
                    if (!isShowingModal) {
                        if (authService.authentication.isAuth) {
                            if (!authData || (cscode + authData.token) != authService.token()) {
                                window.location.reload(true);
                            }
                        } else {
                            if (authData && cscode && authData.token) {
                                window.location.reload(true);
                            }
                        }
                    }
                } else {

                }
                /*
                xdLocalStorage.getItem('xd.authorization').then(function (data) {
                    xdLocalStorage.getItem('cscode', true).then(function (cscode) {
                        cscode = cscode ? authService.textDecode(cscode.value) : null;
                        var authData;
                        if (data.value) {
                            try {
                                authData = JSON.parse(data.value);
                                if (authData.expires) {
                                    var expiredDt = new Date(authData.expires);
                                    var now = new Date();
                                    if (now.getTime() + 60 * 1000 > expiredDt.getTime()) {
                                        authService.logOut().then(function () {
                                            showModalUnauthorized();
                                        });
                                    }
                                }
                            } catch (err) {
                                //not our message, can ignore
                            }
                        }
                        
                        if (authService.authentication.isAuth) {
                            if (!authData || (cscode + authData.token) != authService.token()) {
                                window.location.reload(true);
                            }
                        } else {
                            if (authData && cscode && authData.token) {
                                window.location.reload(true);
                            }
                        }
                    });
                });
                */
            }
        }
        
        localDataService.init();
        applySettings(true);
        $rootScope.ENV = ENV;
        //$rootScope.ShowModalUnauthorized = showModalUnauthorized;
        $interval(authRefresh, 5000);
        $interval(function () {
            if ($rootScope.$settings.TimeServer) {
                $rootScope.$settings.TimeServer.setSeconds($rootScope.$settings.TimeServer.getSeconds() + 1);
            }
        }, 1000);
        
        // Set reference to access them from any scope
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$storage = $window.localStorage;

        // Uncomment this to disable template cache
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            if (typeof(toState) !== 'undefined'){
              $templateCache.remove(toState.templateUrl);
            }
        });

        // Allows to use branding color with interpolation
        // {{ colorByName('primary') }}
        $rootScope.colorByName = Colors.byName;

        // cancel click event easily
        $rootScope.cancel = function ($event) {
            $event.stopPropagation();
        };

        // Hooks Example
        // ----------------------------------- 

        // Hook not found
        $rootScope.$on('$stateNotFound',
          function (event, unfoundState/*, fromState, fromParams*/) {
              console.log(unfoundState.to); // "lazy.state"
              console.log(unfoundState.toParams); // {a:1, b:2}
              console.log(unfoundState.options); // {inherit:false} + default options
          });
        // Hook error
        $rootScope.$on('$stateChangeError',
          function (event, toState, toParams, fromState, fromParams, error) {
              console.log(error);
          });
        // Hook success
        $rootScope.$on('$stateChangeSuccess',
          function (/*event, toState, toParams, fromState, fromParams*/) {
              // display new view from top
              $window.scrollTo(0, 0);
              // Save the route title
              $rootScope.currTitle = $state.current.title;
          });

        // Load a title dynamically
        $rootScope.currTitle = $state.current.title;
        $rootScope.pageTitle = function () {
            var title = $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
            document.title = title;
            return title;
        };

    }
})();


(function () {
    'use strict';
    var app = angular.module('app.core');
    app.service('preventTemplateCache', ['$rootScope', '$q', '$injector', '$timeout', function ($rootScope, $q, $injector, $timeout) {
        var failVersion = '0.0';
        var emptyVersion = '0.0.0';
        var isRequesting = false;
        var buildPreventCacheUrl = function (url, version) {
            if (url.indexOf('?') != -1) {
                return url + '&v=' + version;
            } else {
                return url + '?v=' + version;
            }
        }
        var isMasterPage = function (url) {
            var masterPages = [
                'app/views/app.html',
                'app/views/app-h.html',
                'app/views/partials/sidebar.html',
                'app/views/partials/offsidebar.html',
                'app/views/partials/top-navbar.html',
                'app/views/partials/top-navbar-h.html'
            ];
            for (var i = 0; i < masterPages.length; i++) {
                if (url.endsWith(masterPages[i])) {
                    return true;
                }
            }
            return false;
        }
        return {
            'request': function (config) {
                // Only process static html file inside folder [app/views],[app/pages]
                if (config.url.substr(-5) == '.html' && (config.url.indexOf('app/views/') != -1 || config.url.indexOf('app/pages/') != -1) && !isMasterPage(config.url)) {
                    // If ready loaded settings
                    if ($rootScope.loadedSettings) {
                        var buildVersion = $rootScope.$settings && $rootScope.$settings.DeployVersion ? $rootScope.$settings.DeployVersion : emptyVersion;
                        config.url = buildPreventCacheUrl(config.url, buildVersion);
                        return config;
                    } else {
                        // Create defer
                        var defer = $q.defer();

                        // Only first request should call get settings from server 
                        if (!isRequesting) {
                            // Mark as requesting
                            isRequesting = true;

                            // Retrieve settings
                            var maxRetrieve = 20;
                            var retrieve = 0;
                            var retrieveSettings = function () {
                                // Retrieve
                                retrieve++;
                                if ($rootScope.loadedSettings) {
                                    var buildVersion = $rootScope.$config && $rootScope.$config.PVersion ? $rootScope.$config.PVersion : emptyVersion;
                                    config.url = buildPreventCacheUrl(config.url, buildVersion);
                                    defer.resolve(config);
                                } else {
                                    // Load url with build version
                                    // Retrieve in 200 miniseconds
                                    if (retrieve < maxRetrieve) {
                                        $timeout(retrieveSettings, 500);
                                    } else {
                                        config.url = buildPreventCacheUrl(config.url, failVersion);
                                        defer.resolve(config);
                                    }
                                }
                            }
                            $timeout(retrieveSettings, 500);
                        } else {
                            // All other request should loop to check result from first request 
                            var retrieveBuildVersion = function () {
                                if (!$rootScope.loadedSettings) {
                                    // Retrieve in 200 miniseconds
                                    $timeout(retrieveBuildVersion, 200);
                                } else {
                                    // Load url with build version
                                    var buildVersion = $rootScope.$config && $rootScope.$config.PVersion ? $rootScope.$config.PVersion : emptyVersion;
                                    config.url = buildPreventCacheUrl(config.url, buildVersion);
                                    defer.resolve(config);
                                }
                            }
                            $timeout(retrieveBuildVersion, 200);
                        }
                        return defer.promise;
                    }
                } else {
                    return config;
                }
            }
        }
    }]);
    app.service('localDataService', ['localStorageService', 'ENV', function (localStorageService, ENV) {
        var keyPrefix = 'ldv_' + ENV.version + '_';
        var serviceFactory = {};

        // init
        serviceFactory.init = function () {
            // Init to delete local data for old version
            angular.forEach(localStorageService.keys(), function (value, key) {
                var pattern = /^ldv_(\d+\.\d+\.\d+)_(.*)/g;
                var match = pattern.exec(value);
                if (match) {
                    if (match[1] != ENV.version) {
                        localStorageService.remove(value);
                    }
                }
            });
        };

        // Wrapper to remove
        serviceFactory.remove = function (key, value, skipVerion) {
            if (skipVerion) {
                return localStorageService.remove(key, value);
            } else {
                var realKey = keyPrefix + key;
                return localStorageService.remove(realKey, value);
            }
        };

        // Wrapper to set
        serviceFactory.set = function (key, value, skipVerion) {
            if (skipVerion) {
                return localStorageService.set(key, value);
            } else {
                var realKey = keyPrefix + key;
                return localStorageService.set(realKey, value);
            }
        };

        // Wrapper to get
        serviceFactory.get = function (key, skipVerion) {
            if (skipVerion) {
                return localStorageService.get(key);
            } else {
                var realKey = keyPrefix + key;
                return localStorageService.get(realKey);
            }
        };

        return serviceFactory;
    }]);

    app.service('tmpDataService', ['localDataService', function (localDataService) {

        var t = this;

        this.tmpData = {};

        var serviceFactory = {};

        var compare = function (a, b) {
            if (a.value.expired > b.value.expired)
                return -1;
            if (a.value.expired < b.value.expired)
                return 1;
            return 0;
        }

        // Wrapper to set
        serviceFactory.set = function (key, value, isLocalStorage, expired) {
            var localKey = "tLocalData";
            var localValue;
            if (isLocalStorage) {
                localValue = localDataService.get(localKey);
            } else {
                localValue = t.tmpData;
            }
            if (!localValue) {
                localValue = {};
            }
            if (typeof (expired) == 'undefined') {
                expired = 15; // Default expired after 15 minutes
            }

            var expiredDt = new Date();
            expiredDt.setMinutes(expiredDt.getMinutes() + expired);
            expired = expiredDt.getTime();

            var prefix = "tLocalValue";
            var realKey = prefix + key;
            localValue[realKey] = { value: value, expired: expired };
            if (isLocalStorage) {
                localDataService.set(localKey, localValue);
            } else {
                t.tmpData = localValue;
            }

            window.setTimeout(function () {
                var tmp = [];
                for (var item in localValue) {
                    if (typeof (item) == 'string' && item.substr(0, prefix.length) == prefix) {
                        var data = localValue[item];
                        if (data.expired < new Date().getTime()) {
                            delete localValue[item];
                        } else {
                            tmp.push({ key: item, value: data });
                        }
                    }
                }

                // Max tmp item is 100;
                var maxItems = 100;
                if (tmp.length > maxItems) {
                    tmp.sort(compare);
                    for (var i = maxItems; i < tmp.length; i++) {
                        delete localValue[tmp[i].key];
                    }
                }
                if (isLocalStorage) {
                    localDataService.set(localKey, localValue);
                } else {
                    t.tmpData = localValue;
                }
            }, 100);
        };

        // Wrapper to get
        serviceFactory.get = function (key, isLocalStorage) {
            var localValue;
            var localKey = "tLocalData";
            if (isLocalStorage) {
                localValue = localDataService.get(localKey);
            } else {
                localValue = t.tmpData;
            }
            if (localValue) {
                var realKey = "tLocalValue" + key;
                var data = localValue[realKey];
                if (data) {
                    if (data.expired >= new Date().getTime()) {
                        return data.value;
                    } else {
                        delete localValue[realKey];
                        if (isLocalStorage) {
                            localDataService.set(localKey, localValue);
                        } else {
                            t.tmpData = localValue;
                        }
                    }
                }
            }
            return null;
        };

        return serviceFactory;
    }]);
})();

/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/

(function() {
    'use strict';

    var app = angular.module('app.core');
    app.controller('UnauthorizedCtrl', ['$scope', '$location', '$uibModalInstance', 'ENV', 'localDataService', 'Message', 'MessageDetail', function ($scope, $location, $modalInstance, ENV, localDataService, Message, MessageDetail) {
        $scope.Message = Message;
        $scope.MessageDetail = MessageDetail;
        $scope.closeAndGotoLogin = function () {
            localDataService.set('logon_return_url', encodeURIComponent(window.location.href));
            var returnUrl = window.location.origin + '/#/page/atoken';
            $modalInstance.close(ENV.urlShareTokenSso + '?r=' + encodeURIComponent(returnUrl));
            /*
            var str = new String(Math.random());
            var id = str.substr(str.indexOf(".")+1);
            xdLocalStorage.setItem('url_' + id, encodeURIComponent(window.location.href), true).then(function () {
                $scope.isDisabledBtnLogin = false;
                $modalInstance.close(ENV.urlLoginSso + '/' + id);
            });
            $scope.isDisabledBtnLogin = true;
            */
        }
        $scope.closeAndGotoLogin2f = function () {
            localDataService.set('logon_return_url', encodeURIComponent(window.location.href));
            var returnUrl = window.location.origin + '/#/page/atoken';
            $modalInstance.close(ENV.urlShareTokenSsoTwoFactor + '?r=' + encodeURIComponent(returnUrl));
            /*
            var str = new String(Math.random());
            var id = str.substr(str.indexOf(".") + 1);
            xdLocalStorage.setItem('url_' + id, encodeURIComponent(window.location.href), true).then(function () {
                $scope.isDisabledBtnLogin = false;
                $modalInstance.close(ENV.urlLoginSsoTwoFactor + '/' + id);
            });
            $scope.isDisabledBtnLogin = true;
            */
        }
        $scope.close = function () {
            $modalInstance.close(false);
        }
    }]);
})();
(function() {
    'use strict';

    angular
        .module('app.lazyload')
        .config(lazyloadConfig);

    lazyloadConfig.$inject = ['$ocLazyLoadProvider', 'APP_REQUIRES'];
    function lazyloadConfig($ocLazyLoadProvider, APP_REQUIRES){

      // Lazy Load modules configuration
      $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: APP_REQUIRES.modules
      });

    }
})();
(function() {
    'use strict';

    angular
        .module('app.lazyload')
        .constant('APP_REQUIRES', {
          // jQuery based and standalone scripts
          scripts: {
            'whirl':              ['vendor/whirl/dist/whirl.css'],
            'classyloader':       ['vendor/jquery-classyloader/js/jquery.classyloader.min.js'],
            'animo':              ['vendor/animo.js/animo.js'],
            'fastclick':          ['vendor/fastclick/lib/fastclick.js'],
            'modernizr':          ['vendor/modernizr/modernizr.custom.js'],
            'animate':            ['vendor/animate.css/animate.min.css'],
            'skycons':            ['vendor/skycons/skycons.js'],
            'icons':              ['vendor/fontawesome/css/font-awesome.min.css',
                                   'vendor/simple-line-icons/css/simple-line-icons.css'],
            'weather-icons':      ['vendor/weather-icons/css/weather-icons.min.css',
                                   'vendor/weather-icons/css/weather-icons-wind.min.css'],
            'sparklines':         ['vendor/sparkline/index.js'],
            'wysiwyg':            ['vendor/bootstrap-wysiwyg/bootstrap-wysiwyg.js',
                                   'vendor/bootstrap-wysiwyg/external/jquery.hotkeys.js'],
            'slimscroll':         ['vendor/slimScroll/jquery.slimscroll.min.js'],
            'screenfull':         ['vendor/screenfull/dist/screenfull.js'],
            'vector-map':         ['vendor/ika.jvectormap/jquery-jvectormap-1.2.2.min.js',
                                   'vendor/ika.jvectormap/jquery-jvectormap-1.2.2.css'],
            'vector-map-maps':    ['vendor/ika.jvectormap/jquery-jvectormap-world-mill-en.js',
                                   'vendor/ika.jvectormap/jquery-jvectormap-us-mill-en.js'],
            'loadGoogleMapsJS':   ['vendor/load-google-maps/load-google-maps.js'],
            'flot-chart':         ['vendor/Flot/jquery.flot.js'],
            'flot-chart-plugins': ['vendor/flot.tooltip/js/jquery.flot.tooltip.min.js',
                                   'vendor/Flot/jquery.flot.resize.js',
                                   'vendor/Flot/jquery.flot.pie.js',
                                   'vendor/Flot/jquery.flot.time.js',
                                   'vendor/Flot/jquery.flot.categories.js',
                                   'vendor/flot-spline/js/jquery.flot.spline.min.js'],
                                  // jquery core and widgets
            'jquery-ui':          ['vendor/jquery-ui/ui/core.js',
                                   'vendor/jquery-ui/ui/widget.js'],
                                   // loads only jquery required modules and touch support
            'jquery-ui-widgets':  ['vendor/jquery-ui/ui/core.js',
                                   'vendor/jquery-ui/ui/widget.js',
                                   'vendor/jquery-ui/ui/mouse.js',
                                   'vendor/jquery-ui/ui/draggable.js',
                                   'vendor/jquery-ui/ui/droppable.js',
                                   'vendor/jquery-ui/ui/sortable.js',
                                   'vendor/jqueryui-touch-punch/jquery.ui.touch-punch.min.js'],
            'moment' :            ['vendor/moment/min/moment-with-locales.min.js'],
            'inputmask':          ['vendor/jquery.inputmask/dist/jquery.inputmask.bundle.js'],
            'flatdoc':            ['vendor/flatdoc/flatdoc.js'],
            'codemirror':         ['vendor/codemirror/lib/codemirror.js',
                                   'vendor/codemirror/lib/codemirror.css'],
            // modes for common web files
            'codemirror-modes-web': ['vendor/codemirror/mode/javascript/javascript.js',
                                     'vendor/codemirror/mode/xml/xml.js',
                                     'vendor/codemirror/mode/htmlmixed/htmlmixed.js',
                                     'vendor/codemirror/mode/css/css.js'],
            'taginput' :          ['vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.css',
                                   'vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js'],
            'filestyle':          ['vendor/bootstrap-filestyle/src/bootstrap-filestyle.js'],
            'parsley':            ['vendor/parsleyjs/dist/parsley.min.js'],
            'fullcalendar':       ['vendor/fullcalendar/dist/fullcalendar.min.js',
                                   'vendor/fullcalendar/dist/fullcalendar.css'],
            'gcal':               ['vendor/fullcalendar/dist/gcal.js'],
            'chartjs':            ['vendor/Chart.js/Chart.js'],
            'morris':             ['vendor/raphael/raphael.js',
                                   'vendor/morris.js/morris.js',
                                   'vendor/morris.js/morris.css'],
            'loaders.css':          ['vendor/loaders.css/loaders.css'],
            'spinkit':              ['vendor/spinkit/css/spinkit.css'],
            'printThis':          ['vendor/printThis/printThis.js']
          },
          // Angular based script (use the right module name)
          modules: [
            {name: 'toaster',                   files: ['vendor/angularjs-toaster/toaster.js',
                                                       'vendor/angularjs-toaster/toaster.css']},
            {name: 'localytics.directives',     files: ['vendor/chosen_v1.2.0/chosen.jquery.min.js',
                                                       'vendor/chosen_v1.2.0/chosen.min.css',
                                                       'vendor/angular-chosen-localytics/chosen.js'],
                                                        serie: true},
            {name: 'ngDialog',                  files: ['vendor/ngDialog/js/ngDialog.min.js',
                                                       'vendor/ngDialog/css/ngDialog.min.css',
                                                       'vendor/ngDialog/css/ngDialog-theme-default.min.css'] },
            {name: 'ngWig',                     files: ['vendor/ngWig/dist/ng-wig.min.js'] },
            {name: 'ngTable',                   files: ['vendor/ng-table/dist/ng-table.min.js',
                                                        'vendor/ng-table/dist/ng-table.min.css']},
            {name: 'ngTableExport',             files: ['vendor/ng-table-export/ng-table-export.js']},
            {name: 'angularBootstrapNavTree',   files: ['vendor/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
                                                        'vendor/angular-bootstrap-nav-tree/dist/abn_tree.css']},
            {name: 'htmlSortable',              files: ['vendor/html.sortable/dist/html.sortable.js',
                                                        'vendor/html.sortable/dist/html.sortable.angular.js']},
            {name: 'xeditable',                 files: ['vendor/angular-xeditable/dist/js/xeditable.js',
                                                        'vendor/angular-xeditable/dist/css/xeditable.css']},
            {name: 'angularFileUpload',         files: ['vendor/angular-file-upload/dist/angular-file-upload.js']},
            {name: 'ngImgCrop',                 files: ['vendor/ng-img-crop/compile/unminified/ng-img-crop.js',
                                                        'vendor/ng-img-crop/compile/unminified/ng-img-crop.css']},
            {name: 'ui.select',                 files: ['vendor/angular-ui-select/dist/select.js',
                                                        'vendor/angular-ui-select/dist/select.css']},
            {name: 'ui.codemirror',             files: ['vendor/angular-ui-codemirror/ui-codemirror.js']},
            {name: 'angular-carousel',          files: ['vendor/angular-carousel/dist/angular-carousel.css',
                                                        'vendor/angular-carousel/dist/angular-carousel.js']},
            {name: 'infinite-scroll',           files: ['vendor/ngInfiniteScroll/build/ng-infinite-scroll.js']},
            {name: 'ui.bootstrap-slider',       files: ['vendor/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js',
                                                        'vendor/seiyria-bootstrap-slider/dist/css/bootstrap-slider.min.css',
                                                        'vendor/angular-bootstrap-slider/slider.js']},
            {name: 'ui.grid',                   files: ['vendor/angular-ui-grid/ui-grid.min.css',
                                                        'vendor/angular-ui-grid/ui-grid.min.js']},
            {name: 'textAngular',               files: ['vendor/textAngular/dist/textAngular.css',
                                                        'vendor/textAngular/dist/textAngular-rangy.min.js',
                                                        'vendor/textAngular/dist/textAngular-sanitize.js',
                                                        'vendor/textAngular/src/globals.js',
                                                        'vendor/textAngular/src/factories.js',
                                                        'vendor/textAngular/src/DOM.js',
                                                        'vendor/textAngular/src/validators.js',
                                                        'vendor/textAngular/src/taBind.js',
                                                        'vendor/textAngular/src/main.js',
                                                        'vendor/textAngular/dist/textAngularSetup.js'
                                                        ], serie: true},
            {name: 'angular-rickshaw',          files: ['vendor/d3/d3.min.js',
                                                        'vendor/rickshaw/rickshaw.js',
                                                        'vendor/rickshaw/rickshaw.min.css',
                                                        'vendor/angular-rickshaw/rickshaw.js'], serie: true},
            {name: 'angular-chartist',          files: ['vendor/chartist/dist/chartist.min.css',
                                                        'vendor/chartist/dist/chartist.js',
                                                        'vendor/angular-chartist.js/dist/angular-chartist.js'], serie: true},
            {name: 'ui.map',                    files: ['vendor/angular-ui-map/ui-map.js']},
            {name: 'datatables',                files: ['vendor/datatables/media/css/jquery.dataTables.css',
                                                        'vendor/datatables/media/js/jquery.dataTables.js',
                                                        'vendor/angular-datatables/dist/angular-datatables.js'], serie: true},
            {name: 'angular-jqcloud',           files: ['vendor/jqcloud2/dist/jqcloud.css',
                                                        'vendor/jqcloud2/dist/jqcloud.js',
                                                        'vendor/angular-jqcloud/angular-jqcloud.js']},
            {name: 'angularGrid',               files: ['vendor/ag-grid/dist/ag-grid.css',
                                                        'vendor/ag-grid/dist/ag-grid.js',
                                                        'vendor/ag-grid/dist/theme-dark.css',
                                                        'vendor/ag-grid/dist/theme-fresh.css']},
            {name: 'ng-nestable',               files: ['vendor/ng-nestable/src/angular-nestable.js',
                                                        'vendor/nestable/jquery.nestable.js']},
            {name: 'akoenig.deckgrid',          files: ['vendor/angular-deckgrid/angular-deckgrid.js']},
            {name: 'oitozero.ngSweetAlert',     files: ['vendor/sweetalert/dist/sweetalert.css',
                                                        'vendor/sweetalert/dist/sweetalert.min.js',
                                                        'vendor/angular-sweetalert/SweetAlert.js']},
            {name: 'bm.bsTour',                 files: ['vendor/bootstrap-tour/build/css/bootstrap-tour.css',
                                                        'vendor/bootstrap-tour/build/js/bootstrap-tour-standalone.js',
                                                        'vendor/angular-bootstrap-tour/dist/angular-bootstrap-tour.js'], serie: true},
            {name: 'ui.knob',                   files: ['vendor/angular-knob/src/angular-knob.js',
                                                        'vendor/jquery-knob/dist/jquery.knob.min.js']},
            {name: 'easypiechart',              files: ['vendor/jquery.easy-pie-chart/dist/angular.easypiechart.min.js']},
            {name: 'colorpicker.module',        files: ['vendor/angular-bootstrap-colorpicker/css/colorpicker.css',
                                                        'vendor/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js']
            },
            { name: 'isteven-multi-select', files: ['vendor/isteven-angular-multiselect/isteven-multi-select.css', 'vendor/isteven-angular-multiselect/isteven-multi-select.js'] },
            { name: 'js-xlsx', files: ['vendor/jszip/dist/jszip.js', 'vendor/js-xlsx/dist/xlsx.js'], serie: true },
            { name: 'file-saver', files: ['vendor/file-saver/FileSaver.js'] }
          ]
        })
        ;

})();

(function() {
    'use strict';

    angular
        .module('app.loadingbar')
        .config(loadingbarConfig)
        ;
    loadingbarConfig.$inject = ['cfpLoadingBarProvider'];
    function loadingbarConfig(cfpLoadingBarProvider){
      cfpLoadingBarProvider.includeBar = true;
      cfpLoadingBarProvider.includeSpinner = false;
      cfpLoadingBarProvider.latencyThreshold = 500;
      cfpLoadingBarProvider.parentSelector = '.wrapper > section';
    }
})();
(function() {
    'use strict';

    angular
        .module('app.loadingbar')
        .run(loadingbarRun)
        ;
    loadingbarRun.$inject = ['$rootScope', '$timeout', 'cfpLoadingBar'];
    function loadingbarRun($rootScope, $timeout, cfpLoadingBar){

      // Loading bar transition
      // ----------------------------------- 
      var thBar;
      $rootScope.$on('$stateChangeStart', function() {
          if($('.wrapper > section').length) // check if bar container exists
            thBar = $timeout(function() {
              cfpLoadingBar.start();
            }, 0); // sets a latency Threshold
      });
      $rootScope.$on('$stateChangeSuccess', function(event) {
          event.targetScope.$watch('$viewContentLoaded', function () {
            $timeout.cancel(thBar);
            cfpLoadingBar.complete();
          });
      });

    }

})();
(function() {
    'use strict';

    angular
        .module('app.preloader')
        .directive('preloader', preloader);

    preloader.$inject = ['$animate', '$timeout', '$q'];
    function preloader ($animate, $timeout, $q) {

        var directive = {
            restrict: 'EAC',
            template: 
              '<div class="preloader-progress">' +
                  '<div class="preloader-progress-bar" ' +
                       'ng-style="{width: loadCounter + \'%\'}"></div>' +
              '</div>'
            ,
            link: link
        };
        return directive;

        ///////

        function link(scope, el) {

          scope.loadCounter = 0;

          var counter  = 0,
              timeout;

          // disables scrollbar
          angular.element('body').css('overflow', 'hidden');
          // ensure class is present for styling
          el.addClass('preloader');

          appReady().then(endCounter);

          timeout = $timeout(startCounter);

          ///////

          function startCounter() {

            var remaining = 100 - counter;
            counter = counter + (0.015 * Math.pow(1 - Math.sqrt(remaining), 2));

            scope.loadCounter = parseInt(counter, 10);

            timeout = $timeout(startCounter, 20);
          }

          function endCounter() {

            $timeout.cancel(timeout);

            scope.loadCounter = 100;

            $timeout(function(){
              // animate preloader hiding
              $animate.addClass(el, 'preloader-hidden');
              // retore scrollbar
              angular.element('body').css('overflow', '');
            }, 300);
          }

          function appReady() {
            var deferred = $q.defer();
            var viewsLoaded = 0;
            // if this doesn't sync with the real app ready
            // a custom event must be used instead
            var off = scope.$on('$viewContentLoaded', function () {
              viewsLoaded ++;
              // we know there are at least two views to be loaded 
              // before the app is ready (1-index.html 2-app*.html)
              if ( viewsLoaded === 2) {
                // with resolve this fires only once
                $timeout(function(){
                  deferred.resolve();
                }, 1000);

                off();
              }

            });

            return deferred.promise;
          }

        } //link
    }

})();
(function() {
    'use strict';

    angular
        .module('app.locale')
        .config(localeConfig)
        ;
    localeConfig.$inject = ['tmhDynamicLocaleProvider'];
    function localeConfig(tmhDynamicLocaleProvider){
  
      tmhDynamicLocaleProvider.localeLocationPattern('vendor/angular-i18n/angular-locale_{{locale}}.js');
      // tmhDynamicLocaleProvider.useStorage('$cookieStore');

    }
})();
/**=========================================================
 * Module: locale.js
 * Demo for locale settings
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.locale')
        .controller('LocalizationController', LocalizationController);

    LocalizationController.$inject = ['$rootScope', 'tmhDynamicLocale', '$locale'];
    function LocalizationController($rootScope, tmhDynamicLocale, $locale) {

        activate();

        ////////////////

        function activate() {
          $rootScope.availableLocales = {
            'en': 'English',
            'es': 'Spanish',
            'de': 'German',
            'fr': 'French',
            'ar': 'Arabic',
            'ja': 'Japanese',
            'ko': 'Korean',
            'zh': 'Chinese'};
          
          $rootScope.model = {selectedLocale: 'en'};
          
          $rootScope.$locale = $locale;
          
          $rootScope.changeLocale = tmhDynamicLocale.set;
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('app.settings')
        .run(settingsRun);

    settingsRun.$inject = ['$rootScope', '$localStorage'];

    function settingsRun($rootScope, $localStorage){

      // Global Settings
      // -----------------------------------
      $rootScope.app = {
        name: 'ĐSVN',
        description: 'Hệ thống quản lý vận tải hàng hóa',
        year: ((new Date()).getFullYear()),
        layout: {
          isFixed: true,
          isCollapsed: false,
          isBoxed: false,
          isRTL: false,
          horizontal: false,
          isFloat: false,
          asideHover: false,
          theme: null,
          asideScrollbar: false
        },
        useFullLayout: false,
        hiddenFooter: false,
        offsidebarOpen: false,
        asideToggled: false,
        viewAnimation: 'ng-fadeInUp'
      };

      // Setup the layout mode
      $rootScope.app.layout.horizontal = ( $rootScope.$stateParams.layout === 'app-h') ;

      // Restore layout settings
      if( angular.isDefined($localStorage.layout) )
        $rootScope.app.layout = $localStorage.layout;
      else
        $localStorage.layout = $rootScope.app.layout;

      $rootScope.$watch('app.layout', function () {
        $localStorage.layout = $rootScope.app.layout;
      }, true);

      // Close submenu when sidebar change from collapsed to normal
      $rootScope.$watch('app.layout.isCollapsed', function(newValue) {
        if( newValue === false )
          $rootScope.$broadcast('closeSidebarMenu');
      });

    }

})();

/**=========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 =========================================================*/

(function () {
    'use strict';

    var app = angular.module('app.routes');
    app.provider('RouteHelpers', ['APP_REQUIRES', function (APP_REQUIRES) {

        /* jshint validthis:true */
        return {
            // provider access level
            basepath: basepath,
            resolveFor: resolveFor,
            resolveAuthFor: resolveAuthFor,
            // controller access level
            $get: function () {
                return {
                    basepath: basepath,
                    resolveFor: resolveFor,
                    resolveAuthFor: resolveAuthFor
                };
            }
        };

        // Set here the base of the relative path
        // for all app views
        function basepath(uri) {
            return 'app/views/' + uri;
        }

        function resolveAuthFor() {
            var _args = arguments;
            var items = [];
            for (var i = 0; i < _args.length; i++) {
                items.push(_args[i]);
            }
            var obj = resolveFor(items);
            var dest = angular.extend({}, obj, {
                authUser: promiseAuth()
            });
            //console.log(dest);
            return dest;
        }

        // Generates a resolve object by passing script names
        // previously configured in constant.APP_REQUIRES
        function resolveFor() {
            var _args = arguments;
            if (_args.length == 1 && angular.isArray(_args[0])) {
                _args = _args[0];
            }
            return {
                //authUser: promiseAuth(),
                deps: ['$ocLazyLoad', '$q', function ($ocLL, $q) {
                    // Creates a promise chain for each argument
                    var promise = $q.when(1); // empty promise
                    for (var i = 0, len = _args.length; i < len; i++) {
                        promise = andThen(_args[i]);
                    }
                    return promise;

                    // creates promise to chain dynamically
                    function andThen(_arg) {
                        // also support a function that returns a promise
                        if (typeof _arg === 'function') {
                            return promise.then(_arg);
                        } else {
                            return promise.then(function () {
                                // if is a module, pass the name. If not, pass the array
                                var whatToLoad = getRequired(_arg);
                                // simple error check
                                if (!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                                // finally, return a promise

                                return $ocLL.load(whatToLoad);
                            });
                        }
                    }
                    // check and returns required data
                    // analyze module items with the form [name: '', files: []]
                    // and also simple array of script files (for not angular js)
                    function getRequired(name) {
                        if (APP_REQUIRES.modules)
                            for (var m in APP_REQUIRES.modules)
                                if (APP_REQUIRES.modules[m].name && APP_REQUIRES.modules[m].name === name)
                                    return APP_REQUIRES.modules[m];
                        return APP_REQUIRES.scripts && APP_REQUIRES.scripts[name];
                    }

                }]
            };
        } // resolveFor
        function promiseAuth() {
            return ['$q', '$injector', '$rootScope', '$timeout', 'localDataService', 'authService', 'ENV', function ($q, $injector, $rootScope, $timeout, localDataService, authService, ENV) {
                if ($rootScope.isAuthLoaded) {
                    return authService.authentication;
                } else {
                    var isTokenChecked = localDataService.get('is_token_checked');
                    if (isTokenChecked && parseInt(isTokenChecked, 10) > 0) {
                        var authData = localDataService.get('authorization');
                        var cscode = localDataService.get('cscode');
                        if (cscode && authData && authData.token) {
                            cscode = authService.textDecode(cscode);
                            authService.fillAuthData(authData, cscode + authData.token);
                        }
                        $rootScope.isAuthLoaded = true;
                        $rootScope.$user = authService.authentication;
                    } else {
                        localDataService.set('logon_return_url', encodeURIComponent(window.location.href));
                        var returnUrl = window.location.origin + '/#/page/atoken';
                        //window.location.href = ENV.urlShareTokenSso + '?r=' + encodeURIComponent(returnUrl);
                    }
                    /*
                    var defer = $q.defer();

                    xdLocalStorage.init({
                        iframeUrl: ENV.urlIframeSso
                    }).then(function () {
                        
                        xdLocalStorage.getItem('xd.authorization').then(function (data) {
                            
                            xdLocalStorage.getItem('cscode', true).then(function (cscode) {
                                if (cscode.value) {
                                    cscode = authService.textDecode(cscode.value);
                                    var authData;
                                    if (data.value) {
                                        try {
                                            authData = JSON.parse(data.value);
                                        } catch (err) {
                                            //not our message, can ignore
                                        }
                                    }
                                    if (authData && authData.token) {
                                        authService.fillAuthData(authData, cscode + authData.token);
                                    }
                                    $rootScope.isAuthLoaded = true;
                                    $rootScope.$user = authService.authentication;
                                    defer.resolve(authService.authentication);
                                } else {
                                    
                                    xdLocalStorage.removeItem('xd.authorization').then(function () {
                                        $rootScope.isAuthLoaded = true;
                                        $rootScope.$user = authService.authentication;
                                        defer.resolve({});
                                    }, function () {
                                        $rootScope.isAuthLoaded = true;
                                        $rootScope.$user = authService.authentication;
                                        defer.resolve({});
                                    });
                                }
                            }, function () {
                                xdLocalStorage.removeItem('xd.authorization').then(function () {
                                    $rootScope.isAuthLoaded = true;
                                    $rootScope.$user = authService.authentication;
                                    defer.resolve({});
                                }, function () {
                                    $rootScope.isAuthLoaded = true;
                                    $rootScope.$user = authService.authentication;
                                    defer.resolve({});
                                });
                            });
                        }, function (err) {
                            $rootScope.isAuthLoaded = true;
                            $rootScope.$user = authService.authentication;
                            defer.resolve({});
                        });
                    }, function (err) {
                        $rootScope.isAuthLoaded = true;
                        $rootScope.$user = authService.authentication;
                        defer.resolve({});
                    });
                    return defer.promise;
                    */
                }
            }];
        }
    }]);
})();

/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/


(function() {
    'use strict';

    var app = angular.module('app.routes');
    app.config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];
    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, helper){

        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        $locationProvider.html5Mode(false);

        // defaults to dashboard
        $urlRouterProvider.otherwise('/page/welcome');

        //
        // Application Routes
        // -----------------------------------
        $stateProvider
            //
            // Single Page Routes
            // -----------------------------------
            .state('page', {
                url: '/page',
                templateUrl: 'app/pages/page.html',
                resolve: helper.resolveFor('modernizr', 'icons'),
                controller: ['$rootScope', function ($rootScope) {
                    $rootScope.app.layout.isBoxed = false;
                }]
            })
            .state('page.welcome', {
                url: '/welcome',
                title: 'welcome',
                templateUrl: 'app/pages/welcome.html',
                resolve: helper.resolveFor()
                //resolve: helper.resolveAuthFor()
            })
            //
            // App page routes
            //
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: helper.basepath('app.html'),
                resolve: helper.resolveFor('loaders.css', 'fastclick', 'modernizr', 'icons', 'screenfull', 'animo', 'sparklines', 'slimscroll', 'classyloader', 'spinkit', 'toaster', 'whirl', 'oitozero.ngSweetAlert', 'textAngular', 'printThis')
            })
            .state('app.home', {
                url: '/home',
                title: 'Home',
                templateUrl: helper.basepath('dashboard/home.html'),
                controller: 'HomeController',
                resolve: helper.resolveFor()

                //resolve: helper.resolveAuthFor()
            })
            .state('app.logout', {
                url: '/logout',
                title: 'Logout',
                //templateUrl: helper.basepath('logout.html'),
                controller: 'LogoutCtrl',
                resolve: helper.resolveFor()
                //resolve: helper.resolveAuthFor()
            })

            //
            // Horizontal layout
            // -----------------------------------
            .state('app-h', {
                url: '/app-h',
                abstract: true,
                templateUrl: helper.basepath('app-h.html'),
                resolve: helper.resolveFor('fastclick', 'modernizr', 'icons', 'screenfull', 'animo', 'sparklines', 'slimscroll', 'classyloader', 'toaster', 'whirl')
            })

            //
            // Default templates
            //
            .state('app.dashboard', {
                url: '/dashboard',
                title: 'Dashboard',
                controller: 'DashboardController',
                templateUrl: helper.basepath('dashboard_v1.html'),
                resolve: helper.resolveFor('flot-chart', 'flot-chart-plugins', 'weather-icons')
                //resolve: helper.resolveAuthFor('flot-chart', 'flot-chart-plugins', 'weather-icons')
            })
            .state('app.dashboard_v2', {
                url: '/dashboard_v2',
                title: 'Dashboard v2',
                templateUrl: helper.basepath('dashboard_v2.html'),
                controller: 'DashboardV2Controller',
                controllerAs: 'dash2',
                resolve: helper.resolveFor('flot-chart', 'flot-chart-plugins')
                //resolve: helper.resolveAuthFor('flot-chart', 'flot-chart-plugins')
            })
            .state('app.dashboard_v3', {
                url: '/dashboard_v3',
                title: 'Dashboard v3',
                controller: 'DashboardV3Controller',
                controllerAs: 'dash3',
                templateUrl: helper.basepath('dashboard_v3.html'),
                resolve: helper.resolveFor('flot-chart', 'flot-chart-plugins', 'vector-map', 'vector-map-maps')
                //resolve: helper.resolveAuthFor('flot-chart', 'flot-chart-plugins', 'vector-map', 'vector-map-maps')
            })
            .state('app.widgets', {
                url: '/widgets',
                title: 'Widgets',
                templateUrl: helper.basepath('templates/widgets.html'),
                resolve: helper.resolveFor('loadGoogleMapsJS', function () { return loadGoogleMaps(); }, 'ui.map')
                //resolve: helper.resolveAuthFor('loadGoogleMapsJS', function () { return loadGoogleMaps(); }, 'ui.map')
            })
            .state('app.buttons', {
                url: '/buttons',
                title: 'Buttons',
                templateUrl: helper.basepath('templates/buttons.html')
            })
            .state('app.colors', {
                url: '/colors',
                title: 'Colors',
                templateUrl: helper.basepath('templates/colors.html')
            })
            .state('app.localization', {
                url: '/localization',
                title: 'Localization',
                templateUrl: helper.basepath('templates/localization.html')
            })
            .state('app.infinite-scroll', {
                url: '/infinite-scroll',
                title: 'Infinite Scroll',
                templateUrl: helper.basepath('templates/infinite-scroll.html'),
                resolve: helper.resolveFor('infinite-scroll')
                //resolve: helper.resolveAuthFor('infinite-scroll')
            })
            .state('app.navtree', {
                url: '/navtree',
                title: 'Nav Tree',
                templateUrl: helper.basepath('templates/nav-tree.html'),
                resolve: helper.resolveFor('angularBootstrapNavTree')
            })
            .state('app.nestable', {
                url: '/nestable',
                title: 'Nestable',
                templateUrl: helper.basepath('templates/nestable.html'),
                resolve: helper.resolveFor('ng-nestable')
            })
            .state('app.sortable', {
                url: '/sortable',
                title: 'Sortable',
                templateUrl: helper.basepath('templates/sortable.html'),
                resolve: helper.resolveFor('htmlSortable')
            })
            .state('app.notifications', {
                url: '/notifications',
                title: 'Notifications',
                templateUrl: helper.basepath('templates/notifications.html')
            })
            .state('app.carousel', {
                url: '/carousel',
                title: 'Carousel',
                templateUrl: helper.basepath('templates/carousel.html'),
                resolve: helper.resolveFor('angular-carousel')
            })
            .state('app.ngdialog', {
                url: '/ngdialog',
                title: 'ngDialog',
                templateUrl: helper.basepath('templates/ngdialog.html'),
                resolve: angular.extend(helper.resolveFor('ngDialog'), {
                    tpl: function () { return { path: helper.basepath('templates/ngdialog-template.html') }; }
                }),
                controller: 'DialogIntroCtrl'
            })
            .state('app.sweetalert', {
                url: '/sweetalert',
                title: 'SweetAlert',
                templateUrl: helper.basepath('templates/sweetalert.html'),
                resolve: helper.resolveFor('oitozero.ngSweetAlert')
            })
            .state('app.tour', {
                url: '/tour',
                title: 'Tour',
                templateUrl: helper.basepath('templates/tour.html'),
                resolve: helper.resolveFor('bm.bsTour')
            })
            .state('app.interaction', {
                url: '/interaction',
                title: 'Interaction',
                templateUrl: helper.basepath('templates/interaction.html')
            })
            .state('app.spinners', {
                url: '/spinners',
                title: 'Spinners',
                templateUrl: helper.basepath('templates/spinners.html'),
                resolve: helper.resolveFor('loaders.css', 'spinkit')
            })
            .state('app.dropdown-animations', {
                url: '/dropdown-animations',
                title: 'Dropdown Animations',
                templateUrl: helper.basepath('templates/dropdown-animations.html')
            })
            .state('app.panels', {
                url: '/panels',
                title: 'Panels',
                templateUrl: helper.basepath('templates/panels.html')
            })
            .state('app.portlets', {
                url: '/portlets',
                title: 'Portlets',
                templateUrl: helper.basepath('templates/portlets.html'),
                resolve: helper.resolveFor('jquery-ui', 'jquery-ui-widgets')
            })
            .state('app.maps-google', {
                url: '/maps-google',
                title: 'Maps Google',
                templateUrl: helper.basepath('templates/maps-google.html'),
                resolve: helper.resolveFor('loadGoogleMapsJS', function () { return loadGoogleMaps(); }, 'ui.map')
            })
            .state('app.maps-vector', {
                url: '/maps-vector',
                title: 'Maps Vector',
                templateUrl: helper.basepath('templates/maps-vector.html'),
                controller: 'VectorMapController',
                controllerAs: 'vmap',
                resolve: helper.resolveFor('vector-map', 'vector-map-maps')
            })
            .state('app.grid', {
                url: '/grid',
                title: 'Grid',
                templateUrl: helper.basepath('templates/grid.html')
            })
            .state('app.grid-masonry', {
                url: '/grid-masonry',
                title: 'Grid Masonry',
                templateUrl: helper.basepath('templates/grid-masonry.html')
            })
            .state('app.grid-masonry-deck', {
                url: '/grid-masonry-deck',
                title: 'Grid Masonry',
                templateUrl: helper.basepath('templates/grid-masonry-deck.html'),
                resolve: helper.resolveFor('spinkit', 'akoenig.deckgrid')
            })
            .state('app.typo', {
                url: '/typo',
                title: 'Typo',
                templateUrl: helper.basepath('templates/typo.html')
            })
            .state('app.icons-font', {
                url: '/icons-font',
                title: 'Icons Font',
                templateUrl: helper.basepath('templates/icons-font.html'),
                resolve: helper.resolveFor('icons')
            })
            .state('app.icons-weather', {
                url: '/icons-weather',
                title: 'Icons Weather',
                templateUrl: helper.basepath('templates/icons-weather.html'),
                resolve: helper.resolveFor('weather-icons', 'skycons')
            })
            .state('app.form-standard', {
                url: '/form-standard',
                title: 'Form Standard',
                templateUrl: helper.basepath('templates/form-standard.html')
            })
            .state('app.form-extended', {
                url: '/form-extended',
                title: 'Form Extended',
                templateUrl: helper.basepath('templates/form-extended.html'),
                resolve: helper.resolveFor('colorpicker.module', 'codemirror', 'moment', 'taginput', 'inputmask', 'localytics.directives', 'ui.bootstrap-slider', 'ngWig', 'filestyle', 'textAngular')
            })
            .state('app.form-validation', {
                url: '/form-validation',
                title: 'Form Validation',
                templateUrl: helper.basepath('templates/form-validation.html'),
                resolve: helper.resolveFor('ui.select', 'taginput', 'inputmask', 'localytics.directives')
            })
            .state('app.form-parsley', {
                url: '/form-parsley',
                title: 'Form Validation - Parsley',
                templateUrl: helper.basepath('templates/form-parsley.html'),
                resolve: helper.resolveFor('parsley')
            })
            .state('app.form-wizard', {
                url: '/form-wizard',
                title: 'Form Wizard',
                templateUrl: helper.basepath('templates/form-wizard.html'),
                resolve: helper.resolveFor('parsley')
            })
            .state('app.form-upload', {
                url: '/form-upload',
                title: 'Form upload',
                templateUrl: helper.basepath('templates/form-upload.html'),
                resolve: helper.resolveFor('angularFileUpload', 'filestyle')
            })
            .state('app.form-xeditable', {
                url: '/form-xeditable',
                templateUrl: helper.basepath('templates/form-xeditable.html'),
                resolve: helper.resolveFor('xeditable')
            })
            .state('app.form-imagecrop', {
                url: '/form-imagecrop',
                templateUrl: helper.basepath('templates/form-imagecrop.html'),
                resolve: helper.resolveFor('ngImgCrop', 'filestyle')
            })
            .state('app.form-uiselect', {
                url: '/form-uiselect',
                templateUrl: helper.basepath('templates/form-uiselect.html'),
                controller: 'uiSelectController',
                controllerAs: 'uisel',
                resolve: helper.resolveFor('ui.select')
            })
            .state('app.chart-flot', {
                url: '/chart-flot',
                title: 'Chart Flot',
                templateUrl: helper.basepath('templates/chart-flot.html'),
                resolve: helper.resolveFor('flot-chart', 'flot-chart-plugins')
            })
            .state('app.chart-radial', {
                url: '/chart-radial',
                title: 'Chart Radial',
                templateUrl: helper.basepath('templates/chart-radial.html'),
                resolve: helper.resolveFor('classyloader', 'ui.knob', 'easypiechart')
            })
            .state('app.chart-js', {
                url: '/chart-js',
                title: 'Chart JS',
                templateUrl: helper.basepath('templates/chart-js.html'),
                resolve: helper.resolveFor('chartjs')
            })
            .state('app.chart-rickshaw', {
                url: '/chart-rickshaw',
                title: 'Chart Rickshaw',
                templateUrl: helper.basepath('templates/chart-rickshaw.html'),
                resolve: helper.resolveFor('angular-rickshaw')
            })
            .state('app.chart-morris', {
                url: '/chart-morris',
                title: 'Chart Morris',
                templateUrl: helper.basepath('templates/chart-morris.html'),
                resolve: helper.resolveFor('morris')
            })
            .state('app.chart-chartist', {
                url: '/chart-chartist',
                title: 'Chart Chartist',
                templateUrl: helper.basepath('templates/chart-chartist.html'),
                resolve: helper.resolveFor('angular-chartist')
            })
            .state('app.table-standard', {
                url: '/table-standard',
                title: 'Table Standard',
                templateUrl: helper.basepath('templates/table-standard.html')
            })
            .state('app.table-extended', {
                url: '/table-extended',
                title: 'Table Extended',
                templateUrl: helper.basepath('templates/table-extended.html')
            })
            .state('app.table-datatable', {
                url: '/table-datatable',
                title: 'Table Datatable',
                templateUrl: helper.basepath('templates/table-datatable.html'),
                resolve: helper.resolveFor('datatables')
            })
            .state('app.table-xeditable', {
                url: '/table-xeditable',
                templateUrl: helper.basepath('templates/table-xeditable.html'),
                resolve: helper.resolveFor('xeditable')
            })
            .state('app.table-ngtable', {
                url: '/table-ngtable',
                templateUrl: helper.basepath('templates/table-ngtable.html'),
                resolve: helper.resolveFor('ngTable', 'ngTableExport')
            })
            .state('app.table-uigrid', {
                url: '/table-uigrid',
                templateUrl: helper.basepath('templates/table-uigrid.html'),
                resolve: helper.resolveFor('ui.grid')
            })
            .state('app.table-angulargrid', {
                url: '/table-angulargrid',
                templateUrl: helper.basepath('templates/table-angulargrid.html'),
                resolve: helper.resolveFor('angularGrid')
            })
            .state('app.timeline', {
                url: '/timeline',
                title: 'Timeline',
                templateUrl: helper.basepath('templates/timeline.html')
            })
            .state('app.calendar', {
                url: '/calendar',
                title: 'Calendar',
                templateUrl: helper.basepath('templates/calendar.html'),
                resolve: helper.resolveAuthFor('jquery-ui', 'jquery-ui-widgets', 'moment', 'fullcalendar')
            })
            .state('app.invoice', {
                url: '/invoice',
                title: 'Invoice',
                templateUrl: helper.basepath('templates/invoice.html')
            })
            .state('app.search', {
                url: '/search',
                title: 'Search',
                templateUrl: helper.basepath('templates/search.html'),
                resolve: helper.resolveAuthFor('moment', 'localytics.directives', 'ui.bootstrap-slider')
            })
            .state('app.todo', {
                url: '/todo',
                title: 'Todo List',
                templateUrl: helper.basepath('templates/todo.html'),
                controller: 'TodoController',
                controllerAs: 'todo'
            })
            .state('app.profile', {
                url: '/profile',
                title: 'Profile',
                templateUrl: helper.basepath('templates/profile.html'),
                resolve: helper.resolveAuthFor('loadGoogleMapsJS', function () { return loadGoogleMaps(); }, 'ui.map')
            })
            .state('app.code-editor', {
                url: '/code-editor',
                templateUrl: helper.basepath('templates/code-editor.html'),
                controller: 'CodeEditorController',
                controllerAs: 'coder',
                resolve: {
                    deps: helper.resolveAuthFor('codemirror', 'ui.codemirror', 'codemirror-modes-web', 'angularBootstrapNavTree').deps,
                    filetree: ['LoadTreeService', function (LoadTreeService) {
                        return LoadTreeService.get().$promise.then(function (res) {
                            return res.data;
                        });
                    }]
                }
            })
            .state('app.template', {
                url: '/template',
                title: 'Blank Template',
                templateUrl: helper.basepath('templates/template.html')
            })
            .state('app.documentation', {
                url: '/documentation',
                title: 'Documentation',
                templateUrl: helper.basepath('templates/documentation.html'),
                resolve: helper.resolveAuthFor('flatdoc')
            })
            // Forum
            // -----------------------------------
            .state('app.forum', {
                url: '/forum',
                title: 'Forum',
                templateUrl: helper.basepath('templates/forum.html')
            })
            .state('app.forum-topics', {
                url: '/forum/topics/:catid',
                title: 'Forum Topics',
                templateUrl: helper.basepath('templates/forum-topics.html')
            })
            .state('app.forum-discussion', {
                url: '/forum/discussion/:topid',
                title: 'Forum Discussion',
                templateUrl: helper.basepath('templates/forum-discussion.html')
            })
            // Blog
            // -----------------------------------
            .state('app.blog', {
                url: '/blog',
                title: 'Blog',
                templateUrl: helper.basepath('templates/blog.html'),
                resolve: helper.resolveAuthFor('angular-jqcloud')
            })
            .state('app.blog-post', {
                url: '/post',
                title: 'Post',
                templateUrl: helper.basepath('templates/blog-post.html'),
                resolve: helper.resolveAuthFor('angular-jqcloud')
            })
            .state('app.articles', {
                url: '/articles',
                title: 'Articles',
                templateUrl: helper.basepath('templates/blog-articles.html'),
                resolve: helper.resolveAuthFor('datatables')
            })
            .state('app.article-view', {
                url: '/article/:id',
                title: 'Article View',
                templateUrl: helper.basepath('templates/blog-article-view.html'),
                resolve: helper.resolveAuthFor('ui.select', 'textAngular')
            })
            // eCommerce
            // -----------------------------------
            .state('app.orders', {
                url: '/orders',
                title: 'Orders',
                templateUrl: helper.basepath('templates/ecommerce-orders.html'),
                resolve: helper.resolveAuthFor('datatables')
            })
            .state('app.order-view', {
                url: '/order-view',
                title: 'Order View',
                templateUrl: helper.basepath('templates/ecommerce-order-view.html')
            })
            .state('app.products', {
                url: '/products',
                title: 'Products',
                templateUrl: helper.basepath('templates/ecommerce-products.html'),
                resolve: helper.resolveAuthFor('datatables')
            })
            .state('app.product-view', {
                url: '/product/:id',
                title: 'Product View',
                templateUrl: helper.basepath('templates/ecommerce-product-view.html')
            })
            // Mailbox
            // -----------------------------------
            .state('app.mailbox', {
                url: '/mailbox',
                title: 'Mailbox',
                abstract: true,
                templateUrl: helper.basepath('templates/mailbox.html')
            })
            .state('app.mailbox.folder', {
                url: '/folder/:folder',
                title: 'Mailbox',
                templateUrl: helper.basepath('templates/mailbox-inbox.html')
            })
            .state('app.mailbox.view', {
                url: '/{mid:[0-9]{1,4}}',
                title: 'View mail',
                templateUrl: helper.basepath('templates/mailbox-view.html'),
                resolve: helper.resolveAuthFor('ngWig')
            })
            .state('app.mailbox.compose', {
                url: '/compose',
                title: 'Mailbox',
                templateUrl: helper.basepath('templates/mailbox-compose.html'),
                resolve: helper.resolveAuthFor('ngWig')
            })
            //
            // Multiple level example
            // -----------------------------------
            .state('app.multilevel', {
                url: '/multilevel',
                title: 'Multilevel',
                template: '<h3>Multilevel Views</h3>' + '<div class="lead ba p">View @ Top Level ' + '<div ui-view=""></div> </div>'
            })
            .state('app.multilevel.level1', {
                url: '/level1',
                title: 'Multilevel - Level1',
                template: '<div class="lead ba p">View @ Level 1' + '<div ui-view=""></div> </div>'
            })
            .state('app.multilevel.level1.item', {
                url: '/item',
                title: 'Multilevel - Level1',
                template: '<div class="lead ba p"> Menu item @ Level 1</div>'
            })
            .state('app.multilevel.level1.level2', {
                url: '/level2',
                title: 'Multilevel - Level2',
                template: '<div class="lead ba p">View @ Level 2' + '<div ui-view=""></div> </div>'
            })
            .state('app.multilevel.level1.level2.level3', {
                url: '/level3',
                title: 'Multilevel - Level3',
                template: '<div class="lead ba p">View @ Level 3' + '<div ui-view=""></div> </div>'
            })
            .state('app.multilevel.level1.level2.level3.item', {
                url: '/item',
                title: 'Multilevel - Level3 Item',
                template: '<div class="lead ba p"> Menu item @ Level 3</div>'
            })
            .state('page.atoken', {
                url: '/atoken',
                title: 'Login',
                controller: 'MyTokenCtrl'
            })
            .state('page.login', {
                url: '/login',
                title: 'Login',
                templateUrl: 'app/pages/login.html'
            })
            .state('page.register', {
                url: '/register',
                title: 'Register',
                templateUrl: 'app/pages/register.html'
            })
            .state('page.recover', {
                url: '/recover',
                title: 'Recover',
                templateUrl: 'app/pages/recover.html'
            })
            .state('page.lock', {
                url: '/lock',
                title: 'Lock',
                templateUrl: 'app/pages/lock.html'
            })
            .state('page.404', {
                url: '/404',
                title: 'Not Found',
                templateUrl: 'app/pages/404.html'
            })
        ;

    } // routesConfig

})();

/**=========================================================
 * Module: sidebar-menu.js
 * Handle sidebar collapsible elements
 =========================================================*/

(function() {
    'use strict';

    var app = angular.module('app.sidebar');
    app.controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$rootScope', '$scope', '$state', 'authService', 'SidebarLoader', 'Utils'];
    function SidebarController($rootScope, $scope, $state, authService, SidebarLoader, Utils) {

        var collapseList = [];

        // demo: when switch from collapse to hover, close all items
        $rootScope.$watch('app.layout.asideHover', function (oldVal, newVal) {
            if (newVal === false && oldVal === true) {
                closeAllBut(-1);
            }
        });


        // Load menu from json file
        // ----------------------------------- 

        $scope.isLoaded = false;
        SidebarLoader.getMenu(sidebarReady, sidebarError);

        var checkValidUser = function (items) {
            for (var i = 0; i < items.length; i++) {
                if (items[i].sref == 'app.trogiup') {
                    return true;
                }
            }
            return false;
        }

        function sidebarReady(items) {
            var isValid = checkValidUser(items);
            if (isValid) {
                $scope.menuItems = items;
                $scope.isLoaded = true;
            } else {
                // Logout
                authService.logOut();

                // Show modal info
                var title = 'Lỗi truy cập hệ thống';
                var detail = 'Tài khoản của bạn chưa được thiết lập truy cập hệ thống, vui lòng kiểm tra lại.';
                $rootScope.ShowModalUnauthorized(title, detail);
            }
        }

        function sidebarError(err) {
            $scope.menuItems = false;
            $scope.isLoaded = true;
        }

        // Handle sidebar and collapse items
        // ----------------------------------

        $scope.getMenuItemPropClasses = function (item) {
            return (item.heading ? 'nav-heading' : '') +
                   (isActive(item) ? ' active' : '');
        };

        $scope.addCollapse = function ($index, item) {
            collapseList[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
        };

        $scope.isCollapse = function ($index) {
            return (collapseList[$index]);
        };

        $scope.toggleCollapse = function ($index, isParentItem) {

            // collapsed sidebar doesn't toggle drodopwn
            if (Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover) return true;

            // make sure the item index exists
            if (angular.isDefined(collapseList[$index])) {
                if (!$scope.lastEventFromChild) {
                    collapseList[$index] = !collapseList[$index];
                    closeAllBut($index);
                }
            }
            else if (isParentItem) {
                closeAllBut(-1);
            }

            $scope.lastEventFromChild = isChild($index);

            return true;

        };

        // Controller helpers
        // ----------------------------------- 

        // Check item and children active state
        function isActive(item) {

            if (!item) return;

            if (!item.sref || item.sref === '#') {
                var foundActive = false;
                angular.forEach(item.submenu, function (value) {
                    if (isActive(value)) foundActive = true;
                });
                return foundActive;
            }
            else
                return $state.is(item.sref) || $state.includes(item.sref);
        }

        function closeAllBut(index) {
            index += '';
            for (var i in collapseList) {
                if (index < 0 || index.indexOf(i) < 0)
                    collapseList[i] = true;
            }
        }

        function isChild($index) {
            /*jshint -W018*/
            return (typeof $index === 'string') && !($index.indexOf('-') < 0);
        }
    }

})();

/**=========================================================
 * Module: sidebar.js
 * Wraps the sidebar and handles collapsed state
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .directive('sidebar', sidebar);

    sidebar.$inject = ['$rootScope', '$timeout', '$window', 'Utils'];
    function sidebar ($rootScope, $timeout, $window, Utils) {
        var $win = angular.element($window);
        var directive = {
            // bindToController: true,
            // controller: Controller,
            // controllerAs: 'vm',
            link: link,
            restrict: 'EA',
            template: '<nav class="sidebar" ng-transclude></nav>',
            transclude: true,
            replace: true
            // scope: {}
        };
        return directive;

        function link(scope, element, attrs) {

          var currentState = $rootScope.$state.current.name;
          var $sidebar = element;

          var eventName = Utils.isTouch() ? 'click' : 'mouseenter' ;
          var subNav = $();

          $sidebar.on( eventName, '.nav > li', function() {

            if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) {

              subNav.trigger('mouseleave');
              subNav = toggleMenuItem( $(this), $sidebar);

              // Used to detect click and touch events outside the sidebar          
              sidebarAddBackdrop();

            }

          });

          scope.$on('closeSidebarMenu', function() {
            removeFloatingNav();
          });

          // Normalize state when resize to mobile
          $win.on('resize', function() {
            if( ! Utils.isMobile() )
          	asideToggleOff();
          });

          // Adjustment on route changes
          $rootScope.$on('$stateChangeStart', function(event, toState) {
            currentState = toState.name;
            // Hide sidebar automatically on mobile
            asideToggleOff();

            $rootScope.$broadcast('closeSidebarMenu');
          });

      	  // Autoclose when click outside the sidebar
          if ( angular.isDefined(attrs.sidebarAnyclickClose) ) {
            
            var wrapper = $('.wrapper');
            var sbclickEvent = 'click.sidebar';
            
            $rootScope.$watch('app.asideToggled', watchExternalClicks);

          }

          //////

          function watchExternalClicks(newVal) {
            // if sidebar becomes visible
            if ( newVal === true ) {
              $timeout(function(){ // render after current digest cycle
                wrapper.on(sbclickEvent, function(e){
                  // if not child of sidebar
                  if( ! $(e.target).parents('.aside').length ) {
                    asideToggleOff();
                  }
                });
              });
            }
            else {
              // dettach event
              wrapper.off(sbclickEvent);
            }
          }

          function asideToggleOff() {
            $rootScope.app.asideToggled = false;
            if(!scope.$$phase) scope.$apply(); // anti-pattern but sometimes necessary
      	  }
        }
        
        ///////

        function sidebarAddBackdrop() {
          var $backdrop = $('<div/>', { 'class': 'dropdown-backdrop'} );
          $backdrop.insertAfter('.aside-inner').on('click mouseenter', function () {
            removeFloatingNav();
          });
        }

        // Open the collapse sidebar submenu items when on touch devices 
        // - desktop only opens on hover
        function toggleTouchItem($element){
          $element
            .siblings('li')
            .removeClass('open')
            .end()
            .toggleClass('open');
        }

        // Handles hover to open items under collapsed menu
        // ----------------------------------- 
        function toggleMenuItem($listItem, $sidebar) {

          removeFloatingNav();

          var ul = $listItem.children('ul');
          
          if( !ul.length ) return $();
          if( $listItem.hasClass('open') ) {
            toggleTouchItem($listItem);
            return $();
          }

          var $aside = $('.aside');
          var $asideInner = $('.aside-inner'); // for top offset calculation
          // float aside uses extra padding on aside
          var mar = parseInt( $asideInner.css('padding-top'), 0) + parseInt( $aside.css('padding-top'), 0);
          var subNav = ul.clone().appendTo( $aside );
          
          toggleTouchItem($listItem);

          var itemTop = ($listItem.position().top + mar) - $sidebar.scrollTop();
          var vwHeight = $win.height();

          subNav
            .addClass('nav-floating')
            .css({
              position: $rootScope.app.layout.isFixed ? 'fixed' : 'absolute',
              top:      itemTop,
              bottom:   (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
            });

          subNav.on('mouseleave', function() {
            toggleTouchItem($listItem);
            subNav.remove();
          });

          return subNav;
        }

        function removeFloatingNav() {
          $('.dropdown-backdrop').remove();
          $('.sidebar-subnav.nav-floating').remove();
          $('.sidebar li.open').removeClass('open');
        }
    }


})();


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
                    job:'�i?u h�nh ch?y t�u',
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

(function() {
    'use strict';

    angular
        .module('app.translate')
        .config(translateConfig)
        ;
    translateConfig.$inject = ['$translateProvider'];
    function translateConfig($translateProvider){

      $translateProvider.useStaticFilesLoader({
          prefix : 'app/i18n/',
          suffix : '.json'
      });

      $translateProvider.preferredLanguage('vi');
      $translateProvider.useLocalStorage(true);
      $translateProvider.usePostCompiling(true);
      $translateProvider.useSanitizeValueStrategy('sanitizeParameters');

    }
})();
(function() {
    'use strict';

    angular
        .module('app.translate')
        .run(translateRun)
        ;
    translateRun.$inject = ['$rootScope', '$translate'];
    
    function translateRun($rootScope, $translate){

      // Internationalization
      // ----------------------

      $rootScope.language = {
        // Handles language dropdown
        listIsOpen: false,
        //// list of available languages
        available: {
            'en': 'English',
            'vi': 'Tiếng Việt'
        },
        // display always the current ui language
        init: function () {
          var proposedLanguage = $translate.proposedLanguage() || $translate.use();
          var preferredLanguage = $translate.preferredLanguage(); // we know we have set a preferred one in app.config
          $rootScope.language.selected = $rootScope.language.available[(proposedLanguage || preferredLanguage)];
        },
        set: function (localeId) {
          // Set the new idiom
          $translate.use(localeId);
          // save a reference for the current language
          $rootScope.language.selected = $rootScope.language.available[localeId];
          // finally toggle dropdown
          $rootScope.language.listIsOpen = ! $rootScope.language.listIsOpen;
        }
      };

      $rootScope.language.init();

    }
})();
/**=========================================================
 * Module: animate-enabled.js
 * Enable or disables ngAnimate for element with directive
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('animateEnabled', animateEnabled);

    animateEnabled.$inject = ['$animate'];
    function animateEnabled ($animate) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
          scope.$watch(function () {
            return scope.$eval(attrs.animateEnabled, scope);
          }, function (newValue) {
            $animate.enabled(!!newValue, element);
          });
        }
    }

})();

/**=========================================================
 * Module: browser.js
 * Browser detection
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .service('Browser', Browser);

    Browser.$inject = ['$window'];
    function Browser($window) {
      return $window.jQBrowser;
    }

})();

/**=========================================================
 * Module: clear-storage.js
 * Removes a key from the browser storage via element click
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('resetKey', resetKey);

    resetKey.$inject = ['$state', '$localStorage'];
    function resetKey ($state, $localStorage) {
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
              resetKey: '@'
            }
        };
        return directive;

        function link(scope, element) {
          element.on('click', function (e) {
              e.preventDefault();

              if(scope.resetKey) {
                delete $localStorage[scope.resetKey];
                $state.go($state.current, {}, {reload: true});
              }
              else {
                $.error('No storage key specified for reset.');
              }
          });
        }
    }

})();

/**=========================================================
 * Module: fullscreen.js
 * Toggle the fullscreen mode on/off
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('toggleFullscreen', toggleFullscreen);

    toggleFullscreen.$inject = ['Browser'];
    function toggleFullscreen (Browser) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          // Not supported under IE
          if( Browser.msie ) {
            element.addClass('hide');
          }
          else {
            element.on('click', function (e) {
                e.preventDefault();

                if (screenfull.enabled) {
                  
                  screenfull.toggle();

                  // Switch icon indicator
                  if(!screenfull.isFullscreen)
                    $(this).children('em').removeClass('fa-expand').addClass('fa-compress');
                  else
                    $(this).children('em').removeClass('fa-compress').addClass('fa-expand');

                } else {
                  $.error('Fullscreen not enabled');
                }

            });
          }
        }
    }


})();

/**=========================================================
 * Module: load-css.js
 * Request and load into the current page a css file
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('loadCss', loadCss);

    function loadCss () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
          element.on('click', function (e) {
              if(element.is('a')) e.preventDefault();
              var uri = attrs.loadCss,
                  link;

              if(uri) {
                link = createLink(uri);
                if ( !link ) {
                  $.error('Error creating stylesheet link element.');
                }
              }
              else {
                $.error('No stylesheet location defined.');
              }

          });
        }
        
        function createLink(uri) {
          var linkId = 'autoloaded-stylesheet',
              oldLink = $('#'+linkId).attr('id', linkId + '-old');

          $('head').append($('<link/>').attr({
            'id':   linkId,
            'rel':  'stylesheet',
            'href': uri
          }));

          if( oldLink.length ) {
            oldLink.remove();
          }

          return $('#'+linkId);
        }
    }

})();

/**=========================================================
 * Module: now.js
 * Provides a simple way to display the current time formatted
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('now', now);

    now.$inject = ['dateFilter', '$interval'];
    function now (dateFilter, $interval) {
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
          var format = attrs.format;

          function updateTime() {
            var dt = dateFilter(new Date(), format);
            element.text(dt);
          }

          updateTime();
          var intervalPromise = $interval(updateTime, 1000);

          scope.$on('$destroy', function(){
            $interval.cancel(intervalPromise);
          });

        }
    }

})();

/**=========================================================
 * Module: app.taucomment
 * Provides a simple way to scrollable element
 =========================================================*/

(function() {
    'use strict';

    var app = angular.module('app.utils');
    app.directive('onFinishRender', ["$timeout", function ($timeout) {
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
    }]);   

})();

/**=========================================================
 * Module: table-checkall.js
 * Tables check all checkbox
 =========================================================*/
(function() {
    'use strict';

    var app = angular.module('app.utils')
    app.directive('checkAll', function () {
        var directive = {
            link: checkAllLink,
            restrict: 'A'
        };
        return directive;

        function checkAllLink(scope, element) {
            element.on('change', function () {
                var $this = $(this),
                    index = $this.index() + 1,
                    checkbox = $this.find('input[type="checkbox"]'),
                    table = $this.parents('table');
                var isChecked = checkbox[0].checked;
                // Make sure to affect only the correct checkbox column
                //table.find('tbody > tr > td:nth-child(' + index + ') input[type="checkbox"]').prop('checked', checkbox[0].checked);
                table.find('tbody > tr > td:nth-child(' + index + ') input[type="checkbox"]:not(:disabled)').each(function (index) {
                    if (isChecked != this.checked) {
                        $(this).prop('checked', isChecked)
                        $(this).triggerHandler('click');
                    }
                });

            });
        }
    });
})();

/**=========================================================
 * Module: trigger-resize.js
 * Triggers a window resize event from any element
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('triggerResize', triggerResize);

    triggerResize.$inject = ['$window', '$timeout'];
    function triggerResize ($window, $timeout) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attributes) {
          element.on('click', function(){
            $timeout(function(){
              // all IE friendly dispatchEvent
              var evt = document.createEvent('UIEvents');
              evt.initUIEvent('resize', true, false, $window, 0);
              $window.dispatchEvent(evt);
              // modern dispatchEvent way
              // $window.dispatchEvent(new Event('resize'));
            }, attributes.triggerResize || 300);
          });
        }
    }

})();

/**=========================================================
 * Module: utils.js
 * Utility library to use across the theme
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .service('Utils', Utils);

    Utils.$inject = ['$window', 'APP_MEDIAQUERY'];
    function Utils($window, APP_MEDIAQUERY) {

        var $html = angular.element('html'),
            $win  = angular.element($window),
            $body = angular.element('body');

        return {
          // DETECTION
          support: {
            transition: (function() {
                    var transitionEnd = (function() {

                        var element = document.body || document.documentElement,
                            transEndEventNames = {
                                WebkitTransition: 'webkitTransitionEnd',
                                MozTransition: 'transitionend',
                                OTransition: 'oTransitionEnd otransitionend',
                                transition: 'transitionend'
                            }, name;

                        for (name in transEndEventNames) {
                            if (element.style[name] !== undefined) return transEndEventNames[name];
                        }
                    }());

                    return transitionEnd && { end: transitionEnd };
                })(),
            animation: (function() {

                var animationEnd = (function() {

                    var element = document.body || document.documentElement,
                        animEndEventNames = {
                            WebkitAnimation: 'webkitAnimationEnd',
                            MozAnimation: 'animationend',
                            OAnimation: 'oAnimationEnd oanimationend',
                            animation: 'animationend'
                        }, name;

                    for (name in animEndEventNames) {
                        if (element.style[name] !== undefined) return animEndEventNames[name];
                    }
                }());

                return animationEnd && { end: animationEnd };
            })(),
            requestAnimationFrame: window.requestAnimationFrame ||
                                   window.webkitRequestAnimationFrame ||
                                   window.mozRequestAnimationFrame ||
                                   window.msRequestAnimationFrame ||
                                   window.oRequestAnimationFrame ||
                                   function(callback){ window.setTimeout(callback, 1000/60); },
            /*jshint -W069*/
            touch: (
                ('ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
                (window.DocumentTouch && document instanceof window.DocumentTouch)  ||
                (window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0) || //IE 10
                (window.navigator['pointerEnabled'] && window.navigator['maxTouchPoints'] > 0) || //IE >=11
                false
            ),
            mutationobserver: (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null)
          },
          // UTILITIES
          isInView: function(element, options) {
              /*jshint -W106*/
              var $element = $(element);

              if (!$element.is(':visible')) {
                  return false;
              }

              var window_left = $win.scrollLeft(),
                  window_top  = $win.scrollTop(),
                  offset      = $element.offset(),
                  left        = offset.left,
                  top         = offset.top;

              options = $.extend({topoffset:0, leftoffset:0}, options);

              if (top + $element.height() >= window_top && top - options.topoffset <= window_top + $win.height() &&
                  left + $element.width() >= window_left && left - options.leftoffset <= window_left + $win.width()) {
                return true;
              } else {
                return false;
              }
          },
          
          langdirection: $html.attr('dir') === 'rtl' ? 'right' : 'left',

          isTouch: function () {
            return $html.hasClass('touch');
          },

          isSidebarCollapsed: function () {
            return $body.hasClass('aside-collapsed');
          },

          isSidebarToggled: function () {
            return $body.hasClass('aside-toggled');
          },

          isMobile: function () {
            return $win.width() < APP_MEDIAQUERY.tablet;
          }

        };
    }
})();

(function() {
    'use strict';

    angular.module('app.danhmuc', []);
})();
(function() {
    'use strict';

    angular
        .module('app.navsearch', []);
})();
(function() {
    'use strict';

    angular
        .module('app.dashboard', []);
})();
(function() {
    'use strict';

    angular.module('app.pages', ['app.auth']);
})();
(function () {
    'use strict';

    angular.module('app.reportbc', []);
})();
(function () {
    'use strict';

    angular.module('app.reportbk', []);
})();
(function() {
    'use strict';

    angular.module('app.trogiup', []);
})();
(function () {
    'use strict';

    angular.module('app.reportdt01', []);
})();
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
(function () {
    'use strict';
    var app = angular.module('app.danhmuc');
    app.directive('selectMacTau', ['$rootScope', '$uibModal', 'DanhMucService', function ($rootScope, $uibModal, DanhMucService) {
        return {
            restrict: 'A',
            scope: 
            {   
                //// settings based on attribute
                tinhChat: '=', // 0: Tau thong nhat, 1: Dia phuong HN, 2: Dia phuong SG, 9: Tau dia phuong HN va SG
                maxMacTau: '=',

                //// callbacks
                //onClear         : '&',  
                //onClose         : '&',
            },
            require: 'ngModel',
            template: '<div ng-if="loaded"\
                            isteven-multi-select\
                            translation="data.localLang"\
                            input-model="data.inputMacTaus"\
                            output-model="data.outputMacTaus"\
                            button-label="name"\
                            item-label="name"\
                            on-clear="updateModelValue()"\
                            on-item-click="updateModelValue()"\
                            on-reset="updateModelValue()"\
                            on-select-all="updateModelValue()"\
                            on-select-none="updateModelValue()"\
                            on-close="updateModelValue()"\
                            tick-property="ticked" max-labels="{{maxLabels}}" search-property="name">\
                        </div>',
            link: function (scope, element, attrs, ngModel) {
                scope.data = {
                    inputMacTaus: [],
                    outputMacTaus: [],
                    localLang: {
                        selectAll: "Chọn tất cả",
                        selectNone: "Bỏ chọn",
                        reset: "Mặc định",
                        search: "Tìm kiếm mác tàu...",
                        nothingSelected: "Vui lòng chọn mác tàu &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"
                    }
                };
                scope.loaded = false;
                scope.allMacTaus = [];
                var loadAllMacTau = function (callback) {
                    if (!scope.loaded) {
                        DanhMucService.GetAllMacTau().then(function (items) {
                            scope.allMacTaus = items;
                            scope.loaded = true;
                            if (callback) {
                                callback();
                            }
                        }, function () {
                            scope.loaded = true;
                            scope.allMacTaus = [];
                            if (callback) {
                                callback();
                            }
                        });
                    } else if (callback) {
                        callback();
                    }
                }

                loadAllMacTau(function () {
                    //console.log('loadAllMacTau', true);
                    applyListMacTau(scope.tinhChat);
                });
                
                ngModel.$render = function () {
                    var model = ngModel.$viewValue;
                    //console.log('model', model);
                    if (model && angular.isString(model)) {
                        ngModel.$setViewValue(model.split(','));
                    } else if (model && angular.isObject(model) && !angular.isArray(model)) {
                        var arr = [];
                        for (var k in model) {
                            if (model[k]) {
                                arr.push(k);
                            }
                        }
                        ngModel.$setViewValue(arr);
                    } else if (!model || !angular.isArray(model)) {
                        ngModel.$setViewValue([]);
                    }
                    //console.log('selectedMacTaus', ngModel.$viewValue);
                };

                // Select mac tau
                var applyListMacTau = function (loaiTau) {
                    //console.log('tinhChat1', angular.isNumber(loaiTau));
                    var tinhChat = -1;
                    if (angular.isNumber(loaiTau)) {
                        tinhChat = loaiTau;
                    } else if (angular.isString(loaiTau)) {
                        tinhChat = loaiTau.length > 0 ? parseInt(loaiTau, 0) : tinhChat;
                    }
                    //console.log('tinhChat2', tinhChat);
                    var selectedMacTaus = ngModel.$viewValue && angular.isArray(ngModel.$viewValue) ? ngModel.$viewValue : [];
                    scope.data.inputMacTaus = [];
                    angular.forEach(scope.allMacTaus, function (item) {
                        var valid = true;
                        if (tinhChat != -1) {
                            if (tinhChat != item.TinhChat && (tinhChat != 9 || item.TinhChat == 0)) {
                                valid = false;
                            }
                        }
                        if (valid) {
                            var matau = { name: item.MacTau, maker: item.Maker, icon: '', ticked: selectedMacTaus.indexOf(item.MacTau) != -1}
                            scope.data.inputMacTaus.push(matau);
                        }
                    });
                }
                scope.$watch('tinhChat', function (newVal) {
                    if (scope.loaded) {
                        //console.log('tinhChat-newVal', newVal);
                        applyListMacTau(newVal);
                    }
                }, true);

                // Set model value
                var emptyWhenAll = false;
                if (angular.isDefined(attrs.emptyWhenAll)) {
                    if (angular.isNumber(attrs.emptyWhenAll)) {
                        emptyWhenAll = attrs.emptyWhenAll > 0;
                    } else if (angular.isString(attrs.emptyWhenAll)) {
                        emptyWhenAll = (attrs.emptyWhenAll.toLowerCase() == 'true' || attrs.emptyWhenAll > 0) ? true : false;
                    }
                }
                //console.log('emptyWhenAll', emptyWhenAll);
                scope.updateModelValue = function () {
                    //console.log('updateModelValue1', scope.data.outputMacTaus);
                    var macTaus = getMultiSelectValues(scope.data.outputMacTaus);
                    //console.log('updateModelValue2', macTaus);
                    if (macTaus.length > 0) {
                        if (macTaus.length == scope.allMacTaus.length && emptyWhenAll) {
                            ngModel.$setViewValue([]);
                        } else {
                            ngModel.$setViewValue(macTaus); 
                        }
                    } else {
                        ngModel.$setViewValue([]);
                    }
                }

                // Max display mac tau
                scope.maxLabels = 3;
                if (typeof attrs.maxMacTau !== 'undefined' && attrs.maxMacTau !== '') {
                    scope.maxLabels = attrs.maxMacTau;
                }

                var getMultiSelectValues = function (values) {
                    var items = [];
                    if (values && values.length > 0) {
                        angular.forEach(values, function (val, key) {
                            items.push(val.name);
                        });
                    }
                    return items;
                };
            }
        };
    }]);
})();
(function () {
    'use strict';
    var app = angular.module('app.danhmuc');
    app.controller('ModalTreeDonViController', ['$scope', '$timeout', '$uibModalInstance', 'DanhMucService', 'configs', function ($scope, $timeout, $uibModalInstance, DanhMucService, configs) {

        $scope.donVis = [];
        var input = {
            MaDV: configs.root,
            CapQL: configs.capQL > 0 ? configs.capQL : undefined
        }
        console.log('scope.treeDataLevel', configs.capQL);
        DanhMucService.GetTreeDonVi(input).then(function (res) {
            $scope.donVis = res;
            $scope.loaded = true;
        }, function () {
            $scope.donVis = [];
            $scope.loaded = true;
        });
        $scope.expandLevel = configs.expandLevel > 0 ? configs.expandLevel : 1;
        $scope.currentDV = configs.selected ? configs.selected : {};
        $scope.donViTree = {};
        $scope.clickTree = function (donVi) {
            $scope.currentDV = donVi;
        };

        $scope.select = function (donVi) {
            $uibModalInstance.close(donVi);
        }

        $scope.cancel = function () {
            $uibModalInstance.dismiss();
        };
        
    }]);
})();

(function () {
    'use strict';
    var app = angular.module('app.danhmuc');
    app.directive('treeDonVi', ['$rootScope', '$uibModal', 'DanhMucService', function ($rootScope, $uibModal, DanhMucService) {
        return {
            restrict: 'A',
            scope: 
            {   
                //// settings based on attribute
                isOpen: '=',
                treeDataLevel: '=',
                treeExpandLevel: '=',
                //isOwner: '=',

                //// callbacks
                //onClear         : '&',  
                //onClose         : '&',
            },
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                var listDonVi = {};
                var loadDonVi = function (maDV, callback) {
                    if (!listDonVi[maDV]) {
                        listDonVi[maDV] = {
                            loaded: 0
                        };
                    }
                    if (listDonVi[maDV].loaded == 0) {
                        DanhMucService.GetOneDonVi(maDV).then(function (res) {
                            listDonVi[maDV].loaded = 2;
                            listDonVi[maDV].Data = res.Data;
                            if (callback) {
                                callback(res.Data);
                            }
                        }, function () {
                            listDonVi[maDV].loaded = 3;
                        });
                        listDonVi[maDV].loaded = 1;
                    }
                }
                
                ngModel.$render = function () {
                    var maDV = ngModel.$viewValue;
                    if (maDV) {
                        loadDonVi(maDV, function (data) {
                            attrs.$set('value', data.TenDV);
                        });
                    }
                };
                scope.open = function () {
                    scope.isOpen = true;
                }
                scope.$watch('isOpen', function (newVal) {
                    if (newVal) {
                        var modalInstance = $uibModal.open({
                            templateUrl: 'app/views/modals/tree-don-vi.html',
                            controller: 'ModalTreeDonViController',
                            size: 'lg',
                            resolve: {
                                configs: function() {
                                    var user = $rootScope.$user ? $rootScope.$user : {};
                                    return {
                                        root: attrs['treeDonVi'] ? attrs['treeDonVi'] : user.maDV,
                                        selected: {
                                            code: ngModel.$viewValue,
                                            label: attrs['value']
                                        },
                                        expandLevel: scope.treeExpandLevel ? parseInt(scope.treeExpandLevel, 10) : undefined,
                                        capQL: scope.treeDataLevel ? parseInt(scope.treeDataLevel, 10) : undefined,
                                    }
                                }
                            }
                        });
                        modalInstance.result.then(function (donVi) {
                            //console.log('donVi', donVi);
                            if (donVi) {
                                ngModel.$setViewValue(donVi.code);
                                if (donVi.type == 5) {
                                    attrs.$set('value', 'Điểm (Ga): ' + donVi.label);
                                }
                                else
                                {
                                    attrs.$set('value', donVi.label);
                                }
                            }
                        });
                        scope.isOpen = false;
                    }
                }, true);
            }
        };
    }]);
})();
/**=========================================================
 * Module: navbar-search.js
 * Navbar search toggler * Auto dismiss on ESC key
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.navsearch')
        .directive('searchOpen', searchOpen)
        .directive('searchDismiss', searchDismiss);

    //
    // directives definition
    // 
    
    function searchOpen () {
        var directive = {
            controller: searchOpenController,
            restrict: 'A'
        };
        return directive;

    }

    function searchDismiss () {
        var directive = {
            controller: searchDismissController,
            restrict: 'A'
        };
        return directive;
        
    }

    //
    // Contrller definition
    // 
    
    searchOpenController.$inject = ['$scope', '$element', 'NavSearch'];
    function searchOpenController ($scope, $element, NavSearch) {
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', NavSearch.toggle);
    }

    searchDismissController.$inject = ['$scope', '$element', 'NavSearch'];
    function searchDismissController ($scope, $element, NavSearch) {
      
      var inputSelector = '.navbar-form input[type="text"]';

      $(inputSelector)
        .on('click', function (e) { e.stopPropagation(); })
        .on('keyup', function(e) {
          if (e.keyCode === 27) // ESC
            NavSearch.dismiss();
        });
        
      // click anywhere closes the search
      $(document).on('click', NavSearch.dismiss);
      // dismissable options
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', NavSearch.dismiss);
    }

})();


/**=========================================================
 * Module: nav-search.js
 * Services to share navbar search functions
 =========================================================*/
 
(function() {
    'use strict';

    angular
        .module('app.navsearch')
        .service('NavSearch', NavSearch);

    function NavSearch() {
        this.toggle = toggle;
        this.dismiss = dismiss;

        ////////////////

        var navbarFormSelector = 'form.navbar-form';

        function toggle() {
          var navbarForm = $(navbarFormSelector);

          navbarForm.toggleClass('open');
          
          var isOpen = navbarForm.hasClass('open');
          
          navbarForm.find('input')[isOpen ? 'focus' : 'blur']();
        }

        function dismiss() {
          $(navbarFormSelector)
            .removeClass('open') // Close control
            .find('input[type="text"]').blur() // remove focus
            .val('') // Empty input
            ;
        }        
    }
})();

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
(function() {
    'use strict';

    var app = angular.module('app.dashboard');
    app.service('DashboardService', ['$server', 'ENV', function ($server, ENV) {
        var serviceFactory = {};
        var rs = $server('', {}, {
            GetUserDashboards: { method: 'GET', url: ENV.urlApiRatBaoCao + 'api/Dashboard/GetUserDashboards' },
            GetUserDashboard: { method: 'GET', url: ENV.urlApiRatBaoCao + 'api/Dashboard/GetUserDashboard' },
            UpdateUserDashboard: { method: 'POST', url: ENV.urlApiRatBaoCao + 'api/Dashboard/UpdateUserDashboard' },
            GetDSNgayDiChuaCoGia: { method: 'POST', url: ENV.urlApiRatBaoCao + 'api/Dashboard/GetDSNgayDiChuaCoGia' },
            GetDSNgayDiChuaCoGiaDetails: { method: 'POST', url: ENV.urlApiRatBaoCao + 'api/Dashboard/GetDSNgayDiChuaCoGiaDetails' },
            GetDSNgayDiSaiGia: { method: 'POST', url: ENV.urlApiRatBaoCao + 'api/Dashboard/GetDSNgayDiSaiGia' },
            GetDSNgayDiSaiGiaDetails: { method: 'POST', url: ENV.urlApiRatBaoCao + 'api/Dashboard/GetDSNgayDiSaiGiaDetails', isArray: true },
            DashboardDoanhThuDV: { method: 'POST', url: ENV.urlApiRatBaoCao + 'api/Dashboard/DashboardDoanhThuDV' },
        });
        serviceFactory.GetUserDashboards = function () {
            return rs.GetUserDashboards();
        }
        serviceFactory.GetUserDashboard = function (key) {
            return rs.GetUserDashboard({ key: key });
        }
        serviceFactory.UpdateUserDashboard = function (key, value) {
            return rs.UpdateUserDashboard({ DashboardKey: key, DashboardData: value });
        }
        serviceFactory.GetDSNgayDiChuaCoGia = function (input) {
            return rs.GetDSNgayDiChuaCoGia(input);
        }
        serviceFactory.GetDSNgayDiChuaCoGiaDetails = function (input) {
            return rs.GetDSNgayDiChuaCoGiaDetails(input);
        }
        serviceFactory.GetDSNgayDiSaiGia = function (input) {
            return rs.GetDSNgayDiSaiGia(input);
        }
        serviceFactory.GetDSNgayDiSaiGiaDetails = function (input) {
            return rs.GetDSNgayDiSaiGiaDetails(input);
        }
        serviceFactory.DashboardDoanhThuDV = function (input) {
            return rs.DashboardDoanhThuDV(input);
        }
        return serviceFactory;
    }]);
})();

(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardV2Controller', DashboardV2Controller);

    DashboardV2Controller.$inject = ['$rootScope', '$scope', '$state'];
    function DashboardV2Controller($rootScope, $scope, $state) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          
          // Change layout mode
          if( $state.includes('app-h') ) {
            // Setup layout horizontal for demo
            $rootScope.app.layout.horizontal = true;
            $scope.$on('$destroy', function(){
                $rootScope.app.layout.horizontal = false;
            });            
          }
          else {
            $rootScope.app.layout.isCollapsed = true;
          }

          // BAR STACKED
          // ----------------------------------- 
          vm.barStackedOptions = {
              series: {
                  stack: true,
                  bars: {
                      align: 'center',
                      lineWidth: 0,
                      show: true,
                      barWidth: 0.6,
                      fill: 0.9
                  }
              },
              grid: {
                  borderColor: '#eee',
                  borderWidth: 1,
                  hoverable: true,
                  backgroundColor: '#fcfcfc'
              },
              tooltip: true,
              tooltipOpts: {
                  content: function (label, x, y) { return x + ' : ' + y; }
              },
              xaxis: {
                  tickColor: '#fcfcfc',
                  mode: 'categories'
              },
              yaxis: {
                  min: 0,
                  max: 200, // optional: use it for a clear represetation
                  position: ($rootScope.app.layout.isRTL ? 'right' : 'left'),
                  tickColor: '#eee'
              },
              shadowSize: 0
          };

          // SPLINE
          // ----------------------------------- 

          vm.splineOptions = {
              series: {
                  lines: {
                      show: false
                  },
                  points: {
                      show: true,
                      radius: 4
                  },
                  splines: {
                      show: true,
                      tension: 0.4,
                      lineWidth: 1,
                      fill: 0.5
                  }
              },
              grid: {
                  borderColor: '#eee',
                  borderWidth: 1,
                  hoverable: true,
                  backgroundColor: '#fcfcfc'
              },
              tooltip: true,
              tooltipOpts: {
                  content: function (label, x, y) { return x + ' : ' + y; }
              },
              xaxis: {
                  tickColor: '#fcfcfc',
                  mode: 'categories'
              },
              yaxis: {
                  min: 0,
                  max: 150, // optional: use it for a clear represetation
                  tickColor: '#eee',
                  position: ($rootScope.app.layout.isRTL ? 'right' : 'left'),
                  tickFormatter: function (v) {
                      return v/* + ' visitors'*/;
                  }
              },
              shadowSize: 0
          };
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardV3Controller', DashboardV3Controller);

    DashboardV3Controller.$inject = ['$rootScope'];
    function DashboardV3Controller($rootScope) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          // SPLINE
          // ----------------------------------- 

          vm.splineOptions = {
              series: {
                  lines: {
                      show: false
                  },
                  points: {
                      show: true,
                      radius: 4
                  },
                  splines: {
                      show: true,
                      tension: 0.4,
                      lineWidth: 1,
                      fill: 0.5
                  }
              },
              grid: {
                  borderColor: '#eee',
                  borderWidth: 1,
                  hoverable: true,
                  backgroundColor: '#fcfcfc'
              },
              tooltip: true,
              tooltipOpts: {
                  content: function (label, x, y) { return x + ' : ' + y; }
              },
              xaxis: {
                  tickColor: '#fcfcfc',
                  mode: 'categories'
              },
              yaxis: {
                  min: 0,
                  max: 150, // optional: use it for a clear represetation
                  tickColor: '#eee',
                  position: ($rootScope.app.layout.isRTL ? 'right' : 'left'),
                  tickFormatter: function (v) {
                      return v/* + ' visitors'*/;
                  }
              },
              shadowSize: 0
          };


          vm.seriesData = {
            'CA': 11100,   // Canada
            'DE': 2510,    // Germany
            'FR': 3710,    // France
            'AU': 5710,    // Australia
            'GB': 8310,    // Great Britain
            'RU': 9310,    // Russia
            'BR': 6610,    // Brazil
            'IN': 7810,    // India
            'CN': 4310,    // China
            'US': 839,     // USA
            'SA': 410      // Saudi Arabia
          };
          
          vm.markersData = [
            { latLng:[41.90, 12.45],  name:'Vatican City'          },
            { latLng:[43.73, 7.41],   name:'Monaco'                },
            { latLng:[-0.52, 166.93], name:'Nauru'                 },
            { latLng:[-8.51, 179.21], name:'Tuvalu'                },
            { latLng:[7.11,171.06],   name:'Marshall Islands'      },
            { latLng:[17.3,-62.73],   name:'Saint Kitts and Nevis' },
            { latLng:[3.2,73.22],     name:'Maldives'              },
            { latLng:[35.88,14.5],    name:'Malta'                 },
            { latLng:[41.0,-71.06],   name:'New England'           },
            { latLng:[12.05,-61.75],  name:'Grenada'               },
            { latLng:[13.16,-59.55],  name:'Barbados'              },
            { latLng:[17.11,-61.85],  name:'Antigua and Barbuda'   },
            { latLng:[-4.61,55.45],   name:'Seychelles'            },
            { latLng:[7.35,134.46],   name:'Palau'                 },
            { latLng:[42.5,1.51],     name:'Andorra'               }
          ];
        }
    }
})();
(function() {
    'use strict';

    var app = angular.module('app.dashboard');
    app.controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$q', '$state', '$timeout', 'authService', 'UserService', 'DashboardService', 'DanhMucService'];
    function HomeController($scope, $q, $state, $timeout, authService, UserService, DashboardService, DanhMucService) {
        // If did not login, goto welcome page
        //if (!authService.authentication.isAuth) {
        //    $state.go('page.welcome');d
        //    return;
        //}

        
    }
})();
(function() {
    'use strict';

    var app = angular.module('app.dashboard');
    app.controller('NgayDiChuaCoGiaController', NgayDiChuaCoGiaController);

    NgayDiChuaCoGiaController.$inject = ['$scope', '$q', '$state', '$timeout', '$uibModal', 'authService', 'UserService', 'DashboardService', 'DanhMucService'];
    function NgayDiChuaCoGiaController($scope, $q, $state, $timeout, $uibModal, authService, UserService, DashboardService, DanhMucService) {
        if (authService.authentication.isAuth && authService.authentication.roles.indexOf('550') != -1) {
            var pagekey = 'NgayDiChuaCoGia';
            var filter = {
                Months: 2
            };
            $scope.input = angular.extend({}, filter);
            $scope.ListNgayDi = {};
            $scope.AllMacTau = [];
            $scope.ListMacTau = [];
            $scope.ListMonth = [
                { Value: 0, Name: 'Trong tháng này' },
                { Value: 1, Name: 'Trong cả tháng tới' },
                { Value: 2, Name: 'Trong vòng 2 tháng tới' },
                { Value: 3, Name: 'Trong vòng 3 tháng tới' },
                { Value: 4, Name: 'Trong vòng 4 tháng tới' },
                { Value: 5, Name: 'Trong vòng 5 tháng tới' },
                { Value: 6, Name: 'Trong vòng 6 tháng tới' }
            ];
            $scope.ListCongTy = [
                { MaCT: 'KHN', TenCT: 'Khách Hà Nội' },
                { MaCT: 'KSG', TenCT: 'Khách Sài Gòn' }
            ];
            $scope.ListLoaiTau = [
                { Value: 30, Name: 'Tàu thống nhất' },
                { Value: 10, Name: 'Tàu thống nhất (HN)' },
                { Value: 20, Name: 'Tàu thống nhất (SG)' },
                { Value: 3, Name: 'Tàu địa phương' },
                { Value: 1, Name: 'Tàu địa phương (HN)' },
                { Value: 2, Name: 'Tàu địa phương (SG)' }
            ];
            $scope.ListSoLuong = [
                { Value: 10, Name: 'Tối thiểu 10 mục chưa có giá' },
                { Value: 50, Name: 'Tối thiểu 50 mục chưa có giá' },
                { Value: 100, Name: 'Tối thiểu 100 mục chưa có giá' },
                { Value: 150, Name: 'Tối thiểu 150 mục chưa có giá' },
                { Value: 200, Name: 'Tối thiểu 200 mục chưa có giá' },
                { Value: 500, Name: 'Tối thiểu 500 mục chưa có giá' }
            ];

            // Get user dashboard
            $scope.isLoading = true;
            $scope.isSearched = false;
            $scope.data = [];
            DashboardService.GetUserDashboard(pagekey).then(function (res) {
                if (res.Data) {
                    $scope.input = res.Data;
                }

                firstLoad();
            }, function () {
                firstLoad();
                console.log("Can not load UserDashboard by key " + pagekey);
            });

            var firstLoad = function () {
                DanhMucService.GetAllMacTau().then(function (items) {
                    $scope.AllMacTau = items;
                    initAllMacTau($scope.input.MacTau);
                    $scope.isLoading = false;
                }, function () {
                    $scope.isLoading = false;
                    console.log("Can not load danh muc mac tau");
                });

                //$scope.isLoading = true;
                //loadData();
            }

            var initAllMacTau = function (selectedMacTaus) {
                var allMacTau = getListMacTau();
                $scope.ListMacTau = [];
                for (var i = 0; i < allMacTau.length; i++) {
                    var tau = allMacTau[i];
                    var isTicked = false;
                    if (selectedMacTaus && selectedMacTaus.indexOf && selectedMacTaus.indexOf(tau.MacTau) != -1) {
                        isTicked = true;
                    }
                    $scope.ListMacTau.push({ value: tau.MacTau, icon: "", name: tau.MacTau, maker: "", ticked: isTicked });
                }
            }

            var getListMacTau = function () {
                var listMacTau = [];
                for (var i = 0; i < $scope.AllMacTau.length; i++) {
                    var macTau = $scope.AllMacTau[i];

                    var isOk = true;
                    if ($scope.input.LoaiTau == 30 && macTau.TinhChat != 0) {
                        isOk = false;
                    } else if ($scope.input.LoaiTau == 10 && (macTau.TinhChat != 0 || macTau.TrungTam != 'THN')) {
                        isOk = false;
                    } else if ($scope.input.LoaiTau == 20 && (macTau.TinhChat != 0 || macTau.TrungTam != 'TSG')) {
                        isOk = false;
                    } else if ($scope.input.LoaiTau == 3 && macTau.TinhChat == 0) {
                        isOk = false;
                    } else if ($scope.input.LoaiTau == 1 && (macTau.TinhChat == 0 || macTau.TrungTam != 'THN')) {
                        isOk = false;
                    } else if ($scope.input.LoaiTau == 2 && (macTau.TinhChat == 0 || macTau.TrungTam != 'TSG')) {
                        isOk = false;
                    }
                    if (isOk) {
                        listMacTau.push(macTau);
                    }
                }
                return listMacTau;
            }

            var loadData = function (callback) {
                var input = angular.extend({}, $scope.input);
                input.SoLuong = input.SoLuong > 0 ? input.SoLuong : 0;
                DashboardService.GetDSNgayDiChuaCoGia(input).then(function (res) {
                    $scope.data = res.Data;
                    $scope.isSearched = true;
                    $scope.isLoading = false;
                    if (callback) {
                        callback();
                    }
                }, function () {
                    $scope.isSearched = true;
                    $scope.isLoading = false;
                    if (callback) {
                        callback();
                    }
                });
                $scope.isLoading = true;
            }

            $scope.updateListMacTau = function () {
                $scope.input.MacTau = getMultiSelectValues($scope.MacTau, $scope.AllMacTau);
                initAllMacTau($scope.input.MacTau);
            }

            $scope.updateNgayDiLoi = function () {
                //console.log($scope.filter);
                if ($scope.filterForm.$valid) {
                    $scope.input.MacTau = getMultiSelectValues($scope.MacTau, $scope.AllMacTau);
                    var data = angular.extend({}, $scope.input);
                    if (!data.MacTau || data.MacTau.length == 0) {
                        data.MacTau = undefined;
                    }
                    DashboardService.UpdateUserDashboard(pagekey, data).then(function () {
                        loadData();
                    }, function () {
                        $scope.isLoading = false;
                    });
                    $scope.isLoading = true;
                }
            }

            $scope.$on('panel-refresh', function (event, id) {
                loadData(function () {
                    $scope.$broadcast('removeSpinner', id);
                });

                // Instead of timeout you can request a chart data
                //$timeout(function () {

                //    // directive listen for to remove the spinner 
                //    // after we end up to perform own operations
                //    $scope.$broadcast('removeSpinner', id);

                //    console.log('Refreshed #' + id);

                //}, 3000);
            });

            var getMultiSelectValues = function (value, allValues) {
                var items = [];
                if (value && allValues && value.length != allValues.length && value.length > 0) {
                    angular.forEach(value, function (val, key) {
                        items.push(val.value);
                    });
                }
                return items;
            }
        }

        $scope.visibleData = function () {
            return $scope.data.length > 0;
        }

        $scope.localLang = {
            selectAll: "Chọn tất cả",
            selectNone: "Bỏ chọn",
            reset: "Mặc định",
            search: "Tìm kiếm mác tàu...",
            nothingSelected: "Tất cả mác tàu &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"
        };

        // On click detail
        $scope.viewDetails = function (ngayDi, macTau) {
            var modalInstance = $uibModal.open({
                templateUrl: 'ModalNgayDiChuaCoGiaDetailsContent.html',
                controller: 'ModalNgayDiChuaCoGiaDetailsController',
                size: 'md',
                resolve: {
                    input: function () {
                        return { NgayDi: ngayDi, MacTau: macTau }
                    }
                }
            });
        };
    }
})();
(function() {
    'use strict';

    var app = angular.module('app.dashboard');
    app.controller('ModalNgayDiChuaCoGiaDetailsController', ModalNgayDiChuaCoGiaDetailsController);

    ModalNgayDiChuaCoGiaDetailsController.$inject = ['$scope', '$uibModalInstance', 'DashboardService', 'input'];
    function ModalNgayDiChuaCoGiaDetailsController($scope, $uibModalInstance, DashboardService, input) {

        $scope.input = input;
        $scope.isLoaded = false;
        $scope.items = [];
        DashboardService.GetDSNgayDiChuaCoGiaDetails(input).then(function (res) {
            $scope.items = res.Data;
            $scope.isLoaded = true;
        });

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
(function() {
    'use strict';

    var app = angular.module('app.dashboard');
    app.controller('NgayDiSaiGiaController', NgayDiChuaCoGiaController);

    NgayDiChuaCoGiaController.$inject = ['$scope', '$q', '$state', '$timeout', '$uibModal', 'authService', 'UserService', 'DashboardService', 'DanhMucService'];
    function NgayDiChuaCoGiaController($scope, $q, $state, $timeout, $uibModal, authService, UserService, DashboardService, DanhMucService) {
        if (authService.authentication.isAuth && authService.authentication.roles.indexOf('550') != -1) {
            var pagekey = 'NgayDiSaiGia';
            var filter = {
                Months: 2
            };
            $scope.input = angular.extend({}, filter);
            $scope.ListNgayDi = {};
            $scope.AllMacTau = [];
            $scope.ListMacTau = [];
            $scope.ListMonth = [
                { Value: 0, Name: 'Trong tháng này' },
                { Value: 1, Name: 'Trong tháng tới' },
                { Value: 2, Name: 'Trong 2 tháng tới' },
                { Value: 3, Name: 'Trong 3 tháng tới' },
                { Value: 4, Name: 'Trong 4 tháng tới' },
                { Value: 5, Name: 'Trong 5 tháng tới' },
                { Value: 6, Name: 'Trong 6 tháng tới' }
            ];
            $scope.ListCongTy = [
                { MaCT: 'KHN', TenCT: 'Khách Hà Nội' },
                { MaCT: 'KSG', TenCT: 'Khách Sài Gòn' }
            ];
            $scope.ListLoaiTau = [
                { Value: 0, Name: 'Tàu thống nhất' },
                { Value: 1, Name: 'Tàu địa phương' }
            ];

            // Get user dashboard
            $scope.isSearched = false;
            $scope.isLoading = true;
            DashboardService.GetUserDashboard(pagekey).then(function (res) {
                if (res.Data) {
                    $scope.input = res.Data;
                }

                firstLoad();
            }, function () {
                firstLoad();
                console.log("Can not load UserDashboard by key " + pagekey);
            });

            var firstLoad = function () {
                DanhMucService.GetAllMacTau().then(function (items) {
                    $scope.AllMacTau = items;
                    initAllMacTau($scope.input.MacTau);
                    $scope.isLoading = false;
                }, function () {
                    $scope.isLoading = false;
                    console.log("Can not load danh muc mac tau");
                });

                //$scope.isLoading = true;
                //loadData();
            }

            var initAllMacTau = function (selectedMacTaus) {
                var allMacTau = getListMacTau();
                $scope.ListMacTau = [];
                for (var i = 0; i < allMacTau.length; i++) {
                    var tau = allMacTau[i];
                    var isTicked = false;
                    if (!angular.isUndefined(selectedMacTaus)) {
                        if (!selectedMacTaus || selectedMacTaus.length == 0 || (selectedMacTaus && selectedMacTaus.indexOf(tau.MacTau) != -1)) {
                            isTicked = true;
                        }
                    }
                    $scope.ListMacTau.push({ value: tau.MacTau, icon: "", name: tau.MacTau, maker: "", ticked: isTicked });
                }
            }

            var getListMacTau = function () {
                var listMacTau = [];
                for (var i = 0; i < $scope.AllMacTau.length; i++) {
                    var macTau = $scope.AllMacTau[i];

                    var isOk = true;
                    if (isOk && $scope.input.MaCT && $scope.input.MaCT.substr(1) != macTau.TrungTam.substr(1)) {
                        isOk = false
                    }
                    if (isOk && ($scope.input.LoaiTau === 0 || $scope.input.LoaiTau === 1)) {
                        var loaiTau = macTau.TinhChat > 0 ? 1 : 0;
                        isOk = $scope.input.LoaiTau == loaiTau;
                    }
                    if (isOk) {
                        listMacTau.push(macTau);
                    }
                }
                return listMacTau;
            }

            var loadData = function (callback) {
                var input = angular.extend({}, $scope.input);
                DashboardService.GetDSNgayDiSaiGia(input).then(function (res) {
                    $scope.ListNgayDi = res.ListNgayDi;
                    $scope.isSearched = true;
                    $scope.isLoading = false;
                    if (callback) {
                        callback();
                    }
                }, function () {
                    $scope.isSearched = true;
                    $scope.isLoading = false;
                    if (callback) {
                        callback();
                    }
                });
                $scope.isLoading = true;
            }

            $scope.updateListMacTau = function () {
                initAllMacTau($scope.input.MacTau);
            }

            $scope.updateNgayDiLoi = function () {
                //console.log($scope.filter);
                if ($scope.filterForm.$valid) {
                    $scope.input.MacTau = getMultiSelectValues($scope.MacTau, $scope.AllMacTau);
                    var data = angular.extend({}, $scope.input);
                    if (!data.MacTau || data.MacTau.length == 0) {
                        data.MacTau = undefined;
                    }
                    DashboardService.UpdateUserDashboard(pagekey, data).then(function () {
                        loadData();
                    }, function () {
                        $scope.isLoading = false;
                    });
                    $scope.isLoading = true;
                }
            }

            $scope.$on('panel-refresh', function (event, id) {
                loadData(function () {
                    $scope.$broadcast('removeSpinner', id);
                });

                // Instead of timeout you can request a chart data
                //$timeout(function () {

                //    // directive listen for to remove the spinner 
                //    // after we end up to perform own operations
                //    $scope.$broadcast('removeSpinner', id);

                //    console.log('Refreshed #' + id);

                //}, 3000);
            });

            $scope.viewNgayDiSaiGiaDetails = function (ngayDi, macTau) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'ModalNgayDiSaiGiaDetailsContent.html',
                    controller: 'NgayDiSaiGiaDetailsController',
                    size: 'lg',
                    resolve: {
                        input: function () { return { NgayDi: ngayDi, MacTau: macTau }; }
                    }
                });
            }

            var getMultiSelectValues = function (value, allValues) {
                var items = [];
                if (value && allValues && value.length != allValues.length && value.length > 0) {
                    angular.forEach(value, function (val, key) {
                        items.push(val.value);
                    });
                }
                return items;
            }
        }

        $scope.visibleData = function () {
            return Object.keys($scope.ListNgayDi).length > 0;
        }

        $scope.localLang = {
            selectAll: "Chọn tất cả",
            selectNone: "Bỏ chọn",
            reset: "Mặc định",
            search: "Tìm kiếm mác tàu...",
            nothingSelected: "Tất cả mác tàu &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"
        };
    }
})();
(function() {
    'use strict';

    var app = angular.module('app.dashboard');
    app.controller('NgayDiSaiGiaDetailsController', NgayDiSaiGiaDetailsController);

    NgayDiSaiGiaDetailsController.$inject = ['$scope', '$uibModalInstance', 'DashboardService', 'input'];
    function NgayDiSaiGiaDetailsController($scope, $uibModalInstance, DashboardService, input) {

        $scope.input = input;
        $scope.isLoaded = false;
        $scope.items = [];
        DashboardService.GetDSNgayDiSaiGiaDetails(input).then(function (items) {
            $scope.items = items;
            $scope.isLoaded = true;
        });

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.pages')
        .controller('LoginFormController', LoginFormController);

    LoginFormController.$inject = ['$http', '$state'];
    function LoginFormController($http, $state) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          // bind here all data from the form
          vm.account = {};
          // place the message if something goes wrong
          vm.authMsg = '';

          vm.login = function() {
            vm.authMsg = '';

            if(vm.loginForm.$valid) {

              $http
                .post('api/account/login', {email: vm.account.email, password: vm.account.password})
                .then(function(response) {
                  // assumes if ok, response is an object with some data, if not, a string with error
                  // customize according to your api
                  if ( !response.account ) {
                    vm.authMsg = 'Incorrect credentials.';
                  }else{
                    $state.go('app.dashboard');
                  }
                }, function() {
                  vm.authMsg = 'Server Request Error';
                });
            }
            else {
              // set as dirty if the user click directly to login so we show the validation messages
              /*jshint -W106*/
              vm.loginForm.account_email.$dirty = true;
              vm.loginForm.account_password.$dirty = true;
            }
          };
        }
    }
})();

/**=========================================================
 * Module: access-register.js
 * Demo for register account api
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.pages')
        .controller('RegisterFormController', RegisterFormController);

    RegisterFormController.$inject = ['$http', '$state'];
    function RegisterFormController($http, $state) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          // bind here all data from the form
          vm.account = {};
          // place the message if something goes wrong
          vm.authMsg = '';
            
          vm.register = function() {
            vm.authMsg = '';

            if(vm.registerForm.$valid) {

              $http
                .post('api/account/register', {email: vm.account.email, password: vm.account.password})
                .then(function(response) {
                  // assumes if ok, response is an object with some data, if not, a string with error
                  // customize according to your api
                  if ( !response.account ) {
                    vm.authMsg = response;
                  }else{
                    $state.go('app.dashboard');
                  }
                }, function() {
                  vm.authMsg = 'Server Request Error';
                });
            }
            else {
              // set as dirty if the user click directly to login so we show the validation messages
              /*jshint -W106*/
              vm.registerForm.account_email.$dirty = true;
              vm.registerForm.account_password.$dirty = true;
              vm.registerForm.account_agreed.$dirty = true;
              
            }
          };
        }
    }
})();

/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

(function() {
    'use strict';

    var app = angular.module('app.pages');
    app.controller('WelcomeController', ['$scope', '$state', '$location', 'authService', 'ENV', 'xdLocalStorage', 'localDataService', function ($scope, $state, $location, authService, ENV, xdLocalStorage, localDataService) {
        //$state.go('app.dashboard')
        $scope.isAuth = true;
        $state.go('app.dashboard');

        
        //$scope.isAuth = authService.authentication.isAuth;
        //$scope.tai_khoan_role = false;
        //$scope.dieudologin = 'dd_login_';
        /*if ($scope.isAuth) {
            $state.go('app.dashboard');
            /*
            //check dieu do tuyen
            angular.forEach(authService.authentication.roles, function (item) {
                if (item === 'F08') { //co quyen vao man hinh dieu do tuyen
                //if (item === 'F72') {
                    $scope.tai_khoan_role = true;                   
                }
            });
            if ($scope.tai_khoan_role) {                
                $state.go('app.dieudodashboard');
            }
            else {
                //$state.go('app.logout');
                //redirect sang man hinh tram neu khong phai dieu do tuyen
                window.location.href='http://vtds.vn';
                //$state.go('app.dieudodashboard');
            }
           
            return;
           
        }*/

        $scope.login = function () {
            localDataService.set('logon_return_url', encodeURIComponent(window.location.href));
            var returnUrl = window.location.origin + '/#/page/atoken';
            window.location.href = ENV.urlShareTokenSso + '?r=' + encodeURIComponent(returnUrl);

            /*
            var str = new String(Math.random());
            var id = str.substr(str.indexOf(".") + 1);
            localDataService.set($scope.dieudologin, '1');
            xdLocalStorage.setItem('url_' + id, encodeURIComponent(window.location.href), true).then(function () {
                window.location.href = ENV.urlLoginSso + '/' + id;
            });
            */
        };
    }]);
})();

(function () {
    'use strict';
    var app = angular.module('app.reportbc');
    app.controller('BCDH01Controller', ['$scope', '$filter', '$q', '$uibModal', '$rootScope', 'msgService', 'DanhMucService', 'ReportBCService', 'ENV'
      , function ($scope, $filter, $q, $uibModal,$rootScope, msgService, DanhMucService, ReportBCService, ENV) {
    var DateNow = new Date($filter('date')($rootScope.$settings.TimeServer, 'yyyy-MM-dd'));
    $scope.input = {
      Ngay_BatDau: new Date(DateNow.getFullYear(), DateNow.getMonth(), 1, 0, 0, 0),
      Ngay_KetThuc: new Date(DateNow),
    };
      
        $q.all([DanhMucService.GetAllNCC()]).then(function (res) {
          $scope.listNCC = res[0];        
        });
        $scope.setButton = function (button) {
            if ($scope.reportForm.$valid) {
                $scope.button = button;
            }
        }

        $scope.report = { };
        $scope.renderReport = function () {
            if ($scope.reportForm.$valid && !$scope.loading) {
                var input = {
                    Ngay_BatDau: $filter('date')($scope.input.Ngay_BatDau, 'yyyy-MM-dd'),
                    Ngay_KetThuc: $filter('date')($scope.input.Ngay_KetThuc, 'yyyy-MM-dd'),
                    MaNCC: $scope.input.NCCItem ? $scope.input.NCCItem.MaKH : null,                  
                }

                if ($scope.button == 'report') {
                  ReportBCService.Invoke('BCDH01', input).then(function (res) {
                        $scope.report = res;
                        $scope.loading = false;
                        $scope.submited = true;
                    }, function () {
                        $scope.loading = false;
                        $scope.submited = true;
                        $scope.report = { Data: [] };
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                } else {
                  ReportBCService.InvokeBlob('BCDH01Excel', input).then(function (res) {
                        if (res) {
                            saveAs(res.Blob, res.Filename);
                        }
                        $scope.loading = false;
                        msgService.showSuccess('Đã xuất excel thành công.');
                    }, function () {
                        $scope.loading = false;
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                }
                $scope.loading = true;
            }
        };
        $scope.ShowDetail = function (item, KieuYCVC, count) {
          if (!count || count <= 0) {
            return;
          }
          var input = {
            Ngay_BatDau: $scope.report.Input ? $scope.report.Input.Ngay_BatDau : null,
            Ngay_KetThuc: $scope.report.Input ? $scope.report.Input.Ngay_KetThuc : null,
            MaNCC: $scope.report.Input ? $scope.report.Input.MaNCC : null,
            Loai: item.Loai,
            KieuYCVC:KieuYCVC,
          };
         
            var modalInstance = $uibModal.open({
              templateUrl: '/app/views/BC/BCDH01Detail.html',
              controller: 'BCDH01DetailController',
              size: 'lg',
              backdrop: 'static',
              resolve: {
                input: function () { return input; },
              }
            });
            modalInstance.result.then(function (confirm) {
              if (confirm) {

              }
            }, function (confirm) {
              if (confirm) {
               
              }
            });
          };
         
        

        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };

      
  }]);
  app.controller('BCDH01DetailController', ['$scope', '$filter', '$q','$uibModalInstance', 'msgService', 'DanhMucService', 'ReportBCService', 'ENV', 'input'
    , function ($scope, $filter, $q,$uibModalInstance, msgService, DanhMucService, ReportBCService, ENV,input) {
      $scope.Title = 'Danh sách chi tiết '+ (input.KieuYCVC ==1?'vận dụng':'điều rỗng')+' container.';
      var InitData = function () {       
        ReportBCService.Invoke('BCDH01Detail', input).then(function (res) {
          $scope.BCDH01Detail = res;
        })
        
      }
      InitData();
      $scope.Dong = function () {
        $uibModalInstance.dismiss();
      };

  }]);
})();

(function () {
    'use strict';
    var app = angular.module('app.reportbc');
    app.controller('BCDH02Controller', ['$scope', '$filter', '$q', '$uibModal', '$rootScope', 'msgService', 'DanhMucService', 'ReportBCService', 'ENV'
      , function ($scope, $filter, $q, $uibModal,$rootScope, msgService, DanhMucService, ReportBCService, ENV) {

    var DateNow = new Date($filter('date')($rootScope.$settings.TimeServer, 'yyyy-MM-dd'));
    $scope.input = {
      Ngay_BatDau: new Date(DateNow.getFullYear(), DateNow.getMonth(), 1, 0, 0, 0),
      Ngay_KetThuc: new Date(DateNow),
    };
        $q.all([DanhMucService.GetAllZone(), DanhMucService.GetAllKhachHang()]).then(function (res) {
          $scope.listGa = $filter('filter')(res[0], { LoaiZone: 1 }, true);
          $scope.listKhachHang = res[1];

        });
        $scope.setButton = function (button) {
            if ($scope.reportForm.$valid) {
                $scope.button = button;
            }
        }

        $scope.report = { };
        $scope.renderReport = function () {
            if ($scope.reportForm.$valid && !$scope.loading) {
                var input = {
                    Ngay_BatDau: $filter('date')($scope.input.Ngay_BatDau, 'yyyy-MM-dd'),
                    Ngay_KetThuc: $filter('date')($scope.input.Ngay_KetThuc, 'yyyy-MM-dd'),
                    MaKH: $scope.input.KhachHangItem ? $scope.input.KhachHangItem.MaKH : null,
                    GaID: $scope.input.GaItem ? $scope.input.GaItem.GaID : null,
                }

                if ($scope.button == 'report') {
                  ReportBCService.Invoke('BCDH02', input).then(function (res) {
                        $scope.report = res;
                        $scope.loading = false;
                        $scope.submited = true;
                    }, function () {
                        $scope.loading = false;
                        $scope.submited = true;
                        $scope.report = { Data: [] };
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                } else {
                  ReportBCService.InvokeBlob('BCDH02Excel', input).then(function (res) {
                        if (res) {
                            saveAs(res.Blob, res.Filename);
                        }
                        $scope.loading = false;
                        msgService.showSuccess('Đã xuất excel thành công.');
                    }, function () {
                        $scope.loading = false;
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                }
                $scope.loading = true;
            }
        };
        $scope.ShowDetail = function (item, loai) {
          var input = {
            GaID: item.GaID,
            TenGa: item.TenGa,
            LoaiCONT: item.Loai,
            Loai: loai,
            MaKH: $scope.report.Input ? $scope.report.Input.MaKH : null,
            Ngay_BatDau: $scope.report.Input ? $scope.report.Input.Ngay_BatDau : null,
            Ngay_KetThuc: $scope.report.Input ? $scope.report.Input.Ngay_KetThuc : null,
          }
          console.log('input', input);

          var modalInstance = $uibModal.open({
            templateUrl: '/app/views/BC/BCDH02Detail.html',
            controller: 'BCDH02DetailController',
            windowClass: 'extent_large',
            backdrop: 'static',
            resolve: {
              input: function () { return input; },
            }
          });
          modalInstance.result.then(function (confirm) {
            if (confirm) {

            }
          }, function (confirm) {
            if (confirm) {

            }
          });
        };

        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };

      
      }]);
    app.controller('BCDH02DetailController', ['$scope', '$filter', '$q', '$uibModalInstance', 'msgService', 'DanhMucService', 'ReportBCService', 'ENV', 'input'
  , function ($scope, $filter, $q, $uibModalInstance, msgService, DanhMucService, ReportBCService, ENV, input) {
    $scope.Title = 'Danh sách chi tiết tình hình đọng ' + (input.Loai == 1 ? 'xếp':'dỡ') + ' với loại Cont ' + input.LoaiCONT + ' tại ga ' + input.TenGa;
    var InitData = function () {
      ReportBCService.Invoke('BCDH02Detail', input).then(function (res) {
        $scope.BCDH02Detail = res;
      })

    }
    InitData();
    $scope.Dong = function () {
      $uibModalInstance.dismiss();
    };

  }]);
})();

(function () {
    'use strict';
    var app = angular.module('app.reportbc');
    app.controller('BCHH01Controller', ['$scope', '$filter', '$q', '$uibModal', '$rootScope', 'msgService', 'DanhMucService', 'ReportBCService', 'ENV'
      , function ($scope, $filter, $q, $uibModal,$rootScope, msgService, DanhMucService, ReportBCService, ENV) {

    var DateNow = new Date($filter('date')($rootScope.$settings.TimeServer, 'yyyy-MM-dd'));
    $scope.input = {
      Ngay_BatDau: new Date(DateNow.getFullYear(), DateNow.getMonth(), 1, 0, 0, 0),
      Ngay_KetThuc: new Date(DateNow),
    };
        $q.all([DanhMucService.GetAllNCC(), DanhMucService.GetAllZone(), DanhMucService.GetAllKhachHang(), DanhMucService.GetAllDonVi()]).then(function (res) {
          $scope.listNCC = res[0];
          $scope.listGa = $filter('filter')(res[1], { LoaiZone: 1 },true);
          $scope.listKhachHang = res[2];
          $scope.listDonVi = res[3];
          var lst = $filter('filter')($scope.listDonVi, { MaDV: 'C99' }, true);
          $scope.input.DonVi = lst[0];
        });
        $scope.setButton = function (button) {
            if ($scope.reportForm.$valid) {
                $scope.button = button;
            }
        }

        $scope.report = { };
        $scope.renderReport = function () {
            if ($scope.reportForm.$valid && !$scope.loading) {
                var input = {
                    Ngay_BatDau: $filter('date')($scope.input.Ngay_BatDau, 'yyyy-MM-dd'),
                    Ngay_KetThuc: $filter('date')($scope.input.Ngay_KetThuc, 'yyyy-MM-dd'),
                    GaID: $scope.input.GaItem ? $scope.input.GaItem.GaID : null,
                    TenGa: $scope.input.GaItem ? $scope.input.GaItem.TenZone : null,
                    MaNCC: $scope.input.NCCItem ? $scope.input.NCCItem.MaKH : null,
                    MaKH: $scope.input.KhachHangItem ? $scope.input.KhachHangItem.MaKH : null,
                    MaDV: $scope.input.DonVi ? $scope.input.DonVi.MaDV : null,
                }

                if ($scope.button == 'report') {
                  ReportBCService.Invoke('BCHH01', input).then(function (res) {
                        $scope.report = res;
                        $scope.loading = false;
                        $scope.submited = true;
                    }, function () {
                        $scope.loading = false;
                        $scope.submited = true;
                        $scope.report = { Data: [] };
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                } else {
                  ReportBCService.InvokeBlob('BCHH01Excel', input).then(function (res) {
                        if (res) {
                            saveAs(res.Blob, res.Filename);
                        }
                        $scope.loading = false;
                        msgService.showSuccess('Đã xuất excel thành công.');
                    }, function () {
                        $scope.loading = false;
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                }
                $scope.loading = true;
            }
        };
        $scope.ShowDetail = function (item, NhomLenh, count) {
          if (!count || count <= 0) {
            return;
          }
          var input = {
            Ngay_BatDau: $scope.report.Input ? $scope.report.Input.Ngay_BatDau : null,
            Ngay_KetThuc: $scope.report.Input ? $scope.report.Input.Ngay_KetThuc : null,
            GaID: $scope.report.Input ? $scope.report.Input.GaID : null,
            TenGa: $scope.report.Input ? $scope.report.Input.TenGa : null,
            MaNCC: $scope.report.Input ? $scope.report.Input.MaNCC : null,
            MaKH: $scope.report.Input ? $scope.report.Input.MaKH : null,
            MaDV: $scope.report.Input ? $scope.report.Input.MaDV : null,
            NgayTacNghiep: item.ThoiGianKT,
            LoaiCONT: item.LoaiCONT,
            NhomLenh: NhomLenh,
          };
         
            var modalInstance = $uibModal.open({
              templateUrl: '/app/views/BC/BCHH01Detail.html',
              controller: 'BCHH01DetailController',
              size: 'lg',
              backdrop: 'static',
              resolve: {
                input: function () { return input; },
              }
            });
            modalInstance.result.then(function (confirm) {
              if (confirm) {

              }
            }, function (confirm) {
              if (confirm) {
               
              }
            });
          };
         
        

        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };

      
  }]);
  app.controller('BCHH01DetailController', ['$scope', '$filter', '$q','$uibModalInstance', 'msgService', 'DanhMucService', 'ReportBCService', 'ENV', 'input'
    , function ($scope, $filter, $q,$uibModalInstance, msgService, DanhMucService, ReportBCService, ENV,input) {
      $scope.Title = 'Danh sách chi tiết tác nghiệp cẩu tại ga ' + input.TenGa;
      var InitData = function () {       
        ReportBCService.Invoke('BCHH01Detail', input).then(function (res) {
          $scope.BCHH01Detail = res;
        })
        
      }
      InitData();
      $scope.Dong = function () {
        $uibModalInstance.dismiss();
      };

  }]);
})();

(function () {
    'use strict';
    var app = angular.module('app.reportbc');
    app.controller('BCHH02Controller', ['$scope', '$filter', '$q', '$uibModal', '$rootScope', 'msgService', 'DanhMucService', 'ReportBCService', 'ENV'
      , function ($scope, $filter, $q, $uibModal,$rootScope, msgService, DanhMucService, ReportBCService, ENV) {

    var DateNow = new Date($filter('date')($rootScope.$settings.TimeServer, 'yyyy-MM-dd'));
    $scope.input = {
      Ngay_BatDau: new Date(DateNow.getFullYear(), DateNow.getMonth(), 1, 0, 0, 0),
      Ngay_KetThuc: new Date(DateNow),
    };
        $q.all([DanhMucService.GetAllDonVi()]).then(function (res) {

          $scope.listDonVi = res[0];
          var lst = $filter('filter')($scope.listDonVi, { MaDV: 'C99' }, true);
          $scope.input.DonVi = lst[0];
        });
        $scope.setButton = function (button) {
            if ($scope.reportForm.$valid) {
                $scope.button = button;
            }
        }

        $scope.report = { };
        $scope.renderReport = function () {
            if ($scope.reportForm.$valid && !$scope.loading) {
                var input = {
                    Ngay_BatDau: $filter('date')($scope.input.Ngay_BatDau, 'yyyy-MM-dd'),
                    Ngay_KetThuc: $filter('date')($scope.input.Ngay_KetThuc, 'yyyy-MM-dd'),
                    MaDV: $scope.input.DonVi ? $scope.input.DonVi.MaDV : null,
                    TenDV: $scope.input.DonVi ? $scope.input.DonVi.TenDV : null,
                }

                if ($scope.button == 'report') {
                  ReportBCService.Invoke('BCHH02', input).then(function (res) {
                        $scope.report = res;
                        $scope.loading = false;
                        $scope.submited = true;
                    }, function () {
                        $scope.loading = false;
                        $scope.submited = true;
                        $scope.report = { Data: [] };
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                } else {
                  ReportBCService.InvokeBlob('BCHH02Excel', input).then(function (res) {
                        if (res) {
                            saveAs(res.Blob, res.Filename);
                        }
                        $scope.loading = false;
                        msgService.showSuccess('Đã xuất excel thành công.');
                    }, function () {
                        $scope.loading = false;
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                }
                $scope.loading = true;
            }
        };
        $scope.ShowDetail = function (item,loai,count) {
          if (!count || count <= 0) {
            return;
          }
          var input = {
            Ngay_BatDau: $scope.report.Input ? $scope.report.Input.Ngay_BatDau : null,
            Ngay_KetThuc: $scope.report.Input ? $scope.report.Input.Ngay_KetThuc : null,
            MaDV: $scope.report.Input ? $scope.report.Input.MaDV : null,
            Loai:loai,
            PhanLoaiXe: item.PhanLoaiXe,
            TenGa: item.TenGa,
            GaID: item.GaID,
          };
         
            var modalInstance = $uibModal.open({
              templateUrl: '/app/views/BC/BCHH02Detail.html',
              controller: 'BCHH02DetailController',
              windowClass: 'extent_large',
              backdrop: 'static',
              resolve: {
                input: function () { return input; },
              }
            });
            modalInstance.result.then(function (confirm) {
              if (confirm) {

              }
            }, function (confirm) {
              if (confirm) {
               
              }
            });
          };
         
        

        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };

      
  }]);
  app.controller('BCHH02DetailController', ['$scope', '$filter', '$q','$uibModalInstance', 'msgService', 'DanhMucService', 'ReportBCService', 'ENV', 'input'
    , function ($scope, $filter, $q,$uibModalInstance, msgService, DanhMucService, ReportBCService, ENV,input) {
      if (input.Loai == 1) {
        $scope.Title = 'Danh sách chi tiết xe xếp tại ga ' + input.TenGa + ' cho phân loại xe ' + input.PhanLoaiXe;
      } else if (input.Loai == 2) {
        $scope.Title = 'Danh sách chi tiết xe dỡ tại ga ' + input.TenGa + ' cho phân loại xe ' + input.PhanLoaiXe;
      }
      var InitData = function () {       
        ReportBCService.Invoke('BCHH02Detail', input).then(function (res) {
          $scope.BCHH02Detail = res;
        })
        
      }
      InitData();
      $scope.Dong = function () {
        $uibModalInstance.dismiss();
      };

  }]);
})();

(function () {
    'use strict';
    var app = angular.module('app.reportbc');
    app.controller('BCHH03Controller', ['$scope', '$filter', '$q', '$uibModal', '$rootScope', 'msgService', 'DanhMucService', 'ReportBCService', 'ENV'
      , function ($scope, $filter, $q, $uibModal,$rootScope, msgService, DanhMucService, ReportBCService, ENV) {

    var DateNow = new Date($filter('date')($rootScope.$settings.TimeServer, 'yyyy-MM-dd'));
    $scope.input = {
      Ngay_BatDau: new Date(DateNow.getFullYear(), DateNow.getMonth(), 1, 0, 0, 0),
      Ngay_KetThuc: new Date(DateNow),
    };
        $q.all([DanhMucService.GetAllDonVi()]).then(function (res) {

          $scope.listDonVi = res[0];
          var lst = $filter('filter')($scope.listDonVi, { MaDV: 'C99' }, true);
          $scope.input.DonVi = lst[0];
        });
        $scope.setButton = function (button) {
            if ($scope.reportForm.$valid) {
                $scope.button = button;
            }
        }

        $scope.report = { };
        $scope.renderReport = function () {
            if ($scope.reportForm.$valid && !$scope.loading) {
                var input = {
                    Ngay_BatDau: $filter('date')($scope.input.Ngay_BatDau, 'yyyy-MM-dd'),
                    Ngay_KetThuc: $filter('date')($scope.input.Ngay_KetThuc, 'yyyy-MM-dd'),
                    MaDV: $scope.input.DonVi ? $scope.input.DonVi.MaDV : null,
                    TenDV: $scope.input.DonVi ? $scope.input.DonVi.TenDV : null,
                }

                if ($scope.button == 'report') {
                  ReportBCService.Invoke('BCHH03', input).then(function (res) {
                        $scope.report = res;
                        $scope.loading = false;
                        $scope.submited = true;
                    }, function () {
                        $scope.loading = false;
                        $scope.submited = true;
                        $scope.report = { Data: [] };
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                } else {
                  ReportBCService.InvokeBlob('BCHH03Excel', input).then(function (res) {
                        if (res) {
                            saveAs(res.Blob, res.Filename);
                        }
                        $scope.loading = false;
                        msgService.showSuccess('Đã xuất excel thành công.');
                    }, function () {
                        $scope.loading = false;
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                }
                $scope.loading = true;
            }
        };
        $scope.ShowDetail = function (item,thang,count) {
          if (!count || count <= 0) {
            return;
          }
          var input = {
            Ngay_BatDau: $scope.report.Input ? $scope.report.Input.Ngay_BatDau : null,
            Ngay_KetThuc: $scope.report.Input ? $scope.report.Input.Ngay_KetThuc : null,
            MaDV: $scope.report.Input ? $scope.report.Input.MaDV : null,          
            PhanLoaiXe: item.PhanLoaiXe,
            TenGa: item.TenGa,
            Loai: item.Loai,
            GaID: item.GaID,
            Thang:thang,
          };
         
            var modalInstance = $uibModal.open({
              templateUrl: '/app/views/BC/BCHH03Detail.html',
              controller: 'BCHH03DetailController',
              size: 'lg',
              backdrop: 'static',
              resolve: {
                input: function () { return input; },
              }
            });
            modalInstance.result.then(function (confirm) {
              if (confirm) {

              }
            }, function (confirm) {
              if (confirm) {
               
              }
            });
          };
         
        

        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };

      
  }]);
  app.controller('BCHH03DetailController', ['$scope', '$filter', '$q','$uibModalInstance', 'msgService', 'DanhMucService', 'ReportBCService', 'ENV', 'input'
    , function ($scope, $filter, $q,$uibModalInstance, msgService, DanhMucService, ReportBCService, ENV,input) {
      if (input.Loai == 1) {
        $scope.Title = 'Danh sách chi tiết xe xếp tại ga ' + input.TenGa + ' tháng ' + input.Thang + ' cho phân loại xe ' + input.PhanLoaiXe;
      } else if (input.Loai == 2) {
        $scope.Title = 'Danh sách chi tiết xe dỡ tại ga ' + input.TenGa + ' tháng ' + input.Thang + ' cho phân loại xe ' + input.PhanLoaiXe;
      }
      var InitData = function () {       
        ReportBCService.Invoke('BCHH03Detail', input).then(function (res) {
          $scope.BCHH03Detail = res;
        })
        
      }
      InitData();
      $scope.Dong = function () {
        $uibModalInstance.dismiss();
      };

  }]);
})();

(function () {
    'use strict';
    var app = angular.module('app.reportbc');
  app.controller('BCLV01Controller', ['$scope', '$filter','$q','$uibModal','$rootScope', 'msgService', 'DanhMucService', 'ReportBCService', 'ENV', function ($scope, $filter,$q,$uibModal,$rootScope, msgService, DanhMucService, ReportBCService, ENV) {
    var Now = new Date($rootScope.$settings.TimeServer);
        $scope.input = {Nam:Now.getFullYear()+'', Thang:(Now.getMonth()+1)+'' };

        $scope.setButton = function (button) {
            if ($scope.reportForm.$valid) {
                $scope.button = button;
            }
        }

        $scope.report = { };
        $scope.renderReport = function () {
            if ($scope.reportForm.$valid && !$scope.loading) {
                var input = {
                  Thang: $scope.input.Thang ? $scope.input.Thang : null,
                  Nam: $scope.input.Nam ? $scope.input.Nam : null,
                }

                if ($scope.button == 'report') {
                  ReportBCService.Invoke('BCLV01', input).then(function (res) {
                        $scope.report = res;
                        $scope.loading = false;
                        $scope.submited = true;
                    }, function () {
                        $scope.loading = false;
                        $scope.submited = true;
                        $scope.report = { Data: [] };
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                } else {
                  ReportBCService.InvokeBlob('BCLV01Excel', input).then(function (res) {
                        if (res) {
                            saveAs(res.Blob, res.Filename);
                        }
                        $scope.loading = false;
                        msgService.showSuccess('Đã xuất excel thành công.');
                    }, function () {
                        $scope.loading = false;
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                }
                $scope.loading = true;
            }
        };
        $scope.ShowDetail = function (item) {
          console.log('item', item);
          var input = {
            Thang: $scope.report.Input ? $scope.report.Input.Thang : null,
            Nam: $scope.report.Input ? $scope.report.Input.Nam : null,
            MaTuyen: item.MaTuyen,
            TenTuyen: item.TenTuyen,
            PhanLoaiXe: item.PhanLoaiXe,
          };

          var modalInstance = $uibModal.open({
            templateUrl: '/app/views/BC/BCLV01Detail.html',
            controller: 'BCLV01DetailController',
            size: 'lg',
            backdrop: 'static',
            resolve: {
              input: function () { return input; },
            }
          });
          modalInstance.result.then(function (confirm) {
            if (confirm) {

            }
          }, function (confirm) {
            if (confirm) {

            }
          });
        };

        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };

      
  }]);
  app.controller('BCLV01DetailController', ['$scope', '$filter', '$q', '$uibModalInstance', 'msgService', 'DanhMucService', 'ReportBCService', 'ENV', 'input'
    , function ($scope, $filter, $q, $uibModalInstance, msgService, DanhMucService, ReportBCService, ENV, input) {
      $scope.Title = 'Danh sách chi tiết doanh thu vận tải quốc tế của tuyến ' + input.TenTuyen + ' với chỉ tiêu ' + input.PhanLoaiXe + ' tháng ' + input.Thang + ' năm ' + input.Nam;
      var InitData = function () {
        ReportBCService.Invoke('BCLV01Detail', input).then(function (res) {
          $scope.BCLV01Detail = res;
        })

      }
      InitData();
      $scope.Dong = function () {
        $uibModalInstance.dismiss();
      };

    }]);
})();

(function () {
    'use strict';
    var app = angular.module('app.reportbc');
    app.controller('BCLV02Controller', ['$scope', '$filter', '$q', '$uibModal', '$rootScope', 'msgService', 'DanhMucService', 'ReportBCService', 'ENV'
      , function ($scope, $filter, $q, $uibModal,$rootScope, msgService, DanhMucService, ReportBCService, ENV) {

    var DateNow = new Date($filter('date')($rootScope.$settings.TimeServer, 'yyyy-MM-dd'));
    $scope.input = {
      Ngay_BatDau: new Date(DateNow.getFullYear(), DateNow.getMonth(), 1, 0, 0, 0),
      Ngay_KetThuc: new Date(DateNow),
    };
        $q.all([DanhMucService.GetAllZone(), DanhMucService.GetAllKhachHang()]).then(function (res) {
          $scope.listGa = $filter('filter')(res[0], { LoaiZone: 1 },true);
          $scope.listKhachHang = res[1];
         
        });
        $scope.setButton = function (button) {
            if ($scope.reportForm.$valid) {
                $scope.button = button;
            }
        }

        $scope.report = { };
        $scope.renderReport = function () {
            if ($scope.reportForm.$valid && !$scope.loading) {
                var input = {
                    TuNgay: $filter('date')($scope.input.Ngay_BatDau, 'yyyy-MM-dd'),
                    DenNgay: $filter('date')($scope.input.Ngay_KetThuc, 'yyyy-MM-dd'),
                    GaDongID: $scope.input.GaDongItem ? $scope.input.GaDongItem.GaID : null,
                    TenGaDong: $scope.input.GaDongItem ? $scope.input.GaDongItem.TenZone : null,
                    GaTraID: $scope.input.GaTraItem ? $scope.input.GaTraItem.GaID : null,
                    TenGaTra: $scope.input.GaTraItem ? $scope.input.GaTraItem.TenZone : null,
                    MaKH: $scope.input.KhachHangItem ? $scope.input.KhachHangItem.MaKH : null,
                }

                if ($scope.button == 'report') {
                  ReportBCService.Invoke('BCLV02', input).then(function (res) {
                        $scope.report = res;
                        $scope.loading = false;
                        $scope.submited = true;
                    }, function () {
                        $scope.loading = false;
                        $scope.submited = true;
                        $scope.report = { Data: [] };
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                } else {
                  ReportBCService.InvokeBlob('BCLV02Excel', input).then(function (res) {
                        if (res) {
                            saveAs(res.Blob, res.Filename);
                        }
                        $scope.loading = false;
                        msgService.showSuccess('Đã xuất excel thành công.');
                    }, function () {
                        $scope.loading = false;
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                }
                $scope.loading = true;
            }
        };
       
        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };

      
  }]);
})();

(function () {
    'use strict';
    var app = angular.module('app.reportbc');
  app.controller('BCND01Controller', ['$scope', '$filter','$q','$uibModal','$rootScope', 'msgService', 'DanhMucService', 'ReportBCService', 'ENV', function ($scope, $filter,$q,$uibModal,$rootScope, msgService, DanhMucService, ReportBCService, ENV) {
    var Now = new Date($rootScope.$settings.TimeServer);
        $scope.input = {Nam:Now.getFullYear()+'', Thang:(Now.getMonth()+1)+'' };

        $scope.setButton = function (button) {
            if ($scope.reportForm.$valid) {
                $scope.button = button;
            }
        }

        $scope.report = { };
        $scope.renderReport = function () {
            if ($scope.reportForm.$valid && !$scope.loading) {
                var input = {
                  Thang: $scope.input.Thang ? $scope.input.Thang : null,
                  Nam: $scope.input.Nam ? $scope.input.Nam : null,
                }

                if ($scope.button == 'report') {
                  ReportBCService.Invoke('BCND01', input).then(function (res) {
                        $scope.report = res;
                        $scope.loading = false;
                        $scope.submited = true;
                    }, function () {
                        $scope.loading = false;
                        $scope.submited = true;
                        $scope.report = { Data: [] };
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                } else {
                  ReportBCService.InvokeBlob('BCND01Excel', input).then(function (res) {
                        if (res) {
                            saveAs(res.Blob, res.Filename);
                        }
                        $scope.loading = false;
                        msgService.showSuccess('Đã xuất excel thành công.');
                    }, function () {
                        $scope.loading = false;
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                }
                $scope.loading = true;
            }
        };
        $scope.ShowDetail = function (item) {
          console.log('item', item);
          var input = {
            Thang: $scope.report.Input ? $scope.report.Input.Thang : null,
            Nam: $scope.report.Input ? $scope.report.Input.Nam : null,
            MaTuyen: item.MaTuyen,
            TenTuyen: item.TenTuyen,
            PhanLoaiXe: item.PhanLoaiXe,
          };

          var modalInstance = $uibModal.open({
            templateUrl: '/app/views/BC/BCND01Detail.html',
            controller: 'BCND01DetailController',
            size: 'lg',
            backdrop: 'static',
            resolve: {
              input: function () { return input; },
            }
          });
          modalInstance.result.then(function (confirm) {
            if (confirm) {

            }
          }, function (confirm) {
            if (confirm) {

            }
          });
        };  

        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };

      
  }]);
  app.controller('BCND01DetailController', ['$scope', '$filter', '$q', '$uibModalInstance', 'msgService', 'DanhMucService', 'ReportBCService', 'ENV', 'input'
    , function ($scope, $filter, $q, $uibModalInstance, msgService, DanhMucService, ReportBCService, ENV, input) {
      $scope.Title = 'Danh sách chi tiết doanh thu vận tải nội địa của tuyến ' + input.TenTuyen + ' với chỉ tiêu ' + input.PhanLoaiXe+ ' tháng '+input.Thang+' năm '+input.Nam;
      var InitData = function () {
        ReportBCService.Invoke('BCND01Detail', input).then(function (res) {
          $scope.BCND01Detail = res;
        })

      }
      InitData();
      $scope.Dong = function () {
        $uibModalInstance.dismiss();
      };

    }]);
})();

(function () {
    'use strict';
    var app = angular.module('app.reportbc');
    app.controller('BCND02Controller', ['$scope', '$filter', '$q', '$uibModal', '$rootScope', 'msgService', 'DanhMucService', 'ReportBCService', 'ENV'
      , function ($scope, $filter, $q, $uibModal,$rootScope, msgService, DanhMucService, ReportBCService, ENV) {

    var DateNow = new Date($filter('date')($rootScope.$settings.TimeServer, 'yyyy-MM-dd'));
    $scope.input = {
      Ngay_BatDau: new Date(DateNow.getFullYear(), DateNow.getMonth(), 1, 0, 0, 0),
      Ngay_KetThuc: new Date(DateNow),
    };
        $q.all([DanhMucService.GetAllZone(), DanhMucService.GetAllKhachHang()]).then(function (res) {
          $scope.listGa = $filter('filter')(res[0], { LoaiZone: 1 },true);
          $scope.listKhachHang = res[1];
         
        });
        $scope.setButton = function (button) {
            if ($scope.reportForm.$valid) {
                $scope.button = button;
            }
        }

        $scope.report = { };
        $scope.renderReport = function () {
            if ($scope.reportForm.$valid && !$scope.loading) {
                var input = {
                    TuNgay: $filter('date')($scope.input.Ngay_BatDau, 'yyyy-MM-dd'),
                    DenNgay: $filter('date')($scope.input.Ngay_KetThuc, 'yyyy-MM-dd'),
                    GaDongID: $scope.input.GaDongItem ? $scope.input.GaDongItem.GaID : null,
                    TenGaDong: $scope.input.GaDongItem ? $scope.input.GaDongItem.TenZone : null,
                    GaTraID: $scope.input.GaTraItem ? $scope.input.GaTraItem.GaID : null,
                    TenGaTra: $scope.input.GaTraItem ? $scope.input.GaTraItem.TenZone : null,
                    MaKH: $scope.input.KhachHangItem ? $scope.input.KhachHangItem.MaKH : null,
                }

                if ($scope.button == 'report') {
                  ReportBCService.Invoke('BCND02', input).then(function (res) {
                        $scope.report = res;
                        $scope.loading = false;
                        $scope.submited = true;
                    }, function () {
                        $scope.loading = false;
                        $scope.submited = true;
                        $scope.report = { Data: [] };
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                } else {
                  ReportBCService.InvokeBlob('BCND02Excel', input).then(function (res) {
                        if (res) {
                            saveAs(res.Blob, res.Filename);
                        }
                        $scope.loading = false;
                        msgService.showSuccess('Đã xuất excel thành công.');
                    }, function () {
                        $scope.loading = false;
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                }
                $scope.loading = true;
            }
        };
       
        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };

      
  }]);
})();

(function () {
    'use strict';
    var app = angular.module('app.reportbc');
    app.controller('BCND03Controller', ['$scope', '$filter', '$q', '$uibModal', '$rootScope', 'msgService', 'DanhMucService', 'ReportBCService', 'ENV'
      , function ($scope, $filter, $q, $uibModal,$rootScope, msgService, DanhMucService, ReportBCService, ENV) {

    var DateNow = new Date($filter('date')($rootScope.$settings.TimeServer, 'yyyy-MM-dd'));
    $scope.input = {
      Ngay_BatDau: new Date(DateNow.getFullYear(), DateNow.getMonth(), 1, 0, 0, 0),
      Ngay_KetThuc: new Date(DateNow),
    };
        $q.all([DanhMucService.GetAllZone(),DanhMucService.GetAllLoaiHinhVC()]).then(function (res) {
          $scope.listGa = $filter('filter')(res[0], { LoaiZone: 1 },true);
          $scope.listLoaiHinhVC = res[1];
         
        });
        $scope.setButton = function (button) {
            if ($scope.reportForm.$valid) {
                $scope.button = button;
            }
        }

        $scope.report = { };
        $scope.renderReport = function () {
            if ($scope.reportForm.$valid && !$scope.loading) {
                var input = {
                    TuNgay: $filter('date')($scope.input.Ngay_BatDau, 'yyyy-MM-dd'),
                    DenNgay: $filter('date')($scope.input.Ngay_KetThuc, 'yyyy-MM-dd'),
                    GaDongID: $scope.input.GaDongItem ? $scope.input.GaDongItem.GaID : null,
                    TenGaDong: $scope.input.GaDongItem ? $scope.input.GaDongItem.TenZone : null,
                    GaTraID: $scope.input.GaTraItem ? $scope.input.GaTraItem.GaID : null,
                    TenGaTra: $scope.input.GaTraItem ? $scope.input.GaTraItem.TenZone : null,
                    MaLoaiHinhVC: $scope.input.LoaiHinhVCItem ? $scope.input.LoaiHinhVCItem.MaLoaiHinhVC : null,
                }

                if ($scope.button == 'report') {
                  ReportBCService.Invoke('BCND03', input).then(function (res) {
                        $scope.report = res;
                        $scope.loading = false;
                        $scope.submited = true;
                    }, function () {
                        $scope.loading = false;
                        $scope.submited = true;
                        $scope.report = { Data: [] };
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                } else {
                  ReportBCService.InvokeBlob('BCND03Excel', input).then(function (res) {
                        if (res) {
                            saveAs(res.Blob, res.Filename);
                        }
                        $scope.loading = false;
                        msgService.showSuccess('Đã xuất excel thành công.');
                    }, function () {
                        $scope.loading = false;
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                }
                $scope.loading = true;
            }
        };
       
        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };

      
  }]);
})();

(function () {
    'use strict';
    var app = angular.module('app.reportbc');
    app.controller('BCND04Controller', ['$scope', '$filter', '$q', '$uibModal', '$rootScope', 'msgService', 'DanhMucService', 'ReportBCService', 'ENV'
      , function ($scope, $filter, $q, $uibModal,$rootScope, msgService, DanhMucService, ReportBCService, ENV) {

    var DateNow = new Date($filter('date')($rootScope.$settings.TimeServer, 'yyyy-MM-dd'));
    $scope.input = {
      Ngay_BatDau: new Date(DateNow.getFullYear(), DateNow.getMonth(), 1, 0, 0, 0),
      Ngay_KetThuc: new Date(DateNow),
    };
        $q.all([DanhMucService.GetAllZone(), DanhMucService.GetAllKhachHang()]).then(function (res) {
          $scope.listGa = $filter('filter')(res[0], { LoaiZone: 1 },true);
          $scope.listKhachHang = res[1];
        });
        $scope.setButton = function (button) {
            if ($scope.reportForm.$valid) {
                $scope.button = button;
            }
        }

        $scope.report = { };
        $scope.renderReport = function () {
            if ($scope.reportForm.$valid && !$scope.loading) {
                var input = {
                    TuNgay: $filter('date')($scope.input.Ngay_BatDau, 'yyyy-MM-dd'),
                    DenNgay: $filter('date')($scope.input.Ngay_KetThuc, 'yyyy-MM-dd'),
                    GaDongID: $scope.input.GaDongItem ? $scope.input.GaDongItem.GaID : null,
                    TenGaDong: $scope.input.GaDongItem ? $scope.input.GaDongItem.TenZone : null,
                    GaTraID: $scope.input.GaTraItem ? $scope.input.GaTraItem.GaID : null,
                    TenGaTra: $scope.input.GaTraItem ? $scope.input.GaTraItem.TenZone : null,
                    MaKH: $scope.input.KhachHangItem ? $scope.input.KhachHangItem.MaKH : null,
                }

                if ($scope.button == 'report') {
                  ReportBCService.Invoke('BCND04', input).then(function (res) {
                        $scope.report = res;
                        $scope.loading = false;
                        $scope.submited = true;
                    }, function () {
                        $scope.loading = false;
                        $scope.submited = true;
                        $scope.report = { Data: [] };
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                } else {
                  ReportBCService.InvokeBlob('BCND04Excel', input).then(function (res) {
                        if (res) {
                            saveAs(res.Blob, res.Filename);
                        }
                        $scope.loading = false;
                        msgService.showSuccess('Đã xuất excel thành công.');
                    }, function () {
                        $scope.loading = false;
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                }
                $scope.loading = true;
            }
        };
       
        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };

      
  }]);
})();

(function () {
    'use strict';
    var app = angular.module('app.reportbc');
    app.controller('BCQLX01Controller', ['$scope', '$filter', 'msgService', 'DanhMucService', 'ReportBCService', 'ENV', function ($scope, $filter, msgService, DanhMucService, ReportBCService, ENV) {

        $scope.input = { };
     
        $scope.setButton = function (button) {
            if ($scope.reportForm.$valid) {
                $scope.button = button;
            }
        }

        $scope.report = { };
        $scope.renderReport = function () {
          console.log('abc');
            if ($scope.reportForm.$valid && !$scope.loading) {
                var input = {
                    
                }

                if ($scope.button == 'report') {
                  ReportBCService.Invoke('BCQLX01', input).then(function (res) {
                        $scope.report = res;
                        $scope.loading = false;
                        $scope.submited = true;
                    }, function () {
                        $scope.loading = false;
                        $scope.submited = true;
                        $scope.report = { Data: [] };
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                } else {
                  ReportBCService.InvokeBlob('BCQLX01Excel', input).then(function (res) {
                        if (res) {
                            saveAs(res.Blob, res.Filename);
                        }
                        $scope.loading = false;
                        msgService.showSuccess('Đã xuất excel thành công.');
                    }, function () {
                        $scope.loading = false;
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                }
                $scope.loading = true;
            }
        };

        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };

      
    }]);
})();

(function () {
    'use strict';
    var app = angular.module('app.reportbc');
    app.controller('BCQLX02Controller', ['$scope', '$filter', '$q', '$uibModal', '$location','$rootScope','$window','msgService', 'DanhMucService', 'ReportBCService', 'ENV'
      , function ($scope, $filter, $q, $uibModal,$location,$rootScope,$window, msgService, DanhMucService, ReportBCService, ENV) {
        
        var DateNow = new Date($filter('date')($rootScope.$settings.TimeServer, 'yyyy-MM-dd'));
        console.log('time', $rootScope.$settings.TimeServer);
        $scope.input = {
          Ngay_BatDau: new Date(DateNow.getFullYear(), DateNow.getMonth(), 1, 0, 0, 0),
          Ngay_KetThuc: new Date(DateNow),
        };
        $q.all([DanhMucService.GetAllXuongSuaChua()]).then(function (res) {
          $scope.listXuongSuaChua = res[0];
        });

        $scope.setButton = function (button) {
            if ($scope.reportForm.$valid) {
                $scope.button = button;
            }
        }

        $scope.report = { };
        $scope.renderReport = function () {
            if ($scope.reportForm.$valid && !$scope.loading) {
                var input = {
                  Ngay_BatDau: $filter('date')($scope.input.Ngay_BatDau, 'yyyy-MM-dd'),
                  Ngay_KetThuc: $filter('date')($scope.input.Ngay_KetThuc, 'yyyy-MM-dd'),
                  MaXuong: $scope.input.XuongSuaChuaItem? $scope.input.XuongSuaChuaItem.MaGa:null,
                }
                if ($scope.button == 'report') {
                  ReportBCService.Invoke('BCQLX02', input).then(function (res) {
                        $scope.report = res;
                        $scope.loading = false;
                        $scope.submited = true;
                    }, function () {
                        $scope.loading = false;
                        $scope.submited = true;
                        $scope.report = { Data: [] };
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                } else {
                  ReportBCService.InvokeBlob('BCQLX02Excel', input).then(function (res) {
                        if (res) {
                            saveAs(res.Blob, res.Filename);
                        }
                        $scope.loading = false;
                        msgService.showSuccess('Đã xuất excel thành công.');
                    }, function () {
                        $scope.loading = false;
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                }
                $scope.loading = true;
            }
        };
     

        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };
  }]);
  

})();

(function () {
    'use strict';
    var app = angular.module('app.reportbc');
    app.controller('BCQT01Controller', ['$scope', '$filter', '$q', '$uibModal', '$location','$rootScope','$window','msgService', 'DanhMucService', 'ReportBCService', 'ENV'
      , function ($scope, $filter, $q, $uibModal,$location,$rootScope,$window, msgService, DanhMucService, ReportBCService, ENV) {
        
        var DateNow = new Date($filter('date')($rootScope.$settings.TimeServer, 'yyyy-MM-dd'));
        $scope.input = {
          Ngay_BatDau: new Date(DateNow.getFullYear(), DateNow.getMonth(), 1, 0, 0, 0),
          Ngay_KetThuc: new Date(DateNow),
        };

        $scope.setButton = function (button) {
            if ($scope.reportForm.$valid) {
                $scope.button = button;
            }
        }

        $scope.report = { };
        $scope.renderReport = function () {
            if ($scope.reportForm.$valid && !$scope.loading) {
                var input = {
                  Ngay_BatDau: $filter('date')($scope.input.Ngay_BatDau, 'yyyy-MM-dd'),
                  Ngay_KetThuc: $filter('date')($scope.input.Ngay_KetThuc, 'yyyy-MM-dd'),
                  MacTau: $scope.input.MacTau ? $scope.input.MacTau : null,
                  MaNCC: $scope.input.MaNCC ? $scope.input.MaNCC : null,
                }
                if ($scope.button == 'report') {
                  ReportBCService.Invoke('BCQT01', input).then(function (res) {
                    $scope.report = res;
                    $scope.report.Data1 = $filter('filter')(res.Data, { LoaiKH: 2 }, true);
                    var lstDuongBo = $filter('filter')(res.Data, { LoaiKH: 23 }, true);
                    var lstDuongBoThue = $filter('filter')(res.Data, { LoaiKH: 25 }, true);
                    if (lstDuongBo && lstDuongBo.length > 0) {
                      $scope.report.Data2 = lstDuongBo.concat(lstDuongBoThue);
                    }
                    
                    $scope.report.Data3 = $filter('filter')(res.Data, { LoaiKH: 21 }, true);
                    console.log('$scope.report', $scope.report);
                        $scope.loading = false;
                        $scope.submited = true;
                    }, function () {
                        $scope.loading = false;
                        $scope.submited = true;
                        $scope.report = { Data: [] };
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                } else {
                  ReportBCService.InvokeBlob('BCQT01Excel', input).then(function (res) {
                        if (res) {
                            saveAs(res.Blob, res.Filename);
                        }
                        $scope.loading = false;
                        msgService.showSuccess('Đã xuất excel thành công.');
                    }, function () {
                        $scope.loading = false;
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                }
                $scope.loading = true;
            }
        };
        $scope.OnClickMacTau = function (item) {
          var t1 = $filter('date')($scope.report.Input.Ngay_BatDau, 'yyyy-MM-dd');
          var t2 = $filter('date')($scope.report.Input.Ngay_KetThuc, 'yyyy-MM-dd');
          $window.open("#/app/BC/BCQT02/" + item.MacTau + '/' + t1 + '/' + t2, '_blank');
          //$location.path("/app/BC/BCQT02/" + item.MacTau + '/' + t1 + '/' + t2);
        };

        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };
  }]);
  

})();

(function () {
    'use strict';
    var app = angular.module('app.reportbc');
    app.controller('BCQT02Controller', ['$scope', '$filter', '$q', '$uibModal', '$stateParams','$rootScope', 'msgService', 'DanhMucService', 'ReportBCService', 'ENV'
      , function ($scope, $filter, $q, $uibModal,$stateParams,$rootScope, msgService, DanhMucService, ReportBCService, ENV) {

        var DateNow = new Date($filter('date')($rootScope.$settings.TimeServer, 'yyyy-MM-dd'));
        $scope.input = {
          Ngay_BatDau: new Date(DateNow.getFullYear(), DateNow.getMonth(), 1, 0, 0, 0),
          Ngay_KetThuc: new Date(DateNow),
        };
       

        $scope.report = { };
        $scope.renderReport = function () {
            if ($scope.reportForm.$valid && !$scope.loading) {
                var input = {
                    Ngay_BatDau: $filter('date')($scope.input.Ngay_BatDau, 'yyyy-MM-dd'),
                    Ngay_KetThuc: $filter('date')($scope.input.Ngay_KetThuc, 'yyyy-MM-dd'),
                    MacTau: $scope.input.MacTau ? $scope.input.MacTau : null,
                    MaNCC: $scope.input.MaNCC ? $scope.input.MaNCC : null,
                }
                if ($scope.button == 'report') {
                  ReportBCService.Invoke('BCQT02', input).then(function (res) {
                        $scope.report = res;
                        $scope.loading = false;
                        $scope.submited = true;
                    }, function () {
                        $scope.loading = false;
                        $scope.submited = true;
                        $scope.report = { Data: [] };
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                } else {
                  ReportBCService.InvokeBlob('BCQT02Excel', input).then(function (res) {
                        if (res) {
                            saveAs(res.Blob, res.Filename);
                        }
                        $scope.loading = false;
                        msgService.showSuccess('Đã xuất excel thành công.');
                    }, function () {
                        $scope.loading = false;
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                }
                $scope.loading = true;
            }
        };
        $scope.setButton = function (button) {
          if ($scope.reportForm.$valid) {
            $scope.button = button;
          }
        }
        //innit tu bcqt01
        var mactau = $stateParams.mactau;
        var t1 = $stateParams.t1;
        var t2 = $stateParams.t2;
        if (mactau && t1 && t2) {
          $scope.input.MacTau = mactau;
          $scope.input.Ngay_BatDau = new Date(t1);
          $scope.input.Ngay_KetThuc = new Date(t2);
          $scope.button = 'report';
          $scope.reportForm = { $valid: true };
          //$scope.reportForm.$valid = true;
          //$scope.setButton('report');
          $scope.renderReport();
        }
        
       //show detail when click MacTau
        $scope.ShowDetail = function (item) {
          var input = {};
          if (item.TauID ==0 && item.MacTau == 'DBO') {
            input = {
              MaNCC: item.MaCTSoHuu ? item.MaCTSoHuu : null,
              MacTau: item.MacTau ? item.MacTau : null,
              Ngay_BatDau: $scope.report.Input.Ngay_BatDau ? $scope.report.Input.Ngay_BatDau : null,
              Ngay_KetThuc: $scope.report.Input.Ngay_KetThuc ? $scope.report.Input.Ngay_KetThuc : null,
              Loai:2
            }
          } else if (item.TauID == 0 && item.MacTau != 'DBO') {
            input = {
              MaNCC: item.MaCTSoHuu ? item.MaCTSoHuu : null,
              MacTau: item.MacTau ? item.MacTau : null,
              Ngay_BatDau: $scope.report.Input.Ngay_BatDau ? $scope.report.Input.Ngay_BatDau : null,
              Ngay_KetThuc: $scope.report.Input.Ngay_KetThuc ? $scope.report.Input.Ngay_KetThuc : null,
              Loai: 4
            }
          } else {
             input = {
              MaNCC: item.MaCTSoHuu ? item.MaCTSoHuu : null,
              MacTau: item.MacTau ? item.MacTau : null,
              NgayXP: item.NgayXP ? item.NgayXP : null,
              Loai: 1
            };
          }

          var modalInstance = $uibModal.open({
            templateUrl: '/app/views/BC/BCQT02Detail.html',
            controller: 'BCQT02DetailController',
            windowClass: 'extent_large',
            backdrop: 'static',
            resolve: {
              input: function () { return input; },
            }
          });
          modalInstance.result.then(function (confirm) {
            if (confirm) {

            }
          }, function (confirm) {
            if (confirm) {

            }
          });
        };
        $scope.ShowDetail2 = function (item) {
          if (!item.DHGT_KCKT || item.DHGT_KCKT <= 0) {
            return;
          }
           var input = {
              MaNCC: item.MaCTSoHuu ? item.MaCTSoHuu : null,
              MacTau: item.MacTau ? item.MacTau : null,
              NgayXP: item.NgayXP ? item.NgayXP : null,
              Loai: 3
            };
        

          var modalInstance = $uibModal.open({
            templateUrl: '/app/views/BC/BCQT02Detail2.html',
            controller: 'BCQT02Detail2Controller',
            windowClass: 'extent_large',
            backdrop: 'static',
            resolve: {
              input: function () { return input; },
            }
          });
          modalInstance.result.then(function (confirm) {
            if (confirm) {

            }
          }, function (confirm) {
            if (confirm) {

            }
          });
        };

        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };
  }]);
  app.controller('BCQT02DetailController', ['$scope', '$filter', '$q', '$uibModalInstance', 'msgService', 'DanhMucService', 'ReportBCService', 'ENV', 'input'
  , function ($scope, $filter, $q, $uibModalInstance, msgService, DanhMucService, ReportBCService, ENV, input) {
    $scope.Title = 'Danh sách chi tiết kết quả vận tải theo tàu của tàu ' + input.MacTau;
    $scope.loading = true;
    var InitData = function () {
      ReportBCService.Invoke('BCQT02Detail', input).then(function (res) {
        $scope.BCQT02Detail = res;
        $scope.loading = false;
      })
      
    }
    InitData();
    $scope.Dong = function () {
      $uibModalInstance.dismiss();
    };

  }]);
  app.controller('BCQT02Detail2Controller', ['$scope', '$filter', '$q', '$uibModalInstance', 'msgService', 'DanhMucService', 'ReportBCService', 'ENV', 'input'
, function ($scope, $filter, $q, $uibModalInstance, msgService, DanhMucService, ReportBCService, ENV, input) {
  $scope.Title = 'Danh sách chi tiết khám chữa tàu ' + input.MacTau + ', ngày xuất phát ' + $filter('date')(input.NgayXP, 'dd/MM/yyyy');
  $scope.loading = true;
  var InitData = function () {
    ReportBCService.Invoke('BCQT02Detail', input).then(function (res) {
      $scope.BCQT02Detail2 = res;
      $scope.loading = false;
    })

  }
  InitData();
  $scope.Dong = function () {
    $uibModalInstance.dismiss();
  };

}]);

})();

(function () {
    'use strict';
    var app = angular.module('app.reportbc');
    app.controller('BCQT03Controller', ['$scope', '$filter', '$q', '$uibModal', '$location','$rootScope','$window','msgService', 'DanhMucService', 'ReportBCService', 'ENV'
      , function ($scope, $filter, $q, $uibModal,$location,$rootScope,$window, msgService, DanhMucService, ReportBCService, ENV) {
        
        var DateNow = new Date($filter('date')($rootScope.$settings.TimeServer, 'yyyy-MM-dd'));
        console.log('time', $rootScope.$settings.TimeServer);
        $scope.input = {
          Ngay_BatDau: new Date(DateNow.getFullYear(), DateNow.getMonth(), 1, 0, 0, 0),
          Ngay_KetThuc: new Date(DateNow),
        };
        console.log('time', $scope.input.Ngay_KetThuc);

        $scope.setButton = function (button) {
            if ($scope.reportForm.$valid) {
                $scope.button = button;
            }
        }

        $scope.report = { };
        $scope.renderReport = function () {
            if ($scope.reportForm.$valid && !$scope.loading) {
                var input = {
                  Ngay_BatDau: $filter('date')($scope.input.Ngay_BatDau, 'yyyy-MM-dd'),
                  Ngay_KetThuc: $filter('date')($scope.input.Ngay_KetThuc, 'yyyy-MM-dd'),
                }
                if ($scope.button == 'report') {
                  ReportBCService.Invoke('BCQT03', input).then(function (res) {
                        $scope.report = res;
                        $scope.loading = false;
                        $scope.submited = true;
                    }, function () {
                        $scope.loading = false;
                        $scope.submited = true;
                        $scope.report = { Data: [] };
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                } else {
                  ReportBCService.InvokeBlob('BCQT03Excel', input).then(function (res) {
                        if (res) {
                            saveAs(res.Blob, res.Filename);
                        }
                        $scope.loading = false;
                        msgService.showSuccess('Đã xuất excel thành công.');
                    }, function () {
                        $scope.loading = false;
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                }
                $scope.loading = true;
            }
        };
     

        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };
  }]);
  

})();

(function () {
    'use strict';
    var app = angular.module('app.reportbc');
    app.controller('BCQT04Controller', ['$scope', '$filter', '$q', '$uibModal', '$location','$rootScope','$window','msgService', 'DanhMucService', 'ReportBCService', 'ENV'
      , function ($scope, $filter, $q, $uibModal,$location,$rootScope,$window, msgService, DanhMucService, ReportBCService, ENV) {
        
        var DateNow = new Date($filter('date')($rootScope.$settings.TimeServer, 'yyyy-MM-dd'));
        console.log('time', $rootScope.$settings.TimeServer);
        $scope.input = {
          Ngay_BatDau: new Date(DateNow.getFullYear(), DateNow.getMonth(), 1, 0, 0, 0),
          Ngay_KetThuc: new Date(DateNow),
        };
        console.log('time', $scope.input.Ngay_KetThuc);

        $scope.setButton = function (button) {
            if ($scope.reportForm.$valid) {
                $scope.button = button;
            }
        }

        $scope.report = { };
        $scope.renderReport = function () {
            if ($scope.reportForm.$valid && !$scope.loading) {
                var input = {
                  Ngay_BatDau: $filter('date')($scope.input.Ngay_BatDau, 'yyyy-MM-dd'),
                  Ngay_KetThuc: $filter('date')($scope.input.Ngay_KetThuc, 'yyyy-MM-dd'),
                }
                if ($scope.button == 'report') {
                  ReportBCService.Invoke('BCQT04', input).then(function (res) {
                        $scope.report = res;
                        $scope.loading = false;
                        $scope.submited = true;
                    }, function () {
                        $scope.loading = false;
                        $scope.submited = true;
                        $scope.report = { Data: [] };
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                } else {
                  ReportBCService.InvokeBlob('BCQT04Excel', input).then(function (res) {
                        if (res) {
                            saveAs(res.Blob, res.Filename);
                        }
                        $scope.loading = false;
                        msgService.showSuccess('Đã xuất excel thành công.');
                    }, function () {
                        $scope.loading = false;
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                }
                $scope.loading = true;
            }
        };
     

        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };
  }]);
  

})();

/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/


(function () {
    'use strict';

    var app = angular.module('app.routes');
    app.config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];
    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, helper) {

        //
        // Application Routes
        // -----------------------------------
        $stateProvider
            //process
            .state('app.BC', {
                url: '/BC',
                abstract: true,
                templateUrl: helper.basepath('BC.html'),
                resolve: helper.resolveFor('loaders.css', 'isteven-multi-select', 'file-saver', 'fastclick', 'modernizr', 'icons', 'screenfull', 'animo', 'sparklines', 'slimscroll', 'classyloader', 'spinkit', 'toaster', 'whirl', 'oitozero.ngSweetAlert', 'textAngular', 'angularBootstrapNavTree')
            })
            .state('app.BC.BCQLX01', {
                url: '/BCQLX01',
                title: 'Báo cáo hồ sơ kỹ thuật',
                controller: 'BCQLX01Controller',
                templateUrl: helper.basepath('BC/BCQLX01.html'),
                resolve: helper.resolveAuthFor()
            })
            .state('app.BC.BCQLX02', {
                url: '/BCQLX02',
                title: 'Báo cáo sửa chữa toa xe',
                controller: 'BCQLX02Controller',
                templateUrl: helper.basepath('BC/BCQLX02.html'),
                resolve: helper.resolveAuthFor()
            })
            //tram van tai
            .state('app.BC.BCHH01', {
                url: '/BCHH01',
                title: 'Báo cáo tác nghiệp cẩu',
                controller: 'BCHH01Controller',
                templateUrl: helper.basepath('BC/BCHH01.html'),
                resolve: helper.resolveAuthFor()
            })
            .state('app.BC.BCHH02', {
                url: '/BCHH02',
                title: 'Báo cáo tổng hợp SXKD trung tâm',
                controller: 'BCHH02Controller',
                templateUrl: helper.basepath('BC/BCHH02.html'),
                resolve: helper.resolveAuthFor()
            })
            .state('app.BC.BCHH03', {
                url: '/BCHH03',
                title: 'Báo cáo tổng hợp sản lượng xếp dỡ TTVT',
                controller: 'BCHH03Controller',
                templateUrl: helper.basepath('BC/BCHH03.html'),
                resolve: helper.resolveAuthFor()
            })
             //trung tam noi dia
            .state('app.BC.BCND01', {
              url: '/BCND01',
              title: 'Báo cáo tổng hợp doanh thu',
              controller: 'BCND01Controller',
              templateUrl: helper.basepath('BC/BCND01.html'),
              resolve: helper.resolveAuthFor()
            })
             .state('app.BC.BCND02', {
               url: '/BCND02',
               title: 'Báo cáo doanh thu và sản lượng theo khách hàng',
               controller: 'BCND02Controller',
               templateUrl: helper.basepath('BC/BCND02.html'),
               resolve: helper.resolveAuthFor()
             })
             .state('app.BC.BCND03', {
               url: '/BCND03',
               title: 'Báo cáo doanh thu theo người quản lý',
               controller: 'BCND03Controller',
               templateUrl: helper.basepath('BC/BCND03.html'),
               resolve: helper.resolveAuthFor()
             })
             .state('app.BC.BCND04', {
               url: '/BCND04',
               title: 'Báo cáo sản lượng khách hàng theo tháng',
               controller: 'BCND04Controller',
               templateUrl: helper.basepath('BC/BCND04.html'),
               resolve: helper.resolveAuthFor()
             })
             //trung tâm lvqt
             .state('app.BC.BCLV01', {
               url: '/BCLV01',
               title: 'Báo cáo tổng hợp vận tải quốc tế',
               controller: 'BCLV01Controller',
               templateUrl: helper.basepath('BC/BCLV01.html'),
               resolve: helper.resolveAuthFor()
             })
             .state('app.BC.BCLV02', {
               url: '/BCLV02',
               title: 'Báo cáo chi tiết doanh thu - sản lượng quốc tế',
               controller: 'BCLV02Controller',
               templateUrl: helper.basepath('BC/BCLV02.html'),
               resolve: helper.resolveAuthFor()
             })
             //trung tâm dh
             .state('app.BC.BCDH01', {
               url: '/BCDH01',
               title: 'Báo cáo tình hình vận dụng Container',
               controller: 'BCDH01Controller',
               templateUrl: helper.basepath('BC/BCDH01.html'),
               resolve: helper.resolveAuthFor()
             })
             .state('app.BC.BCDH02', {
               url: '/BCDH02',
               title: 'Báo cáo đọng Container',
               controller: 'BCDH02Controller',
               templateUrl: helper.basepath('BC/BCDH02.html'),
               resolve: helper.resolveAuthFor()
             })
             // ban dieu hanh
             .state('app.BC.BCQT01', {
               url: '/BCQT01',
               title: 'Báo cáo tổng hợp kết quả vận tải',
               controller: 'BCQT01Controller',
               templateUrl: helper.basepath('BC/BCQT01.html'),
               resolve: helper.resolveAuthFor()
             })
             .state('app.BC.BCQT02', {
               url: '/BCQT02',
               title: 'Báo cáo kết quả vận tải theo tàu',
               controller: 'BCQT02Controller',
               templateUrl: helper.basepath('BC/BCQT02.html'),
               resolve: helper.resolveAuthFor()
             })
             .state('app.BC.BCQT022', {
               url: '/BCQT02/{mactau}/{t1}/{t2}',
               title: 'Báo cáo kết quả vận tải theo tàu',
               controller: 'BCQT02Controller',
               templateUrl: helper.basepath('BC/BCQT02.html'),
               resolve: helper.resolveAuthFor()
             })
             .state('app.BC.BCQT03', {
               url: '/BCQT03',
               title: 'Báo cáo tổng hợp tình hình xếp dỡ',
               controller: 'BCQT03Controller',
               templateUrl: helper.basepath('BC/BCQT03.html'),
               resolve: helper.resolveAuthFor()
             })
             .state('app.BC.BCQT04', {
               url: '/BCQT04',
               title: 'Báo cáo chi tiết dịch vụ ngoài vận tải',
               controller: 'BCQT04Controller',
               templateUrl: helper.basepath('BC/BCQT04.html'),
               resolve: helper.resolveAuthFor()
             })
        ;

    } // routesConfig

})();

(function () {
    'use strict';
    var app = angular.module('app.reportbc');
    app.service('ReportBCService', ['$server', 'ENV', function ($server, ENV) {
        var serviceFactory = {};
        var rs = $server(ENV.urlApiRatBaoCao + 'api/ReportBC/:action', {}, {
            Invoke: { method: 'POST' },
            InvokeBlob: { method: 'POST', Blob: true }
        });
        serviceFactory.Invoke = function (report, input) {
            return rs.Invoke({ action: report }, input);
        };
        serviceFactory.InvokeBlob = function (report, input) {
            return rs.InvokeBlob({ action: report }, input);
        };

        return serviceFactory;
    }]);
})();
(function () {
    'use strict';
    var app = angular.module('app.reportbk');
    app.controller('BK01Controller', ['$scope', '$filter', '$rootScope', 'msgService', 'DanhMucService', 'ReportBKService', 'ENV'
      , function ($scope, $filter,$rootScope, msgService, DanhMucService, ReportBKService, ENV) {

      var DateNow = new Date($filter('date')($rootScope.$settings.TimeServer, 'yyyy-MM-dd'));
      $scope.input = {
        Ngay_BatDau: new Date(DateNow.getFullYear(), DateNow.getMonth(), 1, 0, 0, 0),
        Ngay_KetThuc: new Date(DateNow),
      };

     
        $scope.setButton = function (button) {
            if ($scope.reportForm.$valid) {
                $scope.button = button;
            }
        }

        $scope.report = { };
        $scope.renderReport = function () {
            if ($scope.reportForm.$valid && !$scope.loading) {
                var input = {
                    Ngay_BatDau: $filter('date')($scope.input.Ngay_BatDau, 'yyyy-MM-dd'),
                    Ngay_KetThuc: $filter('date')($scope.input.Ngay_KetThuc, 'yyyy-MM-dd'),
                    LoaiKH: $scope.input.LoaiKH
                }

                if ($scope.button == 'report') {
                  ReportBKService.Invoke('BK01', input).then(function (res) {
                        $scope.report = res;
                        $scope.loading = false;
                        $scope.submited = true;
                    }, function () {
                        $scope.loading = false;
                        $scope.submited = true;
                        $scope.report = { Data: [] };
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                } else {
                  ReportBKService.InvokeBlob('BK01Excel', input).then(function (res) {
                        if (res) {
                            saveAs(res.Blob, res.Filename);
                        }
                        $scope.loading = false;
                        msgService.showSuccess('Đã xuất excel thành công.');
                    }, function () {
                        $scope.loading = false;
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                }
                $scope.loading = true;
            }
        };

        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };

      
    }]);
})();

(function () {
    'use strict';
    var app = angular.module('app.reportbk');
    app.controller('BKTram01Controller', ['$scope', '$filter', '$q','$rootScope', 'msgService', 'DanhMucService', 'ReportBKService', 'ENV'
      , function ($scope, $filter, $q,$rootScope, msgService, DanhMucService, ReportBKService, ENV) {
    var DateNow = new Date($filter('date')($rootScope.$settings.TimeServer, 'yyyy-MM-dd'));
    $scope.input = {
      Ngay_BatDau: new Date(DateNow.getFullYear(), DateNow.getMonth(), 1, 0, 0, 0),
      Ngay_KetThuc: new Date(DateNow),
    };
    $q.all([DanhMucService.GetAllDonVi()]).then(function (res) {
      $scope.listDonVi = res[0];
      var lst = $filter('filter')($scope.listDonVi, {MaDV:'C99'},true);
      $scope.input.DonVi = lst[0];
      });
        
        $scope.setButton = function (button) {
            if ($scope.reportForm.$valid) {
                $scope.button = button;
            }
        }

        $scope.report = { };
        $scope.renderReport = function () {
          console.log('abc');
            if ($scope.reportForm.$valid && !$scope.loading) {
              var input = {
                    Ngay_BatDau: $filter('date')($scope.input.Ngay_BatDau, 'yyyy-MM-dd'),
                    Ngay_KetThuc: $filter('date')($scope.input.Ngay_KetThuc, 'yyyy-MM-dd'),
                    LoaiKH: $scope.input.LoaiKH,
                    MaDV: $scope.input.DonVi ? $scope.input.DonVi.MaDV : null,
                    TenDV: $scope.input.DonVi ? $scope.input.DonVi.TenDV : null,
                }
              console.log('input', input);
                if ($scope.button == 'report') {
                  ReportBKService.Invoke('BKTram01', input).then(function (res) {
                        $scope.report = res;
                        $scope.loading = false;
                        $scope.submited = true;
                    }, function () {
                        $scope.loading = false;
                        $scope.submited = true;
                        $scope.report = { Data: [] };
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                } else {
                  ReportBKService.InvokeBlob('BKTram01Excel', input).then(function (res) {
                        if (res) {
                            saveAs(res.Blob, res.Filename);
                        }
                        $scope.loading = false;
                        msgService.showSuccess('Đã xuất excel thành công.');
                    }, function () {
                        $scope.loading = false;
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                }
                $scope.loading = true;
            }
        };

        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };

      
    }]);
})();

(function () {
    'use strict';
    var app = angular.module('app.reportbk');
    app.controller('BKTTDH01Controller', ['$scope', '$filter', '$q', '$rootScope', 'msgService', 'DanhMucService', 'ReportBKService', 'ENV'
      , function ($scope, $filter, $q,$rootScope, msgService, DanhMucService, ReportBKService, ENV) {

      var DateNow = new Date($filter('date')($rootScope.$settings.TimeServer, 'yyyy-MM-dd'));
      $scope.input = {
        Ngay_BatDau: new Date(DateNow.getFullYear(), DateNow.getMonth(), 1, 0, 0, 0),
        Ngay_KetThuc: new Date(DateNow),
      };
        $q.all([DanhMucService.GetAllNCC(), DanhMucService.GetAllZone(), DanhMucService.GetAllLoaiTacNghiep()]).then(function (res) {
          $scope.listNCC = res[0];
          $scope.listGa = $filter('filter')(res[1], { LoaiZone: 1 }, true);
          $scope.listLoaiTacNghiep = $filter('filter')(res[2], { MaDichVu: 'DV001' }, true);
        });
        $scope.setButton = function (button) {
            if ($scope.reportForm.$valid) {
                $scope.button = button;
            }
        }

        $scope.report = { };
        $scope.renderReport = function () {
            if ($scope.reportForm.$valid && !$scope.loading) {
                var input = {
                    Ngay_BatDau: $filter('date')($scope.input.Ngay_BatDau, 'yyyy-MM-dd'),
                    Ngay_KetThuc: $filter('date')($scope.input.Ngay_KetThuc, 'yyyy-MM-dd'),
                    MaNCC: $scope.input.NCCItem ? $scope.input.NCCItem.MaKH : null,
                    TenNCC: $scope.input.NCCItem ? $scope.input.NCCItem.CustomerName : null,
                    MaGaTN: $scope.input.GaTNItem ? $scope.input.GaTNItem.MaZone : null,
                    TenGaTN: $scope.input.GaTNItem ? $scope.input.GaTNItem.TenZone : null,
                    LoaiTacNghiep: $scope.input.LoaiTacNghiepItem ? $scope.input.LoaiTacNghiepItem.LoaiTacNghiep : null,
                    TenLoaiTacNghiep: $scope.input.LoaiTacNghiepItem ? $scope.input.LoaiTacNghiepItem.TenLoaiTacNghiep : null,
                }
                console.log('input', input);
                
                if ($scope.button == 'report') {
                  ReportBKService.Invoke('BKTTDH01', input).then(function (res) {
                        $scope.report = res;
                        $scope.loading = false;
                        $scope.submited = true;
                    }, function () {
                        $scope.loading = false;
                        $scope.submited = true;
                        $scope.report = { Data: [] };
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                } else {
                  ReportBKService.InvokeBlob('BKTTDH01Excel', input).then(function (res) {
                        if (res) {
                            saveAs(res.Blob, res.Filename);
                        }
                        $scope.loading = false;
                        msgService.showSuccess('Đã xuất excel thành công.');
                    }, function () {
                        $scope.loading = false;
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                }
                $scope.loading = true;
            }
        };

        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };

      
    }]);
})();

(function () {
    'use strict';
    var app = angular.module('app.reportbk');
    app.controller('BKTTDH02Controller', ['$scope', '$filter', '$q', '$rootScope', 'msgService', 'DanhMucService', 'ReportBKService', 'ENV'
      , function ($scope, $filter, $q,$rootScope, msgService, DanhMucService, ReportBKService, ENV) {

      var DateNow = new Date($filter('date')($rootScope.$settings.TimeServer, 'yyyy-MM-dd'));
      $scope.input = {
        Ngay_BatDau: new Date(DateNow.getFullYear(), DateNow.getMonth(), 1, 0, 0, 0),
        Ngay_KetThuc: new Date(DateNow),
      };
        $q.all([DanhMucService.GetAllNCC(), DanhMucService.GetAllZone(), DanhMucService.GetAllKhachHang()]).then(function (res) {
          $scope.listNCC = res[0];
          $scope.listZone = res[1];
          $scope.listKhachHang = res[2];
        });
        $scope.setButton = function (button) {
            if ($scope.reportForm.$valid) {
                $scope.button = button;
            }
        }

        $scope.report = { };
        $scope.renderReport = function () {
            if ($scope.reportForm.$valid && !$scope.loading) {
                var input = {
                    Ngay_BatDau: $filter('date')($scope.input.Ngay_BatDau, 'yyyy-MM-dd'),
                    Ngay_KetThuc: $filter('date')($scope.input.Ngay_KetThuc, 'yyyy-MM-dd'),
                    MaNCC: $scope.input.NCCItem ? $scope.input.NCCItem.MaKH : null,
                    TenNCC: $scope.input.NCCItem ? $scope.input.NCCItem.CustomerName : null,
                    MaZoneDi: $scope.input.ZoneDiItem ? $scope.input.ZoneDiItem.MaZone : null,
                    MaZoneDen: $scope.input.ZoneDenItem ? $scope.input.ZoneDenItem.MaZone : null,
                    TenZoneDi: $scope.input.ZoneDiItem ? $scope.input.ZoneDiItem.TenZone : null,
                    TenZoneDen: $scope.input.ZoneDenItem ? $scope.input.ZoneDenItem.TenZone : null,
                    MaKH: $scope.input.KhachHangItem ? $scope.input.KhachHangItem.MaKH : null,
                    LoaiVanChuyen: $scope.input.LoaiVanChuyen ? $scope.input.LoaiVanChuyen : null,
                }

                if ($scope.button == 'report') {
                  ReportBKService.Invoke('BKTTDH02', input).then(function (res) {
                        $scope.report = res;
                        $scope.loading = false;
                        $scope.submited = true;
                    }, function () {
                        $scope.loading = false;
                        $scope.submited = true;
                        $scope.report = { Data: [] };
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                } else {
                  ReportBKService.InvokeBlob('BKTTDH02Excel', input).then(function (res) {
                        if (res) {
                            saveAs(res.Blob, res.Filename);
                        }
                        $scope.loading = false;
                        msgService.showSuccess('Đã xuất excel thành công.');
                    }, function () {
                        $scope.loading = false;
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                }
                $scope.loading = true;
            }
        };

        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };

      
    }]);
})();

(function () {
    'use strict';
    var app = angular.module('app.reportbk');
    app.controller('BKTTDH03Controller', ['$scope', '$filter', '$q', '$rootScope', 'msgService', 'DanhMucService', 'ReportBKService', 'ENV'
      , function ($scope, $filter, $q,$rootScope, msgService, DanhMucService, ReportBKService, ENV) {

      var DateNow = new Date($filter('date')($rootScope.$settings.TimeServer, 'yyyy-MM-dd'));
      $scope.input = {
        Ngay_BatDau: new Date(DateNow.getFullYear(), DateNow.getMonth(), 1, 0, 0, 0),
        Ngay_KetThuc: new Date(DateNow),
      };
        $q.all([DanhMucService.GetAllNCC(), DanhMucService.GetAllZone()]).then(function (res) {
          $scope.listNCC = res[0];
          $scope.listGa = $filter('filter')(res[1],{LoaiZone:1},true);
        });
        $scope.setButton = function (button) {
            if ($scope.reportForm.$valid) {
                $scope.button = button;
            }
        }

        $scope.report = { };
        $scope.renderReport = function () {
            if ($scope.reportForm.$valid && !$scope.loading) {
                var input = {
                    Ngay_BatDau: $filter('date')($scope.input.Ngay_BatDau, 'yyyy-MM-dd'),
                    Ngay_KetThuc: $filter('date')($scope.input.Ngay_KetThuc, 'yyyy-MM-dd'),
                    MaNCC: $scope.input.NCCItem ? $scope.input.NCCItem.MaKH : null,
                    TenNCC: $scope.input.NCCItem ? $scope.input.NCCItem.CustomerName : null,
                    MaZoneDi: $scope.input.ZoneDiItem ? $scope.input.ZoneDiItem.MaZone : null,
                    MaZoneDen: $scope.input.ZoneDenItem ? $scope.input.ZoneDenItem.MaZone : null,
                    TenZoneDi: $scope.input.ZoneDiItem ? $scope.input.ZoneDiItem.TenZone : null,
                    TenZoneDen: $scope.input.ZoneDenItem ? $scope.input.ZoneDenItem.TenZone : null,
                    MacTau: $scope.input.MacTau,
                }

                if ($scope.button == 'report') {
                  ReportBKService.Invoke('BKTTDH03', input).then(function (res) {
                        $scope.report = res;
                        $scope.loading = false;
                        $scope.submited = true;
                    }, function () {
                        $scope.loading = false;
                        $scope.submited = true;
                        $scope.report = { Data: [] };
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                } else {
                  ReportBKService.InvokeBlob('BKTTDH03Excel', input).then(function (res) {
                        if (res) {
                            saveAs(res.Blob, res.Filename);
                        }
                        $scope.loading = false;
                        msgService.showSuccess('Đã xuất excel thành công.');
                    }, function () {
                        $scope.loading = false;
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                }
                $scope.loading = true;
            }
        };

        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };

      
    }]);
})();

(function () {
    'use strict';
    var app = angular.module('app.reportbk');
    app.controller('BKTTDH04Controller', ['$scope', '$filter', '$q', '$rootScope', 'msgService', 'DanhMucService', 'ReportBKService', 'ENV'
      , function ($scope, $filter, $q,$rootScope, msgService, DanhMucService, ReportBKService, ENV) {

    var DateNow = new Date($filter('date')($rootScope.$settings.TimeServer, 'yyyy-MM-dd'));
    $scope.input = {
      Ngay_BatDau: new Date(DateNow.getFullYear(), DateNow.getMonth(), 1, 0, 0, 0),
      Ngay_KetThuc: new Date(DateNow),
    };
        $scope.listGa = [];
        $q.all([DanhMucService.GetAllNCC(), DanhMucService.GetAllZone()]).then(function (res) {
          $scope.listNCC = res[0];
          var listGa = $filter('filter')(res[1], { LoaiZone: 2 }, true);
          for (var i = 0; i < listGa.length; i++) {
            if (listGa[i] && listGa[i].GaID >= 5000)
              $scope.listGa.push(listGa[i]);
          }
        });
        $scope.setButton = function (button) {
            if ($scope.reportForm.$valid) {
                $scope.button = button;
            }
        }

        $scope.report = { };
        $scope.renderReport = function () {
            if ($scope.reportForm.$valid && !$scope.loading) {
                var input = {
                  Ngay_BatDau: $filter('date')($scope.input.Ngay_BatDau, 'yyyy-MM-dd'),
                  Ngay_KetThuc: $filter('date')($scope.input.Ngay_KetThuc, 'yyyy-MM-dd'),
                  MaNCC: $scope.input.NCCItem ? $scope.input.NCCItem.MaKH : null,
                  TenNCC: $scope.input.NCCItem ? $scope.input.NCCItem.CustomerName : null,
                  MaZoneDi: $scope.input.ZoneDiItem ? $scope.input.ZoneDiItem.MaZone : null,
                  MaZoneDen: $scope.input.ZoneDenItem ? $scope.input.ZoneDenItem.MaZone : null,
                  TenZoneDi: $scope.input.ZoneDiItem ? $scope.input.ZoneDiItem.TenZone : null,
                  TenZoneDen: $scope.input.ZoneDenItem ? $scope.input.ZoneDenItem.TenZone : null,
                }

                if ($scope.button == 'report') {
                  ReportBKService.Invoke('BKTTDH04', input).then(function (res) {
                        $scope.report = res;
                        $scope.loading = false;
                        $scope.submited = true;
                    }, function () {
                        $scope.loading = false;
                        $scope.submited = true;
                        $scope.report = { Data: [] };
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                } else {
                  ReportBKService.InvokeBlob('BKTTDH04Excel', input).then(function (res) {
                        if (res) {
                            saveAs(res.Blob, res.Filename);
                        }
                        $scope.loading = false;
                        msgService.showSuccess('Đã xuất excel thành công.');
                    }, function () {
                        $scope.loading = false;
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                }
                $scope.loading = true;
            }
        };

        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };

      
    }]);
})();

(function () {
    'use strict';
    var app = angular.module('app.reportbk');
    app.controller('BKTTDH05Controller', ['$scope', '$filter', '$q', '$rootScope', 'msgService', 'DanhMucService', 'ReportBKService', 'ENV'
      , function ($scope, $filter, $q,$rootScope, msgService, DanhMucService, ReportBKService, ENV) {

    var DateNow = new Date($filter('date')($rootScope.$settings.TimeServer, 'yyyy-MM-dd'));
    $scope.input = {
      Ngay_BatDau: new Date(DateNow.getFullYear(), DateNow.getMonth(), 1, 0, 0, 0),
      Ngay_KetThuc: new Date(DateNow),
    };
        $q.all([DanhMucService.GetAllNCC()]).then(function (res) {
          $scope.listNCC = res[0];        
        });
        $scope.setButton = function (button) {
            if ($scope.reportForm.$valid) {
                $scope.button = button;
            }
        }

        $scope.report = { };
        $scope.renderReport = function () {
            if ($scope.reportForm.$valid && !$scope.loading) {
                var input = {
                    Ngay_BatDau: $filter('date')($scope.input.Ngay_BatDau, 'yyyy-MM-dd'),
                    Ngay_KetThuc: $filter('date')($scope.input.Ngay_KetThuc, 'yyyy-MM-dd'),
                    MaDichVu: $scope.input.MaDichVu,
                    MaNCC: $scope.input.NCCItem ? $scope.input.NCCItem.MaKH : null,
                    TenNCC: $scope.input.NCCItem ? $scope.input.NCCItem.CustomerName : null,
                }

                if ($scope.button == 'report') {
                  ReportBKService.Invoke('BKTTDH05', input).then(function (res) {
                        $scope.report = res;
                        $scope.loading = false;
                        $scope.submited = true;
                    }, function () {
                        $scope.loading = false;
                        $scope.submited = true;
                        $scope.report = { Data: [] };
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                } else {
                  ReportBKService.InvokeBlob('BKTTDH05Excel', input).then(function (res) {
                        if (res) {
                            saveAs(res.Blob, res.Filename);
                        }
                        $scope.loading = false;
                        msgService.showSuccess('Đã xuất excel thành công.');
                    }, function () {
                        $scope.loading = false;
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                }
                $scope.loading = true;
            }
        };

        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };

      
    }]);
})();

(function () {
    'use strict';
    var app = angular.module('app.reportbk');
    app.controller('BKTTDH06Controller', ['$scope', '$filter', '$rootScope', 'msgService', 'DanhMucService', 'ReportBKService', 'ENV'
      , function ($scope, $filter,$rootScope, msgService, DanhMucService, ReportBKService, ENV) {

      var DateNow = new Date($filter('date')($rootScope.$settings.TimeServer, 'yyyy-MM-dd'));
      $scope.input = {
        Ngay_BatDau: new Date(DateNow.getFullYear(), DateNow.getMonth(), 1, 0, 0, 0),
        Ngay_KetThuc: new Date(DateNow),
      };
     
        $scope.setButton = function (button) {
            if ($scope.reportForm.$valid) {
                $scope.button = button;
            }
        }

        $scope.report = { };
        $scope.renderReport = function () {
            if ($scope.reportForm.$valid && !$scope.loading) {
                var input = {
                    Ngay_BatDau: $filter('date')($scope.input.Ngay_BatDau, 'yyyy-MM-dd'),
                    Ngay_KetThuc: $filter('date')($scope.input.Ngay_KetThuc, 'yyyy-MM-dd'),
                    MaDichVu:$scope.input.MaDichVu
                }

                if ($scope.button == 'report') {
                  ReportBKService.Invoke('BKTTDH06', input).then(function (res) {
                        $scope.report = res;
                        $scope.loading = false;
                        $scope.submited = true;
                    }, function () {
                        $scope.loading = false;
                        $scope.submited = true;
                        $scope.report = { Data: [] };
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                } else {
                  ReportBKService.InvokeBlob('BKTTDH06Excel', input).then(function (res) {
                        if (res) {
                            saveAs(res.Blob, res.Filename);
                        }
                        $scope.loading = false;
                        msgService.showSuccess('Đã xuất excel thành công.');
                    }, function () {
                        $scope.loading = false;
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                }
                $scope.loading = true;
            }
        };

        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };

      
    }]);
})();

(function () {
    'use strict';
    var app = angular.module('app.reportbk');
    app.controller('BKTTVTND01Controller', ['$scope', '$filter', '$q','$rootScope', 'msgService', 'DanhMucService', 'ReportBKService', 'ENV'
      , function ($scope, $filter, $q,$rootScope, msgService, DanhMucService, ReportBKService, ENV) {
    var DateNow = new Date($filter('date')($rootScope.$settings.TimeServer, 'yyyy-MM-dd'));
    $scope.input = {
      Ngay_BatDau: new Date(DateNow.getFullYear(), DateNow.getMonth(), 1, 0, 0, 0),
      Ngay_KetThuc: new Date(DateNow),
    };
    $q.all([DanhMucService.GetAllKhachHang(), DanhMucService.GetAllZone(), DanhMucService.GetAllHangHoa(), DanhMucService.GetAllDonViTinh()]).then(function (res) {
      $scope.listKhachHang = res[0];
      $scope.listGa = $filter('filter')(res[1], { LoaiZone: 1 }, true);
      $scope.listKho = $filter('filter')(res[1], { LoaiZone: 0 }, true);
      $scope.listHangHoa = res[2];
      $scope.listDVT = res[3];
      });
        
     
        $scope.setButton = function (button) {
            if ($scope.reportForm.$valid) {
                $scope.button = button;
            }
        }

        $scope.report = { };
        $scope.renderReport = function () {
          console.log('abc');
            if ($scope.reportForm.$valid && !$scope.loading) {
              var input = {
                    MaKH: $scope.input.KhachHangItem? $scope.input.KhachHangItem.MaKH:null,
                    Ngay_BatDau: $filter('date')($scope.input.Ngay_BatDau, 'yyyy-MM-dd'),
                    Ngay_KetThuc: $filter('date')($scope.input.Ngay_KetThuc, 'yyyy-MM-dd'),
                    MucThue: $scope.input.MucThue,
                    MaZoneDi: $scope.input.ZoneDiItem ? $scope.input.ZoneDiItem.MaZone : null,
                    MaZoneDen: $scope.input.ZoneDenItem ? $scope.input.ZoneDenItem.MaZone : null,
                    MaGaDi: $scope.input.GaDiItem ? $scope.input.GaDiItem.MaZone : null,
                    MaGaDen: $scope.input.GaDenItem ? $scope.input.GaDenItem.MaZone : null,
                    MacTau: $scope.input.MacTau,
                    SoHieuXe: $scope.input.SoHieuXe,
                    MaHang: $scope.input.HangHoaItem ? $scope.input.HangHoaItem.MaHangRAT : null,
                    DonViTinh: $scope.input.DVTItem ? $scope.input.DVTItem.DonViTinh : null,
                }
              console.log('input', input);
                if ($scope.button == 'report') {
                  ReportBKService.Invoke('BKTTVTND01', input).then(function (res) {
                        $scope.report = res;
                        $scope.loading = false;
                        $scope.submited = true;
                    }, function () {
                        $scope.loading = false;
                        $scope.submited = true;
                        $scope.report = { Data: [] };
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                } else {
                  ReportBKService.InvokeBlob('BKTTVTND01Excel', input).then(function (res) {
                        if (res) {
                            saveAs(res.Blob, res.Filename);
                        }
                        $scope.loading = false;
                        msgService.showSuccess('Đã xuất excel thành công.');
                    }, function () {
                        $scope.loading = false;
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                }
                $scope.loading = true;
            }
        };

        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };

      
    }]);
})();

/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/


(function () {
    'use strict';

    var app = angular.module('app.routes');
    app.config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];
    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, helper) {

        //
        // Application Routes
        // -----------------------------------
        $stateProvider
            //process
            .state('app.BK', {
                url: '/BK',
                abstract: true,
                templateUrl: helper.basepath('BK.html'),
                resolve: helper.resolveFor('loaders.css', 'isteven-multi-select', 'file-saver', 'fastclick', 'modernizr', 'icons', 'screenfull', 'animo', 'sparklines', 'slimscroll', 'classyloader', 'spinkit', 'toaster', 'whirl', 'oitozero.ngSweetAlert', 'textAngular', 'angularBootstrapNavTree')
            })
            .state('app.BK.BK01', {
              url: '/BK01',
                title: 'Báo cáo doanh thu booking',
                controller: 'BK01Controller',
                templateUrl: helper.basepath('BK/BK01.html'),
                resolve: helper.resolveAuthFor()
            })
          //TTDH
            .state('app.BK.BKTTDH01', {
              url: '/BKTTDH01',
              title: 'Bảng kê đối chiếu chi trả nhà cung cấp dịch vụ cẩu',
              controller: 'BKTTDH01Controller',
              templateUrl: helper.basepath('BK/BKTTDH01.html'),
              resolve: helper.resolveAuthFor()
            })
             .state('app.BK.BKTTDH02', {
               url: '/BKTTDH02',
               title: 'Bảng kê đối chiếu chi trả nhà cung cấp dịch vụ vận chuyển đường bộ',
               controller: 'BKTTDH02Controller',
               templateUrl: helper.basepath('BK/BKTTDH02.html'),
               resolve: helper.resolveAuthFor()
             })
            
             .state('app.BK.BKTTDH03', {
               url: '/BKTTDH03',
               title: 'Bảng kê đối chiếu chi trả nhà cung cấp dịch vụ vận chuyển đường sắt',
               controller: 'BKTTDH03Controller',
               templateUrl: helper.basepath('BK/BKTTDH03.html'),
               resolve: helper.resolveAuthFor()
             })
             .state('app.BK.BKTTDH04', {
               url: '/BKTTDH04',
               title: 'Bảng kê đối chiếu chi trả nhà cung cấp dịch vụ vận chuyển đường biển',
               controller: 'BKTTDH04Controller',
               templateUrl: helper.basepath('BK/BKTTDH04.html'),
               resolve: helper.resolveAuthFor()
             })
             .state('app.BK.BKTTDH05', {
               url: '/BKTTDH05',
               title: 'Bảng kê đối chiếu chi trả nhà cung cấp dịch vụ hỗ trợ vận tải',
               controller: 'BKTTDH05Controller',
               templateUrl: helper.basepath('BK/BKTTDH05.html'),
               resolve: helper.resolveAuthFor()
             })

      //TTVTND
             .state('app.BK.BKTTVTND01', {
               url: '/BKTTVTND01',
               title: 'Bảng kê đối chiếu thu cước khách hàng vận tải nội địa',
               controller: 'BKTTVTND01Controller',
               templateUrl: helper.basepath('BK/BKTTVTND01.html'),
               resolve: helper.resolveAuthFor()
             })
       //TTVTHH
             .state('app.BK.BKTram01', {
               url: '/BKTram01',
               title: 'Bảng kê sản lượng xếp dỡ',
               controller: 'BKTram01Controller',
               templateUrl: helper.basepath('BK/BKTram01.html'),
               resolve: helper.resolveAuthFor()
             })
           
        ;

    } // routesConfig

})();

(function () {
    'use strict';
    var app = angular.module('app.reportbk');
    app.service('ReportBKService', ['$server', 'ENV', function ($server, ENV) {
        var serviceFactory = {};
        var rs = $server(ENV.urlApiRatBaoCao + 'api/ReportBK/:action', {}, {
            Invoke: { method: 'POST' },
            InvokeBlob: { method: 'POST', Blob: true }
        });
        serviceFactory.Invoke = function (report, input) {
            return rs.Invoke({ action: report }, input);
        };
        serviceFactory.InvokeBlob = function (report, input) {
            return rs.InvokeBlob({ action: report }, input);
        };

        return serviceFactory;
    }]);
})();
/**=========================================================
 * Module: datatable,js
 * Angular Datatable controller
 =========================================================*/

(function() {
    'use strict';

    var app = angular.module('app.trogiup');
    app.controller('TroGiupCtrl', ['$scope', '$filter', 'ENV', function ($scope, $filter, ENV) {
        $scope.DateTimeNow = $filter('date')(new Date(), "dd/MM/yyyy HH:mm:ss");
        
    }]);
})();

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

(function () {
    'use strict';
    var app = angular.module('app.reportdt01');
    app.controller('DT01BController', ['$scope', '$filter', 'msgService', 'DanhMucService', 'ReportDT01Service', 'ENV', function ($scope, $filter, msgService, DanhMucService, ReportDT01Service, ENV) {

        $scope.input = { MaDV: '', CapQL: 3 };
        $scope.inputMacTaus = [];
        DanhMucService.GetAllMacTau().then(function (res) {
            angular.forEach(res, function (item) {
                var matau = { name: item.MacTau, maker: item.Maker, icon: '', ticked: false }
                $scope.inputMacTaus.push(matau);
            });
        });

        $scope.listCongTy = []
        DanhMucService.GetListCongTy().then(function (items) {
            $scope.listCongTy = items;
        });

        $scope.listCapHienThi = [
            { Value: 3, Text: "Chi nhánh bán vé" },
            { Value: 4, Text: "Trạm bán vé" },
            { Value: 5, Text: "Điểm bán vé" },
        ];
        $scope.listLoaiBan = [
            { Value: 1, Text: "Chỉ đại lý bán" },
            { Value: 2, Text: "Không bao gồm đại lý bán" },
        ];
        $scope.listLoaiThanhToan = [
            { Value: 2, Text: "VNR tự thu" },
            { Value: 1, Text: "Đối tác thu hộ" },
        ];

        $scope.setButton = function (button) {
            if ($scope.reportForm.$valid) {
                $scope.button = button;
            }
        }

        $scope.report = { };
        $scope.renderReport = function () {
            if ($scope.reportForm.$valid && !$scope.loading) {
                var input = {
                    NgayBan_BatDau: $filter('date')($scope.input.NgayBan_BatDau, 'yyyy-MM-dd'),
                    NgayBan_KetThuc: $filter('date')($scope.input.NgayBan_KetThuc, 'yyyy-MM-dd'),
                    NgayXP_BatDau: $scope.input.NgayXP_BatDau ? $filter('date')($scope.input.NgayXP_BatDau, 'yyyy-MM-dd') : undefined,
                    NgayXP_KetThuc: $scope.input.NgayXP_KetThuc ? $filter('date')($scope.input.NgayXP_KetThuc, 'yyyy-MM-dd') : undefined,
                    MT: getMultiSelectValues($scope.input.outputMacTaus, $scope.inputMacTaus),
                    MaDV: $scope.input.MaDV,
                    CapQL: $scope.input.CapQL,
                    LoaiBan: $scope.input.LoaiBan,
                    LoaiThanhToan: $scope.input.LoaiThanhToan,
                }

                if ($scope.button == 'report') {
                    ReportDT01Service.Invoke('DT01B', input).then(function (res) {
                        $scope.report = res;
                        $scope.loading = false;
                        $scope.submited = true;
                    }, function () {
                        $scope.loading = false;
                        $scope.submited = true;
                        $scope.report = { Data: [] };
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                } else {
                    ReportDT01Service.InvokeBlob('DT01BExcel', input).then(function (res) {
                        if (res) {
                            saveAs(res.Blob, res.Filename);
                        }
                        $scope.loading = false;
                        msgService.showSuccess('Đã xuất excel thành công.');
                    }, function () {
                        $scope.loading = false;
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                }
                $scope.loading = true;
            }
        };

        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };

        // Select mac tau
        $scope.localLang = {
            selectAll: "Chọn tất cả",
            selectNone: "Bỏ chọn",
            reset: "Mặc định",
            search: "Tìm kiếm mác tàu...",
            nothingSelected: "Vui lòng chọn mác tàu &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"
        };
        var getMultiSelectValues = function (value, allValues) {
            var items = [];
            if (value.length > 0 && value.length != allValues.length) {
                angular.forEach(value, function (val, key) {
                    items.push(val.name);
                });
            }
            return items;
        };
    }]);
})();

(function () {
    'use strict';
    var app = angular.module('app.reportdt01');
    app.controller('DT01B1Controller', ['$scope', '$filter', 'msgService', 'DanhMucService', 'ReportDT01Service', 'ENV', function ($scope, $filter, msgService, DanhMucService, ReportDT01Service, ENV) {

        $scope.input = { MaDV: '', CapQL: 3 };
        $scope.inputMacTaus = [];
        DanhMucService.GetAllMacTau().then(function (res) {
            angular.forEach(res, function (item) {
                var matau = { name: item.MacTau, maker: item.Maker, icon: '', ticked: false }
                $scope.inputMacTaus.push(matau);
            });
        });

        $scope.listCongTy = []
        DanhMucService.GetListCongTy().then(function (items) {
            $scope.listCongTy = items;
        });

        $scope.listCapHienThi = [
            { Value: 3, Text: "Chi nhánh bán vé" },
            { Value: 4, Text: "Trạm bán vé" },
            { Value: 5, Text: "Điểm bán vé" },
        ];
        $scope.listLoaiBan = [
            { Value: 1, Text: "Chỉ đại lý bán" },
            { Value: 2, Text: "Không bao gồm đại lý bán" },
        ];
        $scope.listLoaiThanhToan = [
            { Value: 2, Text: "VNR tự thu" },
            { Value: 1, Text: "Đối tác thu hộ" },
        ];

        $scope.setButton = function (button) {
            if ($scope.reportForm.$valid) {
                $scope.button = button;
            }
        }

        $scope.report = { };
        $scope.renderReport = function () {
            if ($scope.reportForm.$valid && !$scope.loading) {
                var input = {
                    NgayBan_BatDau: $filter('date')($scope.input.NgayBan_BatDau, 'yyyy-MM-dd'),
                    NgayBan_KetThuc: $filter('date')($scope.input.NgayBan_KetThuc, 'yyyy-MM-dd'),
                    NgayXP_BatDau: $scope.input.NgayXP_BatDau ? $filter('date')($scope.input.NgayXP_BatDau, 'yyyy-MM-dd') : undefined,
                    NgayXP_KetThuc: $scope.input.NgayXP_KetThuc ? $filter('date')($scope.input.NgayXP_KetThuc, 'yyyy-MM-dd') : undefined,
                    MT: getMultiSelectValues($scope.input.outputMacTaus, $scope.inputMacTaus),
                    MaDV: $scope.input.MaDV,
                    CapQL: $scope.input.CapQL,
                    LoaiBan: $scope.input.LoaiBan,
                    LoaiThanhToan: $scope.input.LoaiThanhToan,
                }

                if ($scope.button == 'report') {
                    ReportDT01Service.Invoke('DT01B1', input).then(function (res) {
                        $scope.report = res;
                        $scope.loading = false;
                        $scope.submited = true;
                    }, function () {
                        $scope.loading = false;
                        $scope.submited = true;
                        $scope.report = { Data: [] };
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                } else {
                    ReportDT01Service.InvokeBlob('DT01B1Excel', input).then(function (res) {
                        if (res) {
                            saveAs(res.Blob, res.Filename);
                        }
                        $scope.loading = false;
                        msgService.showSuccess('Đã xuất excel thành công.');
                    }, function () {
                        $scope.loading = false;
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                }
                $scope.loading = true;
            }
        };

        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };

        // Select mac tau
        $scope.localLang = {
            selectAll: "Chọn tất cả",
            selectNone: "Bỏ chọn",
            reset: "Mặc định",
            search: "Tìm kiếm mác tàu...",
            nothingSelected: "Vui lòng chọn mác tàu &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"
        };
        var getMultiSelectValues = function (value, allValues) {
            var items = [];
            if (value.length > 0 && value.length != allValues.length) {
                angular.forEach(value, function (val, key) {
                    items.push(val.name);
                });
            }
            return items;
        };
    }]);
})();

(function () {
    'use strict';
    var app = angular.module('app.reportdt01');
    app.controller('DT01B2Controller', ['$scope', '$filter', 'msgService', 'DanhMucService', 'ReportDT01Service', 'ENV', function ($scope, $filter, msgService, DanhMucService, ReportDT01Service, ENV) {

        $scope.input = { MaDV: '', CapQL: 3 };
        $scope.inputMacTaus = [];
        DanhMucService.GetAllMacTau().then(function (res) {
            angular.forEach(res, function (item) {
                var matau = { name: item.MacTau, maker: item.Maker, icon: '', ticked: false }
                $scope.inputMacTaus.push(matau);
            });
        });

        $scope.listCongTy = []
        DanhMucService.GetListCongTy().then(function (items) {
            $scope.listCongTy = items;
        });

        $scope.listCapHienThi = [
            { Value: 3, Text: "Chi nhánh bán vé" },
            { Value: 4, Text: "Trạm bán vé" },
            { Value: 5, Text: "Điểm bán vé" },
        ];
        $scope.listLoaiBan = [
            { Value: 1, Text: "Chỉ đại lý bán" },
            { Value: 2, Text: "Không bao gồm đại lý bán" },
        ];
        $scope.listLoaiThanhToan = [
            { Value: 2, Text: "VNR tự thu" },
            { Value: 1, Text: "Đối tác thu hộ" },
        ];

        $scope.setButton = function (button) {
            if ($scope.reportForm.$valid) {
                $scope.button = button;
            }
        }

        $scope.report = { };
        $scope.renderReport = function () {
            if ($scope.reportForm.$valid && !$scope.loading) {
                var input = {
                    NgayBan_BatDau: $filter('date')($scope.input.NgayBan_BatDau, 'yyyy-MM-dd'),
                    NgayBan_KetThuc: $filter('date')($scope.input.NgayBan_KetThuc, 'yyyy-MM-dd'),
                    NgayXP_BatDau: $scope.input.NgayXP_BatDau ? $filter('date')($scope.input.NgayXP_BatDau, 'yyyy-MM-dd') : undefined,
                    NgayXP_KetThuc: $scope.input.NgayXP_KetThuc ? $filter('date')($scope.input.NgayXP_KetThuc, 'yyyy-MM-dd') : undefined,
                    MT: getMultiSelectValues($scope.input.outputMacTaus, $scope.inputMacTaus),
                    MaDV: $scope.input.MaDV,
                    CapQL: $scope.input.CapQL,
                    LoaiBan: $scope.input.LoaiBan,
                    LoaiThanhToan: $scope.input.LoaiThanhToan,
                }

                if ($scope.button == 'report') {
                    ReportDT01Service.Invoke('DT01B2', input).then(function (res) {
                        $scope.report = res;
                        $scope.loading = false;
                        $scope.submited = true;
                    }, function () {
                        $scope.loading = false;
                        $scope.submited = true;
                        $scope.report = { Data: [] };
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                } else {
                    ReportDT01Service.InvokeBlob('DT01B2Excel', input).then(function (res) {
                        if (res) {
                            saveAs(res.Blob, res.Filename);
                        }
                        $scope.loading = false;
                        msgService.showSuccess('Đã xuất excel thành công.');
                    }, function () {
                        $scope.loading = false;
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                }
                $scope.loading = true;
            }
        };

        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };

        // Select mac tau
        $scope.localLang = {
            selectAll: "Chọn tất cả",
            selectNone: "Bỏ chọn",
            reset: "Mặc định",
            search: "Tìm kiếm mác tàu...",
            nothingSelected: "Vui lòng chọn mác tàu &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"
        };
        var getMultiSelectValues = function (value, allValues) {
            var items = [];
            if (value.length > 0 && value.length != allValues.length) {
                angular.forEach(value, function (val, key) {
                    items.push(val.name);
                });
            }
            return items;
        };
    }]);
})();

(function () {
    'use strict';
    var app = angular.module('app.reportdt01');
    app.controller('DT01BDController', ['$scope', '$filter', 'msgService', 'DanhMucService', 'ReportDT01Service', 'ENV', function ($scope, $filter, msgService, DanhMucService, ReportDT01Service, ENV) {

        $scope.input = { MaDV: '', CapQL: 3 };
        $scope.inputMacTaus = [];
        DanhMucService.GetAllMacTau().then(function (res) {
            angular.forEach(res, function (item) {
                var matau = { name: item.MacTau, maker: item.Maker, icon: '', ticked: false }
                $scope.inputMacTaus.push(matau);
            });
        });

        $scope.listCongTy = []
        DanhMucService.GetListCongTy().then(function (items) {
            $scope.listCongTy = items;
        });

        $scope.listCapHienThi = [
            { Value: 3, Text: "Chi nhánh bán vé" },
            { Value: 4, Text: "Trạm bán vé" },
            { Value: 5, Text: "Điểm bán vé" },
        ];
        $scope.listLoaiBan = [
            { Value: 1, Text: "Chỉ đại lý bán" },
            { Value: 2, Text: "Không bao gồm đại lý bán" },
        ];
        $scope.listLoaiThanhToan = [
            { Value: 2, Text: "VNR tự thu" },
            { Value: 1, Text: "Đối tác thu hộ" },
        ];

        $scope.setButton = function (button) {
            if ($scope.reportForm.$valid) {
                $scope.button = button;
            }
        }

        $scope.report = { };
        $scope.renderReport = function () {
            if ($scope.reportForm.$valid && !$scope.loading) {
                var input = {
                    NgayBan_BatDau: $filter('date')($scope.input.NgayBan_BatDau, 'yyyy-MM-dd'),
                    NgayBan_KetThuc: $filter('date')($scope.input.NgayBan_KetThuc, 'yyyy-MM-dd'),
                    NgayXP_BatDau: $scope.input.NgayXP_BatDau ? $filter('date')($scope.input.NgayXP_BatDau, 'yyyy-MM-dd') : undefined,
                    NgayXP_KetThuc: $scope.input.NgayXP_KetThuc ? $filter('date')($scope.input.NgayXP_KetThuc, 'yyyy-MM-dd') : undefined,
                    MT: getMultiSelectValues($scope.input.outputMacTaus, $scope.inputMacTaus),
                    MaDV: $scope.input.MaDV,
                    CapQL: $scope.input.CapQL,
                    LoaiBan: $scope.input.LoaiBan,
                    LoaiThanhToan: $scope.input.LoaiThanhToan,
                }

                if ($scope.button == 'report') {
                    ReportDT01Service.Invoke('DT01BD', input).then(function (res) {
                        $scope.report = res;
                        $scope.loading = false;
                        $scope.submited = true;
                    }, function () {
                        $scope.loading = false;
                        $scope.submited = true;
                        $scope.report = { Data: [] };
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                } else {
                    ReportDT01Service.InvokeBlob('DT01BDExcel', input).then(function (res) {
                        if (res) {
                            saveAs(res.Blob, res.Filename);
                        }
                        $scope.loading = false;
                        msgService.showSuccess('Đã xuất excel thành công.');
                    }, function () {
                        $scope.loading = false;
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                }
                $scope.loading = true;
            }
        };

        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };

        // Select mac tau
        $scope.localLang = {
            selectAll: "Chọn tất cả",
            selectNone: "Bỏ chọn",
            reset: "Mặc định",
            search: "Tìm kiếm mác tàu...",
            nothingSelected: "Vui lòng chọn mác tàu &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"
        };
        var getMultiSelectValues = function (value, allValues) {
            var items = [];
            if (value.length > 0 && value.length != allValues.length) {
                angular.forEach(value, function (val, key) {
                    items.push(val.name);
                });
            }
            return items;
        };
    }]);
})();

(function () {
    'use strict';
    var app = angular.module('app.reportdt01');
    app.controller('DT01BVController', ['$scope', '$filter', 'msgService', 'DanhMucService', 'ReportDT01Service', 'ENV', function ($scope, $filter, msgService, DanhMucService, ReportDT01Service, ENV) {

        $scope.input = { MaDV: '', CapQL: 3 };
        $scope.inputMacTaus = [];
        DanhMucService.GetAllMacTau().then(function (res) {
            angular.forEach(res, function (item) {
                var matau = { name: item.MacTau, maker: item.Maker, icon: '', ticked: false }
                $scope.inputMacTaus.push(matau);
            });
        });

        $scope.listCongTy = []
        DanhMucService.GetListCongTy().then(function (items) {
            $scope.listCongTy = items;
        });

        $scope.listCapHienThi = [
            { Value: 3, Text: "Chi nhánh bán vé" },
            { Value: 4, Text: "Trạm bán vé" },
            { Value: 5, Text: "Điểm bán vé" },
        ];
        $scope.listLoaiBan = [
            { Value: 1, Text: "Chỉ đại lý bán" },
            { Value: 2, Text: "Không bao gồm đại lý bán" },
        ];
        $scope.listLoaiThanhToan = [
            { Value: 2, Text: "VNR tự thu" },
            { Value: 1, Text: "Đối tác thu hộ" },
        ];

        $scope.setButton = function (button) {
            if ($scope.reportForm.$valid) {
                $scope.button = button;
            }
        }

        $scope.report = { };
        $scope.renderReport = function () {
            if ($scope.reportForm.$valid && !$scope.loading) {
                var input = {
                    NgayBan_BatDau: $filter('date')($scope.input.NgayBan_BatDau, 'yyyy-MM-dd'),
                    NgayBan_KetThuc: $filter('date')($scope.input.NgayBan_KetThuc, 'yyyy-MM-dd'),
                    NgayXP_BatDau: $scope.input.NgayXP_BatDau ? $filter('date')($scope.input.NgayXP_BatDau, 'yyyy-MM-dd') : undefined,
                    NgayXP_KetThuc: $scope.input.NgayXP_KetThuc ? $filter('date')($scope.input.NgayXP_KetThuc, 'yyyy-MM-dd') : undefined,
                    MT: getMultiSelectValues($scope.input.outputMacTaus, $scope.inputMacTaus),
                    MaDV: $scope.input.MaDV,
                    CapQL: $scope.input.CapQL,
                    LoaiBan: $scope.input.LoaiBan,
                    LoaiThanhToan: $scope.input.LoaiThanhToan,
                }

                if ($scope.button == 'report') {
                    ReportDT01Service.Invoke('DT01BV', input).then(function (res) {
                        $scope.report = res;
                        $scope.loading = false;
                        $scope.submited = true;
                    }, function () {
                        $scope.loading = false;
                        $scope.submited = true;
                        $scope.report = { Data: [] };
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                } else {
                    ReportDT01Service.InvokeBlob('DT01BVExcel', input).then(function (res) {
                        if (res) {
                            saveAs(res.Blob, res.Filename);
                        }
                        $scope.loading = false;
                        msgService.showSuccess('Đã xuất excel thành công.');
                    }, function () {
                        $scope.loading = false;
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                }
                $scope.loading = true;
            }
        };

        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };

        // Select mac tau
        $scope.localLang = {
            selectAll: "Chọn tất cả",
            selectNone: "Bỏ chọn",
            reset: "Mặc định",
            search: "Tìm kiếm mác tàu...",
            nothingSelected: "Vui lòng chọn mác tàu &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"
        };
        var getMultiSelectValues = function (value, allValues) {
            var items = [];
            if (value.length > 0 && value.length != allValues.length) {
                angular.forEach(value, function (val, key) {
                    items.push(val.name);
                });
            }
            return items;
        };
    }]);
})();

(function () {
    'use strict';
    var app = angular.module('app.reportdt01');
    app.controller('DT01BVAController', ['$scope', '$filter', 'msgService', 'DanhMucService', 'ReportDT01Service', 'ENV', function ($scope, $filter, msgService, DanhMucService, ReportDT01Service, ENV) {

        $scope.input = { MaDV: '', CapQL: 3 };

        $scope.listCongTy = []
        DanhMucService.GetListCongTy().then(function (items) {
            $scope.listCongTy = items;
        });

        $scope.listCapHienThi = [
            { Value: 3, Text: "Chi nhánh bán vé" },
            { Value: 4, Text: "Trạm bán vé" },
            { Value: 5, Text: "Điểm bán vé" },
        ];
        $scope.listLoaiBan = [
            { Value: 1, Text: "Chỉ đại lý bán" },
            { Value: 2, Text: "Không bao gồm đại lý bán" },
        ];
        $scope.listLoaiTra = [
            { Value: 1, Text: "Trả ngay" },
            { Value: 2, Text: "CK sau 90 ngày" },
            { Value: 3, Text: "Bảo lưu 90 ngày" },
            { Value: 4, Text: "Bảo lưu 1 năm" },
        ];

        $scope.setButton = function (button) {
            if ($scope.reportForm.$valid) {
                $scope.button = button;
            }
        }

        $scope.report = { };
        $scope.renderReport = function () {
            if ($scope.reportForm.$valid && !$scope.loading) {
                var input = {
                    NgayBD: $filter('date')($scope.input.NgayBD, 'yyyy-MM-dd'),
                    NgayKT: $filter('date')($scope.input.NgayKT, 'yyyy-MM-dd'),
                    MaDV: $scope.input.MaDV,
                    CapQL: $scope.input.CapQL,
                    LoaiBan: $scope.input.LoaiBan,
                    LoaiTra: $scope.input.LoaiTra,
                }

                if ($scope.button == 'report') {
                    ReportDT01Service.Invoke('DT01BVA', input).then(function (res) {
                        $scope.report = res;
                        $scope.loading = false;
                        $scope.submited = true;
                    }, function () {
                        $scope.loading = false;
                        $scope.submited = true;
                        $scope.report = { Data: [] };
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                } else {
                    ReportDT01Service.InvokeBlob('DT01BVAExcel', input).then(function (res) {
                        if (res) {
                            saveAs(res.Blob, res.Filename);
                        }
                        $scope.loading = false;
                        msgService.showSuccess('Đã xuất excel thành công.');
                    }, function () {
                        $scope.loading = false;
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                }
                $scope.loading = true;
            }
        };

        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };
    }]);
})();

(function () {
    'use strict';
    var app = angular.module('app.reportdt01');
    app.controller('DT01LVController', ['$scope', '$filter', 'msgService', 'DanhMucService', 'ReportDT01Service', 'ENV', function ($scope, $filter, msgService, DanhMucService, ReportDT01Service, ENV) {

        $scope.input = { Loai: 'A', MaDV: '', MaDV_Tra: '', MaPT: '' };
        $scope.inputMacTaus = [];
        DanhMucService.GetAllMacTau().then(function (res) {
            angular.forEach(res, function (item) {
                if (item.MacTau && item.MacTau.charAt(0) == 'M') {
                    var matau = { name: item.MacTau, maker: item.Maker, icon: '', ticked: false }
                    $scope.inputMacTaus.push(matau);
                }
            });
        });
        $scope.donVis = [];
        DanhMucService.GetListDonVi({ MaDV: 'C12', CapQL: 2}).then(function (res) {
            $scope.donVis = res;
        });

        $scope.setButton = function (button) {
            if ($scope.reportForm.$valid) {
                $scope.button = button;
            }
        }

        $scope.report = { };
        $scope.renderReport = function () {
            if ($scope.reportForm.$valid && !$scope.loading) {
                var input = {
                    NgayBanTu: $filter('date')($scope.input.NgayBD, 'yyyy-MM-dd'),
                    NgayBanDen: $filter('date')($scope.input.NgayKT, 'yyyy-MM-dd'),
                    NgayDiTu: $scope.input.NgayDiTu ? $filter('date')($scope.input.NgayDiTu, 'yyyy-MM-dd') : undefined,
                    NgayDiDen: $scope.input.NgayDiDen ? $filter('date')($scope.input.NgayDiDen, 'yyyy-MM-dd') : undefined,
                    MT: getMultiSelectValues($scope.input.outputMacTaus, $scope.inputMacTaus),
                    MaDV: $scope.input.MaDV,
                }

                if ($scope.button == 'report') {
                    ReportDT01Service.Invoke('DT01LV', input).then(function (res) {
                        $scope.report = res;
                        $scope.loading = false;
                        $scope.submited = true;
                    }, function () {
                        $scope.loading = false;
                        $scope.submited = true;
                        $scope.report = { Data: [] };
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                } else {
                    ReportDT01Service.InvokeBlob('DT01LVExcel', input).then(function (res) {
                        if (res) {
                            saveAs(res.Blob, res.Filename);
                        }
                        $scope.loading = false;
                        msgService.showSuccess('Đã xuất excel thành công.');
                    }, function () {
                        $scope.loading = false;
                        msgService.showWarning('Kết nối máy chủ lỗi.');
                    });
                }
                $scope.loading = true;
            }
        };
        $scope.openNgayBD = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openedNgayBD = true;
        };

        $scope.openNgayKT = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openedNgayKT = true;
        };
        $scope.openNgayDiTu = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openedNgayDiTu = true;
        };

        $scope.openNgayDiDen = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openedNgayDiDen = true;
        };

        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };

        // Select mac tau
        $scope.localLang = {
            selectAll: "Chọn tất cả",
            selectNone: "Bỏ chọn",
            reset: "Mặc định",
            search: "Tìm kiếm mác tàu...",
            nothingSelected: "Vui lòng chọn mác tàu &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"
        };
        var getMultiSelectValues = function (value, allValues) {
            var items = [];
            if (value.length > 0 && value.length != allValues.length) {
                angular.forEach(value, function (val, key) {
                    items.push(val.name);
                });
            }
            return items;
        };
    }]);
})();

/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/


(function () {
    'use strict';

    var app = angular.module('app.routes');
    app.config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];
    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, helper) {

        //
        // Application Routes
        // -----------------------------------
        $stateProvider
            //process
            .state('app.DT01', {
                url: '/DT01',
                abstract: true,
                templateUrl: helper.basepath('DT01.html'),
                resolve: helper.resolveFor('loaders.css', 'isteven-multi-select', 'file-saver', 'fastclick', 'modernizr', 'icons', 'screenfull', 'animo', 'sparklines', 'slimscroll', 'classyloader', 'spinkit', 'toaster', 'whirl', 'oitozero.ngSweetAlert', 'textAngular', 'angularBootstrapNavTree')
            })
            .state('app.DT01.DT01B', {
                url: '/DT01B',
                title: 'Báo cáo tiền thu bán hàng',
                controller: 'DT01BController',
                templateUrl: helper.basepath('DT01/DT01B.html'),
                resolve: helper.resolveAuthFor()
            })
            .state('app.DT01.DT01BV', {
                url: '/DT01BV',
                title: 'Báo cáo tiền thu bán vé',
                controller: 'DT01BVController',
                templateUrl: helper.basepath('DT01/DT01BV.html'),
                resolve: helper.resolveAuthFor()
            })
            .state('app.DT01.DT01BD', {
                url: '/DT01BD',
                title: 'Báo cáo tiền thu bán dịch vụ',
                controller: 'DT01BDController',
                templateUrl: helper.basepath('DT01/DT01BD.html'),
                resolve: helper.resolveAuthFor()
            })
            .state('app.DT01.DT01BVA', {
                url: '/DT01BVA',
                title: 'Báo cáo tách thuế vé trả',
                controller: 'DT01BVAController',
                templateUrl: helper.basepath('DT01/DT01BVA.html'),
                resolve: helper.resolveAuthFor()
            })
            .state('app.DT01.DT01B1', {
                url: '/DT01B1',
                title: 'Báo cáo tiền thu tự bán',
                controller: 'DT01B1Controller',
                templateUrl: helper.basepath('DT01/DT01B1.html'),
                resolve: helper.resolveAuthFor()
            })
            .state('app.DT01.DT01B2', {
                url: '/DT01B2',
                title: 'Báo cáo tiền thu bán hộ',
                controller: 'DT01B2Controller',
                templateUrl: helper.basepath('DT01/DT01B2.html'),
                resolve: helper.resolveAuthFor()
            })
            .state('app.DT01.DT01LV', {
                url: '/DT01LV',
                title: 'Báo cáo bán vé liên vận quốc tế',
                controller: 'DT01LVController',
                templateUrl: helper.basepath('DT01/DT01LV.html'),
                resolve: helper.resolveAuthFor()
            })
        ;

    } // routesConfig

})();

(function () {
    'use strict';
    var app = angular.module('app.reportdt01');
    app.service('ReportDT01Service', ['$server', 'ENV', function ($server, ENV) {
        var serviceFactory = {};
        var rs = $server(ENV.urlApiRatBaoCao + 'api/ReportDT01/:action', {}, {
            Invoke: { method: 'POST' },
            InvokeBlob: { method: 'POST', Blob: true }
        });
        serviceFactory.Invoke = function (report, input) {
            return rs.Invoke({ action: report }, input);
        };
        serviceFactory.InvokeBlob = function (report, input) {
            return rs.InvokeBlob({ action: report }, input);
        };

        return serviceFactory;
    }]);
})();
(function() {
    'use strict';

    angular
        .module('app.bootstrapui', []);
})();
(function() {
    'use strict';

    angular
        .module('app.charts', []);
})();
(function() {
    'use strict';

    angular
        .module('app.elements', []);
})();
(function() {
    'use strict';

    angular
        .module('app.flatdoc', []);
})();
(function() {
    'use strict';

    angular
        .module('app.extras', []);
})();
(function() {
    'use strict';

    angular
        .module('app.icons', []);
})();
(function() {
    'use strict';

    angular
        .module('app.forms', []);
})();
(function() {
    'use strict';

    angular
        .module('app.mailbox', []);
})();
(function() {
    'use strict';

    angular
        .module('app.maps', []);
})();
(function() {
    'use strict';

    angular
        .module('app.navsearch', []);
})();
(function() {
    'use strict';

    angular
        .module('app.notify', []);
})();
(function() {
    'use strict';

    angular
        .module('app.panels', []);
})();
(function() {
    'use strict';

    angular
        .module('app.tables', []);
})();
/**=========================================================
 * Module: demo-alerts.js
 * Provides a simple demo for pagination
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.bootstrapui')
        .controller('AlertDemoCtrl', AlertDemoCtrl);

    function AlertDemoCtrl() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.alerts = [
            { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
            { type: 'warning', msg: 'Well done! You successfully read this important alert message.' }
          ];

          vm.addAlert = function() {
            vm.alerts.push({msg: 'Another alert!'});
          };

          vm.closeAlert = function(index) {
            vm.alerts.splice(index, 1);
          };
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('app.bootstrapui')
        .config(bootstrapuiConfig);

    bootstrapuiConfig.$inject = ['$uibTooltipProvider'];
    function bootstrapuiConfig($uibTooltipProvider){
      $uibTooltipProvider.options({appendToBody: true});
    }
})();
/**=========================================================
 * Module: demo-buttons.js
 * Provides a simple demo for buttons actions
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.bootstrapui')
        .controller('ButtonsCtrl', ButtonsCtrl);

    function ButtonsCtrl() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.singleModel = 1;

          vm.radioModel = 'Middle';

          vm.checkModel = {
            left: false,
            middle: true,
            right: false
          };
        }
    }
})();

/**=========================================================
 * Module: demo-carousel.js
 * Provides a simple demo for bootstrap ui carousel
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.bootstrapui')
        .controller('CarouselDemoCtrl', CarouselDemoCtrl);

    function CarouselDemoCtrl() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.myInterval = 5000;

          var slides = vm.slides = [];
          vm.addSlide = function(id) {
            id = id || 8;
            slides.push({
              image: 'app/img/bg' + id + '.jpg',
              text: ['More','Extra','Lots of','Surplus'][slides.length % 2] + ' ' +
                ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 2]
            });
          };

          vm.addSlide(4);
          vm.addSlide(7);
          vm.addSlide(8);

        }
    }
})();

/**=========================================================
 * Module: demo-datepicker.js
 * Provides a simple demo for bootstrap datepicker
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.bootstrapui')
        .controller('DatepickerDemoCtrl', DatepickerDemoCtrl);

    function DatepickerDemoCtrl() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.today = function() {
            vm.dt = new Date();
          };
          vm.today();

          vm.clear = function () {
            vm.dt = null;
          };

          // Disable weekend selection
          vm.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
          };

          vm.toggleMin = function() {
            vm.minDate = vm.minDate ? null : new Date();
          };
          vm.toggleMin();

          vm.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.opened = true;
          };

          vm.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
          };

          vm.initDate = new Date('2019-10-20');
          vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
          vm.format = vm.formats[0];
        }
    }
})();


/**=========================================================
 * Module: modals.js
 * Provides a simple way to implement bootstrap modals from templates
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.bootstrapui')
        .controller('ModalController', ModalController);

    ModalController.$inject = ['$uibModal'];
    function ModalController($uibModal) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          vm.open = function (size) {

            var modalInstance = $uibModal.open({
              templateUrl: '/myModalContent.html',
              controller: ModalInstanceCtrl,
              size: size
            });

            var state = $('#modal-state');
            modalInstance.result.then(function () {
              state.text('Modal dismissed with OK status');
            }, function () {
              state.text('Modal dismissed with Cancel status');
            });
          };

          // Please note that $uibModalInstance represents a modal window (instance) dependency.
          // It is not the same as the $uibModal service used above.

          ModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance'];
          function ModalInstanceCtrl($scope, $uibModalInstance) {

            $scope.ok = function () {
              $uibModalInstance.close('closed');
            };

            $scope.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };
          }
        }
    }

})();

/**=========================================================
 * Module: demo-pagination.js
 * Provides a simple demo for pagination
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.bootstrapui')
        .controller('PaginationDemoCtrl', PaginationDemoCtrl);

    function PaginationDemoCtrl() {
        var vm = this;


        activate();

        ////////////////

        function activate() {
          vm.totalItems = 64;
          vm.currentPage = 4;

          vm.setPage = function (pageNo) {
            vm.currentPage = pageNo;
          };

          vm.pageChanged = function() {
            console.log('Page changed to: ' + vm.currentPage);
          };

          vm.maxSize = 5;
          vm.bigTotalItems = 175;
          vm.bigCurrentPage = 1;
        }
    }
})();

/**=========================================================
 * Module: demo-popover.js
 * Provides a simple demo for popovers
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.bootstrapui')
        .controller('PopoverDemoCtrl', PopoverDemoCtrl);

    function PopoverDemoCtrl() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.dynamicPopover = 'Hello, World!';
          vm.dynamicPopoverTitle = 'Title';
        }
    }
})();

/**=========================================================
 * Module: demo-progress.js
 * Provides a simple demo to animate progress bar
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.bootstrapui')
        .controller('ProgressDemoCtrl', ProgressDemoCtrl);

    function ProgressDemoCtrl() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.max = 200;

          vm.random = function() {
            var value = Math.floor((Math.random() * 100) + 1);
            var type;

            if (value < 25) {
              type = 'success';
            } else if (value < 50) {
              type = 'info';
            } else if (value < 75) {
              type = 'warning';
            } else {
              type = 'danger';
            }

            vm.showWarning = (type === 'danger' || type === 'warning');

            vm.dynamic = value;
            vm.type = type;
          };
          vm.random();

          vm.randomStacked = function() {
            vm.stacked = [];
            var types = ['success', 'info', 'warning', 'danger'];

            for (var i = 0, n = Math.floor((Math.random() * 4) + 1); i < n; i++) {
                var index = Math.floor((Math.random() * 4));
                vm.stacked.push({
                  value: Math.floor((Math.random() * 30) + 1),
                  type: types[index]
                });
            }
          };
          vm.randomStacked();
        }
    }
})();

/**=========================================================
 * Module: demo-rating.js
 * Provides a demo for ratings UI
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.bootstrapui')
        .controller('RatingDemoCtrl', RatingDemoCtrl);

    function RatingDemoCtrl() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.rate = 7;
          vm.max = 10;
          vm.isReadonly = false;

          vm.hoveringOver = function(value) {
            vm.overStar = value;
            vm.percent = 100 * (value / vm.max);
          };

          vm.ratingStates = [
            {stateOn: 'fa fa-check', stateOff: 'fa fa-check-circle'},
            {stateOn: 'fa fa-star', stateOff: 'fa fa-star-o'},
            {stateOn: 'fa fa-heart', stateOff: 'fa fa-ban'},
            {stateOn: 'fa fa-heart'},
            {stateOff: 'fa fa-power-off'}
          ];
        }
    }
})();

/**=========================================================
 * Module: demo-timepicker.js
 * Provides a simple demo for bootstrap ui timepicker
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.bootstrapui')
        .controller('TimepickerDemoCtrl', TimepickerDemoCtrl);

    function TimepickerDemoCtrl() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.mytime = new Date();

          vm.hstep = 1;
          vm.mstep = 15;

          vm.options = {
            hstep: [1, 2, 3],
            mstep: [1, 5, 10, 15, 25, 30]
          };

          vm.ismeridian = true;
          vm.toggleMode = function() {
            vm.ismeridian = ! vm.ismeridian;
          };

          vm.update = function() {
            var d = new Date();
            d.setHours( 14 );
            d.setMinutes( 0 );
            vm.mytime = d;
          };

          vm.changed = function () {
            console.log('Time changed to: ' + vm.mytime);
          };

          vm.clear = function() {
            vm.mytime = null;
          };
        }
    }
})();

/**=========================================================
 * Module: demo-tooltip.js
 * Provides a simple demo for tooltip
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.bootstrapui')
        .controller('TooltipDemoCtrl', TooltipDemoCtrl);

    function TooltipDemoCtrl() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.dynamicTooltip = 'Hello, World!';
          vm.dynamicTooltipText = 'dynamic';
          vm.htmlTooltip = 'I\'ve been made <b>bold</b>!';

          vm.autoplace = function (context, source) {
            //return (predictTooltipTop(source) < 0) ?  "bottom": "top";
            var pos = 'top';
            if(predictTooltipTop(source) < 0)
              pos = 'bottom';
            if(predictTooltipLeft(source) < 0)
              pos = 'right';
            return pos;
          };

            // Predicts tooltip top position 
            // based on the trigger element
            function predictTooltipTop(el) {
              var top = el.offsetTop;
              var height = 40; // asumes ~40px tooltip height

              while(el.offsetParent) {
                el = el.offsetParent;
                top += el.offsetTop;
              }
              return (top - height) - (window.pageYOffset);
            }

            // Predicts tooltip top position 
            // based on the trigger element
            function predictTooltipLeft(el) {
              var left = el.offsetLeft;
              var width = el.offsetWidth;

              while(el.offsetParent) {
                el = el.offsetParent;
                left += el.offsetLeft;
              }
              return (left - width) - (window.pageXOffset);
            }
        }
    }
})();

/**=========================================================
 * Module: demo-typeahead.js
 * Provides a simple demo for typeahead
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.bootstrapui')
        .controller('TypeaheadCtrl', TypeaheadCtrl);

    TypeaheadCtrl.$inject = ['$http'];
    function TypeaheadCtrl($http) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          vm.selected = undefined;
          vm.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

          // Any function returning a promise object can be used to load values asynchronously
          vm.getLocation = function(val) {
            return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
              params: {
                address: val,
                sensor: false
              }
            }).then(function(res){
              var addresses = [];
              angular.forEach(res.data.results, function(item){
                /*jshint -W106*/
                addresses.push(item.formatted_address);
              });
              return addresses;
            });
          };

          vm.statesWithFlags = [{'name':'Alabama','flag':'5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png'},{'name':'Alaska','flag':'e/e6/Flag_of_Alaska.svg/43px-Flag_of_Alaska.svg.png'},{'name':'Arizona','flag':'9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png'},{'name':'Arkansas','flag':'9/9d/Flag_of_Arkansas.svg/45px-Flag_of_Arkansas.svg.png'},{'name':'California','flag':'0/01/Flag_of_California.svg/45px-Flag_of_California.svg.png'},{'name':'Colorado','flag':'4/46/Flag_of_Colorado.svg/45px-Flag_of_Colorado.svg.png'},{'name':'Connecticut','flag':'9/96/Flag_of_Connecticut.svg/39px-Flag_of_Connecticut.svg.png'},{'name':'Delaware','flag':'c/c6/Flag_of_Delaware.svg/45px-Flag_of_Delaware.svg.png'},{'name':'Florida','flag':'f/f7/Flag_of_Florida.svg/45px-Flag_of_Florida.svg.png'},{'name':'Georgia','flag':'5/54/Flag_of_Georgia_%28U.S._state%29.svg/46px-Flag_of_Georgia_%28U.S._state%29.svg.png'},{'name':'Hawaii','flag':'e/ef/Flag_of_Hawaii.svg/46px-Flag_of_Hawaii.svg.png'},{'name':'Idaho','flag':'a/a4/Flag_of_Idaho.svg/38px-Flag_of_Idaho.svg.png'},{'name':'Illinois','flag':'0/01/Flag_of_Illinois.svg/46px-Flag_of_Illinois.svg.png'},{'name':'Indiana','flag':'a/ac/Flag_of_Indiana.svg/45px-Flag_of_Indiana.svg.png'},{'name':'Iowa','flag':'a/aa/Flag_of_Iowa.svg/44px-Flag_of_Iowa.svg.png'},{'name':'Kansas','flag':'d/da/Flag_of_Kansas.svg/46px-Flag_of_Kansas.svg.png'},{'name':'Kentucky','flag':'8/8d/Flag_of_Kentucky.svg/46px-Flag_of_Kentucky.svg.png'},{'name':'Louisiana','flag':'e/e0/Flag_of_Louisiana.svg/46px-Flag_of_Louisiana.svg.png'},{'name':'Maine','flag':'3/35/Flag_of_Maine.svg/45px-Flag_of_Maine.svg.png'},{'name':'Maryland','flag':'a/a0/Flag_of_Maryland.svg/45px-Flag_of_Maryland.svg.png'},{'name':'Massachusetts','flag':'f/f2/Flag_of_Massachusetts.svg/46px-Flag_of_Massachusetts.svg.png'},{'name':'Michigan','flag':'b/b5/Flag_of_Michigan.svg/45px-Flag_of_Michigan.svg.png'},{'name':'Minnesota','flag':'b/b9/Flag_of_Minnesota.svg/46px-Flag_of_Minnesota.svg.png'},{'name':'Mississippi','flag':'4/42/Flag_of_Mississippi.svg/45px-Flag_of_Mississippi.svg.png'},{'name':'Missouri','flag':'5/5a/Flag_of_Missouri.svg/46px-Flag_of_Missouri.svg.png'},{'name':'Montana','flag':'c/cb/Flag_of_Montana.svg/45px-Flag_of_Montana.svg.png'},{'name':'Nebraska','flag':'4/4d/Flag_of_Nebraska.svg/46px-Flag_of_Nebraska.svg.png'},{'name':'Nevada','flag':'f/f1/Flag_of_Nevada.svg/45px-Flag_of_Nevada.svg.png'},{'name':'New Hampshire','flag':'2/28/Flag_of_New_Hampshire.svg/45px-Flag_of_New_Hampshire.svg.png'},{'name':'New Jersey','flag':'9/92/Flag_of_New_Jersey.svg/45px-Flag_of_New_Jersey.svg.png'},{'name':'New Mexico','flag':'c/c3/Flag_of_New_Mexico.svg/45px-Flag_of_New_Mexico.svg.png'},{'name':'New York','flag':'1/1a/Flag_of_New_York.svg/46px-Flag_of_New_York.svg.png'},{'name':'North Carolina','flag':'b/bb/Flag_of_North_Carolina.svg/45px-Flag_of_North_Carolina.svg.png'},{'name':'North Dakota','flag':'e/ee/Flag_of_North_Dakota.svg/38px-Flag_of_North_Dakota.svg.png'},{'name':'Ohio','flag':'4/4c/Flag_of_Ohio.svg/46px-Flag_of_Ohio.svg.png'},{'name':'Oklahoma','flag':'6/6e/Flag_of_Oklahoma.svg/45px-Flag_of_Oklahoma.svg.png'},{'name':'Oregon','flag':'b/b9/Flag_of_Oregon.svg/46px-Flag_of_Oregon.svg.png'},{'name':'Pennsylvania','flag':'f/f7/Flag_of_Pennsylvania.svg/45px-Flag_of_Pennsylvania.svg.png'},{'name':'Rhode Island','flag':'f/f3/Flag_of_Rhode_Island.svg/32px-Flag_of_Rhode_Island.svg.png'},{'name':'South Carolina','flag':'6/69/Flag_of_South_Carolina.svg/45px-Flag_of_South_Carolina.svg.png'},{'name':'South Dakota','flag':'1/1a/Flag_of_South_Dakota.svg/46px-Flag_of_South_Dakota.svg.png'},{'name':'Tennessee','flag':'9/9e/Flag_of_Tennessee.svg/46px-Flag_of_Tennessee.svg.png'},{'name':'Texas','flag':'f/f7/Flag_of_Texas.svg/45px-Flag_of_Texas.svg.png'},{'name':'Utah','flag':'f/f6/Flag_of_Utah.svg/45px-Flag_of_Utah.svg.png'},{'name':'Vermont','flag':'4/49/Flag_of_Vermont.svg/46px-Flag_of_Vermont.svg.png'},{'name':'Virginia','flag':'4/47/Flag_of_Virginia.svg/44px-Flag_of_Virginia.svg.png'},{'name':'Washington','flag':'5/54/Flag_of_Washington.svg/46px-Flag_of_Washington.svg.png'},{'name':'West Virginia','flag':'2/22/Flag_of_West_Virginia.svg/46px-Flag_of_West_Virginia.svg.png'},{'name':'Wisconsin','flag':'2/22/Flag_of_Wisconsin.svg/45px-Flag_of_Wisconsin.svg.png'},{'name':'Wyoming','flag':'b/bc/Flag_of_Wyoming.svg/43px-Flag_of_Wyoming.svg.png'}];

        }
    }
})();

/**=========================================================
 * Module: chartist.js
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.charts')
        .controller('ChartistController', ChartistController);

    function ChartistController() {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          // Line chart
          // ----------------------------------- 

          vm.lineData = {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            series: [
              [12, 9, 7, 8, 5],
              [2, 1, 3.5, 7, 3],
              [1, 3, 4, 5, 6]
            ]
          };

          vm.lineOptions = {
            fullWidth: true,
            height: 220,
            chartPadding: {
              right: 40
            }
          };

          // Bar bipolar
          // ----------------------------------- 

          vm.barBipolarOptions = {
            high: 10,
            low: -10,
            height: 220,
            axisX: {
              labelInterpolationFnc: function(value, index) {
                return index % 2 === 0 ? value : null;
              }
            }
          };

          vm.barBipolarData = {
            labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
            series: [
              [1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
            ]
          };


          // Bar horizontal
          // ----------------------------------- 

          vm.barHorizontalData = {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            series: [
              [5, 4, 3, 7, 5, 10, 3],
              [3, 2, 9, 5, 4, 6, 4]
            ]
          };

          vm.barHorizontalOptions = {
            seriesBarDistance: 10,
            reverseData: true,
            horizontalBars: true,
            height: 220,
            axisY: {
              offset: 70
            }
          };

          // Smil Animations
          // ----------------------------------- 

          // Let's put a sequence number aside so we can use it in the event callbacks
          var seq = 0,
            delays = 80,
            durations = 500;

          vm.smilData = {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            series: [
              [12, 9, 7, 8, 5, 4, 6, 2, 3, 3, 4, 6],
              [4,  5, 3, 7, 3, 5, 5, 3, 4, 4, 5, 5],
              [5,  3, 4, 5, 6, 3, 3, 4, 5, 6, 3, 4],
              [3,  4, 5, 6, 7, 6, 4, 5, 6, 7, 6, 3]
            ]
          };

          vm.smilOptions = {
            low: 0,
            height: 260
          };

          vm.smilEvents = {
            created: function() {
              seq = 0;
            },
            draw: function(data) {
              seq++;

              if(data.type === 'line') {
                // If the drawn element is a line we do a simple opacity fade in. This could also be achieved using CSS3 animations.
                data.element.animate({
                  opacity: {
                    // The delay when we like to start the animation
                    begin: seq * delays + 1000,
                    // Duration of the animation
                    dur: durations,
                    // The value where the animation should start
                    from: 0,
                    // The value where it should end
                    to: 1
                  }
                });
              } else if(data.type === 'label' && data.axis === 'x') {
                data.element.animate({
                  y: {
                    begin: seq * delays,
                    dur: durations,
                    from: data.y + 100,
                    to: data.y,
                    // We can specify an easing function from Chartist.Svg.Easing
                    easing: 'easeOutQuart'
                  }
                });
              } else if(data.type === 'label' && data.axis === 'y') {
                data.element.animate({
                  x: {
                    begin: seq * delays,
                    dur: durations,
                    from: data.x - 100,
                    to: data.x,
                    easing: 'easeOutQuart'
                  }
                });
              } else if(data.type === 'point') {
                data.element.animate({
                  x1: {
                    begin: seq * delays,
                    dur: durations,
                    from: data.x - 10,
                    to: data.x,
                    easing: 'easeOutQuart'
                  },
                  x2: {
                    begin: seq * delays,
                    dur: durations,
                    from: data.x - 10,
                    to: data.x,
                    easing: 'easeOutQuart'
                  },
                  opacity: {
                    begin: seq * delays,
                    dur: durations,
                    from: 0,
                    to: 1,
                    easing: 'easeOutQuart'
                  }
                });
              } 
            }
          };


          // SVG PATH animation
          // ----------------------------------- 

          vm.pathData = {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            series: [
              [1, 5, 2, 5, 4, 3],
              [2, 3, 4, 8, 1, 2],
              [5, 4, 3, 2, 1, 0.5]
            ]
          };

          vm.pathOptions = {
            low: 0,
            showArea: true,
            showPoint: false,
            fullWidth: true,
            height: 260
          };

          vm.pathEvents = {
            draw: function(data) {
              if(data.type === 'line' || data.type === 'area') {
                data.element.animate({
                  d: {
                    begin: 2000 * data.index,
                    dur: 2000,
                    from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                    to: data.path.clone().stringify(),
                    easing: Chartist.Svg.Easing.easeOutQuint
                  }
                });
              }
            }
          };

        }
    }
})();


/**=========================================================
 * Module: chart.controller.js
 * Controller for ChartJs
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.charts')
        .controller('ChartJSController', ChartJSController);

    ChartJSController.$inject = ['Colors'];
    function ChartJSController(Colors) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          // random values for demo
          var rFactor = function(){ return Math.round(Math.random()*100); };

          // Line chart
          // ----------------------------------- 

          vm.lineData = {
              labels : ['January','February','March','April','May','June','July'],
              datasets : [
                {
                  label: 'My First dataset',
                  fillColor : 'rgba(114,102,186,0.2)',
                  strokeColor : 'rgba(114,102,186,1)',
                  pointColor : 'rgba(114,102,186,1)',
                  pointStrokeColor : '#fff',
                  pointHighlightFill : '#fff',
                  pointHighlightStroke : 'rgba(114,102,186,1)',
                  data : [rFactor(),rFactor(),rFactor(),rFactor(),rFactor(),rFactor(),rFactor()]
                },
                {
                  label: 'My Second dataset',
                  fillColor : 'rgba(35,183,229,0.2)',
                  strokeColor : 'rgba(35,183,229,1)',
                  pointColor : 'rgba(35,183,229,1)',
                  pointStrokeColor : '#fff',
                  pointHighlightFill : '#fff',
                  pointHighlightStroke : 'rgba(35,183,229,1)',
                  data : [rFactor(),rFactor(),rFactor(),rFactor(),rFactor(),rFactor(),rFactor()]
                }
              ]
            };


          vm.lineOptions = {
            scaleShowGridLines : true,
            scaleGridLineColor : 'rgba(0,0,0,.05)',
            scaleGridLineWidth : 1,
            bezierCurve : true,
            bezierCurveTension : 0.4,
            pointDot : true,
            pointDotRadius : 4,
            pointDotStrokeWidth : 1,
            pointHitDetectionRadius : 20,
            datasetStroke : true,
            datasetStrokeWidth : 2,
            datasetFill : true,
          };


          // Bar chart
          // ----------------------------------- 

          vm.barData = {
              labels : ['January','February','March','April','May','June','July'],
              datasets : [
                {
                  fillColor : Colors.byName('info'),
                  strokeColor : Colors.byName('info'),
                  highlightFill: Colors.byName('info'),
                  highlightStroke: Colors.byName('info'),
                  data : [rFactor(),rFactor(),rFactor(),rFactor(),rFactor(),rFactor(),rFactor()]
                },
                {
                  fillColor : Colors.byName('primary'),
                  strokeColor : Colors.byName('primary'),
                  highlightFill : Colors.byName('primary'),
                  highlightStroke : Colors.byName('primary'),
                  data : [rFactor(),rFactor(),rFactor(),rFactor(),rFactor(),rFactor(),rFactor()]
                }
              ]
          };
          
          vm.barOptions = {
            scaleBeginAtZero : true,
            scaleShowGridLines : true,
            scaleGridLineColor : 'rgba(0,0,0,.05)',
            scaleGridLineWidth : 1,
            barShowStroke : true,
            barStrokeWidth : 2,
            barValueSpacing : 5,
            barDatasetSpacing : 1,
          };


          //  Doughnut chart
          // ----------------------------------- 
          
          vm.doughnutData = [
                {
                  value: 300,
                  color: Colors.byName('purple'),
                  highlight: Colors.byName('purple'),
                  label: 'Purple'
                },
                {
                  value: 50,
                  color: Colors.byName('info'),
                  highlight: Colors.byName('info'),
                  label: 'Info'
                },
                {
                  value: 100,
                  color: Colors.byName('yellow'),
                  highlight: Colors.byName('yellow'),
                  label: 'Yellow'
                }
              ];

          vm.doughnutOptions = {
            segmentShowStroke : true,
            segmentStrokeColor : '#fff',
            segmentStrokeWidth : 2,
            percentageInnerCutout : 85,
            animationSteps : 100,
            animationEasing : 'easeOutBounce',
            animateRotate : true,
            animateScale : false
          };

          // Pie chart
          // ----------------------------------- 

          vm.pieData =[
                {
                  value: 300,
                  color: Colors.byName('purple'),
                  highlight: Colors.byName('purple'),
                  label: 'Purple'
                },
                {
                  value: 40,
                  color: Colors.byName('yellow'),
                  highlight: Colors.byName('yellow'),
                  label: 'Yellow'
                },
                {
                  value: 120,
                  color: Colors.byName('info'),
                  highlight: Colors.byName('info'),
                  label: 'Info'
                }
              ];

          vm.pieOptions = {
            segmentShowStroke : true,
            segmentStrokeColor : '#fff',
            segmentStrokeWidth : 2,
            percentageInnerCutout : 0, // Setting this to zero convert a doughnut into a Pie
            animationSteps : 100,
            animationEasing : 'easeOutBounce',
            animateRotate : true,
            animateScale : false
          };

          // Polar chart
          // ----------------------------------- 
          
          vm.polarData = [
                {
                  value: 300,
                  color: Colors.byName('pink'),
                  highlight: Colors.byName('pink'),
                  label: 'Red'
                },
                {
                  value: 50,
                  color: Colors.byName('purple'),
                  highlight: Colors.byName('purple'),
                  label: 'Green'
                },
                {
                  value: 100,
                  color: Colors.byName('pink'),
                  highlight: Colors.byName('pink'),
                  label: 'Yellow'
                },
                {
                  value: 140,
                  color: Colors.byName('purple'),
                  highlight: Colors.byName('purple'),
                  label: 'Grey'
                },
              ];

          vm.polarOptions = {
            scaleShowLabelBackdrop : true,
            scaleBackdropColor : 'rgba(255,255,255,0.75)',
            scaleBeginAtZero : true,
            scaleBackdropPaddingY : 1,
            scaleBackdropPaddingX : 1,
            scaleShowLine : true,
            segmentShowStroke : true,
            segmentStrokeColor : '#fff',
            segmentStrokeWidth : 2,
            animationSteps : 100,
            animationEasing : 'easeOutBounce',
            animateRotate : true,
            animateScale : false
          };


          // Radar chart
          // ----------------------------------- 

          vm.radarData = {
            labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
            datasets: [
              {
                label: 'My First dataset',
                fillColor: 'rgba(114,102,186,0.2)',
                strokeColor: 'rgba(114,102,186,1)',
                pointColor: 'rgba(114,102,186,1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(114,102,186,1)',
                data: [65,59,90,81,56,55,40]
              },
              {
                label: 'My Second dataset',
                fillColor: 'rgba(151,187,205,0.2)',
                strokeColor: 'rgba(151,187,205,1)',
                pointColor: 'rgba(151,187,205,1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(151,187,205,1)',
                data: [28,48,40,19,96,27,100]
              }
            ]
          };

          vm.radarOptions = {
            scaleShowLine : true,
            angleShowLineOut : true,
            scaleShowLabels : false,
            scaleBeginAtZero : true,
            angleLineColor : 'rgba(0,0,0,.1)',
            angleLineWidth : 1,
            /*jshint -W109*/
            pointLabelFontFamily : "'Arial'",
            pointLabelFontStyle : 'bold',
            pointLabelFontSize : 10,
            pointLabelFontColor : '#565656',
            pointDot : true,
            pointDotRadius : 3,
            pointDotStrokeWidth : 1,
            pointHitDetectionRadius : 20,
            datasetStroke : true,
            datasetStrokeWidth : 2,
            datasetFill : true
          };
        }
    }
})();

/**=========================================================
 * Module: chart.js
 * Wrapper directive for chartJS. 
 * Based on https://gist.github.com/AndreasHeiberg/9837868
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.charts')
        /* Aliases for various chart types */
        .directive('linechart',     chartJS('Line')      )
        .directive('barchart',      chartJS('Bar')       )
        .directive('radarchart',    chartJS('Radar')     )
        .directive('polarchart',    chartJS('PolarArea') )
        .directive('piechart',      chartJS('Pie')       )
        .directive('doughnutchart', chartJS('Doughnut')  )
        .directive('donutchart',    chartJS('Doughnut')  )
        ;

    function chartJS(type) {
        return function() {
            return {
                restrict: 'A',
                scope: {
                    data: '=',
                    options: '=',
                    id: '@',
                    width: '=',
                    height: '=',
                    resize: '=',
                    chart: '@',
                    segments: '@',
                    responsive: '=',
                    tooltip: '=',
                    legend: '='
                },
                link: function ($scope, $elem) {
                    var ctx = $elem[0].getContext('2d');
                    var autosize = false;

                    $scope.size = function () {
                        if ($scope.width <= 0) {
                            $elem.width($elem.parent().width());
                            ctx.canvas.width = $elem.width();
                        } else {
                            ctx.canvas.width = $scope.width || ctx.canvas.width;
                            autosize = true;
                        }

                        if($scope.height <= 0){
                            $elem.height($elem.parent().height());
                            ctx.canvas.height = ctx.canvas.width / 2;
                        } else {
                            ctx.canvas.height = $scope.height || ctx.canvas.height;
                            autosize = true;
                        }
                    };

                    $scope.$watch('data', function (newVal) {
                        if(chartCreated)
                            chartCreated.destroy();

                        // if data not defined, exit
                        if (!newVal) {
                            return;
                        }
                        if ($scope.chart) { type = $scope.chart; }

                        if(autosize){
                            $scope.size();
                            chart = new Chart(ctx);
                        }

                        if($scope.responsive || $scope.resize)
                            $scope.options.responsive = true;

                        if($scope.responsive !== undefined)
                            $scope.options.responsive = $scope.responsive;

                        chartCreated = chart[type]($scope.data, $scope.options);
                        chartCreated.update();
                        if($scope.legend)
                            angular.element($elem[0]).parent().after( chartCreated.generateLegend() );
                    }, true);

                    $scope.$watch('tooltip', function (newVal) {
                        if (chartCreated)
                            chartCreated.draw();
                        if(newVal===undefined || !chartCreated.segments)
                            return;
                        if(!isFinite(newVal) || newVal >= chartCreated.segments.length || newVal < 0)
                            return;
                        var activeSegment = chartCreated.segments[newVal];
                        activeSegment.save();
                        activeSegment.fillColor = activeSegment.highlightColor;
                        chartCreated.showTooltip([activeSegment]);
                        activeSegment.restore();
                    }, true);

                    $scope.size();
                    var chart = new Chart(ctx);
                    var chartCreated;

                    $scope.$on('$destroy', function() {
                        if(chartCreated)
                            chartCreated.destroy();
                    });
                }
            };
        };
    }
})();





/**=========================================================
 * Module: classy-loader.js
 * Enable use of classyloader directly from data attributes
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.charts')
        .directive('classyloader', classyloader);

    classyloader.$inject = ['$timeout', 'Utils', '$window'];
    function classyloader ($timeout, Utils, $window) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          var $scroller       = $($window),
              inViewFlagClass = 'js-is-in-view'; // a classname to detect when a chart has been triggered after scroll

          // run after interpolation  
          $timeout(function(){
      
            var $element = $(element),
                options  = $element.data();
            
            // At lease we need a data-percentage attribute
            if(options) {
              if( options.triggerInView ) {

                $scroller.scroll(function() {
                  checkLoaderInVIew($element, options);
                });
                // if the element starts already in view
                checkLoaderInVIew($element, options);
              }
              else
                startLoader($element, options);
            }

          }, 0);

          function checkLoaderInVIew(element, options) {
            var offset = -20;
            if( ! element.hasClass(inViewFlagClass) &&
                Utils.isInView(element, {topoffset: offset}) ) {
              startLoader(element, options);
            }
          }
          function startLoader(element, options) {
            element.ClassyLoader(options).addClass(inViewFlagClass);
          }
        }
    }

})();

(function() {
    'use strict';

    angular
        .module('app.charts')
        .service('ChartData', ChartData);

    ChartData.$inject = ['$resource'];
    function ChartData($resource) {
        this.load = load;

        ////////////////
      
        var opts = {
            get: { method: 'GET', isArray: true }
          };
        function load(source) {
          return $resource(source, {}, opts).get();
        }
    }
})();

/**=========================================================
 * Module: flot-chart.js
 * Setup options and data for flot chart directive
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.charts')
        .controller('FlotChartController', FlotChartController);

    FlotChartController.$inject = ['$scope', 'ChartData', '$timeout'];
    function FlotChartController($scope, ChartData, $timeout) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          // BAR
          // -----------------------------------
          vm.barData = ChartData.load('server/chart/bar.json');
          vm.barOptions = {
              series: {
                  bars: {
                      align: 'center',
                      lineWidth: 0,
                      show: true,
                      barWidth: 0.6,
                      fill: 0.9
                  }
              },
              grid: {
                  borderColor: '#eee',
                  borderWidth: 1,
                  hoverable: true,
                  backgroundColor: '#fcfcfc'
              },
              tooltip: true,
              tooltipOpts: {
                  content: function (label, x, y) { return x + ' : ' + y; }
              },
              xaxis: {
                  tickColor: '#fcfcfc',
                  mode: 'categories'
              },
              yaxis: {
                  position: ($scope.app.layout.isRTL ? 'right' : 'left'),
                  tickColor: '#eee'
              },
              shadowSize: 0
          };

          // BAR STACKED
          // -----------------------------------
          vm.barStackeData = ChartData.load('server/chart/barstacked.json');
          vm.barStackedOptions = {
              series: {
                  stack: true,
                  bars: {
                      align: 'center',
                      lineWidth: 0,
                      show: true,
                      barWidth: 0.6,
                      fill: 0.9
                  }
              },
              grid: {
                  borderColor: '#eee',
                  borderWidth: 1,
                  hoverable: true,
                  backgroundColor: '#fcfcfc'
              },
              tooltip: true,
              tooltipOpts: {
                  content: function (label, x, y) { return x + ' : ' + y; }
              },
              xaxis: {
                  tickColor: '#fcfcfc',
                  mode: 'categories'
              },
              yaxis: {
                  min: 0,
                  max: 200, // optional: use it for a clear represetation
                  position: ($scope.app.layout.isRTL ? 'right' : 'left'),
                  tickColor: '#eee'
              },
              shadowSize: 0
          };

          // SPLINE
          // -----------------------------------
          vm.splineData = ChartData.load('server/chart/spline.json');
          vm.splineOptions = {
              series: {
                  lines: {
                      show: false
                  },
                  points: {
                      show: true,
                      radius: 4
                  },
                  splines: {
                      show: true,
                      tension: 0.4,
                      lineWidth: 1,
                      fill: 0.5
                  }
              },
              grid: {
                  borderColor: '#eee',
                  borderWidth: 1,
                  hoverable: true,
                  backgroundColor: '#fcfcfc'
              },
              tooltip: true,
              tooltipOpts: {
                  content: function (label, x, y) { return x + ' : ' + y; }
              },
              xaxis: {
                  tickColor: '#fcfcfc',
                  mode: 'categories'
              },
              yaxis: {
                  min: 0,
                  max: 150, // optional: use it for a clear represetation
                  tickColor: '#eee',
                  position: ($scope.app.layout.isRTL ? 'right' : 'left'),
                  tickFormatter: function (v) {
                      return v/* + ' visitors'*/;
                  }
              },
              shadowSize: 0
          };

          // AREA
          // -----------------------------------
          vm.areaData = ChartData.load('server/chart/area.json');
          vm.areaOptions = {
              series: {
                  lines: {
                      show: true,
                      fill: 0.8
                  },
                  points: {
                      show: true,
                      radius: 4
                  }
              },
              grid: {
                  borderColor: '#eee',
                  borderWidth: 1,
                  hoverable: true,
                  backgroundColor: '#fcfcfc'
              },
              tooltip: true,
              tooltipOpts: {
                  content: function (label, x, y) { return x + ' : ' + y; }
              },
              xaxis: {
                  tickColor: '#fcfcfc',
                  mode: 'categories'
              },
              yaxis: {
                  min: 0,
                  tickColor: '#eee',
                  position: ($scope.app.layout.isRTL ? 'right' : 'left'),
                  tickFormatter: function (v) {
                      return v + ' visitors';
                  }
              },
              shadowSize: 0
          };

          // LINE
          // -----------------------------------
          vm.lineData = ChartData.load('server/chart/line.json');
          vm.lineOptions = {
              series: {
                  lines: {
                      show: true,
                      fill: 0.01
                  },
                  points: {
                      show: true,
                      radius: 4
                  }
              },
              grid: {
                  borderColor: '#eee',
                  borderWidth: 1,
                  hoverable: true,
                  backgroundColor: '#fcfcfc'
              },
              tooltip: true,
              tooltipOpts: {
                  content: function (label, x, y) { return x + ' : ' + y; }
              },
              xaxis: {
                  tickColor: '#eee',
                  mode: 'categories'
              },
              yaxis: {
                  position: ($scope.app.layout.isRTL ? 'right' : 'left'),
                  tickColor: '#eee'
              },
              shadowSize: 0
          };

          // PIE
          // -----------------------------------
          vm.pieData = [{
              "label": "jQuery",
              "color": "#4acab4",
              "data": 30
            }, {
              "label": "CSS",
              "color": "#ffea88",
              "data": 40
            }, {
              "label": "LESS",
              "color": "#ff8153",
              "data": 90
            }, {
              "label": "SASS",
              "color": "#878bb6",
              "data": 75
            }, {
              "label": "Jade",
              "color": "#b2d767",
              "data": 120
            }];
          // Direct data temporarily added until fix: https://github.com/flot/flot/pull/1462
          // ChartData.load('server/chart/pie.json');

          vm.pieOptions = {
              series: {
                  pie: {
                      show: true,
                      innerRadius: 0,
                      label: {
                          show: true,
                          radius: 0.8,
                          formatter: function (label, series) {
                              return '<div class="flot-pie-label">' +
                              //label + ' : ' +
                              Math.round(series.percent) +
                              '%</div>';
                          },
                          background: {
                              opacity: 0.8,
                              color: '#222'
                          }
                      }
                  }
              }
          };

          // DONUT
          // -----------------------------------
          vm.donutData = [ { "color" : "#39C558",
                "data" : 60,
                "label" : "Coffee"
              },
              { "color" : "#00b4ff",
                "data" : 90,
                "label" : "CSS"
              },
              { "color" : "#FFBE41",
                "data" : 50,
                "label" : "LESS"
              },
              { "color" : "#ff3e43",
                "data" : 80,
                "label" : "Jade"
              },
              { "color" : "#937fc7",
                "data" : 116,
                "label" : "AngularJS"
              }
            ];
          // Direct data temporarily added until fix: https://github.com/flot/flot/pull/1462
          // ChartData.load('server/chart/donut.json');

          vm.donutOptions = {
              series: {
                  pie: {
                      show: true,
                      innerRadius: 0.5 // This makes the donut shape
                  }
              }
          };

          // REALTIME
          // -----------------------------------
          vm.realTimeOptions = {
              series: {
                lines: { show: true, fill: true, fillColor:  { colors: ['#a0e0f3', '#23b7e5'] } },
                shadowSize: 0 // Drawing is faster without shadows
              },
              grid: {
                  show:false,
                  borderWidth: 0,
                  minBorderMargin: 20,
                  labelMargin: 10
              },
              xaxis: {
                tickFormatter: function() {
                    return '';
                }
              },
              yaxis: {
                  min: 0,
                  max: 110
              },
              legend: {
                  show: true
              },
              colors: ['#23b7e5']
          };

          // Generate random data for realtime demo
          var data = [], totalPoints = 300;

          update();

          function getRandomData() {
            if (data.length > 0)
              data = data.slice(1);
            // Do a random walk
            while (data.length < totalPoints) {
              var prev = data.length > 0 ? data[data.length - 1] : 50,
                y = prev + Math.random() * 10 - 5;
              if (y < 0) {
                y = 0;
              } else if (y > 100) {
                y = 100;
              }
              data.push(y);
            }
            // Zip the generated y values with the x values
            var res = [];
            for (var i = 0; i < data.length; ++i) {
              res.push([i, data[i]]);
            }
            return [res];
          }
          function update() {
            vm.realTimeData = getRandomData();
            $timeout(update, 30);
          }
          // end random data generation


          // PANEL REFRESH EVENTS
          // -----------------------------------

          $scope.$on('panel-refresh', function(event, id) {

            console.log('Simulating chart refresh during 3s on #'+id);

            // Instead of timeout you can request a chart data
            $timeout(function(){

              // directive listen for to remove the spinner
              // after we end up to perform own operations
              $scope.$broadcast('removeSpinner', id);

              console.log('Refreshed #' + id);

            }, 3000);

          });


          // PANEL DISMISS EVENTS
          // -----------------------------------

          // Before remove panel
          $scope.$on('panel-remove', function(event, id, deferred){

            console.log('Panel #' + id + ' removing');

            // Here is obligatory to call the resolve() if we pretend to remove the panel finally
            // Not calling resolve() will NOT remove the panel
            // It's up to your app to decide if panel should be removed or not
            deferred.resolve();

          });

          // Panel removed ( only if above was resolved() )
          $scope.$on('panel-removed', function(event, id){

            console.log('Panel #' + id + ' removed');

          });

        }
    }
})();

/**=========================================================
 * Module: flot.js
 * Initializes the Flot chart plugin and handles data refresh
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.charts')
        .directive('flot', flot);

    flot.$inject = ['$http', '$timeout'];
    function flot ($http, $timeout) {

        var directive = {
          restrict: 'EA',
          template: '<div></div>',
          scope: {
            dataset: '=?',
            options: '=',
            series: '=',
            callback: '=',
            src: '='
          },
          link: link
        };
        return directive;

        function link(scope, element, attrs) {
          var height, plot, plotArea, width;
          var heightDefault = 220;

          plot = null;

          width = attrs.width || '100%';
          height = attrs.height || heightDefault;

          plotArea = $(element.children()[0]);
          plotArea.css({
            width: width,
            height: height
          });

          function init() {
            var plotObj;
            if(!scope.dataset || !scope.options) return;
            plotObj = $.plot(plotArea, scope.dataset, scope.options);
            scope.$emit('plotReady', plotObj);
            if (scope.callback) {
              scope.callback(plotObj, scope);
            }

            return plotObj;
          }

          function onDatasetChanged(dataset) {
            if (plot) {
              plot.setData(dataset);
              plot.setupGrid();
              return plot.draw();
            } else {
              plot = init();
              onSerieToggled(scope.series);
              return plot;
            }
          }
          scope.$watchCollection('dataset', onDatasetChanged, true);

          function onSerieToggled (series) {
            if( !plot || !series ) return;
            var someData = plot.getData();
            for(var sName in series) {
              angular.forEach(series[sName], toggleFor(sName));
            }
            
            plot.setData(someData);
            plot.draw();
            
            function toggleFor(sName) {
              return function (s, i){
                if(someData[i] && someData[i][sName])
                  someData[i][sName].show = s;
              };
            }
          }
          scope.$watch('series', onSerieToggled, true);
          
          function onSrcChanged(src) {

            if( src ) {

              $http.get(src)
                .success(function (data) {

                  $timeout(function(){
                    scope.dataset = data;
                  });

              }).error(function(){
                $.error('Flot chart: Bad request.');
              });
              
            }
          }
          scope.$watch('src', onSrcChanged);

        }
    }


})();

/**=========================================================
 * Module: morris.js
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.charts')
        .controller('ChartMorrisController', ChartMorrisController);

    ChartMorrisController.$inject = ['$timeout', 'Colors'];
    function ChartMorrisController($timeout, Colors) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
         vm.chartdata = [
              { y: '2006', a: 100, b: 90 },
              { y: '2007', a: 75,  b: 65 },
              { y: '2008', a: 50,  b: 40 },
              { y: '2009', a: 75,  b: 65 },
              { y: '2010', a: 50,  b: 40 },
              { y: '2011', a: 75,  b: 65 },
              { y: '2012', a: 100, b: 90 }
          ];

          /* test data update
          $timeout(function(){
            vm.chartdata[0].a = 50;
            vm.chartdata[0].b = 50;
          }, 3000); */

          vm.donutdata = [
            {label: 'Download Sales', value: 12},
            {label: 'In-Store Sales',value: 30},
            {label: 'Mail-Order Sales', value: 20}
          ];

          vm.donutOptions = {
            Colors: [ Colors.byName('danger'), Colors.byName('yellow'), Colors.byName('warning') ],
            resize: true
          };

          vm.barOptions = {
            xkey: 'y',
            ykeys: ['a', 'b'],
            labels: ['Series A', 'Series B'],
            xLabelMargin: 2,
            barColors: [ Colors.byName('info'), Colors.byName('danger') ],
            resize: true
          };

          vm.lineOptions = {
            xkey: 'y',
            ykeys: ['a', 'b'],
            labels: ['Serie A', 'Serie B'],
            lineColors: ['#31C0BE', '#7a92a3'],
            resize: true
          };

          vm.areaOptions = {
            xkey: 'y',
            ykeys: ['a', 'b'],
            labels: ['Serie A', 'Serie B'],
            lineColors: [ Colors.byName('purple'), Colors.byName('info') ],
            resize: true
          };

        }
    }
})();

/**=========================================================
 * Module: morris.js
 * AngularJS Directives for Morris Charts
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.charts')
        .directive('morrisBar',   morrisChart('Bar')   )
        .directive('morrisDonut', morrisChart('Donut') )
        .directive('morrisLine',  morrisChart('Line')  )
        .directive('morrisArea',  morrisChart('Area')  );

    function morrisChart(type) {
      return function () {
        return {
          restrict: 'EA',
          scope: {
            morrisData: '=',
            morrisOptions: '='
          },
          link: function($scope, element) {
            // start ready to watch for changes in data
            $scope.$watch('morrisData', function(newVal) {
              if (newVal) {
                $scope.morrisInstance.setData(newVal);
                $scope.morrisInstance.redraw();
              }
            }, true);
            // the element that contains the chart
            $scope.morrisOptions.element = element;
            // If data defined copy to options
            if($scope.morrisData)
              $scope.morrisOptions.data = $scope.morrisData;
            // Init chart
            $scope.morrisInstance = new Morris[type]($scope.morrisOptions);

          }
        };
      };
    }

})();

/**=========================================================
 * Module: PieChartsController.js
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.charts')
        .controller('PieChartsController', PieChartsController);

    /*jshint -W069*/
    PieChartsController.$inject = ['Colors'];

    function PieChartsController(Colors) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          // KNOB Charts

          vm.knobLoaderData1 = 80;
          vm.knobLoaderOptions1 = {
              width: '50%', // responsive
              displayInput: true,
              fgColor: Colors.byName('info')
            };

          vm.knobLoaderData2 = 45;
          vm.knobLoaderOptions2 = {
              width: '50%', // responsive
              displayInput: true,
              fgColor: Colors.byName('purple'),
              readOnly : true
            };

          vm.knobLoaderData3 = 30;
          vm.knobLoaderOptions3 = {
              width: '50%', // responsive
              displayInput: true,
              fgColor: Colors.byName('pink'),
              displayPrevious : true,
              thickness : 0.1,
              lineCap : 'round'
            };

          vm.knobLoaderData4 = 20;
          vm.knobLoaderOptions4 = {
              width: '50%', // responsive
              displayInput: true,
              fgColor: Colors.byName('info'),
              bgColor: Colors.byName('gray'),
              angleOffset: -125,
              angleArc: 250
            };

          // Easy Pie Charts

          vm.piePercent1 = 85;
          vm.piePercent2 = 45;
          vm.piePercent3 = 25;
          vm.piePercent4 = 60;

          vm.pieOptions1 = {
              animate:{
                  duration: 800,
                  enabled: true
              },
              barColor: Colors.byName('success'),
              trackColor: false,
              scaleColor: false,
              lineWidth: 10,
              lineCap: 'circle'
          };

          vm.pieOptions2= {
              animate:{
                  duration: 800,
                  enabled: true
              },
              barColor: Colors.byName('warning'),
              trackColor: false,
              scaleColor: false,
              lineWidth: 4,
              lineCap: 'circle'
          };

          vm.pieOptions3 = {
              animate:{
                  duration: 800,
                  enabled: true
              },
              barColor: Colors.byName('danger'),
              trackColor: false,
              scaleColor: Colors.byName('gray'),
              lineWidth: 15,
              lineCap: 'circle'
          };

          vm.pieOptions4 = {
              animate:{
                  duration: 800,
                  enabled: true
              },
              barColor: Colors.byName('danger'),
              trackColor: Colors.byName('yellow'),
              scaleColor: Colors.byName('gray-dark'),
              lineWidth: 15,
              lineCap: 'circle'
          };

          vm.randomize = function(type) {
            if ( type === 'easy') {
              vm.piePercent1 = random();
              vm.piePercent2 = random();
              vm.piePercent3 = random();
              vm.piePercent4 = random();
            }
            if ( type === 'knob') {
              vm.knobLoaderData1 = random();
              vm.knobLoaderData2 = random();
              vm.knobLoaderData3 = random();
              vm.knobLoaderData4 = random();
            }
          }

          function random() { return Math.floor((Math.random() * 100) + 1); }

        }
    }
})();

/**=========================================================
 * Module: rickshaw.js
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.charts')
        .controller('ChartRickshawController', ChartRickshawController);

    function ChartRickshawController() {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          vm.renderers = [{
                  id: 'area',
                  name: 'Area'
              }, {
                  id: 'line',
                  name: 'Line'
              }, {
                  id: 'bar',
                  name: 'Bar'
              }, {
                  id: 'scatterplot',
                  name: 'Scatterplot'
              }];

          vm.palettes = [
              'spectrum14',
              'spectrum2000',
              'spectrum2001',
              'colorwheel',
              'cool',
              'classic9',
              'munin'
          ];

          vm.rendererChanged = function(id) {
              vm['options' + id] = {
                  renderer: vm['renderer' + id].id
              };
          };

          vm.paletteChanged = function(id) {
              vm['features' + id] = {
                  palette: vm['palette' + id]
              };
          };

          vm.changeSeriesData = function(id) {
              var seriesList = [];
              for (var i = 0; i < 3; i++) {
                  var series = {
                      name: 'Series ' + (i + 1),
                      data: []
                  };
                  for (var j = 0; j < 10; j++) {
                      series.data.push({x: j, y: Math.random() * 20});
                  }
                  seriesList.push(series);
                  vm['series' + id][i] = series;
              }
              //vm['series' + id] = seriesList;
          };

          vm.series0 = [];

          vm.options0 = {
            renderer: 'area'
          };

          vm.renderer0 = vm.renderers[0];
          vm.palette0 = vm.palettes[0];

          vm.rendererChanged(0);
          vm.paletteChanged(0);
          vm.changeSeriesData(0);  

          // Graph 2

          var seriesData = [ [], [], [] ];
          var random = new Rickshaw.Fixtures.RandomData(150);

          for (var i = 0; i < 150; i++) {
            random.addData(seriesData);
          }

          vm.series2 = [
            {
              color: '#c05020',
              data: seriesData[0],
              name: 'New York'
            }, {
              color: '#30c020',
              data: seriesData[1],
              name: 'London'
            }, {
              color: '#6060c0',
              data: seriesData[2],
              name: 'Tokyo'
            }
          ];

          vm.options2 = {
            renderer: 'area'
          };

        }
    }
})();

/**=========================================================
 * Module: sparkline.js
 * SparkLines Mini Charts
 =========================================================*/
 
(function() {
    'use strict';

    angular
        .module('app.charts')
        .directive('sparkline', sparkline);

    function sparkline () {
        var directive = {
            restrict: 'EA',
            scope: {
              'sparkline': '='
            },
            controller: Controller
        };
        return directive;

    }
    Controller.$inject = ['$scope', '$element', '$timeout', '$window'];
    function Controller($scope, $element, $timeout, $window) {
      var runSL = function(){
        initSparLine();
      };

      $timeout(runSL);
  
      function initSparLine() {
        var options = $scope.sparkline,
            data = $element.data();
        
        if(!options) // if no scope options, try with data attributes
          options = data;
        else
          if(data) // data attributes overrides scope options
            options = angular.extend({}, options, data);

        options.type = options.type || 'bar'; // default chart is bar
        options.disableHiddenCheck = true;

        $element.sparkline('html', options);

        if(options.resize) {
          $($window).resize(function(){
            $element.sparkline('html', options);
          });
        }
      }

    }
    

})();


(function() {
    'use strict';

    angular
        .module('app.elements')
        .controller('AngularCarouselController', AngularCarouselController);

    function AngularCarouselController() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.colors = ['#fc0003', '#f70008', '#f2000d', '#ed0012', '#e80017', '#e3001c', '#de0021', '#d90026', '#d4002b', '#cf0030', '#c90036', '#c4003b', '#bf0040', '#ba0045', '#b5004a', '#b0004f', '#ab0054', '#a60059', '#a1005e', '#9c0063', '#960069', '#91006e', '#8c0073', '#870078', '#82007d', '#7d0082', '#780087', '#73008c', '#6e0091', '#690096', '#63009c', '#5e00a1', '#5900a6', '#5400ab', '#4f00b0', '#4a00b5', '#4500ba', '#4000bf', '#3b00c4', '#3600c9', '#3000cf', '#2b00d4', '#2600d9', '#2100de', '#1c00e3', '#1700e8', '#1200ed', '#0d00f2', '#0800f7', '#0300fc'];

          function getSlide(target, style) {
              var i = target.length;
              return {
                  id: (i + 1),
                  label: 'slide #' + (i + 1),
                  img: 'http://lorempixel.com/1200/500/' + style + '/' + ((i + 1) % 10) ,
                  color: vm.colors[ (i*10) % vm.colors.length],
                  odd: (i % 2 === 0)
              };
          }

          function addSlide(target, style) {
              target.push(getSlide(target, style));
          }

          vm.carouselIndex = 3;
          vm.carouselIndex2 = 0;
          vm.carouselIndex2 = 1;
          vm.carouselIndex3 = 5;
          vm.carouselIndex4 = 5;

          function addSlides(target, style, qty) {
              for (var i=0; i < qty; i++) {
                  addSlide(target, style);
              }
          }

          // 1st ngRepeat demo
          vm.slides = [];
          addSlides(vm.slides, 'sports', 50);

          // 2nd ngRepeat demo
          vm.slides2 = [];
          addSlides(vm.slides2, 'sports', 10);

          // 3rd ngRepeat demo
          vm.slides3 = [];
          addSlides(vm.slides3, 'people', 50);

          // 4th ngRepeat demo
          vm.slides4 = [];
          addSlides(vm.slides4, 'city', 50);


          // 5th ngRepeat demo
          vm.slides6 = [];
          vm.carouselIndex6 = 0;
          addSlides(vm.slides6, 'sports', 10);
          vm.addSlide = function(at) {
              if(at==='head') {
                  vm.slides6.unshift(getSlide(vm.slides6, 'people'));
              } else {
                  vm.slides6.push(getSlide(vm.slides6, 'people'));
              }
          };
        }
    }
})();

/**=========================================================
 * Module: demo-dialog.js
 * Demo for multiple ngDialog Usage
 * - ngDialogProvider for default values not supported 
 *   using lazy loader. Include plugin in base.js instead.
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.elements')
        .controller('DialogIntroCtrl', DialogIntroCtrl)
        .controller('DialogMainCtrl', DialogMainCtrl)
        .controller('InsideCtrl', InsideCtrl)
        .controller('SecondModalCtrl', SecondModalCtrl);

    DialogIntroCtrl.$inject = ['$scope', 'ngDialog', 'tpl'];
    // Called from the route state. 'tpl' is resolved before
    function DialogIntroCtrl($scope, ngDialog, tpl) {
        
        activate();

        ////////////////

        function activate() {
          // share with other controllers
          $scope.tpl = tpl;
          // open dialog window
          ngDialog.open({
            template: tpl.path,
            // plain: true,
            className: 'ngdialog-theme-default'
          });
        }
    }

    DialogMainCtrl.$inject = ['$scope', '$rootScope', 'ngDialog'];
    // Loads from view
    function DialogMainCtrl($scope, $rootScope, ngDialog) {

        activate();

        ////////////////

        function activate() {
          $rootScope.jsonData = '{"foo": "bar"}';
          $rootScope.theme = 'ngdialog-theme-default';

          $scope.directivePreCloseCallback = function (value) {
            if(confirm('Close it? MainCtrl.Directive. (Value = ' + value + ')')) {
              return true;
            }
            return false;
          };

          $scope.preCloseCallbackOnScope = function (value) {
            if(confirm('Close it? MainCtrl.OnScope (Value = ' + value + ')')) {
              return true;
            }
            return false;
          };

          $scope.open = function () {
            ngDialog.open({ template: 'firstDialogId', controller: 'InsideCtrl', data: {foo: 'some data'} });
          };

          $scope.openDefault = function () {
            ngDialog.open({
              template: 'firstDialogId',
              controller: 'InsideCtrl',
              className: 'ngdialog-theme-default'
            });
          };

          $scope.openDefaultWithPreCloseCallbackInlined = function () {
            ngDialog.open({
              template: 'firstDialogId',
              controller: 'InsideCtrl',
              className: 'ngdialog-theme-default',
              preCloseCallback: function(value) {
                if (confirm('Close it?  (Value = ' + value + ')')) {
                  return true;
                }
                return false;
              }
            });
          };

          $scope.openConfirm = function () {
            ngDialog.openConfirm({
              template: 'modalDialogId',
              className: 'ngdialog-theme-default'
            }).then(function (value) {
              console.log('Modal promise resolved. Value: ', value);
            }, function (reason) {
              console.log('Modal promise rejected. Reason: ', reason);
            });
          };

          $scope.openConfirmWithPreCloseCallbackOnScope = function () {
            ngDialog.openConfirm({
              template: 'modalDialogId',
              className: 'ngdialog-theme-default',
              preCloseCallback: 'preCloseCallbackOnScope',
              scope: $scope
            }).then(function (value) {
              console.log('Modal promise resolved. Value: ', value);
            }, function (reason) {
              console.log('Modal promise rejected. Reason: ', reason);
            });
          };

          $scope.openConfirmWithPreCloseCallbackInlinedWithNestedConfirm = function () {
            ngDialog.openConfirm({
              template: 'dialogWithNestedConfirmDialogId',
              className: 'ngdialog-theme-default',
              preCloseCallback: function(/*value*/) {

                var nestedConfirmDialog = ngDialog.openConfirm({
                  template:
                      '<p>Are you sure you want to close the parent dialog?</p>' +
                      '<div>' +
                        '<button type="button" class="btn btn-default" ng-click="closeThisDialog(0)">No' +
                        '<button type="button" class="btn btn-primary" ng-click="confirm(1)">Yes' +
                      '</button></div>',
                  plain: true,
                  className: 'ngdialog-theme-default'
                });

                return nestedConfirmDialog;
              },
              scope: $scope
            })
            .then(function(value){
              console.log('resolved:' + value);
              // Perform the save here
            }, function(value){
              console.log('rejected:' + value);

            });
          };

          $scope.openInlineController = function () {
            $rootScope.theme = 'ngdialog-theme-default';

            ngDialog.open({
              template: 'withInlineController',
              controller: ['$scope', '$timeout', function ($scope, $timeout) {
                var counter = 0;
                var timeout;
                function count() {
                  $scope.exampleExternalData = 'Counter ' + (counter++);
                  timeout = $timeout(count, 450);
                }
                count();
                $scope.$on('$destroy', function () {
                  $timeout.cancel(timeout);
                });
              }],
              className: 'ngdialog-theme-default'
            });
          };

          $scope.openTemplate = function () {
            $scope.value = true;

            ngDialog.open({
              template: $scope.tpl.path,
              className: 'ngdialog-theme-default',
              scope: $scope
            });
          };

          $scope.openTemplateNoCache = function () {
            $scope.value = true;

            ngDialog.open({
              template: $scope.tpl.path,
              className: 'ngdialog-theme-default',
              scope: $scope,
              cache: false
            });
          };

          $scope.openTimed = function () {
            var dialog = ngDialog.open({
              template: '<p>Just passing through!</p>',
              plain: true,
              closeByDocument: false,
              closeByEscape: false
            });
            setTimeout(function () {
              dialog.close();
            }, 2000);
          };

          $scope.openNotify = function () {
            var dialog = ngDialog.open({
              template:
                '<p>You can do whatever you want when I close, however that happens.</p>' +
                '<div><button type="button" class="btn btn-primary" ng-click="closeThisDialog(1)">Close Me</button></div>',
              plain: true
            });
            dialog.closePromise.then(function (data) {
              console.log('ngDialog closed' + (data.value === 1 ? ' using the button' : '') + ' and notified by promise: ' + data.id);
            });
          };

          $scope.openWithoutOverlay = function () {
            ngDialog.open({
              template: '<h2>Notice that there is no overlay!</h2>',
              className: 'ngdialog-theme-default',
              plain: true,
              overlay: false
            });
          };

          $rootScope.$on('ngDialog.opened', function (e, $dialog) {
            console.log('ngDialog opened: ' + $dialog.attr('id'));
          });

          $rootScope.$on('ngDialog.closed', function (e, $dialog) {
            console.log('ngDialog closed: ' + $dialog.attr('id'));
          });

          $rootScope.$on('ngDialog.closing', function (e, $dialog) {
            console.log('ngDialog closing: ' + $dialog.attr('id'));
          });
        }
    
    } // DialogMainCtrl


    InsideCtrl.$inject = ['$scope', 'ngDialog'];
    function InsideCtrl($scope, ngDialog) {

        activate();

        ////////////////

        function activate() {
          $scope.dialogModel = {
            message : 'message from passed scope'
          };
          $scope.openSecond = function () {
            ngDialog.open({
              template: '<p class="lead m0"><a href="" ng-click="closeSecond()">Close all by click here!</a></h3>',
              plain: true,
              closeByEscape: false,
              controller: 'SecondModalCtrl'
            });
          };
        }
    }

    SecondModalCtrl.$inject = ['$scope', 'ngDialog'];
    function SecondModalCtrl($scope, ngDialog) {

        activate();

        ////////////////

        function activate() {
          $scope.closeSecond = function () {
            ngDialog.close();
          };
        }

    }


})();




/**=========================================================
 * Module: calendar-ui.js
 * This script handle the calendar demo with draggable 
 * events and events creations
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.elements')
        .controller('InfiniteScrollController', InfiniteScrollController)
        .factory('datasource', datasource);

    function InfiniteScrollController() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

          vm.loadMore = function() {
            var last = vm.images[vm.images.length - 1];
            for(var i = 1; i <= 10; i++) {
              vm.images.push(last + i);
            }
          };
        }
    }
    
    datasource.$inject = ['$log', '$timeout'];
    function datasource(console, $timeout) {

        var get = function(index, count, success) {
            return $timeout(function() {
                var i, result, _i, _ref;
                result = [];
                for (i = _i = index, _ref = index + count - 1; index <= _ref ? _i <= _ref : _i >= _ref; i = index <= _ref ? ++_i : --_i) {
                    result.push('item #' + i);
                }
                return success(result);
            }, 100);
        };
        return {
            get: get
        };
    }

})();

/**=========================================================
 * Module: masonry-deck.js
 * Demo for Angular Deck
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.elements')
        .controller('MasonryDeckController', MasonryDeckController)
        .directive('imageloaded', imageloaded); // required by demo

    MasonryDeckController.$inject = ['RouteHelpers'];
    function MasonryDeckController(RouteHelpers) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          vm.basepath = RouteHelpers.basepath;

          vm.photos = [
              {id: 'photo-1', name: 'Awesome photo', src: 'http://lorempixel.com/400/300/abstract'},
              {id: 'photo-2', name: 'Great photo', src: 'http://lorempixel.com/450/400/city'},
              {id: 'photo-3', name: 'Strange photo', src: 'http://lorempixel.com/400/300/people'},
              {id: 'photo-4', name: 'A photo?', src: 'http://lorempixel.com/400/300/transport'},
              {id: 'photo-5', name: 'What a photo', src: 'http://lorempixel.com/450/300/fashion'},
              {id: 'photo-6', name: 'Silly photo', src: 'http://lorempixel.com/400/300/technics'},
              {id: 'photo-7', name: 'Weird photo', src: 'http://lorempixel.com/410/350/sports'},
              {id: 'photo-8', name: 'Modern photo', src: 'http://lorempixel.com/400/300/nightlife'},
              {id: 'photo-9', name: 'Classical photo', src: 'http://lorempixel.com/400/300/nature'},
              {id: 'photo-10', name: 'Dynamic photo', src: 'http://lorempixel.com/420/300/abstract'},
              {id: 'photo-11', name: 'Neat photo', src: 'http://lorempixel.com/400/300/sports'},
              {id: 'photo-12', name: 'Bumpy photo', src: 'http://lorempixel.com/400/300/nightlife'},
              {id: 'photo-13', name: 'Brilliant photo', src: 'http://lorempixel.com/400/380/nature'},
              {id: 'photo-14', name: 'Excellent photo', src: 'http://lorempixel.com/480/300/technics'},
              {id: 'photo-15', name: 'Gorgeous photo', src: 'http://lorempixel.com/400/300/sports'},
              {id: 'photo-16', name: 'Lovely photo', src: 'http://lorempixel.com/400/300/nightlife'},
              {id: 'photo-17', name: 'A "wow" photo', src: 'http://lorempixel.com/400/300/nature'},
              {id: 'photo-18', name: 'Bodacious photo', src: 'http://lorempixel.com/400/300/abstract'}
          ];
        }
    }

    // Add class to img element when source is loaded
    function imageloaded () {
        // Copyright(c) 2013 André König <akoenig@posteo.de>
        // MIT Licensed
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
          var cssClass = attrs.loadedclass;

          element.bind('load', function () {
              angular.element(element).addClass(cssClass);
          });
        }
    }

})();



/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.elements')
        .controller('AbnTestController', AbnTestController);

    AbnTestController.$inject = ['$timeout', '$resource'];
    function AbnTestController($timeout, $resource) {
        var vm = this;

        activate();

        ////////////////

        /*jshint -W106*/
        function activate() {
          vm.my_tree_handler = function(branch) {

            vm.output = 'You selected: ' + branch.label;

            if (branch.data && branch.data.description) {
              vm.output += '(' + branch.data.description + ')';
              return vm.output;
            }
          };

          // onSelect event handlers
          var apple_selected = function(branch) {
            vm.output = 'APPLE! : ' + branch.label;
            return vm.output;
          };

          var treedata_avm = [
            {
              label: 'Animal',
              children: [
                {
                  label: 'Dog',
                  data: {
                    description: 'man\'s best friend'
                  }
                }, {
                  label: 'Cat',
                  data: {
                    description: 'Felis catus'
                  }
                }, {
                  label: 'Hippopotamus',
                  data: {
                    description: 'hungry, hungry'
                  }
                }, {
                  label: 'Chicken',
                  children: ['White Leghorn', 'Rhode Island Red', 'Jersey Giant']
                }
              ]
            }, {
              label: 'Vegetable',
              data: {
                definition: 'A plant or part of a plant used as food, typically as accompaniment to meat or fish, such as a cabbage, potato, carrot, or bean.',
                data_can_contain_anything: true
              },
              onSelect: function(branch) {
                vm.output = 'Vegetable: ' + branch.data.definition;
                return vm.output;
              },
              children: [
                {
                  label: 'Oranges'
                }, {
                  label: 'Apples',
                  children: [
                    {
                      label: 'Granny Smith',
                      onSelect: apple_selected
                    }, {
                      label: 'Red Delicous',
                      onSelect: apple_selected
                    }, {
                      label: 'Fuji',
                      onSelect: apple_selected
                    }
                  ]
                }
              ]
            }, {
              label: 'Mineral',
              children: [
                {
                  label: 'Rock',
                  children: ['Igneous', 'Sedimentary', 'Metamorphic']
                }, {
                  label: 'Metal',
                  children: ['Aluminum', 'Steel', 'Copper']
                }, {
                  label: 'Plastic',
                  children: [
                    {
                      label: 'Thermoplastic',
                      children: ['polyethylene', 'polypropylene', 'polystyrene', ' polyvinyl chloride']
                    }, {
                      label: 'Thermosetting Polymer',
                      children: ['polyester', 'polyurethane', 'vulcanized rubber', 'bakelite', 'urea-formaldehyde']
                    }
                  ]
                }
              ]
            }
          ];
          
          var treedata_geography = [
            {
              label: 'North America',
              children: [
                {
                  label: 'Canada',
                  children: ['Toronto', 'Vancouver']
                }, {
                  label: 'USA',
                  children: ['New York', 'Los Angeles']
                }, {
                  label: 'Mexico',
                  children: ['Mexico City', 'Guadalajara']
                }
              ]
            }, {
              label: 'South America',
              children: [
                {
                  label: 'Venezuela',
                  children: ['Caracas', 'Maracaibo']
                }, {
                  label: 'Brazil',
                  children: ['Sao Paulo', 'Rio de Janeiro']
                }, {
                  label: 'Argentina',
                  children: ['Buenos Aires', 'Cordoba']
                }
              ]
            }
          ];

          vm.my_data = treedata_avm;
          vm.try_changing_the_tree_data = function() {
            if (vm.my_data === treedata_avm) {
              vm.my_data = treedata_geography;
            } else {
              vm.my_data = treedata_avm;
            }
            return vm.my_data;
          };
          
          var tree;
          // This is our API control variable
          vm.my_tree = tree = {};
          vm.try_async_load = function() {
            
            vm.my_data = [];
            vm.doing_async = true;
            
            // Request tree data via $resource
            var remoteTree = $resource('server/treedata.json');
            
            return remoteTree.get(function(res){
              
              vm.my_data = res.data;

              vm.doing_async = false;
            
              return tree.expand_all();
            
            // we must return a promise so the plugin 
            // can watch when it's resolved
            }).$promise;
          };
          
          // Adds a new branch to the tree
          vm.try_adding_a_branch = function() {
            var b;
            b = tree.get_selected_branch();
            return tree.add_branch(b, {
              label: 'New Branch',
              data: {
                something: 42,
                'else': 43
              }
            });
          };

        }
    }
})();


/**=========================================================
 * Module: nestable.js
 * Nestable controller
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.elements')
        .controller('NestableController', NestableController);

    function NestableController() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.items =  [
            {
              item: {text: 'a'},
              children: []
            },
            {
              item: {text: 'b'},
              children: [
                {
                  item: {text: 'c'},
                  children: []
                },
                {
                  item: {text: 'd'},
                  children: []
                }
              ]
            },
            {
              item: {text: 'e'},
              children: []
            },
            {
              item: {text: 'f'},
              children: []
            }
          ];

          vm.items2 =  [
            {
              item: {text: '1'},
              children: []
            },
            {
              item: {text: '2'},
              children: [
                {
                  item: {text: '3'},
                  children: []
                },
                {
                  item: {text: '4'},
                  children: []
                }
              ]
            },
            {
              item: {text: '5'},
              children: []
            },
            {
              item: {text: '6'},
              children: []
            }
          ];

        }
    }
})();

/**=========================================================
 * Module: scroll.js
 * Make a content box scrollable
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.elements')
        .directive('scrollable', scrollable);

    function scrollable () {
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
          var defaultHeight = 250;
          element.slimScroll({
              height: (attrs.height || defaultHeight)
          });
        }
    }

})();

/**=========================================================
 * Module: sortable.js
 * Sortable controller
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.elements')
        .controller('SortableController', SortableController);

    SortableController.$inject = ['$scope'];
    function SortableController($scope) {
        // doesn't support controllerAs syntax https://github.com/voidberg/html5sortable/issues/86

        activate();

        ////////////////

        function activate() {
          // Single List
          $scope.data1 = [
            { id: 1, name: 'Donald Hoffman' },
            { id: 2, name: 'Wallace Barrett' },
            { id: 3, name: 'Marsha Hicks' },
            { id: 4, name: 'Roland Brown' }
          ];

          $scope.add = function () {
            $scope.data1.push({id: $scope.data1.length + 1, name: 'Earl Knight'});
          };

          $scope.sortableCallback = function (sourceModel, destModel, start, end) {
            console.log(start + ' -> ' + end);
          };
          
          $scope.sortableOptions = {
              placeholder: '<div class="box-placeholder p0 m0"><div></div></div>',
              forcePlaceholderSize: true
          };
        }
    }

})();

/**=========================================================
 * Module: sweetalert.js
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.elements')
        .controller('SweetAlertController', SweetAlertController);

    SweetAlertController.$inject = ['SweetAlert'];
    function SweetAlertController(SweetAlert) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.demo1 = function() {
            SweetAlert.swal('Here\'s a message');
          };

          vm.demo2 = function() {
            SweetAlert.swal('Here\'s a message!', 'It\'s pretty, isn\'t it?');
          };

          vm.demo3 = function() {
            SweetAlert.swal('Good job!', 'You clicked the button!', 'success');
          };

          vm.demo4 = function() {
            SweetAlert.swal({   
              title: 'Are you sure?',   
              text: 'Your will not be able to recover this imaginary file!',   
              type: 'warning',   
              showCancelButton: true,   
              confirmButtonColor: '#DD6B55',   
              confirmButtonText: 'Yes, delete it!',
              closeOnConfirm: false
            },  function(){  
              SweetAlert.swal('Booyah!');
            });
          };

          vm.demo5 = function() {
            SweetAlert.swal({   
              title: 'Are you sure?',   
              text: 'Your will not be able to recover this imaginary file!',   
              type: 'warning',   
              showCancelButton: true,   
              confirmButtonColor: '#DD6B55',   
              confirmButtonText: 'Yes, delete it!',   
              cancelButtonText: 'No, cancel plx!',   
              closeOnConfirm: false,   
              closeOnCancel: false 
            }, function(isConfirm){  
              if (isConfirm) {     
                SweetAlert.swal('Deleted!', 'Your imaginary file has been deleted.', 'success');   
              } else {     
                SweetAlert.swal('Cancelled', 'Your imaginary file is safe :)', 'error');   
              } 
            });
          };

          vm.demo6 = function() {
            SweetAlert.swal({   
              title: 'Sweet!',   
              text: 'Here\'s a custom image.',   
              imageUrl: 'http://oitozero.com/img/avatar.jpg' 
            });
          };
        }
    }
})();

/**=========================================================
 * Module: demo-toaster.js
 * Demos for toaster notifications
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.elements')
        .controller('ToasterDemoCtrl', ToasterDemoCtrl);

    ToasterDemoCtrl.$inject = ['toaster'];
    function ToasterDemoCtrl(toaster) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.toaster = {
              type:  'success',
              title: 'Title',
              text:  'Message'
          };

          vm.pop = function() {
            toaster.pop(vm.toaster.type, vm.toaster.title, vm.toaster.text);
          };
        }
    }
})();

/**=========================================================
 * Module: tour.js
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.elements')
        .controller('TourCtrl', TourCtrl);

    TourCtrl.$inject = ['$scope'];
    function TourCtrl($scope) {

        activate();

        ////////////////

        function activate() {
          // BootstrapTour is not compatible with z-index based layout
          // so adding position:static for this case makes the browser
          // to ignore the property
          var section = angular.element('.wrapper > section');
          section.css({'position': 'static'});
          // finally restore on destroy and reuse the value declared in stylesheet
          $scope.$on('$destroy', function(){
            section.css({'position': ''});
          });
        }
    }
})();

/**=========================================================
 * Module: flatdoc.js
 * Creates the flatdoc markup and initializes the plugin
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.flatdoc')
        .directive('flatdoc', flatdoc);

    function flatdoc () {

        var directive = {
            template: '<div role="flatdoc"><div role="flatdoc-menu"></div><div role="flatdoc-content"></div></div>',
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
          Flatdoc.run({
            fetcher: Flatdoc.file(attrs.src)
          });
          
          var $root = $('html, body');
          $(document).on('flatdoc:ready', function() {
            var docMenu = $('[role="flatdoc-menu"]');
            docMenu.find('a').on('click', function(e) {
              e.preventDefault(); e.stopPropagation();
              
              var $this = $(this);
              
              docMenu.find('a.active').removeClass('active');
              $this.addClass('active');

              $root.animate({
                    scrollTop: $(this.getAttribute('href')).offset().top - ($('.topnavbar').height() + 10)
                }, 800);
            });

          });
        }
    }


})();

/**=========================================================
 * Module: article.js
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.extras')
        .controller('ArticleController', ArticleController);

    function ArticleController() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.htmlContent = 'Article content...';

          vm.postDemo = {};
          vm.postDemo.tags = ['coding', 'less'];
          vm.availableTags = ['coding', 'less', 'sass', 'angularjs', 'node', 'expressJS'];
          vm.postDemo.categories = ['JAVASCRIPT','WEB'];
          vm.availableCategories = ['JAVASCRIPT','WEB', 'BOOTSTRAP', 'SERVER', 'HTML5', 'CSS'];

          vm.reviewers = [
            { name: 'Adam',      email: 'adam@email.com',      age: 10 },
            { name: 'Amalie',    email: 'amalie@email.com',    age: 12 },
            { name: 'Wladimir',  email: 'wladimir@email.com',  age: 30 },
            { name: 'Samantha',  email: 'samantha@email.com',  age: 31 },
            { name: 'Estefanía', email: 'estefanía@email.com', age: 16 },
            { name: 'Natasha',   email: 'natasha@email.com',   age: 54 },
            { name: 'Nicole',    email: 'nicole@email.com',    age: 43 },
            { name: 'Adrian',    email: 'adrian@email.com',    age: 21 }
          ];


          vm.alerts = [
            { type: 'info', msg: 'There is an autosaved version of this article that is more recent than the version below. <a href="#" class="text-white">Restore</a>' }
          ];

          vm.closeAlert = function(index) {
            vm.alerts.splice(index, 1);
          };
        }
    }
})();

/**=========================================================
 * Module: calendar-ui.js
 * This script handle the calendar demo with draggable 
 * events and events creations
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.extras')
        .directive('calendar', calendar);

    calendar.$inject = ['$rootScope'];
    function calendar ($rootScope) {
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element) {
          
          if(!$.fn.fullCalendar) return;
          
          // The element that will display the calendar
          var calendar = element;

          var demoEvents = createDemoEvents();

          initExternalEvents(calendar);

          initCalendar(calendar, demoEvents, $rootScope.app.layout.isRTL);
        }
    }


    // global shared var to know what we are dragging
    var draggingEvent = null;


    /**
     * ExternalEvent object
     * @param jQuery Object elements Set of element as jQuery objects
     */
    function ExternalEvent(elements) {
        
        if (!elements) return;
        
        elements.each(function() {
            var $this = $(this);
            // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
            // it doesn't need to have a start or end
            var calendarEventObject = {
                title: $.trim($this.text()) // use the element's text as the event title
            };

            // store the Event Object in the DOM element so we can get to it later
            $this.data('calendarEventObject', calendarEventObject);

            // make the event draggable using jQuery UI
            $this.draggable({
                zIndex: 1070,
                revert: true, // will cause the event to go back to its
                revertDuration: 0  //  original position after the drag
            });

        });
    }

    /**
     * Invoke full calendar plugin and attach behavior
     * @param  jQuery [calElement] The calendar dom element wrapped into jQuery
     * @param  EventObject [events] An object with the event list to load when the calendar displays
     */
    function initCalendar(calElement, events, isRTL) {

        // check to remove elements from the list
        var removeAfterDrop = $('#remove-after-drop');

        calElement.fullCalendar({
            isRTL: isRTL,
            header: {
                left:   'prev,next today',
                center: 'title',
                right:  'month,agendaWeek,agendaDay'
            },
            buttonIcons: { // note the space at the beginning
                prev:    ' fa fa-caret-left',
                next:    ' fa fa-caret-right'
            },
            buttonText: {
                today: 'today',
                month: 'month',
                week:  'week',
                day:   'day'
            },
            editable: true,
            droppable: true, // this allows things to be dropped onto the calendar 
            drop: function(date, allDay) { // this function is called when something is dropped
                
                var $this = $(this),
                    // retrieve the dropped element's stored Event Object
                    originalEventObject = $this.data('calendarEventObject');

                // if something went wrong, abort
                if(!originalEventObject) return;

                // clone the object to avoid multiple events with reference to the same object
                var clonedEventObject = $.extend({}, originalEventObject);

                // assign the reported date
                clonedEventObject.start = date;
                clonedEventObject.allDay = allDay;
                clonedEventObject.backgroundColor = $this.css('background-color');
                clonedEventObject.borderColor = $this.css('border-color');

                // render the event on the calendar
                // the last `true` argument determines if the event "sticks" 
                // (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
                calElement.fullCalendar('renderEvent', clonedEventObject, true);
                
                // if necessary remove the element from the list
                if(removeAfterDrop.is(':checked')) {
                  $this.remove();
                }
            },
            eventDragStart: function (event/*, js, ui*/) {
              draggingEvent = event;
            },
            // This array is the events sources
            events: events
        });
    }

    /**
     * Inits the external events panel
     * @param  jQuery [calElement] The calendar dom element wrapped into jQuery
     */
    function initExternalEvents(calElement){
      // Panel with the external events list
      var externalEvents = $('.external-events');

      // init the external events in the panel
      new ExternalEvent(externalEvents.children('div'));

      // External event color is danger-red by default
      var currColor = '#f6504d';
      // Color selector button
      var eventAddBtn = $('.external-event-add-btn');
      // New external event name input
      var eventNameInput = $('.external-event-name');
      // Color switchers
      var eventColorSelector = $('.external-event-color-selector .circle');

      // Trash events Droparea 
      $('.external-events-trash').droppable({
        accept:       '.fc-event',
        activeClass:  'active',
        hoverClass:   'hovered',
        tolerance:    'touch',
        drop: function(event, ui) {
          
          // You can use this function to send an ajax request
          // to remove the event from the repository
          
          if(draggingEvent) {
            var eid = draggingEvent.id || draggingEvent._id;
            // Remove the event
            calElement.fullCalendar('removeEvents', eid);
            // Remove the dom element
            ui.draggable.remove();
            // clear
            draggingEvent = null;
          }
        }
      });

      eventColorSelector.click(function(e) {
          e.preventDefault();
          var $this = $(this);

          // Save color
          currColor = $this.css('background-color');
          // De-select all and select the current one
          eventColorSelector.removeClass('selected');
          $this.addClass('selected');
      });

      eventAddBtn.click(function(e) {
          e.preventDefault();
          
          // Get event name from input
          var val = eventNameInput.val();
          // Dont allow empty values
          if ($.trim(val) === '') return;
          
          // Create new event element
          var newEvent = $('<div/>').css({
                              'background-color': currColor,
                              'border-color':     currColor,
                              'color':            '#fff'
                          })
                          .html(val);

          // Prepends to the external events list
          externalEvents.prepend(newEvent);
          // Initialize the new event element
          new ExternalEvent(newEvent);
          // Clear input
          eventNameInput.val('');
      });
    }

    /**
     * Creates an array of events to display in the first load of the calendar
     * Wrap into this function a request to a source to get via ajax the stored events
     * @return Array The array with the events
     */
    function createDemoEvents() {
      // Date for the calendar events (dummy data)
      var date = new Date();
      var d = date.getDate(),
          m = date.getMonth(),
          y = date.getFullYear();

      return  [
                {
                    title: 'All Day Event',
                    start: new Date(y, m, 1),
                    backgroundColor: '#f56954', //red 
                    borderColor: '#f56954' //red
                },
                {
                    title: 'Long Event',
                    start: new Date(y, m, d - 5),
                    end: new Date(y, m, d - 2),
                    backgroundColor: '#f39c12', //yellow
                    borderColor: '#f39c12' //yellow
                },
                {
                    title: 'Meeting',
                    start: new Date(y, m, d, 10, 30),
                    allDay: false,
                    backgroundColor: '#0073b7', //Blue
                    borderColor: '#0073b7' //Blue
                },
                {
                    title: 'Lunch',
                    start: new Date(y, m, d, 12, 0),
                    end: new Date(y, m, d, 14, 0),
                    allDay: false,
                    backgroundColor: '#00c0ef', //Info (aqua)
                    borderColor: '#00c0ef' //Info (aqua)
                },
                {
                    title: 'Birthday Party',
                    start: new Date(y, m, d + 1, 19, 0),
                    end: new Date(y, m, d + 1, 22, 30),
                    allDay: false,
                    backgroundColor: '#00a65a', //Success (green)
                    borderColor: '#00a65a' //Success (green)
                },
                {
                    title: 'Open Google',
                    start: new Date(y, m, 28),
                    end: new Date(y, m, 29),
                    url: '//google.com/',
                    backgroundColor: '#3c8dbc', //Primary (light-blue)
                    borderColor: '#3c8dbc' //Primary (light-blue)
                }
            ];
    }

})();

(function() {
    'use strict';

    angular
        .module('app.extras')
        .service('LoadTreeService', LoadTreeService);

    LoadTreeService.$inject = ['$resource'];
    function LoadTreeService($resource) {
        // Loads the list of files to populate the treeview
        return $resource('server/editor/filetree.json');
    }

})();
/**=========================================================
 * Module: code-editor.js
 * Codemirror code editor controller
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.extras')
        .controller('CodeEditorController', CodeEditorController);

    CodeEditorController.$inject = ['$rootScope', '$scope', '$http', '$ocLazyLoad', 'filetree'];
    function CodeEditorController($rootScope, $scope, $http, $ocLazyLoad, filetree) {
        var vm = this;

        layout();
        activate();

        ////////////////
        /*jshint -W106*/
        function layout() {
          // Setup the layout mode 
          $rootScope.app.useFullLayout = true;
          $rootScope.app.hiddenFooter = true;
          $rootScope.app.layout.isCollapsed = true;
          
          // Restore layout for demo
          $scope.$on('$destroy', function(){
              $rootScope.app.useFullLayout = false;
              $rootScope.app.hiddenFooter = false;
          });

        }

        function activate() {

          // Set the tree data into the scope
          vm.filetree_data = filetree;

          // Available themes
          vm.editorThemes = ['3024-day','3024-night','ambiance-mobile','ambiance','base16-dark','base16-light','blackboard','cobalt','eclipse','elegant','erlang-dark','lesser-dark','mbo','mdn-like','midnight','monokai','neat','neo','night','paraiso-dark','paraiso-light','pastel-on-dark','rubyblue','solarized','the-matrix','tomorrow-night-eighties','twilight','vibrant-ink','xq-dark','xq-light'];

          vm.editorOpts = {
            mode: 'javascript',
            lineNumbers: true,
            matchBrackets: true,
            theme: 'mbo',
            viewportMargin: Infinity
          };

          vm.refreshEditor = 0;

          // Load dinamically the stylesheet for the selected theme
          // You can use ozLazyLoad to load also the mode js based 
          // on the file extension that is loaded (see handle_filetree)
          vm.loadTheme = function() {
            var BASE = 'vendor/codemirror/theme/';
            $ocLazyLoad.load(BASE + vm.editorOpts.theme + '.css');
            vm.refreshEditor = !vm.refreshEditor;
          };
          // load default theme
          vm.loadTheme(vm.editorOpts.theme);
          // Add some initial text
          vm.code = '// Open a file from the left menu \n' +
                        '// It will be requested to the server and loaded into the editor\n' +
                        '// Also try adding a New File from the toolbar\n';


          // Tree

          var selectedBranch;
          vm.handle_filetree = function(branch) {
            
            selectedBranch = branch;

            var basePath = 'server/editor/';
            var isFolder = !!branch.children.length;

            console.log('You selected: ' + branch.label + ' - isFolder? ' + isFolder);

            if ( ! isFolder ) {

              $http
                .get( basePath + branch.path )
                .success(function(response){
                  
                  console.log('Loaded.. ' + branch.path);
                  // set the new code into the editor
                  vm.code = response;
                  
                  vm.editorOpts.mode = detectMode(branch.path);
                  console.log( 'Mode is: ' + vm.editorOpts.mode);

                });
            }
          };

          function detectMode(file) {
            var ext = file.split('.');
            ext = ext ? ext[ext.length - 1] : '';
            switch (ext) {
              case 'html':  return 'htmlmixed';
              case 'css':   return 'css';
              default:      return 'javascript';
            }
          }

          var tree;
          tree = vm.filetree = {};

          // Adds a new branch to the tree
          vm.new_filetree = function() {
            var b;
            b = tree.get_selected_branch();

            // if we select a leaf -> select the parent folder
            if ( b && b.children.length === 0 ) {
              b = tree.get_parent_branch(b);
            }
            
            return tree.add_branch(b, {
              'label': 'another.html',
              'path': 'source/another.html'
            });
          };
        }
    }
})();


(function() {
    'use strict';

    angular
        .module('app.extras')
        .controller('TodoController', TodoController);

    TodoController.$inject = ['$filter'];
    function TodoController($filter) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
           vm.items = [
            {
              todo: {title: 'Meeting with Mark at 7am.', description: 'Pellentesque convallis mauris eu elit imperdiet quis eleifend quam aliquet. '},
              complete: true
            },
            {
              todo: {title: 'Call Sonya. Talk about the new project.', description: ''},
              complete: false
            },
            {
              todo: {title: 'Find a new place for vacations', description: ''},
              complete: false
            }
            ];
          
          vm.editingTodo = false;
          vm.todo = {};

          vm.addTodo = function() {
            
            if( vm.todo.title === '' ) return;
            if( !vm.todo.description ) vm.todo.description = '';
            
            if( vm.editingTodo ) {
              vm.todo = {};
              vm.editingTodo = false;
            }
            else {
              vm.items.push({todo: angular.copy(vm.todo), complete: false});
              vm.todo.title = '';
              vm.todo.description = '';
            }
          };
          
          vm.editTodo = function(index, $event) {
            $event.preventDefault();
            $event.stopPropagation();
            vm.todo = vm.items[index].todo;
            vm.editingTodo = true;
          };

          vm.removeTodo = function(index/*, $event*/) {
            vm.items.splice(index, 1);
          };
          
          vm.clearAll = function() {
            vm.items = [];
          };

          vm.totalCompleted = function() {
            return $filter('filter')(vm.items, function(item){
              return item.complete;
            }).length;
          };

          vm.totalPending = function() {
            return $filter('filter')(vm.items, function(item){
              return !item.complete;
            }).length;
          };

        }
    }
})();

/**=========================================================
 * Module: word-cloud.js
 * Controller for jqCloud
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.extras')
        .controller('WordCloudController', WordCloudController);

    function WordCloudController() {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          vm.words = [
              {
                text: 'Lorem',
                weight: 13
                //link: 'http://themicon.co'
              }, {
                text: 'Ipsum',
                weight: 10.5
              }, {
                text: 'Dolor',
                weight: 9.4
              }, {
                text: 'Sit',
                weight: 8
              }, {
                text: 'Amet',
                weight: 6.2
              }, {
                text: 'Consectetur',
                weight: 5
              }, {
                text: 'Adipiscing',
                weight: 5
              }, {
                text: 'Sit',
                weight: 8
              }, {
                text: 'Amet',
                weight: 6.2
              }, {
                text: 'Consectetur',
                weight: 5
              }, {
                text: 'Adipiscing',
                weight: 5
              }
          ];
        }
    }
})();

/**=========================================================
 * Module: skycons.js
 * Include any animated weather icon from Skycons
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.icons')
        .directive('skycon', skycon);

    function skycon () {

        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
          var skycons = new Skycons({'color': (attrs.color || 'white')});

          element.html('<canvas width="' + attrs.width + '" height="' + attrs.height + '"></canvas>');

          skycons.add(element.children()[0], attrs.skycon);

          skycons.play();
        }
    }

})();

(function() {
    'use strict';

    angular
        .module('app.forms')
        .controller('ColorPickerController', ColorPickerController);

    function ColorPickerController() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
           vm.hexPicker = {
              color: ''
            };

            vm.rgbPicker = {
              color: ''
            };

            vm.rgbaPicker = {
              color: ''
            };

            vm.nonInput = {
              color: ''
            };

            vm.resetColor = function() {
              vm.hexPicker = {
                color: '#ff0000'
              };
            };

            vm.resetRBGColor = function() {
              vm.rgbPicker = {
                color: 'rgb(255,255,255)'
              };
            };

            vm.resetRBGAColor = function() {
              vm.rgbaPicker = {
                color: 'rgb(255,255,255, 0.25)'
              };
            };

            vm.resetNonInputColor = function() {
              vm.nonInput = {
                color: '#ffffff'
              };
            };
        }
    }
})();
/**=========================================================
 * Module: filestyle.js
 * Initializes the fielstyle plugin
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.forms')
        .directive('filestyle', filestyle);

    function filestyle () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          var options = element.data();
          
          // old usage support
          options.classInput = element.data('classinput') || options.classInput;
          
          element.filestyle(options);
        }
    }

})();

/**=========================================================
 * Module: form-imgcrop.js
 * Image crop controller
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.forms')
        .controller('ImageCropController', ImageCropController);

    ImageCropController.$inject = ['$scope'];
    function ImageCropController($scope) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.reset = function() {
            vm.myImage        = '';
            vm.myCroppedImage = '';
            vm.imgcropType    = 'square';
          };

          vm.reset();

          var handleFileSelect=function(evt) {
            var file=evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
              $scope.$apply(function(/*$scope*/){
                vm.myImage=evt.target.result;
              });
            };
            if(file)
              reader.readAsDataURL(file);
          };
          
          angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
        }
    }
})();

/**=========================================================
 * Module: FormValidationController
 * Input validation with UI Validate
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.forms')
        .controller('FormValidationController', FormValidationController);

    function FormValidationController() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.notBlackListed = function(value) {
            var blacklist = ['some@mail.com','another@email.com'];
            return blacklist.indexOf(value) === -1;
          };

          vm.words = function(value) {
            return value && value.split(' ').length;
          };

          vm.submitted = false;
          vm.validateInput = function(name, type) {
            var input = vm.formValidate[name];
            return (input.$dirty || vm.submitted) && input.$error[type];
          };

          // Submit form
          vm.submitForm = function() {
            vm.submitted = true;
            if (vm.formValidate.$valid) {
              console.log('Submitted!!');
            } else {
              console.log('Not valid!!');
              return false;
            }
          };
        }
    }
})();

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

/**=========================================================
 * Module: form-xeditable.js
 * Form xEditable controller
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.forms')
        .controller('FormxEditableController', FormxEditableController);

    FormxEditableController.$inject = ['$scope', 'editableOptions', 'editableThemes', '$filter', '$http'];
    function FormxEditableController($scope, editableOptions, editableThemes, $filter, $http) {
        var vm = this;
        vm.title = 'Controller';

        activate();

        ////////////////

        function activate() {

          editableOptions.theme = 'bs3';

          editableThemes.bs3.inputClass = 'input-sm';
          editableThemes.bs3.buttonsClass = 'btn-sm';
          editableThemes.bs3.submitTpl = '<button type="submit" class="btn btn-success"><span class="fa fa-check"></span></button>';
          editableThemes.bs3.cancelTpl = '<button type="button" class="btn btn-default" ng-click="$form.$cancel()">'+
                                           '<span class="fa fa-times text-muted"></span>'+
                                         '</button>';

          vm.user = {
            email: 'email@example.com',
            tel: '123-45-67',
            number: 29,
            range: 10,
            url: 'http://example.com',
            search: 'blabla',
            color: '#6a4415',
            date: null,
            time: new Date(),
            datetime: null,
            month: null,
            week: null,
            desc: 'Sed pharetra euismod dolor, id feugiat ante volutpat eget. '
          };

          // Local select
          // ----------------------------------- 

          vm.user2 = {
            status: 2
          };

          vm.statuses = [
            {value: 1, text: 'status1'},
            {value: 2, text: 'status2'},
            {value: 3, text: 'status3'},
            {value: 4, text: 'status4'}
          ];

          vm.showStatus = function() {
            var selected = $filter('filter')(vm.statuses, {value: vm.user2.status});
            return (vm.user2.status && selected.length) ? selected[0].text : 'Not set';
          };

          // select remote
          // ----------------------------------- 

          vm.user3 = {
            id: 4,
            text: 'admin' // original value
          };

          vm.groups = [];

          vm.loadGroups = function() {
            return vm.groups.length ? null : $http.get('server/xeditable-groups.json').success(function(data) {
              vm.groups = data;
            });
          };

          $scope.$watch('user3.id', function(newVal, oldVal) {
            if (newVal !== oldVal) {
              var selected = $filter('filter')(vm.groups, {id: vm.user3.id});
              vm.user3.text = selected.length ? selected[0].text : null;
            }
          });

          // Typeahead
          // ----------------------------------- 

          vm.user4 = {
            state: 'Arizona'
          };

          vm.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

        }
    }
})();


(function() {
    'use strict';

    angular
        .module('app.forms')
        .controller('FormDemoCtrl', FormDemoCtrl);

    FormDemoCtrl.$inject = ['$resource'];
    function FormDemoCtrl($resource) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          // the following allow to request array $resource instead of object (default)
          var actions = {'get': {method: 'GET', isArray: true}};
          
          // Tags inputs
          // ----------------------------------- 
          var Cities = $resource('server/cities.json', {}, actions);

          Cities.get(function(data){

              vm.cities = data;

          });
          // for non ajax form just fill the scope variable
          // vm.cities = ['Amsterdam','Washington','Sydney','Beijing','Cairo'];

          // Slider demo values
          vm.slider1 = 5;
          vm.slider2 = 10;
          vm.slider3 = 15;
          vm.slider4 = 20;
          vm.slider5 = 25;
          vm.slider6 = 30;
          vm.slider7 = 10;
          vm.slider8 = [250,750];

          // Chosen data
          // ----------------------------------- 

          var States = $resource('server/chosen-states.json', {},  {'query':    {method:'GET', isArray:true} });

          vm.states = States.query();


          vm.alertSubmit = function(){
            alert('Form submitted!');
            return false;
          };

          // Angular wysiwyg 
          // ----------------------------------- 

          vm.wysiwygContent = '<p> Write something here.. </p>';

          // Text Angular (wysiwyg)
          // ----------------------------------- 
          
          vm.htmlContent = '<h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li style="color: blue;">Super Easy <b>Theming</b> Options</li><li>Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li>Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE8+</li></ol><p><a href="https://github.com/fraywing/textAngular">Source</a> </p>';

        }
    }
})();

/**=========================================================
 * Module: masked,js
 * Initializes the masked inputs
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.forms')
        .directive('masked', masked);

    function masked () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          var $elem = $(element);
          if($.fn.inputmask)
            $elem.inputmask();
        }
    }

})();

/**
 * AngularJS default filter with the following expression:
 * "person in people | filter: {name: $select.search, age: $select.search}"
 * performs a AND between 'name: $select.search' and 'age: $select.search'.
 * We want to perform a OR.
 */

(function() {
    'use strict';

    angular
        .module('app.forms')
        .filter('propsFilter', propsFilter);

    function propsFilter() {
        return filterFilter;

        ////////////////
        function filterFilter(items, props) {
          var out = [];

          if (angular.isArray(items)) {
            items.forEach(function(item) {
              var itemMatches = false;

              var keys = Object.keys(props);
              for (var i = 0; i < keys.length; i++) {
                var prop = keys[i];
                var text = props[prop].toLowerCase();
                if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                  itemMatches = true;
                  break;
                }
              }

              if (itemMatches) {
                out.push(item);
              }
            });
          } else {
            // Let the output be the input untouched
            out = items;
          }

          return out;
        }
    }

})();
/**=========================================================
 * Module: tags-input.js
 * Initializes the tag inputs plugin
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.forms')
        .directive('tagsinput', tagsinput);

    tagsinput.$inject = ['$timeout'];
    function tagsinput ($timeout) {
        var directive = {
            link: link,
            require: 'ngModel',
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs, ngModel) {
          element.on('itemAdded itemRemoved', function(){
            // check if view value is not empty and is a string
            // and update the view from string to an array of tags
            if(ngModel.$viewValue && ngModel.$viewValue.split) {
              ngModel.$setViewValue( ngModel.$viewValue.split(',') );
              ngModel.$render();
            }
          });

          $timeout(function(){
            element.tagsinput();
          });
        }
    }

})();

/**=========================================================
 * Module: uiselect.js
 * uiSelect controller
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.forms')
        .controller('uiSelectController', uiSelectController);

    uiSelectController.$inject = ['$scope', '$http'];
    function uiSelectController($scope, $http) {
        /* jshint validthis:true */
        var vm = this;

        activate();

        ////////////////

        function activate() {

          vm.disabled = undefined;

          vm.enable = function() {
            vm.disabled = false;
          };

          vm.disable = function() {
            vm.disabled = true;
          };

          vm.clear = function() {
            vm.person.selected = undefined;
            vm.address.selected = undefined;
            vm.country.selected = undefined;
          };

          vm.person = {};
          vm.people = [
            { name: 'Adam',      email: 'adam@email.com',      age: 10 },
            { name: 'Amalie',    email: 'amalie@email.com',    age: 12 },
            { name: 'Wladimir',  email: 'wladimir@email.com',  age: 30 },
            { name: 'Samantha',  email: 'samantha@email.com',  age: 31 },
            { name: 'Estefanía', email: 'estefanía@email.com', age: 16 },
            { name: 'Natasha',   email: 'natasha@email.com',   age: 54 },
            { name: 'Nicole',    email: 'nicole@email.com',    age: 43 },
            { name: 'Adrian',    email: 'adrian@email.com',    age: 21 }
          ];

          vm.address = {};
          vm.refreshAddresses = function(address) {
            var params = {address: address, sensor: false};
            return $http.get(
              '//maps.googleapis.com/maps/api/geocode/json',
              {params: params}
            ).then(function(response) {
              vm.addresses = response.data.results;
            });
          };

          vm.country = {};
          vm.countries = [ // Taken from https://gist.github.com/unceus/6501985
            {name: 'Afghanistan', code: 'AF'},
            {name: 'Åland Islands', code: 'AX'},
            {name: 'Albania', code: 'AL'},
            {name: 'Algeria', code: 'DZ'},
            {name: 'American Samoa', code: 'AS'},
            {name: 'Andorra', code: 'AD'},
            {name: 'Angola', code: 'AO'},
            {name: 'Anguilla', code: 'AI'},
            {name: 'Antarctica', code: 'AQ'},
            {name: 'Antigua and Barbuda', code: 'AG'},
            {name: 'Argentina', code: 'AR'},
            {name: 'Armenia', code: 'AM'},
            {name: 'Aruba', code: 'AW'},
            {name: 'Australia', code: 'AU'},
            {name: 'Austria', code: 'AT'},
            {name: 'Azerbaijan', code: 'AZ'},
            {name: 'Bahamas', code: 'BS'},
            {name: 'Bahrain', code: 'BH'},
            {name: 'Bangladesh', code: 'BD'},
            {name: 'Barbados', code: 'BB'},
            {name: 'Belarus', code: 'BY'},
            {name: 'Belgium', code: 'BE'},
            {name: 'Belize', code: 'BZ'},
            {name: 'Benin', code: 'BJ'},
            {name: 'Bermuda', code: 'BM'},
            {name: 'Bhutan', code: 'BT'},
            {name: 'Bolivia', code: 'BO'},
            {name: 'Bosnia and Herzegovina', code: 'BA'},
            {name: 'Botswana', code: 'BW'},
            {name: 'Bouvet Island', code: 'BV'},
            {name: 'Brazil', code: 'BR'},
            {name: 'British Indian Ocean Territory', code: 'IO'},
            {name: 'Brunei Darussalam', code: 'BN'},
            {name: 'Bulgaria', code: 'BG'},
            {name: 'Burkina Faso', code: 'BF'},
            {name: 'Burundi', code: 'BI'},
            {name: 'Cambodia', code: 'KH'},
            {name: 'Cameroon', code: 'CM'},
            {name: 'Canada', code: 'CA'},
            {name: 'Cape Verde', code: 'CV'},
            {name: 'Cayman Islands', code: 'KY'},
            {name: 'Central African Republic', code: 'CF'},
            {name: 'Chad', code: 'TD'},
            {name: 'Chile', code: 'CL'},
            {name: 'China', code: 'CN'},
            {name: 'Christmas Island', code: 'CX'},
            {name: 'Cocos (Keeling) Islands', code: 'CC'},
            {name: 'Colombia', code: 'CO'},
            {name: 'Comoros', code: 'KM'},
            {name: 'Congo', code: 'CG'},
            {name: 'Congo, The Democratic Republic of the', code: 'CD'},
            {name: 'Cook Islands', code: 'CK'},
            {name: 'Costa Rica', code: 'CR'},
            {name: 'Cote D\'Ivoire', code: 'CI'},
            {name: 'Croatia', code: 'HR'},
            {name: 'Cuba', code: 'CU'},
            {name: 'Cyprus', code: 'CY'},
            {name: 'Czech Republic', code: 'CZ'},
            {name: 'Denmark', code: 'DK'},
            {name: 'Djibouti', code: 'DJ'},
            {name: 'Dominica', code: 'DM'},
            {name: 'Dominican Republic', code: 'DO'},
            {name: 'Ecuador', code: 'EC'},
            {name: 'Egypt', code: 'EG'},
            {name: 'El Salvador', code: 'SV'},
            {name: 'Equatorial Guinea', code: 'GQ'},
            {name: 'Eritrea', code: 'ER'},
            {name: 'Estonia', code: 'EE'},
            {name: 'Ethiopia', code: 'ET'},
            {name: 'Falkland Islands (Malvinas)', code: 'FK'},
            {name: 'Faroe Islands', code: 'FO'},
            {name: 'Fiji', code: 'FJ'},
            {name: 'Finland', code: 'FI'},
            {name: 'France', code: 'FR'},
            {name: 'French Guiana', code: 'GF'},
            {name: 'French Polynesia', code: 'PF'},
            {name: 'French Southern Territories', code: 'TF'},
            {name: 'Gabon', code: 'GA'},
            {name: 'Gambia', code: 'GM'},
            {name: 'Georgia', code: 'GE'},
            {name: 'Germany', code: 'DE'},
            {name: 'Ghana', code: 'GH'},
            {name: 'Gibraltar', code: 'GI'},
            {name: 'Greece', code: 'GR'},
            {name: 'Greenland', code: 'GL'},
            {name: 'Grenada', code: 'GD'},
            {name: 'Guadeloupe', code: 'GP'},
            {name: 'Guam', code: 'GU'},
            {name: 'Guatemala', code: 'GT'},
            {name: 'Guernsey', code: 'GG'},
            {name: 'Guinea', code: 'GN'},
            {name: 'Guinea-Bissau', code: 'GW'},
            {name: 'Guyana', code: 'GY'},
            {name: 'Haiti', code: 'HT'},
            {name: 'Heard Island and Mcdonald Islands', code: 'HM'},
            {name: 'Holy See (Vatican City State)', code: 'VA'},
            {name: 'Honduras', code: 'HN'},
            {name: 'Hong Kong', code: 'HK'},
            {name: 'Hungary', code: 'HU'},
            {name: 'Iceland', code: 'IS'},
            {name: 'India', code: 'IN'},
            {name: 'Indonesia', code: 'ID'},
            {name: 'Iran, Islamic Republic Of', code: 'IR'},
            {name: 'Iraq', code: 'IQ'},
            {name: 'Ireland', code: 'IE'},
            {name: 'Isle of Man', code: 'IM'},
            {name: 'Israel', code: 'IL'},
            {name: 'Italy', code: 'IT'},
            {name: 'Jamaica', code: 'JM'},
            {name: 'Japan', code: 'JP'},
            {name: 'Jersey', code: 'JE'},
            {name: 'Jordan', code: 'JO'},
            {name: 'Kazakhstan', code: 'KZ'},
            {name: 'Kenya', code: 'KE'},
            {name: 'Kiribati', code: 'KI'},
            {name: 'Korea, Democratic People\'s Republic of', code: 'KP'},
            {name: 'Korea, Republic of', code: 'KR'},
            {name: 'Kuwait', code: 'KW'},
            {name: 'Kyrgyzstan', code: 'KG'},
            {name: 'Lao People\'s Democratic Republic', code: 'LA'},
            {name: 'Latvia', code: 'LV'},
            {name: 'Lebanon', code: 'LB'},
            {name: 'Lesotho', code: 'LS'},
            {name: 'Liberia', code: 'LR'},
            {name: 'Libyan Arab Jamahiriya', code: 'LY'},
            {name: 'Liechtenstein', code: 'LI'},
            {name: 'Lithuania', code: 'LT'},
            {name: 'Luxembourg', code: 'LU'},
            {name: 'Macao', code: 'MO'},
            {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'},
            {name: 'Madagascar', code: 'MG'},
            {name: 'Malawi', code: 'MW'},
            {name: 'Malaysia', code: 'MY'},
            {name: 'Maldives', code: 'MV'},
            {name: 'Mali', code: 'ML'},
            {name: 'Malta', code: 'MT'},
            {name: 'Marshall Islands', code: 'MH'},
            {name: 'Martinique', code: 'MQ'},
            {name: 'Mauritania', code: 'MR'},
            {name: 'Mauritius', code: 'MU'},
            {name: 'Mayotte', code: 'YT'},
            {name: 'Mexico', code: 'MX'},
            {name: 'Micronesia, Federated States of', code: 'FM'},
            {name: 'Moldova, Republic of', code: 'MD'},
            {name: 'Monaco', code: 'MC'},
            {name: 'Mongolia', code: 'MN'},
            {name: 'Montserrat', code: 'MS'},
            {name: 'Morocco', code: 'MA'},
            {name: 'Mozambique', code: 'MZ'},
            {name: 'Myanmar', code: 'MM'},
            {name: 'Namibia', code: 'NA'},
            {name: 'Nauru', code: 'NR'},
            {name: 'Nepal', code: 'NP'},
            {name: 'Netherlands', code: 'NL'},
            {name: 'Netherlands Antilles', code: 'AN'},
            {name: 'New Caledonia', code: 'NC'},
            {name: 'New Zealand', code: 'NZ'},
            {name: 'Nicaragua', code: 'NI'},
            {name: 'Niger', code: 'NE'},
            {name: 'Nigeria', code: 'NG'},
            {name: 'Niue', code: 'NU'},
            {name: 'Norfolk Island', code: 'NF'},
            {name: 'Northern Mariana Islands', code: 'MP'},
            {name: 'Norway', code: 'NO'},
            {name: 'Oman', code: 'OM'},
            {name: 'Pakistan', code: 'PK'},
            {name: 'Palau', code: 'PW'},
            {name: 'Palestinian Territory, Occupied', code: 'PS'},
            {name: 'Panama', code: 'PA'},
            {name: 'Papua New Guinea', code: 'PG'},
            {name: 'Paraguay', code: 'PY'},
            {name: 'Peru', code: 'PE'},
            {name: 'Philippines', code: 'PH'},
            {name: 'Pitcairn', code: 'PN'},
            {name: 'Poland', code: 'PL'},
            {name: 'Portugal', code: 'PT'},
            {name: 'Puerto Rico', code: 'PR'},
            {name: 'Qatar', code: 'QA'},
            {name: 'Reunion', code: 'RE'},
            {name: 'Romania', code: 'RO'},
            {name: 'Russian Federation', code: 'RU'},
            {name: 'Rwanda', code: 'RW'},
            {name: 'Saint Helena', code: 'SH'},
            {name: 'Saint Kitts and Nevis', code: 'KN'},
            {name: 'Saint Lucia', code: 'LC'},
            {name: 'Saint Pierre and Miquelon', code: 'PM'},
            {name: 'Saint Vincent and the Grenadines', code: 'VC'},
            {name: 'Samoa', code: 'WS'},
            {name: 'San Marino', code: 'SM'},
            {name: 'Sao Tome and Principe', code: 'ST'},
            {name: 'Saudi Arabia', code: 'SA'},
            {name: 'Senegal', code: 'SN'},
            {name: 'Serbia and Montenegro', code: 'CS'},
            {name: 'Seychelles', code: 'SC'},
            {name: 'Sierra Leone', code: 'SL'},
            {name: 'Singapore', code: 'SG'},
            {name: 'Slovakia', code: 'SK'},
            {name: 'Slovenia', code: 'SI'},
            {name: 'Solomon Islands', code: 'SB'},
            {name: 'Somalia', code: 'SO'},
            {name: 'South Africa', code: 'ZA'},
            {name: 'South Georgia and the South Sandwich Islands', code: 'GS'},
            {name: 'Spain', code: 'ES'},
            {name: 'Sri Lanka', code: 'LK'},
            {name: 'Sudan', code: 'SD'},
            {name: 'Suriname', code: 'SR'},
            {name: 'Svalbard and Jan Mayen', code: 'SJ'},
            {name: 'Swaziland', code: 'SZ'},
            {name: 'Sweden', code: 'SE'},
            {name: 'Switzerland', code: 'CH'},
            {name: 'Syrian Arab Republic', code: 'SY'},
            {name: 'Taiwan, Province of China', code: 'TW'},
            {name: 'Tajikistan', code: 'TJ'},
            {name: 'Tanzania, United Republic of', code: 'TZ'},
            {name: 'Thailand', code: 'TH'},
            {name: 'Timor-Leste', code: 'TL'},
            {name: 'Togo', code: 'TG'},
            {name: 'Tokelau', code: 'TK'},
            {name: 'Tonga', code: 'TO'},
            {name: 'Trinidad and Tobago', code: 'TT'},
            {name: 'Tunisia', code: 'TN'},
            {name: 'Turkey', code: 'TR'},
            {name: 'Turkmenistan', code: 'TM'},
            {name: 'Turks and Caicos Islands', code: 'TC'},
            {name: 'Tuvalu', code: 'TV'},
            {name: 'Uganda', code: 'UG'},
            {name: 'Ukraine', code: 'UA'},
            {name: 'United Arab Emirates', code: 'AE'},
            {name: 'United Kingdom', code: 'GB'},
            {name: 'United States', code: 'US'},
            {name: 'United States Minor Outlying Islands', code: 'UM'},
            {name: 'Uruguay', code: 'UY'},
            {name: 'Uzbekistan', code: 'UZ'},
            {name: 'Vanuatu', code: 'VU'},
            {name: 'Venezuela', code: 'VE'},
            {name: 'Vietnam', code: 'VN'},
            {name: 'Virgin Islands, British', code: 'VG'},
            {name: 'Virgin Islands, U.S.', code: 'VI'},
            {name: 'Wallis and Futuna', code: 'WF'},
            {name: 'Western Sahara', code: 'EH'},
            {name: 'Yemen', code: 'YE'},
            {name: 'Zambia', code: 'ZM'},
            {name: 'Zimbabwe', code: 'ZW'}
          ];


          // Multiple
          vm.someGroupFn = function (item){

            if (item.name[0] >= 'A' && item.name[0] <= 'M')
                return 'From A - M';

            if (item.name[0] >= 'N' && item.name[0] <= 'Z')
                return 'From N - Z';

          };

          vm.counter = 0;
          vm.someFunction = function (item, model){
            vm.counter++;
            vm.eventResult = {item: item, model: model};
          };

          vm.availableColors = ['Red','Green','Blue','Yellow','Magenta','Maroon','Umbra','Turquoise'];

          vm.multipleDemo = {};
          vm.multipleDemo.colors = ['Blue','Red'];
          vm.multipleDemo.selectedPeople = [vm.people[5], vm.people[4]];
          vm.multipleDemo.selectedPeopleWithGroupBy = [vm.people[8], vm.people[6]];
          vm.multipleDemo.selectedPeopleSimple = ['samantha@email.com','wladimir@email.com'];
        }
    }

})();

/**=========================================================
 * Module: upload.js
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.forms')
        .controller('FileUploadController', FileUploadController);

    FileUploadController.$inject = ['FileUploader'];
    function FileUploadController(FileUploader) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          var uploader = vm.uploader = new FileUploader({
              url: 'server/upload.php'
          });

          // FILTERS

          uploader.filters.push({
              name: 'customFilter',
              fn: function(/*item, options*/) {
                  return this.queue.length < 10;
              }
          });

          // CALLBACKS

          uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
              console.info('onWhenAddingFileFailed', item, filter, options);
          };
          uploader.onAfterAddingFile = function(fileItem) {
              console.info('onAfterAddingFile', fileItem);
          };
          uploader.onAfterAddingAll = function(addedFileItems) {
              console.info('onAfterAddingAll', addedFileItems);
          };
          uploader.onBeforeUploadItem = function(item) {
              console.info('onBeforeUploadItem', item);
          };
          uploader.onProgressItem = function(fileItem, progress) {
              console.info('onProgressItem', fileItem, progress);
          };
          uploader.onProgressAll = function(progress) {
              console.info('onProgressAll', progress);
          };
          uploader.onSuccessItem = function(fileItem, response, status, headers) {
              console.info('onSuccessItem', fileItem, response, status, headers);
          };
          uploader.onErrorItem = function(fileItem, response, status, headers) {
              console.info('onErrorItem', fileItem, response, status, headers);
          };
          uploader.onCancelItem = function(fileItem, response, status, headers) {
              console.info('onCancelItem', fileItem, response, status, headers);
          };
          uploader.onCompleteItem = function(fileItem, response, status, headers) {
              console.info('onCompleteItem', fileItem, response, status, headers);
          };
          uploader.onCompleteAll = function() {
              console.info('onCompleteAll');
          };

          console.info('uploader', uploader);
        }
    }
})();

/**=========================================================
 * Module: validate-form.js
 * Initializes the validation plugin Parsley
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.forms')
        .directive('validateForm', validateForm);

    function validateForm () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          var $elem = $(element);
          if($.fn.parsley)
            $elem.parsley();
        }
    }

})();

/**=========================================================
 * Module: demo-pagination.js
 * Provides a simple demo for pagination
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.mailbox')
        .controller('MailboxController', MailboxController);

    function MailboxController() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.folders = [
            {name: 'Inbox',   folder: 'inbox',   alert: 42, icon: 'fa-inbox' },
            {name: 'Starred', folder: 'starred', alert: 10, icon: 'fa-star' },
            {name: 'Sent',    folder: 'sent',    alert: 0,  icon: 'fa-paper-plane-o' },
            {name: 'Draft',   folder: 'draft',   alert: 5,  icon: 'fa-edit' },
            {name: 'Trash',   folder: 'trash',   alert: 0,  icon: 'fa-trash'}
          ];

          vm.labels = [
            {name: 'Red',     color: 'danger'},
            {name: 'Pink',    color: 'pink'},
            {name: 'Blue',    color: 'info'},
            {name: 'Yellow',  color: 'warning'}
          ];

          vm.mail = {
            cc: false,
            bcc: false
          };
          // Mailbox editr initial content
          vm.content = '<p>Type something..</p>';
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('app.mailbox')
        .controller('MailFolderController', MailFolderController);

    MailFolderController.$inject = ['mails', '$stateParams'];
    function MailFolderController(mails, $stateParams) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          
          vm.folder = {};
          // no filter for inbox
          vm.folder.folder = $stateParams.folder === 'inbox' ? '' : $stateParams.folder;

          mails.all().then(function(mails){
            vm.mails = mails;
          });
        }
    }
})();

// A RESTful factory for retrieving mails from json file

(function() {
    'use strict';

    angular
        .module('app.mailbox')
        .factory('mails', mails);

    mails.$inject = ['$http'];
    function mails($http) {
        var service = {
            all: all,
            get: get
        };
        return service;

        ////////////////
        
        function readMails() {
          var path = 'server/mails.json';
          return $http.get(path).then(function (resp) {
            return resp.data.mails;
          });
        }

        function all() {
          return readMails();
        }

        function get(id) {
          return readMails().then(function(mails){
            for (var i = 0; i < mails.length; i++) {
              if (+mails[i].id === +id) return mails[i];
            }
            return null;
          });
        }
    }
})();


(function() {
    'use strict';

    angular
        .module('app.mailbox')
        .controller('MailViewController', MailViewController);

    MailViewController.$inject = ['mails', '$stateParams'];
    function MailViewController(mails, $stateParams) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          mails.get($stateParams.mid).then(function(mail){
            vm.mail = mail;
          });
        }
    }
})();

/**=========================================================
 * Module: modals.js
 * Provides a simple way to implement bootstrap modals from templates
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.maps')
        .controller('ModalGmapController', ModalGmapController);

    ModalGmapController.$inject = ['$uibModal'];
    function ModalGmapController($uibModal) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          vm.open = function (size) {

            //var modalInstance =
            $uibModal.open({
              templateUrl: '/myModalContent.html',
              controller: ModalInstanceCtrl,
              size: size
            });
          };

          // Please note that $uibModalInstance represents a modal window (instance) dependency.
          // It is not the same as the $uibModal service used above.

          ModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance', '$timeout'];
          function ModalInstanceCtrl($scope, $uibModalInstance, $timeout) {

            $uibModalInstance.opened.then(function () {
              var position = new google.maps.LatLng(33.790807, -117.835734);

              $scope.mapOptionsModal = {
                zoom: 14,
                center: position,
                mapTypeId: google.maps.MapTypeId.ROADMAP
              };

              // we use timeout to wait maps to be ready before add a markers
              $timeout(function(){
                // 1. Add a marker at the position it was initialized
                new google.maps.Marker({
                  map: $scope.myMapModal,
                  position: position
                });
                // 2. Trigger a resize so the map is redrawed
                google.maps.event.trigger($scope.myMapModal, 'resize');
                // 3. Move to the center if it is misaligned
                $scope.myMapModal.panTo(position);
              });

            });

            $scope.ok = function () {
              $uibModalInstance.close('closed');
            };

            $scope.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };

          }

        }
    }

})();


(function() {
    'use strict';

    angular
        .module('app.maps')
        .controller('GMapController', GMapController);

    GMapController.$inject = ['$timeout'];
    function GMapController($timeout) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          var position = [
              new google.maps.LatLng(33.790807, -117.835734),
              new google.maps.LatLng(33.790807, -117.835734),
              new google.maps.LatLng(33.790807, -117.835734),
              new google.maps.LatLng(33.790807, -117.835734),
              new google.maps.LatLng(33.787453, -117.835858)
            ];
          
          vm.addMarker = addMarker;
          // we use timeout to wait maps to be ready before add a markers
          $timeout(function(){
            addMarker(vm.myMap1, position[0]);
            addMarker(vm.myMap2, position[1]);
            addMarker(vm.myMap3, position[2]);
            addMarker(vm.myMap5, position[3]);
          });

          vm.mapOptions1 = {
            zoom: 14,
            center: position[0],
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
          };

          vm.mapOptions2 = {
            zoom: 19,
            center: position[1],
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

          vm.mapOptions3 = {
            zoom: 14,
            center: position[2],
            mapTypeId: google.maps.MapTypeId.SATELLITE
          };

          vm.mapOptions4 = {
            zoom: 14,
            center: position[3],
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

          // for multiple markers
          $timeout(function(){
            addMarker(vm.myMap4, position[3]);
            addMarker(vm.myMap4, position[4]);
          });

          // custom map style
          var MapStyles = [{'featureType':'water','stylers':[{'visibility':'on'},{'color':'#bdd1f9'}]},{'featureType':'all','elementType':'labels.text.fill','stylers':[{'color':'#334165'}]},{featureType:'landscape',stylers:[{color:'#e9ebf1'}]},{featureType:'road.highway',elementType:'geometry',stylers:[{color:'#c5c6c6'}]},{featureType:'road.arterial',elementType:'geometry',stylers:[{color:'#fff'}]},{featureType:'road.local',elementType:'geometry',stylers:[{color:'#fff'}]},{featureType:'transit',elementType:'geometry',stylers:[{color:'#d8dbe0'}]},{featureType:'poi',elementType:'geometry',stylers:[{color:'#cfd5e0'}]},{featureType:'administrative',stylers:[{visibility:'on'},{lightness:33}]},{featureType:'poi.park',elementType:'labels',stylers:[{visibility:'on'},{lightness:20}]},{featureType:'road',stylers:[{color:'#d8dbe0',lightness:20}]}];
          vm.mapOptions5 = {
            zoom: 14,
            center: position[3],
            styles: MapStyles,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
          };

          ///////////////
          
          function addMarker(map, position) {
            return new google.maps.Marker({
              map: map,
              position: position
            });
          }

        }
    }
})();

/**=========================================================
 * Module: vector-map.js.js
 * Init jQuery Vector Map plugin
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.maps')
        .directive('vectorMap', vectorMap);

    vectorMap.$inject = ['VectorMap'];
    function vectorMap (VectorMap) {
        var directive = {
            link: link,
            restrict: 'EA',
            scope: {
              seriesData: '=',
              markersData: '='
            }
        };
        return directive;

        function link(scope, element, attrs) {
          
          var defaultColors = {
              markerColor:  '#23b7e5',      // the marker points
              bgColor:      'transparent',      // the background
              scaleColors:  ['#878c9a'],    // the color of the region in the serie
              regionFill:   '#bbbec6'       // the base region color
          };

          var mapHeight   = attrs.height || '300',
              options     = {
                markerColor:  attrs.markerColor  || defaultColors.markerColor,
                bgColor:      attrs.bgColor      || defaultColors.bgColor,
                scale:        attrs.scale        || 1,
                scaleColors:  attrs.scaleColors  || defaultColors.scaleColors,
                regionFill:   attrs.regionFill   || defaultColors.regionFill,
                mapName:      attrs.mapName      || 'world_mill_en'
              };
          
          element.css('height', mapHeight);
          
          VectorMap.init( element , options, scope.seriesData, scope.markersData);
        }
    }

})();

/**=========================================================
 * Module: vector-map.js
 * Services to initialize vector map plugin
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.maps')
        .service('VectorMap', VectorMap);

    function VectorMap() {
        this.init = init;

        ////////////////

        function init($element, opts, series, markers) {
          $element.vectorMap({
            map:             opts.mapName,
            backgroundColor: opts.bgColor,
            zoomMin:         1,
            zoomMax:         8,
            zoomOnScroll:    false,
            regionStyle: {
              initial: {
                'fill':           opts.regionFill,
                'fill-opacity':   1,
                'stroke':         'none',
                'stroke-width':   1.5,
                'stroke-opacity': 1
              },
              hover: {
                'fill-opacity': 0.8
              },
              selected: {
                fill: 'blue'
              },
              selectedHover: {
              }
            },
            focusOn:{ x:0.4, y:0.6, scale: opts.scale},
            markerStyle: {
              initial: {
                fill: opts.markerColor,
                stroke: opts.markerColor
              }
            },
            onRegionLabelShow: function(e, el, code) {
              if ( series && series[code] )
                el.html(el.html() + ': ' + series[code] + ' visitors');
            },
            markers: markers,
            series: {
                regions: [{
                    values: series,
                    scale: opts.scaleColors,
                    normalizeFunction: 'polynomial'
                }]
            },
          });
        }
    }
})();

/**=========================================================
 * Module: vmaps,js
 * jVector Maps support
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.maps')
        .controller('VectorMapController', VectorMapController);

    function VectorMapController() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.seriesData = {
            'CA': 11100,   // Canada
            'DE': 2510,    // Germany
            'FR': 3710,    // France
            'AU': 5710,    // Australia
            'GB': 8310,    // Great Britain
            'RU': 9310,    // Russia
            'BR': 6610,    // Brazil
            'IN': 7810,    // India
            'CN': 4310,    // China
            'US': 839,     // USA
            'SA': 410      // Saudi Arabia
          };
          
          vm.markersData = [
            { latLng:[41.90, 12.45],  name:'Vatican City'          },
            { latLng:[43.73, 7.41],   name:'Monaco'                },
            { latLng:[-0.52, 166.93], name:'Nauru'                 },
            { latLng:[-8.51, 179.21], name:'Tuvalu'                },
            { latLng:[7.11,171.06],   name:'Marshall Islands'      },
            { latLng:[17.3,-62.73],   name:'Saint Kitts and Nevis' },
            { latLng:[3.2,73.22],     name:'Maldives'              },
            { latLng:[35.88,14.5],    name:'Malta'                 },
            { latLng:[41.0,-71.06],   name:'New England'           },
            { latLng:[12.05,-61.75],  name:'Grenada'               },
            { latLng:[13.16,-59.55],  name:'Barbados'              },
            { latLng:[17.11,-61.85],  name:'Antigua and Barbuda'   },
            { latLng:[-4.61,55.45],   name:'Seychelles'            },
            { latLng:[7.35,134.46],   name:'Palau'                 },
            { latLng:[42.5,1.51],     name:'Andorra'               }
          ];
        }
    }
})();

/**=========================================================
 * Module: navbar-search.js
 * Navbar search toggler * Auto dismiss on ESC key
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.navsearch')
        .directive('searchOpen', searchOpen)
        .directive('searchDismiss', searchDismiss);

    //
    // directives definition
    // 
    
    function searchOpen () {
        var directive = {
            controller: searchOpenController,
            restrict: 'A'
        };
        return directive;

    }

    function searchDismiss () {
        var directive = {
            controller: searchDismissController,
            restrict: 'A'
        };
        return directive;
        
    }

    //
    // Contrller definition
    // 
    
    searchOpenController.$inject = ['$scope', '$element', 'NavSearch'];
    function searchOpenController ($scope, $element, NavSearch) {
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', NavSearch.toggle);
    }

    searchDismissController.$inject = ['$scope', '$element', 'NavSearch'];
    function searchDismissController ($scope, $element, NavSearch) {
      
      var inputSelector = '.navbar-form input[type="text"]';

      $(inputSelector)
        .on('click', function (e) { e.stopPropagation(); })
        .on('keyup', function(e) {
          if (e.keyCode === 27) // ESC
            NavSearch.dismiss();
        });
        
      // click anywhere closes the search
      $(document).on('click', NavSearch.dismiss);
      // dismissable options
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', NavSearch.dismiss);
    }

})();


/**=========================================================
 * Module: nav-search.js
 * Services to share navbar search functions
 =========================================================*/
 
(function() {
    'use strict';

    angular
        .module('app.navsearch')
        .service('NavSearch', NavSearch);

    function NavSearch() {
        this.toggle = toggle;
        this.dismiss = dismiss;

        ////////////////

        var navbarFormSelector = 'form.navbar-form';

        function toggle() {
          var navbarForm = $(navbarFormSelector);

          navbarForm.toggleClass('open');
          
          var isOpen = navbarForm.hasClass('open');
          
          navbarForm.find('input')[isOpen ? 'focus' : 'blur']();
        }

        function dismiss() {
          $(navbarFormSelector)
            .removeClass('open') // Close control
            .find('input[type="text"]').blur() // remove focus
            .val('') // Empty input
            ;
        }        
    }
})();

/**=========================================================
 * Module: demo-notify.js
 * Provides a simple demo for notify
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.notify')
        .controller('NotifyDemoCtrl', NotifyDemoCtrl);

    NotifyDemoCtrl.$inject = ['Notify', '$timeout'];
    function NotifyDemoCtrl(Notify, $timeout) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.msgHtml = '<em class="fa fa-check"></em> Message with icon..';

          vm.notifyMsg = 'Some messages here..';
          vm.notifyOpts = {
            status: 'danger',
            pos: 'bottom-center'
          };

          // Service usage example
          $timeout(function(){
            
            Notify.alert( 
                'This is a custom message from notify..', 
                {status: 'success'}
            );
          
          }, 500);
        }
    }
})();

/**=========================================================
 * Module: notify.js
 * Directive for notify plugin
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.notify')
        .directive('notify', notify);

    notify.$inject = ['$window', 'Notify'];
    function notify ($window, Notify) {

        var directive = {
            link: link,
            restrict: 'A',
            scope: {
              options: '=',
              message: '='
            }
        };
        return directive;

        function link(scope, element) {

          element.on('click', function (e) {
            e.preventDefault();
            Notify.alert(scope.message, scope.options);
          });
        }

    }

})();


/**=========================================================
 * Module: notify.js
 * Create a notifications that fade out automatically.
 * Based on Notify addon from UIKit (http://getuikit.com/docs/addons_notify.html)
 =========================================================*/

(function() {
    'use strict';
    angular
        .module('app.notify')
        .service('Notify', Notify);

    Notify.$inject = ['$timeout'];
    function Notify($timeout) {

        this.alert = notifyAlert;

        ////////////////

        function notifyAlert(msg, opts) {
            if ( msg ) {
                $timeout(function(){
                    $.notify(msg, opts || {});
                });
            }
        }
    }

})();

/**
 * Notify Addon definition as jQuery plugin
 * Adapted version to work with Bootstrap classes
 * More information http://getuikit.com/docs/addons_notify.html
 */
(function($){
    'use strict';
    var containers = {},
        messages   = {},
        notify     =  function(options){
            if ($.type(options) === 'string') {
                options = { message: options };
            }
            if (arguments[1]) {
                options = $.extend(options, $.type(arguments[1]) === 'string' ? {status:arguments[1]} : arguments[1]);
            }
            return (new Message(options)).show();
        },
        closeAll  = function(group, instantly){
            var id;
            if(group) {
                for(id in messages) { if(group===messages[id].group) messages[id].close(instantly); }
            } else {
                for(id in messages) { messages[id].close(instantly); }
            }
        };
    var Message = function(options){
        // var $this = this;
        this.options = $.extend({}, Message.defaults, options);
        this.uuid    = 'ID'+(new Date().getTime())+'RAND'+(Math.ceil(Math.random() * 100000));
        this.element = $([
            // @geedmo: alert-dismissable enables bs close icon
            '<div class="uk-notify-message alert-dismissable">',
                '<a class="close">&times;</a>',
                '<div>'+this.options.message+'</div>',
            '</div>'
        ].join('')).data('notifyMessage', this);
        // status
        if (this.options.status) {
            this.element.addClass('alert alert-'+this.options.status);
            this.currentstatus = this.options.status;
        }
        this.group = this.options.group;
        messages[this.uuid] = this;
        if(!containers[this.options.pos]) {
            containers[this.options.pos] = $('<div class="uk-notify uk-notify-'+this.options.pos+'"></div>').appendTo('body').on('click', '.uk-notify-message', function(){
                $(this).data('notifyMessage').close();
            });
        }
    };
    $.extend(Message.prototype, {
        uuid: false,
        element: false,
        timout: false,
        currentstatus: '',
        group: false,
        show: function() {
            if (this.element.is(':visible')) return;
            var $this = this;
            containers[this.options.pos].show().prepend(this.element);
            var marginbottom = parseInt(this.element.css('margin-bottom'), 10);
            this.element.css({'opacity':0, 'margin-top': -1*this.element.outerHeight(), 'margin-bottom':0}).animate({'opacity':1, 'margin-top': 0, 'margin-bottom':marginbottom}, function(){
                if ($this.options.timeout) {
                    var closefn = function(){ $this.close(); };
                    $this.timeout = setTimeout(closefn, $this.options.timeout);
                    $this.element.hover(
                        function() { clearTimeout($this.timeout); },
                        function() { $this.timeout = setTimeout(closefn, $this.options.timeout);  }
                    );
                }
            });
            return this;
        },
        close: function(instantly) {
            var $this    = this,
                finalize = function(){
                    $this.element.remove();
                    if(!containers[$this.options.pos].children().length) {
                        containers[$this.options.pos].hide();
                    }
                    delete messages[$this.uuid];
                };
            if(this.timeout) clearTimeout(this.timeout);
            if(instantly) {
                finalize();
            } else {
                this.element.animate({'opacity':0, 'margin-top': -1* this.element.outerHeight(), 'margin-bottom':0}, function(){
                    finalize();
                });
            }
        },
        content: function(html){
            var container = this.element.find('>div');
            if(!html) {
                return container.html();
            }
            container.html(html);
            return this;
        },
        status: function(status) {
            if(!status) {
                return this.currentstatus;
            }
            this.element.removeClass('alert alert-'+this.currentstatus).addClass('alert alert-'+status);
            this.currentstatus = status;
            return this;
        }
    });
    Message.defaults = {
        message: '',
        status: 'normal',
        timeout: 5000,
        group: null,
        pos: 'top-center'
    };
    
    $.notify          = notify;
    $.notify.message  = Message;
    $.notify.closeAll = closeAll;
    
    return notify;
}(jQuery));

/**=========================================================
 * Collapse panels * [panel-collapse]
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.panels')
        .directive('panelCollapse', panelCollapse);

    function panelCollapse () {
        var directive = {
            controller: Controller,
            restrict: 'A',
            scope: false
        };
        return directive;
    }

    Controller.$inject = ['$scope', '$element', '$timeout', '$localStorage'];
    function Controller ($scope, $element, $timeout, $localStorage) {
      var storageKeyName = 'panelState';

      // Prepare the panel to be collapsible
      var $elem   = $($element),
          parent  = $elem.closest('.panel'), // find the first parent panel
          panelId = parent.attr('id');

      // Load the saved state if exists
      var currentState = loadPanelState( panelId );
      if ( typeof currentState !== 'undefined') {
        $timeout(function(){
            $scope[panelId] = currentState; },
          10);
      }

      // bind events to switch icons
      $element.bind('click', function(e) {
        e.preventDefault();
        savePanelState( panelId, !$scope[panelId] );

      });
  
      // Controller helpers
      function savePanelState(id, state) {
        if(!id) return false;
        var data = angular.fromJson($localStorage[storageKeyName]);
        if(!data) { data = {}; }
        data[id] = state;
        $localStorage[storageKeyName] = angular.toJson(data);
      }
      function loadPanelState(id) {
        if(!id) return false;
        var data = angular.fromJson($localStorage[storageKeyName]);
        if(data) {
          return data[id];
        }
      }
    }

})();

/**=========================================================
 * Dismiss panels * [panel-dismiss]
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.panels')
        .directive('panelDismiss', panelDismiss);

    function panelDismiss () {

        var directive = {
            controller: Controller,
            restrict: 'A'
        };
        return directive;

    }

    Controller.$inject = ['$scope', '$element', '$q', 'Utils'];
    function Controller ($scope, $element, $q, Utils) {
      var removeEvent   = 'panel-remove',
          removedEvent  = 'panel-removed';

      $element.on('click', function (e) {
        e.preventDefault();

        // find the first parent panel
        var parent = $(this).closest('.panel');

        removeElement();

        function removeElement() {
          var deferred = $q.defer();
          var promise = deferred.promise;
          
          // Communicate event destroying panel
          $scope.$emit(removeEvent, parent.attr('id'), deferred);
          promise.then(destroyMiddleware);
        }

        // Run the animation before destroy the panel
        function destroyMiddleware() {
          if(Utils.support.animation) {
            parent.animo({animation: 'bounceOut'}, destroyPanel);
          }
          else destroyPanel();
        }

        function destroyPanel() {

          var col = parent.parent();
          parent.remove();
          // remove the parent if it is a row and is empty and not a sortable (portlet)
          col
            .filter(function() {
            var el = $(this);
            return (el.is('[class*="col-"]:not(.sortable)') && el.children('*').length === 0);
          }).remove();

          // Communicate event destroyed panel
          $scope.$emit(removedEvent, parent.attr('id'));

        }

      });
    }
})();



/**=========================================================
 * Refresh panels
 * [panel-refresh] * [data-spinner="standard"]
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.panels')
        .directive('panelRefresh', panelRefresh);

    function panelRefresh () {
        var directive = {
            controller: Controller,
            restrict: 'A',
            scope: false
        };
        return directive;

    }

    Controller.$inject = ['$scope', '$element'];
    function Controller ($scope, $element) {
      var refreshEvent   = 'panel-refresh',
          whirlClass     = 'whirl',
          defaultSpinner = 'standard';

      // catch clicks to toggle panel refresh
      $element.on('click', function (e) {
        e.preventDefault();

        var $this   = $(this),
            panel   = $this.parents('.panel').eq(0),
            spinner = $this.data('spinner') || defaultSpinner
            ;

        // start showing the spinner
        panel.addClass(whirlClass + ' ' + spinner);

        // Emit event when refresh clicked
        $scope.$emit(refreshEvent, panel.attr('id'));

      });

      // listen to remove spinner
      $scope.$on('removeSpinner', removeSpinner);

      // method to clear the spinner when done
      function removeSpinner (ev, id) {
        if (!id) return;
        var newid = id.charAt(0) === '#' ? id : ('#'+id);
        angular
          .element(newid)
          .removeClass(whirlClass);
      }
    }
})();



/**=========================================================
 * Module panel-tools.js
 * Directive tools to control panels.
 * Allows collapse, refresh and dismiss (remove)
 * Saves panel state in browser storage
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.panels')
        .directive('paneltool', paneltool);

    paneltool.$inject = ['$compile', '$timeout'];
    function paneltool ($compile, $timeout) {
        var directive = {
            link: link,
            restrict: 'E',
            scope: false
        };
        return directive;

        function link(scope, element, attrs) {

          var templates = {
            /* jshint multistr: true */
            collapse:'<a href="#" panel-collapse="" uib-tooltip="Collapse Panel" ng-click="{{panelId}} = !{{panelId}}"> \
                        <em ng-show="{{panelId}}" class="fa fa-plus ng-no-animation"></em> \
                        <em ng-show="!{{panelId}}" class="fa fa-minus ng-no-animation"></em> \
                      </a>',
            dismiss: '<a href="#" panel-dismiss="" uib-tooltip="Close Panel">\
                       <em class="fa fa-times"></em>\
                     </a>',
            refresh: '<a href="#" panel-refresh="" data-spinner="{{spinner}}" uib-tooltip="Refresh Panel">\
                       <em class="fa fa-refresh"></em>\
                     </a>'
          };

          var tools = scope.panelTools || attrs;

          $timeout(function() {
            element.html(getTemplate(element, tools )).show();
            $compile(element.contents())(scope);

            element.addClass('pull-right');
          });

          function getTemplate( elem, attrs ){
            var temp = '';
            attrs = attrs || {};
            if(attrs.toolCollapse)
              temp += templates.collapse.replace(/{{panelId}}/g, (elem.parent().parent().attr('id')) );
            if(attrs.toolDismiss)
              temp += templates.dismiss;
            if(attrs.toolRefresh)
              temp += templates.refresh.replace(/{{spinner}}/g, attrs.toolRefresh);
            return temp;
          }
        }// link
    }

})();

/**=========================================================
 * Module: demo-panels.js
 * Provides a simple demo for panel actions
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.panels')
        .controller('PanelsCtrl', PanelsCtrl);

    PanelsCtrl.$inject = ['$scope', '$timeout'];
    function PanelsCtrl($scope, $timeout) {

        activate();

        ////////////////

        function activate() {

          // PANEL COLLAPSE EVENTS
          // ----------------------------------- 

          // We can use panel id name for the boolean flag to [un]collapse the panel
          $scope.$watch('panelDemo1',function(newVal){
              
              console.log('panelDemo1 collapsed: ' + newVal);

          });


          // PANEL DISMISS EVENTS
          // ----------------------------------- 

          // Before remove panel
          $scope.$on('panel-remove', function(event, id, deferred){
            
            console.log('Panel #' + id + ' removing');
            
            // Here is obligatory to call the resolve() if we pretend to remove the panel finally
            // Not calling resolve() will NOT remove the panel
            // It's up to your app to decide if panel should be removed or not
            deferred.resolve();
          
          });

          // Panel removed ( only if above was resolved() )
          $scope.$on('panel-removed', function(event, id){

            console.log('Panel #' + id + ' removed');

          });


          // PANEL REFRESH EVENTS
          // ----------------------------------- 

          $scope.$on('panel-refresh', function(event, id) {
            var secs = 3;
            
            console.log('Refreshing during ' + secs +'s #'+id);

            $timeout(function(){
              // directive listen for to remove the spinner 
              // after we end up to perform own operations
              $scope.$broadcast('removeSpinner', id);
              
              console.log('Refreshed #' + id);

            }, 3000);

          });

          // PANELS VIA NG-REPEAT
          // ----------------------------------- 

          $scope.panels = [
            {
              id: 'panelRepeat1',
              title: 'Panel Title 1',
              body: 'Nulla eget lorem leo, sit amet elementum lorem. '
            },
            {
              id: 'panelRepeat2',
              title: 'Panel Title 2',
              body: 'Nulla eget lorem leo, sit amet elementum lorem. '
            },
            {
              id: 'panelRepeat3',
              title: 'Panel Title 3',
              body: 'Nulla eget lorem leo, sit amet elementum lorem. '
            }
          ];
        }

    } //PanelsCtrl

})();


/**=========================================================
 * Drag and drop any panel based on jQueryUI portlets
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.panels')
        .directive('portlet', portlet);

    portlet.$inject = ['$timeout', '$localStorage'];
    function portlet ($timeout, $localStorage) {
      var storageKeyName = 'portletState';

      return {
        restrict: 'A',
        link: link
      };

      /////////////

      function link(scope, element) {
          
        // not compatible with jquery sortable
        if(!$.fn.sortable) return;

        element.sortable({
          connectWith:          '[portlet]', // same like directive 
          items:                'div.panel',
          handle:               '.portlet-handler',
          opacity:              0.7,
          placeholder:          'portlet box-placeholder',
          cancel:               '.portlet-cancel',
          forcePlaceholderSize: true,
          iframeFix:            false,
          tolerance:            'pointer',
          helper:               'original',
          revert:               200,
          forceHelperSize:      true,
          update:               savePortletOrder,
          create:               loadPortletOrder
        });

      }


      function savePortletOrder(event/*, ui*/) {
        var self = event.target;
        var data = angular.fromJson($localStorage[storageKeyName]);
        
        if(!data) { data = {}; }

        data[self.id] = $(self).sortable('toArray');

        if(data) {
          $timeout(function() {
            $localStorage[storageKeyName] = angular.toJson(data);
          });
        }
      }

      function loadPortletOrder(event) {
        var self = event.target;
        var data = angular.fromJson($localStorage[storageKeyName]);

        if(data) {
          
          var porletId = self.id,
              panels   = data[porletId];

          if(panels) {
            var portlet = $('#'+porletId);
            
            $.each(panels, function(index, value) {
               $('#'+value).appendTo(portlet);
            });
          }

        }
      }

    }

})();
 
/**=========================================================
 * Module: angular-grid.js
 * Example for Angular Grid
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.tables')
        .controller('AngularGridController', AngularGridController);

    AngularGridController.$inject = ['$http'];
    function AngularGridController($http) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

            // Basic
            var columnDefs = [
                {headerName: 'Athlete', field: 'athlete', width: 150},
                {headerName: 'Age', field: 'age', width: 90},
                {headerName: 'Country', field: 'country', width: 120},
                {headerName: 'Year', field: 'year', width: 90},
                {headerName: 'Date', field: 'date', width: 110},
                {headerName: 'Sport', field: 'sport', width: 110},
                {headerName: 'Gold', field: 'gold', width: 100},
                {headerName: 'Silver', field: 'silver', width: 100},
                {headerName: 'Bronze', field: 'bronze', width: 100},
                {headerName: 'Total', field: 'total', width: 100}
            ];

            vm.gridOptions = {
                columnDefs: columnDefs,
                rowData: null,
                ready: function(api){
                  api.sizeColumnsToFit();
                }
            };

            // Filter Example
            var irishAthletes = ['John Joe Nevin','Katie Taylor','Paddy Barnes','Kenny Egan','Darren Sutherland', 'Margaret Thatcher', 'Tony Blair', 'Ronald Regan', 'Barack Obama'];

            var columnDefsFilter = [
                {headerName: 'Athlete', field: 'athlete', width: 150, filter: 'set',
                    filterParams: { cellHeight: 20, values: irishAthletes} },
                {headerName: 'Age', field: 'age', width: 90, filter: 'number'},
                {headerName: 'Country', field: 'country', width: 120},
                {headerName: 'Year', field: 'year', width: 90},
                {headerName: 'Date', field: 'date', width: 110},
                {headerName: 'Sport', field: 'sport', width: 110},
                {headerName: 'Gold', field: 'gold', width: 100, filter: 'number'},
                {headerName: 'Silver', field: 'silver', width: 100, filter: 'number'},
                {headerName: 'Bronze', field: 'bronze', width: 100, filter: 'number'},
                {headerName: 'Total', field: 'total', width: 100, filter: 'number'}
            ];

            vm.gridOptions1 = {
                columnDefs: columnDefsFilter,
                rowData: null,
                enableFilter: true,
                ready: function(api){
                  api.sizeColumnsToFit();
                }

            };


            // Pinning Example

            vm.gridOptions2 = {
                columnDefs: columnDefs,
                rowData: null,
                pinnedColumnCount: 2,
                ready: function(api){
                  api.sizeColumnsToFit();
                }
            };

            //-----------------------------
            // Get the data from SERVER
            //-----------------------------

            $http.get('server/ag-owinners.json')
                .then(function(res){
                    // basic
                    vm.gridOptions.api.setRowData(res.data);
                    vm.gridOptions.api.sizeColumnsToFit();
                    // filter
                    vm.gridOptions1.api.setRowData(res.data);
                    vm.gridOptions1.api.sizeColumnsToFit();

                    // pinning
                    vm.gridOptions2.api.setRowData(res.data);
                    vm.gridOptions2.api.sizeColumnsToFit();
                });

        }
    }
})();

/**=========================================================
 * Module: datatable,js
 * Angular Datatable controller
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.tables')
        .controller('DataTableController', DataTableController);

    DataTableController.$inject = ['$resource', 'DTOptionsBuilder', 'DTColumnDefBuilder'];
    function DataTableController($resource, DTOptionsBuilder, DTColumnDefBuilder) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          // Ajax

          $resource('server/datatable.json').query().$promise.then(function(persons) {
             vm.persons = persons;
          });

          // Changing data

          vm.heroes = [{
              'id': 860,
              'firstName': 'Superman',
              'lastName': 'Yoda'
            }, {
              'id': 870,
              'firstName': 'Ace',
              'lastName': 'Ventura'
            }, {
              'id': 590,
              'firstName': 'Flash',
              'lastName': 'Gordon'
            }, {
              'id': 803,
              'firstName': 'Luke',
              'lastName': 'Skywalker'
            }
          ];

          vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
          vm.dtColumnDefs = [
              DTColumnDefBuilder.newColumnDef(0),
              DTColumnDefBuilder.newColumnDef(1),
              DTColumnDefBuilder.newColumnDef(2),
              DTColumnDefBuilder.newColumnDef(3).notSortable()
          ];
          vm.person2Add = _buildPerson2Add(1);
          vm.addPerson = addPerson;
          vm.modifyPerson = modifyPerson;
          vm.removePerson = removePerson;

          function _buildPerson2Add(id) {
              return {
                  id: id,
                  firstName: 'Foo' + id,
                  lastName: 'Bar' + id
              };
          }
          function addPerson() {
              vm.heroes.push(angular.copy(vm.person2Add));
              vm.person2Add = _buildPerson2Add(vm.person2Add.id + 1);
          }
          function modifyPerson(index) {
              vm.heroes.splice(index, 1, angular.copy(vm.person2Add));
              vm.person2Add = _buildPerson2Add(vm.person2Add.id + 1);
          }
          function removePerson(index) {
              vm.heroes.splice(index, 1);
          }

        }
    }
})();

/**=========================================================
 * Module: ng-grid.js
 * ngGrid demo
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.tables')
        .controller('NGGridController', NGGridController);

    NGGridController.$inject = ['$scope', '$http', '$timeout'];
    function NGGridController($scope, $http, $timeout) {

        activate();

        ////////////////

        function activate() {

          $scope.filterOptions = {
              filterText: '',
              useExternalFilter: true
          };
          $scope.totalServerItems = 0;
          $scope.pagingOptions = {
              pageSizes:   [250, 500, 1000],  // page size options
              pageSize:    250,              // default page size
              currentPage: 1                 // initial page
          };

          $scope.gridOptions = {
              data:             'myData',
              enablePaging:     true,
              showFooter:       true,
              rowHeight:        36,
              headerRowHeight:  38,
              totalServerItems: 'totalServerItems',
              pagingOptions:    $scope.pagingOptions,
              filterOptions:    $scope.filterOptions
          };

          $scope.setPagingData = function(data, page, pageSize){
              // calc for pager
              var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
              // Store data from server
              $scope.myData = pagedData;
              // Update server side data length
              $scope.totalServerItems = data.length;

              if (!$scope.$$phase) {
                  $scope.$apply();
              }

          };

          $scope.getPagedDataAsync = function (pageSize, page, searchText) {
            var ngGridResourcePath = 'server/ng-grid-data.json';

            $timeout(function () {

                if (searchText) {
                    var ft = searchText.toLowerCase();
                    $http.get(ngGridResourcePath).success(function (largeLoad) {
                        var data = largeLoad.filter(function(item) {
                            return JSON.stringify(item).toLowerCase().indexOf(ft) !== -1;
                        });
                        $scope.setPagingData(data,page,pageSize);
                    });
                } else {
                    $http.get(ngGridResourcePath).success(function (largeLoad) {
                        $scope.setPagingData(largeLoad,page,pageSize);
                    });
                }
            }, 100);
          };


          $scope.$watch('pagingOptions', function (newVal, oldVal) {
              if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
              }
          }, true);
          $scope.$watch('filterOptions', function (newVal, oldVal) {
              if (newVal !== oldVal) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
              }
          }, true);

          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('app.tables')
        .service('ngTableDataService', ngTableDataService);

    function ngTableDataService() {
        /* jshint validthis:true */
        var self = this;
        this.cache = null;
        this.getData = getData;

        ////////////////

        function getData($defer, params, api) {
          // if no cache, request data and filter
          if ( ! self.cache ) {
            if ( api ) {
              api.get(function(data){
                self.cache = data;
                filterdata($defer, params);
              });
            }
          }
          else {
            filterdata($defer, params);
          }
          
          function filterdata($defer, params) {
            var from = (params.page() - 1) * params.count();
            var to = params.page() * params.count();
            var filteredData = self.cache.result.slice(from, to);

            params.total(self.cache.total);
            $defer.resolve(filteredData);
          }

        }
    }
})();

/**=========================================================
 * Module: NGTableCtrl.js
 * Controller for ngTables
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.tables')
        .controller('NGTableCtrl', NGTableCtrl);
    /*jshint -W055 */
    NGTableCtrl.$inject = ['$filter', 'ngTableParams', '$resource', '$timeout', 'ngTableDataService'];
    function NGTableCtrl($filter, ngTableParams, $resource, $timeout, ngTableDataService) {
        var vm = this;
        vm.title = 'Controller';

        activate();

        ////////////////

        function activate() {
          var data = [
              {name: 'Moroni',  age: 50, money: -10   },
              {name: 'Tiancum', age: 43, money: 120   },
              {name: 'Jacob',   age: 27, money: 5.5   },
              {name: 'Nephi',   age: 29, money: -54   },
              {name: 'Enos',    age: 34, money: 110   },
              {name: 'Tiancum', age: 43, money: 1000  },
              {name: 'Jacob',   age: 27, money: -201  },
              {name: 'Nephi',   age: 29, money: 100   },
              {name: 'Enos',    age: 34, money: -52.5 },
              {name: 'Tiancum', age: 43, money: 52.1  },
              {name: 'Jacob',   age: 27, money: 110   },
              {name: 'Nephi',   age: 29, money: -55   },
              {name: 'Enos',    age: 34, money: 551   },
              {name: 'Tiancum', age: 43, money: -1410 },
              {name: 'Jacob',   age: 27, money: 410   },
              {name: 'Nephi',   age: 29, money: 100   },
              {name: 'Enos',    age: 34, money: -100  }
          ];

          // SELECT ROWS
          // ----------------------------------- 

          vm.data = data;

          vm.tableParams3 = new ngTableParams({
              page: 1,            // show first page
              count: 10          // count per page
          }, {
              total: data.length, // length of data
              getData: function ($defer, params) {
                  // use build-in angular filter
                  var filteredData = params.filter() ?
                          $filter('filter')(data, params.filter()) :
                          data;
                  var orderedData = params.sorting() ?
                          $filter('orderBy')(filteredData, params.orderBy()) :
                          data;

                  params.total(orderedData.length); // set total for recalc pagination
                  $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
              }
          });

          vm.changeSelection = function(user) {
            console.info(user);
          };

          // EXPORT CSV
          // -----------------------------------  

          var data4 = [{name: 'Moroni', age: 50},
              {name: 'Tiancum', age: 43},
              {name: 'Jacob', age: 27},
              {name: 'Nephi', age: 29},
              {name: 'Enos', age: 34},
              {name: 'Tiancum', age: 43},
              {name: 'Jacob', age: 27},
              {name: 'Nephi', age: 29},
              {name: 'Enos', age: 34},
              {name: 'Tiancum', age: 43},
              {name: 'Jacob', age: 27},
              {name: 'Nephi', age: 29},
              {name: 'Enos', age: 34},
              {name: 'Tiancum', age: 43},
              {name: 'Jacob', age: 27},
              {name: 'Nephi', age: 29},
              {name: 'Enos', age: 34}];

          vm.tableParams4 = new ngTableParams({
              page: 1,            // show first page
              count: 10           // count per page
          }, {
              total: data4.length, // length of data4
              getData: function($defer, params) {
                  $defer.resolve(data4.slice((params.page() - 1) * params.count(), params.page() * params.count()));
              }
          });


          // SORTING
          // ----------------------------------- 



          vm.tableParams = new ngTableParams({
              page: 1,            // show first page
              count: 10,          // count per page
              sorting: {
                  name: 'asc'     // initial sorting
              }
          }, {
              total: data.length, // length of data
              getData: function($defer, params) {
                  // use build-in angular filter
                  var orderedData = params.sorting() ?
                          $filter('orderBy')(data, params.orderBy()) :
                          data;
          
                  $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
              }
          });

          // FILTERS
          // ----------------------------------- 

          vm.tableParams2 = new ngTableParams({
              page: 1,            // show first page
              count: 10,          // count per page
              filter: {
                  name: '',
                  age: ''
                  // name: 'M'       // initial filter
              }
          }, {
              total: data.length, // length of data
              getData: function($defer, params) {
                  // use build-in angular filter
                  var orderedData = params.filter() ?
                         $filter('filter')(data, params.filter()) :
                         data;

                  vm.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

                  params.total(orderedData.length); // set total for recalc pagination
                  $defer.resolve(vm.users);
              }
          });

          // AJAX
          
          var Api = $resource('server/table-data.json');

          vm.tableParams5 = new ngTableParams({
              page: 1,            // show first page
              count: 10           // count per page
          }, {
              total: 0,           // length of data
              counts: [],         // hide page counts control
              getData: function($defer, params) {
                  
                  // Service using cache to avoid mutiple requests
                  ngTableDataService.getData( $defer, params, Api);
                  
                  /* direct ajax request to api (perform result pagination on the server)
                  Api.get(params.url(), function(data) {
                      $timeout(function() {
                          // update table params
                          params.total(data.total);
                          // set new data
                          $defer.resolve(data.result);
                      }, 500);
                  });
                  */
              }
          });
        }
    }
})();



/**=========================================================
 * Module: demo-buttons.js
 * Provides a simple demo for buttons actions
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.tables')
        .controller('TablexEditableController', TablexEditableController);

    TablexEditableController.$inject = ['$filter', '$http', 'editableOptions', 'editableThemes','$q'];
    function TablexEditableController($filter, $http, editableOptions, editableThemes, $q) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          // editable row
          // ----------------------------------- 
          vm.users = [
            {id: 1, name: 'awesome user1', status: 2, group: 4, groupName: 'admin'},
            {id: 2, name: 'awesome user2', status: undefined, group: 3, groupName: 'vip'},
            {id: 3, name: 'awesome user3', status: 2, group: null}
          ];

          vm.statuses = [
            {value: 1, text: 'status1'},
            {value: 2, text: 'status2'},
            {value: 3, text: 'status3'},
            {value: 4, text: 'status4'}
          ];

          vm.groups = [];
          vm.loadGroups = function() {
            return vm.groups.length ? null : $http.get('server/xeditable-groups.json').success(function(data) {
              vm.groups = data;
            });
          };

          vm.showGroup = function(user) {
            if(user.group && vm.groups.length) {
              var selected = $filter('filter')(vm.groups, {id: user.group});
              return selected.length ? selected[0].text : 'Not set';
            } else {
              return user.groupName || 'Not set';
            }
          };

          vm.showStatus = function(user) {
            var selected = [];
            if(user.status) {
              selected = $filter('filter')(vm.statuses, {value: user.status});
            }
            return selected.length ? selected[0].text : 'Not set';
          };

          vm.checkName = function(data, id) {
            if (id === 2 && data !== 'awesome') {
              return 'Username 2 should be `awesome`';
            }
          };

          vm.saveUser = function(data, id) {
            //vm.user not updated yet
            angular.extend(data, {id: id});
            console.log('Saving user: ' + id);
            // return $http.post('/saveUser', data);
          };

          // remove user
          vm.removeUser = function(index) {
            vm.users.splice(index, 1);
          };

          // add user
          vm.addUser = function() {
            vm.inserted = {
              id: vm.users.length+1,
              name: '',
              status: null,
              group: null,
              isNew: true
            };
            vm.users.push(vm.inserted);
          };

          // editable column
          // ----------------------------------- 


          vm.saveColumn = function(column) {
            var results = [];
            angular.forEach(vm.users, function(/*user*/) {
              // results.push($http.post('/saveColumn', {column: column, value: user[column], id: user.id}));
              console.log('Saving column: ' + column);
            });
            return $q.all(results);
          };

          // editable table
          // ----------------------------------- 

          // filter users to show
          vm.filterUser = function(user) {
            return user.isDeleted !== true;
          };

          // mark user as deleted
          vm.deleteUser = function(id) {
            var filtered = $filter('filter')(vm.users, {id: id});
            if (filtered.length) {
              filtered[0].isDeleted = true;
            }
          };

          // cancel all changes
          vm.cancel = function() {
            for (var i = vm.users.length; i--;) {
              var user = vm.users[i];
              // undelete
              if (user.isDeleted) {
                delete user.isDeleted;
              }
              // remove new 
              if (user.isNew) {
                vm.users.splice(i, 1);
              }
            }
          };

          // save edits
          vm.saveTable = function() {
            var results = [];
            for (var i = vm.users.length; i--;) {
              var user = vm.users[i];
              // actually delete user
              if (user.isDeleted) {
                vm.users.splice(i, 1);
              }
              // mark as not new 
              if (user.isNew) {
                user.isNew = false;
              }

              // send on server
              // results.push($http.post('/saveUser', user));
              console.log('Saving Table...');
            }

            return $q.all(results);
          };

        }
    }
})();

/**=========================================================
 * Module: UIGridController
  =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.tables')
        .controller('UIGridController', UIGridController);

    UIGridController.$inject = ['uiGridConstants', '$http'];
    function UIGridController(uiGridConstants, $http) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          // Basic example
          // ----------------------------------- 

          vm.gridOptions = {
            rowHeight: 34,
            data: [
              {
                  'name': 'Wilder Gonzales',
                  'gender': 'male',
                  'company': 'Geekko'
              },
              {
                  'name': 'Georgina Schultz',
                  'gender': 'female',
                  'company': 'Suretech'
              },
              {
                  'name': 'Carroll Buchanan',
                  'gender': 'male',
                  'company': 'Ecosys'
              },
              {
                  'name': 'Valarie Atkinson',
                  'gender': 'female',
                  'company': 'Hopeli'
              },
              {
                  'name': 'Schroeder Mathews',
                  'gender': 'male',
                  'company': 'Polarium'
              },
              {
                  'name': 'Ethel Price',
                  'gender': 'female',
                  'company': 'Enersol'
              },
              {
                  'name': 'Claudine Neal',
                  'gender': 'female',
                  'company': 'Sealoud'
              },
              {
                  'name': 'Beryl Rice',
                  'gender': 'female',
                  'company': 'Velity'
              },
              {
                  'name': 'Lynda Mendoza',
                  'gender': 'female',
                  'company': 'Dogspa'
              },
              {
                  'name': 'Sarah Massey',
                  'gender': 'female',
                  'company': 'Bisba'
              },
              {
                  'name': 'Robles Boyle',
                  'gender': 'male',
                  'company': 'Comtract'
              },
              {
                  'name': 'Evans Hickman',
                  'gender': 'male',
                  'company': 'Parleynet'
              },
              {
                  'name': 'Dawson Barber',
                  'gender': 'male',
                  'company': 'Dymi'
              },
              {
                  'name': 'Bruce Strong',
                  'gender': 'male',
                  'company': 'Xyqag'
              },
              {
                  'name': 'Nellie Whitfield',
                  'gender': 'female',
                  'company': 'Exospace'
              },
              {
                  'name': 'Jackson Macias',
                  'gender': 'male',
                  'company': 'Aquamate'
              },
              {
                  'name': 'Pena Pena',
                  'gender': 'male',
                  'company': 'Quarx'
              },
              {
                  'name': 'Lelia Gates',
                  'gender': 'female',
                  'company': 'Proxsoft'
              },
              {
                  'name': 'Letitia Vasquez',
                  'gender': 'female',
                  'company': 'Slumberia'
              },
              {
                  'name': 'Trevino Moreno',
                  'gender': 'male',
                  'company': 'Conjurica'
              }
            ]
          };
          
          // Complex example
          // ----------------------------------- 

          var data = [];
           
          vm.gridOptionsComplex = {
              showGridFooter: true,
              showColumnFooter: true,
              enableFiltering: true,
              columnDefs: [
                  { field: 'name', width: '13%' },
                  { field: 'address.street',aggregationType: uiGridConstants.aggregationTypes.sum, width: '13%' },
                  { field: 'age', aggregationType: uiGridConstants.aggregationTypes.avg, aggregationHideLabel: true, width: '13%' },
                  { name: 'ageMin', field: 'age', aggregationType: uiGridConstants.aggregationTypes.min, width: '13%', displayName: 'Age for min' },
                  { name: 'ageMax', field: 'age', aggregationType: uiGridConstants.aggregationTypes.max, width: '13%', displayName: 'Age for max' },
                  { name: 'customCellTemplate', 
                    field: 'age', 
                    width: '14%', 
                    footerCellTemplate: '<div class="ui-grid-cell-contents bg-info text-center">Custom HTML</div>' 
                  },
                  { name: 'registered', field: 'registered', width: '20%', cellFilter: 'date', footerCellFilter: 'date', aggregationType: uiGridConstants.aggregationTypes.max }
              ],
              data: data,
              onRegisterApi: function(gridApi) {
                vm.gridApi = gridApi;
              }
          };
           
          $http.get('server/uigrid-complex.json')
            .success(function(data) {
              data.forEach( function(row) {
                row.registered = Date.parse(row.registered);
              });
              vm.gridOptionsComplex.data = data;
            });


           vm.gridOptions1 = {
              paginationPageSizes: [25, 50, 75],
              paginationPageSize: 25,
              columnDefs: [
                { name: 'name' },
                { name: 'gender' },
                { name: 'company' }
              ]
            };
           
            $http.get('server/uigrid-100.json')
            .success(function (data) {
              vm.gridOptions1.data = data;
            });

        }
    }
})();
