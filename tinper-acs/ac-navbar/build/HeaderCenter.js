'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
    logo: _propTypes2["default"].func //自定义Logo
};

var defaultProps = {};

var HeaderCenter = function (_Component) {
    _inherits(HeaderCenter, _Component);

    function HeaderCenter(props) {
        _classCallCheck(this, HeaderCenter);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.renderLogo = function () {
            return _react2["default"].createElement('img', { src: '//design.yonyoucloud.com/static/tinper-acs/ac-navbar/logo.svg', className: 'portal-logo' });
        };

        return _this;
    }

    HeaderCenter.prototype.render = function render() {
        var logo = this.props.logo;

        return _react2["default"].createElement(
            'div',
            { className: 'header-center' },
            _react2["default"].createElement(
                'a',
                { href: 'javascript:;' },
                _react2["default"].createElement(
                    'div',
                    { className: 'portal-logo-container' },
                    logo ? logo() : this.renderLogo()
                )
            )
        );
    };

    return HeaderCenter;
}(_react.Component);

HeaderCenter.propTypes = propTypes;
HeaderCenter.defaultProps = defaultProps;
exports["default"] = HeaderCenter;
module.exports = exports['default'];