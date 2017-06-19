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
var material_ui_1 = require("material-ui");
var themeBuilder_1 = require("../../themeBuilder");
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField(props) {
        var _this = _super.call(this, props) || this;
        _this.defaultProps = {
            theme: 'Default',
            muiProps: {},
            qflProps: {},
            value: null,
            watch: false,
            onChange: null
        };
        _this.state = {
            currentValue: props.value
        };
        return _this;
    }
    TextField.prototype.handleChange = function (e, fireUp) {
        var oldValue = this.state.currentValue;
        var newValue = e.currentTarget.value;
        this.setState({
            currentValue: newValue
        });
        if (this.props.onChange && ((fireUp && !this.props.watch) || (!fireUp && this.props.watch))) {
            this.props.onChange(oldValue, newValue, e);
        }
    };
    TextField.prototype.render = function () {
        var _this = this;
        var _a = themeBuilder_1.buildTheme({
            theme: this.props.theme,
            sourceMuiProps: this.props.muiProps,
            sourceQflProps: this.props.qflProps,
            componentName: 'TextField'
        }), muiProps = _a.muiProps, qflProps = _a.qflProps;
        return (React.createElement("div", __assign({}, qflProps),
            React.createElement(material_ui_1.TextField, __assign({ ref: 'muiTextField' }, muiProps, { value: this.state.currentValue, onChange: function (e) { return _this.handleChange(e); }, onBlur: function (e) { return _this.handleChange(e, true); } }))));
    };
    return TextField;
}(React.Component));
exports.default = TextField;

//# sourceMappingURL=TextField.js.map
