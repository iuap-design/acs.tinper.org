'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _tinperBee = require('tinper-bee');

var _acBtns = require('ac-btns');

var _acBtns2 = _interopRequireDefault(_acBtns);

var _acGrids = require('ac-grids');

var _acGrids2 = _interopRequireDefault(_acGrids);

var _cloneDeep = require('clone-deep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _request = require('./utils/request');

var _request2 = _interopRequireDefault(_request);

var _index = require('./utils/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
    processkey: _propTypes2["default"].string, //单据标示
    record: _propTypes2["default"].object, //单据对象
    callback: _propTypes2["default"].func, //回调函数
    type: _propTypes2["default"].oneOfType(['button', 'line']), //按钮类型
    locale: _propTypes2["default"].object, //多语资源
    context: _propTypes2["default"].string, //接口上下文
    submitProcessInstJudgeGo: _propTypes2["default"].bool //是否需要接口判断
};

var defaultProps = {
    processkey: '1357000026525952',
    record: {},
    callback: function callback() {},
    type: 'line',
    context: '/demo-contract-server',
    submitProcessInstJudgeGo: false,
    locale: {
        activityName: '环节名称',
        userName: '被指派人',
        options: '操作',
        code: '编码',
        name: '名称',
        subSucess: '提交成功',
        assign: '指派',
        selectionOfficer: '选择人员'
    }
};

var ApprovalSubmit = function (_Component) {
    _inherits(ApprovalSubmit, _Component);

    function ApprovalSubmit(props) {
        _classCallCheck(this, ApprovalSubmit);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.getUserName = function (record) {
            if (record.participants.length) {
                var names = [];
                record.participants.forEach(function (item) {
                    names.push(item.name);
                });
                return names.join(',');
            } else {
                return '';
            }
        };

        _this.appoint = function (selectIndex) {
            _this.setState({
                selectIndex: selectIndex,
                showModal: true
            });
        };

        _this.onClick = function () {
            _this.setState({
                showLoading: true
            });
            var record = _this.props.record;
            delete record.ts;
            record.subscribeDate = new Date(record.subscribeDate.substr(0, 10)).toISOString();
            var url = _this.props.context + '/contract/bpmSubmit/assignCheck';
            (0, _request2["default"])(url, {
                method: "post",
                data: {
                    entity: record
                },
                params: {
                    category: _this.props.processkey,
                    orgId: record.orgId
                }
            }).then(function (res) {
                var _processData = (0, _index.processData)(res),
                    result = _processData.result;

                _this.setState({
                    showLoading: false
                });
                if (result.status == 'success') {
                    if (result && result.data && result.data.assignAble) {
                        var data = result.data.assignInfo.assignInfoItems;
                        var data2 = data[_this.state.selectIndex].participants;
                        _this.setState({
                            allDataObj: result.data,
                            data: data,
                            show: true,
                            data2: data2
                        });
                    } else {
                        //直接提交
                        _this.sampleSubmit();
                    }
                }
            })["catch"](function (error) {
                (0, _index.Error)(error);
                _this.setState({
                    showLoading: false
                });
            });
        };

        _this.close = function () {
            _this.setState({
                show: false
            });
        };

        _this.closeModal = function () {
            _this.setState({
                showModal: false
            });
        };

        _this.ok = function () {
            //保存数据
            _this.setState({
                showLoading: true
            });
            var record = _this.props.record;
            delete record.ts;
            var allDataObj = _this.state.allDataObj;
            allDataObj.assignInfo.assignInfoItems = _this.state.data;
            allDataObj.vo = {
                entity: record
            };
            var url = _this.props.context + '/contract/bpmSubmit/assignSubmit';
            if (_this.props.submitProcessInstJudgeGo) url = _this.props.context + '/contract/submitProcessInstJudgeGo';
            (0, _request2["default"])(url, {
                method: "post",
                data: allDataObj,
                params: {
                    category: _this.props.processkey,
                    needSaved: false,
                    orgId: record.orgId,
                    processInstId: record.processInstId
                }
            }).then(function (res) {
                var _processData2 = (0, _index.processData)(res, _this.props.locale.subSucess),
                    result = _processData2.result;

                _this.props.callback();
                _this.setState({
                    show: false,
                    showLoading: false
                });
            })["catch"](function (error) {
                _this.props.callback(error);
                (0, _index.Error)(error);
                _this.setState({
                    showLoading: false
                });
            });
        };

        _this.sampleSubmit = function () {
            _this.setState({
                showLoading: true
            });
            var url = _this.props.context + '/contract/bpmSubmit/commonSubmit';
            var record = _this.props.record;
            delete record.ts;
            record.subscribeDate = new Date(record.subscribeDate.substr(0, 10)).toISOString();
            var data = {
                entity: record
            };
            if (_this.props.submitProcessInstJudgeGo) {
                url = _this.props.context + '/contract/submitProcessInstJudgeGo';
                data = {
                    assignInfo: {},
                    description: null,
                    createType: null,
                    assignSingle: false,
                    assignAll: false,
                    assignAble: true,
                    vo: {
                        entity: record
                    }
                };
            }
            (0, _request2["default"])(url, {
                method: "post",
                data: data,
                params: {
                    category: _this.props.processkey,
                    needSaved: false,
                    orgId: record.orgId,
                    processInstId: record.processInstId
                }
            }).then(function (res) {
                var _processData3 = (0, _index.processData)(res, _this.props.locale.subSucess),
                    result = _processData3.result;

                _this.props.callback();
                _this.setState({
                    showLoading: false
                });
            })["catch"](function (error) {
                (0, _index.Error)(error);
                _this.setState({
                    showLoading: false
                });
            });
        };

        _this.getSelectedDataFunc = function (selectData, record, index) {
            _this.setState({
                selectData: selectData
            });
            var _list = (0, _cloneDeep2["default"])(_this.state.data2);
            var allChecked = selectData.length == 0 ? false : true;
            if (!record) {
                _list.forEach(function (item) {
                    item._checked = allChecked;
                });
            } else {
                _list[index]['_checked'] = record._checked;
            }
            _this.setState({
                data2: _list
            });
        };

        _this.confirmOk = function () {
            var index = _this.state.selectIndex;
            var data = (0, _cloneDeep2["default"])(_this.state.data);
            var participants = [];
            _this.state.selectData.forEach(function (item) {
                delete item._checked;
                participants.push(item);
            });
            data[index].participants = participants;
            _this.setState({
                data: data,
                showModal: false
            });
        };

        _this.state = {
            show: false,
            data: [],
            selectIndex: 0,
            showLoading: false,
            allDataObj: {},
            showModal: false,
            data2: []
        };

        _this.columns = [{
            title: props.locale.activityName,
            dataIndex: "activityName",
            key: "activityName"
        }, {
            title: props.locale.userName,
            dataIndex: "userName",
            key: "userName",
            render: function render(text, record, index) {
                return _react2["default"].createElement(
                    'span',
                    null,
                    _this.getUserName(record)
                );
            }
        }, {
            title: props.locale.options,
            dataIndex: "e",
            key: "e",
            textAlign: 'center',
            render: function render(text, record, index) {
                return _react2["default"].createElement(
                    'span',
                    { className: 'approval-board-operation', onClick: function onClick() {
                            _this.appoint(index);
                        } },
                    props.locale.assign
                );
            }
        }];
        _this.columns2 = [{
            title: props.locale.code,
            dataIndex: "code",
            key: "code"
        }, {
            title: props.locale.name,
            dataIndex: "name",
            key: "name"
        }];
        return _this;
    }
    /**
     * 指派
     */


    /**
     * 直接提交
     */


    ApprovalSubmit.prototype.render = function render() {
        return _react2["default"].createElement(
            _react.Fragment,
            null,
            _react2["default"].createElement(_tinperBee.Loading, { show: this.state.showLoading }),
            _react2["default"].createElement(_acBtns2["default"], { type: this.props.type,
                btns: {
                    pbmsubmit: {
                        onClick: this.onClick
                    }
                }
            }),
            _react2["default"].createElement(
                _tinperBee.Modal,
                {
                    backdropClassName: 'approval-board-modal-backdrop',
                    size: 'xlg',
                    dialogClassName: 'approval-board-modal',
                    show: this.state.show,
                    onHide: this.close,
                    autoFocus: false,
                    enforceFocus: false
                },
                _react2["default"].createElement(
                    _tinperBee.Modal.Header,
                    { closeButton: true },
                    _react2["default"].createElement(
                        _tinperBee.Modal.Title,
                        null,
                        this.props.locale.assign
                    )
                ),
                _react2["default"].createElement(
                    _tinperBee.Modal.Body,
                    null,
                    _react2["default"].createElement(_acGrids2["default"], {
                        rowKey: function rowKey(record, index) {
                            return index;
                        },
                        columns: this.columns,
                        data: this.state.data,
                        multiSelect: false,
                        scroll: { y: 500 }
                    })
                ),
                _react2["default"].createElement(
                    _tinperBee.Modal.Footer,
                    null,
                    _react2["default"].createElement(_acBtns2["default"], {
                        btns: {
                            confirm: {
                                onClick: this.ok
                            },
                            cancel: {
                                onClick: this.close
                            }
                        }
                    })
                )
            ),
            _react2["default"].createElement(
                _tinperBee.Modal,
                {
                    show: this.state.showModal,
                    onHide: this.closeModal,
                    dialogClassName: 'approval-board-modal2'
                },
                _react2["default"].createElement(
                    _tinperBee.Modal.Header,
                    { closeButton: true },
                    _react2["default"].createElement(
                        _tinperBee.Modal.Title,
                        null,
                        this.props.locale.selectionOfficer
                    )
                ),
                _react2["default"].createElement(
                    _tinperBee.Modal.Body,
                    null,
                    _react2["default"].createElement(_acGrids2["default"], {
                        rowKey: function rowKey(record, index) {
                            return index;
                        },
                        columns: this.columns2,
                        data: this.state.data2,
                        multiSelect: true,
                        scroll: { y: 500 },
                        getSelectedDataFunc: this.getSelectedDataFunc,
                        paginationObj: null
                    })
                ),
                _react2["default"].createElement(
                    _tinperBee.Modal.Footer,
                    null,
                    _react2["default"].createElement(_acBtns2["default"], {
                        btns: {
                            confirm: {
                                onClick: this.confirmOk
                            },
                            cancel: {
                                onClick: this.closeModal
                            }
                        }
                    })
                )
            )
        );
    };

    return ApprovalSubmit;
}(_react.Component);

ApprovalSubmit.propTypes = propTypes;
ApprovalSubmit.defaultProps = defaultProps;
exports["default"] = ApprovalSubmit;
module.exports = exports['default'];