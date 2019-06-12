import * as React from 'react';
import { render } from 'react-dom';
import { message } from 'antd';
// import { createSchemaModel, ISchemaProps } from 'ide-tree';
import {
  schemaConvertToNew,
  schemaConverter,
  ESchemaOrigin
} from 'ide-component-tree';
import { IPanel } from 'ide-switch-panel';
import { debounce } from 'ts-debounce';
import { invariant, omit, pick, getValueByPath } from 'ide-lib-utils';
// import { REPL, converterFnJSON } from 'ide-function-sets';
import { IHeaderBarButton } from 'ide-header-bar';
import { WRAPPER_TYPE } from 'ide-props-editor';

import axios from 'axios';

import { PageCreator, IPageCreatorProps, PageCreatorFactory } from '../src/';

// import oldSchemajson from './old-schema.json';
import { schema as newSchemajson, URL_COMPONENT_LIST } from './new-schema.js';
import { pageStore, propsSchema, formData } from './propsEditor';
import { listComponentResult } from './component-list';
import { menuProps, useLocal, URL_PREVIEW, appId } from './constant';

import {
  getBlockSchema,
  getCompBlockList,
  getAllSchema,
  initFnPanel,
  setCompTplList,
  savePageByClient,
  getPageData,
  updatePreview,
  initSchemaTree,
  updatePropsEditor,
  getComponentListAndSchema,
  getAllFnString,
  getModulesById
} from './util';
import console = require('console');

const {
  ComponentWithStore: PageCreatorWithStore,
  client,
  innerApps
} = PageCreatorFactory();

const clientFnSets = innerApps.switchPanel.innerApps.fnSets.client;
const clientSwitchPanel = innerApps.switchPanel.client;

/* ----------------------------------------------------
    获取 BlockList
----------------------------------------------------- */
let blockList = {};
async function initBlockList() {
  blockList = await getCompBlockList();
}
initBlockList();

/* ----------------------------------------------------
    获取 LIST_COMPONENT_MAP
----------------------------------------------------- */
let LIST_COMPONENT_MAP = {};
let LIST_COMPONENT = {};

// console.log('222', schema);

const onExpand = function(keys) {
  // console.log(888, keys);
};

const onSelectNode = node => {
  const attrs = JSON.parse(node.attrs);
  const pid = attrs && attrs.component && attrs.component.packageId || 'html';

  // 获取选中的节点，然后将属性传递给属性编辑器
  const nameInList = `${pid}_${node.name}`;
  console.log('当前选中的 node:', node.id, node.name, nameInList);

  const selectListItem = LIST_COMPONENT_MAP[nameInList];

  if (!selectListItem) {
    message.info(`当前选中的 ${node.name} 没有组件信息(cid: ${nameInList})`);
    updatePropsEditor(client); // 置空右侧属性面板
    return;
  }

  const curProps = {
    // key: {
    //   type: 'id',
    //   title: '唯一 id'
    // }
  };
  for (const key in selectListItem.props) {
    if (selectListItem.props.hasOwnProperty(key)) {
      const element = selectListItem.props[key];
      element.title = element.title || key;
      curProps[key] = element;
    }
  }

  const curPropsSchema = {
    properties: curProps
  };

  // 获取当前点击节点的内容
  client
    .get(`/schemaTree/nodes/${node.id}?filter=name,screenId,attrs`)
    .then(res => {
      const nodeData = (res && res.body && res.body.node) || {};
      const attrJSON = JSON.parse(nodeData.attrs || '{}');
      const propData = attrJSON.props || {};

      const curFormData = {
        id: node.id,
        component: attrJSON.component,
        ...propData
      };
      // console.log(
      //   222,
      //   JSON.stringify(curFormData, null, 4),
      //   JSON.stringify(curPropsSchema, null, 4)
      // );
      console.log('当前选中的属性：', curFormData, curPropsSchema);
      updatePropsEditor(client, curPropsSchema, curFormData); // 设置右侧属性面板
    });
};

function onClickItem(key: string, keyPath: Array<string>, item: any) {
  console.log(`[11]当前点击项的 id: ${key}`);
}

function onClick(value) {
  console.log('当前点击：', value);
}

function onRightClick({ node, event }) {
  console.log('onRightClick...');
}

function onSwitchWithClient(panel: IPanel, index: number) {
  console.log('[with client]当前点击：', panel, index);
}

// 经过 debounce 处理的函数，提高性能；如果属性树变更，则更新视图
const schemaModelChange = debounce(
  (key: string, value: any) => {
    if (key === 'schema') {
      const result = value.schemaJSON ? value.schemaJSON : value;
      console.log('schema changed:', key, result);

      // 更改 ide 的内容
      client.put('/editorInPanel/editor', {
        name: 'value',
        value: JSON.stringify(result.children, null, 4)
      });

      // 然后传递数据给 iframe
      // newSchemajson.components = result.children;
      updatePreview(client, 'reset', [{ components: result.children }]);
    }
  },
  400,
  {
    isImmediate: true
  }
);

function onClickMenuItem(key: string, keyPath: Array<string>, item: any) {
  console.log(`[context menu]当前点击项的 id: ${key}`);

  const targetList = key === 'createBlock' ? blockList : LIST_COMPONENT;
  // 如果点击是 “创建区块”，则更改 list 源
  client.put('/comList/model', { name: 'list', value: targetList });
}

