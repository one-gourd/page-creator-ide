import { message } from 'antd';
import { getModulesById, getComponentListAndSchema, APP_INFO } from './util';

var searchParams = new URLSearchParams(location.search);
export const appId = searchParams.get('appId');
!appId && message.warn('缺少  appId');

export const pageId = searchParams.get('pageId');
!pageId && message.warn('缺少  pageId');

export const DOMAIN = window.location.host;

export const API_COMP_TPL = `//${DOMAIN}/api/component/all/cate/template`;

// 通过请求获取 list 列表
export const useLocal = false;

export const URL_HISTORY = `//${DOMAIN}/api/page_his/${appId}/list/${pageId}`;
export const URL_ADMIN = `//${DOMAIN}/admin#/app/${appId}`;

// 需要异步获取的 url，因为 app_info 的信息是异步获取的
export const URLS = {
  preview: () => {
    return useLocal
      ? 'http://localhost:9006/gourd2/pi/demo/preview.html'
      : `//${DOMAIN}/plus/pi/preview/page/${APP_INFO &&
          APP_INFO.appName}/${APP_INFO &&
          APP_INFO.name}?from=ide&messageShow=true`;
  }
};

/* ----------------------------------------------------
    获取 LIST_COMPONENT_MAP
----------------------------------------------------- */
export let LIST_COMPONENT_MAP = {};
export let LIST_COMPONENT = {};
async function initListComponent() {
  const modules = await getModulesById(appId);
  // console.log(444, modules);
  const result = await getComponentListAndSchema(modules);
  LIST_COMPONENT_MAP = result.componentMap;
  LIST_COMPONENT = result.listComponents;
}
initListComponent();
// ==================================

export const PAGE_DATA = JSON.parse(
  document.getElementById('pageJSON').innerText
);

export const APPLICATION_TYPE_EN_NAME = {
  '1': 'page',
  '2': 'template',
  '3': 'master'
};

/**
 * 应用类型
 * @type {{COMMON: string, TEMPLATE: string, MASTER: string}}
 */
enum APPLICATION_TYPE {
  // 页面应用
  PAGE = 'PAGE',
  // 模板应用
  TPL = 'TPL',
  // 母版应用
  MASTER = 'MASTER'
}

// 暂时固定为 page 应用
export const appType = searchParams.get('type') || APPLICATION_TYPE.PAGE;

// 是否页面类型的应用
const IS_PAGE_APP = appType === APPLICATION_TYPE.PAGE;

// 是否是模板类 APP
const IS_TPL_APP = appType === APPLICATION_TYPE.TPL;

// 是否是母版类 APP
const IS_MASTER_APP = appType === APPLICATION_TYPE.MASTER;

// 是否组件类型的应用
const IS_COMP_APP = IS_TPL_APP || IS_MASTER_APP;

export const API_SERVICE = {
  /* 回滚到指定历史记录 */
  historyRollback: function(historyId) {
    return IS_PAGE_APP
      ? `//${DOMAIN}/api/page/${appId}/rollback/${historyId}`
      : `//${DOMAIN}/api/component/${appId}/rollback/${historyId}`;
  }
};
