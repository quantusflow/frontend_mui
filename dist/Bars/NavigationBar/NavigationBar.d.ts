import * as React from 'react';
import { IMUIProps } from '../../interfaces';
export interface INestedMenuItem {
    type: string;
    className?: string;
    label?: string;
    path?: string;
    icon?: React.ReactNode;
}
export interface IMenuItem {
    type: string;
    nestedItems?: Array<INestedMenuItem>;
    className?: string;
}
export interface INavigationBarProps extends IMUIProps {
    location: {
        pathname: string;
    };
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
declare class NavigationBar extends React.Component<INavigationBarProps, {}> {
    defaultProps: {
        theme: string;
        muiProps: {};
        qflProps: {};
        listMuiProps: {};
        dividerMuiProps: {};
        listItemMuiProps: {};
        hideBarFill: boolean;
    };
    constructor();
    private handleOnChange(e, route);
    render(): JSX.Element;
}
export default NavigationBar;
