import React, { useCallback, useRef } from 'react';
import { Button } from 'antd';
import {
  IBaseTheme,
  IBaseComponentProps,
  useComponentSize
} from 'ide-lib-base-component';
import { TComponentCurrying } from 'ide-lib-engine';
import SplitPane from 'react-split-pane';

// import { debugInteract, debugRender } from '../lib/debug';
import {
  StyledContainer,
  StyledComponentTreeWrap,
  StyledSwitchPanelWrap
} from './styles';

import { ISubProps } from './subs';

import { AttributeEditor, IAttributeEditorProps } from './mods/AttributeEditor';

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
    visible,
    text,
    styles,
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
  // console.log(666, propsEditor.formData, visible);
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
        <SplitPane split="vertical" minSize={200} defaultSize={200}>
          <StyledComponentTreeWrap>
            <ComponentTreeComponent {...componentTree} />
          </StyledComponentTreeWrap>

          <SplitPane
            primary="second"
            split="vertical"
            defaultSize="300"
            minSize="300"
          >
            <StyledSwitchPanelWrap ref={switchPanelWrapRef}>
              <SwitchPanelComponent
                cWidth={switchPanelWrapSize.width}
                cHeight={switchPanelWrapSize.height}
                {...switchPanel}
              />
            </StyledSwitchPanelWrap>
            {/* <div/> */}
            <AttributeEditor {...propsEditor} {...propsEditorExtra} />
          </SplitPane>
        </SplitPane>
      </SplitPane>
    </StyledContainer>
  );
};
