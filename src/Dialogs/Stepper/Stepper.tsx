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
    doneLabel: 'Fertig',
  };

  constructor(props: IStepperProps) {
    super(props);

    this.state = {
      finished: false,
      stepIndex: 0,
      open: props.isDialog,
    };
  }

  private handleNext() {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= this.props.steps.length - 1,
    });
  }

  private handlePrev() {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  }

  private getStepContent(stepIndex) {
    if (this.props.steps[stepIndex].stepContent) {
      return (
        this.props.steps[stepIndex].stepContent
      );
    }
  }

  private handleClose(buttonClicked) {
    this.setState({open: false});
    if (this.props.onDialogClose) {
      this.props.onDialogClose(!!buttonClicked);
    }
    if (this.props.onFinish) {
      this.props.onFinish();
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

    let currentButton = null;
    if (stepIndex === this.props.steps.length - 1) {
      currentButton = (
        <FlatButton
          muiProps={{
            label: this.props.doneLabel,
            onTouchTap: (buttonClicked) => this.handleClose(buttonClicked),
            style: {
              backgroundColor: '#000000',
              color: '#ffffff',
              width: '8vw',
              fontFamily: 'Open Sans Condensed Bold',
              minWidth: '4.4vw',
              height: '1.6vw',
              lineHeight: '1.6vw',
              border: '0.5vw',
              borderRadius: '0vw',
            },
          }}
        />
      );
    } else {
      currentButton = (
        <FlatButton
          muiProps={{
            label: this.props.nextLabel,
            onTouchTap: () => this.handleNext(),
            style: {
              backgroundColor: '#000000',
              color: '#ffffff',
              width: '8vw',
              fontFamily: 'Open Sans Condensed Bold',
              minWidth: '4.4vw',
              height: '1.6vw',
              lineHeight: '1.6vw',
              border: '0.5vw',
              borderRadius: '0vw',
            },
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

    const stepper =
      <div {...qflProps} style={{width: '100%'}}>
        <MUIStepper {...muiProps} activeStep={stepIndex} linear={isLinear}>
          {stepperContent}
        </MUIStepper>
        <div>
          {finished ? (
            this.props.finishedContent
          ) : (
            <div>
              {this.getStepContent(stepIndex)}
              {
                // TODO style buttons with props
              }
              <div style={{marginTop: 12, textAlign: 'right', display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                <FlatButton
                  muiProps={{
                    label: this.props.prevLabel,
                    disabled: (stepIndex === 0),
                    onTouchTap: () => this.handlePrev(),
                    style: {
                      marginRight: '0.45vw',
                      backgroundColor: '#000000',
                      color: '#ffffff',
                      width: '8vw',
                      fontFamily: 'Open Sans Condensed Bold',
                      minWidth: '4.4vw',
                      height: '1.6vw',
                      lineHeight: '1.6vw',
                      border: '0.5vw',
                      borderRadius: '0vw',
                    },
                  }}
                />
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
      <div {...qflProps} style={{width: '100%', height: '100%', maxWidth: 400}}>
        {currentStepper}
      </div>
    );
  }
}

export default Stepper;
