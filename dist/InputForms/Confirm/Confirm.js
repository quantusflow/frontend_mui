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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _RaisedButton = require('../../Buttons/RaisedButton/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _themeBuilder = require('../../themeBuilder');

var _styles = require('material-ui/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Material UI based text field
 */
var Confirm = (_temp = _class = function (_Component) {
    (0, _inherits3.default)(Confirm, _Component);

    function Confirm() {
        (0, _classCallCheck3.default)(this, Confirm);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Confirm.__proto__ || Object.getPrototypeOf(Confirm)).call(this));

        _this.state = {
            confirmData: {}
        };
        return _this;
    }

    (0, _createClass3.default)(Confirm, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                muiTheme: (0, _styles.getMuiTheme)(this.props.theme)
            };
        }
    }, {
        key: 'handleConfirm',
        value: function handleConfirm(key) {
            if (this.props.onChoose) {
                this.props.onChoose(key);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _buildTheme = (0, _themeBuilder.buildTheme)({
                theme: this.props.theme,
                sourceMuiProps: this.props.muiProps,
                sourceQflProps: this.props.qflProps,
                componentName: 'Confirm'
            }),
                qflProps = _buildTheme.qflProps;

            var layout = this.props.layout;


            var resultingButtons = layout.map(function (element, elementIdx) {
                return _react2.default.createElement(_RaisedButton2.default, {
                    key: element.key,
                    theme: element.theme,
                    muiProps: (0, _extends3.default)({
                        label: element.label,
                        primary: true
                    }, element.muiProps),
                    qflProps: {
                        onClick: function onClick(e) {
                            _this2.handleConfirm(element.key);
                        }
                    }
                });
            });

            return _react2.default.createElement(
                'div',
                qflProps,
                _react2.default.createElement(
                    'p',
                    null,
                    this.props.message
                ),
                resultingButtons
            );
        }
    }]);
    return Confirm;
}(_react.Component), _class.propTypes = {
    /**
     * Applies a given MaterialUI theme.
     */
    theme: _propTypes2.default.object,
    /**
     * Forwarded to wrapper component.
     */
    qflProps: _propTypes2.default.object,
    /**
     * Setup of the shown choosable buttons.
     */
    layout: _propTypes2.default.array,
    /**
     * Message shown above confirmation.
     */
    message: _propTypes2.default.string
}, _temp);


Confirm.childContextTypes = {
    muiTheme: _propTypes2.default.object
};

Confirm.defaultProps = {
    theme: 'Default',
    qflProps: {}
};

exports.default = Confirm;
module.exports = exports['default'];
//# sourceMappingURL=Confirm.js.map
