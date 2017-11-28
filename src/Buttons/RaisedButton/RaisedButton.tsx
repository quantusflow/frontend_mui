import * as React from 'react';

import MUIRaisedButton from 'material-ui/RaisedButton/index.js';

import {IMUIProps} from '../../interfaces';
import {buildTheme} from '../../themeBuilder';

/**
 * Material UI based raised button
 */
class RaisedButton extends React.Component<IMUIProps, {}> {
  public static defaultProps = {
    theme: null,
    muiProps: {},
    qflProps: {},
  };

  constructor(props) {
    super(props);
  }

  public render() {
    const {muiProps, qflProps} = buildTheme({
      theme: this.props.theme,
      sourceMuiProps: this.props.muiProps,
      sourceQflProps: this.props.qflProps,
      componentName: 'RaisedButton',
    });

    return (
      <div {...qflProps}>
        <MUIRaisedButton {...muiProps}/>
      </div>
    );
  }
}

export default RaisedButton;
