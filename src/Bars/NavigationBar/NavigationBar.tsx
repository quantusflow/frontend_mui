import * as React from 'react';

import Divider from 'material-ui/Divider/index.js';
import MUIDrawer from 'material-ui/Drawer/index.js';

import {buildTheme} from '../../themeBuilder';

import {List, ListItem, makeSelectable} from 'material-ui/List/index.js';

import {IMUIProps} from '../../interfaces';

const SelectableList = makeSelectable(List); // tslint:disable-line variable-name

export interface INestedMenuItem {
  type: string;
  className?: string;
  label?: string;
  path?: string;
  key?: string;
  icon?: React.ReactNode;
  onClick?: Function;
}

export interface IMenuItem {
  type: string;
  nestedItems?: Array<INestedMenuItem>;
  className?: string;
}

export interface INavigationBarProps extends IMUIProps {
  location: { pathname: string };
  menuItems: Array<IMenuItem>;
  onChange: Function;

  listMuiProps?: {};
  dividerMuiProps?: {};
  listItemMuiProps?: {};
  hideBarFill?: boolean;
}

/**
 * Material UI based tool bar
 */
class NavigationBar extends React.Component<INavigationBarProps, {}> {
  public static defaultProps = {
    theme: null,
    muiProps: {},
    qflProps: {},

    listMuiProps: {},
    dividerMuiProps: {},
    listItemMuiProps: {},
    hideBarFill: false,
  };

  constructor(props) {
    super(props);
  }

  private handleOnChange(e, route) {
    if (this.props.onChange) {
      this.props.onChange(e, route);
    }
  }

  public render() {
    const {muiProps, qflProps} = buildTheme({
      theme: this.props.theme,
      sourceMuiProps: this.props.muiProps,
      sourceQflProps: this.props.qflProps,
      componentName: 'NavigationBar',
    });

    const listMuiProps = buildTheme({
      theme: this.props.theme,
      sourceMuiProps: this.props.listMuiProps || {},
      componentName: 'List',
    }).muiProps;

    const dividerMuiProps = buildTheme({
      theme: this.props.theme,
      sourceMuiProps: this.props.dividerMuiProps || {},
      componentName: 'Divider',
    }).muiProps;

    const listItemMuiProps = buildTheme({
      theme: this.props.theme,
      sourceMuiProps: this.props.listItemMuiProps || {},
      componentName: 'ListItem',
    }).muiProps;

    const {location} = this.props;

    let renderedMenu = null;
    if (this.props.menuItems) {
      if (!this.props.hideBarFill) {
        this.props.menuItems.push({
          type: 'fillBar',
        });
      }
      renderedMenu = this.props.menuItems.map((item: IMenuItem, idx) => {
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
                        data-key={nestedElement.key}
                        className={nestedElement.className}
                        primaryText={nestedElement.label}
                        value={nestedElement.path}
                        onClick={nestedElement.onClick}
                        leftIcon={nestedElement.icon}
                      />;
                    default:
                      return null;
                  }
                }).filter((itemToFilter) => (itemToFilter !== null))}
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
