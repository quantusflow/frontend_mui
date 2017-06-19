import * as React from 'react';
import { IMUIProps } from '../../interfaces';
/**
 * Material UI based flat button
 */
declare class FlatButton extends React.Component<IMUIProps, {}> {
    defaultProps: {
        theme: string;
        muiProps: {};
        qflProps: {};
    };
    constructor();
    render(): JSX.Element;
}
export default FlatButton;
