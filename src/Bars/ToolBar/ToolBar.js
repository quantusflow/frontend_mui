import React, { PropTypes, Component } from 'react';
import { Toolbar as MUIToolBar } from 'material-ui/Toolbar';

import { buildTheme } from '../../themeBuilder';

import { getMuiTheme } from 'material-ui/styles';

/**
 * Material UI based tool bar
 */
class ToolBar extends Component {
    static propTypes = {
        /**
         * Pushed as children to MaterialUI component. Use this for ToolbarGroups
         */
        items: PropTypes.node,
        /**
         * Pushed as children to MaterialUI component. Can also be used for ToolbarGroups
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
            componentName: 'ToolBar'
        });

        let items = this.props.children;
        if (this.props.items) {
            items = this.props.items;
        }

        return (
            <div {...qflProps}>
                <MUIToolBar {...muiProps}>
                    {items}
                </MUIToolBar>
            </div>
        );
    }
}

ToolBar.childContextTypes = {
    muiTheme: React.PropTypes.object
};

ToolBar.defaultProps = {
    theme: 'Default',
    muiProps: {},
    qflProps: {}
};

export default ToolBar;
