import { IContext as IEtteContext } from 'ette';
import { getSubRouterPrefix } from 'ide-lib-base-component';

import { IStoresModel 
  , ESubApps
} from '../schema/stores';
export interface IContext extends IEtteContext{
  stores: IStoresModel;
  [propName: string]: any;
}

// 子组件路径前缀
export const RPATH = getSubRouterPrefix(ESubApps); // 获取路由路径
