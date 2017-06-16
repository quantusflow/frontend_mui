'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class2, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrapTable = require('react-bootstrap-table');

var _remove = require('material-ui/svg-icons/content/remove');

var _remove2 = _interopRequireDefault(_remove);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _CheckBox = require('../../InputForms/CheckBox/CheckBox');

var _CheckBox2 = _interopRequireDefault(_CheckBox);

var _themeBuilder = require('../../themeBuilder');

var _styles = require('material-ui/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getSelectable = function getSelectable(theme, muiProps, qflProps) {
  var _class, _temp;

  var SelectableCheckBox = (_temp = _class = function (_Component) {
    (0, _inherits3.default)(SelectableCheckBox, _Component);

    function SelectableCheckBox(props) {
      (0, _classCallCheck3.default)(this, SelectableCheckBox);

      var _this = (0, _possibleConstructorReturn3.default)(this, (SelectableCheckBox.__proto__ || Object.getPrototypeOf(SelectableCheckBox)).call(this, props));

      _this.state = {
        currentValue: props.value
      };
      return _this;
    }

    (0, _createClass3.default)(SelectableCheckBox, [{
      key: 'handleChange',
      value: function handleChange(e, oldValue, newValue) {
        this.setState({
          currentValue: newValue
        });
        if (this.props.onChange) {
          this.props.onChange(e);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var toastrCSS = require('react-bootstrap-table/css/toastr.css');
        var reactBootstrapTableCSS = require('react-bootstrap-table/css/react-bootstrap-table.css');

        var muiPropsObj = (0, _extends3.default)({
          disabled: this.props.disabled
        }, muiProps);

        if (this.props.indeterminate) {
          muiPropsObj.checkedIcon = _react2.default.createElement(_remove2.default, null);
        }

        return _react2.default.createElement(_CheckBox2.default, {
          value: this.props.checked,
          key: this.props.rowIndex,
          theme: theme,
          checked: this.props.checked,
          muiProps: muiPropsObj,
          qflProps: (0, _extends3.default)({
            style: {}
          }, qflProps),
          onChange: function onChange(e, oldValue, newValue) {
            if (oldValue !== newValue) {
              _this2.handleChange(e, oldValue, newValue);
            }
          }
        });
      }
    }]);
    return SelectableCheckBox;
  }(_react.Component), _class.propTypes = {
    type: _propTypes2.default.string,
    checked: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool,
    rowIndex: _propTypes2.default.any,
    indeterminate: _propTypes2.default.bool,
    onChange: _propTypes2.default.func,
    selectRowProp: _propTypes2.default.bool
  }, _temp);


  return SelectableCheckBox;
};

/**
 * Material UI based boostrap table
 */
var Table = (_temp2 = _class2 = function (_Component2) {
  (0, _inherits3.default)(Table, _Component2);

  function Table() {
    (0, _classCallCheck3.default)(this, Table);

    var _this3 = (0, _possibleConstructorReturn3.default)(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this));

    _this3.state = {
      selectedRows: {}
    };
    return _this3;
  }

  (0, _createClass3.default)(Table, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        muiTheme: (0, _styles.getMuiTheme)(this.props.theme)
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this4 = this;

      //Hack for render table in Grid
      setTimeout(function () {
        window.dispatchEvent(new Event('resize'));
      }, 0);
      var elementContainer = this.refs.reactBootstrapTable && this.refs.reactBootstrapTable.refs && this.refs.reactBootstrapTable.refs.table || null;
      if (elementContainer && (0, _jquery2.default)(elementContainer).children('.react-bs-container-body')) {
        var scrollable = (0, _jquery2.default)(elementContainer).children('.react-bs-container-body');
        if (scrollable && scrollable.length === 1) {
          scrollable.scroll(function () {
            var scrollTop = scrollable.scrollTop(),
                innerHeight = scrollable.innerHeight(),
                scrollHeight = scrollable[0].scrollHeight;
            var scrolltrigger = 0.75;

            if (scrollTop + innerHeight >= scrollHeight - (1 - scrolltrigger) * scrollHeight && _this4.props.rbtProps && _this4.props.rbtProps.options && _this4.props.rbtProps.options.onLoadMore) {
              _this4.props.rbtProps.options.onLoadMore();
            }
          });
        }
      }
    }
  }, {
    key: 'cleanSelected',
    value: function cleanSelected() {
      this.handleRowSelectAll(false);
      this.refs.reactBootstrapTable.cleanSelected();
    }
  }, {
    key: 'handleRowSelect',
    value: function handleRowSelect(row, isSelected, event) {
      var currentSelectedRows = this.state.selectedRows;
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
  }, {
    key: 'handleRowSelectAll',
    value: function handleRowSelectAll(isSelected, rows) {
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
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var dataSource = this.props.dataSource || this.props.rbtProps.data;
      delete this.props.rbtProps.data;

      var _buildTheme = (0, _themeBuilder.buildTheme)({
        theme: this.props.theme,
        sourceRbtProps: this.props.rbtProps,
        sourceQflProps: this.props.qflProps,
        componentName: 'Table'
      }),
          qflProps = _buildTheme.qflProps,
          rbtProps = _buildTheme.rbtProps;

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

      var selectRowProp = {
        mode: 'checkbox',
        clickToSelect: this.props.selectRowProp,
        onSelect: function onSelect(row, isSelected, event) {
          _this5.handleRowSelect(row, isSelected, event);
        },
        onSelectAll: function onSelectAll(isSelected, rows) {
          _this5.handleRowSelectAll(isSelected, rows);
        }
      };

      selectRowProp.customComponent = getSelectable(this.props.selectorTheme, this.props.selectorMuiProps, this.props.selectorQflProps);

      return _react2.default.createElement(
        'div',
        qflProps,
        _react2.default.createElement(
          _reactBootstrapTable.BootstrapTable,
          (0, _extends3.default)({
            ref: 'reactBootstrapTable',
            data: dataSource,
            selectRow: selectRowProp
          }, rbtProps),
          this.props.thcSchema.map(function (thcItem) {
            return _react2.default.createElement(
              _reactBootstrapTable.TableHeaderColumn,
              (0, _extends3.default)({
                key: thcItem.name }, thcItem.thcProps),
              thcItem.name
            );
          })
        )
      );
    }
  }]);
  return Table;
}(_react.Component), _class2.propTypes = {
  /**
   * Applies a given MaterialUI theme.
   */
  theme: _propTypes2.default.object,
  selectorTheme: _propTypes2.default.object,
  selectorMuiProps: _propTypes2.default.object,
  selectorQflProps: _propTypes2.default.object,
  /**
   * Array of elements to show in the table.
   */
  dataSource: _propTypes2.default.array,
  /**
   * Props forwarded to Bootstraptable.
   */
  rbtProps: _propTypes2.default.object,
  /**
   * Schema describing properties for rendering TableHeaderColumns.
   */
  thcSchema: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    name: _propTypes2.default.string.isRequired,
    thcProps: _propTypes2.default.object
  })).isRequired,
  stylingProps: _propTypes2.default.object,
  onSelectedRowsChanged: _propTypes2.default.func
}, _temp2);


Table.childContextTypes = {
  muiTheme: _propTypes2.default.object
};

Table.defaultProps = {
  theme: 'Default',
  selectRowProp: false
};

exports.default = Table;
module.exports = exports['default'];
//# sourceMappingURL=Table.js.map
