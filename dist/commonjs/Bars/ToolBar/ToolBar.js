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
var MUIToolBar = require("material-ui/Toolbar/index.js");
var themeBuilder_1 = require("../../themeBuilder");
var ToolBar = (function (_super) {
    __extends(ToolBar, _super);
    function ToolBar() {
        return _super.call(this) || this;
    }
    ToolBar.prototype.render = function () {
        var _a = themeBuilder_1.buildTheme({
            theme: this.props.theme,
            sourceMuiProps: this.props.muiProps,
            sourceQflProps: this.props.qflProps,
            componentName: 'ToolBar'
        }), muiProps = _a.muiProps, qflProps = _a.qflProps;
        var items = this.props.children;
        if (this.props.items) {
            items = this.props.items;
        }
        return (React.createElement("div", __assign({}, qflProps),
            React.createElement(MUIToolBar, __assign({}, muiProps), items)));
    };
    ToolBar.defaultProps = {
        theme: null,
        muiProps: {},
        qflProps: {},
        items: null
    };
    return ToolBar;
}(React.Component));
exports.default = ToolBar;

//# sourceMappingURL=ToolBar.js.map
