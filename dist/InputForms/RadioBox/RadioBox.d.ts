import * as React from 'react';
import RadioButton from './RadioButton';
import { IMUIProps } from '../../interfaces';
export interface IRadioBoxProps extends IMUIProps {
    key: string;
    items?: Array<RadioButton>;
    value?: string;
    label?: string;
    onChange?: Function;
}
export interface IRadioBoxState {
    currentValue?: string;
}
/**
 * Material UI based radio button
 */
declare class RadioBox extends React.Component<IRadioBoxProps, IRadioBoxState> {
    static defaultProps: {
        theme: any;
        muiProps: {};
        qflProps: {};
        items: any;
        value: any;
        label: any;
        onChange: any;
    };
    constructor(props: any);
    private handleChange(event, value);
    render(): JSX.Element;
}
export default RadioBox;
