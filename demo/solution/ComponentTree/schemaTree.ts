import { message } from 'antd';
import { debounce } from 'ts-debounce';
import { LIST_COMPONENT_MAP } from '../../constant';
import { updatePropsEditor, updatePreview } from '../../util';

export const onSelectNode = client => node => {
  const attrs = JSON.parse(node.attrs);
  const pid = (attrs && attrs.component && attrs.component.packageId) || 'html';

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

// 经过 debounce 处理的函数，提高性能；如果属性树变更，则更新视图
export const schemaModelChange = client =>
  debounce(
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
