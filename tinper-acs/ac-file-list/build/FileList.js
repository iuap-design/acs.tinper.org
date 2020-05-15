'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _beeUpload = require('bee-upload');

var _beeUpload2 = _interopRequireDefault(_beeUpload);

var _beeProgressBar = require('bee-progress-bar');

var _beeProgressBar2 = _interopRequireDefault(_beeProgressBar);

var _beeIcon = require('bee-icon');

var _beeIcon2 = _interopRequireDefault(_beeIcon);

var _beeModal = require('bee-modal');

var _beeModal2 = _interopRequireDefault(_beeModal);

var _beeTable = require('bee-table');

var _beeTable2 = _interopRequireDefault(_beeTable);

var _acBtns = require('ac-btns');

var _acBtns2 = _interopRequireDefault(_acBtns);

var _cloneDeep = require('clone-deep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _utils = require('./utils.js');

var _i18n = require('./i18n.js');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
    canUnfold: _propTypes2["default"].bool, //是否可以展开收起
    id: _propTypes2["default"].string.isRequired,
    clsfix: _propTypes2["default"].string,
    disabled: _propTypes2["default"].bool,
    getListNow: _propTypes2["default"].bool, //是否在willmonument时获得文件列表
    url: _propTypes2["default"].object, //地址
    uploadProps: _propTypes2["default"].object, //附件上传参数
    powerBtns: _propTypes2["default"].array, //可用按钮集合
    callback: _propTypes2["default"].func //回调 第一个参数：成功(success)/失败(error)； 第二个参数：list 获得文件列表；delete 删除； upload 上传。 第三个参数：成功信息/错误信息。 第四个参数：null/error对象
};

var defaultProps = {
    id: '',
    clsfix: 'ac-upload-list',
    disabled: false,
    getListNow: false,
    url: { // {id} 替换为 props.id
        "list": 'https://ezone-u8c-daily.yyuap.com/cooperation/rest/v1/file/caep/{id}/files', //文件列表
        "upload": 'https://ezone-u8c-daily.yyuap.com/cooperation/rest/v1/file/caep/{id}/', //上传
        "delete": 'https://ezone-u8c-daily.yyuap.com/cooperation/rest/v1/file/{id}', //下载 cooperation/rest/v1/file/5d639caaa957bd001936cec9  此处id为附件id
        "info": 'https://ezone-u8c-daily.yyuap.com/cooperation/rest/v1/file/{id}/info/ ' //文件信息
    },
    uploadProps: {},
    powerBtns: ['upload', 'reupload', 'download', 'delete', 'confirm', 'cancel'],
    localeCookie: 'locale',
    callback: function callback() {},
    canUnfold: true
};

