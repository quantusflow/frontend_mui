import * as React from 'react';

import {RadioButtonGroup as MUIRadioButtonGroup} from 'material-ui';
import RadioButton from './RadioButton';

import {buildTheme} from '../../themeBuilder';
import {IMUIProps} from '../../interfaces';

export interface IRadioBoxProps extends IMUIProps {
  key: string;

  items?: Array<RadioButton>;
  value?: string;
  label?: string;
  onChange?: Function;
}

export interface IRadioBoxState {
  currentValue?: string;
}

/**
 * Material UI based radio button
 */
class RadioBox extends React.Component<IRadioBoxProps, IRadioBoxState> {
  public static defaultProps = {
    theme: null,
    muiProps: {},
    qflProps: {},

    items: null,
    value: null,
    label: null,
    onChange: null
  };

  constructor(props) {
    super(props);

    this.state = {
      currentValue: props.value
    };
  }

  private handleChange(event, value) {
    const oldValue = this.state.currentValue;
    const newValue = value;

    this.setState({
      currentValue: newValue
    });
    if (this.props.onChange) {
      this.props.onChange(event, oldValue, newValue);
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
      componentName: 'RadioBox'
    });

    return (
      <div {...qflProps}>
        <span style={qflProps.labelStyle}>{this.props.label}</span>
        <MUIRadioButtonGroup {...muiProps} valueSelected={this.state.currentValue}
                             onChange={(event, value) => this.handleChange(event, value)}>
          {items}
        </MUIRadioButtonGroup>
      </div>
    );
  }
}

export default RadioBox;
