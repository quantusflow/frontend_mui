import * as React from 'react';

import {Dialog as MUIDialog} from 'material-ui';

import {buildTheme} from '../../themeBuilder';
import {IMUIProps} from '../../interfaces';

/**
 * Material UI based modal dialog
 */
class Dialog extends React.Component<IMUIProps, {}> {
  public static defaultProps = {
    theme: 'Default',
    muiProps: {},
    qflProps: {}
  };

  constructor() {
    super();
  }

  public render() {
    const {children} = this.props;

    const {muiProps, qflProps} = buildTheme({
      theme: this.props.theme,
      sourceMuiProps: this.props.muiProps,
      sourceQflProps: this.props.qflProps,
      componentName: 'Dialog'
    });

    return (
      <div {...qflProps}>
        <MUIDialog {...muiProps}>
          {children}
        </MUIDialog>
      </div>
    );
  }
}

export default Dialog;
