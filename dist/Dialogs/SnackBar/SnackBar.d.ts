import * as React from 'react';
import { IMUIProps } from '../../interfaces';
/**
 * Material UI based SnackBar
 */
declare class SnackBar extends React.Component<IMUIProps, {}> {
    defaultProps: {
        theme: string;
        muiProps: {};
        qflProps: {};
    };
    constructor();
    render(): JSX.Element;
}
export default SnackBar;
