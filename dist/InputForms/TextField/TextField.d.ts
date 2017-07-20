import * as React from 'react';
import { IMUIProps } from '../../interfaces';
export interface ITextFieldProps extends IMUIProps {
    value?: string;
    watch?: boolean;
    onChange?: Function;
}
export interface ITextFieldState {
    currentValue?: string;
}
/**
 * Material UI based text field
 */
declare class TextField extends React.Component<ITextFieldProps, ITextFieldState> {
    static defaultProps: {
        theme: any;
        muiProps: {};
        qflProps: {};
        value: any;
        watch: boolean;
        onChange: any;
    };
    constructor(props: any);
    private handleChange(e, fireUp?);
    getCurrentValue(): string;
    render(): JSX.Element;
}
export default TextField;
