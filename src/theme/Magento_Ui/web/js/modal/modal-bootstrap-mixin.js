define([
    'jquery'
], function ($) {
    'use strict';

    return function (widget) {

        $.widget('mage.modal', widget, {
            options: {
                modalVisibleClass: 'show',
                overlayClass: 'modal-backdrop fade show',
                parentModalClass: 'modal-open'
            },
            _setActive: function () {

                if (this.modal.data('active')) {
                    return;
                }
                this.modal.show();

                this.modal.data('active', true);

                if (this._getVisibleSlideCount()) {
                    this.modal.css('marginLeft', this.options.modalLeftMargin * this._getVisibleSlideCount());
                }
            },
            openModal: function () {
                this.options.isOpen = true;
                this.focussedElement = document.activeElement;
                this._createOverlay();
                this._setActive();
                this._setKeyListener();
                this.modal.one(this.options.transitionEvent, _.bind(this._setFocus, this, 'end', 'opened'));
                this.modal.one(this.options.transitionEvent, _.bind(this._trigger, this, 'opened'));
                setTimeout(function() {
                    this.modal.addClass(this.options.modalVisibleClass);
                }.bind(this), 300);

                if (!this.options.transitionEvent) {
                    this._trigger('opened');
                }

                return this.element;
            },

            /**
             * Unset styles for modal and set z-index for previous modal.
             */
            _unsetActive: function () {
                this.modal.removeAttr('style');
                this.modal.data('active', false);

            }
        });

        return $.mage.modal;
    }
});