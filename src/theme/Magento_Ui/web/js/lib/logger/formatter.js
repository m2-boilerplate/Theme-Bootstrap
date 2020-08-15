/**
 * Copyright Â© Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([], function () {
    'use strict';

    /**
     * @param {String} dateFormat
     * @param {String} template
     */
    function LogFormatter(dateFormat, template) {
    }

    /**
     * @param {LogEntry} entry
     * @returns {String}
     */
    LogFormatter.prototype.process = function (entry) {
        return entry.message
    };

    return LogFormatter;
});