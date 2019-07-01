import { WRAPPER_TYPE } from 'ide-props-editor';
import { message } from 'antd';
import { debounce } from 'ts-debounce-throttle';
import { omit } from 'ide-lib-utils';

export const initPropsEditorProps = (client, innerApps) => {
  const clientFnSets = innerApps.switchPanel.innerApps.fnSets.client;
  const clientSwitchPanel = innerApps.switchPanel.client;

  return {
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
        leading: false
      }
    )
  };
};
