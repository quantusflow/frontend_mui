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
var IconButton = (function (_super) {
    __extends(IconButton, _super);
    function IconButton() {
        return _super.call(this) || this;
    }
    IconButton.prototype.renderIcon = function (muiProps) {
        return (React.createElement(material_ui_1.IconButton, __assign({}, muiProps), this.props.icon));
    };
    IconButton.prototype.renderBadgedIcon = function () {
        return (React.createElement(material_ui_1.Badge, __assign({}, this.props.badgeProps), this.renderIcon()));
    };
    IconButton.prototype.render = function () {
        var _a = themeBuilder_1.buildTheme({
            theme: this.props.theme,
            sourceMuiProps: this.props.muiProps,
            sourceQflProps: this.props.qflProps,
            componentName: 'IconButton'
        }), muiProps = _a.muiProps, qflProps = _a.qflProps;
        var renderedContent = this.renderIcon(muiProps);
        if (this.props.badged) {
            renderedContent = this.renderBadgedIcon();
        }
        return (React.createElement("div", __assign({}, qflProps), renderedContent));
    };
    return IconButton;
}(React.Component));
IconButton.defaultProps = {
    theme: 'Default',
    muiProps: {},
    qflProps: {},
    badged: false,
    badgeProps: {},
    icon: null
};
exports.default = IconButton;

//# sourceMappingURL=IconButton.js.map
