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
var AutoComplete = (function (_super) {
    __extends(AutoComplete, _super);
    function AutoComplete(props) {
        var _this = _super.call(this, props) || this;
        _this.defaultProps = {
            theme: 'Default',
            muiProps: {},
            qflProps: {},
            label: null,
            value: null,
            onChange: null
        };
        _this.state = {
            currentValue: (props.value ? props.value.toString() : null)
        };
        return _this;
    }
    AutoComplete.prototype.handleChange = function (chosenRequest, index) {
        var oldValue = this.state.currentValue;
        var newValue = this.props.items[index];
        this.setState({
            currentValue: (newValue ? newValue.toString() : null)
        });
        if (this.props.onChange) {
            this.props.onChange(chosenRequest, index, oldValue, newValue);
        }
    };
    AutoComplete.prototype.render = function () {
        var _this = this;
        var items = this.props.children;
        if (this.props.items) {
            items = this.props.items;
        }
        var _a = themeBuilder_1.buildTheme({
            theme: this.props.theme,
            sourceMuiProps: this.props.muiProps,
            sourceQflProps: this.props.qflProps,
            componentName: 'AutoComplete'
        }), muiProps = _a.muiProps, qflProps = _a.qflProps;
        return (React.createElement("div", __assign({}, qflProps),
            React.createElement(material_ui_1.AutoComplete, __assign({}, muiProps, { openOnFocus: true, dataSource: items, searchText: this.state.currentValue, onNewRequest: function (chosenRequest, index) { return _this.handleChange(chosenRequest, index); } }))));
    };
    return AutoComplete;
}(React.Component));
exports.default = AutoComplete;

//# sourceMappingURL=AutoComplete.js.map