var FileList = function (_Component) {
    _inherits(FileList, _Component);

    function FileList(props) {
        _classCallCheck(this, FileList);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.getList = function () {
            var pageObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var propsId = arguments[1];

            var id = propsId || _this.props.id;
            if (id) {
                var url = _this.props.url.list.replace('{id}', id);
                var params = _extends({
                    pageSize: _this.state.pageSize,
                    fileName: '',
                    pageNo: _this.state.pageNo //从1开始
                }, pageObj);
                (0, _axios2["default"])(url, {
                    method: "get",
                    params: params,
                    withCredentials: true
                }).then(function (res) {
                    if (res.status == 200) {
                        var data = res.data.data;
                        if (data) {
                            //data.forEach(item=>item.userName=decodeURIComponent(getCookie('yonyou_uname')));
                            _this.setState({
                                data: data.reverse(),
                                pageSize: params.pageSize,
                                pageNo: params.pageNo
                            });
                        }
                        _this.props.callback('success', 'list', res);
                    } else {
                        _this.props.callback('error', 'list', res);
                    }
                })["catch"](function (error) {
                    _this.props.callback('error', 'list', error);
                    console.error(error);
                });
            }
        };

        _this.getSelectedDataFunc = function (selectedList, record, index) {
            var ids = [];
            selectedList.forEach(function (item, index) {
                ids.push(item.id);
            });

            var data = (0, _cloneDeep2["default"])(_this.state.data);
            data.forEach(function (item, index) {
                if (ids.indexOf(item.id) == -1) {
                    item._checked = false;
                } else {
                    item._checked = true;
                }
            });
            _this.setState({
                data: data,
                selectedList: selectedList
            });
        };

        _this.onRowHover = function (index, record) {
            _this.state.hoverData = record;
            _this.setState({
                hoverData: record
            });
        };

        _this.deleteError = function (uid) {
            var data = (0, _cloneDeep2["default"])(_this.state.data);
            data.forEach(function (item, index) {
                if (item.uid == uid) data.splice(index, 1);
            });
            _this.setState({
                data: data
            });
        };

        _this.reUpload = function (fileInfo, fileList) {
            var data = (0, _cloneDeep2["default"])(_this.state.data);
            var uid = _this.state.hoverData.uid;
            data.forEach(function (item, index) {
                if (item.uid == uid) data.splice(index, 1);
            });
            _this.setState({
                data: data
            }, function () {
                _this.beforeUpload(fileInfo, fileList);
            });
        };

        _this.deleteConfirm = function () {
            _this.setState({
                show: true
            });
        };

        _this.cancelFn = function () {
            _this.setState({
                show: false
            });
        };

        _this["delete"] = function () {
            var url = _this.props.url["delete"].replace('{id}', _this.state.hoverData.id);
            (0, _axios2["default"])(url, {
                method: "delete",
                withCredentials: true
            }).then(function (res) {
                if (res.status == 200) {
                    _this.props.callback('success', 'delete', res);
                    console.log(_this.localObj['delSuccess']);
                    _this.getList();
                    _this.setState({
                        show: false
                    });
                } else {
                    _this.props.callback('error', 'delete', res);
                }
            })["catch"](function (error) {
                _this.setState({
                    show: false
                });
                _this.props.callback('error', 'delete', error);
                console.error(error);
            });
        };

        _this.download = function () {
            var url = _this.props.url.info.replace('{id}', _this.state.hoverData.id);
            (0, _axios2["default"])(url, {
                method: "get",
                withCredentials: true
            }).then(function (res) {
                if (res.status == 200) {
                    window.open(res.data.filePath);
                    _this.props.callback('success', 'download', res);
                    console.log(_this.localObj['downloadSuccess']);
                } else {
                    _this.props.callback('error', 'download', res);
                }
            })["catch"](function (error) {
                _this.props.callback('error', 'download', error);
                console.error(error);
            });
        };

        _this.fileChange = function (info) {
            var data = (0, _cloneDeep2["default"])(_this.state.data);
            if (info.file.status !== 'uploading') {}
            if (info.file.status === 'done') {
                var id = info.file.response.data[0].id;
                data.forEach(function (item) {
                    if (item.uid == info.file.uid) {
                        item.uploadStatus = 'done';
                        item.id = id;
                    }
                });
                _this.setState({
                    data: data
                });
                _this.props.callback('success', 'upload', info.file.response);
                console.log(_this.localObj['uploadSuccess']);
            }
            if (info.file.status === 'removed') {
                var msg = info.file.response.displayMessage[(0, _utils.getCookie)(_this.props.localeCookie)] || info.file.response.displayMessage['zh_CN'];
                console.error(info.file.name + ' ' + _this.localObj['uploadError']);
                _this.props.callback('error', 'upload', info.file.response);
                data.forEach(function (item) {
                    if (item.uid == info.file.uid) {
                        item.uploadStatus = 'error';
                        item.errorMsg = msg;
                    }
                });
                _this.setState({
                    data: data
                });
            }
        };

        _this.beforeUpload = function (file, fileList) {
            var data = (0, _cloneDeep2["default"])(_this.state.data);
            fileList.forEach(function (fileInfo, index) {
                var nameAry = fileInfo.name.split('.');
                var obj = {
                    fileExtension: '.' + nameAry[nameAry.length - 1],
                    fileName: nameAry.splice(0, nameAry.length - 1).join('.'),
                    fileSizeText: (0, _utils.getSize)(fileInfo.size),
                    uid: fileInfo.uid,
                    userName: decodeURIComponent((0, _utils.getCookie)('yonyou_uname')),
                    uploadStatus: 'uploading'
                };
                data.unshift(obj);
            });
            _this.setState({
                data: data
            });
        };

        _this.changeOpenStatus = function () {
            _this.setState({
                open: !_this.state.open
            });
        };

        _this.state = {
            data: [],
            selectedList: [],
            show: false,
            pageNo: 1,
            pageSize: 999999,
            hoverData: {},
            id: props.id,
            open: true
        };
        _this.localObj = _i18n2["default"][(0, _utils.getCookie)(props.localeCookie)] || _i18n2["default"]['zh_CN'];
        _this.columns = [{
            title: _this.localObj.fileName,
            dataIndex: "fileName",
            key: "fileName",
            className: "rowClassName",
            width: 300,
            render: function render(text, record) {
                return (0, _utils.getFileNames)(text, record.fileExtension);
            }
        }, {
            title: _this.localObj.fileExtension,
            dataIndex: "fileExtension",
            key: "fileExtension",
            width: 100
        }, {
            title: _this.localObj.fileSize,
            dataIndex: "fileSizeText",
            key: "fileSizeText",
            width: 100
        }, {
            title: _this.localObj.createrUser,
            dataIndex: "userName",
            key: "userName",
            width: 200,
            render: function render(text, record, index) {
                if (record.uploadStatus == 'uploading') {
                    return _react2["default"].createElement(_beeProgressBar2["default"], { className: 'uploading', size: 'sm', active: true, now: 20 });
                } else if (record.uploadStatus == 'error') {
                    return _react2["default"].createElement(_beeProgressBar2["default"], { size: 'sm', active: true, now: 90 });
                } else if (record.uploadStatus == 'done') {
                    return decodeURIComponent((0, _utils.getCookie)('yonyou_uname'));
                } else {
                    return text;
                }
            }
        }, {
            title: _this.localObj.createrTime,
            dataIndex: "ctime",
            key: "ctime",
            width: 200,
            render: function render(text, record, index) {
                if (record.uploadStatus == 'uploading') {
                    return _react2["default"].createElement(
                        'span',
                        { className: 'upload-status uploading' },
                        ' ',
                        _react2["default"].createElement(_beeIcon2["default"], { type: 'uf-loadingstate' }),
                        ' ',
                        _this.localObj.uploading,
                        ' '
                    );
                } else if (record.uploadStatus == 'error') {
                    return _react2["default"].createElement(
                        'span',
                        { className: 'upload-status error', title: record.errorMsg || _this.localObj.uploadError },
                        ' ',
                        _react2["default"].createElement(_beeIcon2["default"], { type: 'uf-exc-c' }),
                        record.errorMsg || _this.localObj.uploadError
                    );
                } else if (record.uploadStatus == 'done') {
                    return (0, _utils.dateFormate)(new Date(), 'yyyy-MM-dd hh:mm');
                } else {
                    return (0, _utils.dateFormate)(new Date(text), 'yyyy-MM-dd hh:mm');
                }
            }
        }, {
            title: _this.localObj.operation,
            dataIndex: "e",
            key: "e",
            width: 200,
            render: function render(text, record, index) {
                if (!_this.props.disabled) {
                    if (record.uploadStatus == 'error') {
                        var uploadP = _extends({
                            name: 'files',
                            action: _this.props.url.upload.replace('{id}', _this.props.id),
                            onChange: _this.fileChange,
                            multiple: true,
                            beforeUpload: _this.reUpload,
                            withCredentials: true
                        }, _this.props.uploadProps);
                        return _react2["default"].createElement(
                            'div',
                            { className: 'opt-btns' },
                            _react2["default"].createElement(_acBtns2["default"], _defineProperty({ localeCookie: _this.props.localeCookie,
                                powerBtns: _this.props.powerBtns,
                                type: 'line',
                                btns: {
                                    reupload: {
                                        node: _react2["default"].createElement(
                                            _beeUpload2["default"],
                                            uploadP,
                                            _react2["default"].createElement(_acBtns2["default"], { localeCookie: _this.props.localeCookie,
                                                powerBtns: _this.props.powerBtns,
                                                type: 'line',
                                                btns: { reupload: {} } })
                                        )
                                    },
                                    "delete": {
                                        onClick: function onClick() {
                                            _this.deleteError(record.uid);
                                        }
                                    }
                                }
                            }, 'powerBtns', props.powerBtns))
                        );
                    } else if (record.uploadStatus == 'uploading') {
                        return _react2["default"].createElement('div', { className: 'opt-btns' });
                    } else {
                        return _react2["default"].createElement(
                            'div',
                            { className: 'opt-btns' },
                            _react2["default"].createElement(_acBtns2["default"], { localeCookie: props.localeCookie,
                                type: 'line',
                                btns: {
                                    download: {
                                        onClick: _this.download
                                    },
                                    "delete": {
                                        onClick: _this.deleteConfirm
                                    }
                                },
                                powerBtns: props.powerBtns
                            })
                        );
                    }
                }
            }
        }];
        return _this;
    }

    FileList.prototype.componentDidMount = function componentDidMount() {
        this.props.getListNow && this.getList();
    };

    FileList.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (nextProps.id != this.state.id) {
            this.setState({
                id: nextProps.id
            });
            this.getList({}, nextProps.id);
        }
        if (nextProps.getListNow && !this.props.getListNow && nextProps.id && nextProps.id != this.state.id) {
            this.getList({}, nextProps.id);
            this.setState({
                id: nextProps.id
            });
        }
    };

    /**获得文件列表 */

    /**划过 */

    /**删除上传失败的文件 */


    /**删除 */


    // pageIndexChange=(pageNo)=>{
    //     this.getList({
    //         pageNo
    //     })
    // }
    // pageSizeChange=(pageSize)=>{
    //     this.getList({
    //         pageSize
    //     })
    // }


    FileList.prototype.render = function render() {
        var _props = this.props,
            clsfix = _props.clsfix,
            id = _props.id,
            disabled = _props.disabled,
            uploadProps = _props.uploadProps,
            canUnfold = _props.canUnfold,
            title = _props.title;
        var _state = this.state,
            data = _state.data,
            open = _state.open;

        var uploadP = _extends({
            withCredentials: true,
            name: 'files',
            action: this.props.url.upload.replace('{id}', this.props.id),
            onChange: this.fileChange,
            multiple: true,
            beforeUpload: this.beforeUpload
        }, uploadProps);
        return _react2["default"].createElement(
            'div',
            { className: clsfix },
            _react2["default"].createElement(
                'div',
                { className: open ? clsfix + '-header' : clsfix + '-header close' },
                canUnfold ? _react2["default"].createElement(
                    'div',
                    { className: clsfix + '-text', onClick: this.changeOpenStatus },
                    _react2["default"].createElement(_beeIcon2["default"], { type: open ? 'uf-triangle-down' : 'uf-triangle-right' }),
                    _react2["default"].createElement(
                        'span',
                        null,
                        title ? title : this.localObj.file
                    )
                ) : '',
                _react2["default"].createElement(
                    'div',
                    { className: clsfix + '-btns' },
                    disabled ? '' : _react2["default"].createElement(_acBtns2["default"], { localeCookie: this.props.localeCookie,
                        powerBtns: this.props.powerBtns,
                        btns: {
                            upload: {
                                node: _react2["default"].createElement(
                                    _beeUpload2["default"],
                                    uploadP,
                                    _react2["default"].createElement(_acBtns2["default"], { localeCookie: this.props.localeCookie, powerBtns: this.props.powerBtns, btns: { upload: {} } })
                                )
                            }
                        }
                    })
                )
            ),
            _react2["default"].createElement(
                'div',
                { className: open ? clsfix + '-file-area' : clsfix + '-file-area hide' },
                _react2["default"].createElement(_beeTable2["default"], {
                    columns: this.columns,
                    data: data,
                    rowKey: function rowKey(record, index) {
                        return index;
                    },
                    scroll: { y: 400 },
                    getSelectedDataFunc: this.getSelectedDataFunc,
                    onRowHover: this.onRowHover,
                    multiSelect: false

                }),
                _react2["default"].createElement(
                    _beeModal2["default"],
                    {
                        size: 'sm',
                        className: 'pop_dialog',
                        show: this.state.show,
                        onHide: this.cancelFn },
                    _react2["default"].createElement(
                        _beeModal2["default"].Header,
                        { closeButton: true },
                        _react2["default"].createElement(
                            _beeModal2["default"].Title,
                            null,
                            this.localObj["delete"]
                        )
                    ),
                    _react2["default"].createElement(
                        _beeModal2["default"].Body,
                        { className: 'pop_body' },
                        _react2["default"].createElement(
                            'div',
                            null,
                            _react2["default"].createElement(
                                'span',
                                { 'class': 'keyword' },
                                _react2["default"].createElement('i', { 'class': 'uf uf-exc-c-2 ' }),
                                this.localObj["delete"]
                            ),
                            _react2["default"].createElement(
                                'span',
                                { className: 'pop_dialog-ctn' },
                                this.localObj.delSure
                            )
                        )
                    ),
                    _react2["default"].createElement(
                        _beeModal2["default"].Footer,
                        { className: 'pop_footer' },
                        _react2["default"].createElement(_acBtns2["default"], { localeCookie: this.props.localeCookie,
                            powerBtns: this.props.powerBtns,
                            btns: {
                                confirm: {
                                    onClick: this["delete"]
                                },
                                cancel: {
                                    onClick: this.cancelFn
                                }
                            }
                        })
                    )
                )
            )
        );
    };

    return FileList;
}(_react.Component);

;

FileList.propTypes = propTypes;
FileList.defaultProps = defaultProps;
exports["default"] = FileList;
module.exports = exports['default'];