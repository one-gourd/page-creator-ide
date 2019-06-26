import { Modal, message } from 'antd';
import { getDraftUrl, rollbackHistory } from '../../util';

const { confirm } = Modal;

export const initHistoryList = client => {
  return {
    onCancelModal: () => {
      // 关闭弹层
      client.put('/model', {
        name: 'historyList',
        value: {
          visible: false
        }
      });
    },
    onRollback: (id, time) => {
      confirm({
        title: '确认回滚',
        content: `确认将当前页面回滚到 ${time} 所对应的历史页面么？`,
        onOk: async () => {
          const result = await rollbackHistory(id);
          if (result.success) {
            message.success('回滚成功: 即将刷新当前页面');
            setTimeout(() => {
              location.reload();
            }, 2000);
          } else {
            message.error('回滚失败:' + result.message);
          }
        }
      });
    },
    formatter: (data: any) => {
      const result = data.data;
      [].concat(result.rows || []).forEach(item => {
        const { id, appId, appType } = item;
        item.draftUrl = getDraftUrl(appId, id, appType);
      });
      return result;
    }
  };
};
