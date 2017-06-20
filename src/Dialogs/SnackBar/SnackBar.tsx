import * as React from 'react';

import MUISnackbar from 'material-ui/Snackbar';

import {buildTheme} from '../../themeBuilder';
import {IMUIProps} from '../../interfaces';

/**
 * Material UI based SnackBar
 */
class SnackBar extends React.Component<IMUIProps, {}> {
  public static defaultProps = {
    theme: 'Default',
    muiProps: {},
    qflProps: {}
  };

  constructor() {
    super();
  }

  public render() {
    const { muiProps, qflProps } = buildTheme({
      theme: this.props.theme,
      sourceMuiProps: this.props.muiProps,
      sourceQflProps: this.props.qflProps,
      componentName: 'SnackBar'
    });

    return (
      <div>
        <MUISnackbar {...muiProps}/>
      </div>
    );
  }
}

export default SnackBar;
