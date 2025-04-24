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
