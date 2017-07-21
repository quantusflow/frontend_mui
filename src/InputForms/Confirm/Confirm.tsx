import * as React from 'react';

import RaisedButton from '../../Buttons/RaisedButton/RaisedButton';

import {buildTheme} from '../../themeBuilder';
import {IMUIProps} from '../../interfaces';

export interface IConfirmLayout {
  key: string;
  label: string;

  theme?: string;
  muiProps?: {};
  qflProps?: {};
}

export interface IConfirmProps extends IMUIProps {
  layout: Array<IConfirmLayout>;

  message?: string;
  onChoose?: Function;
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
    onChoose: null
  };

  constructor() {
    super();

    this.state = {
      confirmData: {}
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
      componentName: 'Confirm'
    });

    const {layout} = this.props;

    const resultingButtons = layout.map((element: IConfirmLayout, elementIdx: number) => (
      <RaisedButton
        key={element.key}
        theme={element.theme}
        muiProps={{
          label: element.label,
          primary: true,
          ...element.muiProps
        }}
        qflProps={{
          onClick: (e) => {
            this.handleConfirm(element.key);
          },
          ...element.qflProps
        }}
      />
    ));

    return (
      <div {...qflProps}>
        <p>{this.props.message}</p>
        {children}
        {resultingButtons}
      </div>
    );
  }
}

export default Confirm;
