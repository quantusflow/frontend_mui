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

var _materialUi = require('material-ui');

var _themeBuilder = require('../../themeBuilder');

var _styles = require('material-ui/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Material UI based icon button
 */
var IconButton = (_temp = _class = function (_Component) {
    (0, _inherits3.default)(IconButton, _Component);

    function IconButton() {
        (0, _classCallCheck3.default)(this, IconButton);
        return (0, _possibleConstructorReturn3.default)(this, (IconButton.__proto__ || Object.getPrototypeOf(IconButton)).call(this));
    }

    (0, _createClass3.default)(IconButton, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                muiTheme: (0, _styles.getMuiTheme)(this.props.theme)
            };
        }
    }, {
        key: 'renderIcon',
        value: function renderIcon(muiProps) {
            return _react2.default.createElement(
                _materialUi.IconButton,
                muiProps,
                this.props.icon
            );
        }
    }, {
        key: 'renderBadgedIcon',
        value: function renderBadgedIcon() {
            return _react2.default.createElement(
                _materialUi.Badge,
                this.props.badgeProps,
                this.renderIcon()
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _buildTheme = (0, _themeBuilder.buildTheme)({
                theme: this.props.theme,
                sourceMuiProps: this.props.muiProps,
                sourceQflProps: this.props.qflProps,
                componentName: 'IconButton'
            }),
                muiProps = _buildTheme.muiProps,
                qflProps = _buildTheme.qflProps;

            var renderedContent = this.renderIcon(muiProps);
            if (this.props.badged) {
                renderedContent = this.renderBadgedIcon();
            }
            return _react2.default.createElement(
                'div',
                qflProps,
                renderedContent
            );
        }
    }]);
    return IconButton;
}(_react.Component), _class.propTypes = {
    /**
     * Pushed as children to MaterialUI component.
     */
    badged: _react.PropTypes.bool,
    /**
     * Forwarded to MaterialUI badge component.
     */
    badgeProps: _react.PropTypes.object,
    /**
     * Pushed as children to MaterialUI component. Use this for the Icon
     */
    icon: _react.PropTypes.node,
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


IconButton.childContextTypes = {
    muiTheme: _react2.default.PropTypes.object
};

IconButton.defaultProps = {
    badged: false,
    theme: 'Default',
    icon: null,
    muiProps: {},
    qflProps: {},
    badgeProps: {}
};

exports.default = IconButton;
module.exports = exports['default'];
//# sourceMappingURL=IconButton.js.map
