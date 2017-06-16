import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Snackbar from 'material-ui/Snackbar';

import { getMuiTheme } from 'material-ui/styles';
import { buildTheme } from '../../themeBuilder';

/**
 * Material UI based SnackBar
 */
class SnackBar extends Component {
  static propTypes = {
    children: PropTypes.node,
    /**
     * Applies a given MaterialUI theme.
     */
    theme: PropTypes.object,
    /**
     * Forwarded to MaterialUI component.
     */
    muiProps: PropTypes.object,
    /**
     * Forwarded to wrapper component.
     */
    qflProps: PropTypes.object,
    /**
     * the message in the SnackBar
     */
    message: PropTypes.string,
    /**
     * time until close the Snackbar
     */
    autoHideDuration: PropTypes.number,

    openSnackBar: PropTypes.bool,
    onRequestClose: PropTypes.func,
    bodyStyle: PropTypes.object

  };

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme(this.props.theme)
    };
  }

  render() {

    const { muiProps, qflProps } = buildTheme({
      theme: this.props.theme,
      sourceMuiProps: this.props.muiProps,
      sourceQflProps: this.props.qflProps,
      componentName: 'SnackBar'
    });

    return (
      <div>
        <Snackbar
          open={this.props.open}
          message={this.props.message}
          autoHideDuration={this.props.autoHideDuration}
          onRequestClose={this.props.onRequestClose}
          bodyStyle={this.props.bodyStyle}
          {...muiProps}
        />
      </div>
    );
  }
}

SnackBar.childContextTypes = {
  muiTheme: PropTypes.object
};

SnackBar.defaultProps = {
  theme: 'Default',
  autoHideDuration: 4000,
  muiProps: {},
  qflProps: {}
};

export default SnackBar;
