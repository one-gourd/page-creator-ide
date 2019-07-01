import { schemaConvertToNew } from 'ide-component-tree';
import { message } from 'antd';
import { getBlockSchema, savePageByClient } from '../../util';
import { autoSave } from '../auto-queue/autoSave';

// 在 component list 选择某项
export const onSelectListItem = client => async item => {
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

  // 调用自动保存功能
  autoSave({
    from: `list-${keyName}`,
    action: () => {
      message.info('正在自动保存...');
      savePageByClient(client);
    }
  });
};
