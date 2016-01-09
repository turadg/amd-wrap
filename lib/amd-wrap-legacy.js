"use strict";

var RE = {
    alreadyWrapped: /^[\s]*define\s*\(/m,
    windowStyle: /^[;\s]*\(\s*function *\(/m,
    disabled: /^\/[\/\*]+ *amd-wrap:disable/,
};

RE.alreadyAmd = new RegExp(
    RE.alreadyWrapped.source + "|" +
    RE.windowStyle.source,
    "m"
);

module.exports = function (sourceText) {
    var shouldWrap = true;

    if (RE.disabled.test(sourceText)) {
        // it was explicitly disabled
        shouldWrap = false;
    } else {
        // see if is already an AMD
        if (RE.alreadyAmd.test(sourceText))
            shouldWrap = false;
    }

    if (shouldWrap) {
        return "define(function (require, exports, module) {" + sourceText + "\n});\n";
    } else {
        return sourceText;
    }
};
