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

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _themeBuilder = require('../../themeBuilder');

var _ = require('../../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProcessableCrudTable = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(ProcessableCrudTable, _Component);

  function ProcessableCrudTable(props) {
    (0, _classCallCheck3.default)(this, ProcessableCrudTable);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ProcessableCrudTable.__proto__ || Object.getPrototypeOf(ProcessableCrudTable)).call(this, props));

    _this.state = {
      currentOffset: 0,
      currentFirst: props.pageSize,
      isFetching: true,
      hasLoadedMore: false,
      hasReloaded: false,
      hasLoaded: false,
      synced: false,
      entityCollection: []
    };
    return _this;
  }

  (0, _createClass3.default)(ProcessableCrudTable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.props.fetcher({
        mode: 'load',
        offset: this.state.currentOffset,
        first: this.props.pageSize,
        query: JSON.stringify({
          operator: 'and',
          queries: this.props.baseFilter ? [this.props.baseFilter()] : []
        })
      }, function (e) {
        if (e.mounted && !e.done) {
          _this2.setState({
            isFetching: true,
            hasLoaded: false,
            synced: false
          });
        } else if (e.mounted && e.done) {
          _this2.setState({
            isFetching: false,
            hasLoaded: true
          });
        }
      });
    }
  }, {
    key: 'getGlobalSearchFilter',
    value: function getGlobalSearchFilter(searchValue, ignoreCase) {
      var searchFilter = this.props.columnSchema.filter(function (element) {
        return element.searchable;
      }).map(function (element) {
        if (element.searchableType === 'float' || element.searchableType === 'integer') {
          var parsedSearchValue = element.searchableType === 'float' ? parseFloat(searchValue) : parseInt(searchValue);
          if (isNaN(parsedSearchValue)) {
            return null;
          }
          searchValue = parsedSearchValue;

          return {
            attribute: element.thcProps.dataField,
            type: 'number',
            operator: '=',
            value: searchValue
          };
        }

        return {
          attribute: element.thcProps.dataField,
          operator: 'contains',
          value: searchValue,
          ignoreCase: ignoreCase
        };
      }).filter(function (element) {
        return element != null;
      });

      return searchFilter;
    }
  }, {
    key: 'initCollection',
    value: function initCollection(firstCall) {
      var _this3 = this;

      var newEntityCollection = this.state.entityCollection || [];
      var entityCollection = this.props.entityCollection;


      if (entityCollection && entityCollection.edges) {
        newEntityCollection = entityCollection.edges.map(function (item) {
          return item.node;
        });
      }

      setTimeout(function () {
        _this3.setState({
          entityCollection: newEntityCollection,
          synced: true
        });
      }, 0);

      return newEntityCollection;
    }
  }, {
    key: 'extendCollection',
    value: function extendCollection() {
      var _this4 = this;

      var currentEntityCollection = this.state.entityCollection || [];
      var newEntityCollection = currentEntityCollection;
      var entityCollection = this.props.entityCollection;

      if (entityCollection && entityCollection.edges) {
        newEntityCollection = currentEntityCollection.concat(entityCollection.edges.map(function (item) {
          return item.node;
        }));
      }

      setTimeout(function () {
        _this4.setState({
          currentOffset: _this4.state.currentOffset + _this4.props.pageSize,
          entityCollection: newEntityCollection,
          synced: true
        });
      }, 0);

      return newEntityCollection;
    }
  }, {
    key: 'prepareCollection',
    value: function prepareCollection() {
      if (!this.state.synced) {
        if (!this.state.isFetching) {
          if (this.state.hasLoaded && this.props.fetchingMode === 'load') {
            return this.initCollection(true);
          } else if (this.state.hasReloaded && this.state.hasLoaded && this.props.fetchingMode === 'reload') {
            return this.initCollection(false);
          } else if (this.state.hasLoadedMore && this.state.hasLoaded && this.props.fetchingMode === 'more') {
            return this.extendCollection();
          } else {
            return this.initCollection(true);
          }
        }
      }

      return this.state.entityCollection || [];
    }
  }, {
    key: 'handleRowDoubleClick',
    value: function handleRowDoubleClick(row) {
      if (this.props.onRowDoubleClick) {
        this.props.onRowDoubleClick(row);
      }
    }
  }, {
    key: 'handleSearch',
    value: function handleSearch(searchValue) {
      var _this5 = this;

      this.setState({
        currentOffset: 0
      }, function () {
        if (searchValue) {
          _this5.props.fetcher({
            mode: 'reload',
            offset: _this5.state.currentOffset,
            first: _this5.state.currentFirst,
            query: JSON.stringify({
              operator: 'and',
              queries: _this5.props.baseFilter ? [_this5.props.baseFilter(), {
                operator: 'or',
                queries: _this5.getGlobalSearchFilter(searchValue, true)
              }] : [_this5.getGlobalSearchFilter(searchValue, true)]
            })
          }, function (e) {
            if (e.mounted && !e.done) {
              _this5.setState({
                synced: false,
                isFetching: true,
                hasReloaded: false
              });
            } else if (e.mounted && e.done) {
              _this5.setState({
                isFetching: false,
                hasReloaded: true
              });
            }
          });
        } else {
          _this5.props.fetcher({
            mode: 'reload',
            offset: _this5.state.currentOffset,
            first: _this5.state.currentFirst,
            query: JSON.stringify({
              operator: 'and',
              queries: _this5.props.baseFilter() ? [_this5.props.baseFilter()] : []
            })
          }, function (e) {
            if (e.mounted && !e.done) {
              _this5.setState({
                synced: false,
                isFetching: true,
                hasReloaded: false
              });
            } else if (e.mounted && e.done) {
              _this5.setState({
                isFetching: false,
                hasReloaded: true
              });
            }
          });
        }
      });
    }
  }, {
    key: 'handleSortChange',
    value: function handleSortChange(sortName, sortOrder) {
      var _this6 = this;

      if (sortName && sortOrder) {
        this.setState({
          currentOffset: 0
        }, function () {
          _this6.props.fetcher({
            mode: 'reload',
            offset: _this6.state.currentOffset,
            first: _this6.state.currentFirst,
            orderBy: JSON.stringify({ attributes: [{ attribute: sortName, order: sortOrder }] })
          }, function (e) {
            if (e.mounted && !e.done) {
              _this6.setState({
                synced: false,
                isFetching: true,
                hasReloaded: false
              });
            } else if (e.mounted && e.done) {
              _this6.setState({
                isFetching: false,
                hasReloaded: true
              });
            }
          });
        });
      }
    }
  }, {
    key: 'handleLoadMore',
    value: function handleLoadMore() {
      var _this7 = this;

      var entityCollection = this.props.entityCollection;


      if (!this.state.isFetching && entityCollection && entityCollection.pageInfo && entityCollection.pageInfo.hasNextPage) {
        var currentOffset = this.state.currentOffset;
        var newOffset = currentOffset + this.props.pageSize;
        var newFirst = this.props.pageSize + newOffset;
        this.setState({
          currentFirst: newFirst
        }, function () {
          _this7.props.fetcher({
            mode: 'more',
            offset: newOffset
          }, function (e) {
            if (e.mounted && !e.done) {
              _this7.setState({
                synced: false,
                isFetching: true,
                hasLoadedMore: false
              });
            } else if (e.mounted && e.done) {
              _this7.setState({
                isFetching: false,
                hasLoadedMore: true
              });
            }
          });
        });
      }
    }
  }, {
    key: 'cleanSelectedEntities',
    value: function cleanSelectedEntities() {
      if (this.refs && this.refs.entitiesTable && this.refs.entitiesTable.cleanSelected) {
        this.refs.entitiesTable.cleanSelected();
      }
    }
  }, {
    key: 'handleProcessEnded',
    value: function handleProcessEnded(processKey, data) {
      var _this8 = this;

      this.props.fetcher({
        mode: 'reload',
        offset: this.state.currentOffset
      }, function (e) {
        if (e.mounted && !e.done) {
          _this8.setState({
            synced: false,
            isFetching: true,
            hasReloaded: false
          });
        } else if (e.mounted && e.done) {
          _this8.setState({
            isFetching: false,
            hasReloaded: true
          }, function () {
            if (processKey === 'delete' + _this8.props.entityTypeName && data.data === true) {
              _this8.cleanSelectedEntities();
            }
          });
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this9 = this;

      var children = this.props.children;

      var _buildTheme = (0, _themeBuilder.buildTheme)({
        theme: this.props.theme,
        sourceRbtProps: this.props.rbtProps,
        sourceQflProps: this.props.qflProps,
        componentName: 'Table'
      }),
          qflProps = _buildTheme.qflProps,
          rbtProps = _buildTheme.rbtProps;

      var tableElement = null;
      if (this.state.hasLoaded) {
        tableElement = _react2.default.createElement(_.ProcessableTable, {
          mbClient: this.props.mbClient,

          tableOverlayStyles: this.props.tableOverlayStyles,
          tableStyles: this.props.tableStyles,

          theme: this.props.theme,

          ref: 'entitiesTable',
          dataClassName: this.props.entityTypeName,
          frame: false,
          onSearch: function onSearch(searchValue) {
            return _this9.handleSearch(searchValue);
          },
          onProcessEnded: function onProcessEnded(processKey, data) {
            return _this9.handleProcessEnded(processKey, data);
          },
          createProcessKey: 'Create',
          createStartToken: this.props.createStartToken,

          createButtonTheme: this.props.createButtonTheme,
          createDialogTheme: this.props.createDialogTheme,
          createFormItemTheme: this.props.createFormItemTheme,
          createConfirmTheme: this.props.createConfirmTheme,
          createWidgetTheme: this.props.createWidgetTheme,
          createTheme: this.props.createTheme,

          itemBasedButtonTheme: this.props.itemBasedButtonTheme,
          listBasedButtonTheme: this.props.listBasedButtonTheme,
          filterMenuTheme: this.props.filterMenuTheme,
          baseFilterMenuTheme: this.props.baseFilterMenuTheme,

          searchFieldTheme: this.props.searchFieldTheme,

          tableTheme: this.props.tableTheme,
          tableSelectorTheme: this.props.tableSelectorTheme,

          title: this.props.title,
          data: this.prepareCollection(),
          itemBasedButtonSchema: this.props.itemBasedButtonSchema,
          listBasedButtonSchema: this.props.listBasedButtonSchema,
          filterMenuSchema: this.props.filterMenuSchema,
          baseFilterMenuSchema: this.props.baseFilterMenuSchema,
          tableProps: (0, _extends3.default)({
            rbtProps: (0, _extends3.default)({
              remote: true,
              sortName: this.props.defaultSortName,
              sortOrder: this.props.defaultSortOrder,
              defaultSortName: this.props.defaultSortName,
              defaultSortOrder: this.props.defaultSortOrder,
              options: {
                onRowDoubleClick: function onRowDoubleClick(row) {
                  return _this9.handleRowDoubleClick(row);
                },
                onSortChange: function onSortChange(sortName, sortOrder) {
                  return _this9.handleSortChange(sortName, sortOrder);
                },
                onLoadMore: function onLoadMore() {
                  return _this9.handleLoadMore();
                }
              }
            }, rbtProps),
            thcSchema: this.props.columnSchema
          }, qflProps)
        });
      }

      return _react2.default.createElement(
        'div',
        null,
        tableElement,
        children
      );
    }
  }]);
  return ProcessableCrudTable;
}(_react.Component), _class.propTypes = {
  children: _react.PropTypes.node,
  title: _react.PropTypes.string,

  mbClient: _react.PropTypes.object,
  entityCollection: _react.PropTypes.object,
  fetcher: _react.PropTypes.func.required,
  fetchingMode: _react.PropTypes.object,
  baseFilter: _react.PropTypes.func,

  pageSize: _react.PropTypes.number,
  entityTypeName: _react.PropTypes.string,
  onRowDoubleClick: _react.PropTypes.func,

  createStartToken: _react.PropTypes.object,
  createButtonTheme: _react.PropTypes.object,
  createDialogTheme: _react.PropTypes.object,
  createFormItemTheme: _react.PropTypes.object,
  createConfirmTheme: _react.PropTypes.object,
  createWidgetTheme: _react.PropTypes.object,
  createTheme: _react.PropTypes.object,

  itemBasedButtonSchema: _react.PropTypes.arrayOf(_react.PropTypes.object),
  listBasedButtonSchema: _react.PropTypes.arrayOf(_react.PropTypes.object),
  filterMenuSchema: _react.PropTypes.arrayOf(_react.PropTypes.object),
  baseFilterMenuSchema: _react.PropTypes.arrayOf(_react.PropTypes.object),

  itemBasedButtonTheme: _react.PropTypes.object,
  listBasedButtonTheme: _react.PropTypes.object,
  filterMenuTheme: _react.PropTypes.object,
  baseFilterMenuTheme: _react.PropTypes.object,

  searchFieldTheme: _react.PropTypes.object,

  defaultSortName: _react.PropTypes.string,
  defaultSortOrder: _react.PropTypes.string,

  columnSchema: _react.PropTypes.arrayOf(_react.PropTypes.object),

  tableOverlayStyles: _react.PropTypes.object,
  tableStyles: _react.PropTypes.object,

  theme: _react.PropTypes.object,
  tableTheme: _react.PropTypes.object,
  tableSelectorTheme: _react.PropTypes.object
}, _class.defaultProps = {
  pageSize: 16,
  fetchingMode: 'initial',
  entityTypeName: 'Entity',
  defaultSortName: 'id',
  defaultSortOrder: 'asc'
}, _temp);
exports.default = ProcessableCrudTable;
module.exports = exports['default'];
//# sourceMappingURL=CrudTable.js.map
