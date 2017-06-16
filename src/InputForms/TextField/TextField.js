import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TextField as MUITextField } from 'material-ui';

import { buildTheme } from '../../themeBuilder';

import { getMuiTheme } from 'material-ui/styles';

/**
 * Material UI based text field
 */
class TextField extends Component {
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
        value: PropTypes.any,
        /**
         * Fired when value changes
         */
        onChange: PropTypes.func,
        watch: PropTypes.bool
    };

    constructor(props) {
        super(props);

        this.state = {
            currentValue: props.value
        }
    }

    getChildContext() {
        return {
            muiTheme: getMuiTheme(this.props.theme)
        };
    }

    handleChange(e, fireUp) {
        const oldValue = this.state.currentValue;
        const newValue = e.currentTarget.value;
        this.setState({
            currentValue: newValue
        });

        if (this.props.onChange && ((fireUp && !this.props.watch) || (!fireUp && this.props.watch))) {
            this.props.onChange(oldValue, newValue, e);
        }
    }

    render() {
        const { muiProps, qflProps } = buildTheme({
            theme: this.props.theme,
            sourceMuiProps: this.props.muiProps,
            sourceQflProps: this.props.qflProps,
            componentName: 'TextField'
        });

        return (
            <div {...qflProps}>
                <MUITextField ref="muiField" {...muiProps} value={this.state.currentValue} onChange={(e) => this.handleChange(e)} onBlur={(e) => this.handleChange(e, true)}/>
            </div>
        );
    }
}

TextField.childContextTypes = {
    muiTheme: PropTypes.object
};

TextField.defaultProps = {
    theme: 'Default',
    muiProps: {},
    qflProps: {}
};

export default TextField;
