import * as React from 'react';
import { IMUIProps } from '../../interfaces';
export interface ISelectableCheckBoxProps {
    checked?: boolean;
    disabled?: boolean;
    rowIndex?: number;
    indeterminate?: boolean;
    onChange?: Function;
    selectRowProp?: boolean;
    value?: boolean;
}
export interface ISelectableCheckBoxState {
    currentValue?: boolean;
}
export interface ITableProps extends IMUIProps {
    thcSchema: any;
    selectorTheme?: {};
    selectorMuiProps?: {};
    selectorQflProps?: {};
    dataSource?: Array<{}>;
    rbtProps?: {
        options: any;
        data: any;
    };
    stylingProps?: any;
    onSelectedRowsChanged?: Function;
    selectRowProp?: any;
}
export interface ITableState {
    selectedRows?: {};
}
/**
 * Material UI based boostrap table
 */
declare class Table extends React.Component<ITableProps, ITableState> {
    static defaultProps: {
        theme: any;
        muiProps: {};
        qflProps: {};
        selectorTheme: any;
        selectorMuiProps: any;
        selectorQflProps: any;
        dataSource: any;
        rbtProps: any;
        stylingProps: any;
        onSelectedRowsChanged: any;
    };
    constructor();
    protected componentDidMount(): void;
    private cleanSelected();
    private handleRowSelect(row, isSelected, event);
    private handleRowSelectAll(isSelected, rows?);
    render(): JSX.Element;
}
export default Table;
