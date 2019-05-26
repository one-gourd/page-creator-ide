import * as React from 'react';
import { render } from 'react-dom';
import { message } from 'antd';
import { createSchemaModel, ISchemaProps } from 'ide-tree';
import { schemaConverter, ESchemaOrigin } from 'ide-component-tree';
import { IPanel } from 'ide-switch-panel';
import { debounce } from 'ts-debounce';
import { invariant, omit, pick, getValueByPath } from 'ide-lib-utils';
import { REPL, converterFnJSON } from 'ide-function-sets';

import axios from 'axios';

import { PageCreator, IPageCreatorProps, PageCreatorFactory } from '../src/';

import oldSchemajson from './old-schema.json';
import { schema as newSchemajson, URL_COMPONENT_LIST } from './new-schema.js';
import { pageStore, propsSchema, formData } from './propsEditor';
import { listComponentResult } from './component-list';

// 通过请求获取 props
const LIST_COMPONENT_MAP = {};
let LIST_COMPONENT = {};

const convertedJSON = schemaConverter(
  oldSchemajson,
  ESchemaOrigin.GOURD_V1
) as ISchemaProps;

// 新版 json 转换
const schemaJSONv2 = schemaConverter(
  newSchemajson.components,
  ESchemaOrigin.GOURD_V2,
  function(node: any) {
    const newNode = Object.assign({}, node);
    newNode.name = node.name || (node.component && node.component.name);
    // newNode.name = node.name || node.component;
    newNode.screenId = node.screenId || node.id;
    return newNode;
  }
);

// 转换函数
const replFns = new REPL(decodeURIComponent(newSchemajson.functions));
const fnJSON = replFns.extractAllFunction(); // 获取所有的函数对象
const fnsSnapshoot = converterFnJSON(fnJSON, 'fnBody');
// console.log(222, fnsSnapshoot);

const res = listComponentResult;
const listData = (res && res.data) || [];
LIST_COMPONENT[134] = { title: 134, list: listData }; // 列表项
// console.log(444, listData);
listData.forEach(info => {
  const { name, packageId } = info;
  const componentName = `${packageId}_${name}`;

  LIST_COMPONENT_MAP[componentName] = info;
  // LIST_COMPONENT_MAP_SIMPLE[componentName] = omit(info, [
  //   'props',
  //   'created_at',
  //   'updated_at'
  // ]);
});

// 获取 list 等列表
// newSchemajson.modules.forEach((mod: { name: string; id: string }) => {
//   const url = `http://gcs.dockerlab.alipay.net/api/packages/${
//     mod.id
//   }/components`;
//   // addScript(url);
//   axios({
//     method: 'get',
//     url: url,
//     responseType: 'json'
//   }).then(res => {
//     const listData = (res && res.data && res.data.data) || [];
//     LIST_COMPONENT[mod.id] = { title: mod.id, list: listData }; // 列表项
//     // console.log(444, listData);
//     listData.forEach(info => {
//       const { name, packageId } = info;
//       const componentName = `${packageId}_${name}`;

//       LIST_COMPONENT_MAP[componentName] = info;
//       // LIST_COMPONENT_MAP_SIMPLE[componentName] = omit(info, [
//       //   'props',
//       //   'created_at',
//       //   'updated_at'
//       // ]);
//     });
//     client.put('/comList/model', { name: 'list', value: LIST_COMPONENT });
//   });
// });

const schema = createSchemaModel(schemaJSONv2);
// console.log('222', schema);

const onExpand = function(keys) {
  // console.log(888, keys);
};

const onSelectNode = node => {
  const attrs = JSON.parse(node.attrs);
  const pid = attrs && attrs.component && attrs.component.packageId;

  // 获取选中的节点，然后将属性传递给属性编辑器
  const nameInList = `${pid}_${node.name}`;
  console.log('当前选中的 node:', node.id, node.name, nameInList);

  const selectListItem = LIST_COMPONENT_MAP[nameInList];
  if (!selectListItem) {
    message.info(`当前选中的 ${node.name} 没有组件信息(cid: ${nameInList})`);
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
      client.put('/model', {
        name: 'propsEditor',
        // value: propsEditor,
        value: {
          schema: curPropsSchema,
          formData: curFormData
        }
      });
    });
};

/**
 * context menu 部分
 */
