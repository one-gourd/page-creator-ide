import React, { Component, useCallback, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from 'antd';
import { pick } from 'ide-lib-utils';
import useComponentSize from '@rehooks/component-size';
import {
  based,
  Omit,
  OptionalProps,
  IBaseTheme,
  IBaseComponentProps,
  IStoresEnv,
  useInjectedEvents,
  extracSubEnv,
  IBaseStyles
} from 'ide-lib-base-component';
import SplitPane from 'react-split-pane';

import {
  HeaderBar,
  IHeaderBarProps,
  THeaderBarControlledKeys,
  HeaderBarAddStore
} from 'ide-header-bar';

import {
  ComponentTree,
  IComponentTreeProps,
  ComponentTreeAddStore,
  TComponentTreeControlledKeys
} from 'ide-component-tree';

import {
  SwitchPanel,
  ISwitchPanelProps,
  TSwitchPanelControlledKeys,
  SwitchPanelAddStore
} from 'ide-switch-panel';

import { debugInteract, debugRender } from '../lib/debug';
import {
  StyledContainer,
  StyledComponentTreeWrap,
  StyledSwitchPanelWrap
} from './styles';
import { AppFactory } from './controller/index';
import { StoresFactory, IStoresModel } from './schema/stores';
import { TPageCreatorControlledKeys, CONTROLLED_KEYS } from './schema/index';
import { showConsole } from './solution';

type OptionalComponentTreeProps = OptionalProps<
  IComponentTreeProps,
  TComponentTreeControlledKeys
>;

type OptionalHeaderBarProps = OptionalProps<
  IHeaderBarProps,
  THeaderBarControlledKeys
>;

type OptionalSwitchPanelProps = OptionalProps<
  ISwitchPanelProps,
  TSwitchPanelControlledKeys
>;

interface ISubComponents {
  HeaderBarComponent: React.ComponentType<OptionalHeaderBarProps>;
  ComponentTreeComponent: React.ComponentType<OptionalComponentTreeProps>;
  SwitchPanelComponent: React.ComponentType<OptionalSwitchPanelProps>;
}

export interface IPageCreatorEvent {
  /**
   * 点击回调函数
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

// export interface IPageCreatorStyles extends IBaseStyles {
//   container?: React.CSSProperties;
// }

export interface IPageCreatorTheme extends IBaseTheme {
  main: string;
  bgColor: string;
}

export interface IPageCreatorProps
  extends IPageCreatorEvent,
    IBaseComponentProps {
  /**
   * 子组件 componentTree
   */
  componentTree?: OptionalComponentTreeProps;

  /**
   * 子组件 headerBar
   */
  headerBar?: OptionalHeaderBarProps;

  /**
   * 子组件 componentTree
   */
  switchPanel?: OptionalSwitchPanelProps;

  /**
   * 是否展现
   */
  visible?: boolean;

  /**
   * 文案
   */
  text?: string;
}

export const DEFAULT_PROPS: IPageCreatorProps = {
  theme: {
    main: '#25ab68',
    bgColor: '#ececec'
  },
  styles: {
    container: {}
  }
};

/**
 * 使用高阶组件打造的组件生成器
 * @param subComponents - 子组件列表
 */
export const PageCreatorHOC = (subComponents: ISubComponents) => {
  const PageCreatorHOC = (props: IPageCreatorProps) => {
    const {
      ComponentTreeComponent,
      SwitchPanelComponent,
      HeaderBarComponent
    } = subComponents;
    let switchPanelWrapRef = useRef(null);
    let switchPanelWrapSize = useComponentSize(switchPanelWrapRef); // 获取元素尺寸

    const mergedProps = Object.assign({}, DEFAULT_PROPS, props);
    const { componentTree, switchPanel, visible, text, styles } = mergedProps;

    // console.log(777, switchPanelWrapSize);
    // 强制更新宽、高属性
    switchPanel.width = switchPanelWrapSize.width;
    switchPanel.height = switchPanelWrapSize.height;


    const onClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      const { onClick } = props;
      onClick && onClick(e);
    }, []);

    return (
      <StyledContainer
        style={styles.container}
        // ref={this.root}
        className="page-creator-ide-container"
      >
        <SplitPane
          split="horizontal"
          size={64}
          allowResize={false}
          className="page-header"
        >
          <HeaderBarComponent />
          <SplitPane
            split="vertical"
            minSize={200}
            maxSize={300}
            defaultSize={200}
          >
            <StyledComponentTreeWrap>
              <ComponentTreeComponent {...componentTree} />
            </StyledComponentTreeWrap>
            <StyledSwitchPanelWrap ref={switchPanelWrapRef}>
              <SwitchPanelComponent {...switchPanel} />
            </StyledSwitchPanelWrap>
          </SplitPane>
        </SplitPane>
      </StyledContainer>
    );
  };
  PageCreatorHOC.displayName = 'PageCreatorHOC';
  return observer(based(PageCreatorHOC, DEFAULT_PROPS));
};

