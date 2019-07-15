import { IAnyModelType } from 'mobx-state-tree';
export * from './propsEditor';
export declare const otherControlledKeyMap: {
    propsEditor: string[];
    historyList: string[];
    pageLocker: string[];
};
export declare const modelExtends: (model: IAnyModelType) => import("mobx-state-tree").IModelType<any, any, any, any>;
export declare const mergeRule: {
    propsEditor: {
        level: number;
    };
    historyList: {
        level: number;
    };
    pageLocker: {
        level: number;
    };
};
