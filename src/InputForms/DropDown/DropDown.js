import React, { PropTypes, Component } from 'react';
import { DropDownMenu as MUIDropDownMenu } from 'material-ui';

import { buildTheme } from '../../themeBuilder';

import { getMuiTheme } from 'material-ui/styles';

/**
 * Material UI based drop down menu
 */
class DropDown extends Component {
    static propTypes = {
        /**
         * Pushed as children to MaterialUI component. Use this for MenuItems
         */
        items: PropTypes.node,
        /**
         * Pushed as children to MaterialUI component. Can also be used for MenuItems
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
         * label for the Dropdown.
         */
        label: PropTypes.string,
        /**
         * Selectedvalue of the DropDown.
         */
        value: PropTypes.any
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

    handleChange (event, index, value) {
        const oldValue = this.state.currentValue;
        const newValue = value;

        this.setState({
            currentValue: newValue
        });
        if (this.props.onChange) {
            this.props.onChange(event, index, oldValue, newValue);
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
            componentName: 'DropDown'
        });

        return (
            <div {...qflProps}>
                <span style={qflProps.labelStyle}>{this.props.label}</span>
                <MUIDropDownMenu  {...muiProps} value={this.state.currentValue} onChange={(event, index, value) => this.handleChange(event, index, value)} >
                    {items}
                </MUIDropDownMenu>
            </div>
        );
    }
}

DropDown.childContextTypes = {
    muiTheme: React.PropTypes.object
};

DropDown.defaultProps = {
    items: null,
    theme: 'Default',
    muiProps: {}
};

export default DropDown;
