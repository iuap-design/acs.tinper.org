"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var currentIndex = void 0;

function getFocusRowIndex() {
    return currentIndex;
}

function setFocusRowIndex(index) {
    currentIndex = index;
}

exports.getFocusRowIndex = getFocusRowIndex;
exports.setFocusRowIndex = setFocusRowIndex;