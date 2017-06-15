'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _index = require('../../index');

var _Stepper = require('material-ui/Stepper');

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _themeBuilder = require('../../themeBuilder');

var _styles = require('material-ui/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Material UI based stepper
 */
var Stepper = (_temp = _class = function (_Component) {
    (0, _inherits3.default)(Stepper, _Component);

    function Stepper(props) {
        (0, _classCallCheck3.default)(this, Stepper);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Stepper.__proto__ || Object.getPrototypeOf(Stepper)).call(this, props));

        _this.handleNext = function () {
            var stepIndex = _this.state.stepIndex;

            _this.setState({
                stepIndex: stepIndex + 1,
                finished: stepIndex >= _this.props.steps.length - 1
            });
        };

        _this.handlePrev = function () {
            var stepIndex = _this.state.stepIndex;

            if (stepIndex > 0) {
                _this.setState({ stepIndex: stepIndex - 1 });
            }
        };

        _this.state = {
            finished: false,
            stepIndex: 0,
            open: props.isDialog
        };
        return _this;
    }

    (0, _createClass3.default)(Stepper, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                muiTheme: (0, _styles.getMuiTheme)(this.props.theme)
            };
        }
    }, {
        key: 'getStepContent',
        value: function getStepContent(stepIndex) {
            if (this.props.steps[stepIndex].stepContent) {
                return this.props.steps[stepIndex].stepContent;
            }
        }
    }, {
        key: 'handleClose',
        value: function handleClose(buttonClicked) {
            this.setState({ open: false });
            if (this.props.onDialogClose) {
                this.props.onDialogClose(!!buttonClicked);
            }
            if (this.props.onFinish) {
                this.props.onFinish();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _state = this.state,
                finished = _state.finished,
                stepIndex = _state.stepIndex;
            var _props = this.props,
                children = _props.children,
                isLinear = _props.isLinear,
                isModal = _props.isModal,
                isDialog = _props.isDialog;

            var _buildTheme = (0, _themeBuilder.buildTheme)({
                theme: this.props.theme,
                sourceMuiProps: this.props.muiProps,
                sourceQflProps: this.props.qflProps,
                componentName: 'Stepper'
            }),
                muiProps = _buildTheme.muiProps,
                qflProps = _buildTheme.qflProps;

            var currentButton = null;
            if (stepIndex === this.props.steps.length - 1) {
                currentButton = _react2.default.createElement(_FlatButton2.default, {
                    label: 'Fertig',
                    onTouchTap: function onTouchTap(buttonClicked) {
                        return _this2.handleClose(buttonClicked);
                    },
                    style: { backgroundColor: '#000000', color: '#ffffff' }
                });
            } else {
                currentButton = _react2.default.createElement(_FlatButton2.default, {
                    label: 'Weiter',
                    onTouchTap: this.handleNext,
                    style: { backgroundColor: '#000000', color: '#ffffff' }
                });
            }

            var stepperContent = this.props.steps.map(function (step) {
                return _react2.default.createElement(
                    _Stepper.Step,
                    (0, _extends3.default)({ style: { height: '30px' } }, step.stepProps),
                    _react2.default.createElement(
                        _Stepper.StepLabel,
                        step.slProps,
                        step.label
                    )
                );
            });

            if (isLinear) {
                stepperContent = this.props.steps.map(function (step) {
                    return _react2.default.createElement(
                        _Stepper.Step,
                        { style: { height: '30px' } },
                        _react2.default.createElement(
                            _Stepper.StepButton,
                            step.sbProps,
                            _react2.default.createElement(
                                _Stepper.StepLabel,
                                step.slProps,
                                step.label
                            )
                        )
                    );
                });
            }

            var stepper = _react2.default.createElement(
                'div',
                (0, _extends3.default)({}, qflProps, { style: { width: '100%' } }),
                _react2.default.createElement(
                    _materialUi.Stepper,
                    (0, _extends3.default)({}, muiProps, { activeStep: stepIndex, linear: isLinear }),
                    stepperContent
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    finished ? this.props.finishedContent : _react2.default.createElement(
                        'div',
                        null,
                        this.getStepContent(stepIndex),
                        _react2.default.createElement(
                            'div',
                            { style: { marginTop: 12, textAlign: 'right' } },
                            _react2.default.createElement(_FlatButton2.default, {
                                label: 'Zur\xFCck',
                                disabled: stepIndex === 0,
                                onTouchTap: this.handlePrev,
                                style: { marginRight: 9, backgroundColor: '#000000', color: '#ffffff' }
                            }),
                            currentButton
                        )
                    )
                )
            );

            var currentStepper = null;
            if (isDialog) {
                currentStepper = _react2.default.createElement(
                    _index.Dialog,
                    {
                        theme: this.props.dialogTheme,
                        muiProps: (0, _extends3.default)({
                            title: 'Registration',
                            modal: isModal,
                            onRequestClose: function onRequestClose(buttonClicked) {
                                return _this2.handleClose(buttonClicked);
                            },
                            open: this.state.open
                        }, this.props.dialogMuiProps),
                        qflProps: (0, _extends3.default)({}, this.props.dialogQflProps)
                    },
                    stepper
                );
            } else {
                currentStepper = stepper;
            }

            return _react2.default.createElement(
                'div',
                (0, _extends3.default)({}, qflProps, { style: { width: '100%', height: '100%', maxWidth: 400 } }),
                currentStepper
            );
        }
    }]);
    return Stepper;
}(_react.Component), _class.propTypes = {
    children: _react.PropTypes.node,
    /**
     * Applies a given MaterialUI theme.
     */
    theme: _react.PropTypes.object,
    /**
     * Forwarded to MaterialUI component.
     */
    muiProps: _react.PropTypes.object,
    /**
     * Forwarded to wrapper component.
     */
    qflProps: _react.PropTypes.object,
    /**
     * defines the steps in an array
     */
    steps: _react.PropTypes.array,
    /**
     * default it's true
     */
    isLinear: _react.PropTypes.bool,
    /**
     * when it's true a Dialog will wrap stepper
     */
    isDialog: _react.PropTypes.bool,
    /**
     * when it's true a Dialog cannot be closed
     */
    isModal: _react.PropTypes.bool,
    /**
     * content of stepper when all steps are finished
     */
    finishedContent: _react.PropTypes.any,
    onFinish: _react.PropTypes.func,

    onDialogClose: _react.PropTypes.func,
    dialogMuiProps: _react.PropTypes.any,
    dialogQflProps: _react.PropTypes.any,
    dialogTheme: _react.PropTypes.object
}, _temp);


Stepper.childContextTypes = {
    muiTheme: _react2.default.PropTypes.object
};

Stepper.defaultProps = {
    theme: 'Default',
    muiProps: {},
    qflProps: {}
};

exports.default = Stepper;
module.exports = exports['default'];
//# sourceMappingURL=Stepper.js.map
