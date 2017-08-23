import * as React from 'react';
import { IMUIProps } from '../../interfaces';
/**
 * Material UI based radio button
 */
declare class RadioButton extends React.Component<IMUIProps, {}> {
    static defaultProps: {
        theme: any;
        muiProps: {};
        qflProps: {};
    };
    constructor();
    render(): JSX.Element;
}
export default RadioButton;
