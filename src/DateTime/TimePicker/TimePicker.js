import React, { PropTypes, Component } from 'react';
import { TimePicker as MUITimePicker } from 'material-ui';

import { buildTheme } from '../../themeBuilder';

import { getMuiTheme } from 'material-ui/styles';

/**
 * Material UI based data picker
 */
class TimePicker extends Component {
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
            componentName: 'TimePicker'
        });

        return (
            <div {...qflProps}>
                <MUITimePicker {...muiProps}/>
            </div>
        );
    }
}

TimePicker.childContextTypes = {
    muiTheme: React.PropTypes.object
};

TimePicker.defaultProps = {
    theme: 'Default',
    muiProps: {}
};

export default TimePicker;
