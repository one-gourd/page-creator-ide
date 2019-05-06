import { ValueOf } from 'ide-lib-base-component';
import { IComponentConfig } from 'ide-lib-engine';

import {
  HeaderBar,
  Stores as HeaderBarStores,
  HeaderBarAddStore,
  IHeaderBarProps,
  DEFAULT_PROPS as DEFAULT_PROPS_HEADER_BAR,
  HeaderBarFactory
} from 'ide-header-bar';

import {
  ComponentTree,
  Stores as ComponentTreeStores,
  IComponentTreeProps,
  ComponentTreeAddStore,
  DEFAULT_PROPS as DEFAULT_PROPS_COMPONENT_TREE,
  ComponentTreeFactory,
} from 'ide-component-tree';

import {
  SwitchPanel,
  SwitchPanelStoresModel,
  ISwitchPanelProps,
  DEFAULT_PROPS as DEFAULT_PROPS_SWITCH_PANEL,
    SwitchPanelAddStore,
    SwitchPanelFactory
} from 'ide-switch-panel';


export interface ISubProps {
  headerBar?: IHeaderBarProps;
  componentTree?: IComponentTreeProps;
  switchPanel?: ISwitchPanelProps;
}

// component: 子组件属性列表
export const subComponents: Record<
  keyof ISubProps,
  IComponentConfig<ValueOf<ISubProps>, any>
> = {
  headerBar: {
    className: 'HeaderBar',
    namedAs: 'headerBar',
    defaultProps: DEFAULT_PROPS_HEADER_BAR,
    normal: HeaderBar,
    addStore: HeaderBarAddStore,
    storesModel: HeaderBarStores,
    factory: HeaderBarFactory,
    routeScope: ['headerbar'] // 能通过父组件访问到的路径
  },
  componentTree: {
    className: 'ComponentTree',
    namedAs: 'componentTree',
    defaultProps: DEFAULT_PROPS_COMPONENT_TREE,
    normal: ComponentTree,
    addStore: ComponentTreeAddStore,
    storesModel: ComponentTreeStores,
    factory: ComponentTreeFactory,
    routeScope: ['model', 'menu', 'clients'] // 能通过父组件访问到的路径
  },
  switchPanel: {
    className: 'SwitchPanel',
    namedAs: 'switchPanel',
    defaultProps: DEFAULT_PROPS_SWITCH_PANEL,
    normal: SwitchPanel,
    addStore: SwitchPanelAddStore,
    storesModel: SwitchPanelStoresModel,
    factory: SwitchPanelFactory,
    routeScope: ['panels', 'clients'] // 能通过父组件访问到的路径
  }
};