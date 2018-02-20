import * as React from 'react';

import {Step as MUIStep, StepButton as MUIStepButton, StepLabel as MUIStepLabel, Stepper as MUIStepper} from 'material-ui/Stepper/index.js';
import FlatButton from '../../Buttons/FlatButton/FlatButton';
import Dialog from '../Dialog/Dialog';

import {IMUIProps} from '../../interfaces';
import {buildTheme} from '../../themeBuilder';

export interface IStep {
  stepContent?: React.ReactNode;
  stepProps?: {
      activeContext?: string;
      muiProps?: {}
  };
  slProps?: {
    activeContext?: string;
    muiProps?: {}
  };
  label?: React.ReactNode;
  sbProps?: {
      activeContext?: string;
      muiProps?: {}
  };
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
  dialogTheme?: {};

  title?: string;

  prevLabel?: string;
  nextLabel?: string;
  onNext?: Function;
  doneLabel?: string;
  cancelLabel?: string;

  prevButtonTheme?: {};
  nextButtonTheme?: {};
  doneButtonTheme?: {};
  cancelButtonTheme?: {};

  buttonContainerQflProps?: {};
  prevButtonMuiProps?: {};
  prevButtonQflProps?: {};
  nextButtonMuiProps?: {};
  nextButtonQflProps?: {};
  doneButtonMuiProps?: {};
  doneButtonQflProps?: {};
  cancelButtonMuiProps?: {};
  cancelButtonQflProps?: {};

  maxWidth?: number;

  stepperClassName?: string;
}

export interface IStepperState {
  finished?: boolean;
  stepIndex?: number;
  open?: boolean;
}

/**
 * Material UI based stepper
 */
class Stepper extends React.Component<IStepperProps, IStepperState> {
  public static defaultProps = {
    theme: null,
    muiProps: {},
    qflProps: {},

    isLinear: false,
    isDialog: false,
    isModal: false,
    finishedContent: null,
    onFinish: null,

    onDialogClose: null,
    dialogMuiProps: {},
    dialogQflProps: {},
    dialogTheme: null,

    title: '',

    prevLabel: 'Zurück',
    nextLabel: 'Weiter',
    onNext: null,
    doneLabel: 'Fertig',
    cancelLabel: 'Abbrechen',

    prevButtonTheme: null,
    nextButtonTheme: null,
    doneButtonTheme: null,
    cancelButtonTheme: null,

    buttonContainerQflProps: {},
    prevButtonMuiProps: {},
    prevButtonQflProps: {},
    nextButtonMuiProps: {},
    nextButtonQflProps: {},
    doneButtonMuiProps: {},
    doneButtonQflProps: {},
    cancelButtonMuiProps: {},
    cancelButtonQflProps: {},

    maxWidth: 400,

    stepperClassName: null,
  };

  constructor(props: IStepperProps) {
    super(props);

    this.state = {
      finished: false,
      stepIndex: 0,
      open: props.isDialog,
    };
  }

  private handleNext(): void {
    const {stepIndex} = this.state;
    let continueStep: boolean = true;

    if (this.props.onNext) {
      continueStep = this.props.onNext(stepIndex);
    }

    if (continueStep) {
      this.setState({
        stepIndex: stepIndex + 1,
        finished: stepIndex >= this.props.steps.length - 1,
      });
    }
  }

  private handlePrev() {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  }

  public getStepContent(stepIndex) {
    if (this.props.steps[stepIndex].stepContent) {
      return (
        this.props.steps[stepIndex].stepContent
      );
    }
  }

  private handleClose(buttonClicked) {
    const {stepIndex} = this.state;
    let continueStep: boolean = true;

    if (this.props.onNext && !!buttonClicked) {
      continueStep = this.props.onNext(stepIndex);
    }

    if (continueStep) {
      this.setState({open: false});
      if (this.props.onDialogClose) {
        this.props.onDialogClose(!!buttonClicked);
      }
      if (this.props.onFinish) {
        this.props.onFinish(!!buttonClicked);
      }
    }
  }

