"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var index_js_1 = require("material-ui/Stepper/index.js");
var Dialog_1 = require("../Dialog/Dialog");
var FlatButton_1 = require("../../Buttons/FlatButton/FlatButton");
var themeBuilder_1 = require("../../themeBuilder");
var Stepper = (function (_super) {
    __extends(Stepper, _super);
    function Stepper(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            finished: false,
            stepIndex: 0,
            open: props.isDialog
        };
        return _this;
    }
    Stepper.prototype.handleNext = function () {
        var stepIndex = this.state.stepIndex;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= this.props.steps.length - 1
        });
    };
    Stepper.prototype.handlePrev = function () {
        var stepIndex = this.state.stepIndex;
        if (stepIndex > 0) {
            this.setState({ stepIndex: stepIndex - 1 });
        }
    };
    Stepper.prototype.getStepContent = function (stepIndex) {
        if (this.props.steps[stepIndex].stepContent) {
            return (this.props.steps[stepIndex].stepContent);
        }
    };
    Stepper.prototype.handleClose = function (buttonClicked) {
        this.setState({ open: false });
        if (this.props.onDialogClose) {
            this.props.onDialogClose(!!buttonClicked);
        }
        if (this.props.onFinish) {
            this.props.onFinish();
        }
    };
    Stepper.prototype.render = function () {
        var _this = this;
        var _a = this.state, finished = _a.finished, stepIndex = _a.stepIndex;
        var _b = this.props, isLinear = _b.isLinear, isModal = _b.isModal, isDialog = _b.isDialog;
        var _c = themeBuilder_1.buildTheme({
            theme: this.props.theme,
            sourceMuiProps: this.props.muiProps,
            sourceQflProps: this.props.qflProps,
            componentName: 'Stepper'
        }), muiProps = _c.muiProps, qflProps = _c.qflProps;
        var stepperDialogProps = themeBuilder_1.buildTheme({
            theme: this.props.theme,
            sourceMuiProps: this.props.dialogMuiProps,
            sourceQflProps: this.props.dialogQflProps,
            componentName: 'StepperDialog'
        });
        var currentButton = null;
        if (stepIndex === this.props.steps.length - 1) {
            currentButton = (React.createElement(FlatButton_1.default, { muiProps: {
                    label: this.props.doneLabel,
                    onTouchTap: function (buttonClicked) { return _this.handleClose(buttonClicked); },
                    style: {
                        backgroundColor: '#000000',
                        color: '#ffffff',
                        width: '8vw',
                        fontFamily: 'Open Sans Condensed Bold',
                        minWidth: '4.4vw',
                        height: '1.6vw',
                        lineHeight: '1.6vw',
                        border: '0.5vw',
                        borderRadius: '0vw'
                    }
                } }));
        }
        else {
            currentButton = (React.createElement(FlatButton_1.default, { muiProps: {
                    label: this.props.nextLabel,
                    onTouchTap: function () { return _this.handleNext(); },
                    style: {
                        backgroundColor: '#000000',
                        color: '#ffffff',
                        width: '8vw',
                        fontFamily: 'Open Sans Condensed Bold',
                        minWidth: '4.4vw',
                        height: '1.6vw',
                        lineHeight: '1.6vw',
                        border: '0.5vw',
                        borderRadius: '0vw'
                    }
                } }));
        }
        var stepperContent = this.props.steps.map(function (step, idx) {
            var slProps = themeBuilder_1.buildTheme({
                theme: _this.props.theme,
                sourceMuiProps: step.slProps.muiProps,
                sourceQflProps: {},
                componentName: 'StepLabel' + (_this.state.stepIndex === idx ? (step.slProps.activeContext ? ':' + step.slProps.activeContext : ':active') : '')
            });
            var stepProps = themeBuilder_1.buildTheme({
                theme: _this.props.theme,
                sourceMuiProps: step.stepProps.muiProps,
                sourceQflProps: {},
                componentName: 'Step' + (_this.state.stepIndex === idx ? (step.stepProps.activeContext ? ':' + step.stepProps.activeContext : ':active') : '')
            });
            return (React.createElement(index_js_1.Step, __assign({}, step.stepProps, stepProps.muiProps),
                React.createElement(index_js_1.StepLabel, __assign({}, step.slProps, slProps.muiProps), step.label)));
        });
        if (isLinear) {
            stepperContent =
                this.props.steps.map(function (step, idx) {
                    var slProps = themeBuilder_1.buildTheme({
                        theme: _this.props.theme,
                        sourceMuiProps: step.slProps.muiProps,
                        sourceQflProps: {},
                        componentName: 'StepLabel' + (_this.state.stepIndex === idx ? (step.slProps.activeContext ? ':' + step.slProps.activeContext : ':active') : '')
                    });
                    var stepProps = themeBuilder_1.buildTheme({
                        theme: _this.props.theme,
                        sourceMuiProps: step.stepProps.muiProps,
                        sourceQflProps: {},
                        componentName: 'Step' + (_this.state.stepIndex === idx ? (step.stepProps.activeContext ? ':' + step.stepProps.activeContext : ':active') : '')
                    });
                    var sbProps = themeBuilder_1.buildTheme({
                        theme: _this.props.theme,
                        sourceMuiProps: step.sbProps.muiProps,
                        sourceQflProps: {},
                        componentName: 'StepButton' + (_this.state.stepIndex === idx ? (step.sbProps.activeContext ? ':' + step.sbProps.activeContext : ':active') : '')
                    });
                    return (React.createElement(index_js_1.Step, __assign({}, step.stepProps, stepProps.muiProps),
                        React.createElement(index_js_1.StepButton, __assign({}, step.sbProps, sbProps.muiProps),
                            React.createElement(index_js_1.StepLabel, __assign({}, step.slProps, slProps.muiProps), step.label))));
                });
        }
        var stepper = React.createElement("div", __assign({}, qflProps, { style: { width: '100%' } }),
            React.createElement(index_js_1.Stepper, __assign({}, muiProps, { activeStep: stepIndex, linear: isLinear }), stepperContent),
            React.createElement("div", null, finished ? (this.props.finishedContent) : (React.createElement("div", null,
                this.getStepContent(stepIndex),
                React.createElement("div", { style: { marginTop: 12, textAlign: 'right', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' } },
                    React.createElement(FlatButton_1.default, { muiProps: {
                            label: this.props.prevLabel,
                            disabled: (stepIndex === 0),
                            onTouchTap: function () { return _this.handlePrev(); },
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
                                borderRadius: '0vw'
                            }
                        } }),
                    currentButton)))));
        var currentStepper = null;
        if (isDialog) {
            currentStepper = (React.createElement(Dialog_1.default, { theme: this.props.dialogTheme, muiProps: __assign({}, stepperDialogProps.muiProps, { title: this.props.title, modal: isModal, onRequestClose: function (buttonClicked) { return _this.handleClose(buttonClicked); }, open: this.state.open }), qflProps: __assign({}, stepperDialogProps.qflProps) }, stepper));
        }
        else {
            currentStepper = stepper;
        }
        return (React.createElement("div", __assign({}, qflProps, { style: { width: '100%', height: '100%', maxWidth: 400 } }), currentStepper));
    };
    Stepper.defaultProps = {
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
    return Stepper;
}(React.Component));
exports.default = Stepper;

//# sourceMappingURL=Stepper.js.map
