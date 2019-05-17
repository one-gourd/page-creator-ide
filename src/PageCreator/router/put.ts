import Router from 'ette-router';
import { updateStylesMiddleware, updateThemeMiddleware, buildNormalResponse } from 'ide-lib-base-component';
import { mergeWithLevel } from 'ide-lib-utils';


import { IContext } from './helper';
import { otherControlledKeyMap, mergeRule } from '../model';


export const router = new Router();
// 更新单项属性
router.put('updateModel', '/model', function(ctx: IContext) {
  const { stores, request } = ctx;
  const { name, value } = request.data;

  //   stores.setSchema(createSchemaModel(schema));
  const originValue = stores.model[name];

  // 如果是有 mergeRule 的属性，需要额外的操作
  const pickedOrigin = {};
  let targetValue = value;
  if (otherControlledKeyMap[name]) {
    otherControlledKeyMap[name].forEach((keyName: string) => {
      pickedOrigin[keyName] = originValue[keyName];
    });
  }

  // 是否有对应的 merge 规则
  if (mergeRule[name]) {
    targetValue = mergeWithLevel(pickedOrigin, value, mergeRule[name].level);
  }

  // console.log(999, pickedOrigin, value, mergeRule[name]);
  const isSuccess = stores.model.updateAttribute(name, targetValue);

  buildNormalResponse(ctx, 200, { success: isSuccess, origin: originValue }, `属性 ${name} 的值从 ${originValue} -> ${value} 的变更: ${isSuccess}`);
});


// 更新 css 属性
router.put('updateStyles', '/model/styles/:target', updateStylesMiddleware('model'));


// 更新 theme 属性
router.put('updateTheme', '/model/theme/:target', updateThemeMiddleware('model'));
