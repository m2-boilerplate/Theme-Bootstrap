define([], function () {
    'use strict';

    function ConsoleLogger() {

    }
    ConsoleLogger.prototype.utils = {
        asyncLog: function(){},
        createLevels: function(){},
        createMessages: function(){}
    };
    ConsoleLogger.prototype.displayCriteria_ = [];
    ConsoleLogger.prototype.displayLevel_ = 1;
    ConsoleLogger.prototype.entries_ = [];
    ConsoleLogger.prototype.entryFactory_ = {createEntry: function(){}};
    ConsoleLogger.prototype.levels = {
        ALL: 5,
        DEBUG: 4,
        ERROR: 1,
        INFO: 3,
        NONE: 0,
        WARN: 2
    };
    ConsoleLogger.prototype.messages = {
        getMessage: function(){},
        addMessage: function(){},
        hasMessage: function(){}
    };
    ConsoleLogger.prototype.outputHandlers_ = [];
    ConsoleLogger.prototype.addDisplayCriteria = function(){};
    ConsoleLogger.prototype.createEntry_ = function(){};
    ConsoleLogger.prototype.debug = function(){};
    ConsoleLogger.prototype.dump = function(){};
    ConsoleLogger.prototype.error = function(){};
    ConsoleLogger.prototype.getEntries = function(){};
    ConsoleLogger.prototype.info = function(){};
    ConsoleLogger.prototype.log_ = function(){};
    ConsoleLogger.prototype.matchesCriteria_ = function(){};
    ConsoleLogger.prototype.matchesLevel_ = function(){};
    ConsoleLogger.prototype.processOutput_ = function(){};
    ConsoleLogger.prototype.removeDisplayCriteria = function(){};
    ConsoleLogger.prototype.setDisplayLevel = function(){};
    ConsoleLogger.prototype.warn = function(){};

    return new ConsoleLogger();
});
