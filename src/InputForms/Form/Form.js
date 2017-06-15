import React, { PropTypes, Component } from 'react';

import { TextField, RadioBox, DropDown, CheckBox, DatePicker, AutoComplete, Stepper } from '../../';
import { RadioButton, MenuItem } from 'material-ui';

import CheckedIcon from 'material-ui/svg-icons/toggle/radio-button-checked';
import UncheckedIcon from 'material-ui/svg-icons/toggle/radio-button-unchecked';

import { buildTheme } from '../../themeBuilder';

import { getMuiTheme } from 'material-ui/styles';

/**
 * Material UI based text field
 */
class Form extends Component {
    static propTypes = {
        /**
         * Applies a given MaterialUI theme.
         */
        theme: PropTypes.object,
        /**
         * Forwarded to wrapper component.
         */
        qflProps: PropTypes.object,
        /**
         * Setup of the shown form items.
         */
        layout: PropTypes.array,
        /**
         * Item holding form data (entity).
         */
        item: PropTypes.object,
        /**
         * Defines the name of the primary key attribute of the item.
         */
        keyAttributeName: PropTypes.string,
        /**
         * A function returning a map of dataproviders for list based selections (e.g. DropDowns)
         */
        dataProvider: PropTypes.func
    };

    constructor(props) {
        super(props);

        const item = (props.item || {});
        this.state = {
            formData: item
        }
    }

    getChildContext() {
        return {
            muiTheme: getMuiTheme(this.props.theme)
        };
    }

