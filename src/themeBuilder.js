export const buildTheme = (options) => {
    let muiProps = options.sourceMuiProps || {};
    let qflProps = options.sourceQflProps || {};
    let rbtProps = options.sourceRbtProps || {};

    const theme = options.theme;
    const componentName = options.componentName;

    const section = theme.themeSection;
    const context = theme.themeContext;

    const themeObj = theme;
    if (themeObj) {
        let themedMuiProps = themeObj.muiProps;
        if (themedMuiProps && section) {
            themedMuiProps = themedMuiProps[section];
        }
        if (themedMuiProps && themedMuiProps[componentName]) {
            muiProps = Object.assign((context && themedMuiProps[componentName][context] ? themedMuiProps[componentName][context] : themedMuiProps[componentName].default), options.sourceMuiProps);
        }
        let themedQflProps = themeObj.qflProps;
        if (themedQflProps && section) {
            themedQflProps = themedQflProps[section];
        }
        if (themedQflProps && themedQflProps[componentName]) {
            qflProps = Object.assign((context && themedQflProps[componentName][context] ? themedQflProps[componentName][context] : themedQflProps[componentName].default), options.sourceQflProps);
        }

        let themedRbtProps = themeObj.rbtProps;
        if (themedRbtProps && section) {
            themedRbtProps = themedRbtProps[section];
        }
        if (themedRbtProps && themedRbtProps[componentName]) {
            rbtProps = Object.assign((context && themedRbtProps[componentName][context] ? themedRbtProps[componentName][context] : themedRbtProps[componentName].default), options.sourceRbtProps);
        }
    }

    return {
        muiProps,
        qflProps,
        rbtProps
    };
};