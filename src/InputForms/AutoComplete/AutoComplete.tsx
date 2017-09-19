import * as React from 'react';

import MUIAutoComplete from 'material-ui/AutoComplete/index.js';

import {IMUIProps} from '../../interfaces';
import {buildTheme} from '../../themeBuilder';

export interface IAutoCompleteProps extends IMUIProps {
  items?: Array<{}> | Array<React.ReactNode> | React.ReactNode;
  label?: string;
  value?: any;
  searchText?: string;
  dataFetcher?(searchText: string): Promise<Array<{}>>;

  onChange?: Function;
}

export interface IAutoCompleteState {
  items?: Array<{}> | Array<React.ReactNode> | React.ReactNode;
  searchText?: string;
}

/**
 * Material UI based auto complete drop down menu
 */
class AutoComplete extends React.Component<IAutoCompleteProps, IAutoCompleteState> {
  public static defaultProps = {
    theme: null,
    muiProps: {},
    qflProps: {},

    label: null,
    value: null,
    onChange: null,

  };

  constructor(props: IAutoCompleteProps) {
    super(props);

    let items = props.children;
    if (!props.dataFetcher && props.items) {
      items = props.items;
    } else if (this.props.dataFetcher) {
      items = [];
    }

    this.state = {
      items: items,
      searchText: (props.value ? props.value.toString() : null)
    };
  }

  componentDidMount() {
    if (this.props.dataFetcher) {
      this.props.dataFetcher(null).then((items: Array<{}>) => {
        this.setState({
          items: items
        })
      });
    }
  }

  private handleUpdateInput(searchText: string, dataSource: Array<{}>, params: {}) {
    if (this.props.dataFetcher) {
      this.handleDataFetch(searchText);
    } else {
      this.setState({
        searchText: searchText,
      });
    }
  };

  private handleChange(chosenRequest, index) {
    const oldSearchText = this.state.searchText;
    const newSearchText = this.props.items[index];

    this.setState({
      searchText: (newSearchText ? newSearchText.toString() : null),
    });
    if (this.props.onChange) {
      this.props.onChange(chosenRequest, index, oldSearchText, newSearchText);
    }
  }

  private handleDataFetch(searchText: string) {
    if (this.props.dataFetcher) {
      this.props.dataFetcher(searchText).then((items) => {
        this.setState({
          items
        });
      });
    }
  };

  public render() {
    const {muiProps, qflProps} = buildTheme({
      theme: this.props.theme,
      sourceMuiProps: this.props.muiProps,
      sourceQflProps: this.props.qflProps,
      componentName: 'AutoComplete',
    });

    return (
      <div {...qflProps}>
        <MUIAutoComplete  {...muiProps} openOnFocus={true} dataSource={this.state.items} searchText={this.state.searchText}
                          onNewRequest={(chosenRequest, index) => this.handleChange(chosenRequest, index)}
                          onUpdateInput={(searchText: string, dataSource: Array<{}>, params: {}) => this.handleUpdateInput(searchText, dataSource, params)}/>
      </div>
    );
  }
}

export default AutoComplete;
