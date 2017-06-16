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

var _materialUi = require('material-ui');

var _themeBuilder = require('../../themeBuilder');

var _styles = require('material-ui/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Material UI based data picker
 */
var DatePicker = (_temp = _class = function (_Component) {
    (0, _inherits3.default)(DatePicker, _Component);

    function DatePicker(props) {
        (0, _classCallCheck3.default)(this, DatePicker);

        var _this = (0, _possibleConstructorReturn3.default)(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call(this, props));

        _this.state = {
            currentValue: props.value && typeof props.value === 'string' ? new Date(props.value) : null
        };
        return _this;
    }

    (0, _createClass3.default)(DatePicker, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                muiTheme: (0, _styles.getMuiTheme)(this.props.theme)
            };
        }
    }, {
        key: 'handleChange',
        value: function handleChange(e, date) {
            var _this2 = this;

            var oldValue = this.state.currentValue;
            var newValue = date;
            this.setState({
                currentValue: newValue
            }, function () {
                if (_this2.props.onChange) {
                    _this2.props.onChange(oldValue ? oldValue.toISOString() : null, newValue ? newValue.toISOString() : null);
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _buildTheme = (0, _themeBuilder.buildTheme)({
                theme: this.props.theme,
                sourceMuiProps: this.props.muiProps,
                sourceQflProps: this.props.qflProps,
                componentName: 'DatePicker'
            }),
                muiProps = _buildTheme.muiProps,
                qflProps = _buildTheme.qflProps;

            return _react2.default.createElement(
                'div',
                qflProps,
                _react2.default.createElement(_materialUi.DatePicker, (0, _extends3.default)({ ref: 'muiField' }, muiProps, { value: this.state.currentValue, onChange: function onChange(e, date) {
                        return _this3.handleChange(e, date);
                    } }))
            );
        }
    }]);
    return DatePicker;
}(_react.Component), _class.propTypes = {
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
     * Value of the TextField.
     */
    value: _propTypes2.default.string,
    /**
     * Fired when value changes
     */
    onChange: _propTypes2.default.func
}, _temp);


DatePicker.childContextTypes = {
    muiTheme: _propTypes2.default.object
};

DatePicker.defaultProps = {
    theme: 'Default',
    muiProps: {}
};

exports.default = DatePicker;
module.exports = exports['default'];
//# sourceMappingURL=DatePicker.js.map
