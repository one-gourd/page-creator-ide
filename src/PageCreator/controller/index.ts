import Application from 'ette';

import { IStoresModel } from '../schema/stores';
import { router as GetRouter } from '../router/get';
import { router as PostRouter } from '../router/post';
import { router as PutRouter } from '../router/put';
import { router as DelRouter } from '../router/del';
import { debugIO } from '../../lib/debug';


export const AppFactory = function (stores: IStoresModel) {

    const app = new Application({ domain: 'page-creator' });

    // 挂载 stores 到上下文中
    app.use((ctx: any, next) => {
        ctx.stores = stores;
        debugIO(`[${stores.id}] request: ${JSON.stringify(ctx.request.toJSON())}`);
        next();
        debugIO(`[${stores.id}] [${ctx.request.method}] ${ctx.request.url} ==> response: ${JSON.stringify(ctx.response.toJSON())}`);
    });

    // 注册路由
    app.use(GetRouter.routes());
    app.use(PostRouter.routes());
    app.use(PutRouter.routes());
    app.use(DelRouter.routes());

    return app;
}
