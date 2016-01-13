"use strict";

var RE = {
    alreadyWrapped: /^[\s]*define\s*\(/m,
    disabled: /^\/[\/\*]+ *amd-wrap:disable/,
};

module.exports = function (sourceText) {
    var shouldWrap = true;

    if (RE.disabled.test(sourceText)) {
        // it was explicitly disabled
        shouldWrap = false;
    } else {
        // see if is already an AMD
        if (RE.alreadyWrapped.test(sourceText))
            shouldWrap = false;
    }

    if (shouldWrap) {
        return "define(function (require, exports, module) {" + sourceText + "\n});\n";
    } else {
        return sourceText;
    }
};
