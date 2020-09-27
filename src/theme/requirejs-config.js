var config = {
    map: {
        '*': {
            'jquery/jquery.mobile.custom': 'js/empty',
            'mage/translate-inline': 'js/empty',
            'jquery/jquery-migrate': 'js/empty',
            'jquery-ui-modules/effect': 'js/empty',
            'jquery-ui-modules/effect-blind': 'js/empty',
            'jquery-ui-modules/effect-bounce': 'js/empty',
            'jquery-ui-modules/effect-clip': 'js/empty',
            'jquery-ui-modules/effect-drop': 'js/empty',
            'jquery-ui-modules/effect-explode': 'js/empty',
            'jquery-ui-modules/effect-fade': 'js/empty',
            'jquery-ui-modules/effect-fold': 'js/empty',
            'jquery-ui-modules/effect-highlight': 'js/empty',
            'jquery-ui-modules/effect-pulsate': 'js/empty',
            'jquery-ui-modules/effect-scale': 'js/empty',
            'jquery-ui-modules/effect-shake': 'js/empty',
            'jquery-ui-modules/effect-slide': 'js/empty',
            'jquery-ui-modules/effect-transfer': 'js/empty',
            'jquery-ui-modules/draggable': 'js/empty',
            'dayjs': 'js/dayjs.min'
        }
    },
    config: {
        mixins: {
            'Magento_Ui/js/modal/modal': {
                'Magento_Ui/js/modal/modal-bootstrap-mixin': true
            }
        }
    }
};

/**
 * Removes polyfills only for browsers that support them
 */
if (typeof window !== 'undefined' && window.document) {
    /**
     * Polyfill Map and WeakMap for older browsers that do not support them.
     */
    if (typeof Map !== 'undefined' && typeof WeakMap !== 'undefined') {
        config.map['*']['es6-collections'] = 'js/empty';
    }

    /**
     * Polyfill MutationObserver only for the browsers that do not support it.
     */
    if (typeof MutationObserver !== 'undefined') {
        config.map['*']['MutationObserver'] = 'js/empty';
    }

    /**
     * Polyfill FormData object for old browsers that don't have full support for it.
     */
    if (typeof FormData !== 'undefined' && typeof FormData.prototype.get !== 'undefined') {
        config.map['*']['FormData'] = 'js/empty';
    }
}
