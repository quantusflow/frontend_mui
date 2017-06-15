import React, { PropTypes, Component } from 'react';
import { RaisedButton as MUIRaisedButton } from 'material-ui';

import { buildTheme } from '../../themeBuilder';

import { getMuiTheme } from 'material-ui/styles';

/**
 * Material UI based raised button
 */
class RaisedButton extends Component {
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
            componentName: 'RaisedButton'
        });

        return (
            <div {...qflProps}>
                <MUIRaisedButton {...muiProps}/>
            </div>
        );
    }
}

RaisedButton.childContextTypes = {
    muiTheme: React.PropTypes.object
};

RaisedButton.defaultProps = {
    theme: 'Default',
    muiProps: {},
    qflProps: {}
};

export default RaisedButton;
