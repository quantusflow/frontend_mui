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
var index_js_1 = require("material-ui/Checkbox/index.js");
var themeBuilder_1 = require("../../themeBuilder");
var CheckBox = (function (_super) {
    __extends(CheckBox, _super);
    function CheckBox(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            currentValue: props.value
        };
        return _this;
    }
    CheckBox.prototype.componentWillReceiveProps = function (props, b, c) {
        this.setState({
            currentValue: props.value
        });
    };
    CheckBox.prototype.handleChange = function (e) {
        var oldValue = this.state.currentValue;
        var newValue = !this.state.currentValue;
        this.setState({
            currentValue: newValue
        });
        if (this.props.onChange) {
            this.props.onChange(e, oldValue, newValue, this.props.dataKey);
        }
    };
    CheckBox.prototype.render = function () {
        var _this = this;
        var _a = themeBuilder_1.buildTheme({
            theme: this.props.theme,
            sourceMuiProps: this.props.muiProps,
            sourceQflProps: this.props.qflProps,
            componentName: 'CheckBox'
        }), muiProps = _a.muiProps, qflProps = _a.qflProps;
        return (React.createElement("div", __assign({}, qflProps),
            React.createElement(index_js_1.default, __assign({}, muiProps, { checked: this.state.currentValue, onCheck: function (e) { return _this.handleChange(e); } }))));
    };
    CheckBox.defaultProps = {
        theme: null,
        muiProps: {},
        qflProps: {},
        value: false,
        onChange: null
    };
    return CheckBox;
}(React.Component));
exports.default = CheckBox;

//# sourceMappingURL=CheckBox.js.map
