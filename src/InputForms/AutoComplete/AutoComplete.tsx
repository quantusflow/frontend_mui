import * as React from 'react';

import MUIAutoComplete from 'material-ui/AutoComplete/index.js';

import {buildTheme} from '../../themeBuilder';
import {IMUIProps} from '../../interfaces';

export interface IAutoCompleteProps extends IMUIProps {
  items: Array<{}>;
  label?: string;
  value?: any;

  onChange?: Function;
}

export interface IAutoCompleteState {
  currentValue?: string;
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
    onChange: null
  };

  constructor(props: IAutoCompleteProps) {
    super(props);

    this.state = {
      currentValue: (props.value ? props.value.toString() : null)
    };
  }

  private handleChange(chosenRequest, index) {
    const oldValue = this.state.currentValue;
    const newValue = this.props.items[index];

    this.setState({
      currentValue: (newValue ? newValue.toString() : null)
    });
    if (this.props.onChange) {
      this.props.onChange(chosenRequest, index, oldValue, newValue);
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
      componentName: 'AutoComplete'
    });

    return (
      <div {...qflProps}>
        <MUIAutoComplete  {...muiProps} openOnFocus={true} dataSource={items} searchText={this.state.currentValue}
                          onNewRequest={(chosenRequest, index) => this.handleChange(chosenRequest, index)}/>
      </div>
    );
  }
}

export default AutoComplete;
