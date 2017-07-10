"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTheme = function (options) {
    var muiProps = options.sourceMuiProps || {};
    var qflProps = options.sourceQflProps || {};
    var rbtProps = options.sourceRbtProps || {};
    var baseTheme = {};
    var theme = options.theme || {};
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
            var base = (context && themedMuiProps[componentName][context] ? themedMuiProps[componentName][context] : themedMuiProps[componentName].default);
            muiProps = Object.assign(base, options.sourceMuiProps);
        }
        var themedQflProps = themeObj.qflProps;
        if (themedQflProps && section) {
            themedQflProps = themedQflProps[section];
        }
        if (themedQflProps && themedQflProps[componentName]) {
            var base = (context && themedQflProps[componentName][context] ? themedQflProps[componentName][context] : themedQflProps[componentName].default);
            qflProps = Object.assign(base, options.sourceQflProps);
        }
        var themedRbtProps = themeObj.rbtProps;
        if (themedRbtProps && section) {
            themedRbtProps = themedRbtProps[section];
        }
        if (themedRbtProps && themedRbtProps[componentName]) {
            var base = (context && themedRbtProps[componentName][context] ? themedRbtProps[componentName][context] : themedRbtProps[componentName].default);
            rbtProps = Object.assign(base, options.sourceRbtProps);
        }
        for (var key in themeObj) {
            if (key !== 'muiProps' && key !== 'qflProps' && key !== 'rbtProps') {
                baseTheme[key] = themeObj[key];
            }
        }
    }
    return {
        theme: baseTheme,
        muiProps: muiProps,
        qflProps: qflProps,
        rbtProps: rbtProps
    };
};

//# sourceMappingURL=themeBuilder.js.map
