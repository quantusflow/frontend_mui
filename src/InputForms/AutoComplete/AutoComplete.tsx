import * as React from 'react';

import MUIAutoComplete from 'material-ui/AutoComplete/index.js';

import {IMUIProps} from '../../interfaces';
import {buildTheme} from '../../themeBuilder';

export interface IAutoCompleteProps extends IMUIProps {
  items?: Array<{}>;
  label?: string;
  value?: any;
  searchText?: string;
  onChange?: Function;
  inputDelay?: number;

  dataFetcher?(searchText: string): Promise<Array<{}>>;
}

export interface IAutoCompleteState {
  delayTimer: NodeJS.Timer;
  searchText?: string;
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

    this.state = {
      delayTimer: null,
      searchText: (props.value ? props.value.toString() : null),
    };
  }

  public componentDidMount(): void {
    this.handleDataFetch((this.props.value ? this.props.value.toString() : null));
  }

  private handleUpdateInput(searchText: string, dataSource: Array<{}>, params: {}): void {
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
    });
  }

  private handleChange(chosenRequest: any, index: number): void {
    const oldSearchText: string = this.state.searchText;
    let newSearchText: string;

    if (typeof chosenRequest === 'object') {
      let choosenValueKey: string = 'text';
      const muiProps: any = this.props.muiProps;
      if (muiProps && muiProps.dataSourceConfig && muiProps.dataSourceConfig.text) {
        choosenValueKey = muiProps.dataSourceConfig.text;
      }
      newSearchText = chosenRequest[choosenValueKey];
    } else {
      newSearchText = chosenRequest;
    }

    this.setState({
      searchText: (newSearchText ? newSearchText.toString() : null),
    });
    if (this.props.onChange) {
      this.props.onChange(chosenRequest, index, oldSearchText, newSearchText);
    }
  }

  private handleDataFetch(searchText: string): void {
    if (this.props.dataFetcher) {
      this.props.dataFetcher(searchText);
    }
  }

  public render(): JSX.Element | null | false {
    const {muiProps, qflProps} = buildTheme({
      theme: this.props.theme,
      sourceMuiProps: this.props.muiProps,
      sourceQflProps: this.props.qflProps,
      componentName: 'AutoComplete',
    });

    let items: Array<React.ReactNode> = this.props.children as Array<React.ReactNode>;
    if (this.props.items) {
      items = this.props.items;
    }

    return (
      <div {...qflProps}>
        <MUIAutoComplete
          {...muiProps} dataSource={items} searchText={this.state.searchText}
          onNewRequest={(chosenRequest: string, index: number): void => this.handleChange(chosenRequest, index)}
          onUpdateInput={(searchText: string, dataSource: Array<{}>, params: {}): void => this.handleUpdateInput(searchText, dataSource, params)}
        />
      </div>
    );
  }
}
