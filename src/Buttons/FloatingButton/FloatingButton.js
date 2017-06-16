import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FloatingActionButton as MUIFloatingActionButton } from 'material-ui';

import { buildTheme } from '../../themeBuilder';

import { getMuiTheme } from 'material-ui/styles';

/**
 * Material UI based floating action button
 */
class FloatingButton extends Component {
    static propTypes = {
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
        muiProps: PropTypes.object
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
            componentName: 'FloatingButton'
        });

        return (
            <div {...qflProps}>
                <MUIFloatingActionButton {...muiProps}>
                    {this.props.icon}
                </MUIFloatingActionButton>
            </div>
        );
    }
}

FloatingButton.childContextTypes = {
    muiTheme: PropTypes.object
};

FloatingButton.defaultProps = {
    theme: 'Default',
    icon: null,
    muiProps: {}
};

export default FloatingButton;
