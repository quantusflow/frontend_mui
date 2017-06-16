import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import IndeterminateCheckbox from 'material-ui/svg-icons/content/remove';
import $ from 'jquery';

import CheckBox from '../../InputForms/CheckBox/CheckBox';

import { buildTheme } from '../../themeBuilder';

import { getMuiTheme } from 'material-ui/styles';

const getSelectable = (theme, muiProps, qflProps) => {
  class SelectableCheckBox extends Component {
    static propTypes = {
      type: PropTypes.string,
      checked: PropTypes.bool,
      disabled: PropTypes.bool,
      rowIndex: PropTypes.any,
      indeterminate: PropTypes.bool,
      onChange: PropTypes.func,
      selectRowProp: PropTypes.bool
    };

    constructor(props) {
      super(props);

      this.state = {
        currentValue: props.value
      }
    }

    handleChange(e, oldValue, newValue) {
      this.setState({
        currentValue: newValue
      });
      if (this.props.onChange) {
        this.props.onChange(e);
      }
    }

    render() {
      const toastrCSS = require('react-bootstrap-table/css/toastr.css');
      const reactBootstrapTableCSS = require('react-bootstrap-table/css/react-bootstrap-table.css');

      const muiPropsObj = {
        disabled: this.props.disabled,
        ...muiProps
      };

      if (this.props.indeterminate) {
        muiPropsObj.checkedIcon = <IndeterminateCheckbox />;
      }

      return <CheckBox
        value={this.props.checked}
        key={this.props.rowIndex}
        theme={theme}
        checked={this.props.checked}
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
    }
  }

  return SelectableCheckBox;
};


/**
 * Material UI based boostrap table
 */
class Table extends Component {
  static propTypes = {
    /**
     * Applies a given MaterialUI theme.
     */
    theme: PropTypes.object,
    selectorTheme: PropTypes.object,
    selectorMuiProps: PropTypes.object,
    selectorQflProps: PropTypes.object,
    /**
     * Array of elements to show in the table.
     */
    dataSource: PropTypes.array,
    /**
     * Props forwarded to Bootstraptable.
     */
    rbtProps: PropTypes.object,
    /**
     * Schema describing properties for rendering TableHeaderColumns.
     */
    thcSchema: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      thcProps: PropTypes.object
    })).isRequired,
    stylingProps: PropTypes.object,
    onSelectedRowsChanged: PropTypes.func
  };

  constructor() {
    super();
    this.state = {
      selectedRows: {}
    };
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme(this.props.theme)
    };
  }

  componentDidMount() {
    //Hack for render table in Grid
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
    const elementContainer = this.refs.reactBootstrapTable && this.refs.reactBootstrapTable.refs && this.refs.reactBootstrapTable.refs.table || null;
    if (elementContainer && $(elementContainer).children('.react-bs-container-body')) {
      const scrollable = $(elementContainer).children('.react-bs-container-body');
      if (scrollable && scrollable.length === 1) {
        scrollable.scroll(() => {
          const scrollTop = scrollable.scrollTop(), innerHeight = scrollable.innerHeight(),
            scrollHeight = scrollable[0].scrollHeight;
          const scrolltrigger = 0.75;

          if ((scrollTop + innerHeight >= scrollHeight - ((1 - scrolltrigger) * scrollHeight)) && this.props.rbtProps && this.props.rbtProps.options && this.props.rbtProps.options.onLoadMore) {
            this.props.rbtProps.options.onLoadMore();
          }
        });
      }
    }

  }

  cleanSelected() {
    this.handleRowSelectAll(false);
    this.refs.reactBootstrapTable.cleanSelected();
  }

  handleRowSelect(row, isSelected, event) {
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

  handleRowSelectAll(isSelected, rows) {
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

  render() {
    const dataSource = (this.props.dataSource || this.props.rbtProps.data);
    delete this.props.rbtProps.data;

    const { qflProps, rbtProps } = buildTheme({
      theme: this.props.theme,
      sourceRbtProps: this.props.rbtProps,
      sourceQflProps: this.props.qflProps,
      componentName: 'Table'
    });

    const { stylingProps } = this.props;
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

    const selectRowProp = {
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
          ref="reactBootstrapTable"
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

Table.childContextTypes = {
  muiTheme: PropTypes.object
};

Table.defaultProps = {
  theme: 'Default',
  selectRowProp: false
};

export default Table;
