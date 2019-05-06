import { Instance } from 'mobx-state-tree';
import { initSuitsFromConfig } from 'ide-lib-engine';

export * from './PageCreator/config';
export * from './PageCreator/';

import { PageCreatorCurrying } from './PageCreator/';
import { configPageCreator } from './PageCreator/config';

const {
    ComponentModel: PageCreatorModel,
    StoresModel: PageCreatorStoresModel,
    NormalComponent: PageCreator,
    ComponentHOC: PageCreatorHOC,
    ComponentAddStore: PageCreatorAddStore,
    ComponentFactory: PageCreatorFactory
} = initSuitsFromConfig(PageCreatorCurrying,configPageCreator);

export {
    PageCreatorModel,
    PageCreatorStoresModel,
    PageCreator,
    PageCreatorHOC,
    PageCreatorAddStore,
    PageCreatorFactory
};

export interface IPageCreatorModel extends Instance<typeof PageCreatorModel> { }
