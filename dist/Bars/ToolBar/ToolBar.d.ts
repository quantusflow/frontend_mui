import * as React from 'react';
import { IMUIProps } from '../../interfaces';
export interface IToolBarProps extends IMUIProps {
    items?: React.ReactNode;
}
/**
 * Material UI based tool bar
 */
declare class ToolBar extends React.Component<IToolBarProps, {}> {
    static defaultProps: {
        theme: any;
        muiProps: {};
        qflProps: {};
        items: any;
    };
    constructor();
    render(): any;
}
export default ToolBar;
