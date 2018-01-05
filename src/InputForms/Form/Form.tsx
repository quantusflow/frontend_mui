import * as React from 'react';

import DatePicker from '../../DateTime/DatePicker/DatePicker';
import AutoComplete from '../AutoComplete/AutoComplete';
import CheckBox from '../CheckBox/CheckBox';
import DropDown from '../DropDown/DropDown';
import RadioBox from '../RadioBox/RadioBox';
import TextField from '../TextField/TextField';

import {MenuItem as MUIMenuItem} from 'material-ui/DropDownMenu/index.js';
import RadioButton from '../RadioBox/RadioButton';

import CheckedIcon from 'material-ui/svg-icons/toggle/radio-button-checked.js';
import UncheckedIcon from 'material-ui/svg-icons/toggle/radio-button-unchecked.js';

import {IMUIProps} from '../../interfaces';
import {buildTheme} from '../../themeBuilder';

export interface ILayoutItem {
  key: string;
  type: string;
  itemComponentClass?: any;
  itemComponentProps?: any;
  initialValue?: any;
  nullable?: boolean;

  theme?: string;
  label?: string;
  muiProps?: {};
  autoCompleteMuiProps?: {};
  radioButtonMuiProps?: {};
  qflProps?: {};
  autoCompleteQflProps?: {};
  radioButtonQflProps?: {};

  items?: any;
  itemMapper?: Function;
  keyAttributeName?: string;

  noFilter?: boolean;

  dataFetcher?(searchText: string, autoCompleteComponent: React.Component<{}, {}>): Promise<Array<any>>;
  validate?(value: any, formData: any): { errorMessage: string } | boolean;
}

export interface IFormProps extends IMUIProps {
  item: {};
  layout: Array<ILayoutItem | Array<ILayoutItem>>;

  tabIndexOffset?: number;
  doValidate?: boolean;
  doValidateCallback?: Function;
  focusOnItem?: number;
  keyAttributeName?: string;
  dataProvider?: Function;
  onChange?: Function;
}

export interface IFormState {
  formData: any;
  errorData: any;
}

/**
 * Material UI based Form rendering Material UI based form items
 */
class Form extends React.Component<IFormProps, IFormState> {
  public static defaultProps = {
    theme: null,
    muiProps: {},
    qflProps: {},

    tabIndexOffset: 30,

    doValidate: false,
    doValidateCallback: null,
    focusOnItem: null,
    keyAttributeName: 'id',
    dataProvider: null,
    onChange: null,
  };

  constructor(props: IFormProps) {
    super(props);

    const item = (props.item || {});

    const state: IFormState = {
      formData: item,
      errorData: {}
    };

    const errorData = Form.validateFormData(props, state, item);
    state.errorData = errorData;

    this.state = state;
  }

  public static validateFormData(props: IFormProps, state: IFormState, item: {}, doValidate?: boolean, component?: Form) {
    const formErrorData = {};
    if ((props.doValidate || doValidate) && props.layout && props.layout.length > 0 && item) {
      for (let f = 0; f < props.layout.length; f++) {
        let formElement = props.layout[f];
        if (Object.prototype.toString.call(formElement) === '[object Array]' ) {
          const formElementItemArray = formElement as Array<ILayoutItem>;
          for (let i = 0; i < formElementItemArray.length; i++) {
            const formElementItem = formElementItemArray[i] as ILayoutItem;
            Form.validateItem(props, state, formElementItem, formErrorData);
          }
        } else {
          const formElementItem = formElement as ILayoutItem;
          Form.validateItem(props, state, formElementItem, formErrorData);
        }
      }
    }

    let errorData = {};
    if (formErrorData && typeof formErrorData === 'object' && Object.keys(formErrorData).length > 0) {
      errorData = formErrorData;
    }

    if (doValidate && component) {
      component.setState({
        errorData,
      });
    }

    return errorData;
  }

