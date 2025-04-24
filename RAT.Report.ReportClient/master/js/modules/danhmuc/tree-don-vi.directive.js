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