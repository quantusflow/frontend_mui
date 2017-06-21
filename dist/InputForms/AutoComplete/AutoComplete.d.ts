import * as React from 'react';
import { IMUIProps } from '../../interfaces';
export interface IAutoCompleteProps extends IMUIProps {
    items: Array<{}>;
    label?: string;
    value?: any;
    onChange?: Function;
}
export interface IAutoCompleteState {
    currentValue?: string;
}
/**
 * Material UI based auto complete drop down menu
 */
declare class AutoComplete extends React.Component<IAutoCompleteProps, IAutoCompleteState> {
    static defaultProps: {
        theme: string;
        muiProps: {};
        qflProps: {};
        label: any;
        value: any;
        onChange: any;
    };
    constructor(props: IAutoCompleteProps);
    private handleChange(chosenRequest, index);
    render(): JSX.Element;
}
export default AutoComplete;
