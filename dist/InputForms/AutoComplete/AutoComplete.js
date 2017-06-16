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
 * Material UI based drop down menu
 */
var AutoComplete = (_temp = _class = function (_Component) {
    (0, _inherits3.default)(AutoComplete, _Component);

    function AutoComplete(props) {
        (0, _classCallCheck3.default)(this, AutoComplete);

        var _this = (0, _possibleConstructorReturn3.default)(this, (AutoComplete.__proto__ || Object.getPrototypeOf(AutoComplete)).call(this, props));

        _this.state = {
            currentValue: "" + props.value
        };
        return _this;
    }

    (0, _createClass3.default)(AutoComplete, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                muiTheme: (0, _styles.getMuiTheme)(this.props.theme)
            };
        }
    }, {
        key: 'handleChange',
        value: function handleChange(chosenRequest, index) {
            var oldValue = this.state.currentValue;
            var newValue = "" + this.props.items[index];

            this.setState({
                currentValue: newValue
            });
            if (this.props.onChange) {
                this.props.onChange(chosenRequest, index, oldValue, newValue);
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
                componentName: 'AutoComplete'
            }),
                muiProps = _buildTheme.muiProps,
                qflProps = _buildTheme.qflProps;

            return _react2.default.createElement(
                'div',
                qflProps,
                _react2.default.createElement(_materialUi.AutoComplete, (0, _extends3.default)({}, muiProps, { openOnFocus: true, dataSource: items, searchText: this.state.currentValue, onNewRequest: function onNewRequest(chosenRequest, index) {
                        return _this2.handleChange(chosenRequest, index);
                    } }))
            );
        }
    }]);
    return AutoComplete;
}(_react.Component), _class.propTypes = {
    /**
     * Pushed as children to MaterialUI component. Use this for MenuItems
     */
    items: _propTypes2.default.array,
    /**
     * Pushed as children to MaterialUI component. Can also be used for MenuItems
     */
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
     * label for the Dropdown.
     */
    label: _propTypes2.default.string,
    /**
     * Selectedvalue of the AutoComplete.
     */
    value: _propTypes2.default.any
}, _temp);


AutoComplete.childContextTypes = {
    muiTheme: _propTypes2.default.object
};

AutoComplete.defaultProps = {
    items: null,
    theme: 'Default',
    muiProps: {}
};

exports.default = AutoComplete;
module.exports = exports['default'];
//# sourceMappingURL=AutoComplete.js.map
