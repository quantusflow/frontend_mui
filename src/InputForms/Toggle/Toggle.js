import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Toggle as MUIToggle } from 'material-ui';

import { buildTheme } from '../../themeBuilder';

import { getMuiTheme } from 'material-ui/styles';

/**
 * Material UI based toggle
 */
class Toggle extends Component {
    static propTypes = {
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
            componentName: 'Toggle'
        });

        return (
            <div {...qflProps}>
                <MUIToggle {...muiProps}/>
            </div>
        );
    }
}

Toggle.childContextTypes = {
    muiTheme: PropTypes.object
};

Toggle.defaultProps = {
    theme: 'Default',
    muiProps: {}
};

export default Toggle;
