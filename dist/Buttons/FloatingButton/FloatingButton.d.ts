import * as React from 'react';
import { IMUIProps } from '../../interfaces';
export interface IFloatingButtonProps extends IMUIProps {
    icon?: React.ReactNode;
}
/**
 * Material UI based floating action button
 */
declare class FloatingButton extends React.Component<IFloatingButtonProps, {}> {
    static defaultProps: {
        theme: any;
        muiProps: {};
        qflProps: {};
        icon: any;
    };
    constructor();
    render(): any;
}
export default FloatingButton;
