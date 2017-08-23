import * as React from 'react';
import { IMUIProps } from '../../interfaces';
export interface IDropDownProps extends IMUIProps {
    items?: React.ReactNode;
    value?: any;
    label?: string;
    onChange?: Function;
}
export interface IDropDownState {
    currentValue: any;
}
/**
 * Material UI based drop down menu
 */
declare class DropDown extends React.Component<IDropDownProps, IDropDownState> {
    static defaultProps: {
        theme: any;
        muiProps: {};
        qflProps: {};
        items: any;
        value: any;
        label: any;
        onChange: any;
    };
    constructor(props: IDropDownProps);
    private handleChange(event, index, value);
    render(): JSX.Element;
}
export default DropDown;