    getFormItemValue(key, keyAttributeName, items) {
        if (!keyAttributeName && this.props.item && this.props.item.hasOwnProperty(key)) {
            let result = this.props.item[key];
            if (items) {
                // Try to find result as value in items
                let foundInItems = false;
                for (let i=0;i<items.length;i++) {
                    if (items[i].value === result) {
                        foundInItems = true;
                        break;
                    }
                }
                if (!foundInItems) {
                    for (let i=0;i<items.length;i++) {
                        let match = false;
                        if (items[i].compareValue && (match = items[i].compareValue(result))) {
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
            return "not_choosen"
          }
        } else if (!keyAttributeName && this.state.formData && this.state.formData.hasOwnProperty(key)) {
            let result = this.state.formData[key];
            if (items) {
                // Try to find result as value in items
                let foundInItems = false;
                for (let i=0;i<items.length;i++) {
                    if (items[i].value === result) {
                        foundInItems = true;
                        break;
                    }
                }
                if (!foundInItems) {
                    for (let i=0;i<items.length;i++) {
                        let match = false;
                        if (items[i].compareValue && (match = items[i].compareValue(result))) {
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


    handleFormItemChange(type, key, oldValue, newValue, choosenElement, element) {
        const curFormData = this.state.formData;
        if (element && element.hasOwnProperty('keyAttributeName')) {
            curFormData[key] = {};
            curFormData[key][element.keyAttributeName] = newValue;
        } else {
            curFormData[key] = (choosenElement && choosenElement.mapValue && typeof choosenElement.mapValue === 'function' ? choosenElement.mapValue() : newValue);
        }

        this.setState({
            formData: curFormData
        });
        if (this.props.onChange) {
            this.props.onChange(this.state.formData, {
                type,
                key,
                oldValue,
                newValue
            });
        }
    }

    render() {
        const { qflProps } = buildTheme({
            theme: this.props.theme,
            sourceMuiProps: this.props.muiProps,
            sourceQflProps: this.props.qflProps,
            componentName: 'Form'
        });

        const { layout, item, keyAttributeName } = this.props;

        let resultingElement = null;
        if (layout && layout.length > 0) {
            let dropDownCount = 0;
            resultingElement = layout.map((item, idx) => {
                const getElement = (element, itemWidth, tabIndex, isMostLeft, isMostRight) => {
                    let resultingElement = null;
                    switch (element.type) {
                        case 'CheckBox':
                            const initialValue = (element.hasOwnProperty('initialValue') && element.initialValue !== null ? element.initialValue : this.getFormItemValue(element.key));

                            let currentValue = this.getFormItemValue(element.key);
                            if (currentValue === undefined) {
                                currentValue = initialValue;
                                if (!this.props.item) {
                                    const curFormData = this.state.formData;
                                    if (curFormData[element.key] !== initialValue) {
                                        curFormData[element.key] = initialValue;
                                        setTimeout(() => {
                                            this.setState({
                                                formData: curFormData
                                            }, () => {
                                                if (this.props.onChange) {
                                                    this.props.onChange(this.state.formData);
                                                }
                                            })
                                        }, 0);
                                    }
                                }
                            }

                            resultingElement = (
                                <CheckBox
                                    key={element.key}
                                    theme={element.theme}
                                    value={currentValue}
                                    onChange={(event, oldValue, newValue) => this.handleFormItemChange('CheckBox', element.key, oldValue, newValue)}
                                    muiProps={{
                                        label: element.label,
                                        ...element.muiProps
                                    }}
                                    qflProps={{
                                        style: {
                                            display: 'inline-block',
                                            width: itemWidth + '%'
                                        },
                                        ...element.qflProps
                                    }}
                                />
                            );

                            break;
                        case 'RadioBox':
                            if (element.items && element.items.length > 0) {
                                const initialValue = (element.hasOwnProperty('initialValue') && element.initialValue !== null ? element.initialValue : (!element.nullable ? element.items[0].value : null));

                                let currentValue = this.getFormItemValue(element.key);
                                if (currentValue === undefined) {
                                    currentValue = initialValue;
                                    if (!this.props.item) {
                                        const curFormData = this.state.formData;
                                        if (curFormData[element.key] !== initialValue) {
                                            curFormData[element.key] = initialValue;
                                            setTimeout(() => {
                                                this.setState({
                                                    formData: curFormData
                                                }, () => {
                                                    if (this.props.onChange) {
                                                        this.props.onChange(this.state.formData);
                                                    }
                                                })
                                            }, 0);
                                        }
                                    }
                                }

                                resultingElement = (
                                    <RadioBox
                                        key={element.key}
                                        value={currentValue}
                                        label={element.label}
                                        theme={element.theme}
                                        onChange={(event, index, oldValue, newValue) => this.handleFormItemChange('RadioBox', element.key, oldValue, newValue, element.items[index], element)}
                                        muiProps={{
                                            name: element.key,
                                            defaultSelected: initialValue,
                                            ...element.muiProps
                                        }}
                                        qflProps={{
                                            style: {
                                                display: 'inline-block',
                                                width: itemWidth + '%'
                                            },
                                            ...element.qflProps
                                        }}
                                    >
                                        {element.items.map((radioBoxItem, radioBoxIdx) => <RadioButton
                                            key={element.key + '-' + radioBoxIdx}
                                            style={{
                                                width: '50%',
                                                display: 'inline-block'
                                            }}
                                            iconStyle={{
                                                marginRight: '8px',
                                                marginLeft: (isMostLeft ? '0px' : '2px')
                                            }}
                                            value={radioBoxItem.value}
                                            label={radioBoxItem.label}
                                            checkedIcon={<CheckedIcon/>}
                                            uncheckedIcon={<UncheckedIcon/>}
                                            {...element.radioButtonMuiProps}
                                        />)}
                                    </RadioBox>
                                );
                            }
                            break;
                        case 'DropDown':
                            if (element.items && element.items.length > 0) {
                                const initialValue = element.initialValue;

                                let currentValue = this.getFormItemValue(element.key, element.keyAttributeName, element.items);
                                if (currentValue === undefined) {
                                    currentValue = initialValue;
                                    if (!this.props.item) {
                                        const curFormData = this.state.formData;
                                        if (curFormData[element.key] !== initialValue) {
                                            curFormData[element.key] = initialValue;
                                            setTimeout(() => {
                                                this.setState({
                                                    formData: curFormData
                                                }, () => {
                                                    if (this.props.onChange) {
                                                        this.props.onChange(this.state.formData);
                                                    }
                                                })
                                            }, 0);
                                        }
                                    }
                                }

                                let items = null;
                                if (element.items && typeof element.items === 'function') {
                                    items = [];
                                    let dataProvider = {};
                                    if (this.props.dataProvider && typeof this.props.dataProvider === 'function' && (dataProvider = this.props.dataProvider()).hasOwnProperty(element.key) && dataProvider[element.key]) {
                                        items = element.items(dataProvider[element.key]).map((dropDownItem, dropDownItemIdx) => <MenuItem
                                            key={element.key + '-' + dropDownItemIdx}
                                            value={dropDownItem.value}
                                            primaryText={dropDownItem.label}
                                        />)
                                    }
                                } else {
                                    items = element.items.map((dropDownItem, dropDownItemIdx) => <MenuItem
                                        key={element.key + '-' + dropDownItemIdx}
                                        value={dropDownItem.value}
                                        primaryText={dropDownItem.label}
                                    />);
                                }

                                resultingElement = (
                                    <DropDown
                                        key={element.key}
                                        label={element.label}
                                        theme={element.theme}
                                        value={currentValue}
                                        muiProps={{
                                            ...element.muiProps
                                        }}
                                        onChange={(event, index, oldValue, newValue) => this.handleFormItemChange('DropDown', element.key, oldValue, newValue, element.items[index], element)}
                                        qflProps={{
                                            style: {
                                                display: 'inline-block',
                                                width: itemWidth + '%',
                                                paddingRight: (isMostRight ? '0px' : '4px'),
                                                paddingLeft: (isMostLeft ? '0px' : '4px')
                                            },
                                            ...element.qflProps
                                        }}
                                    >
                                        {items}
                                    </DropDown>
                                );
                            }
                            break;

                        case 'DatePicker': {
                            const initialValue = element.initialValue;
                            let currentValue = this.getFormItemValue(element.key);
                            if (currentValue === undefined) {
                                currentValue = initialValue;
                                if (!this.props.item) {
                                    const curFormData = this.state.formData;
                                    if (curFormData[element.key] !== initialValue) {
                                        curFormData[element.key] = initialValue;
                                        setTimeout(() => {
                                            this.setState({
                                                formData: curFormData
                                            }, () => {
                                                if (this.props.onChange) {
                                                    this.props.onChange(this.state.formData);
                                                }
                                            })
                                        }, 0);
                                    }
                                }
                            }

                            resultingElement = (
                                <DatePicker
                                    key={element.key}
                                    value={currentValue}
                                    theme={element.theme}
                                    muiProps={{
                                        tabIndex,
                                        floatingLabelText: element.label,
                                        width: '100%',
                                        ...element.muiProps
                                    }}
                                    onChange={(oldValue, newValue) => this.handleFormItemChange('DatePicker', element.key, oldValue, newValue)}
                                    qflProps={{
                                        style: {
                                            display: 'inline-block',
                                            width: itemWidth + '%',
                                            paddingRight: (isMostRight ? '0px' : '4px'),
                                            paddingLeft: (isMostLeft ? '0px' : '4px')
                                        },
                                        ...element.qflProps
                                    }}
                                />
                            );
                        }
                        break;

                        case 'AutoComplete':
                            if (element.items && element.items.length > 0) {
                                const initialValue = element.initialValue;

                                let currentValue = this.getFormItemValue(element.key);
                                if (currentValue === undefined) {
                                    currentValue = initialValue;
                                    if (!this.props.item) {
                                        const curFormData = this.state.formData;
                                        if (curFormData[element.key] !== initialValue) {
                                            curFormData[element.key] = initialValue;
                                            setTimeout(() => {
                                                this.setState({
                                                    formData: curFormData
                                                }, () => {
                                                    if (this.props.onChange) {
                                                        this.props.onChange(this.state.formData);
                                                    }
                                                })
                                            }, 0);
                                        }
                                    }
                                }

                                resultingElement = (
                                    <AutoComplete
                                        key={element.key}
                                        label={element.label}
                                        theme={element.theme}
                                        value={currentValue}
                                        items={element.items}
                                        muiProps={{
                                            floatingLabelText: element.label,
                                            ...element.muiProps
                                        }}
                                        onChange={(event, index, oldValue, newValue) => this.handleFormItemChange('AutoComplete', element.key, oldValue, newValue, element.items[index], element)}
                                        qflProps={{
                                            style: {
                                                display: 'inline-block',
                                                width: itemWidth + '%',
                                                paddingRight: (isMostRight ? '0px' : '4px'),
                                                paddingLeft: (isMostLeft ? '0px' : '4px')
                                            },
                                            ...element.qflProps
                                        }}
                                    >
                                    </AutoComplete>
                                );
                            }
                        break;

                        case 'TextField':
                        default: {
                            const initialValue = element.initialValue;
                            let currentValue = this.getFormItemValue(element.key);
                            if (currentValue === undefined) {
                                currentValue = initialValue;
                                if (!this.props.item) {
                                    const curFormData = this.state.formData;
                                    if (curFormData[element.key] !== initialValue) {
                                        curFormData[element.key] = initialValue;
                                        setTimeout(() => {
                                            this.setState({
                                                formData: curFormData
                                            }, () => {
                                                if (this.props.onChange) {
                                                    this.props.onChange(this.state.formData);
                                                }
                                            })
                                        }, 0);
                                    }
                                }
                            }

                            resultingElement = (
                                <TextField
                                    key={element.key}
                                    value={currentValue}
                                    theme={element.theme}
                                    muiProps={{
                                        tabindex: tabIndex,
                                        floatingLabelText: element.label,
                                        width: '100%',
                                        ...element.muiProps
                                    }}
                                    onChange={(oldValue, newValue) => this.handleFormItemChange('TextField', element.key, oldValue, newValue)}
                                    qflProps={{
                                        style: {
                                            display: 'inline-block',
                                            width: itemWidth + '%',
                                            paddingRight: (isMostRight ? '0px' : '4px'),
                                            paddingLeft: (isMostLeft ? '0px' : '4px')
                                        },
                                        ...element.qflProps
                                    }}
                                />
                            );
                        }
                    }
                    return resultingElement;
                };

                if (item) {
                    const isMultiple = Array.isArray(item);
                    let itemWidth = 100;
                    if (isMultiple && item.length > 0) {
                        itemWidth = (100 / item.length);
                        return (
                        <div
                            key={idx}
                            style={{ width: '100%' }}
                        >
                            {item.map((subItem, subIdx) => getElement(subItem, itemWidth, (30 + (idx * 10) + subIdx), subIdx === 0, subIdx === (item.length - 1)))}
                        </div>
                        );
                    }

                    return (
                        <div
                            key={idx}
                            style={{
                                width: '100%',
                                paddingTop: ( item.type === 'DropDown' || item.type === 'AutoComplete' ? '22px' : '0px')
                            }}
                        >
                            {getElement(item, itemWidth, (30 + (idx * 10)), true, true)}
                        </div>
                    );
                }

                return null;
            })
        }

        const key = (item ? item[keyAttributeName] : null);

        return (
            <div key={key} {...qflProps} >
                {resultingElement}
            </div>
        );
    }
}

Form.childContextTypes = {
    muiTheme: React.PropTypes.object
};

Form.defaultProps = {
    theme: 'Default',
    qflProps: {},
    keyAttributeName: 'id'
};

export default Form;
