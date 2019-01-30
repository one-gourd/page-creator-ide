import { IStoresModel } from '../schema/stores';
export interface IContext {
  stores: IStoresModel;
  [propName: string]: any;
}
