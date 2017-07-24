import { fromJS } from 'immutable';

export const buildTheme = (options) => {
  let muiProps = options.sourceMuiProps || {};
  let qflProps = options.sourceQflProps || {};
  let rbtProps = options.sourceRbtProps || {};

  const baseTheme = {};

  const theme: any = options.theme || {};
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
      let base = (context && themedMuiProps[componentName][context] ? themedMuiProps[componentName][context] : themedMuiProps[componentName].default);
      const nestedBase = fromJS(base);
      muiProps = nestedBase.mergeDeep(options.sourceMuiProps).toJS();
      // muiProps = Object.assign(base, options.sourceMuiProps);
    }
    let themedQflProps = themeObj.qflProps;
    if (themedQflProps && section) {
      themedQflProps = themedQflProps[section];
    }
    if (themedQflProps && themedQflProps[componentName]) {
      let base = (context && themedQflProps[componentName][context] ? themedQflProps[componentName][context] : themedQflProps[componentName].default);
      const nestedBase = fromJS(base);
      qflProps = nestedBase.mergeDeep(options.sourceQflProps).toJS();
      // qflProps = Object.assign(base, options.sourceQflProps);
    }

    let themedRbtProps = themeObj.rbtProps;
    if (themedRbtProps && section) {
      themedRbtProps = themedRbtProps[section];
    }
    if (themedRbtProps && themedRbtProps[componentName]) {
      let base = (context && themedRbtProps[componentName][context] ? themedRbtProps[componentName][context] : themedRbtProps[componentName].default);
      const nestedBase = fromJS(base);
      rbtProps = nestedBase.mergeDeep(options.sourceRbtProps).toJS();
      // rbtProps = Object.assign(base, options.sourceRbtProps);
    }

    for (let key in themeObj) {
      if (key !== 'muiProps' && key !== 'qflProps' && key !== 'rbtProps') {
        baseTheme[key] = themeObj[key];
      }
    }
  }

  return {
    theme: baseTheme,
    muiProps,
    qflProps,
    rbtProps
  };
};
