import * as React from 'react';

import MUIFlatButton from 'material-ui/FlatButton/index.js';

import {buildTheme} from '../../themeBuilder';

import {IMUIProps} from '../../interfaces';

/**
 * Material UI based flat button
 */
class FlatButton extends React.Component<IMUIProps, {}> {
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
      componentName: 'FlatButton',
    });

    return (
      <div {...qflProps}>
        <MUIFlatButton {...muiProps}/>
      </div>
    );
  }
}

export default FlatButton;
