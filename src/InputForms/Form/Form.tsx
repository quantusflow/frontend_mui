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
  initialValue?: any;
  nullable?: boolean;

  theme?: string;
  label?: string;
  muiProps?: {};
  qflProps?: {};

  items?: any;
  itemMapper?: Function;
  radioButtonMuiProps?: {};
  keyAttributeName?: string;

  dataFetcher?(): Promise<Array<any>>;

  validate?(value: any, formData: any): { errorMessage: string } | boolean;
}

export interface IFormProps extends IMUIProps {
  item: {};
  layout: Array<ILayoutItem | Array<ILayoutItem>>;

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

    keyAttributeName: 'id',
    dataProvider: null,
    onChange: null,
  };

  constructor(props: IFormProps) {
    super(props);

    const item = (props.item || {});

    this.state = {
      formData: item,
      errorData: {}
    };
  }

  private getFormItemValue(key, keyAttributeName?: string, items?: Array<{ value: any, compareValue?: Function }>) {
    if (!keyAttributeName && this.props.item && this.props.item.hasOwnProperty(key)) {
      let result = this.props.item[key];
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
            if (items[i].compareValue && items[i].compareValue(result)) {
              result = items[i].value;
              break;
            }
          }
        }
      }

      return result;
    } else if (keyAttributeName && this.props.item && this.props.item.hasOwnProperty(key)) {
      if (this.props.item[key] && this.props.item[key][keyAttributeName]) {
        return this.props.item[key][keyAttributeName];
      } else {
        return 'not_choosen';
      }
    } else if (!keyAttributeName && this.state.formData && this.state.formData.hasOwnProperty(key)) {
      let result = this.state.formData[key];
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
            const match = items[i].compareValue(result);
            if (items[i].compareValue && match) {
              result = items[i].value;
              break;
            }
          }
        }
      }

      return result;
    } else if (keyAttributeName && this.state.formData && this.state.formData.hasOwnProperty(key)) {
      return this.state.formData[key][keyAttributeName];
    }
  }

  private handleFormItemChange(type, key, oldValue, newValue, choosenElement?: any, element?: any) {
    const curFormData = this.state.formData;
    if (element && element.hasOwnProperty('keyAttributeName')) {
      curFormData[key] = {};
      curFormData[key][element.keyAttributeName] = newValue;
    } else {
      curFormData[key] = (choosenElement && choosenElement.mapValue && typeof choosenElement.mapValue === 'function' ? choosenElement.mapValue() : newValue);
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
            switch (layoutElement.type) {
              case 'CheckBox': {
                const initialValue = (layoutElement.hasOwnProperty('initialValue') && layoutElement.initialValue !== null
                  ? layoutElement.initialValue
                  : this.getFormItemValue(layoutElement.key));

                let currentValue = this.getFormItemValue(layoutElement.key);
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

                  let currentValue = this.getFormItemValue(layoutElement.key);
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
                            marginLeft: (isMostLeft ? '0px' : '2px'),
                          },
                          value: radioBoxItem.value,
                          label: radioBoxItem.label,
                          checkedIcon: <CheckedIcon/>,
                          uncheckedIcon: <UncheckedIcon/>,
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

                let items = null;
                if (layoutElement.itemMapper && typeof layoutElement.itemMapper === 'function') {
                  items = [];
                  let dataProvider = {};
                  if (this.props.dataProvider && typeof this.props.dataProvider === 'function') {
                    dataProvider = this.props.dataProvider();
                    if (dataProvider.hasOwnProperty(layoutElement.key) && dataProvider[layoutElement.key]) {
                      items = layoutElement.itemMapper(dataProvider[layoutElement.key]).map((dropDownItem, dropDownItemIdx) => (
                        <MUIMenuItem key={layoutElement.key + '-' + dropDownItemIdx}
                                     value={dropDownItem.value}
                                     primaryText={dropDownItem.label}
                        />
                      ));
                    }
                  }
                } else {
                  items = layoutElement.items.map((dropDownItem, dropDownItemIdx) => (
                    <MUIMenuItem
                      key={layoutElement.key + '-' + dropDownItemIdx}
                      value={dropDownItem.value}
                      primaryText={dropDownItem.label}
                    />
                  ));
                }

                let currentValue = this.getFormItemValue(layoutElement.key, layoutElement.keyAttributeName, items);
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

                const handleDropDownFormItemChange = (event, index, oldValue, newValue) =>
                  this.handleFormItemChange('DropDown', layoutElement.key, oldValue, newValue, items[index], layoutElement);

                resultingFromElement = (
                  <DropDown
                    key={layoutElement.key}
                    label={layoutElement.label}
                    theme={layoutElement.theme}
                    value={currentValue}
                    muiProps={{
                      ...layoutElement.muiProps,
                    }}
                    onChange={handleDropDownFormItemChange}
                    qflProps={{
                      style: {
                        display: 'inline-block',
                        width: itemWidth + '%',
                        paddingRight: (isMostRight ? '0px' : '4px'),
                        paddingLeft: (isMostLeft ? '0px' : '4px'),
                      },
                      ...layoutElement.qflProps,
                    }}
                  >
                    {items}
                  </DropDown>
                );
              }
                break;
              case 'DatePicker': {
                const initialValue = layoutElement.initialValue;
                let currentValue = this.getFormItemValue(layoutElement.key);
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

                const handleDatePickerFormItemChange = (oldValue, newValue) =>
                  this.handleFormItemChange('DatePicker', layoutElement.key, oldValue, newValue);

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
                    }}
                    onChange={handleDatePickerFormItemChange}
                    qflProps={{
                      style: {
                        display: 'inline-block',
                        width: itemWidth + '%',
                        paddingRight: (isMostRight ? '0px' : '4px'),
                        paddingLeft: (isMostLeft ? '0px' : '4px'),
                      },
                      ...layoutElement.qflProps,
                    }}
                  />
                );
              }
                break;

              case 'AutoComplete': {

                const initialValue = layoutElement.initialValue;

                let currentValue = this.getFormItemValue(layoutElement.key);
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
                  return this.handleFormItemChange('AutoComplete', layoutElement.key, oldValue, newValue, layoutElement.items[index], layoutElement);
                };

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
                    dataFetcher={layoutElement.dataFetcher}
                    muiProps={{
                      tabindex: tabIndex,
                      floatingLabelText: layoutElement.label,
                      width: '100%',
                      ...layoutElement.muiProps,
                    }}
                    onChange={handleAutoCompleteFormItemChange}
                    qflProps={{
                      style: {
                        display: 'inline-block',
                        width: itemWidth + '%',
                        paddingRight: (isMostRight ? '0px' : '4px'),
                        paddingLeft: (isMostLeft ? '0px' : '4px'),
                      },
                      ...layoutElement.qflProps,
                    }}
                  >
                  </AutoComplete>
                );

              }
                break;
              case 'TextField':
              default: { // tslint:disable-line no-switch-case-fall-through
                const initialValue = layoutElement.initialValue;
                let currentValue = this.getFormItemValue(layoutElement.key);
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
                  let isValid: boolean = true;
                  if (layoutElement.validate && typeof layoutElement.validate === 'function') {
                    const validationResult: { errorMessage: string } | boolean = layoutElement.validate(newValue, this.state.formData);
                    if (validationResult && typeof validationResult === 'object') {
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
                  }

                  if (isValid) {
                    const currentErrorData = this.state.errorData;
                    delete currentErrorData[layoutElement.key];
                    this.setState({
                      errorData: currentErrorData
                    }, () => {
                      this.handleFormItemChange('TextField', layoutElement.key, oldValue, newValue);
                    });

                  }
                }

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
                      tabindex: tabIndex,
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
                        paddingRight: (isMostRight ? '0px' : '4px'),
                        paddingLeft: (isMostLeft ? '0px' : '4px'),
                      },
                      ...layoutElement.qflProps,
                    }}
                  />
                );
              }
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
                  getElement(subItem, itemWidth, (30 + (idx * 10) + subIdx), subIdx === 0, subIdx === ((layoutItem as Array<ILayoutItem>).length - 1)))}
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
              {getElement((layoutItem as ILayoutItem), itemWidth, (30 + (idx * 10)), true, true)}
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
