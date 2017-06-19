import * as React from 'react';

import {Toggle as MUIToggle} from 'material-ui';

import {buildTheme} from '../../themeBuilder';
import {IMUIProps} from '../../interfaces';

/**
 * Material UI based toggle
 */
class Toggle extends React.Component<IMUIProps, {}> {
  public defaultProps = {
    theme: 'Default',
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
      componentName: 'Toggle'
    });

    return (
      <div {...qflProps}>
        <MUIToggle {...muiProps}/>
      </div>
    );
  }
}

export default Toggle;
