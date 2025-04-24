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
