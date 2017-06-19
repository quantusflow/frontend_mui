import * as React from 'react';
import { IMUIProps } from '../../interfaces';
export interface ICheckBoxProps extends IMUIProps {
    dataKey: string;
    value?: boolean;
    onChange?: Function;
}
export interface ICheckBoxState {
    currentValue?: boolean;
}
/**
 * Material UI based check box
 */
declare class CheckBox extends React.Component<ICheckBoxProps, ICheckBoxState> {
    defaultProps: {
        theme: string;
        muiProps: {};
        qflProps: {};
        value: boolean;
        onChange: any;
    };
    constructor(props: ICheckBoxProps);
    protected componentWillReceiveProps(props: any, b: any, c: any): void;
    private handleChange(e);
    render(): JSX.Element;
}
export default CheckBox;
