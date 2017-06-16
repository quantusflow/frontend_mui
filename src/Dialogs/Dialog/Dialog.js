import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dialog as MUIDialog } from 'material-ui';

import { buildTheme } from '../../themeBuilder';

import { getMuiTheme } from 'material-ui/styles';

/**
 * Material UI based modal dialog
 */
class Dialog extends Component {
    static propTypes = {
        children: PropTypes.node,
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

    render() {
        const { children } = this.props;

        const { muiProps, qflProps } = buildTheme({
            theme: this.props.theme,
            sourceMuiProps: this.props.muiProps,
            sourceQflProps: this.props.qflProps,
            componentName: 'Dialog'
        });

        return (
            <div {...qflProps}>
                <MUIDialog {...muiProps}>
                    {children}
                </MUIDialog>
            </div>
        );
    }
}

Dialog.childContextTypes = {
    muiTheme: PropTypes.object
};

Dialog.defaultProps = {
    theme: 'Default',
    muiProps: {},
    qflProps: {}
};

export default Dialog;
