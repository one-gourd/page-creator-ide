import { updateInScope, BASE_CONTROLLED_KEYS } from 'ide-lib-base-component'
import { debugModel } from '../../lib/debug';
import { IPageCreatorProps, IPageCreatorModel, PageCreatorModel, IStoresModel, DEFAULT_PROPS } from '../../index';

/**
 * 将普通对象转换成 Model
 * @param modelObject - 普通的对象
 */
export function createModel(modelObject: IPageCreatorProps = DEFAULT_PROPS): IPageCreatorModel {
  const mergedProps = Object.assign({}, DEFAULT_PROPS, modelObject);
  const { visible, text, theme, styles } = mergedProps;

  const model = PageCreatorModel.create({
    visible, text
  });
  model.setStyles(styles || {});
  model.setTheme(theme);

  return model;
}

/**
 * 创建新的空白
 */
export function createEmptyModel() {
  return createModel({});
}

/* ----------------------------------------------------
    更新指定 enum 中的属性
----------------------------------------------------- */

// 定义 menu 可更新信息的属性
const EDITABLE_ATTRIBUTE = BASE_CONTROLLED_KEYS.concat([
  'visible',
  'text'
]);

export const updateModelAttribute = updateInScope(EDITABLE_ATTRIBUTE);
