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

