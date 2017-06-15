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

var _materialUi = require('material-ui');

var _themeBuilder = require('../../themeBuilder');

var _styles = require('material-ui/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Material UI based drop down menu
 */
var DropDown = (_temp = _class = function (_Component) {
    (0, _inherits3.default)(DropDown, _Component);

    function DropDown(props) {
        (0, _classCallCheck3.default)(this, DropDown);

        var _this = (0, _possibleConstructorReturn3.default)(this, (DropDown.__proto__ || Object.getPrototypeOf(DropDown)).call(this, props));

        _this.state = {
            currentValue: props.value
        };
        return _this;
    }

    (0, _createClass3.default)(DropDown, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                muiTheme: (0, _styles.getMuiTheme)(this.props.theme)
            };
        }
    }, {
        key: 'handleChange',
        value: function handleChange(event, index, value) {
            var oldValue = this.state.currentValue;
            var newValue = value;

            this.setState({
                currentValue: newValue
            });
            if (this.props.onChange) {
                this.props.onChange(event, index, oldValue, newValue);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var items = this.props.children;
            if (this.props.items) {
                items = this.props.items;
            }

            var _buildTheme = (0, _themeBuilder.buildTheme)({
                theme: this.props.theme,
                sourceMuiProps: this.props.muiProps,
                sourceQflProps: this.props.qflProps,
                componentName: 'DropDown'
            }),
                muiProps = _buildTheme.muiProps,
                qflProps = _buildTheme.qflProps;

            return _react2.default.createElement(
                'div',
                qflProps,
                _react2.default.createElement(
                    'span',
                    { style: qflProps.labelStyle },
                    this.props.label
                ),
                _react2.default.createElement(
                    _materialUi.DropDownMenu,
                    (0, _extends3.default)({}, muiProps, { value: this.state.currentValue, onChange: function onChange(event, index, value) {
                            return _this2.handleChange(event, index, value);
                        } }),
                    items
                )
            );
        }
    }]);
    return DropDown;
}(_react.Component), _class.propTypes = {
    /**
     * Pushed as children to MaterialUI component. Use this for MenuItems
     */
    items: _react.PropTypes.node,
    /**
     * Pushed as children to MaterialUI component. Can also be used for MenuItems
     */
    children: _react.PropTypes.node,
    /**
     * Applies a given MaterialUI theme.
     */
    theme: _react.PropTypes.object,
    /**
     * Forwarded to MaterialUI component.
     */
    muiProps: _react.PropTypes.object,
    /**
     * label for the Dropdown.
     */
    label: _react.PropTypes.string,
    /**
     * Selectedvalue of the DropDown.
     */
    value: _react.PropTypes.any
}, _temp);


DropDown.childContextTypes = {
    muiTheme: _react2.default.PropTypes.object
};

DropDown.defaultProps = {
    items: null,
    theme: 'Default',
    muiProps: {}
};

exports.default = DropDown;
module.exports = exports['default'];
//# sourceMappingURL=DropDown.js.map
