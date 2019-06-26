import React, { useCallback, useRef } from 'react';
import { Layout, Menu, Icon } from 'antd';
import {
  IBaseTheme,
  IBaseComponentProps,
  useComponentSize
} from 'ide-lib-base-component';
import { TComponentCurrying } from 'ide-lib-engine';

// import { debugInteract, debugRender } from '../lib/debug';

import {
  StyledContainer,
  StyledSiderContentWrap,
  StyledSwitchPanelWrap
} from './styles';

import { ISubProps } from './subs';

import { AttributeEditor, IAttributeEditorProps } from './mods/AttributeEditor';
import { SiderButton } from './mods/SiderButton';
import { HistoryList, IHistoryListProps } from './mods/HistoryList/index';

const { Header, Content, Sider } = Layout;

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
    ISubProps,
    IBaseComponentProps {
  /**
   * 是否展现
   */
  visible?: boolean;

  /**
   * 文案
   */
  text?: string;

  /**
   * 属性编辑器（可 model）
   */
  propsEditor?: IAttributeEditorProps;

  /**
   * 属性编辑器（非 Model）
   */
  propsEditorExtra?: IAttributeEditorProps;

  /**
   * 历史列表 modal
   */
  historyList?: IHistoryListProps;
}

export const DEFAULT_PROPS: IPageCreatorProps = {
  theme: {
    main: '#25ab68',
    bgColor: '#ececec'
  },
  propsEditor: {
    formData: {},
    schema: {},
    pageStore: {}
  },
  styles: {
    container: {}
  }
};

const HEIGHT_HEAD = 65;
const WIDTH_LEFT = 300;
const WIDTH_RIGHT = 300;

export const PageCreatorCurrying: TComponentCurrying<
  IPageCreatorProps,
  ISubProps
> = subComponents => props => {
  const {
    headerBar = {},
    componentTree = {},
    switchPanel = {},
    propsEditor = {},
    propsEditorExtra = {},
    historyList = {},
    visible,
    text,
    styles,
    theme,
    onClick
  } = props;

  const {
    HeaderBar: HeaderBarComponent,
    ComponentTree: ComponentTreeComponent,
    SwitchPanel: SwitchPanelComponent
  } = subComponents as Record<string, React.FunctionComponent<typeof props>>;

  let switchPanelWrapRef = useRef(null);
  let switchPanelWrapSize = useComponentSize(switchPanelWrapRef); // 获取元素尺寸

  // 合并可控制和非可控的元素
  return (
    <StyledContainer
      style={styles.container}
      // ref={this.root}
      className="page-creator-ide-container"
    >
      <Layout>
        <Header
          style={{
            padding: 0,
            lineHeight: 1,
            height: `${HEIGHT_HEAD}px`,
            position: 'fixed',
            width: '100%'
          }}
        >
          <HeaderBarComponent {...headerBar} />
        </Header>
        <Layout>
          <Sider
            width={WIDTH_LEFT}
            style={{
              zIndex: 9,
              overflow: 'auto',
              height: `calc(100vh - ${HEIGHT_HEAD}px)`,
              position: 'fixed',
              top: `${HEIGHT_HEAD}px`,
              left: 0
            }}
          >
            <SiderButton theme={theme} />

            <StyledSiderContentWrap>
              <ComponentTreeComponent {...componentTree} />
            </StyledSiderContentWrap>
          </Sider>

          <Content
            style={{
              height: `calc(100vh - ${HEIGHT_HEAD}px)`,
              margin: `${HEIGHT_HEAD}px ${WIDTH_RIGHT}px 0 ${WIDTH_LEFT}px`,
              overflow: 'initial'
            }}
          >
            <StyledSwitchPanelWrap ref={switchPanelWrapRef}>
              <SwitchPanelComponent
                cWidth={switchPanelWrapSize.width}
                cHeight={switchPanelWrapSize.height}
                {...switchPanel}
              />
            </StyledSwitchPanelWrap>
          </Content>
          <Sider
            width={WIDTH_RIGHT}
            style={{
              width: `${WIDTH_RIGHT}px`,
              maxWidth: `${WIDTH_RIGHT}px`,
              overflow: 'auto',
              marginTop: `${HEIGHT_HEAD}px`,
              position: 'fixed',
              right: 0
            }}
          >
            <AttributeEditor {...propsEditor} {...propsEditorExtra} />
          </Sider>
        </Layout>
      </Layout>
      <HistoryList {...historyList} />
    </StyledContainer>
  );
};
