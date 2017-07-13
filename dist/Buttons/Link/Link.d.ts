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
    static defaultProps: {
        theme: any;
        qflProps: {};
        muiProps: {};
        linkStyle: {};
        labelStyle: {};
        label: string;
        to: any;
        href: string;
    };
    constructor();
    render(): any;
}
export default Link;
