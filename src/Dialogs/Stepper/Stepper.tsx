import * as React from 'react';

import {Stepper as MUIStepper, Step as MUIStep, StepLabel as MUIStepLabel, StepButton as MUIStepButton} from 'material-ui/Stepper/index.js';
import Dialog from '../Dialog/Dialog';
import FlatButton from '../../Buttons/FlatButton/FlatButton';

import {buildTheme} from '../../themeBuilder';
import {IMUIProps} from '../../interfaces';

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
    doneLabel: 'Fertig'
  };

  constructor(props: IStepperProps) {
    super(props);

    this.state = {
      finished: false,
      stepIndex: 0,
      open: props.isDialog
    };
  }

  private handleNext() {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= this.props.steps.length - 1
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
      componentName: 'Stepper'
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
              color: '#ffffff'}
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
              color: '#ffffff'}
          }}
        />
      );
    }

    let stepperContent =
      this.props.steps.map((step: IStep) => {
        return (
          <MUIStep style={{height: '30px'}} {...step.stepProps}>
            <MUIStepLabel {...step.slProps}>{step.label}</MUIStepLabel>
          </MUIStep>
        );
      });

    if (isLinear) {
      stepperContent =
        this.props.steps.map((step: IStep) => {
          return (
            <MUIStep style={{height: '30px'}}>
              <MUIStepButton {...step.sbProps}>
                <MUIStepLabel {...step.slProps}>{step.label}</MUIStepLabel>
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
                      marginRight: 9,
                      backgroundColor: '#000000',
                      color: '#ffffff'}
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
            title: this.props.title,
            modal: isModal,
            onRequestClose: (buttonClicked) => this.handleClose(buttonClicked),
            open: this.state.open,
            ...this.props.dialogMuiProps
          }}
          qflProps={{
            ...this.props.dialogQflProps
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