// 采用高阶组件方式生成普通的 PageCreator 组件
export const PageCreator = PageCreatorHOC({
  ComponentTreeComponent: ComponentTree,
  HeaderBarComponent: HeaderBar,
  SwitchPanelComponent: SwitchPanel
});

/* ----------------------------------------------------
    以下是专门配合 store 时的组件版本
----------------------------------------------------- */

/**
 * 科里化创建 PageCreatorWithStore 组件
 * @param stores - store 模型实例
 */
export const PageCreatorAddStore = (storesEnv: IStoresEnv<IStoresModel>) => {
  const { stores } = storesEnv;
  const PageCreatorHasSubStore = PageCreatorHOC({
    // @ts-ignore
    ComponentTreeComponent: ComponentTreeAddStore(
      extracSubEnv(storesEnv, 'componentTree')
    ),
    // @ts-ignore
    HeaderBarComponent: HeaderBarAddStore(extracSubEnv(storesEnv, 'headerBar')),
    // @ts-ignore
    SwitchPanelComponent: SwitchPanelAddStore(
      extracSubEnv(storesEnv, 'switchPanel')
    )
  });

  const PageCreatorWithStore = (
    props: Omit<IPageCreatorProps, TPageCreatorControlledKeys>
  ) => {
    const { componentTree = {}, ...otherProps } = props;
    const { model } = stores;
    const controlledProps = pick(model, CONTROLLED_KEYS);
    debugRender(`[${stores.id}] rendering`);

    const componentTreeWithInjected = useInjectedEvents<
      IComponentTreeProps,
      IStoresModel
    >(storesEnv, componentTree, {
      onSelectListItem: []
    });

    const otherPropsWithInjected = useInjectedEvents<
      IPageCreatorProps,
      IStoresModel
    >(storesEnv, otherProps, {
      onClick: [showConsole]
    });

    return (
      <PageCreatorHasSubStore
        componentTree={componentTreeWithInjected}
        {...controlledProps}
        {...otherPropsWithInjected}
      />
    );
  };

  PageCreatorWithStore.displayName = 'PageCreatorWithStore';
  return observer(PageCreatorWithStore);
};

/**
 * 生成 env 对象，方便在不同的状态组件中传递上下文
 */
export const PageCreatorStoresEnv = () => {
  const { stores, innerApps } = StoresFactory(); // 创建 model
  const app = AppFactory(stores, innerApps); // 创建 controller，并挂载 model
  return {
    stores,
    app,
    client: app.client,
    innerApps: innerApps
  };
};

/**
 * 工厂函数，每调用一次就获取一副 MVC
 * 用于隔离不同的 PageCreatorWithStore 的上下文
 */
export const PageCreatorFactory = () => {
  const storesEnv = PageCreatorStoresEnv();
  return {
    ...storesEnv,
    PageCreatorWithStore: PageCreatorAddStore(storesEnv)
  };
};
