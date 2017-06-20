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
var react_router_1 = require("react-router");
var clone_1 = require("clone");
var extend_1 = require("extend");
var themeBuilder_1 = require("../../themeBuilder");
var Link = (function (_super) {
    __extends(Link, _super);
    function Link() {
        return _super.call(this) || this;
    }
    Link.prototype.render = function () {
        var _a = themeBuilder_1.buildTheme({
            theme: this.props.theme,
            sourceMuiProps: this.props.muiProps,
            sourceQflProps: this.props.qflProps,
            componentName: 'Link'
        }), muiProps = _a.muiProps, qflProps = _a.qflProps;
        var targetObj = { href: this.props.href };
        var linkComponent = (React.createElement("a", __assign({ style: extend_1.default(clone_1.default(muiProps.linkStyle, false), this.props.linkStyle) }, targetObj),
            React.createElement("span", { style: extend_1.default(clone_1.default(muiProps.labelStyle, false), this.props.labelStyle) }, this.props.label)));
        if (this.props.to) {
            delete targetObj.href;
            targetObj.to = this.props.to;
            linkComponent = (React.createElement(react_router_1.IndexLink, __assign({ style: extend_1.default(clone_1.default(muiProps.linkStyle, false), this.props.linkStyle) }, targetObj),
                React.createElement("span", { style: extend_1.default(clone_1.default(muiProps.labelStyle, false), this.props.labelStyle) }, this.props.label)));
        }
        return (React.createElement("div", __assign({}, qflProps), linkComponent));
    };
    return Link;
}(React.Component));
Link.defaultProps = {
    theme: 'Default',
    qflProps: {},
    muiProps: {},
    linkStyle: {},
    labelStyle: {},
    label: '',
    to: null,
    href: '#'
};
exports.default = Link;

//# sourceMappingURL=Link.js.map
