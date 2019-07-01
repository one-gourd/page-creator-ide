import { IPanel } from 'ide-switch-panel';
import { URLS } from '../../constant';
import { getAllFnString, updatePreview, getAllSchema } from '../../util';

function onSwitchWithClient(panel: IPanel, index: number) {
  console.log('[with client]当前点击：', panel, index);
}
export const initSwitchPanelProps = client => {
  return {
    onSwitch: onSwitchWithClient,
    codeEditor: {
      language: 'json'
    },
    previewer: {
      dataType: 'JSON',
      handleFrameTasks: data => {
        console.log('[iframe] receive pi data:', data);
      },
      // url: ''
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
};
