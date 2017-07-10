import * as React from 'react';
import { IMUIProps } from '../../interfaces';
/**
 * Material UI based toggle
 */
declare class Toggle extends React.Component<IMUIProps, {}> {
    static defaultProps: {
        theme: any;
        muiProps: {};
        qflProps: {};
    };
    constructor();
    render(): any;
}
export default Toggle;
