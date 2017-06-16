import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    IconButton as MUIIconButton,
    Badge as MUIBadge
} from 'material-ui';

import { buildTheme } from '../../themeBuilder';

import { getMuiTheme } from 'material-ui/styles';

/**
 * Material UI based icon button
 */
class IconButton extends Component {
    static propTypes = {
        /**
         * Pushed as children to MaterialUI component.
         */
        badged: PropTypes.bool,
        /**
         * Forwarded to MaterialUI badge component.
         */
        badgeProps: PropTypes.object,
        /**
         * Pushed as children to MaterialUI component. Use this for the Icon
         */
        icon: PropTypes.node,
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
        qflProps: PropTypes.object
    };

    constructor() {
        super();
    }

    getChildContext() {
        return {
            muiTheme: getMuiTheme(this.props.theme)
        };
    }
    
    renderIcon(muiProps) {
        return (
            <MUIIconButton {...muiProps}>
                {this.props.icon}
            </MUIIconButton>
        );
    }

    renderBadgedIcon() {
        return (
            <MUIBadge {...this.props.badgeProps}>
                {this.renderIcon()}
            </MUIBadge>
            
        );
    }

    render() {
        const { muiProps, qflProps } = buildTheme({
            theme: this.props.theme,
            sourceMuiProps: this.props.muiProps,
            sourceQflProps: this.props.qflProps,
            componentName: 'IconButton'
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

IconButton.childContextTypes = {
    muiTheme: PropTypes.object
};

IconButton.defaultProps = {
    badged: false,
    theme: 'Default',
    icon: null,
    muiProps: {},
    qflProps: {},
    badgeProps: {}
};

export default IconButton;
