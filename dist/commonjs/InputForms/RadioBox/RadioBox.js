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
var index_js_1 = require("material-ui/RadioButton/index.js");
var themeBuilder_1 = require("../../themeBuilder");
/**
 * Material UI based radio button
 */
var RadioBox = (function (_super) {
    __extends(RadioBox, _super);
    function RadioBox(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            currentValue: props.value
        };
        return _this;
    }
    RadioBox.prototype.handleChange = function (event, value) {
        var oldValue = this.state.currentValue;
        var newValue = value;
        this.setState({
            currentValue: newValue
        });
        if (this.props.onChange) {
            this.props.onChange(event, oldValue, newValue);
        }
    };
    RadioBox.prototype.render = function () {
        var _this = this;
        var items = this.props.children;
        if (this.props.items) {
            items = this.props.items;
        }
        var _a = themeBuilder_1.buildTheme({
            theme: this.props.theme,
            sourceMuiProps: this.props.muiProps,
            sourceQflProps: this.props.qflProps,
            componentName: 'RadioBox'
        }), muiProps = _a.muiProps, qflProps = _a.qflProps;
        return (React.createElement("div", __assign({}, qflProps),
            React.createElement("span", { style: qflProps.labelStyle }, this.props.label),
            React.createElement(index_js_1.RadioButtonGroup, __assign({}, muiProps, { valueSelected: this.state.currentValue, onChange: function (event, value) { return _this.handleChange(event, value); } }), items)));
    };
    RadioBox.defaultProps = {
        theme: null,
        muiProps: {},
        qflProps: {},
        items: null,
        value: null,
        label: null,
        onChange: null
    };
    return RadioBox;
}(React.Component));
exports.default = RadioBox;

//# sourceMappingURL=RadioBox.js.map
