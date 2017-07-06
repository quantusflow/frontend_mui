import * as React from 'react';

import {FloatingActionButton as MUIFloatingActionButton} from 'material-ui';

import {buildTheme} from '../../themeBuilder';

import {IMUIProps} from '../../interfaces';

export interface IFloatingButtonProps extends IMUIProps {
  icon?: React.ReactNode;
}

/**
 * Material UI based floating action button
 */
class FloatingButton extends React.Component<IFloatingButtonProps, {}> {
  public static defaultProps = {
    theme: null,
    muiProps: {},
    qflProps: {},

    icon: null
  };

  constructor() {
    super();
  }

  public render() {
    const {muiProps, qflProps} = buildTheme({
      theme: this.props.theme,
      sourceMuiProps: this.props.muiProps,
      sourceQflProps: this.props.qflProps,
      componentName: 'FloatingButton'
    });

    return (
      <div {...qflProps}>
        <MUIFloatingActionButton {...muiProps}>
          {this.props.icon}
        </MUIFloatingActionButton>
      </div>
    );
  }
}

export default FloatingButton;
