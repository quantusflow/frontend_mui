import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AutoComplete as MUIAutoComplete } from 'material-ui';

import { buildTheme } from '../../themeBuilder';

import { getMuiTheme } from 'material-ui/styles';

/**
 * Material UI based drop down menu
 */
class AutoComplete extends Component {
    static propTypes = {
        /**
         * Pushed as children to MaterialUI component. Use this for MenuItems
         */
        items: PropTypes.array,
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
         * Selectedvalue of the AutoComplete.
         */
        value: PropTypes.any
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

    handleChange (chosenRequest, index) {
        const oldValue = this.state.currentValue;
        const newValue = "" + this.props.items[index];

        this.setState({
            currentValue: newValue
        });
        if (this.props.onChange) {
            this.props.onChange(chosenRequest, index, oldValue, newValue);
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
            componentName: 'AutoComplete'
        });

        return (
            <div {...qflProps}>
                <MUIAutoComplete  {...muiProps} openOnFocus={true} dataSource={items} searchText={this.state.currentValue} onNewRequest={(chosenRequest, index) => this.handleChange(chosenRequest, index)} />
            </div>
        );
    }
}

AutoComplete.childContextTypes = {
    muiTheme: PropTypes.object
};

AutoComplete.defaultProps = {
    items: null,
    theme: 'Default',
    muiProps: {}
};

export default AutoComplete;