  private static validateItem(props: IFormProps, state: IFormState, formElement, errorData) {
    if (formElement && formElement.validate && typeof formElement.validate === 'function') {
      let items = formElement.items;
      if (!items && props.dataProvider && typeof props.dataProvider === 'function' && formElement.itemMapper && typeof formElement.itemMapper === 'function') {
        items = formElement.itemMapper(props.dataProvider()[formElement.key]);
      }

      const actualValue = Form.getFormItemValue(props, state, formElement.key, formElement.keyAttributeName, items);
      const elementResult = formElement.validate(actualValue, state.formData);
      if (elementResult && typeof elementResult === 'object') {
        const elementErrorData = {};
        elementErrorData[formElement.key] = elementResult.errorMessage;
        Object.assign(errorData, elementErrorData);
      }
    }
  }

  private static getFormItemValue(props: IFormProps, state: IFormState, key, keyAttributeName?: string, items?: Array<{ value: any, compareValue?: Function }>) {
    if (!keyAttributeName && props.item && props.item.hasOwnProperty(key)) {
      let result = props.item[key];
      if (items) {
        // Try to find result as value in items
        let foundInItems = false;
        for (let i = 0; i < items.length; i++) {
          if (items[i].value === result) {
            foundInItems = true;
            break;
          } else if (result && result.hasOwnProperty()) {

          }
        }
        if (!foundInItems) {
          for (let i = 0; i < items.length; i++) {
            if (items[i].compareValue && items[i].compareValue(result)) {
              result = items[i].value;
              break;
            }
          }
        }
      }

      return result;
    } else if (keyAttributeName && props.item && props.item.hasOwnProperty(key)) {
      if (props.item[key] && props.item[key][keyAttributeName]) {
        return props.item[key][keyAttributeName];
      } else {
        return 'not_choosen';
      }
    } else if (!keyAttributeName && state.formData && state.formData.hasOwnProperty(key)) {
      let result = state.formData[key];
      if (items) {
        // Try to find result as value in items
        let foundInItems = false;
        for (let i = 0; i < items.length; i++) {
          if (items[i].value === result) {
            foundInItems = true;
            break;
          }
        }
        if (!foundInItems) {
          for (let i = 0; i < items.length; i++) {
            if (items[i].compareValue) {
              const match = items[i].compareValue(result);
              if (match) {
                result = items[i].value;
                break;
              }
            }
          }
        }
      }

      return result;
    } else if (keyAttributeName && state.formData && state.formData.hasOwnProperty(key)) {
      return state.formData[key][keyAttributeName];
    }
  }

  private handleFormItemChange(type, key, oldValue, newValue, choosenElement?: any, element?: any) {
    const curFormData = this.state.formData;

    if (choosenElement && choosenElement.mapValue && typeof choosenElement.mapValue === 'function') {
      newValue = choosenElement.mapValue(Object.assign({}, choosenElement));
      curFormData[key] = newValue;
    } else {
      if (element && element.hasOwnProperty('keyAttributeName')) {
        curFormData[key] = {};
        curFormData[key][element.keyAttributeName] = newValue;
      } else {
        curFormData[key] = newValue;
      }
    }

    this.setState({
      formData: curFormData,
    });
    if (this.props.onChange) {
      this.props.onChange(this.state.formData, {
        type,
        key,
        oldValue,
        newValue,
      });
    }
  }

