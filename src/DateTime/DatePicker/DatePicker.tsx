import * as React from 'react';

import MUIDatePicker from 'material-ui/DatePicker/index.js';

import {IMUIProps} from '../../interfaces';
import {buildTheme} from '../../themeBuilder';

import * as IntlPolyfill from 'intl';
import * as areIntlLocalesSupported from 'intl-locales-supported';
import DateTimeFormat = Intl.DateTimeFormat;

export enum SupportedLocales {
  GB = 'en-GB',
  US = 'en-US',
  AT = 'de-AT',
  CH = 'de-CH',
  DE = 'de-DE',
}

export interface IDatePickerProps extends IMUIProps {
  value?: string;
  locale?: SupportedLocales;
  onChange?(oldValue: string, newValue: string): void;
}

export interface IDatePickerState {
  currentDateTimeFormat: DateTimeFormat;
  currentValue: Date;
}

/**
 * Material UI based data picker
 */
class DatePicker extends React.Component<IDatePickerProps, IDatePickerState> {
  public static defaultProps: any = {
    theme: null,
    muiProps: {},
    qflProps: {},

    value: new Date(),
    locale: SupportedLocales.DE,
    onChange: null,
  };

  constructor(props: IDatePickerProps) {
    super(props);

    let currentDateTimeFormat;
    const datepickerLocaleString: string = this.props.locale;
    const datepickerLanguage: string = datepickerLocaleString.split('-')[0];
    if (areIntlLocalesSupported([datepickerLanguage, datepickerLocaleString])) {
      currentDateTimeFormat = global.Intl.DateTimeFormat;
    } else {

      currentDateTimeFormat = IntlPolyfill.DateTimeFormat;

      const localeIsSupported: boolean = Object.values(SupportedLocales).includes(datepickerLocaleString);
      if (localeIsSupported) {
        switch (this.props.locale) {
          case 'en-GB': {
            require('intl/locale-data/jsonp/en');
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

    let datepickerValue: Date = null;
    if (props.value && typeof props.value === 'string') {
      datepickerValue = new Date(props.value);
    }

    this.state = {
      currentDateTimeFormat: currentDateTimeFormat,
      currentValue: datepickerValue,
    };
  }

  private handleChange(event: Event, date: Date): void {
    const oldValue: Date = this.state.currentValue;
    const newValue: Date = date;
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

  public render(): JSX.Element | null | false {
    const {muiProps, qflProps} = buildTheme({
      theme: this.props.theme,
      sourceMuiProps: this.props.muiProps,
      sourceQflProps: this.props.qflProps,
      componentName: 'DatePicker',
    });

    return (
      <div {...qflProps}>
        <MUIDatePicker ref='muiDateField' DateTimeFormat={this.state.currentDateTimeFormat} {...muiProps} value={this.state.currentValue}
                       onChange={(event: Event, date: Date) => this.handleChange(event, date)}/>
      </div>
    );
  }
}

export default DatePicker;
