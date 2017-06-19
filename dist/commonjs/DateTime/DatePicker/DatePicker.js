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
var DatePicker = (function (_super) {
    __extends(DatePicker, _super);
    function DatePicker(props) {
        var _this = _super.call(this, props) || this;
        _this.defaultProps = {
            theme: 'Default',
            muiProps: {},
            qflProps: {},
            value: new Date(),
            onChange: null
        };
        _this.state = {
            currentValue: (props.value && typeof props.value === 'string' ? new Date(props.value) : null)
        };
        return _this;
    }
    DatePicker.prototype.handleChange = function (e, date) {
        var _this = this;
        var oldValue = this.state.currentValue;
        var newValue = date;
        this.setState({
            currentValue: newValue
        }, function () {
            if (_this.props.onChange) {
                _this.props.onChange((oldValue ? oldValue.toISOString() : null), (newValue ? newValue.toISOString() : null));
            }
        });
    };
    DatePicker.prototype.render = function () {
        var _this = this;
        var _a = themeBuilder_1.buildTheme({
            theme: this.props.theme,
            sourceMuiProps: this.props.muiProps,
            sourceQflProps: this.props.qflProps,
            componentName: 'DatePicker'
        }), muiProps = _a.muiProps, qflProps = _a.qflProps;
        return (React.createElement("div", __assign({}, qflProps),
            React.createElement(material_ui_1.DatePicker, __assign({ ref: 'muiDateField' }, muiProps, { value: this.state.currentValue, onChange: function (e, date) { return _this.handleChange(e, date); } }))));
    };
    return DatePicker;
}(React.Component));
exports.default = DatePicker;

//# sourceMappingURL=DatePicker.js.map
