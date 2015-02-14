define(function (require, exports, module) {/**
 * There are block comments atop this file.
 * Note that // comments won't work
 */
"use strict";

var pending = { then: function () {} };

module.exports = function (operation) {
    var latestPromise = null;

    return function () {
        var promiseForResult = operation.apply(this, arguments);
        latestPromise = promiseForResult;

        return promiseForResult.then(
            function (value) {
                if (latestPromise === promiseForResult) {
                    return value;
                } else {
                    return pending;
                }
            },
            function (reason) {
                if (latestPromise === promiseForResult) {
                    throw reason;
                } else {
                    return pending;
                }
            }
        );
    };
};

});
