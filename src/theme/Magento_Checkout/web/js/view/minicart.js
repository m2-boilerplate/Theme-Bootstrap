
define([
    'uiComponent',
    'Magento_Customer/js/customer-data',
    'jquery',
    'ko'
], function (Component, customerData, $, ko) {
    'use strict';
    var addToCartCalls = 0;
    return Component.extend({
        defaults: {
            modalContent: null,
            isModalCreated: false,
            isCartLoading: false,
            tracks: {
                isModalCreated: true,
                isCartLoading: true
            }
        },
        shoppingCartUrl: window.checkout.shoppingCartUrl,
        maxItemsToDisplay: window.checkout.maxItemsToDisplay,
        cart: {},

        initialize: function () {
            var self = this,
                cartData = customerData.get('cart');

            this.update(cartData());
            cartData.subscribe(function (updatedCart) {
                addToCartCalls--;
                this.isLoading(addToCartCalls > 0);
                this.update(updatedCart);
            }, this);
            $('[data-block="minicart"]').on('contentLoading', function () {
                addToCartCalls++;
                self.isLoading(true);
            });

            if (
                cartData().website_id !== window.checkout.websiteId && cartData().website_id !== undefined ||
                cartData().storeId !== window.checkout.storeId && cartData().storeId !== undefined
            ) {
                customerData.reload(['cart'], false);
            }

            return this._super();
        },

        isLoading: ko.observable(false),
        /**
         * Close mini shopping cart.
         */
        closeMinicart: function () {

        },
        initSidebar: function () {},
        openMinicart: function () {
            if (this.isModalCreated) {
                $(this.modalContent).modal('openModal');
                return;
            }
            require(['Magento_Ui/js/modal/modal', 'mage/translate'], function (modal) {
                modal({
                    title: $.mage.__('My Cart'),
                    type: 'slide',
                    buttons: []
                }, $(this.modalContent));
                this.isModalCreated = true;
                $(this.modalContent).modal('openModal');
            }.bind(this));
        },
        initModal: function (modalContent) {
            this.modalContent = modalContent;
        },
        removeItem: function (item) {
            var self = this;
            require(['Magento_Ui/js/modal/confirm', 'mage/translate'], function (confirm) {
                confirm({
                    content: $.mage.__('Are you sure you would like to remove this item from the shopping cart?'),
                    actions: {
                        confirm: function () {
                            self._ajax(window.checkout.removeItemUrl, {
                                'item_id': item.item_id
                            });
                        }
                    }
                });
            });
        },
        updateItemQty: function (item, qty) {
            item.qty = qty;
            this._ajax(window.checkout.updateItemQtyUrl, {
                'item_id': item.item_id,
                'item_qty': qty
            });
        },

        _ajax: function (url, data) {
            $.extend(data, {
                'form_key': $.mage.cookies.get('form_key')
            });
            this.isCartLoading = true;
            $.ajax({
                url: url,
                data: data,
                type: 'post',
                dataType: 'json',
                context: this,
                complete: function () {
                    this.isCartLoading = false;
                }
            }).done(function (response) {
                var msg;

                if (response.success) {
                    customerData.reload(['cart'], false);
                } else {
                    msg = response['error_message'];

                    if (msg) {
                        require(['Magento_Ui/js/modal/alert'], function (alert) {
                            alert({
                                content: msg
                            });
                        });
                    }
                }
            }).fail(function (error) {
                console.log(JSON.stringify(error));
            });
        },

        /**
         * @return {Boolean}
         */
        closeSidebar: function () {},

        /**
         * @param {String} productType
         * @return {*|String}
         */
        getItemRenderer: function (productType) {
            return this.itemRenderer[productType] || 'defaultRenderer';
        },

        /**
         * Update mini shopping cart content.
         *
         * @param {Object} updatedCart
         * @returns void
         */
        update: function (updatedCart) {
            _.each(updatedCart, function (value, key) {
                if (!this.cart.hasOwnProperty(key)) {
                    this.cart[key] = ko.observable();
                }
                this.cart[key](value);
            }, this);
        },

        /**
         * Get cart param by name.
         * @param {String} name
         * @returns {*}
         */
        getCartParam: function (name) {
            if (!_.isUndefined(name)) {
                if (!this.cart.hasOwnProperty(name)) {
                    this.cart[name] = ko.observable();
                }
            }

            return this.cart[name]();
        },

        /**
         * Returns array of cart items, limited by 'maxItemsToDisplay' setting
         * @returns []
         */
        getCartItems: function () {
            var items = this.getCartParam('items') || [];

            items = items.slice(parseInt(-this.maxItemsToDisplay, 10));

            return items;
        },

        /**
         * Returns count of cart line items
         * @returns {Number}
         */
        getCartLineItemsCount: function () {
            var items = this.getCartParam('items') || [];

            return parseInt(items.length, 10);
        }
    });
});
