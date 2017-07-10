import * as React from 'react';
import { IMUIProps } from '../../interfaces';
export interface IConfirmLayout {
    key: string;
    label: string;
    theme?: string;
    muiProps?: {};
    qflProps?: {};
}
export interface IConfirmProps extends IMUIProps {
    layout: Array<IConfirmLayout>;
    message?: string;
    onChoose?: Function;
}
export interface IConfirmState {
    confirmData?: {};
}
/**
 * Material UI based confirm component
 */
declare class Confirm extends React.Component<IConfirmProps, IConfirmState> {
    static defaultProps: {
        theme: any;
        muiProps: {};
        qflProps: {};
        message: any;
        onChoose: any;
    };
    constructor();
    private handleConfirm(key);
    render(): any;
}
export default Confirm;