  private validateFormElement(layoutElement, newValue) {
    let isValid: boolean = true;
    if (layoutElement.validate && typeof layoutElement.validate === 'function') {
      const validationResult: { errorMessage: string, relatedFormElements?: Array<string> } | boolean = layoutElement.validate(newValue, this.state.formData);
      if (validationResult && typeof validationResult === 'object' && validationResult.hasOwnProperty('errorMessage')) {
        const errorObj = {};
        errorObj[layoutElement.key] = validationResult.errorMessage;
        const currentErrorData = this.state.errorData;
        Object.assign(currentErrorData, errorObj);
        isValid = false;

        this.setState({
          errorData: currentErrorData
        });
      } else if (!validationResult) {
        isValid = false;
      }

      if (validationResult && typeof validationResult === 'object' && validationResult.hasOwnProperty('relatedFormElements')) {
        const relatedFormElements = validationResult.relatedFormElements;
        for (let r = 0; r < relatedFormElements.length; r++) {
          const relatedFormElementKey = relatedFormElements[r];
          let foundLayoutElement = null;
          for (let f = 0; f < this.props.layout.length; f++) {
            let formElement = this.props.layout[f];
            if (Object.prototype.toString.call(formElement) === '[object Array]' ) {
              const formElementItemArray = formElement as Array<ILayoutItem>;
              for (let i = 0; i < formElementItemArray.length; i++) {
                if (formElementItemArray[i].key === relatedFormElementKey) {
                  foundLayoutElement = formElementItemArray[i];
                  break;
                }
              }

              if (foundLayoutElement) {
                break;
              }
            } else {
              const formElementItem = formElement as ILayoutItem;
              if (formElementItem.key === relatedFormElementKey) {
                foundLayoutElement = formElementItem;
                break;
              }
            }
          }

          if (foundLayoutElement) {
            setTimeout(() => {
              const currentErrorData = this.state.errorData;
              delete currentErrorData[foundLayoutElement.key];
              this.setState({
                errorData: currentErrorData
              }, () => {
                let items = foundLayoutElement.items;
                if (!items && this.props.dataProvider && typeof this.props.dataProvider === 'function' && foundLayoutElement.itemMapper && typeof foundLayoutElement.itemMapper === 'function') {
                  items = foundLayoutElement.itemMapper(this.props.dataProvider()[foundLayoutElement.key]);
                }
                const actualValue = Form.getFormItemValue(this.props, this.state, foundLayoutElement.key, foundLayoutElement.keyAttributeName, items);
                this.validateFormElement(foundLayoutElement, actualValue);
              });
            }, 0);
          }
        }
      }
    }

    return isValid;
  }

