import * as React from 'react';

import {IndexLink} from 'react-router';
import clone from 'clone';
import extend from 'extend';

import {buildTheme} from '../../themeBuilder';
import {IMUIProps} from '../../interfaces';

export interface ILinkProps extends IMUIProps {
  linkStyle?: {};
  labelStyle?: {};
  label?: string;
  to?: string;
  href?: string;
}

/**
 * Material UI based link
 */
class Link extends React.Component<ILinkProps, {}> {
  public defaultProps = {
    theme: 'Default',
    qflProps: {},
    muiProps: {},

    linkStyle: {},
    labelStyle: {},
    label: '',
    to: null,
    href: '#'
  };

  constructor() {
    super();
  }

  public render() {
    const {muiProps, qflProps} = buildTheme({
      theme: this.props.theme,
      sourceMuiProps: this.props.muiProps,
      sourceQflProps: this.props.qflProps,
      componentName: 'Link'
    });

    const targetObj: { href?: string, to?: string } = {href: this.props.href};

    let linkComponent = (
      <a style={extend(clone(muiProps.linkStyle, false), this.props.linkStyle)} {...targetObj}>
                <span style={extend(clone(muiProps.labelStyle, false), this.props.labelStyle)}>
                    {this.props.label}
                </span>
      </a>
    );

    if (this.props.to) {
      delete targetObj.href;
      targetObj.to = this.props.to;
      linkComponent = (
        <IndexLink style={extend(clone(muiProps.linkStyle, false), this.props.linkStyle)} {...targetObj}>
                    <span style={extend(clone(muiProps.labelStyle, false), this.props.labelStyle)}>
                        {this.props.label}
                    </span>
        </IndexLink>
      );
    }

    return (
      <div {...qflProps}>
        {linkComponent}
      </div>
    );
  }
}

export default Link;
