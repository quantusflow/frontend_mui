'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Snackbar = require('material-ui/Snackbar');

var _Snackbar2 = _interopRequireDefault(_Snackbar);

var _styles = require('material-ui/styles');

var _themeBuilder = require('../../themeBuilder');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Material UI based SnackBar
 */
var SnackBar = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(SnackBar, _Component);

  function SnackBar(props) {
    (0, _classCallCheck3.default)(this, SnackBar);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SnackBar.__proto__ || Object.getPrototypeOf(SnackBar)).call(this, props));

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(SnackBar, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        muiTheme: (0, _styles.getMuiTheme)(this.props.theme)
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _buildTheme = (0, _themeBuilder.buildTheme)({
        theme: this.props.theme,
        sourceMuiProps: this.props.muiProps,
        sourceQflProps: this.props.qflProps,
        componentName: 'SnackBar'
      }),
          muiProps = _buildTheme.muiProps,
          qflProps = _buildTheme.qflProps;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Snackbar2.default, (0, _extends3.default)({
          open: this.props.open,
          message: this.props.message,
          autoHideDuration: this.props.autoHideDuration,
          onRequestClose: this.props.onRequestClose,
          bodyStyle: this.props.bodyStyle
        }, muiProps))
      );
    }
  }]);
  return SnackBar;
}(_react.Component), _class.propTypes = {
  children: _propTypes2.default.node,
  /**
   * Applies a given MaterialUI theme.
   */
  theme: _propTypes2.default.object,
  /**
   * Forwarded to MaterialUI component.
   */
  muiProps: _propTypes2.default.object,
  /**
   * Forwarded to wrapper component.
   */
  qflProps: _propTypes2.default.object,
  /**
   * the message in the SnackBar
   */
  message: _propTypes2.default.string,
  /**
   * time until close the Snackbar
   */
  autoHideDuration: _propTypes2.default.number,

  openSnackBar: _propTypes2.default.bool,
  onRequestClose: _propTypes2.default.func,
  bodyStyle: _propTypes2.default.object

}, _temp);


SnackBar.childContextTypes = {
  muiTheme: _propTypes2.default.object
};

SnackBar.defaultProps = {
  theme: 'Default',
  autoHideDuration: 4000,
  muiProps: {},
  qflProps: {}
};

exports.default = SnackBar;
module.exports = exports['default'];
//# sourceMappingURL=SnackBar.js.map
