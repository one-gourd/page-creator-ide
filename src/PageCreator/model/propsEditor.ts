import {
  cast,
  types,
  Instance,
  IAnyModelType,
  SnapshotOrInstance
} from 'mobx-state-tree';

import { quickInitModel } from 'ide-lib-engine';
import { JSONModel, EMPTY_JSON_SNAPSHOT } from 'ide-lib-base-component';

import { invariant } from 'ide-lib-utils';

import { debugModel } from '../../lib/debug';

//     clientFnSets?: any,
// pageStore?: any,
// formData?: any,
// schema?: any,
/**
 * 属性编辑器 model
 */
export const PropsEditorModel: IAnyModelType = quickInitModel(
  'PropsEditorModel',
  {
    schema: types.optional(JSONModel, EMPTY_JSON_SNAPSHOT), // 属性 schema 描述
    formData: types.optional(JSONModel, EMPTY_JSON_SNAPSHOT), // 属性值
    pageStore: types.optional(JSONModel, EMPTY_JSON_SNAPSHOT) // 页面 store，用于提示
  }
);

export interface IPropsEditorModel extends Instance<typeof PropsEditorModel> {}
export interface IPropsEditorModelSnapshot
  extends SnapshotOrInstance<typeof PropsEditorModel> {}

export const CONTROLLED_KEYS_PROPSEDITOR = ['schema', 'formData', 'pageStore'];

/**
 * 辅助函数，将 fnObjects（ {name: body} 对象集） 转换成 fns 快照格式，方便丢给 mst 生成对象；多用于初始化
 * 如果 body 为空，说明该函数被注释了（或者其他异常情况），则需要剔除该函数方法
 *
 * @param {{[key: string]: string}} fnJSON - 函数 {name: body} 对象
 * @param {string} [subKey=''] - 如果不为空，表示 body 元素是对象，需要使用 body[subKey] 获取函数体；否则 body 就是函数体，可直接使用
 * @returns { [key: string]: { [k2: string]: string } } - fns 模型所对应的 snapshot 格式
 */
// export function converterFnJSON(
//     fnJSON: { [key: string]: any },
//     subKey: string = ''
// ) {
//     const result: { [key: string]: { [k2: string]: string } } = {};
//     for (const name in fnJSON) {
//         if (fnJSON.hasOwnProperty(name)) {
//             const fnBody = fnJSON[name];
//             const fid = uuid(FN_IDPREFIX);
//             // 如果 body 为空，则不能放进模板里
//             const body = !!subKey ? fnBody[subKey] : fnBody;
//             if (!!body) {
//                 result[fid] = {
//                     id: fid,
//                     name: name,
//                     body: !!subKey ? fnBody[subKey] : fnBody
//                 };
//             } else {
//                 debugModel(
//                     `[converterFnJSON] 函数 ${name} 无法转换成模型: body 内容为空，故而忽略`
//                 );
//             }
//         }
//     }
//     return result;
// }

/**
 * 将普通 IFunctionListItem 实例转换成 fn 扩展实例
 * @param fn - 普通函数对象
 */
// export function converterFnSnapshot(fn: IFunctionListItem) {
//     const fid = uuid(FN_IDPREFIX);
//     return {
//         id: fid,
//         name: fn.name,
//         body: fn.body
//     };
// }
