import { types } from 'mobx-state-tree';
import { BASE_CONTROLLED_KEYS } from 'ide-lib-base-component';

import { IStoresModel, IModuleConfig } from 'ide-lib-engine';
import { DEFAULT_PROPS, IPageCreatorProps } from '.';
import { showConsole } from './solution';

import { subComponents, ISubProps } from './subs';

import { router as GetRouter } from './router/get';
import { router as PostRouter } from './router/post';
import { router as PutRouter } from './router/put';
import { router as DelRouter } from './router/del';

export const configPageCreator: IModuleConfig<IPageCreatorProps, ISubProps> = {
  component: {
    className: 'PageCreator',
    solution: {
      onClick: [showConsole]
    },
    defaultProps: DEFAULT_PROPS,
    children: subComponents
  },
  router: {
    domain: 'page-creator',
    list: [GetRouter, PostRouter, PutRouter, DelRouter],
    hoistRoutes: [{
      alias: 'schemaTree',
      routerNames: ['componentTree', 'schemaTree']
    }
    ,{
      alias: 'treeContextMenu',
        routerNames: ['componentTree', 'contextMenu']
    }
    ,{
      alias: 'previewer',
      routerNames: ['switchPanel', 'previewer']
    }
    ,{
      alias: 'editorInPanel',
      routerNames: ['switchPanel', 'codeEditor']
    }
  ], // 提升访问子路由功能，相当于是强约束化的 alias
    // aliases: {
    //   alias: 'blockbar',
    //   path: 'bar/headerbar'
    // } // 自定义的路由别名规则
  },
  store: {
    idPrefix: 'idepc'
  },
  model: {
    controlledKeys: [], // 后续再初始化
    props: {
      visible: types.optional(types.boolean, true),
      text: types.optional(types.string, '')
      // language: types.optional(
      //   types.enumeration('Type', CODE_LANGUAGES),
      //   ECodeLanguage.JS
      // ),
      // children: types.array(types.late((): IAnyModelType => SchemaModel)) // 在 mst v3 中， `types.array` 默认值就是 `[]`
      // options: types.map(types.union(types.boolean, types.string))
      // 在 mst v3 中， `types.map` 默认值就是 `{}`
    }
  }
};

// 枚举受 store 控制的 key，一般来自 config.model.props 中 key
// 当然也可以自己枚举
export const SELF_CONTROLLED_KEYS = Object.keys(configPageCreator.model.props); // ['visible', 'text']

export const CONTROLLED_KEYS = BASE_CONTROLLED_KEYS.concat(
  SELF_CONTROLLED_KEYS
);

// 初始化 controlledKeys
configPageCreator.model.controlledKeys = CONTROLLED_KEYS;
