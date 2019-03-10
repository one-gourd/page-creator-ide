import Application from 'ette';

import { applyProxy } from 'ide-lib-base-component';

import { IStoresModel
    , ESubApps
} from '../schema/stores';
import { router as GetRouter } from '../router/get';
import { router as PostRouter } from '../router/post';
import { router as PutRouter } from '../router/put';
import { router as DelRouter } from '../router/del';
import { debugIO } from '../../lib/debug';

export const AppFactory = function (stores: IStoresModel, innerApps: Record<string, Application> = {}) {

    const app = new Application({ domain: 'page-creator' });
    app.innerApps = innerApps; // 新增 innerApps 的挂载

    // 挂载 stores 到上下文中，注意这里的 next 必须要使用 async，否则 proxy 的时候将出现异步偏差
    app.use(async (ctx: any, next: any) => {
        ctx.stores = stores;
        ctx.innerApps = innerApps;
        // 因为存在代理，url 中的路径将有可能被更改
        const originUrl = ctx.request.url;
        debugIO(`[${stores.id}] request: ${JSON.stringify(ctx.request.toJSON())}`);
        await next();
        debugIO(`[${stores.id}] [${ctx.request.method}] ${originUrl} ==> response: ${JSON.stringify(ctx.response.toJSON())}`);
    });

    // 进行路由代理，要放在路由挂载之前
    applyProxy(app, [
        // {
        //     name: ESubApps.schemaTree,
        //     targets: ['tree', 'nodes']
        // }
    ]);

    // 注册路由
    app.use(GetRouter.routes());
    app.use(PostRouter.routes());
    app.use(PutRouter.routes());
    app.use(DelRouter.routes());

    return app;
}
