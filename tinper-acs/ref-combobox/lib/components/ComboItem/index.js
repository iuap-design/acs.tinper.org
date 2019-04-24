'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ComboItem = function ComboItem(props) {
  return _react2["default"].createElement(
    'li',
    {
      className: 'ref-combo-item ' + (!props.active || 'ref-combo-item-active'),
      onClick: function onClick(e) {
        if (e.target.dataset.type !== 'comboitem') {
          e.target.dataset.type = 'comboitem';
          e.target.dataset.value = props.value;
        }
      },
      'data-value': props.value,
      'data-type': 'comboitem'

    },
    props.text
  );
};
exports["default"] = ComboItem;