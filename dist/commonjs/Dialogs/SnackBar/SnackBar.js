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
var Snackbar_1 = require("material-ui/Snackbar");
var themeBuilder_1 = require("../../themeBuilder");
var SnackBar = (function (_super) {
    __extends(SnackBar, _super);
    function SnackBar() {
        return _super.call(this) || this;
    }
    SnackBar.prototype.render = function () {
        var _a = themeBuilder_1.buildTheme({
            theme: this.props.theme,
            sourceMuiProps: this.props.muiProps,
            sourceQflProps: this.props.qflProps,
            componentName: 'SnackBar'
        }), muiProps = _a.muiProps, qflProps = _a.qflProps;
        return (React.createElement("div", null,
            React.createElement(Snackbar_1.default, __assign({}, muiProps))));
    };
    SnackBar.defaultProps = {
        theme: null,
        muiProps: {},
        qflProps: {}
    };
    return SnackBar;
}(React.Component));
exports.default = SnackBar;

//# sourceMappingURL=SnackBar.js.map
