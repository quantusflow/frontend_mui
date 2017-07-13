import * as React from 'react';
import { IMUIProps } from '../../interfaces';
export interface IDatePickerProps extends IMUIProps {
    value?: string;
    onChange?: Function;
}
export interface IDatePickerState {
    currentValue: Date;
}
/**
 * Material UI based data picker
 */
declare class DatePicker extends React.Component<IDatePickerProps, IDatePickerState> {
    static defaultProps: {
        theme: any;
        muiProps: {};
        qflProps: {};
        value: Date;
        onChange: any;
    };
    constructor(props: IDatePickerProps);
    private handleChange(e, date);
    render(): any;
}
export default DatePicker;
