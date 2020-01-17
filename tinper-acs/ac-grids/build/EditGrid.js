"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _AcGrids = require("./AcGrids");

var _AcGrids2 = _interopRequireDefault(_AcGrids);

var _RenderColumn = require("./RenderColumn");

var _RenderColumn2 = _interopRequireDefault(_RenderColumn);

var _lodash = require("lodash.isequal");

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require("lodash.clonedeep");

var _lodash4 = _interopRequireDefault(_lodash3);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _beeIcon = require("bee-icon");

var _beeIcon2 = _interopRequireDefault(_beeIcon);

var _beeButtonGroup = require("bee-button-group");

var _beeButtonGroup2 = _interopRequireDefault(_beeButtonGroup);

var _beeTooltip = require("bee-tooltip");

var _beeTooltip2 = _interopRequireDefault(_beeTooltip);

var _acBtns = require("ac-btns");

var _acBtns2 = _interopRequireDefault(_acBtns);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
    onChange: _propTypes2["default"].func, //数据改变回调
    clsfix: _propTypes2["default"].string,
    onOpenChange: _propTypes2["default"].func, //展开收起回调
    title: _propTypes2["default"].string,
    disabled: _propTypes2["default"].bool, //是否可编辑
    onDel: _propTypes2["default"].func, //删除的回调
    defaultOpen: _propTypes2["default"].bool, //默认是否打开
    showIndex: _propTypes2["default"].bool, //是否显示序号列
    excludeKeys: _propTypes2["default"].array //粘贴时不需要粘贴的key值合计
};

var defaultProps = {
    title: '标题',
    clsfix: 'ac-edit-grid',
    data: [],
    columns: [],
    onChange: function onChange() {},
    onOpenChange: function onOpenChange() {},
    onDel: function onDel() {},
    showIndex: true,
    excludeKeys: [],
    getSelectedDataFunc: function getSelectedDataFunc() {}
};

