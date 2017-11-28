import * as React from 'react';

import MUIAutoComplete from 'material-ui/AutoComplete/index.js';

import {IMUIProps} from '../../interfaces';
import {buildTheme} from '../../themeBuilder';

export interface IAutoCompleteProps extends IMUIProps {
  items?: Array<{} | string>;
  label?: string;
  value?: string;
  searchText?: string;
  inputDelay?: number;
  noFilter?: boolean;

  onChange(choosenRequest: {} | string, index: number, oldValue: string, newValue: string): void;
  dataFetcher?(searchText: string, autoCompleteComponent: React.Component<{}, {}>): Promise<Array<{} | string>>;
}

export interface IAutoCompleteState {
  delayTimer: NodeJS.Timer;
  searchText?: string;
  items?: Array<{} | string>;
  value?: any;
}

/**
 * Material UI based auto complete drop down menu
 */
export default class AutoComplete extends React.Component<IAutoCompleteProps, IAutoCompleteState> {
  public static defaultProps: {} = {
    theme: null,
    muiProps: {},
    qflProps: {},

    label: null,
    value: null,
    onChange: null,
    inputDelay: 500,

  };

  constructor(props: IAutoCompleteProps) {
    super(props);

    let items: Array<React.ReactNode> = props.children as Array<React.ReactNode>;
    if (props.items) {
      items = props.items;
    }

    this.state = {
      delayTimer: null,
      searchText: props.value,
      value: this.findValue(props, items, props.value),
      items,
    };
  }

  private findValue(props: IAutoCompleteProps, items: Array<{} | string>, text: string): any {
    let result: any = null;
    if (items && items.length > 0) {
      const muiProps: any = props.muiProps;
      let choosenValueKey: string = 'text';
      let choosenTextKey: string = 'value';
      if (muiProps && muiProps.dataSourceConfig && muiProps.dataSourceConfig.value) {
        choosenValueKey = muiProps.dataSourceConfig.value;
      }
      if (muiProps && muiProps.dataSourceConfig && muiProps.dataSourceConfig.text) {
        choosenTextKey = muiProps.dataSourceConfig.text;
      }
      for (const item of items) {
        if (item[choosenTextKey] === text) {
          result = item[choosenValueKey];
          break;
        }
      }
    }

    return result;
  }

  public componentDidMount(): void {
    this.handleDataFetch((this.props.value ? this.props.value.toString() : null));
  }

  private handleUpdateInput(searchText: string, dataSource: Array<{} | string>, params: {}): void {
    let delayTimer: NodeJS.Timer = null;
    if (this.props.dataFetcher) {
      if (this.state.delayTimer) {
        clearTimeout(this.state.delayTimer);
      }
      delayTimer = setTimeout(
        () => {
          this.handleDataFetch(searchText);
        },
        this.props.inputDelay,
      );
    }

    this.setState({
      delayTimer: delayTimer,
      searchText: searchText,
    }, () => {
      let index = -1;
      if (dataSource && dataSource.length > 0 && typeof dataSource[0] === 'object') {
        let choosenValueKey: string = 'text';
        const muiProps: any = this.props.muiProps;
        if (muiProps && muiProps.dataSourceConfig && muiProps.dataSourceConfig.text) {
          choosenValueKey = muiProps.dataSourceConfig.text;
        }
        dataSource && dataSource.map((item) => item[choosenValueKey]).indexOf(searchText);
      } else {
        index = dataSource.indexOf(searchText);
      }
      this.handleChange(searchText, index);
    });
  }

  private handleChange(chosenRequest: {} | string, index: number): void {
    const oldValue: string = this.state.value;
    let newSearchText: string;
    let newValue: any;

    if (typeof chosenRequest === 'object') {
      let choosenValueKey: string = 'value';
      let choosenTextKey: string = 'text';
      const muiProps: any = this.props.muiProps;
      if (muiProps && muiProps.dataSourceConfig && muiProps.dataSourceConfig.value) {
        choosenValueKey = muiProps.dataSourceConfig.value;
      }
      if (muiProps && muiProps.dataSourceConfig && muiProps.dataSourceConfig.text) {
        choosenTextKey = muiProps.dataSourceConfig.text;
      }
      newSearchText = chosenRequest[choosenTextKey];
      newValue = chosenRequest[choosenValueKey];
    } else {
      newSearchText = newValue = chosenRequest;
    }

    this.setState({
      searchText: (newSearchText ? newSearchText.toString() : null),
      value: this.findValue(this.props, this.state.items, newSearchText),
    });
    if (this.props.onChange) {
      this.props.onChange(chosenRequest, index, oldValue, newValue);
    }
  }

  private handleDataFetch(searchText: string): void {
    if (this.props.dataFetcher) {
      this.props.dataFetcher(searchText, this);
    }
  }

  public render(): JSX.Element | null | false {
    const {muiProps, qflProps} = buildTheme({
      theme: this.props.theme,
      sourceMuiProps: this.props.muiProps,
      sourceQflProps: this.props.qflProps,
      componentName: 'AutoComplete',
    });

    if (this.props.noFilter) {
      muiProps.filter = MUIAutoComplete.noFilter;
    }

    return (
      <div {...qflProps}>
        <MUIAutoComplete
          {...muiProps} dataSource={this.state.items} searchText={this.state.searchText}
          onNewRequest={(chosenRequest: string, index: number): void => this.handleChange(chosenRequest, index)}
          onUpdateInput={(searchText: string, dataSource: Array<{} | string>, params: {}): void =>
              this.handleUpdateInput(searchText, dataSource, params)
          }
        />
      </div>
    );
  }
}
