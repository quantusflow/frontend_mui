import * as React from 'react';
import { IMUIProps } from '../../interfaces';
export interface ITimePickerProps extends IMUIProps {
    value?: Date;
    onChange?: Function;
}
export interface ITimePickerState {
    currentValue: Date;
}
/**
 * Material UI based data picker
 */
declare class TimePicker extends React.Component<ITimePickerProps, ITimePickerState> {
    static defaultProps: {
        theme: string;
        muiProps: {};
        qflProps: {};
        value: Date;
        onChange: any;
    };
    constructor(props: ITimePickerProps);
    private handleChange(e, time);
    render(): JSX.Element;
}
export default TimePicker;
