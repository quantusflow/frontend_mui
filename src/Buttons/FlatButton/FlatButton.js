import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FlatButton as MUIFlatButton } from 'material-ui';

import { buildTheme } from '../../themeBuilder';

import { getMuiTheme } from 'material-ui/styles';

/**
 * Material UI based flat button
 */
class FlatButton extends Component {
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
        const { muiProps, qflProps } = buildTheme({
            theme: this.props.theme,
            sourceMuiProps: this.props.muiProps,
            sourceQflProps: this.props.qflProps,
            componentName: 'FlatButton'
        });

        return (
            <div {...qflProps}>
                <MUIFlatButton {...muiProps}/>
            </div>
        );
    }
}

FlatButton.childContextTypes = {
    muiTheme: PropTypes.object
};

FlatButton.defaultProps = {
    theme: 'Default',
    muiProps: {},
    qflProps: {}
};

export default FlatButton;
