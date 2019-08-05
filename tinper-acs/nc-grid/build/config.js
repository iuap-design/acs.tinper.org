'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


/**
 * 两列布局col取值为6 
 * 三列布局col取值为4
 * 
 */
// 有label
var Layout = {
    3: {
        label: 1,
        control: 2
    },
    4: {
        label: 1,
        control: 3
    },
    6: {
        label: 2,
        control: 4
    },
    12: {
        label: 1,
        control: 11
    }
};

// 无label
var Layout4 = {
    3: {
        label: 0,
        control: 3
    },
    4: {
        label: 0,
        control: 4
    },
    6: {
        label: 0,
        control: 6
    },
    12: {
        label: 0,
        control: 12
    }
};

var layouts = {
    Layout: Layout,
    Layout4: Layout4
};

var fileType = {
    IMG: ['jpg', 'jpeg', 'bmp', 'gif'],
    DOC: [],
    XLS: []

    // 总配置项
};exports["default"] = {
    allTypes: ['input', 'number', 'textarea', 'datepicker', 'rangepicker', 'switch', 'select', 'checkbox', 'radio', 'refer', 'customer', 'label', 'NCTZDatePickerStart', 'NCTZDatePickerEnd', 'checkbox_switch', 'switch_browse'],
    displayTypes: ['select', 'radio', 'checkbox', 'refer'],
    string: ['input', 'textarea', 'datepicker', 'select', 'checkbox', 'radio', 'refer', 'label'],
    "boolean": ['switch', 'checkbox_switch', 'switch_browse'],
    number: ['number'],
    valueTypesExceptNumber: ['input', 'textarea'],
    changeTypes: ['datepicker', 'rangepicker', 'switch', 'select', 'checkbox', 'radio', 'refer', 'NCTZDatePickerStart', 'NCTZDatePickerEnd', 'checkbox_switch', 'switch_browse', 'timepicker', 'datetimepicker', 'datePickerNoTimeZone'],
    blurTypes: ['input', 'number', 'textarea'],
    valueTypes: ['input', 'number', 'textarea'],
    noEditType: ['label', 'customer'],
    getDisplay: ['select', 'radio', 'checkbox'],
    status: { // 表格内数据状态
        origin: '0', //原始
        edit: '1', //修改
        add: '2', //新增
        "delete": '3' //已删除
    },
    timeTypes: ['datepicker', 'NCTZDatePickerStart', 'NCTZDatePickerEnd', 'timepicker', 'datetimepicker', 'rangepicker', 'datePickerNoTimeZone'],
    layouts: layouts, // 表单布局用
    beforeFocusTypes: ['residtxt', 'input', 'select', 'number', 'textarea', 'password', 'switch_browse', 'refer'],
    beforeChangeTypes: ['radio'],
    beforeClickTypes: ['datepicker', 'timepicker', 'datetimepicker', 'NCTZDatePickerStart', 'NCTZDatePickerEnd', 'rangepicker', 'datePickerNoTimeZone', 'checkbox_switch', 'checkbox'],
    hotKeyModuleIdPrefix: 'hot-key'
};
module.exports = exports['default'];