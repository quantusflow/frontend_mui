import * as React from 'react';
import { IMUIProps } from '../../interfaces';
/**
 * Material UI based raised button
 */
declare class RaisedButton extends React.Component<IMUIProps, {}> {
    static defaultProps: {
        theme: any;
        muiProps: {};
        qflProps: {};
    };
    constructor();
    render(): JSX.Element;
}
export default RaisedButton;
