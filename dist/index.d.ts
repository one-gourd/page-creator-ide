import { Instance } from 'mobx-state-tree';
export * from './PageCreator/config';
export * from './PageCreator/';
declare const PageCreatorModel: any, PageCreatorStoresModel: any, PageCreator: any, PageCreatorHOC: any, PageCreatorAddStore: any, PageCreatorFactory: any;
export { PageCreatorModel, PageCreatorStoresModel, PageCreator, PageCreatorHOC, PageCreatorAddStore, PageCreatorFactory };
export interface IPageCreatorModel extends Instance<typeof PageCreatorModel> {
}
