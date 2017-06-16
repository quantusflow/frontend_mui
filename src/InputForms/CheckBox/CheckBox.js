import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Checkbox as MUICheckBox } from 'material-ui';

import { buildTheme } from '../../themeBuilder';

import { getMuiTheme } from 'material-ui/styles';

/**
 * Material UI based check box
 */
class CheckBox extends Component {
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
         * Value of the CheckBox.
         */
        value: PropTypes.bool,
        /**
         * Fired when value changes
         */
        onChange: PropTypes.func,
        dataKey: PropTypes.string
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

    componentWillReceiveProps(props, b, c) {
        this.setState({
            currentValue: props.value
        })
    }

    handleChange(e) {
        const oldValue = this.state.currentValue;
        const newValue = !this.state.currentValue;
        this.setState({
            currentValue: newValue
        });
        if (this.props.onChange) {
            this.props.onChange(e, oldValue, newValue, this.props.dataKey);
        }
    }

    render() {
        const { muiProps, qflProps } = buildTheme({
            theme: this.props.theme,
            sourceMuiProps: this.props.muiProps,
            sourceQflProps: this.props.qflProps,
            componentName: 'CheckBox'
        });

        return (
            <div {...qflProps}>
                <MUICheckBox {...muiProps} checked={this.state.currentValue} onCheck={(e) => this.handleChange(e)}/>
            </div>
        );
    }
}

CheckBox.childContextTypes = {
    muiTheme: PropTypes.object
};

CheckBox.defaultProps = {
    theme: 'Default',
    muiProps: {}
};

export default CheckBox;
