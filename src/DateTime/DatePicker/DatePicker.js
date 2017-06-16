import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DatePicker as MUIDatePicker } from 'material-ui';

import { buildTheme } from '../../themeBuilder';

import { getMuiTheme } from 'material-ui/styles';

/**
 * Material UI based data picker
 */
class DatePicker extends Component {
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
         * Value of the TextField.
         */
        value: PropTypes.string,
        /**
         * Fired when value changes
         */
        onChange: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            currentValue: (props.value && typeof props.value === 'string' ? new Date(props.value) : null)
        }
    }

    getChildContext() {
        return {
            muiTheme: getMuiTheme(this.props.theme)
        };
    }

    handleChange(e, date) {
        const oldValue = this.state.currentValue;
        const newValue = date;
        this.setState({
            currentValue: newValue
        }, () => {
            if (this.props.onChange) {
                this.props.onChange((oldValue ? oldValue.toISOString() : null), (newValue ? newValue.toISOString() : null));
            }
        });
    }

    render() {
        const { muiProps, qflProps } = buildTheme({
            theme: this.props.theme,
            sourceMuiProps: this.props.muiProps,
            sourceQflProps: this.props.qflProps,
            componentName: 'DatePicker'
        });

        return (
            <div {...qflProps}>
                <MUIDatePicker ref="muiField" {...muiProps} value={this.state.currentValue} onChange={(e, date) => this.handleChange(e, date)}/>
            </div>
        );
    }
}

DatePicker.childContextTypes = {
    muiTheme: PropTypes.object
};

DatePicker.defaultProps = {
    theme: 'Default',
    muiProps: {}
};

export default DatePicker;
