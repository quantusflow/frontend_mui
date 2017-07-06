import * as React from 'react';

import {RadioButton as MUIRadioButton} from 'material-ui';

import {buildTheme} from '../../themeBuilder';
import {IMUIProps} from '../../interfaces';

/**
 * Material UI based radio button
 */
class RadioButton extends React.Component<IMUIProps, {}> {
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
      componentName: 'RadioButton'
    });

    return (
      <div {...qflProps}>
        <MUIRadioButton {...muiProps}/>
      </div>
    );
  }
}

export default RadioButton;
