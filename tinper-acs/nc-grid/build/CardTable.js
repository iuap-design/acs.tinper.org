'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _FoldableTabs = require('./FoldableTabs');

var _FoldableTabs2 = _interopRequireDefault(_FoldableTabs);

var _SimpleTable = require('./SimpleTable');

var _SimpleTable2 = _interopRequireDefault(_SimpleTable);

var _EditTable = require('./EditTable');

var _EditTable2 = _interopRequireDefault(_EditTable);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
    showMore: PropTypes.bool, //是否展开详细信息
    showMax: PropTypes.bool, //是否最大化
    moduleId: PropTypes.string, //meta的id号
    config: PropTypes.object, //表格配置项
    tabLists: PropTypes.array, //卡表的 tabs 页签
    showListView: PropTypes.bool, //是否以列表形式展示
    onTabChange: PropTypes.func //切换 Tab 时触发的回调
};

var defaultProps = {
    showMore: true,
    showMax: false,
    moduleId: '',
    config: {},
    tabLists: [],
    showListView: false,
    onTabChange: function onTabChange() {}
};

var CardTable = function (_Component) {
    _inherits(CardTable, _Component);

    function CardTable(props) {
        _classCallCheck(this, CardTable);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.onTypeChange = function (item) {
            var onTabChange = _this.props.onTabChange;

            _this.setState({
                activeKey: item
            });
            onTabChange && isFunction(onTabChange) && onTabChange();
        };

        _this.onHeadAngleToggle = function (showMore) {
            _this.setState({ showMore: showMore });
        };

        _this.openMaxTable = function (isMaximized) {
            _this.setState({ isMaximized: isMaximized });
        };

        _this.addRow = function () {
            _this.editTable.addRow();
        };

        _this.delRow = function () {
            _this.editTable.delRowByRowId();
        };

        _this.pasteRow = function () {
            _this.editTable.pasteRow();
        };

        _this.state = {
            status: 'browse', //browse(浏览态)、edit(编辑态)
            activeKey: '', //标识当前卡表的选中项
            showMore: props.showMore, //卡表是否展开
            isMaximized: false //是否最大化显示
        };
        return _this;
    }

    //activeKey 改变时触发的回调


    //卡表收起/展开状态改变时的回调


    //最大化多表中表格

    //调用editTable实例中的方法


    CardTable.prototype.render = function render() {
        var _this2 = this;

        var _props = this.props,
            showMax = _props.showMax,
            moduleId = _props.moduleId,
            columns = _props.columns,
            dataRows = _props.data,
            tabLists = _props.tabLists,
            showListView = _props.showListView,
            isEdit = _props.isEdit,
            tableRightHead = _props.tableRightHead,
            config = _objectWithoutProperties(_props, ['showMax', 'moduleId', 'columns', 'data', 'tabLists', 'showListView', 'isEdit', 'tableRightHead']);

        var _state = this.state,
            status = _state.status,
            showMore = _state.showMore,
            activeKey = _state.activeKey,
            isMaximized = _state.isMaximized;


        var tabsOther = tabLists.map(function (item, index) {
            var code = item.code,
                items = item.items,
                name = item.name;
            // let curColumn = columns[code];
            // if (config && config.showCheck && !checkHasKey(meta.items, 'checkbox')) {
            //   curColumn = [...checkColumn, ...curColumn];
            // }
            //multiSelect

            return {
                key: code,
                label: name,
                render: function render() {
                    return _react2["default"].createElement(_EditTable2["default"], _extends({
                        columns: columns,
                        data: dataRows,
                        moduleId: moduleId,
                        isEdit: isEdit,
                        onRef: function onRef(ref) {
                            _this2.editTable = ref;
                        } //获取EditTable组件实例
                    }, config));
                }
            };
        });

        return _react2["default"].createElement(
            'main',
            {
                className: (0, _classnames2["default"])('lightapp-component-cardTable', {
                    'lightapp-component-cardTable-close': !showMore
                })
            },
            _react2["default"].createElement(
                'div',
                { className: 'lightapp-component-cardTable-table' },
                !isMaximized ? _react2["default"].createElement(_FoldableTabs2["default"]
                // pageScope={pageScope}
                , _extends({ tableScope: this,
                    isEdit: status == 'edit',
                    moduleId: moduleId,
                    activeKey: activeKey,
                    tabs: tabsOther,
                    showListView: showListView,
                    rows: dataRows
                    // expandedList={expandedList}
                    , handleTypeChange: function handleTypeChange(item) {
                        _this2.onTypeChange(item);
                        // 标签切换时，首个自动聚焦
                        // status === 'edit' && cellFocusAfterTabChange(item);
                    },
                    showMore: showMore,
                    isMaximized: isMaximized,
                    onHeadAngleToggle: this.onHeadAngleToggle,
                    openMaxTable: this.openMaxTable,
                    addRow: this.addRow,
                    delRow: this.delRow,
                    pasteRow: this.pasteRow
                }, config)) : null
            ),
            ReactDOM.createPortal(_react2["default"].createElement(
                'section',
                {
                    className: (0, _classnames2["default"])('card-table-max ', {
                        scaleFromOrigin: !!isMaximized
                    })
                },
                isMaximized ? _react2["default"].createElement(_FoldableTabs2["default"]
                // pageScope={pageScope}
                , _extends({ tableScope: this,
                    config: config,
                    isEdit: status == 'edit',
                    moduleId: moduleId,
                    activeKey: activeKey,
                    tabs: tabsOther,
                    showListView: showListView,
                    rows: dataRows
                    // expandedList={expandedList}
                    , handleTypeChange: function handleTypeChange(item) {
                        _this2.onTypeChange(item);
                        // 标签切换时，首个自动聚焦
                        // status === 'edit' && cellFocusAfterTabChange(item);
                    },
                    showMore: showMore,
                    isMaximized: isMaximized,
                    onHeadAngleToggle: this.onHeadAngleToggle,
                    openMaxTable: this.openMaxTable,
                    addRow: this.addRow,
                    delRow: this.delRow,
                    pasteRow: this.pasteRow
                }, config)) : null
            ), document.querySelector('body'))
        );
    };

    return CardTable;
}(_react.Component);

CardTable.propTypes = propTypes;
CardTable.defaultProps = defaultProps;
exports["default"] = CardTable;
module.exports = exports['default'];