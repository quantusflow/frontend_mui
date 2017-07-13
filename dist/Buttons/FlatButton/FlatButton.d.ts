import * as React from 'react';
import { IMUIProps } from '../../interfaces';
/**
 * Material UI based flat button
 */
declare class FlatButton extends React.Component<IMUIProps, {}> {
    static defaultProps: {
        theme: any;
        muiProps: {};
        qflProps: {};
    };
    constructor();
    render(): any;
}
export default FlatButton;
