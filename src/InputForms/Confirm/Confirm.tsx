import * as React from 'react';

import FlatButton from '../../Buttons/FlatButton/FlatButton';

import {IMUIProps} from '../../interfaces';
import {buildTheme} from '../../themeBuilder';

export interface IConfirmLayout {
  key: string;
  label: string;

  theme?: {};
  muiProps?: {
    secondary?: boolean;
  };
  qflProps?: {};
}

export interface IConfirmProps extends IMUIProps {
  layout: Array<IConfirmLayout>;

  message?: string;
  onChoose?: Function;

  buttonContainerQflProps?: {};
  textContainerQflProps?: {};
}

export interface IConfirmState {
  confirmData?: {};
}

/**
 * Material UI based confirm component
 */
class Confirm extends React.Component<IConfirmProps, IConfirmState> {
  public static defaultProps = {
    theme: null,
    muiProps: {},
    qflProps: {},

    message: null,
    onChoose: null,
    buttonTheme: null,

    buttonContainerQflProps: null,
    textContainerQflProps: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      confirmData: {},
    };
  }

  private handleConfirm(key) {
    if (this.props.onChoose) {
      this.props.onChoose(key);
    }
  }

  public render() {
    const {children} = this.props;

    const {qflProps} = buildTheme({
      theme: this.props.theme,
      sourceMuiProps: this.props.muiProps,
      sourceQflProps: this.props.qflProps,
      componentName: 'Confirm',
    });

    const bcProps = buildTheme({
      theme: this.props.theme,
      sourceMuiProps: {},
      sourceQflProps: this.props.buttonContainerQflProps,
      componentName: 'ButtonContainer',
    });

    const tcProps = buildTheme({
      theme: this.props.theme,
      sourceMuiProps: {},
      sourceQflProps: this.props.textContainerQflProps,
      componentName: 'TextContainer',
    });

    const {layout} = this.props;

    const resultingButtons = layout.map((element: IConfirmLayout, elementIdx: number) => (
      <FlatButton
        key={element.key}
        theme={{
          ...(element.theme),
          themeContext: (element.muiProps && element.muiProps.secondary ? 'cancel' : 'proceed'),
        }}
        muiProps={{
          label: element.label,
          primary: true,
          ...element.muiProps,
        }}
        qflProps={{
          onClick: (e) => {
            this.handleConfirm(element.key);
          },
          ...element.qflProps,
        }}
      />
    ));

    return (
      <div {...qflProps}>
        <p {...tcProps.qflProps}>{this.props.message}</p>
        {children}
        <div {...bcProps.qflProps}>
          {resultingButtons}
        </div>
      </div>
    );
  }
}

export default Confirm;
