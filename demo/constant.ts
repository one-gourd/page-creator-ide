import { message } from 'antd';
import { getModulesById, getComponentListAndSchema } from './util';

var searchParams = new URLSearchParams(location.search);
export const appId = searchParams.get('appId');
!appId && message.warn('缺少  appId');

export const pageId = searchParams.get('pageId');
!pageId && message.warn('缺少  pageId');

export const API_COMP_TPL =
  'http://gourd.daily.taobao.net/api/component/all/cate/template';

// 通过请求获取 list 列表
export const useLocal = false;
export const URL_PREVIEW = useLocal
  ? 'http://localhost:9006/gourd2/pi/demo/preview.html'
  : 'http://gourd.daily.taobao.net/ide-preview';

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
