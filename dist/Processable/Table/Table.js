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

var _ = require('../../');

var _materialUi = require('material-ui');

var _expandMore = require('material-ui/svg-icons/navigation/expand-more');

var _expandMore2 = _interopRequireDefault(_expandMore);

var _TableOverlay = require('./TableOverlay');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProcessableTable = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(ProcessableTable, _React$Component);

  function ProcessableTable(props) {
    (0, _classCallCheck3.default)(this, ProcessableTable);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ProcessableTable.__proto__ || Object.getPrototypeOf(ProcessableTable)).call(this, props));

    _this.delay = function () {
      var timer = 0;
      return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
      };
    }();

    _this.itemBasedMoreMenuId = 'vorstartItemBasedMoreMenu';


    _this.state = {
      mbClient: props.mbClient,
      subscriptions: {},
      isItemBasedMoreMenuOpened: false,
      selectedRows: {},
      searchValue: props.searchValue
    };
    return _this;
  }

  (0, _createClass3.default)(ProcessableTable, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this2 = this;

      if (this.state.subscriptions) {
        Object.keys(this.state.subscriptions).forEach(function (subscription) {
          _this2.state.subscriptions[subscription].channel.cancel();
        });
      }
    }
  }, {
    key: 'handleStart',
    value: function handleStart(subscriptionId, startToken, onProcessEnded, done) {
      var _this3 = this;

      var participantUUID = this.state.mbClient._participantId;
      var msg = this.state.mbClient.createMessage({
        action: 'start',
        key: subscriptionId,
        token: startToken
      });

      this.state.mbClient.publish('/processengine', msg);
      var curChannelName = '/participant/' + participantUUID;
      var subscription = {
        channelName: curChannelName,
        channel: this.state.mbClient.subscribe(curChannelName, function (fayeMsg) {
          if (fayeMsg && fayeMsg.data && fayeMsg.data.action) {
            var data = fayeMsg.data;
            var processKey = subscriptionId;
            switch (fayeMsg.data.action) {
              case 'userTask':
                {
                  var nextTaskEntity = fayeMsg.data.data;
                  var nextTask = fayeMsg.data.data.nodeDef;

                  var curTaskChannelName = '/processengine/node/' + nextTaskEntity.id;
                  var currentSubscriptions = _this3.state.subscriptions;
                  currentSubscriptions[subscriptionId].started = true;
                  currentSubscriptions[subscriptionId].nextTask = nextTask;
                  currentSubscriptions[subscriptionId].nextTaskEntity = nextTaskEntity;
                  currentSubscriptions[subscriptionId].taskChannelName = curTaskChannelName;

                  _this3.setState({
                    subscriptions: currentSubscriptions
                  });
                  break;
                }
              case 'endEvent':
                {
                  _this3.handleStop(subscriptionId);

                  _this3.setState({
                    currentOffset: 0
                  }, function () {
                    if (_this3.props.onProcessEnded) {
                      _this3.props.onProcessEnded(processKey, data);
                    }
                    if (onProcessEnded) {
                      onProcessEnded(processKey, data);
                    }
                  });

                  break;
                }
              default:
                break;
            }
          }
        })
      };

      subscription.channel.then(function () {
        var currentSubscriptions = _this3.state.subscriptions;
        currentSubscriptions[subscriptionId] = subscription;
        _this3.setState({
          subscriptions: currentSubscriptions
        }, done);
      });
    }
  }, {
    key: 'handleStop',
    value: function handleStop(subscriptionId, done) {
      var currentSubscriptions = this.state.subscriptions;
      var currentSubscription = currentSubscriptions[subscriptionId];
      currentSubscription.channel.cancel();

      delete currentSubscriptions[subscriptionId];

      this.setState({
        subscriptions: currentSubscriptions
      }, done);
    }
  }, {
    key: 'handleItemClicked',
    value: function handleItemClicked(item) {
      var _this4 = this;

      this.setState({
        isItemBasedMoreMenuOpened: false
      });

      var selectedItems = [];
      if (this.state.selectedRows) {
        Object.keys(this.state.selectedRows).forEach(function (key) {
          selectedItems.push(_this4.state.selectedRows[key]);
        });
      }
      if (selectedItems && selectedItems.length > 0 && item && item.processableKey) {
        var startToken = null;
        if (selectedItems.length === 1) {
          startToken = { id: selectedItems[0].id };
          if (item.startTokenTransformer) {
            startToken = item.startTokenTransformer(startToken, selectedItems[0]);
          }
        } else {
          startToken = selectedItems.map(function (selectedItem) {
            var resultToken = { id: selectedItem.id };
            if (item.startTokenTransformer) {
              resultToken = item.startTokenTransformer(resultToken, selectedItem);
            }
            return resultToken;
          });
        }
        this.handleStart(item.processableKey, startToken, item.onProcessEnded);
      }
    }
  }, {
    key: 'handleSelectedRowsChanged',
    value: function handleSelectedRowsChanged(selectedRows) {
      this.setState({
        selectedRows: selectedRows
      });
    }
  }, {
    key: 'cleanSelected',
    value: function cleanSelected() {
      if (this.refs && this.refs.listBoxTable && this.refs.listBoxTable.cleanSelected) {
        this.refs.listBoxTable.cleanSelected();
      }
    }
  }, {
    key: 'handleFilterItemChange',
    value: function handleFilterItemChange(key, oldValue, newValue, choosenElement, element) {
      if (this.props.onFilterChange) {
        this.props.onFilterChange(key, newValue, choosenElement, element);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var newClassName = null;
      if (this.props.frame === true) {
        newClassName = this.props.tableStyles.tableWithFrameClassName;
      } else {
        newClassName = this.props.tableStyles.tableWithoutFrameClassName;
      }

      var _ref = this.props.tableProps || {},
          rbtProps = _ref.rbtProps;

      if (this.props.tableProps) {
        delete this.props.tableProps.rbtProps;
      }

      var processables = [];

      var createButton = null;
      if (this.props.createProcessKey) {
        createButton = _react2.default.createElement(_.RaisedButton, (0, _extends3.default)({
          theme: this.props.createButtonTheme,
          muiProps: (0, _extends3.default)({
            label: '+',
            primary: true,
            className: this.props.tableStyles.createButtonClassName,
            style: {
              borderRadius: '0px'
            },
            onClick: function onClick(e) {
              _this5.handleStart(_this5.props.createProcessKey + _this5.props.dataClassName, _this5.props.createStartToken);
            }
          }, this.props.createButtonMuiProps),
          qflProps: (0, _extends3.default)({
            style: {
              paddingTop: '9px',
              width: 'auto',
              display: 'inline-block',
              top: '-14px',
              position: 'relative'
            }
          }, this.props.createButtonQflProps)
        }, this.props.createButtonProps));

        var createProcessContainer = null;
        var createProcessable = this.state.subscriptions && this.state.subscriptions['Create' + this.props.dataClassName] || null;
        if (createProcessable && createProcessable.started && createProcessable.taskChannelName) {
          createProcessContainer = _react2.default.createElement(_.Processable, { modal: true, key: createProcessable.nextTaskEntity.id, processable: createProcessable,
            buttonTheme: this.props.createButtonTheme, dialogTheme: this.props.createDialogTheme,
            formItemTheme: this.props.createFormItemTheme, confirmTheme: this.props.createConfirmTheme,
            widgetTheme: this.props.createWidgetTheme, theme: this.props.createTheme,
            mbClient: this.state.mbClient });
        }

        processables.push(createProcessContainer);
      }

      var filterMenuElements = [];
      if (this.props.filterMenuSchema && this.props.filterMenuSchema.length > 0) {
        filterMenuElements = this.props.filterMenuSchema.map(function (filterMenuSchemaItem) {
          return _react2.default.createElement(_.DropDown, {
            key: filterMenuSchemaItem.key,
            theme: filterMenuSchemaItem.theme,
            value: filterMenuSchemaItem.currentValue,
            items: filterMenuSchemaItem.items.map(function (dropDownItem, dropDownItemIdx) {
              return _react2.default.createElement(_materialUi.MenuItem, {
                key: filterMenuSchemaItem.key + '-' + dropDownItemIdx,
                value: dropDownItem.value,
                primaryText: dropDownItem.label
              });
            }),
            muiProps: (0, _extends3.default)({
              floatingLabelText: filterMenuSchemaItem.label
            }, filterMenuSchemaItem.muiProps),
            onChange: function onChange(event, index, oldValue, newValue) {
              return _this5.handleFilterItemChange(filterMenuSchemaItem.key, oldValue, newValue, filterMenuSchemaItem.items[index], filterMenuSchemaItem);
            },
            qflProps: (0, _extends3.default)({
              style: {
                paddingTop: _this5.props.theme.distances.primary,
                display: 'inline-block',
                width: '150px',
                marginLeft: _this5.props.theme.distances.primary
              }
            }, filterMenuSchemaItem.qflProps)
          });
        });
      }

      var itemBasedElements = [];
      if (Object.keys(this.state.selectedRows).length > 0) {
        if (this.props.itemBasedButtonSchema && this.props.itemBasedButtonSchema.length > 0) {
          itemBasedElements = itemBasedElements.concat(this.props.itemBasedButtonSchema.filter(function (buttonSchemaItem) {
            if (!buttonSchemaItem.multiple && Object.keys(_this5.state.selectedRows).length > 1) {
              return false;
            }
            return !buttonSchemaItem.isMore;
          }).map(function (buttonSchemaItem, buttonSchemaIdx) {
            var itemBasedButtonProcessContainer = null;
            var itemBasedButtonProcessable = _this5.state.subscriptions && _this5.state.subscriptions[buttonSchemaItem.processableKey] || null;
            if (itemBasedButtonProcessable && itemBasedButtonProcessable.started && itemBasedButtonProcessable.taskChannelName) {
              itemBasedButtonProcessContainer = _react2.default.createElement(_.Processable, {
                modal: true,
                key: itemBasedButtonProcessable.nextTaskEntity.id,
                processable: itemBasedButtonProcessable,
                buttonTheme: buttonSchemaItem.themes.buttonTheme,
                dialogTheme: buttonSchemaItem.themes.dialogTheme,
                formItemTheme: buttonSchemaItem.themes.formItemTheme,
                confirmTheme: buttonSchemaItem.themes.confirmTheme,
                widgetTheme: buttonSchemaItem.themes.widgetTheme,
                theme: buttonSchemaItem.themes.theme,
                mbClient: _this5.state.mbClient
              });
            }

            processables.push(itemBasedButtonProcessContainer);

            return _react2.default.createElement(_.RaisedButton, (0, _extends3.default)({
              theme: _this5.props.itemBasedButtonTheme,
              muiProps: (0, _extends3.default)({
                icon: buttonSchemaItem.icon,
                primary: true,
                className: _this5.props.tableStyles.itemBasedButtonClassName,
                style: {
                  borderRadius: '0px'
                },
                onClick: function onClick(e) {
                  _this5.handleItemClicked.bind(_this5, buttonSchemaItem)();
                }
              }, _this5.props.itemBasedButtonMuiProps),
              qflProps: (0, _extends3.default)({
                style: {
                  paddingTop: _this5.props.theme.distances.primary,
                  width: 'auto',
                  display: 'inline-block',
                  position: 'relative',
                  top: '-2px',
                  marginLeft: _this5.props.theme.distances.halfPrimary
                }
              }, _this5.props.itemBasedButtonQflProps)
            }, _this5.props.itemBasedButtonProps));
          }));

          var itemBasedMoreButtons = this.props.itemBasedButtonSchema.filter(function (buttonSchemaItem) {
            if (!buttonSchemaItem.multiple && Object.keys(_this5.state.selectedRows).length > 1) {
              return false;
            }
            return buttonSchemaItem.isMore;
          });
          if (itemBasedMoreButtons.length > 0) {
            var menuSchema = [{
              sectionName: null,
              items: itemBasedMoreButtons.map(function (buttonSchemaItem) {
                var itemBasedButtonProcessContainer = null;
                var itemBasedButtonProcessable = _this5.state.subscriptions && _this5.state.subscriptions[buttonSchemaItem.processableKey] || null;
                if (itemBasedButtonProcessable && itemBasedButtonProcessable.started && itemBasedButtonProcessable.taskChannelName) {
                  itemBasedButtonProcessContainer = _react2.default.createElement(_.Processable, {
                    modal: true,
                    key: itemBasedButtonProcessable.nextTaskEntity.id,
                    processable: itemBasedButtonProcessable,
                    buttonTheme: buttonSchemaItem.themes.buttonTheme,
                    dialogTheme: buttonSchemaItem.themes.dialogTheme,
                    formItemTheme: buttonSchemaItem.themes.formItemTheme,
                    confirmTheme: buttonSchemaItem.themes.confirmTheme,
                    widgetTheme: buttonSchemaItem.themes.widgetTheme,
                    theme: buttonSchemaItem.themes.theme,
                    mbClient: _this5.state.mbClient
                  });
                }

                processables.push(itemBasedButtonProcessContainer);
                return {
                  label: buttonSchemaItem.name,
                  key: buttonSchemaItem.key
                };
              })
            }];

            itemBasedElements = itemBasedElements.concat([_react2.default.createElement(
              'div',
              {
                style: {
                  position: 'relative',
                  display: 'inline-block'
                }
              },
              _react2.default.createElement(_.RaisedButton, (0, _extends3.default)({
                theme: this.props.itemBasedButtonTheme,
                muiProps: (0, _extends3.default)({
                  icon: _react2.default.createElement(_expandMore2.default, null),
                  labelPosition: 'before',
                  label: 'MEHR',
                  primary: true,
                  className: this.props.tableStyles.itemBasedMoreButtonClassName,
                  style: {
                    borderRadius: '0px'
                  },
                  onClick: function onClick(e) {
                    if (!_this5.state.isItemBasedMoreMenuOpened) {
                      (0, _jquery2.default)(window.document).on('click', function (ce) {
                        if (ce.originalEvent && ce.originalEvent.path.filter(function (item) {
                          return item.id === _this5.itemBasedMoreMenuId;
                        }).length === 0) {
                          (0, _jquery2.default)(window.document).off('click');
                          _this5.setState({
                            isItemBasedMoreMenuOpened: false
                          });
                        }
                      });
                    }
                    _this5.setState({
                      isItemBasedMoreMenuOpened: !_this5.state.isItemBasedMoreMenuOpened
                    });
                  }
                }, this.props.itemBasedMoreButtonMuiProps),
                qflProps: (0, _extends3.default)({
                  style: {
                    paddingTop: this.props.theme.distances.primary,
                    width: 'auto',
                    display: 'inline-block',
                    marginLeft: this.props.theme.distances.halfPrimary
                  }
                }, this.props.itemBasedMoreButtonQflProps)
              }, this.props.itemBasedMoreButtonProps)),
              _react2.default.createElement(
                'div',
                {
                  id: this.itemBasedMoreMenuId,
                  style: {
                    display: this.state.isItemBasedMoreMenuOpened ? 'block' : 'none',
                    position: 'absolute',
                    zIndex: '10',
                    whiteSpace: 'nowrap',
                    color: 'black',
                    backgroundColor: 'white',
                    padding: this.props.theme.distances.halfPrimary,
                    marginLeft: this.props.theme.distances.halfPrimary
                  }
                },
                _react2.default.createElement(_TableOverlay.TableOverlay, {
                  menuSchema: menuSchema,
                  tableOverlayStyles: this.props.tableOverlayStyles,
                  onMenuItemClicked: function onMenuItemClicked(key) {
                    var matchedButtonSchemaItems = itemBasedMoreButtons.filter(function (buttonSchemaItem) {
                      return buttonSchemaItem.key === key;
                    });
                    var buttonSchemaItem = null;
                    if (matchedButtonSchemaItems.length === 1) {
                      buttonSchemaItem = matchedButtonSchemaItems[0];
                    }
                    if (buttonSchemaItem) {
                      _this5.handleItemClicked.bind(_this5, buttonSchemaItem)();
                    }
                  }
                })
              )
            )]);
          }
        }
      }

      var searchField = null;
      if (this.props.onSearch) {
        searchField = _react2.default.createElement(_.TextField, (0, _extends3.default)({
          watch: true,
          value: this.state.searchValue,
          theme: this.props.searchFieldTheme,
          muiProps: (0, _extends3.default)({
            hintText: 'Suchen',
            className: this.props.tableStyles.searchFieldClassName
          }, this.props.searchFieldMuiProps),
          qflProps: (0, _extends3.default)({
            style: {
              paddingTop: '9px',
              display: 'inline-block',
              position: 'relative',
              top: '-13px'
            }
          }, this.props.searchFieldQflProps)
        }, this.props.searchFieldProps, {
          onChange: function onChange(oldValue, newValue, e) {
            if (_this5.props.onSearch) {
              _this5.delay(function () {
                _this5.props.onSearch(newValue);
              }, e && e.keyCode === 13 ? 0 : _this5.props.searchKeyDelay);
            }
          }
        }));
      }

      return _react2.default.createElement(
        'div',
        {
          className: newClassName,
          style: {
            padding: '0px',
            verticalAlign: 'top',
            lineHeight: 1.2,
            position: 'relative'
          }
        },
        _react2.default.createElement(
          'div',
          { className: this.props.tableStyles.itemHeaderClassName },
          this.props.title
        ),
        _react2.default.createElement(
          'div',
          { style: {
              paddingTop: '9px'
            }, className: this.props.tableStyles.tableBarClassName },
          createButton,
          searchField,
          _react2.default.createElement(
            'div',
            { style: {
                display: 'inline-block',
                width: 'auto',
                position: 'relative',
                top: '-12px'
              } },
            filterMenuElements
          ),
          _react2.default.createElement(
            'div',
            {
              style: {
                position: 'relative',
                display: 'inline-block',
                marginLeft: this.props.theme.distances.halfPrimary,
                top: '-12px'
              }
            },
            itemBasedElements
          )
        ),
        _react2.default.createElement('div', {
          style: {
            display: this.state.isItemBasedMoreMenuOpened ? 'block' : 'none'
          },
          className: this.props.tableStyles.contentOverlayClassName
        }),
        _react2.default.createElement(_.Table, (0, _extends3.default)({
          ref: 'listBoxTable',
          theme: this.props.tableTheme,
          selectorTheme: this.props.tableSelectorTheme,
          onSelectedRowsChanged: function onSelectedRowsChanged(selectedRows) {
            _this5.handleSelectedRowsChanged(selectedRows);
          }
        }, this.props.tableProps, {
          rbtProps: (0, _extends3.default)({
            data: this.props.data,
            columnFilter: false,
            search: false,
            striped: true,
            hover: true,
            condensed: true,
            pagination: false,
            insertRow: false,
            deleteRow: false,
            trClassName: this.props.tableStyles.tableRowClassName,
            tableHeaderClass: this.props.tableStyles.tableHeaderRowClassName,
            selectRowTdClassName: this.props.tableStyles.tableColumnSelectorClassName,
            selectRowHeaderTdClassName: this.props.tableStyles.tableHeaderColumnSelectorClassName
          }, rbtProps),
          stylingProps: {
            containerStyle: {
              height: this.props.controlledHeight + 'px'
            },
            tableStyle: {
              height: this.props.controlledHeight - 10 + 'px'
            },
            headerStyle: {
              height: '35px'
            },
            bodyStyle: {
              height: this.props.controlledHeight - 10 - 35 + 'px'
            }
          }

        })),
        this.props.children,
        processables
      );
    }
  }]);
  return ProcessableTable;
}(_react2.default.Component), _class.propTypes = {
  title: _react2.default.PropTypes.string,
  children: _react2.default.PropTypes.node,
  frame: _react2.default.PropTypes.bool,

  createProcessKey: _react2.default.PropTypes.string,
  createStartToken: _react2.default.PropTypes.any,

  createButtonMuiProps: _react2.default.PropTypes.object,
  createButtonQflProps: _react2.default.PropTypes.object,
  createButtonProps: _react2.default.PropTypes.object,

  createButtonTheme: _react2.default.PropTypes.object,
  createDialogTheme: _react2.default.PropTypes.object,
  createFormItemTheme: _react2.default.PropTypes.object,
  createConfirmTheme: _react2.default.PropTypes.object,
  createWidgetTheme: _react2.default.PropTypes.object,
  createTheme: _react2.default.PropTypes.object,

  itemBasedButtonTheme: _react2.default.PropTypes.object,
  listBasedButtonTheme: _react2.default.PropTypes.object,
  filterMenuTheme: _react2.default.PropTypes.object,
  baseFilterMenuTheme: _react2.default.PropTypes.object,
  searchFieldTheme: _react2.default.PropTypes.object,

  onSearch: _react2.default.PropTypes.func,
  searchFieldMuiProps: _react2.default.PropTypes.object,
  searchFieldQflProps: _react2.default.PropTypes.object,
  searchFieldProps: _react2.default.PropTypes.object,
  searchValue: _react2.default.PropTypes.string,
  tableProps: _react2.default.PropTypes.object,
  data: _react2.default.PropTypes.any,
  searchKeyDelay: _react2.default.PropTypes.number,
  controlledHeight: _react2.default.PropTypes.number,

  dataClassName: _react2.default.PropTypes.string.required,

  itemBasedButtonSchema: _react2.default.PropTypes.any,
  itemBasedButtonMuiProps: _react2.default.PropTypes.object,
  itemBasedButtonQflProps: _react2.default.PropTypes.object,
  itemBasedButtonProps: _react2.default.PropTypes.object,
  itemBasedMoreButtonMuiProps: _react2.default.PropTypes.object,
  itemBasedMoreButtonQflProps: _react2.default.PropTypes.object,
  itemBasedMoreButtonProps: _react2.default.PropTypes.object,

  listBasedButtonSchema: _react2.default.PropTypes.any,
  filterMenuSchema: _react2.default.PropTypes.any,
  onFilterChange: _react2.default.PropTypes.func,

  baseFilterMenuSchema: _react2.default.PropTypes.any,

  onProcessEnded: _react2.default.PropTypes.func,

  tableOverlayStyles: _react2.default.PropTypes.object,

  tableStyles: _react2.default.PropTypes.object,

  theme: _react2.default.PropTypes.object,
  tableTheme: _react2.default.PropTypes.object,
  tableSelectorTheme: _react2.default.PropTypes.object
}, _class.defaultProps = {
  title: null,
  frame: true,
  searchKeyDelay: 250,
  tableStyles: {
    tableWithFrameClassName: null,
    tableWithoutFrameClassName: null,
    createButtonClassName: null,
    contentOverlayClassName: null,
    tableBarClassName: null,
    itemHeaderClassName: null,
    searchFieldClassName: null,
    itemBasedMoreButtonClassName: null,
    itemBasedButtonClassName: null,
    tableRowClassName: null,
    tableHeaderRowClassName: null,
    tableColumnSelectorClassName: null,
    tableHeaderColumnSelectorClassName: null
  },
  tableOverlayStyles: {
    menuHeaderClassName: null,
    menuItemClassName: null
  }
}, _class.contextTypes = {
  viewer: _react2.default.PropTypes.object
}, _temp);
exports.default = ProcessableTable;
module.exports = exports['default'];
//# sourceMappingURL=Table.js.map
