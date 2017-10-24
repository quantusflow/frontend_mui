import * as React from 'react';

import {DropDownMenu as MUIDropDownMenu} from 'material-ui/DropDownMenu/index.js';

import {IMUIProps} from '../../interfaces';
import {buildTheme} from '../../themeBuilder';

export interface IDropDownProps extends IMUIProps {
  items?: React.ReactNode;
  value?: any;
  label?: string;
  errorText?: string;
  onChange?: Function;
}

export interface IDropDownState {
  currentValue: any;
}
/**
 * Material UI based drop down menu
 */
class DropDown extends React.Component<IDropDownProps, IDropDownState> {
  public static defaultProps = {
    theme: null,
    muiProps: {},
    qflProps: {},

    items: null,
    value: null,
    label: null,
    errorText: null,
    onChange: null,
  };

  constructor(props: IDropDownProps) {
    super(props);

    this.state = {
      currentValue: props.value,
    };
  }

  private handleChange(event, index, value) {
    const oldValue = this.state.currentValue;
    const newValue = value;

    this.setState({
      currentValue: newValue,
    });
    if (this.props.onChange) {
      this.props.onChange(event, index, oldValue, newValue);
    }
  }

  public render() {
    let items = this.props.children;
    if (this.props.items) {
      items = this.props.items;
    }

    const {muiProps, qflProps} = buildTheme({
      theme: this.props.theme,
      sourceMuiProps: this.props.muiProps,
      sourceQflProps: this.props.qflProps,
      componentName: 'DropDown',
    });

    return (
      <div {...qflProps}>
        <span style={qflProps.labelStyle}>
          {this.props.label}
        </span>
        <span style={{
          float: 'right',
          ...qflProps.errorStyle
        }}>
          {this.props.errorText}
        </span>
        <MUIDropDownMenu {...muiProps} value={this.state.currentValue}
                         onChange={(event, index, value) => this.handleChange(event, index, value)}>
          {items}
        </MUIDropDownMenu>
      </div>
    );
  }
}

export default DropDown;
