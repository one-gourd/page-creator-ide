/// <reference types="react" />
import LockPage from './index';
export interface IAutoSaveValue {
    from: string;
    pageLocker?: React.RefObject<LockPage>;
}
export declare const autoHeartBeat: (value: IAutoSaveValue) => void;
