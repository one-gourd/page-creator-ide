import { IStoresEnv } from 'ide-lib-base-component';
import { IStoresModel } from 'ide-lib-engine';
/**
 * 显示 list 列表项
 * @param env - IStoresEnv
 */
export declare const showConsole: (env: IStoresEnv<IStoresModel>) => (key: string, keyPath: string[], item: any) => Promise<void>;
