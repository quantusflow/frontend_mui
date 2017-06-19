import * as React from 'react';
import { IMUIProps } from '../../interfaces';
export interface ILinkProps extends IMUIProps {
    linkStyle?: {};
    labelStyle?: {};
    label?: string;
    to?: string;
    href?: string;
}
/**
 * Material UI based link
 */
declare class Link extends React.Component<ILinkProps, {}> {
    defaultProps: {
        theme: string;
        qflProps: {};
        muiProps: {};
        linkStyle: {};
        labelStyle: {};
        label: string;
        to: any;
        href: string;
    };
    constructor();
    render(): JSX.Element;
}
export default Link;
