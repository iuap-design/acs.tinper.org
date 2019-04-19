'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var refValParse = function refValParse(value) {
    if (!value) return { refname: '', refpk: '' };

    try {
        var valueMap = JSON.parse(value);
        if (!valueMap.hasOwnProperty('refname') || !valueMap.hasOwnProperty('refpk')) {
            return { refname: '', refpk: '' };
        } else {
            return JSON.parse(value);
        }
    } catch (e) {
        return { refname: '', refpk: '' };
    }
};

exports.refValParse = refValParse;