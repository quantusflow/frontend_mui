'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _ = require('../');

var _mustache = require('mustache');

var _mustache2 = _interopRequireDefault(_mustache);

var _reactJsonTree = require('react-json-tree');

var _reactJsonTree2 = _interopRequireDefault(_reactJsonTree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProcessContainer = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(ProcessContainer, _Component);

  function ProcessContainer(props) {
    (0, _classCallCheck3.default)(this, ProcessContainer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ProcessContainer.__proto__ || Object.getPrototypeOf(ProcessContainer)).call(this, props));

    _this.widgetConfig = null;
    _this.tokenData = null;


    _this.state = {
      modalOpen: props.modal,
      formData: {},
      canceled: false,
      processing: false
    };
    return _this;
  }

  (0, _createClass3.default)(ProcessContainer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      var processable = this.props.processable;

      var widget = null;
      var widgetName = null;
      var widgetNameArr = processable.nextTask.extensions.properties.filter(function (property) {
        return property.name === 'widgetName';
      });

      if (processable.nextTask && processable.nextTask.extensions && processable.nextTask.extensions.properties && widgetNameArr && widgetNameArr.length === 1) {
        widgetName = widgetNameArr[0].value;
        var tokenData = processable.nextTaskEntity && processable.nextTaskEntity.processToken ? processable.nextTaskEntity.processToken.data : null;
        switch (widgetName) {
          case 'Form':
            {
              var formElements = [];
              if (processable.nextTask.extensions.formFields && processable.nextTask.extensions.formFields.length > 0) {
                formElements = processable.nextTask.extensions.formFields.map(function (formField) {
                  var parsedType = null;
                  var options = {};
                  var formFieldWidgetNameArr = void 0;
                  var formFieldMuiPropsArr = void 0;
                  var muiProps = {};

                  formFieldMuiPropsArr = formField.formProperties.filter(function (formFieldProperty) {
                    return formFieldProperty.name === 'muiProps';
                  });
                  if (formField.formProperties && formFieldMuiPropsArr && formFieldMuiPropsArr.length === 1 && formFieldMuiPropsArr[0].value) {
                    muiProps = JSON.parse(formFieldMuiPropsArr[0].value.replace(/\&\#34\;/gi, '"'));
                  }

                  switch (formField.type) {
                    case 'string':
                      parsedType = 'TextField';
                      break;
                    case 'boolean':
                      parsedType = 'CheckBox';
                      options.initialValue = null;
                      if (formField.defaultValue !== null) {
                        options.initialValue = formField.defaultValue === '1';
                      }
                      break;
                    case 'enum':
                      parsedType = 'DropDown';
                      formFieldWidgetNameArr = formField.formProperties.filter(function (formFieldProperty) {
                        return formFieldProperty.name === 'widgetName';
                      });
                      if (formField.formProperties && formFieldWidgetNameArr && formFieldWidgetNameArr.length === 1) {
                        parsedType = formFieldWidgetNameArr[0].value;
                      }

                      if (parsedType === 'RadioBox') {
                        options.radioButtonMuiProps = (0, _.buildTheme)({
                          theme: _this2.props.formItemTheme,
                          sourceMuiProps: {},
                          componentName: 'RadioButton'
                        }).muiProps;
                      }

                      if (formField.formValues && formField.formValues.length > 0) {
                        options.items = formField.formValues.map(function (formValue) {
                          var value = formValue.id;
                          var label = formValue.name;
                          if (value && label) {
                            return {
                              value: value,
                              label: label
                            };
                          }

                          return null;
                        }).filter(function (formValue) {
                          return formValue !== null;
                        });
                      }
                      if (formField.defaultValue) {
                        options.initialValue = formField.defaultValue;
                      }
                      break;
                    default:
                      break;
                  }
                  if (parsedType) {
                    return (0, _extends3.default)({
                      theme: _this2.props.formItemTheme,
                      label: formField.label,
                      type: parsedType,
                      muiProps: muiProps,
                      key: formField.id
                    }, options);
                  }
                  return null;
                }).filter(function (formField) {
                  return formField !== null;
                });
              }

              widget = {
                component: _.Form,
                isModal: this.props.modal,
                props: {
                  theme: this.props.widgetTheme,
                  layout: formElements
                }
              };
              break;
            }
          case 'Confirm':
            {
              var confirmLayoutArr = processable.nextTask.extensions.properties.filter(function (property) {
                return property.name === 'confirmLayout';
              });
              var confirmMessageArr = processable.nextTask.extensions.properties.filter(function (property) {
                return property.name === 'confirmMessage';
              });
              var confirmLayout = [];
              var confirmMessage = '';

              var confirmElements = [];
              if (processable.nextTask && processable.nextTask.extensions && processable.nextTask.extensions.properties && confirmMessageArr && confirmLayoutArr.length === 1) {
                confirmLayout = JSON.parse(confirmLayoutArr[0].value);

                confirmElements = confirmLayout.map(function (element) {
                  var elementObj = {
                    theme: _this2.props.confirmItemTheme,
                    key: element.key,
                    label: element.label
                  };

                  if (element.isCancel) {
                    elementObj.muiProps = {
                      primary: false,
                      secondary: true
                    };
                  }

                  return elementObj;
                });
              }
              if (processable.nextTask && processable.nextTask.extensions && processable.nextTask.extensions.properties && confirmMessageArr && confirmMessageArr.length === 1) {
                confirmMessage = _mustache2.default.render(confirmMessageArr[0].value, tokenData);
              }

              widget = {
                component: _.Confirm,
                isModal: this.props.modal,
                props: {
                  theme: this.props.widgetTheme,
                  layout: confirmElements,
                  message: confirmMessage
                }
              };
              break;
            }
          default:
            break;
        }
      }

      if (widget) {
        this.widgetConfig = widget;
      }
    }
  }, {
    key: 'handleCancel',
    value: function handleCancel() {
      var _this3 = this;

      var processable = this.props.processable;


      var fireCancel = function fireCancel() {
        var msg = {};
        if (_this3.props.mbClient) {
          msg = _this3.props.mbClient.createMessage({
            action: 'cancel'
          });
        }

        if (_this3.props.mbClient && processable.taskChannelName) {
          _this3.props.mbClient.publish(processable.taskChannelName, msg);
          _this3.setState({
            canceled: true,
            processing: true
          });
        }
      };

      this.setState({
        modalOpen: false
      }, fireCancel);
    }
  }, {
    key: 'handleProceed',
    value: function handleProceed(tokenData) {
      var _this4 = this;

      var processable = this.props.processable;


      var fireProceed = function fireProceed() {
        var msg = _this4.props.mbClient.createMessage({
          action: 'proceed',
          token: tokenData
        });

        if (_this4.props.mbClient && processable.taskChannelName) {
          _this4.props.mbClient.publish(processable.taskChannelName, msg);
          _this4.setState({
            canceled: false,
            processing: true
          });
        }
      };

      if (this.props.modal) {
        this.setState({
          canceled: false,
          modalOpen: false
        }, fireProceed);
      } else {
        fireProceed();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var _buildTheme = (0, _.buildTheme)({
        theme: this.props.theme,
        sourceMuiProps: this.props.muiProps,
        sourceQflProps: this.props.qflProps,
        componentName: 'Processable'
      }),
          muiProps = _buildTheme.muiProps,
          qflProps = _buildTheme.qflProps;

      var processable = this.props.processable;


      var proceedButton = null;
      var cancelButton = null;

      var widget = null;
      if (this.widgetConfig && this.widgetConfig.component && this.widgetConfig.component.name === 'Form') {
        proceedButton = _react2.default.createElement(_.RaisedButton, {
          theme: this.props.buttonTheme,
          muiProps: {
            label: 'Weiter',
            primary: true
          },
          qflProps: {
            onClick: function onClick(e) {
              _this5.handleProceed({ formData: _this5.state.formData });
            }
          }
        });

        if (this.props.modal) {
          cancelButton = _react2.default.createElement(_.RaisedButton, {
            theme: this.props.buttonTheme,
            muiProps: {
              label: 'Abbrechen',
              primary: true
            },
            qflProps: {
              onClick: function onClick(e) {
                _this5.handleCancel();
              }
            }
          });
        }

        var _onChange = function _onChange(formData) {
          _this5.setState({
            formData: formData
          });
        };
        widget = _react2.default.createElement(this.widgetConfig.component, (0, _extends3.default)({ onChange: function onChange(formData) {
            return _onChange(formData);
          } }, this.widgetConfig.props));
      } else if (this.widgetConfig && this.widgetConfig.component && this.widgetConfig.component.name === 'Confirm') {
        var _onChoose = function _onChoose(key) {
          var confirmData = {
            key: key
          };
          _this5.handleProceed({ confirmData: confirmData });
        };
        widget = _react2.default.createElement(this.widgetConfig.component, (0, _extends3.default)({ onChoose: function onChoose(key) {
            return _onChoose(key);
          } }, this.widgetConfig.props));
      }

      if (processable) {
        var tokenDataElement = null;
        var tokenData = null;
        if (processable && processable.nextTaskEntity && processable.nextTaskEntity.processToken && processable.nextTaskEntity.processToken.data) {
          tokenData = processable.nextTaskEntity.processToken.data;
        }

        if (tokenData) {
          tokenDataElement = _react2.default.createElement(
            'div',
            {
              style: {
                position: 'absolute',
                zIndex: 2,
                display: 'inline-block',
                top: '170px',
                left: '10px',
                padding: '0px'
              }
            },
            _react2.default.createElement(_reactJsonTree2.default, {
              hideRoot: true,
              style: {
                padding: '10px !important'
              },
              data: tokenData
            })
          );
        }

        if (processable.nextTask && !this.state.processing) {
          if (this.props.modal) {
            return _react2.default.createElement(
              'div',
              (0, _extends3.default)({
                style: {
                  display: 'inline-block',
                  padding: '10px',
                  textAlign: 'left'
                }
              }, qflProps),
              _react2.default.createElement(
                _.Dialog,
                {
                  theme: this.props.dialogTheme,
                  muiProps: (0, _extends3.default)({
                    title: processable.nextTask.name,
                    actions: [cancelButton, proceedButton],
                    modal: true,
                    open: this.state.modalOpen
                  }, this.props.dialogMuiProps),
                  qflProps: (0, _extends3.default)({}, this.props.dialogQflProps)
                },
                widget,
                _react2.default.createElement('br', null)
              ),
              _react2.default.createElement('br', null),
              tokenDataElement
            );
          }

          return _react2.default.createElement(
            'div',
            (0, _extends3.default)({
              style: {
                padding: '10px'
              }
            }, qflProps),
            _react2.default.createElement(
              'h4',
              null,
              processable.nextTask.name
            ),
            widget,
            _react2.default.createElement('br', null),
            proceedButton,
            _react2.default.createElement('br', null),
            tokenDataElement,
            _react2.default.createElement('hr', null)
          );
        }

        var processingComponent = _react2.default.createElement(
          'span',
          null,
          'Bitte warten...'
        );
        if (this.state.canceled) {
          processingComponent = null;
        }

        return _react2.default.createElement(
          'div',
          (0, _extends3.default)({
            style: {
              display: 'table',
              padding: '10px',
              margin: '0 auto'
            }
          }, qflProps),
          _react2.default.createElement(
            'div',
            {
              style: {
                display: 'table-cell',
                textAlign: 'center',
                verticalAlign: 'middle'
              }
            },
            processingComponent
          ),
          _react2.default.createElement('hr', null)
        );
      }

      return null;
    }
  }]);
  return ProcessContainer;
}(_react.Component), _class.propTypes = {
  children: _react.PropTypes.node,
  processable: _react.PropTypes.object,
  mbClient: _react.PropTypes.object,
  buttonTheme: _react.PropTypes.object,
  dialogTheme: _react.PropTypes.object,
  modal: _react.PropTypes.bool,
  formItemTheme: _react.PropTypes.object,
  widgetTheme: _react.PropTypes.object,
  confirmItemTheme: _react.PropTypes.object,
  processableClassName: _react.PropTypes.string,
  modalProcessableClassName: _react.PropTypes.string,
  /**
   * Forwarded to MaterialUI component.
   */
  dialogMuiProps: _react.PropTypes.object,
  /**
   * Forwarded to wrapper component.
   */
  qflProps: _react.PropTypes.object,
  dialogQflProps: _react.PropTypes.object,
  /**
   * Applies a given MaterialUI theme.
   */
  theme: _react.PropTypes.object
}, _temp);
exports.default = ProcessContainer;
module.exports = exports['default'];
//# sourceMappingURL=ProcessContainer.js.map
