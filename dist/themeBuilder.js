"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var buildTheme = exports.buildTheme = function buildTheme(options) {
    var muiProps = options.sourceMuiProps || {};
    var qflProps = options.sourceQflProps || {};
    var rbtProps = options.sourceRbtProps || {};

    var theme = options.theme;
    var componentName = options.componentName;

    var section = theme.themeSection;
    var context = theme.themeContext;

    var themeObj = theme;
    if (themeObj) {
        var themedMuiProps = themeObj.muiProps;
        if (themedMuiProps && section) {
            themedMuiProps = themedMuiProps[section];
        }
        if (themedMuiProps && themedMuiProps[componentName]) {
            muiProps = Object.assign(context && themedMuiProps[componentName][context] ? themedMuiProps[componentName][context] : themedMuiProps[componentName].default, options.sourceMuiProps);
        }
        var themedQflProps = themeObj.qflProps;
        if (themedQflProps && section) {
            themedQflProps = themedQflProps[section];
        }
        if (themedQflProps && themedQflProps[componentName]) {
            qflProps = Object.assign(context && themedQflProps[componentName][context] ? themedQflProps[componentName][context] : themedQflProps[componentName].default, options.sourceQflProps);
        }

        var themedRbtProps = themeObj.rbtProps;
        if (themedRbtProps && section) {
            themedRbtProps = themedRbtProps[section];
        }
        if (themedRbtProps && themedRbtProps[componentName]) {
            rbtProps = Object.assign(context && themedRbtProps[componentName][context] ? themedRbtProps[componentName][context] : themedRbtProps[componentName].default, options.sourceRbtProps);
        }
    }

    return {
        muiProps: muiProps,
        qflProps: qflProps,
        rbtProps: rbtProps
    };
};
//# sourceMappingURL=themeBuilder.js.map
