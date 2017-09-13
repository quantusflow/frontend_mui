import * as React from 'react';

import MUIToggle from 'material-ui/Toggle/index.js';

import {IMUIProps} from '../../interfaces';
import {buildTheme} from '../../themeBuilder';

/**
 * Material UI based toggle
 */
class Toggle extends React.Component<IMUIProps, {}> {
  public static defaultProps = {
    theme: null,
    muiProps: {},
    qflProps: {},
  };

  constructor() {
    super();
  }

  public render() {
    const {muiProps, qflProps} = buildTheme({
      theme: this.props.theme,
      sourceMuiProps: this.props.muiProps,
      sourceQflProps: this.props.qflProps,
      componentName: 'Toggle',
    });

    return (
      <div {...qflProps}>
        <MUIToggle {...muiProps}/>
      </div>
    );
  }
}

export default Toggle;