// 在 component list 选择某项
const onSelectListItem = async item => {
  console.log('onSelectListItem...', item);

  // 在某个节点下新增
  const keyName = await client
    .get('/treeContextMenu/selection')
    .then(res => res.body.data.selection);

  // 获取当前选择的 selectId
  if (keyName === 'createBlock') {
    const blockSchema = await getBlockSchema(item.appId, item.id);
    if (!blockSchema) {
      message.error(
        `${item.name} 区块没有对应的 schema，请检查(appId: ${item.appId}, id: ${
          item.id
        })`
      );
      return;
    }
    // 转换成 schema 对象
    const convertedSchema = schemaConvertToNew(JSON.parse(blockSchema));
    // const model = createSchemaModel(convertedSchema);

    // 将生成的 schema 放到指定 id 的 children
    const nodeId = await client
      .get('/schemaTree/selection')
      .then(res => res.body.data.id);
    if (!!nodeId) {
      client.post(`/schemaTree/nodes/${nodeId}/children`, {
        schema: convertedSchema
      });
    }
  }
};

const componentTree = {
  schemaTree: {
    onSelectNode: onSelectNode,
    onRightClickNode: onRightClick,
    onModelChange: schemaModelChange,
    onExpand
  },
  contextMenu: { onClickItem: onClickMenuItem },
  comList: {
    onSelectItem: onSelectListItem
  }
};

const switchPanel = {
  onSwitch: onSwitchWithClient,
  codeEditor: {
    language: 'json'
  },
  previewer: {
    dataType: 'JSON',
    handleFrameTasks: data => {
      console.log('[iframe] receive pi data:', data);
    },
    url: `${URL_PREVIEW}?from=ide&messageShow=true`
    // url: 'http://localhost:9006/gourd2/pi/demo/preview.html?from=ide&messageShow=true'
  },
  fnSets: {
    // 当函数面板变更的时候
    onFnListChange: async (type, obj) => {
      console.log('fn list change:', type, obj);

      const fns = await getAllFnString(client);
      updatePreview(client, 'setFunctions', [encodeURIComponent(fns)]);

      const allSchema = await getAllSchema(client);
      updatePreview(client, 'reset', allSchema);

      // // bugfix: 目前还需要强制更新一次 schema
      // // TODO:
      // client.get('/schemaTree/nodes/$root_div').then(res => {
      //   const children = getValueByPath(res, 'body.node.children');
      //   const resultSchema = children.map(child => child.schemaJSON);
      //   updatePreview(client, 'reset', [{ components: resultSchema }]);
      // });
    }
  }
};

const propsEditor = {
  formData: formData,
  schema: propsSchema,
  pageStore: pageStore
};

const propsEditorExtra = {
  key: 'id',
  clientFnSets: clientFnSets,
  onCallFnEditor: (type, name) => {
    console.log(`${type} ${name}`);
    // 切换到函数面板
    clientSwitchPanel.put(`/panels/selection/2`);
  },
  varNameWrapper: (fnName, type) => {
    if (type === WRAPPER_TYPE.UNWRAP) {
      return fnName.replace(/[\{\}]/g, ''); // 去除大小括号
    } else {
      return `{{${fnName}}}`;
    }
  },
  // 记得添加 debounce
  onChange: debounce(
    (state: any) => {
      console.log('onChange: ', state);

      // 更改属性
      const { id } = state;
      if (!id) {
        message.error('缺少 id 参数，无法更新属性');
        return;
      }

      client.put(`/schemaTree/nodes/${id}`, {
        name: 'attrs',
        value: {
          props: omit(state, ['id', 'component']),
          component: state.component
        }
      });
      // .then(res => {
      //   console.log(666, res, omit(state, 'id'));
      // });
    },
    400,
    {
      isImmediate: false
    }
  )
};

render(
  <PageCreatorWithStore
    // propsEditor={propsEditor}
    headerBar={{
      // 点击保存按钮后，保存当前页面
      onClickButton: (button: IHeaderBarButton) => {
        console.log('[headerBar] button click: ', button);
        savePageByClient(client);
      },
      iconTexts: []
    }}
    propsEditorExtra={propsEditorExtra}
    componentTree={componentTree}
    switchPanel={switchPanel}
    onClick={onClick}
  />,
  document.getElementById('example') as HTMLElement
);

/* ----------------------------------------------------
    初始化组件树
----------------------------------------------------- */

// 注意这里的 schema 需要用 createSchemaModel 转换一层，否则因为缺少 parentId ，导致无法创建成功
client.post('/treeContextMenu/menu', { menu: menuProps });
client.put('/comList/model', { name: 'visible', value: false });

/* ----------------------------------------------------
    初始化函数面板
----------------------------------------------------- */
export async function initListAndSchema() {
  const modules = await getModulesById(appId);
  // console.log(444, modules);
  const result = await getComponentListAndSchema(modules);
  LIST_COMPONENT_MAP = result.componentMap;
  LIST_COMPONENT = result.listComponents;

  const { pageSchema, eventFunction } = await getPageData();

  initFnPanel(clientFnSets, eventFunction);
  updatePreview(client, 'setFunctions', [eventFunction]);

  initSchemaTree(client, JSON.parse(pageSchema));
  setCompTplList(client, LIST_COMPONENT);
}

// 监听 pi 的 ready 事件
window.addEventListener('message', e => {
  const { event, type } = e.data;

  if (event === 'data-from-pi' && type === 'ready') {
    // 如果是本地请求;
    if (useLocal) {
      const res = listComponentResult;
      const listData = (res && res.data) || [];
      LIST_COMPONENT[134] = { title: 134, list: listData }; // 列表项
      // console.log(444, listData);
      listData.forEach(info => {
        const { name, packageId } = info;
        const componentName = `${packageId}_${name}`;

        LIST_COMPONENT_MAP[componentName] = info;
      });
      initFnPanel(clientFnSets, newSchemajson.functions);
      updatePreview(client, 'setFunctions', [newSchemajson.functions]);
      initSchemaTree(client, newSchemajson.components);
      setCompTplList(client, LIST_COMPONENT);
    } else {
      initListAndSchema();
    }
  }
});
