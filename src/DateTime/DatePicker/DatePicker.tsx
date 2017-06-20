import * as React from 'react';

import {DatePicker as MUIDatePicker} from 'material-ui';

import {buildTheme} from '../../themeBuilder';
import {IMUIProps} from '../../interfaces';

export interface IDatePickerProps extends IMUIProps {
  value?: string;
  onChange?: Function;
}

export interface IDatePickerState {
  currentValue: Date;
}

/**
 * Material UI based data picker
 */
class DatePicker extends React.Component<IDatePickerProps, IDatePickerState> {
  public static defaultProps = {
    theme: 'Default',
    muiProps: {},
    qflProps: {},

    value: new Date(),
    onChange: null
  };

  constructor(props: IDatePickerProps) {
    super(props);

    this.state = {
      currentValue: (props.value && typeof props.value === 'string' ? new Date(props.value) : null)
    };
  }

  private handleChange(e, date) {
    const oldValue = this.state.currentValue;
    const newValue = date;
    this.setState(
      {
        currentValue: newValue
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange((oldValue ? oldValue.toISOString() : null), (newValue ? newValue.toISOString() : null));
        }
      }
    );
  }

  public render() {
    const {muiProps, qflProps} = buildTheme({
      theme: this.props.theme,
      sourceMuiProps: this.props.muiProps,
      sourceQflProps: this.props.qflProps,
      componentName: 'DatePicker'
    });

    return (
      <div {...qflProps}>
        <MUIDatePicker ref='muiDateField' {...muiProps} value={this.state.currentValue}
                       onChange={(e, date) => this.handleChange(e, date)}/>
      </div>
    );
  }
}

export default DatePicker;
