"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var index_js_1 = require("react-bootstrap-table/lib/index.js");
var remove_js_1 = require("material-ui/svg-icons/content/remove.js");
var done_js_1 = require("material-ui/svg-icons/action/done.js");
var $ = require("jquery");
var CheckBox_1 = require("../../InputForms/CheckBox/CheckBox");
var themeBuilder_1 = require("../../themeBuilder");
var getSelectable = function (theme, muiProps, qflProps) {
    var SelectableCheckBox = (function (_super) {
        __extends(SelectableCheckBox, _super);
        function SelectableCheckBox(props) {
            var _this = _super.call(this, props) || this;
            _this.state = {
                currentValue: props.checked
            };
            return _this;
        }
        SelectableCheckBox.prototype.handleChange = function (e, oldValue, newValue) {
            this.setState({
                currentValue: newValue
            });
            if (this.props.onChange) {
                this.props.onChange(e);
            }
        };
        SelectableCheckBox.prototype.render = function () {
            var _this = this;
            var muiPropsObj = __assign({ disabled: this.props.disabled }, muiProps);
            if (this.props.indeterminate) {
                muiPropsObj.checkedIcon = React.createElement(remove_js_1.default, { style: { width: '20px', height: '20px' } });
            }
            else {
                muiPropsObj.checkedIcon = React.createElement(done_js_1.default, { style: { width: '20px', height: '20px' } });
            }
            return (React.createElement(CheckBox_1.default, { value: this.props.checked, dataKey: (this.props.rowIndex).toString(), theme: theme, muiProps: muiPropsObj, qflProps: __assign({ style: {} }, qflProps), onChange: function (e, oldValue, newValue) {
                    if (oldValue !== newValue) {
                        _this.handleChange(e, oldValue, newValue);
                    }
                } }));
        };
        SelectableCheckBox.defaultProps = {
            checked: false,
            disabled: false,
            rowIndex: -1,
            indeterminate: false,
            onChange: null
        };
        return SelectableCheckBox;
    }(React.Component));
    return SelectableCheckBox;
};
/**
 * Material UI based boostrap table
 */
var Table = (function (_super) {
    __extends(Table, _super);
    function Table() {
        var _this = _super.call(this) || this;
        _this.state = {
            selectedRows: {}
        };
        return _this;
    }
    Table.prototype.componentDidMount = function () {
        var _this = this;
        // Hack for render table in Grid
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'));
        }, 0);
        var refs = this.refs;
        var elementContainer = ((refs.reactBootstrapTable
            && refs.reactBootstrapTable.refs
            && refs.reactBootstrapTable.refs.table)
            || null);
        if (elementContainer && $(elementContainer).children('.react-bs-container-body')) {
            var scrollable_1 = $(elementContainer).children('.react-bs-container-body');
            if (scrollable_1 && scrollable_1.length === 1) {
                scrollable_1.scroll(function () {
                    var scrollTop = scrollable_1.scrollTop(), innerHeight = scrollable_1.innerHeight(), scrollHeight = scrollable_1[0].scrollHeight;
                    var scrolltrigger = 0.75;
                    var bottomReached = (scrollTop + innerHeight >= scrollHeight - ((1 - scrolltrigger) * scrollHeight));
                    if (bottomReached && _this.props.rbtProps && _this.props.rbtProps.options && _this.props.rbtProps.options.onLoadMore) {
                        _this.props.rbtProps.options.onLoadMore();
                    }
                });
            }
        }
    };
    Table.prototype.cleanSelected = function () {
        this.handleRowSelectAll(false);
        var refs = this.refs;
        refs.reactBootstrapTable.cleanSelected();
    };
    Table.prototype.handleRowSelect = function (row, isSelected, event) {
        var currentSelectedRows = this.state.selectedRows;
        if (isSelected) {
            currentSelectedRows[row.id] = row;
        }
        else {
            delete currentSelectedRows[row.id];
        }
        this.setState({
            selectedRows: currentSelectedRows
        });
        if (this.props.onSelectedRowsChanged) {
            this.props.onSelectedRowsChanged(currentSelectedRows);
        }
    };
    Table.prototype.handleRowSelectAll = function (isSelected, rows) {
        var currentSelectedRows = {};
        if (rows && isSelected) {
            for (var r = 0; r < rows.length; r++) {
                currentSelectedRows[rows[r].id] = rows[r];
            }
        }
        this.setState({
            selectedRows: currentSelectedRows
        });
        if (this.props.onSelectedRowsChanged) {
            this.props.onSelectedRowsChanged(currentSelectedRows);
        }
    };
    Table.prototype.render = function () {
        var _this = this;
        var toastrCSS = require('react-bootstrap-table/css/toastr.css');
        var reactBootstrapTableCSS = require('react-bootstrap-table/css/react-bootstrap-table.css');
        var dataSource = (this.props.dataSource || this.props.rbtProps.data);
        delete this.props.rbtProps.data;
        var _a = themeBuilder_1.buildTheme({
            theme: this.props.theme,
            sourceRbtProps: this.props.rbtProps,
            sourceQflProps: this.props.qflProps,
            componentName: 'Table'
        }), qflProps = _a.qflProps, rbtProps = _a.rbtProps;
        var stylingProps = this.props.stylingProps;
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
        var selectRowProp = __assign({ mode: 'checkbox', clickToSelect: !!this.props.selectRowProp, onSelect: function (row, isSelected, event) {
                _this.handleRowSelect(row, isSelected, event);
            }, onSelectAll: function (isSelected, rows) {
                _this.handleRowSelectAll(isSelected, rows);
            } }, rbtProps.selectRow);
        rbtProps.selectRow = selectRowProp;
        selectRowProp.customComponent = getSelectable(this.props.selectorTheme, this.props.selectorMuiProps, this.props.selectorQflProps);
        return (React.createElement("div", __assign({}, qflProps),
            React.createElement(index_js_1.BootstrapTable, __assign({ ref: 'reactBootstrapTable', data: dataSource }, rbtProps), this.props.thcSchema.map(function (thcItem) { return React.createElement(index_js_1.TableHeaderColumn, __assign({ key: thcItem.name }, thcItem.thcProps), thcItem.name); }))));
    };
    Table.defaultProps = {
        theme: null,
        muiProps: {},
        qflProps: {},
        selectorTheme: null,
        selectorMuiProps: null,
        selectorQflProps: null,
        dataSource: null,
        rbtProps: null,
        stylingProps: null,
        onSelectedRowsChanged: null
    };
    return Table;
}(React.Component));
exports.default = Table;

//# sourceMappingURL=Table.js.map
