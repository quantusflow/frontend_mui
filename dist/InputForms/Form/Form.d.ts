import * as React from 'react';
import { IMUIProps } from '../../interfaces';
export interface ILayoutItem {
    key: string;
    type: string;
    initialValue?: any;
    nullable?: boolean;
    theme?: string;
    label?: string;
    muiProps?: {};
    qflProps?: {};
    items?: any;
    radioButtonMuiProps?: {};
    keyAttributeName?: string;
}
export interface IFormProps extends IMUIProps {
    item: {};
    layout: Array<ILayoutItem | Array<ILayoutItem>>;
    keyAttributeName?: string;
    dataProvider?: Function;
    onChange?: Function;
}
export interface IFormState {
    formData: any;
}
/**
 * Material UI based Form rendering Material UI based form items
 */
declare class Form extends React.Component<IFormProps, IFormState> {
    static defaultProps: {
        theme: any;
        muiProps: {};
        qflProps: {};
        keyAttributeName: string;
        dataProvider: any;
        onChange: any;
    };
    constructor(props: IFormProps);
    private getFormItemValue(key, keyAttributeName?, items?);
    private handleFormItemChange(type, key, oldValue, newValue, choosenElement?, element?);
    render(): any;
}
export default Form;
