import React, { PropTypes, Component } from 'react';
import { Drawer as MUIDrawer, Divider} from 'material-ui';

import { buildTheme } from '../../themeBuilder';
import { getMuiTheme } from 'material-ui/styles';

import { List, ListItem, makeSelectable } from 'material-ui/List';
const SelectableList = makeSelectable(List);

/**
 * Material UI based tool bar
 */
class NavigationBar extends Component {
    static propTypes = {
        /**
         * Location for selecting the right item based on route
         */
        location: PropTypes.object.isRequired,
        /**
         * Pushed to MaterialUI component. Use this for setup menu
         */
        menuItems: PropTypes.array.isRequired,
        /**
         * Fires when list item is clicked
         */
        onChange: PropTypes.func.isRequired,
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
        listMuiProps: PropTypes.object,
        dividerMuiProps: PropTypes.object,
        listItemMuiProps: PropTypes.object,
        hideBarFill: PropTypes.bool
    };

    static childContextTypes = {
        muiTheme: React.PropTypes.object
    };

    static defaultProps = {
        theme: 'Default',
        muiProps: {},
        qflProps: {}
    };

    constructor() {
        super();
    }

    getChildContext() {
        return {
            muiTheme: getMuiTheme(this.props.theme)
        };
    }

    handleOnChange(e, route) {
        if (this.props.onChange) {
            this.props.onChange(e, route);
        }
    }

    render() {
        const { muiProps, qflProps } = buildTheme({
            theme: this.props.theme,
            sourceMuiProps: this.props.muiProps,
            sourceQflProps: this.props.qflProps,
            componentName: 'NavigationBar'
        });

        const listMuiProps = buildTheme({
            theme: this.props.theme,
            sourceMuiProps: this.props.listMuiProps || {},
            componentName: 'List'
        }).muiProps;

        const dividerMuiProps = buildTheme({
            theme: this.props.theme,
            sourceMuiProps: this.props.dividerMuiProps || {},
            componentName: 'Divider'
        }).muiProps;

        const listItemMuiProps = buildTheme({
            theme: this.props.theme,
            sourceMuiProps: this.props.listItemMuiProps || {},
            componentName: 'ListItem'
        }).muiProps;

        const { location } = this.props;

        let renderedMenu = null;
        if (this.props.menuItems) {
            if (!this.props.hideBarFill) {
                this.props.menuItems.push({
                    type: 'fillBar'
                });
            }
            renderedMenu = this.props.menuItems.map((item, idx) => {
                switch (item.type) {
                    case 'List':
                        const nestedElements = (item.nestedItems || []);
                        return (
                            <SelectableList
                                key={idx}
                                className={item.className}
                                value={location.pathname}
                                onChange={(e, route) => this.handleOnChange(e, route)}
                                {...listMuiProps}
                            >
                                {nestedElements.map((nestedElement, nestedIdx) => {
                                    switch (nestedElement.type) {
                                        case 'ListItem':
                                            return <ListItem
                                                       key={nestedIdx}
                                                       {...listItemMuiProps}
                                                       className={nestedElement.className}
                                                       primaryText={nestedElement.label}
                                                       value={nestedElement.path}
                                                       leftIcon={nestedElement.icon}
                                            />;
                                        default:
                                            return null;
                                    }
                                }).filter((item) => (item !== null))}
                            </SelectableList>
                        );
                    case 'Divider':
                        return <Divider key={idx} {...dividerMuiProps}/>;
                    case 'fillBar':
                        return <div key={idx} style={qflProps.barFillStyle}/>;
                    default:
                        return null;
                }
            }).filter((item) => (item !== null));
        }

        return (
            <div {...qflProps}>
                <MUIDrawer {...muiProps} open={true} docked={true}>
                    {renderedMenu}
                </MUIDrawer>
            </div>
        );
    }
}

export default NavigationBar;
