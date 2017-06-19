import * as React from 'react';
import { IMUIProps } from '../../interfaces';
/**
 * Material UI based modal dialog
 */
declare class Dialog extends React.Component<IMUIProps, {}> {
    defaultProps: {
        theme: string;
        muiProps: {};
        qflProps: {};
    };
    constructor();
    render(): JSX.Element;
}
export default Dialog;