const menu = {
  id: 'component-tree',
  name: '组件树右键菜单',
  children: [
    { id: 'createSub', name: '添加组件', icon: 'plus', shortcut: '⌘+Alt+G' },
    // { id: 'createTmpl', name: '添加模板', icon: 'plus', shortcut: '' },
    { id: 'createUp', name: '前面插入组件', icon: 'arrow-up', shortcut: '' },
    {
      id: 'createDown',
      name: '后面插入组件',
      icon: 'arrow-down',
      shortcut: ''
    },
    {
      id: 'divider',
      name: '分割线',
      icon: 'file',
      type: 'separator'
    },
    { id: 'copy', name: '复制', icon: 'copy', shortcut: '⌘+C' },
    { id: 'paste', name: '粘贴', icon: 'switcher', shortcut: '⌘+V' },
    {
      id: 'divider',
      name: '分割线',
      icon: 'file',
      type: 'separator'
    },
    { id: 'delete', name: '删除', icon: 'delete', shortcut: '⌘+Delete' }
  ]
};

function onClickItem(key: string, keyPath: Array<string>, item: any) {
  console.log(`[11]当前点击项的 id: ${key}`);
}

const {
  ComponentWithStore: PageCreatorWithStore,
  client,
  innerApps
} = PageCreatorFactory();

const clientFnSets = innerApps.switchPanel.innerApps.fnSets.client;
const clientSwitchPanel = innerApps.switchPanel.client;

function onClick(value) {
  console.log('当前点击：', value);
}

function onRightClick({ node, event }) {
  console.log('onRightClick...');
}

function onSwitchWithClient(panel: IPanel, index: number) {
  console.log('[with client]当前点击：', panel, index);
  // client.put('/editorInPanel/editor', {
  //   name: 'value',
  //   value: `${index}: panel name: ${panel.id}`
  // });
}

function updatePreview(type: string, data: any) {
  client.put('/previewer/iframe', {
    name: 'data',
    value: {
      event: 'data-from-ide',
      type: type,
      data: data
    }
  });
}

// 经过 debounce 处理的函数，提高性能
const schemaModelChange = debounce(
  (key: string, value: any) => {
    if (key === 'schema') {
      const result = value.schemaJSON ? value.schemaJSON : value;
      console.log(777, 'schema changed:', key);

      // 更改 ide 的内容
      client.put('/editorInPanel/editor', {
        name: 'value',
        value: JSON.stringify(result.children, null, 4)
      });

      // 然后传递数据给 iframe
      newSchemajson.components = result.children;
      client.put('/previewer/iframe', {
        name: 'data',
        value: {
          event: 'data-from-ide',
          type: 'reset',
          data: newSchemajson
        }
      });
    }
  },
  400,
  {
    isImmediate: true
  }
);

const componentTree = {
  schemaTree: {
    onSelectNode: onSelectNode,
    onRightClickNode: onRightClick,
    onModelChange: schemaModelChange,
    onExpand
  }
};

const switchPanel = {
  onSwitch: onSwitchWithClient,
  codeEditor: {
    language: 'json'
  },
  previewer: {
    url: 'http://localhost:9006/gourd2/pi/demo/preview.html?from=ide'
  },
  fnSets: {
    // 当函数面板变更的时候
    onFnListChange: (type, obj) => {
      console.log('fn list change:', type, obj);

      // 获取函数集最新结果，传递给 pi 进行渲染
      client.get('/fnSets/model/all-fns-string').then(res => {
        const fns = getValueByPath(res, 'body.data.result');
        // console.log(fns, res);
        updatePreview('setFunctions', [encodeURIComponent(fns)]);
      });
    }
  }
};

const propsEditor = {
  formData: formData,
  schema: propsSchema,
  pageStore: pageStore
};

const propsEditorExtra = {
  clientFnSets: clientFnSets,
  onCallFnEditor: (type, name) => {
    console.log(`${type} ${name}`);
    // 切换到函数面板
    clientSwitchPanel.put(`/panels/selection/2`);
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

// 创建组件树和右键菜单
client.post('/schemaTree/tree', {
  schema: schema
}); // 注意这里的 schema 需要用 createSchemaModel 转换一层，否则因为缺少 parentId ，导致无法创建成功
client.post('/treeContextMenu/menu', { menu: menu });
client.put('/comList/model', { name: 'visible', value: false });
client.put('/comList/model', { name: 'list', value: LIST_COMPONENT });

/* ----------------------------------------------------
    初始化函数面板
----------------------------------------------------- */

clientFnSets.post('/model', {
  model: {
    visible: true,
    text: `text${Math.random()}`.slice(0, 8),
    fns: fnsSnapshoot
  }
});

/* ----------------------------------------------------
    初始化函数面板
----------------------------------------------------- */

setTimeout(() => {
  // 然后更新 preview
  updatePreview('reset', newSchemajson);

  // client.put('/model', {
  //   name: 'propsEditor',
  //   value: propsEditor
  // });
  // console.log(444, innerApps.switchPanel.innerApps.fnSets);
}, 5000);
