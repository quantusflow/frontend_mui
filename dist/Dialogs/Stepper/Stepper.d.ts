import * as React from 'react';
import { IMUIProps } from '../../interfaces';
export interface IStep {
    stepContent?: React.ReactNode;
    stepProps?: {};
    slProps?: {};
    label?: React.ReactNode;
    sbProps?: {};
}
export interface IStepperProps extends IMUIProps {
    steps: Array<IStep>;
    isLinear?: boolean;
    isDialog?: boolean;
    isModal?: boolean;
    finishedContent?: any;
    onFinish?: Function;
    onDialogClose?: Function;
    dialogMuiProps?: {};
    dialogQflProps?: {};
    dialogTheme?: string;
    title?: string;
    prevLabel?: string;
    nextLabel?: string;
    doneLabel?: string;
}
export interface IStepperState {
    finished?: boolean;
    stepIndex?: number;
    open?: boolean;
}
/**
 * Material UI based stepper
 */
declare class Stepper extends React.Component<IStepperProps, IStepperState> {
    static defaultProps: {
        theme: any;
        muiProps: {};
        qflProps: {};
        isLinear: boolean;
        isDialog: boolean;
        isModal: boolean;
        finishedContent: any;
        onFinish: any;
        onDialogClose: any;
        dialogMuiProps: {};
        dialogQflProps: {};
        dialogTheme: any;
        title: string;
        prevLabel: string;
        nextLabel: string;
        doneLabel: string;
    };
    constructor(props: IStepperProps);
    private handleNext();
    private handlePrev();
    private getStepContent(stepIndex);
    private handleClose(buttonClicked);
    render(): JSX.Element;
}
export default Stepper;
