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