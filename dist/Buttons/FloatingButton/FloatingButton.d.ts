import * as React from 'react';
import { IMUIProps } from '../../interfaces';
export interface IFloatingButtonProps extends IMUIProps {
    icon?: React.ReactNode;
}
/**
 * Material UI based floating action button
 */
declare class FloatingButton extends React.Component<IFloatingButtonProps, {}> {
    defaultProps: {
        theme: string;
        muiProps: {};
        qflProps: {};
        icon: any;
    };
    constructor();
    render(): JSX.Element;
}
export default FloatingButton;
