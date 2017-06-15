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

var _Toolbar = require('material-ui/Toolbar');

var _themeBuilder = require('../../themeBuilder');

var _styles = require('material-ui/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Material UI based tool bar
 */
var ToolBar = (_temp = _class = function (_Component) {
    (0, _inherits3.default)(ToolBar, _Component);

    function ToolBar() {
        (0, _classCallCheck3.default)(this, ToolBar);
        return (0, _possibleConstructorReturn3.default)(this, (ToolBar.__proto__ || Object.getPrototypeOf(ToolBar)).call(this));
    }

    (0, _createClass3.default)(ToolBar, [{
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
                componentName: 'ToolBar'
            }),
                muiProps = _buildTheme.muiProps,
                qflProps = _buildTheme.qflProps;

            var items = this.props.children;
            if (this.props.items) {
                items = this.props.items;
            }

            return _react2.default.createElement(
                'div',
                qflProps,
                _react2.default.createElement(
                    _Toolbar.Toolbar,
                    muiProps,
                    items
                )
            );
        }
    }]);
    return ToolBar;
}(_react.Component), _class.propTypes = {
    /**
     * Pushed as children to MaterialUI component. Use this for ToolbarGroups
     */
    items: _react.PropTypes.node,
    /**
     * Pushed as children to MaterialUI component. Can also be used for ToolbarGroups
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
     * Forwarded to wrapper component.
     */
    qflProps: _react.PropTypes.object
}, _temp);


ToolBar.childContextTypes = {
    muiTheme: _react2.default.PropTypes.object
};

ToolBar.defaultProps = {
    theme: 'Default',
    muiProps: {},
    qflProps: {}
};

exports.default = ToolBar;
module.exports = exports['default'];
//# sourceMappingURL=ToolBar.js.map
