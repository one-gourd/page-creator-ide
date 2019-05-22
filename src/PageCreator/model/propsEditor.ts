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

