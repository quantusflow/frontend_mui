"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var TextField_1 = require("../TextField/TextField");
var RadioBox_1 = require("../RadioBox/RadioBox");
var DropDown_1 = require("../DropDown/DropDown");
var CheckBox_1 = require("../CheckBox/CheckBox");
var DatePicker_1 = require("../../DateTime/DatePicker/DatePicker");
var AutoComplete_1 = require("../AutoComplete/AutoComplete");
var material_ui_1 = require("material-ui");
var radio_button_checked_1 = require("material-ui/svg-icons/toggle/radio-button-checked");
var radio_button_unchecked_1 = require("material-ui/svg-icons/toggle/radio-button-unchecked");
var themeBuilder_1 = require("../../themeBuilder");
var Form = (function (_super) {
    __extends(Form, _super);
    function Form(props) {
        var _this = _super.call(this, props) || this;
        var item = (props.item || {});
        _this.state = {
            formData: item
        };
        return _this;
    }
    Form.prototype.getFormItemValue = function (key, keyAttributeName, items) {
        if (!keyAttributeName && this.props.item && this.props.item.hasOwnProperty(key)) {
            var result = this.props.item[key];
            if (items) {
                var foundInItems = false;
                for (var i = 0; i < items.length; i++) {
                    if (items[i].value === result) {
                        foundInItems = true;
                        break;
                    }
                }
                if (!foundInItems) {
                    for (var i = 0; i < items.length; i++) {
                        var match = items[i].compareValue(result);
                        if (items[i].compareValue && match) {
                            result = items[i].value;
                            break;
                        }
                    }
                }
            }
            return result;
        }
        else if (keyAttributeName && this.props.item && this.props.item.hasOwnProperty(key)) {
            if (this.props.item[key] && this.props.item[key][keyAttributeName]) {
                return this.props.item[key][keyAttributeName];
            }
            else {
                return 'not_choosen';
            }
        }
        else if (!keyAttributeName && this.state.formData && this.state.formData.hasOwnProperty(key)) {
            var result = this.state.formData[key];
            if (items) {
                var foundInItems = false;
                for (var i = 0; i < items.length; i++) {
                    if (items[i].value === result) {
                        foundInItems = true;
                        break;
                    }
                }
                if (!foundInItems) {
                    for (var i = 0; i < items.length; i++) {
                        var match = items[i].compareValue(result);
                        if (items[i].compareValue && match) {
                            result = items[i].value;
                            break;
                        }
                    }
                }
            }
            return result;
        }
        else if (keyAttributeName && this.state.formData && this.state.formData.hasOwnProperty(key)) {
            return this.state.formData[key][keyAttributeName];
        }
    };
    Form.prototype.handleFormItemChange = function (type, key, oldValue, newValue, choosenElement, element) {
        var curFormData = this.state.formData;
        if (element && element.hasOwnProperty('keyAttributeName')) {
            curFormData[key] = {};
            curFormData[key][element.keyAttributeName] = newValue;
        }
        else {
            curFormData[key] = (choosenElement && choosenElement.mapValue && typeof choosenElement.mapValue === 'function' ? choosenElement.mapValue() : newValue);
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
    };
    Form.prototype.render = function () {
        var _this = this;
        var qflProps = themeBuilder_1.buildTheme({
            theme: this.props.theme,
            sourceMuiProps: this.props.muiProps,
            sourceQflProps: this.props.qflProps,
            componentName: 'Form'
        }).qflProps;
        var _a = this.props, layout = _a.layout, item = _a.item, keyAttributeName = _a.keyAttributeName;
        var resultingElement = null;
        if (layout && layout.length > 0) {
            var dropDownCount = 0;
            resultingElement = layout.map(function (layoutItem, idx) {
                var getElement = function (layoutElement, itemWidth, tabIndex, isMostLeft, isMostRight) {
                    var resultingFromElement = null;
                    switch (layoutElement.type) {
                        case 'CheckBox':
                            {
                                var initialValue = (layoutElement.hasOwnProperty('initialValue') && layoutElement.initialValue !== null
                                    ? layoutElement.initialValue
                                    : _this.getFormItemValue(layoutElement.key));
                                var currentValue = _this.getFormItemValue(layoutElement.key);
                                if (currentValue === undefined) {
                                    currentValue = initialValue;
                                    if (!_this.props.item) {
                                        var curFormData_1 = _this.state.formData;
                                        if (curFormData_1[layoutElement.key] !== initialValue) {
                                            curFormData_1[layoutElement.key] = initialValue;
                                            setTimeout(function () {
                                                _this.setState({
                                                    formData: curFormData_1
                                                }, function () {
                                                    if (_this.props.onChange) {
                                                        _this.props.onChange(_this.state.formData);
                                                    }
                                                });
                                            }, 0);
                                        }
                                    }
                                }
                                var handleCheckBoxFormItemChange = function (event, oldValue, newValue) {
                                    return _this.handleFormItemChange('CheckBox', layoutElement.key, oldValue, newValue);
                                };
                                resultingFromElement = (React.createElement(CheckBox_1.default, { dataKey: layoutElement.key, theme: layoutElement.theme, value: currentValue, onChange: handleCheckBoxFormItemChange, muiProps: __assign({ label: layoutElement.label }, layoutElement.muiProps), qflProps: __assign({ style: {
                                            display: 'inline-block',
                                            width: itemWidth + '%'
                                        } }, layoutElement.qflProps) }));
                            }
                            break;
                        case 'RadioBox':
                            {
                                if (layoutElement.items && layoutElement.items.length > 0) {
                                    var initialValue = (layoutElement.hasOwnProperty('initialValue') && layoutElement.initialValue !== null
                                        ? layoutElement.initialValue
                                        : (!layoutElement.nullable ? layoutElement.items[0].value : null));
                                    var currentValue = _this.getFormItemValue(layoutElement.key);
                                    if (currentValue === undefined) {
                                        currentValue = initialValue;
                                        if (!_this.props.item) {
                                            var curFormData_2 = _this.state.formData;
                                            if (curFormData_2[layoutElement.key] !== initialValue) {
                                                curFormData_2[layoutElement.key] = initialValue;
                                                setTimeout(function () {
                                                    _this.setState({
                                                        formData: curFormData_2
                                                    }, function () {
                                                        if (_this.props.onChange) {
                                                            _this.props.onChange(_this.state.formData);
                                                        }
                                                    });
                                                }, 0);
                                            }
                                        }
                                    }
                                    var handleRadioBoxFormItemChange = function (event, index, oldValue, newValue) {
                                        return _this.handleFormItemChange('RadioBox', layoutElement.key, oldValue, newValue, layoutElement.items[index], layoutElement);
                                    };
                                    resultingFromElement = (React.createElement(RadioBox_1.default, { key: layoutElement.key, value: currentValue, label: layoutElement.label, theme: layoutElement.theme, onChange: handleRadioBoxFormItemChange, muiProps: __assign({ name: layoutElement.key, defaultSelected: initialValue }, layoutElement.muiProps), qflProps: __assign({ style: {
                                                display: 'inline-block',
                                                width: itemWidth + '%'
                                            } }, layoutElement.qflProps) }, layoutElement.items.map(function (radioBoxItem, radioBoxIdx) { return React.createElement(material_ui_1.RadioButton, __assign({ key: layoutElement.key + '-' + radioBoxIdx, style: {
                                            width: '50%',
                                            display: 'inline-block'
                                        }, iconStyle: {
                                            marginRight: '8px',
                                            marginLeft: (isMostLeft ? '0px' : '2px')
                                        }, value: radioBoxItem.value, label: radioBoxItem.label, checkedIcon: React.createElement(radio_button_checked_1.default, null), uncheckedIcon: React.createElement(radio_button_unchecked_1.default, null) }, layoutElement.radioButtonMuiProps)); })));
                                }
                            }
                            break;
                        case 'DropDown':
                            {
                                if (layoutElement.items && layoutElement.items.length > 0) {
                                    var initialValue = layoutElement.initialValue;
                                    var currentValue = _this.getFormItemValue(layoutElement.key, layoutElement.keyAttributeName, layoutElement.items);
                                    if (currentValue === undefined) {
                                        currentValue = initialValue;
                                        if (!_this.props.item) {
                                            var curFormData_3 = _this.state.formData;
                                            if (curFormData_3[layoutElement.key] !== initialValue) {
                                                curFormData_3[layoutElement.key] = initialValue;
                                                setTimeout(function () {
                                                    _this.setState({
                                                        formData: curFormData_3
                                                    }, function () {
                                                        if (_this.props.onChange) {
                                                            _this.props.onChange(_this.state.formData);
                                                        }
                                                    });
                                                }, 0);
                                            }
                                        }
                                    }
                                    var items = null;
                                    if (layoutElement.items && typeof layoutElement.items === 'function') {
                                        items = [];
                                        var dataProvider = {};
                                        if (_this.props.dataProvider && typeof _this.props.dataProvider === 'function') {
                                            dataProvider = _this.props.dataProvider();
                                            if (dataProvider.hasOwnProperty(layoutElement.key) && dataProvider[layoutElement.key]) {
                                                items = layoutElement.items(dataProvider[layoutElement.key]).map(function (dropDownItem, dropDownItemIdx) { return (React.createElement(material_ui_1.MenuItem, { key: layoutElement.key + '-' + dropDownItemIdx, value: dropDownItem.value, primaryText: dropDownItem.label })); });
                                            }
                                        }
                                    }
                                    else {
                                        items = layoutElement.items.map(function (dropDownItem, dropDownItemIdx) { return (React.createElement(material_ui_1.MenuItem, { key: layoutElement.key + '-' + dropDownItemIdx, value: dropDownItem.value, primaryText: dropDownItem.label })); });
                                    }
                                    var handleDropDownFormItemChange = function (event, index, oldValue, newValue) {
                                        return _this.handleFormItemChange('DropDown', layoutElement.key, oldValue, newValue, layoutElement.items[index], layoutElement);
                                    };
                                    resultingFromElement = (React.createElement(DropDown_1.default, { key: layoutElement.key, label: layoutElement.label, theme: layoutElement.theme, value: currentValue, muiProps: __assign({}, layoutElement.muiProps), onChange: handleDropDownFormItemChange, qflProps: __assign({ style: {
                                                display: 'inline-block',
                                                width: itemWidth + '%',
                                                paddingRight: (isMostRight ? '0px' : '4px'),
                                                paddingLeft: (isMostLeft ? '0px' : '4px')
                                            } }, layoutElement.qflProps) }, items));
                                }
                            }
                            break;
                        case 'DatePicker':
                            {
                                var initialValue = layoutElement.initialValue;
                                var currentValue = _this.getFormItemValue(layoutElement.key);
                                if (currentValue === undefined) {
                                    currentValue = initialValue;
                                    if (!_this.props.item) {
                                        var curFormData_4 = _this.state.formData;
                                        if (curFormData_4[layoutElement.key] !== initialValue) {
                                            curFormData_4[layoutElement.key] = initialValue;
                                            setTimeout(function () {
                                                _this.setState({
                                                    formData: curFormData_4
                                                }, function () {
                                                    if (_this.props.onChange) {
                                                        _this.props.onChange(_this.state.formData);
                                                    }
                                                });
                                            }, 0);
                                        }
                                    }
                                }
                                var handleDatePickerFormItemChange = function (oldValue, newValue) {
                                    return _this.handleFormItemChange('DatePicker', layoutElement.key, oldValue, newValue);
                                };
                                resultingFromElement = (React.createElement(DatePicker_1.default, { key: layoutElement.key, value: currentValue, theme: layoutElement.theme, muiProps: __assign({ tabIndex: tabIndex, floatingLabelText: layoutElement.label, width: '100%' }, layoutElement.muiProps), onChange: handleDatePickerFormItemChange, qflProps: __assign({ style: {
                                            display: 'inline-block',
                                            width: itemWidth + '%',
                                            paddingRight: (isMostRight ? '0px' : '4px'),
                                            paddingLeft: (isMostLeft ? '0px' : '4px')
                                        } }, layoutElement.qflProps) }));
                            }
                            break;
                        case 'AutoComplete':
                            {
                                if (layoutElement.items && layoutElement.items.length > 0) {
                                    var initialValue = layoutElement.initialValue;
                                    var currentValue = _this.getFormItemValue(layoutElement.key);
                                    if (currentValue === undefined) {
                                        currentValue = initialValue;
                                        if (!_this.props.item) {
                                            var curFormData_5 = _this.state.formData;
                                            if (curFormData_5[layoutElement.key] !== initialValue) {
                                                curFormData_5[layoutElement.key] = initialValue;
                                                setTimeout(function () {
                                                    _this.setState({
                                                        formData: curFormData_5
                                                    }, function () {
                                                        if (_this.props.onChange) {
                                                            _this.props.onChange(_this.state.formData);
                                                        }
                                                    });
                                                }, 0);
                                            }
                                        }
                                    }
                                    var handleAutoCompleteFormItemChange = function (event, index, oldValue, newValue) {
                                        return _this.handleFormItemChange('AutoComplete', layoutElement.key, oldValue, newValue, layoutElement.items[index], layoutElement);
                                    };
                                    resultingFromElement = (React.createElement(AutoComplete_1.default, { key: layoutElement.key, label: layoutElement.label, theme: layoutElement.theme, value: currentValue, items: layoutElement.items, muiProps: __assign({ floatingLabelText: layoutElement.label }, layoutElement.muiProps), onChange: handleAutoCompleteFormItemChange, qflProps: __assign({ style: {
                                                display: 'inline-block',
                                                width: itemWidth + '%',
                                                paddingRight: (isMostRight ? '0px' : '4px'),
                                                paddingLeft: (isMostLeft ? '0px' : '4px')
                                            } }, layoutElement.qflProps) }));
                                }
                            }
                            break;
                        case 'TextField':
                        default: {
                            var initialValue = layoutElement.initialValue;
                            var currentValue = _this.getFormItemValue(layoutElement.key);
                            if (currentValue === undefined) {
                                currentValue = initialValue;
                                if (!_this.props.item) {
                                    var curFormData_6 = _this.state.formData;
                                    if (curFormData_6[layoutElement.key] !== initialValue) {
                                        curFormData_6[layoutElement.key] = initialValue;
                                        setTimeout(function () {
                                            _this.setState({
                                                formData: curFormData_6
                                            }, function () {
                                                if (_this.props.onChange) {
                                                    _this.props.onChange(_this.state.formData);
                                                }
                                            });
                                        }, 0);
                                    }
                                }
                            }
                            var handleTextFieldFormItemChange = function (oldValue, newValue) {
                                return _this.handleFormItemChange('TextField', layoutElement.key, oldValue, newValue);
                            };
                            resultingFromElement = (React.createElement(TextField_1.default, { key: layoutElement.key, value: currentValue, theme: layoutElement.theme, muiProps: __assign({ tabindex: tabIndex, floatingLabelText: layoutElement.label, width: '100%' }, layoutElement.muiProps), onChange: handleTextFieldFormItemChange, qflProps: __assign({ style: {
                                        display: 'inline-block',
                                        width: itemWidth + '%',
                                        paddingRight: (isMostRight ? '0px' : '4px'),
                                        paddingLeft: (isMostLeft ? '0px' : '4px')
                                    } }, layoutElement.qflProps) }));
                        }
                    }
                    return resultingFromElement;
                };
                if (layoutItem) {
                    var isMultiple = Array.isArray(layoutItem);
                    var itemWidth_1 = 100;
                    if (isMultiple) {
                        itemWidth_1 = (100 / layoutItem.length);
                        return (React.createElement("div", { key: idx, style: { width: '100%' } }, layoutItem.map(function (subItem, subIdx) {
                            return getElement(subItem, itemWidth_1, (30 + (idx * 10) + subIdx), subIdx === 0, subIdx === (layoutItem.length - 1));
                        })));
                    }
                    return (React.createElement("div", { key: idx, style: {
                            width: '100%',
                            paddingTop: (layoutItem.type === 'DropDown' || layoutItem.type === 'AutoComplete' ? '22px' : '0px')
                        } }, getElement(layoutItem, itemWidth_1, (30 + (idx * 10)), true, true)));
                }
                return null;
            });
        }
        var key = (item ? item[keyAttributeName] : null);
        return (React.createElement("div", __assign({ key: key }, qflProps), resultingElement));
    };
    Form.defaultProps = {
        theme: null,
        muiProps: {},
        qflProps: {},
        keyAttributeName: 'id',
        dataProvider: null,
        onChange: null
    };
    return Form;
}(React.Component));
exports.default = Form;

//# sourceMappingURL=Form.js.map
