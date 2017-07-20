import * as React from 'react';

import {Toolbar as MUIToolBar} from 'material-ui/Toolbar/index.js';

import {buildTheme} from '../../themeBuilder';
import {IMUIProps} from '../../interfaces';

export interface IToolBarProps extends IMUIProps {
  items?: React.ReactNode;
}

/**
 * Material UI based tool bar
 */
class ToolBar extends React.Component<IToolBarProps, {}> {
  public static defaultProps = {
    theme: null,
    muiProps: {},
    qflProps: {},

    items: null
  };

  constructor() {
    super();
  }

  public render() {
    const {muiProps, qflProps} = buildTheme({
      theme: this.props.theme,
      sourceMuiProps: this.props.muiProps,
      sourceQflProps: this.props.qflProps,
      componentName: 'ToolBar'
    });

    let items = this.props.children;
    if (this.props.items) {
      items = this.props.items;
    }

    return (
      <div {...qflProps}>
        <MUIToolBar {...muiProps}>
          {items}
        </MUIToolBar>
      </div>
    );
  }
}

export default ToolBar;
