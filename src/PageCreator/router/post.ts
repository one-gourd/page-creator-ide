import Router from 'ette-router';

import { IContext } from './helper';
import { createModel } from '../schema/util';

export const router = new Router();

// 创新新的 model 
router.post('model', '/model', function (ctx: IContext) {
  const { stores, request } = ctx;
  const { model } = request.data;

  stores.setModel(createModel(model));
  // stores.setSchema(createSchemaModel(schema));

  ctx.response.status = 200;
});