import * as React from 'react';

import MUIDialog from 'material-ui/Dialog/index.js';

import {IMUIProps} from '../../interfaces';
import {buildTheme} from '../../themeBuilder';

/**
 * Material UI based modal dialog
 */
class Dialog extends React.Component<IMUIProps, {}> {
  public static defaultProps = {
    theme: null,
    muiProps: {},
    qflProps: {},
  };

  constructor(props) {
    super(props);
  }

  public render() {
    const {children} = this.props;

    const {muiProps, qflProps} = buildTheme({
      theme: this.props.theme,
      sourceMuiProps: this.props.muiProps,
      sourceQflProps: this.props.qflProps,
      componentName: 'Dialog',
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
