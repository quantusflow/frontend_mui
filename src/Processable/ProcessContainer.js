import React, { PropTypes, Component } from 'react';
import { RaisedButton, Dialog, buildTheme, Form, Confirm } from '../';
import mustache from 'mustache';
import JSONTree from 'react-json-tree'

export default class ProcessContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
    processable: PropTypes.object,
    mbClient: PropTypes.object,
    buttonTheme: PropTypes.object,
    dialogTheme: PropTypes.object,
    modal: PropTypes.bool,
    formItemTheme: PropTypes.object,
    widgetTheme: PropTypes.object,
    confirmItemTheme: PropTypes.object,
    processableClassName: PropTypes.string,
    modalProcessableClassName: PropTypes.string,
    /**
     * Forwarded to MaterialUI component.
     */
    dialogMuiProps: PropTypes.object,
    /**
     * Forwarded to wrapper component.
     */
    qflProps: PropTypes.object,
    dialogQflProps: PropTypes.object,
    /**
     * Applies a given MaterialUI theme.
     */
    theme: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      modalOpen: props.modal,
      formData: {},
      canceled: false,
      processing: false
    };
  }

  componentWillMount() {
    const { processable } = this.props;
    let widget = null;
    let widgetName = null;
    const widgetNameArr = processable.nextTask.extensions.properties.filter((property) => property.name === 'widgetName');

    if (processable.nextTask && processable.nextTask.extensions && processable.nextTask.extensions.properties &&
      widgetNameArr && widgetNameArr.length === 1) {
      widgetName = widgetNameArr[0].value;
      const tokenData = (processable.nextTaskEntity && processable.nextTaskEntity.processToken ? processable.nextTaskEntity.processToken.data : null);
      switch (widgetName) {
        case 'Form': {
          let formElements = [];
          if (processable.nextTask.extensions.formFields && processable.nextTask.extensions.formFields.length > 0) {
            formElements = processable.nextTask.extensions.formFields.map((formField) => {
              let parsedType = null;
              const options = {};
              let formFieldWidgetNameArr;
              let formFieldMuiPropsArr;
              let muiProps = {};

              formFieldMuiPropsArr = formField.formProperties.filter((formFieldProperty) => formFieldProperty.name === 'muiProps');
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
                    options.initialValue = (formField.defaultValue === '1');
                  }
                  break;
                case 'enum':
                  parsedType = 'DropDown';
                  formFieldWidgetNameArr = formField.formProperties.filter((formFieldProperty) => formFieldProperty.name === 'widgetName');
                  if (formField.formProperties && formFieldWidgetNameArr && formFieldWidgetNameArr.length === 1) {
                    parsedType = formFieldWidgetNameArr[0].value;
                  }

                  if (parsedType === 'RadioBox') {
                    options.radioButtonMuiProps = buildTheme({
                      theme: this.props.formItemTheme,
                      sourceMuiProps: {},
                      componentName: 'RadioButton'
                    }).muiProps;
                  }

                  if (formField.formValues && formField.formValues.length > 0) {
                    options.items = formField.formValues.map((formValue) => {
                      const value = formValue.id;
                      const label = formValue.name;
                      if (value && label) {
                        return {
                          value,
                          label
                        };
                      }

                      return null;
                    }).filter((formValue) => (formValue !== null));
                  }
                  if (formField.defaultValue) {
                    options.initialValue = formField.defaultValue;
                  }
                  break;
                default:
                  break;
              }
              if (parsedType) {
                return {
                  theme: this.props.formItemTheme,
                  label: formField.label,
                  type: parsedType,
                  muiProps,
                  key: formField.id,
                  ...options
                };
              }
              return null;
            }).filter((formField) => (formField !== null));
          }

          widget = {
            component: Form,
            isModal: this.props.modal,
            props: {
              theme: this.props.widgetTheme,
              layout: formElements
            }
          };
          break;
        }
        case 'Confirm': {
          const confirmLayoutArr = processable.nextTask.extensions.properties.filter((property) => property.name === 'confirmLayout');
          const confirmMessageArr = processable.nextTask.extensions.properties.filter((property) => property.name === 'confirmMessage');
          let confirmLayout = [];
          let confirmMessage = '';

          let confirmElements = [];
          if (processable.nextTask && processable.nextTask.extensions && processable.nextTask.extensions.properties &&
            confirmMessageArr && confirmLayoutArr.length === 1) {
            confirmLayout = JSON.parse(confirmLayoutArr[0].value);

            confirmElements = confirmLayout.map((element) => {
              const elementObj = {
                theme: this.props.confirmItemTheme,
                key: element.key,
                label: element.label,
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
          if (processable.nextTask && processable.nextTask.extensions && processable.nextTask.extensions.properties &&
            confirmMessageArr && confirmMessageArr.length === 1) {
            confirmMessage = mustache.render(confirmMessageArr[0].value, tokenData);
          }

          widget = {
            component: Confirm,
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

  widgetConfig = null;

  handleCancel() {
    const { processable } = this.props;

    const fireCancel = () => {
      let msg = {};
      if (this.props.mbClient) {
        msg = this.props.mbClient.createMessage({
          action: 'cancel'
        });
      }

      if (this.props.mbClient && processable.taskChannelName) {
        this.props.mbClient.publish(processable.taskChannelName, msg);
        this.setState({
          canceled: true,
          processing: true
        });
      }
    };

    this.setState({
      modalOpen: false
    }, fireCancel);
  }

  handleProceed(tokenData) {
    const { processable } = this.props;

    const fireProceed = () => {
      const msg = this.props.mbClient.createMessage({
        action: 'proceed',
        token: tokenData
      });

      if (this.props.mbClient && processable.taskChannelName) {
        this.props.mbClient.publish(processable.taskChannelName, msg);
        this.setState({
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

  tokenData = null;

  render() {
    const { muiProps, qflProps } = buildTheme({
      theme: this.props.theme,
      sourceMuiProps: this.props.muiProps,
      sourceQflProps: this.props.qflProps,
      componentName: 'Processable'
    });

    const { processable } = this.props;

    let proceedButton = null;
    let cancelButton = null;

    let widget = null;
    if (this.widgetConfig && this.widgetConfig.component && this.widgetConfig.component.name === 'Form') {
      proceedButton = (
        <RaisedButton
          theme={this.props.buttonTheme}
          muiProps={{
            label: 'Weiter',
            primary: true
          }}
          qflProps={{
            onClick: (e) => {
              this.handleProceed({ formData: this.state.formData });
            }
          }}
        />
      );

      if (this.props.modal) {
        cancelButton = (
          <RaisedButton
            theme={this.props.buttonTheme}
            muiProps={{
              label: 'Abbrechen',
              primary: true
            }}
            qflProps={{
              onClick: (e) => {
                this.handleCancel();
              }
            }}
          />
        );
      }

      const onChange = (formData) => {
        this.setState({
          formData
        });
      };
      widget = <this.widgetConfig.component onChange={(formData) => onChange(formData)} {...this.widgetConfig.props}/>;
    } else if (this.widgetConfig && this.widgetConfig.component && this.widgetConfig.component.name === 'Confirm') {
      const onChoose = (key) => {
        const confirmData = {
          key
        };
        this.handleProceed({ confirmData });
      };
      widget = <this.widgetConfig.component onChoose={(key) => onChoose(key)} {...this.widgetConfig.props}/>;
    }

    if (processable) {
      let tokenDataElement = null;
      let tokenData = null;
      if (processable && processable.nextTaskEntity && processable.nextTaskEntity.processToken && processable.nextTaskEntity.processToken.data) {
        tokenData = processable.nextTaskEntity.processToken.data;
      }

      if (tokenData) {
        tokenDataElement = (
          <div
            style={{
              position: 'absolute',
              zIndex: 2,
              display: 'inline-block',
              top: '170px',
              left: '10px',
              padding: '0px'
            }}
          >
            <JSONTree
              hideRoot={true}
              style={{
                padding: '10px !important'
              }}
              data={tokenData}
            />
          </div>
        );
      }

      if (processable.nextTask && !this.state.processing) {
        if (this.props.modal) {
          return (
            <div
              style={{
                display: 'inline-block',
                padding: '10px',
                textAlign: 'left'
              }}
              {...qflProps}
            >
              <Dialog
                theme={this.props.dialogTheme}
                muiProps={{
                  title: processable.nextTask.name,
                  actions: [cancelButton, proceedButton],
                  modal: true,
                  open: this.state.modalOpen,
                  ...this.props.dialogMuiProps
                }}
                qflProps={{
                  ...this.props.dialogQflProps
                }}
              >
                {widget}<br/>
              </Dialog><br/>
              {tokenDataElement}
            </div>
          );
        }

        return (
          <div
            style={{
              padding: '10px'
            }}
            {...qflProps}
          >
            <h4>{processable.nextTask.name}</h4>
            {widget}<br/>
            {proceedButton}<br/>
            {tokenDataElement}
            <hr/>
          </div>
        );
      }

      let processingComponent = (<span>Bitte warten...</span>);
      if (this.state.canceled) {
        processingComponent = null;
      }

      return (
        <div
          style={{
            display: 'table',
            padding: '10px',
            margin: '0 auto'
          }}
          {...qflProps}
        >
          <div
            style={{
              display: 'table-cell',
              textAlign: 'center',
              verticalAlign: 'middle'
            }}
          >
            {processingComponent}
          </div>
          <hr/>
        </div>
      );
    }

    return null;
  }
}