  public render() {
    const {finished, stepIndex} = this.state;

    const {isLinear, isModal, isDialog} = this.props;
    const {muiProps, qflProps} = buildTheme({
      theme: this.props.theme,
      sourceMuiProps: this.props.muiProps,
      sourceQflProps: this.props.qflProps,
      componentName: 'Stepper',
    });

    const stepperDialogProps = buildTheme({
        theme: this.props.theme,
        sourceMuiProps: this.props.dialogMuiProps,
        sourceQflProps: this.props.dialogQflProps,
        componentName: 'StepperDialog',
    });

    let cancelButton = null;
    if (this.props.cancelLabel || this.props.cancelLabel !== null) {
      cancelButton = (
        <FlatButton
          theme={{
            ...(this.props.cancelButtonTheme || this.props.theme),
            themeContext: 'cancel',
          }}
          muiProps={{
            label: this.props.cancelLabel,
            onTouchTap: (): void => this.handleClose(false),
            ...this.props.cancelButtonMuiProps,
          }}
          qflProps={{
            ...this.props.cancelButtonQflProps,
          }}
        />
      );
    }

    let currentButton = null;
    if (stepIndex === this.props.steps.length - 1) {
      currentButton = (
        <FlatButton
          theme={{
            ...(this.props.doneButtonTheme || this.props.theme),
            themeContext: 'done',
          }}
          muiProps={{
            label: this.props.doneLabel,
            onTouchTap: (buttonClicked) => this.handleClose(buttonClicked),
            ...this.props.doneButtonMuiProps,
          }}
          qflProps={{
            ...this.props.doneButtonQflProps,
          }}
        />
      );
    } else {
      currentButton = (
        <FlatButton
          theme={{
            ...(this.props.nextButtonTheme || this.props.theme),
            themeContext: 'next',
          }}
          muiProps={{
            label: this.props.nextLabel,
            onTouchTap: () => this.handleNext(),
            ...this.props.nextButtonMuiProps,
          }}
          qflProps={{
            ...this.props.nextButtonQflProps,
          }}
        />
      );
    }

    let stepperContent =
      this.props.steps.map((step: IStep, idx: number) => {
          const slProps = buildTheme({
              theme: this.props.theme,
              sourceMuiProps: step.slProps.muiProps,
              sourceQflProps: {},
              componentName: 'StepLabel' + (this.state.stepIndex === idx ? (step.slProps.activeContext ? ':' + step.slProps.activeContext : ':active') : ''),
          });

          const stepProps = buildTheme({
              theme: this.props.theme,
              sourceMuiProps: step.stepProps.muiProps,
              sourceQflProps: {},
              componentName: 'Step' + (this.state.stepIndex === idx ? (step.stepProps.activeContext ? ':' + step.stepProps.activeContext : ':active') : ''),
          });

          return (
          <MUIStep {...step.stepProps} {...stepProps.muiProps}>
            <MUIStepLabel {...step.slProps} {...slProps.muiProps}>{step.label}</MUIStepLabel>
          </MUIStep>
        );
      });

    if (isLinear) {
      stepperContent =
        this.props.steps.map((step: IStep, idx: number) => {
            const slProps = buildTheme({
                theme: this.props.theme,
                sourceMuiProps: step.slProps.muiProps,
                sourceQflProps: {},
                componentName: 'StepLabel' + (this.state.stepIndex === idx ? (step.slProps.activeContext ? ':' + step.slProps.activeContext : ':active') : ''),
            });

            const stepProps = buildTheme({
                theme: this.props.theme,
                sourceMuiProps: step.stepProps.muiProps,
                sourceQflProps: {},
                componentName: 'Step' + (this.state.stepIndex === idx ? (step.stepProps.activeContext ? ':' + step.stepProps.activeContext : ':active') : ''),
            });

            const sbProps = buildTheme({
              theme: this.props.theme,
              sourceMuiProps: step.sbProps.muiProps,
              sourceQflProps: {},
              componentName: 'StepButton' + (this.state.stepIndex === idx ? (step.sbProps.activeContext ? ':' + step.sbProps.activeContext : ':active') : ''),
            });

            return (
            <MUIStep {...step.stepProps} {...stepProps.muiProps}>
              <MUIStepButton {...step.sbProps} {...sbProps.muiProps}>
                <MUIStepLabel {...step.slProps} {...slProps.muiProps}>{step.label}</MUIStepLabel>
              </MUIStepButton>
            </MUIStep>
          );
        });
    }

    const bcProps = buildTheme({
      theme: this.props.theme,
      sourceMuiProps: {},
      sourceQflProps: this.props.buttonContainerQflProps,
      componentName: 'ButtonContainer',
    });

    let previousButton = (
      <FlatButton
        theme={{
          ...(this.props.prevButtonTheme || this.props.theme),
          themeContext: 'prev',
        }}
        muiProps={{
          label: this.props.prevLabel,
          disabled: (stepIndex === 0),
          onTouchTap: () => this.handlePrev(),
          ...this.props.prevButtonMuiProps,
        }}
        qflProps={{
          ...this.props.prevButtonQflProps,
        }}
      />
    );

    if (stepIndex === 0) {
      previousButton = null;
    }
    const stepper =
      <div {...qflProps} style={{width: '100%'}} className={this.props.stepperClassName}>
        <MUIStepper {...muiProps} activeStep={stepIndex} linear={isLinear}>
          {stepperContent}
        </MUIStepper>
        <div>
          {finished ? (
            this.props.finishedContent
          ) : (
            <div>
              {this.getStepContent(stepIndex)}
              <div {...bcProps.qflProps}>
                {cancelButton}
                {previousButton}
                {currentButton}
              </div>
            </div>
          )}
        </div>
      </div>;

    let currentStepper = null;
    if (isDialog) {
      currentStepper = (
        <Dialog
          theme={this.props.dialogTheme}
          muiProps={{
            ...stepperDialogProps.muiProps,
            title: this.props.title,
            modal: isModal,
            onRequestClose: (buttonClicked) => this.handleClose(buttonClicked),
            open: this.state.open,
          }}
          qflProps={{
            ...stepperDialogProps.qflProps,
          }}
        >
          {stepper}
        </Dialog>
      );
    } else {
      currentStepper = stepper;
    }

    return (
      <div {...qflProps} style={{width: '100%', height: '100%', maxWidth: this.props.maxWidth}}>
        {currentStepper}
      </div>
    );
  }
}

export default Stepper;
