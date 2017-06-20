import * as React from 'react';

import {Checkbox as MUICheckBox} from 'material-ui';

import {buildTheme} from '../../themeBuilder';
import {IMUIProps} from '../../interfaces';

export interface ICheckBoxProps extends IMUIProps {
  dataKey: string;

  value?: boolean;
  onChange?: Function;
}

export interface ICheckBoxState {
  currentValue?: boolean;
}

/**
 * Material UI based check box
 */
class CheckBox extends React.Component<ICheckBoxProps, ICheckBoxState> {
  public static defaultProps = {
    theme: 'Default',
    muiProps: {},
    qflProps: {},

    value: false,
    onChange: null
  };

  constructor(props: ICheckBoxProps) {
    super(props);

    this.state = {
      currentValue: props.value
    };
  }

  protected componentWillReceiveProps(props, b, c) {
    this.setState({
      currentValue: props.value
    });
  }

  private handleChange(e) {
    const oldValue = this.state.currentValue;
    const newValue = !this.state.currentValue;
    this.setState({
      currentValue: newValue
    });
    if (this.props.onChange) {
      this.props.onChange(e, oldValue, newValue, this.props.dataKey);
    }
  }

  public render() {
    const {muiProps, qflProps} = buildTheme({
      theme: this.props.theme,
      sourceMuiProps: this.props.muiProps,
      sourceQflProps: this.props.qflProps,
      componentName: 'CheckBox'
    });

    return (
      <div {...qflProps}>
        <MUICheckBox {...muiProps} checked={this.state.currentValue} onCheck={(e) => this.handleChange(e)}/>
      </div>
    );
  }
}

export default CheckBox;
