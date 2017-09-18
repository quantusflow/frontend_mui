import * as React from 'react';

import MUIDatePicker from 'material-ui/DatePicker/index.js';

import {IMUIProps} from '../../interfaces';
import {buildTheme} from '../../themeBuilder';

import * as areIntlLocalesSupported from 'intl-locales-supported';
import * as IntlPolyfill from 'intl';

const supportedDateTimeFormats = ['en-GB', 'en-US', 'de-AT', 'de-CH', 'de-DE'];

export interface IDatePickerProps extends IMUIProps {
  value?: string;
  locale?: string;
  onChange?: Function;
}

export interface IDatePickerState {
  currentDateTimeFormat: DateTimeFormat;
  currentValue: Date;
}

/**
 * Material UI based data picker
 */
class DatePicker extends React.Component<IDatePickerProps, IDatePickerState> {
  public static defaultProps = {
    theme: null,
    muiProps: {},
    qflProps: {},

    value: new Date(),
    locale: 'de-DE',
    onChange: null,
  };

  constructor(props: IDatePickerProps) {
    super(props);

    let currentDateTimeFormat;
    if (areIntlLocalesSupported([this.props.locale.split('-')[0], this.props.locale])) {
      currentDateTimeFormat = global.Intl.DateTimeFormat;
    } else {

      currentDateTimeFormat = IntlPolyfill.DateTimeFormat;

      // Check if supported
      if (supportedDateTimeFormats.indexOf(this.props.locale) !== -1) {
        switch(this.props.locale) {
          case 'en-GB': {
            require('intl/locale-data/jsonp/en.js');
            require('intl/locale-data/jsonp/en-GB');
            break;
          }
          case 'en-US': {
            require('intl/locale-data/jsonp/en');
            require('intl/locale-data/jsonp/en-US');
            break;
          }
          case 'de-AT': {
            require('intl/locale-data/jsonp/de');
            require('intl/locale-data/jsonp/de-AT');
            break;
          }
          case 'de-CH': {
            require('intl/locale-data/jsonp/de');
            require('intl/locale-data/jsonp/de-CH');
            break;
          }
          default: {
            require('intl/locale-data/jsonp/de');
            require('intl/locale-data/jsonp/de-DE');
            break;
          }
        }
      }
    }

    this.state = {
      currentDateTimeFormat: currentDateTimeFormat,
      currentValue: (props.value && typeof props.value === 'string' ? new Date(props.value) : null),
    };
  }

  public componentDidMount() {

  }

  private handleChange(e, date) {
    const oldValue = this.state.currentValue;
    const newValue = date;
    this.setState(
      {
        currentValue: newValue,
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange((oldValue ? oldValue.toISOString() : null), (newValue ? newValue.toISOString() : null));
        }
      },
    );
  }

  public render() {
    const {muiProps, qflProps} = buildTheme({
      theme: this.props.theme,
      sourceMuiProps: this.props.muiProps,
      sourceQflProps: this.props.qflProps,
      componentName: 'DatePicker',
    });

    return (
      <div {...qflProps}>
        <MUIDatePicker ref='muiDateField' DateTimeFormat={this.state.currentDateTimeFormat} {...muiProps} value={this.state.currentValue}
                       onChange={(e, date) => this.handleChange(e, date)}/>
      </div>
    );
  }
}

export default DatePicker;
