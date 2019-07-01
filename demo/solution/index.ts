import {
  initFnPanel,
  setCompTplList,
  getPageData,
  updatePreview,
  initSchemaTree
} from '../util';
import {
  LIST_COMPONENT,
  LIST_COMPONENT_MAP,
  useLocal,
  URLS
} from '../constant';

import { listComponentResult } from '../component-list';

import { schema as newSchemajson } from '../new-schema.js';

import { menuProps } from './ComponentTree';
import console = require('console');

function listenToPi(cb) {
  // 监听 pi 的 ready 事件
  window.addEventListener('message', e => {
    const { event, type } = e.data;

    if (event === 'data-from-pi' && type === 'ready') {
      console.log('----- pi ready -----');
      cb && cb();
    }
  });
}
/* ----------------------------------------------------
    初始化函数面板
----------------------------------------------------- */
const initListAndSchema = async (client, innerApps) => {
  const { pageSchema, eventFunction } = await getPageData();

  // console.log(555, URLS.preview());
  // 更新 preview 的链接后才能预览
  client
    .put('/previewer/iframe', {
      name: 'url',
      value: URLS.preview()
    })
    .then(() => {
      listenToPi(() => {
        const clientFnSets = innerApps.switchPanel.innerApps.fnSets.client;
        initFnPanel(clientFnSets, eventFunction);
        updatePreview(client, 'setFunctions', [eventFunction]);
        initSchemaTree(client, JSON.parse(pageSchema));
        setCompTplList(client, LIST_COMPONENT);
      });
    });
};

export const initPageCreator = (client, innerApps) => {
  // const clientFnSets = innerApps.switchPanel.innerApps.fnSets.client;

  /* ----------------------------------------------------
    初始化组件树
----------------------------------------------------- */
  // 注意这里的 schema 需要用 createSchemaModel 转换一层，否则因为缺少 parentId ，导致无法创建成功
  client.post('/treeContextMenu/menu', { menu: menuProps });
  client.put('/comList/model', { name: 'visible', value: false });

  initListAndSchema(client, innerApps);
  // // 监听 pi 的 ready 事件
  // window.addEventListener('message', e => {
  //   const { event, type } = e.data;

  //   if (event === 'data-from-pi' && type === 'ready') {
  //     // 如果是本地请求;
  //     if (useLocal) {
  //       const res = listComponentResult;
  //       const listData = (res && res.data) || [];
  //       LIST_COMPONENT[134] = { title: 134, list: listData }; // 列表项
  //       // console.log(444, listData);
  //       listData.forEach(info => {
  //         const { name, packageId } = info;
  //         const componentName = `${packageId}_${name}`;

  //         LIST_COMPONENT_MAP[componentName] = info;
  //       });
  //       initFnPanel(clientFnSets, newSchemajson.functions);
  //       updatePreview(client, 'setFunctions', [newSchemajson.functions]);
  //       initSchemaTree(client, newSchemajson.components);
  //       setCompTplList(client, LIST_COMPONENT);
  //     } else {
  //       initListAndSchema(client, innerApps);
  //     }
  //   }
  // });
};
