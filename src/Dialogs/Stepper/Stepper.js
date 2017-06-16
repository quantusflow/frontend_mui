import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Stepper as MUIStepper } from 'material-ui';
import Dialog from '../Dialog/Dialog';
import { Step, StepLabel, StepContent, StepButton } from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';

import { buildTheme } from '../../themeBuilder';

import { getMuiTheme } from 'material-ui/styles';

/**
 * Material UI based stepper
 */
class Stepper extends Component {
    static propTypes = {
        children: PropTypes.node,
        /**
         * Applies a given MaterialUI theme.
         */
        theme: PropTypes.object,
        /**
         * Forwarded to MaterialUI component.
         */
        muiProps: PropTypes.object,
        /**
         * Forwarded to wrapper component.
         */
        qflProps: PropTypes.object,
        /**
         * defines the steps in an array
         */
        steps: PropTypes.array,
        /**
         * default it's true
         */
        isLinear: PropTypes.bool,
        /**
         * when it's true a Dialog will wrap stepper
         */
        isDialog: PropTypes.bool,
        /**
         * when it's true a Dialog cannot be closed
         */
        isModal: PropTypes.bool,
        /**
         * content of stepper when all steps are finished
         */
        finishedContent: PropTypes.any,
        onFinish: PropTypes.func,

        onDialogClose: PropTypes.func,
        dialogMuiProps: PropTypes.any,
        dialogQflProps: PropTypes.any,
        dialogTheme: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.state = {
            finished: false,
            stepIndex: 0,
            open: props.isDialog
        };
    }

    getChildContext() {
        return {
            muiTheme: getMuiTheme(this.props.theme)
        };
    }

    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= this.props.steps.length -1,
        });
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    getStepContent(stepIndex) {
        if (this.props.steps[stepIndex].stepContent) {
            return (
                this.props.steps[stepIndex].stepContent
            );
        }
    }

    handleClose(buttonClicked) {
        this.setState({open: false});
        if (this.props.onDialogClose) {
            this.props.onDialogClose(!!buttonClicked);
        }
      if (this.props.onFinish) {
        this.props.onFinish();
      }
    }

    render() {
        const {finished, stepIndex} = this.state;

        const { children, isLinear, isModal, isDialog } = this.props;
        const { muiProps, qflProps } = buildTheme({
            theme: this.props.theme,
            sourceMuiProps: this.props.muiProps,
            sourceQflProps: this.props.qflProps,
            componentName: 'Stepper'
        });

        let currentButton = null;
        if (stepIndex === this.props.steps.length -1) {
            currentButton = <FlatButton
              label= {'Fertig'}
              onTouchTap={(buttonClicked) => this.handleClose(buttonClicked)}
              style={{backgroundColor: '#000000', color: '#ffffff'}}
            />
        } else {
            currentButton = <FlatButton
              label={'Weiter'}
              onTouchTap={this.handleNext}
              style={{backgroundColor: '#000000', color: '#ffffff'}}
            />
        }

        let stepperContent =
            this.props.steps.map((step) => {
                return (
                    <Step style={{height: '30px'}} {...step.stepProps}>
                        <StepLabel {...step.slProps}>{step.label}</StepLabel>
                    </Step>
                )
            });

        if (isLinear) {
            stepperContent =
                this.props.steps.map((step) => {
                    return (
                        <Step style={{height: '30px'}}>
                            <StepButton {...step.sbProps}>
                                <StepLabel {...step.slProps}>{step.label}</StepLabel>
                            </StepButton>
                        </Step>
                    )
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
                                    //TODO style buttons with props
                                }
                                <div style={{marginTop: 12, textAlign: 'right'}}>
                                    <FlatButton
                                        label="Zurück"
                                        disabled={stepIndex === 0}
                                        onTouchTap={this.handlePrev}
                                        style={{marginRight: 9, backgroundColor: '#000000', color: '#ffffff'}}
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
                        title: 'Registration',
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
            <div {...qflProps} style={{width: '100%',  height: '100%', maxWidth: 400}}>
                {currentStepper}
            </div>
        );
    }
}

Stepper.childContextTypes = {
    muiTheme: PropTypes.object
};

Stepper.defaultProps = {
    theme: 'Default',
    muiProps: {},
    qflProps: {}
};

export default Stepper;
