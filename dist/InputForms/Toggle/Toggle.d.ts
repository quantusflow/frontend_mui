import * as React from 'react';
import { IMUIProps } from '../../interfaces';
/**
 * Material UI based toggle
 */
declare class Toggle extends React.Component<IMUIProps, {}> {
    static defaultProps: {
        theme: string;
        muiProps: {};
        qflProps: {};
    };
    constructor();
    render(): JSX.Element;
}
export default Toggle;
