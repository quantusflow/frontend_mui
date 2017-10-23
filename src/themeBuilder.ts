import { fromJS } from 'immutable';

export const buildTheme = (options) => {
  let muiProps = options.sourceMuiProps || {};
  let qflProps = options.sourceQflProps || {};
  let rbtProps = options.sourceRbtProps || {};

  const baseTheme = {};

  const theme: any = options.theme || {};
  let componentName = options.componentName;

  const section = theme.themeSection;
  let context = theme.themeContext;

  if (componentName && componentName.indexOf(':') !== -1) {
      context = componentName.split(':')[1];
      componentName = componentName.split(':')[0];
  }

  const themeObj = theme;
  if (themeObj) {
    let themedMuiProps = themeObj.muiProps;
    if (themedMuiProps && section) {
      themedMuiProps = themedMuiProps[section];
    }
    if (themedMuiProps && themedMuiProps[componentName]) {
      let base = themedMuiProps[componentName].default;
      if (context && themedMuiProps[componentName][context]) {
        const contextBase = fromJS(base);
        base = contextBase.mergeDeep(themedMuiProps[componentName][context]).toJS();
      }
      const nestedBase = fromJS(base);
      muiProps = nestedBase.mergeDeep(options.sourceMuiProps).toJS();
    }
    let themedQflProps = themeObj.qflProps;
    if (themedQflProps && section) {
      themedQflProps = themedQflProps[section];
    }
    if (themedQflProps && themedQflProps[componentName]) {
      let base = themedQflProps[componentName].default;
      if (context && themedQflProps[componentName][context]) {
        const contextBase = fromJS(base);
        base = contextBase.mergeDeep(themedQflProps[componentName][context]).toJS();
      }
      const nestedBase = fromJS(base);
      qflProps = nestedBase.mergeDeep(options.sourceQflProps).toJS();
    }

    let themedRbtProps = themeObj.rbtProps;
    if (themedRbtProps && section) {
      themedRbtProps = themedRbtProps[section];
    }
    if (themedRbtProps && themedRbtProps[componentName]) {
      let base = themedRbtProps[componentName].default;
      if (context && themedRbtProps[componentName][context]) {
        const contextBase = fromJS(base);
        base = contextBase.mergeDeep(themedRbtProps[componentName][context]).toJS();
      }
      const nestedBase = fromJS(base);
      rbtProps = nestedBase.mergeDeep(options.sourceRbtProps).toJS();
    }

    for (const key in themeObj) {
      if (key !== 'muiProps' && key !== 'qflProps' && key !== 'rbtProps') {
        baseTheme[key] = themeObj[key];
      }
    }
  }

  return {
    theme: baseTheme,
    muiProps,
    qflProps,
    rbtProps,
  };
};
