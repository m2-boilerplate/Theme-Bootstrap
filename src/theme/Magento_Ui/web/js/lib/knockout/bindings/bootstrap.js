/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define(function (require) {
    'use strict';

    var renderer = require('../template/renderer');
    var ko = require('ko');

    renderer.addAttribute('repeat', renderer.handlers.wrapAttribute);

    renderer.addAttribute('outerfasteach', {
        binding: 'fastForEach',
        handler: renderer.handlers.wrapAttribute
    });

    renderer
        .addNode('repeat')
        .addNode('fastForEach');

    function dynamicBind(name, file, after) {
        ko.bindingHandlers[name] = {
            init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
                require([file], function () {
                    if (ko.bindingHandlers[name].init) {
                        ko.bindingHandlers[name].init(element, valueAccessor, allBindings, viewModel, bindingContext)
                    }
                });
            },
            update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
                require([file], function () {
                    if (ko.bindingHandlers[name].update) {
                        ko.bindingHandlers[name].update(element, valueAccessor, allBindings, viewModel, bindingContext)
                    }
                });
            }
        };

        if (after) {
            ko.bindingHandlers[name].after = after;
        }
    }

    var bindingHandlers = {
        resizable:          dynamicBind('resizable', './resizable'),
        i18n:               dynamicBind('i18n', './i18n'),
        scope:              require('./scope'),
        range:              dynamicBind('range', './range'),
        mageInit:           dynamicBind('mageInit', './mage-init'),
        keyboard:           dynamicBind('keyboard', './keyboard'),
        optgroup:           dynamicBind('optgroup', './optgroup'),
        afterRender:        dynamicBind('afterRender', './after-render'),
        autoselect:         dynamicBind('autoselect', './autoselect'),
        datepicker:         dynamicBind('datepicker', './datepicker'),
        outerClick:         dynamicBind('outerClick', './outer_click'),
        fadeVisible:        dynamicBind('fadeVisible', './fadeVisible'),
        collapsible:        dynamicBind('collapsible', './collapsible'),
        openCollapsible:    dynamicBind('openCollapsible', './collapsible'),
        closeCollapsible:   dynamicBind('closeCollapsible', './collapsible'),
        toggleCollapsible:  dynamicBind('toggleCollapsible', './collapsible'),
        staticChecked:      dynamicBind('staticChecked', './staticChecked', ['value', 'attr']),
        simpleChecked:      dynamicBind('simpleChecked', './simple-checked', ['attr']),
        bindHtml:           dynamicBind('bindHtml', './bind-html'),
        tooltip:            dynamicBind('tooltip', './tooltip'),
        repeat:             dynamicBind('repeat', 'knockoutjs/knockout-repeat'),
        fastForEach:        dynamicBind('fastForEach', 'knockoutjs/knockout-fast-foreach'),
        colorPicker:        dynamicBind('colorPicker', './color-picker')
    };

    /**
     * Add Attributes
     */
    renderer.addAttribute('resizable');
    renderer.addAttribute('i18n');
    ko.virtualElements.allowedBindings.i18n = true;
    renderer.addAttribute('range');
    renderer.addAttribute('keyboard');
    ko.bindingHandlers.selectedOptions.after.push('optgroup');
    renderer.addAttribute('afterRender');
    renderer.addAttribute('autoselect');
    renderer.addAttribute('outerClick');
    renderer.addAttribute('collapsible');
    renderer.addAttribute('openCollapsible');
    renderer.addAttribute('closeCollapsible');
    renderer.addAttribute('toggleCollapsible');
    renderer.addAttribute('bindHtml');
    renderer.addAttribute('tooltip');
    renderer.addAttribute('colorPicker');
    renderer.addAttribute('staticChecked');
    renderer.addAttribute('simpleChecked');
    renderer.addAttribute('simple-checked', {
        binding: 'simpleChecked'
    });
    ko.virtualElements.allowedBindings.fastForEach = true;
    ko.virtualElements.allowedBindings.repeat = true;
    ko.expressionRewriting._twoWayBindings.staticChecked = true;
    ko.expressionRewriting._twoWayBindings.simpleChecked = true;

    return bindingHandlers;
});
