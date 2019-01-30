import {
  cast,
  types,
  Instance,
  IAnyModelType,
  applySnapshot,
  SnapshotOrInstance
} from 'mobx-state-tree';

import { pick } from '../../lib/util';
import { debugModel } from '../../lib/debug';
import { updateModelAttribute } from './util';
import { IStyles, IPageCreatorTheme } from '../index';

// export enum ECodeLanguage {
//   JSON = 'json',
//   JS = 'javascript',
//   TS = 'typescript'
// }
// export const CODE_LANGUAGES = Object.values(ECodeLanguage);

/**
 * 样式模型
 */
const StyleModel = types
  .model('StyleModel', {
    _style: types.map(types.union(types.number, types.string))
  })
  .views(self => {
    return {
      get style() {
        return self._style.toJSON();
      }
    };
  })
  .actions(self => {
    return {
      setStyle(style: React.CSSProperties) {
        applySnapshot(self, { _style: style as any });
      }
    };
  });



// 获取被 store 控制的 key 的列表
export type TPageCreatorControlledKeys =
  | keyof SnapshotOrInstance < typeof PageCreatorModel >
  | 'styles' | 'theme';

// 定义被 store 控制的 key 的列表，没法借用 ts 的能力动态从 TIFrameControlledKeys 中获取
export const CONTROLLED_KEYS: string[] = [
  'text',
  'theme',
  'styles',
];


/**
 * PageCreator 对应的模型
 */
export const PageCreatorModel = types
  .model('PageCreatorModel', {
    text: types.optional(types.string, ''),
    _theme: types.map(types.union(types.number, types.string, types.boolean)),
    _styles: types.map(types.late((): IAnyModelType => StyleModel))
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
      * 获取 styles 属性
      */
      get styles() {
        const styles: IStyles = {};
        if (self._styles.size) {
          for (let [k, v] of self._styles) {
            styles[k] = v.style;
          }
        }
        return styles;
      },

      get theme() {
        return self._theme.toJSON();
      },

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


      setTheme(theme: IPageCreatorTheme) {
        self._theme = cast(theme);
      },

      // 生成一个新的 style
      setStyle(name: string, style: React.CSSProperties) {
        const styleModel = StyleModel.create({});
        styleModel.setStyle(style);
        self._styles.set(name, styleModel);
      }
    };
  })
  .actions(self => {
    return {
      // 设置多个 styles 对象
      setStyles(styles: IStyles) {
        Object.keys(styles).forEach((name: string) => {
          self.setStyle(name, styles[name]);
        });
      },

      updateAttribute(name: string, value: any) {
        return updateModelAttribute(self as IPageCreatorModel, name, value);
      },

      /**
       * 更新指定目标的 css 样式
       * @param target - 目标要更改 css 的对象名
       * @param style - 新的 css 样式
       * @param upInsert - 属性不存在则新建
       * @param mergeStyle - 不覆盖原有的样式
       */
      updateCssAttribute(
        target: string,
        style: React.CSSProperties,
        upInsert: boolean = true,
        mergeStyle: boolean = true
      ) {
        const result = {
          message: '',
          success: true
        };
        const originStyleModel = self._styles.get(target);
        if (!originStyleModel && upInsert) {
          self.setStyle(target, style);
          result.message = `目标样式不存在，新建 ${target} 的样式`;
        } else if (originStyleModel) {
          const originStyle = originStyleModel.style;
          if (mergeStyle) {
            originStyleModel.setStyle(Object.assign({}, originStyle, style));
            result.message = `目标样式存在，覆盖 ${target} 的样式`;
          } else {
            originStyleModel.setStyle(style);
            result.message = `目标样式存在，替换 ${target} 的样式`;
          }
        } else {
          result.message = `不存在名为 ${target} 的样式`;
          result.success = false;
        }

        return result;
      },

      /**
       * 更新 theme 指定变量
       * @param target - theme 变量名
       * @param value - 变量值
       */
      updateTheme(target: string, value: any) {
        const result = {
          message: '',
          success: false
        };
        let keys = [...self._theme.keys()];

        if (!target) {
          result.message = `请传入要更改的 theme 变量`;
        } else if (!self._theme.has(target)) {
          result.message = `theme 对象中不存在 ${target} 变量（支持的变量列表：[${keys}]）`;
        } else {
          self._theme.set(target, value);
          result.success = true;
        }
        return result;
      }
    };
  });

export interface IPageCreatorModel extends Instance<typeof PageCreatorModel> { }

