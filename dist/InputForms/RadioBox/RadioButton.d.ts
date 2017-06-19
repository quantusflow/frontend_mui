import * as React from 'react';
import { IMUIProps } from '../../interfaces';
/**
 * Material UI based radio button
 */
declare class RadioButton extends React.Component<IMUIProps, {}> {
    defaultProps: {
        theme: string;
        muiProps: {};
        qflProps: {};
    };
    constructor();
    render(): JSX.Element;
}
export default RadioButton;
