import axios from 'axios';
import { getValueByPath } from 'ide-lib-utils';
import { API_COMP_TPL, LIST_COMPONENT } from '../../constant';

/**
 * context menu 部分
 */
export const menuProps = {
  id: 'component-tree',
  name: '组件树右键菜单',
  children: [
    { id: 'createSub', name: '添加组件', icon: 'plus', shortcut: '⌘+Alt+G' },
    {
      id: 'createBlock',
      name: '添加区块',
      icon: 'appstore-o',
      shortcut: '⌘+Alt+B'
    },
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

/* ----------------------------------------------------
    获取 BlockList
----------------------------------------------------- */
//  获取北渚的区块 list
const getCompBlockList = async () => {
  const res = await axios.get(API_COMP_TPL);
  const tplList = getValueByPath(res, 'data.data');
  return tplList;
};

export let blockList = {};
async function initBlockList() {
  blockList = await getCompBlockList();
}
initBlockList();

/* ----------------------------------------------------
    选择菜单项
----------------------------------------------------- */
export const onClickMenuItem = client => (
  key: string,
  keyPath: Array<string>,
  item: any
) => {
  console.log(`[context menu]当前点击项的 id: ${key}`);

  const targetList = key === 'createBlock' ? blockList : LIST_COMPONENT;
  // 如果点击是 “创建区块”，则更改 list 源
  client.put('/comList/model', { name: 'list', value: targetList });
};
