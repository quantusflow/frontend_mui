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

var _reactRouter = require('react-router');

var _clone = require('clone');

var _clone2 = _interopRequireDefault(_clone);

var _extend = require('extend');

var _extend2 = _interopRequireDefault(_extend);

var _themeBuilder = require('../../themeBuilder');

var _styles = require('material-ui/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Material UI based link
 */
var Link = (_temp = _class = function (_Component) {
    (0, _inherits3.default)(Link, _Component);

    function Link() {
        (0, _classCallCheck3.default)(this, Link);
        return (0, _possibleConstructorReturn3.default)(this, (Link.__proto__ || Object.getPrototypeOf(Link)).call(this));
    }

    (0, _createClass3.default)(Link, [{
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
                componentName: 'Link'
            }),
                muiProps = _buildTheme.muiProps,
                qflProps = _buildTheme.qflProps;

            var targetObj = { href: this.props.href };

            var linkComponent = _react2.default.createElement(
                'a',
                (0, _extends3.default)({ style: (0, _extend2.default)((0, _clone2.default)(muiProps.linkStyle, false), this.props.linkStyle) }, targetObj),
                _react2.default.createElement(
                    'span',
                    { style: (0, _extend2.default)((0, _clone2.default)(muiProps.labelStyle, false), this.props.labelStyle) },
                    this.props.label
                )
            );

            if (this.props.to) {
                delete targetObj.href;
                targetObj.to = this.props.to;
                linkComponent = _react2.default.createElement(
                    _reactRouter.IndexLink,
                    (0, _extends3.default)({ style: (0, _extend2.default)((0, _clone2.default)(muiProps.linkStyle, false), this.props.linkStyle) }, targetObj),
                    _react2.default.createElement(
                        'span',
                        { style: (0, _extend2.default)((0, _clone2.default)(muiProps.labelStyle, false), this.props.labelStyle) },
                        this.props.label
                    )
                );
            }

            return _react2.default.createElement(
                'div',
                qflProps,
                linkComponent
            );
        }
    }]);
    return Link;
}(_react.Component), _class.propTypes = {
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
    qflProps: _react.PropTypes.object,
    /**
     * style for the anchor element.
     */
    linkStyle: _react.PropTypes.object,
    /**
     * style for the embedded span element.
     */
    labelStyle: _react.PropTypes.object,
    /**
     * url target with IndexLink behaviour
     */
    to: _react.PropTypes.string,
    /**
     * url target with default behaviour
     */
    href: _react.PropTypes.string,
    /**
     * link text
     */
    label: _react.PropTypes.string
}, _temp);


Link.childContextTypes = {
    muiTheme: _react2.default.PropTypes.object
};

Link.defaultProps = {
    theme: 'Default',
    qflProps: {},
    muiProps: {},
    href: '#',
    to: null,
    label: '',
    linkStyle: {},
    labelStyle: {}
};

exports.default = Link;
module.exports = exports['default'];
//# sourceMappingURL=Link.js.map
