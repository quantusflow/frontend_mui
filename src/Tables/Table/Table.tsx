import * as React from 'react';

import {BootstrapTable, TableHeaderColumn} from '@quantusflow/react-bootstrap-table/lib/index.js';

import CleanCheckbox from 'material-ui/svg-icons/action/done.js';
import IndeterminateCheckbox from 'material-ui/svg-icons/content/remove.js';

import * as $ from 'jquery';

import CheckBox from '../../InputForms/CheckBox/CheckBox';

import {IMUIProps} from '../../interfaces';
import {buildTheme} from '../../themeBuilder';

export interface ISelectableCheckBoxProps {
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

const getSelectable = (theme: {}, muiProps, qflProps, checkBoxClassName) => {
  class SelectableCheckBox extends React.Component<ISelectableCheckBoxProps, ISelectableCheckBoxState> {
    public static defaultProps = {
      checked: false,
      disabled: false,
      rowIndex: -1,
      indeterminate: false,
      onChange: null
    };

    constructor(props: ISelectableCheckBoxProps) {
      super(props);

      this.state = {
        currentValue: props.checked,
      };
    }

    private handleChange(e, oldValue, newValue) {
      this.setState({
        currentValue: newValue,
      });
      if (this.props.onChange) {
        this.props.onChange(e);
      }
    }

    public render() {
      const muiPropsObj: any = {
        disabled: this.props.disabled,
        ...muiProps,
      };

      if (this.props.indeterminate) {
        muiPropsObj.checkedIcon = <IndeterminateCheckbox className={checkBoxClassName}/>;
      } else {
        muiPropsObj.checkedIcon = <CleanCheckbox className={checkBoxClassName}/>;
      }

      return (
        <CheckBox
          value={this.props.checked}
          dataKey={(this.props.rowIndex).toString()}
          theme={theme}
          muiProps={muiPropsObj}
          qflProps={{
            style: {},
            ...qflProps,
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
  tableKey: string;
  thcSchema: any;

  selectorTheme?: {};
  selectorMuiProps?: {};
  selectorQflProps?: {};
  dataSource?: Array<{}>;
  rbtProps?: { options: any, data: any };
  stylingProps?: any;
  onSelectedRowsChanged?: Function;
  selectRowProp?: any;
  checkBoxClassName?: string;
}

export interface ITableState {
  selectedRows?: {};
}

/**
 * Material UI based boostrap table
 */
class Table extends React.Component<ITableProps, ITableState> {
  public static defaultProps = {
    tableKey: (new Date()).getTime(),

    theme: null,
    muiProps: {},
    qflProps: {},

    selectorTheme: null,
    selectorMuiProps: null,
    selectorQflProps: null,
    dataSource: null,
    rbtProps: null,
    stylingProps: null,
    onSelectedRowsChanged: null,
    checkBoxClassName: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedRows: {},
    };
  }

  public componentDidMount() {
    // Hack for render table in Grid
    setTimeout(
      () => {
        window.dispatchEvent(new Event('resize'));
      },
      0,
    );
    const refs: any = this.refs;
    const elementContainer = ((
      refs[`reactBootstrapTable_${this.props.tableKey}`] &&
      (refs[`reactBootstrapTable_${this.props.tableKey}`] as React.Component<any, any>).refs &&
      ((refs[`reactBootstrapTable_${this.props.tableKey}`] as React.Component<any, any>).refs as any).table)
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
    const refs: any = this.refs;
    (refs[`reactBootstrapTable_${this.props.tableKey}`] as BootstrapTable).cleanSelected();
  }

  private handleRowSelect(row, isSelected, event) {
    const currentSelectedRows = this.state.selectedRows;
    if (isSelected) {
      currentSelectedRows[row.id] = row;
    } else {
      delete currentSelectedRows[row.id];
    }

    this.setState({
      selectedRows: currentSelectedRows,
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
      selectedRows: currentSelectedRows,
    });

    if (this.props.onSelectedRowsChanged) {
      this.props.onSelectedRowsChanged(currentSelectedRows);
    }
  }

  public render() {
    const toastrCSS = require('@quantusflow/react-bootstrap-table/css/toastr.css');
    const reactBootstrapTableCSS = require('@quantusflow/react-bootstrap-table/css/react-bootstrap-table.css');

    const dataSource = (this.props.dataSource || this.props.rbtProps.data);
    delete this.props.rbtProps.data;

    const {qflProps, rbtProps} = buildTheme({
      theme: this.props.theme,
      sourceRbtProps: this.props.rbtProps,
      sourceQflProps: this.props.qflProps,
      componentName: 'Table',
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
      clickToSelect: !!this.props.selectRowProp,
      onSelect: (row, isSelected, event) => {
        this.handleRowSelect(row, isSelected, event);
      },
      onSelectAll: (isSelected, rows) => {
        this.handleRowSelectAll(isSelected, rows);
      },
      ...rbtProps.selectRow,
    };

    if (rbtProps.selectRow === null) {
      delete rbtProps.selectRow;
    } else {
      rbtProps.selectRow = selectRowProp;
    }

    selectRowProp.customComponent = getSelectable(
      this.props.selectorTheme,
      this.props.selectorMuiProps,
      this.props.selectorQflProps,
      this.props.checkBoxClassName
    );

    return (
      <div {...qflProps}>
        <BootstrapTable
          ref={`reactBootstrapTable_${this.props.tableKey}`}
          data={dataSource}
          {...rbtProps}
        >
          {this.props.thcSchema.map((thcItem) => (
            <TableHeaderColumn
              key={thcItem.name}
              {...thcItem.thcProps}
            >
              {thcItem.name}
            </TableHeaderColumn>
          ))}
        </BootstrapTable>
      </div>
    );
  }
}

export default Table;
