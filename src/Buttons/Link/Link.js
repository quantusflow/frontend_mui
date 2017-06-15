import React, { PropTypes, Component } from 'react';

import { IndexLink } from 'react-router';
import clone from 'clone';
import extend from 'extend';

import { buildTheme } from '../../themeBuilder';

import { getMuiTheme } from 'material-ui/styles';

/**
 * Material UI based link
 */
class Link extends Component {
    static propTypes = {
        /**
         * Applies a given MaterialUI theme.
         */
        theme: PropTypes.object,
        /**
         * Forwarded to MaterialUI component.
         */
        muiProps: PropTypes.object,
        /**
         * Forwarded to wrapper component.
         */
        qflProps: PropTypes.object,
        /**
         * style for the anchor element.
         */
        linkStyle: PropTypes.object,
        /**
         * style for the embedded span element.
         */
        labelStyle: PropTypes.object,
        /**
         * url target with IndexLink behaviour
         */
        to: PropTypes.string,
        /**
         * url target with default behaviour
         */
        href: PropTypes.string,
        /**
         * link text
         */
        label: PropTypes.string
    };

    constructor() {
        super();
    }

    getChildContext() {
        return {
            muiTheme: getMuiTheme(this.props.theme)
        };
    }

    render() {
        const { muiProps, qflProps } = buildTheme({
            theme: this.props.theme,
            sourceMuiProps: this.props.muiProps,
            sourceQflProps: this.props.qflProps,
            componentName: 'Link'
        });

        const targetObj = { href: this.props.href };

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

Link.childContextTypes = {
    muiTheme: React.PropTypes.object
};

Link.defaultProps = {
    theme: 'Default',
    qflProps: {},
    muiProps: {},
    href: '#',
    to: null,
    label: '',
    linkStyle: {},
    labelStyle: {}
};

export default Link;
