'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _beeTooltip = require('bee-tooltip');

var _beeTooltip2 = _interopRequireDefault(_beeTooltip);

var _nc_FormControl = require('./nc_FormControl');

var _nc_FormControl2 = _interopRequireDefault(_nc_FormControl);

var _beeInputNumber = require('bee-input-number');

var _beeInputNumber2 = _interopRequireDefault(_beeInputNumber);

var _beeSelect = require('bee-select');

var _beeSelect2 = _interopRequireDefault(_beeSelect);

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _utils = require('./utils');

var _getFocusRowIndex = require('./api/getFocusRowIndex');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); } // 单元格组件部分

// import pureRender from './pureRender';
// import { createEditableItem } from './create';
// import { NCTooltip as Tooltip } from '../../base';

// import linkTo from '../../api/linkTo';

// import {
//     isTimeType,
//     changeTime,
//     getLangCode,
// } from '../../public';


var Option = _beeSelect2["default"].Option;
// 表格侧拉编辑前siwtch类型的标识
var switchContinue = true;
// 表格侧拉编辑前checkbox_siwtch类型的标识
var checkboxSwitchContinue = true;
// 表格侧拉编辑前focus类型的标识
var blurContinue = true;

// @pureRender()

var Cell = function (_Component) {
    _inherits(Cell, _Component);

    function Cell(props) {
        _classCallCheck(this, Cell);

        var _this2 = _possibleConstructorReturn(this, _Component.call(this, props));

        _this2.hanlder = function () {
            var _this2$props = _this2.props,
                item = _this2$props.item,
                record = _this2$props.record,
                tableScope = _this2$props.tableScope;

            if (!(0, _utils.isObj)(record.values[item.attrcode])) {
                record.values[item.attrcode] = {};
            }
            record.values[item.attrcode].isEdit = true;
            tableScope.setState({
                table: tableScope.state.table
            });
        };

        _this2.hanlderBeforeEvent = function (isBoolean, isContinue, isPromise) {
            if (isBoolean && isContinue) {
                _this2.hanlder();
            } else if (!isBoolean) {
                var dist = isPromise ? isContinue : isContinue();
                dist.then(function (data) {
                    !!data && _this2.hanlder();
                });
            }
        };

        _this2.handleBrowse = function (IType, display, value, scale, attrcode, languageMeta, values) {
            var json = this.state.json;
            switch (true) {
                case (0, _utils.isBoolean)(IType):
                    return value == 'Y' || value == true ? json && json['table_yes'] : json && json['table_no'];
                // case isTimeType(IType):
                //     if (IType === 'datetimepicker') {
                //         // 时间这里先这样判断，有好方法再说
                //         return changeTime(value, 'YYYY-MM-DD HH:mm:ss');
                //     } else if (IType === 'timepicker' || IType === 'datePickerNoTimeZone') {
                //         return value;
                //     } else {
                //         return changeTime(value);
                //     }
                case IType === 'number':
                    // 表格浏览态加了四舍五入
                    return (0, _utils.formatAcuracy)((0, _utils.ncRounding)(value, scale), scale);
                case IType === 'residtxt':
                    // 这里是多语文本的编辑显示逻辑
                    // attrcode字段对应的value是主语言
                    // 显示规则是有登陆语言显示登陆语言，登陆语言通过getLangCode获得，没有登陆语言显示主语言，attrcode字段对应的value，主语言语言在没有，就什么也不显示
                    var LangCode = getLangCode();
                    var loginLang = languageMeta.filter(function (i) {
                        return i.languageCode == LangCode;
                    });
                    if (loginLang.length > 0) {
                        loginLang[0].index === '1' ? loginLang[0].index = '' : '';
                        if (values[attrcode + loginLang[0].index] && values[attrcode + loginLang[0].index].value) {
                            value = values[attrcode + loginLang[0].index].value;
                            return value;
                        }
                        return value;
                    }
                    return value;
                default:
                    return (0, _utils.isNullOrVoid)(display) ? value : display;
            }
        };

        _this2.handleClick = function () {
            var _this = _this2;
            var _this2$props2 = _this2.props,
                values = _this2$props2.values,
                item = _this2$props2.item,
                config = _this2$props2.config,
                record = _this2$props2.record,
                pageScope = _this2$props2.pageScope,
                ICode = _this2$props2.ICode,
                moduleId = _this2$props2.moduleId,
                disabled = _this2$props2.disabled,
                metaDisabled = _this2$props2.metaDisabled,
                index = _this2$props2.index;

            setTimeout(function () {
                _this.props.setClickRowIndex({ record: record, index: index });
                if (disabled === 'off' || !disabled && !metaDisabled) {
                    // 如果当前单元格被禁用，就不渲染
                    if (config && typeof config.onBeforeEvent == 'function') {
                        var isContinue = config.onBeforeEvent(_extends({}, pageScope.props, pageScope.output), moduleId, item, index, values[ICode], record);
                        var type = (0, _utils.testType)(isContinue);
                        switch (type) {
                            // true/flase
                            case 'Boolean':
                                _this2.hanlderBeforeEvent(true, isContinue);
                                break;
                            // 返回的是async函数
                            case 'AsyncFunction':
                                _this2.hanlderBeforeEvent(false, isContinue, false);
                                break;
                            // 返回的Promise对象
                            case 'Promise':
                                _this2.hanlderBeforeEvent(false, isContinue, true);
                                break;
                            // 取Boolean值
                            default:
                                _this2.hanlderBeforeEvent(true, !!isContinue);
                                break;
                        }
                        return false;
                    }
                    _this2.hanlder();
                    return false;
                }
            }, 0);
        };

        _this2._createContent = function () {
            var _this2$props3 = _this2.props,
                IType = _this2$props3.IType,
                text = _this2$props3.text,
                index = _this2$props3.index,
                item = _this2$props3.item,
                IScale = _this2$props3.scale,
                config = _this2$props3.config,
                record = _this2$props3.record,
                model = _this2$props3.model,
                pageScope = _this2$props3.pageScope,
                edittable_dom = _this2$props3.edittable_dom,
                ICode = _this2$props3.ICode,
                moduleId = _this2$props3.moduleId,
                renderItem = _this2$props3.renderItem,
                renderStatus = _this2$props3.renderStatus,
                LanguageMeta = _this2$props3.LanguageMeta,
                metaDisabled = _this2$props3.metaDisabled,
                hyperlinkflag = _this2$props3.hyperlinkflag,
                tableScope = _this2$props3.tableScope,
                tableStatus = _this2$props3.tableStatus;
            //===========================================================================================
            // 比如操作列不走此分支

            var _ref = [record.values],
                values = _ref[0],
                editItem = _ref[1],
                value = _ref[2],
                display = _ref[3],
                scale = _ref[4],
                disabled = _ref[5],
                isEdit = _ref[6];
            // 如果有这个键取这个键的value值，否则为null

            value = (0, _utils.isObj)(values[ICode]) ? (0, _utils.typeFormat)(values[ICode].value, IType) : null;
            display = (0, _utils.isObj)(values[ICode]) ? values[ICode].display : null;
            scale = (0, _utils.isObj)(values[ICode]) ? !(0, _utils.isWrong)(values[ICode].scale) && values[ICode].scale != '-1' ? +values[ICode].scale : +IScale || 0 : +IScale || 0;
            // true为不可编辑
            disabled = (0, _utils.isObj)(values[ICode]) ? values[ICode].disabled || false : false;
            // true为渲染控件
            isEdit = (0, _utils.isObj)(values[ICode]) ? values[ICode].isEdit || false : false;
            //===========================================================================================
            // tableStatus = isEdit ? 'edit' : 'browse'
            // 编辑态isEdit = 'true' 且  不是label、customer类型  走编辑态   或者switch类型
            if (!_config2["default"].noEditType.includes(IType) && tableStatus === 'edit' || IType === 'switch_browse') {
                // if (isEdit || IType === "switch_browse" || IType === "checkbox_switch" || IType === "switch") {
                if (isEdit || IType === 'switch_browse') {
                    return _react2["default"].createElement(
                        'div',
                        {
                            className: 'edit-table-edit-line ' + (config.multipleRowCell ? '' : 'single-line-and-ellipsis'),
                            tabindex: '0'
                        },
                        _this2.createEditableItem.call(_this2, {
                            moduleId: moduleId,
                            config: config,
                            type: 'line',
                            renderItem: renderItem,
                            item: item,
                            index: index,
                            value: (0, _utils.typeFormat)(value, item.itemtype),
                            scale: scale,
                            disabled: disabled,
                            record: record,
                            model: model,
                            status: tableStatus === 'edit',
                            edittable_dom: edittable_dom,
                            pageScope: pageScope
                        })
                    );
                } else {
                    // !isEdit渲染td的文字区域  小铅笔这里有点问题，之后看一下
                    var tableItemValue = _this2.handleBrowse.call(tableScope, IType, display, value, scale, ICode, LanguageMeta, values);
                    return _react2["default"].createElement(
                        'div',
                        {
                            style: IType === 'number' ? { textAlign: 'right' } : {}
                            // onClick={e => {
                            // 之前在click写的切换状态时机
                            //   this.mousedown && this.handleClick(e);
                            //   this.mousedown = false;
                            // }}
                            , onMouseDown: function onMouseDown(eve) {
                                // 为了解决blur的比click快的问题，将切换状态时机改到onMouseDown中执行
                                // 这里为了保持和在click中执行一样的效果, 所以将行点击事件中的逻辑在这里也写了一份，但是e不一样, 但是应该不会影响逻辑，所以将这里的e穿出去防止报错
                                _this2.props.focusRowByIndex.call(_this2, index);
                                if (config && typeof config.onRowClick === 'function') {
                                    config.onRowClick.call(_this2, record, index, eve);
                                }
                                _this2.handleClick();
                                eve.preventDefault();
                            },
                            onFocus: function onFocus(e) {
                                // 记录当前行，虽然表格以提供setClickRowIndex方法，但内部调用setState方法，如果tab切换频繁会导致效率问题因此用新的方法实现
                                (0, _getFocusRowIndex.setFocusRowIndex)(index);
                                /*
                                * issue: 当业务组通过代码自动执行focus时为防止死循环添加判断
                                * resolve: 'sourceCapabilities' => which provides information about the physical device responsible for generating a touch event
                                *           如果是我们内部的代码执行focus，先给聚焦的元素添加ncExecuteFocus属性，如果有此属性就执行click方法
                                *           当前元素如果没有ncExecuteFocus就判断此事件是用户触发还是业务组的代码触发
                                * */
                                var sourceCapabilities = e.nativeEvent.sourceCapabilities;
                                // sourceCapabilities ie 下不能支持
                                if (e.target.ncExecuteFocus) {
                                    !_this2.mousedown && _this2.handleClick(e);
                                } else {
                                    !_this2.mousedown && pageScope && pageScope.output.ViewModel.shouldAutoFocus && _this2.handleClick(e);
                                    // pageScope && (pageScope.output.ViewModel.shouldAutoFocus = false);
                                }
                            },
                            tabindex: disabled === 'off' || !disabled && !metaDisabled ? '0' : '-1',
                            className: 'edit-table-edit-td ' + (config.multipleRowCell ? '' : 'single-line-and-ellipsis')
                        },
                        (0, _utils.isWrong)(tableItemValue) ? _react2["default"].createElement(
                            'span',
                            null,
                            tableItemValue,
                            '\xA0',
                            disabled === 'off' || !disabled && !metaDisabled ? _react2["default"].createElement('span', { className: 'iconfont icon-zhengbiaobianji' }) : ''
                        ) : _react2["default"].createElement(
                            'div',
                            { className: IType === 'number' ? 'text-left edit-center' : 'edit-center' },
                            _react2["default"].createElement(
                                _beeTooltip2["default"],
                                { inverse: true, className: 'tooltip-word-color', placement: 'top', delay: 1, overlay: tableItemValue },
                                _react2["default"].createElement(
                                    'span',
                                    { className: config.multipleRowCell ? '' : 'single-line-and-ellipsis' },
                                    tableItemValue,
                                    '\xA0'
                                )
                            ),
                            disabled === 'off' || !disabled && !metaDisabled ? _react2["default"].createElement('span', { className: 'iconfont icon-zhengbiaobianji1' }) : ''
                        )
                    );
                }
            } else {
                if (item.render && renderStatus === 'browse') {
                    // 浏览态，业务组重写render的判断 ，这里只是让他返回展示内容 添加允许重写render的状态判断，业务组需要加renderstatus进行判断
                    // 这里加了一个类名single-line-and-ellipsis， 让注册进来的render的内容也是一行省略的
                    return _react2["default"].createElement(
                        _beeTooltip2["default"],
                        {
                            inverse: true,
                            className: 'tooltip-word-color',
                            placement: 'top',
                            delay: 1,
                            overlay: item.render.call(null, text, record, index)
                        },
                        _react2["default"].createElement(
                            'div',
                            {
                                className: 'customer-style ' + (config.multipleRowCell ? '' : 'single-line-and-ellipsis'),
                                style: IType === 'number' ? { textAlign: 'right' } : {}
                            },
                            item.render.call(null, text, record, index)
                        )
                    );
                } else {
                    var _tableItemValue = _this2.handleBrowse.call(tableScope, IType, display, value, scale, ICode, LanguageMeta, values);
                    return _react2["default"].createElement(
                        'div',
                        {
                            className: 'edit-table-browse ' + (config.multipleRowCell ? '' : 'single-line-and-ellipsis'),
                            style: IType === 'number' ? { textAlign: 'right' } : {}
                        },
                        _react2["default"].createElement(
                            _beeTooltip2["default"],
                            { inverse: true, className: 'tooltip-word-color', placement: 'top', delay: 1, overlay: _tableItemValue },
                            // 如果模板里有hyperlinkflag:true
                            hyperlinkflag ? _react2["default"].createElement(
                                'a',
                                {
                                    href: 'javascript:;',
                                    onClick: function onClick() {
                                        // 超链接跳转
                                        // linkTo(pageScope.state.meta.pageid, moduleId, ICode, value);
                                    }
                                },
                                _tableItemValue
                            ) : _react2["default"].createElement(
                                'span',
                                null,
                                _tableItemValue
                            )
                        )
                    );
                }
            }
        };

        _this2.state = {
            table: {
                pageInfo: {
                    pageSize: '10',
                    pageIndex: '1'
                },
                rows: [],
                checkedAll: false,
                // 设置全选多选框的是否禁用
                disabledAll: false,
                model: false, //是否打开侧滑面板
                origin: {},
                operType: 'add',
                allpks: []
            }
        };
        _this2.batchData = null;
        _this2.tableChangedRowsOldValue = null;
        return _this2;
    }

    Cell.prototype.componentWillMount = function componentWillMount() {
        var tableInfo = this.props.tableInfo;

        this.setState({
            table: tableInfo
        });
        this.tableChangedRowsOldValue = tableInfo.rows;
    };
    /**
     * 处理onchang和onblur时变化数据的格式
     */


    Cell.prototype.handleChangeData = function handleChangeData(itemtype, foolval, val, item) {
        // console.log('this.batchData',this.batchData);
        switch (true) {
            // 参照
            case itemtype:
                return foolval;
            // 其他
            default:
                return {
                    value: val,
                    display: (0, _utils.getDisplayByValue)(val, item)
                };
        }
    };
    /**
     * 浏览态渲染函数
     * @param {*} IType
     * @param {*} display
     * @param {*} value
     */


    // 处理旧值函数
    Cell.prototype.saveChangedRowsOldValue = function saveChangedRowsOldValue(moduleId, index, attrcode, value) {
        !Array.isArray(this.tableChangedRowsOldValue[moduleId]) && (this.tableChangedRowsOldValue[moduleId] = []);
        !(0, _utils.isObj)(this.tableChangedRowsOldValue[moduleId][index]) && (this.tableChangedRowsOldValue[moduleId][index] = {});
        // this.tableChangedRowsOldValue[moduleId][index][attrcode] = value;
    };

    // 获取旧值函数


    Cell.prototype.getChangedRowsOldValue = function getChangedRowsOldValue(moduleId, index, attrcode) {
        var isArr = Array.isArray(this.tableChangedRowsOldValue[moduleId]);
        if (!isArr || isArr && !(0, _utils.isObj)(this.tableChangedRowsOldValue[moduleId][index])) {
            return null;
        }
        // return this.tableChangedRowsOldValue[moduleId][index][attrcode] || null;
    };

    // 删除旧值函数


    Cell.prototype.delChangedRowsOldValue = function delChangedRowsOldValue(moduleId, index, attrcode) {
        var isArr = Array.isArray(this.tableChangedRowsOldValue[moduleId]);
        if (!isArr || isArr && !(0, _utils.isObj)(this.tableChangedRowsOldValue[moduleId][index])) {
            return;
        }
        if (attrcode) {
            this.tableChangedRowsOldValue[moduleId][index][attrcode] = null;
        } else {
            this.tableChangedRowsOldValue[moduleId][index] = {};
        }
    };

    /**
     * 创建 EditableItem
     * @param {*} moduleId 
     * @param {*} config 
     * @param {*} type 
     * @param {*} renderItem 
     * @param {*} item 
     * @param {*} index 
     * @param {*} value 
     * @param {*} scale 
     * @param {*} disabled 
     * @param {*} record 
     * @param {*} model 
     * @param {*} status 
     * @param {*} edittable_dom 
     * @param {*} pageScope 
     */


    Cell.prototype.createEditableItem = function createEditableItem(_ref2) {
        var moduleId = _ref2.moduleId,
            _ref2$config = _ref2.config,
            config = _ref2$config === undefined ? {} : _ref2$config,
            _ref2$type = _ref2.type,
            type = _ref2$type === undefined ? 'line' : _ref2$type,
            _ref2$renderItem = _ref2.renderItem,
            renderItem = _ref2$renderItem === undefined ? {} : _ref2$renderItem,
            _ref2$item = _ref2.item,
            item = _ref2$item === undefined ? {} : _ref2$item,
            _ref2$index = _ref2.index,
            index = _ref2$index === undefined ? 1 : _ref2$index,
            _ref2$value = _ref2.value,
            value = _ref2$value === undefined ? null : _ref2$value,
            scale = _ref2.scale,
            _ref2$disabled = _ref2.disabled,
            disabled = _ref2$disabled === undefined ? false : _ref2$disabled,
            record = _ref2.record,
            _ref2$model = _ref2.model,
            model = _ref2$model === undefined ? 'origin' : _ref2$model,
            _ref2$status = _ref2.status,
            status = _ref2$status === undefined ? false : _ref2$status,
            edittable_dom = _ref2.edittable_dom,
            pageScope = _ref2.pageScope;

        record = Object.keys(record).length ? record : {
            rowid: null,
            status: '0',
            values: {}
        };
        // console.log('渲染单元格',value,record)
        return this.renderTableItem.call(this, moduleId, config, type, record, item, index, value, scale, disabled, renderItem, model, status, edittable_dom, pageScope);
    };

    /**
     * 渲染 Item 组件
     * @param {*} moduleId 
     * @param {*} config 
     * @param {*} type 
     * @param {*} record 
     * @param {*} item 
     * @param {*} index 
     * @param {*} value 
     * @param {*} scale 
     * @param {*} disabled 
     * @param {*} renderItem 
     * @param {*} model 
     * @param {*} status 
     * @param {*} edittable_dom 
     * @param {*} pageScope 
     */


    Cell.prototype.renderTableItem = function renderTableItem(moduleId, config, type, record, item, index, value, scale, disabled, renderItem, model, status, edittable_dom, pageScope) {
        var _this3 = this;

        var _renderTableItemByTyp = this._renderTableItemByType.call(this, moduleId, record, item, value, scale, disabled, renderItem, model, status, index, type, pageScope),
            editItem = _renderTableItemByTyp.editItem,
            isdisabled = _renderTableItemByTyp.isdisabled,
            valueData = _renderTableItemByTyp.value,
            scaleData = _renderTableItemByTyp.scale;

        if (!editItem) return _react2["default"].createElement('div', null);
        var showDisable = function (disabled) {
            switch (disabled) {
                case false:
                    return !(0, _utils.undefinedOrfalse)(item.disabled);
                case 'on':
                    return true;
                case 'off':
                    return false;
                default:
                    return false;
            }
        }(isdisabled);
        var _ref3 =
        // 用于 onblur 和onchange常量
        [_config2["default"].blurTypes.includes(item.itemtype), _config2["default"].changeTypes.includes(item.itemtype), type === 'line', []],
            isInputType = _ref3[0],
            unInputType = _ref3[1],
            isLineStatus = _ref3[2],
            changedrows = _ref3[3];
        // 侧拉框不自动获取焦点

        var focus = type !== 'modal';
        // 新写的需求还有问题，勿删
        // const focus = type !== 'modal' && item.itemtype !== 'checkbox_switch' && item.itemtype !== 'switch' ? true : false;
        var isMaxlength = !!(item.itemtype === 'residtxt' || item.itemtype === 'number');
        var placeholder = type === 'modal' && item.itemtype == 'refer' ? { placeholder: '' } : {};
        // 多语
        var json = this.state.json;
        // 表格行数据
        var rows = this.state.table.rows;
        // 表格侧拉数据
        // const tableModeldata = pageScope.state.tableModeldata[moduleId];
        return _react2["default"].createElement(_Item2["default"], {
            content: _extends({}, editItem, {
                edittable_dom: edittable_dom,
                props: _extends({}, editItem.props, item, placeholder, {
                    scale: scaleData, // number的精度 这里是判断了模版和传入的之后的结果
                    value: valueData, // 给其他组件设置value
                    foolValue: valueData, // 给参照设置的value
                    autoFocus: focus, // 当打开侧拉框的时候不获取焦点判断
                    autofocus: focus, // 当打开侧拉框的时候不获取焦点判断
                    title: '', // 将列的title替换掉，避免出现不必要的值，如果有bug在改zhanghengh
                    disabled: showDisable, // 如果没有disabled或者false 看成false
                    maxlength: isMaxlength ? item.maxlength : null,
                    isLineStatus: isLineStatus, // 当前表格是侧拉状态还是表体状态
                    onChange: function onChange(valueChange, foolValue) {
                        // 控制侧拉编辑前switch和checkbox_switch类型返回false, 不可编辑
                        if (!checkboxSwitchContinue || !switchContinue) {
                            checkboxSwitchContinue = true;
                            switchContinue = true;
                            return;
                        }
                        if (_config2["default"].blurTypes.includes(item.itemtype)) {
                            if ((0, _utils.isString)(valueChange)) {
                                valueChange = valueChange.trim();
                            }
                        }
                        // 用于侧拉框状态下执行编辑前
                        if (!isLineStatus && _config2["default"].beforeChangeTypes.includes(item.itemtype)) {
                            // 如果当前单元格被禁用，就不渲染
                            if (config && typeof config.onBeforeEvent == 'function') {
                                var isContinue = config.onBeforeEvent(_extends({}, pageScope.props, pageScope.output), moduleId, item, index, record.values[item.attrcode], record);
                                // 编辑前返回false直接return，这样才不影响逻辑
                                if (!isContinue) {
                                    return;
                                }
                            }
                        }
                        // 适配多语 //这是最新适配的多语，可以了在放开 有问题看一下
                        if (item.itemtype === 'residtxt') {
                            if (model == 'open') {
                                // 当侧拉的情况下
                                Object.keys(valueChange).forEach(function (i) {
                                    if (tableModeldata.values[i]) {
                                        tableModeldata.values[i] = _extends({}, tableModeldata.values[i], valueChange[i] || {});
                                    } else {
                                        tableModeldata.values[i] = valueChange[i] || {};
                                    }
                                    // 同步侧拉更改的数据到表体
                                    if (rows[index].values[i]) {
                                        rows[index].values[i] = _extends({}, rows[index].values[i], valueChange[i] || {});
                                    } else {
                                        rows[index].values[i] = _extends({}, valueChange[i] || {});
                                    }
                                }, _this3);
                            } else {
                                // 当表体的情况下
                                Object.keys(valueChange).forEach(function (i) {
                                    if (rows[index].values[i]) {
                                        rows[index].values[i] = _extends({}, rows[index].values[i], valueChange[i] || {}, {
                                            isEdit: true
                                        });
                                    } else {
                                        rows[index].values[i] = _extends({}, valueChange[i] || {}, { isEdit: true });
                                    }
                                }, _this3);
                            }
                        }
                        // 校验输入长度
                        var flag = isInputType ? item.itemtype !== 'number' ? foolValue.target ? foolValue.target.isFlag : false : false : false;
                        if (!flag && item.maxlength && isInputType && valueChange && foolValue) {
                            var arr = Array(valueChange.length);
                            var count = arr.length;
                            arr.fill(1);
                            valueChange.replace(/[^\x00-\xff]/g, function (a, b, c) {
                                arr[b] = 2;
                            });
                            var reducer = arr.reduce(function (a, b) {
                                if (a + b > item.maxlength) {
                                    count--;
                                }
                                return a + b;
                            }, 0);
                            if (!flag && reducer > item.maxlength) {
                                valueChange = rows[index].values[item.attrcode].value;
                                toast({
                                    color: 'danger',
                                    title: '' + (json && json['table_tips']),
                                    content: (json && json['table_tips_content']) + '\n                                                        ' + item.maxlength
                                });
                                foolValue.target && foolValue.target.blur();
                            }

                            rows[index].values[item.attrcode].value = valueChange;
                        }

                        // 判断是否为多选参照start
                        var isMul = void 0;
                        editItem.props.hasOwnProperty('isMultiSelectedEnabled') && (isMul = editItem.props.isMultiSelectedEnabled);
                        item.hasOwnProperty('isMultiSelectedEnabled') && (isMul = item.isMultiSelectedEnabled);
                        var _getValue = function _getValue(init) {
                            return (0, _utils.isObj)(init) ? init.refpk : init;
                        };
                        // 判断是否为多选参照end

                        var attr = (0, _utils.isObj)(rows[index].values[item.attrcode]);
                        if (!attr) {
                            // 因为有些字段为空值，后台默认为过滤去了
                            rows[index].values[item.attrcode] = {};
                            if (model == 'open') {
                                tableModeldata.values[item.attrcode] = {};
                            } else {
                                rows[index].values[item.attrcode] = {};
                            }
                        }

                        // 因为timepicker的value特殊，所以特殊转换一下start，有问题在看一下
                        if (item.itemtype === 'timepicker') {
                            if (valueChange && valueChange.format) {
                                valueChange = valueChange.format('hh:mm:ss');
                            }
                        }
                        // 因为timepicker的value特殊，所以特殊转换一下end

                        // 处理单元格变化的数据zhnghengh
                        var theValue = _this3.handleChangeData(item.itemtype === 'refer', foolValue, valueChange, item);
                        if (item.itemtype !== 'residtxt') {
                            // 多语文本暂时不支持批改
                            _this3.batchData = {
                                // 在onchange时缓存列数据的key 和value  用于批量更改   zhanghengh 18/6/29
                                batchChangeIndex: index,
                                batchChangeKey: item.attrcode,
                                batchChangeValue: isMul ? theValue : theValue.value,
                                batchChangeDisplay: isMul ? null : theValue.display
                            };
                        } else {
                            // 多语批改
                            _this3.batchData = {
                                batchChangeIndex: index,
                                batchChangeKey: item.attrcode,
                                batchChangeValue: valueChange,
                                batchChangeDisplay: null
                            };
                        }
                        if (item.itemtype !== 'residtxt') {
                            // 多语文本不走这里
                            if (model == 'open') {
                                _extends(tableModeldata.values[item.attrcode], theValue);
                            } else {
                                _extends(rows[index].values[item.attrcode], theValue);
                            }
                        }

                        // 把status置为1，标识修改     状态不为1的不动 (比如用户自己set但是状态为2的)
                        if (rows[index].status == '0') {
                            rows[index].status = '1';
                        }

                        _this3.setState({ table: _this3.state.table });

                        if (unInputType) {

                            // 判断新旧值是否相等
                            var isValEqual = function isValEqual(newVal, oldVal) {
                                if ((newVal === null || newVal === '' || newVal === ' ') && (oldVal === null || oldVal === '' || oldVal === ' ')) {
                                    return true;
                                } else if (newVal == oldVal) {
                                    return true;
                                }
                                return false;
                            };

                            // 新的取旧值
                            var initVal = _this3.getChangedRowsOldValue.call(_this3, moduleId, index, item.attrcode);
                            var isRefpk = _getValue(initVal);
                            if (isMul) {
                                if (valueChange.length > 0) {
                                    valueChange.forEach(function (one, ind) {
                                        changedrows.push({
                                            rowid: record.rowid,
                                            newvalue: {
                                                value: _getValue(one) || ''
                                            },
                                            oldvalue: {
                                                value: ind <= 0 ? isRefpk || '' : ''
                                            }
                                        });
                                    });
                                } else {
                                    changedrows.push({
                                        rowid: record.rowid,
                                        newvalue: {
                                            value: ''
                                        },
                                        oldvalue: {
                                            value: isRefpk || ''
                                        }
                                    });
                                }
                            } else {
                                changedrows.push({
                                    rowid: record.rowid,
                                    newvalue: {
                                        value: item.itemtype == 'refer' ? foolValue.value || '' : valueChange || ''
                                    },
                                    oldvalue: {
                                        value: initVal || ''
                                    }
                                });
                            }

                            if (item.editAfterFlag && !isValEqual(changedrows[0].newvalue.value, changedrows[0].oldvalue.value)) {
                                pageScope.handleRelationItems({
                                    type: 'table',
                                    areaCode: moduleId,
                                    key: item.attrcode,
                                    changedrows: changedrows,
                                    index: index,
                                    rowid: record.rowid,
                                    record: rows[index],
                                    callback: function callback() {
                                        config && typeof config.onAfterEvent == 'function' && config.onAfterEvent(_extends({}, pageScope.props, pageScope.output), moduleId, item.attrcode, valueChange, changedrows, index, rows[index], type, 'change');
                                        /***
                                         * 二开的编辑后事件 --liuxis
                                         */
                                        var secFns = pageScope.NCCSecondDevelop;
                                        secFns && secFns.onAfterEvent && secFns.onAfterEvent({
                                            moduleId: moduleId,
                                            record: rows[index],
                                            attrcode: item.attrcode,
                                            methods: pageScope.output
                                        });
                                    }
                                });
                            } else {
                                config && typeof config.onAfterEvent == 'function' && config.onAfterEvent(_extends({}, pageScope.props, pageScope.output), moduleId, item.attrcode, valueChange, changedrows, index, rows[index], type, 'change');

                                /***
                                 * 二开的编辑后事件 --liuxis
                                 */
                                // let secFns = pageScope.NCCSecondDevelop;
                                var secFns = void 0;
                                secFns && secFns.onAfterEvent && secFns.onAfterEvent({
                                    moduleId: moduleId,
                                    record: rows[index],
                                    attrcode: item.attrcode,
                                    methods: pageScope.output
                                });
                            }
                            var OldVal = isMul ? valueChange.length > 0 ? valueChange[0] : null : item.itemtype === 'refer' ? foolValue.vlaue == '' ? null : foolValue.vlaue : valueChange;
                            // this.saveChangedRowsOldValue.call(this, moduleId, index, item.attrcode, OldVal);
                        }
                    },
                    onOpenChange: function onOpenChange(val) {
                        if (!isLineStatus) {
                            if (val) {
                                return;
                            }
                            pageScope.myTable[moduleId].verify[item.attrcode].DTOpen = val;
                            _this3.setState({ table: _this3.state.table });
                        }
                    },
                    onClick: function onClick(evt, event) {
                        // 新需求还有点问题，勿删
                        // if (((!isLineStatus || item.itemtype === 'checkbox_switch') && CONFIG.beforeClickTypes.includes(item.itemtype))) {
                        if (!isLineStatus && _config2["default"].beforeClickTypes.includes(item.itemtype)) {
                            // 获取事件对象
                            var target = evt && evt.target || event && event.target || event;
                            // 侧拉编辑前回调
                            if (config && typeof config.onBeforeEvent == 'function') {
                                var isContinue = config.onBeforeEvent(_extends({}, pageScope.props, pageScope.output), moduleId, item, index, record.values[item.attrcode], record);
                                // 用于处理侧拉框编辑前所要执行的函数
                                var modelHanlder = function modelHanlder(flag, target) {
                                    if (!flag && target) {
                                        if (item.itemtype === 'checkbox_switch') {
                                            checkboxSwitchContinue = false;
                                        }
                                        target.blur && target.blur();
                                    }
                                };
                                var result = null;
                                var _type = (0, _utils.testType)(isContinue);
                                switch (_type) {
                                    // true/flase
                                    case 'Boolean':
                                        result = hanlderModelBeforeEvent(true, isContinue, null, modelHanlder, target);
                                        break;
                                    // 返回的是async函数
                                    case 'AsyncFunction':
                                        result = hanlderModelBeforeEvent(false, isContinue, false, modelHanlder, target);
                                        break;
                                    // 返回的Promise对象
                                    case 'Promise':
                                        result = hanlderModelBeforeEvent(false, isContinue, true, modelHanlder, target);
                                        break;
                                    // 取Boolean值
                                    default:
                                        result = hanlderModelBeforeEvent(true, !!isContinue, null, modelHanlder, target);
                                        break;
                                }
                                // 处理日期控件编辑前
                                result.then(function (value) {
                                    pageScope.myTable[moduleId].verify[item.attrcode].DTOpen = value;
                                    _this3.setState({ table: _this3.state.table });
                                });
                            } else {
                                pageScope.myTable[moduleId].verify[item.attrcode].DTOpen = true;
                                _this3.setState({ table: _this3.state.table });
                            }
                        }
                    },
                    onFocus: function onFocus(evt, event) {
                        // 新需求还有点问题，勿删
                        // if (((!isLineStatus || item.itemtype === 'switch') && CONFIG.beforeFocusTypes.includes(item.itemtype))) {
                        if (!isLineStatus && _config2["default"].beforeFocusTypes.includes(item.itemtype)) {
                            // 获取事件对象
                            var target = evt && evt.target || event && event.target || event;
                            // 侧拉编辑前回调
                            if (config && typeof config.onBeforeEvent == 'function') {
                                var isContinue = config.onBeforeEvent(_extends({}, pageScope.props, pageScope.output), moduleId, item, index, record.values[item.attrcode], record);

                                // 用于处理侧拉框编辑前所要执行的函数
                                var modelHanlder = function modelHanlder(flag, target) {
                                    if (!flag && target) {
                                        if (_config2["default"].blurTypes.includes(item.itemtype) || item.itemtype === 'residtxt') {
                                            blurContinue = false;
                                        }
                                        target.blur && target.blur();
                                    }
                                };
                                var _type2 = (0, _utils.testType)(isContinue);
                                var result = null;
                                switch (_type2) {
                                    // true/flase
                                    case 'Boolean':
                                        result = hanlderModelBeforeEvent(true, isContinue, null, modelHanlder, target);
                                        break;
                                    // 返回的是async函数
                                    case 'AsyncFunction':
                                        result = hanlderModelBeforeEvent(false, isContinue, false, modelHanlder, target);
                                        break;
                                    // 返回的Promise对象
                                    case 'Promise':
                                        result = hanlderModelBeforeEvent(false, isContinue, true, modelHanlder, target);
                                        break;
                                    // 取Boolean值
                                    default:
                                        result = hanlderModelBeforeEvent(true, !!isContinue, null, modelHanlder, target);
                                        break;
                                }
                                if (item.itemtype === 'refer') {
                                    // 这里就先这么处理了，侧拉批改会有问题
                                    return result;
                                }
                                if (item.itemtype === 'select') {
                                    result.then(function (value) {
                                        if (pageScope.myTable[moduleId].verify[item.attrcode].selectOpen) {
                                            pageScope.myTable[moduleId].verify[item.attrcode].selectOpen = false;
                                            _this3.setState({ table: _this3.state.table });
                                        } else {
                                            pageScope.myTable[moduleId].verify[item.attrcode].selectOpen = value;
                                            _this3.setState({ table: _this3.state.table });
                                        }
                                    });
                                }
                            } else {
                                if (item.itemtype === 'select') {
                                    if (pageScope.myTable[moduleId].verify[item.attrcode].selectOpen) {
                                        pageScope.myTable[moduleId].verify[item.attrcode].selectOpen = false;
                                        _this3.setState({ table: _this3.state.table });
                                    } else {
                                        pageScope.myTable[moduleId].verify[item.attrcode].selectOpen = true;
                                        _this3.setState({ table: _this3.state.table });
                                    }
                                }
                            }
                        }

                        // 检验输入字符长度
                        // if (isInputType && item.maxlength) {
                        //     evt.target.isFlag = false;
                        //     evt.target.addEventListener(
                        //         'compositionstart',
                        //         e => {
                        //             e.target.isFlag = true;
                        //         },
                        //         false
                        //     );
                        //     evt.target.addEventListener(
                        //         'compositionend',
                        //         e => {
                        //             e.target.isFlag = false;
                        //             let flag = e.target.isFlag;
                        //             let val = e.target.defaultValue;
                        //             let arr = Array(val.length);
                        //             let count = arr.length;
                        //             arr.fill(1);
                        //             val.replace(/[^\x00-\xff]/g, (a, b, c) => {
                        //                 arr[b] = 2;
                        //             });
                        //             let reducer = arr.reduce((a, b) => {
                        //                 if (a + b > item.maxlength) {
                        //                     count--;
                        //                 }
                        //                 return a + b;
                        //             }, 0);
                        //             if (!flag && reducer > item.maxlength) {
                        //                 val = val.substring(0, count);
                        //                 rows[index].values[item.attrcode].value = val;
                        //                 toast({
                        //                     color: 'danger',
                        //                     title: `${json && json['table_tips']}`,
                        //                     content: `${json && json['table_tips_content']}${item.maxlength}`
                        //                 });
                        //                 e.target && e.target.blur();
                        //             }
                        //         },
                        //         false
                        //     );
                        //     this.setState({ table: this.state.table });
                        // }
                        // 多语控件都不走这里
                        if (item.itemtype !== 'residtxt') {
                            // onFocus 和value  用于批量更改   zhanghengh 18/6/29 先注释，以后可能有用
                            _this3.batchData = {
                                batchChangeIndex: index,
                                batchChangeKey: item.attrcode,
                                batchChangeValue: record.values[item.attrcode] ? record.values[item.attrcode].value : '',
                                batchChangeDisplay: record.values[item.attrcode] ? record.values[item.attrcode].display : ''
                            };
                        }

                        // 为了兼容refer，否则报错
                        return new Promise(function (resolve) {
                            resolve(true);
                        });
                    },
                    onMouseDown: function onMouseDown() {
                        // 在这个方法里处理switch类型组件编辑前返回false的情况
                        if (!isLineStatus && item.itemtype === 'switch') {
                            // 如果当前单元格被禁用，就不渲染
                            if (config && typeof config.onBeforeEvent == 'function') {
                                var isContinue = config.onBeforeEvent(_extends({}, pageScope.props, pageScope.output), moduleId, item, index, record.values[item.attrcode], record);

                                // 用于处理侧拉框编辑前所要执行的函数
                                var modelHanlder = function modelHanlder(flag) {
                                    if (!flag) {
                                        if (item.itemtype === 'switch') {
                                            switchContinue = false;
                                        }
                                    }
                                };
                                var _type3 = (0, _utils.testType)(isContinue);
                                var result = null;
                                switch (_type3) {
                                    // true/flase
                                    case 'Boolean':
                                        result = hanlderModelBeforeEvent(true, isContinue, null, modelHanlder);
                                        break;
                                    // 返回的是async函数
                                    case 'AsyncFunction':
                                        result = hanlderModelBeforeEvent(false, isContinue, false, modelHanlder);
                                        break;
                                    // 返回的Promise对象
                                    case 'Promise':
                                        result = hanlderModelBeforeEvent(false, isContinue, true, modelHanlder);
                                        break;
                                    // 取Boolean值
                                    default:
                                        result = hanlderModelBeforeEvent(true, !!isContinue, null, modelHanlder);
                                        break;
                                }
                            }
                        }
                    },
                    onBlur: function onBlur(val) {
                        // 处理blur类型的组件，编辑前返回false，不可以在执行编辑后的问题
                        if (!blurContinue) {
                            blurContinue = true;
                            return;
                        }
                        if (_config2["default"].blurTypes.includes(item.itemtype)) {
                            if ((0, _utils.isString)(val)) {
                                val = val.trim();
                            }
                        }
                        // 当数值类型只输入一个'-'的时候就将它赋值成0
                        if (item.itemtype === 'number' && val === '-') {
                            val = 0;
                            rows[index].values[item.attrcode].value = 0;
                        }
                        if (item.itemtype === 'select') {
                            // pageScope.myTable[moduleId].verify[item.attrcode].selectOpen = false;
                            _this3.setState({ table: _this3.state.table });
                        }
                        /*
                        * onBlur编辑后 和 切换控件状态
                        * 1、input类型    line   编辑后 + 切状态
                        *                model  编辑后
                        * 2、uninput类型  line   切状态
                        *                model  无编辑后  无切状态
                        */
                        setTimeout(function () {
                            // 处理input类型编辑后，ajax同步问题，以后好办法在改一下
                            if (isInputType || item.itemtype == 'residtxt') {
                                if (isLineStatus) {
                                    rows[index].values[item.attrcode].isEdit = false;
                                }

                                var oldValue = _this3.getChangedRowsOldValue.call(_this3, moduleId, index, item.attrcode);
                                changedrows.push({
                                    rowid: record.rowid,
                                    newvalue: {
                                        value: val || ''
                                    },
                                    oldvalue: {
                                        value: oldValue ? item.itemtype === 'number' ? (0, _utils.formatAcuracy)(oldValue, scaleData) : oldValue : ''
                                    }
                                });
                                // this.saveChangedRowsOldValue.call(this, moduleId, index, item.attrcode, val);
                                if (item.itemtype === 'residtxt') {
                                    if (model == 'open') {
                                        // 当侧拉的情况下
                                        // 多语  登陆语言值 赋值给主语言
                                        tableModeldata.values[item.attrcode] = _extends({}, tableModeldata.values[item.attrcode], {
                                            value: val[item.attrcode].value
                                        });
                                    } else {
                                        // 当表体的情况下
                                        // 多语  登陆语言值 赋值给主语言
                                        var LangCode = getLangCode();
                                        var loginLang = item.languageMeta.filter(function (i) {
                                            return i.languageCode == LangCode;
                                        });
                                        if (loginLang[0] && !record.values[item.attrcode].value) {
                                            loginLang[0].index = loginLang[0].index == '1' ? '' : loginLang[0].index;
                                            rows[index].values[item.attrcode] = _extends({}, record.values[item.attrcode], record.values[item.attrcode + loginLang[0].index], {
                                                isEdit: false
                                            });
                                        }
                                    }
                                }

                                if (item.editAfterFlag) {
                                    pageScope.handleRelationItems({
                                        type: 'table',
                                        areaCode: moduleId,
                                        key: item.attrcode,
                                        changedrows: changedrows,
                                        index: index,
                                        rowid: record.rowid,
                                        record: rows[index],
                                        callback: function callback() {
                                            config && typeof config.onAfterEvent == 'function' && config.onAfterEvent(_extends({}, pageScope.props, pageScope.output), moduleId, item.attrcode, val, changedrows, index, rows[index], type, 'blur');
                                            /***
                                             * 二开的编辑后事件 --liuxis
                                             */
                                            var secFns = pageScope.NCCSecondDevelop;
                                            secFns && secFns.onAfterEvent && secFns.onAfterEvent({
                                                moduleId: moduleId,
                                                record: rows[index],
                                                attrcode: item.attrcode,
                                                methods: pageScope.output
                                            });
                                        }
                                    });
                                } else {
                                    config && typeof config.onAfterEvent == 'function' && config.onAfterEvent(_extends({}, pageScope.props, pageScope.output), moduleId, item.attrcode, val, changedrows, index, rows[index], type, 'blur');
                                    /***
                                     * 二开的编辑后事件 --liuxis
                                     */
                                    // let secFns = pageScope.NCCSecondDevelop;
                                    // secFns &&
                                    // secFns.onAfterEvent &&
                                    // secFns.onAfterEvent({
                                    //     moduleId,
                                    //     record: rows[index],
                                    //     attrcode: item.attrcode,
                                    //     methods: pageScope.output
                                    // });
                                }
                            } else {
                                if (isLineStatus && !(0, _utils.isEmpty)(rows)) {
                                    rows[index].values[item.attrcode].isEdit = false;
                                }
                            }

                            // 多语控件都不走这里
                            if (item.itemtype !== 'residtxt') {
                                // 在onblur时缓存列数据的key 和value  用于批量更改   zhanghengh 18/6/29
                                _this3.batchData = {
                                    batchChangeIndex: index,
                                    batchChangeKey: item.attrcode,
                                    batchChangeValue: record.values[item.attrcode] ? record.values[item.attrcode].value : '',
                                    batchChangeDisplay: record.values[item.attrcode] ? record.values[item.attrcode].display : ''
                                };
                            }

                            var isSwitch_browseDisabled = item.itemtype === 'switch_browse' && showDisable; // 开关且不可编辑
                            // let allRows = pageScope.editTable.getNumberOfRows(moduleId);
                            /*
                            * 增一行的条件：
                            * 1、最后一行
                            * 2、isAddRow 为true
                            * 3、当前单元格值不为空
                            */

                            // if (
                            // allRows == index + 1 &&
                            // config &&
                            // !!config.isAddRow &&
                            // !isSwitch_browseDisabled &&
                            // !isWrong(val) &&
                            // pageScope.state.meta[moduleId].status === 'edit'
                            // ) {
                            //     // 添加自动增行后的回调
                            //     const callback = isFunction(config.addRowCallback) ? config.addRowCallback : undefined;
                            //     pageScope.editTable.addRow(moduleId, undefined, false, null, callback, true);
                            // } else {
                            //     // 为了保证不是最后一行 渲染浏览态
                            //     this.setState({ table: this.state.table });
                            // }
                        }, 0);
                    }
                })
            })
        });
    };

    /**
     * 根据字段类型渲染单元格内容
     * @param {*} moduleId 
     * @param {*} record 
     * @param {*} item 
     * @param {*} value 
     * @param {*} scale  number的精度 这里是判断了模版和传入的之后的结果
     * @param {*} disabled 
     * @param {*} renderItem 
     * @param {*} model 
     * @param {*} status 
     * @param {*} index 
     * @param {*} type 
     * @param {*} pageScope 
     */


    Cell.prototype._renderTableItemByType = function _renderTableItemByType(moduleId, record, item, value, scale, disabled, renderItem, model, status, index, type, pageScope) {
        var editItem = null;
        var _item$renderStatus = item.renderStatus,
            renderStatus = _item$renderStatus === undefined ? 'edit' : _item$renderStatus;

        if (item.render && renderStatus === 'edit') {
            editItem = item.render.call(null, value ? value.display || value.value : '', record, index);
        } else if (renderItem.table && renderItem.table[moduleId] && renderItem.table[moduleId][item.attrcode]) {
            editItem = renderItem.table[moduleId][item.attrcode];
        } else {
            var DTOpen = type === 'modal' ? {
                open: pageScope.myTable[moduleId].verify[item.attrcode].DTOpen
            } : {};
            var selectOpen = type === 'modal' ? {
                open: pageScope.myTable[moduleId].verify[item.attrcode].selectOpen
            } : {};
            switch (item.itemtype) {
                // case 'refer':
                //     editItem = <ReferLoader />;
                //     break;
                case 'input':
                    //编辑态
                    editItem = _react2["default"].createElement(_nc_FormControl2["default"], { size: 'sm', autoFocus: true });
                    break;
                case 'label':
                    //浏览态
                    editItem = _react2["default"].createElement(_nc_FormControl2["default"], { size: 'sm', autoFocus: true, isViewMode: true });
                    break;
                case 'number':
                    scale = (0, _utils.isWrong)(scale) || scale == '-1' ? +item.scale || 0 : scale;
                    editItem = _react2["default"].createElement(_beeInputNumber2["default"], { autoFocus: true });
                    break;
                // case 'textarea':
                //     editItem = <NCTextArea autoFocus={true} style={{ height: '33px' }} />;
                //     break;
                // case 'datepicker':
                //     editItem = (
                //         <NCTZDatePickClientHourTime
                //         {...DTOpen}
                //         autofocus={true}
                //         tableOpen={true}
                //         format="YYYY-MM-DD"
                //         locale={zhCN}
                //         placeholder={item.placeholder || ''}
                //         />
                //     );
                //     break;
                // case 'NCTZDatePickerStart':
                //     editItem = <NCTZDatePickerStart {...DTOpen} tableOpen={true} placeholder={item.placeholder || ''} />;
                //     break;
                // case 'datetimepicker':
                //     editItem = <NCTZDatePickClientTime {...DTOpen} tableOpen={true} placeholder={item.placeholder || ''} />;
                //     break;
                // case 'NCTZDatePickerEnd':
                //     editItem = <NCTZDatePickerEnd {...DTOpen} tableOpen={true} placeholder={item.placeholder || ''} />;
                //     break;
                // case 'rangepicker':
                //     editItem = <NCRangePickerClient {...DTOpen} tableOpen={true} placeholder={item.placeholder || ''} />;
                //     break;
                // case 'datePickerNoTimeZone':
                //     editItem = <NCDatePickerNoTimeZone {...DTOpen} tableOpen={true} placeholder={item.placeholder || ''} />;
                //     break;
                // case 'timepicker':
                //     value = record.values[item.attrcode].value ? moment(record.values[item.attrcode].value, 'hh:mm:ss') : null;
                //     editItem = <NCTimepicker {...DTOpen} tableOpen={true} placeholder={item.placeholder || ''} format="HH:mm:ss" />;
                //     break;
                case 'select':
                    var fixed = model == 'open' ? {
                        getPopupContainer: function getPopupContainer() {
                            return document.querySelector('#tableModal');
                        }
                    } : {};
                    editItem = _react2["default"].createElement(
                        _beeSelect2["default"],
                        _extends({}, fixed, selectOpen, {
                            size: 'sm',
                            isTable: true
                            // dropdownClassName={NODE_ENV === 'test' && item.attrcode + '-' + 'select'}
                        }),
                        item.options.length && item.options.map(function (one, i) {
                            return _react2["default"].createElement(
                                Option,
                                { key: i, value: String(one.value) },
                                ' ' + one.display + ' '
                            );
                        })
                    );
                    break;
                // case 'radio':
                //     // 需要value
                //     editItem = (
                //         <RadioGroup selectedValue={String(value)}>
                //         {item.options.map((e, i) => {
                //             return (
                //             <Radio key={i} value={String(e.value)}>
                //                 {e.display}
                //             </Radio>
                //             );
                //         })}
                //         </RadioGroup>
                //     );
                //     break;
                // case 'switch':
                //     // 需要value
                //     editItem = <Switch checked={!!value} />;
                //     break;
                // case 'checkbox':
                //     value = String(value);
                //     editItem = (
                //         <span>
                //         {item.options.map((item, i) => {
                //             return (
                //             <Checkbox colors="primary" checked={false} key={i}>
                //                 {item.display}
                //             </Checkbox>
                //             );
                //         })}
                //         </span>
                //     );
                //     break;
                // case 'checkbox_switch':
                //     editItem = <Checkbox colors="primary" checked={!!value} type="switch" />;
                //     break;
                // case 'switch_browse':
                //     disabled = status ? 'on' : disabled === 'on' ? 'on' : 'off';
                //     editItem = <NCPopconfirmSwitch checked={!!value} showTip={false} />;
                //     break;
                // // 密码输入框
                // case 'password':
                //     editItem = <FormControl type="password" />;
                //     break;
                // case 'residtxt':
                //     value = {};
                //     let rows = this.state.table.rows;
                //     item.languageMeta.forEach(i => {
                //         i.index = i.index === '1' ? '' : i.index;
                //     });
                //     item.languageMeta
                //         .map(i => item.attrcode + i.index)
                //         .forEach(i => {
                //         value[i] = rows[index].values[i] ? rows[index].values[i] : {};
                //         });
                //     editItem = <NCMultiLangText />;
                //     break;
            }
        }

        switch (item.itemtype) {
            case 'select':
                value = String(value);
                break;
            case 'refer':
                value = record.values[item.attrcode];
                break;
            default:
                break;
        }

        return {
            editItem: editItem,
            value: value,
            scale: scale,
            isdisabled: disabled
        };
    };

    Cell.prototype.render = function render() {
        // console.log('渲染cell');
        return _react2["default"].createElement(
            'div',
            { style: { width: '100%' } },
            this._createContent()
        );
    };

    return Cell;
}(_react.Component);

exports["default"] = Cell;
module.exports = exports['default'];