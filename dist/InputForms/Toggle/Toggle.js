'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _materialUi = require('material-ui');

var _themeBuilder = require('../../themeBuilder');

var _styles = require('material-ui/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Material UI based toggle
 */
var Toggle = (_temp = _class = function (_Component) {
    (0, _inherits3.default)(Toggle, _Component);

    function Toggle() {
        (0, _classCallCheck3.default)(this, Toggle);
        return (0, _possibleConstructorReturn3.default)(this, (Toggle.__proto__ || Object.getPrototypeOf(Toggle)).call(this));
    }

    (0, _createClass3.default)(Toggle, [{
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
                componentName: 'Toggle'
            }),
                muiProps = _buildTheme.muiProps,
                qflProps = _buildTheme.qflProps;

            return _react2.default.createElement(
                'div',
                qflProps,
                _react2.default.createElement(_materialUi.Toggle, muiProps)
            );
        }
    }]);
    return Toggle;
}(_react.Component), _class.propTypes = {
    /**
     * Applies a given MaterialUI theme.
     */
    theme: _propTypes2.default.object,
    /**
     * Forwarded to MaterialUI component.
     */
    muiProps: _propTypes2.default.object
}, _temp);


Toggle.childContextTypes = {
    muiTheme: _propTypes2.default.object
};

Toggle.defaultProps = {
    theme: 'Default',
    muiProps: {}
};

exports.default = Toggle;
module.exports = exports['default'];
//# sourceMappingURL=Toggle.js.map
