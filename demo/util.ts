import axios from 'axios';
import { message } from 'antd';
import { getValueByPath } from 'ide-lib-utils';
import { REPL, converterFnJSON } from 'ide-function-sets';
import { schemaConverter, ESchemaOrigin } from 'ide-component-tree';
import { createSchemaModel, ISchemaProps } from 'ide-tree';

import {
  appId,
  pageId,
  PAGE_DATA,
  DOMAIN,
  APPLICATION_TYPE_EN_NAME,
  API_SERVICE
} from './constant';

/* ----------------------------------------------------
    请求相关
----------------------------------------------------- */
export async function getModulesById(appId: string) {
  const url = `http://gcs.dockerlab.alipay.net/api/application/${appId}/packages `;
  const result = await axios.get(url);
  return result.data;
}

// 通过 modules 获取组件的 list & schema
export async function getComponentListAndSchema(modules) {
  const listComponents = {};
  const componentMap = {};

  for (const mod of modules) {
    const url = `http://gcs.dockerlab.alipay.net/api/packages/${
      mod.id
    }/components`;
    const res = await axios({
      method: 'get',
      url: url,
      responseType: 'json'
    });

    const listData = (res && res.data && res.data.data) || [];
    listComponents[mod.id] = { title: mod.id, list: listData }; // 列表项
    listData.forEach(info => {
      const { name, packageId } = info;
      const componentName = `${packageId}_${name}`;

      componentMap[componentName] = info;
    });
  }

  return { listComponents, componentMap };
}

/* ----------------------------------------------------
    client 控制器
----------------------------------------------------- */

// 获取所有的函数内容
export const getAllFnString = async client => {
  const res = await client.get('/fnSets/model/all-fns-string');
  return getValueByPath(res, 'body.data.result');
};

export const getAllSchema = async client => {
  const res = await client.get('/schemaTree/nodes/$root_div');
  const children = getValueByPath(res, 'body.node.children');
  return children.map(child => child.schemaJSON);
};

// 设置右键弹出来的组件列表
export const setCompTplList = (client, list) => {
  client.put('/comList/model', { name: 'list', value: list });
};

// 函数面板: 根据函数字符串初始化函数面板
export function initFnPanel(clientFnSets, fnStrings: string) {
  // 转换函数
  const replFns = new REPL(decodeURIComponent(fnStrings));
  const fnJSON = replFns.extractAllFunction(); // 获取所有的函数对象
  const fnsSnapshoot = converterFnJSON(fnJSON, 'fnBody');
  //  初始化函数面板
  clientFnSets.post('/model', {
    model: {
      visible: true,
      text: `text${Math.random()}`.slice(0, 8),
      fns: fnsSnapshoot
    }
  });
}

// 组件树：初始化组件树
export function initSchemaTree(client, schemaJSON: object) {
  // 新版 json 转换
  const schemaJSONv2 = schemaConverter(schemaJSON, ESchemaOrigin.GOURD_V2);
  const localSchema = createSchemaModel(schemaJSONv2);
  // 创建组件树和右键菜单
  client.post('/schemaTree/tree', {
    schema: localSchema
  });
  //   console.log('rrrrrest');
  updatePreview(client, 'reset', [{ components: schemaJSON }]);
}

// 更新预览页面
export function updatePreview(client, type: string, data: any) {
  client.put('/previewer/iframe', {
    name: 'data',
    value: {
      event: 'data-from-ide',
      type: type,
      data: data
    }
  });
}

// 属性面板
export function updatePropsEditor(client, schema = {}, formData = {}) {
  client.put('/model', {
    name: 'propsEditor',
    value: {
      schema,
      formData
    }
  });
}

/* ----------------------------------------------------
    页面操作
----------------------------------------------------- */
export let APP_INFO = null;
// 获取页面初始数据
export const getPageData = async () => {
  const res = await axios.get(`//${DOMAIN}/api/page/${appId}/${pageId}`);
  APP_INFO = res.data.data;
  return APP_INFO;
};

// 页面：根据 schemaId 和 fns 保存页面
export async function savePage(schema: string, fns: string) {
  const result: { [key: string]: any } = await axios.put(
    `//${DOMAIN}/api/page/${appId}/${pageId}`,
    {
      status: 1,
      appId,
      _tb_token_: PAGE_DATA.token,
      eventFunction: fns,
      pageSchema: schema
    }
  );

  if (result.data.success) {
    message.info('保存成功');
  } else {
    message.info(`保存失败: ${result.data.message}`);
  }
  return result;
}

export async function savePageByClient(client) {
  const fns = await getAllFnString(client);
  const resultSchema = await getAllSchema(client);
  return savePage(JSON.stringify(resultSchema), encodeURIComponent(fns));
}

export async function getBlockSchema(appId: string, compId: string) {
  const result = await axios.get(
    `//${DOMAIN}/api/comp_publish/${appId}/prod/${compId}`
  );
  return getValueByPath(result, 'data.data.pageSchema');
}

/* ----------------------------------------------------
    历史记录相关
----------------------------------------------------- */
export async function getHistoryList(page: number = 1, pageSize: number = 5) {
  const result = await axios.get(
    `//${DOMAIN}/api/page_his/${appId}/list/${pageId}`,
    {
      params: {
        pageSize,
        page,
        _tb_token_: PAGE_DATA.token
      }
    }
  );
  return getValueByPath(result, 'data.data');
}

/**
 * 获取草稿地址
 * @param appId
 * @param historyId
 * @param appType {1 ||  2 ||  3}
 * @return {string}
 */
export const getDraftUrl = (appId, historyId, appType = 1) => {
  const appTypeName = APPLICATION_TYPE_EN_NAME[String(appType)];
  return `${location.protocol}//${
    location.host
  }/pi/draft/history/${appTypeName}?appId=${appId}&historyId=${historyId}`;
};

// 请求接口，回滚到历史页面
export const rollbackHistory = async historyId => {
  let url = API_SERVICE.historyRollback(historyId);

  const result = await axios.put(url, { _tb_token_: PAGE_DATA.token });
  return result.data;
};
// ===============

// 获取预览/页面 url
export const getPageUrl = (
  isPreview = true,
  dfEnv = 'prod'
) => {
  const { appName, name } = APP_INFO;
  let query = `?dfEnv=${dfEnv}`;
  let path = isPreview ? 'preview/page' : 'page';
  return `${location.protocol}//${location.host}/pi/${path}/${appName
  }/${name}${query}`;
};
