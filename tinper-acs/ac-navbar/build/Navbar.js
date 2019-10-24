'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _HeaderLeft = require('./HeaderLeft');

var _HeaderLeft2 = _interopRequireDefault(_HeaderLeft);

var _HeaderCenter = require('./HeaderCenter');

var _HeaderCenter2 = _interopRequireDefault(_HeaderCenter);

var _HeaderRight = require('./HeaderRight');

var _HeaderRight2 = _interopRequireDefault(_HeaderRight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
    showHeader: _propTypes2["default"].bool //是否显示导航栏
};

var defaultProps = {
    showHeader: true,
    clsPrefix: 'ac-navbar'
};

var AcNavbar = function (_Component) {
    _inherits(AcNavbar, _Component);

    function AcNavbar(props, context) {
        _classCallCheck(this, AcNavbar);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        _this.addFullScreenChangeEvent = function () {
            var de = document.documentElement;
            if (de.requestFullscreen) {
                document.addEventListener('fullscreenchange', function () {
                    return _this.fulllscreenChange();
                });
            } else if (de.mozRequestFullScreen) {
                document.addEventListener('mozfullscreenchange', function () {
                    return _this.fulllscreenChange();
                });
            } else if (de.webkitRequestFullScreen) {
                document.addEventListener('webkitfullscreenchange', function () {
                    return _this.fulllscreenChange();
                });
            } else if (de.msRequestFullscreen) {
                document.addEventListener('MSFullscreenChange', function () {
                    return _this.fulllscreenChange();
                });
            }
        };

        _this.fulllscreenChange = function () {
            var maxed = _this.state.maxed;

            _this.setState({
                maxed: !maxed
            });
        };

        _this.svgClick = function () {
            var sideBarShow = _this.state.sideBarShow;

            _this.setState({
                sideBarShow: !sideBarShow
            });
            _this.props.onSidebarClick && _this.props.onSidebarClick(!sideBarShow);
        };

        _this.state = {
            expanded: false,
            openKeys: [],
            curentOpenKeys: [],
            maxed: false,
            unreadMsg: 0,
            svgWidth: 22,
            svgHeight: 26,
            sideBarShow: false
        };
        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }

    AcNavbar.prototype.componentWillMount = function componentWillMount() {
        this.addFullScreenChangeEvent();
    };

    AcNavbar.prototype.handleClick = function handleClick(e, reload) {
        //判断是否点击子菜单,1:当前子菜单，2:2级别子菜单。。。
        var _props = this.props,
            menus = _props.menus,
            current = _props.current,
            intl = _props.intl;


        var self = this;

        function getDOm() {
            var tar = e.target || e.domEvent.target;
            if (!tar.tagName || tar.tagName !== 'A') {
                tar = tar.closest('a');
            }
            if (tar.getAttribute('value')) {
                return tar;
            } else if (tar.parentElement.getAttribute('value')) {
                tar.parentElement;
            } else {
                return tar.parentElement.parentElement;
            }
        }

        var tar = getDOm();

        if (!tar) {
            return false;
        }

        var value = tar.getAttribute('value');

        var data = {
            current: value,
            showNotice: 0,
            reload: 0
        };

        if (typeof value == 'undefined' || value == null) {
            return false;
        }

        if (value == 'logout') {
            return false;
        }

        var dom = tar;
        var title = dom.getAttribute('name');
        var router = dom.getAttribute('href');

        var options = {
            title: title,
            router: router,
            id: value
        };

        var menu = menus;

        //点击已经选中的节点时
        if (value == current) {
            var url = location.hash;
            //window.router.dispatch('on', url.replace('#',''));
        } else {
            if (typeof dom != "undefined" && dom.getAttribute('target') == '_blank') {
                return false;
            } else {
                var menuObj = JSON.parse(JSON.stringify(menu));

                if (menuObj.length == 11 && JSON.stringify(menu).indexOf('"id":"' + options.id + '"') == -1 && menu.length != 0) {
                    actions.app.updateState({
                        showNotice: 1
                    });
                    // Warning(  intl.formatMessage({id: 'tabs.sidebar.maxnums',defaultMessage:"抱歉，最多展示10个页签！"}));
                    return false;
                } else if (JSON.stringify(menu).indexOf('"id":"' + options.id + '"') != -1) {
                    data = {
                        current: value,
                        showNotice: 0,
                        reload: reload ? 1 : 0,
                        currentRouter: reload ? decodeURIComponent(decodeURIComponent(router.replace('#\/ifr\/', ''))) : ''
                    };
                }
                actions.app.updateState(data);
            }
        }
    };

    AcNavbar.prototype.formmaterUrl = function formmaterUrl(item) {
        var uri = " ";
        if (item.urltype === 'url') {
            var target = item.openview == "newpage" ? "_blank" : "";
            if (target) {
                // uri = '#/ifrNoHead/' + encodeURIComponent(encodeURIComponent(item.location));
                uri = item.location;
            } else {
                uri = '#/ifr/' + encodeURIComponent(encodeURIComponent(item.location));
            }
            return uri;
        } else if (item.urltype === 'plugin') {
            uri = item.id ? '#/' + item.id : "#/index_plugin";

            uri = GROBAL_HTTP_CTX + '/' + encodeURIComponent(encodeURIComponent('index-view.html' + uri));
            return uri;
        } else if (item.urltype === 'view') {
            uri = item.location;
            uri = uri.replace("#", "/");

            if (uri[0] == '/') {
                uri = "/sidebar" + uri;
            } else {
                uri = "/sidebar/" + uri;
            }
            // window.addRouter(uri);
            // return  "#"+uri;

            return GROBAL_HTTP_CTX + '/' + 'index-view.html#' + uri;
        } else if (item.urltype == undefined) {
            item.location = '404';
            return '#/ifr/' + encodeURIComponent(encodeURIComponent(item.location));
        } else {
            return item.location;
        }
    };

    AcNavbar.prototype.handleDefault = function handleDefault(e, isDefault) {
        isDefault = isDefault == "_blank" ? false : true;
        if (window.isOpenTab && isDefault) {
            //dom.href = 'javascript:;'
            e.preventDefault();
        }
    };

    AcNavbar.prototype.maxfunc = function maxfunc(e) {
        // debugger;
        var de = document.documentElement;
        if (de.requestFullscreen) {
            de.requestFullscreen();
        } else if (de.mozRequestFullScreen) {
            de.mozRequestFullScreen();
        } else if (de.webkitRequestFullScreen) {
            de.webkitRequestFullScreen();
        } else if (de.msRequestFullscreen) {
            de.msRequestFullscreen();
        }
    };

    AcNavbar.prototype.minifunc = function minifunc(e) {
        // debugger;
        var de = document;
        if (de.exitFullscreen) {
            de.exitFullscreen();
        } else if (de.mozCancelFullScreen) {
            de.mozCancelFullScreen();
        } else if (de.webkitCancelFullScreen) {
            de.webkitCancelFullScreen();
        } else if (de.msExitFullscreen) {
            de.msExitFullscreen();
        }
    };

    AcNavbar.prototype.render = function render() {
        var self = this;
        var _self$state = self.state,
            maxed = _self$state.maxed,
            sideBarShow = _self$state.sideBarShow;
        var _props2 = this.props,
            clsPrefix = _props2.clsPrefix,
            expanded = _props2.expanded,
            menus = _props2.menus,
            intl = _props2.intl,
            showHeader = _props2.showHeader,
            sideShowPosition = _props2.sideShowPosition,
            leftExpanded = _props2.leftExpanded,
            searchInputProps = _props2.searchInputProps,
            onInputSearch = _props2.onInputSearch;

        var headerRightOper = {
            maxfunc: self.maxfunc,
            minifunc: self.minifunc,
            handleDefault: self.handleDefault,
            handleClick: self.handleClick
        };
        var UserMenuObj = {
            formmaterUrl: self.formmaterUrl,
            handleClick: self.handleClick,
            handleDefault: self.handleDefault,
            intl: intl
        };
        var classes = (0, _classnames2["default"])({
            "header": true,
            'header-hide': !showHeader,
            'header-show': showHeader,
            "header-show-left": sideShowPosition === 'left',
            "header-show-left-expand": leftExpanded
        });
        return _react2["default"].createElement(
            'div',
            { className: clsPrefix },
            _react2["default"].createElement(
                'nav',
                { className: classes },
                _react2["default"].createElement(_HeaderLeft2["default"], {
                    placeholder: "应用查询",
                    svgClick: this.svgClick,
                    sideBarShow: sideBarShow,
                    searchInputProps: searchInputProps,
                    onInputSearch: onInputSearch
                }),
                _react2["default"].createElement(_HeaderCenter2["default"], null),
                _react2["default"].createElement(_HeaderRight2["default"], {
                    maxed: maxed,
                    headerRightOper: headerRightOper,
                    handleClick: self.handleClick.bind(this),
                    intl: intl,
                    unreadMsg: this.state.unreadMsg,
                    UserMenuObj: UserMenuObj
                })
            )
        );
    };

    return AcNavbar;
}(_react.Component);

AcNavbar.propTypes = propTypes;
AcNavbar.defaultProps = defaultProps;

exports["default"] = AcNavbar;
module.exports = exports['default'];