import {
  cast,
  types,
  Instance,
  IAnyModelType,
  applySnapshot,
  SnapshotOrInstance
} from 'mobx-state-tree';

import { pick } from 'ide-lib-utils';
import { BaseModel, TBaseControlledKeys, BASE_CONTROLLED_KEYS, stringLiterals, ElementType  } from 'ide-lib-base-component';

import { debugModel } from '../../lib/debug';
import { updateModelAttribute } from './util';

// export enum ECodeLanguage {
//   JSON = 'json',
//   JS = 'javascript',
//   TS = 'typescript'
// }
// export const CODE_LANGUAGES = Object.values(ECodeLanguage);

const SELF_CONTROLLED_KEYS = stringLiterals('visible',
  'text');
export const CONTROLLED_KEYS = BASE_CONTROLLED_KEYS.concat(SELF_CONTROLLED_KEYS);
// 获取被 store 控制的 model key 的列表，
// note: 由于 使用 BaseModel 继承获得，用 awesome-typescript-load 解析不出来，只能自己定义了
export type TPageCreatorControlledKeys = ElementType<typeof SELF_CONTROLLED_KEYS> | TBaseControlledKeys;


/**
 * PageCreator 对应的模型
 */
export const PageCreatorModel: IAnyModelType = BaseModel
  .named('PageCreatorModel')
  .props({
    visible: types.optional(types.boolean, true),
    text: types.optional(types.string, '')
    // language: types.optional(
    //   types.enumeration('Type', CODE_LANGUAGES),
    //   ECodeLanguage.JS
    // ),
    // children: types.array(types.late((): IAnyModelType => SchemaModel)) // 在 mst v3 中， `types.array` 默认值就是 `[]`
    // options: types.map(types.union(types.boolean, types.string))
    // 在 mst v3 中， `types.map` 默认值就是 `{}`
    //  ide 的 Options 可选值参考： https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html
  })
  .views(self => {
    return {
      /**
       * 只返回当前模型的属性，可以通过 filter 字符串进行属性项过滤
       */
      allAttibuteWithFilter(filterArray: string | string[] = CONTROLLED_KEYS) {
        const filters = [].concat(filterArray || []);
        return pick(self, filters);
      }
    };
  })
  .actions(self => {
    return {
      setText(text: string) {
        self.text = text;
      },
      setVisible(v: boolean | string) {
        self.visible = v === true || v === 'true'
      }
    };
  })
  .actions(self => {
    return {
     
      updateAttribute(name: string, value: any) {
        return updateModelAttribute(self, name, value);
      }
    };
  });

export interface IPageCreatorModel extends Instance<typeof PageCreatorModel> { }

