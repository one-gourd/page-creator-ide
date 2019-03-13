import * as React from 'react';
import { render } from 'react-dom';
import { createSchemaModel, ISchemaProps } from 'ide-tree';
import { jsonConverter } from 'ide-component-tree';
import { IPanel } from 'ide-switch-panel';

import { PageCreator, IPageCreatorProps, PageCreatorFactory } from '../src/';

import schemajson from './schema.json';

const convertedJSON = jsonConverter(schemajson) as ISchemaProps;

const schema = createSchemaModel(convertedJSON);

const onExpand = function(keys) {
  console.log(888, keys);
};

const onSelectNode = node => {
  console.log('当前选中的 node:', node.id, node.name);
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

const { PageCreatorWithStore, client } = PageCreatorFactory();

function onClick(value) {
  console.log('当前点击：', value);
}

function onRightClick({ node, event }) {
  console.log('onRightClick...');
}

function onSwitchWithClient(panel: IPanel, index: number) {
  console.log('[with client]当前点击：', panel, index);
  client.put('/clients/switchPanel/clients/codeEditor/editor', {
    name: 'value',
    value: `${index}: panel name: ${panel.id}`
  });
}

const componentTree = {
  schemaTree: {
    onSelectNode: onSelectNode,
    onRightClickNode: onRightClick,
    onExpand
  }
};

const switchPanel = {
  onSwitch: onSwitchWithClient,
  previewer: {
    url: 'https://daxue.taobao.com/markets/daxue/help#account'
  }
};

render(
  <PageCreatorWithStore
    componentTree={componentTree}
    switchPanel={switchPanel}
    onClick={onClick}
  />,
  document.getElementById('example') as HTMLElement
);

// 创建组件树和右键菜单
client.post('/clients/componentTree/clients/schemaTree/tree', {
  schema: schema
}); // 注意这里的 schema 需要用 createSchemaModel 转换一层，否则因为缺少 parentId ，导致无法创建成功
client.post('/clients/componentTree/clients/contextMenu/menu', { menu: menu });
