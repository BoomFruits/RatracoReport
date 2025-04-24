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