var EditGrid = function (_Component) {
    _inherits(EditGrid, _Component);

    function EditGrid(props) {
        _classCallCheck(this, EditGrid);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.onValidate = function (errors, filed, fileds, index) {
            var current = _this.errors[index] || {};
            if (errors) {
                current[filed] = errors[0].message;
            } else {
                delete current[filed];
            }
            _this.errors[index] = current;
        };

        _this.validate = function () {
            if (Object.keys(_this.errors).length) {
                return _this.errors;
            } else {
                return null;
            }
        };

        _this.setDataColumn = function (disabled, col, da) {
            var columns = (0, _lodash4["default"])(col);
            var defaultValueKeyValue = {};
            columns.forEach(function (item) {
                item.oldRender = item.render;
                if (item.renderType || item.customizeRender) {
                    if (!disabled) {
                        if (item.required) {
                            item.title = _react2["default"].createElement(
                                "span",
                                { className: _this.props.clsfix + "-column-title-required" },
                                item.title
                            );
                        }
                    }
                    if (item.filedProps && item.filedProps.defaultValue != undefined) defaultValueKeyValue[item.dataIndex] = item.filedProps.defaultValue;
                    item.render = function (text, record, index) {
                        return _react2["default"].createElement(_RenderColumn2["default"], {
                            valueField: item.valueField,
                            config: item.config,
                            textAlign: item.textAlign,
                            renderType: item.renderType,
                            index: index,
                            dataIndex: item.dataIndex,
                            value: text,
                            options: item.options,
                            onChange: _this.onChange,
                            validate: item.validate,
                            required: item.required,
                            pattern: item.pattern,
                            patternMessage: item.patternMessage,
                            disabled: disabled ? true : item.disabled,
                            customizeRender: item.customizeRender,
                            onValidate: _this.onValidate,
                            filedProps: item.filedProps
                        });
                    };
                } else {
                    if (typeof item.oldRender == 'function' && (item.oldRender.toString().indexOf('colSpan') != -1 || item.oldRender.toString().indexOf('rowSpan') != -1)) {
                        item.render = item.oldRender;
                    } else {
                        item.render = function (text, record, index) {
                            var value = typeof item.oldRender == 'function' ? item.oldRender(text, record, index) : text;
                            var placement = 'left';
                            if (item.textAlign) placement = item.textAlign == 'center' ? 'bottom' : item.textAlign;
                            return _react2["default"].createElement(
                                _beeTooltip2["default"],
                                { overlay: value, inverse: true, placement: placement },
                                _react2["default"].createElement(
                                    "span",
                                    { className: "ac-grid-cell" },
                                    value
                                )
                            );
                        };
                    }
                }
            });
            _this.setState({
                columns: columns,
                defaultValueKeyValue: defaultValueKeyValue
            });
            //给data加index
            var data = (0, _lodash4["default"])(da);
            if (data[0] && data[0].index == 1) {} else {
                data.forEach(function (item, index) {
                    item.index = index + 1;
                });
                _this.setState({
                    data: data
                });
            }
        };

        _this.onChange = function (index, key, value) {
            //改变data
            var data = (0, _lodash4["default"])(_this.state.data);
            data[index][key] = value;
            _this.setState({
                data: data
            });
            _this.props.onChange(data);
        };

        _this.getSelectedDataFunc = function (selectData, record, index, newData) {
            var data = _this.resetChecked(_this.state.data);
            var selectDataIds = [];
            selectData.forEach(function (item) {
                data[item.index - 1]._checked = !data[item.index - 1]._checked;
                var id = 'selectDataId' + _this.selectDataId;
                data.selectDataId = id;
                selectDataIds.push(id);
                _this.selectDataId++;
            });
            _this.setState({
                selectDataIds: selectDataIds,
                selectData: selectData,
                data: data
            });
            _this.props.onChange(data);
            _this.props.getSelectedDataFunc(selectData, record, index, newData);
        };

        _this.resetChecked = function (dataValue) {
            var data = (0, _lodash4["default"])(dataValue);
            data.forEach(function (item, index) {
                item._checked = false;
                item.index = index + 1, item.key = index + 1 + '';
            });
            return data;
        };

        _this.open = function () {
            _this.props.onOpenChange(!_this.state.open);
            _this.setState({
                open: !_this.state.open
            });
        };

        _this.addRow = function () {
            var defaultValueKeyValue = _this.state.defaultValueKeyValue;
            var data = (0, _lodash4["default"])(_this.state.data);
            var length = data.length;
            var obj = (0, _lodash4["default"])(data[0] || {});
            for (var attr in obj) {
                if (attr == 'index') {
                    obj.index = length + 1;
                } else if (attr == 'key') {
                    obj.key = "" + (length + 1);
                } else {
                    obj[attr] = '';
                }
            }
            for (var _attr in defaultValueKeyValue) {
                obj[_attr] = defaultValueKeyValue[_attr];
            }
            data.push(obj);
            _this.props.onChange(data);
            _this.setState({
                data: data
            });
        };

        _this.delRow = function () {
            var selectData = _this.state.selectData;

            var data = (0, _lodash4["default"])(_this.state.data);
            data.splice(selectData[0].index - 1, selectData.length);
            data = _this.resetChecked(data);
            _this.setState({
                data: data,
                selectData: []
            });
            _this.props.onChange(data);
            _this.props.onDel(selectData);
        };

        _this.copyRow = function () {
            var copyData = [];
            var data = (0, _lodash4["default"])(_this.state.data);
            data.forEach(function (item) {
                if (item._checked) copyData.push(item);
            });
            _this.setState({
                copying: true,
                selectData: copyData
            });
        };

        _this.copyToEnd = function () {
            var _this$state = _this.state,
                selectData = _this$state.selectData,
                data = _this$state.data;

            selectData.forEach(function (item, index) {
                item.index = data.length + index + 1;
                item.key = data.length + index + 1 + '';
                item._checked = false;
                _this.props.excludeKeys.forEach(function (it) {
                    delete item[it];
                });
            });
            data = data.concat(selectData);
            data = _this.resetChecked(data);
            _this.setState({
                data: data,
                copying: false,
                selectData: []
            });
            _this.props.onChange(data);
        };

        _this.cancelCopy = function () {
            _this.setState({
                copying: false,
                selectData: []
            });
        };

        _this.max = function () {
            _this.setState({
                isMax: !_this.state.isMax
            });
        };

        _this.onRowHover = function (index, record) {
            _this.currentIndex = index;
        };

        _this.hoverContent = function () {
            if (_this.state.copying) {
                return _react2["default"].createElement(
                    "span",
                    { onClick: _this.copyToHere, className: "copy-to-here" },
                    "\u7C98\u8D34\u81F3\u6B64"
                );
            } else {
                return '';
            }
        };

        _this.copyToHere = function () {
            var _data;

            var index = _this.currentIndex;
            var data = (0, _lodash4["default"])(_this.state.data);
            var selectData = _this.state.selectData;
            selectData.forEach(function (item, i) {
                item._checked = false;
                item.index = i + index + 1;
                item.key = i + index + 1 + '';
            });
            (_data = data).splice.apply(_data, [index, 0].concat(_toConsumableArray(selectData)));
            data = _this.resetChecked(data);
            _this.setState({
                data: data,
                copying: false,
                selectData: []
            });

            _this.props.onChange(data);
        };

        _this.renderDom = function () {
            var _this$props = _this.props,
                exportData = _this$props.exportData,
                clsfix = _this$props.clsfix,
                title = _this$props.title,
                propsData = _this$props.data,
                cl = _this$props.columns,
                disabled = _this$props.disabled,
                otherProps = _objectWithoutProperties(_this$props, ["exportData", "clsfix", "title", "data", "columns", "disabled"]);

            var _this$state2 = _this.state,
                data = _this$state2.data,
                open = _this$state2.open,
                columns = _this$state2.columns,
                copying = _this$state2.copying,
                isMax = _this$state2.isMax;

            var _exportData = exportData || data;
            var btnsObj = {};
            if (isMax) {
                btnsObj = {
                    addRow: {
                        onClick: _this.addRow,
                        disabled: disabled
                    },
                    delRow: {
                        onClick: _this.delRow,
                        disabled: _this.state.selectData == 0 || disabled
                    },
                    copyRow: {
                        onClick: _this.copyRow,
                        disabled: _this.state.selectData == 0 || disabled
                    },
                    min: {
                        onClick: _this.max
                    }
                };
            } else {
                btnsObj = {
                    addRow: {
                        onClick: _this.addRow,
                        disabled: disabled
                    },
                    delRow: {
                        onClick: _this.delRow,
                        disabled: _this.state.selectData == 0 || disabled
                    },
                    copyRow: {
                        onClick: _this.copyRow,
                        disabled: _this.state.selectData == 0 || disabled
                    },
                    max: {
                        onClick: _this.max
                    }
                };
            }
            if (copying) {
                btnsObj = {
                    copyToEnd: {
                        onClick: _this.copyToEnd
                    },
                    cancel: {
                        onClick: _this.cancelCopy
                    }
                };
            }

            return _react2["default"].createElement(
                "div",
                { className: clsfix + " " + (disabled ? 'disabled' : '') + " " + (isMax ? 'max' : '') },
                _react2["default"].createElement(
                    "div",
                    { className: clsfix + "-panel " + (open ? '' : 'close') },
                    _react2["default"].createElement(
                        "span",
                        { onClick: _this.open },
                        _react2["default"].createElement(
                            "span",
                            { className: clsfix + "-panel-icon" },
                            open ? _react2["default"].createElement(_beeIcon2["default"], { type: "uf-triangle-down" }) : _react2["default"].createElement(_beeIcon2["default"], { type: "uf-triangle-right" })
                        ),
                        _react2["default"].createElement(
                            "span",
                            { className: clsfix + "-panel-title" },
                            title
                        )
                    ),
                    open ? _react2["default"].createElement(
                        "span",
                        { className: clsfix + "-panel-btns" },
                        _react2["default"].createElement(
                            _beeButtonGroup2["default"],
                            null,
                            _react2["default"].createElement(_acBtns2["default"], { btns: btnsObj })
                        )
                    ) : ''
                ),
                _react2["default"].createElement(
                    "div",
                    { className: clsfix + "-inner " + (open ? 'show' : 'hide') + " " + (isMax ? 'max' : '') },
                    _react2["default"].createElement(_AcGrids2["default"], _extends({}, otherProps, {
                        noReplaceColumns: true,
                        columns: columns,
                        data: data,
                        exportData: _exportData,
                        paginationObj: "none",
                        getSelectedDataFunc: _this.getSelectedDataFunc,
                        hoverContent: _this.hoverContent,
                        onRowHover: _this.onRowHover,
                        autoCheckedByClickRows: false
                    }))
                )
            );
        };

        _this.state = {
            columns: props.columns,
            data: props.data || [],
            selectData: [], //选中的数据
            selectDataIds: [], //记录选中数据的id，id在这里生成，componentWillReceiveProps更新data时，设置选中的数据
            copying: false, //是否正在拷贝
            open: props.defaultOpen || true, //默认展开收起
            isMax: false, //是否最大化了
            defaultValueKeyValue: {} //带默认值的key，value键值对
        };
        _this.selectDataId = 1;
        _this.errors = {};
        return _this;
    }

    EditGrid.prototype.componentWillMount = function componentWillMount() {
        this.setDataColumn(this.props.disabled, this.state.columns, this.state.data);
    };

    //选中数据的回调


    EditGrid.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (!(0, _lodash2["default"])(nextProps.data, this.state.data)) {
            var selectDataIds = this.state.selectDataIds;
            nextProps.data.forEach(function (item, index) {
                item.index = index + 1;
                if (selectDataIds.indexOf(item.selectDataId) != -1) item._checked = true;
            });
            this.setState({
                data: nextProps.data
            });
        }
        if ('disabled' in nextProps) {
            this.setDataColumn(nextProps.disabled, nextProps.columns, nextProps.data);
        }
    };

    //打开关闭


    //增行


    //删行

    //复制行

    //粘贴至末行

    //取消复制


    //最大化

    //行hover


    //粘贴至此处按钮

    //粘贴至此处


    EditGrid.prototype.render = function render() {
        return _react2["default"].createElement(
            "span",
            null,
            this.state.isMax ? _reactDom2["default"].createPortal(this.renderDom(), document.querySelector('body')) : this.renderDom()
        );
    };

    return EditGrid;
}(_react.Component);

EditGrid.defaultProps = defaultProps;
EditGrid.propTypes = propTypes;
exports["default"] = EditGrid;
module.exports = exports["default"];