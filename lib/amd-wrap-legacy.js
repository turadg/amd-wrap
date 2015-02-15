"use strict";

var stripComments = require('strip-comments');

var RE = {
    alreadyWrapped: /^define\(function *\(require/,
    windowStyle: /^[ ;]*\(function *\(/,
    disabled: /^\/[\/\*]+ *amd-wrap:disable/,
};

RE.alreadyAmd = new RegExp(
    RE.alreadyWrapped.source + "|" +
    RE.windowStyle.source
);

module.exports = function (sourceText) {
    var shouldWrap = true;

    if (RE.disabled.test(sourceText)) {
        // it was explicitly disabled
        shouldWrap = false;
    } else {
        // see if is already an AMD
        if (RE.alreadyAmd.test(stripComments(sourceText)))
            shouldWrap = false;
    }

    if (shouldWrap) {
        return "define(function (require, exports, module) {" + sourceText + "\n});\n";
    } else {
        return sourceText;
    }
};
