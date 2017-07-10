import * as React from 'react';
import { IMUIProps } from '../../interfaces';
export interface IIconButtonProps extends IMUIProps {
    badged?: boolean;
    badgeProps?: {};
    icon?: React.ReactNode;
}
/**
 * Material UI based icon button
 */
declare class IconButton extends React.Component<IIconButtonProps, {}> {
    static defaultProps: {
        theme: any;
        muiProps: {};
        qflProps: {};
        badged: boolean;
        badgeProps: {};
        icon: any;
    };
    constructor();
    private renderIcon(muiProps?);
    private renderBadgedIcon();
    render(): any;
}
export default IconButton;
