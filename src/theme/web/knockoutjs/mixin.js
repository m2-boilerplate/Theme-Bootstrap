define([], function () {
    'use strict';

    return function (ko) {
        require([
            'Magento_Ui/js/lib/knockout/template/engine',
            'knockoutjs/knockout-es5',
            'Magento_Ui/js/lib/knockout/bindings/bootstrap',
            'Magento_Ui/js/lib/knockout/extender/observable_array',
            'Magento_Ui/js/lib/knockout/extender/bound-nodes',
            'domReady!'
        ], function (templateEngine) {
            ko.uid = 0;
            ko.setTemplateEngine(templateEngine);
            ko.applyBindings();
        });
        return ko;
    };
});