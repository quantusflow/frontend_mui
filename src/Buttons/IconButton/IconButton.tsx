import * as React from 'react';

import MUIBadge from 'material-ui/Badge/index.js';
import MUIIconButton from 'material-ui/IconButton/index.js';

import {buildTheme} from '../../themeBuilder';

import {IMUIProps} from '../../interfaces';

export interface IIconButtonProps extends IMUIProps {
  badged?: boolean;
  badgeProps?: {};
  icon?: React.ReactNode;
}

/**
 * Material UI based icon button
 */
class IconButton extends React.Component<IIconButtonProps, {}> {
  public static defaultProps = {
    theme: null,
    muiProps: {},
    qflProps: {},

    badged: false,
    badgeProps: {},
    icon: null,
  };

  constructor() {
    super();
  }

  private renderIcon(muiProps?: {}) {
    return (
      <MUIIconButton {...muiProps}>
        {this.props.icon}
      </MUIIconButton>
    );
  }

  private renderBadgedIcon() {
    return (
      <MUIBadge {...this.props.badgeProps}>
        {this.renderIcon()}
      </MUIBadge>

    );
  }

  public render() {
    const {muiProps, qflProps} = buildTheme({
      theme: this.props.theme,
      sourceMuiProps: this.props.muiProps,
      sourceQflProps: this.props.qflProps,
      componentName: 'IconButton',
    });

    let renderedContent = this.renderIcon(muiProps);
    if (this.props.badged) {
      renderedContent = this.renderBadgedIcon();
    }
    return (
      <div {...qflProps}>
        {renderedContent}
      </div>
    );
  }
}

export default IconButton;
