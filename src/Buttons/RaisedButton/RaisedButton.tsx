import * as React from 'react';

import {RaisedButton as MUIRaisedButton} from 'material-ui';

import {buildTheme} from '../../themeBuilder';
import {IMUIProps} from '../../interfaces';

/**
 * Material UI based raised button
 */
class RaisedButton extends React.Component<IMUIProps, {}> {
  public static defaultProps = {
    theme: null,
    muiProps: {},
    qflProps: {}
  };

  constructor() {
    super();
  }

  public render() {
    const {muiProps, qflProps} = buildTheme({
      theme: this.props.theme,
      sourceMuiProps: this.props.muiProps,
      sourceQflProps: this.props.qflProps,
      componentName: 'RaisedButton'
    });

    return (
      <div {...qflProps}>
        <MUIRaisedButton {...muiProps}/>
      </div>
    );
  }
}

export default RaisedButton;
