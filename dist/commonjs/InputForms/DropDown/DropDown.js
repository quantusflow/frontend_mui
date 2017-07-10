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
var index_js_1 = require("material-ui/DropDownMenu/index.js");
var themeBuilder_1 = require("../../themeBuilder");
/**
 * Material UI based drop down menu
 */
var DropDown = (function (_super) {
    __extends(DropDown, _super);
    function DropDown(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            currentValue: props.value
        };
        return _this;
    }
    DropDown.prototype.handleChange = function (event, index, value) {
        var oldValue = this.state.currentValue;
        var newValue = value;
        this.setState({
            currentValue: newValue
        });
        if (this.props.onChange) {
            this.props.onChange(event, index, oldValue, newValue);
        }
    };
    DropDown.prototype.render = function () {
        var _this = this;
        var items = this.props.children;
        if (this.props.items) {
            items = this.props.items;
        }
        var _a = themeBuilder_1.buildTheme({
            theme: this.props.theme,
            sourceMuiProps: this.props.muiProps,
            sourceQflProps: this.props.qflProps,
            componentName: 'DropDown'
        }), muiProps = _a.muiProps, qflProps = _a.qflProps;
        return (React.createElement("div", __assign({}, qflProps),
            React.createElement("span", { style: qflProps.labelStyle }, this.props.label),
            React.createElement(index_js_1.DropDownMenu, __assign({}, muiProps, { value: this.state.currentValue, onChange: function (event, index, value) { return _this.handleChange(event, index, value); } }), items)));
    };
    DropDown.defaultProps = {
        theme: null,
        muiProps: {},
        qflProps: {},
        items: null,
        value: null,
        label: null,
        onChange: null
    };
    return DropDown;
}(React.Component));
exports.default = DropDown;

//# sourceMappingURL=DropDown.js.map
