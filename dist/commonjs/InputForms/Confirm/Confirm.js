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
var RaisedButton_1 = require("../../Buttons/RaisedButton/RaisedButton");
var themeBuilder_1 = require("../../themeBuilder");
var Confirm = (function (_super) {
    __extends(Confirm, _super);
    function Confirm() {
        var _this = _super.call(this) || this;
        _this.state = {
            confirmData: {}
        };
        return _this;
    }
    Confirm.prototype.handleConfirm = function (key) {
        if (this.props.onChoose) {
            this.props.onChoose(key);
        }
    };
    Confirm.prototype.render = function () {
        var _this = this;
        var qflProps = themeBuilder_1.buildTheme({
            theme: this.props.theme,
            sourceMuiProps: this.props.muiProps,
            sourceQflProps: this.props.qflProps,
            componentName: 'Confirm'
        }).qflProps;
        var layout = this.props.layout;
        var resultingButtons = layout.map(function (element, elementIdx) { return (React.createElement(RaisedButton_1.default, { key: element.key, theme: element.theme, muiProps: __assign({ label: element.label, primary: true }, element.muiProps), qflProps: __assign({ onClick: function (e) {
                    _this.handleConfirm(element.key);
                } }, element.qflProps) })); });
        return (React.createElement("div", __assign({}, qflProps),
            React.createElement("p", null, this.props.message),
            resultingButtons));
    };
    Confirm.defaultProps = {
        theme: 'Default',
        muiProps: {},
        qflProps: {},
        message: null,
        onChoose: null
    };
    return Confirm;
}(React.Component));
exports.default = Confirm;

//# sourceMappingURL=Confirm.js.map
