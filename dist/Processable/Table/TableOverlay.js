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

var _styles = require('material-ui/styles');

var _ = require('../../');

var _Toolbar = require('material-ui/Toolbar');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableOverlay = (_temp = _class = function (_Component) {
    (0, _inherits3.default)(TableOverlay, _Component);

    function TableOverlay() {
        (0, _classCallCheck3.default)(this, TableOverlay);

        var _this = (0, _possibleConstructorReturn3.default)(this, (TableOverlay.__proto__ || Object.getPrototypeOf(TableOverlay)).call(this));

        _this.state = {
            selectedMenuItems: {}
        };
        return _this;
    }

    (0, _createClass3.default)(TableOverlay, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                muiTheme: (0, _styles.getMuiTheme)(applyTheme())
            };
        }
    }, {
        key: 'handleChange',
        value: function handleChange(e, oldValue, newValue, dataKey) {
            var _this2 = this;

            if (oldValue !== newValue) {
                var currentSelectedMenuItems = this.state.selectedMenuItems;
                if (newValue) {
                    currentSelectedMenuItems[dataKey] = true;
                } else {
                    delete currentSelectedMenuItems[dataKey];
                }
                this.setState({
                    selectedMenuItems: currentSelectedMenuItems
                }, function () {
                    if (_this2.props.onSelectedMenuItemsChange) {
                        _this2.props.onSelectedMenuItemsChange(currentSelectedMenuItems);
                    }
                });
            }
        }
    }, {
        key: 'handleItemMenuClicked',
        value: function handleItemMenuClicked(e, dataKey) {
            if (this.props.onMenuItemClicked) {
                this.props.onMenuItemClicked(dataKey);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var themeObj = applyTheme();

            return _react2.default.createElement(
                _.ToolBar,
                { theme: applyTheme('Menu') },
                this.props.menuSchema.map(function (section, sectionIdx) {
                    var elements = [];
                    var menuHeaderElement = null;
                    if (section.sectionName) {
                        menuHeaderElement = _react2.default.createElement(
                            'h1',
                            { className: _this3.props.tableOverlayStyles.menuHeaderClassName },
                            section.sectionName
                        );
                    }
                    elements.push(_react2.default.createElement(
                        _Toolbar.ToolbarGroup,
                        {
                            key: sectionIdx,
                            firstChild: sectionIdx === 0,
                            style: {
                                marginLeft: sectionIdx === 0 ? themeObj.distances.secondary : themeObj.distances.tertiary,
                                display: 'block'
                            }
                        },
                        menuHeaderElement,
                        _react2.default.createElement(
                            'span',
                            { className: tableOverlayStyles.menuItemClassName },
                            section.items.map(function (item, itemIdx) {
                                var content = null;
                                if (item.isCheckBox === true) {
                                    content = _react2.default.createElement(_.CheckBox, {
                                        key: itemIdx,
                                        theme: applyTheme('Menu'),
                                        muiProps: { label: item.label },
                                        dataKey: item.key,
                                        value: _this3.state.selectedMenuItems[item.key],
                                        onChange: function onChange(e, oldValue, newValue, dataKey) {
                                            _this3.handleChange(e, oldValue, newValue, dataKey);
                                        }
                                    });
                                } else if (item.isLink === true) {
                                    var to = item.to;
                                    if (item.to && typeof item.to === 'function') {
                                        to = item.to();
                                    }

                                    content = _react2.default.createElement(_.Link, { key: itemIdx, theme: applyTheme('Menu'), to: to, label: item.label });
                                } else {
                                    content = _react2.default.createElement(
                                        'span',
                                        {
                                            key: itemIdx,
                                            style: {
                                                cursor: 'pointer'
                                            },
                                            onClick: function onClick(e) {
                                                _this3.handleItemMenuClicked(e, item.key);
                                            }
                                        },
                                        item.label
                                    );
                                }
                                return content;
                            })
                        )
                    ));

                    if (sectionIdx < _this3.props.menuSchema.length - 1) {
                        elements.push(_react2.default.createElement(_Toolbar.ToolbarSeparator, {
                            key: sectionIdx + '_seperator',
                            style: {
                                top: '0px',
                                bottom: '0px',
                                height: 'initial',
                                left: '4px',
                                marginLeft: '14px',
                                width: '2px',
                                display: 'block',
                                backgroundColor: themeObj.brand.primary
                            }
                        }));
                    }
                    return elements;
                })
            );
        }
    }]);
    return TableOverlay;
}(_react.Component), _class.propTypes = {
    children: _react.PropTypes.node,
    menuSchema: _react.PropTypes.array,
    isCheckBox: _react.PropTypes.bool,
    onSelectedMenuItemsChange: _react.PropTypes.func,
    onMenuItemClicked: _react.PropTypes.func,
    tableOverlayStyles: _react.PropTypes.object
}, _temp);


TableOverlay.childContextTypes = {
    muiTheme: _react.PropTypes.object
};

TableOverlay.defaultProps = {
    title: null,
    infoText: null,
    children: null,
    primary: false,
    isCheckBox: false
};

exports.default = TableOverlay;
module.exports = exports['default'];
//# sourceMappingURL=TableOverlay.js.map
