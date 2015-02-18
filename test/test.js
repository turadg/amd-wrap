"use strict";

var path = require("path");
var fs = require("fs");
var assert = require("assert");
var amdWrap = require("..");

specify("It wraps correctly", function () {
    var input = fs.readFileSync(path.resolve(__dirname, "fixtures/last.js"), "utf-8");
    var output = amdWrap(input);
    var expected = fs.readFileSync(path.resolve(__dirname, "fixtures/last.amd.js"), "utf-8");

    assert.strictEqual(output, expected);
});

specify("It wraps correctly event with block comments", function () {
    var input = fs.readFileSync(path.resolve(__dirname, "fixtures/lastWithComments.js"), "utf-8");
    var output = amdWrap(input);
    var expected = fs.readFileSync(path.resolve(__dirname, "fixtures/lastWithComments.amd.js"), "utf-8");

    assert.strictEqual(output, expected);
});

specify("It doesn't wrap an AMD module in the function(window) style", function () {
    var input = fs.readFileSync(path.resolve(__dirname, "fixtures/windowStyle.js"), "utf-8");
    var output = amdWrap(input);

    assert.strictEqual(output, input);
});

specify("It doesn't re-wrap when the string is already wrapped", function () {
    var input = fs.readFileSync(path.resolve(__dirname, "fixtures/last.amd.js"), "utf-8");
    var output = amdWrap(input);

    assert.strictEqual(output, input);
});

specify("It doesn't re-wrap when the string is already wrapped with space", function () {
    var input = fs.readFileSync(path.resolve(__dirname, "fixtures/prewrappedWithSpace.js"), "utf-8");
    var output = amdWrap(input);

    assert.strictEqual(output, input);
});

xspecify("It doesn't re-wrap when the string is already wrapped, with comments at top", function () {
    var input = fs.readFileSync(path.resolve(__dirname, "fixtures/prewrappedWithComments.js"), "utf-8");
    var output = amdWrap(input);

    assert.strictEqual(output, input);
});

specify("It can be disabled in /* comment", function () {
    var input = fs.readFileSync(path.resolve(__dirname, "fixtures/disabledSlashStar.js"), "utf-8");
    var output = amdWrap(input);

    assert.strictEqual(output, input);
});

specify("It can be disabled in // comment", function () {
    var input = fs.readFileSync(path.resolve(__dirname, "fixtures/disabledSlashes.js"), "utf-8");
    var output = amdWrap(input);

    assert.strictEqual(output, input);
});
