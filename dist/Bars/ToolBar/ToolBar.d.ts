import * as React from 'react';
import { IMUIProps } from '../../interfaces';
export interface IToolBarProps extends IMUIProps {
    items?: React.ReactNode;
}
/**
 * Material UI based tool bar
 */
declare class ToolBar extends React.Component<IToolBarProps, {}> {
    defaultProps: {
        theme: string;
        muiProps: {};
        qflProps: {};
        items: any;
    };
    constructor();
    render(): JSX.Element;
}
export default ToolBar;
