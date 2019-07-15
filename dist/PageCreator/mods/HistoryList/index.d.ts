import React from 'react';
import { IBaseComponentProps } from 'ide-lib-base-component';
export interface IHistoryListEvents {
    /**
     * 点击弹层关闭按钮
     */
    onCancelModal?: () => void;
    /**
     * formatter
     */
    formatter?: (data: any) => any;
    /**
     * formatter
     */
    onRollback?: (id: string, time: string) => void;
}
export interface IHistoryListProps extends IBaseComponentProps, IHistoryListEvents {
    /**
     * 是否展现
     */
    visible?: boolean;
    /**
     * history Url 接口
     */
    url?: string;
    /**
     * history Url 接口 params
     */
    params?: object;
}
export declare const HistoryList: React.FunctionComponent<IHistoryListProps>;
