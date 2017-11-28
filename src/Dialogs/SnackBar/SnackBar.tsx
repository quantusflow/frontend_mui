import * as React from 'react';

import MUISnackbar from 'material-ui/Snackbar/index.js';

import {IMUIProps} from '../../interfaces';
import {buildTheme} from '../../themeBuilder';

/**
 * Material UI based SnackBar
 */
class SnackBar extends React.Component<IMUIProps, {}> {
  public static defaultProps = {
    theme: null,
    muiProps: {},
    qflProps: {},
  };

  constructor(props) {
    super(props);
  }

  public render() {
    const { muiProps, qflProps } = buildTheme({
      theme: this.props.theme,
      sourceMuiProps: this.props.muiProps,
      sourceQflProps: this.props.qflProps,
      componentName: 'SnackBar',
    });

    return (
      <div {...qflProps}>
        <MUISnackbar {...muiProps}/>
      </div>
    );
  }
}

export default SnackBar;
