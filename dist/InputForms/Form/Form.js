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

var _ = require('../../');

var _materialUi = require('material-ui');

var _radioButtonChecked = require('material-ui/svg-icons/toggle/radio-button-checked');

var _radioButtonChecked2 = _interopRequireDefault(_radioButtonChecked);

var _radioButtonUnchecked = require('material-ui/svg-icons/toggle/radio-button-unchecked');

var _radioButtonUnchecked2 = _interopRequireDefault(_radioButtonUnchecked);

var _themeBuilder = require('../../themeBuilder');

var _styles = require('material-ui/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Material UI based text field
 */
var Form = (_temp = _class = function (_Component) {
    (0, _inherits3.default)(Form, _Component);

    function Form(props) {
        (0, _classCallCheck3.default)(this, Form);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

        var item = props.item || {};
        _this.state = {
            formData: item
        };
        return _this;
    }

    (0, _createClass3.default)(Form, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                muiTheme: (0, _styles.getMuiTheme)(this.props.theme)
            };
        }
    }, {
        key: 'getFormItemValue',
        value: function getFormItemValue(key, keyAttributeName, items) {
            if (!keyAttributeName && this.props.item && this.props.item.hasOwnProperty(key)) {
                var result = this.props.item[key];
                if (items) {
                    // Try to find result as value in items
                    var foundInItems = false;
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].value === result) {
                            foundInItems = true;
                            break;
                        }
                    }
                    if (!foundInItems) {
                        for (var _i = 0; _i < items.length; _i++) {
                            var match = false;
                            if (items[_i].compareValue && (match = items[_i].compareValue(result))) {
                                result = items[_i].value;
                                break;
                            }
                        }
                    }
                }

                return result;
            } else if (keyAttributeName && this.props.item && this.props.item.hasOwnProperty(key)) {
                if (this.props.item[key] && this.props.item[key][keyAttributeName]) {
                    return this.props.item[key][keyAttributeName];
                } else {
                    return "not_choosen";
                }
            } else if (!keyAttributeName && this.state.formData && this.state.formData.hasOwnProperty(key)) {
                var _result = this.state.formData[key];
                if (items) {
                    // Try to find result as value in items
                    var _foundInItems = false;
                    for (var _i2 = 0; _i2 < items.length; _i2++) {
                        if (items[_i2].value === _result) {
                            _foundInItems = true;
                            break;
                        }
                    }
                    if (!_foundInItems) {
                        for (var _i3 = 0; _i3 < items.length; _i3++) {
                            var _match = false;
                            if (items[_i3].compareValue && (_match = items[_i3].compareValue(_result))) {
                                _result = items[_i3].value;
                                break;
                            }
                        }
                    }
                }

                return _result;
            } else if (keyAttributeName && this.state.formData && this.state.formData.hasOwnProperty(key)) {
                return this.state.formData[key][keyAttributeName];
            }
        }
    }, {
        key: 'handleFormItemChange',
        value: function handleFormItemChange(type, key, oldValue, newValue, choosenElement, element) {
            var curFormData = this.state.formData;
            if (element && element.hasOwnProperty('keyAttributeName')) {
                curFormData[key] = {};
                curFormData[key][element.keyAttributeName] = newValue;
            } else {
                curFormData[key] = choosenElement && choosenElement.mapValue && typeof choosenElement.mapValue === 'function' ? choosenElement.mapValue() : newValue;
            }

            this.setState({
                formData: curFormData
            });
            if (this.props.onChange) {
                this.props.onChange(this.state.formData, {
                    type: type,
                    key: key,
                    oldValue: oldValue,
                    newValue: newValue
                });
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
                componentName: 'Form'
            }),
                qflProps = _buildTheme.qflProps;

            var _props = this.props,
                layout = _props.layout,
                item = _props.item,
                keyAttributeName = _props.keyAttributeName;


            var resultingElement = null;
            if (layout && layout.length > 0) {
                var dropDownCount = 0;
                resultingElement = layout.map(function (item, idx) {
                    var getElement = function getElement(element, itemWidth, tabIndex, isMostLeft, isMostRight) {
                        var resultingElement = null;
                        switch (element.type) {
                            case 'CheckBox':
                                var initialValue = element.hasOwnProperty('initialValue') && element.initialValue !== null ? element.initialValue : _this2.getFormItemValue(element.key);

                                var currentValue = _this2.getFormItemValue(element.key);
                                if (currentValue === undefined) {
                                    currentValue = initialValue;
                                    if (!_this2.props.item) {
                                        var curFormData = _this2.state.formData;
                                        if (curFormData[element.key] !== initialValue) {
                                            curFormData[element.key] = initialValue;
                                            setTimeout(function () {
                                                _this2.setState({
                                                    formData: curFormData
                                                }, function () {
                                                    if (_this2.props.onChange) {
                                                        _this2.props.onChange(_this2.state.formData);
                                                    }
                                                });
                                            }, 0);
                                        }
                                    }
                                }

                                resultingElement = _react2.default.createElement(_.CheckBox, {
                                    key: element.key,
                                    theme: element.theme,
                                    value: currentValue,
                                    onChange: function onChange(event, oldValue, newValue) {
                                        return _this2.handleFormItemChange('CheckBox', element.key, oldValue, newValue);
                                    },
                                    muiProps: (0, _extends3.default)({
                                        label: element.label
                                    }, element.muiProps),
                                    qflProps: (0, _extends3.default)({
                                        style: {
                                            display: 'inline-block',
                                            width: itemWidth + '%'
                                        }
                                    }, element.qflProps)
                                });

                                break;
                            case 'RadioBox':
                                if (element.items && element.items.length > 0) {
                                    var _initialValue = element.hasOwnProperty('initialValue') && element.initialValue !== null ? element.initialValue : !element.nullable ? element.items[0].value : null;

                                    var _currentValue = _this2.getFormItemValue(element.key);
                                    if (_currentValue === undefined) {
                                        _currentValue = _initialValue;
                                        if (!_this2.props.item) {
                                            var _curFormData = _this2.state.formData;
                                            if (_curFormData[element.key] !== _initialValue) {
                                                _curFormData[element.key] = _initialValue;
                                                setTimeout(function () {
                                                    _this2.setState({
                                                        formData: _curFormData
                                                    }, function () {
                                                        if (_this2.props.onChange) {
                                                            _this2.props.onChange(_this2.state.formData);
                                                        }
                                                    });
                                                }, 0);
                                            }
                                        }
                                    }

                                    resultingElement = _react2.default.createElement(
                                        _.RadioBox,
                                        {
                                            key: element.key,
                                            value: _currentValue,
                                            label: element.label,
                                            theme: element.theme,
                                            onChange: function onChange(event, index, oldValue, newValue) {
                                                return _this2.handleFormItemChange('RadioBox', element.key, oldValue, newValue, element.items[index], element);
                                            },
                                            muiProps: (0, _extends3.default)({
                                                name: element.key,
                                                defaultSelected: _initialValue
                                            }, element.muiProps),
                                            qflProps: (0, _extends3.default)({
                                                style: {
                                                    display: 'inline-block',
                                                    width: itemWidth + '%'
                                                }
                                            }, element.qflProps)
                                        },
                                        element.items.map(function (radioBoxItem, radioBoxIdx) {
                                            return _react2.default.createElement(_materialUi.RadioButton, (0, _extends3.default)({
                                                key: element.key + '-' + radioBoxIdx,
                                                style: {
                                                    width: '50%',
                                                    display: 'inline-block'
                                                },
                                                iconStyle: {
                                                    marginRight: '8px',
                                                    marginLeft: isMostLeft ? '0px' : '2px'
                                                },
                                                value: radioBoxItem.value,
                                                label: radioBoxItem.label,
                                                checkedIcon: _react2.default.createElement(_radioButtonChecked2.default, null),
                                                uncheckedIcon: _react2.default.createElement(_radioButtonUnchecked2.default, null)
                                            }, element.radioButtonMuiProps));
                                        })
                                    );
                                }
                                break;
                            case 'DropDown':
                                if (element.items && element.items.length > 0) {
                                    var _initialValue2 = element.initialValue;

                                    var _currentValue2 = _this2.getFormItemValue(element.key, element.keyAttributeName, element.items);
                                    if (_currentValue2 === undefined) {
                                        _currentValue2 = _initialValue2;
                                        if (!_this2.props.item) {
                                            var _curFormData2 = _this2.state.formData;
                                            if (_curFormData2[element.key] !== _initialValue2) {
                                                _curFormData2[element.key] = _initialValue2;
                                                setTimeout(function () {
                                                    _this2.setState({
                                                        formData: _curFormData2
                                                    }, function () {
                                                        if (_this2.props.onChange) {
                                                            _this2.props.onChange(_this2.state.formData);
                                                        }
                                                    });
                                                }, 0);
                                            }
                                        }
                                    }

                                    var items = null;
                                    if (element.items && typeof element.items === 'function') {
                                        items = [];
                                        var dataProvider = {};
                                        if (_this2.props.dataProvider && typeof _this2.props.dataProvider === 'function' && (dataProvider = _this2.props.dataProvider()).hasOwnProperty(element.key) && dataProvider[element.key]) {
                                            items = element.items(dataProvider[element.key]).map(function (dropDownItem, dropDownItemIdx) {
                                                return _react2.default.createElement(_materialUi.MenuItem, {
                                                    key: element.key + '-' + dropDownItemIdx,
                                                    value: dropDownItem.value,
                                                    primaryText: dropDownItem.label
                                                });
                                            });
                                        }
                                    } else {
                                        items = element.items.map(function (dropDownItem, dropDownItemIdx) {
                                            return _react2.default.createElement(_materialUi.MenuItem, {
                                                key: element.key + '-' + dropDownItemIdx,
                                                value: dropDownItem.value,
                                                primaryText: dropDownItem.label
                                            });
                                        });
                                    }

                                    resultingElement = _react2.default.createElement(
                                        _.DropDown,
                                        {
                                            key: element.key,
                                            label: element.label,
                                            theme: element.theme,
                                            value: _currentValue2,
                                            muiProps: (0, _extends3.default)({}, element.muiProps),
                                            onChange: function onChange(event, index, oldValue, newValue) {
                                                return _this2.handleFormItemChange('DropDown', element.key, oldValue, newValue, element.items[index], element);
                                            },
                                            qflProps: (0, _extends3.default)({
                                                style: {
                                                    display: 'inline-block',
                                                    width: itemWidth + '%',
                                                    paddingRight: isMostRight ? '0px' : '4px',
                                                    paddingLeft: isMostLeft ? '0px' : '4px'
                                                }
                                            }, element.qflProps)
                                        },
                                        items
                                    );
                                }
                                break;

                            case 'DatePicker':
                                {
                                    var _initialValue3 = element.initialValue;
                                    var _currentValue3 = _this2.getFormItemValue(element.key);
                                    if (_currentValue3 === undefined) {
                                        _currentValue3 = _initialValue3;
                                        if (!_this2.props.item) {
                                            var _curFormData3 = _this2.state.formData;
                                            if (_curFormData3[element.key] !== _initialValue3) {
                                                _curFormData3[element.key] = _initialValue3;
                                                setTimeout(function () {
                                                    _this2.setState({
                                                        formData: _curFormData3
                                                    }, function () {
                                                        if (_this2.props.onChange) {
                                                            _this2.props.onChange(_this2.state.formData);
                                                        }
                                                    });
                                                }, 0);
                                            }
                                        }
                                    }

                                    resultingElement = _react2.default.createElement(_.DatePicker, {
                                        key: element.key,
                                        value: _currentValue3,
                                        theme: element.theme,
                                        muiProps: (0, _extends3.default)({
                                            tabIndex: tabIndex,
                                            floatingLabelText: element.label,
                                            width: '100%'
                                        }, element.muiProps),
                                        onChange: function onChange(oldValue, newValue) {
                                            return _this2.handleFormItemChange('DatePicker', element.key, oldValue, newValue);
                                        },
                                        qflProps: (0, _extends3.default)({
                                            style: {
                                                display: 'inline-block',
                                                width: itemWidth + '%',
                                                paddingRight: isMostRight ? '0px' : '4px',
                                                paddingLeft: isMostLeft ? '0px' : '4px'
                                            }
                                        }, element.qflProps)
                                    });
                                }
                                break;

                            case 'AutoComplete':
                                if (element.items && element.items.length > 0) {
                                    var _initialValue4 = element.initialValue;

                                    var _currentValue4 = _this2.getFormItemValue(element.key);
                                    if (_currentValue4 === undefined) {
                                        _currentValue4 = _initialValue4;
                                        if (!_this2.props.item) {
                                            var _curFormData4 = _this2.state.formData;
                                            if (_curFormData4[element.key] !== _initialValue4) {
                                                _curFormData4[element.key] = _initialValue4;
                                                setTimeout(function () {
                                                    _this2.setState({
                                                        formData: _curFormData4
                                                    }, function () {
                                                        if (_this2.props.onChange) {
                                                            _this2.props.onChange(_this2.state.formData);
                                                        }
                                                    });
                                                }, 0);
                                            }
                                        }
                                    }

                                    resultingElement = _react2.default.createElement(_.AutoComplete, {
                                        key: element.key,
                                        label: element.label,
                                        theme: element.theme,
                                        value: _currentValue4,
                                        items: element.items,
                                        muiProps: (0, _extends3.default)({
                                            floatingLabelText: element.label
                                        }, element.muiProps),
                                        onChange: function onChange(event, index, oldValue, newValue) {
                                            return _this2.handleFormItemChange('AutoComplete', element.key, oldValue, newValue, element.items[index], element);
                                        },
                                        qflProps: (0, _extends3.default)({
                                            style: {
                                                display: 'inline-block',
                                                width: itemWidth + '%',
                                                paddingRight: isMostRight ? '0px' : '4px',
                                                paddingLeft: isMostLeft ? '0px' : '4px'
                                            }
                                        }, element.qflProps)
                                    });
                                }
                                break;

                            case 'TextField':
                            default:
                                {
                                    var _initialValue5 = element.initialValue;
                                    var _currentValue5 = _this2.getFormItemValue(element.key);
                                    if (_currentValue5 === undefined) {
                                        _currentValue5 = _initialValue5;
                                        if (!_this2.props.item) {
                                            var _curFormData5 = _this2.state.formData;
                                            if (_curFormData5[element.key] !== _initialValue5) {
                                                _curFormData5[element.key] = _initialValue5;
                                                setTimeout(function () {
                                                    _this2.setState({
                                                        formData: _curFormData5
                                                    }, function () {
                                                        if (_this2.props.onChange) {
                                                            _this2.props.onChange(_this2.state.formData);
                                                        }
                                                    });
                                                }, 0);
                                            }
                                        }
                                    }

                                    resultingElement = _react2.default.createElement(_.TextField, {
                                        key: element.key,
                                        value: _currentValue5,
                                        theme: element.theme,
                                        muiProps: (0, _extends3.default)({
                                            tabindex: tabIndex,
                                            floatingLabelText: element.label,
                                            width: '100%'
                                        }, element.muiProps),
                                        onChange: function onChange(oldValue, newValue) {
                                            return _this2.handleFormItemChange('TextField', element.key, oldValue, newValue);
                                        },
                                        qflProps: (0, _extends3.default)({
                                            style: {
                                                display: 'inline-block',
                                                width: itemWidth + '%',
                                                paddingRight: isMostRight ? '0px' : '4px',
                                                paddingLeft: isMostLeft ? '0px' : '4px'
                                            }
                                        }, element.qflProps)
                                    });
                                }
                        }
                        return resultingElement;
                    };

                    if (item) {
                        var isMultiple = Array.isArray(item);
                        var itemWidth = 100;
                        if (isMultiple && item.length > 0) {
                            itemWidth = 100 / item.length;
                            return _react2.default.createElement(
                                'div',
                                {
                                    key: idx,
                                    style: { width: '100%' }
                                },
                                item.map(function (subItem, subIdx) {
                                    return getElement(subItem, itemWidth, 30 + idx * 10 + subIdx, subIdx === 0, subIdx === item.length - 1);
                                })
                            );
                        }

                        return _react2.default.createElement(
                            'div',
                            {
                                key: idx,
                                style: {
                                    width: '100%',
                                    paddingTop: item.type === 'DropDown' || item.type === 'AutoComplete' ? '22px' : '0px'
                                }
                            },
                            getElement(item, itemWidth, 30 + idx * 10, true, true)
                        );
                    }

                    return null;
                });
            }

            var key = item ? item[keyAttributeName] : null;

            return _react2.default.createElement(
                'div',
                (0, _extends3.default)({ key: key }, qflProps),
                resultingElement
            );
        }
    }]);
    return Form;
}(_react.Component), _class.propTypes = {
    /**
     * Applies a given MaterialUI theme.
     */
    theme: _react.PropTypes.object,
    /**
     * Forwarded to wrapper component.
     */
    qflProps: _react.PropTypes.object,
    /**
     * Setup of the shown form items.
     */
    layout: _react.PropTypes.array,
    /**
     * Item holding form data (entity).
     */
    item: _react.PropTypes.object,
    /**
     * Defines the name of the primary key attribute of the item.
     */
    keyAttributeName: _react.PropTypes.string,
    /**
     * A function returning a map of dataproviders for list based selections (e.g. DropDowns)
     */
    dataProvider: _react.PropTypes.func
}, _temp);


Form.childContextTypes = {
    muiTheme: _react2.default.PropTypes.object
};

Form.defaultProps = {
    theme: 'Default',
    qflProps: {},
    keyAttributeName: 'id'
};

exports.default = Form;
module.exports = exports['default'];
//# sourceMappingURL=Form.js.map
