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

var _List = require('material-ui/List');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectableList = (0, _List.makeSelectable)(_List.List);

/**
 * Material UI based tool bar
 */
var NavigationBar = (_temp = _class = function (_Component) {
    (0, _inherits3.default)(NavigationBar, _Component);

    function NavigationBar() {
        (0, _classCallCheck3.default)(this, NavigationBar);
        return (0, _possibleConstructorReturn3.default)(this, (NavigationBar.__proto__ || Object.getPrototypeOf(NavigationBar)).call(this));
    }

    (0, _createClass3.default)(NavigationBar, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                muiTheme: (0, _styles.getMuiTheme)(this.props.theme)
            };
        }
    }, {
        key: 'handleOnChange',
        value: function handleOnChange(e, route) {
            if (this.props.onChange) {
                this.props.onChange(e, route);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _buildTheme = (0, _themeBuilder.buildTheme)({
                theme: this.props.theme,
                sourceMuiProps: this.props.muiProps,
                sourceQflProps: this.props.qflProps,
                componentName: 'NavigationBar'
            }),
                muiProps = _buildTheme.muiProps,
                qflProps = _buildTheme.qflProps;

            var listMuiProps = (0, _themeBuilder.buildTheme)({
                theme: this.props.theme,
                sourceMuiProps: this.props.listMuiProps || {},
                componentName: 'List'
            }).muiProps;

            var dividerMuiProps = (0, _themeBuilder.buildTheme)({
                theme: this.props.theme,
                sourceMuiProps: this.props.dividerMuiProps || {},
                componentName: 'Divider'
            }).muiProps;

            var listItemMuiProps = (0, _themeBuilder.buildTheme)({
                theme: this.props.theme,
                sourceMuiProps: this.props.listItemMuiProps || {},
                componentName: 'ListItem'
            }).muiProps;

            var location = this.props.location;


            var renderedMenu = null;
            if (this.props.menuItems) {
                if (!this.props.hideBarFill) {
                    this.props.menuItems.push({
                        type: 'fillBar'
                    });
                }
                renderedMenu = this.props.menuItems.map(function (item, idx) {
                    switch (item.type) {
                        case 'List':
                            var nestedElements = item.nestedItems || [];
                            return _react2.default.createElement(
                                SelectableList,
                                (0, _extends3.default)({
                                    key: idx,
                                    className: item.className,
                                    value: location.pathname,
                                    onChange: function onChange(e, route) {
                                        return _this2.handleOnChange(e, route);
                                    }
                                }, listMuiProps),
                                nestedElements.map(function (nestedElement, nestedIdx) {
                                    switch (nestedElement.type) {
                                        case 'ListItem':
                                            return _react2.default.createElement(_List.ListItem, (0, _extends3.default)({
                                                key: nestedIdx
                                            }, listItemMuiProps, {
                                                className: nestedElement.className,
                                                primaryText: nestedElement.label,
                                                value: nestedElement.path,
                                                leftIcon: nestedElement.icon
                                            }));
                                        default:
                                            return null;
                                    }
                                }).filter(function (item) {
                                    return item !== null;
                                })
                            );
                        case 'Divider':
                            return _react2.default.createElement(_materialUi.Divider, (0, _extends3.default)({ key: idx }, dividerMuiProps));
                        case 'fillBar':
                            return _react2.default.createElement('div', { key: idx, style: qflProps.barFillStyle });
                        default:
                            return null;
                    }
                }).filter(function (item) {
                    return item !== null;
                });
            }

            return _react2.default.createElement(
                'div',
                qflProps,
                _react2.default.createElement(
                    _materialUi.Drawer,
                    (0, _extends3.default)({}, muiProps, { open: true, docked: true }),
                    renderedMenu
                )
            );
        }
    }]);
    return NavigationBar;
}(_react.Component), _class.propTypes = {
    /**
     * Location for selecting the right item based on route
     */
    location: _propTypes2.default.object.isRequired,
    /**
     * Pushed to MaterialUI component. Use this for setup menu
     */
    menuItems: _propTypes2.default.array.isRequired,
    /**
     * Fires when list item is clicked
     */
    onChange: _propTypes2.default.func.isRequired,
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
    listMuiProps: _propTypes2.default.object,
    dividerMuiProps: _propTypes2.default.object,
    listItemMuiProps: _propTypes2.default.object,
    hideBarFill: _propTypes2.default.bool
}, _class.childContextTypes = {
    muiTheme: _propTypes2.default.object
}, _class.defaultProps = {
    theme: 'Default',
    muiProps: {},
    qflProps: {}
}, _temp);
exports.default = NavigationBar;
module.exports = exports['default'];
//# sourceMappingURL=NavigationBar.js.map
