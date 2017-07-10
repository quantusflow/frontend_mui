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
var MUIDrawer = require("material-ui/Drawer/index.js");
var Divider = require("material-ui/Divider/index.js");
var themeBuilder_1 = require("../../themeBuilder");
var index_js_1 = require("material-ui/List/index.js");
var SelectableList = index_js_1.makeSelectable(index_js_1.List); // tslint:disable-line variable-name
/**
 * Material UI based tool bar
 */
var NavigationBar = (function (_super) {
    __extends(NavigationBar, _super);
    function NavigationBar() {
        return _super.call(this) || this;
    }
    NavigationBar.prototype.handleOnChange = function (e, route) {
        if (this.props.onChange) {
            this.props.onChange(e, route);
        }
    };
    NavigationBar.prototype.render = function () {
        var _this = this;
        var _a = themeBuilder_1.buildTheme({
            theme: this.props.theme,
            sourceMuiProps: this.props.muiProps,
            sourceQflProps: this.props.qflProps,
            componentName: 'NavigationBar'
        }), muiProps = _a.muiProps, qflProps = _a.qflProps;
        var listMuiProps = themeBuilder_1.buildTheme({
            theme: this.props.theme,
            sourceMuiProps: this.props.listMuiProps || {},
            componentName: 'List'
        }).muiProps;
        var dividerMuiProps = themeBuilder_1.buildTheme({
            theme: this.props.theme,
            sourceMuiProps: this.props.dividerMuiProps || {},
            componentName: 'Divider'
        }).muiProps;
        var listItemMuiProps = themeBuilder_1.buildTheme({
            theme: this.props.theme,
            sourceMuiProps: this.props.listItemMuiProps || {},
            componentName: 'ListItem'
        }).muiProps;
        var location = this.props.location;
        var renderedMenu = null;
        if (this.props.menuItems) {
            if (!this.props.hideBarFill) {
                this.props.menuItems.push({
                    type: 'fillBar'
                });
            }
            renderedMenu = this.props.menuItems.map(function (item, idx) {
                switch (item.type) {
                    case 'List':
                        var nestedElements = (item.nestedItems || []);
                        return (React.createElement(SelectableList, __assign({ key: idx, className: item.className, value: location.pathname, onChange: function (e, route) { return _this.handleOnChange(e, route); } }, listMuiProps), nestedElements.map(function (nestedElement, nestedIdx) {
                            switch (nestedElement.type) {
                                case 'ListItem':
                                    return React.createElement(index_js_1.ListItem, __assign({ key: nestedIdx }, listItemMuiProps, { className: nestedElement.className, primaryText: nestedElement.label, value: nestedElement.path, leftIcon: nestedElement.icon }));
                                default:
                                    return null;
                            }
                        }).filter(function (itemToFilter) { return (itemToFilter !== null); })));
                    case 'Divider':
                        return React.createElement(Divider, __assign({ key: idx }, dividerMuiProps));
                    case 'fillBar':
                        return React.createElement("div", { key: idx, style: qflProps.barFillStyle });
                    default:
                        return null;
                }
            }).filter(function (item) { return (item !== null); });
        }
        return (React.createElement("div", __assign({}, qflProps),
            React.createElement(MUIDrawer, __assign({}, muiProps, { open: true, docked: true }), renderedMenu)));
    };
    NavigationBar.defaultProps = {
        theme: null,
        muiProps: {},
        qflProps: {},
        listMuiProps: {},
        dividerMuiProps: {},
        listItemMuiProps: {},
        hideBarFill: false
    };
    return NavigationBar;
}(React.Component));
exports.default = NavigationBar;

//# sourceMappingURL=NavigationBar.js.map
