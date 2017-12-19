import * as React from 'react';

import MUITextField from 'material-ui/TextField/index.js';

import {IMUIProps} from '../../interfaces';
import {buildTheme} from '../../themeBuilder';

export interface ITextFieldProps extends IMUIProps {
  value?: string;
  watch?: boolean;
  onChange?: Function;
}

export interface ITextFieldState {
  currentValue?: string;
}

/**
 * Material UI based text field
 */
class TextField extends React.Component<ITextFieldProps, ITextFieldState> {
  public static defaultProps = {
    theme: null,
    muiProps: {},
    qflProps: {},

    value: null,
    watch: false,
    onChange: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      currentValue: props.value,
    };
  }

  public componentWillReceiveProps(nextProps: ITextFieldProps): void {
    if (this.state.currentValue !== nextProps.value) {
      this.setState({
        currentValue: nextProps.value,
      });
    }
  }

  private handleChange(e, fireUp?: boolean) {
    const oldValue = this.state.currentValue;
    const newValue = e.currentTarget.value;
    this.setState({
      currentValue: newValue,
    });

    if (this.props.onChange && ((fireUp && !this.props.watch) || (!fireUp && this.props.watch))) {
      this.props.onChange(oldValue, newValue, e);
    }
  }

  public getCurrentValue() {
    return this.state.currentValue;
  }

  public render() {
    const {muiProps, qflProps} = buildTheme({
      theme: this.props.theme,
      sourceMuiProps: this.props.muiProps,
      sourceQflProps: this.props.qflProps,
      componentName: 'TextField',
    });

    return (
      <div {...qflProps}>
        <MUITextField {...muiProps} value={this.state.currentValue}
                      onChange={(e) => this.handleChange(e)} onBlur={(e) => this.handleChange(e, true)}/>
      </div>
    );
  }
}

export default TextField;
