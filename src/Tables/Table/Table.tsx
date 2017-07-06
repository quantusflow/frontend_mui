import * as React from 'react';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import IndeterminateCheckbox from 'material-ui/svg-icons/content/remove';
import $ from 'jquery';

import CheckBox from '../../InputForms/CheckBox/CheckBox';

import {buildTheme} from '../../themeBuilder';
import {IMUIProps} from '../../interfaces';

export interface ISelectableCheckBoxProps {
  type?: string;
  checked?: boolean;
  disabled?: boolean;
  rowIndex?: number;
  indeterminate?: boolean;
  onChange?: Function;
  selectRowProp?: boolean;
  value?: boolean;
}

export interface ISelectableCheckBoxState {
  currentValue?: boolean;
}

const getSelectable = (theme: {}, muiProps, qflProps) => {
  class SelectableCheckBox extends React.Component<ISelectableCheckBoxProps, ISelectableCheckBoxState> {
    public static defaultProps = {
      type: '',
      checked: false,
      disabled: false,
      rowIndex: -1,
      indeterminate: false,
      onChange: null,
      selectRowProp: false,
      value: false
    };

    constructor(props: ISelectableCheckBoxProps) {
      super(props);

      this.state = {
        currentValue: props.value
      };
    }

    private handleChange(e, oldValue, newValue) {
      this.setState({
        currentValue: newValue
      });
      if (this.props.onChange) {
        this.props.onChange(e);
      }
    }

    public render() {
      const toastrCSS = require('react-bootstrap-table/css/toastr.css');
      const reactBootstrapTableCSS = require('react-bootstrap-table/css/react-bootstrap-table.css');

      const muiPropsObj = {
        disabled: this.props.disabled,
        ...muiProps
      };

      if (this.props.indeterminate) {
        muiPropsObj.checkedIcon = <IndeterminateCheckbox />;
      }

      return (
        <CheckBox
          value={this.props.checked}
          dataKey={(this.props.rowIndex).toString()}
          theme={theme}
          muiProps={muiPropsObj}
          qflProps={{
            style: {},
            ...qflProps
          }}
          onChange={(e, oldValue, newValue) => {
            if (oldValue !== newValue) {
              this.handleChange(e, oldValue, newValue);
            }
          }}
        />
      );
    }
  }

  return SelectableCheckBox;
};

export interface ITableProps extends IMUIProps {
  thcSchema: any;

  selectorTheme?: {};
  selectorMuiProps?: {};
  selectorQflProps?: {};
  dataSource?: Array<{}>;
  rbtProps?: { options: any, data: any };
  stylingProps?: any;
  onSelectedRowsChanged?: Function;
  selectRowProp?: any;
}

export interface ITableState {
  selectedRows?: {};
}

/**
 * Material UI based boostrap table
 */
class Table extends React.Component<ITableProps, ITableState> {
  public static defaultProps = {
    theme: null,
    muiProps: {},
    qflProps: {},

    selectorTheme: null,
    selectorMuiProps: null,
    selectorQflProps: null,
    dataSource: [],
    rbtProps: null,
    stylingProps: null,
    onSelectedRowsChanged: null
  };

  constructor() {
    super();
    this.state = {
      selectedRows: {}
    };
  }

  protected componentDidMount() {
    // Hack for render table in Grid
    setTimeout(
      () => {
        window.dispatchEvent(new Event('resize'));
      },
      0
    );
    const elementContainer = ((
      this.refs.reactBootstrapTable
      && (this.refs.reactBootstrapTable as React.Component<any, any>).refs
      && (this.refs.reactBootstrapTable as React.Component<any, any>).refs.table)
      || null);

    if (elementContainer && $(elementContainer).children('.react-bs-container-body')) {
      const scrollable = $(elementContainer).children('.react-bs-container-body');
      if (scrollable && scrollable.length === 1) {
        scrollable.scroll(() => {
          const scrollTop = scrollable.scrollTop(), innerHeight = scrollable.innerHeight(),
            scrollHeight = scrollable[0].scrollHeight;
          const scrolltrigger = 0.75;

          const bottomReached = (scrollTop + innerHeight >= scrollHeight - ((1 - scrolltrigger) * scrollHeight));
          if (bottomReached && this.props.rbtProps && this.props.rbtProps.options && this.props.rbtProps.options.onLoadMore) {
            this.props.rbtProps.options.onLoadMore();
          }
        });
      }
    }

  }

  private cleanSelected() {
    this.handleRowSelectAll(false);
    (this.refs.reactBootstrapTable as BootstrapTable).cleanSelected();
  }

  private handleRowSelect(row, isSelected, event) {
    const currentSelectedRows = this.state.selectedRows;
    if (isSelected) {
      currentSelectedRows[row.id] = row;
    } else {
      delete currentSelectedRows[row.id];
    }

    this.setState({
      selectedRows: currentSelectedRows
    });

    if (this.props.onSelectedRowsChanged) {
      this.props.onSelectedRowsChanged(currentSelectedRows);
    }
  }

  private handleRowSelectAll(isSelected, rows?: any) {
    const currentSelectedRows = {};
    if (rows && isSelected) {
      for (let r = 0; r < rows.length; r++) {
        currentSelectedRows[rows[r].id] = rows[r];
      }
    }
    this.setState({
      selectedRows: currentSelectedRows
    });

    if (this.props.onSelectedRowsChanged) {
      this.props.onSelectedRowsChanged(currentSelectedRows);
    }
  }

  public render() {
    const dataSource = (this.props.dataSource || this.props.rbtProps.data);
    delete this.props.rbtProps.data;

    const {qflProps, rbtProps} = buildTheme({
      theme: this.props.theme,
      sourceRbtProps: this.props.rbtProps,
      sourceQflProps: this.props.qflProps,
      componentName: 'Table'
    });

    const {stylingProps} = this.props;
    if (rbtProps && rbtProps.containerStyle && stylingProps && stylingProps.containerStyle) {
      rbtProps.containerStyle = Object.assign(rbtProps.containerStyle, stylingProps.containerStyle);
    }
    if (rbtProps && rbtProps.tableStyle && stylingProps && stylingProps.tableStyle) {
      rbtProps.tableStyle = Object.assign(rbtProps.tableStyle, stylingProps.tableStyle);
    }
    if (rbtProps && rbtProps.bodyStyle && stylingProps && stylingProps.bodyStyle) {
      rbtProps.bodyStyle = Object.assign(rbtProps.bodyStyle, stylingProps.bodyStyle);
    }
    if (rbtProps && rbtProps.headerStyle && stylingProps && stylingProps.headerStyle) {
      rbtProps.headerStyle = Object.assign(rbtProps.headerStyle, stylingProps.headerStyle);
    }

    const selectRowProp: any = {
      mode: 'checkbox',
      clickToSelect: this.props.selectRowProp,
      onSelect: (row, isSelected, event) => {
        this.handleRowSelect(row, isSelected, event);
      },
      onSelectAll: (isSelected, rows) => {
        this.handleRowSelectAll(isSelected, rows);
      }
    };

    selectRowProp.customComponent = getSelectable(this.props.selectorTheme, this.props.selectorMuiProps, this.props.selectorQflProps);

    return (
      <div {...qflProps}>
        <BootstrapTable
          ref='reactBootstrapTable'
          data={dataSource}
          selectRow={selectRowProp}
          {...rbtProps}
        >
          {this.props.thcSchema.map((thcItem) => <TableHeaderColumn
            key={thcItem.name} {...thcItem.thcProps}>{thcItem.name}</TableHeaderColumn>)}
        </BootstrapTable>
      </div>
    );
  }
}

export default Table;