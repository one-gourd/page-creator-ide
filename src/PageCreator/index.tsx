import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button } from 'antd';
import { ThemeProvider } from 'styled-components';
import SplitPane from 'react-split-pane';
import { HeaderBar } from 'ide-header-bar';

import { debugInteract, debugRender } from '../lib/debug';
import { StyledContainer } from './styles';
import { AppFactory } from './controller/index';
import { StoresFactory, IStoresModel } from './schema/stores';
import { TPageCreatorControlledKeys, CONTROLLED_KEYS } from './schema/index';

export interface IPageCreatorEvent {
  /**
   * 点击回调函数
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface IStyles {
  [propName: string]: React.CSSProperties;
}

export interface IPageCreatorStyles extends IStyles {
  container?: React.CSSProperties;
}

export interface IPageCreatorTheme {
  main: string;
  [prop: string]: any;
}

export interface IPageCreatorProps extends IPageCreatorEvent {

  /**
   * 文案
   */
  text?: string;

  /**
   * 样式集合，方便外部控制
   */
  styles?: IPageCreatorStyles;

  /**
   * 设置主题
   */
  theme?: IPageCreatorTheme;
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

// 推荐使用 decorator 的方式，否则 stories 的导出会缺少 **Prop Types** 的说明
// 因为 react-docgen-typescript-loader 需要  named export 导出方式
@observer
export class PageCreator extends Component<IPageCreatorProps> {
  public static defaultProps = DEFAULT_PROPS;
  // private root: React.RefObject<HTMLDivElement>;
  constructor(props: IPageCreatorProps) {
    super(props);
    // this.state = {};
    // this.root = React.createRef();
  }
  onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onClick } = this.props;
    onClick && onClick(e);
  };
  render() {
    const { text, styles, theme } = this.props;
    return (
      <ThemeProvider theme={theme}>
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
            <HeaderBar />
            <SplitPane
              split="vertical"
              minSize={200}
              maxSize={300}
              defaultSize={200}
            >
              <div>default min: 200px</div>
              <div>
                <Button onClick={this.onClick}>{text || '点我试试'}</Button>
              </div>
            </SplitPane>
          </SplitPane>
        </StyledContainer>
      </ThemeProvider>
    );
  }
}

/* ----------------------------------------------------
    以下是专门配合 store 时的组件版本
----------------------------------------------------- */
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

const onClickWithStore = (
  stores: IStoresModel,
  onClick: React.MouseEventHandler<HTMLButtonElement>
) => (e: React.MouseEvent<HTMLButtonElement>) => {
  // stores.setValue(newValue);
  onClick && onClick(e);
};

/**
 * 科里化创建 PageCreatorWithStore 组件
 * @param stores - store 模型实例
 */
export const PageCreatorAddStore = (stores: IStoresModel) => {
  return observer(function PageCreatorWithStore(
    props: Omit<IPageCreatorProps, TPageCreatorControlledKeys>
  ) {
    const { onClick, ...otherProps } = props;
    const { model } = stores;
    const controlledProps: any = {};
    CONTROLLED_KEYS.forEach((storeKey: string) => {
      controlledProps[storeKey] = (model as any)[storeKey];
    });
    debugRender(`[${stores.id}] rendering`);
    return <PageCreator {...controlledProps} {...otherProps} />;
  });
};
/**
 * 工厂函数，每调用一次就获取一副 MVC
 * 用于隔离不同的 PageCreatorWithStore 的上下文
 */
export const PageCreatorFactory = () => {
  const stores = StoresFactory(); // 创建 model
  const app = AppFactory(stores); // 创建 controller，并挂载 model
  return {
    stores,
    app,
    client: app.client,
    PageCreatorWithStore: PageCreatorAddStore(stores)
  };
};