  public render() {
    const {qflProps} = buildTheme({
      theme: this.props.theme,
      sourceMuiProps: this.props.muiProps,
      sourceQflProps: this.props.qflProps,
      componentName: 'Form',
    });

    const {layout, item, keyAttributeName} = this.props;

    let resultingElement = null;
    if (layout && layout.length > 0) {
      const dropDownCount = 0;
      resultingElement = layout.map((layoutItem: (ILayoutItem | Array<ILayoutItem>), idx) => {
        const getElement = (layoutElement: ILayoutItem, itemWidth, tabIndex, isMostLeft, isMostRight) => {
          let resultingFromElement = <div/>;

          if (layoutElement) {
            if (layoutElement.type) {
              switch (layoutElement.type) {
                case 'CheckBox': {
                  const initialValue = (layoutElement.hasOwnProperty('initialValue') && layoutElement.initialValue !== null
                    ? layoutElement.initialValue
                    : Form.getFormItemValue(this.props, this.state, layoutElement.key));

                  let currentValue = Form.getFormItemValue(this.props, this.state, layoutElement.key);
                  if (currentValue === undefined) {
                    currentValue = initialValue;
                    if (!this.props.item) {
                      const curFormData = this.state.formData;
                      if (curFormData[layoutElement.key] !== initialValue) {
                        curFormData[layoutElement.key] = initialValue;
                        setTimeout(
                          () => {
                            this.setState(
                              {
                                formData: curFormData,
                              },
                              () => {
                                if (this.props.onChange) {
                                  this.props.onChange(this.state.formData);
                                }
                              },
                            );
                          },
                          0,
                        );
                      }
                    }
                  }

                  const handleCheckBoxFormItemChange = (event, oldValue, newValue) =>
                    this.handleFormItemChange('CheckBox', layoutElement.key, oldValue, newValue);

                  resultingFromElement = (
                    <CheckBox
                      dataKey={layoutElement.key}
                      theme={layoutElement.theme}
                      value={currentValue}
                      onChange={handleCheckBoxFormItemChange}
                      muiProps={{
                        label: layoutElement.label,
                        ...layoutElement.muiProps,
                      }}
                      qflProps={{
                        style: {
                          display: 'inline-block',
                          width: itemWidth + '%',
                        },
                        ...layoutElement.qflProps,
                      }}
                    />
                  );
                }
                  break;
                case 'RadioBox': {
                  if (layoutElement.items && layoutElement.items.length > 0) {
                    const initialValue = (layoutElement.hasOwnProperty('initialValue') && layoutElement.initialValue !== null
                      ? layoutElement.initialValue
                      : (!layoutElement.nullable ? layoutElement.items[0].value : null));

                    let currentValue = Form.getFormItemValue(this.props, this.state, layoutElement.key);
                    if (currentValue === undefined) {
                      currentValue = initialValue;
                      if (!this.props.item) {
                        const curFormData = this.state.formData;
                        if (curFormData[layoutElement.key] !== initialValue) {
                          curFormData[layoutElement.key] = initialValue;
                          setTimeout(
                            () => {
                              this.setState(
                                {
                                  formData: curFormData,
                                },
                                () => {
                                  if (this.props.onChange) {
                                    this.props.onChange(this.state.formData);
                                  }
                                },
                              );
                            },
                            0,
                          );
                        }
                      }
                    }

                    const handleRadioBoxFormItemChange = (event, index, oldValue, newValue) =>
                      this.handleFormItemChange('RadioBox', layoutElement.key, oldValue, newValue, layoutElement.items[index], layoutElement);

                    resultingFromElement = (
                      <RadioBox
                        key={layoutElement.key}
                        value={currentValue}
                        label={layoutElement.label}
                        theme={layoutElement.theme}
                        onChange={handleRadioBoxFormItemChange}
                        muiProps={{
                          name: layoutElement.key,
                          defaultSelected: initialValue,
                          ...layoutElement.muiProps,
                        }}
                        qflProps={{
                          style: {
                            display: 'inline-block',
                            width: itemWidth + '%',
                          },
                          ...layoutElement.qflProps,
                          ...layoutElement.radioButtonQflProps,
                        }}
                      >
                        {layoutElement.items.map((radioBoxItem, radioBoxIdx) => <RadioButton
                          key={layoutElement.key + '-' + radioBoxIdx}
                          muiProps={{
                            style: {
                              width: '50%',
                              display: 'inline-block',
                            },
                            iconStyle: {
                              marginRight: '8px',
                            },
                            value: radioBoxItem.value,
                            label: radioBoxItem.label,
                            checkedIcon: <CheckedIcon/>,
                            uncheckedIcon: <UncheckedIcon/>,
                            ...layoutElement.muiProps,
                            ...layoutElement.radioButtonMuiProps,
                          }}
                        />)}
                      </RadioBox>
                    );
                  }
                }
                  break;
                case 'DropDown': {
                  const initialValue = layoutElement.initialValue;

                  let items = layoutElement.items;
                  let layoutItems = layoutElement.items;
                  if (layoutElement.itemMapper && typeof layoutElement.itemMapper === 'function') {
                    items = [];
                    let dataProvider = {};
                    if (this.props.dataProvider && typeof this.props.dataProvider === 'function') {
                      dataProvider = this.props.dataProvider();
                      if (dataProvider.hasOwnProperty(layoutElement.key) && dataProvider[layoutElement.key]) {
                        items = layoutElement.itemMapper(dataProvider[layoutElement.key]);

                        layoutItems = items.map((dropDownItem, dropDownItemIdx) => (
                          <MUIMenuItem key={layoutElement.key + '-' + dropDownItemIdx}
                                       value={dropDownItem.value}
                                       primaryText={dropDownItem.label}
                          />
                        ));
                      }
                    }
                  } else {
                    items = layoutElement.items;
                    layoutItems = items.map((dropDownItem, dropDownItemIdx) => (
                      <MUIMenuItem
                        key={layoutElement.key + '-' + dropDownItemIdx}
                        value={dropDownItem.value}
                        primaryText={dropDownItem.label}
                      />
                    ));
                  }

                  let currentValue = Form.getFormItemValue(this.props, this.state, layoutElement.key, layoutElement.keyAttributeName, items);
                  if (currentValue === undefined) {
                    currentValue = initialValue;
                    if (!this.props.item) {
                      const curFormData = this.state.formData;
                      if (curFormData[layoutElement.key] !== initialValue) {
                        curFormData[layoutElement.key] = initialValue;
                        setTimeout(
                          () => {
                            this.setState(
                              {
                                formData: curFormData,
                              },
                              () => {
                                if (this.props.onChange) {
                                  this.props.onChange(this.state.formData);
                                }
                              },
                            );
                          },
                          0,
                        );
                      }
                    }
                  }

                  const handleDropDownFormItemChange = (event, index, oldValue, newValue) => {
                    if (this.validateFormElement(layoutElement, newValue)) {
                      const currentErrorData = this.state.errorData;
                      delete currentErrorData[layoutElement.key];
                      this.setState({
                        errorData: currentErrorData,
                      }, () => {
                        this.handleFormItemChange('DropDown', layoutElement.key, oldValue, newValue, items[index], layoutElement);
                      });
                    }
                  };


                  let errorMessage = null;
                  if (this.state.errorData.hasOwnProperty(layoutElement.key)) {
                    errorMessage = this.state.errorData[layoutElement.key];
                  }

                  resultingFromElement = (
                    <DropDown
                      key={layoutElement.key}
                      label={layoutElement.label}
                      errorText={errorMessage}
                      theme={layoutElement.theme}
                      value={currentValue}
                      muiProps={{
                        ...layoutElement.muiProps,
                      }}
                      onChange={handleDropDownFormItemChange}
                      qflProps={{
                        style: {
                          display: 'inline-block',
                          width: itemWidth + '%'
                        },
                        ...layoutElement.qflProps,
                      }}
                    >
                      {layoutItems}
                    </DropDown>
                  );
                }
                  break;
                case 'DatePicker': {
                  const initialValue = layoutElement.initialValue;
                  let currentValue = Form.getFormItemValue(this.props, this.state, layoutElement.key);
                  if (currentValue === undefined) {
                    currentValue = initialValue;
                    if (!this.props.item) {
                      const curFormData = this.state.formData;
                      if (curFormData[layoutElement.key] !== initialValue) {
                        curFormData[layoutElement.key] = initialValue;
                        setTimeout(
                          () => {
                            this.setState(
                              {
                                formData: curFormData,
                              },
                              () => {
                                if (this.props.onChange) {
                                  this.props.onChange(this.state.formData);
                                }
                              },
                            );
                          },
                          0,
                        );
                      }
                    }
                  }

                  const handleDatePickerFormItemChange = (oldValue, newValue) => {
                    if (this.validateFormElement(layoutElement, newValue)) {
                      const currentErrorData = this.state.errorData;
                      delete currentErrorData[layoutElement.key];
                      this.setState({
                        errorData: currentErrorData
                      }, () => {
                        this.handleFormItemChange('DatePicker', layoutElement.key, oldValue, newValue);
                      });
                    }
                  };

                  let errorMessage = null;
                  if (this.state.errorData.hasOwnProperty(layoutElement.key)) {
                    errorMessage = this.state.errorData[layoutElement.key];
                  }

                  resultingFromElement = (
                    <DatePicker
                      key={layoutElement.key}
                      value={currentValue}
                      theme={layoutElement.theme}
                      muiProps={{
                        tabIndex,
                        floatingLabelText: layoutElement.label,
                        width: '100%',
                        ...layoutElement.muiProps,
                        errorText: errorMessage,
                      }}
                      onChange={handleDatePickerFormItemChange}
                      qflProps={{
                        style: {
                          display: 'inline-block',
                          width: itemWidth + '%'
                        },
                        ...layoutElement.qflProps,
                      }}
                    />
                  );
                }
                  break;

                case 'AutoComplete': {

                  const initialValue = layoutElement.initialValue;

                  let currentValue = Form.getFormItemValue(this.props, this.state, layoutElement.key);
                  if (currentValue === undefined) {
                    currentValue = initialValue;
                    if (!this.props.item) {
                      const curFormData = this.state.formData;
                      if (curFormData[layoutElement.key] !== initialValue) {
                        curFormData[layoutElement.key] = initialValue;
                        setTimeout(
                          () => {
                            this.setState(
                              {
                                formData: curFormData,
                              },
                              () => {
                                if (this.props.onChange) {
                                  this.props.onChange(this.state.formData);
                                }
                              },
                            );
                          },
                          0,
                        );
                      }
                    }
                  }

                  const handleAutoCompleteFormItemChange = (event, index, oldValue, newValue) => {
                    if (this.validateFormElement(layoutElement, newValue)) {
                      const currentErrorData = this.state.errorData;
                      delete currentErrorData[layoutElement.key];
                      this.setState({
                        errorData: currentErrorData
                      }, () => {
                        this.handleFormItemChange('AutoComplete', layoutElement.key, oldValue, newValue, layoutElement.items[index], layoutElement);
                      });
                    }
                  };

                  let errorMessage = null;
                  if (this.state.errorData.hasOwnProperty(layoutElement.key)) {
                    errorMessage = this.state.errorData[layoutElement.key];
                  }

                  let items = [];
                  let dataProvider = {};
                  if (this.props.dataProvider && typeof this.props.dataProvider === 'function') {
                    dataProvider = this.props.dataProvider();
                    if (dataProvider.hasOwnProperty(layoutElement.key) && dataProvider[layoutElement.key]) {
                      if (layoutElement.itemMapper && typeof layoutElement.itemMapper === 'function') {
                        items = layoutElement.itemMapper(dataProvider[layoutElement.key]);
                      } else if (layoutElement.items) {
                        items = layoutElement.items;
                      }
                    }
                  } else {
                    if (layoutElement.items && layoutElement.itemMapper && typeof layoutElement.itemMapper === 'function') {
                      items = layoutElement.itemMapper(layoutElement.items);
                    } else if (layoutElement.items) {
                      items = layoutElement.items;
                    }
                  }

                  resultingFromElement = (
                    <AutoComplete
                      key={layoutElement.key}
                      label={layoutElement.label}
                      theme={layoutElement.theme}
                      value={currentValue}
                      items={items}
                      dataFetcher={
                        (layoutElement.dataFetcher
                            ? (searchText: string, autoCompleteItem: React.Component<{}, {}>): Promise<Array<{} | string>> =>
                              layoutElement.dataFetcher(searchText, autoCompleteItem)
                            : null
                        )}
                      noFilter={layoutElement.noFilter}
                      muiProps={{
                        tabIndex: tabIndex,
                        floatingLabelText: layoutElement.label,
                        width: '100%',
                        ...layoutElement.muiProps,
                        ...layoutElement.autoCompleteMuiProps,
                        errorText: errorMessage,
                      }}
                      onChange={handleAutoCompleteFormItemChange}
                      qflProps={{
                        style: {
                          display: 'inline-block',
                          width: itemWidth + '%',
                        },
                        ...layoutElement.qflProps,
                        ...layoutElement.autoCompleteQflProps,
                      }}
                    >
                    </AutoComplete>
                  );

                }
                  break;
                case 'TextField':
                default: { // tslint:disable-line no-switch-case-fall-through
                  const initialValue = layoutElement.initialValue;
                  let currentValue = Form.getFormItemValue(this.props, this.state, layoutElement.key);
                  if (currentValue === undefined) {
                    currentValue = initialValue;
                    if (!this.props.item) {
                      const curFormData = this.state.formData;
                      if (curFormData[layoutElement.key] !== initialValue) {
                        curFormData[layoutElement.key] = initialValue;
                        setTimeout(
                          () => {
                            this.setState(
                              {
                                formData: curFormData,
                              },
                              () => {
                                if (this.props.onChange) {
                                  this.props.onChange(this.state.formData);
                                }
                              },
                            );
                          },
                          0,
                        );
                      }
                    }
                  }

                  const handleTextFieldFormItemChange = (oldValue, newValue) => {
                    if (this.validateFormElement(layoutElement, newValue)) {
                      const currentErrorData = this.state.errorData;
                      delete currentErrorData[layoutElement.key];
                      this.setState({
                        errorData: currentErrorData,
                      }, () => {
                        this.handleFormItemChange('TextField', layoutElement.key, oldValue, newValue);
                      });
                    }
                  };

                  let errorMessage = null;
                  if (this.state.errorData.hasOwnProperty(layoutElement.key)) {
                    errorMessage = this.state.errorData[layoutElement.key];
                  }

                  resultingFromElement = (
                    <TextField
                      key={layoutElement.key}
                      value={currentValue}
                      theme={layoutElement.theme}
                      muiProps={{
                        tabIndex: tabIndex,
                        floatingLabelText: layoutElement.label,
                        width: '100%',
                        ...layoutElement.muiProps,
                        errorText: errorMessage,
                      }}
                      onChange={handleTextFieldFormItemChange}
                      qflProps={{
                        style: {
                          display: 'inline-block',
                          width: itemWidth + '%',
                        },
                        ...layoutElement.qflProps,
                      }}
                    />
                  );
                }
              }
            } else if (layoutElement.itemComponentClass) {
              let currentValue = Form.getFormItemValue(this.props, this.state, layoutElement.key);

              const handleComponentFormItemChange = (oldValue, newValue) => {
                if (this.validateFormElement(layoutElement, newValue)) {
                  const currentErrorData = this.state.errorData;
                  delete currentErrorData[layoutElement.key];
                  this.setState({
                    errorData: currentErrorData,
                  }, () => {
                    this.handleFormItemChange('Custom', layoutElement.key, oldValue, newValue);
                  });
                }
              };

              resultingFromElement = (
                <layoutElement.itemComponentClass
                  key={layoutElement.key}
                  value={currentValue}
                  theme={layoutElement.theme}
                  onChange={handleComponentFormItemChange}
                  {...layoutElement.itemComponentProps}
                />
              );
            }
          }

          return resultingFromElement;
        };

        if (layoutItem) {
          const isMultiple = Array.isArray(layoutItem);
          let itemWidth = 100;
          if (isMultiple) {
            itemWidth = (100 / (layoutItem as Array<ILayoutItem>).length);
            return (
              <div
                key={idx}
                style={{
                  width: '100%',
                }}
              >
                {(layoutItem as Array<ILayoutItem>).map((subItem, subIdx) =>
                  getElement(subItem, itemWidth, (this.props.tabIndexOffset + (idx * 10) + subIdx), subIdx === 0, subIdx === ((layoutItem as Array<ILayoutItem>).length - 1)))}
              </div>
            );
          }

          return (
            <div
              key={idx}
              style={{
                width: '100%',
                //paddingTop: ((layoutItem as ILayoutItem).type === 'DropDown' || (layoutItem as ILayoutItem).type === 'AutoComplete' ? '0.4vw' : '0vw'),
              }}
            >
              {getElement((layoutItem as ILayoutItem), itemWidth, (this.props.tabIndexOffset + (idx * 10)), true, true)}
            </div>
          );
        }

        return null;
      });
    }

    const key = (item ? item[keyAttributeName] : null);

    return (
      <div key={key} {...qflProps} >
        {resultingElement}
      </div>
    );
  }
}

export default Form;
