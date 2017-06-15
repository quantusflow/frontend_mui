import React, { PropTypes, Component } from 'react';
import { RadioButtonGroup as MUIRadioButtonGroup } from 'material-ui';

import { buildTheme } from '../../themeBuilder';

import { getMuiTheme } from 'material-ui/styles';

/**
 * Material UI based radio button
 */
class RadioBox extends Component {
    static propTypes = {
        /**
         * Pushed as children to MaterialUI component. Use this for RadioButtons
         */
        items: PropTypes.node,
        /**
         * Pushed as children to MaterialUI component. Can also be used for RadioButtons
         */
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
         * Value of the RadioBox.
         */
        value: PropTypes.any,
        /**
         * label for the RadioBox.
         */
        label: PropTypes.string,
    };

    constructor(props) {
        super(props);

        this.state = {
            currentValue: "" + props.value
        }
    }

    getChildContext() {
        return {
            muiTheme: getMuiTheme(this.props.theme)
        };
    }

    handleChange (event, value) {
        const oldValue = this.state.currentValue;
        const newValue = "" + value;

        this.setState({
            currentValue: newValue
        });
        if (this.props.onChange) {
            this.props.onChange(event, oldValue, newValue);
        }
    }

    render() {
        let items = this.props.children;
        if (this.props.items) {
            items = this.props.items;
        }

        const { muiProps, qflProps } = buildTheme({
            theme: this.props.theme,
            sourceMuiProps: this.props.muiProps,
            sourceQflProps: this.props.qflProps,
            componentName: 'RadioBox'
        });

        return (
            <div {...qflProps}>
                <span style={qflProps.labelStyle}>{this.props.label}</span>
                <MUIRadioButtonGroup {...muiProps} valueSelected={this.state.currentValue} onChange={(event, value) => this.handleChange(event, value)}>
                    {items}
                </MUIRadioButtonGroup>
            </div>
        );
    }
}

RadioBox.childContextTypes = {
    muiTheme: React.PropTypes.object
};

RadioBox.defaultProps = {
    items: null,
    theme: 'Default',
    muiProps: {}
};

export default RadioBox;
