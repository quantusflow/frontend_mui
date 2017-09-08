import * as React from 'react';

import MUITimePicker from 'material-ui/TimePicker/index.js';

import {IMUIProps} from '../../interfaces';
import {buildTheme} from '../../themeBuilder';

export interface ITimePickerProps extends IMUIProps {
  value?: Date;
  onChange?: Function;
}

export interface ITimePickerState {
  currentValue: Date;
}

/**
 * Material UI based data picker
 */
class TimePicker extends React.Component<ITimePickerProps, ITimePickerState> {
  public static defaultProps = {
    theme: null,
    muiProps: {},
    qflProps: {},

    value: new Date(),
    onChange: null,
  };

  constructor(props: ITimePickerProps) {
    super(props);

    this.state = {
      currentValue: props.value,
    };
  }

  private handleChange(e, time) {
    const oldValue = this.state.currentValue;
    const newValue = time;
    this.setState(
      {
        currentValue: newValue,
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(newValue);
        }
      },
    );
  }

  public render() {
    const {muiProps, qflProps} = buildTheme({
      theme: this.props.theme,
      sourceMuiProps: this.props.muiProps,
      sourceQflProps: this.props.qflProps,
      componentName: 'TimePicker',
    });

    return (
      <div {...qflProps}>
        <MUITimePicker ref='muiTimeField' {...muiProps} value={this.state.currentValue}
                       onChange={(e, date) => this.handleChange(e, date)}/>
      </div>
    );
  }
}

export default TimePicker;
